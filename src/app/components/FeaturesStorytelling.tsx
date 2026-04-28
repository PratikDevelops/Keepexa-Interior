'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const features = [
{
  id: 'noise',
  label: 'Acoustic Performance',
  headline: 'The city outside stays outside.',
  stat: '42dB',
  statLabel: 'noise reduction',
  body: 'Our triple-glazed acoustic units reduce external noise by up to 42dB, equivalent to silencing a busy Mumbai road to a quiet library. Engineered for homes near traffic corridors, metro lines, and busy city centres across India.',
  detail: 'Laminated acoustic interlayer · Asymmetric glass configuration · Foam-filled frame cavities',
  icon: 'SpeakerXMarkIcon',
  image: "/assets/images/acoustic-performance.png",
  imageAlt: 'Serene quiet bedroom interior with large UPVC windows, soft morning light, peaceful atmosphere away from city noise',
  reverse: false,
  accent: '#2C4A6E'
},
{
  id: 'energy',
  label: 'Thermal Efficiency',
  headline: 'Cool interiors. Lower electricity bills.',
  stat: '₹28,000',
  statLabel: 'avg. annual AC saving',
  body: 'Keepexa Interiors windows achieve SHGC values as low as 0.25, blocking up to 75% of solar heat gain. Our thermally broken frames eliminate heat bridging and keep interiors cool even in 45°C Indian summers without overworking your AC.',
  detail: 'SHGC from 0.25 · BEE 5-Star rated · Argon-filled cavities · Low-E coating · UV protection',
  icon: 'FireIcon',
  image: "/assets/images/thermal-efficiency.png",
  imageAlt: 'Cool comfortable Indian living room interior with warm lighting, UPVC windows blocking harsh sunlight, relaxed indoor atmosphere',
  reverse: true,
  accent: '#5B7FA8'
},
{
  id: 'weather',
  label: 'Monsoon & Dust Resistance',
  headline: 'Built for forty years of Indian weather.',
  stat: '40yr',
  statLabel: 'performance guarantee',
  body: 'Tested to Class 4 wind resistance at 1050 Pa, Class E900 water tightness, and Class 4 air permeability. Our multi-point locking systems and reinforced corners ensure your home stays sealed through monsoon storms, coastal humidity, and desert dust.',
  detail: 'Class 4 wind resistance · E900 watertight seal · Anti-corrosion hardware · UV-stable colour finish · Dust-proof seals',
  icon: 'CloudIcon',
  image: "/assets/images/monsoon-and-dust-resistance.png",
  imageAlt: 'Modern Indian house exterior in heavy monsoon rain with UPVC windows keeping interiors dry, dramatic stormy sky and warm indoor lighting visible',
  reverse: false,
  accent: '#8BA7C7'
}];


function FeatureRow({ feature, index }: {feature: typeof features[0];index: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      id={feature.id}
      className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
      
      {/* Image Side */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: feature.reverse ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
        
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-strong group">
          <AppImage
            src={feature.image}
            alt={feature.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-103" />
          
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          {/* Stat overlay */}
          <div className="absolute bottom-5 left-5 glass-card px-5 py-4 rounded-2xl">
            <p className="text-2xl sm:text-3xl font-800 text-primary leading-none">{feature.stat}</p>
            <p className="text-xs font-600 text-muted-foreground uppercase tracking-wide mt-1">
              {feature.statLabel}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col gap-5"
        initial={{ opacity: 0, x: feature.reverse ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>
        
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
            <Icon name={feature.icon as 'SpeakerXMarkIcon'} size={18} className="text-primary" />
          </div>
          <span className="section-label">{feature.label}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight leading-tight text-foreground">
          {feature.headline}
        </h2>

        <p className="text-base text-muted-foreground leading-relaxed font-400">
          {feature.body}
        </p>

        <div className="p-4 rounded-2xl bg-secondary/80 border border-border/60">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-2">
            Technical Specification
          </p>
          <div className="flex flex-wrap gap-2">
            {feature.detail.split(' · ').map((spec) =>
            <span
              key={spec}
              className="text-xs font-500 text-foreground bg-white px-3 py-1.5 rounded-lg border border-border/60 shadow-soft">
                {spec}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>);

}

export default function FeaturesStorytelling() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          className="text-center mb-14 lg:mb-28"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          
          <span className="section-label block mb-4">Engineering Matters</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-800 tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
            Every detail engineered to perform.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            Three performance pillars that set Keepexa Interior apart — engineered specifically for India's demanding climate.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 lg:gap-28">
          {features.map((feature, index) =>
          <FeatureRow key={feature.id} feature={feature} index={index} />
          )}
        </div>
      </div>
    </section>);

}