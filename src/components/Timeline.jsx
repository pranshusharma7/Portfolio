import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { timelineData } from '../data/timeline';
import { Compass, Calendar, CheckCircle2, Milestone } from 'lucide-react';
import { EASE_ENTER, splitLineVariants } from '../utils/motion';

export default function Timeline() {
  const timelineRef = useRef(null);

  // Track scroll progress through the timeline container for line drawing
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
  });

  return (
    <section
      id="journey"
      ref={timelineRef}
      className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06]"
    >
      {/* Section Header */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <motion.div
            variants={splitLineVariants}
            custom={0}
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-widest uppercase mb-3"
          >
            <Compass className="w-3.5 h-3.5 text-zinc-400" />
            <span>PROGRESSION & MILESTONES</span>
          </motion.div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase overflow-hidden">
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.1}
                className="inline-block"
              >
                The
              </motion.span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.2}
                className="inline-block text-gradient-accent"
              >
                Journey.
              </motion.span>
            </span>
          </h2>
        </div>

        <motion.p
          variants={splitLineVariants}
          custom={0.3}
          className="max-w-md text-sm sm:text-base text-zinc-400 font-normal leading-relaxed"
        >
          From algorithmic foundations and C++ mastery to production web architectures and cutting-edge AI systems.
        </motion.p>
      </motion.div>

      {/* Vertical Timeline Structure */}
      <div className="relative ml-4 sm:ml-8 md:ml-32 pl-8 sm:pl-12 space-y-16">
        {/* Background track line (faint guide) */}
        <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-white/[0.08]" />

        {/* Animated progressive drawn line (scaleY 0 -> 1) */}
        <motion.div
          style={{
            scaleY: smoothProgress,
            transformOrigin: 'top',
          }}
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-400 via-white to-sky-400 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        />

        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0.35, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_ENTER }}
            className="relative group"
          >
            {/* Timeline Node Dot with Spring Scale (0.8 -> 1.2 -> 1) */}
            <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: [0.8, 1.25, 1] }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 18,
                  delay: index * 0.1,
                }}
                className="h-4 w-4 rounded-full bg-[#050505] border-2 border-white/40 group-hover:border-white transition-colors duration-300 flex items-center justify-center shadow-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                  className="h-1.5 w-1.5 rounded-full bg-white group-hover:shadow-[0_0_8px_#ffffff]"
                />
              </motion.div>
            </div>

            {/* Desktop Year Watermark / Side Label with subtle scale on hover/active */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="hidden md:block absolute -left-36 top-0 font-headline text-3xl font-extrabold text-zinc-700 group-hover:text-zinc-300 transition-colors cursor-default"
            >
              {item.year}
            </motion.div>

            {/* Main Content Card with Hover Lift */}
            <motion.div
              whileHover={{
                y: -4,
                transition: { type: 'spring', stiffness: 350, damping: 25 },
              }}
              className="p-6 sm:p-8 rounded-2xl bg-[#09090c] border border-white/[0.06] group-hover:border-white/20 transition-colors duration-300 shadow-sm"
            >
              {/* Mobile Year Badge */}
              <div className="md:hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 font-mono text-xs text-white mb-4">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{item.year}</span>
              </div>

              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
                {item.tagline}
              </div>

              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <div className="font-mono text-xs sm:text-sm text-zinc-400 mt-1">
                {item.subtitle}
              </div>

              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Milestones List */}
              <div className="mt-6 pt-6 border-t border-white/[0.05] grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              {/* Highlight Banner */}
              <div className="mt-6 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-2.5 text-xs font-mono text-zinc-300">
                <Milestone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-zinc-400">Key Focus:</span>
                <span className="text-white font-medium">{item.highlight}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
