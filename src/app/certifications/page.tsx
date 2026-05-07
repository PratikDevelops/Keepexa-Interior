'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  BeakerIcon,
  CheckBadgeIcon,
  ArrowDownTrayIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  SunIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/outline';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const MAIN_CERTS = [
  {
    id: 'iso',
    code: 'ISO 9001:2015',
    label: 'Quality Management System',
    body: 'Bureau Veritas',
    regNo: 'BV-QMS-2010-7234',
    scope: 'Design, manufacture, and installation of UPVC windows and door systems',
    desc: 'Certifies our end-to-end quality management system across all manufacturing processes, supplier qualification, product inspection, and installation operations. Audited annually by Bureau Veritas with zero major non-conformities since certification.',
    icon: <ClipboardDocumentCheckIcon className="size-6" />,
    color: 'primary',
    docs: ['Certificate PDF', 'Audit Summary'],
  },
  {
    id: 'ce',
    code: 'CE Marked',
    label: 'European Conformity',
    body: 'Construction Products Regulation',
    regNo: 'EN 14351-1:2006+A2:2016',
    scope: 'Windows and external pedestrian doorsets for residential and commercial',
    desc: 'All profile systems are CE marked under the Construction Products Regulation. Performance declarations cover wind resistance, water tightness, air permeability, thermal transmittance, acoustic performance, and mechanical endurance.',
    icon: <CheckBadgeIcon className="size-6" />,
    color: 'secondary',
    docs: ['Declaration of Performance', 'CE Certificate'],
  },
  {
    id: 'bis',
    code: 'BIS IS 14856',
    label: 'Bureau of Indian Standards',
    body: 'Bureau of Indian Standards',
    regNo: 'IS 14856:2000',
    scope: 'UPVC doors and windows — specification and performance requirements',
    desc: 'Full compliance with the Indian national standard for UPVC window and door systems. Covers material specification, dimensional tolerances, mechanical strength, weather resistance, and hardware performance requirements specific to the Indian market.',
    icon: <BuildingLibraryIcon className="size-6" />,
    color: 'primary',
    docs: ['BIS Compliance Report', 'Test Results'],
  },
  {
    id: 'griha',
    code: 'GRIHA Compatible',
    label: 'Green Rating for Integrated Habitat Assessment',
    body: 'TERI — The Energy and Resources Institute',
    regNo: 'GRIHA Criterion 10 & 12',
    scope: 'Energy performance, thermal comfort, and day-lighting credits',
    desc: "Our system U-Values, Solar Heat Gain Coefficients, and airtightness test data are formatted for direct use in GRIHA credit submissions. We provide pre-formatted technical packs for Criterion 10 (energy performance) and Criterion 12 (thermal comfort) with every order.",
    icon: <SunIcon className="size-6" />,
    color: 'secondary',
    docs: ['GRIHA Technical Pack', 'U-Value Data Sheet'],
  },
  {
    id: 'is875',
    code: 'IS 875 Part 3',
    label: 'Wind Load Structural Rating',
    body: 'Indian Standards Institution',
    regNo: 'IS 875 (Part 3):2015',
    scope: 'Wind load calculations for all Indian wind zones (Zones I–VI)',
    desc: 'Every project receives a site-specific structural calculation report prepared to IS 875 Part 3:2015. Reports cover design wind pressure, fixing specification, anchor load distribution, and frame deflection limits — formatted for submission to local authorities.',
    icon: <CubeTransparentIcon className="size-6" />,
    color: 'primary',
    docs: ['Sample Structural Calc', 'Wind Zone Map'],
  },
  {
    id: 'leed',
    code: 'LEED Eligible',
    label: 'Leadership in Energy & Environmental Design',
    body: 'US Green Building Council',
    regNo: 'LEED v4 EAc2 · IEQc6',
    scope: 'Envelope thermal performance and indoor environmental quality credits',
    desc: 'U-Value performance data, SHGC values, air infiltration test results (n50 < 1.0 h⁻¹), and embodied carbon declarations are provided in LEED v4 submission format. Supports credits under Energy & Atmosphere (EAc2) and Indoor Environmental Quality (IEQc6).',
    icon: <GlobeAltIcon className="size-6" />,
    color: 'secondary',
    docs: ['LEED Technical Pack', 'SHGC Data Sheet'],
  },
];

