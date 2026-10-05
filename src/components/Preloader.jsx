import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 900; // fast & responsive 0.9s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
        }, 120);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#06060a] text-white select-none pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6">
            {/* PS Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-sora font-extrabold text-[#ff4d5a] text-3xl shadow-[0_0_30px_rgba(255,77,90,0.25)]"
            >
              PS
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff4d5a] to-[#ff784e]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Label */}
            <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              LOADING PORTFOLIO • {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
