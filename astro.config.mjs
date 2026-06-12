import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  site: process.env.SITE_URL || 'https://puresleep.com',
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude pain/YMYL category pages until copy is fully safety-reviewed
        if (page.includes('/blog/category/pain') || page.includes('/blog/tag/back-pain') || page.includes('/blog/tag/hip-pain') || page.includes('/blog/tag/shoulder-pain') || page.includes('/blog/tag/sciatica') || page.includes('/blog/tag/arthritis') || page.includes('/blog/tag/fibromyalgia')) return false;
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
