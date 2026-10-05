import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ff4d5a]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-[#ff4d5a] uppercase">
            01 — ABOUT
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
            Turning ideas into <span className="text-zinc-400">digital experiences.</span>
          </h2>
        </motion.div>

        {/* About Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Index Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-2 flex-col items-center gap-4 pt-2"
          >
            <span className="font-sora font-extrabold text-5xl text-white/20 select-none">
              01
            </span>
            <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>

          {/* Text and Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-10 space-y-8"
          >
            <p className="text-xl sm:text-2xl text-zinc-200 font-light leading-relaxed">
              {personalInfo.aboutText1}
            </p>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
              {personalInfo.aboutText2}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ff4d5a]/40 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="font-sora text-4xl sm:text-5xl font-extrabold text-white mb-2 flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-[#ff4d5a] text-3xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono tracking-wider text-zinc-400 uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
