'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function GalleryHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="pt-24 sm:pt-28 pb-10 sm:pb-14 bg-background border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl">
            <span className="section-label block mb-3">Project Gallery</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-800 tracking-tight text-foreground leading-tight mb-4">
              Windows that define spaces.
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              From Victorian sash restorations to contemporary new builds — a selection of PureFrame installations across the UK.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-start md:items-end">
              <p className="text-2xl font-800 text-primary">240+</p>
              <p className="text-xs text-muted-foreground">Completed projects</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <Link href="/product-configurator" className="btn-primary text-sm py-3 px-4 sm:px-5">
              Configure Yours
              <Icon name="ArrowRightIcon" size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}