import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * High-performance context-aware Custom Cursor.
 * Drives coordinate tracking with Framer Motion values & springs
 * to prevent unnecessary React re-renders on every mousemove.
 */
export default function CustomCursor() {
  const [cursorState, setCursorState] = useState({
    variant: 'default',
    text: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !isTouch && !reducedMotion;
  });

  // Motion values for smooth 60-120fps tracking without React state updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring (soft & responsive)
  const ringX = useSpring(mouseX, { stiffness: 450, damping: 30, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 30, mass: 0.4 });

  // Inner dot spring (tighter, almost instant)
  const dotX = useSpring(mouseX, { stiffness: 850, damping: 36, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 850, damping: 36, mass: 0.1 });

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check for custom cursor targets
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const variant = target.getAttribute('data-cursor') || 'pointer';
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorState((prev) => {
          if (prev.variant === variant && prev.text === text) return prev;
          return { variant, text };
        });
        return;
      }

      // Check for external link
      const anchor = e.target.closest('a');
      if (anchor && anchor.getAttribute('target') === '_blank') {
        setCursorState((prev) => {
          if (prev.variant === 'external' && prev.text === 'OPEN ↗') return prev;
          return { variant: 'external', text: 'OPEN ↗' };
        });
        return;
      }

      // Check for interactive button / standard link
      const clickable = e.target.closest('button, [role="button"], input, textarea, select, a');
      if (clickable) {
        setCursorState((prev) => {
          if (prev.variant === 'pointer' && prev.text === 'CLICK') return prev;
          return { variant: 'pointer', text: 'CLICK' };
        });
        return;
      }

      // Check for canvas
      const canvasEl = e.target.closest('canvas, [data-cursor-drag]');
      if (canvasEl) {
        setCursorState((prev) => {
          if (prev.variant === 'explore' && prev.text === 'EXPLORE') return prev;
          return { variant: 'explore', text: 'EXPLORE' };
        });
        return;
      }

      // Default state
      setCursorState((prev) => {
        if (prev.variant === 'default' && prev.text === '') return prev;
        return { variant: 'default', text: '' };
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isEnabled, isVisible, mouseX, mouseY]);

  if (!isEnabled || !isVisible) return null;

  const { variant, text } = cursorState;

  // Variants styling configuration
  const variantStyles = {
    default: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      borderColor: 'rgba(255, 255, 255, 0.35)',
      scale: 1,
    },
    pointer: {
      width: 52,
      height: 52,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      scale: 1.1,
    },
    project: {
      width: 76,
      height: 76,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: '#ffffff',
      scale: 1,
      color: '#050505',
    },
    explore: {
      width: 68,
      height: 68,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      borderColor: '#ffffff',
      scale: 1,
      color: '#050505',
    },
    external: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      borderColor: '#ffffff',
      scale: 1,
      color: '#050505',
    },
  };

  const currentStyle = variantStyles[variant] || variantStyles.default;
  const isPill = variant === 'project' || variant === 'explore' || variant === 'external';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-9999 overflow-hidden transition-opacity duration-300 select-none"
    >
      {/* Outer morphing ring/pill */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={currentStyle}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 28,
          mass: 0.3,
        }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border backdrop-blur-[2px]"
      >
        <AnimatePresence mode="wait">
          {isPill && (
            <motion.span
              key={`${variant}-${text}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-mono font-bold tracking-wider uppercase text-black"
            >
              {text || (variant === 'project' ? 'VIEW' : variant === 'external' ? 'OPEN ↗' : 'EXPLORE')}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Central dot for default & pointer modes */}
      {!isPill && (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: variant === 'pointer' ? 0.6 : 1,
            opacity: 1,
          }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        />
      )}
    </div>
  );
}
