'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */


import { 
  BuildingStorefrontIcon, 
  Square3Stack3DIcon, 
  GlobeAsiaAustraliaIcon, 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

const WHY_US = [
  {
    num: '01',
    icon: <BuildingStorefrontIcon className="size-6 text-primary" />,
    title: 'Direct from our factory',
    desc: 'No distributors, no resellers, no margin stacking. You deal directly with the people who make your windows — which means better pricing, full traceability, and a single point of accountability from order to aftercare.',
  },
  {
    num: '02',
    icon: <Square3Stack3DIcon className="size-6 text-primary" />,
    title: 'Made-to-measure, every time',
    desc: 'Every unit is fabricated to your exact site dimensions at our Mumbai facility. We do not stock off-the-shelf sizes. Your windows fit perfectly on day one — no shimming, no hacking, no gaps.',
  },
  {
    num: '03',
    icon: <GlobeAsiaAustraliaIcon className="size-6 text-primary" />,
    title: 'Built for Indian conditions',
    desc: 'Our profiles are UV-stabilised for Mumbai and Mumbai coastal UV levels, our sill channels are monsoon-rated, and our hardware is tested in our own climate. Not adapted from European specs — engineered for India from the ground up.',
  },
  {
    num: '04',
    icon: <ShieldCheckIcon className="size-6 text-primary" />,
    title: 'Backed by a solid warranty',
    desc: '10-year warranty on all UPVC profiles, 5 years on hardware, and 3 years on roller systems. We put it in writing, not just in conversation. If something fails, we fix it — no questions, no charge.',
  },
  {
    num: '05',
    icon: <ChatBubbleLeftRightIcon className="size-6 text-primary" />,
    title: 'Honest, pressure-free advice',
    desc: 'We will recommend the right product for your space, not the most expensive one. If a basic casement does the job, we will say so. Our reputation is built on referrals — we cannot afford to oversell you.',
  },
  {
    num: '06',
    icon: <WrenchScrewdriverIcon className="size-6 text-primary" />,
    title: 'End-to-end ownership',
    desc: 'Survey, design, manufacture, installation, and post-install support — one team, one contract, one phone number. Nothing falls between departments because there are no departments to fall between.',
  },
];

const PRODUCTS = [
  { slug: 'tilt-turn', label: 'Tilt & Turn', desc: 'Dual-mode inward opening — ventilate or fully open with one handle', spec: 'From ₹750/sq ft' },
  { slug: 'casement', label: 'Classic Casement', desc: 'Side-hung outward opening, full-face ventilation, multi-point lock', spec: 'From ₹550/sq ft' },
  { slug: 'sliding-2track', label: 'Sliding 2-Track', desc: 'Horizontal slide on SS rollers — no swing space needed', spec: 'From ₹400/sq ft' },
  { slug: 'french-casement', label: 'French Casement', desc: 'Double-leaf, no centre bar — unobstructed aperture up to 1.8 m', spec: 'From ₹650/sq ft' },
  { slug: 'lift-slide', label: 'Lift & Slide', desc: 'Compression-seal large panels up to 3 m — finger-tip operation', spec: 'From ₹2500/sq ft' },
  { slug: 'fixed-picture', label: 'Fixed / Picture', desc: 'Maximum glazing, zero infiltration — any shape, any size', spec: 'From ₹500/sq ft' },
  { slug: 'bay-window', label: 'Bay Window', desc: '30° or 45° projection bay — factory assembled with structural posts', spec: 'From ₹600/set' },
  { slug: 'louvre', label: 'Louvre Vent', desc: 'Adjustable glass blades — continuous ventilation even in light rain', spec: 'From ₹550/sq ft' },
];

const STEPS = [
  {
    n: '01',
    title: 'Book a free site survey',
    desc: 'Our technical team visits your property, takes precise measurements, assesses the existing openings, and discusses your performance requirements, aesthetic preferences, and budget. No cost, no commitment.',
    time: '30–60 min visit',
  },
  {
    n: '02',
    title: 'Receive a detailed quote within 24 hours',
    desc: 'You get a fully itemised written quote — per window, per door, with glass specification, hardware finish, colour, and installation cost separately listed. No bundled estimates, no surprises.',
    time: '24-hour turnaround',
  },
  {
    n: '03',
    title: 'We fabricate your order in Mumbai',
    desc: 'On confirmation, your order enters production at our Mumbai factory. Every unit is cut, welded, and glazed to your exact dimensions. We send you a production update at the midpoint.',
    time: '10–22 working days',
  },
  {
    n: '04',
    title: 'Professional installation on your schedule',
    desc: 'Our trained installation crew arrives on the agreed date. We remove existing frames where required, install your new windows and doors, seal all joints, and clean the site before leaving.',
    time: '1–3 days on site',
  },
  {
    n: '05',
    title: 'Post-install check and ongoing support',
    desc: 'We contact you 2 weeks after installation to confirm everything is performing as expected. All hardware is adjustable post-installation. Our warranty and support line remains open for the full warranty period.',
    time: 'Lifetime support',
  },
];

const STATS = [
  { value: '8', label: 'Window & door types', sub: 'Tilt-turn to louvre — we make them all' },
  { value: '40+', label: 'RAL colour options', sub: 'Including woodgrain foils and dual-colour' },
  { value: '10yr', label: 'Profile warranty', sub: 'Written guarantee, not just a promise' },
  { value: '24hr', label: 'Quote turnaround', sub: 'Detailed, itemised, no hidden costs' },
];

const PROMISES = [
  {
    n: '01',
    title: 'Transparent, itemised pricing',
    desc: 'You see the cost of every component — profile, glazing, hardware, installation — before you sign anything. We do not use vague lump-sum quotes to obscure margins.',
  },
  {
    n: '02',
    title: 'On-time delivery and installation',
    desc: 'We commit to a production and installation timeline in writing. If we are going to be delayed for any reason, you hear from us first — with a revised date and an explanation.',
  },
  {
    n: '03',
    title: 'Post-install accountability',
    desc: 'Our responsibility does not end when the crew leaves your site. Hardware adjustments, sealant touch-ups, and warranty claims are all handled by the same team who installed your windows.',
  },
];

const CERTIFICATIONS = [
  { label: 'ISO 9001', desc: 'Quality management system certified' },
  { label: 'CE Marked', desc: 'European conformity — construction products' },
  { label: 'BIS IS 14856', desc: 'Bureau of Indian Standards compliant' },
  { label: 'GRIHA Compatible', desc: 'Data supports GRIHA green building credits' },
  { label: 'IS 875 Rated', desc: 'Wind load calculations to Indian standard' },
  { label: 'LEED Eligible', desc: 'U-Value data supports LEED EAc2 credits' },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-primary" />
      <span className="section-label">{text}</span>
    </div>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-[72px]">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-border/50">
          {/* Subtle background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel text="About Us" />
              <h1 className="text-4xl sm:text-5xl font-800 text-foreground leading-[1.1] tracking-tight max-w-2xl">
                Mumbai-based UPVC window manufacturer —{' '}
                <span className="text-primary">direct, honest, accountable.</span>
              </h1>
              <p className="mt-5 text-muted-foreground font-400 text-base sm:text-lg max-w-xl leading-relaxed">
                We design, manufacture, and install UPVC windows and doors from our own factory in Mumbai.
                No middlemen, no resellers. Every unit is custom-made for your site, backed by a 10-year
                profile warranty, and installed by the same team that built it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book-survey" className="btn-primary text-sm">
                  Book a Free Survey <ArrowRight />
                </Link>
                <Link href="/homepage#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-500 text-foreground hover:bg-secondary/60 transition-colors duration-200">
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-1 p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
                  <span className="text-3xl font-800 text-primary leading-none">{s.value}</span>
                  <span className="text-sm font-600 text-foreground mt-1">{s.label}</span>
                  <span className="text-[11px] font-400 text-muted-foreground leading-snug">{s.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
            WHY WE STARTED
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <SectionLabel text="Our Story" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground leading-tight">
                We started because the window industry needed someone who actually stands behind their product.
              </h2>
              <div className="mt-6 flex flex-col gap-2">
                {[
                  { icon: '🏗️', text: 'Factory in Mumbai — everything made in-house' },
                  { icon: '📋', text: 'Written warranty on every order' },
                  { icon: '📞', text: 'One contact from survey to aftercare' },
                  { icon: '⚡', text: '24-hour itemised quote turnaround' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50">
                    <span className="text-base leading-none">{item.icon}</span>
                    <span className="text-sm font-500 text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col gap-5 text-sm sm:text-base text-muted-foreground font-400 leading-relaxed">
              <p>
                The window and door industry in India has a trust problem. Customers are shown showroom samples,
                given vague quotes, and then handed off to subcontractors who have never seen their site.
                By the time something goes wrong, nobody answers the phone.
              </p>
              <p>
                We built Keepexa Interiors to fix that. As a direct manufacturer in Mumbai, we control
                every step — from the profiles we source to the crew that installs your windows and the
                engineer who calls you two weeks later to check everything is right.
              </p>
              <p>
                We are a young company, and that is actually our advantage. We have no bad habits,
                no inherited shortcuts, and no legacy processes that put margin ahead of quality.
                Every decision we make is being made for the first time, with full awareness that
                our reputation depends on getting it right.
              </p>

              <div className="border-l-2 border-primary pl-5 py-1 mt-1">
                <p className="text-foreground font-600 text-sm italic leading-relaxed">
                  "Being new isn't a weakness — it means we have everything to prove
                  and nothing to cut corners on."
                </p>
                <p className="text-xs font-500 text-muted-foreground mt-2">— Keepexa Interiors founding principle</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Why Choose Us" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Six reasons customers choose us over established names</h2>
              <p className="text-sm font-400 text-muted-foreground mt-2 max-w-lg">
                These are not marketing claims — they are the structural advantages of buying direct from a focused manufacturer.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.055}>
                  <div className="flex flex-col gap-4 p-8 rounded-2xl border border-border/60 hover:border-primary/30 hover:bg-secondary/30 hover:shadow-md transition-all duration-200 h-full">
                    <span className="text-3xl leading-none">{item.icon}</span>
                    <div>
                      <p className="text-lg font-bold text-foreground">{item.title}</p>
                      <p className="text-base font-normal text-muted-foreground mt-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PRODUCTS
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Our Products" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Eight window and door systems — all made in Mumbai</h2>
              <p className="text-sm font-400 text-muted-foreground mt-2 max-w-lg">
                Every type is available in custom sizes, 40+ RAL colours, double or triple glazing, and a range of hardware finishes.
                Prices shown are indicative starting figures including installation.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRODUCTS.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.04}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex flex-col gap-2 p-5 rounded-2xl border border-border/60 bg-background hover:border-primary/40 hover:shadow-soft transition-all duration-200 h-full"
                  >
                    <p className="text-sm font-700 text-foreground group-hover:text-primary transition-colors duration-200">
                      {p.label}
                    </p>
                    <p className="text-xs font-400 text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/40">
                      <span className="text-xs font-600 text-primary">{p.spec}</span>
                      <span className="text-xs font-500 text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors duration-200">
                        View
                        <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M2 6h8M7 3l3 3-3 3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.25} className="mt-8 flex flex-wrap gap-4 items-center justify-between p-5 rounded-2xl bg-primary/5 border border-primary/15">
              <div>
                <p className="text-sm font-700 text-foreground">Not sure which system is right for your project?</p>
                <p className="text-xs font-400 text-muted-foreground mt-0.5">Our survey team will assess your openings and recommend the optimal product for each location.</p>
              </div>
              <Link href="/book-survey" className="btn-primary text-sm shrink-0 whitespace-nowrap">
                Book Free Survey <ArrowRight />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════
            HOW WE WORK
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-12">
              <SectionLabel text="How It Works" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">From first call to final handover — five steps</h2>
              <p className="text-sm font-400 text-muted-foreground mt-2 max-w-lg">
                A transparent, predictable process. You know exactly what happens next at every stage.
              </p>
            </FadeUp>

            <div className="flex flex-col gap-0">
              {STEPS.map((step, i, arr) => (
                <FadeUp key={step.n} delay={i * 0.07}>
                  <div className="flex gap-6 pb-10 last:pb-0">
                    {/* Step indicator + connector */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary/8 flex items-center justify-center z-10 shrink-0">
                        <span className="text-[11px] font-800 text-primary">{step.n}</span>
                      </div>
                      {i < arr.length - 1 && <div className="flex-1 w-px bg-border/50 mt-2" />}
                    </div>

                    {/* Content */}
                    <div className="pt-1.5 pb-2 flex-1">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <p className="text-sm font-700 text-foreground">{step.title}</p>
                        <span className="text-[11px] font-600 text-primary bg-primary/8 border border-primary/15 px-2.5 py-1 rounded-full shrink-0">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-400 text-muted-foreground mt-2 leading-relaxed max-w-xl">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CERTIFICATIONS
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Standards & Certifications" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Tested, certified, and documented</h2>
              <p className="text-sm font-400 text-muted-foreground mt-2 max-w-lg">
                Our products meet Indian and international standards. We provide full technical documentation for
                building permit submissions, LEED credits, and GRIHA certification at no extra charge.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {CERTIFICATIONS.map((c, i) => (
                <FadeUp key={c.label} delay={i * 0.05}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-border/60 h-full">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-primary">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-700 text-foreground">{c.label}</p>
                      <p className="text-xs font-400 text-muted-foreground mt-0.5 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2}>
              <div className="p-5 rounded-2xl bg-card border border-border/60 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-700 text-foreground">Need technical documentation for a building permit or green rating?</p>
                  <p className="text-xs font-400 text-muted-foreground mt-1">We provide structural calculations (IS 875 Part 3), test certificates, and U-Value data sheets with every order — at no extra cost.</p>
                </div>
                <Link href="/homepage#contact" className="btn-primary text-sm shrink-0 whitespace-nowrap">
                  Request Documents <ArrowRight />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════
            OUR PROMISE
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Our Promise" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Three things we guarantee on every order</h2>
              <p className="text-sm font-400 text-muted-foreground mt-2 max-w-lg">
                Not aspirations. Commitments — in writing, in your order confirmation.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-3 gap-4">
              {PROMISES.map((item, i) => (
                <FadeUp key={item.n} delay={i * 0.08}>
                  <div className="p-7 rounded-2xl border border-border/60 bg-card h-full flex flex-col gap-4 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <span className="text-5xl font-800 text-primary/10 leading-none tracking-tight">{item.n}</span>
                    <div>
                      <p className="text-sm font-700 text-foreground">{item.title}</p>
                      <p className="text-xs font-400 text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CONTACT STRIP
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  emoji: '📍',
                  title: 'Factory & Showroom',
                  lines: ['Mumbai, Maharashtra', 'Serving Pan-India projects'],
                },
                {
                  emoji: '🕘',
                  title: 'Working Hours',
                  lines: ['Monday – Saturday', '9:00 AM to 6:00 PM IST'],
                },
                {
                  emoji: '📞',
                  title: 'Call or WhatsApp',
                  lines: ['+91 99999 99999', 'Quotes, surveys, support'],
                },
              ].map((c, i) => (
                <FadeUp key={c.title} delay={i * 0.07}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-border/60 h-full">
                    <span className="text-2xl leading-none mt-0.5">{c.emoji}</span>
                    <div>
                      <p className="text-sm font-700 text-foreground">{c.title}</p>
                      {c.lines.map((l) => (
                        <p key={l} className="text-xs font-400 text-muted-foreground mt-0.5">{l}</p>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA
        ══════════════════════════════════ */}
        <section className="relative overflow-hidden bg-primary">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-[60px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <FadeUp>
              <h2 className="text-xl sm:text-2xl font-800 text-white max-w-sm leading-snug">
                Start with a free home survey — we visit, measure, and advise at no charge.
              </h2>
              <p className="text-sm font-400 text-white/70 mt-2">
                No commitment. No pressure. Just expert advice and an honest quote.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/book-survey" className="inline-flex items-center gap-2 bg-white text-primary font-700 px-6 py-3 rounded-xl hover:bg-white/90 transition-colors duration-200 text-sm whitespace-nowrap">
                Book a Survey <ArrowRight />
              </Link>
              <a href="tel:+919999999999" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/30 text-sm font-500 text-white hover:bg-white/10 transition-colors duration-200 whitespace-nowrap">
                Call Us
              </a>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}