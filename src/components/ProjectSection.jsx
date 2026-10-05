import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { Sparkles } from 'lucide-react';
import { splitLineVariants } from '../utils/motion';

export default function ProjectSection() {
  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header with Staggered Scroll Reveal */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          {/* Eyebrow */}
          <motion.div
            variants={splitLineVariants}
            custom={0}
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>SELECTED WORK (01 — 03)</span>
          </motion.div>

          {/* Headline with split lines & final word flourish */}
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase overflow-hidden">
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.1}
                className="inline-block"
              >
                Things I've
              </motion.span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.22}
                className="inline-block text-gradient-accent"
              >
                built.
              </motion.span>
            </span>
          </h2>
        </div>

        <motion.p
          variants={splitLineVariants}
          custom={0.3}
          className="max-w-md text-sm sm:text-base text-zinc-400 font-normal leading-relaxed"
        >
          Real-world products engineered with a focus on high throughput, intuitive interfaces, and thoughtful human interaction.
        </motion.p>
      </motion.div>

      {/* Project Cards Grid with Physical Arrival Stagger */}
      <div className="flex flex-col gap-12" style={{ perspective: 1200 }}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
