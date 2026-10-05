import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { codingProfilesData } from '../data/achievements';
import { Code2, ExternalLink, GitPullRequest, Star, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';
import { EASE_ENTER, splitLineVariants } from '../utils/motion';

export default function CodingSection() {
  const [activeTab, setActiveTab] = useState('github');

  // Simulated 24-week activity grid mockup for developer contribution rhythm
  const weeks = Array.from({ length: 24 }).map((_, wIdx) => {
    return Array.from({ length: 7 }).map((_, dIdx) => {
      const seed = (wIdx * 7 + dIdx) % 13;
      let level = 0;
      if (seed === 2 || seed === 5 || seed === 9) level = 1;
      else if (seed === 3 || seed === 7 || seed === 11) level = 2;
      else if (seed === 4 || seed === 8) level = 3;
      return { level };
    });
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-emerald-950 border-emerald-800/40';
      case 2:
        return 'bg-emerald-700 border-emerald-600/40';
      case 3:
        return 'bg-emerald-400 border-emerald-300';
      default:
        return 'bg-white/[0.03] border-white/[0.05]';
    }
  };

  return (
    <section className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <motion.div
            variants={splitLineVariants}
            custom={0}
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-widest uppercase mb-3"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>DEVELOPER ACTIVITY & CODE PROOF</span>
          </motion.div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase overflow-hidden">
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.1}
                className="inline-block"
              >
                Code &
              </motion.span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <motion.span
                variants={splitLineVariants}
                custom={0.2}
                className="inline-block text-gradient-accent"
              >
                Repositories.
              </motion.span>
            </span>
          </h2>
        </div>

        <motion.p
          variants={splitLineVariants}
          custom={0.3}
          className="max-w-md text-sm sm:text-base text-zinc-400 font-normal leading-relaxed"
        >
          Daily commits, open-source repositories, and continuous algorithmic problem solving across competitive platforms.
        </motion.p>
      </motion.div>

      {/* Tabs Switcher with Spring Indicator */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('github')}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono transition-colors duration-200 ${
            activeTab === 'github' ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {activeTab === 'github' && (
            <motion.div
              layoutId="activeCodingTabIndicator"
              className="absolute inset-0 bg-white rounded-full shadow-md"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Activity</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab('leetcode')}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono transition-colors duration-200 ${
            activeTab === 'leetcode' ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {activeTab === 'leetcode' && (
            <motion.div
              layoutId="activeCodingTabIndicator"
              className="absolute inset-0 bg-white rounded-full shadow-md"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>LeetCode & DSA</span>
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Tab 1: GitHub Repositories & Graph */}
        {activeTab === 'github' && (
          <motion.div
            key="github-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: EASE_ENTER }}
            className="space-y-8"
          >
            {/* GitHub Activity Heatmap Block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#09090c] border border-white/[0.06] overflow-x-auto shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-white" />
                  <span className="font-headline font-bold text-white text-lg">
                    @{codingProfilesData.github.username}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Contributor
                  </span>
                </div>

                <a
                  href={codingProfilesData.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
                >
                  <span>View Full Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Heatmap Grid */}
              <div className="pt-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                  <span>Recent Commit Stream</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-xs bg-white/[0.03] border border-white/[0.05]" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-950 border border-emerald-800/40" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-700 border border-emerald-600/40" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400 border border-emerald-300" />
                    <span>More</span>
                  </div>
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-2">
                  {weeks.map((week, w) => (
                    <div key={w} className="flex flex-col gap-1.5">
                      {week.map((day, d) => (
                        <div
                          key={d}
                          className={`w-3 h-3 rounded-xs border transition-transform duration-200 hover:scale-130 ${getLevelColor(
                            day.level
                          )}`}
                          title="Contribution recorded"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Repositories Grid with Staggered Entrance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {codingProfilesData.github.recentRepos.map((repo, rIndex) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: rIndex * 0.1, ease: EASE_ENTER }}
                  whileHover={{
                    y: -5,
                    transition: { type: 'spring', stiffness: 350, damping: 25 },
                  }}
                  className="p-6 rounded-2xl bg-[#09090c] border border-white/[0.06] hover:border-white/20 transition-colors duration-300 group flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3">
                      <div className="flex items-center gap-2">
                        <GitPullRequest className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                        <h4 className="font-mono text-sm font-semibold text-white group-hover:underline">
                          {repo.name}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        Public
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mt-2">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span className="text-zinc-400">{repo.lang}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 hover:text-zinc-300">
                        <Star className="w-3.5 h-3.5 text-zinc-500" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 hover:text-zinc-300">
                        <GitPullRequest className="w-3.5 h-3.5 text-zinc-500" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: LeetCode & Algorithmic Practice */}
        {activeTab === 'leetcode' && (
          <motion.div
            key="leetcode-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: EASE_ENTER }}
            className="p-6 sm:p-8 rounded-2xl bg-[#09090c] border border-white/[0.06] space-y-8 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-amber-400" />
                <span className="font-headline font-bold text-white text-lg">
                  @{codingProfilesData.leetcode.username}
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {codingProfilesData.leetcode.rankTier}
                </span>
              </div>

              <a
                href={codingProfilesData.leetcode.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {codingProfilesData.leetcode.categoryBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <span>{item.category}</span>
                    <span style={{ color: item.color }} className="font-semibold">
                      {item.solved} Solved
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.solved / item.total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.15, ease: EASE_ENTER }}
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 text-right">
                    Pool of {item.total}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Algorithmic Strengths */}
            <div className="pt-4 border-t border-white/[0.05]">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                Core Algorithmic Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {codingProfilesData.leetcode.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-zinc-300 hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
