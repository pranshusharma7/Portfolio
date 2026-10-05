import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '../utils/scroll';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isOver = window.scrollY > 400;
          setVisible((prev) => (prev !== isOver ? isOver : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-2xl bg-[#ff4d5a] text-white flex items-center justify-center text-xl shadow-lg shadow-[#ff4d5a]/30 hover:bg-[#ff3b4b] transition-colors"
        >
          <i className="bx bx-chevron-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
