'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

export default function ConfiguratorHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="pt-24 sm:pt-28 pb-10 sm:pb-12 bg-background border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-3">Window Configurator</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-800 tracking-tight text-foreground leading-tight mb-4">
            Design your perfect window.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Configure your UPVC windows to exact specification. Adjust type, dimensions, glazing, and colour — your live price updates instantly.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
            {[
              { icon: 'ClockIcon', text: 'Takes 3 minutes' },
              { icon: 'CurrencyPoundIcon', text: 'Instant price estimate' },
              { icon: 'PhoneIcon', text: 'Free survey included' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name={item.icon as 'ClockIcon'} size={15} className="text-accent" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}