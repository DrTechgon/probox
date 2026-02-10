// Extended service data for detail pages
// This provides comprehensive content for each service's dedicated page

export const servicesDetailData = {
  "artificial-intelligence": {
    // Hero Section
    hero: {
      headline: "Turn Data Into Decisions with AI That Delivers",
      subheadline: "Accelerate innovation, automate complex processes, and unlock predictive insights that drive measurable business outcomes.",
      primaryCta: "Talk to an AI Expert",
      secondaryCta: "View AI Case Studies"
    },
    
    // Problems We Solve
    problems: [
      {
        title: "Manual Process Overload",
        description: "Teams spending countless hours on repetitive tasks that could be automated with intelligent systems."
      },
      {
        title: "Data Silos & Blind Spots",
        description: "Valuable insights trapped in disconnected systems, preventing informed decision-making."
      },
      {
        title: "Reactive Decision Making",
        description: "Responding to problems after they occur instead of predicting and preventing them."
      },
      {
        title: "Scalability Constraints",
        description: "Human limitations creating bottlenecks in customer service, analysis, and operations."
      },
      {
        title: "Competitive Pressure",
        description: "Competitors leveraging AI for efficiency gains while you're still using legacy approaches."
      },
      {
        title: "Rising Customer Expectations",
        description: "Customers demanding instant, personalized experiences that traditional systems can't deliver."
      }
    ],
    
    // Capabilities/Solutions
    capabilities: [
      {
        title: "Predictive Analytics",
        description: "Forecast trends, customer behavior, and market shifts with ML models trained on your data.",
        icon: "TrendingUp"
      },
      {
        title: "Natural Language Processing",
        description: "Extract insights from text, enable conversational AI, and automate document processing.",
        icon: "MessageSquare"
      },
      {
        title: "Computer Vision",
        description: "Automate visual inspection, enable facial recognition, and process image/video at scale.",
        icon: "Eye"
      },
      {
        title: "Intelligent Automation",
        description: "Combine RPA with AI to handle complex, judgment-based tasks that simple bots can't.",
        icon: "Zap"
      },
      {
        title: "Recommendation Engines",
        description: "Personalize customer experiences with AI-driven product and content recommendations.",
        icon: "Sparkles"
      },
      {
        title: "AI Chatbots & Assistants",
        description: "Deploy 24/7 intelligent assistants that handle queries, resolve issues, and drive conversions.",
        icon: "Bot"
      }
    ],
    
    // Results/Proof
    results: [
      { metric: "60%", label: "Reduction in manual processing time" },
      { metric: "3.5x", label: "Improvement in prediction accuracy" },
      { metric: "45%", label: "Cost savings on customer support" },
      { metric: "90%", label: "Customer satisfaction score" }
    ],
    
    testimonial: {
      quote: "PROBOX's AI solution transformed our customer service. We went from 48-hour response times to instant resolution for 60% of queries.",
      author: "VP of Technology",
      company: "Leading E-commerce Platform",
      avatar: "VT"
    },
    
    // Process Steps
    process: [
      {
        step: 1,
        title: "Discovery & Assessment",
        description: "We analyze your data landscape, identify high-impact AI opportunities, and define success metrics."
      },
      {
        step: 2,
        title: "Strategy & Design",
        description: "Our team architects the optimal AI solution, selecting models and infrastructure aligned with your goals."
      },
      {
        step: 3,
        title: "Development & Training",
        description: "We build and train AI models using your data, with rigorous testing and validation cycles."
      },
      {
        step: 4,
        title: "Integration & Deployment",
        description: "Seamless deployment into your existing systems with monitoring and performance optimization."
      },
      {
        step: 5,
        title: "Continuous Improvement",
        description: "Ongoing model refinement, retraining, and expansion to maximize long-term value."
      }
    ],
    
    // Technologies
    technologies: [
      "TensorFlow", "PyTorch", "OpenAI", "Azure AI", "AWS SageMaker", 
      "Google Cloud AI", "Hugging Face", "LangChain", "Python", "MLflow"
    ],
    
    // Engagement Options
    engagementOptions: [
      {
        title: "AI Strategy Consulting",
        description: "Expert guidance on AI roadmap, use case prioritization, and ROI modeling.",
        features: ["2-4 week engagement", "Executive workshops", "Opportunity assessment", "Implementation roadmap"],
        highlighted: false
      },
      {
        title: "Custom AI Development",
        description: "End-to-end development of bespoke AI solutions tailored to your specific needs.",
        features: ["Dedicated AI team", "Full lifecycle support", "Custom model training", "Production deployment"],
        highlighted: true
      },
      {
        title: "AI Managed Services",
        description: "Ongoing management, monitoring, and optimization of your AI infrastructure.",
        features: ["24/7 monitoring", "Model retraining", "Performance optimization", "Scalability management"],
        highlighted: false
      }
    ],
    
    // FAQ
    faq: [
      {
        question: "How long does it take to implement an AI solution?",
        answer: "Implementation timelines vary based on complexity. A proof-of-concept can be delivered in 4-6 weeks, while full production deployments typically take 3-6 months. We follow an agile approach with regular milestones to demonstrate value early."
      },
      {
        question: "What kind of data do we need to get started?",
        answer: "The data requirements depend on your use case. We'll conduct a data readiness assessment during discovery. Generally, you need historical data relevant to your problem—we can work with various formats and help improve data quality as part of the engagement."
      },
      {
        question: "How do you ensure AI model accuracy and reliability?",
        answer: "We employ rigorous testing methodologies including cross-validation, A/B testing, and continuous monitoring. Our models include explainability features so you understand why decisions are made. We also implement human-in-the-loop processes for high-stakes decisions."
      },
      {
        question: "What's the typical ROI timeline for AI investments?",
        answer: "Most clients see measurable ROI within 6-12 months of deployment. During our discovery phase, we work with you to define clear KPIs and build a business case that projects expected returns based on similar implementations."
      },
      {
        question: "Do you provide ongoing support after deployment?",
        answer: "Yes, AI models require ongoing care. We offer managed services packages that include monitoring, retraining, and optimization. Our team proactively identifies opportunities to improve model performance and expand capabilities."
      }
    ],
    
    // Final CTA
    finalCta: {
      headline: "Ready to Transform Your Business with AI?",
      subtext: "Schedule a complimentary consultation to discuss your AI opportunities and get a customized implementation roadmap.",
      buttonText: "Schedule AI Consultation"
    }
  },
  
  "managed-it-services": {
    hero: {
      headline: "Focus on Growth. We'll Handle the Infrastructure.",
      subheadline: "Proactive IT management that ensures 99.99% uptime, reduces costs, and frees your team to innovate—not troubleshoot.",
      primaryCta: "Get a Free IT Assessment",
      secondaryCta: "View Success Stories"
    },
    
    problems: [
      {
        title: "Constant Firefighting",
        description: "IT teams stuck in reactive mode, addressing issues instead of driving strategic initiatives."
      },
      {
        title: "Unpredictable IT Costs",
        description: "Surprise expenses from emergency fixes, unplanned upgrades, and inefficient resource allocation."
      },
      {
        title: "Downtime & Productivity Loss",
        description: "System outages disrupting operations and costing thousands in lost productivity every hour."
      },
      {
        title: "Security Vulnerabilities",
        description: "Aging infrastructure and missed patches creating openings for cyber threats."
      },
      {
        title: "Talent Gaps",
        description: "Difficulty hiring and retaining specialized IT talent in a competitive market."
      },
      {
        title: "Technology Sprawl",
        description: "Disconnected systems and shadow IT creating complexity and compliance risks."
      }
    ],
    
    capabilities: [
      {
        title: "24/7 Infrastructure Monitoring",
        description: "Real-time visibility into your entire IT estate with AI-powered anomaly detection.",
        icon: "Monitor"
      },
      {
        title: "Proactive Maintenance",
        description: "Predictive maintenance that prevents issues before they impact operations.",
        icon: "Wrench"
      },
      {
        title: "Help Desk & Support",
        description: "Multi-tier support with rapid response times and high first-call resolution rates.",
        icon: "Headphones"
      },
      {
        title: "IT Asset Management",
        description: "Complete lifecycle management of hardware and software assets.",
        icon: "Package"
      },
      {
        title: "Vendor Management",
        description: "Single point of contact for all your technology vendors and service providers.",
        icon: "Users"
      },
      {
        title: "Strategic IT Planning",
        description: "Technology roadmaps aligned with your business objectives and growth plans.",
        icon: "Map"
      }
    ],
    
    results: [
      { metric: "99.99%", label: "Average uptime achieved" },
      { metric: "40%", label: "Reduction in IT operational costs" },
      { metric: "< 15min", label: "Average incident response time" },
      { metric: "85%", label: "First-call resolution rate" }
    ],
    
    testimonial: {
      quote: "Since partnering with PROBOX, our IT issues have dropped by 70%. We finally have time to focus on projects that move the business forward.",
      author: "CTO",
      company: "Mid-Market Manufacturing Firm",
      avatar: "CT"
    },
    
    process: [
      {
        step: 1,
        title: "IT Assessment",
        description: "Comprehensive audit of your current infrastructure, identifying risks and opportunities."
      },
      {
        step: 2,
        title: "Solution Design",
        description: "Custom service plan tailored to your environment, SLAs, and budget requirements."
      },
      {
        step: 3,
        title: "Onboarding & Transition",
        description: "Seamless transition with knowledge transfer and documentation of all systems."
      },
      {
        step: 4,
        title: "Active Management",
        description: "Ongoing monitoring, maintenance, and optimization of your IT environment."
      },
      {
        step: 5,
        title: "Continuous Reporting",
        description: "Regular reviews with actionable insights and recommendations for improvement."
      }
    ],
    
    technologies: [
      "ServiceNow", "Azure", "AWS", "VMware", "Cisco", "Microsoft 365",
      "Splunk", "PagerDuty", "Terraform", "Ansible"
    ],
    
    engagementOptions: [
      {
        title: "Essential Support",
        description: "Core monitoring and help desk services for small to mid-sized businesses.",
        features: ["Business hours support", "Remote monitoring", "Monthly reporting", "Patch management"],
        highlighted: false
      },
      {
        title: "Comprehensive Management",
        description: "Full-service IT management with proactive optimization and strategic planning.",
        features: ["24/7 support", "Dedicated account team", "Quarterly business reviews", "Strategic roadmap"],
        highlighted: true
      },
      {
        title: "Enterprise Partnership",
        description: "White-glove service for complex, multi-location enterprise environments.",
        features: ["On-site resources", "Custom SLAs", "Executive sponsorship", "Innovation workshops"],
        highlighted: false
      }
    ],
    
    faq: [
      {
        question: "How does the transition process work?",
        answer: "We follow a structured 30-60-90 day onboarding plan. During the first 30 days, we document and learn your environment. Days 30-60 focus on parallel operations and knowledge transfer. By day 90, we're fully operational with continuous improvement processes in place."
      },
      {
        question: "Will we lose control over our IT decisions?",
        answer: "Absolutely not. We operate as an extension of your team, not a replacement. You maintain full visibility and control over strategic decisions. Our role is to provide expertise, handle day-to-day operations, and make recommendations—final decisions are always yours."
      },
      {
        question: "What's included in your SLAs?",
        answer: "Our SLAs cover response times, resolution targets, and uptime guarantees. Standard SLAs include 15-minute critical response, 99.9% uptime, and 4-hour resolution for high-priority issues. Enterprise clients can negotiate custom SLAs aligned with their specific needs."
      },
      {
        question: "How do you handle after-hours emergencies?",
        answer: "Our 24/7 Network Operations Center monitors your infrastructure around the clock. Critical alerts are escalated immediately to on-call engineers who can begin troubleshooting within minutes. You'll also have direct access to escalation paths for urgent situations."
      },
      {
        question: "Can you work with our existing vendors?",
        answer: "Yes, vendor management is one of our core services. We'll coordinate with your existing vendors, manage contracts and renewals, and serve as a single point of contact. This reduces your administrative burden while ensuring consistent service delivery."
      }
    ],
    
    finalCta: {
      headline: "Ready for IT That Just Works?",
      subtext: "Get a free assessment of your current IT environment and discover opportunities to improve reliability while reducing costs.",
      buttonText: "Request Free Assessment"
    }
  },
  
  "cyber-security": {
    hero: {
      headline: "Protect What Matters. Defend What's Yours.",
      subheadline: "Enterprise-grade cybersecurity that shields your business from evolving threats while enabling digital confidence.",
      primaryCta: "Get a Security Assessment",
      secondaryCta: "View Security Case Studies"
    },
    
    problems: [
      {
        title: "Evolving Threat Landscape",
        description: "Sophisticated attacks that bypass traditional security measures and exploit new vulnerabilities."
      },
      {
        title: "Compliance Complexity",
        description: "Navigating GDPR, HIPAA, PCI-DSS, and industry regulations with limited resources."
      },
      {
        title: "Alert Fatigue",
        description: "Security teams overwhelmed by false positives, missing real threats in the noise."
      },
      {
        title: "Skills Shortage",
        description: "Difficulty finding and retaining cybersecurity talent in a highly competitive market."
      },
      {
        title: "Shadow IT & Cloud Risks",
        description: "Unmanaged applications and cloud services creating blind spots in your security posture."
      },
      {
        title: "Incident Response Gaps",
        description: "No clear playbook when breaches occur, leading to costly delays and damage."
      }
    ],
    
    capabilities: [
      {
        title: "Threat Detection & Response",
        description: "AI-powered monitoring that identifies and neutralizes threats in real-time.",
        icon: "ShieldAlert"
      },
      {
        title: "Vulnerability Management",
        description: "Continuous scanning and prioritized remediation of security weaknesses.",
        icon: "Search"
      },
      {
        title: "Security Operations Center",
        description: "24/7 SOC staffed by certified analysts monitoring your environment.",
        icon: "Radio"
      },
      {
        title: "Identity & Access Management",
        description: "Zero-trust architecture ensuring the right people have the right access.",
        icon: "Fingerprint"
      },
      {
        title: "Compliance & Governance",
        description: "Frameworks and controls that meet regulatory requirements and audit demands.",
        icon: "FileCheck"
      },
      {
        title: "Security Awareness Training",
        description: "Programs that transform employees from vulnerabilities into your first line of defense.",
        icon: "GraduationCap"
      }
    ],
    
    results: [
      { metric: "0", label: "Breaches for protected clients" },
      { metric: "< 5min", label: "Average threat detection time" },
      { metric: "100%", label: "Compliance audit pass rate" },
      { metric: "70%", label: "Reduction in security incidents" }
    ],
    
    testimonial: {
      quote: "PROBOX's security team identified vulnerabilities our previous vendor missed. Their SOC has stopped multiple attacks that could have been catastrophic.",
      author: "CISO",
      company: "Regional Healthcare Network",
      avatar: "CI"
    },
    
    process: [
      {
        step: 1,
        title: "Security Assessment",
        description: "Comprehensive evaluation of your current security posture, gaps, and risks."
      },
      {
        step: 2,
        title: "Strategy Development",
        description: "Risk-based security roadmap aligned with your business priorities and compliance needs."
      },
      {
        step: 3,
        title: "Implementation",
        description: "Deployment of security controls, tools, and processes with minimal disruption."
      },
      {
        step: 4,
        title: "Active Defense",
        description: "Continuous monitoring, threat hunting, and incident response by our SOC team."
      },
      {
        step: 5,
        title: "Maturity Evolution",
        description: "Regular assessments and enhancements to stay ahead of emerging threats."
      }
    ],
    
    technologies: [
      "CrowdStrike", "Splunk", "Palo Alto", "Okta", "Microsoft Defender",
      "Qualys", "Tenable", "KnowBe4", "Varonis", "Zscaler"
    ],
    
    engagementOptions: [
      {
        title: "Security Assessment",
        description: "Point-in-time evaluation to understand your current security posture and risks.",
        features: ["Vulnerability scan", "Penetration testing", "Risk report", "Remediation roadmap"],
        highlighted: false
      },
      {
        title: "Managed Security Services",
        description: "Comprehensive, ongoing security operations and threat management.",
        features: ["24/7 SOC monitoring", "Incident response", "Threat intelligence", "Compliance support"],
        highlighted: true
      },
      {
        title: "Virtual CISO",
        description: "Executive-level security leadership and strategy on a fractional basis.",
        features: ["Security strategy", "Board reporting", "Vendor management", "Policy development"],
        highlighted: false
      }
    ],
    
    faq: [
      {
        question: "How quickly can you detect and respond to threats?",
        answer: "Our SOC operates 24/7 with average detection times under 5 minutes for known threat patterns. For critical incidents, we initiate response within 15 minutes. Our automated playbooks handle common threats instantly while analysts focus on sophisticated attacks."
      },
      {
        question: "What compliance frameworks do you support?",
        answer: "We have expertise across major frameworks including GDPR, HIPAA, PCI-DSS, SOC 2, ISO 27001, NIST, and industry-specific regulations. Our team includes certified compliance specialists who can guide you through audits and maintain continuous compliance."
      },
      {
        question: "How do you handle a security incident?",
        answer: "We follow established incident response procedures: Identify, Contain, Eradicate, Recover, and Learn. You'll have a dedicated incident commander who coordinates response, communicates with stakeholders, and ensures minimal business impact. Post-incident, we provide detailed analysis and recommendations."
      },
      {
        question: "What makes your SOC different from others?",
        answer: "Our SOC combines AI-powered detection with human expertise. We don't just monitor alerts—we actively hunt for threats and understand your specific business context. Our analysts are certified professionals who investigate thoroughly rather than just escalating tickets."
      },
      {
        question: "Do you provide security awareness training?",
        answer: "Yes, we offer comprehensive training programs including simulated phishing, interactive modules, and role-specific training. Our goal is to create a security-conscious culture where employees become active defenders rather than weak links."
      }
    ],
    
    finalCta: {
      headline: "Don't Wait for a Breach to Take Security Seriously",
      subtext: "Get a comprehensive security assessment and understand your risk posture before attackers do.",
      buttonText: "Schedule Security Assessment"
    }
  },
  
  "iiot": {
    hero: {
      headline: "Connect Your Industrial Operations. Unlock Hidden Value.",
      subheadline: "Industrial IoT solutions that transform machines into intelligent assets, enabling predictive maintenance and operational excellence.",
      primaryCta: "Explore IIoT Solutions",
      secondaryCta: "See Manufacturing Case Studies"
    },
    
    problems: [
      {
        title: "Unplanned Downtime",
        description: "Equipment failures causing costly production stops and missed delivery deadlines."
      },
      {
        title: "Operational Blind Spots",
        description: "Limited visibility into equipment performance, utilization, and efficiency."
      },
      {
        title: "Reactive Maintenance",
        description: "Fixing problems after they occur instead of preventing them proactively."
      },
      {
        title: "Quality Variability",
        description: "Inconsistent product quality due to undetected process variations."
      },
      {
        title: "Energy Waste",
        description: "Inefficient energy consumption without the data to identify optimization opportunities."
      },
      {
        title: "Legacy System Integration",
        description: "Old equipment and systems that don't communicate with modern platforms."
      }
    ],
    
    capabilities: [
      {
        title: "Predictive Maintenance",
        description: "ML algorithms that predict equipment failures before they happen, reducing downtime by up to 50%.",
        icon: "Activity"
      },
      {
        title: "Real-time Monitoring",
        description: "Live dashboards providing instant visibility into operations across all facilities.",
        icon: "Monitor"
      },
      {
        title: "Asset Tracking",
        description: "GPS and RFID-based tracking of equipment, inventory, and materials.",
        icon: "MapPin"
      },
      {
        title: "Process Automation",
        description: "Automated workflows triggered by sensor data and predefined conditions.",
        icon: "Workflow"
      },
      {
        title: "Energy Management",
        description: "Monitoring and optimization of energy consumption across operations.",
        icon: "Gauge"
      },
      {
        title: "Quality Analytics",
        description: "Statistical process control and quality prediction using sensor data.",
        icon: "CheckCircle"
      }
    ],
    
    results: [
      { metric: "50%", label: "Reduction in unplanned downtime" },
      { metric: "30%", label: "Improvement in OEE" },
      { metric: "25%", label: "Energy cost savings" },
      { metric: "40%", label: "Maintenance cost reduction" }
    ],
    
    testimonial: {
      quote: "The predictive maintenance system has eliminated surprise breakdowns. We've extended equipment life by 2 years and cut maintenance costs significantly.",
      author: "Plant Director",
      company: "Automotive Parts Manufacturer",
      avatar: "PD"
    },
    
    process: [
      {
        step: 1,
        title: "Site Assessment",
        description: "Evaluation of existing equipment, connectivity, and data infrastructure."
      },
      {
        step: 2,
        title: "Use Case Prioritization",
        description: "Identification of high-impact IIoT applications based on ROI and feasibility."
      },
      {
        step: 3,
        title: "Pilot Implementation",
        description: "Proof-of-concept deployment on select equipment to demonstrate value."
      },
      {
        step: 4,
        title: "Scale & Integrate",
        description: "Expansion across facilities with integration to existing systems."
      },
      {
        step: 5,
        title: "Optimize & Evolve",
        description: "Continuous improvement of models and expansion to new use cases."
      }
    ],
    
    technologies: [
      "Azure IoT Hub", "AWS IoT Core", "OSIsoft PI", "Kepware", "MQTT",
      "InfluxDB", "Grafana", "Edge Computing", "OPC-UA", "Siemens MindSphere"
    ],
    
    engagementOptions: [
      {
        title: "IIoT Assessment",
        description: "Evaluate your readiness and identify the best opportunities for connected operations.",
        features: ["Site evaluation", "Use case analysis", "ROI modeling", "Technology recommendations"],
        highlighted: false
      },
      {
        title: "Pilot Program",
        description: "Prove value quickly with a focused implementation on critical equipment.",
        features: ["Single line/area focus", "3-month timeline", "Full analytics stack", "Success metrics"],
        highlighted: true
      },
      {
        title: "Enterprise Deployment",
        description: "Full-scale IIoT transformation across your entire operation.",
        features: ["Multi-site rollout", "Enterprise integration", "Change management", "Ongoing optimization"],
        highlighted: false
      }
    ],
    
    faq: [
      {
        question: "Can you connect our legacy equipment?",
        answer: "Yes, we specialize in brownfield deployments. Using industrial IoT gateways and protocols like OPC-UA, we can extract data from virtually any equipment—even decades-old machines. We've connected equipment from the 1970s to modern cloud platforms."
      },
      {
        question: "How long until we see ROI from IIoT?",
        answer: "Our pilot programs are designed to demonstrate ROI within 90 days. Predictive maintenance often shows returns within the first prevented failure. Enterprise deployments typically achieve full payback within 12-18 months."
      },
      {
        question: "What about data security and OT/IT convergence?",
        answer: "Security is built into our architecture. We implement network segmentation, encrypted communications, and follow IEC 62443 standards. Our solutions bridge OT and IT safely, with appropriate security controls at every layer."
      },
      {
        question: "Do we need to replace existing systems?",
        answer: "No, our approach is integration-first. We connect to your existing historians, SCADA, ERP, and MES systems. Our platform acts as a data layer that enhances rather than replaces your current investments."
      },
      {
        question: "How do you handle data at edge locations?",
        answer: "We deploy edge computing where needed—processing data locally for real-time decisions while sending relevant data to the cloud for advanced analytics. This reduces bandwidth costs and enables operation even during connectivity issues."
      }
    ],
    
    finalCta: {
      headline: "Ready to Build Your Connected Factory?",
      subtext: "Start with a no-obligation assessment of your IIoT opportunities and a customized roadmap to operational excellence.",
      buttonText: "Request IIoT Assessment"
    }
  },
  
  "network-management": {
    hero: {
      headline: "Networks That Perform. Connectivity You Can Count On.",
      subheadline: "Enterprise network solutions engineered for reliability, security, and the performance your business demands.",
      primaryCta: "Get Network Assessment",
      secondaryCta: "View Network Solutions"
    },
    
    problems: [
      {
        title: "Performance Bottlenecks",
        description: "Slow applications and frustrated users due to network congestion and poor design."
      },
      {
        title: "Network Outages",
        description: "Unexpected downtime disrupting business operations and customer experience."
      },
      {
        title: "Security Gaps",
        description: "Network vulnerabilities exposing the organization to breaches and data loss."
      },
      {
        title: "Complexity Overload",
        description: "Sprawling network infrastructure that's difficult to manage and troubleshoot."
      },
      {
        title: "Limited Visibility",
        description: "Inability to see what's happening on the network until problems arise."
      },
      {
        title: "Scaling Challenges",
        description: "Network infrastructure unable to keep pace with business growth and new demands."
      }
    ],
    
    capabilities: [
      {
        title: "Network Design & Architecture",
        description: "Enterprise-grade network designs that scale with your business needs.",
        icon: "Layout"
      },
      {
        title: "Performance Monitoring",
        description: "24/7 visibility into network health with proactive alerting and analytics.",
        icon: "BarChart"
      },
      {
        title: "SD-WAN Solutions",
        description: "Modern WAN architecture that optimizes connectivity and reduces costs.",
        icon: "Globe"
      },
      {
        title: "Network Security",
        description: "Defense-in-depth approach with firewalls, segmentation, and threat detection.",
        icon: "Shield"
      },
      {
        title: "Wireless Solutions",
        description: "Enterprise WiFi and mobility solutions for the modern workplace.",
        icon: "Wifi"
      },
      {
        title: "Cloud Connectivity",
        description: "Secure, high-performance connections to cloud services and providers.",
        icon: "Cloud"
      }
    ],
    
    results: [
      { metric: "99.99%", label: "Network uptime achieved" },
      { metric: "60%", label: "Reduction in network incidents" },
      { metric: "40%", label: "WAN cost savings with SD-WAN" },
      { metric: "3x", label: "Improvement in application performance" }
    ],
    
    testimonial: {
      quote: "Our network transformation with PROBOX eliminated the connectivity issues that plagued us for years. Performance is consistently excellent across all locations.",
      author: "IT Director",
      company: "National Retail Chain",
      avatar: "IT"
    },
    
    process: [
      {
        step: 1,
        title: "Network Assessment",
        description: "Comprehensive analysis of your current network infrastructure and performance."
      },
      {
        step: 2,
        title: "Architecture Design",
        description: "Future-proof network design aligned with business requirements and growth plans."
      },
      {
        step: 3,
        title: "Implementation",
        description: "Phased deployment with minimal disruption to ongoing operations."
      },
      {
        step: 4,
        title: "Optimization",
        description: "Fine-tuning and validation to ensure optimal performance."
      },
      {
        step: 5,
        title: "Managed Operations",
        description: "Ongoing monitoring, maintenance, and continuous improvement."
      }
    ],
    
    technologies: [
      "Cisco", "Palo Alto", "Fortinet", "Aruba", "Meraki", 
      "VMware NSX", "AWS Direct Connect", "Azure ExpressRoute", "Zscaler", "ThousandEyes"
    ],
    
    engagementOptions: [
      {
        title: "Network Assessment",
        description: "Comprehensive evaluation of your network with actionable recommendations.",
        features: ["Performance analysis", "Security review", "Capacity planning", "Optimization roadmap"],
        highlighted: false
      },
      {
        title: "Network Transformation",
        description: "End-to-end network redesign and implementation for modern requirements.",
        features: ["Architecture design", "Full implementation", "Migration support", "Staff training"],
        highlighted: true
      },
      {
        title: "Managed Network Services",
        description: "Ongoing management and optimization of your network infrastructure.",
        features: ["24/7 monitoring", "Incident management", "Change management", "Capacity management"],
        highlighted: false
      }
    ],
    
    faq: [
      {
        question: "How do you minimize disruption during network upgrades?",
        answer: "We follow a phased approach with changes implemented during maintenance windows. For critical systems, we deploy parallel infrastructure before cutover. Our change management process includes rollback plans and extensive testing."
      },
      {
        question: "Should we consider SD-WAN for our organization?",
        answer: "SD-WAN is ideal for organizations with multiple locations, cloud-heavy workloads, or high MPLS costs. During assessment, we'll analyze your specific needs and provide a cost-benefit analysis comparing SD-WAN to traditional WAN approaches."
      },
      {
        question: "How do you ensure network security?",
        answer: "We implement defense-in-depth with next-gen firewalls, network segmentation, encrypted communications, and continuous monitoring. Our designs follow zero-trust principles and comply with industry security frameworks."
      },
      {
        question: "Can you manage networks across multiple locations?",
        answer: "Yes, we manage networks for clients with hundreds of locations globally. Our centralized NOC provides consistent monitoring and management regardless of location. We also support hybrid environments with both on-premise and cloud infrastructure."
      },
      {
        question: "What's included in network monitoring?",
        answer: "Our monitoring covers availability, performance, capacity, and security. We track bandwidth utilization, latency, packet loss, device health, and security events. You'll have access to real-time dashboards and receive proactive alerts before issues impact users."
      }
    ],
    
    finalCta: {
      headline: "Ready for a Network That Enables Your Business?",
      subtext: "Get a comprehensive network assessment and discover opportunities to improve performance, security, and reliability.",
      buttonText: "Schedule Network Assessment"
    }
  },
  
  "cloud-services": {
    hero: {
      headline: "Accelerate Innovation. Scale Without Limits.",
      subheadline: "Strategic cloud solutions that reduce costs, increase agility, and position your business for the future.",
      primaryCta: "Plan Your Cloud Journey",
      secondaryCta: "View Cloud Case Studies"
    },
    
    problems: [
      {
        title: "Infrastructure Limitations",
        description: "On-premise constraints limiting agility, scalability, and innovation speed."
      },
      {
        title: "Cloud Cost Overruns",
        description: "Unexpected cloud bills due to unoptimized resources and lack of governance."
      },
      {
        title: "Migration Complexity",
        description: "Uncertainty about what to move, how to move it, and in what order."
      },
      {
        title: "Skills Gap",
        description: "Teams lacking cloud-native expertise needed to maximize platform benefits."
      },
      {
        title: "Multi-Cloud Chaos",
        description: "Inconsistent practices across cloud providers creating management overhead."
      },
      {
        title: "Security Concerns",
        description: "Worries about data security, compliance, and shared responsibility models."
      }
    ],
    
    capabilities: [
      {
        title: "Cloud Migration",
        description: "Proven methodologies for migrating workloads with minimal risk and downtime.",
        icon: "ArrowUpRight"
      },
      {
        title: "Cloud Architecture",
        description: "Well-architected designs optimized for performance, security, and cost.",
        icon: "Layers"
      },
      {
        title: "Multi-Cloud Management",
        description: "Unified management across AWS, Azure, GCP, and hybrid environments.",
        icon: "Cloud"
      },
      {
        title: "Cost Optimization",
        description: "FinOps practices that reduce cloud spend while maintaining performance.",
        icon: "DollarSign"
      },
      {
        title: "DevOps & Automation",
        description: "CI/CD pipelines, infrastructure as code, and automated operations.",
        icon: "GitBranch"
      },
      {
        title: "Cloud Security",
        description: "Security controls, compliance frameworks, and governance for cloud environments.",
        icon: "Lock"
      }
    ],
    
    results: [
      { metric: "45%", label: "Average cloud cost reduction" },
      { metric: "10x", label: "Faster deployment cycles" },
      { metric: "99.99%", label: "Application availability" },
      { metric: "60%", label: "Reduction in time-to-market" }
    ],
    
    testimonial: {
      quote: "PROBOX helped us migrate 200+ applications to the cloud with zero downtime. Our infrastructure costs dropped 40% and we can now deploy in hours instead of weeks.",
      author: "VP of Engineering",
      company: "SaaS Technology Company",
      avatar: "VP"
    },
    
    process: [
      {
        step: 1,
        title: "Cloud Readiness Assessment",
        description: "Evaluate current state, identify workloads, and assess migration complexity."
      },
      {
        step: 2,
        title: "Strategy & Planning",
        description: "Define cloud strategy, target architecture, and migration roadmap."
      },
      {
        step: 3,
        title: "Migration & Modernization",
        description: "Execute migrations using proven methodologies with continuous validation."
      },
      {
        step: 4,
        title: "Optimization",
        description: "Right-size resources, implement automation, and optimize costs."
      },
      {
        step: 5,
        title: "Managed Cloud Services",
        description: "Ongoing management, monitoring, and continuous improvement."
      }
    ],
    
    technologies: [
      "AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Terraform",
      "Docker", "Jenkins", "GitLab", "Datadog", "CloudHealth"
    ],
    
    engagementOptions: [
      {
        title: "Cloud Assessment",
        description: "Understand your cloud readiness and build a business case for transformation.",
        features: ["Workload analysis", "TCO modeling", "Risk assessment", "Migration roadmap"],
        highlighted: false
      },
      {
        title: "Cloud Migration",
        description: "End-to-end migration services to move your workloads to the cloud.",
        features: ["Migration factory", "Application modernization", "Data migration", "Cutover support"],
        highlighted: true
      },
      {
        title: "Cloud Managed Services",
        description: "Ongoing management and optimization of your cloud environment.",
        features: ["24/7 operations", "Cost optimization", "Security management", "DevOps support"],
        highlighted: false
      }
    ],
    
    faq: [
      {
        question: "Which cloud provider should we choose?",
        answer: "The right choice depends on your specific needs. AWS offers the broadest services, Azure integrates well with Microsoft ecosystems, and GCP excels in data analytics. Many clients use multiple clouds strategically. We'll help you evaluate options based on workload requirements, existing investments, and team skills."
      },
      {
        question: "How do you ensure zero-downtime migrations?",
        answer: "We use proven migration patterns like blue-green deployments, database replication, and phased cutovers. Critical applications are migrated during maintenance windows with extensive testing and rollback procedures. Our migration factory approach has achieved zero-downtime migrations for hundreds of applications."
      },
      {
        question: "How can we control cloud costs?",
        answer: "We implement FinOps practices including right-sizing, reserved capacity planning, spot instance usage, and automated scaling. Our governance frameworks prevent cost surprises with budgets, alerts, and approval workflows. Clients typically see 30-45% cost reduction after optimization."
      },
      {
        question: "What about compliance in the cloud?",
        answer: "Major cloud providers offer compliance certifications for HIPAA, PCI-DSS, SOC 2, and more. We help you implement the controls needed to maintain compliance, including encryption, access management, logging, and audit trails. Our security frameworks map to your specific regulatory requirements."
      },
      {
        question: "Should we lift-and-shift or modernize applications?",
        answer: "It depends on the application. Some apps benefit from simple rehosting for quick wins, while others gain more from refactoring to cloud-native architectures. During assessment, we categorize your portfolio and recommend the right approach for each application based on business value and technical debt."
      }
    ],
    
    finalCta: {
      headline: "Ready to Unlock the Power of Cloud?",
      subtext: "Start with a cloud readiness assessment and get a customized roadmap for your transformation journey.",
      buttonText: "Start Cloud Assessment"
    }
  }
};

