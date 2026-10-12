import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";
import { blogPosts } from './src/data/blogs-generated.ts';
import { requiresBlogSourceReview } from './src/lib/blogSourceReview.ts';
import { isScheduled } from './src/lib/scheduledContent.ts';
import { LEGACY_BEST_BLOG_REDIRECTS } from './src/lib/legacyBlogRedirects.ts';

// Routes that only 301 elsewhere never belong in the sitemap.
const redirectedPaths = new Set([
  ...Object.keys(LEGACY_BEST_BLOG_REDIRECTS),
  '/disclosure/',
  '/guides/',
  '/contributors/firdous-farhad/',
]);

const sourceReviewBlogPaths = new Set(
  blogPosts
    .filter(post => !post.redirectTo && requiresBlogSourceReview(post))
    .map(post => `/blog/${post.slug}/`),
);

// Future-dated posts stay out of search until their publication date passes.
const scheduledBlogPaths = new Set(
  blogPosts
    .filter(post => !post.redirectTo && isScheduled(post.datePublished))
    .map(post => `/blog/${post.slug}/`),
);

export default defineConfig({
  site: process.env.SITE_URL || 'https://mattressinquirer.ahmedbarkat1067.workers.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Source-free health and sleep-science articles remain accessible but
        // stay out of search until citations and qualified review are assigned.
        if (page.includes('/blog/category/sleep-science') || page.includes('/blog/tag/sleep-science')) return false;
        const pathname = new URL(page, 'https://mattressinquirer.invalid').pathname.replace(/\/?$/, '/');
        if (sourceReviewBlogPaths.has(pathname)) return false;
        if (scheduledBlogPaths.has(pathname)) return false;
        // Exclude pain/YMYL category pages until copy is fully safety-reviewed
        if (page.includes('/blog/category/pain') || page.includes('/blog/category/health-and-sleep') || page.includes('/blog/tag/back-pain') || page.includes('/blog/tag/hip-pain') || page.includes('/blog/tag/shoulder-pain') || page.includes('/blog/tag/sciatica') || page.includes('/blog/tag/arthritis') || page.includes('/blog/tag/fibromyalgia') || page.includes('/blog/tag/lower-back-pain') || page.includes('/blog/tag/upper-back-pain') || page.includes('/blog/tag/neck-pain')) return false;
        // Exclude superseded duplicate post (301-redirects to how-to-evaluate-a-mattress-trial-period)
        if (page.includes('/blog/how-to-evaluate-a-mattress-during-the-trial-period')) return false;
        // Exclude superseded Amerisleep-only best-mattress page (301-redirects to /best/overall/)
        if (page.includes('/best-mattress/')) return false;
        // Exclude every route that 301-redirects elsewhere
        if (redirectedPaths.has(pathname)) return false;
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
