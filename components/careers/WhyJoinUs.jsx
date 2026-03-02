'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Clock, Wallet, Users, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { whyJoinUs } from '@/data/careers-data';

const iconMap = {
  Target: Target,
  TrendingUp: TrendingUp,
  Clock: Clock,
  Wallet: Wallet,
  Users: Users,
  Cpu: Cpu
};

export default function WhyJoinUs() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Why Join Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            More Than Just a Job
          </h2>
          <p className="text-slate-600 text-lg">
            We're building a company where talented people can do their best work and grow their careers.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyJoinUs.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-orange-500 group-hover:to-blue-500 flex items-center justify-center mb-6 transition-all duration-300">
                      {IconComponent && (
                        <IconComponent
                          size={28}
                          className="text-orange-600 group-hover:text-white transition-colors duration-300"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
