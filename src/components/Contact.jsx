import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const targetEmail = personalInfo.email || 'pranshu_sharma7@icloud.com';

  const handleCopyEmail = (emailToCopy) => {
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Message from ${formData.name}: ${formData.subject}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus({
          loading: false,
          success: true,
          message: 'Thank you! Your message has been delivered directly to my inbox.',
        });
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setStatus({
          loading: false,
          success: true,
          isActivation: true,
          message:
            "One-time activation required: FormSubmit has sent an 'Activate Form' confirmation email to pranshu_sharma7@icloud.com. Please open that email and click the activation link!",
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({
        loading: false,
        success: false,
        fallbackMailto: `mailto:${targetEmail}?subject=${encodeURIComponent(
          formData.subject || 'Portfolio Inquiry'
        )}&body=${encodeURIComponent(
          `Hi Pranshu,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
        )}`,
        message: err.message || 'Unable to deliver message right now. Please try again or email directly.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient radial light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-60 dark:opacity-85"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 90, 0.16) 0%, rgba(255, 77, 90, 0.04) 50%, transparent 70%)',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      />

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
            I'm always open to discussing new projects, creative ideas, and exciting opportunities in tech. Send a message directly below!
          </p>
        </motion.div>

        {/* Quick Copy Email Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <button
            type="button"
            onClick={() => handleCopyEmail(targetEmail)}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-[#ff4d5a]/40 text-xs sm:text-sm font-mono text-slate-800 dark:text-zinc-200 transition-all duration-300 shadow-sm cursor-pointer"
          >
            <i className="bx bx-envelope text-base text-[#ff4d5a] group-hover:scale-110 transition-transform" />
            <span>{targetEmail}</span>
            {copied && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#ff4d5a] text-white text-[10px] font-sans font-semibold shadow-xs animate-fade-in">
                Copied! ✨
              </span>
            )}
          </button>
        </motion.div>

        {/* Action Buttons: LinkedIn Profile & Toggle Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <a
            href="https://www.linkedin.com/in/pranshu-kumar-6742a4323/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 text-slate-800 dark:text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
          >
            <i className="bx bxl-linkedin text-lg text-[#0077b5]" />
            <span>LinkedIn Profile</span>
          </a>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[#ff4d5a]/25 hover:shadow-[#ff4d5a]/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <i className="bx bx-envelope text-lg" />
            <span>{showForm ? 'Hide Form' : 'Write Message'}</span>
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
              {/* Direct inbox delivery indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                    Direct Inbox Delivery
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  To: <span className="text-[#ff4d5a] font-semibold">{targetEmail}</span>
                </span>
              </div>

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
                      Your Email (For Reply)
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
                      placeholder="Project Inquiry / Job Opportunity"
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
                      placeholder="Write your message here..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff4d5a] focus:bg-white transition-colors resize-none"
                    />
                  </div>
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-xl text-xs font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      status.success
                        ? status.isActivation
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <i
                        className={`bx ${
                          status.success
                            ? status.isActivation
                              ? 'bx-info-circle text-base'
                              : 'bx-check-circle text-base'
                            : 'bx-error-circle text-base'
                        }`}
                      />
                      <span>{status.message}</span>
                    </div>
                    {status.fallbackMailto && (
                      <a
                        href={status.fallbackMailto}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-semibold text-[11px] whitespace-nowrap hover:bg-red-600 transition-colors"
                      >
                        Send via Mail App
                      </a>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ff4d5a] hover:bg-[#ff3b4b] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#ff4d5a]/25 disabled:opacity-50 cursor-pointer"
                >
                  {status.loading ? (
                    <>
                      <i className="bx bx-loader-alt animate-spin text-base" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className="bx bx-send text-base" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
