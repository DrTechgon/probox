'use client';

import { motion } from 'framer-motion';

const BAR_COUNT = 28;
const PARTICLE_COUNT = 12;

function generateBars() {
  const bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const x = 3 + (i / BAR_COUNT) * 94;
    const height = 15 + Math.random() * 55;
    const delay = i * 0.08;
    bars.push({ x, height, delay, width: 1.8 + Math.random() * 1.2 });
  }
  return bars;
}

function generateParticles() {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      startX: 10 + Math.random() * 80,
      startY: 95 + Math.random() * 10,
      endY: 5 + Math.random() * 30,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      size: 0.3 + Math.random() * 0.4,
    });
  }
  return particles;
}

const bars = generateBars();
const particles = generateParticles();

// The X is formed by two diagonal data-stream bands crossing at center
const xStreams = {
  line1: { x1: 25, y1: 10, x2: 75, y2: 90 },
  line2: { x1: 75, y1: 10, x2: 25, y2: 90 },
};

export default function DataFlowBg() {
  return (
    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="dataflow-bar-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dataflow-x-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dataflow-x-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Rising data bars */}
        {bars.map((bar, i) => (
          <motion.rect
            key={`bar-${i}`}
            x={bar.x}
            y={100}
            width={bar.width}
            height={0}
            rx="0.5"
            fill="url(#dataflow-bar-grad)"
            initial={{ height: 0, y: 100 }}
            animate={{ height: bar.height, y: 100 - bar.height }}
            transition={{
              duration: 1.5,
              delay: 0.5 + bar.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* X-shaped crossing streams -- stroke 1 */}
        <motion.line
          x1={xStreams.line1.x1}
          y1={xStreams.line1.y1}
          x2={xStreams.line1.x2}
          y2={xStreams.line1.y2}
          stroke="url(#dataflow-x-grad1)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        />
        {/* X-shaped crossing streams -- stroke 2 */}
        <motion.line
          x1={xStreams.line2.x1}
          y1={xStreams.line2.y1}
          x2={xStreams.line2.x2}
          y2={xStreams.line2.y2}
          stroke="url(#dataflow-x-grad2)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
        />

        {/* Inner X lines (sharper, thinner) */}
        <motion.line
          x1={xStreams.line1.x1}
          y1={xStreams.line1.y1}
          x2={xStreams.line1.x2}
          y2={xStreams.line1.y2}
          stroke="#8b5cf6"
          strokeWidth="0.4"
          strokeLinecap="round"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.line
          x1={xStreams.line2.x1}
          y1={xStreams.line2.y1}
          x2={xStreams.line2.x2}
          y2={xStreams.line2.y2}
          stroke="#3b82f6"
          strokeWidth="0.4"
          strokeLinecap="round"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.7, ease: 'easeOut' }}
        />

        {/* Center convergence glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="#8b5cf6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.4],
            scale: [0, 1.2, 1, 1.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Traveling particles along X streams */}
        {[...Array(6)].map((_, i) => {
          const stream = i % 2 === 0 ? xStreams.line1 : xStreams.line2;
          const reverse = i > 2;
          return (
            <motion.circle
              key={`xparticle-${i}`}
              r="0.35"
              fill={i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
              initial={{
                cx: reverse ? stream.x2 : stream.x1,
                cy: reverse ? stream.y2 : stream.y1,
                opacity: 0,
              }}
              animate={{
                cx: [reverse ? stream.x2 : stream.x1, reverse ? stream.x1 : stream.x2],
                cy: [reverse ? stream.y2 : stream.y1, reverse ? stream.y1 : stream.y2],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 2 + i * 0.8,
              }}
            />
          );
        })}

        {/* Rising particles */}
        {particles.map((p, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={p.startX}
            r={p.size}
            fill="#3b82f6"
            initial={{ cy: p.startY, opacity: 0 }}
            animate={{
              cy: [p.startY, p.endY],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeOut',
              delay: p.delay,
            }}
          />
        ))}
      </svg>

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl" />
    </div>
  );
}
