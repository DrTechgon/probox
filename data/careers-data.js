// Careers page data - structured for easy API integration

export const careerHero = {
  headline: "Build the Future With Us",
  subheadline: "Join a team of innovators shaping the next generation of enterprise technology. We're looking for passionate individuals who want to make a real impact.",
  stats: [
    { value: "50+", label: "Team Members" },
    { value: "4", label: "Office Locations" },
    { value: "15+", label: "Open Roles" }
  ]
};

export const whyJoinUs = [
  {
    id: 1,
    title: "Ownership & Impact",
    description: "Work on projects that matter. Every team member has a direct impact on our products and clients' success.",
    icon: "Target"
  },
  {
    id: 2,
    title: "Growth & Learning",
    description: "Continuous learning culture with mentorship programs, conference budgets, and clear career progression paths.",
    icon: "TrendingUp"
  },
  {
    id: 3,
    title: "Flexible Work Culture",
    description: "Hybrid work model with flexible hours. We trust our team to deliver results, not clock hours.",
    icon: "Clock"
  },
  {
    id: 4,
    title: "Competitive Compensation",
    description: "Industry-leading salaries, equity options, health insurance, and performance bonuses.",
    icon: "Wallet"
  },
  {
    id: 5,
    title: "Collaborative Environment",
    description: "Work alongside talented engineers, designers, and strategists who push each other to excel.",
    icon: "Users"
  },
  {
    id: 6,
    title: "Cutting-Edge Technology",
    description: "Work with the latest technologies in AI, Cloud, IoT, and Cybersecurity on enterprise-scale projects.",
    icon: "Cpu"
  }
];

export const departments = [
  "All Departments",
  "Engineering",
  "Product & Design",
  "Sales & Marketing",
  "Operations",
  "Human Resources",
  "Finance"
];

export const locations = [
  "All Locations",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Kerala",
  "Remote"
];

export const employmentTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];

export const experienceLevels = [
  "All Levels",
  "Entry Level",
  "Mid Level",
  "Senior",
  "Lead",
  "Director"
];

