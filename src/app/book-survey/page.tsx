'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type FormData = {
  // Step 1 – Property
  propertyType: string;
  projectType: string;
  products: string[];
  // Step 2 – Contact
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  // Step 3 – Schedule
  preferredDate: string;
  timeSlot: string;
  notes: string;
};

const EMPTY: FormData = {
  propertyType: '',
  projectType: '',
  products: [],
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  preferredDate: '',
  timeSlot: '',
  notes: '',
};

/* ─────────────────────────────────────────────
   Options
───────────────────────────────────────────── */
const PROPERTY_TYPES = ['Apartment', 'Independent House', 'Villa', 'Commercial', 'Office'];
const PROJECT_TYPES  = ['New Construction', 'Renovation / Replacement', 'Extension'];
const PRODUCTS = [
  { id: 'tilt-turn',       label: 'Tilt & Turn' },
  { id: 'casement',        label: 'Casement' },
  { id: 'sliding-2track',  label: 'Sliding 2-Track' },
  { id: 'french-casement', label: 'French Casement' },
  { id: 'lift-slide',      label: 'Lift & Slide' },
  { id: 'fixed-picture',   label: 'Fixed / Picture' },
  { id: 'bay-window',      label: 'Bay Window' },
  { id: 'louvre',          label: 'Louvre' },
];
const TIME_SLOTS = ['9:00 AM – 11:00 AM', '11:00 AM – 1:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM'];

/* ─────────────────────────────────────────────
   Steps metadata
───────────────────────────────────────────── */
const STEPS = [
  { number: 1, title: 'Your Project',  subtitle: 'Tell us about your space' },
  { number: 2, title: 'Your Details',  subtitle: 'So we can reach you' },
  { number: 3, title: 'Pick a Slot',   subtitle: 'Choose a convenient time' },
  { number: 4, title: 'Confirmed!',    subtitle: 'See you soon' },
];

