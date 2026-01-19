'use client';

import { motion } from 'framer-motion';
import { whyChooseUs } from '@/data/site-data';
import { Users, Award, Zap, Heart, RefreshCw, Headphones } from 'lucide-react';

const iconMap = {
  Users: Users,
  Award: Award,
  Zap: Zap,
  Heart: Heart,
  RefreshCw: RefreshCw,
  Headphones: Headphones
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Your Trusted Technology Partner
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              With over a decade of experience delivering innovative solutions, we've built 
              a reputation for excellence. Our commitment to quality and client success 
              sets us apart in the industry.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-slate-700 text-sm font-medium">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                <span className="text-slate-700 text-sm font-medium">AWS Partner</span>
              </div>
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span className="text-slate-700 text-sm font-medium">Microsoft Gold Partner</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 bg-slate-50 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-teal-500 transition-all duration-300">
                    {IconComponent && (
                      <IconComponent 
                        size={24} 
                        className="text-blue-600 group-hover:text-white transition-colors duration-300" 
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
