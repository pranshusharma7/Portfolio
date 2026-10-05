import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../data/achievements';
import { Award, Trophy, Code, GitBranch, BookmarkCheck } from 'lucide-react';
import { EASE_ENTER, splitLineVariants } from '../utils/motion';

export default function Achievements() {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Hackathon':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Competitive Coding':
        return <Code className="w-4 h-4 text-sky-400" />;
      case 'Open Source':
        return <GitBranch className="w-4 h-4 text-purple-400" />;
      case 'Certification':
        return <BookmarkCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Award className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
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
            <Award className="w-3.5 h-3.5 text-zinc-400" />
            <span>HONORS & RECOGNITIONS</span>
          </motion.div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase overflow-hidden">
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.1}
                className="inline-block"
              >
                Recognitions &
              </motion.span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.2}
                className="inline-block text-gradient-accent"
              >
                Achievements.
              </motion.span>
            </span>
          </h2>
        </div>

        <motion.p
          variants={splitLineVariants}
          custom={0.3}
          className="max-w-md text-sm sm:text-base text-zinc-400 font-normal leading-relaxed"
        >
          Competitive hackathons, algorithmic milestones, and contributions built with relentless determination.
        </motion.p>
      </motion.div>

      {/* Elegant Interactive Rows with Staggered Entrance & Micro-interactions */}
      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {achievementsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_ENTER }}
            whileHover={{
              x: 8,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            className="group py-6 sm:py-8 transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 relative cursor-default"
          >
            {/* Row Left: Category + Title */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all shrink-0">
                {getCategoryIcon(item.category)}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span className="font-mono text-xs text-zinc-400">{item.issuer}</span>
                </div>

                <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-normal">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Row Right: Year + Badge */}
            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pl-14 sm:pl-0">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08] group-hover:border-white/20 transition-all">
                {item.badge}
              </span>
              <span className="font-mono text-xs text-zinc-500">{item.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
