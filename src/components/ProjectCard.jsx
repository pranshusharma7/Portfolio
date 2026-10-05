import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Cpu, Activity, FileText, Truck } from 'lucide-react';
import { EASE_ENTER } from '../utils/motion';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  // Motion values for smooth 3D tilt and spotlight tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Springs for 3D tilt angles
  const springConfig = { stiffness: 260, damping: 24, mass: 0.5 };
  const rotateX = useSpring(rawY, springConfig);
  const rotateY = useSpring(rawX, springConfig);

  // Inner visual parallax (moving slightly slower than the card for looking-through-a-window depth)
  const innerVisualX = useTransform(rotateY, [-5, 5], [6, -6]);
  const innerVisualY = useTransform(rotateX, [-5, 5], [-6, 6]);

  // Spotlight gradient coordinates
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromCenterX = e.clientX - (rect.left + width / 2);
    const mouseFromCenterY = e.clientY - (rect.top + height / 2);

    // Clamp tilt angles to maximum ±5 degrees
    const rY = (mouseFromCenterX / (width / 2)) * 4.5;
    const rX = -(mouseFromCenterY / (height / 2)) * 4.5;

    rawX.set(rY);
    rawY.set(rX);

    // Spotlight position
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const getIconForProject = (slug) => {
    switch (slug) {
      case 'medikiosk':
        return <Activity className="w-5 h-5 text-sky-400" />;
      case 'pdf2pro':
        return <FileText className="w-5 h-5 text-purple-400" />;
      case 'smart-waste':
        return <Truck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  // Stagger arrival values based on index (100, 120, 140)
  const yArrival = 100 + index * 20;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yArrival,
        scale: 0.96,
        filter: 'blur(10px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay: index * 0.16,
        ease: EASE_ENTER,
      }}
      className="group relative select-none"
      data-cursor="project"
      data-cursor-text="VIEW"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          y: -8,
          transition: { type: 'spring', stiffness: 350, damping: 25 },
        }}
        className="rounded-3xl bg-[#09090c] border border-white/[0.08] hover:border-white/25 transition-colors duration-500 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        <Link to={`/work/${project.slug}`} className="block relative">
          {/* Dynamic Spotlight Radial Gradient */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: `radial-gradient(550px circle at 50% 30%, rgba(255,255,255,0.07), transparent 75%)`,
            }}
          />

          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[490px]">
            {/* Card Header: Meta + Index */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-white/20 transition-colors">
                    {getIconForProject(project.slug)}
                  </span>
                  <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-600">PROJ_{project.id}</span>
                  <span className="font-mono text-xs text-zinc-400">/ {project.year}</span>
                </div>
              </div>

              {/* Title, Tagline and Corner Arrow */}
              <div className="mt-8 flex items-start justify-between">
                <div>
                  <motion.h3
                    className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    {project.title}
                  </motion.h3>
                  <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400">
                    {project.tagline}
                  </p>
                </div>

                {/* Physical Arrow Icon reacting to hover */}
                <div className="h-12 w-12 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shrink-0 ml-4 shadow-sm">
                  <ArrowUpRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal transition-colors duration-300 group-hover:text-zinc-300">
                {project.description}
              </p>
            </div>

            {/* Interactive Visual UI Preview Card with Parallax Depth */}
            <motion.div
              style={{
                x: innerVisualX,
                y: innerVisualY,
              }}
              className="my-8 rounded-2xl bg-[#0e0e12] border border-white/[0.06] p-5 relative overflow-hidden group-hover:border-white/15 transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-[0.5deg]"
            >
              {/* Ambient project accent glow */}
              <div
                className="absolute -right-12 -top-12 w-52 h-52 rounded-full blur-[80px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-45"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Code / Architecture preview header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-zinc-400">{project.slug}.sys</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Dynamic Metric Badges Grid */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {project.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-all duration-300 group-hover:bg-white/[0.05] group-hover:border-white/[0.08]"
                  >
                    <div className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 tracking-wider truncate">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card Footer: Tech Stack Chips with upward hover shift */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
              {project.technologies.slice(0, 5).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] transition-all duration-300 group-hover:border-white/20 group-hover:text-zinc-200 group-hover:-translate-y-0.5"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2.5 py-1 text-xs font-mono text-zinc-500">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
