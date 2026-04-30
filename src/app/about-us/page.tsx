'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  BuildingStorefrontIcon,
  Square3Stack3DIcon,
  GlobeAsiaAustraliaIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  PhoneIcon,
  BoltIcon,
  GlobeAltIcon,
  BeakerIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const WHY_US = [
  {
    num: '01',
    icon: <BuildingStorefrontIcon className="size-6 text-primary" />,
    title: 'Direct from our factory',
    desc: 'No distributors, no resellers, no margin stacking. You deal directly with the people who make your windows, which means better pricing, full traceability, and a single point of accountability from order to aftercare. When you call us, you speak to someone who knows your job by name.',
  },
  {
    num: '02',
    icon: <Square3Stack3DIcon className="size-6 text-primary" />,
    title: 'Made-to-measure, every time',
    desc: 'Every unit is fabricated to your exact site dimensions at our Mumbai facility. We do not stock off-the-shelf sizes. Your windows fit perfectly on day one with no shimming, no hacking, no gaps. We re-measure before cutting, and we check again before dispatch.',
  },
  {
    num: '03',
    icon: <GlobeAsiaAustraliaIcon className="size-6 text-primary" />,
    title: 'Built for Indian conditions',
    desc: 'Our profiles are UV-stabilised for Mumbai coastal UV levels, our sill channels are monsoon-rated, and our hardware is tested in our own climate chamber. Not adapted from European specs but engineered for India from the ground up, with real-world data from installations across all major cities.',
  },
  {
    num: '04',
    icon: <ShieldCheckIcon className="size-6 text-primary" />,
    title: 'Backed by a solid warranty',
    desc: '10-year warranty on all UPVC profiles, 5 years on hardware, and 3 years on roller systems. We put it in writing, not just in conversation. If something fails, we fix it with no questions, no charge. Our warranty team is reachable on the same number you used to place your order.',
  },
  {
    num: '05',
    icon: <ChatBubbleLeftRightIcon className="size-6 text-primary" />,
    title: 'Honest, pressure-free advice',
    desc: 'We will recommend the right product for your space, not the most expensive one. If a basic casement does the job, we will say so. Our reputation is built on referrals and we cannot afford to oversell you. Every recommendation comes with a written rationale you can verify independently.',
  },
  {
    num: '06',
    icon: <WrenchScrewdriverIcon className="size-6 text-primary" />,
    title: 'End-to-end ownership',
    desc: 'Survey, design, manufacture, installation, and post-install support handled by one team, one contract, one phone number. Nothing falls between departments because there are no departments to fall between. Your project manager stays on your file from day one to sign-off.',
  },
];

const PRODUCTS = [
  { slug: 'tilt-turn', label: 'Tilt and Turn', desc: 'Dual-mode inward opening, ventilate or fully open with one handle. Ideal for high-rise apartments and rooms needing controlled airflow.', spec: 'From Rs.750/sq ft' },
  { slug: 'casement', label: 'Classic Casement', desc: 'Side-hung outward opening, full-face ventilation, multi-point lock. The most versatile system for Indian homes and villas.', spec: 'From Rs.550/sq ft' },
  { slug: 'sliding-2track', label: 'Sliding 2-Track', desc: 'Horizontal slide on SS rollers with no swing space needed. Best for large balcony openings and living room facades.', spec: 'From Rs.400/sq ft' },
  { slug: 'french-casement', label: 'French Casement', desc: 'Double-leaf, no centre bar, unobstructed aperture up to 1.8 m. Brings a classic European aesthetic to Indian interiors.', spec: 'From Rs.650/sq ft' },
  { slug: 'lift-slide', label: 'Lift and Slide', desc: 'Compression-seal large panels up to 3 m with finger-tip operation. Perfect for luxury villas and open-plan indoor-outdoor living.', spec: 'From Rs.2500/sq ft' },
  { slug: 'fixed-picture', label: 'Fixed / Picture', desc: "Maximum glazing, zero infiltration in any shape, any size. Ideal for view windows and facade panels where ventilation isn't required.", spec: 'From Rs.500/sq ft' },
  { slug: 'bay-window', label: 'Bay Window', desc: '30 or 45 degree projection bay, factory assembled with structural posts. Adds depth, light, and character to any elevation.', spec: 'From Rs.600/set' },
  { slug: 'louvre', label: 'Louvre Vent', desc: 'Adjustable glass blades providing continuous ventilation even in light rain. Best suited for kitchens, bathrooms, and utility areas.', spec: 'From Rs.550/sq ft' },
];

