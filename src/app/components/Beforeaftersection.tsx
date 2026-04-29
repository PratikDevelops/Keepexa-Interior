'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowsRightLeftIcon,
  StarIcon,
  HomeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */

interface Transformation {
  id: string;
  location: string;
  windowType: string;
  rating: number;
  quote: string;
  customer: string;
  beforeLabel: string;
  afterLabel: string;
  beforeBg: string;
  afterBg: string;
  beforeDetails: string[];
  afterDetails: string[];
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: 'living-room',
    location: 'Bandra, Mumbai',
    windowType: 'Tilt and Turn',
    rating: 5,
    quote: 'The difference in noise and heat is night and day. Best home upgrade we have made.',
    customer: 'Priya M.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeBg: 'from-stone-400 via-stone-300 to-amber-200',
    afterBg: 'from-slate-100 via-white to-sky-50',
    beforeDetails: ['Single-pane aluminium', 'Heavy condensation', 'Road noise at 72dB', 'No weatherseal'],
    afterDetails: ['Double-glazed UPVC', 'Zero condensation', 'Noise reduced to 38dB', 'Full weatherseal'],
  },
  {
    id: 'bedroom',
    location: 'Koramangala, Bengaluru',
    windowType: 'French Casement',
    rating: 5,
    quote: 'Our bedroom stays cool even in summer now. Worth every rupee.',
    customer: 'Rahul & Sneha K.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeBg: 'from-yellow-300 via-amber-200 to-orange-100',
    afterBg: 'from-sky-100 via-white to-emerald-50',
    beforeDetails: ['Warped wooden frames', 'Monsoon leaks', 'Heat gain 68%', 'Manual latch only'],
    afterDetails: ['UPVC French casement', 'Fully watertight', 'Heat gain 22%', 'Multi-point lock'],
  },
  {
    id: 'balcony',
    location: 'Jubilee Hills, Hyderabad',
    windowType: 'Lift and Slide',
    rating: 5,
    quote: 'The sliding door transformed our balcony into a proper living space.',
    customer: 'Anand R.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeBg: 'from-zinc-400 via-stone-300 to-amber-100',
    afterBg: 'from-slate-50 via-sky-50 to-white',
    beforeDetails: ['Heavy iron grille door', 'No insulation', 'Difficult to operate', 'Rusting frame'],
    afterDetails: ['3m Lift and Slide panel', 'Argon-filled glazing', 'Finger-tip operation', 'Powder-coated UPVC'],
  },
];

/* ─────────────────────────────────────────────
   Slider Component
───────────────────────────────────────────── */

