'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    num: '01',
    title: 'Free Home Survey',
    desc: 'A Keepexa Interiors specialist visits your home to measure, assess, and recommend the right product for your space — available across all major Indian cities.',
    icon: 'HomeIcon'
  },
  {
    num: '02',
    title: 'Custom Configuration',
    desc: 'We manufacture your windows to exact specifications — size, profile, colour, glazing, and hardware — at our state-of-the-art facility in Mumbai.',
    icon: 'WrenchScrewdriverIcon'
  },
  {
    num: '03',
    title: 'Professional Installation',
    desc: 'Our certified fitters install your windows with full weatherproofing, finishing, and site clean-up included. Typically completed in 1–3 days.',
    icon: 'BuildingOffice2Icon'
  },
  {
    num: '04',
    title: 'Aftercare & Warranty',
    desc: 'A full 10-year product warranty and 40-year performance guarantee. Our team remains available after every installation across India.',
    icon: 'ShieldCheckIcon'
  }];


const stats = [
  { value: '3,800+', label: 'Homes Transformed' },
  { value: '100%', label: 'In-House Installation' },
  { value: '4.9★', label: 'Average Rating' },
  { value: 'ISO 9001', label: 'Certified Quality' }
];


export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' });

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Brand story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
          <motion.div
            ref={ref}
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}>

            <span className="section-label">Our Story</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground leading-tight">
              Getting windows right for modern Indian homes.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Keepexa Interior was founded with a simple goal to bring high-performance UPVC windows to Indian homes without cutting corners. We saw a gap between what quality systems can deliver and what customers actually receive, and we set out to change that.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Today we manufacture and install across India including Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, and beyond, maintaining direct control from production to installation. No subcontractors, no compromises. Every window goes through strict quality checks before it reaches your home.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2">
              {stats.map((stat) =>
                <div key={stat.label} className="p-3 sm:p-4 rounded-2xl bg-secondary/80 border border-border/60 text-center">
                  <p className="text-lg sm:text-xl font-800 text-primary leading-none">{stat.value}</p>
                  <p className="text-xs font-500 text-muted-foreground mt-1.5 leading-tight">{stat.label}</p>
                </div>
              )}
            </div>

            <Link href="/product-configurator" className="btn-primary self-start mt-1">
              Configure Your Windows
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </motion.div>

          <motion.div
            className="relative h-[320px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden shadow-strong"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>

            <AppImage
              src="/assets/images/installation-team.png"
              alt="Keepexa Interior installation team working professionally on UPVC window fitting, clean white coveralls, bright workshop environment"
              fill
              className="object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 glass-card p-4 rounded-2xl border border-white/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-700 text-foreground">ISO 9001:2015 Certified</p>
                  <p className="text-xs text-muted-foreground">Reg. No. SF-2010-7234</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs font-600 text-accent bg-accent/10 px-2.5 py-1.5 rounded-lg shrink-0">
                  <Icon name="CheckBadgeIcon" size={13} className="text-accent" />
                  Verified
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Installation process */}
        <motion.div
          ref={stepsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>

          <div className="text-center mb-10 sm:mb-12">
            <span className="section-label block mb-3">Installation Process</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground">
              From survey to silence, in 4 steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step, i) =>
              <motion.div
                key={step.num}
                className="relative p-5 sm:p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-medium transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}>

                <div className="flex items-start justify-between mb-5">
                  <span className="text-4xl font-800 text-primary/15 leading-none">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon name={step.icon as 'HomeIcon'} size={18} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-700 text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 &&
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <Icon name="ChevronRightIcon" size={18} className="text-border" />
                  </div>
                }
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

}