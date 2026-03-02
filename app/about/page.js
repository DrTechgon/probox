'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/sections/Navbar';
import Stats from '@/components/sections/Stats';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';
import GlobalMapBg from '@/components/backgrounds/GlobalMapBg';
import { companyInfo, awards, stats } from '@/data/site-data';
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <GlobalMapBg />

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
              About Us
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              We Are{' '}
              <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                PROBOX
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              India's Most Trusted and Fastest Growing Fast Forward Technology, Consulting and Outsourcing Company.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 pt-8 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.prefix}{typeof stat.value === 'number' && stat.value >= 10000 ? `${Math.floor(stat.value / 1000)}K` : stat.value}{stat.suffix}
                    </div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
                  <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-blue-50 px-4 py-2 rounded-full border border-orange-100">
                    <Award className="w-4 h-4 text-orange-600" />
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
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center mb-6">
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
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center mb-6">
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
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Values</span>
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
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
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Presence</span>
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
                <Card className="h-full border-slate-200 hover:shadow-lg hover:border-orange-200 transition-all">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center mb-4">
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