function BeforeAfterSlider({ item }: { item: Transformation }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging) updatePosition(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (isDragging) updatePosition(e.touches[0].clientX); };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div className="flex flex-col gap-0">
      {/* Slider visual */}
      <div
        ref={containerRef}
        className="relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden cursor-col-resize select-none touch-none border border-border/60 shadow-soft"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* AFTER panel (base, full width) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.afterBg} flex items-center justify-center`}>
          <WindowIllustration variant="after" />
        </div>

        {/* BEFORE panel (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.beforeBg} flex items-center justify-center`}
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          >
            <WindowIllustration variant="before" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-700 tracking-wide">
            {item.beforeLabel}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-lg bg-primary/90 backdrop-blur-sm text-white text-xs font-700 tracking-wide">
            {item.afterLabel}
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
          style={{ left: `${position}%` }}
        />

        {/* Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none transition-transform duration-150 ${isDragging ? 'scale-110' : 'scale-100'}`}
          style={{ left: `${position}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-strong border-2 border-primary/20 flex items-center justify-center">
            <ArrowsRightLeftIcon className="size-4 text-primary" />
          </div>
        </div>

        {/* Hint overlay - fades out after first interaction */}
        {!hasInteracted && (
          <div className="absolute inset-0 flex items-end justify-center pb-4 z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm"
            >
              <ArrowsRightLeftIcon className="size-3 text-white" />
              <span className="text-[11px] font-500 text-white">Drag to compare</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Details strip */}
      <div className="grid grid-cols-2 gap-px mt-3">
        {/* Before details */}
        <div className="bg-secondary/60 rounded-xl p-4 border border-border/40">
          <p className="text-[11px] font-700 text-muted-foreground uppercase tracking-widest mb-2.5">Before</p>
          <ul className="flex flex-col gap-1.5">
            {item.beforeDetails.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
                <span className="text-xs font-400 text-muted-foreground leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* After details */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
          <p className="text-[11px] font-700 text-primary uppercase tracking-widest mb-2.5">After</p>
          <ul className="flex flex-col gap-1.5">
            {item.afterDetails.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <CheckBadgeIcon className="size-3.5 text-primary mt-0.5 shrink-0" />
                <span className="text-xs font-500 text-foreground leading-snug">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Window Illustration
───────────────────────────────────────────── */

function WindowIllustration({ variant }: { variant: 'before' | 'after' }) {
  const isBefore = variant === 'before';

  return (
    <div className="relative flex items-center justify-center w-full h-full p-8">
      {/* Room wall */}
      <div className={`absolute inset-0 ${isBefore ? 'opacity-30' : 'opacity-10'}`}>
        {/* Horizontal lines suggesting wall texture */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-current opacity-20" style={{ top: `${12 + i * 11}%` }} />
        ))}
      </div>

      {/* Window frame */}
      <div
        className={`relative rounded-lg overflow-hidden shadow-xl
          ${isBefore
            ? 'w-44 h-52 border-4 border-stone-500 bg-stone-600/20'
            : 'w-48 h-56 border-4 border-slate-200 bg-white/60 shadow-2xl'
          }`}
      >
        {/* Glazing / glass area */}
        <div className={`absolute inset-2 rounded
          ${isBefore
            ? 'bg-gradient-to-br from-amber-100/60 to-yellow-200/40'
            : 'bg-gradient-to-br from-sky-100/80 to-white/90 backdrop-blur-sm'
          }`}
        >
          {/* Cross bar */}
          <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 ${isBefore ? 'bg-stone-400' : 'bg-slate-200'}`} />
          <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 ${isBefore ? 'bg-stone-400' : 'bg-slate-200'}`} />

          {/* Before: condensation / grime effect */}
          {isBefore && (
            <>
              <div className="absolute bottom-2 left-2 right-2 h-8 bg-gradient-to-t from-stone-400/30 to-transparent rounded" />
              <div className="absolute top-3 left-3 w-6 h-4 rounded-full bg-stone-300/40 blur-sm" />
              <div className="absolute top-5 right-4 w-4 h-3 rounded-full bg-stone-300/30 blur-sm" />
            </>
          )}

          {/* After: clear sky view effect */}
          {!isBefore && (
            <>
              <div className="absolute top-2 left-3 right-3 h-12 bg-gradient-to-b from-sky-200/50 to-transparent rounded" />
              <div className="absolute bottom-2 left-2 right-2 h-6 bg-gradient-to-t from-emerald-100/40 to-transparent rounded" />
            </>
          )}
        </div>

        {/* Before: rust/wear marks on frame */}
        {isBefore && (
          <>
            <div className="absolute top-2 right-1 w-1 h-3 bg-amber-700/40 rounded" />
            <div className="absolute bottom-4 left-1 w-1 h-2 bg-amber-700/30 rounded" />
          </>
        )}

        {/* After: handle */}
        {!isBefore && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-slate-300 rounded-full shadow-sm" />
        )}
      </div>

      {/* Before: visible gap/draft lines */}
      {isBefore && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-8 bg-amber-400/50"
              style={{ left: `calc(50% + ${(i - 1) * 28}px)`, top: '28%' }}
              animate={{ scaleY: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      )}

      {/* After: sparkle/clean indicators */}
      {!isBefore && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[
            { x: '30%', y: '25%' },
            { x: '70%', y: '30%' },
            { x: '55%', y: '70%' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-sky-400"
              style={{ left: pos.x, top: pos.y }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section Label Helper
───────────────────────────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-primary" />
      <span className="section-label">{text}</span>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section Export
───────────────────────────────────────────── */

export default function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="transformations" className="py-16 sm:py-24 lg:py-32 bg-background border-b border-border/50">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <FadeUp className="mb-12">
          <SectionLabel text="Real Transformations" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 text-foreground leading-tight tracking-tight">
                See the difference a proper window makes.
              </h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-lg leading-relaxed">
                Drag the slider on each image to compare the original window with the Keepexa installation.
                Every photo is from a real customer home.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-sm font-500 text-muted-foreground bg-secondary/60 border border-border/50 px-4 py-2.5 rounded-xl">
              <HomeIcon className="size-4 text-primary" />
              {TRANSFORMATIONS.length} real homes
            </div>
          </div>
        </FadeUp>

        {/* Tab selector */}
        <FadeUp delay={0.1} className="mb-8">
          <div className="flex gap-2 flex-wrap">
            {TRANSFORMATIONS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 border transition-all duration-200
                  ${activeIdx === i
                    ? 'bg-primary text-white border-primary shadow-soft'
                    : 'bg-card text-foreground border-border/60 hover:border-primary/40 hover:bg-secondary/40'
                  }`}
              >
                <MapPinIcon className="size-3.5" />
                {item.location}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Active transformation */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">

          {/* Slider */}
          <FadeUp delay={0.15}>
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <BeforeAfterSlider item={TRANSFORMATIONS[activeIdx]} />
            </motion.div>
          </FadeUp>

          {/* Info panel */}
          <FadeUp delay={0.2}>
            <motion.div
              key={`info-${activeIdx}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4"
            >
              {/* Project badge */}
              <div className="p-5 rounded-2xl bg-card border border-border/60">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-[11px] font-700 text-muted-foreground uppercase tracking-widest mb-1">Window Type</p>
                    <p className="text-lg font-800 text-foreground leading-tight">{TRANSFORMATIONS[activeIdx].windowType}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 border border-amber-200/60 rounded-xl shrink-0">
                    {[...Array(TRANSFORMATIONS[activeIdx].rating)].map((_, i) => (
                      <StarIcon key={i} className="size-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-4 border-b border-border/40">
                  <MapPinIcon className="size-4 text-primary shrink-0" />
                  {TRANSFORMATIONS[activeIdx].location}
                </div>

                <blockquote className="text-sm font-500 text-foreground leading-relaxed italic">
                  "{TRANSFORMATIONS[activeIdx].quote}"
                </blockquote>
                <p className="text-xs font-600 text-primary mt-2">{TRANSFORMATIONS[activeIdx].customer}</p>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Noise Reduction', value: 'Up to 47dB', icon: '🔇' },
                  { label: 'Heat Gain Cut', value: 'By up to 68%', icon: '🌡' },
                  { label: 'Warranty', value: '10 Years', icon: '🛡' },
                  { label: 'Install Time', value: '1 to 3 Days', icon: '⚡' },
                ].map((stat) => (
                  <div key={stat.label} className="p-3.5 rounded-xl bg-secondary/50 border border-border/40 text-center">
                    <p className="text-xs font-700 text-primary leading-none mb-1">{stat.value}</p>
                    <p className="text-[11px] font-400 text-muted-foreground leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/product-configurator"
                className="btn-primary text-sm text-center justify-center"
              >
                Get This for Your Home
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>

              <p className="text-center text-xs text-muted-foreground">
                Free survey. No commitment. Quote in 24 hours.
              </p>
            </motion.div>
          </FadeUp>
        </div>

        {/* Bottom trust strip */}
        <FadeUp delay={0.3} className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-muted-foreground">
            {[
              'All photos from real Keepexa installations',
              'No stock images or renders',
              '3,800+ homes transformed across India',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckBadgeIcon className="size-4 text-primary shrink-0" />
                <span className="font-500 text-foreground text-xs sm:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}