export const jobOpenings = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Mumbai",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹18L - ₹28L",
    postedDate: "2025-01-15",
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
    benefits: [
      "Competitive salary with equity options",
      "Health insurance for you and family",
      "Flexible work hours and hybrid model",
      "Learning & development budget",
      "Annual performance bonus"
    ],
    featured: true
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Bangalore",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹12L - ₹20L",
    postedDate: "2025-01-12",
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
    benefits: [
      "Competitive salary with equity options",
      "Health insurance for you and family",
      "Flexible work hours and hybrid model",
      "Learning & development budget",
      "Annual performance bonus"
    ],
    featured: false
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹20L - ₹32L",
    postedDate: "2025-01-10",
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
    benefits: [
      "Competitive salary with equity options",
      "Health insurance for you and family",
      "100% Remote work option",
      "Learning & development budget",
      "Annual performance bonus"
    ],
    featured: true
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Product & Design",
    location: "Mumbai",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹14L - ₹22L",
    postedDate: "2025-01-08",
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
    benefits: [
      "Competitive salary with equity options",
      "Health insurance for you and family",
      "Flexible work hours and hybrid model",
      "Design conference budget",
      "Latest design tools and equipment"
    ],
    featured: false
  },
  {
    id: "sales-manager",
    title: "Enterprise Sales Manager",
    department: "Sales & Marketing",
    location: "Mumbai",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹25L - ₹40L + Commission",
    postedDate: "2025-01-05",
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
    benefits: [
      "Competitive base + uncapped commission",
      "Health insurance for you and family",
      "Car allowance",
      "President's Club incentives",
      "Stock options"
    ],
    featured: true
  },
  {
    id: "hr-business-partner",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Mumbai",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹12L - ₹18L",
    postedDate: "2025-01-03",
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
    benefits: [
      "Competitive salary",
      "Health insurance for you and family",
      "Flexible work hours",
      "Professional development budget",
      "Annual performance bonus"
    ],
    featured: false
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "Engineering",
    location: "Hyderabad",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹15L - ₹25L",
    postedDate: "2025-01-01",
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
    benefits: [
      "Competitive salary with equity options",
      "Health insurance for you and family",
      "Conference and research budget",
      "Flexible work hours",
      "Annual performance bonus"
    ],
    featured: false
  },
  {
    id: "software-intern",
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "Bangalore",
    employmentType: "Internship",
    experienceLevel: "Entry Level",
    salary: "₹30K - ₹50K/month",
    postedDate: "2025-01-14",
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
    benefits: [
      "Competitive stipend",
      "Pre-Placement Offer opportunity",
      "Mentorship from senior engineers",
      "Free meals and snacks",
      "Certificate of completion"
    ],
    featured: true
  },
  {
    id: "project-manager",
    title: "Technical Project Manager",
    department: "Operations",
    location: "Kerala",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "₹18L - ₹28L",
    postedDate: "2024-12-28",
    shortDescription: "Lead complex technology projects from inception to delivery, ensuring on-time, on-budget execution.",
    description: "We're looking for a Technical Project Manager to lead our client delivery teams. You'll be responsible for ensuring projects are delivered successfully.",
    responsibilities: [
      "Lead end-to-end project delivery",
      "Manage client relationships and expectations",
      "Coordinate cross-functional teams",
      "Track project metrics and report to stakeholders",
      "Identify and mitigate project risks"
    ],
    requirements: [
      "6+ years of IT project management experience",
      "PMP or equivalent certification",
      "Experience with Agile/Scrum methodologies",
      "Technical background preferred",
      "Excellent stakeholder management skills"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance for you and family",
      "Flexible work hours",
      "Professional certification support",
      "Annual performance bonus"
    ],
    featured: false
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    department: "Engineering",
    location: "Mumbai",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "₹14L - ₹22L",
    postedDate: "2024-12-25",
    shortDescription: "Protect our clients' digital assets by identifying vulnerabilities and implementing security measures.",
    description: "Join our cybersecurity team to help protect enterprise clients from evolving threats. You'll conduct assessments, implement controls, and respond to incidents.",
    responsibilities: [
      "Conduct security assessments and penetration testing",
      "Monitor security systems and respond to incidents",
      "Implement security controls and policies",
      "Train employees on security best practices",
      "Stay current with threat landscape"
    ],
    requirements: [
      "4+ years of cybersecurity experience",
      "Security certifications (CISSP, CEH, etc.)",
      "Experience with SIEM tools and firewalls",
      "Knowledge of compliance frameworks",
      "Strong analytical and problem-solving skills"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance for you and family",
      "Certification reimbursement",
      "Flexible work hours",
      "Annual performance bonus"
    ],
    featured: false
  }
];

export const hiringProcess = [
  {
    step: 1,
    title: "Apply",
    description: "Submit your application with resume and cover letter. We review every application carefully.",
    duration: "1-2 days"
  },
  {
    step: 2,
    title: "Initial Screen",
    description: "A quick call with our recruiting team to discuss your background and the role.",
    duration: "30 mins"
  },
  {
    step: 3,
    title: "Technical Interview",
    description: "Deep dive into your skills with the hiring team. May include a coding exercise or case study.",
    duration: "1-2 hours"
  },
  {
    step: 4,
    title: "Culture Fit",
    description: "Meet the team and leadership to ensure mutual fit and discuss your career goals.",
    duration: "1 hour"
  },
  {
    step: 5,
    title: "Offer",
    description: "If it's a match, we'll extend an offer within 48 hours of your final interview.",
    duration: "48 hours"
  }
];

export const lifeAtCompany = [
  {
    id: 1,
    title: "Collaborative Workspace",
    description: "Modern offices designed for collaboration, focus, and creativity. Each location has dedicated spaces for team activities and quiet work.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  },
  {
    id: 2,
    title: "Learning Culture",
    description: "Regular tech talks, hackathons, and knowledge sharing sessions. We believe in continuous learning and growth.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80"
  },
  {
    id: 3,
    title: "Team Events",
    description: "Quarterly team outings, annual offsites, and celebrations that bring us together beyond work.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
  },
  {
    id: 4,
    title: "Work-Life Balance",
    description: "Flexible hours, generous PTO, and respect for personal time. We believe rested teams do their best work.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  }
];

export const companyValues = [
  "Customer Obsession",
  "Ownership",
  "Continuous Improvement",
  "Transparency",
  "Diversity & Inclusion"
];
