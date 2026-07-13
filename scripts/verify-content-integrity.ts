import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { allMattresses } from '../src/data/mattresses';
import { blogPosts } from '../src/data/blogs-generated';
import { comparisons } from '../src/data/comparisons';
import { topics } from '../src/data/topics';
import { BEST_CATEGORIES } from '../src/lib/bestCategories';
import { LEGACY_BEST_BLOG_REDIRECTS } from '../src/lib/legacyBlogRedirects';
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

const mattressById = new Map(allMattresses.map(mattress => [mattress.id, mattress]));
const expectedReviewIds = [...mattressById.keys()].sort();
const brandCount = new Set(allMattresses.map(mattress => mattress.brand)).size;
const siteUrl = 'https://finalize.ahmedbarkat1067.workers.dev';
const reviewDocuments = buildReviewLlmDocuments(siteUrl);
const generatedDocuments = buildGeneratedLlmDocuments(siteUrl);
const allLlmDocuments = buildAllLlmDocuments(siteUrl);
const llmsIndex = buildLlmsIndex(siteUrl);
const reviewFileIds = reviewDocuments
  .map(document => document.slug.slice('reviews-'.length))
  .sort();

assert(expectedReviewIds.length === 59, `Expected 59 mattress records; found ${expectedReviewIds.length}.`);
assert(brandCount === 24, `Expected 24 brands; found ${brandCount}.`);
assert(reviewFileIds.length === 59, `Expected 59 generated LLM review files; found ${reviewFileIds.length}.`);
assert(
  reviewFileIds.length === expectedReviewIds.length && expectedReviewIds.every(id => reviewFileIds.includes(id)),
  `Review/LLM ID mismatch. Missing: ${expectedReviewIds.filter(id => !reviewFileIds.includes(id)).join(', ') || 'none'}. Extra: ${reviewFileIds.filter(id => !expectedReviewIds.includes(id)).join(', ') || 'none'}.`,
);

const indexedReviewIds = [...llmsIndex.matchAll(/\/llms\/reviews-([a-z0-9-]+)\.md/g)]
  .map(match => match[1])
  .sort();
assert(
  indexedReviewIds.length === expectedReviewIds.length && expectedReviewIds.every(id => indexedReviewIds.includes(id)),
  `llms.txt does not list the exact 59 review IDs. Missing: ${expectedReviewIds.filter(id => !indexedReviewIds.includes(id)).join(', ') || 'none'}. Extra: ${indexedReviewIds.filter(id => !expectedReviewIds.includes(id)).join(', ') || 'none'}.`,
);

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
  comparison: 30,
  'best-index': 1,
  best: 18,
  'brand-index': 1,
  brand: 24,
  'topic-index': 1,
  topic: 8,
} as const;
for (const [kind, expected] of Object.entries(expectedGeneratedCounts)) {
  const actual = generatedDocuments.filter(document => document.kind === kind).length;
  assert(actual === expected, `Expected ${expected} generated ${kind} documents; found ${actual}.`);
}
assert(generatedDocuments.length === 86, `Expected 86 generated non-review LLM documents; found ${generatedDocuments.length}.`);
assert(allLlmDocuments.length === 145, `Expected 145 total LLM documents; found ${allLlmDocuments.length}.`);
assert(new Set(allLlmDocuments.map(document => document.slug)).size === allLlmDocuments.length, 'Generated LLM slugs are not unique.');
for (const document of allLlmDocuments) {
  assert(llmsIndex.includes(`${siteUrl}/llms/${document.slug}.md`), `llms.txt is missing ${document.slug}.md.`);
  assert(document.content.includes(`${siteUrl}${document.canonicalPath}`), `${document.slug}.md is missing its canonical HTML URL.`);
}

const methodologyDocument = generatedDocuments.find(document => document.kind === 'methodology')?.content ?? '';
for (const metric of SCORE_METRICS) {
  assert(methodologyDocument.includes(metric.label), `Methodology machine file is missing ${metric.label}.`);
}
assert(!/weighted formula|Support, Pressure Relief, Cooling, Motion Isolation, Edge Support, Responsiveness, Value/i.test(methodologyDocument), 'Methodology machine file contains the stale score rubric.');

