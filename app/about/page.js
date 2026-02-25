'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/sections/Navbar';
import Stats from '@/components/sections/Stats';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';
import { companyInfo, awards } from '@/data/site-data';
import { Target, Eye, Award, Users, Globe, Lightbulb, MapPin, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, delivering quality solutions that exceed expectations.'
  },
  {
    icon: Users,
    title: 'People First',
    description: 'Best Company to Work For 2022-2023 - we believe in putting our people first in all that we do.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously explore new technologies and approaches to solve complex business challenges.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'With 810+ support locations, we deliver enterprise-grade IT services worldwide.'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB0ZWFtfGVufDB8fHx8MTc3MjAwMTYwMXww&ixlib=rb-4.1.0&q=85"
            alt="Professional Team"
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
              stroke="url(#lineGradient3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.line
              x1="70%" y1="10%" x2="90%" y2="70%"
              stroke="url(#lineGradient3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <defs>
              <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
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
              About Us
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
            >
              We Are{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                PROBOX
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/70"
            >
              India's Most Trusted and Fastest Growing Fast Forward Technology, Consulting and Outsourcing Company.
            </motion.p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Award-Winning Technology Partner
              </h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {companyInfo.aboutDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                {awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full border border-teal-100">
                    <Award className="w-4 h-4 text-teal-600" />
                    <span className="text-slate-700 text-sm font-medium">{award}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://proboxinfotech.com/wp-content/uploads/2023/08/Awards-1-1024x207.jpg"
                  alt="PROBOX Awards"
                  fill
                  className="object-contain bg-white p-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-6">
                    <Target className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To enable global enterprises to address a dual mandate: to make their current operations 
                    as efficient and cost-effective as possible and to invest in innovation to unleash new 
                    potential across their organizations through cutting-edge technology solutions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-6">
                    <Eye className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To be the most trusted technology partner for businesses worldwide, known for our 
                    innovation in Customer Experience (CX), quality delivery, and lasting impact. We envision 
                    a future where technology seamlessly enables every organization to achieve its full potential.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Principles That Guide Us
            </h2>
            <p className="text-slate-600 text-lg">
              Our core values shape every decision we make and every solution we deliver.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border-slate-200 hover:shadow-lg transition-all text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Presence</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Office Locations
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.branches.map((branch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-slate-200 hover:shadow-lg hover:border-teal-200 transition-all">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-4">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{branch.city}</h3>
                    <p className="text-slate-600 text-sm">{branch.address}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      <CTABanner />
      <Footer />
    </main>
  );
}
