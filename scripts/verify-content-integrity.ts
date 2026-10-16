import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

import { allMattresses } from '../src/data/mattresses';
import { blogPosts } from '../src/data/blogs-generated';
import { comparisons } from '../src/data/comparisons';
import { topics } from '../src/data/topics';
import { BEST_PAGE_CONFIGS, rankBestPage } from '../src/lib/ranking';
import { REVIEW_COPY } from '../src/content/reviews';
import { COMPARISON_COPY } from '../src/content/comparisons';
import { BEST_COPY } from '../src/content/best';
import { BRAND_COPY } from '../src/content/brands';
import { brandSlug } from '../src/lib/pageData';
import { LEGACY_BEST_BLOG_REDIRECTS } from '../src/lib/legacyBlogRedirects';
import { requiresBlogSourceReview } from '../src/lib/blogSourceReview';
import { BYLINE_DISCLOSURE } from '../src/lib/disclosure';
import { orderFullScoreField, formatOverall } from '../src/lib/scoreFieldOrder';
import {
  buildAllLlmDocuments,
  buildGeneratedLlmDocuments,
  buildLlmsIndex,
  buildReviewLlmDocuments,
  SCORE_METRICS,
} from '../src/lib/llmDocuments';

const root = process.cwd();
const failures: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};

const prohibitedActiveToolPaths = [
  'check_urls.cjs',
  'fix_404_images.cjs',
  'update_images.cjs',
  'app/applet/check_urls.cjs',
  'app/applet/fix-images.cjs',
  'app/scrape.js',
  'scripts/150-titles.json',
  'scripts/check-comparisons.js',
  'scripts/check-fixed.js',
  'scripts/count-blogs.ts',
  'scripts/fix_6.js',
  'scripts/fix_blog_schema.js',
  'scripts/fix_blogs.js',
  'scripts/gen-batch-5-test.mjs',
  'scripts/generate-blogs.ts',
  'scripts/list-models.ts',
  'scripts/t11_t12.js',
  'scripts/t1_to_t6.js',
  'scripts/t7_t12.js',
  'src/data/products_amerisleep.json',
];
for (const file of prohibitedActiveToolPaths) {
  let exists = true;
  try {
    await access(path.join(root, file));
  } catch {
    exists = false;
  }
  assert(!exists, `${file} is obsolete or unsafe and must remain outside the active build and tooling paths.`);
}

const mattressById = new Map(allMattresses.map(mattress => [mattress.id, mattress]));
const expectedReviewIds = [...mattressById.keys()].sort();
const brandCount = new Set(allMattresses.map(mattress => mattress.brand)).size;
const lockedScoreDataset = [...allMattresses]
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(mattress => [mattress.id, ...SCORE_METRICS.map(metric => mattress.scores[metric.key])].join('|'))
  .join('\n');
const lockedScoreDatasetHash = createHash('sha256').update(lockedScoreDataset).digest('hex');
// Locked to the owner's master scores file (received 2026-10-11), less the four models removed on 2026-10-16.
const approvedScoreDatasetHash = '7fa71fb8a9b38169798c41d7b5300463d67f399a2a55bcee5da6caf1dcf04564';
const siteUrl = 'https://mattressinquirer.ahmedbarkat1067.workers.dev';
const reviewDocuments = buildReviewLlmDocuments(siteUrl);
const generatedDocuments = buildGeneratedLlmDocuments(siteUrl);
const allLlmDocuments = buildAllLlmDocuments(siteUrl);
const llmsIndex = buildLlmsIndex(siteUrl);
const reviewFileIds = reviewDocuments
  .map(document => document.slug.slice('reviews-'.length))
  .sort();

