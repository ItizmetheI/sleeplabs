// Runtime shape for the reviewed records in blogs-generated.ts. This interface
// is not a content-generation prompt; new records still require source and
// claim review under the repository rules in AGENTS.md.

export interface BlogPost {
  id: string;
  slug: string;
  redirectTo?: string;

  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  // Use a licensed, same-origin image. Do not add placeholder or hotlinked art.
  ogImage: string;

  category: string;
  tags: string[];

  author: {
    name: string;
    url: '/about/';
  };
  // Keep null until the named reviewer has approved the final article. An
  // assignment or profile alone does not justify visible or schema attribution.
  reviewedBy: {
    name: string;
    role: string;
    url: string;
  } | null;
  datePublished: string;
  dateModified: string;

  readTimeMinutes: number;
  wordCountTarget: number;
  excerpt: string;
  // Standalone, claim-safe answer to the page's primary question.
  directAnswer: string;
  sections: BlogSection[];
  faqs: FAQ[];
  internalLinks: InternalLink[];
  // Product references must use a real product, official URL, and recorded
  // reference price. They are not live offers and may cover any approved brand.
  productRefs: ProductRef[];

  schemaType: string;
  answersSI?: string;
  citableFacts?: string[];
  entityMentions?: string[];
}

export interface BlogSection {
  heading: string | null;
  headingLevel: 2 | 3 | null;
  content: string;
  hasBulletList: boolean;
  hasTable: boolean;
  bulletItems?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InternalLink {
  anchorText: string;
  // Link only to a route produced by the current build. Build QA verifies it.
  url: string;
  context?: string;
}

export interface ProductRef {
  productId: string;
  productName: string;
  productUrl: string;
  // Recorded reference field, never a promise that the price is currently live.
  salePrice: string;
  mentionContext: string;
}
