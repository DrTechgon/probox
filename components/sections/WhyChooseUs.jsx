'use client';

import { motion } from 'framer-motion';
import { whyChooseUs, awards } from '@/data/site-data';
import { Award, Globe, Heart, Zap, Users, Headphones } from 'lucide-react';

const iconMap = {
  Award: Award,
  Globe: Globe,
  Heart: Heart,
  Zap: Zap,
  Users: Users,
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
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">We Are PROBOX</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
              India's Most Trusted Technology Partner
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              The proud recipients of the prestigious "Iconic Brand of the Year 2023 & 2024 Award" - 
              Recognized as The Most Promising Technology, Consulting, and Outsourcing Company which 
              enables global enterprises to make their operations efficient and invest in innovation.
            </p>

            {/* Awards badges */}
            <div className="flex flex-wrap gap-3">
              {awards.slice(0, 3).map((award, index) => (
                <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-blue-50 px-4 py-2 rounded-full border border-orange-100">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span className="text-slate-700 text-sm font-medium">{award}</span>
                </div>
              ))}
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
                  className="group p-6 bg-slate-50 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-orange-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-blue-500 transition-all duration-300">
                    {IconComponent && (
                      <IconComponent
                        size={24}
                        className="text-orange-600 group-hover:text-white transition-colors duration-300"
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
