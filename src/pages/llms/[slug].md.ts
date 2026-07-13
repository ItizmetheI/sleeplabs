import { buildAllLlmDocuments } from '../../lib/llmDocuments';

export const prerender = true;

const SITE_URL = import.meta.env.SITE_URL || 'https://finalize.ahmedbarkat1067.workers.dev';

export function getStaticPaths() {
  return buildAllLlmDocuments(SITE_URL).map((document) => ({
    params: { slug: document.slug },
    props: { document },
  }));
}

export const GET = ({ props }: { props: { document: { content: string } } }) =>
  new Response(`${props.document.content.trim()}\n`, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
