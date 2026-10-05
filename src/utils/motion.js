/**
 * Advanced Motion Design System Tokens & Variants
 * Framer Motion presets tuned for Awwwards-level interactive feel.
 */

// Professional easings
export const EASE_ENTER = [0.22, 1, 0.36, 1]; // Smooth cinematic entrance
export const EASE_OUT = [0.16, 1, 0.3, 1]; // Responsive deceleration
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]; // Symmetrical transition
export const EASE_CINEMATIC = [0.76, 0, 0.24, 1]; // Heavy editorial reveal

// Spring presets
export const SPRING_TIGHT = {
  type: 'spring',
  stiffness: 450,
  damping: 32,
  mass: 0.6,
};

export const SPRING_MAGNETIC = {
  type: 'spring',
  stiffness: 220,
  damping: 18,
  mass: 0.4,
};

export const SPRING_BOUNCE = {
  type: 'spring',
  stiffness: 350,
  damping: 20,
};

export const SPRING_SMOOTH = {
  type: 'spring',
  stiffness: 140,
  damping: 16,
};

export const SPRING_CURSOR = {
  type: 'spring',
  stiffness: 500,
  damping: 32,
  mass: 0.2,
};

// Reusable Variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_ENTER },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_ENTER },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const blurReveal = {
  initial: {
    opacity: 0,
    y: 60,
    filter: 'blur(12px)',
  },
  animate: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: custom,
      ease: EASE_ENTER,
    },
  }),
};

export const splitLineVariants = {
  initial: {
    opacity: 0,
    y: 70,
    filter: 'blur(10px)',
  },
  animate: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      delay: 0.35 + i * 0.12,
      ease: EASE_ENTER,
    },
  }),
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_ENTER },
  },
};

export const projectCardVariants = {
  initial: {
    opacity: 0,
    y: 90,
    scale: 0.96,
    filter: 'blur(10px)',
  },
  animate: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: index * 0.18,
      ease: EASE_ENTER,
    },
  }),
};

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: EASE_ENTER,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
    },
  },
};
