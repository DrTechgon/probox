'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/sections/Navbar';
import Stats from '@/components/sections/Stats';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';
import { companyInfo } from '@/data/site-data';
import { Target, Eye, Award, Users, Globe, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, delivering quality solutions that exceed expectations.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, both within our organization and with our clients.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously explore new technologies and approaches to solve complex business challenges.'
  },
  {
    icon: Globe,
    title: 'Integrity',
    description: 'We conduct our business with transparency, honesty, and ethical practices.'
  }
];

const timeline = [
  { year: '2015', title: 'Company Founded', description: 'Started with a vision to transform businesses through technology.' },
  { year: '2017', title: 'First Major Enterprise Client', description: 'Secured our first Fortune 500 client, marking a significant milestone.' },
  { year: '2019', title: 'Cloud Partnership', description: 'Became an AWS Advanced Consulting Partner.' },
  { year: '2021', title: 'Global Expansion', description: 'Expanded operations to serve clients across 15+ countries.' },
  { year: '2023', title: '500+ Projects Milestone', description: 'Successfully delivered 500+ projects across various industries.' },
  { year: '2025', title: 'AI & Innovation Hub', description: 'Launched dedicated AI/ML practice and innovation center.' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Driving Digital Innovation Since 2015
            </h1>
            <p className="text-xl text-white/70">
              We are a team of passionate technologists committed to helping 
              businesses thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-6">
                    <Target className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To empower businesses with innovative technology solutions that drive growth, 
                    efficiency, and competitive advantage. We are committed to delivering exceptional 
                    value through our expertise, dedication, and client-centric approach.
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
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-6">
                    <Eye className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To be the most trusted technology partner for businesses worldwide, known 
                    for our innovation, quality, and lasting impact. We envision a future where 
                    technology seamlessly enables every organization to achieve its full potential.
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
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
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

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              A Decade of Excellence
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-teal-500" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 border-4 border-white shadow-md z-10" />
                  
                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <span className="text-blue-600 font-bold text-lg">{item.year}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
