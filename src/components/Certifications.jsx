import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background ambient orb */}
      <div
        className="absolute top-1/2 -left-10 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-60 dark:opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 90, 0.15) 0%, rgba(255, 77, 90, 0.04) 50%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-[#ff4d5a] uppercase">
            05 — CREDENTIALS
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Certifications & <span className="text-slate-400 dark:text-zinc-400">learning.</span>
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative p-8 rounded-3xl bg-white dark:bg-[#0d0d16]/80 border border-slate-200/90 dark:border-white/[0.08] hover:border-[#ff4d5a]/40 hover:shadow-xl dark:hover:bg-[#111122] transition-all duration-300 flex flex-col justify-between group shadow-md shadow-slate-200/40 dark:shadow-none"
            >
              {/* Top Accent Index */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#ff4d5a]/15 text-[#ff4d5a] flex items-center justify-center text-2xl border border-[#ff4d5a]/25 group-hover:scale-105 transition-transform shadow-xs">
                  <i className="bx bx-award" />
                </div>
                <span className="font-sora font-extrabold text-3xl text-slate-200 dark:text-white/10 group-hover:text-[#ff4d5a]/20 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-semibold tracking-widest text-slate-400 dark:text-zinc-500 uppercase block mb-2">
                  {cert.category}
                </span>

                <h3 className="font-sora text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#ff4d5a] transition-colors">
                  {cert.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-8">
                  {cert.description}
                </p>
              </div>

              {/* View Verification Link */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08]">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#ff4d5a] hover:text-[#ff3b4b] transition-colors"
                >
                  <span>View Certification</span>
                  <i className="bx bx-right-arrow-alt text-base group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
