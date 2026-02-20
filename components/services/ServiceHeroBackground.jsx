'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Service-specific hero backgrounds
 * Clean, professional style matching the landing page carousel
 * Uses high-quality images with gradient overlays
 */

// Service background images - professional, high-quality
const serviceBackgrounds = {
  'artificial-intelligence': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80',
  'cyber-security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
  'cloud-services': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80',
  'network-management': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80',
  'iiot': 'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=1920&q=80',
  'managed-it-services': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80',
};

// Default fallback image
const defaultBackground = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80';

export default function ServiceHeroBackground({ serviceId }) {
  const backgroundImage = serviceBackgrounds[serviceId] || defaultBackground;

  return (
    <div className="absolute inset-0">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Service background"
        fill
        priority
        className="object-cover"
      />
      
      {/* Gradient Overlays - matching landing page style */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30" />
      
      {/* Subtle animated glow effects */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-teal-500/25 rounded-full blur-3xl"
      />
    </div>
  );
}
