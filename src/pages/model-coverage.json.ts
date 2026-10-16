import { allMattresses } from '../data/mattresses';
import { comparisons } from '../data/comparisons';
import { BEST_PAGE_CONFIGS, rankBestPage } from '../lib/ranking';
import { LEGACY_BEST_BLOG_REDIRECTS } from '../lib/legacyBlogRedirects';

export const prerender = true;

const scoreKeys = [
  'overall',
  'value',
  'edgeSupport',
  'trialPeriod',
  'responseTime',
  'motionTransfer',
  'coolingBreathability',
] as const;

export const GET = () => {
  const bestAppearancesByModel = BEST_PAGE_CONFIGS.reduce<Record<string, string[]>>((acc, config) => {
    rankBestPage(config).picks.forEach(({ candidate: { mattress: { id } } }) => {
      acc[id] = acc[id] ?? [];
      acc[id].push(`/best/${config.slug}/`);
    });
    return acc;
  }, {});

  const comparisonAppearancesByModel = comparisons.reduce<Record<string, string[]>>((acc, comparison) => {
    const url = `/comparison/${comparison.slug}/`;
    [comparison.mattressAId, comparison.mattressBId].forEach((id) => {
      acc[id] = acc[id] ?? [];
      acc[id].push(url);
    });
    return acc;
  }, {});

  const models = allMattresses.map((mattress) => ({
    workbookModelName: mattress.name,
    sourceMattressId: mattress.id,
    brand: mattress.brand,
    model: mattress.model,
    liveReviewUrl: `/reviews/${mattress.id}/`,
    scores: Object.fromEntries(scoreKeys.map((key) => [key, mattress.scores[key]])),
    appearsIn: {
      reviews: true,
      best: bestAppearancesByModel[mattress.id] ?? [],
      comparison: comparisonAppearancesByModel[mattress.id] ?? [],
      legacyBestBlog: [],
    },
  }));

  return new Response(JSON.stringify({
    generatedBy: 'Mattress Inquirer source data',
    purpose: 'Published Mattress Inquirer model and score manifest for source-to-output QA.',
    totals: {
      models: models.length,
      bestCategories: BEST_PAGE_CONFIGS.length,
      comparisons: comparisons.length,
      legacyBestBlogRedirects: Object.keys(LEGACY_BEST_BLOG_REDIRECTS).length,
    },
    scoreFields: scoreKeys,
    models,
    legacyBestBlogRedirects: LEGACY_BEST_BLOG_REDIRECTS,
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
