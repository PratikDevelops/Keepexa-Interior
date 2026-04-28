import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import '../styles/tailwind.css';
import WhatsAppButton from '@/components/WhatsAppButton';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff', // Added for mobile browser branding
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Keepexa Interiors — Engineered UPVC Windows',
    template: '%s | Keepexa Interiors' // Allows subpages to have "Gallery | Keepexa Interiors"
  },
  description: 'Keepexa Interiors crafts premium UPVC windows delivering acoustic silence, thermal efficiency, and architectural elegance for modern UK homes.',
  keywords: ['UPVC Windows', 'Engineered Windows', 'Keepexa Interiors', 'Acoustic Windows', 'Thermal Efficiency', 'UK Modern Homes'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Keepexa Interiors — Engineered UPVC Windows',
    description: 'Crafting premium UPVC windows for acoustic silence and thermal efficiency.',
    url: siteUrl,
    siteName: 'Keepexa Interiors',
    images: [
      {
        url: '/favicon.png', // Ensure you have an OG image in your /public folder (1200x630)
        width: 1200,
        height: 630,
        alt: 'Keepexa Interiors Showcase',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keepexa Interiors — Engineered UPVC Windows',
    description: 'Premium UPVC windows for modern UK homes.',
    images: ['/favicon.png'], 
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png' }], // Good for iOS SEO
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} scroll-smooth`}>
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <WhatsAppButton />
        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fpureframe2175back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}