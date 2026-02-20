'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Service-specific animated hero backgrounds
 * Premium, subtle graphics that enhance without distracting
 */

// AI/ML Network Background - Floating nodes with connections
function AINetworkBackground() {
  const nodes = useMemo(() => {
    const generated = [];
    for (let i = 0; i < 25; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 4,
      });
    }
    return generated;
  }, []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 15; i++) {
      const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
      const toNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (fromNode.id !== toNode.id) {
        lines.push({
          id: i,
          x1: fromNode.x,
          y1: fromNode.y,
          x2: toNode.x,
          y2: toNode.y,
          delay: Math.random() * 2,
        });
      }
    }
    return lines;
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.6)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
          </radialGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
            <stop offset="50%" stopColor="rgba(20, 184, 166, 0.3)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
          </linearGradient>
        </defs>
        
        {/* Connection lines */}
        {connections.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              pathLength: [0, 1, 1]
            }}
            transition={{
              duration: 4,
              delay: line.delay,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Glow effect */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size * 3}
              fill="url(#nodeGlow)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Core node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="rgba(20, 184, 166, 0.5)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                y: [0, -5, 0]
              }}
              transition={{
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}
      </svg>
      
      {/* Central brain/processor glow */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-32 h-32 md:w-48 md:h-48"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-2xl" />
      </motion.div>
    </div>
  );
}

// Cybersecurity Shield Background - Hexagonal grid with scanning effect
function SecurityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Hexagonal pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <pattern id="hexPattern" width="50" height="43.4" patternUnits="userSpaceOnUse">
            <path 
              d="M25,0 L50,14.4 L50,43.4 L25,57.8 L0,43.4 L0,14.4 Z" 
              fill="none" 
              stroke="rgba(20, 184, 166, 0.3)" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Shield glow */}
      <motion.div
        className="absolute top-1/3 right-1/5 w-40 h-40 md:w-56 md:h-56"
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
      </motion.div>
      
      {/* Secondary pulse */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-full h-full rounded-full bg-blue-500/20 blur-2xl" />
      </motion.div>
    </div>
  );
}

// Cloud Background - Layered flowing shapes
function CloudBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Flowing cloud layers */}
      <motion.div
        className="absolute -top-20 -right-20 w-[400px] h-[200px] md:w-[600px] md:h-[300px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -10, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 -left-20 w-[300px] h-[150px] md:w-[450px] md:h-[225px]"
        animate={{
          x: [0, -20, 0],
          y: [0, 15, 0],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="w-full h-full bg-gradient-to-tr from-teal-400/15 to-blue-400/10 rounded-full blur-3xl" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-[250px] h-[125px] md:w-[400px] md:h-[200px]"
        animate={{
          x: [0, 25, 0],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-full h-full bg-gradient-to-tl from-indigo-400/15 to-blue-400/10 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Subtle curved lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q25,30 50,50 T100,50"
          fill="none"
          stroke="url(#cloudLineGradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'scale(1, 0.5) translateY(30%)' }}
        />
        <defs>
          <linearGradient id="cloudLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Network/Infrastructure Background - Grid with data flow
function NetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Flowing data lines */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-teal-400/30 to-transparent"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
      />
      <motion.div
        className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-teal-400/30 to-transparent"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
      
      {/* Router/Node glows */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-20 h-20 md:w-28 md:h-28"
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-teal-500/30 blur-xl" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 md:w-24 md:h-24"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="w-full h-full rounded-full bg-blue-500/25 blur-xl" />
      </motion.div>
    </div>
  );
}

// IIoT/Industrial Background - Circuit-like patterns with sensor nodes
function IIoTBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Circuit traces */}
      <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
            <stop offset="50%" stopColor="rgba(20, 184, 166, 0.5)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
          </linearGradient>
        </defs>
        
        {/* Horizontal traces */}
        <motion.line
          x1="0%" y1="25%" x2="100%" y2="25%"
          stroke="url(#circuitGradient)"
          strokeWidth="1"
          strokeDasharray="8 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -24 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="0%" y1="75%" x2="100%" y2="75%"
          stroke="url(#circuitGradient)"
          strokeWidth="1"
          strokeDasharray="8 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 24 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Vertical traces */}
        <motion.line
          x1="20%" y1="0%" x2="20%" y2="100%"
          stroke="url(#circuitGradient)"
          strokeWidth="1"
          strokeDasharray="8 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -24 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="80%" y1="0%" x2="80%" y2="100%"
          stroke="url(#circuitGradient)"
          strokeWidth="1"
          strokeDasharray="8 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 24 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      {/* Sensor node pulses */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-4 h-4"
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      >
        <div className="w-full h-full rounded-full bg-teal-400" />
      </motion.div>
      
      <motion.div
        className="absolute top-3/4 right-1/5 w-4 h-4"
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      >
        <div className="w-full h-full rounded-full bg-blue-400" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-1/3 w-3 h-3"
        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
      >
        <div className="w-full h-full rounded-full bg-emerald-400" />
      </motion.div>
      
      {/* Factory/machinery glow */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-32 h-32 md:w-48 md:h-48"
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-lg bg-gradient-to-tr from-orange-500/20 to-teal-500/10 blur-2xl" />
      </motion.div>
    </div>
  );
}

// Managed IT Services Background - Dashboard/monitoring style
function ManagedITBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Monitoring grid */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Heartbeat/pulse line */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
            <stop offset="50%" stopColor="rgba(20, 184, 166, 0.4)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,50 L20,50 L25,30 L30,70 L35,40 L40,60 L45,50 L100,50"
          fill="none"
          stroke="url(#pulseGradient)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateY(20%)' }}
        />
      </svg>
      
      {/* Server status indicators */}
      <div className="absolute top-1/4 right-1/4 flex flex-col gap-3 opacity-30">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </div>
      
      {/* Dashboard glow */}
      <motion.div
        className="absolute top-1/3 right-1/5 w-40 h-32 md:w-56 md:h-44"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500/15 to-teal-500/10 blur-2xl" />
      </motion.div>
    </div>
  );
}

// Default/Fallback Background - Abstract geometric
function DefaultBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 border border-teal-500/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/4 -right-20 w-48 h-48 md:w-72 md:h-72 border border-blue-500/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute -bottom-20 -left-20 w-56 h-56 md:w-80 md:h-80 border border-teal-500/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 md:w-48 md:h-48"
        animate={{
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 blur-3xl" />
      </motion.div>
    </div>
  );
}

// Main component that selects appropriate background based on service
export default function ServiceHeroBackground({ serviceId }) {
  const backgroundComponents = {
    'artificial-intelligence': AINetworkBackground,
    'cyber-security': SecurityBackground,
    'cloud-services': CloudBackground,
    'network-management': NetworkBackground,
    'iiot': IIoTBackground,
    'managed-it-services': ManagedITBackground,
  };

  const BackgroundComponent = backgroundComponents[serviceId] || DefaultBackground;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <BackgroundComponent />
      {/* Subtle dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/30" />
    </div>
  );
}
