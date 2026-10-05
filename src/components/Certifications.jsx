import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);

  const displayedCertifications = showAll ? certifications : certifications.slice(0, 2);

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
          <AnimatePresence mode="popLayout">
            {displayedCertifications.map((cert, index) => (
              <motion.article
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
          </AnimatePresence>
        </div>

        {/* View More Certifications Action */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 text-center"
        >
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-[#0c0c16]/90 border border-slate-200 dark:border-white/10 hover:border-[#ff4d5a]/50 text-slate-800 dark:text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-[#ff4d5a]/10 hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#ff4d5a]/10 dark:bg-[#ff4d5a]/15 text-[#ff4d5a] flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              <i className="bx bx-award" />
            </div>
            <span>{showAll ? 'Show Fewer Certifications' : 'View More Certifications'}</span>
            <i
              className={`bx ${
                showAll ? 'bx-chevron-up' : 'bx-chevron-down'
              } text-lg text-slate-400 dark:text-zinc-500 group-hover:text-[#ff4d5a] transition-all`}
            />
          </button>

          <a
            href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/10 text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-1 shadow-xs"
          >
            <i className="bx bxl-linkedin text-lg text-[#0077b5]" />
            <span>All on LinkedIn</span>
            <i className="bx bx-link-external text-sm opacity-60" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
