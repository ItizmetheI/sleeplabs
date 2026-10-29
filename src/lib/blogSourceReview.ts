import { PAGE_MAP } from '../data/pageMap.generated';

type BlogSourceReviewRecord = {
  slug: string;
  category: string;
};

const HEALTH_ADJACENT_SLUG = /(?:^|-)(?:pain|sciatica|fibromyalgia|arthritis|pregnancy|pregnant|snoring|insomnia|apnea|cortisol|immune|deprivation|chronic)(?:-|$)|without-medication/;

// Owner page map rows of type "blog" were rewritten to the content rules and approved for indexing.
const OWNER_APPROVED_BLOG_URLS = new Set([
  ...PAGE_MAP.filter(row => row.pageType === 'blog').map(row => row.url),
  // Owner 2026-10-29: shopping guides kept after a content-rules pass, indexable and in the sitemap.
  ...[
    'how-body-weight-affects-mattress-firmness-feel',
    'how-to-know-if-a-mattress-is-worth-the-price',
    'how-to-read-a-mattress-spec-sheet',
    'mattress-buying-guide-for-first-time-buyers',
    'memory-foam-contouring-explained',
    'the-truth-about-mattress-warranties',
    'what-mattress-certifications-actually-mean',
    'what-a-mattress-sleep-trial-actually-covers',
    'what-to-ask-before-buying-a-mattress-online',
    'why-mattress-firmness-ratings-are-inconsistent',
    'zero-gravity-sleep-position-explained',
  ].map(slug => `/blog/${slug}/`),
]);

export const requiresBlogSourceReview = (post: BlogSourceReviewRecord): boolean =>
  !OWNER_APPROVED_BLOG_URLS.has(`/blog/${post.slug}/`)
  && (post.category === 'sleep-science' || HEALTH_ADJACENT_SLUG.test(post.slug));
