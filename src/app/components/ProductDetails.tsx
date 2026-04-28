'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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
   Data — all 8 products fully expanded
───────────────────────────────────────────── */
const allProducts: ProductDetail[] = [
  /* ── 1. TILT & TURN ── */
  {
    id: 'tilt-turn',
    slug: 'tilt-turn',
    category: 'Tilt & Turn',
    name: 'Tilt & Turn',
    tagline: "Europe's most versatile window, engineered for India",
    description: 'A single handle controls two opening modes — tilt inward for ventilation without rain ingress, turn fully open for cleaning or emergency egress.',
    longDescription: `The Tilt & Turn is our flagship window — a German-engineered masterpiece adapted for Indian climate and construction. A single multi-point handle rotates through three positions: closed (fully sealed), tilt (top opens inward 10–15 cm for passive ventilation), and turn (sash swings fully inward on side hinges for cleaning or egress).

Our 6-chamber profile achieves a U-Value of 1.0 W/m²K — roughly 4× better than standard aluminium — making it the go-to specification for premium residential towers, corporate campuses, and hospitality projects demanding LEED or GRIHA credits.

The multi-point locking system deploys 7 hooks and rollers simultaneously around the frame perimeter when the handle is closed, achieving an airtight, watertight, and burglar-resistant seal in a single motion. Hardware is stainless steel as standard with optional polished chrome, satin nickel, or black matt finishes.

Available in 40+ RAL colours, woodgrain foils, and dual-colour options (white inside / any colour outside). Maximum sash size 1500 × 2200 mm. Child-safe tilt limiters restrict the tilt opening to 80 mm and are factory-fitted on all units shipped to residential projects.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Premium UPVC tilt and turn window in tilt position',
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
      { icon: 'WindIcon', title: 'Tilt Mode Ventilation', body: 'Top tilts inward 12 cm — fresh air enters without rain, dust, or insects. Ideal for sleeping rooms, high-rise apartments, and any space where security and ventilation must coexist.' },
      { icon: 'ShieldIcon', title: 'Multi-Point Security', body: '7 locking points around the perimeter engage simultaneously with a single handle turn, achieving RC 2 burglar resistance per EN 1627. Hardware tested to 100,000 open/close cycles.' },
      { icon: 'ThermometerIcon', title: 'Thermal Break Technology', body: '6-chamber profile with 70 mm depth and optional foam-fill delivers U-Values as low as 0.9 W/m²K with triple glazing. Outperforms aluminium thermally by a factor of 4×.' },
      { icon: 'SoundIcon', title: 'Acoustic Comfort', body: 'Combined with 6/12/6 mm laminated IGU, the system achieves Rw 45 dB — exceeding NBC acoustic requirements for bedrooms adjacent to arterial roads.' },
      { icon: 'LeafIcon', title: 'LEED & GRIHA Credits', body: 'U-Value performance and airtightness data (n50 < 1.0 h⁻¹) support credit claims under LEED v4 EAc2 and GRIHA Criterion 10 for reduced HVAC load.' },
      { icon: 'ToolIcon', title: 'Easy Maintenance', body: 'Inward turn opening exposes the full outer glass face for cleaning from inside — no window cleaners, no scaffolding, no risk. Hinges are adjustable in 3D post-installation.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '70 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '1.0 W/m²K' },
      { label: 'Acoustic (Rw)', value: '45 dB' },
      { label: 'Max Sash Size', value: '1500 × 2200 mm' },
      { label: 'Locking Points', value: '7-point perimeter' },
      { label: 'Opening Modes', value: 'Tilt + Turn' },
      { label: 'Tilt Opening', value: '80–150 mm' },
      { label: 'Glazing', value: 'Double or Triple IGU' },
      { label: 'Max Glazing Wt', value: '80 kg per sash' },
      { label: 'Hardware Finish', value: 'SS / Chrome / Black' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Wind Resistance', value: 'Class C4 (600 Pa)' },
      { label: 'Water Tightness', value: 'Class E900' },
      { label: 'Air Permeability', value: 'Class 4' },
      { label: 'Lead Time', value: '12–15 working days' },
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
    installTime: '2–3 hours per window',
    warranty: '10 years on profile, 5 years on hardware',
  },

  /* ── 2. CLASSIC CASEMENT ── */
  {
    id: 'casement-classic',
    slug: 'casement',
    category: 'Casement',
    name: 'Classic Casement',
    tagline: 'Side-hung sash, full ventilation, timeless profile',
    description: 'The benchmark casement — side-hinged sash with multi-point locking, weather-seal gasket, and optional trickle vent.',
    longDescription: `The Classic Casement is our highest-volume window — chosen by builders, developers and homeowners who demand reliability, clean lines, and proven performance. Since 2012 we have installed over 85,000 casement units across Maharashtra, Karnataka, and Tamil Nadu.

The side-hinged sash opens outward (or inward on request) for full-face ventilation. A continuous thermoplastic elastomer gasket presses uniformly against the frame on closure, delivering class-leading weatherproofing even at 40 m/s wind pressure — well above Cyclone-zone requirements for the Western coast.

Standard 5-chamber 60 mm profile can be upgraded to our 6-chamber 70 mm system for enhanced thermal performance. Egress hardware, friction stays, cat-flap sub-frames, and restrictors are all available as factory-fitted options.

Our casement is available in single-light, two-light (with fixed or opening pair), and combination frame configurations. Transoms and mullions can be added post-welding to achieve virtually any grid pattern. Largest sash size: 900 × 1500 mm; largest frame: unlimited with intermediate members.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Classic white UPVC casement window, chrome handle, open position',
    badge: { label: 'Best Seller', variant: 'popular' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 612,
    uValue: '1.2 W/m²K',
    acoustic: '42 dB',
    profiles: '5-chamber',
    highlights: [
      'Multi-point locking',
      'Weather-seal gasket',
      'Trickle vent option',
      'Outward or inward opening',
      'Friction stay restrictor',
      'UV-stabilised compound',
      'Single or paired sash',
      'Unlimited frame size',
    ],
    features: [
      { icon: 'WindIcon', title: 'Full-Face Ventilation', body: 'Sash opens to 90° for unobstructed airflow — the highest ventilation-to-frame ratio of any opening window type. Friction stay holds any position from 10° to 90°.' },
      { icon: 'ShieldIcon', title: 'Multi-Point Lock', body: '5 locking points with hook bolt and roller cams distribute clamping force evenly around the perimeter for a hermetic seal. Cylinder lock upgrade available for ground-floor security.' },
      { icon: 'ThermometerIcon', title: '5-Chamber Profile', body: '60 mm frame depth with co-extruded steel reinforcement handles spans up to 2.4 m without deflection. Foam-fill upgrade reduces U-Value to 1.0 W/m²K.' },
      { icon: 'SoundIcon', title: 'Trickle Vent Ready', body: 'Factory-routed slot in the head section accepts our snap-fit trickle vent (4000 mm² free area), providing background ventilation to meet Part F of the NBC without opening the sash.' },
      { icon: 'LeafIcon', title: 'UV-Stabilised Compound', body: 'Our UPVC formulation includes a titanium dioxide UV package rated for 50 years colour retention in Mumbai coastal UV levels — no yellowing, no chalking.' },
      { icon: 'RulerIcon', title: 'Flexible Configuration', body: 'Single light, paired opening leaves, fixed-plus-opening combinations, or full-height picture with opening transom above. All welded in our Mumbai factory to a single unit.' },
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
      { label: 'Lead Time', value: '10–12 working days' },
    ],
    applications: ['Mass Housing Schemes', 'Independent Villas', 'School Classrooms', 'Renovation Projects', 'Retail Shopfronts', 'Government Buildings'],
    relatedSlugs: ['tilt-turn', 'french-casement', 'fixed-picture'],
    href: '/products/casement',
    whyChoose: [
      'India\'s most proven UPVC window — over 85,000 units installed',
      'Widest range of hardware and glazing options',
      'Outward swing clears internal curtains and blinds',
      'Lowest entry price for a premium UPVC system',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'BIS IS 14856'],
    installTime: '1–2 hours per window',
    warranty: '10 years on profile, 5 years on hardware',
  },

  /* ── 3. SLIDING 2-TRACK ── */
  {
    id: 'sliding-2track',
    slug: 'sliding-2track',
    category: 'Sliding',
    name: 'Sliding 2-Track',
    tagline: 'Space-saving horizontal slide, perfect for balconies',
    description: 'Horizontal sliding sash on stainless steel rollers. Anti-lift security locks and optional mosquito mesh integration.',
    longDescription: `When floor space is tight or outward swing isn't permitted — balconies, corridors, narrow sills — the Sliding 2-Track is the default choice for millions of Indian homes and the backbone of our volume business.

Two sashes slide on independent stainless-steel tandem roller sets, each rated for 50,000 open-close cycles. The anti-lift security system prevents the sash being lifted off the track from outside — a common method used in burglaries on ground-floor sliding windows. An optional integrated mesh track provides year-round mosquito protection without a separate frame.

Our 4-chamber profile is engineered specifically for the Indian coastal and monsoon climate: UV-stabilised compound, sealed drainage channels, and a recessed sill lip that directs driving rain away from interior finishes. A deep 25 mm sill channel collects any ingress before weep holes drain it externally.

Available in 2-sash (one fixed, one sliding) or 3-sash (one fixed, two sliding) configurations. Widths to 2400 mm, heights to 1800 mm as standard; larger on request with intermediate post. Suitable for both new build and retrofit replacement of existing aluminium sliding windows.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC horizontal sliding window overlooking balcony, white frame',
    badge: { label: 'Most Popular', variant: 'popular' },
    startingPrice: '₹400',
    priceUnit: 'per sq ft',
    rating: 4.7,
    reviews: 834,
    uValue: '1.4 W/m²K',
    acoustic: '38 dB',
    profiles: '4-chamber',
    highlights: [
      'Anti-lift locks',
      'Stainless steel rollers',
      'Mesh-ready track',
      'Monsoon drainage',
      '25 mm deep sill channel',
      '2-sash or 3-sash config',
      'Retrofit ready',
      'UV-stabilised compound',
    ],
    features: [
      { icon: 'RulerIcon', title: 'No Swing Space Needed', body: 'Zero outward projection makes it ideal for balconies, roadside rooms, and any opening adjacent to walkways or furniture. Sash slides behind fixed pane — no clearance required.' },
      { icon: 'ShieldIcon', title: 'Anti-Lift Security', body: 'Mushroom cams in the meeting stile and recessed track clips prevent the sash being lifted from outside. Hook-bolt locking point at mid-rail adds additional forced-entry resistance.' },
      { icon: 'WindIcon', title: 'Integrated Mesh Option', body: 'A third track factory-fitted behind the sash tracks accepts our fibreglass mosquito mesh on independent rollers — slide mesh separately from glazing for ventilation without insects.' },
      { icon: 'ThermometerIcon', title: 'Monsoon-Ready Drainage', body: 'Tiered drainage channels with weep holes in the sill section flush rainwater to the outside. Tested at 600 Pa driving rain with zero water ingress to interior.' },
      { icon: 'LayersIcon', title: 'Smooth SS Roller System', body: 'Tandem stainless-steel rollers on nylon carriers glide on an extruded aluminium track insert. Each roller set carries 80 kg and is field-adjustable for height after installation.' },
      { icon: 'ToolIcon', title: 'Retrofit Compatible', body: 'Frame profile includes a 15 mm rebate that sits over most existing aluminium sub-frames — no chipping, no plastering, and a clean reveal finish on day one.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' },
      { label: 'Chambers', value: '4-chamber' },
      { label: 'U-Value', value: '1.4 W/m²K' },
      { label: 'Acoustic (Rw)', value: '38 dB' },
      { label: 'Max Width', value: '2400 mm (3-sash)' },
      { label: 'Max Height', value: '1800 mm' },
      { label: 'Track System', value: '2-track SS roller' },
      { label: 'Roller Rating', value: '80 kg / set, 50k cycles' },
      { label: 'Sill Channel Depth', value: '25 mm' },
      { label: 'Configurations', value: '2-sash / 3-sash' },
      { label: 'Mesh Track', value: 'Optional 3rd track' },
      { label: 'Colour Options', value: '30+ RAL' },
      { label: 'Wind Resistance', value: 'Class C2 (200 Pa)' },
      { label: 'Water Tightness', value: 'Class E300' },
      { label: 'Locking', value: 'Anti-lift + hook bolt' },
      { label: 'Lead Time', value: '8–10 working days' },
    ],
    applications: ['Balcony Openings', 'Apartment Corridors', 'Affordable Housing', 'Retrofit Replacement', 'Coastal Properties', 'Utility & Service Rooms'],
    relatedSlugs: ['lift-slide', 'fixed-picture', 'louvre'],
    href: '/products/sliding-2track',
    whyChoose: [
      'No outward swing — works in tight balcony and corridor spaces',
      'Integrated mesh track eliminates need for a separate mosquito frame',
      'Fits over most existing aluminium sliding window sub-frames',
      'Lowest cost per sq ft of any opening window in our range',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'BIS IS 14856'],
    installTime: '1.5–2 hours per window',
    warranty: '10 years on profile, 3 years on rollers',
  },

  /* ── 4. FRENCH CASEMENT ── */
  {
    id: 'french-casement',
    slug: 'french-casement',
    category: 'Casement',
    name: 'French Casement',
    tagline: 'Double-leaf, no centre post, unobstructed opening',
    description: 'Two sashes open outward from a central meeting point with no fixed mullion. Espagnolette bolt secures both leaves.',
    longDescription: `The French Casement is the architectural choice when the view matters as much as the window itself. Two full-height sashes meet at the centre with no fixed mullion — opened together they deliver an uninterrupted aperture up to 1800 mm wide and 2200 mm tall.

The Espagnolette bolt system locks the passive (first-close) leaf top and bottom into keeps in the head and sill before the active leaf engages its own 5-point multi-point locks, creating a combined locking sequence that is both secure and elegant. The sequence is intuitive — close passive first, then active — and requires no keys or separate tools.

Ultra-slim 6-chamber frame sections at the meeting stile reduce sight lines to as little as 78 mm across both leaves combined — substantially less than two casement frames placed side by side. When closed, the French Casement reads as a near-seamless glazed panel.

Commonly specified for master bedroom balcony doors, living room feature openings, and heritage renovation projects where period proportions must be respected. Available with low-threshold sill for wheelchair access or flush floor-to-ceiling transitions.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC French casement double window open wide, white frame',
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹650',
    priceUnit: 'per sq ft',
    rating: 4.8,
    reviews: 289,
    uValue: '1.1 W/m²K',
    acoustic: '44 dB',
    profiles: '6-chamber',
    highlights: [
      'No centre mullion',
      'Espagnolette bolt',
      'Slim 78 mm sightline',
      'Full-width opening',
      'Low-threshold sill option',
      'Floor-to-ceiling ready',
      '5-point active locking',
      'Heritage compatible',
    ],
    features: [
      { icon: 'RulerIcon', title: 'No Mullion View', body: 'Meeting stiles are slimmed to 78 mm combined width — visually equivalent to a fixed picture window when closed. When open, the full aperture is unobstructed for furniture movement or balcony access.' },
      { icon: 'ShieldIcon', title: 'Espagnolette Security', body: 'Passive leaf locks top and bottom into frame keeps; active leaf then engages 5-point locks including hook bolt at mid-rail. Both leaves are secured before either can be forced open from outside.' },
      { icon: 'WindIcon', title: 'Full-Width Ventilation', body: 'Open both sashes to expose 100% of the frame aperture — the highest ventilation area achievable in any double-leaf window system. Friction stays hold each leaf at any angle from 10° to 90°.' },
      { icon: 'ThermometerIcon', title: '6-Chamber Profile', body: '70 mm profile depth with thermal break delivers U-Value 1.1 W/m²K with standard double glazing, upgradeable to 0.9 W/m²K with triple glazing and foam-fill.' },
      { icon: 'LayersIcon', title: 'Low-Threshold Option', body: '20 mm accessible sill available for balcony door applications — meets IS 875 Part 3 wind load requirements and provides near-flush transition for wheelchair access.' },
      { icon: 'StarIcon', title: 'Heritage Aesthetics', body: 'Period-correct proportions with authentic putty-line rebate detail available on request. Woodgrain foils in Oak, Mahogany, or Walnut for heritage renovation projects.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '70 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '1.1 W/m²K' },
      { label: 'Acoustic (Rw)', value: '44 dB' },
      { label: 'Max Width', value: '1800 mm' },
      { label: 'Max Height', value: '2200 mm' },
      { label: 'Meeting Stile Width', value: '78 mm (combined)' },
      { label: 'Passive Locking', value: 'Espagnolette (top+bot)' },
      { label: 'Active Locking', value: '5-point multi-point' },
      { label: 'Sill Options', value: 'Standard / 20 mm low' },
      { label: 'Glazing', value: 'Double or Triple IGU' },
      { label: 'Stay Type', value: 'Friction (each leaf)' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Wind Resistance', value: 'Class C3 (400 Pa)' },
      { label: 'Water Tightness', value: 'Class E750' },
      { label: 'Lead Time', value: '14–18 working days' },
    ],
    applications: ['Master Bedroom Balcony Doors', 'Living Room Feature Openings', 'Heritage & Period Buildings', 'Accessible Design Projects', 'Boutique Hotels', 'High-End Residential'],
    relatedSlugs: ['tilt-turn', 'casement', 'fixed-picture'],
    href: '/products/french-casement',
    whyChoose: [
      'Widest unobstructed opening of any double-leaf window type',
      'Espagnolette sequence is intuitive — no tools or keys needed',
      'Period-correct proportions for heritage and conservation projects',
      'Low-threshold sill meets accessibility standards',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'BIS Compliant'],
    installTime: '3–4 hours per unit',
    warranty: '10 years on profile, 5 years on hardware',
  },

  /* ── 5. LIFT & SLIDE ── */
  {
    id: 'lift-slide',
    slug: 'lift-slide',
    category: 'Sliding',
    name: 'Lift & Slide',
    tagline: 'Large-format panels, effortless handle-lift operation',
    description: 'Panel lifts off its seal with a quarter-turn of the handle, then glides on precision rollers. Up to 3 m wide.',
    longDescription: `The Lift & Slide is the system of choice for seamless indoor-outdoor living — contemporary villas, duplex penthouses, and resort developments where the boundary between inside and outside should dissolve.

Unlike a standard sliding door, the panel presses down firmly onto its triple-sealed compression gasket when the handle is closed, achieving thermal and acoustic performance close to a fixed light. The compression seal eliminates the acoustic gap that defeats conventional sliding systems. A quarter-turn of the handle lifts the panel 3 mm off the seal onto low-friction tandem rollers, after which the full panel glides with finger-tip effort regardless of glass weight.

Single panels up to 3000 × 2400 mm weighing 400 kg are supported on precision aluminium-encased tandem roller carriages with stainless steel bearing races. 2, 3, and 4-panel configurations available — panels can stack behind a fixed lite or pocket into a wall cavity. Ultra-slim 20 mm sight-line sill profile option provides near-flush floor transition for barefoot indoor-outdoor living.

Structural performance is specified to IS 875 Part 3 for wind zones 1–4. Certified hurricane-resistant version with laminated glass and enhanced seals available for coastal Tamil Nadu and Kerala projects.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large UPVC lift and slide patio door panel, panoramic garden view',
    badge: { label: 'New', variant: 'new' },
    startingPrice: '₹2500',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 97,
    uValue: '0.9 W/m²K',
    acoustic: '46 dB',
    profiles: '6-chamber',
    highlights: [
      'Up to 3 m panel width',
      '20 mm low-threshold sill',
      'Triple-sealed compression',
      'Finger-tip operation',
      '400 kg panel capacity',
      '2 / 3 / 4-panel configs',
      'Wall-pocket option',
      'Hurricane-rated version',
    ],
    features: [
      { icon: 'RulerIcon', title: '3 m Panel Width', body: 'Individual panels up to 3000 mm wide and 2400 mm tall, weighing up to 400 kg, ride on precision aluminium-encased tandem roller carriages with stainless steel bearing races rated for 20,000 cycles.' },
      { icon: 'ShieldIcon', title: 'Compression Seal When Closed', body: 'When the handle is closed, the panel locks down onto a triple-gasket perimeter seal — thermally and acoustically equivalent to a fixed frame. No gap, no whistle, no thermal bridge.' },
      { icon: 'ThermometerIcon', title: 'Best-in-Class U-Value', body: '6-chamber 82 mm profile with optional foam-fill and triple glazing achieves U-Value 0.9 W/m²K — the lowest of any sliding system in our entire range and better than most casements.' },
      { icon: 'SoundIcon', title: 'Premium Acoustic', body: 'Compression seal eliminates the acoustic gap that defeats standard sliding systems. With 8/16/8 laminated IGU: Rw 46 dB. With 10/16/10.4 laminated: Rw 50 dB — suitable for cinema rooms.' },
      { icon: 'WindIcon', title: 'Flush Floor Transition', body: '20 mm ultra-low sill enables true indoor-outdoor continuity — barefoot transition between living room and terrace. Drain channel at sill perimeter handles 150 mm/hr rainfall.' },
      { icon: 'LayersIcon', title: 'Multi-Panel Configurations', body: '2-panel (one fixed, one sliding), 3-panel, and 4-panel systems. Panels can stack at one end or split to both ends. Wall-pocket (disappearing panel) option available with structural lintel package.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '82 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '0.9 W/m²K' },
      { label: 'Acoustic (Rw)', value: '46–50 dB' },
      { label: 'Max Panel Width', value: '3000 mm' },
      { label: 'Max Panel Height', value: '2400 mm' },
      { label: 'Max Panel Weight', value: '400 kg' },
      { label: 'Roller Rating', value: 'SS bearing, 20k cycles' },
      { label: 'Sill Height', value: '20 mm (flush option)' },
      { label: 'Configurations', value: '2, 3, 4 panels' },
      { label: 'Glazing', value: 'Double or Triple IGU' },
      { label: 'Locking', value: 'Multi-point compression' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Wind Resistance', value: 'Class C5 (800 Pa)' },
      { label: 'Water Tightness', value: 'Class E1200' },
      { label: 'Lead Time', value: '18–22 working days' },
    ],
    applications: ['Luxury Villa Living Rooms', 'Penthouse Terraces', 'Resort Hotel Suites', 'Indoor-Outdoor Entertainment', 'Cinema & AV Rooms', 'Accessible Balcony Access'],
    relatedSlugs: ['sliding-2track', 'bay-window', 'fixed-picture'],
    href: '/products/lift-slide',
    whyChoose: [
      'Only sliding system that matches fixed-frame thermal and acoustic performance',
      'Single handle lifts 400 kg panel — effortless operation at any age',
      '20 mm sill is the lowest threshold available in our range',
      'Panel disappears into wall pocket — zero visual obstruction when open',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'IS 875 Wind Rated', 'Hurricane Resistant Version Available'],
    installTime: '4–6 hours per unit',
    warranty: '10 years on profile, 5 years on roller system',
  },

  /* ── 6. FIXED PICTURE ── */
  {
    id: 'fixed-picture',
    slug: 'fixed-picture',
    category: 'Fixed',
    name: 'Fixed Picture',
    tagline: 'Maximum glazing, zero infiltration, pure views',
    description: 'Fully fixed frame with no moving parts — highest thermal and acoustic performance. Custom shapes available.',
    longDescription: `Where the view is the feature, the Fixed Picture window disappears into it. With no hinges, handles, seals, or gaps, a fixed light achieves the highest thermal and acoustic performance of any window type — a fact that drives its specification in data centres, recording studios, gallery spaces, and premium residential feature walls.

Our Fixed Picture is available in any shape: rectangle, arch, circle, triangle, trapezoid, parallelogram, or fully bespoke CNC-cut profiles. Structural silicone glazing allows glass-to-glass corner joints with a 5 mm visual butt, eliminating frame sections entirely at corners. This creates the illusion of a seamless glass wall when multiple units are installed side by side.

Standard 5-chamber profile is upgradeable to 6-chamber for enhanced performance. Thermal performance is fixed by design — there are no seals to degrade, no hardware to wear, and no gaps to develop over time. The U-Value you achieve on day one is the U-Value you achieve on day 3,650.

Maximum single pane size is limited only by the glass manufacturer's capabilities. We have installed 5000 × 2500 mm lites on commercial projects using our structural silicone system with concealed mechanical fixings. For residential, our standard maximum is 3000 × 2400 mm per pane.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large fixed UPVC picture window, minimal white frame, mountain view',
    startingPrice: '₹500',
    priceUnit: 'per sq ft',
    rating: 4.8,
    reviews: 318,
    uValue: '0.8 W/m²K',
    acoustic: '48 dB',
    profiles: '5-chamber',
    highlights: [
      'Full-frame glazing',
      'Custom shapes',
      'Structural silicone seal',
      'Maximum view',
      'Glass-to-glass corner',
      'Zero moving parts',
      'No seal degradation',
      'Up to 5 m × 2.5 m',
    ],
    features: [
      { icon: 'ThermometerIcon', title: 'Best Thermal Performance', body: 'No opening hardware means no seal degradation over time. U-Value 0.8 W/m²K with triple glazing on day one — and on day 3,650. The only window type where performance is genuinely permanent.' },
      { icon: 'SoundIcon', title: 'Maximum Acoustic Isolation', body: 'No gaps, no seals to fail, no moving parts: Rw 48 dB as standard with 6.4/16/6.4 laminated IGU. Upgrade to 12/20/12.4 for Rw 54 dB — cinema and recording studio grade.' },
      { icon: 'RulerIcon', title: 'Any Shape, Any Size', body: 'CNC-welded corners allow any polygon. Arches, circles, and trapezia are router-cut in our Mumbai factory. Lead time 10 working days. Maximum pane 5000 × 2500 mm on structural silicone system.' },
      { icon: 'LayersIcon', title: 'Structural Silicone Joints', body: 'Glass-to-glass corners with 5 mm silicone butt joint eliminate frame sections entirely at corners — the closest thing to no frame at all. Structural sealant is rated for 25+ years movement fatigue.' },
      { icon: 'ShieldIcon', title: 'Security Glazing Options', body: 'P2A laminated glass (6.4 mm) resists manual attack. P6B security glass resists sustained attack with tools. Ballistic glazing (BR2–BR6) available for high-risk commercial projects.' },
      { icon: 'LeafIcon', title: 'Solar Control Glazing', body: 'Low-e coatings (SHGC 0.25–0.65) and body-tinted glass reduce solar heat gain while maintaining visible light transmission. Reduces HVAC sizing by up to 30% in west-facing elevations.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm (70 mm opt.)' },
      { label: 'Chambers', value: '5-chamber (6 opt.)' },
      { label: 'U-Value', value: '0.8 W/m²K (triple)' },
      { label: 'Acoustic (Rw)', value: '48–54 dB' },
      { label: 'Standard Max Size', value: '3000 × 2400 mm' },
      { label: 'Commercial Max Size', value: '5000 × 2500 mm' },
      { label: 'Shapes', value: 'Any polygon + arch/circle' },
      { label: 'Corner Detail', value: 'Structural silicone butt' },
      { label: 'Glazing Options', value: 'Single / Double / Triple' },
      { label: 'Security Glazing', value: 'P2A to BR6 available' },
      { label: 'Solar Control', value: 'Low-e / Body-tint' },
      { label: 'SHGC Range', value: '0.25 – 0.65' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Wind Resistance', value: 'Project-specific calc' },
      { label: 'Structural Silicone', value: '25-yr movement rated' },
      { label: 'Lead Time', value: '10–14 working days' },
    ],
    applications: ['Feature Walls & Panoramic Views', 'Recording & Broadcast Studios', 'Art Galleries & Museums', 'Data Centres & Server Rooms', 'High-Security Commercial', 'Stairwell Glazing'],
    relatedSlugs: ['tilt-turn', 'casement', 'sliding-2track'],
    href: '/products/fixed-picture',
    whyChoose: [
      'Permanent thermal performance — no seals to degrade over time',
      'Any shape including circles, arches, and bespoke polygons',
      'Glass-to-glass corner joints eliminate visible frame at corners',
      'Widest range of security and solar-control glazing options',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'Structural Silicone: ETAG 002'],
    installTime: '2–3 hours per unit (standard)',
    warranty: '10 years on profile, 25 years on structural silicone joint',
  },

  /* ── 7. BAY WINDOW ── */
  {
    id: 'bay-window',
    slug: 'bay-window',
    category: 'Bay & Bow',
    name: 'Bay Window',
    tagline: 'Three-panel angled projection, light and space',
    description: 'Classic three-panel bay at 30° or 45° projection with structural corner posts and optional integrated seat board.',
    longDescription: `The Bay Window is the most transformative architectural element we manufacture — projecting 300–600 mm beyond the wall plane, flooding the interior with three-directional light, and visually doubling the apparent width of any room it serves.

Our bay consists of a large fixed or opening centre light flanked by two angled sidelights at 30° (shallow projection, suits most masonry reveals) or 45° (deeper projection, maximum light gain). Structural UPVC corner posts with co-extruded aluminium cores carry the full dead load of the glazing and the wind pressure — no steel angle or timber knee brace required, and no penetration of the thermal envelope.

Options include: casement or tilt-turn sidelights for ventilation, integrated painted MDF seat board (30 mm moisture-resistant grade), external soffit liner in white or colour-matched UPVC, and a full range of glazing styles (obscure, solar-control, stained-effect, self-cleaning). The bay is supplied as a factory-assembled unit including corner posts, for single-day installation by our team.

A Bow window variant with 5 or 7 equal-width panels on a curved radius is available for period-property restorations. Both bay and bow units are delivered with a full structural calculation pack for building permit submission.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'White UPVC bay window projecting from living room wall, classic styling',
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹600',
    priceUnit: 'set',
    rating: 4.7,
    reviews: 156,
    uValue: '1.1 W/m²K',
    acoustic: '43 dB',
    profiles: '6-chamber',
    highlights: [
      '30° or 45° angles',
      'Structural corner posts',
      'Seat board option',
      'Factory assembled',
      'No steel knee brace',
      'Bow window variant',
      'Soffit liner option',
      'Structural calc pack',
    ],
    features: [
      { icon: 'RulerIcon', title: '30° or 45° Projection', body: '30° suits most reveals and projects 300–400 mm from the wall face. 45° maximises light capture and projects 400–600 mm. Both are structurally self-supporting without steel or timber sub-frame.' },
      { icon: 'LayersIcon', title: 'Self-Supporting Corner Posts', body: 'Extruded structural UPVC corner posts with co-extruded aluminium core carry dead load and wind pressure to the surrounding masonry without penetrating the thermal envelope of the wall.' },
      { icon: 'WindIcon', title: 'Opening Sidelights', body: 'Sidelights specified as casement or tilt-turn provide controlled ventilation. Centre light is typically fixed to maximise view and structural stability. All combinations factory-assembled.' },
      { icon: 'ThermometerIcon', title: 'Integrated Seat Board', body: 'Moisture-resistant MDF seat board (30 mm, painted) is finished to match the interior frame colour and factory-fitted to corner posts. Site installation is a single-lift operation.' },
      { icon: 'StarIcon', title: 'Bow Window Variant', body: '5-panel or 7-panel bow window on equal-radius curve for period-property restoration. Radius from 1.2 m to 3.5 m. All panels are fixed; opening lights achieved by incorporating tilt-turn within bow frame.' },
      { icon: 'ShieldIcon', title: 'Building Permit Ready', body: 'Every bay and bow unit is supplied with a structural calculation pack including wind load analysis to IS 875 Part 3 — ready for submission to local building authority without additional engineering fees.' },
    ],
    specs: [
      { label: 'Projection Angles', value: '30° and 45°' },
      { label: 'Profile', value: '6-chamber 70 mm' },
      { label: 'U-Value', value: '1.1 W/m²K' },
      { label: 'Acoustic (Rw)', value: '43 dB' },
      { label: 'Centre Width', value: '600–1500 mm' },
      { label: 'Side Width', value: '400–600 mm' },
      { label: 'Projection Depth', value: '300–600 mm' },
      { label: 'Corner Post', value: 'UPVC + aluminium core' },
      { label: 'Seat Board', value: '30 mm MR-MDF (opt.)' },
      { label: 'Soffit Liner', value: 'UPVC (opt.)' },
      { label: 'Glazing Options', value: 'Obscure / Solar / Clear' },
      { label: 'Colour Options', value: '40+ RAL + woodgrain' },
      { label: 'Supply', value: 'Factory-assembled' },
      { label: 'Bow Variant', value: '5 or 7 panels (opt.)' },
      { label: 'Structural Calcs', value: 'Included' },
      { label: 'Lead Time', value: '15–20 working days' },
    ],
    applications: ['Living Room Feature Wall', 'Master Bedroom Bay', 'Period & Heritage Properties', 'Bungalow Front Elevation', 'Ground-Floor Extensions', 'School Common Rooms'],
    relatedSlugs: ['french-casement', 'lift-slide', 'fixed-picture'],
    href: '/products/bay-window',
    whyChoose: [
      'No steel sub-frame needed — structural corner post carries all loads',
      'Factory-assembled unit installs in a single day',
      'Bow variant available for period-property accuracy',
      'Structural calculation pack included for building permit',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'IS 875 Structural Calcs Included'],
    installTime: '1 day (full bay unit)',
    warranty: '10 years on profile, 5 years on hardware',
  },

  /* ── 8. LOUVRE VENT ── */
  {
    id: 'louvre',
    slug: 'louvre',
    category: 'Louvre',
    name: 'Louvre Vent',
    tagline: 'Angled blades, continuous airflow, rain-resistant',
    description: 'Adjustable glass blades allow continuous passive ventilation even during light rain. Monsoon-rated drainage channel.',
    longDescription: `Designed specifically for India's tropical climate, the Louvre Vent delivers what no other window can: continuous passive ventilation that keeps working during light rain and operates entirely without electricity. It is the only window type that can simultaneously ventilate and exclude insects when fitted with mosquito screens between blades.

Between 4 and 8 glass blades (50 mm wide) are held in neoprene-lined aluminium holders and pivot simultaneously via a crank operator. Angle them near-horizontal (15° from vertical) for maximum airflow — equivalent to 65% free area across the frame. Steepen to 75° to deflect driving rain while maintaining a 15% free area for background ventilation.

Our monsoon-rated drainage channel captures any water that penetrates and routes it to external weep holes — tested at 600 Pa simulated driving rain with zero interior ingress. Blade glass is available in clear, tinted, obscure, or wired safety glass. Louvre blades can also be supplied in aluminium for utility and industrial applications.

Correctly sized louvre vents (min. 10% of floor area in free area terms) replace mechanical extract fans entirely in bathrooms and kitchens, eliminating the noise, maintenance, and electricity costs of fans. We provide a free ventilation sizing calculation with every quote.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC louvre vent window with angled glass blades in tropical setting',
    badge: { label: 'Eco Choice', variant: 'eco' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.6,
    reviews: 203,
    uValue: '1.6 W/m²K',
    acoustic: '34 dB',
    profiles: '4-chamber',
    highlights: [
      'Adjustable blade angle',
      'No power needed',
      'Monsoon drainage',
      'Replaces extract fans',
      '65% free area (open)',
      'Insect screen option',
      'Clear / tinted / obscure',
      'Free sizing calculation',
    ],
    features: [
      { icon: 'WindIcon', title: 'Continuous Passive Ventilation', body: '4–8 glass blades open independently of rain — the only window type that ventilates even during a monsoon shower. 65% free area at 15° from vertical blade angle; 15% at near-closed 75°.' },
      { icon: 'ThermometerIcon', title: 'No Electricity Required', body: 'Gravity-driven cross-ventilation replaces mechanical extract fans entirely when correctly sized. We calculate free-area requirements (min. 10% of floor area) and include sizing in every quote at no charge.' },
      { icon: 'RulerIcon', title: 'Adjustable Blade Angle', body: 'Crank operator adjusts all blades simultaneously from 15° (maximum airflow) to 75° (rain exclusion, background ventilation). Locking notch at every 15° — set it and leave it.' },
      { icon: 'LayersIcon', title: 'Monsoon-Rated Drainage', body: 'Deep drainage channel below the blade bank captures any ingress and routes it to external weep holes. Tested at 600 Pa simulated driving rain — equivalent to cyclone fringe conditions.' },
      { icon: 'ShieldIcon', title: 'Insect Exclusion Option', body: 'Fibreglass insect screens fit between each pair of blades on an independent track. Screens do not affect blade operation and can be removed for cleaning without tools.' },
      { icon: 'StarIcon', title: 'Blade Material Options', body: 'Standard blades are 5 mm clear float glass. Tinted (grey/bronze), obscure (acid-etched), and wired safety glass available. Aluminium blades for industrial/utility applications where glass breakage is a risk.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' },
      { label: 'Chambers', value: '4-chamber' },
      { label: 'U-Value', value: '1.6 W/m²K' },
      { label: 'Acoustic (Rw)', value: '34 dB (open 12 dB)' },
      { label: 'Blade Count', value: '4–8 blades' },
      { label: 'Blade Width', value: '50 mm each' },
      { label: 'Blade Material', value: 'Glass or aluminium' },
      { label: 'Glass Thickness', value: '5 mm' },
      { label: 'Free Area (open)', value: '65% at 15° angle' },
      { label: 'Free Area (near-closed)', value: '15% at 75° angle' },
      { label: 'Operation', value: 'Crank + 15° locking' },
      { label: 'Insect Screen', value: 'Optional per blade gap' },
      { label: 'Drainage', value: 'Deep channel + weeps' },
      { label: 'Wind Rating', value: 'Tested at 600 Pa rain' },
      { label: 'Glass Options', value: 'Clear / Tinted / Obscure / Wired' },
      { label: 'Lead Time', value: '8–10 working days' },
    ],
    applications: ['Bathrooms & WCs', 'Kitchen Extraction', 'Stairwells & Lift Lobbies', 'Utility & Laundry Rooms', 'Retail Back-of-House', 'Car Park Ventilation'],
    relatedSlugs: ['sliding-2track', 'fixed-picture', 'casement'],
    href: '/products/louvre',
    whyChoose: [
      'Only window that ventilates continuously during light rain',
      'Replaces mechanical extract fans — no electricity, no maintenance',
      'Insect screens between blades — ventilate without mosquitoes',
      'Free ventilation sizing calculation with every quote',
    ],
    certifications: ['CE Marked', 'ISO 9001', 'BIS Compliant'],
    installTime: '2–3 hours per unit',
    warranty: '10 years on profile and frame, 3 years on blade hardware',
  },
];

/* ─────────────────────────────────────────────
   Badge styles
───────────────────────────────────────────── */
const badgeStyles: Record<string, string> = {
  popular: 'bg-primary/10 text-primary border-primary/20',
  new: 'bg-accent/10 text-accent border-accent/20',
  premium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  eco: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
};

function Badge({ label, variant }: { label: string; variant: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-700 px-3 py-1 rounded-full border ${badgeStyles[variant]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      {label}
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
   Related Card
───────────────────────────────────────────── */
function RelatedCard({ product }: { product: ProductDetail }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={product.href}
      className="group block rounded-2xl border border-border/60 bg-card overflow-hidden"
      style={{
        boxShadow: hovered ? '0 20px 48px -8px rgba(0,0,0,0.14)' : '0 2px 8px -2px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-36 overflow-hidden bg-secondary/30">
        <AppImage
          src={product.image}
          alt={product.imageAlt}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${hovered ? 'scale-[1.08]' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-500 text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm font-700 text-foreground leading-tight">{product.name}</p>
        <p className="text-xs font-400 text-muted-foreground mt-1 leading-snug line-clamp-2">{product.tagline}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
          <p className="text-sm font-700 text-foreground">{product.startingPrice}</p>
          <span className="text-xs font-600 text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            View <Icon name="ArrowRightIcon" size={11} />
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
  const bodyRef = useRef<HTMLDivElement>(null);
  const heroView = useInView(heroRef, { once: true });
  const bodyView = useInView(bodyRef, { once: true, margin: '-60px' });

  const [tab, setTab] = useState<'features' | 'specs'>('features');

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-700 text-foreground">Product not found</p>
        <p className="text-xs font-400 text-muted-foreground font-mono bg-secondary px-3 py-1 rounded">
          slug: &quot;{slug}&quot;
        </p>
        <Link href="/#products" className="btn-primary inline-flex items-center gap-2">
          <Icon name="ArrowLeftIcon" size={14} />
          Back to Products
        </Link>
      </main>
    );
  }

  const relatedProducts = product.relatedSlugs
    .map((s) => allProducts.find((p) => p.slug === s))
    .filter(Boolean) as ProductDetail[];

  return (
    <main className="min-h-screen mt-[100px] bg-background">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 h-[520px] sm:h-[580px] lg:h-[640px]">
          <AppImage src={product.image} alt={product.imageAlt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20 items-center min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">

            {/* Left */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-5">
              <motion.div className="flex items-center gap-2.5 flex-wrap"
                initial={{ opacity: 0, y: 16 }} animate={heroView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}>
                <Link href="/#products" className="inline-flex items-center gap-1.5 text-xs font-500 text-foreground hover:text-foreground transition-colors bg-background/95 border border-border/70 px-3 py-1.5 rounded-full shadow-sm">
                  <Icon name="ArrowLeftIcon" size={11} /> All Products
                </Link>
                <span className="text-xs font-500 text-foreground bg-background/95 border border-border/70 px-3 py-1.5 rounded-full shadow-sm">{product.category}</span>
                {product.badge && <Badge label={product.badge.label} variant={product.badge.variant} />}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-800 tracking-tight text-foreground leading-[1.02]"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
                  {product.name}
                </h1>
                <p className="mt-3 text-base sm:text-lg font-600 text-primary leading-snug">{product.tagline}</p>
              </motion.div>

              <motion.p className="text-sm sm:text-base font-400 text-foreground/90 leading-relaxed max-w-lg"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.10)' }}
                initial={{ opacity: 0, y: 14 }} animate={heroView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
                {product.description}
              </motion.p>

              <motion.div className="flex items-center gap-2"
                initial={{ opacity: 0 }} animate={heroView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                <Stars rating={product.rating} />
                <span className="text-sm font-700 text-foreground">{product.rating}</span>
                <span className="text-sm font-400 text-foreground/80">({product.reviews} verified reviews)</span>
              </motion.div>

              <motion.div className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }} animate={heroView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }}>
                {product.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1.5 text-xs font-500 text-foreground bg-background/95 backdrop-blur-sm border border-border/80 px-3 py-1.5 rounded-full shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{h}
                  </span>
                ))}
              </motion.div>

              {/* Mobile CTA */}
              <motion.div className="flex items-center gap-3 lg:hidden pt-1"
                initial={{ opacity: 0, y: 10 }} animate={heroView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
                <Link href="/product-configurator" className="btn-primary flex-1 justify-center text-sm">
                  Get Quote <Icon name="ArrowRightIcon" size={14} />
                </Link>
                <Link href="/book-survey" className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl border border-border/80 text-sm font-500 text-foreground hover:bg-secondary/60 transition-colors">
                  Book Survey
                </Link>
              </motion.div>
            </div>

            {/* Right: pricing card */}
            <motion.div className="lg:col-span-5 hidden lg:flex items-center justify-end"
              initial={{ opacity: 0, x: 24 }} animate={heroView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <div className="w-full max-w-sm bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: 'U-Value', value: product.uValue },
                    { label: 'Acoustic', value: product.acoustic },
                    { label: 'Profile', value: product.profiles },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3.5 rounded-2xl bg-secondary/80 border border-border/30">
                      <span className="text-xs font-700 text-primary text-center leading-tight">{s.value}</span>
                      <span className="text-[9px] font-500 text-muted-foreground uppercase tracking-widest">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Quick facts */}
                {(product.installTime || product.warranty) && (
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {product.installTime && (
                      <div className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl bg-secondary/50 border border-border/30">
                        <span className="text-[9px] font-700 text-muted-foreground uppercase tracking-widest">Install</span>
                        <span className="text-xs font-600 text-foreground leading-tight">{product.installTime}</span>
                      </div>
                    )}
                    {product.warranty && (
                      <div className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl bg-secondary/50 border border-border/30">
                        <span className="text-[9px] font-700 text-muted-foreground uppercase tracking-widest">Warranty</span>
                        <span className="text-xs font-600 text-foreground leading-tight">{product.warranty.split(',')[0]}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="h-px bg-border/50 mb-5" />

                <div className="mb-5">
                  <p className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.2em] mb-1">Starting from</p>
                  <p className="text-4xl font-800 text-foreground tracking-tight leading-none">{product.startingPrice}</p>
                  <p className="text-xs font-400 text-muted-foreground mt-1.5">{product.priceUnit} · including installation</p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link href="/product-configurator" className="btn-primary w-full justify-center py-3">
                    Configure &amp; Get Quote <Icon name="ArrowRightIcon" size={15} />
                  </Link>
                </div>

                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-center gap-4">
                  {['ISO Certified', 'Made in Mumbai', '10-yr Warranty'].map((t) => (
                    <span key={t} className="text-[9px] font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary/60" />{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div ref={bodyRef} className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-24 lg:space-y-28">

          {/* ── About + Applications + Why Choose ── */}
          <motion.section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
            initial={{ opacity: 0, y: 28 }} animate={bodyView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>

            <div className="lg:col-span-7 space-y-10">
              {/* Long description */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-6 h-0.5 bg-primary rounded-full" />
                  <span className="section-label">About This Product</span>
                </div>
                <div className="space-y-4 text-sm sm:text-base font-400 text-muted-foreground leading-relaxed">
                  {product.longDescription.split('\n\n').map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              </div>

              {/* Why Choose */}
              {product.whyChoose && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="block w-6 h-0.5 bg-primary rounded-full" />
                    <span className="section-label">Why Choose This</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.whyChoose.map((w, i) => (
                      <motion.div key={i}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10"
                        initial={{ opacity: 0, y: 10 }} animate={bodyView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.07 }}>
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name="CheckIcon" size={9} className="text-primary" />
                        </div>
                        <p className="text-xs font-500 text-foreground leading-snug">{w}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: Applications + Certifications */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-700 text-muted-foreground uppercase tracking-[0.18em] mb-4">Best Suited For</p>
                <div className="flex flex-col gap-2.5">
                  {product.applications.map((app, i) => (
                    <motion.div key={app}
                      className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-secondary/50 border border-border/40 hover:border-primary/20 hover:bg-secondary/80 transition-colors"
                      initial={{ opacity: 0, x: 16 }} animate={bodyView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.06 }}>
                      <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                        <Icon name="CheckIcon" size={11} className="text-primary" />
                      </div>
                      <span className="text-sm font-600 text-foreground">{app}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {product.certifications && (
                <div>
                  <p className="text-xs font-700 text-muted-foreground uppercase tracking-[0.18em] mb-3">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((c) => (
                      <span key={c} className="text-xs font-500 text-foreground bg-secondary/80 border border-border/50 px-3 py-1.5 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile pricing card */}
              <div className="lg:hidden bg-card border border-border/50 rounded-3xl p-5 shadow-lg">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'U-Value', value: product.uValue },
                    { label: 'Acoustic', value: product.acoustic },
                    { label: 'Profile', value: product.profiles },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3 rounded-xl bg-secondary/80">
                      <span className="text-xs font-700 text-primary text-center leading-tight">{s.value}</span>
                      <span className="text-[9px] font-500 text-muted-foreground uppercase tracking-widest">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/40 pt-4">
                  <p className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.15em]">Starting from</p>
                  <p className="text-3xl font-800 text-foreground mt-1">{product.startingPrice}</p>
                  <p className="text-xs font-400 text-muted-foreground mt-1">{product.priceUnit} · including installation</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Features / Specs tabs ── */}
          <motion.section initial={{ opacity: 0, y: 28 }} animate={bodyView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="block w-6 h-0.5 bg-primary rounded-full" />
                <span className="section-label">Details</span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-secondary/70 border border-border/40 rounded-2xl">
                {(['features', 'specs'] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`relative px-5 py-2 rounded-xl text-sm font-500 transition-colors duration-200 ${tab === t ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {tab === t && (
                      <motion.span layoutId="detail-tab-pill" className="absolute inset-0 bg-primary rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                    <span className="relative z-10 capitalize">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'features' ? (
                <motion.div key="features" className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {product.features.map((f, i) => (
                    <motion.div key={f.title} className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-border/80 hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                        <Icon name={f.icon} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-700 text-foreground mb-1.5">{f.title}</p>
                        <p className="text-xs font-400 text-muted-foreground leading-relaxed">{f.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="specs" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {product.specs.map((s, i) => (
                    <motion.div key={s.label} className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-card border border-border/50 hover:border-border/80 hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                      <span className="text-[9px] font-700 text-muted-foreground uppercase tracking-[0.18em]">{s.label}</span>
                      <span className="text-sm sm:text-base font-700 text-foreground leading-tight">{s.value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ── Related products ── */}
          {relatedProducts.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 28 }} animate={bodyView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.18 }}>
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="block w-6 h-0.5 bg-primary rounded-full" />
                  <span className="section-label">You Might Also Consider</span>
                </div>
                <Link href="/#products" className="text-xs font-500 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  View all <Icon name="ArrowRightIcon" size={11} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {relatedProducts.map((rp) => <RelatedCard key={rp.id} product={rp} />)}
              </div>
            </motion.section>
          )}

          {/* ── CTA Banner ── */}
          <motion.div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card"
            initial={{ opacity: 0, y: 20 }} animate={bodyView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.24 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-800 text-foreground leading-tight">
                  Ready for a quote on {product.name}?
                </p>
                <p className="text-sm font-400 text-muted-foreground mt-2 max-w-md">
                  Our specialists visit, measure, and recommend — completely free. No obligation.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
                <Link href="/product-configurator" className="btn-primary whitespace-nowrap">
                  Configure Windows <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}