/**
 * Jobs Store Service
 * 
 * A clean abstraction layer for job listings CRUD operations.
 * Currently uses localStorage for persistence.
 * 
 * TODO: Replace localStorage logic with Supabase queries
 * Example Supabase replacement:
 *   const { data, error } = await supabase.from('jobs').select('*')
 */

const STORAGE_KEY = 'probox_job_listings';

// Default job listings to seed the store (from existing careers-data.js)
const defaultJobs = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Mumbai",
    locationType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹18L - ₹28L",
    shortDescription: "Build exceptional user experiences for our enterprise clients using React, TypeScript, and modern frontend technologies.",
    description: "We're looking for a Senior Frontend Engineer to join our product team. You'll be responsible for building and maintaining our client-facing applications, working closely with designers and backend engineers to deliver exceptional user experiences.",
    responsibilities: [
      "Lead frontend architecture decisions and implementation",
      "Build reusable components and frontend libraries",
      "Collaborate with UX designers to implement pixel-perfect interfaces",
      "Mentor junior developers and conduct code reviews",
      "Optimize applications for maximum performance"
    ],
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of modern CSS and responsive design",
      "Experience with state management (Redux, Zustand, or similar)",
      "Familiarity with testing frameworks (Jest, Cypress)",
      "Excellent communication and collaboration skills"
    ],
    applicationLink: "https://careers.proboxinfotech.com/apply/senior-frontend",
    applicationEmail: "careers@proboxinfotech.com",
    status: "published",
    featured: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Bangalore",
    locationType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹12L - ₹20L",
    shortDescription: "Design and build scalable backend services using Node.js, Python, and cloud-native technologies.",
    description: "Join our backend team to build robust, scalable services that power our enterprise solutions. You'll work on challenging problems involving distributed systems, data processing, and API design.",
    responsibilities: [
      "Design and implement RESTful APIs and microservices",
      "Optimize database queries and application performance",
      "Write clean, maintainable, and well-tested code",
      "Participate in system design discussions",
      "Collaborate with frontend and DevOps teams"
    ],
    requirements: [
      "3+ years of backend development experience",
      "Proficiency in Node.js or Python",
      "Experience with SQL and NoSQL databases",
      "Understanding of cloud services (AWS/Azure/GCP)",
      "Knowledge of containerization and CI/CD"
    ],
    applicationLink: "",
    applicationEmail: "careers@proboxinfotech.com",
    status: "published",
    featured: false,
    createdAt: "2025-01-12T10:00:00Z",
    updatedAt: "2025-01-12T10:00:00Z"
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    locationType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹20L - ₹32L",
    shortDescription: "Build and maintain our cloud infrastructure, CI/CD pipelines, and ensure 99.99% uptime for enterprise clients.",
    description: "We're seeking a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You'll be instrumental in maintaining our commitment to reliability and security.",
    responsibilities: [
      "Design and manage cloud infrastructure on AWS/Azure",
      "Implement and maintain CI/CD pipelines",
      "Monitor system performance and ensure high availability",
      "Implement security best practices and compliance",
      "Automate operational processes"
    ],
    requirements: [
      "5+ years of DevOps/SRE experience",
      "Expert knowledge of AWS or Azure",
      "Experience with Kubernetes and Docker",
      "Proficiency in Infrastructure as Code (Terraform)",
      "Strong scripting skills (Python, Bash)"
    ],
    applicationLink: "https://careers.proboxinfotech.com/apply/devops",
    applicationEmail: "",
    status: "published",
    featured: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z"
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Product & Design",
    location: "Mumbai",
    locationType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹14L - ₹22L",
    shortDescription: "Create intuitive, beautiful interfaces for enterprise products that delight users and solve real problems.",
    description: "Join our design team to create world-class experiences for our enterprise clients. You'll work on complex problems, turning them into simple, elegant solutions.",
    responsibilities: [
      "Lead end-to-end design for product features",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with engineers to ensure design quality",
      "Contribute to and maintain our design system"
    ],
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio demonstrating UX/UI skills",
      "Proficiency in Figma and prototyping tools",
      "Experience with design systems",
      "Understanding of frontend development basics"
    ],
    applicationLink: "",
    applicationEmail: "design@proboxinfotech.com",
    status: "published",
    featured: false,
    createdAt: "2025-01-08T10:00:00Z",
    updatedAt: "2025-01-08T10:00:00Z"
  },
  {
    id: "sales-manager",
    title: "Enterprise Sales Manager",
    department: "Sales & Marketing",
    location: "Mumbai",
    locationType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹25L - ₹40L + Commission",
    shortDescription: "Drive revenue growth by building relationships with enterprise clients and closing complex deals.",
    description: "We're looking for an experienced Enterprise Sales Manager to expand our client base. You'll be responsible for the entire sales cycle, from prospecting to closing.",
    responsibilities: [
      "Identify and pursue new enterprise opportunities",
      "Build and maintain C-level relationships",
      "Lead complex sales cycles and negotiations",
      "Collaborate with pre-sales and delivery teams",
      "Achieve and exceed quarterly revenue targets"
    ],
    requirements: [
      "7+ years of enterprise B2B sales experience",
      "Proven track record of exceeding quotas",
      "Experience selling IT services or SaaS",
      "Strong presentation and negotiation skills",
      "MBA or equivalent preferred"
    ],
    applicationLink: "https://careers.proboxinfotech.com/apply/sales",
    applicationEmail: "careers@proboxinfotech.com",
    status: "published",
    featured: true,
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-05T10:00:00Z"
  },
  {
    id: "software-intern",
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "Bangalore",
    locationType: "Hybrid",
    employmentType: "Internship",
    experienceLevel: "Entry Level",
    salary: "₹30K - ₹50K/month",
    shortDescription: "Kickstart your career by working on real projects alongside experienced engineers. 6-month program with PPO opportunity.",
    description: "Our internship program is designed to give you hands-on experience working on production systems. You'll be paired with a mentor and work on meaningful projects.",
    responsibilities: [
      "Work on real features for our products",
      "Participate in code reviews and design discussions",
      "Learn our development processes and tools",
      "Present your project to the team",
      "Collaborate with cross-functional teams"
    ],
    requirements: [
      "Currently pursuing B.Tech/M.Tech in CS or related field",
      "Strong fundamentals in DSA and programming",
      "Knowledge of at least one programming language",
      "Eagerness to learn and grow",
      "Good communication skills"
    ],
    applicationLink: "",
    applicationEmail: "internships@proboxinfotech.com",
    status: "published",
    featured: true,
    createdAt: "2025-01-14T10:00:00Z",
    updatedAt: "2025-01-14T10:00:00Z"
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "Engineering",
    location: "Hyderabad",
    locationType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹15L - ₹25L",
    shortDescription: "Apply machine learning and statistical analysis to solve complex business problems for our clients.",
    description: "Join our AI team to work on cutting-edge machine learning projects. You'll develop models that drive real business value for enterprise clients.",
    responsibilities: [
      "Develop and deploy machine learning models",
      "Analyze large datasets to extract insights",
      "Collaborate with engineering on ML infrastructure",
      "Present findings to clients and stakeholders",
      "Stay current with latest ML research"
    ],
    requirements: [
      "3+ years of data science experience",
      "Strong Python and SQL skills",
      "Experience with ML frameworks (TensorFlow, PyTorch)",
      "Solid foundation in statistics and mathematics",
      "MS or PhD in relevant field preferred"
    ],
    applicationLink: "https://careers.proboxinfotech.com/apply/data-scientist",
    applicationEmail: "",
    status: "published",
    featured: false,
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "hr-business-partner",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Mumbai",
    locationType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹12L - ₹18L",
    shortDescription: "Partner with business leaders to drive people strategy, culture, and organizational effectiveness.",
    description: "Join our HR team to help build an amazing workplace culture. You'll be a strategic partner to business leaders, driving initiatives that attract and retain top talent.",
    responsibilities: [
      "Partner with department heads on people strategy",
      "Lead talent acquisition and employer branding",
      "Design and implement employee engagement programs",
      "Handle employee relations and conflict resolution",
      "Drive performance management processes"
    ],
    requirements: [
      "5+ years of HR experience, preferably in tech",
      "Strong knowledge of employment laws",
      "Experience with HRIS systems",
      "Excellent interpersonal and communication skills",
      "MBA in HR or equivalent"
    ],
    applicationLink: "",
    applicationEmail: "hr@proboxinfotech.com",
    status: "draft",
    featured: false,
    createdAt: "2025-01-03T10:00:00Z",
    updatedAt: "2025-01-03T10:00:00Z"
  }
];