assert(expectedReviewIds.length === 55, `Expected 55 mattress records; found ${expectedReviewIds.length}.`);
assert(brandCount === 24, `Expected 24 brands; found ${brandCount}.`);
const orderedScoreField = orderFullScoreField(allMattresses);
assert(
  orderedScoreField.every((model, index) => index === 0 || orderedScoreField[index - 1].scores.overall >= model.scores.overall),
  'The full score field is not ordered by Overall score.',
);
// Owner rule: Overall is the average of the six fields, shown to one decimal, never above 9.5.
for (const model of allMattresses) {
  const { value, edgeSupport, trialPeriod, responseTime, motionTransfer, coolingBreathability, overall } = model.scores;
  const average = (value + edgeSupport + trialPeriod + responseTime + motionTransfer + coolingBreathability) / 6;
  assert(formatOverall(average) === formatOverall(overall), `${model.id} Overall ${formatOverall(overall)} is not the six-field average ${formatOverall(average)}.`);
  assert(overall <= 9.5, `${model.id} Overall ${overall} is above 9.5.`);
}
assert(
  lockedScoreDatasetHash === approvedScoreDatasetHash,
  'The approved 55-model, seven-metric score dataset changed. Reconcile every edit against the source ranking sheet before updating the locked hash.',
);
assert(reviewFileIds.length === 55, `Expected 55 generated LLM review files; found ${reviewFileIds.length}.`);
assert(
  reviewFileIds.length === expectedReviewIds.length && expectedReviewIds.every(id => reviewFileIds.includes(id)),
  `Review/LLM ID mismatch. Missing: ${expectedReviewIds.filter(id => !reviewFileIds.includes(id)).join(', ') || 'none'}. Extra: ${reviewFileIds.filter(id => !expectedReviewIds.includes(id)).join(', ') || 'none'}.`,
);

// Owner llms.txt format: 8 to 12 top pages, every one on SITE_URL.
const llmsTopPages = [...llmsIndex.matchAll(/^- (\S+) : /gm)].map(match => match[1]);
assert(llmsTopPages.length >= 8 && llmsTopPages.length <= 12, `llms.txt must list 8 to 12 top pages; found ${llmsTopPages.length}.`);
assert(llmsTopPages.every(url => url.startsWith(`${siteUrl}/`)), 'llms.txt top pages must use SITE_URL.');

for (const id of expectedReviewIds) {
  const mattress = mattressById.get(id)!;
  const machineFile = reviewDocuments.find(document => document.slug === `reviews-${id}`)?.content ?? '';
  assert(
    machineFile.includes(`/reviews/${id}/`),
    `reviews-${id}.md canonical does not match /reviews/${id}/.`,
  );
  const scoreMatch = machineFile.match(/^\| Overall \|\s*([0-9.]+)\/10\s*\|$/m);
  assert(Boolean(scoreMatch), `reviews-${id}.md is missing an Overall score line.`);
  if (scoreMatch) {
    assert(
      Number(scoreMatch[1]) === Number(mattress.scores.overall),
      `reviews-${id}.md overall score ${scoreMatch[1]} does not match source score ${mattress.scores.overall}.`,
    );
  }
}

const expectedGeneratedCounts = {
  methodology: 1,
  'review-index': 1,
  'comparison-index': 1,
  comparison: 28,
  'best-index': 1,
  best: 21,
  'brand-index': 1,
  brand: 24,
  'topic-index': 1,
  topic: 8,
} as const;
for (const [kind, expected] of Object.entries(expectedGeneratedCounts)) {
  const actual = generatedDocuments.filter(document => document.kind === kind).length;
  assert(actual === expected, `Expected ${expected} generated ${kind} documents; found ${actual}.`);
}
assert(generatedDocuments.length === 87, `Expected 87 generated non-review LLM documents; found ${generatedDocuments.length}.`);
assert(allLlmDocuments.length === 142, `Expected 142 total LLM documents; found ${allLlmDocuments.length}.`);
assert(new Set(allLlmDocuments.map(document => document.slug)).size === allLlmDocuments.length, 'Generated LLM slugs are not unique.');
for (const document of allLlmDocuments) {
  assert(document.content.includes(`${siteUrl}${document.canonicalPath}`), `${document.slug}.md is missing its canonical HTML URL.`);
}

