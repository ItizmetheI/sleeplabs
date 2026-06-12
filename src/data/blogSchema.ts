// ============================================================
// PURESLEEP BLOG POST SCHEMA
// Every blog post in blogs-generated.ts must match this exactly.
// AI MUST validate every field before outputting.
// ============================================================

export interface BlogPost {
  // ─── IDENTITY ───────────────────────────────────────────
  id: string;
  // Unique slug. Lowercase, hyphens only. No spaces. No special chars.
  // Example: "how-to-choose-a-mattress-firmness"
  // MUST match the URL: /blog/{id}

  slug: string;
  // Same as id. Duplicated intentionally for template clarity.

  // ─── METADATA ───────────────────────────────────────────
  title: string;
  // 50-70 characters. Sentence case (not Title Case every word).
  // Include the year "2026" if the topic benefits from freshness signal.
  // NEVER use "Ultimate Guide" or "Complete Guide" — overused.
  // Example: "How to choose mattress firmness for back sleepers (2026)"

  metaTitle: string;
  // Same as title OR slightly shorter version for <title> tag.
  // Max 60 characters. Always include "| PureSleep" suffix.
  // Example: "Mattress Firmness for Back Sleepers 2026 | PureSleep"

  metaDescription: string;
  // 140-160 characters exactly. One sentence. No clickbait.
  // Must summarize the ACTUAL content of the post.
  // Must include primary keyword naturally.
  // Example: "Learn which mattress firmness level works best for back sleepers, with expert-backed guidance and our top picks for 2026."

  canonicalUrl: string;
  // Always: "https://[YOUR-SITE-DOMAIN]/blog/{slug}"
  // Placeholder until domain is decided: leave as "/blog/{slug}"

  ogTitle: string;
  // Social share title. Can be slightly more punchy than metaTitle.
  // Max 70 characters.

  ogDescription: string;
  // Social share description. Max 200 characters.

  ogImage: string;
  // Use Unsplash URL for placeholder. Format:
  // Use Amerisleep CDN or same-origin images only. No Unsplash.
  // Choose a relevant bedroom/sleep/mattress image.
  // NEVER use a made-up Unsplash URL. Use only real IDs from this approved list:
  // Bedroom: 1540518614846-7eded433c457, 1505693314120-0d443867891c
  // Sleep: 1531353827579-6e6f95e8b84e, 1545013280-a3e4e6e9a0df
  // Mattress: 1600585154340-be6161a56a0c, 1556909211-36987daf7b61
  // Bedding: 1591820328689-9db07d29ccfd, 1561048267-04b176af5e87
  // Person sleeping: 1520206183501-b80df61043c2

  // ─── TAXONOMY ───────────────────────────────────────────
  category: string;
  // Assign the single most accurate category.

  tags: string[];
  // 3-6 tags. Lowercase, hyphens. From this approved list only:
  // "memory-foam" | "hybrid" | "innerspring" | "latex" | "organic"
  // "side-sleepers" | "back-sleepers" | "stomach-sleepers" | "combination-sleepers" | "hot-sleepers" | "couples"
  // "back-pain" | "hip-pain" | "shoulder-pain" | "sciatica" | "arthritis" | "fibromyalgia"
  // "firmness" | "support" | "pressure-relief" | "motion-isolation" | "edge-support" | "cooling"
  // "mattress-care" | "mattress-topper" | "pillows" | "bedding" | "adjustable-base"
  // "sleep-tips" | "sleep-science" | "bedroom-design" | "buying-guide"
  // "amerisleep" | "certipur-us" | "bio-pur" | "hive-technology"
  // DO NOT invent new tags.

  // ─── AUTHORSHIP & DATES ─────────────────────────────────
  author: {
    name: string;
    url: '/about/';
  };

  reviewedBy: {
    name: string;
    role: string;
    url: string;
  } | null;

  datePublished: string;
  // ISO 8601 format: "2026-05-01"
  // Spread across May 2026. No two posts on same date.
  // Use dates from 2026-05-01 to 2026-05-31.

  dateModified: string;
  // Same as datePublished for new posts.
  // ISO 8601 format.

  // ─── CONTENT ────────────────────────────────────────────
  readTimeMinutes: number;
  // Honest estimate. 800 words ≈ 5 min. 1600 words ≈ 10 min.
  // Min 5 minutes. Max 15 minutes.

  wordCountTarget: number;
  // Target word count for the full article body.
  // Min 900 words. Max 2200 words.
  // This does NOT include the JSON fields — only the article prose.

  excerpt: string;
  // 2-3 sentences. The actual lede of the post.
  // Written in active voice. No "In this article we will..."
  // This is what appears on the blog index card.

