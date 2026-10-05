import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Magnetic button wrapper that physically pulls toward cursor within bounds
 * and creates multi-layer depth between outer element and inner text/icon.
 */
export default function MagneticButton({
  children,
  className = '',
  maxDistance = 15,
  springConfig = { stiffness: 220, damping: 18, mass: 0.4 },
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  as = 'button',
  ...props
}) {
  const ref = useRef(null);

  // Motion values for button offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for outer container
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Higher magnitude spring for inner children to produce visual depth parallax
  const innerX = useTransform(springX, (val) => val * 1.35);
  const innerY = useTransform(springY, (val) => val * 1.35);

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;

    // Skip on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Clamp within maxDistance
    const pullX = Math.max(-maxDistance, Math.min(maxDistance, distanceX * 0.35));
    const pullY = Math.max(-maxDistance, Math.min(maxDistance, distanceY * 0.35));

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = (e) => {
    x.set(0);
    y.set(0);
    if (onMouseLeave) onMouseLeave(e);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      {...props}
    >
      <motion.span
        style={{ x: innerX, y: innerY }}
        className="inline-flex items-center justify-center gap-inherit w-full h-full pointer-events-none"
      >
        {children}
      </motion.span>
    </Component>
  );
}
