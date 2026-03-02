'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { services } from '@/data/site-data';
import { Brain, Server, Shield, Cpu, Network, Cloud, ChevronRight, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const iconMap = {
  Brain: Brain,
  Server: Server,
  Shield: Shield,
  Cpu: Cpu,
  Network: Network,
  Cloud: Cloud
};

export default function Services({ showAll = false }) {
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
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Our Offerings</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Comprehensive IT Solutions
          </h2>
          <p className="text-slate-600 text-lg">
            With expertise in Digital, IT Services and Cloud, we deliver services that fulfill the traditional, 
            transformational and future needs of clients across locations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Link href={`/services/${service.id}`}>
                  <Card className="group cursor-pointer h-full bg-white border-slate-200 hover:border-orange-200 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center shadow-lg">
                          {IconComponent && <IconComponent className="text-white" size={24} />}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center text-orange-600 font-medium text-sm group-hover:text-orange-700">
                        Learn More
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-600">
                View All Services
                <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
