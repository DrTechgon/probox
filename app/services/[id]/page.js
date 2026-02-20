'use client';

import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import ServiceHeroBackground from '@/components/services/ServiceHeroBackground';
import { services } from '@/data/site-data';
import { servicesDetailData, defaultServiceData } from '@/data/services-detail-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Brain, Server, Shield, Cpu, Network, Cloud, ChevronRight, ArrowRight,
  Check, Star, Quote, TrendingUp, MessageSquare, Eye, Zap, Sparkles, Bot,
  Monitor, Wrench, Headphones, Package, Users, Map, ShieldAlert, Search,
  Radio, Fingerprint, FileCheck, GraduationCap, Activity, MapPin, Workflow,
  Gauge, CheckCircle, Layout, BarChart, Globe, Wifi, ArrowUpRight, Layers,
  DollarSign, GitBranch, Lock, Home, Phone, Mail
} from 'lucide-react';

// Icon mapping for service icons
const serviceIconMap = {
  Brain, Server, Shield, Cpu, Network, Cloud
};

// Icon mapping for capability icons
const capabilityIconMap = {
  TrendingUp, MessageSquare, Eye, Zap, Sparkles, Bot,
  Monitor, Wrench, Headphones, Package, Users, Map, ShieldAlert, Search,
  Radio, Fingerprint, FileCheck, GraduationCap, Activity, MapPin, Workflow,
  Gauge, CheckCircle, Layout, BarChart, Globe, Wifi, Shield, Cloud,
  ArrowUpRight, Layers, DollarSign, GitBranch, Lock
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id;
  
  // Find the service from base data
  const service = services.find(s => s.id === serviceId);
  
  if (!service) {
    notFound();
  }
  
  // Get detailed data for this service, or use defaults
  const detailData = servicesDetailData[serviceId] || defaultServiceData;
  
  // Generate capabilities from features if not in detail data
  const capabilities = detailData.capabilities || service.features.map((feature, idx) => ({
    title: feature,
    description: `Expert ${feature.toLowerCase()} solutions tailored to your business needs.`,
    icon: 'CheckCircle'
  }));
  
  const ServiceIcon = serviceIconMap[service.icon] || Brain;
  
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-24 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-600 transition-colors flex items-center">
              <Home size={14} className="mr-1" />
              Home
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <Link href="/services" className="hover:text-teal-600 transition-colors">
              Services
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-slate-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                <ServiceIcon className="text-white" size={28} />
              </div>
              <Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-1.5">
                {service.title}
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {detailData.hero.headline}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed"
            >
              {detailData.hero.subheadline}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-medium group">
                  {detailData.hero.primaryCta}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
                  {detailData.hero.secondaryCta}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Problems We Solve Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Challenges</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Problems We Solve
            </h2>
            <p className="text-slate-600 text-lg">
              We understand the real challenges businesses face. Here's what we help you overcome.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {detailData.problems.map((problem, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center mb-4 transition-colors">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{problem.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{problem.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Capabilities Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Capabilities</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Solutions We Deliver
            </h2>
            <p className="text-slate-600 text-lg">
              Comprehensive {service.title.toLowerCase()} solutions built on proven expertise and industry best practices.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {capabilities.map((capability, index) => {
              const CapIcon = capabilityIconMap[capability.icon] || CheckCircle;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-white border-slate-200 hover:border-teal-200 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-teal-500 group-hover:to-blue-500 flex items-center justify-center mb-6 transition-all duration-300">
                        <CapIcon size={28} className="text-teal-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{capability.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{capability.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* Results & Proof Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">Proven Results</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Impact You Can Measure
            </h2>
            <p className="text-white/70 text-lg">
              Real outcomes delivered for clients across industries.
            </p>
          </motion.div>
          
          {/* Metrics Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {detailData.results.map((result, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-2">
                  {result.metric}
                </div>
                <div className="text-white/70">{result.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Testimonial */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <Quote className="text-teal-400 mb-6" size={40} />
                <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                  "{detailData.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {detailData.testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{detailData.testimonial.author}</div>
                    <div className="text-white/60 text-sm">{detailData.testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Approach</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              How We Work
            </h2>
            <p className="text-slate-600 text-lg">
              A proven methodology that ensures successful outcomes and lasting value.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-blue-500 to-teal-500 hidden md:block" />
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-8"
              >
                {detailData.process.map((step, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex gap-6 md:gap-10">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      {detailData.technologies && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Tech Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4">
                Technologies We Use
              </h2>
              <p className="text-slate-600">
                We leverage industry-leading platforms and tools to deliver exceptional results.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            >
              {detailData.technologies.map((tech, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Badge variant="secondary" className="px-5 py-2.5 text-sm bg-white border border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50 transition-colors cursor-default">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Engagement Options Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Engagement Models</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Ways to Work With Us
            </h2>
            <p className="text-slate-600 text-lg">
              Flexible engagement options designed to match your needs and objectives.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {detailData.engagementOptions.map((option, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                  option.highlighted 
                    ? 'border-2 border-teal-500 shadow-xl' 
                    : 'border-slate-200 hover:border-teal-200 hover:shadow-lg'
                }`}>
                  {option.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-center text-sm font-medium py-2">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-8 ${option.highlighted ? 'pt-14' : ''}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{option.title}</h3>
                    <p className="text-slate-600 mb-6">{option.description}</p>
                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check size={16} className="text-teal-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button className={`w-full ${
                        option.highlighted
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}>
                        Learn More
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Common Questions
            </h2>
            <p className="text-slate-600 text-lg">
              Answers to frequently asked questions about our {service.title.toLowerCase()} services.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {detailData.faq.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white border border-slate-200 rounded-xl px-6 data-[state=open]:border-teal-200 data-[state=open]:shadow-md transition-all"
                >
                  <AccordionTrigger className="text-left text-slate-900 font-semibold hover:text-teal-600 py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {detailData.finalCta.headline}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {detailData.finalCta.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-10 py-6 text-lg font-medium group">
                  {detailData.finalCta.buttonText}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <a href="tel:+917738322228">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 px-10 py-6 text-lg font-medium">
                  <Phone size={18} className="mr-2" />
                  +91-7738322228
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
