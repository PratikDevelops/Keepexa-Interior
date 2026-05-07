'use client';

import React, { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import BeforeAfterSection from './Beforeaftersection';

/* ─────────────────────────────────────────────
   AppImage / Icon
───────────────────────────────────────────── */
function AppImage({ src, alt, fill, className }: { src: string; alt: string; fill?: boolean; className?: string }) {
  return (
    <img src={src} alt={alt} className={[fill ? 'absolute inset-0 w-full h-full' : '', className].join(' ')} />
  );
}

function Icon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    ArrowRightIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ArrowLeftIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    CheckIcon: (
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ShieldIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 2l5 2.5v4C13 11.5 10.5 14 8 15 5.5 14 3 11.5 3 8.5v-4L8 2z" strokeLinejoin="round" />
      </svg>
    ),
    ThermometerIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 2v7M6 4h4M5.5 13a2.5 2.5 0 005 0c0-1-.6-1.8-1.5-2.2V2H7v8.8C6.1 11.2 5.5 12 5.5 13z" strokeLinecap="round" />
      </svg>
    ),
    SoundIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 6v4h3l4 3V3L6 6H3z" strokeLinejoin="round" />
        <path d="M11.5 5a3 3 0 010 6" strokeLinecap="round" />
      </svg>
    ),
    LayersIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 2L2 5.5l6 3.5 6-3.5L8 2z" strokeLinejoin="round" />
        <path d="M2 9l6 3.5L14 9" strokeLinecap="round" />
      </svg>
    ),
    WindIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 8h8a2 2 0 100-4" strokeLinecap="round" />
        <path d="M2 11h6a2 2 0 110 4" strokeLinecap="round" />
      </svg>
    ),
    RulerIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="5" width="12" height="6" rx="1" />
        <path d="M5 5v2M8 5v3M11 5v2" strokeLinecap="round" />
      </svg>
    ),
    StarIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1l1.76 3.57L14 5.27l-3 2.93.71 4.13L8 10.27l-3.71 2.06L5 8.2 2 5.27l4.24-.7z" />
      </svg>
    ),
    LeafIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 2s-6 0-9 5c-1.5 2.5-1.5 5-1.5 7M4.5 9C6 7 9 6 14 2" strokeLinecap="round" />
      </svg>
    ),
    ToolIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M13.5 2.5a3 3 0 00-4 4L3 13a1 1 0 001.4 1.4l6.5-6.5a3 3 0 004-4z" strokeLinejoin="round" />
      </svg>
    ),
    ZoomIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="7" cy="7" r="4.5" />
        <path d="M11 11l2.5 2.5M5.5 7h3M7 5.5v3" strokeLinecap="round" />
      </svg>
    ),
    CloseIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
      </svg>
    ),
    GridIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
  };
  return <span className={`inline-flex items-center justify-center ${className}`}>{icons[name] ?? null}</span>;
}

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ProductDetail {
  id: string;
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  gallery?: { src: string; caption: string; tag?: string }[];
  badge?: { label: string; variant: 'popular' | 'new' | 'premium' | 'eco' };
  startingPrice: string;
  priceUnit: string;
  rating: number;
  reviews: number;
  uValue: string;
  acoustic: string;
  profiles: string;
  highlights: string[];
  features: { icon: string; title: string; body: string }[];
  specs: { label: string; value: string }[];
  applications: string[];
  relatedSlugs: string[];
  href: string;
  whyChoose?: string[];
  certifications?: string[];
  installTime?: string;
  warranty?: string;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const allProducts: ProductDetail[] = [
  {
    id: 'tilt-turn',
    slug: 'tilt-turn',
    category: 'Tilt & Turn',
    name: 'Tilt & Turn',
    tagline: "Europe's most versatile window, engineered for India",
    description: 'A single handle controls two opening modes - tilt inward for ventilation without rain ingress, turn fully open for cleaning or emergency egress.',
    longDescription: `The Tilt & Turn is our flagship window - a German-engineered masterpiece adapted for Indian climate and construction. A single multi-point handle rotates through three positions: closed (fully sealed), tilt (top opens inward 10-15 cm for passive ventilation), and turn (sash swings fully inward on side hinges for cleaning or egress).

Our 6-chamber profile achieves a U-Value of 1.0 W/m²K - roughly 4× better than standard aluminium - making it the go-to specification for premium residential towers, corporate campuses, and hospitality projects demanding LEED or GRIHA credits.

The multi-point locking system deploys 7 hooks and rollers simultaneously around the frame perimeter when the handle is closed, achieving an airtight, watertight, and burglar-resistant seal in a single motion. Hardware is stainless steel as standard with optional polished chrome, satin nickel, or black matt finishes.

Available in 40+ RAL colours, woodgrain foils, and dual-colour options (white inside / any colour outside). Maximum sash size 1500 × 2200 mm. Child-safe tilt limiters restrict the tilt opening to 80 mm and are factory-fitted on all units shipped to residential projects.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Premium UPVC tilt and turn window in tilt position',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Tilt position — passive ventilation mode', tag: 'Ventilation' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Turn position — full inward swing for cleaning', tag: 'Cleaning' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Chrome hardware detail — 7-point locking', tag: 'Hardware' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: '6-chamber profile cross-section', tag: 'Profile' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Installed in luxury residential tower, Mumbai', tag: 'Installed' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Dual-colour option — white interior, grey exterior', tag: 'Colour' },
    ],
    badge: { label: "Editor's Choice", variant: 'eco' },
    startingPrice: '₹750',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 445,
    uValue: '1.0 W/m²K',
    acoustic: '45 dB',
    profiles: '6-chamber',
    highlights: [
      'Dual-mode single handle',
      'Child-safe tilt limiter',
      'Passive ventilation',
      'Inward clean access',
      '7-point perimeter lock',
      'RC 2 burglar resistance',
      'Triple glazing ready',
      '40+ RAL colours',
    ],
    features: [
      { icon: 'WindIcon', title: 'Tilt Mode Ventilation', body: 'Top tilts inward 12 cm - fresh air enters without rain, dust, or insects. Ideal for sleeping rooms, high-rise apartments, and any space where security and ventilation must coexist.' },
      { icon: 'ShieldIcon', title: 'Multi-Point Security', body: '7 locking points around the perimeter engage simultaneously with a single handle turn, achieving RC 2 burglar resistance per EN 1627. Hardware tested to 100,000 open/close cycles.' },
      { icon: 'ThermometerIcon', title: 'Thermal Break Technology', body: '6-chamber profile with 70 mm depth and optional foam-fill delivers U-Values as low as 0.9 W/m²K with triple glazing. Outperforms aluminium thermally by a factor of 4×.' },
      { icon: 'SoundIcon', title: 'Acoustic Comfort', body: 'Combined with 6/12/6 mm laminated IGU, the system achieves Rw 45 dB - exceeding NBC acoustic requirements for bedrooms adjacent to arterial roads.' },
      { icon: 'LeafIcon', title: 'LEED & GRIHA Credits', body: 'U-Value performance and airtightness data (n50 < 1.0 h⁻¹) support credit claims under LEED v4 EAc2 and GRIHA Criterion 10 for reduced HVAC load.' },
      { icon: 'ToolIcon', title: 'Easy Maintenance', body: 'Inward turn opening exposes the full outer glass face for cleaning from inside - no window cleaners, no scaffolding, no risk. Hinges are adjustable in 3D post-installation.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '70 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '1.0 W/m²K' },
      { label: 'Acoustic (Rw)', value: '45 dB' },
      { label: 'Max Sash Size', value: '1500 × 2200 mm' },
      { label: 'Locking Points', value: '7-point perimeter' },
      { label: 'Opening Modes', value: 'Tilt + Turn' },
      { label: 'Tilt Opening', value: '80-150 mm' },
      { label: 'Glazing', value: 'Double or Triple IGU' },
      { label: 'Max Glazing Wt', value: '80 kg per sash' },
      { label: 'Hardware Finish', value: 'SS / Chrome / Black' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Wind Resistance', value: 'Class C4 (600 Pa)' },
      { label: 'Water Tightness', value: 'Class E900' },
      { label: 'Air Permeability', value: 'Class 4' },
      { label: 'Lead Time', value: '12-15 working days' },
    ],
    applications: ['Premium Residential Towers', 'Hospitality & Hotels', 'Corporate Campuses', 'Green-rated Buildings', 'Healthcare Facilities', 'Educational Institutions'],
    relatedSlugs: ['casement', 'french-casement', 'fixed-picture'],
    href: '/products/tilt-turn',
    whyChoose: [
      'Only window type that ventilates and locks with one handle',
      'Inward-opening turn for safe cleaning from inside',
      'Factory-fit child safety limiter on every unit',
      'Best combination of thermal, acoustic, and security performance',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'BIS Compliant', 'GRIHA Compatible'],
    installTime: '2-3 hours per window',
    warranty: '10 years on profile, 5 years on hardware',
  },
  {
    id: 'casement-classic',
    slug: 'casement',
    category: 'Casement',
    name: 'Classic Casement',
    tagline: 'Side-hung sash, full ventilation, timeless profile',
    description: 'The benchmark casement - side-hinged sash with multi-point locking, weather-seal gasket, and optional trickle vent.',
    longDescription: `The Classic Casement is our highest-volume window - chosen by builders, developers and homeowners who demand reliability, clean lines, and proven performance. Since 2012 we have installed over 85,000 casement units across Maharashtra, Karnataka, and Tamil Nadu.

The side-hinged sash opens outward (or inward on request) for full-face ventilation. A continuous thermoplastic elastomer gasket presses uniformly against the frame on closure, delivering class-leading weatherproofing even at 40 m/s wind pressure - well above Cyclone-zone requirements for the Western coast.

Standard 5-chamber 60 mm profile can be upgraded to our 6-chamber 70 mm system for enhanced thermal performance. Egress hardware, friction stays, cat-flap sub-frames, and restrictors are all available as factory-fitted options.

Our casement is available in single-light, two-light (with fixed or opening pair), and combination frame configurations. Transoms and mullions can be added post-welding to achieve virtually any grid pattern. Largest sash size: 900 × 1500 mm; largest frame: unlimited with intermediate members.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Classic white UPVC casement window',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Open position — full 90° swing', tag: 'Open' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Multi-point lock mechanism detail', tag: 'Lock' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Paired casement configuration', tag: 'Paired' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Woodgrain foil finish — Oak', tag: 'Colour' },
    ],
    badge: { label: 'Best Seller', variant: 'popular' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 612,
    uValue: '1.2 W/m²K',
    acoustic: '42 dB',
    profiles: '5-chamber',
    highlights: ['Multi-point locking', 'Weather-seal gasket', 'Trickle vent option', 'Outward or inward opening', 'Friction stay restrictor', 'UV-stabilised compound', 'Single or paired sash', 'Unlimited frame size'],
    features: [
      { icon: 'WindIcon', title: 'Full-Face Ventilation', body: 'Sash opens to 90° for unobstructed airflow - the highest ventilation-to-frame ratio of any opening window type. Friction stay holds any position from 10° to 90°.' },
      { icon: 'ShieldIcon', title: 'Multi-Point Lock', body: '5 locking points with hook bolt and roller cams distribute clamping force evenly around the perimeter for a hermetic seal.' },
      { icon: 'ThermometerIcon', title: '5-Chamber Profile', body: '60 mm frame depth with co-extruded steel reinforcement handles spans up to 2.4 m without deflection. Foam-fill upgrade reduces U-Value to 1.0 W/m²K.' },
      { icon: 'SoundIcon', title: 'Trickle Vent Ready', body: 'Factory-routed slot in the head section accepts our snap-fit trickle vent, providing background ventilation to meet Part F of the NBC without opening the sash.' },
      { icon: 'LeafIcon', title: 'UV-Stabilised Compound', body: 'Our UPVC formulation includes a titanium dioxide UV package rated for 50 years colour retention in Mumbai coastal UV levels.' },
      { icon: 'RulerIcon', title: 'Flexible Configuration', body: 'Single light, paired opening leaves, fixed-plus-opening combinations, or full-height picture with opening transom above. All welded in our Mumbai factory.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm (70 mm opt.)' },
      { label: 'Chambers', value: '5-chamber (6 opt.)' },
      { label: 'U-Value', value: '1.2 W/m²K' },
      { label: 'Acoustic (Rw)', value: '42 dB' },
      { label: 'Max Sash Size', value: '900 × 1500 mm' },
      { label: 'Locking Points', value: '5-point' },
      { label: 'Opening Direction', value: 'Outward / Inward' },
      { label: 'Stay Type', value: 'Friction / Egress' },
      { label: 'Glazing', value: 'Single, Double or Triple' },
      { label: 'Max Glazing Wt', value: '60 kg per sash' },
      { label: 'Steel Reinforcement', value: 'Standard (all sashes)' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Wind Resistance', value: 'Class C3 (400 Pa)' },
      { label: 'Water Tightness', value: 'Class E750' },
      { label: 'Trickle Vent', value: 'Optional (4000 mm²)' },
      { label: 'Lead Time', value: '10-12 working days' },
    ],
    applications: ['Mass Housing Schemes', 'Independent Villas', 'School Classrooms', 'Renovation Projects', 'Retail Shopfronts', 'Government Buildings'],
    relatedSlugs: ['tilt-turn', 'french-casement', 'fixed-picture'],
    href: '/products/casement',
    whyChoose: ["India's most proven UPVC window - over 85,000 units installed", 'Widest range of hardware and glazing options', 'Outward swing clears internal curtains and blinds', 'Lowest entry price for a premium UPVC system'],
    certifications: ['CE Marked', 'ISO 9001', 'BIS IS 14856'],
    installTime: '1-2 hours per window',
    warranty: '10 years on profile, 5 years on hardware',
  },
  {
    id: 'sliding-2track', slug: 'sliding-2track', category: 'Sliding', name: 'Sliding 2-Track',
    tagline: 'Space-saving horizontal slide, perfect for balconies',
    description: 'Horizontal sliding sash on stainless steel rollers. Anti-lift security locks and optional mosquito mesh integration.',
    longDescription: `When floor space is tight or outward swing isn't permitted - balconies, corridors, narrow sills - the Sliding 2-Track is the default choice.

Two sashes slide on independent stainless-steel tandem roller sets, each rated for 50,000 open-close cycles. The anti-lift security system prevents the sash being lifted off the track from outside. An optional integrated mesh track provides year-round mosquito protection without a separate frame.

Our 4-chamber profile is engineered specifically for the Indian coastal and monsoon climate: UV-stabilised compound, sealed drainage channels, and a recessed sill lip that directs driving rain away from interior finishes.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC horizontal sliding window',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Balcony installation — 3-sash configuration', tag: 'Balcony' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Anti-lift lock mechanism', tag: 'Security' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Integrated mosquito mesh track', tag: 'Mesh' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Monsoon drainage channel detail', tag: 'Drainage' },
    ],
    badge: { label: 'Most Popular', variant: 'popular' },
    startingPrice: '₹400', priceUnit: 'per sq ft', rating: 4.7, reviews: 834,
    uValue: '1.4 W/m²K', acoustic: '38 dB', profiles: '4-chamber',
    highlights: ['Anti-lift locks', 'Stainless steel rollers', 'Mesh-ready track', 'Monsoon drainage', '25 mm deep sill channel', '2-sash or 3-sash config', 'Retrofit ready', 'UV-stabilised compound'],
    features: [
      { icon: 'RulerIcon', title: 'No Swing Space Needed', body: 'Zero outward projection makes it ideal for balconies, roadside rooms, and any opening adjacent to walkways or furniture.' },
      { icon: 'ShieldIcon', title: 'Anti-Lift Security', body: 'Mushroom cams in the meeting stile and recessed track clips prevent the sash being lifted from outside.' },
      { icon: 'WindIcon', title: 'Integrated Mesh Option', body: 'A third track factory-fitted behind the sash tracks accepts fibreglass mosquito mesh on independent rollers.' },
      { icon: 'ThermometerIcon', title: 'Monsoon-Ready Drainage', body: 'Tiered drainage channels with weep holes in the sill section flush rainwater to the outside. Tested at 600 Pa driving rain.' },
      { icon: 'LayersIcon', title: 'Smooth SS Roller System', body: 'Tandem stainless-steel rollers on nylon carriers glide on an extruded aluminium track insert. Each roller set carries 80 kg.' },
      { icon: 'ToolIcon', title: 'Retrofit Compatible', body: 'Frame profile includes a 15 mm rebate that sits over most existing aluminium sub-frames - no chipping, no plastering.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' }, { label: 'Chambers', value: '4-chamber' },
      { label: 'U-Value', value: '1.4 W/m²K' }, { label: 'Acoustic (Rw)', value: '38 dB' },
      { label: 'Max Width', value: '2400 mm (3-sash)' }, { label: 'Max Height', value: '1800 mm' },
      { label: 'Track System', value: '2-track SS roller' }, { label: 'Roller Rating', value: '80 kg / set, 50k cycles' },
      { label: 'Sill Channel Depth', value: '25 mm' }, { label: 'Configurations', value: '2-sash / 3-sash' },
      { label: 'Mesh Track', value: 'Optional 3rd track' }, { label: 'Colour Options', value: '30+ RAL' },
      { label: 'Wind Resistance', value: 'Class C2 (200 Pa)' }, { label: 'Water Tightness', value: 'Class E300' },
      { label: 'Locking', value: 'Anti-lift + hook bolt' }, { label: 'Lead Time', value: '8-10 working days' },
    ],
    applications: ['Balcony Openings', 'Apartment Corridors', 'Affordable Housing', 'Retrofit Replacement', 'Coastal Properties', 'Utility & Service Rooms'],
    relatedSlugs: ['lift-slide', 'fixed-picture', 'louvre'],
    href: '/products/sliding-2track',
    whyChoose: ['No outward swing', 'Integrated mesh track', 'Fits over most existing frames', 'Lowest cost per sq ft'],
    certifications: ['CE Marked', 'ISO 9001', 'BIS IS 14856'],
    installTime: '1.5-2 hours per window',
    warranty: '10 years on profile, 3 years on rollers',
  },
  {
    id: 'french-casement', slug: 'french-casement', category: 'Casement', name: 'French Casement',
    tagline: 'Double-leaf, no centre post, unobstructed opening',
    description: 'Two sashes open outward from a central meeting point with no fixed mullion. Espagnolette bolt secures both leaves.',
    longDescription: `The French Casement is the architectural choice when the view matters as much as the window itself. Two full-height sashes meet at the centre with no fixed mullion - opened together they deliver an uninterrupted aperture up to 1800 mm wide.

The Espagnolette bolt system locks the passive (first-close) leaf top and bottom into keeps in the head and sill before the active leaf engages its own 5-point multi-point locks, creating a combined locking sequence that is both secure and elegant.

Ultra-slim 6-chamber frame sections at the meeting stile reduce sight lines to as little as 78 mm across both leaves combined. When closed, the French Casement reads as a near-seamless glazed panel.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC French casement double window',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Both leaves fully open — unobstructed aperture', tag: 'Open' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Espagnolette bolt detail', tag: 'Hardware' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: '78 mm combined sightline at meeting stile', tag: 'Detail' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Low-threshold sill for balcony access', tag: 'Sill' },
    ],
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹650', priceUnit: 'per sq ft', rating: 4.8, reviews: 289,
    uValue: '1.1 W/m²K', acoustic: '44 dB', profiles: '6-chamber',
    highlights: ['No centre mullion', 'Espagnolette bolt', 'Slim 78 mm sightline', 'Full-width opening', 'Low-threshold sill option', 'Floor-to-ceiling ready', '5-point active locking', 'Heritage compatible'],
    features: [
      { icon: 'RulerIcon', title: 'No Mullion View', body: 'Meeting stiles are slimmed to 78 mm combined width — visually equivalent to a fixed picture window when closed.' },
      { icon: 'ShieldIcon', title: 'Espagnolette Security', body: 'Passive leaf locks top and bottom; active leaf then engages 5-point locks. Both secured before either can be forced from outside.' },
      { icon: 'WindIcon', title: 'Full-Width Ventilation', body: 'Open both sashes to expose 100% of the frame aperture. Friction stays hold each leaf from 10° to 90°.' },
      { icon: 'ThermometerIcon', title: '6-Chamber Profile', body: '70 mm profile depth with thermal break delivers U-Value 1.1 W/m²K, upgradeable to 0.9 W/m²K with triple glazing.' },
      { icon: 'LayersIcon', title: 'Low-Threshold Option', body: '20 mm accessible sill for balcony door applications. Provides near-flush transition for wheelchair access.' },
      { icon: 'StarIcon', title: 'Heritage Aesthetics', body: 'Period-correct proportions with authentic putty-line rebate detail. Woodgrain foils in Oak, Mahogany, or Walnut.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '70 mm' }, { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '1.1 W/m²K' }, { label: 'Acoustic (Rw)', value: '44 dB' },
      { label: 'Max Width', value: '1800 mm' }, { label: 'Max Height', value: '2200 mm' },
      { label: 'Meeting Stile Width', value: '78 mm (combined)' }, { label: 'Passive Locking', value: 'Espagnolette (top+bot)' },
      { label: 'Active Locking', value: '5-point multi-point' }, { label: 'Sill Options', value: 'Standard / 20 mm low' },
      { label: 'Glazing', value: 'Double or Triple IGU' }, { label: 'Stay Type', value: 'Friction (each leaf)' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' }, { label: 'Wind Resistance', value: 'Class C3 (400 Pa)' },
      { label: 'Water Tightness', value: 'Class E750' }, { label: 'Lead Time', value: '14-18 working days' },
    ],
    applications: ['Master Bedroom Balcony Doors', 'Living Room Feature Openings', 'Heritage & Period Buildings', 'Accessible Design Projects', 'Boutique Hotels', 'High-End Residential'],
    relatedSlugs: ['tilt-turn', 'casement', 'fixed-picture'],
    href: '/products/french-casement',
    whyChoose: ['Widest unobstructed opening', 'Espagnolette is intuitive', 'Period-correct proportions', 'Low-threshold sill'],
    certifications: ['CE Marked', 'ISO 9001', 'BIS Compliant'],
    installTime: '3-4 hours per unit',
    warranty: '10 years on profile, 5 years on hardware',
  },
  {
    id: 'lift-slide', slug: 'lift-slide', category: 'Sliding', name: 'Lift & Slide',
    tagline: 'Large-format panels, effortless handle-lift operation',
    description: 'Panel lifts off its seal with a quarter-turn of the handle, then glides on precision rollers. Up to 3 m wide.',
    longDescription: `The Lift & Slide is the system of choice for seamless indoor-outdoor living - contemporary villas, duplex penthouses, and resort developments.

Unlike a standard sliding door, the panel presses down firmly onto its triple-sealed compression gasket when the handle is closed, achieving thermal and acoustic performance close to a fixed light. A quarter-turn of the handle lifts the panel 3 mm off the seal onto low-friction tandem rollers.

Single panels up to 3000 × 2400 mm weighing 400 kg are supported on precision aluminium-encased tandem roller carriages. 2, 3, and 4-panel configurations available.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large UPVC lift and slide patio door',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Villa installation — 4-panel system', tag: 'Villa' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: '20 mm flush floor threshold detail', tag: 'Threshold' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Compression seal cross-section', tag: 'Seal' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Precision roller carriage — 400 kg rated', tag: 'Roller' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Wall-pocket disappearing panel option', tag: 'Pocket' },
    ],
    badge: { label: 'New', variant: 'new' },
    startingPrice: '₹2500', priceUnit: 'per sq ft', rating: 4.9, reviews: 97,
    uValue: '0.9 W/m²K', acoustic: '46 dB', profiles: '6-chamber',
    highlights: ['Up to 3 m panel width', '20 mm low-threshold sill', 'Triple-sealed compression', 'Finger-tip operation', '400 kg panel capacity', '2 / 3 / 4-panel configs', 'Wall-pocket option', 'Hurricane-rated version'],
    features: [
      { icon: 'RulerIcon', title: '3 m Panel Width', body: 'Individual panels up to 3000 mm wide, weighing up to 400 kg, ride on precision aluminium-encased tandem roller carriages.' },
      { icon: 'ShieldIcon', title: 'Compression Seal When Closed', body: 'When closed, the panel locks down onto a triple-gasket perimeter seal. No gap, no whistle, no thermal bridge.' },
      { icon: 'ThermometerIcon', title: 'Best-in-Class U-Value', body: '6-chamber 82 mm profile achieves U-Value 0.9 W/m²K — the lowest of any sliding system in our range.' },
      { icon: 'SoundIcon', title: 'Premium Acoustic', body: 'Compression seal eliminates the acoustic gap. With 8/16/8 laminated IGU: Rw 46 dB. With 10/16/10.4 laminated: Rw 50 dB.' },
      { icon: 'WindIcon', title: 'Flush Floor Transition', body: '20 mm ultra-low sill enables true indoor-outdoor continuity. Drain channel handles 150 mm/hr rainfall.' },
      { icon: 'LayersIcon', title: 'Multi-Panel Configurations', body: '2, 3, and 4-panel systems. Wall-pocket (disappearing panel) option available with structural lintel package.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '82 mm' }, { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '0.9 W/m²K' }, { label: 'Acoustic (Rw)', value: '46-50 dB' },
      { label: 'Max Panel Width', value: '3000 mm' }, { label: 'Max Panel Height', value: '2400 mm' },
      { label: 'Max Panel Weight', value: '400 kg' }, { label: 'Roller Rating', value: 'SS bearing, 20k cycles' },
      { label: 'Sill Height', value: '20 mm (flush option)' }, { label: 'Configurations', value: '2, 3, 4 panels' },
      { label: 'Glazing', value: 'Double or Triple IGU' }, { label: 'Locking', value: 'Multi-point compression' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' }, { label: 'Wind Resistance', value: 'Class C5 (800 Pa)' },
      { label: 'Water Tightness', value: 'Class E1200' }, { label: 'Lead Time', value: '18-22 working days' },
    ],
    applications: ['Luxury Villa Living Rooms', 'Penthouse Terraces', 'Resort Hotel Suites', 'Indoor-Outdoor Entertainment', 'Cinema & AV Rooms', 'Accessible Balcony Access'],
    relatedSlugs: ['sliding-2track', 'bay-window', 'fixed-picture'],
    href: '/products/lift-slide',
    whyChoose: ['Only sliding system matching fixed-frame thermal performance', 'Single handle lifts 400 kg', '20 mm sill — lowest threshold in range', 'Panel disappears into wall pocket'],
    certifications: ['CE Marked', 'ISO 9001', 'IS 875 Wind Rated', 'Hurricane Resistant'],
    installTime: '4-6 hours per unit',
    warranty: '10 years on profile, 5 years on roller system',
  },
  {
    id: 'fixed-picture', slug: 'fixed-picture', category: 'Fixed', name: 'Fixed Picture',
    tagline: 'Maximum glazing, zero infiltration, pure views',
    description: 'Fully fixed frame with no moving parts - highest thermal and acoustic performance. Custom shapes available.',
    longDescription: `Where the view is the feature, the Fixed Picture window disappears into it. With no hinges, handles, seals, or gaps, a fixed light achieves the highest thermal and acoustic performance of any window type.

Our Fixed Picture is available in any shape: rectangle, arch, circle, triangle, trapezoid, or bespoke CNC-cut profiles. Structural silicone glazing allows glass-to-glass corner joints with a 5 mm visual butt.

Maximum single pane size is limited only by the glass manufacturer's capabilities. We have installed 5000 × 2500 mm lites on commercial projects.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large fixed UPVC picture window',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Commercial 5 m × 2.5 m panoramic installation', tag: 'Commercial' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Glass-to-glass corner joint — 5 mm butt', tag: 'Corner' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Circular arch window — CNC router cut', tag: 'Arch' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Security glazing P6B — laminated cross-section', tag: 'Security' },
    ],
    startingPrice: '₹500', priceUnit: 'per sq ft', rating: 4.8, reviews: 318,
    uValue: '0.8 W/m²K', acoustic: '48 dB', profiles: '5-chamber',
    highlights: ['Full-frame glazing', 'Custom shapes', 'Structural silicone seal', 'Maximum view', 'Glass-to-glass corner', 'Zero moving parts', 'No seal degradation', 'Up to 5 m × 2.5 m'],
    features: [
      { icon: 'ThermometerIcon', title: 'Best Thermal Performance', body: 'No opening hardware means no seal degradation. U-Value 0.8 W/m²K with triple glazing on day one — and on day 3,650.' },
      { icon: 'SoundIcon', title: 'Maximum Acoustic Isolation', body: 'No gaps: Rw 48 dB with 6.4/16/6.4 laminated IGU. Upgrade to 12/20/12.4 for Rw 54 dB — cinema grade.' },
      { icon: 'RulerIcon', title: 'Any Shape, Any Size', body: 'CNC-welded corners allow any polygon. Arches, circles, trapezia router-cut in our Mumbai factory. Max pane 5000 × 2500 mm.' },
      { icon: 'LayersIcon', title: 'Structural Silicone Joints', body: 'Glass-to-glass corners with 5 mm silicone butt joint eliminate frame sections entirely. Rated for 25+ years movement fatigue.' },
      { icon: 'ShieldIcon', title: 'Security Glazing Options', body: 'P2A laminated glass resists manual attack. P6B resists sustained attack. Ballistic glazing (BR2-BR6) available.' },
      { icon: 'LeafIcon', title: 'Solar Control Glazing', body: 'Low-e coatings (SHGC 0.25-0.65) reduce solar heat gain. Reduces HVAC sizing by up to 30% in west-facing elevations.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm (70 mm opt.)' }, { label: 'Chambers', value: '5-chamber (6 opt.)' },
      { label: 'U-Value', value: '0.8 W/m²K (triple)' }, { label: 'Acoustic (Rw)', value: '48-54 dB' },
      { label: 'Standard Max Size', value: '3000 × 2400 mm' }, { label: 'Commercial Max Size', value: '5000 × 2500 mm' },
      { label: 'Shapes', value: 'Any polygon + arch/circle' }, { label: 'Corner Detail', value: 'Structural silicone butt' },
      { label: 'Glazing Options', value: 'Single / Double / Triple' }, { label: 'Security Glazing', value: 'P2A to BR6 available' },
      { label: 'Solar Control', value: 'Low-e / Body-tint' }, { label: 'SHGC Range', value: '0.25 - 0.65' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' }, { label: 'Wind Resistance', value: 'Project-specific calc' },
      { label: 'Structural Silicone', value: '25-yr movement rated' }, { label: 'Lead Time', value: '10-14 working days' },
    ],
    applications: ['Feature Walls & Panoramic Views', 'Recording & Broadcast Studios', 'Art Galleries & Museums', 'Data Centres & Server Rooms', 'High-Security Commercial', 'Stairwell Glazing'],
    relatedSlugs: ['tilt-turn', 'casement', 'sliding-2track'],
    href: '/products/fixed-picture',
    whyChoose: ['Permanent thermal performance', 'Any shape including circles and arches', 'Glass-to-glass corner joints', 'Widest range of security glazing'],
    certifications: ['CE Marked', 'ISO 9001', 'Structural Silicone: ETAG 002'],
    installTime: '2-3 hours per unit',
    warranty: '10 years on profile, 25 years on structural silicone',
  },
  {
    id: 'bay-window', slug: 'bay-window', category: 'Bay & Bow', name: 'Bay Window',
    tagline: 'Three-panel angled projection, light and space',
    description: 'Classic three-panel bay at 30° or 45° projection with structural corner posts and optional integrated seat board.',
    longDescription: `The Bay Window is the most transformative architectural element we manufacture - projecting 300-600 mm beyond the wall plane, flooding the interior with three-directional light.

Our bay consists of a large fixed or opening centre light flanked by two angled sidelights at 30° or 45°. Structural UPVC corner posts with co-extruded aluminium cores carry the full dead load without requiring a steel angle or timber knee brace.

A Bow window variant with 5 or 7 equal-width panels on a curved radius is available for period-property restorations. Both units are delivered with a full structural calculation pack.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'White UPVC bay window',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: '45° projection bay — living room installation', tag: '45°' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Integrated seat board — painted MDF', tag: 'Seat' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: '5-panel bow window — period restoration', tag: 'Bow' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Structural corner post cross-section', tag: 'Structure' },
    ],
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹600', priceUnit: 'set', rating: 4.7, reviews: 156,
    uValue: '1.1 W/m²K', acoustic: '43 dB', profiles: '6-chamber',
    highlights: ['30° or 45° angles', 'Structural corner posts', 'Seat board option', 'Factory assembled', 'No steel knee brace', 'Bow window variant', 'Soffit liner option', 'Structural calc pack'],
    features: [
      { icon: 'RulerIcon', title: '30° or 45° Projection', body: '30° projects 300-400 mm; 45° maximises light and projects 400-600 mm. Both self-supporting without steel sub-frame.' },
      { icon: 'LayersIcon', title: 'Self-Supporting Corner Posts', body: 'Structural UPVC corner posts with co-extruded aluminium core carry dead load and wind pressure.' },
      { icon: 'WindIcon', title: 'Opening Sidelights', body: 'Sidelights as casement or tilt-turn provide controlled ventilation. Factory-assembled in one unit.' },
      { icon: 'ThermometerIcon', title: 'Integrated Seat Board', body: '30 mm moisture-resistant MDF seat board factory-fitted to corner posts. Single-lift installation.' },
      { icon: 'StarIcon', title: 'Bow Window Variant', body: '5 or 7-panel bow window on equal-radius curve for period-property restoration. Radius 1.2 m to 3.5 m.' },
      { icon: 'ShieldIcon', title: 'Building Permit Ready', body: 'Every unit supplied with structural calculation pack including wind load analysis to IS 875 Part 3.' },
    ],
    specs: [
      { label: 'Projection Angles', value: '30° and 45°' }, { label: 'Profile', value: '6-chamber 70 mm' },
      { label: 'U-Value', value: '1.1 W/m²K' }, { label: 'Acoustic (Rw)', value: '43 dB' },
      { label: 'Centre Width', value: '600-1500 mm' }, { label: 'Side Width', value: '400-600 mm' },
      { label: 'Projection Depth', value: '300-600 mm' }, { label: 'Corner Post', value: 'UPVC + aluminium core' },
      { label: 'Seat Board', value: '30 mm MR-MDF (opt.)' }, { label: 'Soffit Liner', value: 'UPVC (opt.)' },
      { label: 'Glazing Options', value: 'Obscure / Solar / Clear' }, { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Supply', value: 'Factory-assembled' }, { label: 'Bow Variant', value: '5 or 7 panels (opt.)' },
      { label: 'Structural Calcs', value: 'Included' }, { label: 'Lead Time', value: '15-20 working days' },
    ],
    applications: ['Living Room Feature Wall', 'Master Bedroom Bay', 'Period & Heritage Properties', 'Bungalow Front Elevation', 'Ground-Floor Extensions', 'School Common Rooms'],
    relatedSlugs: ['french-casement', 'lift-slide', 'fixed-picture'],
    href: '/products/bay-window',
    whyChoose: ['No steel sub-frame needed', 'Factory-assembled installs in one day', 'Bow variant for period accuracy', 'Structural calcs included'],
    certifications: ['CE Marked', 'ISO 9001', 'IS 875 Structural Calcs Included'],
    installTime: '1 day (full bay unit)',
    warranty: '10 years on profile, 5 years on hardware',
  },
  {
    id: 'louvre', slug: 'louvre', category: 'Louvre', name: 'Louvre Vent',
    tagline: 'Angled blades, continuous airflow, rain-resistant',
    description: 'Adjustable glass blades allow continuous passive ventilation even during light rain. Monsoon-rated drainage channel.',
    longDescription: `Designed specifically for India's tropical climate, the Louvre Vent delivers continuous passive ventilation that keeps working during light rain and operates entirely without electricity.

Between 4 and 8 glass blades pivot simultaneously via a crank operator. Angle them near-horizontal for maximum airflow — equivalent to 65% free area. Steepen to 75° to deflect driving rain while maintaining 15% free area.

Our monsoon-rated drainage channel captures any water that penetrates and routes it to external weep holes. Correctly sized louvre vents replace mechanical extract fans entirely in bathrooms and kitchens.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC louvre vent window with angled blades',
    gallery: [
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Open position — 15° blade angle, max airflow', tag: 'Open' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Crank operator — adjusts all blades simultaneously', tag: 'Operator' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Mosquito screen between blades', tag: 'Screen' },
      { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png', caption: 'Bathroom installation — monsoon drainage', tag: 'Install' },
    ],
    badge: { label: 'Eco Choice', variant: 'eco' },
    startingPrice: '₹550', priceUnit: 'per sq ft', rating: 4.6, reviews: 203,
    uValue: '1.6 W/m²K', acoustic: '34 dB', profiles: '4-chamber',
    highlights: ['Adjustable blade angle', 'No power needed', 'Monsoon drainage', 'Replaces extract fans', '65% free area (open)', 'Insect screen option', 'Clear / tinted / obscure', 'Free sizing calculation'],
    features: [
      { icon: 'WindIcon', title: 'Continuous Passive Ventilation', body: '4-8 glass blades open independently of rain. 65% free area at 15° blade angle; 15% at near-closed 75°.' },
      { icon: 'ThermometerIcon', title: 'No Electricity Required', body: 'Gravity-driven cross-ventilation replaces mechanical extract fans. We calculate free-area requirements in every quote.' },
      { icon: 'RulerIcon', title: 'Adjustable Blade Angle', body: 'Crank operator adjusts all blades from 15° to 75°. Locking notch at every 15° — set it and leave it.' },
      { icon: 'LayersIcon', title: 'Monsoon-Rated Drainage', body: 'Deep drainage channel below blade bank tested at 600 Pa simulated driving rain — zero interior ingress.' },
      { icon: 'ShieldIcon', title: 'Insect Exclusion Option', body: 'Fibreglass insect screens fit between each blade pair. Removable for cleaning without tools.' },
      { icon: 'StarIcon', title: 'Blade Material Options', body: 'Standard: 5 mm clear float glass. Tinted, obscure, or wired safety glass available. Aluminium blades for industrial use.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' }, { label: 'Chambers', value: '4-chamber' },
      { label: 'U-Value', value: '1.6 W/m²K' }, { label: 'Acoustic (Rw)', value: '34 dB (open 12 dB)' },
      { label: 'Blade Count', value: '4-8 blades' }, { label: 'Blade Width', value: '50 mm each' },
      { label: 'Blade Material', value: 'Glass or aluminium' }, { label: 'Glass Thickness', value: '5 mm' },
      { label: 'Free Area (open)', value: '65% at 15° angle' }, { label: 'Free Area (near-closed)', value: '15% at 75° angle' },
      { label: 'Operation', value: 'Crank + 15° locking' }, { label: 'Insect Screen', value: 'Optional per blade gap' },
      { label: 'Drainage', value: 'Deep channel + weeps' }, { label: 'Wind Rating', value: 'Tested at 600 Pa rain' },
      { label: 'Glass Options', value: 'Clear / Tinted / Obscure / Wired' }, { label: 'Lead Time', value: '8-10 working days' },
    ],
    applications: ['Bathrooms & WCs', 'Kitchen Extraction', 'Stairwells & Lift Lobbies', 'Utility & Laundry Rooms', 'Retail Back-of-House', 'Car Park Ventilation'],
    relatedSlugs: ['sliding-2track', 'fixed-picture', 'casement'],
    href: '/products/louvre',
    whyChoose: ['Only window that ventilates during light rain', 'Replaces mechanical extract fans', 'Insect screens between blades', 'Free ventilation sizing calculation'],
    certifications: ['CE Marked', 'ISO 9001', 'BIS Compliant'],
    installTime: '2-3 hours per unit',
    warranty: '10 years on profile, 3 years on blade hardware',
  },
];

/* ─────────────────────────────────────────────
   Badge
───────────────────────────────────────────── */
const badgeConfig: Record<string, { bg: string; text: string; dot: string }> = {
  popular: { bg: 'bg-primary/10 border border-primary/20', text: 'text-primary', dot: 'bg-primary' },
  new: { bg: 'bg-accent/10 border border-accent/20', text: 'text-accent', dot: 'bg-accent' },
  premium: { bg: 'bg-amber-50 border border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
  eco: { bg: 'bg-emerald-50 border border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

function Badge({ label, variant }: { label: string; variant: string }) {
  const c = badgeConfig[variant] ?? badgeConfig.popular;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-600 px-3 py-1 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />{label}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 12 12" className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'fill-amber-400' : 'fill-border'}`}>
          <path d="M6 1l1.24 2.52L10 3.93l-2 1.95.47 2.76L6 7.27 3.53 8.64 4 5.88 2 3.93l2.76-.41z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Product Gallery Component
───────────────────────────────────────────── */
function ProductGallery({ gallery, productName }: { gallery: { src: string; caption: string; tag?: string }[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % gallery.length), [gallery.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length]);

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card group cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
              <AppImage src={gallery[activeIndex].src} alt={gallery[activeIndex].caption} fill className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                {gallery[activeIndex].tag && (
                  <span className="inline-block text-[10px] font-700 uppercase tracking-widest text-white/70 bg-card/10 backdrop-blur-sm px-2 py-0.5 rounded-md mb-1">
                    {gallery[activeIndex].tag}
                  </span>
                )}
                <p className="text-white text-sm font-500 leading-tight">{gallery[activeIndex].caption}</p>
              </div>
              <button className="shrink-0 w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-card/30 transition-colors">
                <Icon name="ZoomIcon" size={14} />
              </button>
            </div>
          </div>

          {/* Nav arrows */}
          {gallery.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-card shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowLeftIcon" size={15} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-card shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowRightIcon" size={15} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute top-3 right-3 text-[10px] font-700 text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
            {activeIndex + 1} / {gallery.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        {gallery.length > 1 && (
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(gallery.length, 6)}, 1fr)` }}>
            {gallery.map((img, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${i === activeIndex ? 'ring-2 ring-offset-2 ring-foreground scale-[0.97]' : 'opacity-60 hover:opacity-90 hover:scale-[0.98]'}`}>
                <AppImage src={img.src} alt={img.caption} fill className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}>
            <motion.div className="relative max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <AppImage src={gallery[activeIndex].src} alt={gallery[activeIndex].caption} fill className="object-cover w-full h-full" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-white/80 text-sm">{gallery[activeIndex].caption}</p>
                <button onClick={() => setLightboxOpen(false)}
                  className="w-8 h-8 rounded-full bg-card/10 flex items-center justify-center text-white hover:bg-card/20 transition-colors">
                  <Icon name="CloseIcon" size={14} />
                </button>
              </div>
              <div className="absolute -left-14 top-1/2 -translate-y-1/2">
                <button onClick={goPrev} className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-white hover:bg-card/20 transition-colors">
                  <Icon name="ArrowLeftIcon" size={16} />
                </button>
              </div>
              <div className="absolute -right-14 top-1/2 -translate-y-1/2">
                <button onClick={goNext} className="w-10 h-10 rounded-full bg-card/10 flex items-center justify-center text-white hover:bg-card/20 transition-colors">
                  <Icon name="ArrowRightIcon" size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   Related Card
───────────────────────────────────────────── */
function RelatedCard({ product }: { product: ProductDetail }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link 
      href={product.href}
      className="group block rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm"
      style={{ 
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)', 
        boxShadow: hovered ? '0 20px 50px -12px rgba(0,0,0,0.15)' : '0 2px 8px -2px rgba(0,0,0,0.06)', 
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      {/* Increased height from h-40 to h-64 or h-72 for a larger visual impact */}
      <div className="relative h-64 overflow-hidden bg-card">
        <AppImage 
          src={product.image} 
          alt={product.imageAlt} 
          fill
          className={`object-cover w-full h-full transition-transform duration-1000 ease-out ${hovered ? 'scale-110' : 'scale-100'}`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {product.badge && (
          <div className="absolute top-4 left-4">
            <Badge label={product.badge.label} variant={product.badge.variant} />
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-[12px]  uppercase tracking-widest text-muted-foreground/70 mb-2">
          {product.category}
        </p>

        <p className="text-lg text-foreground leading-tight">
          {product.name}
        </p>
  
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
          {product.tagline}
        </p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
          <div>
            <p className="text-base  text-foreground">{product.startingPrice}</p>
            <p className="text-[11px] text-muted-foreground/70 font-medium">{product.priceUnit}</p>
          </div>
          
          <span className="text-sm text-foreground flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
            View Details <Icon name="ArrowRightIcon" size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ProductDetailPage({ slug }: { slug: string }) {
  const product = allProducts.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 80]);

  const featuresRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const featuresView = useInView(featuresRef, { once: true, margin: '-80px' });
  const galleryView = useInView(galleryRef, { once: true, margin: '-80px' });
  const relatedView = useInView(relatedRef, { once: true, margin: '-80px' });
  const ctaView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'applications'>('features');

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-xl font-700 text-foreground">Product not found</p>
        <code className="text-sm text-muted-foreground bg-card px-4 py-2 rounded-xl">{/* ← bg-card */}slug: &quot;{slug}&quot;</code>
        <Link href="/#products" className="btn-primary inline-flex items-center gap-2">
          <Icon name="ArrowLeftIcon" size={14} /> All Products
        </Link>
      </main>
    );
  }

  const relatedProducts = product.relatedSlugs.map((s) => allProducts.find((p) => p.slug === s)).filter(Boolean) as ProductDetail[];
  const galleryImages = product.gallery ?? [{ src: product.image, alt: product.imageAlt, caption: product.name }];

  return (
    <main className="min-h-screen mt-[100px] bg-background">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-border/50 bg-card">{/* ← bg-card: nav/bar element */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <span className="text-muted-foreground/70">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-600">{product.name}</span>
        </div>
      </div>

      {/* ── HERO: SPLIT LAYOUT ── */}
      <section ref={heroRef} className="bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 py-10 lg:py-16 items-start">

            {/* LEFT: Gallery */}
            <motion.div ref={galleryRef}
              initial={{ opacity: 0, x: -30 }} animate={galleryView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <ProductGallery gallery={galleryImages as any} productName={product.name} />
            </motion.div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col gap-6 pt-6 lg:pt-2">
              {/* Top row */}
              <motion.div className="flex items-center gap-2.5 flex-wrap"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <Link href="/#products" className="inline-flex items-center gap-1.5 text-xs font-500 btn-primary px-3 py-1.5 rounded-full">
                  <Icon name="ArrowLeftIcon" size={11} /> All Products
                </Link>
                <span className="text-xs font-600 btn-primary px-3 py-1.5 rounded-full">{product.category}</span>
                {product.badge && <Badge label={product.badge.label} variant={product.badge.variant} />}
              </motion.div>

              {/* Name & tagline */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-800 text-foreground tracking-tight leading-[1.05]">
                  {product.name}
                </h1>
                <p className="mt-2 text-base font-500 text-muted-foreground leading-relaxed">{product.tagline}</p>
              </motion.div>

              {/* Rating + reviews */}
              {/* <motion.div className="flex items-center gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Stars rating={product.rating} />
                <span className="text-sm font-700 text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground/70">·</span>
                <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
              </motion.div> */}

              {/* Performance metrics bar — bg-card: these are individual stat cards */}
              <motion.div className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
                {[
                  { label: 'Thermal', sub: 'U-Value', value: product.uValue },
                  { label: 'Acoustic', sub: 'Sound Reduction', value: product.acoustic },
                  { label: 'Profile', sub: 'Chamber System', value: product.profiles },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col items-center gap-0.5 py-4 px-2 rounded-2xl bg-card border border-border/50 text-center">
                    <span className="text-[9px] font-700 uppercase tracking-[0.15em] text-muted-foreground/70">{m.label}</span>
                    <span className="text-sm font-800 text-foreground leading-tight">{m.value}</span>
                    <span className="text-[9px] text-muted-foreground/70">{m.sub}</span>
                  </div>
                ))}
              </motion.div>

              {/* Short description */}
              <motion.p className="text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                {product.description}
              </motion.p>

              {/* Highlights pills */}
              <motion.div className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
                {product.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1.5 text-xs font-500 text-foreground/80 bg-card border border-border px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{h}
                  </span>
                ))}
              </motion.div>

              {/* Pricing card — bg-card: the pricing panel is a card element */}
              <motion.div className="rounded-2xl border border-border bg-card p-5"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-700 uppercase tracking-[0.18em] text-muted-foreground/70">Starting from</p>
                    <p className="text-4xl font-800 text-foreground tracking-tight leading-none mt-0.5">{product.startingPrice}</p>
                    <p className="text-xs text-muted-foreground mt-1">{product.priceUnit} · including installation</p>
                  </div>
                  {product.certifications && (
                    <div className="flex flex-col gap-1 items-end">
                      {product.certifications.slice(0, 2).map((c) => (
                        <span key={c} className="text-[9px] font-600 text-muted-foreground bg-background border border-border px-2 py-1 rounded-lg">{c}</span>
                      ))}
                    </div>
                  )}
                </div>

                {(product.installTime || product.warranty) && (
                  <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-border">
                    {product.installTime && (
                      <div>
                        <p className="text-[9px] font-700 uppercase tracking-widest text-muted-foreground/70">Install Time</p>
                        <p className="text-xs font-600 text-foreground/80 mt-0.5">{product.installTime}</p>
                      </div>
                    )}
                    {product.warranty && (
                      <div>
                        <p className="text-[9px] font-700 uppercase tracking-widest text-muted-foreground/70">Warranty</p>
                        <p className="text-xs font-600 text-foreground/80 mt-0.5">{product.warranty.split(',')[0]}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-2.5">
                  <Link href="/product-configurator"
                    className="btn-primary w-full justify-center py-3.5">
                    Configure & Get Quote <Icon name="ArrowRightIcon" size={15} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS: Features / Specs / Applications ── */}
      <section ref={featuresRef} className="bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab nav */}
          <div className="flex items-center gap-0 border-b border-border/50 overflow-x-auto">
            {(['features', 'specs', 'applications'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 px-6 py-4 text-sm font-600 transition-colors capitalize ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground/70 hover:text-muted-foreground'}`}>
                {tab}
                {activeTab === tab && (
                  <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'features' && (
              <motion.div key="features" className="py-10"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {product.features.map((f, i) => (
                    <motion.div key={f.title}
                      className="group flex gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-border/80 hover:shadow-md transition-all duration-250"
                      initial={{ opacity: 0, y: 16 }} animate={featuresView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.07 }}>
                      <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center shrink-0 text-white group-hover:scale-105 transition-transform">
                        <Icon name={f.icon} size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-700 text-foreground mb-1.5">{f.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{f.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div key="specs" className="py-10"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
                <div className="overflow-hidden rounded-2xl border border-border/50">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((s, i) => (
                        <tr key={s.label} className={i % 2 === 0 ? 'bg-card' : 'bg-background'}>
                          <td className="px-5 py-3.5 font-500 text-muted-foreground w-1/2 border-r border-border/50">{s.label}</td>
                          <td className="px-5 py-3.5 font-700 text-foreground">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div key="applications" className="py-10"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.applications.map((app, i) => (
                    <motion.div key={app}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-border/80 hover:shadow-sm transition-all"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.07 }}>
                      <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center shrink-0 text-white">
                        <Icon name="CheckIcon" size={13} />
                      </div>
                      <span className="text-sm font-600 text-foreground/90">{app}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── ABOUT + WHY CHOOSE ── */}
      <section className="bg-background py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* About */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 rounded-full bg-foreground" />
                <p className="section-label">About This Product</p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                {product.longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>

            {/* Why Choose + Certifications */}
            <div className="lg:col-span-5 space-y-8">
              {product.whyChoose && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-5 rounded-full bg-foreground" />
                    <p className="section-label">Why Choose This</p>
                  </div>
                  <div className="space-y-3">
                    {product.whyChoose.map((w, i) => (
                      <motion.div key={i}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 shadow-sm"
                        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                        <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0 mt-0.5 text-white">
                          <Icon name="CheckIcon" size={9} />
                        </div>
                        <p className="text-xs font-500 text-foreground/80 leading-snug">{w}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {product.certifications && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 rounded-full bg-foreground" />
                    <p className="section-label">Certifications</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((c) => (
                      <span key={c} className="text-xs font-600 text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-full shadow-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE/AFTER ── */}
      <BeforeAfterSection />

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section ref={relatedRef} className="bg-background border-t border-border/50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-5 rounded-full bg-foreground" />
                  <p className="section-label">You Might Also Consider</p>
                </div>
                <h2 className="text-2xl font-800 text-foreground">Related Products</h2>
              </div>
              <Link href="/#products" className="text-xs font-600 text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                View all <Icon name="ArrowRightIcon" size={11} />
              </Link>
            </div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0, y: 24 }} animate={relatedView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              {relatedProducts.map((rp) => <RelatedCard key={rp.id} product={rp} />)}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section ref={ctaRef} className="bg-primary py-16 sm:py-20">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }} animate={ctaView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="section-label text-white mb-2">Ready to Order?</p>
              <h2 className="text-2xl sm:text-3xl font-800 text-white leading-tight">
                Get your {product.name} quote today.
              </h2>
              <p className="text-sm text-white mt-2 max-w-md">
                Our specialists visit, measure, and recommend — completely free. No obligation, no pressure.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
              <Link href="/product-configurator"
                className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3.5 rounded-xl text-sm font-700 hover:bg-background transition-colors whitespace-nowrap">
                Configure Windows <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}