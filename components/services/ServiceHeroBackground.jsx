'use client';

import { motion } from 'framer-motion';
import ProboxX from '@/components/backgrounds/ProboxX';

const serviceThemes = {
  'artificial-intelligence': {
    from: '#8b5cf6',
    to: '#a855f7',
    accent: '#c084fc',
  },
  'cyber-security': {
    from: '#10b981',
    to: '#14b8a6',
    accent: '#34d399',
  },
  'cloud-services': {
    from: '#3b82f6',
    to: '#06b6d4',
    accent: '#60a5fa',
  },
  'network-management': {
    from: '#f59e0b',
    to: '#f97316',
    accent: '#fbbf24',
  },
  'iiot': {
    from: '#ec4899',
    to: '#f43f5e',
    accent: '#f472b6',
  },
  'managed-it-services': {
    from: '#f97316',
    to: '#3b82f6',
    accent: '#fb923c',
  },
};

const defaultTheme = {
  from: '#f97316',
  to: '#3b82f6',
  accent: '#fb923c',
};

export default function ServiceHeroBackground({ serviceId }) {
  const theme = serviceThemes[serviceId] || defaultTheme;

  return (
    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />

      {/* Gradient mesh blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-[10%] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${theme.from}20, transparent 70%)` }}
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-[10%] w-[450px] h-[450px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${theme.to}18, transparent 70%)` }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${theme.accent}10, transparent 70%)` }}
      />

      {/* X motif */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2">
        <ProboxX
          size={500}
          opacity={0.1}
          strokeWidth={2}
          gradientFrom={theme.from}
          gradientTo={theme.to}
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
          drawDuration={2}
          drawDelay={0.3}
          id={`service-x-${serviceId}`}
        />
      </div>

      {/* Subtle mesh grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[...Array(10)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 10 + 5}
            x2="100"
            y2={i * 10 + 5}
            stroke="white"
            strokeWidth="0.1"
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 10 + 5}
            y1="0"
            x2={i * 10 + 5}
            y2="100"
            stroke="white"
            strokeWidth="0.1"
          />
        ))}
      </svg>
    </div>
  );
}