const STEPS = [
  {
    n: '01',
    title: 'Book a free site survey',
    desc: 'Our technical team visits your property, takes precise measurements, assesses the existing openings, and discusses your performance requirements, aesthetic preferences, and budget. We also check the structural condition of your walls and recommend the most appropriate fixing method before a single product is specified.',
    time: '30 to 60 min visit',
  },
  {
    n: '02',
    title: 'Receive a detailed quote within 24 hours',
    desc: 'You get a fully itemised written quote per window, per door, with glass specification, hardware finish, colour, and installation cost separately listed. No bundled estimates, no surprises. You can compare line-by-line with any other quote you receive. We welcome scrutiny.',
    time: '24-hour turnaround',
  },
  {
    n: '03',
    title: 'We fabricate your order in Mumbai',
    desc: 'On confirmation, your order enters production at our Mumbai factory. Every unit is cut, welded, and glazed to your exact dimensions. We send you a production update at the midpoint and a quality inspection report before dispatch. You know exactly where your order is at all times.',
    time: '10 to 22 working days',
  },
  {
    n: '04',
    title: 'Professional installation on your schedule',
    desc: 'Our trained installation crew arrives on the agreed date. We remove existing frames where required, install your new windows and doors, seal all joints with weatherproof silicone, and clean the site before leaving. We do not subcontract. Every person on your site is a Keepexa-trained fitter.',
    time: '1 to 3 days on site',
  },
  {
    n: '05',
    title: 'Post-install check and ongoing support',
    desc: 'We contact you 2 weeks after installation to confirm everything is performing as expected. All hardware is adjustable post-installation and we re-adjust at no charge within the first year. Our warranty and support line remains open for the full warranty period and we answer it ourselves.',
    time: 'Lifetime support',
  },
];

const STATS = [
  { value: '8', label: 'Window and door types', sub: 'Tilt-turn to louvre, we make them all' },
  { value: '40+', label: 'RAL colour options', sub: 'Including woodgrain foils and dual-colour' },
  { value: '10yr', label: 'Profile warranty', sub: 'Written guarantee, not just a promise' },
  { value: '24hr', label: 'Quote turnaround', sub: 'Detailed, itemised, no hidden costs' },
];

const PROMISES = [
  {
    n: '01',
    title: 'Transparent, itemised pricing',
    desc: "You see the cost of every component including profile, glazing, hardware, and installation before you sign anything. We do not use vague lump-sum quotes to obscure margins. If our quote is higher than a competitor's, we will tell you exactly why and let you decide.",
  },
  {
    n: '02',
    title: 'On-time delivery and installation',
    desc: 'We commit to a production and installation timeline in writing. If we are going to be delayed for any reason, you hear from us first with a revised date and an explanation. We have never abandoned a project mid-installation, and we never will.',
  },
  {
    n: '03',
    title: 'Post-install accountability',
    desc: 'Our responsibility does not end when the crew leaves your site. Hardware adjustments, sealant touch-ups, and warranty claims are all handled by the same team who installed your windows. No call centres, no third parties, no runarounds.',
  },
];

