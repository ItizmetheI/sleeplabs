import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

import { allMattresses } from '../src/data/mattresses';
import { blogPosts } from '../src/data/blogs-generated';
import { comparisons } from '../src/data/comparisons';
import { topics } from '../src/data/topics';
import { BEST_CATEGORIES } from '../src/lib/bestCategories';
import { LEGACY_BEST_BLOG_REDIRECTS } from '../src/lib/legacyBlogRedirects';
import { requiresBlogSourceReview } from '../src/lib/blogSourceReview';
import { FIRDOUS_FARHAD } from '../src/lib/editorialPeople';
import { orderFullScoreField } from '../src/lib/scoreFieldOrder';
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
const approvedScoreDatasetHash = '44dfcd275bb4b20a5b6001703ca9bebb8871d702f4a0cd0ccea0f84c17e3caf8';
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
const orderedScoreField = orderFullScoreField(allMattresses);
assert(
  orderedScoreField.every((model, index) => index === 0 || orderedScoreField[index - 1].scores.overall >= model.scores.overall),
  'The full score field is not ordered by Overall score.',
);
assert(
  new Set(orderedScoreField.slice(0, 12).map(model => model.brand)).size >= 8,
  'The first 12 full-score-field rows do not present enough brand diversity.',
);
assert(
  lockedScoreDatasetHash === approvedScoreDatasetHash,
  'The approved 59-model, seven-metric score dataset changed. Reconcile every edit against the source ranking sheet before updating the locked hash.',
);
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

