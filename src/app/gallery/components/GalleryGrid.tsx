'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type FilterKey = 'all' | 'residential' | 'commercial' | 'heritage';

interface Project {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  category: FilterKey;
  type: string;
  windows: string;
  year: string;
  span?: string;
}

const projects: Project[] = [
  {
    id: 'kensington',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_13b106961-1764673107155.png',
    alt: 'Modern detached home with anthracite grey UPVC casement windows, white render exterior, manicured garden',
    title: 'Kensington Residence',
    location: 'London, W8',
    category: 'residential',
    type: 'Full Replacement',
    windows: '14 casement',
    year: '2025',
    span: 'md:col-span-2',
  },
  {
    id: 'salford',
    src: 'https://images.unsplash.com/photo-1722122278797-e3d012b9543e',
    alt: 'Contemporary apartment building facade with slim-profile white UPVC windows, glass balustrades',
    title: 'Salford Apartments',
    location: 'Manchester, M3',
    category: 'commercial',
    type: 'New Build',
    windows: '42 units',
    year: '2025',
  },
  {
    id: 'clifton',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_12b111869-1772714398507.png',
    alt: 'Victorian period terraced house with sympathetically designed white UPVC sash windows',
    title: 'Clifton Period Terrace',
    location: 'Bristol, BS8',
    category: 'heritage',
    type: 'Heritage Sash',
    windows: '10 sash',
    year: '2024',
  },
  {
    id: 'shoreditch',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_14d1a4ffa-1772060949097.png',
    alt: 'Minimalist loft interior with floor-to-ceiling UPVC tilt-and-turn windows, white walls, exposed concrete',
    title: 'Shoreditch Loft',
    location: 'London, E1',
    category: 'residential',
    type: 'Bespoke Tilt & Turn',
    windows: '6 tilt-turn',
    year: '2024',
    span: 'md:col-span-2',
  },
  {
    id: 'harrogate',
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1964f2603-1776518770496.png',
    alt: 'Detached Yorkshire stone farmhouse conversion with cream UPVC windows',
    title: 'Harrogate Farmhouse',
    location: 'Harrogate, HG1',
    category: 'heritage',
    type: 'Farmhouse Casement',
    windows: '18 casement',
    year: '2024',
  },
  {
    id: 'canary',
    src: 'https://images.unsplash.com/photo-1629800988475-981ca9ae24b6',
    alt: 'Modern glass office building facade with floor-to-ceiling UPVC curtain glazing',
    title: 'Canary Wharf Offices',
    location: 'London, E14',
    category: 'commercial',
    type: 'Commercial Curtain',
    windows: '80+ panels',
    year: '2023',
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'heritage', label: 'Heritage' },
];

const categoryColors: Record<FilterKey, string> = {
  all: 'bg-primary/10 text-primary border-primary/20',
  residential: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  commercial: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  heritage: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
};

