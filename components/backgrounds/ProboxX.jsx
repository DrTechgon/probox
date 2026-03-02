'use client';

import { motion } from 'framer-motion';

const defaultGradientId = 'probox-x-gradient';

export default function ProboxX({
  size = 500,
  opacity = 0.12,
  strokeWidth = 2,
  gradientFrom = '#f97316',
  gradientTo = '#3b82f6',
  className = '',
  animate = true,
  glowPulse = true,
  drawDuration = 1.8,
  drawDelay = 0.3,
  id = defaultGradientId,
}) {
  const padding = strokeWidth * 2;
  const viewBox = `0 0 ${size} ${size}`;
  const inset = padding;
  const end = size - padding;
  const mid = size / 2;

  const taperStart = strokeWidth;
  const taperMid = strokeWidth * 2.5;

  const line1 = `M ${inset} ${inset} L ${end} ${end}`;
  const line2 = `M ${end} ${inset} L ${inset} ${end}`;

  return (
    <motion.svg
      viewBox={viewBox}
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity } : undefined}
      transition={animate ? { duration: 0.8, delay: drawDelay } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="100%" stopColor={gradientTo} />
        </linearGradient>

        {glowPulse && (
          <filter id={`${id}-glow`}>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Glow layer */}
      {glowPulse && (
        <g filter={`url(#${id}-glow)`}>
          <motion.path
            d={line1}
            stroke={`url(#${id})`}
            strokeWidth={taperMid}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              animate
                ? {
                    pathLength: 1,
                    opacity: [0, 0.4, 0.2, 0.4, 0.2],
                  }
                : { pathLength: 1, opacity: 0.3 }
            }
            transition={
              animate
                ? {
                    pathLength: { duration: drawDuration, delay: drawDelay, ease: 'easeOut' },
                    opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: drawDelay + drawDuration },
                  }
                : undefined
            }
          />
          <motion.path
            d={line2}
            stroke={`url(#${id})`}
            strokeWidth={taperMid}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              animate
                ? {
                    pathLength: 1,
                    opacity: [0, 0.4, 0.2, 0.4, 0.2],
                  }
                : { pathLength: 1, opacity: 0.3 }
            }
            transition={
              animate
                ? {
                    pathLength: { duration: drawDuration, delay: drawDelay + 0.2, ease: 'easeOut' },
                    opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: drawDelay + drawDuration + 0.2 },
                  }
                : undefined
            }
          />
        </g>
      )}

      {/* Primary strokes */}
      <motion.path
        d={line1}
        stroke={`url(#${id})`}
        strokeWidth={taperMid}
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={animate ? { duration: drawDuration, delay: drawDelay, ease: 'easeOut' } : undefined}
      />
      <motion.path
        d={line2}
        stroke={`url(#${id})`}
        strokeWidth={taperMid}
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={animate ? { duration: drawDuration, delay: drawDelay + 0.2, ease: 'easeOut' } : undefined}
      />

      {/* Center accent dot */}
      <motion.circle
        cx={mid}
        cy={mid}
        r={taperMid * 1.2}
        fill={`url(#${id})`}
        initial={animate ? { scale: 0, opacity: 0 } : undefined}
        animate={animate ? { scale: 1, opacity: 0.6 } : undefined}
        transition={animate ? { duration: 0.5, delay: drawDelay + drawDuration } : undefined}
      />
    </motion.svg>
  );
}
