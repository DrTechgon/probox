import { NextResponse } from 'next/server';

/**
 * Chat API Endpoint
 * 
 * Currently implements rule-based responses.
 * 
 * TODO: Replace with real AI integration
 * Example with OpenAI:
 *   import OpenAI from 'openai';
 *   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 *   const completion = await openai.chat.completions.create({
 *     model: 'gpt-4',
 *     messages: [{ role: 'user', content: message }]
 *   });
 *   return completion.choices[0].message.content;
 */

// Simulated response delay for realistic feel (ms)
const RESPONSE_DELAY = 800;

// Exact match responses for conversation starters
const exactMatchResponses = {
  // Homepage starters
  "what services does probox offer?": `PROBOX Infotech is a leading IT services company providing enterprise-grade solutions. Here's what we offer: 🎯

**Our Core Services:**

1. **Artificial Intelligence & ML**
   - Predictive analytics, NLP, Computer Vision
   
2. **Managed IT Services**
   - 24/7 monitoring, Help desk, Infrastructure management
   
3. **Cybersecurity**
   - Threat detection, SOC services, Compliance
   
4. **Cloud Services**
   - Migration, Architecture, Multi-cloud management
   
5. **IIoT Solutions**
   - Industrial automation, Predictive maintenance
   
6. **Network Management**
   - Design, Monitoring, SD-WAN

Visit our [Services page](/services) to learn more about each offering.

Which area interests you the most?`,

  "how can probox help my business?": `Great question! PROBOX helps businesses transform and thrive in the digital age. 🚀

**Here's how we can help your business:**

1. **Digital Transformation**
   - Modernize legacy systems
   - Implement cloud-first strategies
   - Automate manual processes

2. **Cost Optimization**
   - Reduce IT operational costs by up to 40%
   - Optimize cloud spending
   - Improve resource utilization

3. **Enhanced Security**
   - Protect against cyber threats
   - Ensure compliance (GDPR, HIPAA, etc.)
   - 24/7 security monitoring

4. **Innovation & Growth**
   - AI/ML solutions for competitive advantage
   - Data-driven decision making
   - Scalable infrastructure

**Our clients typically see:**
- 45% reduction in operational costs
- 99.99% system uptime
- 60% faster time-to-market

Would you like to discuss your specific business challenges? Visit our [Contact page](/contact) to schedule a consultation!`,

  "tell me about your expertise": `PROBOX Infotech has been delivering excellence in IT services for years! 💪

**Our Expertise:**

**Industry Experience:**
- 200+ enterprise clients served
- 500+ successful projects delivered
- 50+ certified technology professionals

**Technology Stack:**
- **Cloud:** AWS, Azure, Google Cloud (certified partners)
- **AI/ML:** TensorFlow, PyTorch, OpenAI
- **Security:** SIEM, EDR, Zero Trust Architecture
- **DevOps:** Kubernetes, Docker, Terraform, Jenkins

**Certifications:**
- ISO 27001 certified
- SOC 2 Type II compliant
- AWS Advanced Partner
- Microsoft Gold Partner

**Industries We Serve:**
- Financial Services
- Healthcare
- Manufacturing
- Retail & E-commerce
- Telecommunications

Our team has deep expertise in solving complex enterprise challenges. Ready to leverage our expertise? Visit [Contact us](/contact)!`,

  // Services page starters
  "which service is best for startups?": `Great question! For startups, we recommend a tailored approach based on your stage and goals. 🚀

**Best Services for Startups:**

1. **Cloud Services** (Most Popular)
   - Pay-as-you-go infrastructure
   - Auto-scaling capabilities
   - No upfront hardware costs
   - Perfect for: MVP development, scaling

2. **Managed IT Services**
   - Focus on your product, not IT
   - 24/7 support without hiring IT staff
   - Predictable monthly costs
   - Perfect for: Teams < 50 people

3. **AI/ML Solutions**
   - Build intelligent products
   - Automate customer support
   - Data analytics for insights
   - Perfect for: Tech-focused startups

**Startup-Friendly Benefits:**
- Flexible pricing models
- Rapid deployment (weeks, not months)
- Scale as you grow
- No long-term commitments

Many startups start with our **Cloud + Managed IT bundle** for maximum efficiency.

Want to discuss your startup's specific needs? [Contact us](/contact) for a free consultation!`,

  "do you offer cloud solutions?": `Absolutely! Cloud services are one of our core strengths. ☁️

**Our Cloud Solutions:**

**Migration Services:**
- Assessment & planning
- Zero-downtime migration
- Data migration & validation
- Legacy system modernization

**Cloud Platforms We Support:**
- ☁️ **AWS** - Advanced Partner
- ☁️ **Microsoft Azure** - Gold Partner  
- ☁️ **Google Cloud** - Partner
- ☁️ **Multi-cloud** architectures

**Managed Cloud Services:**
- 24/7 monitoring & management
- Security & compliance
- Cost optimization (FinOps)
- Backup & disaster recovery

**Results for Our Clients:**
- 45% average cost reduction
- 99.99% uptime SLA
- 10x faster deployments
- 60% reduction in security incidents

Visit our [Cloud Services page](/services/cloud-services) for detailed information.

Are you planning a new cloud project or looking to optimize existing infrastructure?`,

  "tell me about your ai services": `AI and Machine Learning are at the heart of our innovation capabilities! 🤖

**Our AI Services:**

**Solutions We Offer:**

1. **Predictive Analytics**
   - Demand forecasting
   - Customer churn prediction
   - Maintenance predictions
   - Risk assessment

2. **Natural Language Processing (NLP)**
   - Intelligent chatbots
   - Document processing & extraction
   - Sentiment analysis
   - Language translation

3. **Computer Vision**
   - Quality inspection automation
   - Facial recognition systems
   - Object detection & counting
   - Medical image analysis

4. **Intelligent Automation**
   - Process automation with AI
   - Decision automation
   - Workflow optimization

**Our AI Impact:**
- 60% reduction in manual processing
- 3.5x improvement in prediction accuracy
- 45% cost savings on customer support
- 80% faster document processing

Interested in exploring AI for your business? [Schedule a consultation](/contact)!`,

  // About page starters
  "what's probox's mission?": `Our mission is simple yet powerful! 🎯

**PROBOX Mission:**
> "To simplify technology and empower businesses to achieve their full potential through innovative IT solutions."

**Our Vision:**
To be the most trusted technology partner for enterprises worldwide, driving digital transformation with excellence.

**Our Core Values:**

1. **Customer Obsession**
   - Your success is our success
   - We go the extra mile

2. **Innovation First**
   - Continuously exploring new technologies
   - Building future-ready solutions

3. **Integrity & Transparency**
   - Honest communication
   - No hidden costs or surprises

4. **Excellence in Delivery**
   - 100% project success rate goal
   - Quality over shortcuts

5. **People Matter**
   - Investing in our team
   - Building lasting relationships

**Our Promise:**
"We Make I.T Simple" - turning complex technology challenges into streamlined solutions.

Learn more on our [About page](/about)!`,

  "how experienced is your team?": `Our team is our greatest asset! Here's what makes us exceptional: 👥

**Team Overview:**

- **50+ Technology Professionals**
- **Average 8+ years experience**
- **Diverse expertise** across multiple domains

**Leadership Team:**
- Former CTOs from Fortune 500 companies
- Industry veterans with 20+ years experience
- Published thought leaders

**Technical Expertise:**
- 100+ certifications (AWS, Azure, GCP, Security)
- Specialists in AI/ML, Cloud, Security
- Active open-source contributors

**Our Team Includes:**
- Solution Architects
- Cloud Engineers
- Security Analysts
- Data Scientists
- DevOps Engineers
- Project Managers

**Training & Growth:**
- Continuous learning programs
- Conference participation
- Internal knowledge sharing
- Certification support

Our team's expertise ensures your projects are in capable hands. Interested in joining us? Check our [Careers page](/careers)!`,

  "where are your offices located?": `We have a strategic presence to serve clients effectively! 📍

**Office Locations:**

**Headquarters:**
📍 **Mumbai, India**
- Main operations center
- Sales & marketing hub
- Customer success team

**Additional Locations:**
📍 **Bangalore** - Technology & Development Center
📍 **Hyderabad** - Delivery Center
📍 **Kerala** - Regional Office

**Global Reach:**
While based in India, we serve clients globally:
- 🇺🇸 United States
- 🇬🇧 United Kingdom
- 🇦🇪 Middle East
- 🇸🇬 Southeast Asia

**Work Model:**
- Hybrid work culture
- Remote-friendly policies
- Flexible engagement models

**Contact Us:**
- **Email:** info@proboxinfotech.com
- **Website:** Visit our [Contact page](/contact)

We'd love to hear from you! Whether you're nearby or across the globe, we're here to help.`,

  // Careers page starters
  "what positions are open?": `We're actively hiring across multiple departments! 🚀

**Current Open Positions:**

**Engineering:**
- Senior Frontend Engineer (Mumbai)
- Backend Engineer (Bangalore)
- DevOps Engineer (Remote)
- Data Scientist (Hyderabad)
- Software Engineering Intern (Bangalore)

**Product & Design:**
- Product Designer (Mumbai)

**Sales & Marketing:**
- Enterprise Sales Manager (Mumbai)

**Operations:**
- Technical Project Manager (Kerala)

**All positions offer:**
- Competitive salaries
- Health insurance
- Flexible work hours
- Learning & development budget
- Performance bonuses

Browse all positions with full details on our [Careers page](/careers#open-positions).

Is there a specific role you're interested in? I can tell you more!`,

  "what's the hiring process like?": `Our hiring process is designed to be thorough yet efficient! 📋

**PROBOX Hiring Process:**

**Step 1: Apply (1-2 days)**
- Submit your resume online
- We review every application carefully
- You'll hear back within 48 hours

**Step 2: Initial Screen (30 mins)**
- Quick call with our recruiting team
- Discuss your background & interests
- Answer your questions about PROBOX

**Step 3: Technical Interview (1-2 hours)**
- Deep dive into your skills
- May include coding exercise or case study
- Meet the hiring manager

**Step 4: Culture Fit (1 hour)**
- Meet team members and leadership
- Discuss career goals
- Ensure mutual fit

**Step 5: Offer (48 hours)**
- Receive offer within 2 days of final interview
- Competitive compensation package
- Clear start date and onboarding plan

**Timeline:** Usually 2-3 weeks from application to offer

**Tips for Success:**
- Research PROBOX beforehand
- Prepare examples of your work
- Ask thoughtful questions

Ready to apply? Visit [Careers](/careers) to get started!`,

  "what benefits do you offer?": `We offer a comprehensive benefits package to support our team! 🎁

**PROBOX Benefits:**

**Compensation:**
- 💰 Competitive market salaries
- 📈 Annual performance bonuses
- 🏆 Equity options for key roles

**Health & Wellness:**
- 🏥 Health insurance (self + family)
- 🧘 Mental health support
- 💪 Wellness programs

**Work-Life Balance:**
- 🏠 Flexible hybrid work model
- ⏰ Flexible working hours
- 🌴 Generous paid time off
- 🎂 Birthday off

**Growth & Learning:**
- 📚 Annual learning budget
- 🎓 Certification reimbursement
- 🎤 Conference attendance
- 👨‍🏫 Mentorship programs

**Office Perks:**
- ☕ Free meals & snacks
- 🎮 Recreation areas
- 🎉 Team events & offsites
- 💻 Latest equipment

**Career Growth:**
- Clear promotion paths
- Internal mobility opportunities
- Leadership development

Explore opportunities on our [Careers page](/careers)!`,

  // Job detail page starters
  "what skills are required?": `The required skills vary by position, but here's a general overview: 🎯

**For Engineering Roles:**
- Strong programming fundamentals
- Experience with relevant tech stack (React, Node.js, Python, etc.)
- Problem-solving abilities
- Collaboration skills
- Understanding of software development practices

**For Design Roles:**
- Strong portfolio
- Proficiency in design tools (Figma, etc.)
- UX/UI best practices
- User research experience

**For Sales Roles:**
- B2B sales experience
- Strong communication skills
- Track record of meeting targets
- Industry knowledge

**For All Positions:**
- Passion for technology
- Continuous learning mindset
- Team collaboration
- Strong communication
- Adaptability

Each job posting on our [Careers page](/careers) lists specific requirements. The current role you're viewing has detailed requirements in the job description above!

Have questions about specific qualifications?`,

  "is remote work available?": `Yes! We offer flexible work arrangements. 🏠

**Our Work Model:**

**Hybrid (Most Common):**
- Mix of office and remote work
- Typically 2-3 days in office
- Flexibility based on team needs

**Remote Options:**
- Some positions are fully remote
- DevOps Engineer role is currently 100% remote
- Remote work available across India

**On-Site:**
- Some client-facing roles
- Specified in job posting

**What We Provide for Remote Work:**
- 💻 Equipment allowance
- 🌐 Internet reimbursement
- 🪑 Home office setup support
- 📹 Video conferencing tools

**Collaboration Tools:**
- Slack for communication
- Zoom/Teams for meetings
- Notion for documentation
- JIRA for project management

Check the specific job posting for the work model - it's clearly mentioned in the location section!

Looking for a fully remote position?`,

  "how do i apply for this role?": `Applying is easy! Here's how: 📝

**To Apply:**

1. **Click "Submit CV"** button on this page
2. **Fill out the form:**
   - Your name
   - Email address
   - Phone number
   - LinkedIn profile (optional)
   - Upload your CV (PDF or Word)
3. **Submit!**

**Tips for a Strong Application:**
- ✅ Tailor your CV to highlight relevant experience
- ✅ Include measurable achievements
- ✅ Keep it concise (1-2 pages)
- ✅ Proofread before submitting

**What Happens Next:**
- We review applications within 48 hours
- Qualified candidates are contacted for initial screen
- Full process takes 2-3 weeks

**Pro Tip:** If you know someone at PROBOX, ask for a referral!

Ready to apply? Click the **"Submit CV"** button above!

Have questions before applying? Feel free to ask!`,

  // Contact page starters
  "what's the best way to reach you?": `We're easy to reach! Here are all the ways to contact us: 📞

**Contact Options:**

**For General Inquiries:**
- 📧 **Email:** info@proboxinfotech.com
- 📝 **Contact Form:** [Fill out our form](/contact)
- Response within 24 hours

**For Sales/Partnerships:**
- 📧 sales@proboxinfotech.com
- Schedule a call via our website

**For Careers:**
- 📧 careers@proboxinfotech.com
- Apply via [Careers page](/careers)

**For Support:**
- 📧 support@proboxinfotech.com
- 24/7 for existing clients

**Office Location:**
📍 Mumbai, India
(Other offices in Bangalore, Hyderabad, Kerala)

**Business Hours:**
Monday - Friday: 9:00 AM - 6:00 PM IST

**Best for Quick Response:**
The contact form on our [Contact page](/contact) is monitored continuously!

What would you like to discuss?`,

  "how quickly do you respond?": `We pride ourselves on quick response times! ⚡

**Our Response Times:**

**General Inquiries:**
- Email: Within 24 hours
- Contact form: Within 24 hours
- Usually same day during business hours

**Sales Inquiries:**
- Initial response: Within 4 hours
- Follow-up meeting: Within 48 hours

**Support (Existing Clients):**
- Critical issues: 15 minutes
- High priority: 1 hour
- Standard: 4 hours

**Career Applications:**
- Acknowledgment: Immediate (auto)
- Review & response: 48 hours

**Consultation Scheduling:**
- Usually available within 1-2 business days
- Flexible timing options

**Business Hours:**
Monday - Friday: 9:00 AM - 6:00 PM IST
Support: 24/7 for enterprise clients

**Tip:** For fastest response, use the contact form on our [Contact page](/contact) with a clear subject line!

How can we help you today?`,

  "can i schedule a consultation?": `Absolutely! We'd love to discuss how we can help. 📅

**Schedule a Consultation:**

**Option 1: Contact Form (Recommended)**
- Visit our [Contact page](/contact)
- Fill in your details and preferred time
- Select the service you're interested in
- We'll confirm within 24 hours

**Option 2: Email Directly**
- Send to: sales@proboxinfotech.com
- Include: Your name, company, and topic
- Suggest 2-3 time slots

**What to Expect:**

**Discovery Call (30 mins):**
- Understand your business needs
- Discuss potential solutions
- Answer your questions
- No obligation!

**Follow-up Meeting (60 mins):**
- Detailed solution presentation
- Technical discussion if needed
- Preliminary proposal

**Consultation Topics:**
- Digital transformation strategy
- Cloud migration planning
- AI/ML opportunities
- Security assessment
- Custom project discussion

Ready to schedule? Head to our [Contact page](/contact) and we'll set up a time that works for you!`,

  // Case studies page starters
  "what industries do you work with?": `We serve diverse industries with specialized solutions! 🏢

**Industries We Serve:**

**Financial Services:**
- Banks & credit unions
- Insurance companies
- Fintech startups
- Investment firms

**Healthcare:**
- Hospitals & clinics
- Pharmaceutical companies
- Health tech companies
- Medical device manufacturers

**Manufacturing:**
- Automotive
- Electronics
- Consumer goods
- Industrial equipment

**Retail & E-commerce:**
- Online marketplaces
- Retail chains
- D2C brands
- Logistics companies

**Technology:**
- SaaS companies
- Software startups
- IT service providers

**Telecommunications:**
- Telecom operators
- Network providers
- Communication platforms

**Our Industry Expertise:**
- Deep understanding of compliance requirements
- Industry-specific best practices
- Proven track record in each sector

Check our [Case Studies](/case-studies) for industry-specific success stories!

Which industry are you in?`,

  "can you share success stories?": `Absolutely! Here are some highlights from our client success stories: 🏆

**Success Story Highlights:**

**Financial Services Client:**
- Challenge: Legacy system modernization
- Solution: Cloud migration + AI automation
- Result: **40% cost reduction**, 3x faster processing

**Healthcare Provider:**
- Challenge: Data security & compliance
- Solution: End-to-end security implementation
- Result: **100% compliance**, zero breaches

**Manufacturing Company:**
- Challenge: Predictive maintenance
- Solution: IIoT + ML implementation
- Result: **35% reduction** in downtime

**E-commerce Platform:**
- Challenge: Scaling for growth
- Solution: Cloud-native architecture
- Result: **10x traffic handling**, 99.99% uptime

**Key Metrics Across Clients:**
- 200+ projects delivered
- 98% client satisfaction
- 45% average cost savings
- 100% SLA adherence

Visit our [Case Studies page](/case-studies) for detailed stories with full context!

Want to know about a specific industry or use case?`,

  "what results have clients seen?": `Our clients consistently achieve exceptional results! 📊

**Measurable Results:**

**Cost Savings:**
- 💰 **45%** average reduction in IT costs
- 💰 **60%** savings on manual processes
- 💰 **30%** reduction in cloud spend

**Performance Improvements:**
- ⚡ **99.99%** system uptime
- ⚡ **10x** faster deployment cycles
- ⚡ **3.5x** prediction accuracy improvement

**Security & Compliance:**
- 🔒 **Zero** security breaches for protected clients
- 🔒 **100%** compliance audit pass rate
- 🔒 **<5 min** threat detection time

**Business Impact:**
- 📈 **35%** reduction in equipment downtime
- 📈 **60%** faster time-to-market
- 📈 **40%** increase in customer satisfaction

**Client Retention:**
- 🤝 **95%** client retention rate
- 🤝 **85%** clients expand engagement
- 🤝 Average relationship: 4+ years

These aren't just numbers - they represent real business transformation!

Explore detailed case studies on our [Case Studies page](/case-studies).

Would you like to discuss potential results for your business?`
};

