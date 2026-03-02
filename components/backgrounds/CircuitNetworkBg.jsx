'use client';

import { motion } from 'framer-motion';
import ProboxX from './ProboxX';

const nodes = [
  { x: 12, y: 18 }, { x: 28, y: 12 }, { x: 45, y: 8 },
  { x: 62, y: 15 }, { x: 78, y: 10 }, { x: 90, y: 22 },
  { x: 8, y: 42 }, { x: 22, y: 38 }, { x: 35, y: 32 },
  { x: 50, y: 50 }, // center node -- X intersection
  { x: 65, y: 35 }, { x: 80, y: 45 }, { x: 92, y: 38 },
  { x: 15, y: 65 }, { x: 30, y: 72 }, { x: 42, y: 60 },
  { x: 58, y: 68 }, { x: 72, y: 62 }, { x: 85, y: 70 },
  { x: 10, y: 85 }, { x: 25, y: 90 }, { x: 48, y: 88 },
  { x: 68, y: 82 }, { x: 88, y: 88 },
];

const CENTER = 9; // index of center node at (50, 50)

const connections = [
  [0, 1], [1, 2], [2, CENTER], [CENTER, 4], [4, 5],
  [0, 6], [6, 7], [7, 8], [8, CENTER], [CENTER, 10], [10, 11], [11, 12],
  [6, 13], [13, 14], [14, 15], [15, CENTER], [CENTER, 17], [17, 18],
  [13, 19], [19, 20], [20, 21], [14, 20],
  [16, CENTER], [16, 22], [22, 23], [18, 23],
  [1, 8], [3, 10], [7, 15], [11, 17],
  [3, CENTER], [CENTER, 16],
];

export default function CircuitNetworkBg() {
  return (
    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />

      {/* X motif as central hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ProboxX
          size={600}
          opacity={0.15}
          strokeWidth={2}
          gradientFrom="#f97316"
          gradientTo="#3b82f6"
          className="w-[500px] h-[500px] md:w-[600px] md:h-[600px]"
          drawDuration={2}
          drawDelay={0.5}
          id="circuit-x-grad"
        />
      </div>

      {/* Circuit network SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="circuit-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="circuit-node-glow">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={`line-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="url(#circuit-line-grad)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.2, delay: 0.8 + i * 0.06, ease: 'easeOut' },
              opacity: { duration: 0.4, delay: 0.8 + i * 0.06 },
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isCenter = i === CENTER;
          return (
            <g key={`node-${i}`}>
              {/* Glow ring for center and key nodes */}
              {(isCenter || i % 3 === 0) && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isCenter ? 2.5 : 1.5}
                  fill="url(#circuit-node-glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5 + i * 0.1,
                  }}
                />
              )}
              {/* Node dot */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isCenter ? 0.6 : 0.35}
                fill={isCenter ? '#f97316' : '#f97316'}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: isCenter ? 0.9 : 0.5 }}
                transition={{
                  duration: 0.4,
                  delay: 1 + i * 0.05,
                  ease: 'easeOut',
                }}
              />
            </g>
          );
        })}

        {/* Traveling pulses along key connections */}
        {[0, 3, 8, 9, 14, 22].map((connIdx) => {
          const [from, to] = connections[connIdx];
          return (
            <motion.circle
              key={`pulse-${connIdx}`}
              r="0.3"
              fill="#f97316"
              opacity="0.7"
              initial={{
                cx: nodes[from].x,
                cy: nodes[from].y,
              }}
              animate={{
                cx: [nodes[from].x, nodes[to].x],
                cy: [nodes[from].y, nodes[to].y],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: connIdx * 0.4,
              }}
            />
          );
        })}
      </svg>

      {/* Soft ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />
    </div>
  );
}
