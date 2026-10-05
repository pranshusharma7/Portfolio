import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import ScrollProgress from '../components/ScrollProgress';
import CommandPalette from '../components/CommandPalette';

export default function Home() {
  const [cmdkOpen, setCmdkOpen] = useState(false);

  useEffect(() => {
    const handleOpenCmdk = () => setCmdkOpen(true);
    window.addEventListener('open-cmdk', handleOpenCmdk);
    return () => window.removeEventListener('open-cmdk', handleOpenCmdk);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#06060a] dark:text-[#ededed] transition-colors duration-300 overflow-x-hidden selection:bg-[#ff4d5a] selection:text-white">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation Bar */}
      <Navbar onOpenCmdk={() => setCmdkOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back To Top */}
      <BackToTop />

      {/* Command Palette Modal */}
      <CommandPalette isOpen={cmdkOpen} onClose={() => setCmdkOpen(false)} />
    </div>
  );
}
