// Probox Infotech - Site Data
// Centralized data for easy content management

export const companyInfo = {
  name: "Probox Infotech",
  tagline: "Empowering Digital Excellence",
  description: "We transform businesses through innovative technology solutions, driving growth and efficiency in the digital age.",
  founded: 2015,
  email: "info@proboxinfotech.com",
  phone: "+91 98765 43210",
  address: "123 Tech Park, Sector 62, Noida, UP 201301, India",
  social: {
    linkedin: "https://linkedin.com/company/proboxinfotech",
    twitter: "https://twitter.com/proboxinfotech",
    facebook: "https://facebook.com/proboxinfotech"
  }
};

export const services = [
  {
    id: "web-development",
    title: "Web Development",
    shortDescription: "Custom web applications built with modern frameworks and technologies.",
    fullDescription: "We design and develop responsive, scalable web applications using cutting-edge technologies like React, Next.js, Node.js, and cloud-native architectures. Our solutions are tailored to your business needs, ensuring optimal performance and user experience.",
    icon: "Globe",
    features: [
      "Custom Web Applications",
      "Progressive Web Apps (PWA)",
      "E-commerce Solutions",
      "Content Management Systems",
      "API Development & Integration"
    ],
    category: "development"
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    shortDescription: "Native and cross-platform mobile solutions for iOS and Android.",
    fullDescription: "Create powerful mobile experiences with our expert mobile development team. We build native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter, delivering seamless user experiences across all devices.",
    icon: "Smartphone",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Solutions",
      "App Store Optimization",
      "Maintenance & Support"
    ],
    category: "development"
  },
  {
    id: "cloud-services",
    title: "Cloud Solutions",
    shortDescription: "Scalable cloud infrastructure and migration services.",
    fullDescription: "Leverage the power of cloud computing with our comprehensive cloud services. From AWS, Azure, and GCP deployments to cloud-native development and migration strategies, we help you build resilient, cost-effective infrastructure.",
    icon: "Cloud",
    features: [
      "Cloud Migration",
      "Infrastructure as Code",
      "Serverless Architecture",
      "DevOps & CI/CD",
      "Cost Optimization"
    ],
    category: "infrastructure"
  },
  {
    id: "data-analytics",
    title: "Data Analytics & AI",
    shortDescription: "Transform data into actionable insights with advanced analytics.",
    fullDescription: "Unlock the potential of your data with our analytics and AI solutions. We implement data pipelines, business intelligence dashboards, machine learning models, and predictive analytics to drive data-informed decisions.",
    icon: "BarChart3",
    features: [
      "Business Intelligence",
      "Machine Learning Solutions",
      "Predictive Analytics",
      "Data Visualization",
      "ETL Pipeline Development"
    ],
    category: "data"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    shortDescription: "Comprehensive security solutions to protect your digital assets.",
    fullDescription: "Protect your business with our end-to-end cybersecurity services. We provide security assessments, penetration testing, compliance consulting, and managed security services to safeguard your critical infrastructure.",
    icon: "Shield",
    features: [
      "Security Assessments",
      "Penetration Testing",
      "Compliance & Governance",
      "Incident Response",
      "Security Monitoring"
    ],
    category: "security"
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    shortDescription: "Strategic technology consulting for digital transformation.",
    fullDescription: "Navigate your digital transformation journey with expert guidance. Our consultants help you develop technology roadmaps, optimize IT operations, and implement best practices that align technology investments with business goals.",
    icon: "Lightbulb",
    features: [
      "Digital Strategy",
      "Technology Roadmapping",
      "Process Optimization",
      "Vendor Selection",
      "Change Management"
    ],
    category: "consulting"
  }
];

