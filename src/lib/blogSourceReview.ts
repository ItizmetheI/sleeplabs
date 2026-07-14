type BlogSourceReviewRecord = {
  slug: string;
  category: string;
};

const HEALTH_ADJACENT_SLUG = /(?:^|-)(?:pain|sciatica|fibromyalgia|arthritis|pregnancy|pregnant|snoring|insomnia|apnea|cortisol|immune|deprivation|chronic)(?:-|$)|without-medication/;

export const requiresBlogSourceReview = (post: BlogSourceReviewRecord): boolean =>
  post.category === 'sleep-science' || HEALTH_ADJACENT_SLUG.test(post.slug);
