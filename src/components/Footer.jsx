import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="pt-20 pb-12 border-t border-white/[0.08] bg-[#050508] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="font-sora text-2xl font-extrabold tracking-tight text-white">
              Pranshu<span className="text-[#ff4d5a]">.</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Full-stack developer crafting fast, accessible and delightful web experiences with the MERN stack. Always shipping, always learning.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {personalInfo.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-[#ff4d5a]/15 border border-white/10 hover:border-[#ff4d5a]/40 text-zinc-400 hover:text-[#ff4d5a] flex items-center justify-center text-lg transition-all duration-300"
                >
                  <i className={`bx ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-widest text-zinc-300 uppercase">
              NAVIGATE
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#skills" onClick={(e) => scrollTo(e, 'skills')} className="hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="hover:text-white transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Elsewhere Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-widest text-zinc-300 uppercase">
              ELSEWHERE
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="https://github.com/pranshusharma7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Resume
                </a>
              </li>
              <li>
                <a href="mailto:pranshu_sharma7@icloud.com" className="hover:text-white transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <span>© 2026 PRANSHU SHARMA — ALL RIGHTS RESERVED</span>
          <span className="flex items-center gap-1.5">
            BUILT WITH CODE, COFFEE & <span className="text-[#ff4d5a]">♥</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