export const caseStudies = [
  {
    id: "fintech-platform",
    title: "Digital Banking Platform",
    client: "Leading Financial Services Firm",
    category: "Web",
    description: "Built a comprehensive digital banking platform serving 2M+ customers with real-time transactions, advanced security, and seamless UX.",
    results: [
      "40% increase in customer engagement",
      "60% reduction in transaction time",
      "99.99% uptime achieved"
    ],
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1580982330720-bd5e0fed108b",
    featured: true
  },
  {
    id: "healthcare-app",
    title: "Telemedicine Mobile App",
    client: "Healthcare Network",
    category: "Mobile",
    description: "Developed a HIPAA-compliant telemedicine app enabling virtual consultations, prescription management, and health monitoring.",
    results: [
      "500K+ app downloads",
      "4.8 star rating",
      "30% reduction in missed appointments"
    ],
    technologies: ["React Native", "Firebase", "WebRTC", "HL7 FHIR"],
    image: "https://images.pexels.com/photos/3205403/pexels-photo-3205403.jpeg",
    featured: true
  },
  {
    id: "cloud-migration",
    title: "Enterprise Cloud Migration",
    client: "Manufacturing Conglomerate",
    category: "Cloud",
    description: "Migrated legacy infrastructure to AWS, implementing microservices architecture and achieving significant cost savings.",
    results: [
      "45% reduction in infrastructure costs",
      "3x improvement in deployment speed",
      "Zero downtime migration"
    ],
    technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
    image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg",
    featured: true
  },
  {
    id: "retail-analytics",
    title: "Retail Analytics Platform",
    client: "Major Retail Chain",
    category: "Data",
    description: "Implemented real-time analytics dashboard providing insights into sales, inventory, and customer behavior across 500+ stores.",
    results: [
      "25% improvement in inventory turnover",
      "15% increase in sales",
      "Real-time reporting achieved"
    ],
    technologies: ["Python", "Spark", "Tableau", "Snowflake"],
    image: "https://images.unsplash.com/photo-1580983558189-84200466afb8",
    featured: false
  },
  {
    id: "security-overhaul",
    title: "Security Infrastructure Overhaul",
    client: "Government Agency",
    category: "Security",
    description: "Comprehensive security assessment and implementation of zero-trust architecture protecting critical government systems.",
    results: [
      "100% compliance achieved",
      "Zero security incidents post-implementation",
      "50% reduction in vulnerability exposure"
    ],
    technologies: ["Okta", "CrowdStrike", "Splunk", "HashiCorp Vault"],
    image: "https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg",
    featured: false
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Transformation",
    client: "Fashion Retailer",
    category: "Web",
    description: "Built a headless e-commerce platform with personalization engine, increasing conversion rates significantly.",
    results: [
      "80% increase in conversion rate",
      "3x growth in mobile revenue",
      "Sub-second page loads"
    ],
    technologies: ["Next.js", "Shopify", "Algolia", "Contentful"],
    image: "https://images.unsplash.com/photo-1580983553600-c49a1d083f54",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "CTO",
    company: "FinServe Technologies",
    content: "Probox Infotech transformed our digital infrastructure completely. Their expertise in cloud architecture and their commitment to delivery timelines exceeded our expectations. The team's technical depth is truly impressive.",
    avatar: "RK",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "VP of Engineering",
    company: "HealthFirst India",
    content: "Working with Probox was a game-changer for our telemedicine initiative. They understood healthcare compliance requirements and delivered a secure, user-friendly solution that our patients love.",
    avatar: "PS",
    rating: 5
  },
  {
    id: 3,
    name: "Anil Mehta",
    role: "Director of IT",
    company: "RetailMax Group",
    content: "The analytics platform built by Probox has revolutionized how we make decisions. Real-time insights across our retail chain have improved our operational efficiency significantly.",
    avatar: "AM",
    rating: 5
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "CEO",
    company: "StartupHub Ventures",
    content: "As a startup, we needed a technology partner who could move fast without compromising quality. Probox delivered our MVP in record time and has been instrumental in our growth journey.",
    avatar: "SP",
    rating: 5
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Head of Digital",
    company: "ManufacturePro Ltd",
    content: "The cloud migration project was executed flawlessly. Zero downtime during transition and significant cost savings within the first quarter. Highly recommend their expertise.",
    avatar: "VS",
    rating: 5
  }
];

export const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" }
];

export const whyChooseUs = [
  {
    title: "Expert Team",
    description: "Our team comprises certified professionals with deep expertise across technologies and industries.",
    icon: "Users"
  },
  {
    title: "Proven Track Record",
    description: "500+ successful projects delivered with consistent quality and on-time delivery.",
    icon: "Award"
  },
  {
    title: "Cutting-Edge Technology",
    description: "We stay ahead of the curve, implementing the latest technologies and best practices.",
    icon: "Zap"
  },
  {
    title: "Client-Centric Approach",
    description: "Your success is our priority. We work as an extension of your team.",
    icon: "Heart"
  },
  {
    title: "Agile Methodology",
    description: "Flexible, iterative development ensuring transparency and rapid delivery.",
    icon: "RefreshCw"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock support and maintenance to keep your systems running smoothly.",
    icon: "Headphones"
  }
];

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export const caseStudyCategories = ["All", "Web", "Mobile", "Cloud", "Data", "Security"];
