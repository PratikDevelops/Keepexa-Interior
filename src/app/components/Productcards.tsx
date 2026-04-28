'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type Category = 'All' | 'Casement' | 'Sliding' | 'Tilt & Turn' | 'Fixed' | 'Bay & Bow' | 'Louvre';

interface Product {
  id: string;
  category: Exclude<Category, 'All'>;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  badge?: { label: string; variant: 'popular' | 'new' | 'premium' | 'eco' };
  startingPrice: string;
  priceUnit: string;
  rating: number;
  reviews: number;
  uValue: string;
  acoustic: string;
  profiles: string;
  highlights: string[];
  href: string;
  featured?: boolean;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const products: Product[] = [
  {
    id: 'tilt-turn',
    category: 'Tilt & Turn',
    name: 'Tilt & Turn',
    tagline: "Europe's most versatile window, engineered for India",
    description:
      'A single handle controls two opening modes — tilt inward for ventilation without rain ingress, turn fully open for cleaning or emergency egress. Our most specified window for premium residential and commercial projects.',
    image: '/assets/images/tilt-and-turn.jpeg',
    imageAlt: 'Premium UPVC tilt and turn window in tilt position, white frame, flooded with natural light',
    badge: { label: "Editor's Choice", variant: 'eco' },
    startingPrice: '₹750',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 445,
    uValue: '1.0',
    acoustic: '45 dB',
    profiles: '6-chamber',
    highlights: ['Dual-mode single handle', 'Child-safe tilt limiter', 'Passive ventilation', 'Inward clean access'],
    href: '/products/tilt-turn',
    featured: true,
  },
  {
    id: 'casement-classic',
    category: 'Casement',
    name: 'Classic Casement',
    tagline: 'Side-hung sash, full ventilation, timeless profile',
    description:
      'The benchmark casement — side-hinged sash with multi-point locking, weather-seal gasket, and optional trickle vent.',
    image: '/assets/images/tilt-and-turn.jpeg',
    imageAlt: 'Classic white UPVC casement window, chrome handle, open position',
    badge: { label: 'Best Seller', variant: 'popular' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 612,
    uValue: '1.2',
    acoustic: '42 dB',
    profiles: '5-chamber',
    highlights: ['Multi-point locking', 'Weather-seal gasket', 'Trickle vent option'],
    href: '/products/casement',
  },
  {
    id: 'sliding-2track',
    category: 'Sliding',
    name: 'Sliding 2-Track',
    tagline: 'Space-saving horizontal slide, perfect for balconies',
    description:
      'Horizontal sliding sash on stainless steel rollers. Anti-lift security locks and optional mosquito mesh integration.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC horizontal sliding window overlooking balcony, white frame',
    badge: { label: 'Most Popular', variant: 'popular' },
    startingPrice: '₹400',
    priceUnit: 'per sq ft',
    rating: 4.7,
    reviews: 834,
    uValue: '1.4',
    acoustic: '38 dB',
    profiles: '4-chamber',
    highlights: ['Anti-lift locks', 'Stainless rollers', 'Mesh-ready track'],
    href: '/products/sliding-2track',
  },
  {
    id: 'french-casement',
    category: 'Casement',
    name: 'French Casement',
    tagline: 'Double-leaf, no centre post, unobstructed opening',
    description:
      'Two sashes open outward from a central meeting point with no fixed mullion. Espagnolette bolt secures both leaves.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC French casement double window open wide, white frame, bright interior',
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹650',
    priceUnit: 'per sq ft',
    rating: 4.8,
    reviews: 289,
    uValue: '1.1',
    acoustic: '44 dB',
    profiles: '6-chamber',
    highlights: ['No centre mullion', 'Espagnolette bolt', 'Slim sightlines'],
    href: '/products/french-casement',
  },
  {
    id: 'lift-slide',
    category: 'Sliding',
    name: 'Lift & Slide',
    tagline: 'Large-format panels, effortless handle-lift operation',
    description:
      'Panel lifts off its seal with a quarter-turn of the handle, then glides on precision rollers. Up to 3 m wide.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large UPVC lift and slide patio door panel, panoramic garden view',
    badge: { label: 'New', variant: 'new' },
    startingPrice: '₹2500',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 97,
    uValue: '0.9',
    acoustic: '46 dB',
    profiles: '6-chamber',
    highlights: ['Up to 3 m panel width', 'Low-threshold sill', 'Triple-sealed track'],
    href: '/products/lift-slide',
  },
  {
    id: 'fixed-picture',
    category: 'Fixed',
    name: 'Fixed Picture',
    tagline: 'Maximum glazing, zero infiltration, pure views',
    description:
      'Fully fixed frame with no moving parts — highest thermal and acoustic performance. Custom shapes available.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large fixed UPVC picture window, minimal white frame, mountain view',
    startingPrice: '₹500',
    priceUnit: 'per sq ft',
    rating: 4.8,
    reviews: 318,
    uValue: '0.8',
    acoustic: '48 dB',
    profiles: '5-chamber',
    highlights: ['Full-frame glazing', 'Custom shapes', 'Structural silicone seal'],
    href: '/products/fixed-picture',
  },
  {
    id: 'bay-window',
    category: 'Bay & Bow',
    name: 'Bay Window',
    tagline: 'Three-panel angled projection, light and space',
    description:
      'Classic three-panel bay at 30° or 45° projection with structural corner posts and optional integrated seat board.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'White UPVC bay window projecting from living room wall, classic styling',
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹600',
    priceUnit: 'set',
    rating: 4.7,
    reviews: 156,
    uValue: '1.1',
    acoustic: '43 dB',
    profiles: '6-chamber',
    highlights: ['30° / 45° angles', 'Structural corner posts', 'Seat board option'],
    href: '/products/bay-window',
  },
  {
    id: 'louvre',
    category: 'Louvre',
    name: 'Louvre Vent',
    tagline: 'Angled blades, continuous airflow, rain-resistant',
    description:
      'Adjustable glass blades allow continuous passive ventilation even during light rain. Monsoon-rated drainage channel.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC louvre vent window with angled glass blades in tropical setting',
    badge: { label: 'Eco Choice', variant: 'eco' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.6,
    reviews: 203,
    uValue: '1.6',
    acoustic: '34 dB',
    profiles: '4-chamber',
    highlights: ['Adjustable blade angle', 'No power needed', 'Monsoon drainage'],
    href: '/products/louvre',
  },
];

const categories: Category[] = ['All', 'Casement', 'Sliding', 'Tilt & Turn', 'Fixed', 'Bay & Bow', 'Louvre'];

/* ─────────────────────────────────────────────
   Badge styles
───────────────────────────────────────────── */
const badgeStyles: Record<string, string> = {
  popular: 'bg-primary/12 text-primary border-primary/20',
  new:     'bg-accent/12 text-accent border-accent/20',
  premium: 'bg-amber-500/12 text-amber-600 border-amber-500/20',
  eco:     'bg-emerald-500/12 text-emerald-600 border-emerald-500/20',
};

/* ─────────────────────────────────────────────
   Badge
───────────────────────────────────────────── */
function Badge({ label, variant }: { label: string; variant: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-700 px-2.5 py-1 rounded-xl border backdrop-blur-sm ${badgeStyles[variant]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Stars
───────────────────────────────────────────── */
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const dim = size === 'xs' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 12 12" className={`${dim} ${s <= Math.round(rating) ? 'fill-amber-400' : 'fill-border'}`}>
          <path d="M6 1l1.24 2.52L10 3.93l-2 1.95.47 2.76L6 7.27 3.53 8.64 4 5.88 2 3.93l2.76-.41z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SpecPill
───────────────────────────────────────────── */
function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl bg-background border border-border/60">
      <span className="text-xs font-700 text-foreground">{value}</span>
      <span className="text-[9px] font-500 text-muted-foreground uppercase tracking-widest mt-0.5">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Filter tab
───────────────────────────────────────────── */
function FilterTab({ cat, active, onClick }: { cat: Category; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-xl text-sm font-500 transition-colors duration-200 ${
        active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 bg-primary rounded-xl shadow-soft"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{cat}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   FEATURED card
───────────────────────────────────────────── */
function FeaturedCard({ product, inView }: { product: Product; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="relative rounded-3xl overflow-hidden border border-border/60 shadow-medium bg-card"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <AppImage
          src={product.image}
          alt={product.imageAlt}
          fill
          className={`object-cover transition-transform duration-1000 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/92 to-card/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
      </div>

      <div className="absolute top-6 left-6 right-6 h-px bg-border/30" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-border/30" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 min-h-[400px] md:min-h-[360px]">

        {/* Left: text column */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 lg:p-11 gap-6">

          {/* Eyebrow row */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-500 text-foreground bg-background/95 px-2.5 py-1 rounded-lg border border-border/60 shadow-sm">
              {product.category}
            </span>
            <span className="text-xs font-500 text-accent bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/20 shadow-sm">
              Featured
            </span>
            {product.badge && <Badge label={product.badge.label} variant={product.badge.variant} />}
          </div>

          {/* Name + tagline + description */}
          <div className="flex flex-col gap-3">
            <div>
              <h3
                className="text-2xl sm:text-3xl font-800 text-foreground tracking-tight leading-none"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.10)' }}
              >
                {product.name}
              </h3>
              <p className="mt-2 text-sm font-600 text-primary">{product.tagline}</p>
            </div>
            <p className="text-sm font-400 text-foreground/85 leading-relaxed max-w-sm">{product.description}</p>

            {/* Highlight chips */}
            <div className="flex flex-wrap gap-2 mt-1">
              {product.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 text-xs font-500 text-foreground bg-background/95 border border-border/70 px-3 py-1.5 rounded-full shadow-sm"
                >
                  <Icon name="CheckIcon" size={9} className="text-primary shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-6 pt-4 border-t border-border/50 flex-wrap">
            <div>
              <p className="text-[9px] font-700 text-muted-foreground uppercase tracking-[0.18em]">Starting from</p>
              <p className="text-2xl font-800 text-foreground tracking-tight leading-none mt-0.5">
                {product.startingPrice}
              </p>
              <p className="text-xs font-400 text-muted-foreground mt-0.5">{product.priceUnit}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Stars rating={product.rating} />
                <span className="text-xs font-600 text-foreground">{product.rating}</span>
                <span className="text-xs font-400 text-muted-foreground">({product.reviews})</span>
              </div>
              <Link href={product.href} className="btn-primary">
                Explore
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: spec cluster */}
        <div className="md:col-span-6 lg:col-span-7 hidden md:flex items-end justify-end p-8 lg:p-10">
          <div className="flex items-center gap-1 bg-background border border-border/60 rounded-2xl p-1.5 shadow-lg">
            {[
              { label: 'U-Value', value: `${product.uValue} W/m²K` },
              { label: 'Acoustic', value: product.acoustic },
              { label: 'Profiles', value: product.profiles },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="w-px h-8 bg-border/60 mx-0.5" />}
                <SpecPill label={s.label} value={s.value} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   STANDARD card
───────────────────────────────────────────── */
function StandardCard({ product, index, inView }: { product: Product; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="flex flex-col rounded-3xl bg-card border border-border/60 overflow-hidden"
      style={{
        boxShadow: hovered
          ? '0 20px 50px -8px rgba(0,0,0,0.13), 0 0 0 1px rgba(var(--primary),0.08)'
          : '0 2px 10px -2px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-secondary/30 shrink-0">
        <AppImage
          src={product.image}
          alt={product.imageAlt}
          fill
          className={`object-cover transition-transform duration-600 ease-out ${hovered ? 'scale-[1.07]' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Spec strip — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-3 py-2.5 bg-background border-t border-border/60"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpecPill label="U-Value" value={`${product.uValue} W/m²K`} />
              <div className="w-px h-7 bg-border/60" />
              <SpecPill label="Acoustic" value={product.acoustic} />
              <div className="w-px h-7 bg-border/60" />
              <SpecPill label="Profile" value={product.profiles} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {product.badge ? <Badge label={product.badge.label} variant={product.badge.variant} /> : <span />}
          <span className="text-xs font-500 text-foreground bg-background/95 px-2.5 py-1 rounded-lg border border-border/50 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
        <div>
          <h3 className="text-base font-700 text-foreground leading-tight">{product.name}</h3>
          <p className="text-xs font-400 text-muted-foreground mt-1 leading-snug">{product.tagline}</p>
        </div>

        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} size="xs" />
          <span className="text-xs font-600 text-foreground">{product.rating}</span>
          <span className="text-xs font-400 text-muted-foreground">· {product.reviews} reviews</span>
        </div>

        <ul className="flex flex-col gap-1.5">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs font-400 text-muted-foreground">
              <div className="w-3.5 h-3.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="CheckIcon" size={8} className="text-primary" />
              </div>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <div>
            <p className="text-[9px] font-500 text-muted-foreground uppercase tracking-widest">From</p>
            <p className="text-base font-800 text-foreground leading-none mt-0.5">{product.startingPrice}</p>
            <p className="text-[10px] font-400 text-muted-foreground mt-0.5">{product.priceUnit}</p>
          </div>
          <Link href={product.href} className="btn-primary text-xs py-2 px-3.5">
            View
            <Icon name="ArrowRightIcon" size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function ProductCards() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const gridInView  = useInView(gridRef,  { once: true, margin: '-80px' });

  const [active, setActive] = useState<Category>('All');

  const allFiltered = active === 'All' ? products : products.filter((p) => p.category === active);
  const featured    = allFiltered.find((p) => p.featured);
  const rest        = allFiltered.filter((p) => !p.featured);

  return (
    <section id="products" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          ref={headRef}
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-5 h-px bg-primary/50" />
            <span className="section-label">Our Products</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground leading-tight max-w-lg">
              Every window type.<br className="hidden sm:block" />
              <span className="text-muted-foreground"> One standard of quality.</span>
            </h2>
            <p className="text-sm font-400 text-muted-foreground leading-relaxed max-w-xs sm:text-right">
              Manufactured at our ISO-certified Mumbai facility and installed by our own team — no resellers, no shortcuts.
            </p>
          </div>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex items-center gap-1 flex-wrap mb-10 sm:mb-12 p-1 bg-secondary/60 border border-border/50 rounded-2xl w-fit"
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <FilterTab key={cat} cat={cat} active={active === cat} onClick={() => setActive(cat)} />
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {featured && (
                <div className="mb-5">
                  <FeaturedCard product={featured} inView={gridInView} />
                </div>
              )}

              {(featured ? rest : allFiltered).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {(featured ? rest : allFiltered).map((product, i) => (
                    <StandardCard key={product.id} product={product} index={i} inView={gridInView} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CTA banner ── */}
        <motion.div
          className="mt-12 sm:mt-16 glass-card rounded-3xl border border-border/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-8 w-56 h-56 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center sm:text-left">
            <p className="text-base font-700 text-foreground">Not sure which window is right for your home?</p>
            <p className="text-sm font-400 text-muted-foreground mt-1">
              Our specialists will visit, assess, and recommend — completely free.
            </p>
          </div>
          <div className="relative flex items-center gap-3 shrink-0">
            <Link href="/product-configurator" className="btn-primary">
              Configure Windows
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}