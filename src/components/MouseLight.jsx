import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Global smooth mouse-following atmospheric radial light.
 * Uses motion values and springs so it glides with fluid inertia
 * without triggering React state re-renders on mousemove.
 */
export default function MouseLight() {
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !isTouch && !reducedMotion;
  });

  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);

  // Smooth delayed spring for organic glide
  const springX = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.8 });

  // Dynamically constructed radial gradient background using useTransform
  const background = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(750px circle at ${x}px ${y}px, rgba(129, 140, 248, 0.07), rgba(99, 102, 241, 0.02) 40%, transparent 80%)`
  );

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled, rawX, rawY]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-1 transition-opacity duration-700"
    />
  );
}
