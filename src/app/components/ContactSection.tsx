'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full h-12 px-4 rounded-xl border border-border/80 bg-white text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200';

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left: Info */}
          <motion.div
            ref={ref}
            className="flex flex-col gap-6 sm:gap-7"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="section-label block mb-3">Get In Touch</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground leading-tight">
                Let&apos;s talk about your project.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mt-4">
                Whether you have a question about products, need a quote for a project, or want to book a free home survey we&apos;re here. Serving Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Mumbai and more.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {[
                { icon: 'PhoneIcon', label: 'Phone', value: '+91 73710 73711', sub: 'Mon–Sat 9am–7pm IST' },
                { icon: 'EnvelopeIcon', label: 'Email', value: 'admin@keepexa.in', sub: 'Response within 2 hours' },
                { icon: 'MapPinIcon', label: 'Head Office', value: 'Maruti Niwas, BSNL colony, Opp IIT Main Gate, Powai, Mumbai – 400076, Maharashtra', sub: 'Open Mon–Sat, appointment preferred' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 sm:gap-4 p-4 rounded-2xl bg-secondary/60 border border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={item.icon as 'PhoneIcon'} size={17} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm font-600 text-foreground mt-0.5 break-words">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* City coverage */}
            <div className="p-4 rounded-2xl bg-secondary/60 border border-border/50">
              <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-3">We Serve Across India</p>
              <div className="flex flex-wrap gap-2">
                {['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Chandigarh'].map((city) => (
                  <span key={city} className="text-xs font-500 text-foreground bg-white px-3 py-1.5 rounded-lg border border-border/60">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="bg-card rounded-3xl border border-border/60 shadow-medium p-5 sm:p-7 lg:p-9"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center gap-5 py-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="CheckIcon" size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-800 text-foreground">Message received.</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Thank You, {form.name || 'there'}! We&apos;ll be in touch within 2 hours during business hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="text-sm font-600 text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-lg font-700 text-foreground mb-1">Send us a message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Name</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+91 73710 73711"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Email</label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Message</label>
                  <textarea
                    className={`${inputClass} h-28 py-3 resize-none`}
                    placeholder="Tell us about your project — city, number of windows, property type..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary justify-center mt-1">
                  Send Message
                  <Icon name="PaperAirplaneIcon" size={16} />
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. Your details are used only to respond to your enquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}