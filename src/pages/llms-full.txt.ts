import { buildLlmsFull } from '../lib/llmDocuments';

export const prerender = true;

const SITE_URL = import.meta.env.SITE_URL || 'https://finalize.ahmedbarkat1067.workers.dev';

export const GET = () =>
  new Response(`${buildLlmsFull(SITE_URL).trim()}\n`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
