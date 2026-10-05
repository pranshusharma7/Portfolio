import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/portfolioData';

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff4d5a]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-[#ff4d5a] uppercase">
            02 — WHAT I DO
          </span>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
            How I can <span className="text-zinc-400">help you.</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  service.featured
                    ? 'bg-gradient-to-b from-[#ff4d5a]/10 via-[#0e0e18] to-[#0a0a12] border-2 border-[#ff4d5a]/40 shadow-xl shadow-[#ff4d5a]/10'
                    : 'bg-[#0d0d16]/80 border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#ff4d5a] text-[10px] font-mono font-bold tracking-widest text-white uppercase shadow-md shadow-[#ff4d5a]/30">
                    SPECIALIZATION
                  </div>
                )}

                <div>
                  {/* Service Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 ${
                      service.featured
                        ? 'bg-[#ff4d5a] text-white shadow-lg shadow-[#ff4d5a]/30'
                        : 'bg-white/[0.05] border border-white/10 text-[#ff4d5a]'
                    }`}
                  >
                    <i className={`bx ${service.icon}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sora text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Service Bullet List */}
                <ul className="space-y-2.5 pt-6 border-t border-white/[0.08]">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                        <i className="bx bx-check" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