  directAnswer: string;
  // 50-75 word direct answer to the post's primary question. This appears at the top of the article. Written so an LLM can use it verbatim as a featured snippet.

  // ─── ARTICLE STRUCTURE ─────────────────────────────────
  sections: BlogSection[];
  // See BlogSection type below.
  // Min 4 sections. Max 8 sections.
  // First section MUST be an intro with no heading (heading: null).
  // Last section MUST be either a conclusion or a FAQ.

  faqs: FAQ[];
  // Min 3 FAQs. Max 6 FAQs.
  // These render as <details><summary> in HTML AND as FAQPage JSON-LD.
  // Questions must be real questions people ask (search-query phrasing).
  // Answers 40-80 words each. Specific. No fluff.

  // ─── INTERNAL LINKS ─────────────────────────────────────
  internalLinks: InternalLink[];
  // Min 2. Max 5.
  // Every link must be to a page that actually exists on the site.
  // Use ONLY these approved internal URLs:
  // "/reviews/amerisleep-as3"
  // "/reviews/amerisleep-as2"
  // "/reviews/amerisleep-as5"
  // "/reviews/"
  // "/guides/"
  // "/comparison/"
  // "/methodology/"
  // "/topics/"
  // DO NOT link to pages that don't exist yet.

  // ─── PRODUCT REFERENCES ─────────────────────────────────
  productRefs: ProductRef[];
  // 1-3 product references per post.
  // ONLY from the approved products_amerisleep.json file.
  // NEVER invent a product, price, or URL.
  // If the topic doesn't naturally lead to a product, use 1 and make it subtle.

  // ─── SCHEMA ─────────────────────────────────────────────
  schemaType: string;
  // Most posts: 'Article'
  // Step-by-step how-to posts: 'HowTo'
  // Pure question-answer posts: 'FAQPage'
  // Note: ALL posts also get FAQPage schema appended from the faqs field.

  answersSI?: string;
  citableFacts?: string[];
  entityMentions?: string[];
}

export interface BlogSection {
  heading: string | null;
  // null for intro section only.
  // H2 for main sections. Written as a direct statement or question.
  // Never "Introduction" or "Conclusion" as headings — write a real heading.

  headingLevel: 2 | 3 | null;
  // null for intro. 2 for main sections. 3 for subsections.

  content: string;
  // Full prose for this section. Min 120 words per section.
  // Written in second person ("you") or active voice.
  // No bullet lists as the only content — prose first, bullets as supplement.
  // No filler phrases: "It's worth noting", "It's important to remember",
  // "In conclusion", "To summarize", "At the end of the day".
  // Specific facts, numbers, and named products only from approved sources.
  // If a section references a product, it must match productRefs exactly.

  hasBulletList: boolean;
  // true if this section contains a bullet or numbered list.

  hasTable: boolean;
  // true if this section contains a comparison table.

  bulletItems?: string[];
  // Only present if hasBulletList: true.
  // 3-8 items. Each item 10-25 words. Specific, not vague.

  tableData?: {
    headers: string[];
    rows: string[][];
  };
  // Only present if hasTable: true.
}

export interface FAQ {
  question: string;
  // Phrased as a real search query. Start with Who/What/When/Where/Why/How/Is/Are/Can/Do.
  // Max 12 words.

  answer: string;
  // 40-80 words. Specific. First sentence answers the question directly.
  // May reference a product if relevant — must match productRefs.
  // Never says "it depends" without immediately explaining what it depends on.
}

export interface InternalLink {
  anchorText: string;
  // Natural-sounding anchor text. Not keyword-stuffed.
  url: string;
  // Must be from the approved internal URL list above.
  context?: string;
  // One sentence explaining where in the article this link appears.
}

export interface ProductRef {
  productId: string;
  // Must match a key from products_amerisleep.json:
  // "AS2" | "AS3" | "AS5" | "AS6" | "Organica" | "FlexPillow" |
  // "ComfortClassicPillow" | "DualComfortPillow" | "Foundation" |
  // "AdjustableBedBase" | "AdjustableBedFrame" | "PlatformBedFrame" |
  // "UpholsteredBedFrame" | "BambooSheets" | "TencelSheets" |
  // "BambooProtector" | "LiftTopper" | "RecoverComforter" |
  // "LatexBlissTopper" | "WoolGuardProtector" | "LatexLuxePillow"

  productName: string;
  // Exact name from products_amerisleep.json. Copy it verbatim.

  productUrl: string;
  // Exact URL from products_amerisleep.json. Copy it verbatim.

  salePrice: string;
  // Exact sale price from products_amerisleep.json. Copy it verbatim.
  // If no sale price, use original price.

  mentionContext: string;
  // How the product is mentioned in the post.
}
