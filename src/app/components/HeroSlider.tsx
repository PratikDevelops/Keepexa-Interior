'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   Slide Data
───────────────────────────────────────────── */
/* Brand tokens (mirrors CSS variables) */
const BRAND = {
  red:  '#B32025', // --primary / --brand-red
  gold: '#CC8229', // --secondary / --brand-gold
  teal: '#14515E', // --accent / --brand-teal
} as const;

const slides = [
  {
    id: 0,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    eyebrow: 'German Engineering · Made in Mumbai',
    headline: 'Windows That\nOutlast Decades',
    subline:
      'Premium UPVC systems engineered for India\'s climate — thermal-break profiles, multi-point security, and 40+ colour options delivered to your site.',
    cta: { label: 'Explore Products', href: '/#products' },
    ctaSecondary: { label: 'Book Free Survey', href: '/book-survey' },
    accent: BRAND.red,
    stat: { value: '85,000+', label: 'Units Installed' },
  },
  {
    id: 1,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    eyebrow: 'Tilt & Turn · Lift & Slide · Casement',
    headline: 'Every Room\nDeserves Light',
    subline:
      'From panoramic Lift & Slide doors to whisper-quiet Tilt & Turn windows — configure your perfect system in minutes with our live price calculator.',
    cta: { label: 'Configure & Quote', href: '/product-configurator' },
    ctaSecondary: { label: 'View Products', href: '/#products' },
    accent: BRAND.gold,
    stat: { value: '10 Year', label: 'Profile Warranty' },
  },
  {
    id: 2,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    eyebrow: 'ISO 9001 · CE Marked · GRIHA Compatible',
    headline: 'Built for India.\nCertified Globally.',
    subline:
      'U-Values as low as 0.8 W/m²K, Rw 48 dB acoustic glass, and RC 2 burglar resistance — the performance numbers that matter, certified independently.',
    cta: { label: 'See Certifications', href: '/certifications' },
    ctaSecondary: { label: 'Get a Quote', href: '/product-configurator' },
    accent: BRAND.teal,
    stat: { value: '0.8 W/m²K', label: 'Best U-Value' },
  },
];

/* ─────────────────────────────────────────────
   Arrow Icon
───────────────────────────────────────────── */
function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
function ArrowLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 8H3M7 4L3 8l4 4" />
    </svg>
  );
}
function PauseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2" width="4" height="12" rx="1.5" />
      <rect x="9" y="2" width="4" height="12" rx="1.5" />
    </svg>
  );
}
function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2.5l9 5.5-9 5.5V2.5z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Progress Ring (autoplay indicator)
───────────────────────────────────────────── */
function ProgressRing({ progress, color }: { progress: number; color: string }) {
  const r = 10;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="-rotate-90">
      <circle cx="14" cy="14" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
      <circle
        cx="14" cy="14" r={r} fill="none"
        stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - progress)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Slide Image with parallax feel