// Keywords and responses (for non-exact matches)
const responsePatterns = [
  {
    keywords: ['career', 'job', 'hiring', 'work', 'position', 'openings', 'vacancy', 'employ', 'join'],
    response: exactMatchResponses["what positions are open?"]
  },
  {
    keywords: ['contact', 'support', 'help', 'reach', 'email', 'phone', 'call', 'talk'],
    response: exactMatchResponses["what's the best way to reach you?"]
  },
  {
    keywords: ['price', 'pricing', 'cost', 'quote', 'budget', 'fee', 'charge', 'rate'],
    response: `Great question! Our pricing depends on the specific solution and scope of your project. 💼

**How we work:**
- We offer **customized solutions** tailored to your business needs
- Projects can range from consulting engagements to full enterprise implementations
- We work with businesses of all sizes

**To get a quote:**
1. Visit our [Contact page](/contact)
2. Tell us about your project requirements
3. Our team will prepare a customized proposal

Would you like to know more about any specific service before reaching out?`
  },
  {
    keywords: ['service', 'offer', 'provide', 'solution', 'what do you do'],
    response: exactMatchResponses["what services does probox offer?"]
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'automation'],
    response: exactMatchResponses["tell me about your ai services"]
  },
  {
    keywords: ['security', 'cyber', 'protect', 'threat', 'hack', 'breach'],
    response: `Cybersecurity is critical in today's digital landscape. Here's how we help: 🔒

**Our Security Services:**

- **24/7 Security Operations Center (SOC)**
- **Threat Detection & Response**
- **Vulnerability Assessments & Penetration Testing**
- **Identity & Access Management**
- **Compliance Support** (GDPR, HIPAA, PCI-DSS)
- **Security Awareness Training**

**Our Track Record:**
- Zero breaches for protected clients
- <5 min average threat detection time
- 100% compliance audit pass rate

Visit our [Cybersecurity service page](/services/cyber-security) for more details.

Do you have specific security concerns you'd like to discuss?`
  },
  {
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'migration'],
    response: exactMatchResponses["do you offer cloud solutions?"]
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: `Hello! 👋 Welcome to PROBOX Infotech!

I'm here to help you learn about:
- Our **IT services and solutions**
- **Career opportunities** at PROBOX
- How to **get in touch** with our team
- Anything else about our company

What would you like to know?`
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
    response: `You're welcome! 😊 I'm glad I could help.

Is there anything else you'd like to know about PROBOX Infotech? Feel free to ask about our services, careers, or anything else!`
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    response: `Goodbye! 👋 Thanks for chatting with me.

Feel free to come back anytime you have questions. Have a great day!`
  },
  {
    keywords: ['about', 'company', 'probox', 'who are you'],
    response: exactMatchResponses["what's probox's mission?"]
  },
  {
    keywords: ['team', 'people', 'employee', 'expert', 'staff'],
    response: exactMatchResponses["how experienced is your team?"]
  },
  {
    keywords: ['location', 'office', 'where', 'address', 'based'],
    response: exactMatchResponses["where are your offices located?"]
  },
  {
    keywords: ['benefit', 'perk', 'insurance', 'salary', 'compensation'],
    response: exactMatchResponses["what benefits do you offer?"]
  },
  {
    keywords: ['process', 'interview', 'apply', 'application', 'hire'],
    response: exactMatchResponses["what's the hiring process like?"]
  },
  {
    keywords: ['remote', 'wfh', 'work from home', 'hybrid', 'flexible'],
    response: exactMatchResponses["is remote work available?"]
  },
  {
    keywords: ['startup', 'small business', 'new company'],
    response: exactMatchResponses["which service is best for startups?"]
  },
  {
    keywords: ['success', 'case study', 'result', 'client', 'example'],
    response: exactMatchResponses["can you share success stories?"]
  },
  {
    keywords: ['industry', 'sector', 'vertical', 'domain'],
    response: exactMatchResponses["what industries do you work with?"]
  },
  {
    keywords: ['consult', 'meeting', 'schedule', 'appointment', 'call', 'demo'],
    response: exactMatchResponses["can i schedule a consultation?"]
  }
];