const PERFORMANCE_TESTS = [
  {
    standard: 'EN 12208',
    title: 'Water Tightness',
    result: 'Class E1200',
    note: 'Tested at 1200 Pa simulated driving rain — significantly exceeds Indian monsoon conditions',
    icon: <BeakerIcon className="size-5" />,
  },
  {
    standard: 'EN 12210',
    title: 'Wind Resistance',
    result: 'Class C5 (800 Pa)',
    note: 'Structural deflection and residual function tested across all systems',
    icon: <BoltIcon className="size-5" />,
  },
  {
    standard: 'EN 12207',
    title: 'Air Permeability',
    result: 'Class 4',
    note: 'Highest classification — airtightness supports LEED and GRIHA energy credits',
    icon: <MagnifyingGlassIcon className="size-5" />,
  },
  {
    standard: 'EN ISO 10077',
    title: 'Thermal Transmittance',
    result: 'U = 0.8 W/m²K',
    note: 'Best-in-class result on fixed-picture system with triple glazing',
    icon: <SunIcon className="size-5" />,
  },
  {
    standard: 'EN ISO 717-1',
    title: 'Acoustic Performance',
    result: 'Rw 54 dB',
    note: 'With 12/20/12.4 laminated IGU — cinema-grade acoustic isolation',
    icon: <BeakerIcon className="size-5" />,
  },
  {
    standard: 'EN 1627',
    title: 'Burglar Resistance',
    result: 'RC 2',
    note: 'Tilt & Turn with 7-point lock — tested against manual attack tools',
    icon: <ShieldCheckIcon className="size-5" />,
  },
];

const DOCS_AVAILABLE = [
  { title: 'ISO 9001:2015 Certificate', format: 'PDF', size: '280 KB' },
  { title: 'CE Declaration of Performance', format: 'PDF', size: '340 KB' },
  { title: 'BIS IS 14856 Compliance Report', format: 'PDF', size: '190 KB' },
  { title: 'U-Value & SHGC Data Sheet', format: 'PDF', size: '420 KB' },
  { title: 'GRIHA Technical Pack', format: 'PDF', size: '560 KB' },
  { title: 'LEED v4 Submission Pack', format: 'PDF', size: '610 KB' },
  { title: 'IS 875 Sample Structural Calculation', format: 'PDF', size: '380 KB' },
  { title: 'Acoustic Test Report (Rw 54 dB)', format: 'PDF', size: '220 KB' },
  { title: 'Water Tightness Test Report (E1200)', format: 'PDF', size: '195 KB' },
  { title: 'Air Permeability Report (Class 4)', format: 'PDF', size: '175 KB' },
  { title: 'Burglar Resistance Certificate (RC 2)', format: 'PDF', size: '240 KB' },
  { title: 'Wind Resistance Report (Class C5)', format: 'PDF', size: '210 KB' },
];

const QUALITY_STEPS = [
  { n: '01', title: 'Incoming material inspection', desc: 'Every profile extrusion batch is tested for dimensional tolerance, compound specification, UV-stabiliser content, and impact resistance on arrival at our factory.' },
  { n: '02', title: 'In-process weld checks', desc: 'Corner welds are tested on a per-batch basis for tensile strength. Angular tolerance is measured after every weld cycle. No batch proceeds without sign-off.' },
  { n: '03', title: 'Glazing bead pull-out test', desc: 'Random units from every production run are subjected to glazing bead pull-out tests per EN 12150 to verify the glass retention system meets specification.' },
  { n: '04', title: 'Hardware cycle testing', desc: 'Lock mechanisms, hinges, and roller systems are tested to 10,000 open-close cycles in our on-site test rig before any hardware batch is approved for use.' },
  { n: '05', title: 'Pre-dispatch quality report', desc: 'Every order receives a written quality inspection report covering dimensions, colour, glazing specification, hardware function, and labelling — dispatched to you before the truck leaves.' },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-primary" />
      <span className="section-label">{text}</span>
    </div>
  );
}


