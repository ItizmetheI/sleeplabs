import { readdir, readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const expectedSite = (process.env.SITE_URL || 'https://mattressinquirer.ahmedbarkat1067.workers.dev').replace(/\/$/, '');
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

// ponytail: derive the mode from the artifact, not an env var, so QA validates whatever was built.
const previewBuild = /^\s*User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/\s*$/.test(
  (await readFile(path.join(dist, 'robots.txt'), 'utf8')).trim(),
);
// Preview emits the stricter sitewide "noindex, nofollow, noarchive"; both satisfy a noindex gate.
const hasNoindex = (html) => /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
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
const articleBodyLengths = [];
for (const { value, route } of articleNodes) {
  assert(
    typeof value.articleBody === 'string' && value.articleBody.trim().length >= 250,
    `${route} Article schema is missing a complete articleBody.`,
  );
  if (typeof value.articleBody === 'string') articleBodyLengths.push(value.articleBody.trim().length);
  assert(!('reviewedBy' in value), `${route} Article schema contains reviewedBy.`);
  assert(value.author && typeof value.author === 'object', `${route} Article schema is missing an author entity.`);
  assert(value.author?.name === 'Mattress Inquirer Editorial Team', `${route} Article schema must use the Mattress Inquirer Editorial Team organizational byline.`);
  assert(value.publisher && typeof value.publisher === 'object', `${route} Article schema is missing a publisher entity.`);
  assert(typeof value.dateModified === 'string', `${route} Article schema is missing dateModified.`);
  assert(Boolean(value.mainEntityOfPage), `${route} Article schema is missing mainEntityOfPage.`);
}

const requiredArticleSections = [
  {
    match: route => route.startsWith('reviews/') && route !== 'reviews/index.html',
    // Owner review template, sections 1 to 13.
    headings: ['Quick Answer', 'Specs at a Glance', 'Strengths and Limitations', 'How It Was Scored', 'Construction', 'Performance', 'Firmness and Feel by Sleep Position', 'How It Compares', 'Trial, Warranty, Shipping and Returns', 'FAQs', 'Verdict'],
  },
  {
    match: route => route.startsWith('comparison/') && route !== 'comparison/index.html',
    // Owner comparison template.
    headings: ['Quick Verdict', 'Side by Side', 'Feel and Firmness', 'Construction', 'Edge Support', 'Motion Transfer', 'Cooling', 'Response', 'Value and Policies', 'FAQs'],
  },
  {
    match: route => route.startsWith('blog/'),
    headings: ['Quick Answer', 'Multi-Brand Context', 'Frequently Asked Questions', 'About Mattress Inquirer'],
  },
];
for (const { value, route } of articleNodes) {
  const body = typeof value.articleBody === 'string' ? value.articleBody : '';
  for (const rule of requiredArticleSections.filter(rule => rule.match(route))) {
    for (const heading of rule.headings) {
      assert(body.includes(heading), `${route} Article articleBody is missing the visible section: ${heading}.`);
    }
  }

  const faqPages = schemaNodes.filter(node => node.route === route && typeIncludes(node.value, 'FAQPage'));
  for (const faqPage of faqPages) {
    for (const faq of faqPage.value.mainEntity ?? []) {
      assert(body.includes(faq.name), `${route} Article articleBody is missing FAQ question: ${faq.name}`);
      assert(body.includes(faq.acceptedAnswer?.text), `${route} Article articleBody is missing the answer for: ${faq.name}`);
    }
  }
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
  // Owner schema: reviews carry a Review; comparison Products are name and brand only. Any image must be absolute.
  const images = value.image === undefined ? [] : Array.isArray(value.image) ? value.image : [value.image];
  assert(images.every(image => typeof image === 'string' && /^https?:\/\//.test(image)), `${route} Product schema contains a relative image URL.`);
  assert(typeof value.name === 'string' && value.brand, `${route} Product schema is missing name or brand.`);
  if (route.startsWith('reviews/') && route !== 'reviews/index.html') {
    assert(value.review && typeIncludes(value.review, 'Review'), `${route} Product schema is missing editorial Review data.`);
  }
}

const allHtml = [...htmlByPath.values()].join('\n');
for (const [label, pattern] of [
  ['inactive support address', /support@mattressinquirer\.com/i],
  ['unsupported financial-independence promise', /no financial relationship/i],
  ['prohibited relationship language', /One[-\s]+Sleep[-\s]+Group|material[-\s]+business[-\s]+relationship|affiliated[-\s]+and[-\s]+non-affiliated|non-affiliated|family[-\s]+of[-\s]+brands/i],
  ['unverified named medical reviewer', /Dr\. Sarah Mitchell|reviewed by\s+(?:Dr\.|Doctor)|licensed chiropractor/i],
  ['proof-gated test equipment', /clinical pressure mapping|thermal imaging|temperature mapping tests?|motion transfer sensors?|hands-on-grade biometric rings?/i],
  ['proof-gated test duration', /\b(?:90|120) nights tested\b|minimum (?:90|120) nights|120h Testing Per Mattress/i],
  ['unsupported quantified cooling claim', /\b7\s*\u00b0?F cooler|\b25% (?:cooler|more breathable)/i],
  ['unsupported medical language', /medical brace|permanently stop morning stiffness|shuts it down immediately|fix(?:es|ed|ing)? (?:spinal|disc) inflammation|mechanical airway fix/i],
  ['proof-gated performance claim', /measurably cooler than petroleum foam|prevent(?:s|ing)? sagging for the full 20-year warranty/i],
  ['stale recurring-update claim', /updated monthly/i],
  ['unverified sale-price claim', /on sale from/i],
  ['unverified risk-free trial claim', /risk-free for 100 nights/i],
  // Marketing badges only; sourced prose such as "Amerisleep lists free shipping and free returns" is allowed.
  ['unverified shipping claim', /free shipping\s*(?:&amp;|&|\u00b7)\s*(?:free )?returns|free shipping\s*\u00b7\s*20-year warranty/i],
  ['Amerisleep owner language', /Amerisleep[- ]owned|owned and operated by Amerisleep|owned by Amerisleep|Amerisleep owns|operated by Amerisleep|parentOrganization[^<]{0,200}Amerisleep/i],
  ['unsupported Mattress Inquirer hands-on claim', /Mattress Inquirer (?:Testing Team|testing team)|evaluated hands-on by Mattress Inquirer|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team/i],
] ) {
  assert(!pattern.test(allHtml), `Generated HTML contains ${label}.`);
}

const disclosureApproved = process.env.PUBLIC_DISCLOSURE_APPROVED === 'true';
// Owner affiliate disclosure: commissions are disclosed; a no-commission claim is never allowed.
assert(!allHtml.includes('does not receive per-click or per-sale commissions'), 'Generated HTML publishes a no-commission claim that contradicts the affiliate disclosure.');
assert(allHtml.includes('We may earn a commission when you buy through links on this page.'), 'Generated HTML is missing the byline affiliate disclosure line.');
if (!disclosureApproved) {
  // Claims disposition: independence wording is withheld until certified.
  assert(!allHtml.includes('independently operated'), 'Uncertified build publishes an independence claim that is withheld by the claims disposition.');
}

// Owner content instructions: no named people anywhere (no authors, reviewers, or experts).
assert(!/Firdous|Farhad/.test(allHtml.replace(/\/contributors\/firdous-farhad\//g, '')), 'Generated HTML names a person; the owner rules allow no named people.');
assert(!schemaNodes.some(({ value }) => typeIncludes(value, 'Person')), 'Generated JSON-LD contains a Person entity; the owner rules allow no named people.');

const sourceReviewPendingBlogPages = [...htmlByPath].filter(([route, html]) =>
  route.startsWith('blog/')
  && route !== 'blog/index.html'
  && html.includes('data-source-review-pending="true"')
);
for (const [route, html] of sourceReviewPendingBlogPages) {
  assert(hasNoindex(html), `${route} is missing its noindex gate.`);
}

for (const [route, html] of htmlByPath) {
  if (!route.startsWith('reviews/') || route === 'reviews/index.html') continue;
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ') ?? '';
  assert(!h1.includes('$'), `${route} presents a reference price in its H1.`);
  // Owner rule (2026-10-16): no prices anywhere; the Price row is a "See Price" CTA with a data-slot.
  assert(/<th[^>]*>Price<\/th><td[^>]*><a\b[^>]*data-slot="MI-[^"]+"[^>]*>See Price<\/a>/.test(html), `${route} is missing the See Price row.`);
  assert(!/\$\d/.test(html.replace(/<script\b[\s\S]*?<\/script>/gi, '')), `${route} shows a price.`);
}

const coreRoutePattern = /^(?:index\.html|reviews\/|comparison\/|best\/|brands\/|topics\/|methodology\/|about\/|affiliate-disclosure\/|editorial-policy\/)/;
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
  if (route === 'brands/index.html') return 'brands';
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
assert(comparisonDetailPages.length === 28, `Expected 28 rendered comparison pages; found ${comparisonDetailPages.length}.`);
for (const [route, html] of comparisonDetailPages) {
  const table = html.match(/data-section="Side by Side"[\s\S]*?<\/table>/)?.[0] ?? '';
  for (const label of ['Overall', 'Value', 'Edge Support', 'Trial Period', 'Response Time', 'Motion Transfer', 'Cooling &amp; Breathability']) {
    assert(table.includes(`>${label}</th>`), `${route} Side by Side table is missing the ${label} score row.`);
  }
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
  .map(line => line.trim())
  .filter(line => line.startsWith('/blog/') && line.endsWith(' 301'));
for (const line of legacyRedirectLines) {
  const [source] = line.split(/\s+/);
  assert(!sitemapText.includes(`${expectedSite}${source}`), `Legacy redirect source remains in sitemap: ${source}`);
}
for (const [route] of sourceReviewPendingBlogPages) {
  const pathname = `/${route.replace(/index\.html$/, '')}`;
  assert(!sitemapText.includes(`${expectedSite}${pathname}`), `Source-review-pending page remains in sitemap: ${pathname}`);
}

// Scheduled (future-dated) posts must be noindex and absent from the sitemap.
const scheduledBlogPages = [...htmlByPath.entries()].filter(([route, html]) =>
  route.startsWith('blog/') && html.includes('data-scheduled="true"'),
);
for (const [route, html] of scheduledBlogPages) {
  assert(hasNoindex(html), `Scheduled page is missing its noindex gate: ${route}`);
  const pathname = `/${route.replace(/index\.html$/, '')}`;
  assert(!sitemapText.includes(`${expectedSite}${pathname}`), `Scheduled page remains in sitemap: ${pathname}`);
}
// Response security headers must ship with the build.
const headersFile = await readFile(path.join(dist, '_headers'), 'utf8').catch(() => '');
assert(headersFile.length > 0, 'dist/_headers is missing; security headers would not be served.');
for (const header of [
  'Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options',
  'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy',
]) {
  const present = headersFile.toLowerCase().includes(header.toLowerCase() + ':');
  assert(present, `dist/_headers is missing ${header}.`);
}

// Internal links must hit their canonical trailing-slash URL directly, with no 307 hop.
const slashlessTargets = new Set();
for (const [route, html] of htmlByPath.entries()) {
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const h = m[1];
    if (h === '/' || h.endsWith('/') || h.startsWith('/_')) continue;
    if (/\.(css|js|json|xml|txt|md|csv|jpg|jpeg|png|webp|svg|ico|avif)$/i.test(h)) continue;
    slashlessTargets.add(`${h} (linked from ${route})`);
  }
}
assert(slashlessTargets.size === 0, `Internal links bypass the canonical trailing slash and cost a 307 hop: ${[...slashlessTargets].slice(0, 5).join('; ')}`);

// No public warranty value may leak the internal lifetime sentinel.
for (const [route, html] of htmlByPath.entries()) {
  assert(!/\b99[-\s]year/i.test(html), `Legacy 99-year warranty sentinel is public on ${route}`);
}

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
if (previewBuild) {
  // Fail-closed preview: block everything, advertise nothing.
  assert(/Disallow:\s*\/\s*$/m.test(robots.trim()), 'Preview robots.txt must disallow all crawling.');
  assert(!/Sitemap:/i.test(robots), 'Preview robots.txt must not advertise a sitemap.');
} else {
  assert(robots.includes(`Sitemap: ${expectedSite}/sitemap-index.xml`), 'robots.txt sitemap host is not synchronized.');
  assert(/Disallow:\s*\/admin\//i.test(robots), 'robots.txt does not disallow /admin/.');
  assert(/Disallow:\s*\/api\//i.test(robots), 'robots.txt does not disallow /api/.');
}

const llmMarkdownFiles = files.filter(file => /^llms\/[^/]+\.md$/.test(relative(file)));
const llmReviewFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/reviews-'));
const llmComparisonFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/comparison-'));
const llmBestFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/best-'));
const llmBrandFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/brand-'));
const llmTopicFiles = llmMarkdownFiles.filter(file => relative(file).startsWith('llms/topic-'));
assert(llmMarkdownFiles.length === 142, `Expected 142 generated LLM Markdown files; found ${llmMarkdownFiles.length}.`);
assert(llmReviewFiles.length === 55, `Expected 55 generated LLM review files; found ${llmReviewFiles.length}.`);
assert(llmComparisonFiles.length === 28, `Expected 28 generated comparison Markdown files; found ${llmComparisonFiles.length}.`);
assert(llmBestFiles.length === 21, `Expected 21 generated ranked-category Markdown files; found ${llmBestFiles.length}.`);
assert(llmBrandFiles.length === 24, `Expected 24 generated brand Markdown files; found ${llmBrandFiles.length}.`);
assert(llmTopicFiles.length === 8, `Expected 8 generated topic Markdown files; found ${llmTopicFiles.length}.`);
for (const file of llmMarkdownFiles) {
  const content = await readFile(file, 'utf8');
  assert(content.includes(expectedSite), `${relative(file)} does not use the configured SITE_URL.`);
  assert(!/\[from page\]|\[insert|TODO|TBD/i.test(content), `${relative(file)} contains an unfinished placeholder.`);
  assert(!/weighted average formula|Support, Pressure Relief, Cooling, Motion Isolation, Edge Support, Responsiveness, Value/i.test(content), `${relative(file)} contains the stale score rubric.`);
}
for (const file of llmBestFiles) {
  const content = await readFile(file, 'utf8');
  const picks = [...content.matchAll(/^## #\d+ .+: .+$/gm)].length;
  assert(content.includes('## Our Picks at a Glance'), `${relative(file)} is missing Our Picks at a Glance.`);
  assert(picks >= 4 && picks <= 8, `${relative(file)} must list 4 to 8 ranked picks; found ${picks}.`);
}
const llmsIndex = await readFile(path.join(dist, 'llms.txt'), 'utf8');
const llmsFull = await readFile(path.join(dist, 'llms-full.txt'), 'utf8');
// Owner llms.txt format: H1, summary quote, 8 to 12 top pages, Citation block.
const llmsTopPages = (llmsIndex.split('## Top pages')[1]?.split('## Citation')[0] ?? '').split('\n').filter(line => line.startsWith(`- ${expectedSite}/`));
assert(llmsIndex.startsWith('# Mattress Inquirer\n'), 'llms.txt must start with "# Mattress Inquirer".');
assert(/^> Editorial scorecards for 55 mattresses from 24 brands/m.test(llmsIndex), 'llms.txt is missing the owner summary line.');
assert(llmsTopPages.length >= 8 && llmsTopPages.length <= 12, `llms.txt must list 8 to 12 top pages; found ${llmsTopPages.length}.`);
assert(llmsIndex.includes("Cite as Mattress Inquirer. Link to the page URL. Scores are out of 10 on Mattress Inquirer's seven-field scorecard."), 'llms.txt is missing the owner citation block.');
assert((llmsFull.match(/^Machine document:/gm) ?? []).length === 142, 'llms-full.txt does not contain all 142 machine documents.');

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
assert(htmlByPath.has('affiliate-disclosure/index.html'), 'Missing /affiliate-disclosure/ route.');
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

const topNavSource = await readFile(path.join(root, 'src', 'components', 'TopNavBar.tsx'), 'utf8');
const sourceNavigationLinks = [
  ...new Set(
    [...topNavSource.matchAll(/\bhref:\s*['"]([^'"]+)['"]/g)]
      .map(match => match[1])
      .filter(href => href.startsWith('/') && !href.startsWith('//')),
  ),
];
assert(sourceNavigationLinks.length >= 20, `Expected at least 20 source navigation links; found ${sourceNavigationLinks.length}.`);
for (const href of sourceNavigationLinks) {
  const pathname = href.split(/[?#]/)[0];
  assert(await routeExists(pathname), `TopNavBar.tsx contains a dead internal route: ${href}`);
}

const statsSource = await readFile(path.join(root, 'src', 'components', 'StatsRow.tsx'), 'utf8');
for (const expectedStat of [
  '55", label: "Mattress Models Scored',
  '24", label: "Brands Covered',
  '7", label: "Metrics Scored Per Mattress',
  '28", label: "Head-to-Head Comparisons',
]) {
  assert(statsSource.includes(expectedStat), `StatsRow.tsx is missing the approved corpus statistic: ${expectedStat}.`);
}
assert(
  !/Night Trial on All Models|Year Warranty|Amerisleep Models Reviewed/.test(statsSource),
  'StatsRow.tsx contains a model-specific claim presented as a corpus-wide statistic.',
);

const bestDetailPages = [...htmlByPath].filter(([route]) => route.startsWith('best/'));
assert(bestDetailPages.length === 21, `Expected 21 rendered ranked-category pages; found ${bestDetailPages.length}.`);
// Owner best-of template: 4 to 8 ranked pick sections, the AS3 first wherever it is ranked.
for (const [route, html] of bestDetailPages) {
  const pickIds = [...html.matchAll(/data-pick="([^"]+)"/g)].map(match => match[1]);
  assert(pickIds.length >= 4 && pickIds.length <= 8, `${route} must render 4 to 8 picks; found ${pickIds.length}.`);
  if (pickIds.includes('amerisleep-as3')) assert(pickIds[0] === 'amerisleep-as3', `${route} must rank the Amerisleep AS3 first where it qualifies.`);
  else assert(html.includes('data-as3-box'), `${route} must show the Our Best Overall Pick box when the AS3 is not ranked.`);
  const article = articleNodes.find(node => node.route === route)?.value;
  const articleBody = typeof article?.articleBody === 'string' ? article.articleBody : '';
  assert(articleBody.includes('Our Picks at a Glance') && articleBody.includes('How We Picked'), `${route} Article schema is missing the picks table or How We Picked.`);
}

const mattressImageFiles = files.filter(file => /^images\/mattresses\/[^/]+\.(?:jpe?g|png|webp)$/i.test(relative(file)));
const mattressImagesByHash = new Map();
for (const file of mattressImageFiles) {
  const hash = createHash('sha256').update(await readFile(file)).digest('hex');
  const names = mattressImagesByHash.get(hash) ?? [];
  names.push(path.basename(file));
  mattressImagesByHash.set(hash, names);
}
const allowedDuplicateImageSets = new Set([
  ['amerisleep-as3-hybrid.webp', 'amerisleep-as3.webp'].sort().join('|'),
  ['amerisleep-as5-hybrid.webp', 'amerisleep-as5.webp'].sort().join('|'),
  ['amerisleep-organica-plush.webp', 'amerisleep-organica.webp'].sort().join('|'),
]);
const disallowedDuplicateImageGroups = [...mattressImagesByHash.values()]
  .filter(names => names.length > 1)
  .filter(names => !allowedDuplicateImageSets.has([...names].sort().join('|')));
assert(
  disallowedDuplicateImageGroups.length === 0,
  `Mattress image library contains duplicate files assigned to unrelated models:\n${disallowedDuplicateImageGroups.map(group => group.join(', ')).join('\n')}`,
);

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
  console.error(`Mattress Inquirer build-output QA failed with ${failures.length} issue(s):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'pass',
  htmlFiles: htmlFiles.length,
  jsonLdScripts,
  articleSchemas: articleNodes.length,
  minimumArticleBodyCharacters: Math.min(...articleBodyLengths),
  llmMarkdownFiles: llmMarkdownFiles.length,
  llmReviewFiles: llmReviewFiles.length,
  comparisonPages: comparisonDetailPages.length,
  sourceNavigationLinks: sourceNavigationLinks.length,
  bestPages: bestDetailPages.length,
  sourceReviewPendingBlogPages: sourceReviewPendingBlogPages.length,
  scheduledBlogPages: scheduledBlogPages.length,
  internalLinksNeedingRedirect: slashlessTargets.size,
  securityHeadersConfigured: true,
  indexingMode: previewBuild ? 'preview' : 'production',
  duplicateMattressImageGroups: disallowedDuplicateImageGroups.length,
  standaloneTopicRoutes: requiredTopicRoutes.length,
  legacyRedirectsExcludedFromSitemap: legacyRedirectLines.length,
  missingSameOriginImages: 0,
  brokenInternalLinks: 0,
  siteUrl: expectedSite,
}, null, 2));
