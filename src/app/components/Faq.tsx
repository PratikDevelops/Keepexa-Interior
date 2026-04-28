'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type FaqCategory = 'All' | 'Products' | 'Installation' | 'Warranty' | 'Pricing' | 'After-Sales';

interface Faq {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const faqs: Faq[] = [
  // Products
  {
    id: 'p1',
    category: 'Products',
    question: 'What UPVC profile grade do Keepexa Interiors windows use?',
    answer:
      'We use only A-grade, lead-free multi-chamber UPVC profiles sourced from ISO-certified European suppliers. Every batch is tested for UV stability, wall thickness, and tensile strength before entering our Mumbai manufacturing facility. We never use recycled or mixed-grade filler material.',
  },
  {
    id: 'p2',
    category: 'Products',
    question: 'Are your windows suitable for the Indian climate — heat, monsoons, coastal air?',
    answer:
      'Yes. Our profiles are UV-stabilised to perform at surface temperatures up to 65°C, a common reality on Indian exteriors. All gaskets, hardware, and sealants are rated for high-humidity monsoon conditions. For coastal locations, we supply marine-grade stainless hardware to resist salt-air corrosion.',
  },
  {
    id: 'p3',
    category: 'Products',
    question: 'What glazing options are available?',
    answer:
      'We offer single glazing (for internal partitions), double glazing with argon fill (our most popular option), and triple glazing for maximum thermal and acoustic performance. We also supply solar-control glass, toughened safety glass, laminated glass, and obscure glass for bathrooms and utility spaces.',
  },
  {
    id: 'p4',
    category: 'Products',
    question: 'Can I choose a colour other than white?',
    answer:
      'Absolutely. We offer a full RAL colour range via co-extrusion and laminate foil wrapping — popular choices include Anthracite Grey (RAL 7016), Cream (RAL 9001), Black (RAL 9005), and woodgrain effects such as Golden Oak and Dark Walnut. Colour is applied at the factory, not on-site, ensuring uniform finish and durability.',
  },
  {
    id: 'p5',
    category: 'Products',
    question: 'Do you manufacture non-standard shapes and sizes?',
    answer:
      'Yes. Because we manufacture in-house, we can produce arched, circular, triangular, and other geometric shapes alongside standard rectangular profiles. During the free home survey, our specialist will take precise measurements and discuss any non-standard requirements.',
  },

  // Installation
  {
    id: 'i1',
    category: 'Installation',
    question: 'Who carries out the installation — your own team or subcontractors?',
    answer:
      'Every Keepexa Interiors installation is carried out exclusively by our own salaried, certified fitters. We never use subcontractors or third-party labour. This gives us full accountability and consistent workmanship standards across every project in every city we serve.',
  },
  {
    id: 'i2',
    category: 'Installation',
    question: 'How long does a typical installation take?',
    answer:
      'Most residential projects — replacing 6 to 12 windows — are completed in 1 to 3 days. Larger projects or new builds with more complex requirements may take longer. Your project timeline will be confirmed in writing before work begins. We also carry out full site clean-up and weatherproofing as standard.',
  },
  {
    id: 'i3',
    category: 'Installation',
    question: 'What cities do you currently serve?',
    answer:
      'We currently install across Mumbai, Mumbai, Delhi NCR, Bengaluru, Hyderabad, and Chennai, with service centres in each location for ongoing aftercare. We are actively expanding — contact us to confirm availability in your city if it is not listed.',
  },
  {
    id: 'i4',
    category: 'Installation',
    question: 'Will installation cause major disruption to my home?',
    answer:
      'We work systematically to minimise disruption — typically completing one room before moving to the next. Our teams lay protective sheeting, remove all packaging and old frames, and leave the site clean at the end of every working day. Most homeowners report less disruption than they anticipated.',
  },

  // Warranty
  {
    id: 'w1',
    category: 'Warranty',
    question: 'What does the 10-year warranty cover?',
    answer:
      'Our 10-year product warranty covers defects in materials and workmanship — including profile deformation, glass seal failure, hardware malfunction, and installation faults. It is transferable to a new owner if you sell your property, adding genuine resale value.',
  },
  {
    id: 'w2',
    category: 'Warranty',
    question: 'What is the 40-year performance guarantee?',
    answer:
      'The 40-year guarantee applies specifically to UPVC profile performance — meaning the profiles will not warp, crack, discolour, or structurally degrade within that period under normal use conditions. This is a separate, longer-term assurance on the core material, not on hardware or glazing.',
  },
  {
    id: 'w3',
    category: 'Warranty',
    question: 'What voids the warranty?',
    answer:
      'The warranty is voided by unauthorised modifications, damage caused by misuse, or installation of replacement parts not approved by Keepexa Interiors. Normal wear on consumable items (such as rubber gaskets after many years) is handled under our aftercare service, not the warranty. Full terms are provided in writing at the time of purchase.',
  },

  // Pricing
  {
    id: 'pr1',
    category: 'Pricing',
    question: 'How is pricing calculated?',
    answer:
      'Pricing is based on window size, profile type, glazing specification, colour, and hardware selection. Because we manufacture to order, every quote is specific to your windows. The free home survey produces a fixed, itemised quote — no surprises at invoice stage.',
  },
  {
    id: 'pr2',
    category: 'Pricing',
    question: 'Is the home survey really free with no obligation?',
    answer:
      'Yes, completely. Our specialist visits, measures, and prepares a full written quote at no charge and with no pressure to proceed. Many homeowners use our survey as a benchmark even if they are comparing multiple suppliers.',
  },
  {
    id: 'pr3',
    category: 'Pricing',
    question: 'Do you offer EMI or finance options?',
    answer:
      'Yes. We partner with leading NBFCs to offer no-cost EMI on qualifying orders. Options range from 3 to 24 months and are available to eligible customers at the time of order confirmation. Details are shared during the quotation process.',
  },

  // After-Sales
  {
    id: 'a1',
    category: 'After-Sales',
    question: 'What happens if I have a problem after installation?',
    answer:
      'Contact our aftercare team directly — not a third party or call centre. We have service engineers based in every city we operate in. For warranty-covered issues, we aim to respond within 48 hours and resolve within 5 working days. Non-warranty servicing is also available at a transparent fixed rate.',
  },
  {
    id: 'a2',
    category: 'After-Sales',
    question: 'How do I maintain my UPVC windows?',
    answer:
      'UPVC requires very little maintenance. Wipe profiles with a damp cloth and mild detergent once or twice a year. Lubricate hinges and locking mechanisms with a light machine oil annually. Avoid abrasive cleaners or solvents. We provide a full written maintenance guide with every installation.',
  },
];

const categories: FaqCategory[] = ['All', 'Products', 'Installation', 'Warranty', 'Pricing', 'After-Sales'];

const categoryIcons: Record<FaqCategory, string> = {
  All: 'Squares2X2Icon',
  Products: 'CubeTransparentIcon',
  Installation: 'WrenchScrewdriverIcon',
  Warranty: 'ShieldCheckIcon',
  Pricing: 'CurrencyRupeeIcon',
  'After-Sales': 'HeartIcon',
};

/* ─────────────────────────────────────────────
   Accordion item
───────────────────────────────────────────── */
function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
  inView,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'bg-card border-primary/30 shadow-soft'
          : 'bg-card border-border/60 hover:border-border shadow-none'
      }`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 min-w-0">
          {/* Category dot */}
          <div
            className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
              isOpen ? 'bg-primary' : 'bg-border'
            }`}
          />
          <span
            className={`text-sm sm:text-base font-600 leading-snug transition-colors duration-200 ${
              isOpen ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
            }`}
          >
            {faq.question}
          </span>
        </div>

        {/* Toggle icon */}
        <div
          className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-primary border-primary text-primary-foreground rotate-45'
              : 'bg-secondary/60 border-border/60 text-muted-foreground'
          }`}
        >
          <Icon name="PlusIcon" size={14} />
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-10 sm:pl-12">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function Faq() {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const bodyInView = useInView(bodyRef, { once: true, margin: '-60px' });

  const [activeCategory, setActiveCategory] = useState<FaqCategory>('All');
  const [openId, setOpenId] = useState<string | null>('p1');

  const filtered =
    activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          ref={headRef}
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label block mb-3">FAQ</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
            Questions we get asked every day.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Straight answers on products, installation, warranties, and pricing — no jargon.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex items-center gap-2 flex-wrap justify-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-soft'
                  : 'bg-card text-muted-foreground border-border/60 hover:bg-secondary/60 hover:text-foreground'
              }`}
            >
              <Icon
                name={categoryIcons[cat] as 'HomeIcon'}
                size={14}
                className={activeCategory === cat ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Two-column layout on large screens */}
        <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left: accordion */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="flex flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((faq, i) => (
                  <AccordionItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => toggle(faq.id)}
                    index={i}
                    inView={bodyInView}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: sticky contact card */}
          <motion.aside
            className="flex flex-col gap-4 lg:sticky lg:top-8 self-start"
            initial={{ opacity: 0, x: 24 }}
            animate={bodyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Still have questions */}
            <div className="glass-card rounded-3xl border border-border/60 p-6 flex flex-col gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
                <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-base font-700 text-foreground">Still have questions?</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Speak directly with a Keepexa Interior specialist — not a chatbot, not a call centre.
                </p>
              </div>
              <Link href="/homepage#contact" className="btn-primary self-start">
                Talk to Us
                <Icon name="ArrowRightIcon" size={15} />
              </Link>
            </div>


            {/* Quick stats */}
            <div className="rounded-3xl border border-border/60 bg-card p-5 grid grid-cols-2 gap-3">
              {[
                { value: '48 hrs', label: 'Warranty response' },
                { value: '10 yrs', label: 'Product warranty' },
                { value: '4.9★', label: 'Customer rating' },
                { value: '3,800+', label: 'Homes fitted' },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-2xl bg-secondary/70 text-center">
                  <p className="text-base font-800 text-primary leading-none">{s.value}</p>
                  <p className="text-[11px] font-500 text-muted-foreground mt-1.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

      </div>
    </section>
  );
}