function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" width={13} height={13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function CertificationsPage() {
  return (
    <>
      <Header />
      <main className="bg-background min-h-screen pt-[72px]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border/50">
          <span className="absolute -top-4 right-0 text-[clamp(12rem,28vw,22rem)] font-800 leading-none select-none pointer-events-none"
            style={{ color: 'var(--foreground)', opacity: 0.04 }} aria-hidden>
            ✓
          </span>

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Tag text="Standards & Certifications" />
              <h1 className="text-[clamp(2rem,5vw,3.6rem)] font-800 text-foreground leading-[1.08] tracking-tight max-w-3xl">
                Every claim we make is{' '}
                <span style={{ color: 'var(--primary)' }}>tested, certified,</span>{' '}
                and documented.
              </h1>
              <p className="mt-5 text-base sm:text-lg font-500 text-muted-foreground max-w-2xl leading-relaxed">
                Our products meet Indian and international standards across thermal performance, structural integrity,
                acoustic isolation, water tightness, and security resistance. Every certificate and test report
                is available to you, automatically, with every order — no request needed.
              </p>

              {/* Quick cert pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['ISO 9001:2015', 'CE Marked', 'BIS IS 14856', 'GRIHA Compatible', 'IS 875 Rated', 'LEED Eligible'].map((c) => (
                  <span key={c}
                    className="text-xs font-700 px-3.5 py-2 rounded-full border"
                    style={{ color: 'var(--foreground)', borderColor: 'var(--border)', background: 'var(--card)' }}>
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Highlight strip */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: '6', label: 'Active certifications' },
                { value: '12+', label: 'Test reports available' },
                { value: '0', label: 'Major non-conformities (ISO audit)' },
                { value: '24 hr', label: 'Doc delivery with every order' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1 p-5 rounded-2xl bg-card border border-border/60">
                  <span className="text-2xl sm:text-3xl font-800 leading-none" style={{ color: 'var(--primary)' }}>{s.value}</span>
                  <span className="text-xs font-500 text-muted-foreground mt-1 leading-snug">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── MAIN CERTIFICATIONS ───────────────────────────────────────── */}
        <section className=" bg-background">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="mb-12">
              <Tag text="Certifications" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Six active certifications</h2>
              <p className="text-base font-500 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                Each certification covers a different dimension of product quality, safety, and environmental performance.
                Documentation is supplied at no charge with every order.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MAIN_CERTS.map((cert, i) => (
                <FadeUp key={cert.id} delay={i * 0.06}>
                  <div className="group flex flex-col h-full rounded-2xl border border-border/60 bg-card hover:border-primary/25 hover:shadow-md transition-all duration-200 overflow-hidden">

                    {/* Card header */}
                    <div className="flex items-start justify-between gap-3 p-6 pb-4 border-b border-border/40">
                      <div>
                        <span className="text-[10px] font-700 uppercase tracking-widest"
                          style={{ color: cert.color === 'primary' ? 'var(--primary)' : 'var(--secondary)' }}>
                          {cert.code}
                        </span>
                        <h3 className="text-base font-700 text-foreground mt-1 leading-tight">{cert.label}</h3>
                      </div>
                      <span className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: cert.color === 'primary' ? 'rgba(179,32,37,0.08)' : 'rgba(204,130,41,0.08)',
                          color: cert.color === 'primary' ? 'var(--primary)' : 'var(--secondary)',
                        }}>
                        {cert.icon}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col gap-3 p-6 flex-1">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-700 uppercase tracking-wider text-muted-foreground/60">Issuing body</span>
                        <span className="text-xs font-600 text-foreground/80">{cert.body}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-700 uppercase tracking-wider text-muted-foreground/60">Reference</span>
                        <span className="text-xs font-600 text-foreground/80">{cert.regNo}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-700 uppercase tracking-wider text-muted-foreground/60">Scope</span>
                        <span className="text-xs font-500 text-muted-foreground leading-snug">{cert.scope}</span>
                      </div>
                      <p className="text-xs font-500 text-muted-foreground leading-relaxed pt-1 border-t border-border/40 mt-1 flex-1">
                        {cert.desc}
                      </p>
                    </div>

                    {/* Doc links */}
                    <div className="px-6 pb-5 flex flex-wrap gap-2">
                      {cert.docs.map((doc) => (
                        <button key={doc}
                          className="inline-flex items-center gap-1.5 text-[10px] font-700 px-2.5 py-1.5 rounded-lg border transition-colors"
                          style={{ color: 'var(--foreground)', borderColor: 'var(--border)', background: 'var(--background)' }}
                          onClick={() => alert('Document download — connect your file storage')}>
                          <ArrowDownTrayIcon className="size-3" />
                          {doc}
                        </button>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERFORMANCE TESTS ─────────────────────────────────────────── */}
        <section className="">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <Tag text="Performance Tests" />
                <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Independent laboratory test results</h2>
              </div>
              <p className="text-base font-500 text-muted-foreground max-w-xs leading-relaxed">
                All tests conducted by accredited third-party laboratories. Reports available on request.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
              {PERFORMANCE_TESTS.map((test, i) => (
                <FadeUp key={test.standard} delay={i * 0.05}>
                  <div className="flex flex-col gap-3 p-6 sm:p-7 bg-card hover:bg-card transition-colors h-full">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(179,32,37,0.07)', color: 'var(--primary)' }}>
                        {test.icon}
                      </span>
                      <span className="text-[10px] font-700 uppercase tracking-widest text-muted-foreground/50">{test.standard}</span>
                    </div>
                    <div>
                      <p className="text-base font-700 text-foreground">{test.title}</p>
                      <p className="text-xl font-800 mt-1" style={{ color: 'var(--primary)' }}>{test.result}</p>
                      <p className="text-xs font-500 text-muted-foreground mt-2 leading-relaxed">{test.note}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUALITY PROCESS ───────────────────────────────────────────── */}
        <section className=" border-border/50 bg-background">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="mb-14">
              <Tag text="Quality Process" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Five checkpoints before anything leaves our factory</h2>
              <p className="text-base font-500 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                Our ISO 9001:2015 system mandates written sign-off at five stages of production. No unit is dispatched without a completed quality report.
              </p>
            </FadeUp>

            <div className="flex flex-col divide-y divide-border/40 border border-border/40 rounded-2xl overflow-hidden">
              {QUALITY_STEPS.map((step, i) => (
                <FadeUp key={step.n} delay={i * 0.06}>
                  <div className="grid sm:grid-cols-[72px_1fr] gap-4 sm:gap-8 p-6 sm:p-7 bg-card hover:bg-background transition-colors items-start">
                    <span className="text-4xl sm:text-5xl font-800 leading-none tabular-nums"
                      style={{ color: 'var(--foreground)', opacity: 0.09 }}>
                      {step.n}
                    </span>
                    <div>
                      <p className="text-base font-700 text-foreground mb-1.5">{step.title}</p>
                      <p className="text-base font-500 text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCUMENT LIBRARY ──────────────────────────────────────────── */}
        <section className=" border-border/50">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <Tag text="Document Library" />
                <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Every document, ready to download</h2>
                <p className="text-base font-500 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                  All certificates and test reports are sent automatically with your order confirmation. You can also download any document here without an order.
                </p>
              </div>
              <button
                className="btn-primary text-base shrink-0 self-start sm:self-auto"
                onClick={() => alert('Request full document pack')}>
                Request Full Pack <ArrowDownTrayIcon className="size-4" />
              </button>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {DOCS_AVAILABLE.map((doc, i) => (
                <FadeUp key={doc.title} delay={i * 0.03}>
                  <button
                    className="group w-full flex items-center justify-between gap-3 p-4 rounded-xl border border-border/60 bg-card hover:border-primary/25 hover:bg-background transition-all text-left"
                    onClick={() => alert('Download: ' + doc.title)}>
                    <div className="flex items-center gap-3 min-w-0">
                      <DocumentTextIcon className="size-4 shrink-0" style={{ color: 'var(--primary)' }} />
                      <div className="min-w-0">
                        <p className="text-base font-600 text-foreground truncate">{doc.title}</p>
                        <p className="text-[10px] font-500 text-muted-foreground mt-0.5">{doc.format} · {doc.size}</p>
                      </div>
                    </div>
                    <ArrowDownTrayIcon className="size-4 shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  </button>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.25} className="mt-6 p-6 rounded-2xl border border-border/60 bg-card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-base font-700 text-foreground">Need a project-specific structural calculation?</p>
                <p className="text-base font-500 text-muted-foreground mt-1 leading-relaxed">
                  Site-specific IS 875 Part 3 structural calculations are prepared for every order at no charge. For early-stage design queries, our technical team can run preliminary calculations before you confirm.
                </p>
              </div>
              <Link href="/#contact" className="btn-primary text-base shrink-0">Contact Technical Team <ArrowRight /></Link>
            </FadeUp>
          </div>
        </section>

        {/* ── FOR ARCHITECTS & DEVELOPERS ───────────────────────────────── */}
        <section className=" border-border/50 bg-background">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="mb-10">
              <Tag text="For Professionals" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Designed for architects, developers, and consultants</h2>
            </FadeUp>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'BIM & CAD library',
                  desc: 'Revit families, AutoCAD blocks, and DXF profiles for all eight window and door systems. Downloadable with NBS clause specifications.',
                  action: 'Download BIM Library',
                },
                {
                  title: 'Specification writing support',
                  desc: 'We write NBS-format product specifications, technical performance schedules, and tender clauses for your project at no charge.',
                  action: 'Request Spec Support',
                },
                {
                  title: 'LEED & GRIHA credit packs',
                  desc: 'Pre-formatted technical submissions for all energy and envelope credits across LEED v4, GRIHA, and IGBC rating systems.',
                  action: 'Download Credit Pack',
                },
              ].map((card, i) => (
                <FadeUp key={card.title} delay={i * 0.07}>
                  <div className="relative flex flex-col gap-5 p-7 rounded-2xl border border-border/60 bg-card h-full overflow-hidden group hover:border-primary/25 hover:shadow-sm transition-all duration-200">
                    <span className="absolute top-4 right-5 text-6xl font-800 leading-none select-none"
                      style={{ color: 'var(--foreground)', opacity: 0.05 }} aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex w-8 h-8 rounded-full items-center justify-center text-xs font-800"
                      style={{ background: 'var(--primary)', color: '#fff' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <p className="text-base font-700 text-foreground">{card.title}</p>
                      <p className="text-base font-500 text-muted-foreground mt-2 leading-relaxed">{card.desc}</p>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 text-base font-700 transition-colors"
                      style={{ color: 'var(--primary)' }}
                      onClick={() => alert(card.action)}>
                      {card.action} <ArrowRight />
                    </button>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: 'var(--foreground)' }}>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none"
            style={{ background: 'rgba(204,130,41,0.12)' }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'rgba(179,32,37,0.10)' }} />

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <FadeUp>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-8 h-px" style={{ background: 'var(--secondary)' }} />
                  <span className="text-[10px] font-700 uppercase tracking-[0.22em]" style={{ color: 'var(--secondary)' }}>Get Started</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 text-white leading-[1.1] max-w-lg">
                  All documents included. No request needed. Every order, automatically.
                </h2>
                <p className="text-base font-500 mt-4 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  Certificates, test reports, structural calculations, U-Value data sheets, LEED and GRIHA packs — delivered with your order confirmation within 24 hours of placing your order.
                </p>
              </FadeUp>

              <FadeUp delay={0.12} className="flex flex-col gap-3 shrink-0">
                <Link href="/product-configurator"
                  className="inline-flex items-center gap-2 bg-white font-700 px-7 py-3.5 rounded-xl text-base hover:bg-white/90 transition-colors"
                  style={{ color: 'var(--primary)' }}>
                  Configure & Get Quote <ArrowRight />
                </Link>
                <Link href="/book-survey"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-600 text-white border transition-colors hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                  Book Free Survey
                </Link>
                <p className="text-[11px] font-500 text-center" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  All docs included · No extra charge · 24-hr delivery
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}