// Default data for services not yet fully defined
export const defaultServiceData = {
  hero: {
    headline: "Transform Your Business with Expert Solutions",
    subheadline: "Enterprise-grade services designed to drive efficiency, innovation, and measurable business outcomes.",
    primaryCta: "Talk to an Expert",
    secondaryCta: "View Case Studies"
  },
  problems: [
    {
      title: "Operational Inefficiency",
      description: "Manual processes and outdated systems slowing down your operations."
    },
    {
      title: "Scalability Challenges",
      description: "Infrastructure unable to support business growth and changing demands."
    },
    {
      title: "Security Concerns",
      description: "Evolving threats requiring constant vigilance and expertise."
    },
    {
      title: "Technical Debt",
      description: "Legacy systems creating maintenance burden and limiting innovation."
    },
    {
      title: "Skills Gaps",
      description: "Difficulty finding and retaining specialized technical talent."
    },
    {
      title: "Cost Pressures",
      description: "Need to deliver more value while optimizing technology investments."
    }
  ],
  results: [
    { metric: "40%", label: "Cost reduction achieved" },
    { metric: "99.9%", label: "System uptime delivered" },
    { metric: "3x", label: "Productivity improvement" },
    { metric: "90%", label: "Client satisfaction rate" }
  ],
  testimonial: {
    quote: "Working with PROBOX transformed our operations. Their expertise and dedication to our success exceeded our expectations.",
    author: "Technology Leader",
    company: "Enterprise Client",
    avatar: "TL"
  },
  process: [
    {
      step: 1,
      title: "Discovery",
      description: "Understanding your current state, challenges, and objectives."
    },
    {
      step: 2,
      title: "Strategy",
      description: "Developing a tailored approach aligned with your goals."
    },
    {
      step: 3,
      title: "Implementation",
      description: "Executing with precision and minimal business disruption."
    },
    {
      step: 4,
      title: "Optimization",
      description: "Fine-tuning for maximum performance and value."
    },
    {
      step: 5,
      title: "Support",
      description: "Ongoing partnership for continuous improvement."
    }
  ],
  engagementOptions: [
    {
      title: "Consulting",
      description: "Expert guidance and strategic planning for your initiatives.",
      features: ["Assessment", "Roadmap", "Best practices", "Recommendations"],
      highlighted: false
    },
    {
      title: "Implementation",
      description: "End-to-end delivery of solutions tailored to your needs.",
      features: ["Dedicated team", "Full lifecycle", "Knowledge transfer", "Documentation"],
      highlighted: true
    },
    {
      title: "Managed Services",
      description: "Ongoing management and optimization of your environment.",
      features: ["24/7 support", "Monitoring", "Maintenance", "Continuous improvement"],
      highlighted: false
    }
  ],
  faq: [
    {
      question: "How long does a typical engagement take?",
      answer: "Timelines vary based on scope and complexity. We'll provide a detailed timeline during our initial consultation, with most projects ranging from weeks to months depending on requirements."
    },
    {
      question: "How do you ensure project success?",
      answer: "We follow proven methodologies with clear milestones, regular communication, and defined success metrics. Our approach emphasizes early value delivery and continuous stakeholder engagement."
    },
    {
      question: "What makes PROBOX different?",
      answer: "We combine deep technical expertise with genuine partnership. Our team becomes an extension of yours, committed to your success beyond just project delivery."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer flexible support options from managed services to on-call expertise. Our goal is to ensure long-term success, not just successful handoff."
    },
    {
      question: "How do you handle knowledge transfer?",
      answer: "Knowledge transfer is built into every engagement. We document thoroughly, train your team, and ensure you have the skills and information to succeed independently."
    }
  ],
  finalCta: {
    headline: "Ready to Get Started?",
    subtext: "Schedule a consultation to discuss your needs and explore how we can help.",
    buttonText: "Schedule Consultation"
  }
};
