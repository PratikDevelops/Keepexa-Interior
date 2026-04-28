'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
interface Section {
  id: string;
  title: string;
  content: { heading?: string; body: string }[];
}

const sections: Section[] = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: [
      {
        heading: 'Information you provide directly',
        body: 'When you request a quote, book a site survey, or contact us, we collect your name, email address, phone number, postal address, and any project details you share. We only collect what you voluntarily provide.',
      },
      {
        heading: 'Information collected automatically',
        body: 'When you visit Keepexa Interior.com, we automatically collect your IP address, browser type, pages visited, time spent, and referring URLs through cookies and analytics tools (Google Analytics 4). This helps us improve our website and services.',
      },
      {
        heading: 'Information from third parties',
        body: 'If you contact us via WhatsApp, social media, or a partner platform, we may receive information shared through those services as permitted by their respective privacy policies.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    content: [
      {
        body: 'We use your personal information solely to provide, improve, and personalise our services. Specifically, we use it to: process quote requests and bookings; send you appointment confirmations and service updates; respond to your enquiries; improve our website and product offerings; comply with legal obligations; and with your explicit consent, send you promotional communications about new products or offers.',
      },
      {
        heading: 'Legal basis (GDPR / Indian DPDP Act)',
        body: 'We process your data under the following legal bases: contract performance (to deliver services you requested), legitimate interests (website analytics, fraud prevention), legal obligation (tax and regulatory compliance), and consent (marketing emails — you may withdraw consent at any time).',
      },
    ],
  },
  {
    id: 'sharing',
    title: 'How We Share Your Information',
    content: [
      {
        body: 'We do not sell, rent, or trade your personal data. We share it only with trusted service providers who assist us in operating our business — including payment processors, cloud hosting providers (AWS Mumbai region), email services, and analytics platforms — all bound by strict data processing agreements.',
      },
      {
        heading: 'Legal disclosures',
        body: 'We may disclose your information if required to do so by law, court order, or government authority, or where necessary to protect the rights, property, or safety of Keepexa Interior, our customers, or others.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: [
      {
        body: 'Our website uses cookies to remember your preferences, analyse traffic, and improve your experience. You can control cookie settings through your browser or our cookie consent banner. Essential cookies required for the site to function cannot be disabled.',
      },
      {
        heading: 'Types of cookies we use',
        body: 'Essential cookies (session management, security), Analytics cookies (Google Analytics 4, anonymised IP), Preference cookies (language, region settings), and Marketing cookies (remarketing — only with your consent).',
      },
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention & Security',
    content: [
      {
        body: 'We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Quote and customer records are retained for 7 years in accordance with Indian tax law. You may request deletion of your data at any time by contacting us, subject to these legal retention requirements.',
      },
      {
        heading: 'Security measures',
        body: 'We implement industry-standard security measures including TLS encryption for data in transit, AES-256 encryption for data at rest, access controls, regular security audits, and staff training. No method of transmission over the internet is 100% secure; we will notify you promptly of any breach that affects your data.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: [
      {
        body: 'Under applicable law (including the Digital Personal Data Protection Act 2023), you have the right to: access the personal data we hold about you; correct inaccurate data; request erasure of your data; object to or restrict processing; data portability; and withdraw consent at any time for consent-based processing.',
      },
      {
        body: 'To exercise any of these rights, email us at privacy@Keepexa Interior.com. We will respond within 30 days. You also have the right to lodge a complaint with the Data Protection Board of India if you believe we have handled your data unlawfully.',
      },
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    content: [
      {
        body: 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately and we will delete it promptly.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: [
      {
        body: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a revised "Last Updated" date and, where appropriate, by email. Your continued use of our services after any changes constitutes acceptance of the updated policy.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: [
      {
        body: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer: privacy@Keepexa Interior.com · +91 73710 73711 · Maruti Niwas, BSNL colony, Opp IIT Main Gate, Powai, Mumbai – 400076, Maharashtra.',
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Animated section
───────────────────────────────────────────── */
function AnimSection({ section, index }: { section: Section; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.section
      ref={ref}
      id={section.id}
      className="scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Section number + title */}
      <div className="flex items-start gap-4 mb-5">
        <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-800 text-primary mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-lg sm:text-xl font-800 text-foreground tracking-tight leading-snug">
          {section.title}
        </h2>
      </div>

      <div className="ml-11 flex flex-col gap-4">
        {section.content.map((c, ci) => (
          <div key={ci}>
            {c.heading && (
              <p className="text-sm font-700 text-foreground mb-1.5">{c.heading}</p>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-card border-b border-border/60 pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="font-600 text-foreground">1 April 2025</span>
              &nbsp;·&nbsp; Effective: <span className="font-600 text-foreground">1 April 2025</span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              At Keepexa Interior, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our website or services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Body: sidebar TOC + content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-14">

          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-1">
              <p className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.2em] mb-3">
                Contents
              </p>
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 py-1.5 text-xs font-500 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="block w-0 group-hover:w-3 h-px bg-primary/60 transition-all duration-200 rounded-full shrink-0" />
                  <span className="text-[10px] font-700 text-muted-foreground/50 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Sections */}
          <div className="flex flex-col gap-10 divide-y divide-border/40">
            {sections.map((s, i) => (
              <div key={s.id} className={i > 0 ? 'pt-10' : ''}>
                <AnimSection section={s} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Questions? Email us at{' '}
            <a href="mailto:privacy@Keepexa Interior.com" className="text-primary hover:underline font-600">
              privacy@Keepexa Interior.com
            </a>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/legal/terms-of-service" className="text-xs font-600 text-muted-foreground hover:text-primary transition-colors">
              Terms of Service →
            </Link>
            <span className="w-px h-3 bg-border/60" />
            <Link href="/sitemap" className="text-xs font-600 text-muted-foreground hover:text-primary transition-colors">
              Sitemap →
            </Link>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}