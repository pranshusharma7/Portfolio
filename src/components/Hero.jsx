import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const roles = ['Full Stack Developer', 'MERN Stack Specialist', 'AI & Creative Engineer'];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Grid & Aurora Mesh */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none opacity-40 dark:opacity-40" />
      
      {/* Ambient glowing radial orbs (GPU-accelerated radial gradients, 0ms blur lag) */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none rounded-full aurora-orb-1 opacity-70 dark:opacity-85"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 90, 0.18) 0%, rgba(255, 77, 90, 0.05) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] pointer-events-none rounded-full aurora-orb-2 opacity-60 dark:opacity-75"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Status Chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-white/[0.04] border border-emerald-500/20 dark:border-white/10 w-fit mb-6 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                {personalInfo.status}
              </span>
            </motion.div>

            {/* Intro Header */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-slate-500 dark:text-zinc-400 uppercase mb-2"
            >
              {personalInfo.intro}
            </motion.p>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-sora text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
            >
              <span>Pranshu</span>{' '}
              <span className="text-slate-400 dark:text-zinc-500">Sharma.</span>
            </motion.h1>

            {/* Role Dynamic Typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-sora font-semibold text-slate-700 dark:text-zinc-300 mb-6 h-10"
            >
              <span className="text-[#ff4d5a]">{displayText}</span>
              <span className="w-0.5 h-7 bg-[#ff4d5a] animate-pulse inline-block" />
            </motion.div>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-8"
            >
              {personalInfo.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[#ff4d5a]/25 hover:shadow-[#ff4d5a]/40 hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <i className="bx bx-right-arrow-alt text-lg" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.09] text-slate-800 dark:text-white border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Let's Talk</span>
                <i className="bx bx-send text-base text-[#ff4d5a]" />
              </a>

              <a
                href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-dashed border-slate-300 dark:border-white/20 hover:border-[#ff4d5a]/60 text-slate-700 dark:text-zinc-300 hover:text-[#ff4d5a] dark:hover:text-white font-medium text-sm transition-all duration-300"
              >
                <i className="bx bx-file text-base text-[#ff4d5a]" />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Connect / Social Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/5"
            >
              <span className="text-xs font-mono font-medium tracking-wider text-slate-400 dark:text-zinc-500 uppercase">
                CONNECT
              </span>
              <div className="flex items-center gap-2">
                {personalInfo.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/[0.03] hover:bg-[#ff4d5a]/10 dark:hover:bg-[#ff4d5a]/15 border border-slate-200 dark:border-white/[0.08] hover:border-[#ff4d5a]/40 text-slate-600 dark:text-zinc-400 hover:text-[#ff4d5a] flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
                  >
                    <i className={`bx ${social.icon}`} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Frame with Smooth Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Decorative Number Watermark */}
            <div className="absolute -top-8 -right-2 font-sora font-extrabold text-7xl text-slate-200/50 dark:text-white/[0.03] select-none pointer-events-none">
              01
            </div>

            {/* Ambient Glow Backing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4d5a]/15 via-transparent to-[#6366f1]/15 rounded-3xl blur-2xl -z-10" />

            {/* Smooth Floating Living Card Wrapper */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative w-full max-w-[370px] aspect-[4/5] rounded-3xl p-2.5 bg-white/70 dark:bg-[#0c0c14]/80 border border-slate-200/80 dark:border-white/10 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,77,90,0.15)]"
            >
              {/* Inner Editorial Photo Framing Container */}
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0d0d16] relative border border-slate-200/50 dark:border-white/5">
                <img
                  src="/pranshu-portrait.jpg"
                  alt="Pranshu Sharma"
                  className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Editorial Vignette & Ground Fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent dark:from-[#06060a]/90 dark:via-[#06060a]/40 dark:to-transparent pointer-events-none" />

                {/* Subtitle Bar at bottom of photo */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between z-10 pointer-events-none">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest text-emerald-300 font-semibold uppercase">
                        ACTIVE / BUILD MODE
                      </span>
                    </div>
                    <p className="font-sora text-base font-bold text-white tracking-tight leading-tight">
                      Pranshu Sharma
                    </p>
                    <p className="text-[11px] font-mono text-zinc-300">
                      Creative Web Engineer · India
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    28°N 77°E
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: Full Stack Developer (Organic Floating) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="absolute -bottom-3 -left-3 sm:-left-5 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0e0e18]/95 border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-3 transition-transform duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[#ff4d5a]/15 border border-[#ff4d5a]/30 flex items-center justify-center text-[#ff4d5a] text-lg">
                  <i className="bx bx-code-alt" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">Full Stack</div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">Developer</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Building Digital Products */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="absolute top-5 -right-3 sm:-right-5 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0e0e18]/95 border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transition-transform duration-300"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d5a] shadow-[0_0_10px_#ff4d5a]" />
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">Building</div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">Digital Products</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group"
      >
        <div className="w-5 h-8 rounded-full border border-slate-300 dark:border-white/20 flex items-start justify-center p-1 group-hover:border-[#ff4d5a]/60 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-[#ff4d5a]"
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL</span>
      </a>
    </section>
  );
}
