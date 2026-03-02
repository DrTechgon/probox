import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  awards,
  caseStudies,
  companyInfo,
  services,
  stats,
  whyChooseUs
} from '@/data/site-data';
import {
  careerHero,
  hiringProcess,
  jobOpenings as fallbackJobOpenings,
  whyJoinUs
} from '@/data/careers-data';
import { defaultServiceData, servicesDetailData } from '@/data/services-detail-data';

const RESPONSE_DELAY_MS = 350;
const JOB_CACHE_TTL_MS = 3 * 60 * 1000;
const MIN_MATCH_SCORE = 2.4;
const MAX_OPENINGS_TO_SHOW = 8;

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'for', 'from',
  'get', 'have', 'how', 'i', 'if', 'in', 'is', 'it', 'me', 'my', 'of', 'on',
  'or', 'our', 'the', 'to', 'us', 'we', 'what', 'when', 'where', 'which', 'who',
  'with', 'you', 'your', 'tell', 'about', 'more', 'please', 'want', 'need'
]);

const TOKEN_SYNONYMS = {
  ai: ['artificial', 'intelligence', 'machine', 'learning', 'ml'],
  career: ['job', 'jobs', 'position', 'positions', 'opening', 'openings', 'role', 'hiring', 'vacancy'],
  cloud: ['aws', 'azure', 'gcp', 'migration', 'multi-cloud'],
  contact: ['reach', 'email', 'phone', 'address', 'office'],
  cost: ['price', 'pricing', 'budget', 'quote', 'fee', 'charge', 'rate'],
  cybersecurity: ['security', 'cyber', 'threat', 'soc', 'breach'],
  service: ['services', 'solution', 'solutions', 'offering', 'offerings'],
  support: ['help', 'assist', 'assistance'],
};

const SERVICE_ALIASES = {
  'artificial-intelligence': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'automation'],
  'managed-it-services': ['managed it', 'it support', 'help desk', 'infrastructure', 'it operations'],
  'cyber-security': ['cybersecurity', 'cyber security', 'security', 'soc', 'threat detection', 'zero trust'],
  iiot: ['iiot', 'iot', 'industrial iot', 'smart manufacturing', 'predictive maintenance'],
  'network-management': ['network', 'sd-wan', 'networking', 'connectivity'],
  'cloud-services': ['cloud', 'aws', 'azure', 'gcp', 'cloud migration', 'multi-cloud'],
};

const PAGE_SUGGESTIONS = {
  '/': [
    'What services does PROBOX offer?',
    'How can PROBOX help my business?',
    'How can I contact your team?'
  ],
  '/services': [
    'Which service fits my use case?',
    'Do you offer cloud migration?',
    'How long do implementations usually take?'
  ],
  '/careers': [
    'What positions are open right now?',
    'What is the hiring process?',
    'Do you have remote roles?'
  ],
  '/contact': [
    'What is the best way to reach you?',
    'How do I request a consultation?',
    'Where is your corporate office?'
  ],
  '/case-studies': [
    'Can you share success stories?',
    'What industries do you work with?',
    'What results have clients seen?'
  ],
  '/about': [
    'What is PROBOX mission?',
    'What awards has PROBOX received?',
    'Where are your offices located?'
  ]
};

const SECTION_ROOTS = ['/services', '/careers', '/contact', '/case-studies', '/about'];

