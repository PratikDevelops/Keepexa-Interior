import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  return [
    // ── Main Pages ──────────────────────────────────────────────────────────
    { url: `${base}/`,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/gallery`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/product-configurator`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },

    // ── Products ────────────────────────────────────────────────────────────
    { url: `${base}/products/tilt-turn`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/casement`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/french-casement`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/sliding-2track`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/lift-slide`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/fixed-picture`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/products/bay-window`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/products/louvre`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // ── Support ─────────────────────────────────────────────────────────────
    { url: `${base}/contact`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/support/installation`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${base}/support/maintenance`,        lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${base}/support/warranty`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${base}/support/warranty-claim`,     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },

    // ── Legal ────────────────────────────────────────────────────────────────
    { url: `${base}/legal/privacy-policy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/legal/terms-of-service`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/sitemap`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
}