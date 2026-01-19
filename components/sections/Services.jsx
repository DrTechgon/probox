'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/site-data';
import { Globe, Smartphone, Cloud, BarChart3, Shield, Lightbulb, ChevronRight, X, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';

const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  BarChart3: BarChart3,
  Shield: Shield,
  Lightbulb: Lightbulb
};

export default function Services({ showAll = false }) {
  const [selectedService, setSelectedService] = useState(null);
  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Comprehensive IT Solutions
          </h2>
          <p className="text-slate-600 text-lg">
            From digital transformation to cybersecurity, we offer end-to-end technology 
            services tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="group cursor-pointer h-full bg-white border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedService(service)}
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent className="text-white" size={28} />}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                      Learn more
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Button */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600">
                View All Services
                <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                    {iconMap[selectedService.icon] && (
                      <span className="text-white">
                        {(() => {
                          const Icon = iconMap[selectedService.icon];
                          return <Icon size={28} />;
                        })()}
                      </span>
                    )}
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">
                    {selectedService.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base text-slate-600 leading-relaxed">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <h4 className="font-semibold text-slate-900 mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-teal-600" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/contact" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                    Get Started
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setSelectedService(null)} className="px-8">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
