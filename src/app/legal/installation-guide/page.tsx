'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const PHASE_COLORS: Record<string, string> = {
  'Pre-Installation': 'bg-blue-50 text-blue-700 border-blue-200',
  'Installation':     'bg-amber-50 text-amber-700 border-amber-200',
  'Post-Installation':'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STEPS = [
  /* ── Pre-Installation ── */
  {
    phase: 'Pre-Installation',
    number: '01',
    title: 'Site Survey & Measurement',
    duration: '1–2 hours',
    who: 'Our team',
    desc: 'Our surveyor visits your site to take precise opening measurements, assess wall thickness, check for plumb and square, and note any site-specific conditions.',
    checklist: [
      'Opening width & height measured at 3 points each',
      'Wall thickness and reveal depth recorded',
      'Existing frame / chajja condition inspected',
      'Electrical points and plumbing near opening mapped',
      'Floor-level drop checked for door sills',
    ],
    warning: null,
    tip: 'Ensure the room is accessible and old curtains/blinds are removed before our surveyor arrives.',
  },
  {
    phase: 'Pre-Installation',
    number: '02',
    title: 'Order Confirmation & Lead Time',
    duration: '24 hours',
    who: 'You + Our team',
    desc: 'After receiving your itemised quote, confirm the order. Every unit is custom-manufactured, so lead time begins only after confirmation and advance payment.',
    checklist: [
      'Review the itemised quote carefully',
      'Confirm glass type, colour, and hardware finish',
      'Sign the order acknowledgement form',
      'Pay the advance amount to begin production',
      'Receive production timeline and installation date',
    ],
    warning: 'Lead times vary by product — Tilt & Turn and Lift & Slide may take 10–14 working days. Plan demolition accordingly.',
    tip: null,
  },
  {
    phase: 'Pre-Installation',
    number: '03',
    title: 'Site Preparation by Customer',
    duration: '1–3 days',
    who: 'Your civil contractor',
    desc: 'Before our installation team arrives, the opening must be prepared by your civil team. uPVC frames require a clean, dust-free, structurally sound opening.',
    checklist: [
      'Remove existing wooden / aluminium frames completely',
      'Chip away any loose plaster or mortar around the opening',
      'Ensure opening dimensions match the surveyed measurements (±5 mm tolerance)',
      'Level and plumb the sill surface',
      'Keep the work area clear of debris and other trades',
    ],
    warning: 'Do NOT modify opening dimensions without informing us first — frames are fabricated to surveyed sizes.',
    tip: null,
  },

  /* ── Installation ── */
  {
    phase: 'Installation',
    number: '04',
    title: 'Frame Positioning & Levelling',
    duration: '30–60 min per unit',
    who: 'Our installation team',
    desc: 'The uPVC frame is placed into the prepared opening, shimmed to exact level and plumb using wedge packers, and temporarily held before fixing.',
    checklist: [
      'Frame placed centrally within the opening',
      'Spirit level checked on all 4 sides',
      'Wedge packers placed at load-bearing points',
      'Diagonal measurements checked for square',
      'Frame gap around perimeter confirmed (8–12 mm for sealant)',
    ],
    warning: null,
    tip: 'A frame that is even 2 mm out of square will cause sashes to bind later. Levelling is the most critical step.',
  },
  {
    phase: 'Installation',
    number: '05',
    title: 'Mechanical Fixing to Wall',
    duration: '30–45 min per unit',
    who: 'Our installation team',
    desc: 'The frame is fixed to the masonry using frame anchors or expansion bolts at specified intervals. Fixing method depends on wall type (RCC, brick, or block).',
    checklist: [
      'Frame anchor / screw type selected for wall material',
      'Fixing at every 600 mm along frame perimeter',
      'Minimum 2 fixings per side (never fewer)',
      'No fixings within 150 mm of frame corners',
      'All fixings torqued and countersunk flush',
    ],
    warning: 'Never use nails or wooden plugs as primary fixings — they loosen over time and void the warranty.',
    tip: null,
  },
  {
    phase: 'Installation',
    number: '06',
    title: 'Glazing the Sash / Panel',
    duration: '20–40 min per sash',
    who: 'Our installation team',
    desc: 'Glass units (IGU or single) are set into the sash using glazing blocks at the correct positions, ensuring no glass-to-frame contact and proper load transfer.',
    checklist: [
      'Setting blocks placed at 1/4 points from corners',
      'Glass does not touch frame anywhere (minimum 5 mm clearance)',
      'Glazing beads clipped in correct sequence',
      'Outer glazing tape compressed uniformly',
      'Glass unit size verified against opening size',
    ],
    warning: 'Improper glazing block placement is the leading cause of glass cracking under thermal stress.',
    tip: null,
  },
  {
    phase: 'Installation',
    number: '07',
    title: 'Sash Hanging & Hardware Fitting',
    duration: '30–60 min per unit',
    who: 'Our installation team',
    desc: 'Sashes are hung on hinges or slides, hardware is fitted and adjusted, and the unit is operated multiple times to check smooth movement and locking.',
    checklist: [
      'Hinges / slides aligned and all screws fully tightened',
      'Sash opens and closes without binding or dragging',
      'Multi-point lock engages all keeps smoothly',
      'Handle operation feels firm and positive',
      'Tilt function (if applicable) operates correctly',
    ],
    warning: null,
    tip: 'Hardware is designed to be adjusted — if anything feels stiff, ask our installer to adjust rather than forcing it.',
  },
  {
    phase: 'Installation',
    number: '08',
    title: 'Sealing & Weatherproofing',
    duration: '20–30 min per unit',
    who: 'Our installation team',
    desc: 'All gaps between frame and wall are filled with low-expansion PU foam, then sealed inside and outside with premium neutral-cure silicone sealant.',
    checklist: [
      'PU foam applied fully around frame perimeter (not just corners)',
      'Foam allowed to cure before silicone is applied',
      'Silicone applied in a single continuous bead — no gaps',
      'Silicone tooled smooth with a wet finger / tool',
      'No silicone on the operable sash — only on the fixed frame-to-wall joint',
    ],
    warning: 'Never use acid-cure silicone on uPVC — it corrodes hardware and stains profiles. Always use neutral-cure.',
    tip: 'Apply masking tape before silicone for clean lines, especially on painted or plastered walls.',
  },

  /* ── Post-Installation ── */
  {
    phase: 'Post-Installation',
    number: '09',
    title: 'Cleaning & Inspection',
    duration: '15–30 min',
    who: 'Our installation team',
    desc: 'All protective films are removed, glass is cleaned, the unit is inspected for defects, and the area is left clean. A final operation check is performed.',
    checklist: [
      'All protective films peeled from profiles and glass',
      'Glass cleaned with a soft cloth — no abrasive cleaners',
      'Check for silicone smears on glass (clean immediately)',
      'All hardware operates correctly — final check',
      'Opening and closing tested 5+ times under load',
    ],
    warning: null,
    tip: 'Do not remove protective film until plastering and painting near the frame is complete.',
  },
  {
    phase: 'Post-Installation',
    number: '10',
    title: 'Handover & Warranty Documentation',
    duration: '15 min',
    who: 'Our team + You',
    desc: 'Our installer walks you through operation of the window/door, hardware adjustments, and maintenance. Warranty cards and care guide are handed over.',
    checklist: [
      'Customer shown how to operate every hardware function',
      'Cleaning and maintenance dos & don\'ts explained',
      'Warranty card filled and signed by both parties',
      'Installation completion report signed',
      'Our service contact details provided',
    ],
    warning: null,
    tip: 'Take photos of your installation on day 1 — useful for any future warranty claims.',
  },
];

