import { isPreviewMode } from '../lib/releaseMode';

const SITE_URL = import.meta.env.SITE_URL || 'https://mattressinquirer.ahmedbarkat1067.workers.dev';

// Preview hosts must not invite crawlers or advertise an indexable sitemap.
const previewBody = `User-agent: *
Disallow: /
`;

const body = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;

export const GET = () =>
  new Response(isPreviewMode() ? previewBody : body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