// Owner templates: every best-of page follows the ranking engine (4 to 8 picks, never SKIP), and its
// copy and machine document list the picks in that exact order.
for (const config of BEST_PAGE_CONFIGS) {
  const result = rankBestPage(config);
  const ids = result.picks.map(p => p.candidate.mattress.id);
  assert(!result.skip, `/best/${config.slug}/ has ${result.qualifierCount} qualifiers; the owner rule says SKIP.`);
  assert(ids.length >= 4 && ids.length <= 8, `/best/${config.slug}/ has ${ids.length} picks (4 to 8).`);
  const copyIds = BEST_COPY[config.slug]?.picks.map(p => p.slug) ?? [];
  assert(copyIds.join() === ids.join(), `/best/${config.slug}/ copy picks do not match the ranked order.`);
  const doc = generatedDocuments.find(d => d.slug === `best-${config.slug}`)?.content ?? '';
  const docIds = [...doc.matchAll(/^Review: \S+\/reviews\/([a-z0-9-]+)\/$/gm)].map(m => m[1]);
  assert(docIds.join() === ids.join(), `best-${config.slug}.md does not list the ranked picks in order.`);
  if (ids.includes('amerisleep-as3')) assert(ids[0] === 'amerisleep-as3', `/best/${config.slug}/ must rank the AS3 first where it qualifies.`);
}
for (const id of expectedReviewIds) assert(Boolean(REVIEW_COPY[id]), `Missing review copy for ${id}.`);
for (const comparison of comparisons) assert(Boolean(COMPARISON_COPY[comparison.slug]), `Missing comparison copy for ${comparison.slug}.`);
for (const brand of new Set(allMattresses.map(m => m.brand))) assert(Boolean(BRAND_COPY[brandSlug(brand)]), `Missing brand copy for ${brand}.`);

const methodologyDocument = generatedDocuments.find(document => document.kind === 'methodology')?.content ?? '';
for (const metric of SCORE_METRICS) {
  assert(methodologyDocument.includes(metric.label), `Methodology machine file is missing ${metric.label}.`);
}
assert(!/weighted formula|Support, Pressure Relief, Cooling, Motion Isolation, Edge Support, Responsiveness, Value/i.test(methodologyDocument), 'Methodology machine file contains the stale score rubric.');