const DOS_DONTS = {
  dos: [
    'Clean frames with mild soap and water using a soft cloth',
    'Lubricate hinges and handles with light machine oil once a year',
    'Check and clear drainage slots at the bottom of frames every 6 months',
    'Operate hardware gently — uPVC multipoint locks are not designed to be forced',
    'Re-apply silicone at frame-to-wall joint if cracking appears after 3–5 years',
    'Report any water ingress immediately — early action prevents structural damage',
  ],
  donts: [
    'Never use abrasive pads, steel wool, or harsh chemicals on profiles or glass',
    'Don\'t paint over the uPVC frame — it traps heat and causes warping',
    'Never use WD-40 on multi-point lock mechanisms — it attracts dirt',
    'Don\'t hang heavy objects on sash handles or hinges',
    'Avoid pressure washing directly at seals and gaskets',
    'Don\'t attempt to adjust hinges or hardware with incorrect tools',
  ],
};

const FAQS = [
  {
    q: 'How long does installation take?',
    a: 'A standard casement or sliding window takes 1.5–2 hours per unit. Larger systems like Lift & Slide or Bay Windows take 3–5 hours. We will give you an estimated duration based on your order before installation day.',
  },
  {
    q: 'Do I need to be home during installation?',
    a: 'Yes, someone responsible should be present throughout. You may be required to make decisions on site, and we need access to all openings. We also do a handover walk-through with you at the end.',
  },
  {
    q: 'Who handles plastering / finishing after installation?',
    a: 'uPVC installation does not include civil finishing like plaster, putty, or paint. Your civil contractor should handle the wall finishing around the frame after our team completes the installation and sealing.',
  },
  {
    q: 'What if the opening size is slightly different from the survey?',
    a: 'A difference of up to ±5 mm can typically be accommodated with shimming and sealant. Beyond that, the frame may need to be re-fabricated. This is why site preparation accuracy is critical — do not modify the opening without consulting us.',
  },
  {
    q: 'Is the installation area protected during the work?',
    a: 'Our team uses drop sheets to protect floors near the working area. However, we recommend removing fragile items, furniture, and carpets from the immediate vicinity before we arrive.',
  },
  {
    q: 'What warranty do I get on installation?',
    a: 'We provide a 1-year workmanship warranty on installation and the product warranty as specified on your warranty card (typically 5–10 years on the profile, 1 year on hardware, 2 years on glass units). Warranty is void if the product is tampered with or installed incorrectly by a third party.',
  },
];