for (const document of generatedDocuments.filter(document => document.kind === 'best')) {
  const scoreField = document.content.split('## Full 59-model score field')[1]?.split('## Evidence and limits')[0] ?? '';
  const scoreFieldIds = [...scoreField.matchAll(/\/reviews\/([a-z0-9-]+)\//g)].map(match => match[1]);
  assert(scoreField.length > 0, `${document.slug}.md is missing the full score-field section.`);
  assert(scoreFieldIds.length === 59, `${document.slug}.md must list 59 full-field model rows; found ${scoreFieldIds.length}.`);
  assert(new Set(scoreFieldIds).size === 59, `${document.slug}.md contains duplicate full-field model rows.`);
  assert(
    expectedReviewIds.every(id => scoreFieldIds.includes(id)),
    `${document.slug}.md does not include every approved mattress model.`,
  );
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
  ['unsupported PureSleep hands-on claim', /PureSleep (?:Testing Team|testing team)|evaluated hands-on by PureSleep|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team/i],
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

assert(BEST_CATEGORIES.value?.winner === 'vaya-hybrid', 'The value-category winner must be Vaya Hybrid.');
for (const id of ['bear-star-hybrid', 'ghostbed-flex', 'sweetnight-prime', 'nolah-original-hybrid', 'zoma-start']) {
  assert(Boolean(mattressById.get(id)?.availabilityNote), `${id} is missing its archived-model or construction-change notice.`);
}

const concentrationGuardBrands = new Set(['Amerisleep', 'Zoma', 'Vaya', 'FORM']);
for (const [category, config] of Object.entries(BEST_CATEGORIES)) {
  const models = config.picks.map(id => mattressById.get(id));
  assert(config.picks.length === 6, `/best/${category}/ must contain 6 ranked models; found ${config.picks.length}.`);
  assert(models.every(Boolean), `/best/${category}/ contains an unknown mattress ID.`);
  const validModels = models.filter(Boolean) as typeof allMattresses;
  const guardedBrandCount = validModels.filter(model => concentrationGuardBrands.has(model.brand)).length;
  const categoryBrandCount = new Set(validModels.map(model => model.brand)).size;
  assert(guardedBrandCount <= 3, `/best/${category}/ contains ${guardedBrandCount} models from the concentration-guard set; maximum is 3 of 6.`);
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

const activeBlogPosts = blogPosts.filter(post => !post.redirectTo && !LEGACY_BEST_BLOG_REDIRECTS[`/blog/${post.slug}/`]);
assert(blogPosts.length === 151, `Expected 151 source blog records; found ${blogPosts.length}.`);
assert(activeBlogPosts.length === 111, `Expected 111 active blog articles after redirect consolidation; found ${activeBlogPosts.length}.`);
for (const post of activeBlogPosts) {
  assert(post.author.name === 'PureSleep Editorial Team', `${post.slug} must use the PureSleep Editorial Team organizational byline.`);
  assert(post.reviewedBy === null, `${post.slug} contains an unverified reviewer attribution.`);
}
const sourceReviewPendingPosts = activeBlogPosts.filter(requiresBlogSourceReview);
assert(sourceReviewPendingPosts.length === 67, `Expected 67 source-review-pending blog articles; found ${sourceReviewPendingPosts.length}.`);
assert(FIRDOUS_FARHAD.name === 'Firdous Farhad', 'The approved health and sleep content reviewer name changed.');
assert(
  FIRDOUS_FARHAD.credentials === 'Licensed massage therapist and certified sleep science coach.',
  'The approved Firdous Farhad credential statement changed.',
);

const surfaceFiles = [
  'AGENTS.md',
  'README.md',
  'DOMAIN_MIGRATION.md',
  'metadata.json',
  'src/pages/about/index.astro',
  'src/pages/disclosure/index.astro',
  'src/pages/editorial-policy/index.astro',
  'src/pages/methodology/index.astro',
  'src/pages/contributors/firdous-farhad/index.astro',
  'src/pages/reviews/[id].astro',
  'src/pages/comparison/[slug].astro',
  'src/pages/best/[category].astro',
  'src/pages/blog/[slug].astro',
  'src/components/Hero.tsx',
  'src/components/Footer.tsx',
  'src/data/blogSchema.ts',
  'src/lib/disclosure.ts',
  'src/lib/editorialPeople.ts',
  'src/lib/llmDocuments.ts',
];
const publicSurface = (await Promise.all(
  surfaceFiles.map(file => readFile(path.join(root, file), 'utf8')),
)).join('\n');
for (const [label, pattern] of [
  ['unsupported financial-independence promise', /no financial relationship/i],
  ['prohibited relationship language', /One[-\s]+Sleep[-\s]+Group|material[-\s]+business[-\s]+relationship|affiliated[-\s]+and[-\s]+non-affiliated|non-affiliated|family[-\s]+of[-\s]+brands/i],
  ['inactive support address', /support@puresleep\.com/i],
  ['named reviewer schema', /"reviewedBy"|post\.reviewedBy/i],
  ['Amerisleep owner language', /Amerisleep[- ]owned|owned and operated by Amerisleep|owned by Amerisleep|Amerisleep owns|operated by Amerisleep|parentOrganization[^\n]+Amerisleep/i],
  ['unsupported PureSleep hands-on claim', /PureSleep (?:Testing Team|testing team)|evaluated hands-on by PureSleep|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team|Hands-on testing and practical analysis/i],
] as const) {
  assert(!pattern.test(publicSurface), `Public surfaces still contain ${label}.`);
}
assert(publicSurface.includes('independently operated editorial publication'), 'Editorial-independence disclosure is missing.');
assert(publicSurface.includes('does not receive per-click or per-sale commissions'), 'Outbound-link compensation disclosure is missing.');
assert(publicSurface.includes(FIRDOUS_FARHAD.name), 'Firdous Farhad is missing from the public editorial surfaces.');
assert(publicSurface.includes(FIRDOUS_FARHAD.role), 'Firdous Farhad\'s reviewer role is missing from the public editorial surfaces.');
assert(publicSurface.includes(FIRDOUS_FARHAD.credentials), 'Firdous Farhad\'s approved credential statement is missing from the public editorial surfaces.');
assert(publicSurface.includes(FIRDOUS_FARHAD.path), 'Firdous Farhad\'s contributor profile is not linked from the public editorial surfaces.');
const publishedContent = JSON.stringify({
  mattresses: allMattresses,
  comparisons,
  topics,
  bestCategories: BEST_CATEGORIES,
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
  ['unsupported PureSleep hands-on claim', /PureSleep (?:Testing Team|testing team)|evaluated hands-on by PureSleep|scores (?:come|derive) from hands-on testing|scores are editorial, hands-on evaluations|our hands-on testing|hands-on mattress (?:reviews|rankings)|Hands-On Team Testing|quantified by our testing team|Hands-on testing and practical analysis/i],
  ['Amerisleep owner language', /Amerisleep[- ]owned|owned and operated by Amerisleep|owned by Amerisleep|Amerisleep owns|operated by Amerisleep|parentOrganization[^\n]+Amerisleep/i],
  ['unsupported performance guarantee', /measurably cooler than petroleum foam|prevent(?:s|ing)? sagging for the full 20-year warranty/i],
  ['unsupported first-person test attribution', /\bin (?:our|PureSleep's) test(?:ing|s)\b|across tested mattresses/i],
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
  console.error(`PureSleep content QA failed with ${failures.length} issue(s):`);
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
  valueCategoryWinner: BEST_CATEGORIES.value?.winner,
  llmReviewFiles: reviewFileIds.length,
  llmMachineDocuments: allLlmDocuments.length,
  bestCategoryPages: Object.keys(BEST_CATEGORIES).length,
  comparisons: comparisons.length,
  standaloneTopics: topics.length,
  activeBlogArticles: activeBlogPosts.length,
  sourceReviewPendingBlogArticles: sourceReviewPendingPosts.length,
  legacyRedirects: Object.keys(LEGACY_BEST_BLOG_REDIRECTS).length,
  bestMachineDocumentsWithFullScoreField: generatedDocuments.filter(document => document.kind === 'best').length,
  modelsPerBestScoreField: expectedReviewIds.length,
  prohibitedActiveTools: 0,
  categoryRule: '6 models, at least 4 brands, no more than 3 models from the concentration-guard set',
}, null, 2));
