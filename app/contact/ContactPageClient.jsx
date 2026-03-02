'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/sections/Navbar';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';
import ContactHeroBg from '@/components/backgrounds/ContactHeroBg';
import { Sparkles } from 'lucide-react';

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <ContactHeroBg />
        <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-orange-400 text-sm font-medium mb-8"
            >
              <Sparkles size={16} className="mr-2" />
              Contact Us
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                Great
              </span>{' '}
              Together
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Have a project in mind? Our team is ready to help you bring your vision to life.
            </motion.p>
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
          src="https://www.google.com/maps?q=19.081662280942023,72.89347689999998(Vytara Location)&z=15&output=embed"
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
