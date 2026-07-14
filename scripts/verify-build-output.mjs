import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const expectedSite = (process.env.SITE_URL || 'https://finalize.ahmedbarkat1067.workers.dev').replace(/\/$/, '');
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return files.flat();
};

const files = await walk(dist);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const relative = file => path.relative(dist, file).replaceAll(path.sep, '/');
const htmlByPath = new Map();
const schemaNodes = [];
let jsonLdScripts = 0;

const collectSchemaNodes = (value, route) => {
  if (Array.isArray(value)) {
    value.forEach(item => collectSchemaNodes(item, route));
    return;
  }
  if (!value || typeof value !== 'object') return;
  schemaNodes.push({ value, route });
  Object.values(value).forEach(item => collectSchemaNodes(item, route));
};

for (const file of htmlFiles) {
  const route = relative(file);
  const html = await readFile(file, 'utf8');
  htmlByPath.set(route, html);

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdScripts += 1;
    try {
      collectSchemaNodes(JSON.parse(match[1]), route);
    } catch (error) {
      failures.push(`${route} has invalid JSON-LD: ${error.message}`);
    }
  }
}

const typeIncludes = (value, expected) => {
  const types = Array.isArray(value?.['@type']) ? value['@type'] : [value?.['@type']];
  return types.includes(expected);
};

const articleNodes = schemaNodes.filter(({ value }) =>
  typeIncludes(value, 'Article') && ('headline' in value || 'mainEntityOfPage' in value)
);
for (const { value, route } of articleNodes) {
  assert(
    typeof value.articleBody === 'string' && value.articleBody.trim().length >= 250,
    `${route} Article schema is missing a complete articleBody.`,
  );
  assert(!('reviewedBy' in value), `${route} Article schema contains reviewedBy.`);
  assert(value.author && typeof value.author === 'object', `${route} Article schema is missing an author entity.`);
  assert(value.publisher && typeof value.publisher === 'object', `${route} Article schema is missing a publisher entity.`);
  assert(typeof value.dateModified === 'string', `${route} Article schema is missing dateModified.`);
  assert(Boolean(value.mainEntityOfPage), `${route} Article schema is missing mainEntityOfPage.`);
}