/**
 * Initialize the jobs store with default data if empty
 * TODO: Replace with Supabase initialization check
 */
const initializeStore = () => {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultJobs));
  }
};

/**
 * Generate a unique ID for new jobs
 */
const generateId = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug}-${Date.now()}`;
};

/**
 * Fetch all jobs from the store
 * TODO: Replace with Supabase query
 *   const { data, error } = await supabase.from('jobs').select('*').order('updatedAt', { ascending: false })
 */
export const fetchJobs = () => {
  if (typeof window === 'undefined') return [];
  
  initializeStore();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Fetch only published jobs (for public careers page)
 * TODO: Replace with Supabase query
 *   const { data, error } = await supabase.from('jobs').select('*').eq('status', 'published')
 */
export const fetchPublishedJobs = () => {
  const jobs = fetchJobs();
  return jobs.filter(job => job.status === 'published');
};

/**
 * Fetch a single job by ID
 * TODO: Replace with Supabase query
 *   const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single()
 */
export const fetchJobById = (id) => {
  const jobs = fetchJobs();
  return jobs.find(job => job.id === id) || null;
};

/**
 * Create a new job listing
 * TODO: Replace with Supabase insert
 *   const { data, error } = await supabase.from('jobs').insert([jobData])
 */
export const createJob = (jobData) => {
  const jobs = fetchJobs();
  const now = new Date().toISOString();
  
  const newJob = {
    ...jobData,
    id: generateId(jobData.title),
    createdAt: now,
    updatedAt: now,
    status: jobData.status || 'draft'
  };
  
  jobs.unshift(newJob); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  
  return newJob;
};

/**
 * Update an existing job listing
 * TODO: Replace with Supabase update
 *   const { data, error } = await supabase.from('jobs').update(jobData).eq('id', id)
 */
export const updateJob = (id, jobData) => {
  const jobs = fetchJobs();
  const index = jobs.findIndex(job => job.id === id);
  
  if (index === -1) {
    throw new Error('Job not found');
  }
  
  const updatedJob = {
    ...jobs[index],
    ...jobData,
    id, // Preserve original ID
    createdAt: jobs[index].createdAt, // Preserve original creation date
    updatedAt: new Date().toISOString()
  };
  
  jobs[index] = updatedJob;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  
  return updatedJob;
};

/**
 * Delete a job listing
 * TODO: Replace with Supabase delete
 *   const { error } = await supabase.from('jobs').delete().eq('id', id)
 */
export const deleteJob = (id) => {
  const jobs = fetchJobs();
  const filteredJobs = jobs.filter(job => job.id !== id);
  
  if (filteredJobs.length === jobs.length) {
    throw new Error('Job not found');
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredJobs));
  return true;
};

/**
 * Toggle job publish status
 * TODO: Replace with Supabase update
 */
export const toggleJobStatus = (id) => {
  const job = fetchJobById(id);
  if (!job) throw new Error('Job not found');
  
  const newStatus = job.status === 'published' ? 'draft' : 'published';
  return updateJob(id, { status: newStatus });
};

/**
 * Validate if a job can be published
 * Returns { valid: boolean, errors: string[] }
 */
export const validateJobForPublish = (job) => {
  const errors = [];
  
  if (!job.title?.trim()) errors.push('Job title is required');
  if (!job.location?.trim()) errors.push('Location is required');
  if (!job.employmentType?.trim()) errors.push('Employment type is required');
  if (!job.description?.trim()) errors.push('Description is required');
  if (!job.applicationLink?.trim() && !job.applicationEmail?.trim()) {
    errors.push('Application link or email is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Department options
export const departmentOptions = [
  "Engineering",
  "Product & Design",
  "Sales & Marketing",
  "Operations",
  "Human Resources",
  "Finance"
];

// Location options
export const locationOptions = [
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Kerala",
  "Remote"
];

// Location type options
export const locationTypeOptions = [
  "Remote",
  "Hybrid",
  "On-site"
];

// Employment type options
export const employmentTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];

// Experience level options
export const experienceLevelOptions = [
  "Entry Level",
  "Mid Level",
  "Senior",
  "Lead",
  "Director"
];
