import { PAGE_MAP } from '../data/pageMap.generated';

type BlogSourceReviewRecord = {
  slug: string;
  category: string;
};

const HEALTH_ADJACENT_SLUG = /(?:^|-)(?:pain|sciatica|fibromyalgia|arthritis|pregnancy|pregnant|snoring|insomnia|apnea|cortisol|immune|deprivation|chronic)(?:-|$)|without-medication/;

// Owner page map rows of type "blog" were rewritten to the content rules and approved for indexing.
const OWNER_APPROVED_BLOG_URLS = new Set(PAGE_MAP.filter(row => row.pageType === 'blog').map(row => row.url));

export const requiresBlogSourceReview = (post: BlogSourceReviewRecord): boolean =>
  !OWNER_APPROVED_BLOG_URLS.has(`/blog/${post.slug}/`)
  && (post.category === 'sleep-science' || HEALTH_ADJACENT_SLUG.test(post.slug));
