'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  quote: "Keepexa Interior transformed our Bandra apartment. The acoustic difference was immediately noticeable — we live 50 metres from the Western Express Highway and now barely hear it. The finish looks absolutely premium.",
  name: 'Priya Venkataraman',
  role: 'Homeowner, Mumbai',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1712f5c9a-1774901987372.png",
  avatarAlt: 'Priya Venkataraman, satisfied homeowner from Mumbai, woman with warm smile',
  stars: 5,
  detail: '12 casement windows · Pearl White'
},
{
  quote: "The online configurator made the whole process so easy. I knew exactly what I was getting before anyone visited. Installation was flawless — two days, no mess, no drama. Our electricity bill dropped by ₹2,400 per month!",
  name: 'Arjun Mehta',
  role: 'Homeowner, Bengaluru',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1277d2494-1773106564255.png",
  avatarAlt: 'Arjun Mehta, homeowner from Bengaluru, man with glasses and friendly expression',
  stars: 5,
  detail: '8 sliding windows · Anthracite Grey'
},
{
  quote: "We specified Keepexa Interior across a 56-unit residential project in Gurugram. Delivery was on schedule, the thermal performance exceeded our ECBC calculations, and the site team were professional throughout. Will specify again.",
  name: 'Kavitha Nair',
  role: 'Project Architect, Delhi NCR',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_134f328e7-1763295186862.png",
  avatarAlt: 'Kavitha Nair, project architect from Delhi NCR, woman with professional appearance',
  stars: 5,
  detail: '56-unit residential scheme'
}];


export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          
          <span className="section-label block mb-3">What Clients Say</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground">
            Real homes. Real results.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {testimonials?.map((t, i) =>
          <motion.div
            key={t?.name}
            className="p-5 sm:p-7 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}>
            
              <div className="flex items-center gap-1">
                {Array.from({ length: t?.stars })?.map((_, si) =>
              <Icon key={si} name="StarIcon" size={14} variant="solid" className="text-amber-400" />
              )}
              </div>

              <blockquote className="text-sm text-foreground leading-relaxed font-400 flex-1">
                &ldquo;{t?.quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-border/60 flex items-start gap-3">
                <AppImage
                src={t?.avatar}
                alt={t?.avatarAlt}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover shrink-0" />
              
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-700 text-foreground">{t?.name}</p>
                  <p className="text-xs text-muted-foreground">{t?.role}</p>
                  <span className="inline-block mt-1 text-xs font-500 text-accent bg-accent/10 px-2.5 py-1 rounded-lg">
                    {t?.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Banner */}
        <motion.div
          ref={ctaRef}
          className="relative rounded-3xl overflow-hidden bg-primary p-8 sm:p-10 lg:p-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-[60px]" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6">
            <div className="flex -space-x-3 mb-2">
              {[
              { src: "/assets/images/testimonial-1.png", alt: 'Satisfied Keepexa Interiors customer' },
              { src: "/assets/images/testimonial-2.png", alt: 'Happy homeowner after installation' },
              { src: "/assets/images/testimonial-3.png", alt: 'Pleased customer with new windows' }].
              map((img, i) =>
              <AppImage
                key={i}
                src={img?.src}
                alt={img?.alt}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-primary object-cover" />
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 text-white tracking-tight max-w-2xl leading-tight">
              Ready to experience engineered silence in your home?
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-400 max-w-md">
              Configure your windows online in under 5 minutes. Get an instant price in ₹, then book a free home survey anywhere in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/product-configurator"
                className="bg-white text-primary font-700 px-6 sm:px-8 py-3.5 rounded-xl hover:bg-accent/20 hover:text-black transition-all duration-300 text-sm flex items-center gap-2 justify-center">
                Start Configuring
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );


}