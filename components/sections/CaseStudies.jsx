'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies, caseStudyCategories } from '@/data/site-data';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CaseStudies({ showAll = false, limit = 3 }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filteredStudies = caseStudies.filter(study => 
    activeFilter === 'All' || study.category === activeFilter
  );
  
  const displayedStudies = showAll ? filteredStudies : filteredStudies.slice(0, limit);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Case Studies</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Success Stories That Inspire
          </h2>
          <p className="text-slate-600 text-lg">
            Explore how we've helped businesses across industries achieve their 
            digital transformation goals.
          </p>
        </motion.div>

        {/* Filter Chips */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {caseStudyCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Case Studies Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedStudies.map((study, index) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group h-full bg-white border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white">
                      {study.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-sm text-blue-600 font-medium mb-2">{study.client}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {study.description}
                    </p>
                    
                    {/* Results */}
                    <div className="space-y-2 mb-4">
                      {study.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2" />
                          {result}
                        </div>
                      ))}
                    </div>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                      {study.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/case-studies">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                View All Case Studies
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
