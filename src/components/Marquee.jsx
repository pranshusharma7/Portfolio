import React from 'react';
import { marqueeTech } from '../data/portfolioData';

export default function Marquee() {
  const repeated = [...marqueeTech, ...marqueeTech, ...marqueeTech];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-slate-200 dark:border-white/[0.06] bg-slate-100/60 dark:bg-[#090910]/40 backdrop-blur-md select-none transition-colors duration-300">
      {/* Side Fade Gradients */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#f8fafc] dark:from-[#06060a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#f8fafc] dark:from-[#06060a] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee items-center gap-8 text-sm sm:text-base font-mono uppercase tracking-widest text-slate-600 dark:text-zinc-400">
        {repeated.map((item, idx) => (
          <React.Fragment key={`${item}-${idx}`}>
            <span className="hover:text-slate-950 dark:hover:text-white transition-colors duration-200 font-medium">
              {item}
            </span>
            <i className="bx bx-star text-xs text-[#ff4d5a]" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