const CERTIFICATIONS = [
  { label: 'ISO 9001:2015', desc: 'Quality management system certified across all manufacturing and installation operations' },
  { label: 'CE Marked', desc: 'European conformity covering construction products directive, structural performance and safety' },
  { label: 'BIS IS 14856', desc: 'Bureau of Indian Standards compliant for UPVC doors and windows' },
  { label: 'GRIHA Compatible', desc: 'Technical data supports GRIHA green building rating credits for energy performance' },
  { label: 'IS 875 Rated', desc: 'Wind load calculations to Indian standard, available for all major Indian wind zones' },
  { label: 'LEED Eligible', desc: 'U-Value and SHGC data supports LEED EAc2 and IEQc6 credit submissions' },
];

const CITIES = [
  { name: 'Mumbai', note: 'HQ & Factory' },
  { name: 'Delhi NCR', note: 'Installation team' },
  { name: 'Bengaluru', note: 'Installation team' },
  { name: 'Hyderabad', note: 'Installation team' },
  { name: 'Chennai', note: 'Installation team' },
  { name: 'Pune', note: 'Installation team' },
  { name: 'Ahmedabad', note: 'Installation team' },
  { name: 'Kolkata', note: 'Installation team' },
];

const STORY_POINTS = [
  { icon: <BuildingOffice2Icon className="size-5 text-primary" />, text: 'Factory in Mumbai, everything made in-house, nothing outsourced' },
  { icon: <ClipboardDocumentListIcon className="size-5 text-primary" />, text: 'Written warranty on every order, 10 years on profiles' },
  { icon: <PhoneIcon className="size-5 text-primary" />, text: 'One contact from survey to aftercare, no handoffs' },
  { icon: <BoltIcon className="size-5 text-primary" />, text: '24-hour itemised quote turnaround, no bundled estimates' },
  { icon: <GlobeAltIcon className="size-5 text-primary" />, text: 'Pan-India installation teams across 8 major cities' },
  { icon: <BeakerIcon className="size-5 text-primary" />, text: 'ISO 9001:2015 certified quality management system' },
];