/* ─────────────────────────────────────────────
   Lightbox Component
───────────────────────────────────────────── */
interface LightboxProps {
  project: Project;
  allProjects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

function Lightbox({ project, allProjects, onClose, onNavigate }: LightboxProps) {
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allProjects.length - 1;

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(allProjects[currentIndex + 1]);
  }, [hasNext, currentIndex, allProjects, onNavigate]);

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(allProjects[currentIndex - 1]);
  }, [hasPrev, currentIndex, allProjects, onNavigate]);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Main container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 py-6 sm:px-10 sm:py-8">

        {/* Top bar */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-4 shrink-0">
          {/* Project counter */}
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs font-600 tabular-nums">
              {currentIndex + 1} / {allProjects.length}
            </span>
            {/* Dot indicators */}
            <div className="hidden sm:flex items-center gap-1">
              {allProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate(allProjects[i])}
                  className={`rounded-full transition-all duration-200 ${
                    i === currentIndex
                      ? 'w-5 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Category tag */}
          <span className={`text-[10px] font-700 uppercase tracking-wider px-3 py-1.5 rounded-full border ${categoryColors[project.category]}`}>
            {project.category}
          </span>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-600 transition-colors group"
          >
            <span className="hidden sm:inline">Close</span>
            <span className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>

        {/* Image + nav row */}
        <div className="relative w-full max-w-6xl flex items-center justify-center gap-3 sm:gap-4 flex-1 min-h-0">

          {/* Prev button */}
          <button
            onClick={goPrev}
            disabled={!hasPrev}
            className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
              hasPrev
                ? 'bg-white/10 hover:bg-white/20 border-white/15 hover:border-white/25 text-white hover:-translate-x-0.5'
                : 'bg-white/4 border-white/8 text-white/20 cursor-not-allowed'
            }`}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Image frame */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="relative flex-1 h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 border border-white/10"
              style={{ maxHeight: 'min(70vh, 620px)' }}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <AppImage
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover"
              />

              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating type badge */}
              <div className="absolute top-4 left-4">
                <span className="text-xs font-700 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  {project.type}
                </span>
              </div>

              {/* Year badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-600 text-white/80 bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                  {project.year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next button */}
          <button
            onClick={goNext}
            disabled={!hasNext}
            className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
              hasNext
                ? 'bg-white/10 hover:bg-white/20 border-white/15 hover:border-white/25 text-white hover:translate-x-0.5'
                : 'bg-white/4 border-white/8 text-white/20 cursor-not-allowed'
            }`}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Bottom info panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id + '-info'}
            className="w-full max-w-6xl mt-4 shrink-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4">

              {/* Left: title + location */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon name="HomeIcon" size={16} className="text-white/70" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-700 text-white leading-tight">{project.title}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Icon name="MapPinIcon" size={11} className="text-white/40" />
                    <span className="text-xs text-white/50 font-500">{project.location}</span>
                  </div>
                </div>
              </div>

              {/* Centre: specs */}
              <div className="hidden sm:flex items-center gap-1 text-white/50 text-xs">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/8">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-wider text-white/35 font-600">Windows</span>
                    <span className="text-xs font-800 text-white/80 mt-0.5">{project.windows}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-wider text-white/35 font-600">Type</span>
                    <span className="text-xs font-800 text-white/80 mt-0.5">{project.type}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-wider text-white/35 font-600">Year</span>
                    <span className="text-xs font-800 text-white/80 mt-0.5">{project.year}</span>
                  </div>
                </div>
              </div>

              {/* Right: CTA */}
              <Link
                href="/product-configurator"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-xs font-700 hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 shrink-0"
              >
                Configure Similar
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Keyboard hint */}
        <div className="mt-3 flex items-center gap-3 text-white/25 text-[10px] font-500 shrink-0">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono text-[9px]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono text-[9px]">→</kbd>
            Navigate
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono text-[9px]">Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Gallery Component
───────────────────────────────────────────── */
export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleOpen = (project: Project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);
  const handleNavigate = (project: Project) => setSelectedProject(project);

  /* Navigate within filtered set when lightbox is open */
  const lightboxProjects = selectedProject
    ? (activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter))
    : [];

  return (
    <>
      <section className="py-10 sm:py-14 pb-16 sm:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Filter tabs */}
          <motion.div
            ref={ref}
            className="flex flex-wrap gap-2 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-600 transition-all duration-200 ${
                  activeFilter === f.key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-secondary/80 text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {f.label}
                {activeFilter === f.key && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 bg-primary rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[280px] sm:auto-rows-[340px] md:auto-rows-[380px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-medium ${project.span || ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  onClick={() => handleOpen(project)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <AppImage
                    src={project.src}
                    alt={project.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Expand icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <svg viewBox="0 0 16 16" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M5 2H2v3M14 5V2h-3M2 11v3h3M11 14h3v-3M6 6l4 4M10 6L6 10" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="glass-card text-xs font-600 text-foreground px-3 py-1.5 rounded-full border border-white/50">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="glass-card text-xs font-600 text-muted-foreground px-2.5 py-1.5 rounded-full border border-white/40">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg sm:text-xl font-700 text-white mb-1">{project.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Icon name="MapPinIcon" size={13} className="text-accent" />
                        <span className="text-sm text-white/70 font-500">{project.location}</span>
                      </div>
                      <span className="text-xs text-white/60 font-500">{project.windows}</span>
                    </div>

                    {/* Tap hint */}
                    <div className="mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 text-xs font-600 text-white/70">
                        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M8 2v6M5 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="2" y="10" width="12" height="4" rx="1.5" />
                        </svg>
                        Click to view full image
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            className="mt-10 sm:mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-base text-muted-foreground mb-5">
              Ready to add your home to the gallery?
            </p>
            <Link href="/product-configurator" className="btn-primary inline-flex">
              Start Your Configuration
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox portal */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            allProjects={lightboxProjects}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
}