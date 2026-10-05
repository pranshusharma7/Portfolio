import React from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff4d5a] via-[#ff784e] to-[#ff4d5a] z-50 pointer-events-none"
    />
  );
}
