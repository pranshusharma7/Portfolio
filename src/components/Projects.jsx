import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 -right-16 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-60 dark:opacity-80"
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
            04 — WORK
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            Things I've <span className="text-slate-400 dark:text-zinc-400">built.</span>
          </h2>
        </motion.div>

        {/* Project Cards List */}
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl p-6 sm:p-10 bg-white/95 dark:bg-[#0d0d18]/80 border border-slate-200/90 dark:border-white/[0.08] hover:border-[#ff4d5a]/30 dark:hover:border-white/20 transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-2xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReverse ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative group rounded-2xl overflow-hidden bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 aspect-[16/10] shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-slate-950/10 dark:bg-[#06060a]/30 group-hover:bg-transparent transition-colors duration-300" />

                      {/* External Link overlay icon */}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
                      >
                        <span className="w-14 h-14 rounded-full bg-[#ff4d5a] text-white flex items-center justify-center text-2xl shadow-xl shadow-[#ff4d5a]/40 scale-75 group-hover:scale-100 transition-transform duration-300">
                          <i className="bx bx-link-external" />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className={`lg:col-span-5 ${isReverse ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#ff4d5a] uppercase">
                        {project.category}
                      </span>
                      <span className="text-slate-300 dark:text-zinc-600">•</span>
                      <span className="text-xs font-mono text-slate-400 dark:text-zinc-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-sora text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-zinc-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-medium text-xs transition-all duration-300 shadow-md shadow-[#ff4d5a]/25 hover:shadow-[#ff4d5a]/40 hover:-translate-y-0.5"
                      >
                        <span>View Project</span>
                        <i className="bx bx-right-arrow-alt text-base" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white border border-slate-300 dark:border-white/10 font-medium text-xs transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                      >
                        <i className="bx bxl-github text-base" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View More Projects Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/pranshusharma7?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-[#0c0c16]/90 border border-slate-200 dark:border-white/10 hover:border-[#ff4d5a]/50 text-slate-800 dark:text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-[#ff4d5a]/10 hover:-translate-y-1"
          >
            <div className="w-8 h-8 rounded-xl bg-[#ff4d5a]/10 dark:bg-[#ff4d5a]/15 text-[#ff4d5a] flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              <i className="bx bxl-github" />
            </div>
            <span>View More Projects on GitHub</span>
            <i className="bx bx-right-arrow-alt text-lg text-slate-400 dark:text-zinc-500 group-hover:text-[#ff4d5a] group-hover:translate-x-1.5 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
