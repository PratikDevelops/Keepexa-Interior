'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
interface Section {
  id: string;
  title: string;
  content: { heading?: string; body: string }[];
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: [
      {
        body: 'By accessing Keepexa Interior.com, requesting a quote, placing an order, or using any of our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services. These Terms constitute a legally binding agreement between you and Keepexa Interior Pvt. Ltd., a company incorporated under the Companies Act, 2013, with its registered office at Maruti Niwas, BSNL colony, Opp IIT Main Gate, Powai, Mumbai – 400076, Maharashtra.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Our Services',
    content: [
      {
        body: 'Keepexa Interior designs, manufactures, and installs premium UPVC windows and doors. Our services include product consultations, site surveys, custom fabrication, delivery, and professional installation across India. Specific service scope, timelines, and deliverables for your project are set out in the individual Order Confirmation provided to you.',
      },
      {
        heading: 'Service availability',
        body: 'We currently serve residential and commercial customers across Maharashtra and select cities. Service availability in other regions is subject to confirmation. We reserve the right to refuse service at our sole discretion.',
      },
    ],
  },
  {
    id: 'quotes-orders',
    title: 'Quotes, Orders & Pricing',
    content: [
      {
        heading: 'Quotes',
        body: 'All quotes provided — whether online via our configurator, by email, or in person — are estimates valid for 30 days from the date of issue. Prices are subject to change without notice after this period. A quote does not constitute a binding contract.',
      },
      {
        heading: 'Order confirmation',
        body: 'An order is formed only when you receive a written Order Confirmation from us and pay the required deposit (typically 50% of the total order value). We reserve the right to decline any order.',
      },
      {
        heading: 'Pricing & taxes',
        body: 'All prices are in Indian Rupees (INR) and inclusive of GST at the applicable rate unless expressly stated otherwise. Prices for standard products are listed on our website but final pricing depends on your specific measurements, glass specification, hardware, and site conditions.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment Terms',
    content: [
      {
        body: 'Payment is structured as follows: 50% deposit upon Order Confirmation, 40% before delivery to site, and the remaining 10% on completion of installation. Payment can be made via bank transfer (NEFT/RTGS/IMPS), UPI, credit/debit card, or cheque (subject to clearance before work commences).',
      },
      {
        heading: 'Late payment',
        body: 'Overdue amounts attract interest at 2% per month compounded monthly. We reserve the right to suspend or cancel services if payment is more than 14 days overdue, without prejudice to any other rights or remedies.',
      },
      {
        heading: 'Cancellation & refunds',
        body: 'Orders cancelled within 48 hours of confirmation are eligible for a full refund of the deposit. Cancellations after 48 hours but before manufacturing commences incur a 15% cancellation fee. Once manufacturing has commenced, the deposit is non-refundable as materials are custom-fabricated to your specifications.',
      },
    ],
  },
  {
    id: 'installation',
    title: 'Installation & Site Requirements',
    content: [
      {
        body: 'Our installation team will coordinate a mutually agreed installation date. You are responsible for ensuring: clear, safe access to all relevant areas; that all necessary civil work (lintel, sill, wall openings) is complete and correctly sized per our specifications; that the site is reasonably free of other trades that may obstruct our work; and that a responsible adult is present throughout installation.',
      },
      {
        heading: 'Delays caused by customer',
        body: 'If installation is delayed due to site unreadiness or inaccessibility, we reserve the right to charge storage fees of ₹500 per unit per day after 7 days and reschedule at our next available slot, which may be several weeks later.',
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty',
    content: [
      {
        heading: '10-year frame warranty',
        body: 'We warrant that UPVC frames will be free from defects in materials and workmanship for 10 years from the date of installation. This covers structural failure, colour fade beyond acceptable limits, and hardware malfunction under normal use.',
      },
      {
        heading: 'Glass & seals',
        body: 'Insulated glass units carry a 5-year warranty against inter-pane condensation (seal failure). External seals and gaskets carry a 2-year warranty.',
      },
      {
        heading: 'Exclusions',
        body: 'The warranty does not cover damage caused by misuse, accident, improper maintenance, modifications made by third parties, acts of God (floods, earthquakes, cyclones), normal wear and tear, or damage resulting from non-compliance with our care and maintenance guide.',
      },
      {
        heading: 'Making a warranty claim',
        body: 'To make a warranty claim, contact warranty@Keepexa Interior.com with your Order Confirmation number, photographs of the defect, and a description of the issue. We will inspect the claim within 14 working days and, if valid, repair or replace the defective components at no cost.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: [
      {
        body: 'All content on Keepexa Interior.com — including text, images, product renders, design drawings, branding, logos, and software — is owned by or licensed to Keepexa Interior Pvt. Ltd. and is protected by Indian and international intellectual property laws. You may not reproduce, distribute, or use our content for commercial purposes without prior written consent.',
      },
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: [
      {
        body: 'To the fullest extent permitted by law, Keepexa Interior\'s total liability to you for any claim arising out of or in connection with these Terms or our services shall not exceed the amount you paid us for the specific product or service giving rise to the claim.',
      },
      {
        heading: 'Indirect losses',
        body: 'We shall not be liable for any indirect, consequential, special, or punitive damages, including loss of profit, loss of business, loss of data, or any other economic loss, even if we were advised of the possibility of such loss.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Disputes',
    content: [
      {
        body: 'These Terms are governed by and construed in accordance with the laws of India. Any dispute arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
      },
      {
        heading: 'Dispute resolution',
        body: 'Before initiating legal proceedings, the parties agree to attempt good-faith resolution through negotiation. If unresolved within 30 days, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual agreement, proceedings in English, seat in Mumbai.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content: [
      {
        body: 'We may revise these Terms from time to time. Material changes will be notified via email or a prominent notice on our website. Continued use of our services after the effective date of changes constitutes your acceptance. We recommend reviewing these Terms periodically.',
      },
    ],
  },
  {
    id: 'contact-legal',
    title: 'Contact',
    content: [
      {
        body: 'For any questions regarding these Terms, please contact: legal@Keepexa Interior.com · Maruti Niwas, BSNL colony, Opp IIT Main Gate, Powai, Mumbai – 400076, Maharashtra.',
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
export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

      {/* Hero */}
      <div className="bg-card border-b border-border/60 pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >

            <h1 className="text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-3">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="font-600 text-foreground">1 April 2025</span>
              &nbsp;·&nbsp; Effective: <span className="font-600 text-foreground">1 April 2025</span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Please read these Terms of Service carefully before using Keepexa Interior's website or services. By using our services, you agree to these terms in full.
            </p>

            {/* Quick-read warning box */}
            <div className="mt-6 inline-flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-500/8 border border-amber-500/20 max-w-xl">
              <Icon name="ExclamationTriangleIcon" size={15} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-700">Key points: </span>
                50% deposit on order; 10-year frame warranty; custom orders are non-refundable once manufacturing begins; disputes governed by Mumbai courts.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
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
            Legal queries?{' '}
            <a href="mailto:legal@Keepexa Interior.com" className="text-primary hover:underline font-600">
              legal@Keepexa Interior.com
            </a>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/legal/privacy-policy" className="text-xs font-600 text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy →
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