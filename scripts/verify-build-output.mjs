import { readdir, readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
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
const articleBodyLengths = [];
for (const { value, route } of articleNodes) {
  assert(
    typeof value.articleBody === 'string' && value.articleBody.trim().length >= 250,
    `${route} Article schema is missing a complete articleBody.`,
  );
  if (typeof value.articleBody === 'string') articleBodyLengths.push(value.articleBody.trim().length);
  assert(!('reviewedBy' in value), `${route} Article schema contains reviewedBy.`);
  assert(value.author && typeof value.author === 'object', `${route} Article schema is missing an author entity.`);
  assert(value.author?.name === 'PureSleep Editorial Team', `${route} Article schema must use the PureSleep Editorial Team organizational byline.`);
  assert(value.publisher && typeof value.publisher === 'object', `${route} Article schema is missing a publisher entity.`);
  assert(typeof value.dateModified === 'string', `${route} Article schema is missing dateModified.`);
  assert(Boolean(value.mainEntityOfPage), `${route} Article schema is missing mainEntityOfPage.`);
}

const requiredArticleSections = [
  {
    match: route => route.startsWith('reviews/') && route !== 'reviews/index.html',
    headings: ['Detailed Performance Analysis', 'Inside the Mattress', 'How This Review Is Scored', 'Frequently Asked Questions', 'Sizes & Reference Pricing'],
  },
  {
    match: route => route.startsWith('comparison/') && route !== 'comparison/index.html',
    headings: ['Specs at a Glance', 'Performance Scores', 'The Winner By Category', 'Detailed Head-to-Head Comparison', '1. Construction & Build Quality', '5. Policies & Recorded Pricing', 'Our Verdict'],
  },
  {
    match: route => route.startsWith('blog/'),
    headings: ['Quick Answer', 'Multi-Brand Context', 'Frequently Asked Questions', 'About PureSleep'],
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
  const images = Array.isArray(value.image) ? value.image : [value.image];
  assert(images.every(image => typeof image === 'string' && /^https?:\/\//.test(image)), `${route} Product schema contains a relative or missing image URL.`);
  assert(value.review && typeIncludes(value.review, 'Review'), `${route} Product schema is missing editorial Review data.`);
}

const allHtml = [...htmlByPath.values()].join('\n');
for (const [label, pattern] of [
  ['inactive support address', /support@puresleep\.com/i],
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
  ['unverified shipping claim', /free shipping\s*(?:&|and|\u00b7)\s*(?:free )?returns|free shipping\s*\u00b7\s*20-year warranty/i],
  ['Amerisleep owner language', /Amerisleep[- ]owned|owned and operated by Amerisleep|owned by Amerisleep|Amerisleep owns|operated by Amerisleep|parentOrganization[^<]{0,200}Amerisleep/i],
  ['unsupported PureSleep hands-on claim', /PureSleep (?:Testing Team|testing team)|evaluated hands-on by PureSleep|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team/i],
] ) {
  assert(!pattern.test(allHtml), `Generated HTML contains ${label}.`);
}
assert(allHtml.includes('independently operated editorial publication'), 'Generated HTML is missing the editorial-independence disclosure.');
assert(allHtml.includes('does not receive per-click or per-sale commissions'), 'Generated HTML is missing the outbound-link compensation disclosure.');
assert(allHtml.includes('Firdous Farhad'), 'Generated HTML is missing the approved health and sleep content reviewer.');
assert(allHtml.includes('Licensed massage therapist and certified sleep science coach.'), 'Generated HTML is missing Firdous Farhad\'s approved credential statement.');

const firdousPersonNodes = schemaNodes.filter(({ value }) =>
  typeIncludes(value, 'Person') && value.name === 'Firdous Farhad'
);
assert(firdousPersonNodes.length >= 1, 'Generated JSON-LD is missing the Firdous Farhad Person entity.');
for (const { value, route } of firdousPersonNodes) {
  assert(value.jobTitle === 'Health and Sleep Content Reviewer', `${route} uses the wrong jobTitle for Firdous Farhad.`);
  assert(value.description === 'Licensed massage therapist and certified sleep science coach.', `${route} uses the wrong credential description for Firdous Farhad.`);
  assert(typeof value.url === 'string' && value.url.endsWith('/contributors/firdous-farhad/'), `${route} uses the wrong profile URL for Firdous Farhad.`);
}

const sourceReviewPendingBlogPages = [...htmlByPath].filter(([route, html]) =>
  route.startsWith('blog/')
  && route !== 'blog/index.html'
  && html.includes('Editorial status: source review pending')
);
assert(sourceReviewPendingBlogPages.length === 67, `Expected 67 source-review-pending blog pages; found ${sourceReviewPendingBlogPages.length}.`);
for (const [route, html] of sourceReviewPendingBlogPages) {
  assert(/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex, follow["']/i.test(html), `${route} is missing its noindex, follow gate.`);
  assert(html.includes('Reviewer assigned:'), `${route} is missing the visible reviewer-assignment status.`);
  assert(html.includes('Firdous Farhad'), `${route} is missing Firdous Farhad's reviewer assignment.`);
  assert(!html.includes('Reviewed by Firdous Farhad'), `${route} falsely presents the pending assignment as completed review.`);
}

for (const [route, html] of htmlByPath) {
  if (!route.startsWith('reviews/') || route === 'reviews/index.html') continue;
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ') ?? '';
  assert(!h1.includes('$'), `${route} presents a reference price in its H1.`);
  assert(html.includes('Recorded dataset values, not live offers'), `${route} is missing the reference-price disclosure.`);
}

const coreRoutePattern = /^(?:index\.html|reviews\/|comparison\/|best\/|brands\/|topics\/|methodology\/|about\/|disclosure\/|editorial-policy\/|contributors\/)/;
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
for (const file of llmBestFiles) {
  const content = await readFile(file, 'utf8');
  const scoreField = content.split('## Full 59-model score field')[1]?.split('## Evidence and limits')[0] ?? '';
  const scoreFieldIds = [...scoreField.matchAll(/\/reviews\/([a-z0-9-]+)\//g)].map(match => match[1]);
  assert(scoreField.length > 0, `${relative(file)} is missing the full 59-model score-field section.`);
  assert(scoreFieldIds.length === 59, `${relative(file)} must list 59 score-field models; found ${scoreFieldIds.length}.`);
  assert(new Set(scoreFieldIds).size === 59, `${relative(file)} full score field contains duplicate model rows.`);
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
assert(htmlByPath.has('contributors/firdous-farhad/index.html'), 'Missing Firdous Farhad contributor profile route.');
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
  '59", label: "Mattress Models Scored',
  '24", label: "Brands Covered',
  '7", label: "Metrics Scored Per Mattress',
  '30", label: "Head-to-Head Comparisons',
]) {
  assert(statsSource.includes(expectedStat), `StatsRow.tsx is missing the approved corpus statistic: ${expectedStat}.`);
}
assert(
  !/Night Trial on All Models|Year Warranty|Amerisleep Models Reviewed/.test(statsSource),
  'StatsRow.tsx contains a model-specific claim presented as a corpus-wide statistic.',
);

const bestDetailPages = [...htmlByPath].filter(([route]) => route.startsWith('best/'));
assert(bestDetailPages.length === 18, `Expected 18 rendered ranked-category pages; found ${bestDetailPages.length}.`);
for (const [route, html] of bestDetailPages) {
  const scoreFieldIds = [...html.matchAll(/data-score-field-model=["']([^"']+)["']/g)].map(match => match[1]);
  const scoreFieldBrands = [...html.matchAll(/data-score-field-brand=["']([^"']+)["']/g)].map(match => match[1]);
  assert(html.includes('data-full-score-field'), `${route} is missing its full score-field container.`);
  assert(scoreFieldIds.length === 59, `${route} must render 59 full-field model rows; found ${scoreFieldIds.length}.`);
  assert(new Set(scoreFieldIds).size === 59, `${route} full score field contains duplicate model rows.`);
  assert(scoreFieldBrands.length === 59, `${route} must expose a brand for every full-score-field row.`);
  assert(new Set(scoreFieldBrands.slice(0, 12)).size >= 8, `${route} does not present enough brand diversity in the first 12 full-score-field rows.`);

  const article = articleNodes.find(node => node.route === route)?.value;
  const articleBody = typeof article?.articleBody === 'string' ? article.articleBody : '';
  assert(articleBody.includes('Full 59-Model Score Field'), `${route} Article schema is missing the full score-field section.`);
  assert(articleBody.includes('All Model Scores'), `${route} Article schema is missing the complete score-field table.`);
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
  console.error(`PureSleep build-output QA failed with ${failures.length} issue(s):`);
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
  comparisonCharts: comparisonDetailPages.length,
  sourceNavigationLinks: sourceNavigationLinks.length,
  bestPagesWithFullScoreField: bestDetailPages.length,
  modelsPerBestScoreField: 59,
  minimumDistinctBrandsInFirst12ScoreRows: Math.min(...bestDetailPages.map(([, html]) =>
    new Set([...html.matchAll(/data-score-field-brand=["']([^"']+)["']/g)].slice(0, 12).map(match => match[1])).size
  )),
  sourceReviewPendingBlogPages: sourceReviewPendingBlogPages.length,
  duplicateMattressImageGroups: disallowedDuplicateImageGroups.length,
  standaloneTopicRoutes: requiredTopicRoutes.length,
  legacyRedirectsExcludedFromSitemap: legacyRedirectLines.length,
  missingSameOriginImages: 0,
  brokenInternalLinks: 0,
  siteUrl: expectedSite,
}, null, 2));
