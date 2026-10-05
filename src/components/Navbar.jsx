import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenCmdk }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isPastTop = window.scrollY > 30;
          setScrolled((prev) => (prev !== isPastTop ? isPastTop : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = ['home', 'about', 'services', 'skills', 'projects', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-white/80 dark:bg-[#06060a]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center font-sora font-extrabold text-[#ff4d5a] text-lg shadow-sm group-hover:border-[#ff4d5a]/60 group-hover:shadow-[0_0_15px_rgba(255,77,90,0.25)] transition-all duration-300">
            PS
          </div>
          <div className="font-sora font-bold tracking-tight text-slate-900 dark:text-white text-lg">
            PRANSHU<span className="text-[#ff4d5a]">.</span>
          </div>
        </a>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-slate-200/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-slate-950 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-[#ff4d5a]/10 dark:bg-[#ff4d5a]/15 border border-[#ff4d5a]/30 dark:border-[#ff4d5a]/40 shadow-[0_0_12px_rgba(255,77,90,0.15)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Nav ⌘K Trigger */}
          <button
            onClick={onOpenCmdk}
            aria-label="Quick Nav"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.08] text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
          >
            <i className="bx bx-search text-sm text-[#ff4d5a]" />
            <span>Quick nav</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Let's Talk CTA button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white text-xs font-semibold shadow-md shadow-[#ff4d5a]/25 hover:shadow-[#ff4d5a]/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <i className="bx bx-send text-sm" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/[0.08] transition-colors"
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-[#0a0a10]/95 border-b border-slate-200 dark:border-white/10 backdrop-blur-2xl overflow-hidden px-4 py-4 space-y-1 shadow-xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-[#ff4d5a]/10 dark:bg-[#ff4d5a]/15 text-[#ff4d5a] border border-[#ff4d5a]/30'
                      : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCmdk();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-medium text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
              >
                <i className="bx bx-search text-[#ff4d5a]" />
                <span>Search / Quick Nav (⌘K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
