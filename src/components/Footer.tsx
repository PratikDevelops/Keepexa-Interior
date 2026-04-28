'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const productLinks = [
  { label: 'Tilt & Turn', href: '/products/tilt-turn' },
  { label: 'Classic Casement', href: '/products/casement' },
  { label: 'French Casement', href: '/products/french-casement' },
  { label: 'Sliding 2-Track', href: '/products/sliding-2track' },
  { label: 'Lift & Slide', href: '/products/lift-slide' },
  { label: 'Fixed Picture', href: '/products/fixed-picture' },
  { label: 'Bay Window', href: '/products/bay-window' },
  { label: 'Louvre Vent', href: '/products/louvre' },
];

const companyLinks = [
  { label: 'About Us', href: '/homepage#about' },
  { label: 'Why Choose Us', href: '/homepage#why-choose-us' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/homepage#faq' },
  { label: 'Contact Us', href: '/homepage#contact' },
];

const supportLinks = [
  { label: 'Get Free Quote', href: '/product-configurator' },
  { label: 'Installation Guide', href: '/support/installation' },
  { label: 'Warranty Policy', href: '/support/warranty' },
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms of Service', href: '/legal/terms-of-service' },
];

const contactItems = [
  { icon: 'MapPinIcon', value: 'Maruti Niwas, BSNL colony, Opp IIT Main Gate, Powai, Mumbai – 400076, Maharashtra' },
  { icon: 'PhoneIcon', value: '+91 73710 73711' },
  { icon: 'EnvelopeIcon', value: 'admin@keepexa.in' },
  { icon: 'ClockIcon', value: 'Mon – Sat, 9 am – 7 pm IST' },
];

const certBadges = [
  { label: 'ISO 9001:2015', sub: 'Quality Mgmt.' },
  { label: 'BIS Certified', sub: 'IS 14856' },
  { label: '10-Year', sub: 'Frame Warranty' },
  { label: '5-Star', sub: 'GRIHA Rated' },
];

const socials = [
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
  { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
  { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
];

/* ─────────────────────────────────────────────
   Social SVGs (inline)
───────────────────────────────────────────── */
function SocialSVG({ icon }: { icon: string }) {
  if (icon === 'instagram')
    return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
  if (icon === 'facebook')
    return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>;
  if (icon === 'youtube')
    return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>;
  return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

/* ─────────────────────────────────────────────
   FadeUp helper
───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Link column
───────────────────────────────────────────── */
function LinkColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-4 min-w-0">
      <div className="flex items-center gap-2">
        <span className="block w-3 h-px bg-primary/50 shrink-0" />
        <h3 className="text-[11px] font-700 text-foreground uppercase tracking-[0.18em] whitespace-nowrap">
          {heading}
        </h3>
      </div>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <span className="block w-0 group-hover:w-2 h-px bg-primary/60 transition-all duration-200 rounded-full shrink-0" />
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border/60 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Top CTA strip ── */}
        <FadeUp>
          <div className="py-8 sm:py-10 border-b border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-lg sm:text-xl font-800 text-foreground tracking-tight">
                Ready to transform your home?
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Get a personalised quote — no obligation, no resellers.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/product-configurator" className="btn-primary whitespace-nowrap">
                Configure Windows
                <Icon name="ArrowRightIcon" size={15} />
              </Link>
              <Link
                href="/homepage#contact"
                className="whitespace-nowrap px-5 py-2.5 rounded-xl border border-border/80 text-sm font-600 text-foreground hover:bg-secondary/60 transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* ── Main content row ── */}
        <div className="py-12 sm:py-16 border-b border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-12">

            {/* ── Brand panel ── */}
            <FadeUp delay={0.05} className="flex flex-col gap-6">
              {/* Logo */}
              <Link href="/homepage" className="flex items-center gap-2.5 group w-fit">
                <AppLogo size={140} onClick={() => { }} className="transition-transform duration-300 group-hover:scale-105" />
              </Link>

              {/* Tagline */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                India's premium UPVC window &amp; door manufacturer. Engineered at our ISO-certified
                Mumbai facility, installed by our own team.
              </p>

              {/* Cert badges — 2×2 fixed-width grid */}
              <div className="grid grid-cols-2 gap-2">
                {certBadges.map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col px-3 py-2.5 rounded-xl bg-secondary/60 border border-border/50"
                  >
                    <span className="text-xs font-700 text-primary leading-tight">{b.label}</span>
                    <span className="text-[11px] font-500 text-muted-foreground mt-0.5 leading-tight">{b.sub}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-secondary/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 hover:border-primary/20 transition-all duration-200"
                  >
                    <SocialSVG icon={s.icon} />
                  </a>
                ))}
              </div>
            </FadeUp>

            {/* ── Links + contact row ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <FadeUp delay={0.1}>
                <LinkColumn heading="Products" links={productLinks} />
              </FadeUp>
              <FadeUp delay={0.15}>
                <LinkColumn heading="Company" links={companyLinks} />
              </FadeUp>
              <FadeUp delay={0.2}>
                <LinkColumn heading="Support" links={supportLinks} />
              </FadeUp>

              {/* Contact column */}
              <FadeUp delay={0.25}>
                <div className="flex flex-col gap-4 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="block w-3 h-px bg-primary/50 shrink-0" />
                    <h3 className="text-[11px] font-700 text-foreground uppercase tracking-[0.18em] whitespace-nowrap">
                      Get in Touch
                    </h3>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {contactItems.map((c) => (
                      <li key={c.icon} className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name={c.icon} size={12} className="text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground leading-snug">{c.value}</span>
                      </li>
                    ))}
                  </ul>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/+917371073711"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm font-600 text-emerald-600 hover:bg-emerald-500/15 transition-colors duration-200 w-fit"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {currentYear} Keepexa Interior Pvt. Ltd. All rights reserved. Made with care in Mumbai, India.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              {[
                { label: 'Privacy Policy', href: '/legal/privacy-policy' },
                { label: 'Terms of Service', href: '/legal/terms-of-service' },
                { label: 'Sitemap', href: '/legal/sitemap' },
              ].map((l, i) => (
                <React.Fragment key={l.label}>
                  {i > 0 && <span className="w-px h-3 bg-border/60 shrink-0" aria-hidden="true" />}
                  <Link
                    href={l.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
                  >
                    {l.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}