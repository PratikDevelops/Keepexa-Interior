'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Awards Data
───────────────────────────────────────────── */
const awards = [
  {
    year: '2025',
    title: 'Architectural Excellence Award',
    org: 'Council of Indian Architects',
    description: 'Recognized for pioneering the "Architect" series—blending structural integrity with minimalist aesthetics.',
    icon: 'TrophyIcon',
  },
  {
    year: '2024',
    title: 'Sustainable Product of the Year',
    org: 'GRIHA Council',
    description: 'Awarded for achieving a Class 4 air-tightness rating, significantly reducing HVAC energy consumption.',
    icon: 'LeafIcon',
  },
  {
    year: '2024',
    title: 'Manufacturing Innovation Hub',
    org: 'MIDC Maharashtra',
    description: 'Honored for our state-of-the-art Chakan facility and its commitment to zero-waste production.',
    icon: 'CpuChipIcon',
  },
];

const certifications = [
  { label: 'ISO 9001:2015', sub: 'Quality Management' },
  { label: 'BIS Certified', sub: 'IS 14856 Standard' },
  { label: 'Energy Star', sub: 'Thermal Efficiency' },
  { label: 'CE Marked', sub: 'European Compliance' },
];

export default function AwardsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Headers & Certifications */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary" />
                <span className="text-[11px] font-900 uppercase tracking-[0.3em] text-primary">
                  Accolades
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-900 tracking-tighter text-foreground leading-tight">
                Validated by <br />
                <span className="text-muted-foreground">Industry Standards.</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed font-500">
                Our pursuit of precision isn't just a claim—it's a certified reality. 
                From rigorous safety standards to architectural innovation, we set 
                the benchmark for UPVC systems in India.
              </p>

              {/* Certifications Grid */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                {certifications.map((cert) => (
                  <div 
                    key={cert.label} 
                    className="p-5 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <p className="text-sm font-900 text-foreground">{cert.label}</p>
                    <p className="text-[10px] font-700 text-muted-foreground uppercase tracking-widest mt-1">
                      {cert.sub}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Awards Timeline */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative flex items-center gap-6 p-8 rounded-[2rem] bg-card border border-border/60 hover:bg-secondary/40 transition-all duration-500"
                >
                  {/* Gold Year Badge */}
                  <div className="hidden sm:flex flex-col items-center justify-center shrink-0 w-20 h-20 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                    <span className="text-[10px] font-900 uppercase opacity-60">Year</span>
                    <span className="text-xl font-900 leading-none">{award.year}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={award.icon} size={14} className="text-primary" />
                      <span className="text-[10px] font-800 text-primary uppercase tracking-[0.2em]">
                        {award.org}
                      </span>
                    </div>
                    <h3 className="text-xl font-900 text-foreground mb-2 group-hover:text-primary transition-colors">
                      {award.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  {/* Decorative Rule Line */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Icon name="TrophyIcon" size={60} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Impact Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-10 rounded-[3rem] bg-gradient-to-r from-secondary/50 to-background border border-border/40 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
               <Icon name="GlobeAltIcon" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-xl font-900 tracking-tight">Globally Aligned, Indian Made.</p>
              <p className="text-sm text-muted-foreground mt-1 font-500">
                Our technology adheres to European DIN standards, optimized for Mumbai's humidity and wind loads.
              </p>
            </div>
          </div>
          <button className="btn-primary whitespace-nowrap px-8 py-4">View Technical Certifications</button>
        </motion.div>
      </div>
    </section>
  );
}