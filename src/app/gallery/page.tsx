import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHero from './components/GalleryHero';
import GalleryGrid from './components/GalleryGrid';

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <GalleryHero />
        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}