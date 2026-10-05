import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    setTimeout(() => {
      setStatus({
        loading: false,
        success: true,
        message: 'Thank you! Your message has been sent successfully.'
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4d5a]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-[#ff4d5a] uppercase">
            06 — LET'S CONNECT
          </span>
          <h2 className="font-sora text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
            Have an idea? <br />
            <span className="italic font-light text-slate-600 dark:text-zinc-300">Let's build it.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas, and exciting opportunities in tech.
          </p>
        </motion.div>

        {/* Quick Copy Email Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-[#ff4d5a]/40 text-sm font-mono text-slate-800 dark:text-zinc-200 transition-all duration-300 shadow-md shadow-slate-200/50 dark:shadow-lg"
          >
            <i className="bx bx-copy text-lg text-[#ff4d5a] group-hover:scale-110 transition-transform" />
            <span>{personalInfo.email}</span>
            {copied && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#ff4d5a] text-white text-[11px] font-sans font-semibold shadow-md animate-fade-in">
                Copied! ✨
              </span>
            )}
          </button>
        </motion.div>

        {/* Action Buttons: Get In Touch & Contact Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 text-slate-800 dark:text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
          >
            <i className="bx bxl-linkedin text-lg text-[#0077b5]" />
            <span>Get In Touch</span>
          </a>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[#ff4d5a]/25 hover:shadow-[#ff4d5a]/40 hover:-translate-y-0.5"
          >
            <i className="bx bx-envelope text-lg" />
            <span>{showForm ? 'Hide Form' : 'Contact Us'}</span>
          </button>
        </motion.div>

        {/* Contact Form with Framer Motion slide-in */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-left bg-white/95 dark:bg-[#0d0d16]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <i className="bx bx-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-lg" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Pranshu Sharma"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff4d5a] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <i className="bx bx-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-lg" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@gmail.com"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff4d5a] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <i className="bx bx-chat absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-lg" />
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Collaboration"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff4d5a] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 uppercase mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <i className="bx bx-message-detail absolute left-4 top-4 text-slate-400 dark:text-zinc-500 text-lg" />
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, idea or opportunity..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff4d5a] focus:bg-white transition-colors resize-none"
                    />
                  </div>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-xl text-xs font-medium ${
                      status.success
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#ff4d5a]/25 disabled:opacity-50"
                >
                  <span>{status.loading ? 'Sending...' : 'Send Message'}</span>
                  <i className="bx bx-send text-base" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