let jobsCache = {
  timestamp: 0,
  data: null,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizePath(pathname = '/') {
  const base = String(pathname || '/').split('?')[0].split('#')[0].trim();
  if (!base) return '/';
  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

function shorten(text, maxLength = 120) {
  if (!text) return '';
  const clean = String(text).trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 3).trim()}...`;
}

function stemToken(token) {
  let value = token;
  if (value.length > 5 && value.endsWith('ies')) value = `${value.slice(0, -3)}y`;
  else if (value.length > 5 && value.endsWith('ing')) value = value.slice(0, -3);
  else if (value.length > 4 && value.endsWith('ers')) value = value.slice(0, -3);
  else if (value.length > 4 && value.endsWith('ed')) value = value.slice(0, -2);
  else if (value.length > 4 && value.endsWith('es')) value = value.slice(0, -2);
  else if (value.length > 3 && value.endsWith('s')) value = value.slice(0, -1);
  return value;
}

function tokenize(text) {
  return normalizeText(text)
    .split(/[\s/-]+/)
    .map((token) => stemToken(token))
    .filter((token) => token && token.length > 1 && !STOP_WORDS.has(token));
}

function expandTokens(tokens) {
  const expanded = new Set();
  for (const rawToken of tokens) {
    const token = stemToken(rawToken);
    if (!token) continue;

    expanded.add(token);

    const synonyms = TOKEN_SYNONYMS[token];
    if (!synonyms) continue;

    for (const synonym of synonyms) {
      const synonymTokens = tokenize(synonym);
      for (const synonymToken of synonymTokens) {
        expanded.add(synonymToken);
      }
    }
  }

  return expanded;
}

function hasAnyToken(tokenSet, words) {
  return words.some((word) => tokenSet.has(stemToken(normalizeText(word))));
}

function hasPhrase(text, phrases) {
  return phrases.some((phrase) => text.includes(normalizeText(phrase)));
}

function isGreeting(text) {
  return hasPhrase(text, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']);
}

function isThanks(text) {
  return hasPhrase(text, ['thanks', 'thank you', 'appreciate']);
}

function isGoodbye(text) {
  return hasPhrase(text, ['bye', 'goodbye', 'see you', 'talk later']);
}

function mentionsCurrentItem(text) {
  return hasPhrase(text, ['this', 'that', 'this role', 'this job', 'this service', 'this one', 'it']);
}

function getPageContext(pagePath) {
  const pathname = normalizePath(pagePath);
  const parts = pathname.split('/').filter(Boolean);
  const section = parts[0] || 'home';

  let serviceId = null;
  let jobId = null;

  if (section === 'services' && parts[1]) {
    serviceId = parts[1];
  }

  if (section === 'careers' && parts[1]) {
    jobId = parts[1];
  }

  return {
    pathname,
    section,
    sectionRoot: section === 'home' ? '/' : `/${section}`,
    serviceId,
    jobId,
  };
}

function getLastUserMessage(history = []) {
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const item = history[i];
    if (item?.role === 'user' && typeof item?.content === 'string' && item.content.trim()) {
      return item.content.trim();
    }
  }
  return '';
}

function buildResolvedQuery(message, history = []) {
  const normalized = normalizeText(message);
  const tokens = tokenize(normalized);
  const shouldUseHistory = mentionsCurrentItem(normalized) || tokens.length <= 4;

  if (!shouldUseHistory) return message;

  const lastUserMessage = getLastUserMessage(history);
  if (!lastUserMessage) return message;

  return `${lastUserMessage}. ${message}`;
}

function getServiceDetail(serviceId) {
  return servicesDetailData[serviceId] || defaultServiceData;
}

function findServiceById(serviceId) {
  return services.find((service) => service.id === serviceId);
}

function findServiceFromMessage(message, pageContext) {
  const normalized = normalizeText(message);

  for (const service of services) {
    const lookupPhrases = [
      service.title,
      service.id.replace(/-/g, ' '),
      ...(SERVICE_ALIASES[service.id] || []),
    ];

    if (hasPhrase(normalized, lookupPhrases)) {
      return service.id;
    }
  }

  if (pageContext.serviceId && mentionsCurrentItem(normalized)) {
    return pageContext.serviceId;
  }

  return pageContext.serviceId || null;
}

function buildServiceOverview(serviceId) {
  const service = findServiceById(serviceId);
  if (!service) return null;

  const detail = getServiceDetail(serviceId);

  const capabilities = (detail.capabilities?.length
    ? detail.capabilities.map((item) => item.title)
    : service.features || [])
    .slice(0, 4)
    .map((item) => `- ${item}`)
    .join('\n');

  const results = (detail.results || [])
    .slice(0, 3)
    .map((item) => `- **${item.metric}** ${item.label}`)
    .join('\n');

  const resultSection = results ? `\n\n**Typical outcomes**\n${results}` : '';

  return `Here is a focused overview of **${service.title}**:\n\n${service.shortDescription}\n\n**Key capabilities**\n${capabilities}${resultSection}\n\nLearn more: [${service.title}](/services/${service.id})`;
}

function buildServicesOverview() {
  const lines = services
    .map((service) => `- **${service.title}**: ${shorten(service.shortDescription, 95)} [View service](/services/${service.id})`)
    .join('\n');

  return `Here are the services currently listed on the PROBOX website:\n\n${lines}\n\nIf you share your goal, I can suggest the best-fit service.`;
}

function buildAboutResponse() {
  const awardsList = awards.slice(0, 3).map((award) => `- ${award}`).join('\n');

  return `**About PROBOX**\n\n${companyInfo.fullName} (${companyInfo.name}) was founded in **${companyInfo.founded}** and focuses on enterprise IT solutions across AI, cloud, cybersecurity, IIoT, and managed services.\n\n**Mission direction**\n- Drive efficient operations and cost optimization\n- Enable innovation with next-gen technology\n\n**Recent recognition**\n${awardsList}\n\nMore details: [About PROBOX](/about)`;
}

function buildTeamResponse() {
  const highlights = whyChooseUs.slice(0, 4).map((item) => `- ${item.title}: ${shorten(item.description, 90)}`).join('\n');

  return `**Team and Expertise**\n\nFrom the careers page, PROBOX highlights **${careerHero.stats[0].value} team members** across **${careerHero.stats[1].value} office locations**.\n\n**What stands out**\n${highlights}\n\nExplore careers: [Careers](/careers)`;
}

function buildPricingResponse(serviceId) {
  if (serviceId) {
    const service = findServiceById(serviceId);
    if (service) {
      return `Pricing for **${service.title}** is tailored to your scope, timeline, and required outcomes.\n\nBest next step:\n1. Go to [Contact](/contact)\n2. Select the relevant service\n3. Share requirements to get a custom estimate\n\nIf useful, I can help you define a shortlist of requirements before you submit.`;
    }
  }

  return `PROBOX does not publish fixed package pricing on the site because engagements are scoped per project.\n\nFor a quote:\n1. Submit your details on [Contact](/contact)\n2. Mention business goals, timeline, and preferred services\n3. The team will respond with a tailored proposal.`;
}

function buildContactResponse() {
  const branchLines = companyInfo.branches
    .map((branch) => `- **${branch.city}**`)
    .join('\n');

  return `**How to reach PROBOX**\n\n- Email: **${companyInfo.email}**\n- Corporate office: ${companyInfo.address}\n- Working hours: **Mon - Fri, 9:00 AM - 6:00 PM IST**\n\n**Branch locations**\n${branchLines}\n\nContact form: [Contact Page](/contact)`;
}

function buildConsultationResponse(serviceId) {
  const serviceText = serviceId
    ? `for **${findServiceById(serviceId)?.title || 'your selected service'}** `
    : '';

  return `Yes, you can schedule a consultation ${serviceText}through the website.\n\nBest path:\n1. Open [Contact](/contact)\n2. Choose inquiry type/service\n3. Add your requirements and preferred timeline\n\nThe team reviews submissions and follows up with next steps.`;
}

function buildCaseStudiesOverview() {
  const topCases = caseStudies
    .slice(0, 4)
    .map((study) => {
      const topResult = study.results?.[0] ? ` - ${study.results[0]}` : '';
      return `- **${study.title}** (${study.category})${topResult}`;
    })
    .join('\n');

  return `Here are examples from the current case studies page:\n\n${topCases}\n\nFull list: [Case Studies](/case-studies)`;
}

function buildIndustriesResponse() {
  const categories = [...new Set(caseStudies.map((study) => study.category))]
    .map((category) => `- ${category}`)
    .join('\n');

  return `From the published case studies, PROBOX has work across:\n\n${categories}\n\nIf you share your industry, I can point to the most relevant example.`;
}

function buildResultsResponse() {
  const headlineStats = stats
    .slice(0, 4)
    .map((item) => `- **${item.prefix || ''}${item.value}${item.suffix || ''}** ${item.label}`)
    .join('\n');

  const caseResults = caseStudies
    .slice(0, 3)
    .map((study) => `- ${study.title}: ${study.results?.[0] || 'Transformation outcomes delivered'}`)
    .join('\n');

  return `**Published outcomes on the website**\n\n${headlineStats}\n\n**Case study examples**\n${caseResults}\n\nSee full stories: [Case Studies](/case-studies)`;
}

function buildHiringProcessResponse() {
  const steps = hiringProcess
    .map((step) => `- **Step ${step.step}: ${step.title}** (${step.duration})`)
    .join('\n');

  return `The hiring flow shown on the careers page is:\n\n${steps}\n\nMore details: [Careers](/careers)`;
}

function buildBenefitsResponse() {
  const benefits = whyJoinUs
    .slice(0, 5)
    .map((item) => `- ${item.title}: ${shorten(item.description, 85)}`)
    .join('\n');

  return `Here are benefits highlighted on the careers page:\n\n${benefits}\n\nOpen roles: [Careers](/careers)`;
}

function mapSupabaseJob(row) {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    locationType: row.location_type,
    employmentType: row.employment_type,
    experienceLevel: row.experience_level,
    salary: row.salary,
    shortDescription: row.short_description,
    description: row.description,
    responsibilities: row.responsibilities || [],
    requirements: row.requirements || [],
    status: row.status,
    featured: Boolean(row.featured),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getFallbackJobs() {
  return fallbackJobOpenings.map((job) => ({
    ...job,
    createdAt: job.postedDate || new Date().toISOString(),
    updatedAt: job.postedDate || new Date().toISOString(),
    locationType: job.location === 'Remote' ? 'Remote' : 'Hybrid',
    status: 'published',
  }));
}

async function fetchPublishedJobsFromSupabase() {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('status', 'published')
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to fetch published jobs');
  }

  return (data || []).map(mapSupabaseJob);
}

async function getPublishedJobs() {
  const now = Date.now();
  if (jobsCache.data && now - jobsCache.timestamp < JOB_CACHE_TTL_MS) {
    return jobsCache.data;
  }

  try {
    const jobs = await fetchPublishedJobsFromSupabase();
    if (jobs.length > 0) {
      jobsCache = {
        timestamp: now,
        data: jobs,
      };
      return jobs;
    }
  } catch (error) {
    console.error('Chat API jobs fetch fallback:', error);
  }

  const fallback = getFallbackJobs();
  jobsCache = {
    timestamp: now,
    data: fallback,
  };
  return fallback;
}

function buildOpenRolesResponse(jobs) {
  if (!jobs.length) {
    return 'There are no published openings at the moment. You can still submit a general application on [Careers](/careers).';
  }

  const sorted = [...jobs].sort((a, b) => {
    const aTime = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const bTime = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return bTime - aTime;
  });

  const lines = sorted
    .slice(0, MAX_OPENINGS_TO_SHOW)
    .map((job) => `- [${job.title}](/careers/${job.id}) - ${job.location} | ${job.employmentType} | ${job.experienceLevel || 'Experience level not specified'}`)
    .join('\n');

  return `Current published openings (**${jobs.length}**):\n\n${lines}\n\nBrowse all roles: [Careers](/careers)`;
}

function findJobFromMessage(message, pageContext, jobs) {
  const normalized = normalizeText(message);

  for (const job of jobs) {
    if (!job?.title || !job?.id) continue;

    const phrases = [
      job.title,
      job.id.replace(/-/g, ' '),
    ];

    if (hasPhrase(normalized, phrases)) {
      return job;
    }
  }

  if (pageContext.jobId && mentionsCurrentItem(normalized)) {
    return jobs.find((job) => job.id === pageContext.jobId) || null;
  }

  if (pageContext.jobId) {
    return jobs.find((job) => job.id === pageContext.jobId) || null;
  }

  return null;
}

function buildJobSummaryResponse(job) {
  const requirementLines = (job.requirements || []).slice(0, 5).map((req) => `- ${req}`).join('\n');

  return `**${job.title}**\n\n- Department: ${job.department}\n- Location: ${job.location}\n- Employment type: ${job.employmentType}\n- Experience: ${job.experienceLevel || 'Not specified'}\n- Salary: ${job.salary || 'Shared during hiring process'}\n\n${job.shortDescription || job.description || ''}\n\n${requirementLines ? `**Key requirements**\n${requirementLines}\n\n` : ''}Role page: [View ${job.title}](/careers/${job.id})`;
}

function buildJobRequirementsResponse(job) {
  const requirements = (job.requirements || []).slice(0, 8);

  if (!requirements.length) {
    return `I could not find a detailed requirements list for **${job.title}**. You can review the full role here: [${job.title}](/careers/${job.id}).`;
  }

  const lines = requirements.map((item) => `- ${item}`).join('\n');

  return `For **${job.title}**, the listed requirements are:\n\n${lines}\n\nMore context: [${job.title}](/careers/${job.id})`;
}

function buildJobApplyResponse(job) {
  return `To apply for **${job.title}**:\n\n1. Open [${job.title}](/careers/${job.id})\n2. Click **Submit CV**\n3. Upload your CV (PDF/Word, up to 5MB) and submit details\n\nIf you need help tailoring your application, I can summarize the role expectations.`;
}

function buildRemoteWorkResponse(jobs) {
  const remoteJobs = jobs.filter((job) => {
    const location = normalizeText(job.location);
    const locationType = normalizeText(job.locationType || '');
    return location.includes('remote') || locationType.includes('remote') || locationType.includes('hybrid');
  });

  if (!remoteJobs.length) {
    return 'I do not see any explicitly remote or hybrid roles in the current published jobs. You can still check [Careers](/careers) for updates.';
  }

  const lines = remoteJobs
    .slice(0, 6)
    .map((job) => `- [${job.title}](/careers/${job.id}) - ${job.location} (${job.locationType || 'Flexible'})`)
    .join('\n');

  return `Remote/hybrid-friendly openings I can see:\n\n${lines}\n\nAll openings: [Careers](/careers)`;
}

function createEntry({
  id,
  type,
  title,
  question,
  answer,
  route,
  keywords = [],
  searchableText = '',
  serviceId = null,
  jobId = null,
}) {
  const keywordPhrases = [...new Set(
    [title, question, ...keywords]
      .filter(Boolean)
      .map((item) => normalizeText(item))
      .filter(Boolean)
  )];

  const tokenSet = expandTokens(tokenize([
    title,
    question,
    searchableText,
    keywords.join(' '),
  ].filter(Boolean).join(' ')));

  return {
    id,
    type,
    title,
    question,
    answer,
    route: route ? normalizePath(route) : '',
    serviceId,
    jobId,
    keywordPhrases,
    tokenSet,
    normalizedTitle: normalizeText(title),
    normalizedQuestion: normalizeText(question || ''),
  };
}

function buildStaticKnowledgeEntries() {
  const entries = [];

  entries.push(
    createEntry({
      id: 'company-overview',
      type: 'company',
      title: 'About PROBOX',
      answer: buildAboutResponse(),
      route: '/about',
      keywords: ['about', 'company', 'mission', 'vision', 'who are you', 'probox'],
      searchableText: `${companyInfo.description} ${companyInfo.aboutDescription} ${awards.join(' ')}`,
    })
  );

  entries.push(
    createEntry({
      id: 'services-overview',
      type: 'services',
      title: 'PROBOX services',
      answer: buildServicesOverview(),
      route: '/services',
      keywords: ['services', 'offerings', 'solutions', 'what do you offer'],
      searchableText: services.map((service) => `${service.title} ${service.shortDescription} ${service.features.join(' ')}`).join(' '),
    })
  );

  entries.push(
    createEntry({
      id: 'contact-info',
      type: 'contact',
      title: 'Contact details',
      answer: buildContactResponse(),
      route: '/contact',
      keywords: ['contact', 'email', 'office', 'address', 'reach', 'working hours'],
      searchableText: `${companyInfo.email} ${companyInfo.address} ${companyInfo.branches.map((branch) => branch.city).join(' ')}`,
    })
  );

  entries.push(
    createEntry({
      id: 'consultation',
      type: 'contact',
      title: 'Consultation scheduling',
      answer: buildConsultationResponse(null),
      route: '/contact',
      keywords: ['consultation', 'schedule', 'meeting', 'appointment', 'demo'],
      searchableText: 'schedule consultation contact form project requirements',
    })
  );

  entries.push(
    createEntry({
      id: 'pricing',
      type: 'pricing',
      title: 'Pricing and quote',
      answer: buildPricingResponse(null),
      route: '/contact',
      keywords: ['price', 'pricing', 'cost', 'quote', 'budget'],
      searchableText: 'custom pricing proposal scoping engagement model',
    })
  );

  entries.push(
    createEntry({
      id: 'case-studies',
      type: 'case-studies',
      title: 'Case studies overview',
      answer: buildCaseStudiesOverview(),
      route: '/case-studies',
      keywords: ['case studies', 'success stories', 'examples', 'projects'],
      searchableText: caseStudies.map((study) => `${study.title} ${study.description} ${study.results.join(' ')}`).join(' '),
    })
  );

  entries.push(
    createEntry({
      id: 'industries',
      type: 'case-studies',
      title: 'Industries served',
      answer: buildIndustriesResponse(),
      route: '/case-studies',
      keywords: ['industries', 'sectors', 'verticals', 'domains'],
      searchableText: caseStudies.map((study) => `${study.category} ${study.client}`).join(' '),
    })
  );

  entries.push(
    createEntry({
      id: 'results',
      type: 'case-studies',
      title: 'Client outcomes',
      answer: buildResultsResponse(),
      route: '/case-studies',
      keywords: ['results', 'outcomes', 'impact', 'metrics', 'roi'],
      searchableText: `${stats.map((item) => `${item.value}${item.suffix} ${item.label}`).join(' ')} ${caseStudies.map((study) => study.results.join(' ')).join(' ')}`,
    })
  );

  entries.push(
    createEntry({
      id: 'team',
      type: 'about',
      title: 'Team expertise',
      answer: buildTeamResponse(),
      route: '/about',
      keywords: ['team', 'expertise', 'experience', 'people'],
      searchableText: `${whyChooseUs.map((item) => `${item.title} ${item.description}`).join(' ')} ${careerHero.stats.map((item) => `${item.value} ${item.label}`).join(' ')}`,
    })
  );

  entries.push(
    createEntry({
      id: 'hiring-process',
      type: 'careers',
      title: 'Hiring process',
      answer: buildHiringProcessResponse(),
      route: '/careers',
      keywords: ['hiring process', 'interview', 'application steps'],
      searchableText: hiringProcess.map((step) => `${step.title} ${step.description} ${step.duration}`).join(' '),
    })
  );

  entries.push(
    createEntry({
      id: 'career-benefits',
      type: 'careers',
      title: 'Career benefits',
      answer: buildBenefitsResponse(),
      route: '/careers',
      keywords: ['benefits', 'perks', 'compensation', 'insurance', 'learning'],
      searchableText: whyJoinUs.map((item) => `${item.title} ${item.description}`).join(' '),
    })
  );

  for (const service of services) {
    const detail = getServiceDetail(service.id);

    entries.push(
      createEntry({
        id: `service-${service.id}`,
        type: 'service',
        title: service.title,
        answer: buildServiceOverview(service.id),
        route: `/services/${service.id}`,
        serviceId: service.id,
        keywords: [service.title, service.id.replace(/-/g, ' '), ...(SERVICE_ALIASES[service.id] || [])],
        searchableText: [
          service.shortDescription,
          service.fullDescription,
          ...(service.features || []),
          ...(detail.capabilities || []).map((item) => `${item.title} ${item.description}`),
          ...(detail.problems || []).map((item) => `${item.title} ${item.description}`),
          ...(detail.results || []).map((item) => `${item.metric} ${item.label}`),
          ...(detail.faq || []).map((item) => `${item.question} ${item.answer}`),
        ].join(' '),
      })
    );

    for (const [index, faqItem] of (detail.faq || []).entries()) {
      entries.push(
        createEntry({
          id: `service-faq-${service.id}-${index}`,
          type: 'service-faq',
          title: `${service.title} FAQ`,
          question: faqItem.question,
          answer: `**${faqItem.question}**\n\n${faqItem.answer}\n\nRelated service: [${service.title}](/services/${service.id})`,
          route: `/services/${service.id}`,
          serviceId: service.id,
          keywords: [faqItem.question, service.title, service.id.replace(/-/g, ' ')],
          searchableText: `${faqItem.question} ${faqItem.answer}`,
        })
      );
    }
  }

  for (const study of caseStudies) {
    entries.push(
      createEntry({
        id: `case-${study.id}`,
        type: 'case-study',
        title: study.title,
        answer: `**${study.title}** (${study.category})\n\n${study.description}\n\n**Key results**\n${(study.results || []).map((result) => `- ${result}`).join('\n')}\n\nMore examples: [Case Studies](/case-studies)`,
        route: '/case-studies',
        keywords: [study.title, study.category, study.client, 'case study', 'success story'],
        searchableText: `${study.description} ${study.results.join(' ')} ${study.technologies.join(' ')}`,
      })
    );
  }

  return entries;
}

const STATIC_KNOWLEDGE_ENTRIES = buildStaticKnowledgeEntries();

function buildDynamicJobEntries(jobs) {
  const entries = [];

  entries.push(
    createEntry({
      id: 'open-roles',
      type: 'careers',
      title: 'Open roles',
      answer: buildOpenRolesResponse(jobs),
      route: '/careers',
      keywords: ['open positions', 'jobs', 'hiring', 'vacancies', 'roles'],
      searchableText: jobs.map((job) => `${job.title} ${job.department} ${job.location} ${job.experienceLevel || ''}`).join(' '),
    })
  );

  entries.push(
    createEntry({
      id: 'remote-roles',
      type: 'careers',
      title: 'Remote and hybrid roles',
      answer: buildRemoteWorkResponse(jobs),
      route: '/careers',
      keywords: ['remote', 'hybrid', 'work from home', 'wfh'],
      searchableText: jobs.map((job) => `${job.title} ${job.location} ${job.locationType || ''}`).join(' '),
    })
  );

  for (const job of jobs) {
    entries.push(
      createEntry({
        id: `job-${job.id}`,
        type: 'job',
        title: job.title,
        answer: buildJobSummaryResponse(job),
        route: `/careers/${job.id}`,
        jobId: job.id,
        keywords: [job.title, job.id.replace(/-/g, ' '), 'job', 'position', 'role'],
        searchableText: [
          job.department,
          job.location,
          job.employmentType,
          job.experienceLevel,
          job.shortDescription,
          job.description,
          ...(job.requirements || []),
          ...(job.responsibilities || []),
        ].join(' '),
      })
    );

    entries.push(
      createEntry({
        id: `job-req-${job.id}`,
        type: 'job',
        title: `${job.title} requirements`,
        answer: buildJobRequirementsResponse(job),
        route: `/careers/${job.id}`,
        jobId: job.id,
        keywords: [job.title, 'skills', 'requirements', 'qualifications'],
        searchableText: (job.requirements || []).join(' '),
      })
    );

    entries.push(
      createEntry({
        id: `job-apply-${job.id}`,
        type: 'job',
        title: `${job.title} application`,
        answer: buildJobApplyResponse(job),
        route: `/careers/${job.id}`,
        jobId: job.id,
        keywords: [job.title, 'apply', 'application', 'submit cv'],
        searchableText: 'apply submit cv resume document upload',
      })
    );
  }

  return entries;
}

function scoreEntry(entry, normalizedQuery, queryTokenSet, pageContext) {
  let score = 0;

  let phraseHits = 0;
  for (const phrase of entry.keywordPhrases) {
    if (!phrase) continue;
    if (normalizedQuery.includes(phrase)) {
      const phraseWeight = phrase.includes(' ') ? 2 : 1;
      phraseHits += phraseWeight;
    }
  }

  score += phraseHits * 1.15;

  let tokenHits = 0;
  for (const token of queryTokenSet) {
    if (entry.tokenSet.has(token)) tokenHits += 1;
  }

  const coverage = tokenHits / Math.max(queryTokenSet.size, 1);
  score += tokenHits * 0.42;
  score += coverage * 3.8;

  if (entry.normalizedQuestion && normalizedQuery === entry.normalizedQuestion) {
    score += 4.5;
  } else if (entry.normalizedTitle && normalizedQuery.includes(entry.normalizedTitle)) {
    score += 2.6;
  }

  if (pageContext.pathname && entry.route) {
    if (pageContext.pathname === entry.route) {
      score += 3;
    } else if (pageContext.pathname.startsWith(`${entry.route}/`)) {
      score += 2;
    }
  }

  if (entry.route && pageContext.sectionRoot !== '/' && entry.route.startsWith(pageContext.sectionRoot)) {
    score += 1.2;
  }

  if (pageContext.serviceId && entry.serviceId === pageContext.serviceId) {
    score += 2.8;
  }

  if (pageContext.jobId && entry.jobId === pageContext.jobId) {
    score += 2.8;
  }

  return score;
}

function searchKnowledgeBase(message, pageContext, entries) {
  const normalizedQuery = normalizeText(message);
  const queryTokens = tokenize(normalizedQuery);
  const queryTokenSet = expandTokens(queryTokens);

  if (!queryTokenSet.size && !normalizedQuery) {
    return [];
  }

  const scored = entries
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, normalizedQuery, queryTokenSet, pageContext),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3);
}

function getPageSuggestions(pathname) {
  const normalized = normalizePath(pathname);

  for (const sectionRoot of SECTION_ROOTS) {
    if (normalized === sectionRoot || normalized.startsWith(`${sectionRoot}/`)) {
      return PAGE_SUGGESTIONS[sectionRoot] || PAGE_SUGGESTIONS['/'];
    }
  }

  return PAGE_SUGGESTIONS['/'];
}

function getFallbackResponse(pageContext) {
  const suggestions = getPageSuggestions(pageContext.pathname)
    .map((item) => `- ${item}`)
    .join('\n');

  return `I can help with service details, careers, case studies, and contact information from this website.\n\nTry one of these:\n${suggestions}`;
}

async function generateResponse({ message, history = [], pagePath }) {
  const pageContext = getPageContext(pagePath);
  const jobs = await getPublishedJobs();
  const dynamicEntries = buildDynamicJobEntries(jobs);
  const allEntries = [...STATIC_KNOWLEDGE_ENTRIES, ...dynamicEntries];

  const resolvedQuery = buildResolvedQuery(message, history);
  const normalizedQuery = normalizeText(resolvedQuery);
  const tokenSet = expandTokens(tokenize(normalizedQuery));

  if (isGreeting(normalizedQuery) && tokenSet.size <= 5) {
    return `Hi! I am your PROBOX assistant. I can answer questions about services, careers, case studies, and contact details.\n\nWhat would you like to know?`;
  }

  if (isThanks(normalizedQuery)) {
    return 'Glad to help. If you want, I can also suggest the best service or role based on your goal.';
  }

  if (isGoodbye(normalizedQuery)) {
    return 'Thanks for chatting. If you have more questions later, I am here.';
  }

  const serviceId = findServiceFromMessage(resolvedQuery, pageContext);
  const matchedJob = findJobFromMessage(resolvedQuery, pageContext, jobs);

  const asksPricing = hasAnyToken(tokenSet, ['price', 'pricing', 'cost', 'quote', 'budget', 'fee', 'rate']);
  const asksContact = hasAnyToken(tokenSet, ['contact', 'reach', 'email', 'address', 'office']);
  const asksConsultation = hasAnyToken(tokenSet, ['consultation', 'consult', 'schedule', 'appointment', 'meeting', 'demo']);
  const asksServices = hasAnyToken(tokenSet, ['service', 'solution', 'offer', 'offering', 'capability']);
  const asksCareers = hasAnyToken(tokenSet, ['career', 'job', 'opening', 'position', 'role', 'hiring', 'vacancy']);
  const asksOpenings = asksCareers && hasAnyToken(tokenSet, ['open', 'available', 'current', 'latest']);
  const asksRequirements = hasAnyToken(tokenSet, ['requirement', 'skill', 'qualification']);
  const asksApply = hasAnyToken(tokenSet, ['apply', 'application', 'submit', 'resume', 'cv']);
  const asksHiringProcess = hasAnyToken(tokenSet, ['interview', 'process', 'steps', 'hiring']);
  const asksBenefits = hasAnyToken(tokenSet, ['benefit', 'perk', 'insurance', 'compensation', 'salary']);
  const asksRemote = hasAnyToken(tokenSet, ['remote', 'hybrid', 'wfh', 'home']);
  const asksCaseStudies = hasAnyToken(tokenSet, ['case', 'study', 'success', 'example', 'client']);
  const asksIndustries = hasAnyToken(tokenSet, ['industry', 'sector', 'vertical', 'domain']);
  const asksResults = hasAnyToken(tokenSet, ['result', 'outcome', 'impact', 'metric', 'roi']);
  const asksAbout = hasAnyToken(tokenSet, ['about', 'company', 'mission', 'vision']);
  const asksTeam = hasAnyToken(tokenSet, ['team', 'expertise', 'experience', 'people']);

  if (asksPricing) {
    return buildPricingResponse(serviceId);
  }

  if (asksContact && !asksCareers) {
    return buildContactResponse();
  }

  if (asksConsultation) {
    return buildConsultationResponse(serviceId);
  }

  if (asksOpenings || (asksCareers && !matchedJob && !asksRequirements && !asksApply)) {
    return buildOpenRolesResponse(jobs);
  }

  if (matchedJob && asksRequirements) {
    return buildJobRequirementsResponse(matchedJob);
  }

  if (matchedJob && asksApply) {
    return buildJobApplyResponse(matchedJob);
  }

  if (asksHiringProcess && asksCareers) {
    return buildHiringProcessResponse();
  }

  if (asksBenefits && asksCareers) {
    return buildBenefitsResponse();
  }

  if (asksRemote && asksCareers) {
    return buildRemoteWorkResponse(jobs);
  }

  if (asksServices && serviceId) {
    const serviceOverview = buildServiceOverview(serviceId);
    if (serviceOverview) return serviceOverview;
  }

  if (asksServices) {
    return buildServicesOverview();
  }

  if (asksCaseStudies) {
    return buildCaseStudiesOverview();
  }

  if (asksIndustries) {
    return buildIndustriesResponse();
  }

  if (asksResults) {
    return buildResultsResponse();
  }

  if (asksTeam) {
    return buildTeamResponse();
  }

  if (asksAbout) {
    return buildAboutResponse();
  }

  if (matchedJob) {
    return buildJobSummaryResponse(matchedJob);
  }

  const matches = searchKnowledgeBase(resolvedQuery, pageContext, allEntries);

  if (matches.length && matches[0].score >= MIN_MATCH_SCORE) {
    const top = matches[0].entry;
    const second = matches[1];

    if (second && second.score >= matches[0].score - 0.7 && second.entry.route && second.entry.id !== top.id) {
      return `${top.answer}\n\nRelated: [${second.entry.title}](${second.entry.route})`;
    }

    return top.answer;
  }

  return getFallbackResponse(pageContext);
}

/**
 * POST /api/chat
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const history = Array.isArray(body?.history) ? body.history : [];
    const pagePath = typeof body?.pagePath === 'string' ? body.pagePath : '/';

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    await sleep(RESPONSE_DELAY_MS);

    const responseContent = await generateResponse({ message, history, pagePath });

    return NextResponse.json({
      id: `resp_${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'Sorry, I encountered an error. Please try again.',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
    timestamp: new Date().toISOString(),
  });
}