const machineCorpus = allLlmDocuments.map(document => document.content).join('\n');
for (const [label, pattern] of [
  ['unfinished placeholder', /\[from page\]|\[insert|TODO|TBD/i],
  ['unsupported weighting formula', /weighted formula|weighted average formula/i],
] as const) {
  assert(!pattern.test(machineCorpus), `Generated LLM corpus contains ${label}.`);
}

const osgBrands = new Set(['Amerisleep', 'Zoma', 'Vaya', 'FORM']);
for (const [category, config] of Object.entries(BEST_CATEGORIES)) {
  const models = config.picks.map(id => mattressById.get(id));
  assert(config.picks.length === 6, `/best/${category}/ must contain 6 ranked models; found ${config.picks.length}.`);
  assert(models.every(Boolean), `/best/${category}/ contains an unknown mattress ID.`);
  const validModels = models.filter(Boolean) as typeof allMattresses;
  const osgCount = validModels.filter(model => osgBrands.has(model.brand)).length;
  const categoryBrandCount = new Set(validModels.map(model => model.brand)).size;
  assert(osgCount <= 3, `/best/${category}/ contains ${osgCount} OSG models; maximum is 3 of 6.`);
  assert(categoryBrandCount >= 4, `/best/${category}/ contains only ${categoryBrandCount} distinct brands; minimum is 4.`);
}

for (const comparison of comparisons) {
  assert(mattressById.has(comparison.mattressAId), `${comparison.slug} references missing ${comparison.mattressAId}.`);
  assert(mattressById.has(comparison.mattressBId), `${comparison.slug} references missing ${comparison.mattressBId}.`);
}
assert(comparisons.length === 30, `Expected 30 comparison pages; found ${comparisons.length}.`);

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

const activeBlogPosts = blogPosts.filter(post => !LEGACY_BEST_BLOG_REDIRECTS[`/blog/${post.slug}/`]);
assert(blogPosts.length === 151, `Expected 151 source blog records; found ${blogPosts.length}.`);
assert(activeBlogPosts.length === 112, `Expected 112 active blog articles after redirect consolidation; found ${activeBlogPosts.length}.`);

const surfaceFiles = [
  'README.md',
  'DOMAIN_MIGRATION.md',
  'src/pages/about/index.astro',
  'src/pages/disclosure/index.astro',
  'src/pages/editorial-policy/index.astro',
  'src/pages/methodology/index.astro',
  'src/pages/reviews/[id].astro',
  'src/pages/comparison/[slug].astro',
  'src/pages/best/[category].astro',
  'src/pages/blog/[slug].astro',
  'src/components/Hero.tsx',
  'src/components/Footer.tsx',
  'src/lib/disclosure.ts',
  'src/lib/llmDocuments.ts',
];
const publicSurface = (await Promise.all(
  surfaceFiles.map(file => readFile(path.join(root, file), 'utf8')),
)).join('\n');
for (const [label, pattern] of [
  ['false independence language', /editorially independent|independent review publication|no financial relationship/i],
  ['inactive support address', /support@puresleep\.com/i],
  ['named reviewer schema', /"reviewedBy"|post\.reviewedBy/i],
] as const) {
  assert(!pattern.test(publicSurface), `Public surfaces still contain ${label}.`);
}
assert(publicSurface.includes('owned and operated by Amerisleep'), 'Amerisleep ownership disclosure is missing.');
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
  ['unsupported performance guarantee', /measurably cooler than petroleum foam|prevent(?:s|ing)? sagging for the full 20-year warranty/i],
] as const) {
  assert(!pattern.test(publishedContent), `Published source content still contains ${label}.`);
}

const wrangler = await readFile(path.join(root, 'wrangler.jsonc'), 'utf8');
assert(
  wrangler.includes('"main": "dist/_worker.js/index.js"'),
  'wrangler.jsonc main must remain dist/_worker.js/index.js.',
);

if (failures.length > 0) {
  console.error(`PureSleep content QA failed with ${failures.length} issue(s):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'pass',
  mattressRecords: expectedReviewIds.length,
  brands: brandCount,
  llmReviewFiles: reviewFileIds.length,
  llmMachineDocuments: allLlmDocuments.length,
  bestCategoryPages: Object.keys(BEST_CATEGORIES).length,
  comparisons: comparisons.length,
  standaloneTopics: topics.length,
  activeBlogArticles: activeBlogPosts.length,
  legacyRedirects: Object.keys(LEGACY_BEST_BLOG_REDIRECTS).length,
  categoryRule: '6 models, at least 4 brands, no more than 3 OSG models',
}, null, 2));
