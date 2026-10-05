import React from 'react';
import { motion } from 'framer-motion';

/**
 * PortraitGlow: Multi-layer atmospheric background for the living portrait.
 * Includes:
 * 1. Soft radial ambient glow (cool indigo/slate aura)
 * 2. Delicate orbital coordinate ring
 * 3. Slow traveling conic edge glow (8-12s cycle)
 */
export default function PortraitGlow({ bgParallaxX, bgParallaxY }) {
  return (
    <div className="absolute -inset-6 sm:-inset-10 pointer-events-none select-none z-0">
      {/* Dynamic Background Glow with counter-parallax */}
      <motion.div
        style={{ x: bgParallaxX, y: bgParallaxY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Primary soft diffused ambient aura */}
        <div className="w-[120%] h-[120%] rounded-full bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-sky-500/10 blur-[90px] opacity-75 animate-pulse" style={{ animationDuration: '7s' }} />

        {/* Secondary warm accent highlight */}
        <div className="absolute w-[85%] h-[85%] rounded-full bg-violet-400/8 blur-[60px]" />

        {/* Subtle geometric technical circular rings */}
        <div className="absolute w-[92%] h-[92%] rounded-full border border-white/[0.04] scale-95" />
        <div className="absolute w-[114%] h-[114%] rounded-full border border-dashed border-white/[0.03]" />

        {/* Delicate subtle technical axis markers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-white/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-white/20" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/20" />
      </motion.div>
    </div>
  );
}
