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

// Keywords and responses
const responsePatterns = [
  {
    keywords: ['career', 'job', 'hiring', 'work', 'position', 'openings', 'vacancy', 'employ', 'join'],
    response: `We're always looking for talented individuals to join our team! 🚀

**Current Opportunities:**
- Engineering roles (Frontend, Backend, DevOps)
- Product & Design positions
- Sales & Marketing roles
- And more...

You can explore all open positions and apply directly on our [Careers page](/careers).

**What makes PROBOX a great place to work:**
- Flexible hybrid work culture
- Competitive compensation
- Learning & growth opportunities
- Work with cutting-edge technologies

Would you like me to tell you more about any specific role or department?`
  },
  {
    keywords: ['contact', 'support', 'help', 'reach', 'email', 'phone', 'call', 'talk'],
    response: `I'd be happy to help you get in touch with our team! 📞

**Contact Options:**

**Email:** info@proboxinfotech.com
**Address:** Mumbai, India

You can also fill out the form on our [Contact page](/contact) and our team will get back to you within 24 hours.

**Business Hours:**
Monday - Friday: 9:00 AM - 6:00 PM IST

Is there something specific I can help you with right now?`
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
    keywords: ['service', 'offer', 'provide', 'solution', 'what do you do', 'about'],
    response: `PROBOX Infotech is a leading IT services company providing enterprise-grade solutions. Here's what we offer: 🎯

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

Which area interests you the most?`
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'automation'],
    response: `AI and Machine Learning are some of our strongest capabilities! 🤖

**Our AI Solutions Include:**

- **Predictive Analytics** - Forecast trends and customer behavior
- **Natural Language Processing** - Chatbots, document processing, sentiment analysis
- **Computer Vision** - Image recognition, quality inspection, facial recognition
- **Intelligent Automation** - Combine RPA with AI for complex tasks
- **Recommendation Engines** - Personalized customer experiences

We've helped enterprises achieve:
- 60% reduction in manual processing
- 3.5x improvement in prediction accuracy
- 45% cost savings on customer support

Would you like to learn about a specific AI use case or discuss your requirements?`
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
    response: `Cloud transformation is one of our specialties! ☁️

**Our Cloud Services:**

- **Cloud Migration** - Move workloads safely with minimal downtime
- **Cloud Architecture** - Well-architected designs for performance & cost
- **Multi-Cloud Management** - AWS, Azure, GCP expertise
- **Cost Optimization** - FinOps practices to reduce cloud spend
- **DevOps & Automation** - CI/CD pipelines, Infrastructure as Code

**Results We Deliver:**
- 45% average cloud cost reduction
- 10x faster deployment cycles
- 99.99% application availability

Ready to start your cloud journey? Visit our [Cloud Services page](/services/cloud-services)!`
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
 * Find the best matching response based on keywords
 */
function findResponse(message) {
  const lowerMessage = message.toLowerCase();
  
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
