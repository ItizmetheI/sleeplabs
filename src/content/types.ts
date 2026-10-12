// Editorial copy shapes. Each mirrors the owner template's fixed section order.
// Text fields accept [label](/path/) internal links; anything outside the page map fails the build.

export interface Faq {
  q: string;
  a: string;
}

export interface WeightGuidance {
  under130: string;
  from130to230: string;
  over230: string;
}

export interface ReviewCopy {
  slug: string;
  dateModified: string;
  /** Meta description, 140 to 160 characters. */
  metaDescription: string;
  /** 1. Quick Answer, 40 to 70 words. */
  quickAnswer: string;
  /** 4. Strengths (4) and Limitations (2 to 3). */
  strengths: [string, string, string, string];
  limitations: string[];
  /** 5. How It Was Scored, one or two sentences linking to /methodology/. */
  howScored: string;
  /** 6. Construction: "What it does" per spec layer (same order as the spec), plus 80 to 150 words. */
  layerRoles: string[];
  construction: string[];
  /** 7. Performance, 80 to 150 words per field. */
  performance: {
    value: string[];
    edgeSupport: string[];
    trialPeriod: string[];
    responseTime: string[];
    motionTransfer: string[];
    coolingBreathability: string[];
  };
  /** 8. Firmness and Feel by Sleep Position. */
  positionsIntro: string;
  positions: { side: WeightGuidance; back: WeightGuidance; stomach: WeightGuidance; combination: WeightGuidance };
  /** 9. Who Should Buy It / Who Should Skip It, 3 bullets each. */
  buy: [string, string, string];
  skip: [string, string, string];
  /** 10. How It Compares: short lead; the table rows come from alternativesFor(). */
  compareIntro: string;
  /** 11. Trial, Warranty, Shipping and Returns. */
  policies: string[];
  /** 12. FAQs, 5 to 8. */
  faqs: Faq[];
  /** 13. Verdict, 60 to 100 words. */
  verdict: string;
  /** 14. Related, 3 to 6 page-map links. */
  related: { label: string; href: string }[];
}

export interface BestPickCopy {
  /** Review slug of the pick (must match the engine's ranked order). */
  slug: string;
  /** 150 to 250 words on why it fits this category. */
  why: string[];
  strengths: string[];
  limitations: string[];
}

export interface BestCopy {
  slug: string;
  dateModified: string;
  metaDescription: string;
  /** 1. Quick answer, 2 to 3 sentences. */
  quickAnswer: string;
  /** 2. Box sentence when the AS3 does not qualify. */
  as3BoxReason?: string;
  /** 4. How We Picked (the fixed AS3 sentence is added by the template). */
  howWePicked: string[];
  /** 5. One entry per ranked pick, in rank order. */
  picks: BestPickCopy[];
  /** 6. What Matters, 200 to 400 words. */
  whatMattersHeading: string;
  whatMatters: string[];
  /** 7. FAQs, 5 to 8. */
  faqs: Faq[];
  /** 8. Related links. */
  related: { label: string; href: string }[];
}

export interface ComparisonCopy {
  slug: string;
  dateModified: string;
  metaDescription: string;
  /** 1. Quick Verdict: the leads sentence is generated; this is the who-should-pick-each sentence(s). */
  quickVerdict: string;
  feel: string[];
  construction: string[];
  edgeSupport: string[];
  motionTransfer: string[];
  cooling: string[];
  response: string[];
  valuePolicies: string[];
  buyA: [string, string, string];
  buyB: [string, string, string];
  faqs: Faq[];
  related: { label: string; href: string }[];
}

export interface BrandCopy {
  slug: string;
  dateModified: string;
  metaDescription: string;
  /** Brand summary, 100 to 150 words. */
  summary: string[];
  /** Top-scoring model section; the template adds the score and tie sentence first. */
  topModel: string[];
}
