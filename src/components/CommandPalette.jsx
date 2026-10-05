import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    { title: 'Home', subtitle: 'Return to top', sectionId: 'home', icon: 'bx-home' },
    { title: 'About', subtitle: 'Background & bio', sectionId: 'about', icon: 'bx-user' },
    { title: 'Services', subtitle: 'What I do & expertise', sectionId: 'services', icon: 'bx-briefcase' },
    { title: 'Skills', subtitle: '17+ Technologies & tools', sectionId: 'skills', icon: 'bx-code-alt' },
    { title: 'Projects', subtitle: 'Things I have built', sectionId: 'projects', icon: 'bx-folder' },
    { title: 'Certifications', subtitle: 'Verified credentials', sectionId: 'certifications', icon: 'bx-award' },
    { title: 'Contact', subtitle: 'Send a message or get in touch', sectionId: 'contact', icon: 'bx-envelope' },
    { 
      title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', 
      subtitle: `Current theme: ${theme}`, 
      action: 'toggle_theme', 
      icon: theme === 'dark' ? 'bx-sun' : 'bx-moon' 
    },
    { title: 'GitHub', subtitle: 'github.com/pranshusharma7', externalUrl: 'https://github.com/pranshusharma7', icon: 'bxl-github' },
    { title: 'LinkedIn', subtitle: 'linkedin.com/in/pranshu-kumar-6742a4323', externalUrl: 'https://www.linkedin.com/in/pranshu-kumar-6742a4323/', icon: 'bxl-linkedin' },
    { title: 'Copy Email', subtitle: 'pranshu_sharma7@icloud.com', action: 'copy_email', icon: 'bx-copy' }
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent('open-cmdk'));
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          executeItem(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const executeItem = (item) => {
    if (item.action === 'toggle_theme') {
      toggleTheme();
    } else if (item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (item.action === 'copy_email') {
      navigator.clipboard.writeText('pranshu_sharma7@icloud.com');
      alert('Email copied to clipboard!');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-white/95 dark:bg-[#0c0c14]/95 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/10 gap-3">
              <i className="bx bx-search text-xl text-[#ff4d5a]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or action..."
                autoFocus
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none text-base font-medium"
              />
              <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400 rounded">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-400 dark:text-zinc-500">
                  No matching destination found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <motion.button
                      key={item.title}
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-[#ff4d5a]/10 dark:bg-[#ff4d5a]/15 text-slate-900 dark:text-white border border-[#ff4d5a]/30'
                          : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                            isSelected
                              ? 'bg-[#ff4d5a] text-white shadow-sm shadow-[#ff4d5a]/50'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400'
                          }`}
                        >
                          <i className={`bx ${item.icon}`} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</div>
                          <div className="text-xs text-slate-500 dark:text-zinc-400">{item.subtitle}</div>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="text-xs font-mono text-[#ff4d5a] flex items-center gap-1 font-semibold">
                          Go <i className="bx bx-right-arrow-alt text-base" />
                        </span>
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 shadow-2xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 shadow-2xs">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1 ml-2">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 shadow-2xs">↵</kbd>
                  select
                </span>
              </div>
              <span className="text-[#ff4d5a] font-mono font-medium">Quick Navigation</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
