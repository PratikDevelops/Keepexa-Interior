import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesStorytelling from './components/FeaturesStorytelling';
import GalleryPreview from './components/GalleryPreview';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import WhychooseUs from './components/WhychooseUs';
import Faq from './components/Faq';
import ProductCards from './components/Productcards';
import AwardsSection from './components/AwardsSection';

export default function HomepagePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-grow w-full space-y-12 md:space-y-24">
        <HeroSection />

        <div className="w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FeaturesStorytelling />
        </div>

        <ProductCards />

        <div className="w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GalleryPreview />
        </div>

        <AboutSection />

        <div className="w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <WhychooseUs />
          <AwardsSection />
        </div>

        <TestimonialsSection />

        <div className="w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 md:pb-24">
          <Faq />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}