import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Home from './pages/Home';

gsap.registerPlugin(ScrollTrigger);

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return null;
}

export default function App() {
  const [, setPreloaderFinished] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollHandler />

      {/* Fast & Clean Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Atmospheric Film Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-noise opacity-25 mix-blend-overlay" />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
