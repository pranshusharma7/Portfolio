import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#ff4d5a]/10 rounded-full blur-[140px] pointer-events-none" />

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
            04 — WORK
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
            Things I've <span className="text-zinc-400">built.</span>
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
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative rounded-3xl p-6 sm:p-10 bg-[#0d0d18]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-2xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReverse ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative group rounded-2xl overflow-hidden bg-black/40 border border-white/10 aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-[#06060a]/30 group-hover:bg-transparent transition-colors duration-300" />

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
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-mono text-zinc-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300"
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-medium text-xs transition-all duration-300 shadow-md shadow-[#ff4d5a]/20"
                      >
                        <span>View Project</span>
                        <i className="bx bx-right-arrow-alt text-base" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 font-medium text-xs transition-all duration-300"
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
      </div>
    </section>
  );
}
