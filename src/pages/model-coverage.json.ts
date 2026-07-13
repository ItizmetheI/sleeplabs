import { allMattresses } from '../data/mattresses';
import { comparisons } from '../data/comparisons';
import { BEST_CATEGORIES } from '../lib/bestCategories';
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
  const bestAppearancesByModel = Object.entries(BEST_CATEGORIES).reduce<Record<string, string[]>>((acc, [category, config]) => {
    config.picks.forEach((id) => {
      acc[id] = acc[id] ?? [];
      acc[id].push(`/best/${category}/`);
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
    generatedBy: 'PureSleep source data',
    purpose: 'Model coverage manifest for QA against the approved EachStory score set.',
    totals: {
      models: models.length,
      bestCategories: Object.keys(BEST_CATEGORIES).length,
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
