'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/sections/Navbar';
import Services from '@/components/sections/Services';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';
import CircuitNetworkBg from '@/components/backgrounds/CircuitNetworkBg';
import { Sparkles } from 'lucide-react';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <CircuitNetworkBg />

        {/* Content */}
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
              Our Services
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              End-to-End{' '}
              <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                Technology
              </span>{' '}
              Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              From strategy to execution, we provide comprehensive IT services 
              tailored to drive your business forward.
            </motion.p>
          </div>
        </div>
      </section>
      
      <Services showAll={true} />
      <CTABanner />
      <Footer />
    </main>
  );
}
