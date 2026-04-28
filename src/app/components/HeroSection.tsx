'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const heroImages = [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_15e534dc7-1772941123727.png",
    alt: 'Modern Indian home exterior with large floor-to-ceiling UPVC windows, bright daylight, clean contemporary architecture',
    span: 'col-span-5 row-span-6',
    label: 'Residential',
    sublabel: 'Casement Series'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_17d7838de-1774978562858.png",
    alt: 'Bright airy Indian living room interior with wide panoramic UPVC windows flooding space with natural light, minimal decor',
    span: 'col-span-7 row-span-3',
    badge: 'Most Popular'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebc3d0ea-1772509195309.png",
    alt: 'Contemporary Indian kitchen with slim-frame UPVC windows overlooking garden, clean white surfaces, natural light',
    span: 'col-span-4 row-span-3'
  }];


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-background">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-primary/4 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        {/* Left Column */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>

          {/* Status badge */}
          <div className="mt-6 sm:mt-0 inline-flex items-center gap-2 self-start glass-card px-3.5 py-2 rounded-full border border-border/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-600 text-primary tracking-wide uppercase">
              2026 Collection — Now in India
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-800 tracking-tight leading-[1.05] text-foreground">
            Engineered Silence.{' '}
            <span className="text-gradient">Designed for Modern Living.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-400 max-w-lg">
            Keepexa Interior UPVC windows combine acoustic engineering, thermal precision, and architectural elegance built to last 40 years in India's diverse climate, from coastal humidity to extreme heat.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <Link href="/product-configurator" className="btn-primary justify-center sm:justify-start">
              Start Customising
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
            <Link href="/gallery" className="btn-secondary justify-center sm:justify-start">
              View Projects
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="pt-5 border-t border-border/60 flex flex-wrap items-center gap-4 mt-2">
            <div className="flex -space-x-2.5">
              {[
                { src: "/assets/images/testimonial-1.png", alt: 'Satisfied homeowner, woman with short dark hair smiling' },
                { src: "/assets/images/testimonial-2.png", alt: 'Happy customer, man with beard in natural light' },
                { src: "/assets/images/testimonial-3.png", alt: 'Pleased homeowner, man with glasses smiling' },
                { src: "/assets/images/testimonial-4.png", alt: 'Satisfied customer, woman with brown hair' }].
                map((img, i) =>
                  <AppImage
                    key={i}
                    src={img?.src}
                    alt={img?.alt}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-background object-cover" />

                )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4]?.map((i) =>
                  <Icon key={i} name="StarIcon" size={14} variant="solid" className="text-amber-400" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Trusted by <span className="font-600 text-foreground">3,800+</span> Indian homeowners
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Hero Image */}
        <motion.div
          className="lg:hidden w-full rounded-3xl overflow-hidden relative aspect-[4/3] shadow-strong"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <AppImage
            src={heroImages?.[0]?.src}
            alt={heroImages?.[0]?.alt}
            fill
            className="object-cover"
            priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-5 text-white">
            <p className="text-xs font-700 uppercase tracking-widest text-accent mb-1">{heroImages?.[0]?.label}</p>
            <p className="text-base font-600">{heroImages?.[0]?.sublabel}</p>
          </div>
        </motion.div>

        {/* Right Column: Image Composition Grid — desktop only */}
        <motion.div
          className="lg:col-span-7 relative h-[520px] lg:h-[600px] w-full hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}>

          <div className="grid grid-cols-12 grid-rows-6 gap-3 h-full w-full">
            {/* Main tall image */}
            <div className="col-span-5 row-span-6 rounded-3xl overflow-hidden relative group cursor-pointer shadow-strong">
              <AppImage
                src={heroImages?.[0]?.src}
                alt={heroImages?.[0]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-xs font-700 uppercase tracking-widest text-accent mb-1">
                  {heroImages?.[0]?.label}
                </p>
                <p className="text-base font-600">{heroImages?.[0]?.sublabel}</p>
              </div>
            </div>

            {/* Top right wide */}
            <div className="col-span-7 row-span-3 rounded-3xl overflow-hidden relative group cursor-pointer shadow-medium">
              <AppImage
                src={heroImages?.[1]?.src}
                alt={heroImages?.[1]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/40">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-600 text-foreground">{heroImages?.[1]?.badge}</span>
              </div>
            </div>

            {/* Bottom right */}
            <div className="col-span-4 row-span-3 rounded-3xl overflow-hidden relative group cursor-pointer shadow-medium">
              <AppImage
                src={heroImages?.[2]?.src}
                alt={heroImages?.[2]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* Circular spinning element */}
            <div className="col-span-3 row-span-3 flex items-center justify-center relative">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg
                  className="w-full h-full absolute animate-spin-slow text-muted-foreground/40"
                  viewBox="0 0 100 100">
                  <defs>
                    <path
                      id="heroCircle"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="text-[9px] uppercase font-700 tracking-widest fill-current">
                    <textPath href="#heroCircle">
                      · Precision · Silence · Efficiency · Quality ·
                    </textPath>
                  </text>
                </svg>
                <Link
                  href="/product-configurator"
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-primary z-10"
                  aria-label="Configure windows">
                  <Icon name="ArrowUpRightIcon" size={22} className="text-white" />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating spec card */}
          <motion.div
            className="absolute top-[38%] -right-5 glass-card p-4 rounded-2xl w-56 shadow-strong border border-white/70"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            whileHover={{ y: -4 }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-700 uppercase tracking-wide text-muted-foreground">
                Window Spec
              </span>
              <Icon name="EllipsisHorizontalIcon" size={16} className="text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="WindowIcon" size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-600 text-foreground">Triple Glazed</p>
                <p className="text-xs text-muted-foreground">Casement Series</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-primary/5 border border-primary/10">
              <span className="text-xs text-muted-foreground">Heat Block</span>
              <span className="text-sm font-700 text-primary">SHGC 0.25</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-600 text-accent bg-accent/10 px-2 py-1 rounded-lg w-fit">
              <Icon name="CheckCircleIcon" size={12} className="text-accent" />
              BEE 5-Star Rated
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );


}