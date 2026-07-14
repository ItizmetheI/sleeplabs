import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

import cloudflare from "@astrojs/cloudflare";
import { blogPosts } from './src/data/blogs-generated.ts';
import { requiresBlogSourceReview } from './src/lib/blogSourceReview.ts';

const sourceReviewBlogPaths = new Set(
  blogPosts
    .filter(post => !post.redirectTo && requiresBlogSourceReview(post))
    .map(post => `/blog/${post.slug}/`),
);

export default defineConfig({
  site: process.env.SITE_URL || 'https://finalize.ahmedbarkat1067.workers.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Source-free health and sleep-science articles remain accessible but
        // stay out of search until citations and qualified review are assigned.
        if (page.includes('/blog/category/sleep-science') || page.includes('/blog/tag/sleep-science')) return false;
        const pathname = new URL(page, 'https://puresleep.invalid').pathname.replace(/\/?$/, '/');
        if (sourceReviewBlogPaths.has(pathname)) return false;
        // Exclude pain/YMYL category pages until copy is fully safety-reviewed
        if (page.includes('/blog/category/pain') || page.includes('/blog/category/health-and-sleep') || page.includes('/blog/tag/back-pain') || page.includes('/blog/tag/hip-pain') || page.includes('/blog/tag/shoulder-pain') || page.includes('/blog/tag/sciatica') || page.includes('/blog/tag/arthritis') || page.includes('/blog/tag/fibromyalgia') || page.includes('/blog/tag/lower-back-pain') || page.includes('/blog/tag/upper-back-pain') || page.includes('/blog/tag/neck-pain')) return false;
        // Exclude superseded duplicate post (301-redirects to how-to-evaluate-a-mattress-trial-period)
        if (page.includes('/blog/how-to-evaluate-a-mattress-during-the-trial-period')) return false;
        // Exclude superseded Amerisleep-only best-mattress page (301-redirects to /best/overall/)
        if (page.includes('/best-mattress/')) return false;
        // Exclude superseded single-brand /blog/best-*/ listicles (301-redirect to multi-brand /best/ pages)
        const supersededBestSlugs = [
          'best-adjustable-bed-base', 'best-bamboo-sheets', 'best-bed-frame-for-heavy-people',
          'best-cooling-mattress-topper', 'best-luxury-mattress', 'best-mattress-for-arthritis',
          'best-mattress-for-athletes', 'best-mattress-for-back-pain', 'best-mattress-for-back-pain-side-sleepers',
          'best-mattress-for-back-sleepers', 'best-mattress-for-college-students', 'best-mattress-for-combination-sleepers',
          'best-mattress-for-couples', 'best-mattress-for-fibromyalgia', 'best-mattress-for-guest-bedroom',
          'best-mattress-for-heavy-sleepers', 'best-mattress-for-hip-pain', 'best-mattress-for-hot-sleepers',
          'best-mattress-for-lower-back-pain', 'best-mattress-for-petite-sleepers', 'best-mattress-for-pregnancy',
          'best-mattress-for-sciatica', 'best-mattress-for-seniors', 'best-mattress-for-shoulder-pain',
          'best-mattress-for-side-sleepers', 'best-mattress-for-stomach-sleepers', 'best-mattress-for-upper-back-pain',
          'best-mattress-protector', 'best-mattress-topper-for-back-pain', 'best-mattress-topper-for-pressure-relief',
          'best-mattress-under-1000', 'best-memory-foam-mattress', 'best-organic-mattress',
          'best-pillow-for-neck-pain', 'best-pillow-for-side-sleepers', 'best-sleep-position-for-back-pain',
          'best-sleep-position-for-digestion', 'best-sleep-position-for-hip-pain', 'best-upholstered-bed-frame'
        ];
        if (supersededBestSlugs.some(slug => page.includes(`/blog/${slug}/`))) return false;
        // Exclude machine-readable LLM files
        if (page.includes('/llms/') || page.endsWith('/llms.txt') || page.endsWith('/llms-full.txt')) return false;
        // Exclude QA-only manifest endpoints
        if (page.includes('/model-coverage.json')) return false;
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
