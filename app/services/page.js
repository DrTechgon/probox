'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/sections/Navbar';
import Services from '@/components/sections/Services';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';
import { Sparkles } from 'lucide-react';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3758159/pexels-photo-3758159.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Technology Services"
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlays for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
        </div>

        {/* Animated Visual Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [0, 30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/30 to-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
              x: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/25 to-purple-500/15 rounded-full blur-3xl"
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-teal-400/40 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Decorative lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <motion.line
              x1="10%" y1="20%" x2="30%" y2="80%"
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.line
              x1="70%" y1="10%" x2="90%" y2="70%"
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.6)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-1/3 right-[15%] w-32 h-32 border border-teal-500/20 rounded-2xl"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-[10%] w-24 h-24 border border-blue-500/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-teal-400 text-sm font-medium mb-6"
            >
              <Sparkles size={16} className="mr-2" />
              Our Services
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
            >
              End-to-End{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Technology
              </span>{' '}
              Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/70"
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
