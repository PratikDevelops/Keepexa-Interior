'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const projects = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1438e7194-1769491381226.png",
  alt: 'Modern luxury villa in Mumbai with anthracite grey UPVC casement windows, white render exterior, well-maintained garden, bright daylight',
  title: 'Bandra Luxury Villa',
  location: 'Mumbai, Maharashtra',
  type: 'Full Replacement',
  span: 'md:col-span-2'
},
{
  src: "https://images.unsplash.com/photo-1700682274971-a0f29a99d8b9",
  alt: 'Contemporary apartment building facade in Bengaluru with slim-frame UPVC windows, glass balconies, urban setting, clear blue sky',
  title: 'Whitefield Apartments',
  location: 'Bengaluru, Karnataka',
  type: 'New Build',
  span: ''
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf66db68-1776519482508.png",
  alt: 'Heritage bungalow in Mumbai with sympathetic white UPVC sash windows, traditional architecture, period-appropriate style',
  title: 'Koregaon Park Bungalow',
  location: 'Mumbai, Maharashtra',
  type: 'Heritage Style',
  span: ''
},
{
  src: "https://images.unsplash.com/photo-1627382385242-d41b912877eb",
  alt: 'Minimalist penthouse interior in Hyderabad with floor-to-ceiling UPVC tilt-and-turn windows, white walls, polished marble floor, abundant light',
  title: 'Jubilee Hills Penthouse',
  location: 'Hyderabad, Telangana',
  type: 'Bespoke Glazing',
  span: 'md:col-span-2'
}];


export default function GalleryPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          
          <div>
            <span className="section-label block mb-3">Project Gallery</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground">
              Windows that transform spaces.
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm font-600 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group whitespace-nowrap shrink-0">
            View all projects
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[280px] sm:auto-rows-[320px] md:auto-rows-[340px]">
          {projects?.map((project, index) =>
          <motion.div
            key={project?.title}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-medium ${project?.span}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 }}>
            
              <AppImage
              src={project?.src}
              alt={project?.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              {/* Type badge */}
              <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full border border-white/40">
                <span className="text-xs font-600 text-foreground">{project?.type}</span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-700 text-white mb-1">{project?.title}</h3>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Icon name="MapPinIcon" size={13} className="text-accent" />
                  <span className="text-xs font-500">{project?.location}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );


}