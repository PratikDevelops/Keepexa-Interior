'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const reasons = [
  {
    icon: 'CubeTransparentIcon',
    title: 'German-Grade UPVC Profiles',
    desc: 'We use only A-grade multi-chamber UPVC profiles sourced from certified European suppliers the same spec used in Scandinavian passive homes. No recycled filler, ever.',
    badge: 'Material Quality',
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Factory-to-Fit Control',
    desc: 'Every window is manufactured at our own ISO-certified Mumbai plant and installed by our own salaried team. No resellers, no subcontractors full accountability at every step.',
    badge: 'Direct Ownership',
  },
  {
    icon: 'SunIcon',
    title: 'India-Specific Engineering',
    desc: 'Our profiles are UV-stabilised for tropical heat, tested at 65°C surface temperature. Gaskets, hardware, and sealants are all rated for Indian monsoon humidity and coastal salt air.',
    badge: 'Climate-Ready',
  },
  {
    icon: 'ShieldCheckIcon',
    title: '10-Year Warranty + 40-Year Guarantee',
    desc: 'We back every installation with a full 10-year product warranty and a 40-year performance guarantee on profiles. If it fails, we fix it no questions asked.',
    badge: 'Long-Term Assurance',
  },
  {
    icon: 'MagnifyingGlassIcon',
    title: 'Named Quality Checks',
    desc: 'Every window that leaves our factory carries a physical QC card with the name of the technician who signed off. Traceability is built into our process, not bolted on.',
    badge: 'Full Traceability',
  },
  {
    icon: 'MapPinIcon',
    title: 'Pan-India Service Network',
    desc: 'With service centres in Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, and Mumbai, post-installation support is never more than a call away wherever you are in India.',
    badge: 'Nationwide Reach',
  },
];

const comparisons = [
  { feature: 'Profile Grade', us: 'A-Grade German UPVC', them: 'Mixed / Recycled' },
  { feature: 'Installation', us: 'In-house certified team', them: 'Third-party contractors' },
  { feature: 'Warranty', us: '10 Years full cover', them: '1–2 Years limited' },
  { feature: 'QC Traceability', us: 'Named technician sign-off', them: 'Batch-only records' },
  { feature: 'After-sales', us: 'Dedicated pan-India team', them: 'Call centre / reseller' },
  { feature: 'Climate Testing', us: 'Tropical + coastal rated', them: 'Standard lab tests' },
];

export default function WhyChooseUs() {
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' });
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' });

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          ref={headRef}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-3">Why Keepexa Interior</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
            Not all UPVC windows are the same. Ours are better — here's why.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From raw material to installed finish, every decision we make is driven by what lasts — not what's cheapest.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16 sm:mb-24 lg:mb-32">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="relative p-5 sm:p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-medium transition-shadow duration-300 group flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Top row: icon + badge */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                  <Icon name={reason.icon as 'HomeIcon'} size={20} className="text-primary" />
                </div>
                <span className="text-xs font-600 text-accent bg-accent/10 px-2.5 py-1.5 rounded-lg shrink-0">
                  {reason.badge}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-700 text-foreground">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-label block mb-3">Side-by-Side</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground">
              Keepexa Interior vs the rest.
            </h2>
          </div>

          <div className="rounded-3xl border border-border/60 overflow-hidden shadow-soft">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-secondary/80 px-5 sm:px-8 py-4 border-b border-border/60">
              <p className="text-xs font-700 uppercase tracking-widest text-muted-foreground">Feature</p>
              <p className="text-xs font-700 uppercase tracking-widest text-primary text-center">Keepexa Interior</p>
              <p className="text-xs font-700 uppercase tracking-widest text-muted-foreground text-center">Typical Competitor</p>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <motion.div
                key={row.feature}
                className={`grid grid-cols-3 px-5 sm:px-8 py-4 sm:py-5 items-center ${
                  i < comparisons.length - 1 ? 'border-b border-border/40' : ''
                } ${i % 2 === 0 ? 'bg-card' : 'bg-background'}`}
                initial={{ opacity: 0, x: -12 }}
                animate={tableInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <p className="text-sm font-600 text-foreground">{row.feature}</p>

                {/* Keepexa Interior value */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={10} className="text-primary" />
                  </div>
                  <p className="text-sm font-600 text-primary text-center">{row.us}</p>
                </div>

                {/* Competitor value */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-border/60 flex items-center justify-center shrink-0">
                    <Icon name="MinusIcon" size={10} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">{row.them}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 glass-card rounded-3xl border border-border/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center sm:text-left">
              <p className="text-base font-700 text-foreground">Ready to experience the difference?</p>
              <p className="text-sm text-muted-foreground mt-1">Book a free home survey — no obligation, no pressure.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/homepage#contact" className="btn-primary">
                Book Free Survey
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link
                href="/product-configurator"
                className="px-5 py-2.5 rounded-xl border border-border/80 text-sm font-600 text-foreground hover:bg-secondary/60 transition-colors"
              >
                Configure Windows
              </Link>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}