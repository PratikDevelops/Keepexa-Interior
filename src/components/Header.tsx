'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Product routes (from generateStaticParams)
───────────────────────────────────────────── */
const productLinks = [
  { label: 'Tilt & Turn',      href: '/products/tilt-turn' },
  { label: 'Casement',         href: '/products/casement' },
  { label: 'Sliding 2-Track',  href: '/products/sliding-2track' },
  { label: 'French Casement',  href: '/products/french-casement' },
  { label: 'Lift & Slide',     href: '/products/lift-slide' },
  { label: 'Fixed / Picture',  href: '/products/fixed-picture' },
  { label: 'Bay Window',       href: '/products/bay-window' },
  { label: 'Louvre',           href: '/products/louvre' },
];

/* ─────────────────────────────────────────────
   Nav links  (Windows & Doors is now a dropdown)
───────────────────────────────────────────── */
const navLinks = [
  { label: 'Windows & Doors', href: '/#products', hasDropdown: true },
  { label: 'Gallery',         href: '/gallery' },
  { label: 'About Us',        href: '/#about' },
  { label: 'Why Choose Us',   href: '/#why-choose-us' },
  { label: 'FAQ',             href: '/#faq' },
  { label: 'Contact Us',      href: '/#contact' },
];

/* ─────────────────────────────────────────────
   Animated hamburger icon (3 bars → X)
───────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 bg-foreground rounded-full origin-center"
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="block h-0.5 bg-foreground rounded-full"
        animate={open ? { opacity: 0, scaleX: 0.5 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 bg-foreground rounded-full origin-center"
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Desktop product dropdown panel
───────────────────────────────────────────── */
function ProductDropdown({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-background border border-border/60 rounded-2xl shadow-medium overflow-hidden z-50"
        >
          {/* Header strip */}
          <div className="px-4 pt-3.5 pb-2 border-b border-border/40">
            <span className="text-[10px] font-700 uppercase tracking-[0.18em] text-muted-foreground">
              Our Products
            </span>
          </div>

          {/* Product grid — 2 columns */}
          <div className="grid grid-cols-2 gap-px p-2">
            {productLinks.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-secondary/70 transition-colors duration-150"
              >
                {/* Dot accent */}
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-200" />
                <span className="text-sm font-500 text-foreground/80 group-hover:text-foreground transition-colors leading-tight">
                  {p.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-3 pb-3 pt-1">
            <Link
              href="/#products"
              className="flex items-center justify-center gap-1.5 w-full text-xs font-600 text-primary hover:underline underline-offset-2 py-1.5"
            >
              View all products
              <Icon name="ArrowRightIcon" size={13} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Mobile nav link row
───────────────────────────────────────────── */
function MobileNavLink({
  link,
  index,
  onClose,
}: {
  link: { label: string; href: string; hasDropdown?: boolean };
  index: number;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (link.hasDropdown) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.08 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Toggle row */}
        <button
          className="group flex items-center justify-between w-full py-4 text-base font-500 text-foreground border-b border-border/50 hover:text-primary transition-colors duration-200"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          <span>{link.label}</span>
          <motion.span
            className="text-muted-foreground group-hover:text-primary transition-colors"
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="ChevronRightIcon" size={16} />
          </motion.span>
        </button>

        {/* Expandable product list */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="products"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 py-2 pl-3 border-b border-border/50">
                {productLinks.map((p, pi) => (
                  <motion.div
                    key={p.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: pi * 0.04 }}
                  >
                    <Link
                      href={p.href}
                      onClick={onClose}
                      className="flex items-center gap-2 py-2.5 text-sm font-500 text-muted-foreground hover:text-primary transition-colors duration-150"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {p.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  /* Plain link */
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={link.href}
        onClick={onClose}
        className="group flex items-center justify-between py-4 text-base font-500 text-foreground border-b border-border/50 hover:text-primary transition-colors duration-200"
      >
        <span>{link.label}</span>
        <motion.span
          className="text-muted-foreground group-hover:text-primary transition-colors"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Icon name="ChevronRightIcon" size={16} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Header
───────────────────────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Desktop / Scroll header ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-soft border-b border-border/60'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <AppLogo
              size={140}
              onClick={() => {}}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav links */}
          <div
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => {
              setHoveredLink(null);
              setDropdownOpen(false);
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);

              /* ── Windows & Doors dropdown trigger ── */
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => { setHoveredLink(link.href); setDropdownOpen(true); }}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-500 transition-colors duration-200 ${
                        active || dropdownOpen
                          ? 'text-primary font-600'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {/* Hover background pill */}
                      {hoveredLink === link.href && (
                        <motion.span
                          layoutId="nav-hover-bg"
                          className="absolute inset-0 bg-secondary/70 rounded-xl"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10">{link.label}</span>

                      {/* Caret */}
                      <motion.span
                        className="relative z-10 text-muted-foreground"
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon name="ChevronDownIcon" size={14} />
                      </motion.span>
                    </Link>

                    {/* Dropdown panel */}
                    <ProductDropdown visible={dropdownOpen} />
                  </div>
                );
              }

              /* ── Regular link ── */
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => { setHoveredLink(link.href); setDropdownOpen(false); }}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-500 transition-colors duration-200 ${
                    active
                      ? 'text-primary font-600'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {hoveredLink === link.href && !active && (
                    <motion.span
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 bg-secondary/70 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/product-configurator"
              className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
            >
              Get Free Quote
              <Icon name="ArrowRightIcon" size={15} />
            </Link>

            {/* Hamburger — animated */}
            <button
              className="md:hidden p-2.5 rounded-xl hover:bg-secondary/70 transition-colors duration-200"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background border-b border-border/60 shadow-medium pt-20 px-5 pb-7 flex flex-col"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow label */}
              <motion.div
                className="flex items-center gap-2.5 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <span className="block w-4 h-px bg-primary/50" />
                <span className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.2em]">
                  Navigation
                </span>
              </motion.div>

              {/* Nav links */}
              <nav className="flex flex-col">
                {navLinks.map((link, i) => (
                  <MobileNavLink
                    key={link.href}
                    link={link}
                    index={i}
                    onClose={() => setMenuOpen(false)}
                  />
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + navLinks.length * 0.055 + 0.05 }}
                className="mt-6"
              >
                <Link
                  href="/product-configurator"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary justify-center w-full"
                >
                  Get Free Quote
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </motion.div>

              {/* Bottom tag line */}
              <motion.p
                className="text-center text-xs text-muted-foreground mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ISO-certified · Mumbai-manufactured · No resellers
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}