const CONTACT_CARDS = [
  {
    icon: <MapPinIcon className="size-6 text-primary" />,
    title: 'Factory & Showroom',
    lines: ['Mumbai, Maharashtra', 'Serving Pan-India projects', 'Showroom visits by appointment'],
  },
  {
    icon: <ClockIcon className="size-6 text-primary" />,
    title: 'Working Hours',
    lines: ['Monday to Saturday', '9:00 AM to 6:00 PM IST', 'WhatsApp available 8 AM to 8 PM'],
  },
  {
    icon: <PhoneIcon className="size-6 text-primary" />,
    title: 'Call or WhatsApp',
    lines: ['+91 99999 99999', 'Quotes, surveys, support', 'We answer, not a call centre'],
  },
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

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border/50">
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
                Mumbai-based UPVC window manufacturer,{' '}
                <span className="text-primary">direct, honest, accountable.</span>
              </h1>
              <p className="mt-5 text-muted-foreground font-400 text-base sm:text-lg max-w-xl leading-relaxed">
                We design, manufacture, and install UPVC windows and doors from our own factory in Mumbai.
                No middlemen, no resellers. Every unit is custom-made for your site, backed by a 10-year
                profile warranty, and installed by the same team that built it. We serve homeowners,
                architects, and developers across all major Indian cities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-1 p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
                  <span className="text-2xl sm:text-3xl font-800 text-primary leading-none">{s.value}</span>
                  <span className="text-sm font-600 text-foreground mt-1">{s.label}</span>
                  <span className="text-xs font-400 text-muted-foreground leading-snug">{s.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <SectionLabel text="Our Story" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground leading-tight">
                We started because the window industry needed someone who actually stands behind their product.
              </h2>
              <div className="mt-6 flex flex-col gap-2">
                {STORY_POINTS.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3.5 rounded-xl bg-background border border-border/50">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-base font-500 text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col gap-5 text-base text-muted-foreground font-400 leading-relaxed">
              <p>
                The window and door industry in India has a trust problem. Customers are shown showroom samples,
                given vague quotes, and then handed off to subcontractors who have never seen their site.
                By the time something goes wrong, nobody answers the phone. Warranties exist on paper but not in practice.
              </p>
              <p>
                We built Keepexa Interiors to fix that. As a direct manufacturer in Mumbai, we control
                every step from the profiles we source to the crew that installs your windows and the
                engineer who calls you two weeks later to check everything is right. There is no chain to
                break because there is only one link.
              </p>
              <p>
                We operate across Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Ahmedabad, and Kolkata.
                In every city, our installation teams are employed and trained directly by us. Not agencies,
                not labour contractors. The same quality standard that leaves our Mumbai factory applies on
                every site across India.
              </p>
              <p>
                We are a young company, and that is actually our advantage. We have no bad habits,
                no inherited shortcuts, and no legacy processes that put margin ahead of quality.
                Every decision we make is being made for the first time, with full awareness that
                our reputation depends entirely on getting it right.
              </p>

              <div className="border-l-2 border-primary pl-5 py-1 mt-1">
                <p className="text-foreground font-600 text-base italic leading-relaxed">
                  "Being new is not a weakness. It means we have everything to prove
                  and nothing to cut corners on."
                </p>
                <p className="text-sm font-500 text-muted-foreground mt-2">Keepexa Interiors founding principle</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Why Choose Us" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Six reasons customers choose us over established names</h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                These are not marketing claims. They are the structural advantages of buying direct from a focused manufacturer
                who has nothing to hide and everything to prove.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.055}>
                  <div className="flex flex-col gap-4 p-8 rounded-2xl border border-border/60 hover:border-primary/30 hover:bg-secondary/30 hover:shadow-md transition-all duration-200 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-lg font-700 text-foreground">{item.title}</p>
                      <p className="text-base font-400 text-muted-foreground mt-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Our Products" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Eight window and door systems, all made in Mumbai</h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                Every type is available in custom sizes, 40+ RAL colours, double or triple glazing, and a range of hardware finishes.
                Prices shown are indicative starting figures including professional installation by our own crew.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRODUCTS.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.04}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex flex-col gap-2 p-5 rounded-2xl border border-border/60 bg-background hover:border-primary/40 hover:shadow-soft transition-all duration-200 h-full"
                  >
                    <p className="text-base font-700 text-foreground group-hover:text-primary transition-colors duration-200">
                      {p.label}
                    </p>
                    <p className="text-sm font-400 text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/40">
                      <span className="text-sm font-600 text-primary">{p.spec}</span>
                      <span className="text-sm font-500 text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors duration-200">
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

            <FadeUp delay={0.25} className="mt-8 flex flex-wrap gap-4 items-center justify-between p-6 rounded-2xl bg-primary/5 border border-primary/15">
              <div>
                <p className="text-base font-700 text-foreground">Not sure which system is right for your project?</p>
                <p className="text-sm font-400 text-muted-foreground mt-1 leading-relaxed">Our survey team will assess your openings, evaluate your wall construction, and recommend the optimal product for each location, free of charge.</p>
              </div>
              <Link href="/book-survey" className="btn-primary text-sm shrink-0 whitespace-nowrap">
                Book Free Survey <ArrowRight />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-12">
              <SectionLabel text="How It Works" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">From first call to final handover in five steps</h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                A transparent, predictable process with no surprises. You know exactly what happens next at every stage,
                who is responsible, and how long it will take.
              </p>
            </FadeUp>

            <div className="flex flex-col gap-0">
              {STEPS.map((step, i, arr) => (
                <FadeUp key={step.n} delay={i * 0.07}>
                  <div className="flex gap-6 pb-10 last:pb-0">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary/8 flex items-center justify-center z-10 shrink-0">
                        <span className="text-[11px] font-800 text-primary">{step.n}</span>
                      </div>
                      {i < arr.length - 1 && <div className="flex-1 w-px bg-border/50 mt-2" />}
                    </div>

                    <div className="pt-1.5 pb-2 flex-1">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <p className="text-base font-700 text-foreground">{step.title}</p>
                        <span className="text-xs font-600 text-primary bg-primary/8 border border-primary/15 px-2.5 py-1 rounded-full shrink-0">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-400 text-muted-foreground mt-2 leading-relaxed max-w-xl">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* WHERE WE OPERATE */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Where We Operate" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Pan-India coverage with direct installation teams</h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                We manufacture at our Mumbai facility and deliver and install across all major Indian cities. Every city is served
                by a Keepexa-employed installation crew with no franchisees, no subcontractors.
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {CITIES.map((city, i) => (
                <FadeUp key={city.name} delay={i * 0.05}>
                  <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-background border border-border/60 h-full">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                      <MapPinIcon className="size-4 text-primary" />
                    </div>
                    <p className="text-base font-700 text-foreground">{city.name}</p>
                    <p className="text-xs font-500 text-primary">{city.note}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2}>
              <div className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-base font-700 text-foreground">Not in the list? We still cover you.</p>
                  <p className="text-sm font-400 text-muted-foreground mt-1 leading-relaxed">We regularly install in tier-2 cities and smaller markets on project-minimum orders. Call us to discuss your location and if we can reach you, we will.</p>
                </div>
                <a href="tel:+919999999999" className="btn-primary text-sm shrink-0 whitespace-nowrap">
                  Call to Check <ArrowRight />
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Standards & Certifications" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Tested, certified, and documented</h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                Our products meet Indian and international standards. We provide full technical documentation for
                building permit submissions, LEED credits, and GRIHA certification at no extra charge, with every order, automatically.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {CERTIFICATIONS.map((c, i) => (
                <FadeUp key={c.label} delay={i * 0.05}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/60 h-full">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheckIcon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-700 text-foreground">{c.label}</p>
                      <p className="text-sm font-400 text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2}>
              <div className="p-6 rounded-2xl bg-card border border-border/60 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-base font-700 text-foreground">Need technical documentation for a building permit or green rating?</p>
                  <p className="text-sm font-400 text-muted-foreground mt-1 leading-relaxed">We provide structural calculations (IS 875 Part 3), test certificates, U-Value data sheets, and SHGC reports with every order at no extra cost. Ready for submission on the day of your order confirmation.</p>
                </div>
                <Link href="/homepage#contact" className="btn-primary text-sm shrink-0 whitespace-nowrap">
                  Request Documents <ArrowRight />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* OUR PROMISE */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Our Promise" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">Three things we guarantee on every order</h2>
              <p className="text-base font-400 text-muted-foreground mt-3 max-w-xl leading-relaxed">
                Not aspirations. Commitments in writing, in your order confirmation, enforced by the same people who took your call on day one.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-3 gap-4">
              {PROMISES.map((item, i) => (
                <FadeUp key={item.n} delay={i * 0.08}>
                  <div className="p-7 rounded-2xl border border-border/60 bg-card h-full flex flex-col gap-4 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                    <span className="text-5xl font-800 text-primary/10 leading-none tracking-tight">{item.n}</span>
                    <div>
                      <p className="text-base font-700 text-foreground">{item.title}</p>
                      <p className="text-sm font-400 text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT STRIP */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
            <div className="grid sm:grid-cols-3 gap-4">
              {CONTACT_CARDS.map((c, i) => (
                <FadeUp key={c.title} delay={i * 0.07}>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/60 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-base font-700 text-foreground">{c.title}</p>
                      {c.lines.map((l) => (
                        <p key={l} className="text-sm font-400 text-muted-foreground mt-0.5">{l}</p>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-[60px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl font-800 text-white max-w-md leading-snug">
                Start with a free home survey. We visit, measure, and advise at no charge.
              </h2>
              <p className="text-base font-400 text-white/70 mt-2 max-w-sm leading-relaxed">
                No commitment. No pressure. Just expert advice, precise measurements, and an honest itemised quote within 24 hours.
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