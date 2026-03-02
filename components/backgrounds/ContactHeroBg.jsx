'use client';

import { motion } from 'framer-motion';
import ProboxX from './ProboxX';

export default function ContactHeroBg() {
  return (
    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900" />

      {/* X motif -- clean and prominent, right side */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2">
        <ProboxX
          size={550}
          opacity={0.15}
          strokeWidth={2.5}
          gradientFrom="#f97316"
          gradientTo="#3b82f6"
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px]"
          drawDuration={2}
          drawDelay={0.3}
          id="contact-x-grad"
        />
      </div>

      {/* Soft gradient mesh */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-[10%] w-[450px] h-[450px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)' }}
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-[20%] w-[350px] h-[350px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)' }}
      />
    </div>
  );
}
