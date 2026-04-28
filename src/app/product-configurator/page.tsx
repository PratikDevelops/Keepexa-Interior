import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfiguratorHero from './components/ConfiguratorHero';
import ConfiguratorMain from './components/ConfiguratorMain';

export default function ProductConfiguratorPage() {
  return (
    <>
      <Header />
      <main>
        <ConfiguratorHero />
        <ConfiguratorMain />
      </main>
      <Footer />
    </>
  );
}