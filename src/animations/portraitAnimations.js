/**
 * Refined Motion Choreography & Physics Configuration
 * Pure natural motion without any cursor hijacking or cursor effects.
 */

// Smooth standard easings
export const EASE_ENTER = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

export const CHOREOGRAPHY = {
  eyebrow: 0.2,
  headlineLine1: 0.35,
  headlineLine2: 0.5,
  description: 0.65,
  buttons: 0.8,
  portraitReveal: 0.6,
  floatingElements: 1.1,
};

// Organic floating animation presets
export const FLOAT_TRANSITION = (duration = 5, delay = 0) => ({
  duration,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
  delay,
});

// Initial Cinematic Portrait Reveal Variant
export const portraitRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: CHOREOGRAPHY.portraitReveal,
      ease: EASE_ENTER,
    },
  },
};

// Orbiting/Floating Metadata Badge Variants
export const floatingBadgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 15,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: CHOREOGRAPHY.floatingElements + custom * 0.15,
      ease: EASE_SMOOTH,
    },
  }),
};
