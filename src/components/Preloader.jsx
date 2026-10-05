import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Elegant fast 500ms reveal that never blocks the thread
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#06060a] text-white select-none pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6">
            {/* PS Monogram */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-sora font-extrabold text-[#ff4d5a] text-3xl shadow-[0_0_30px_rgba(255,77,90,0.25)]"
            >
              PS
            </motion.div>

            {/* Hardware-Accelerated Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-[#ff4d5a] to-[#ff784e]"
              />
            </div>

            {/* Label */}
            <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              INITIALIZING • READY
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
