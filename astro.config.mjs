import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: process.env.SITE_URL || 'https://production-domain-not-set.example',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude pain/YMYL category pages until copy is fully safety-reviewed
        if (page.includes('/blog/category/pain') || page.includes('/blog/category/health-and-sleep') || page.includes('/blog/tag/back-pain') || page.includes('/blog/tag/hip-pain') || page.includes('/blog/tag/shoulder-pain') || page.includes('/blog/tag/sciatica') || page.includes('/blog/tag/arthritis') || page.includes('/blog/tag/fibromyalgia') || page.includes('/blog/tag/lower-back-pain') || page.includes('/blog/tag/upper-back-pain') || page.includes('/blog/tag/neck-pain')) return false;
        // Exclude superseded duplicate post (301-redirects to how-to-evaluate-a-mattress-trial-period)
        if (page.includes('/blog/how-to-evaluate-a-mattress-during-the-trial-period')) return false;
        // Exclude superseded Amerisleep-only best-mattress page (301-redirects to /best/overall/)
        if (page.includes('/best-mattress/')) return false;
        // Exclude machine-readable LLM files
        if (page.includes('/llms/')) return false;
        // Exclude admin
        if (page.includes('/admin')) return false;
        // Exclude API routes
        if (page.includes('/api/')) return false;
        return true;
      }
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
  },
});