// Default response when no pattern matches
const defaultResponse = `Thanks for your message! I'm here to help you learn about PROBOX Infotech. 🙂

I can assist you with:
- **Services** - Learn about our IT solutions
- **Careers** - Explore job opportunities
- **Contact** - Get in touch with our team

Could you tell me a bit more about what you're looking for? That way I can give you the most helpful response.`;

/**
 * Find the best matching response based on exact match or keywords
 */
function findResponse(message) {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact match first (for conversation starters)
  if (exactMatchResponses[lowerMessage]) {
    return exactMatchResponses[lowerMessage];
  }
  
  // Then check keyword patterns
  for (const pattern of responsePatterns) {
    const matchScore = pattern.keywords.filter(keyword => 
      lowerMessage.includes(keyword)
    ).length;
    
    if (matchScore > 0) {
      return pattern.response;
    }
  }
  
  return defaultResponse;
}

/**
 * POST /api/chat
 * Handle chat messages and return responses
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate processing delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, RESPONSE_DELAY));

    // Find appropriate response
    // TODO: Replace with actual AI call
    // const aiResponse = await openai.chat.completions.create({...})
    const responseContent = findResponse(message.trim());

    return NextResponse.json({
      id: `resp_${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error. Please try again.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
    timestamp: new Date().toISOString()
  });
}
