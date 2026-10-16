// Shared rules from the owner content instructions: page-map lookups, the link allowlist,
// inline-link rendering, affiliate slot ids, and spec display formatting.
import { PAGE_MAP, type PageMapRow } from '../data/pageMap.generated';
import { blogPosts } from '../data/blogs-generated';
import { LEGACY_BEST_BLOG_REDIRECTS } from './legacyBlogRedirects';
import type { MattressSpec } from '../data/specTypes';

const byUrl = new Map(PAGE_MAP.map(row => [row.url, row]));

export const pageMapRow = (url: string): PageMapRow => {
  const row = byUrl.get(url);
  if (!row) throw new Error(`URL is not in the owner page map: ${url}`);
  return row;
};

/** H1 exactly as the owner page map states it. */
export const h1For = (url: string): string => pageMapRow(url).h1;

const activeBlogUrls = blogPosts
  .filter(post => !post.redirectTo && !LEGACY_BEST_BLOG_REDIRECTS[`/blog/${post.slug}/`])
  .map(post => `/blog/${post.slug}/`);

/** Every URL copy may link to: live page-map rows, kept blog posts, the blog index, and the score CSV. */
export const ALLOWED_LINKS = new Set<string>([
  ...PAGE_MAP.filter(row => row.pageType !== 'cut').map(row => row.url),
  '/blog/',
  ...activeBlogUrls,
  '/scores.csv',
]);

export const assertAllowedLink = (href: string, context: string) => {
  const path = href.split('#')[0];
  if (!ALLOWED_LINKS.has(path)) throw new Error(`${context}: link ${href} is not in the owner page map.`);
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Copy uses [label](/path/) for internal links. Unknown paths fail the build. */
export const renderInline = (text: string, context = 'copy'): string => {
  let html = '';
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    assertAllowedLink(match[2], context);
    html += escapeHtml(text.slice(last, match.index)) + `<a href="${match[2]}" class="text-primary underline underline-offset-4 hover:text-secondary">${escapeHtml(match[1])}</a>`;
    last = match.index! + match[0].length;
  }
  return html + escapeHtml(text.slice(last));
};

/** Same text with link markup removed, for JSON-LD and Markdown alternates. */
export const plainInline = (text: string): string => text.replace(LINK, '$1');

/** Markdown keeps the links, with absolute URLs. */
export const markdownInline = (text: string, siteUrl: string): string =>
  text.replace(LINK, (_, label, href) => `[${label}](${siteUrl}${href})`);

export const reviewUrl = (id: string) => `/reviews/${id}/`;

/** slot_id = MI-[page slug]-[product slug]; page slug is the path with slashes as hyphens, "home" for /. */
export const slotId = (pageUrl: string, productSlug: string) => {
  const pageSlug = pageUrl === '/' ? 'home' : pageUrl.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  return `MI-${pageSlug}-${productSlug}`;
};

const NOT_LISTED = 'not listed';

export const firmnessText = (spec: MattressSpec): string => {
  if (!spec.reachable || spec.firmnessOptions.length === 0) return 'Not listed';
  return spec.firmnessOptions
    .map(o => (!o.display ? `${o.label} (no number given)` : o.label ? `${o.display}/10 (${o.label})` : `${o.display}/10`))
    .join('; ');
};

/** Short firmness for tables: the options as n/10, or "Not listed". */
export const firmnessShort = (spec: MattressSpec): string => {
  if (!spec.reachable || spec.firmnessOptions.length === 0) return 'Not listed';
  return spec.firmnessOptions.map(o => (o.display ? `${o.display}/10` : o.label)).join(', ');
};

export const heightText = (spec: MattressSpec) =>
  spec.reachable && spec.heightRaw !== NOT_LISTED ? `${spec.heightRaw.replace(/ or /g, ' or ')} in` : 'Not listed';

export const typeText = (spec: MattressSpec) => spec.type ?? 'Not listed';

export const trialText = (spec: MattressSpec) => {
  if (spec.trialNights === null) return 'Not listed';
  return spec.trialNights === 0 ? 'No trial' : `${spec.trialNights} nights`;
};

export const warrantyText = (spec: MattressSpec) => {
  if (!spec.reachable || spec.warranty === NOT_LISTED) return 'Not listed';
  if (spec.warranty === 'Lifetime') return 'Lifetime';
  const match = spec.warranty.match(/^(\d+)(.*)$/);
  return match ? `${match[1]} years${match[2]}` : spec.warranty;
};

// Owner rule: no prices anywhere. A price row is a "See Price" CTA to the product page; recorded prices stay in the spec data for luxury qualification only.
export const PRICE_LABEL = 'Price';
export const SEE_PRICE = 'See Price';

export const listOrNotListed = (values: string[]) => (values.length ? values.join(', ') : 'Not listed');

export const plainOrNotListed = (value: string) => (!value || value === NOT_LISTED || value.startsWith('FAIL') ? 'Not listed' : value);

/** The owner's fixed pain-page sentence; included once on back, hip and shoulder pain pages. */
export const COMFORT_NOT_TREATMENT = 'A mattress is a comfort choice, not a treatment. Persistent pain is worth raising with a doctor.';
export const PAIN_PAGE_SLUGS = new Set(['back-pain', 'hip-pain', 'shoulder-pain']);

/** Firmness for a best-of pick: the qualifying option ("7/10, Firm option"), then the others as available. */
export const qualifyingFirmnessText = (spec: MattressSpec, q: { label: string; display: string } | null): string => {
  if (!q) return firmnessText(spec);
  // Unlabeled ratings (owner-fixed Vaya and FORM numbers) are a single option with no name.
  if (!q.label) return `${q.display}/10`;
  const others = spec.firmnessOptions
    .filter(o => o.label !== q.label)
    .map(o => (o.display ? `${o.label} ${o.display}/10` : o.label));
  return `${q.display}/10, ${q.label} option${others.length ? `; also sold in ${others.join(', ')}` : ''}`;
};