const TOOLS_NEEDED = [
  { icon: '🔩', label: 'Frame anchors & expansion bolts' },
  { icon: '🪝', label: 'Wedge packers / shims' },
  { icon: '🧱', label: 'Low-expansion PU foam' },
  { icon: '🖊️', label: 'Neutral-cure silicone sealant' },
  { icon: '📐', label: 'Spirit level & square' },
  { icon: '🔧', label: 'Torque driver & Allen keys' },
  { icon: '🪟', label: 'Glazing blocks & setting blocks' },
  { icon: '✂️', label: 'Masking tape & silicone gun' },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function FadeUp({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
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
      <span className="text-[11px] font-700 uppercase tracking-[0.2em] text-primary">{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step Card
───────────────────────────────────────────── */
function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="border border-border/60 rounded-2xl overflow-hidden bg-background"
    >
      {/* Header row */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left hover:bg-secondary/30 transition-colors duration-200"
      >
        {/* Step number */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="text-xs font-800 text-primary">{step.number}</span>
        </div>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-700 uppercase tracking-wider px-2 py-0.5 rounded-full border ${PHASE_COLORS[step.phase]}`}>
              {step.phase}
            </span>
            <span className="text-[10px] text-muted-foreground font-500">⏱ {step.duration}</span>
            <span className="text-[10px] text-muted-foreground font-500">👤 {step.who}</span>
          </div>
          <p className="text-sm sm:text-base font-700 text-foreground truncate">{step.title}</p>
        </div>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 text-muted-foreground"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-border/40">
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-5">{step.desc}</p>

              {/* Checklist */}
              <div className="mb-4">
                <p className="text-xs font-700 text-foreground uppercase tracking-wider mb-3">Checklist</p>
                <ul className="flex flex-col gap-2">
                  {step.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warning */}
              {step.warning && (
                <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4">
                  <span className="text-lg leading-none shrink-0">⚠️</span>
                  <p className="text-xs text-amber-800 leading-relaxed font-500">{step.warning}</p>
                </div>
              )}

              {/* Tip */}
              {step.tip && (
                <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mt-4">
                  <span className="text-lg leading-none shrink-0">💡</span>
                  <p className="text-xs text-blue-800 leading-relaxed font-500">{step.tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FAQ Item
───────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeUp delay={index * 0.05}>
      <div className="border border-border/60 rounded-xl overflow-hidden bg-background">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/30 transition-colors duration-200"
        >
          <span className="text-sm font-600 text-foreground">{q}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-muted-foreground"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

/* ─────────────────────────────────────────────
   Phase filter tabs
───────────────────────────────────────────── */
const PHASES = ['All', 'Pre-Installation', 'Installation', 'Post-Installation'] as const;
type PhaseFilter = typeof PHASES[number];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function InstallationGuidePage() {
  const [activePhase, setActivePhase] = useState<PhaseFilter>('All');

  const filteredSteps = activePhase === 'All'
    ? STEPS
    : STEPS.filter((s) => s.phase === activePhase);

  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-[72px]">

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
              <Link href="/homepage" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-500">Installation Guide</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel text="Installation Guide" />
              <h1 className="text-4xl sm:text-5xl font-800 text-foreground leading-[1.12] tracking-tight max-w-2xl">
                How we install your windows &amp; doors — step by step.
              </h1>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                A complete guide to our installation process — from site preparation
                to final handover. Know exactly what happens, when, and who's responsible.
              </p>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                { icon: '📋', text: '10 detailed steps' },
                { icon: '🔵', text: '3 phases covered' },
                { icon: '⚠️', text: 'Warnings & tips included' },
                { icon: '✅', text: 'Checklists per step' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 bg-background border border-border/60 rounded-xl px-4 py-2.5 text-xs font-600 text-foreground">
                  <span>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════
            PHASE OVERVIEW CARDS
        ══════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  phase: 'Pre-Installation',
                  steps: '01 – 03',
                  color: 'border-blue-200 bg-blue-50',
                  textColor: 'text-blue-700',
                  icon: '📋',
                  desc: 'Site survey, order confirmation, and opening preparation — before our team arrives.',
                },
                {
                  phase: 'Installation',
                  steps: '04 – 08',
                  color: 'border-amber-200 bg-amber-50',
                  textColor: 'text-amber-700',
                  icon: '🔧',
                  desc: 'Frame fixing, glazing, hardware fitting, and weatherproof sealing — the core install.',
                },
                {
                  phase: 'Post-Installation',
                  steps: '09 – 10',
                  color: 'border-emerald-200 bg-emerald-50',
                  textColor: 'text-emerald-700',
                  icon: '✅',
                  desc: 'Cleaning, inspection, handover, and warranty documentation — completing the job.',
                },
              ].map((p, i) => (
                <FadeUp key={p.phase} delay={i * 0.07}>
                  <button
                    type="button"
                    onClick={() => setActivePhase(p.phase as PhaseFilter)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 hover:shadow-soft ${p.color}`}
                  >
                    <span className="text-2xl leading-none">{p.icon}</span>
                    <p className={`text-sm font-800 mt-3 ${p.textColor}`}>{p.phase}</p>
                    <p className="text-[11px] font-600 text-muted-foreground mb-2">Steps {p.steps}</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">{p.desc}</p>
                  </button>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            STEP-BY-STEP GUIDE
        ══════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
            <FadeUp className="mb-8">
              <SectionLabel text="Step-by-Step Process" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">
                The complete installation process
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Click on any step to expand its checklist, warnings, and tips.
              </p>
            </FadeUp>

            {/* Phase filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PHASES.map((phase) => (
                <button
                  key={phase}
                  type="button"
                  onClick={() => setActivePhase(phase)}
                  className={`px-4 py-2 rounded-xl text-xs font-600 border transition-all duration-200 ${
                    activePhase === phase
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {filteredSteps.map((step, i) => (
                  <StepCard key={step.number} step={step} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            TOOLS & MATERIALS
        ══════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
            <FadeUp className="mb-8">
              <SectionLabel text="Tools & Materials" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">
                What our team brings on installation day
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                All installation materials are supplied by us — you don't need to source anything.
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TOOLS_NEEDED.map((t, i) => (
                <FadeUp key={t.label} delay={i * 0.04}>
                  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-border/60 bg-background">
                    <span className="text-2xl leading-none">{t.icon}</span>
                    <p className="text-xs font-600 text-foreground leading-snug">{t.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            DOS & DON'TS
        ══════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
            <FadeUp className="mb-8">
              <SectionLabel text="Maintenance" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">
                Dos &amp; don'ts after installation
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Follow these to keep your windows and doors performing like new for years.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* DOs */}
              <FadeUp>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-emerald-200">
                    <span className="text-lg">✅</span>
                    <p className="text-sm font-800 text-emerald-800">Do</p>
                  </div>
                  <ul className="flex flex-col gap-3 px-5 py-4">
                    {DOS_DONTS.dos.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                        <span className="shrink-0 mt-0.5 text-emerald-600">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              {/* DON'Ts */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl border border-red-200 bg-red-50 overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-red-200">
                    <span className="text-lg">❌</span>
                    <p className="text-sm font-800 text-red-800">Don't</p>
                  </div>
                  <ul className="flex flex-col gap-3 px-5 py-4">
                    {DOS_DONTS.donts.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-900 leading-relaxed">
                        <span className="shrink-0 mt-0.5 text-red-500">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            FAQ
        ══════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
            <FadeUp className="mb-8">
              <SectionLabel text="FAQ" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">
                Installation questions answered
              </h2>
            </FadeUp>

            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CTA
        ══════════════════════════════ */}
        <section>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <FadeUp>
              <h2 className="text-xl sm:text-2xl font-800 text-foreground max-w-sm leading-snug">
                Ready to get started? Book a free home survey today.
              </h2>
              <p className="text-sm text-muted-foreground mt-1.5">
                We'll measure, advise, and quote — all free of charge.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/book-survey" className="btn-primary text-sm whitespace-nowrap">
                Book a Survey
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/homepage#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-500 text-foreground hover:bg-secondary/60 transition-colors duration-200 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}