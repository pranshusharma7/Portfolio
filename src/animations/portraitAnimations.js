/**
 * Living Portrait Motion Choreography & Physics Configuration
 * 
 * Choreography sequence:
 * 0ms    - Ambient background / grid appears
 * 200ms  - Navbar reveals
 * 400ms  - Eyebrow badge appears
 * 500ms  - Hero headline line 1 reveals
 * 700ms  - Hero headline line 2 reveals
 * 900ms  - Supporting bio description appears
 * 1000ms - Action buttons appear
 * 1100ms - Portrait reveal begins (clip-path, scale 1.12 -> 1, blur 12px -> 0, opacity 0 -> 1)
 * 1400ms - Portrait becomes fully visible
 * 1600ms - Floating metadata chips & particle field appear
 * 1800ms - Portrait enters subtle idle breathing motion
 */

import { EASE_ENTER } from '../utils/motion';

export const CHOREOGRAPHY = {
  eyebrow: 0.4,
  headlineLine1: 0.5,
  headlineLine2: 0.7,
  description: 0.9,
  buttons: 1.0,
  portraitReveal: 1.1,
  floatingElements: 1.6,
  idleMotionStart: 1.8,
};

// 3D Tilt Spring Physics
export const SPRING_TILT = {
  stiffness: 150,
  damping: 22,
  mass: 0.6,
};

// Cursor Light Follow Spring Physics
export const SPRING_LIGHT = {
  stiffness: 110,
  damping: 24,
  mass: 0.8,
};

// Parallax Spring Physics
export const SPRING_PARALLAX = {
  stiffness: 130,
  damping: 20,
  mass: 0.5,
};

// Floating Magnetic Label Spring Physics
export const SPRING_LABEL = {
  type: 'spring',
  stiffness: 280,
  damping: 20,
  mass: 0.3,
};

// Initial Cinematic Reveal Variant
export const portraitRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 1.12,
    filter: 'blur(12px)',
    clipPath: 'inset(14% 10% 14% 10% round 36px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    clipPath: 'inset(0% 0% 0% 0% round 28px)',
    transition: {
      duration: 1.1,
      delay: CHOREOGRAPHY.portraitReveal,
      ease: EASE_ENTER,
    },
  },
};

// Orbiting Metadata Badge Variants
export const floatingBadgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(6px)',
  },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      delay: CHOREOGRAPHY.floatingElements + custom * 0.12,
      ease: EASE_ENTER,
    },
  }),
};
