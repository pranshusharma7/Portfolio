import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/MagneticButton';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { EASE_ENTER } from '../utils/motion';

export default function ProjectDetails() {
  const { slug } = useParams();

  // Find matching project or default to first
  const project = projects.find((p) => p.slug === slug) || projects[0];
  const nextProject = projects.find((p) => p.slug === project.nextProject) || projects[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] overflow-x-hidden selection:bg-white selection:text-black">
      <Navbar />

      <main className="pt-28 pb-20 px-6 sm:px-8 max-w-6xl mx-auto">
        {/* Back Link with Magnetic Spring */}
        <div className="mb-10">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>
        </div>

        {/* Case Study Header with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, ease: EASE_ENTER }}
          className="pb-12 border-b border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="font-mono text-xs text-zinc-500">YEAR / {project.year}</span>
            <span className="font-mono text-xs text-zinc-600">ID / PROJ_{project.id}</span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.02] uppercase">
            {project.title}
          </h1>

          <p className="mt-4 text-lg sm:text-2xl text-zinc-300 font-normal max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 font-normal max-w-3xl leading-relaxed">
            {project.overview}
          </p>

          {/* Action Links & Repo */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs transition-all duration-300 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Architecture Verified</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual Mockup Banner with Masked Scale Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE_ENTER }}
          className="my-14 rounded-3xl bg-[#0a0a0e] border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl"
        >
          {/* Accent Glow */}
          <div
            className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[140px] opacity-25 pointer-events-none"
            style={{ backgroundColor: project.accentColor }}
          />

          {/* UI Shell Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="ml-2 text-zinc-300 font-semibold">{project.slug}.cloud/app</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <span>LATENCY: 42ms</span>
              <span>•</span>
              <span className="text-emerald-400">STATUS: HEALTHY</span>
            </div>
          </div>

          {/* Key Metric Numbers with Staggered Entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 pb-4">
            {project.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: EASE_ENTER }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between hover:border-white/15 transition-colors"
              >
                <div className="font-headline text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problem vs Solution Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_ENTER }}
            className="p-8 rounded-3xl bg-[#09090c] border border-white/[0.06] flex flex-col justify-between shadow-sm hover:border-white/15 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2.5 font-mono text-xs text-rose-400 uppercase tracking-wider mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>THE BOTTLENECK</span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                The Problem
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_ENTER }}
            className="p-8 rounded-3xl bg-[#09090c] border border-white/[0.06] flex flex-col justify-between shadow-sm hover:border-white/15 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2.5 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>THE ARCHITECTURE</span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                The Engineered Solution
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key Features Grid with Staggered Entrance */}
        <div className="my-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
              CAPABILITIES
            </span>
            <h3 className="font-headline text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Core Technical Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_ENTER }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                className="p-6 rounded-2xl bg-[#09090c] border border-white/[0.06] hover:border-white/20 transition-all shadow-sm"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>FEATURE_0{idx + 1}</span>
                </div>
                <h4 className="font-headline text-lg font-bold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Architecture Flow */}
        <div className="my-20 p-8 sm:p-10 rounded-3xl bg-[#09090c] border border-white/[0.06]">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>DATA PIPELINE</span>
          </div>
          <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase mb-8">
            System Architecture
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.architecture.map((arch, aIdx) => (
              <motion.div
                key={aIdx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: aIdx * 0.1, ease: EASE_ENTER }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative hover:border-white/15 transition-colors"
              >
                <div className="font-mono text-xs text-zinc-500 font-semibold mb-2">
                  {arch.step}
                </div>
                <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {arch.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineering Challenges & Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="p-8 rounded-3xl bg-[#09090c] border border-white/[0.06]">
            <div className="font-mono text-xs text-amber-400 uppercase tracking-wider mb-2">
              COMPLEXITY HANDLED
            </div>
            <h4 className="font-headline text-xl sm:text-2xl font-bold text-white mb-3">
              Engineering Challenges
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.challenges}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#09090c] border border-white/[0.06]">
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2">
              MEASURABLE IMPACT
            </div>
            <h4 className="font-headline text-xl sm:text-2xl font-bold text-white mb-3">
              Results & Validation
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.results}
            </p>
          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="my-16 pt-8 border-t border-white/[0.08]">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-4">
            TECHNOLOGIES EMPLOYED
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Next Project Teaser with Magnetic Button */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              NEXT PROJECT
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-white">
              {nextProject.title}
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-1">{nextProject.category}</p>
          </div>

          <Link to={`/work/${nextProject.slug}`}>
            <MagneticButton
              as="span"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
