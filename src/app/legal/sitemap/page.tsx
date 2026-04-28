'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
interface SitemapLink {
  label: string;
  href: string;
  description?: string;
}

interface SitemapGroup {
  heading: string;
  icon: string;
  color: string;
  links: SitemapLink[];
}

const groups: SitemapGroup[] = [
  {
    heading: 'Main Pages',
    icon: 'HomeIcon',
    color: 'bg-primary/10 text-primary border-primary/15',
    links: [
      { label: 'Home',              href: '/homepage',              description: 'Overview of Keepexa Interiorproducts and services' },
      { label: 'Gallery',           href: '/gallery',               description: 'Real project photos from our installations' },
      { label: 'About Us',          href: '/homepage#about',        description: 'Our story, team, and manufacturing facility' },
      { label: 'Why Choose Us',     href: '/homepage#why-choose-us',description: 'Certifications, guarantees, and differentiators' },
      { label: 'FAQ',               href: '/homepage#faq',          description: 'Frequently asked questions' },
      { label: 'Contact Us',        href: '/homepage#contact',      description: 'Get in touch with our team' },
      { label: 'Product Configurator', href: '/product-configurator', description: 'Design and price your windows online' },
    ],
  },
  {
    heading: 'Products',
    icon: 'WindowIcon',
    color: 'bg-accent/10 text-accent border-accent/15',
    links: [
      { label: 'All Products',      href: '/homepage#products',     description: 'Browse our full window and door range' },
      { label: 'Tilt & Turn',       href: '/products/tilt-turn',    description: "Europe's most versatile window, engineered for India" },
      { label: 'Classic Casement',  href: '/products/casement',     description: 'Side-hung sash, full ventilation, timeless profile' },
      { label: 'French Casement',   href: '/products/french-casement', description: 'Double-leaf, no centre post, unobstructed opening' },
      { label: 'Sliding 2-Track',   href: '/products/sliding-2track', description: 'Space-saving horizontal slide, perfect for balconies' },
      { label: 'Lift & Slide',      href: '/products/lift-slide',   description: 'Large-format panels, effortless handle-lift operation' },
      { label: 'Fixed Picture',     href: '/products/fixed-picture',description: 'Maximum glazing, zero infiltration, pure views' },
      { label: 'Bay Window',        href: '/products/bay-window',   description: 'Three-panel angled projection, light and space' },
      { label: 'Louvre Vent',       href: '/products/louvre',       description: 'Angled blades, continuous airflow, rain-resistant' },
    ],
  },
  {
    heading: 'Support',
    icon: 'LifebuoyIcon',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/15',
    links: [
      { label: 'Get Free Quote',       href: '/product-configurator', description: 'Start your project with a custom quote' },
      { label: 'Book Site Survey',     href: '/contact',              description: 'Schedule a free home assessment' },
      { label: 'Installation Guide',   href: '/support/installation', description: 'What to expect during your installation day' },
      { label: 'Care & Maintenance',   href: '/support/maintenance',  description: 'Keeping your windows in peak condition' },
      { label: 'Warranty Policy',      href: '/support/warranty',     description: '10-year frame, 5-year glass, 2-year seal warranty' },
      { label: 'Make a Warranty Claim',href: '/support/warranty-claim', description: 'Submit a claim for a defective product' },
    ],
  },
  {
    heading: 'Legal',
    icon: 'DocumentTextIcon',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/15',
    links: [
      { label: 'Privacy Policy',    href: '/privacy',  description: 'How we collect, use, and protect your data' },
      { label: 'Terms of Service',  href: '/terms',    description: 'Rules governing use of our services' },
      { label: 'Sitemap',           href: '/sitemap',  description: 'This page — all links in one place' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Group card
───────────────────────────────────────────── */
function GroupCard({ group, index }: { group: SitemapGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-soft"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-secondary/30">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${group.color}`}>
          <Icon name={group.icon} size={14} />
        </div>
        <h2 className="text-sm font-800 text-foreground tracking-tight">{group.heading}</h2>
        <span className="ml-auto text-xs font-600 text-muted-foreground">
          {group.links.length} {group.links.length === 1 ? 'page' : 'pages'}
        </span>
      </div>

      {/* Links */}
      <ul className="divide-y divide-border/30">
        {group.links.map((l, li) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 + li * 0.04 + 0.1 }}
          >
            <Link
              href={l.href}
              className="group flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/40 transition-colors duration-150"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-600 text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {l.label}
                </span>
                {l.description && (
                  <span className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-1">
                    {l.description}
                  </span>
                )}
              </div>
              <motion.span
                className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon name="ArrowTopRightOnSquareIcon" size={13} />
              </motion.span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function SitemapPage() {
  const totalPages = groups.reduce((acc, g) => acc + g.links.length, 0);

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-card border-b border-border/60 pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/homepage"
                className="inline-flex items-center gap-1.5 text-xs font-600 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="ArrowLeftIcon" size={12} />
                Keepexa Interior
              </Link>
              <span className="text-border/60">/</span>
              <span className="text-xs font-600 text-muted-foreground">Sitemap</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="block w-5 h-px bg-primary/50" />
              <span className="section-label">Navigation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-3">
              Sitemap
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Every page on Keepexa Interior.com, organised by section. {totalPages} pages total.
            </p>

            {/* Stat pills */}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              {groups.map((g) => (
                <div
                  key={g.heading}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-600 ${g.color}`}
                >
                  <Icon name={g.icon} size={12} />
                  {g.heading}
                  <span className="font-800">{g.links.length}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {groups.map((group, i) => (
            <GroupCard key={group.heading} group={group} index={i} />
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Can't find what you're looking for?{' '}
            <a href="mailto:hello@Keepexa Interior.com" className="text-primary hover:underline font-600">
              hello@Keepexa Interior.com
            </a>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="text-xs font-600 text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy →
            </Link>
            <span className="w-px h-3 bg-border/60" />
            <Link href="/terms" className="text-xs font-600 text-muted-foreground hover:text-primary transition-colors">
              Terms of Service →
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}