/* ─────────────────────────────────────────────
   Trust pills
───────────────────────────────────────────── */
const TRUST = [
  { icon: '🏠', text: 'Free home visit' },
  { icon: '📐', text: 'Precise measurement' },
  { icon: '📄', text: 'No-obligation quote' },
  { icon: '⏱',  text: 'Same-week slots' },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function OptionPill({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-500 border transition-all duration-200 cursor-pointer select-none ${
        selected
          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
          : 'bg-background border-border text-foreground/70 hover:border-primary/50 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}

function InputField({
  label, type = 'text', value, onChange, placeholder, required,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step components
───────────────────────────────────────────── */
function StepOne({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const toggle = (id: string) => {
    const next = data.products.includes(id)
      ? data.products.filter((p) => p !== id)
      : [...data.products, id];
    set('products', next);
  };

  return (
    <div className="flex flex-col gap-7">
      {/* Property type */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
          Property Type<span className="text-primary ml-0.5">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <OptionPill key={t} label={t} selected={data.propertyType === t} onClick={() => set('propertyType', t)} />
          ))}
        </div>
      </div>

      {/* Project type */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
          Project Type<span className="text-primary ml-0.5">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <OptionPill key={t} label={t} selected={data.projectType === t} onClick={() => set('projectType', t)} />
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
          Products Interested In <span className="text-foreground/40 normal-case font-400">(select all that apply)</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRODUCTS.map((p) => (
            <OptionPill
              key={p.id}
              label={p.label}
              selected={data.products.includes(p.id)}
              onClick={() => toggle(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepTwo({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <InputField label="Full Name"    value={data.name}    onChange={(v) => set('name', v)}    placeholder="Rahul Sharma"         required />
      <InputField label="Phone"        type="tel"  value={data.phone}   onChange={(v) => set('phone', v)}   placeholder="+91 73710 73711"      required />
      <InputField label="Email"        type="email" value={data.email}  onChange={(v) => set('email', v)}   placeholder="rahul@example.com" />
      <InputField label="City"         value={data.city}    onChange={(v) => set('city', v)}    placeholder="Mumbai"                 required />
      <div className="sm:col-span-2">
        <InputField label="Site Address" value={data.address} onChange={(v) => set('address', v)} placeholder="Flat / Plot no., Street, Locality" required />
      </div>
    </div>
  );
}

function StepThree({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  /* Minimum date = tomorrow */
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-7">
      {/* Date picker */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
          Preferred Date<span className="text-primary ml-0.5">*</span>
        </label>
        <input
          type="date"
          min={minDate}
          value={data.preferredDate}
          onChange={(e) => set('preferredDate', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* Time slots */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
          Preferred Time Slot<span className="text-primary ml-0.5">*</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => (
            <OptionPill key={slot} label={slot} selected={data.timeSlot === slot} onClick={() => set('timeSlot', slot)} />
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-600 text-foreground/60 uppercase tracking-wider">
          Additional Notes <span className="text-foreground/40 normal-case font-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={data.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Any specific requirements, floor details, access notes…"
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
        />
      </div>
    </div>
  );
}

function StepFour({ data }: { data: FormData }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      {/* Animated tick */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 40 40" width="40" height="40" fill="none"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.path d="M8 20 L17 29 L32 13" />
        </motion.svg>
      </motion.div>

      <div>
        <h3 className="text-2xl font-700 text-foreground">Survey Booked!</h3>
        <p className="text-muted-foreground text-sm mt-1.5 max-w-xs mx-auto">
          Our team will confirm your appointment on <strong>{data.phone}</strong> within 2 hours.
        </p>
      </div>

      {/* Summary card */}
      <div className="w-full max-w-sm bg-secondary/50 rounded-2xl p-5 text-left flex flex-col gap-3">
        {[
          { label: 'Name',     value: data.name },
          { label: 'Date',     value: data.preferredDate },
          { label: 'Slot',     value: data.timeSlot },
          { label: 'Address',  value: `${data.address}, ${data.city}` },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground font-500">{label}</span>
            <span className="text-foreground font-600 text-right">{value}</span>
          </div>
        ))}
      </div>

      <Link
        href="/homepage"
        className="text-sm text-primary hover:underline underline-offset-2 font-500"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Validation per step
───────────────────────────────────────────── */
function canAdvance(step: number, data: FormData): boolean {
  if (step === 1) return !!data.propertyType && !!data.projectType && data.products.length > 0;
  if (step === 2) return !!data.name && !!data.phone && !!data.address && !!data.city;
  if (step === 3) return !!data.preferredDate && !!data.timeSlot;
  return true;
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function BookSurveyPage() {
  const [step, setStep]   = useState(1);
  const [data, setData]   = useState<FormData>(EMPTY);
  const [dir, setDir]     = useState(1); // +1 forward / -1 backward

  const set = (k: keyof FormData, v: any) => setData((d) => ({ ...d, [k]: v }));

  const advance = () => {
    if (!canAdvance(step, data)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
  <>
      <main className="min-h-screen bg-background">
          <Header/>
      {/* ── Top nav breadcrumb ── */}
      <div className="border-b border-border/50 px-5 py-3.5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/homepage" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground font-500">Book a Survey</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-16 grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

        {/* ── Left: Form card ── */}
        <div>
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p className="text-xs font-700 uppercase tracking-[0.2em] text-primary mb-2">Free Service</p>
            <h1 className="text-3xl sm:text-4xl font-800 text-foreground leading-tight">
              Book a Home Survey
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-lg">
              Our expert will visit your site, take precise measurements, and give you a no-obligation quote — all at zero cost.
            </p>
          </motion.div>

          {/* Step progress bar */}
          {step < 4 && (
            <div className="mb-8">
              {/* Step labels */}
              <div className="flex items-center justify-between mb-3">
                {STEPS.slice(0, 3).map((s) => (
                  <div key={s.number} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 transition-colors duration-300 ${
                      step >= s.number ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {step > s.number ? (
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M3 8 L7 12 L13 5" />
                        </svg>
                      ) : s.number}
                    </div>
                    <span className={`hidden sm:block text-xs font-500 transition-colors duration-300 ${step === s.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
              {/* Bar */}
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{ width: `${((step - 1) / 2) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Step {step} of 3 — <span className="text-foreground font-500">{STEPS[step - 1].subtitle}</span>
              </p>
            </div>
          )}

          {/* Form card */}
          <div className="bg-background border border-border/60 rounded-2xl p-6 sm:p-8 shadow-soft overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 1 && <StepOne data={data} set={set} />}
                {step === 2 && <StepTwo data={data} set={set} />}
                {step === 3 && <StepThree data={data} set={set} />}
                {step === 4 && <StepFour data={data} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="flex items-center gap-1.5 text-sm font-500 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M10 3 L5 8 L10 13" />
                    </svg>
                    Back
                  </button>
                ) : <span />}

                <button
                  type="button"
                  onClick={advance}
                  disabled={!canAdvance(step, data)}
                  className="flex items-center gap-2 btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {step === 3 ? 'Confirm Booking' : 'Continue'}
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 3 L11 8 L6 13" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:sticky lg:top-24"
        >
          {/* Trust badges */}
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
            <p className="text-xs font-700 uppercase tracking-wider text-primary mb-4">What to expect</p>
            <ul className="flex flex-col gap-3.5">
              {TRUST.map((t) => (
                <li key={t.text} className="flex items-center gap-3">
                  <span className="text-xl leading-none">{t.icon}</span>
                  <span className="text-sm font-500 text-foreground">{t.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process timeline */}
          <div className="bg-background border border-border/60 rounded-2xl p-6">
            <p className="text-xs font-700 uppercase tracking-wider text-muted-foreground mb-5">How it works</p>
            <ol className="flex flex-col gap-4">
              {[
                { n: '01', title: 'Book online',         desc: 'Fill in this form in under 2 minutes.' },
                { n: '02', title: 'We confirm',          desc: 'Our team calls to confirm your slot.' },
                { n: '03', title: 'Expert visits',       desc: 'Measurement & consultation at your site.' },
                { n: '04', title: 'Receive your quote',  desc: 'Detailed itemised quote within 24 hours.' },
              ].map((item, i, arr) => (
                <li key={item.n} className="flex gap-3.5 relative">
                  {/* Connector line */}
                  {i < arr.length - 1 && (
                    <span className="absolute left-[15px] top-7 w-px h-[calc(100%+2px)] bg-border/60" />
                  )}
                  <span className="shrink-0 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-700 text-muted-foreground relative z-10">
                    {item.n}
                  </span>
                  <div>
                    <p className="text-sm font-600 text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact fallback */}
          <div className="text-center text-xs text-muted-foreground">
            Prefer to call?{' '}
            <a href="tel:+919999999999" className="text-primary font-600 hover:underline">
              +91 99999 99999
            </a>
          </div>
        </motion.aside>
      </div>
    </main>
    <Footer/>
  </>
  );
}