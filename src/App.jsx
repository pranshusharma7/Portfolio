import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Home from './pages/Home';

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'auto' });
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

    // Snappy, hardware-accelerated 60/120fps Lenis instance
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.75,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollHandler />

        {/* Fast & Clean Preloader */}
        <Preloader onComplete={() => setPreloaderFinished(true)} />

        {/* Atmospheric Grain overlay (lightweight, no costly mix-blend-overlay) */}
        <div className="pointer-events-none fixed inset-0 z-30 bg-grain opacity-50 dark:opacity-75" />

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
