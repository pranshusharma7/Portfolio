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

    // Ultra-smooth, responsive 120fps/60fps Lenis instance with 0ms input lag
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollHandler />

        {/* Ultra-fast, zero-re-render Preloader */}
        <Preloader onComplete={() => setPreloaderFinished(true)} />

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