const machineCorpus = allLlmDocuments.map(document => document.content).join('\n');
for (const [label, pattern] of [
  ['unfinished placeholder', /\[from page\]|\[insert|TODO|TBD/i],
  ['unsupported weighting formula', /weighted formula|weighted average formula/i],
  ['unsupported Mattress Inquirer hands-on claim', /Mattress Inquirer (?:Testing Team|testing team)|evaluated hands-on by Mattress Inquirer|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team/i],
] as const) {
  assert(!pattern.test(machineCorpus), `Generated LLM corpus contains ${label}.`);
}

const competitorBiasPattern = /\b(?:Amerisleep|AS2|AS3|AS5|AS6|Organica)\b/i;
for (const mattress of allMattresses) {
  assert(mattress.faqs.length >= 3, `${mattress.id} has ${mattress.faqs.length} FAQs; minimum is 3.`);

  let productUrl: URL | null = null;
  try {
    productUrl = new URL(mattress.productUrl);
  } catch {
    // The assertion below reports the record ID and malformed value.
  }
  assert(
    productUrl?.protocol === 'https:' && productUrl.pathname !== '/' && productUrl.pathname !== '',
    `${mattress.id} must use an exact HTTPS product or official archived-model source URL; found ${mattress.productUrl}.`,
  );

  if (mattress.brand !== 'Amerisleep') {
    const editorialCopy = JSON.stringify({
      summary: mattress.summary,
      verdict: mattress.verdict,
      pros: mattress.pros,
      cons: mattress.cons,
      faqs: mattress.faqs,
    });
    assert(!competitorBiasPattern.test(editorialCopy), `${mattress.id} still contains Amerisleep-specific competitor bias.`);
  }
}

for (const id of ['zoma-start']) {
  assert(Boolean(mattressById.get(id)?.availabilityNote), `${id} is missing its archived-model or construction-change notice.`);
}

for (const comparison of comparisons) {
  assert(mattressById.has(comparison.mattressAId), `${comparison.slug} references missing ${comparison.mattressAId}.`);
  assert(mattressById.has(comparison.mattressBId), `${comparison.slug} references missing ${comparison.mattressBId}.`);
}
assert(comparisons.length === 28, `Expected 28 comparison pages; found ${comparisons.length}.`);

assert(topics.length === 8, `Expected 8 standalone topic pages; found ${topics.length}.`);
for (const topic of topics) {
  const related = topic.relatedMattresses.map(id => mattressById.get(id));
  assert(related.every(Boolean), `/topics/${topic.id}/ references an unknown mattress ID.`);
  const validRelated = related.filter(Boolean) as typeof allMattresses;
  assert(validRelated.length >= 3, `/topics/${topic.id}/ must link at least 3 scored mattresses.`);
  assert(new Set(validRelated.map(mattress => mattress.brand)).size >= 2, `/topics/${topic.id}/ must include multiple brands.`);
}

const redirects = await readFile(path.join(root, 'public', '_redirects'), 'utf8');
for (const [source, destination] of Object.entries(LEGACY_BEST_BLOG_REDIRECTS)) {
  assert(
    redirects.includes(`${source} ${destination} 301`),
    `Missing redirect rule: ${source} ${destination} 301.`,
  );
}

const activeBlogPosts = blogPosts.filter(post => !post.redirectTo && !LEGACY_BEST_BLOG_REDIRECTS[`/blog/${post.slug}/`]);
assert(blogPosts.length === 149, `Expected 149 source blog records; found ${blogPosts.length}.`);
assert(activeBlogPosts.length === 76, `Expected 76 active blog articles after the 2026-10-16 page-map cuts; found ${activeBlogPosts.length}.`);
for (const post of activeBlogPosts) {
  assert(post.author.name === 'Mattress Inquirer Editorial Team', `${post.slug} must use the Mattress Inquirer Editorial Team organizational byline.`);
  assert(post.reviewedBy === null, `${post.slug} contains an unverified reviewer attribution.`);
}
const sourceReviewPendingPosts = activeBlogPosts.filter(requiresBlogSourceReview);
assert(sourceReviewPendingPosts.length === 22, `Expected 22 source-review-pending blog articles; found ${sourceReviewPendingPosts.length}.`);

const surfaceFiles = [
  'AGENTS.md',
  'README.md',
  'DOMAIN_MIGRATION.md',
  'metadata.json',
  'src/pages/about/index.astro',
  'src/pages/affiliate-disclosure/index.astro',
  'src/pages/editorial-policy/index.astro',
  'src/pages/methodology/index.astro',
  'src/pages/reviews/[id].astro',
  'src/pages/comparison/[slug].astro',
  'src/pages/best/[category].astro',
  'src/pages/blog/[slug].astro',
  'src/components/Hero.tsx',
  'src/components/Footer.tsx',
  'src/data/blogSchema.ts',
  'src/lib/disclosure.ts',
  'src/lib/llmDocuments.ts',
];
const publicSurface = (await Promise.all(
  surfaceFiles.map(file => readFile(path.join(root, file), 'utf8')),
)).join('\n');
for (const [label, pattern] of [
  ['unsupported financial-independence promise', /no financial relationship/i],
  ['prohibited relationship language', /One[-\s]+Sleep[-\s]+Group|material[-\s]+business[-\s]+relationship|affiliated[-\s]+and[-\s]+non-affiliated|non-affiliated|family[-\s]+of[-\s]+brands/i],
  ['inactive support address', /support@mattressinquirer\.com/i],
  ['named reviewer schema', /"reviewedBy"|post\.reviewedBy/i],
  ['Amerisleep owner language', /Amerisleep[- ]owned|owned and operated by Amerisleep|owned by Amerisleep|Amerisleep owns|operated by Amerisleep|parentOrganization[^\n]+Amerisleep/i],
  ['unsupported Mattress Inquirer hands-on claim', /Mattress Inquirer (?:Testing Team|testing team)|evaluated hands-on by Mattress Inquirer|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team|Hands-on testing and practical analysis/i],
] as const) {
  assert(!pattern.test(publicSurface), `Public surfaces still contain ${label}.`);
}
assert(publicSurface.includes('independently operated editorial publication'), 'The certified-only independence branch is missing from disclosure.ts.');
assert(!publicSurface.includes('does not receive per-click or per-sale commissions'), 'A no-commission claim contradicts the owner affiliate disclosure.');
assert(BYLINE_DISCLOSURE === 'We may earn a commission when you buy through links on this page.', 'The fixed owner byline disclosure text changed.');
assert(!/Firdous|Farhad/.test(publicSurface.replace(/\/contributors\/firdous-farhad\//g, '')), 'Public surfaces name a person; the owner rules allow no named people.');
const publishedContent = JSON.stringify({
  mattresses: allMattresses,
  comparisons,
  topics,
  blogPosts: activeBlogPosts,
  publicSurface,
});
for (const [label, pattern] of [
  ['proof-gated test equipment', /clinical pressure mapping|thermal imaging|temperature mapping tests?|motion transfer sensors?|hands-on-grade biometric rings?/i],
  ['proof-gated test duration', /\b(?:90|120) nights tested\b|minimum (?:90|120) nights|120h Testing Per Mattress|testedNights/i],
  ['unsupported quantified cooling claim', /\b7\s*°?F cooler|\b25% (?:cooler|more breathable)/i],
  ['unsupported medical language', /medical brace|permanently stop morning stiffness|shuts it down immediately|fix(?:es|ed|ing)? (?:spinal|disc) inflammation|mechanical airway fix/i],
  ['false independent-testing claim', /independently tested alternatives|independent sleep product testing team/i],
  ['prohibited relationship language', /One[-\s]+Sleep[-\s]+Group|material[-\s]+business[-\s]+relationship|affiliated[-\s]+and[-\s]+non-affiliated|non-affiliated|family[-\s]+of[-\s]+brands/i],
  ['unsupported Mattress Inquirer hands-on claim', /Mattress Inquirer (?:Testing Team|testing team)|evaluated hands-on by Mattress Inquirer|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team|Hands-on testing and practical analysis/i],
  ['Amerisleep owner language', /Amerisleep[- ]owned|owned and operated by Amerisleep|owned by Amerisleep|Amerisleep owns|operated by Amerisleep|parentOrganization[^\n]+Amerisleep/i],
  ['unsupported performance guarantee', /measurably cooler than petroleum foam|prevent(?:s|ing)? sagging for the full 20-year warranty/i],
  ['unsupported first-person test attribution', /\bin (?:our|Mattress Inquirer's) test(?:ing|s)\b|across tested mattresses/i],
  ['unsupported comparative superlative', /class-leading|best-in-class|industry-leading/i],
] as const) {
  assert(!pattern.test(publishedContent), `Published source content still contains ${label}.`);
}

const wrangler = await readFile(path.join(root, 'wrangler.jsonc'), 'utf8');
assert(
  wrangler.includes('"main": "dist/_worker.js/index.js"'),
  'wrangler.jsonc main must remain dist/_worker.js/index.js.',
);

if (failures.length > 0) {
  console.error(`Mattress Inquirer content QA failed with ${failures.length} issue(s):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'pass',
  mattressRecords: expectedReviewIds.length,
  brands: brandCount,
  approvedScoreDatasetHash: lockedScoreDatasetHash,
  exactProductOrOfficialArchiveUrls: allMattresses.length,
  recordsWithAtLeastThreeFaqs: allMattresses.filter(mattress => mattress.faqs.length >= 3).length,
  archivedOrChangedModelNotices: allMattresses.filter(mattress => mattress.availabilityNote).length,
  llmReviewFiles: reviewFileIds.length,
  llmMachineDocuments: allLlmDocuments.length,
  bestCategoryPages: BEST_PAGE_CONFIGS.length,
  comparisons: comparisons.length,
  standaloneTopics: topics.length,
  activeBlogArticles: activeBlogPosts.length,
  sourceReviewPendingBlogArticles: sourceReviewPendingPosts.length,
  legacyRedirects: Object.keys(LEGACY_BEST_BLOG_REDIRECTS).length,
  bestMachineDocuments: generatedDocuments.filter(document => document.kind === 'best').length,
  prohibitedActiveTools: 0,
  categoryRule: 'owner ranking rows: 4 to 8 picks, AS3 first where it qualifies, copy and machine documents in engine order',
}, null, 2));
