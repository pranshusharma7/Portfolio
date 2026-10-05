import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolioData';

const categories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & DB' },
  { id: 'languages', label: 'Languages' },
  { id: 'tools', label: 'DevOps & Tools' },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono font-semibold tracking-widest text-[#ff4d5a] uppercase">
              03 — SKILLS
            </span>
            <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Technologies I <span className="text-zinc-400">work with.</span>
            </h2>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillCategory"
                      className="absolute inset-0 rounded-xl bg-[#ff4d5a] shadow-md shadow-[#ff4d5a]/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl bg-[#0c0c16]/80 border border-white/[0.07] hover:border-[#ff4d5a]/40 hover:bg-[#111120] transition-all duration-300"
              >
                {/* Top Row: Icon + Index */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: skill.color || '#ff4d5a'
                    }}
                  >
                    <i className={`bx ${skill.icon}`} />
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-500 group-hover:text-zinc-400">
                    {skill.id}
                  </span>
                </div>

                {/* Name & Description */}
                <h3 className="font-sora text-base font-bold text-white mb-2 group-hover:text-[#ff4d5a] transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
