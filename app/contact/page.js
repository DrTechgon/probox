import Navbar from '@/components/sections/Navbar';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Contact Us | Probox Infotech',
  description: 'Get in touch with our team. We are ready to help you with your digital transformation journey.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Let's Build Something Great Together
            </h1>
            <p className="text-xl text-white/70">
              Have a project in mind? Our team is ready to help you bring your vision to life.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-slate-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.389!2d77.3677!3d28.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzAwLjEiTiA3N8KwMjInMDMuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </section>
      
      <Footer />
    </main>
  );
}
