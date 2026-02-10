'use client';

import { motion } from 'framer-motion';
import { hiringProcess } from '@/data/careers-data';
import { FileText, PhoneCall, Code, Users, PartyPopper } from 'lucide-react';

const stepIcons = [
  FileText,
  PhoneCall,
  Code,
  Users,
  PartyPopper
];

export default function HiringProcess() {
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
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Hiring Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Simple & Transparent
          </h2>
          <p className="text-slate-600 text-lg">
            Our hiring process is designed to be efficient and respectful of your time. Here's what to expect.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-blue-500 to-teal-500 -translate-x-1/2" />

            {hiringProcess.map((step, index) => {
              const Icon = stepIcons[index];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 last:mb-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Mobile: Step number */}
                  <div className="md:hidden flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-teal-600">Step {step.step}</div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 md:w-[calc(50%-40px)] ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-teal-100 transition-all ${
                      isEven ? 'md:ml-auto' : 'md:mr-auto'
                    } max-w-md`}>
                      <div className={`hidden md:flex items-center gap-3 mb-3 ${
                        isEven ? 'justify-end' : ''
                      }`}>
                        <span className="text-sm font-medium text-teal-600">Step {step.step}</span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm">{step.description}</p>
                      <div className="md:hidden mt-3">
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center icon (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 items-center justify-center shadow-lg z-10">
                    <Icon className="text-white" size={24} />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
