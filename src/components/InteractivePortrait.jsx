import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Code2, MapPin } from 'lucide-react';
import PortraitGlow from './PortraitGlow';
import PortraitParticles from './PortraitParticles';
import {
  SPRING_TILT,
  SPRING_LIGHT,
  SPRING_PARALLAX,
  SPRING_LABEL,
  portraitRevealVariants,
  floatingBadgeVariants,
} from '../animations/portraitAnimations';
import { EASE_ENTER } from '../utils/motion';

export default function InteractivePortrait() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Motion Values for Parallax and Tilt
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const cardRelX = useMotionValue(50); // percentage for light gradient
  const cardRelY = useMotionValue(50); // percentage for light gradient

  // Springs for 3D Tilt (perspective 1200px, clamp +/- 4deg)
  const tiltSpringX = useSpring(rawMouseY, SPRING_TILT);
  const tiltSpringY = useSpring(rawMouseX, SPRING_TILT);
  const rotateX = useTransform(tiltSpringX, [-1, 1], [4, -4]);
  const rotateY = useTransform(tiltSpringY, [-1, 1], [-4, 4]);

  // Spring values for mouse parallax layers
  const smoothMouseX = useSpring(rawMouseX, SPRING_PARALLAX);
  const smoothMouseY = useSpring(rawMouseY, SPRING_PARALLAX);

  // Layer 1 (Background Glow): 2-3px movement
  const bgX = useTransform(smoothMouseX, [-1, 1], [3, -3]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [3, -3]);

  // Layer 2 (Portrait Image): 8-10px movement
  const imgX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const imgY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  // Layer 3 (Highlight sheen): 12-14px movement
  const highlightX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const highlightY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  // Layer 4 (Particles / Orbiting chips): 15-20px movement
  const chipsX = useTransform(smoothMouseX, [-1, 1], [-16, 16]);
  const chipsY = useTransform(smoothMouseY, [-1, 1], [-16, 16]);

  // Cursor Following Light Spot (Delayed spring movement)
  const lightX = useSpring(cardRelX, SPRING_LIGHT);
  const lightY = useSpring(cardRelY, SPRING_LIGHT);
  const lightBackground = useTransform(
    [lightX, lightY],
    ([x, y]) =>
      `radial-gradient(circle 240px at ${x}% ${y}%, rgba(255, 255, 255, 0.12) 0%, rgba(165, 180, 252, 0.05) 45%, transparent 80%)`
  );

  // Floating Magnetic Label Position Springs (Offset relative to container)
  const labelRawX = useMotionValue(0);
  const labelRawY = useMotionValue(0);
  const labelX = useSpring(labelRawX, SPRING_LABEL);
  const labelY = useSpring(labelRawY, SPRING_LABEL);

  // Scroll Transformation (Scroll away from hero: scale 1 -> 0.75, rotate 0 -> -4deg, y 0 -> -80px, opacity 1 -> 0.7)
  const { scrollY } = useScroll();
  const scrollScale = useTransform(scrollY, [0, 600], [1, 0.75]);
  const scrollRotate = useTransform(scrollY, [0, 600], [0, -4]);
  const scrollYOffset = useTransform(scrollY, [0, 600], [0, -80]);
  const scrollOpacity = useTransform(scrollY, [0, 600], [1, 0.7]);

  // Mouse handlers with normalized coordinates [-1, 1]
  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    rawMouseX.set(normX);
    rawMouseY.set(normY);

    // Percentage coordinates for the inner radial light
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    cardRelX.set(pctX);
    cardRelY.set(pctY);

    // Magnetic label offset relative to cursor
    labelRawX.set(e.clientX - rect.left + 15);
    labelRawY.set(e.clientY - rect.top - 25);
  };

  const handleMouseEnter = (e) => {
    if (isTouchDevice || prefersReducedMotion) return;
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawMouseX.set(0);
    rawMouseY.set(0);
    cardRelX.set(50);
    cardRelY.set(50);
  };

  return (
    <div className="relative flex items-center justify-center w-full select-none">
      {/* Outer Scroll Transform Wrapper */}
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : scrollScale,
          rotate: prefersReducedMotion ? 0 : scrollRotate,
          y: prefersReducedMotion ? 0 : scrollYOffset,
          opacity: prefersReducedMotion ? 1 : scrollOpacity,
        }}
        className="relative flex items-center justify-center"
      >
        {/* Subtle Idle Breathing Motion Container */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -6, 0],
                  rotate: [0, 0.5, 0],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
          {/* Layer 1: Ambient Background Aura & Technical Coordinate Grid */}
          <PortraitGlow bgParallaxX={bgX} bgParallaxY={bgY} />

          {/* Layer 2: Floating Canvas Particles */}
          <PortraitParticles isHovered={isHovered} />

          {/* 3D Perspective Tilt Card Wrapper */}
          <div
            style={{ perspective: 1200 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              ref={containerRef}
              data-cursor="explore"
              data-cursor-text="EXPLORE"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              variants={portraitRevealVariants}
              initial="hidden"
              animate="visible"
              style={{
                rotateX: prefersReducedMotion || isTouchDevice ? 0 : rotateX,
                rotateY: prefersReducedMotion || isTouchDevice ? 0 : rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={
                prefersReducedMotion || isTouchDevice
                  ? {}
                  : {
                      scale: 1.025,
                      transition: { duration: 0.35, ease: 'easeOut' },
                    }
              }
              className="group relative w-[290px] sm:w-[350px] md:w-[380px] lg:w-[410px] aspect-[3/4] rounded-[28px] p-2 sm:p-2.5 transition-shadow duration-500 cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_80px_rgba(99,102,241,0.2)]"
            >
              {/* Animated Conic Edge Glow Border (Traveling 12s cycle) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[28px] p-[1.5px] overflow-hidden pointer-events-none"
              >
                <div
                  className="absolute -inset-[100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(255,255,255,0.7)_330deg,transparent_360deg)] opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                  style={{ animationDuration: '10s' }}
                />
                <div className="absolute inset-[1.5px] rounded-[26.5px] bg-[#07070a]/90 backdrop-blur-xl" />
              </div>

              {/* Inner Editorial Photo Framing Container */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0a0a0e] border border-white/[0.08]">
                {/* Layer 3: The High-Resolution Genuine Photograph */}
                <motion.div
                  style={{
                    x: prefersReducedMotion || isTouchDevice ? 0 : imgX,
                    y: prefersReducedMotion || isTouchDevice ? 0 : imgY,
                    scale: 1.05,
                  }}
                  className="relative w-full h-full"
                >
                  <img
                    src="/pranshu-portrait.jpg"
                    alt="Pranshu — Creative Developer & AI/ML Engineer"
                    className="w-full h-full object-cover object-[center_18%] filter contrast-[1.04] brightness-[0.98] group-hover:contrast-[1.08] group-hover:brightness-[1.02] transition-all duration-500 pointer-events-none"
                    loading="eager"
                  />

                  {/* Editorial Gradient Lighting & Dark Ground Fade Mask */}
                  {/* Subtle top vignette */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none" />
                  
                  {/* Seamless Bottom Obsidian Fade (blends natural ground softly into portfolio dark palette) */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07070a] via-[#07070a]/70 to-transparent pointer-events-none" />

                  {/* Cold Film Color Grading Tint (Editorial Indigo Sheen) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/25 via-transparent to-purple-950/15 mix-blend-color pointer-events-none" />
                </motion.div>

                {/* Layer 4: Soft Cursor-Following Dynamic Light Sheen */}
                {!isTouchDevice && !prefersReducedMotion && (
                  <motion.div
                    style={{
                      background: lightBackground,
                      x: highlightX,
                      y: highlightY,
                    }}
                    className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-300"
                  />
                )}

                {/* Layer 5: Digital Scan Pass (Subtle 5.5s cycle) */}
                <div
                  aria-hidden="true"
                  className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent mix-blend-overlay"
                />

                {/* Layer 6: Tactile Micro Film Noise */}
                <div className="pointer-events-none absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

                {/* Inner Bottom Info Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10 pointer-events-none">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                        ONLINE / BUILD MODE
                      </span>
                    </div>
                    <p className="font-headline text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
                      Pranshu
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      CS + AI/ML · India
                    </p>
                  </div>

                  {/* Corner Tech Coordinate Stamp */}
                  <div className="text-right">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 block uppercase">
                      LOC: 28°N 77°E
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600 block mt-0.5">
                      SYS: ONLINE
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Magnetic Label on Hover ("HELLO, I'M PRANSHU" / "VIEW ME") */}
              <AnimatePresence>
                {isHovered && !isTouchDevice && (
                  <motion.div
                    style={{
                      x: labelX,
                      y: labelY,
                      translateX: '-50%',
                      translateY: '-50%',
                    }}
                    initial={{ opacity: 0, scale: 0.6, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.6, filter: 'blur(6px)' }}
                    transition={{ duration: 0.25, ease: EASE_ENTER }}
                    className="pointer-events-none absolute top-0 left-0 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-black shadow-xl backdrop-blur-md border border-white"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
                      HELLO, I'M PRANSHU
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Layer 8: Orbiting Floating Metadata Badges */}
          <motion.div
            style={{
              x: prefersReducedMotion || isTouchDevice ? 0 : chipsX,
              y: prefersReducedMotion || isTouchDevice ? 0 : chipsY,
            }}
            className="pointer-events-none absolute inset-0 z-20"
          >
            {/* Badge 1: Top Right - AI / ML */}
            <motion.div
              custom={0}
              variants={floatingBadgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[10px] font-mono text-indigo-300 transition-transform duration-300 hover:scale-105"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>AI / ML</span>
            </motion.div>

            {/* Badge 2: Mid-Left - FULL STACK */}
            <motion.div
              custom={1}
              variants={floatingBadgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-1/3 -left-3 sm:-left-6 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[10px] font-mono text-sky-300 transition-transform duration-300 hover:scale-105"
            >
              <Terminal className="w-3 h-3 text-sky-400" />
              <span>FULL STACK</span>
            </motion.div>

            {/* Badge 3: Bottom Right - CREATIVE DEV */}
            <motion.div
              custom={2}
              variants={floatingBadgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute bottom-12 -right-3 sm:-right-6 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[10px] font-mono text-purple-300 transition-transform duration-300 hover:scale-105"
            >
              <Code2 className="w-3 h-3 text-purple-400" />
              <span>CREATIVE DEV</span>
            </motion.div>

            {/* Badge 4: Bottom Left - INDIA */}
            <motion.div
              custom={3}
              variants={floatingBadgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute -bottom-3 left-4 sm:left-6 px-2.5 py-1.2 rounded-lg bg-black/75 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1 text-[9px] font-mono text-zinc-300 transition-transform duration-300 hover:scale-105"
            >
              <MapPin className="w-2.5 h-2.5 text-zinc-400" />
              <span>INDIA</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