assert(articleNodes.length >= 200, `Expected at least 200 Article schema nodes; found ${articleNodes.length}.`);
assert(
  !schemaNodes.some(({ value }) => typeIncludes(value, 'AggregateRating')),
  'Generated JSON-LD contains AggregateRating.',
);
assert(
  !schemaNodes.some(({ value }) => typeIncludes(value, 'Offer')),
  'Generated JSON-LD contains live Offer data from unverified reference prices.',
);
for (const { value, route } of schemaNodes.filter(({ value }) => typeIncludes(value, 'Product'))) {
  assert(typeof value['@id'] === 'string' && value['@id'].includes('#product'), `${route} Product schema is missing a stable @id.`);
  const images = Array.isArray(value.image) ? value.image : [value.image];
  assert(images.every(image => typeof image === 'string' && /^https?:\/\//.test(image)), `${route} Product schema contains a relative or missing image URL.`);
  assert(value.review && typeIncludes(value.review, 'Review'), `${route} Product schema is missing editorial Review data.`);
}

const allHtml = [...htmlByPath.values()].join('\n');
for (const [label, pattern] of [
  ['inactive support address', /support@puresleep\.com/i],
  ['false editorial independence claim', /editorially independent|independent review publication|no financial relationship|independently tested alternatives/i],
  ['unverified named medical reviewer', /Dr\. Sarah Mitchell|reviewed by\s+(?:Dr\.|Doctor)|licensed chiropractor/i],
  ['proof-gated test equipment', /clinical pressure mapping|thermal imaging|temperature mapping tests?|motion transfer sensors?|hands-on-grade biometric rings?/i],
  ['proof-gated test duration', /\b(?:90|120) nights tested\b|minimum (?:90|120) nights|120h Testing Per Mattress/i],
  ['unsupported quantified cooling claim', /\b7\s*\u00b0?F cooler|\b25% (?:cooler|more breathable)/i],
  ['unsupported medical language', /medical brace|permanently stop morning stiffness|shuts it down immediately|fix(?:es|ed|ing)? (?:spinal|disc) inflammation|mechanical airway fix/i],
  ['proof-gated performance claim', /measurably cooler than petroleum foam|prevent(?:s|ing)? sagging for the full 20-year warranty/i],
  ['stale recurring-update claim', /updated monthly/i],
  ['unverified sale-price claim', /on sale from/i],
  ['unverified risk-free trial claim', /risk-free for 100 nights/i],
  ['unverified shipping claim', /free shipping\s*(?:&|and|\u00b7)\s*(?:free )?returns|free shipping\s*\u00b7\s*20-year warranty/i],
] ) {
  assert(!pattern.test(allHtml), `Generated HTML contains ${label}.`);
}
assert(allHtml.includes('owned and operated by Amerisleep'), 'Generated HTML is missing the Amerisleep ownership disclosure.');

for (const [route, html] of htmlByPath) {
  if (!route.startsWith('reviews/') || route === 'reviews/index.html') continue;
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ') ?? '';
  assert(!h1.includes('$'), `${route} presents a reference price in its H1.`);
  assert(html.includes('Recorded dataset values, not live offers'), `${route} is missing the reference-price disclosure.`);
}

const coreRoutePattern = /^(?:index\.html|reviews\/|comparison\/|best\/|brands\/|topics\/|methodology\/|about\/|disclosure\/|editorial-policy\/)/;
const canonicalOwners = new Map();
for (const [route, html] of [...htmlByPath].filter(([route]) => coreRoutePattern.test(route))) {
  const titles = [...html.matchAll(/<title\b[^>]*>[\s\S]*?<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/gi)];
  const canonicals = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
  const h1s = [...html.matchAll(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi)];
  assert(titles.length === 1, `${route} must contain exactly one title tag; found ${titles.length}.`);
  assert(descriptions.length === 1, `${route} must contain exactly one meta description; found ${descriptions.length}.`);
  assert(canonicals.length === 1, `${route} must contain exactly one canonical; found ${canonicals.length}.`);
  assert(h1s.length === 1, `${route} must contain exactly one H1; found ${h1s.length}.`);
  if (canonicals[0]) {
    const canonical = canonicals[0][1];
    assert(canonical.startsWith(`${expectedSite}/`) || canonical === expectedSite, `${route} canonical uses the wrong host: ${canonical}`);
    if (canonicalOwners.has(canonical)) {
      failures.push(`${route} duplicates canonical ${canonical} from ${canonicalOwners.get(canonical)}.`);
    } else {
      canonicalOwners.set(canonical, route);
    }
  }
}

const expectedMachineSlug = (route) => {
  if (route === 'reviews/index.html') return 'reviews';
  if (route.startsWith('reviews/')) return `reviews-${route.split('/')[1]}`;
  if (route === 'comparison/index.html') return 'comparisons';
  if (route.startsWith('comparison/')) return `comparison-${route.split('/')[1]}`;
  if (route.startsWith('best/')) return `best-${route.split('/')[1]}`;
  if (route === 'brands/index.html') return null;
  if (route.startsWith('brands/')) return `brand-${route.split('/')[1]}`;
  if (route === 'topics/index.html') return 'topics';
  if (route.startsWith('topics/')) return `topic-${route.split('/')[1]}`;
  if (route === 'methodology/index.html') return 'methodology';
  return null;
};
for (const [route, html] of htmlByPath) {
  const slug = expectedMachineSlug(route);
  if (!slug) continue;
  const alternateLinks = [...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*type=["']text\/markdown["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
  assert(alternateLinks.length === 1, `${route} must expose exactly one Markdown alternate; found ${alternateLinks.length}.`);
  assert(alternateLinks[0]?.[1] === `${expectedSite}/llms/${slug}.md`, `${route} points to the wrong Markdown alternate.`);
}

const comparisonDetailPages = [...htmlByPath].filter(([route]) => route.startsWith('comparison/') && route !== 'comparison/index.html');
assert(comparisonDetailPages.length === 30, `Expected 30 rendered comparison pages; found ${comparisonDetailPages.length}.`);
for (const [route, html] of comparisonDetailPages) {
  assert((html.match(/data-comparison-score-chart/g) ?? []).length === 1, `${route} is missing its comparison score chart.`);
  assert((html.match(/data-score-metric=/g) ?? []).length === 7, `${route} must render all seven score metrics.`);
}

const sitemapFiles = files.filter(file => /sitemap(?:-index|-\d+)?\.xml$/.test(file));
assert(sitemapFiles.length >= 2, `Expected sitemap index and page sitemap; found ${sitemapFiles.length} files.`);
const sitemapText = (await Promise.all(sitemapFiles.map(file => readFile(file, 'utf8')))).join('\n');
for (const loc of [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])) {
  assert(loc.startsWith(`${expectedSite}/`) || loc === expectedSite, `Sitemap URL uses the wrong host: ${loc}`);
}
assert(!/\/(?:admin|api)\//.test(sitemapText), 'Sitemap exposes /admin/ or /api/.');

const legacyRedirectLines = (await readFile(path.join(root, 'public', '_redirects'), 'utf8'))
  .split('\n')
  .map(line => line.trimEnd())
  .filter(line => line.startsWith('/blog/') && line.endsWith(' 301'));
for (const line of legacyRedirectLines) {
  const [source] = line.split(/\s+/);
  assert(!sitemapText.includes(`${expectedSite}${source}`), `Legacy redirect source remains in sitemap: ${source}`);
}

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${expectedSite}/sitemap-index.xml`), 'robots.txt sitemap host is not synchronized.');
assert(/Disallow:\s*\/admin\//i.test(robots), 'robots.txt does not disallow /admin/.');
assert(/Disallow:\s*\/api\//i.test(robots), 'robots.txt does not disallow /api/.');

const llmMarkdownFiles = files.filter(file => /^llms\/[^/]+\.md$/.test(relative(file)));
const llmReviewFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/reviews-'));
const llmComparisonFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/comparison-'));
const llmBestFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/best-'));
const llmBrandFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/brand-'));
const llmTopicFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/topic-'));
assert(llmMarkdownFiles.length === 145, `Expected 145 generated LLM Markdown files; found ${llmMarkdownFiles.length}.`);
assert(llmReviewFiles.length === 59, `Expected 59 generated LLM review files; found ${llmReviewFiles.length}.`);
assert(llmComparisonFiles.length === 30, `Expected 30 generated comparison Markdown files; found ${llmComparisonFiles.length}.`);
assert(llmBestFiles.length === 18, `Expected 18 generated ranked-category Markdown files; found ${llmBestFiles.length}.`);
assert(llmBrandFiles.length === 24, `Expected 24 generated brand Markdown files; found ${llmBrandFiles.length}.`);
assert(llmTopicFiles.length === 8, `Expected 8 generated topic Markdown files; found ${llmTopicFiles.length}.`);
for (const file of llmMarkdownFiles) {
  const content = await readFile(file, 'utf8');
  assert(content.includes(expectedSite), `${relative(file)} does not use the configured SITE_URL.`);
  assert(!/\[from page\]|\[insert|TODO|TBD/i.test(content), `${relative(file)} contains an unfinished placeholder.`);
  assert(!/weighted average formula|Support, Pressure Relief, Cooling, Motion Isolation, Edge Support, Responsiveness, Value/i.test(content), `${relative(file)} contains the stale score rubric.`);
}
const llmsIndex = await readFile(path.join(dist, 'llms.txt'), 'utf8');
const llmsFull = await readFile(path.join(dist, 'llms-full.txt'), 'utf8');
const indexedMachineSlugs = new Set([...llmsIndex.matchAll(/\/llms\/([a-z0-9-]+)\.md/g)].map(match => match[1]));
assert(indexedMachineSlugs.size === 145, `llms.txt must list 145 unique machine documents; found ${indexedMachineSlugs.size}.`);
assert((llmsFull.match(/^Machine document:/gm) ?? []).length === 145, 'llms-full.txt does not contain all 145 machine documents.');

const requiredTopicRoutes = [
  'memory-foam',
  'cooling-technology',
  'pocketed-coils',
  'spinal-alignment',
  'motion-isolation',
  'edge-support',
  'certipur-us',
  'sleep-cycles',
];
for (const topic of requiredTopicRoutes) {
  assert(htmlByPath.has(`topics/${topic}/index.html`), `Missing standalone topic route: /topics/${topic}/.`);
}

const routeExists = async (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '');
  if (!clean) return htmlByPath.has('index.html');
  const candidates = [
    `${clean}/index.html`,
    `${clean}.html`,
    clean,
  ];
  for (const candidate of candidates) {
    if (htmlByPath.has(candidate) || files.some(file => relative(file) === candidate)) return true;
  }
  try {
    const publicFile = path.join(root, 'public', clean);
    return (await stat(publicFile)).isFile();
  } catch {
    return false;
  }
};

const missingLinks = new Set();
const missingImages = new Set();
for (const [route, html] of htmlByPath) {
  const imageUrls = [
    ...[...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(match => match[1]),
    ...[...html.matchAll(/<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)["'][^>]*>/gi)].map(match => match[1]),
  ];
  for (const imageUrl of imageUrls) {
    let pathname = imageUrl;
    if (imageUrl.startsWith(`${expectedSite}/`)) pathname = new URL(imageUrl).pathname;
    if (!pathname.startsWith('/') || pathname.startsWith('//')) continue;
    if (!(await routeExists(pathname))) missingImages.add(`${route} -> ${pathname}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = href.split(/[?#]/)[0];
    if (!pathname || pathname === '/' || pathname.startsWith('/admin/') || pathname.startsWith('/api/')) continue;
    if (!(await routeExists(pathname))) missingLinks.add(`${route} -> ${pathname}`);
  }
}
assert(missingImages.size === 0, `Generated HTML contains missing same-origin images:\n${[...missingImages].slice(0, 50).join('\n')}`);
assert(missingLinks.size === 0, `Generated HTML contains broken internal links:\n${[...missingLinks].slice(0, 50).join('\n')}`);

if (failures.length > 0) {
  console.error(`PureSleep build-output QA failed with ${failures.length} issue(s):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'pass',
  htmlFiles: htmlFiles.length,
  jsonLdScripts,
  articleSchemas: articleNodes.length,
  llmMarkdownFiles: llmMarkdownFiles.length,
  llmReviewFiles: llmReviewFiles.length,
  comparisonCharts: comparisonDetailPages.length,
  standaloneTopicRoutes: requiredTopicRoutes.length,
  legacyRedirectsExcludedFromSitemap: legacyRedirectLines.length,
  missingSameOriginImages: 0,
  brokenInternalLinks: 0,
  siteUrl: expectedSite,
}, null, 2));