───────────────────────────────────────────── */
function SlideImage({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.08 }}
      animate={{ scale: active ? 1.0 : 1.08 }}
      transition={{ duration: 6, ease: 'linear' }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Hero Slider
───────────────────────────────────────────── */
const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setPrev(current);
    setDirection(dir);
    setCurrent(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [current]);

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    startTimeRef.current = Date.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(elapsed / AUTOPLAY_MS, 1));
    }, 50);

    timerRef.current = setTimeout(() => {
      goNext();
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, paused, goNext]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const slide = slides[current];

  // Text animation variants
  const textVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 32 : -32, filter: 'blur(4px)' }),
    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24, filter: 'blur(4px)' }),
  };

  const imageVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? '8%' : '-8%' }),
    center: { opacity: 1, x: '0%' },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? '-6%' : '6%' }),
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: BRAND.teal, height: 'calc(100svh - 0px)', minHeight: '560px', maxHeight: '900px' }}
      role="region"
      aria-label="Hero slideshow"
    >
      {/* ── IMAGES ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`img-${current}`}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <SlideImage src={slide.image} alt={slide.headline.replace('\n', ' ')} active />

          {/* Layered gradients for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Accent colour tint — subtle left edge */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 opacity-20"
            style={{ background: `linear-gradient(to right, ${slide.accent}66, transparent)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── SLIDE COUNT STRIP (top right) ── */}
      <div className="absolute top-0 right-0 hidden sm:flex items-center gap-0 z-20">
        {slides.map((s, i) => (
          <div
            key={i}
            className="h-1 transition-all duration-500"
            style={{
              width: i === current ? '48px' : '24px',
              backgroundColor: i === current ? s.accent : 'rgba(255,255,255,0.20)',
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`content-${current}`}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col"
              >
                {/* Eyebrow */}
                <motion.div
                  variants={textVariants}
                  custom={direction}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex items-center gap-3 mb-4 sm:mb-5"
                >
                  {/* Accent dot */}
                  <span
                    className="w-2 h-2 rounded-full shrink-0 ring-2 ring-white/20"
                    style={{ backgroundColor: slide.accent }}
                  />
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(252,245,245,0.72)' }}>
                    {slide.eyebrow}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={textVariants}
                  custom={direction}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-black text-white leading-[1.04] tracking-tight"
                  style={{ textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
                >
                  {slide.headline.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </motion.h1>

                {/* Subline */}
                <motion.p
                  variants={textVariants}
                  custom={direction}
                  transition={{ duration: 0.55, delay: 0.16 }}
                  className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-lg"
                  style={{ color: 'rgba(252,245,245,0.78)', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                >
                  {slide.subline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={textVariants}
                  custom={direction}
                  transition={{ duration: 0.5, delay: 0.22 }}
                  className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3"
                >
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.97]"
                    style={{
                      backgroundColor: slide.accent,
                      boxShadow: `0 8px 28px -4px ${slide.accent}70`,
                    }}
                  >
                    {slide.cta.label}
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white backdrop-blur-sm border transition-all duration-200 hover:bg-white/20"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      borderColor: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                </motion.div>

                {/* Stat badge */}
                <motion.div
                  variants={textVariants}
                  custom={direction}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="mt-6 sm:mt-7 inline-flex items-center gap-3 backdrop-blur-sm border px-4 py-2.5 rounded-2xl w-fit"
                  style={{
                    backgroundColor: 'rgba(20,81,94,0.35)',
                    borderColor: `${slide.accent}40`,
                  }}
                >
                  <div
                    className="w-0.5 self-stretch rounded-full"
                    style={{ backgroundColor: slide.accent }}
                  />
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white leading-none">{slide.stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-white/60 mt-0.5">{slide.stat.label}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── SLIDE THUMBNAIL STRIP (right side, desktop) ── */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300"
            style={{
              width: '72px',
              height: '48px',
              borderColor: i === current ? slides[i].accent : 'rgba(255,255,255,0.18)',
              opacity: i === current ? 1 : 0.50,
              transform: i === current ? 'scale(1.07)' : 'scale(1)',
            }}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${i === current ? 'opacity-0' : 'opacity-60 group-hover:opacity-30'}`} />
          </button>
        ))}
      </div>

      {/* ── BOTTOM CONTROLS ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">

          {/* Dot indicators + slide number */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs font-bold tabular-nums hidden sm:block" style={{ color: BRAND.gold }}>
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-1 rounded-full transition-all duration-400 overflow-hidden"
                  style={{
                    width: i === current ? '32px' : '16px',
                    backgroundColor: 'rgba(255,255,255,0.25)',
                  }}
                >
                  {i === current && (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: slide.accent }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.05, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation arrows + play/pause */}
          <div className="flex items-center gap-2">
            {/* Pause / Play with ring */}
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play' : 'Pause'}
              className="relative w-9 h-9 flex items-center justify-center transition-colors"
              style={{ color: `${BRAND.gold}CC` }}
            >
              <ProgressRing progress={paused ? 0 : progress} color={slide.accent} />
              <span className="absolute">{paused ? <PlayIcon size={11} /> : <PauseIcon size={11} />}</span>
            </button>

            <div className="w-px h-5 bg-white/20 mx-1" />

            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-xl backdrop-blur-sm border flex items-center justify-center text-white transition-all duration-200"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.18)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${BRAND.gold}33`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)')}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-xl backdrop-blur-sm border flex items-center justify-center text-white transition-all duration-200"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.18)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${BRAND.gold}33`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)')}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── SCROLL HINT ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: `${BRAND.gold}80` }}>Scroll</span>
        <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${BRAND.gold}60, transparent)` }} />
      </div>
    </section>
  );
}