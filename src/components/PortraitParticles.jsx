import React, { useEffect, useRef } from 'react';

/**
 * PortraitParticles: High-performance 60fps Canvas particle field
 * - 28 subtle floating particles
 * - Edge-originating digital dust with gentle drift
 * - Outward dispersion impulse on hover
 * - Zero React re-renders on animation loop
 * - Automatic disabled state on mobile / prefers-reduced-motion
 */
export default function PortraitParticles({ isHovered = false }) {
  const canvasRef = useRef(null);
  const hoverRef = useRef(isHovered);

  // Keep hoverRef updated without restarting canvas loop
  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion or touch
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (reducedMotion || isTouch) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const PARTICLE_COUNT = 32;
    const particles = [];

    // Initialize particles clustered around the portrait perimeter
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5);
      const radiusX = (width * 0.42) + (Math.random() - 0.5) * 60;
      const radiusY = (height * 0.44) + (Math.random() - 0.5) * 70;
      
      const centerX = width / 2;
      const centerY = height / 2;

      particles.push({
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY,
        originX: centerX + Math.cos(angle) * radiusX,
        originY: centerY + Math.sin(angle) * radiusY,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.3,
        size: 1.0 + Math.random() * 1.6,
        baseAlpha: 0.15 + Math.random() * 0.4,
        alpha: 0.15 + Math.random() * 0.4,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        dispersionDist: 0,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const hovering = hoverRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Hover dispersion physics: push particles outward from center
        if (hovering) {
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const pushForce = Math.min(1.4, 80 / dist);
          p.x += (dx / dist) * pushForce;
          p.y += (dy / dist) * pushForce;
        }

        // Natural ambient drift
        p.x += p.vx;
        p.y += p.vy;

        // Subtle alpha breathing
        p.alpha = p.baseAlpha + Math.sin(frame * p.pulseSpeed + p.pulseOffset) * 0.15;

        // Wrap around bounds softly
        if (p.y < 0) {
          p.y = height + 10;
          p.x = centerX + (Math.random() - 0.5) * width * 0.8;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Render particle with subtle soft glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 225, 255, ${Math.max(0.05, Math.min(0.85, p.alpha))})`;
        ctx.shadowColor = 'rgba(165, 180, 252, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] z-20 select-none"
    />
  );
}
