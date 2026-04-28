import { use } from 'react';
import ProductDetailPage from '@/app/homepage/components/ProductDetails';

export function generateStaticParams() {
  return [
    { slug: 'tilt-turn' },
    { slug: 'casement' },
    { slug: 'sliding-2track' },
    { slug: 'french-casement' },
    { slug: 'lift-slide' },
    { slug: 'fixed-picture' },
    { slug: 'bay-window' },
    { slug: 'louvre' },
  ];
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <ProductDetailPage slug={slug} />;
}