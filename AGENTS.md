# PureSleep repository rules

PureSleep is an independently operated, multi-brand editorial mattress
comparison publication. Do not describe PureSleep as owned, operated,
affiliated, or controlled by any mattress brand, retail group, or related
brand family. Do not imply that a reviewed brand participates in PureSleep's
editorial decisions.

## Product and score sources

- `src/data/mattresses.ts` is the runtime source for the current 59-model,
  24-brand corpus and its seven editorial score fields.
- Keep every score identical across HTML, JSON-LD, comparison charts, ranked
  pages, `/llms/` documents, and `model-coverage.json`.
- Never invent, round, interpolate, or adjust a score to change a ranking.
- Treat price, trial, warranty, certification, availability, and construction
  fields as recorded references, not live offers. Tell readers to verify
  current terms on the official brand or certification source.
- Do not add a product fact without a public source that can be linked and
  reviewed. Omit unsupported facts instead of adding placeholders.
- Category pages keep their approved six ranked picks and must also expose the
  full 59-model score field so every covered brand is visible for comparison.

## Editorial and claim safety

- Use `PureSleep Editorial Team` as the organizational byline unless a real,
  approved person is assigned and publicly supported.
- `Firdous Farhad` is the approved Health and Sleep Content Reviewer. The
  approved credential statement is `Licensed massage therapist and certified
  sleep science coach.` Do not add license numbers, jurisdictions, issuers, or
  other credentials until the supporting source is recorded.
- Assignment is not completed review. Add visible `Reviewed by Firdous Farhad`
  attribution and `Article.reviewedBy` schema only after she has reviewed and
  approved that article's final copy. Until then, health and sleep-science
  pages must remain labeled pending, `noindex, follow`, and out of the sitemap.
- Do not claim PureSleep physically tested, slept on, pressure-mapped,
  temperature-mapped, clinically evaluated, or tested a product for a stated
  number of nights unless the exact evidence is approved and published.
- Do not create doctor, chiropractor, medical-reviewer, laboratory, sensor, or
  certification claims without proof and approval.
- No mattress can diagnose, treat, cure, or prevent a health condition.
  Health-adjacent content must use cautious comfort language and requires a
  qualified professional review before production approval.
- Do not turn manufacturer language or testimonials into universal outcomes.
  Prefer `designed to`, `may help`, `recorded as`, and `based on the approved
  editorial dataset` when those phrases accurately describe the evidence.
- Avoid unsupported superlatives, performance guarantees, recurring-update
  promises, live sale claims, and current-price claims.
- Apply the same evidence standard to every covered brand.

## SEO, AEO, schema, and LLM output

- Build crawlable HTML with one title, one meta description, one canonical,
  and one H1 on every indexable page.
- Generate every canonical, sitemap URL, robots sitemap line, JSON-LD URL, and
  machine-document URL from `SITE_URL`.
- Article JSON-LD must include the complete visible editorial article in
  `articleBody`, including answer blocks, score tables, FAQs, methodology, and
  editorial disclosures that appear on the page.
- Use Organization authorship for the editorial team and editorial `Review`
  for PureSleep scorecards. Do not use `AggregateRating` without a real
  collected rating corpus. Do not emit live `Offer` data from recorded prices.
- Every priority HTML page must expose its matching Markdown alternate, and the
  `/llms/` document must preserve the same facts, scores, limits, and editorial
  independence language.
- Keep answer blocks concise, entity relationships explicit, tables labeled,
  and methodology easy for search and answer engines to extract.

## Navigation, assets, and UX

- Navigation may link only to routes produced by the current build. Keep the
  source-link QA gate enabled because client-rendered menu links do not appear
  in prerendered HTML link scans.
- Keep navigation and recommendation surfaces multi-brand. Do not make the site
  read like an Amerisleep-only blog.
- Self-host mattress imagery under `public/images/mattresses/`; do not hotlink
  product images or introduce placeholder stock imagery.
- Build mobile-first, keyboard-accessible controls with visible focus behavior,
  accurate ARIA state, stable layouts, and readable horizontal data tables.

## Generation and maintenance

- Do not run anything in `_archive/unsafe-generators/`. Those files are retained
  only for history and can reintroduce unsupported claims or stale data.
- Do not add or run a content generator until its sources, prompts, claim rules,
  output schema, and QA checks have been reviewed against this file.
- Reuse the current Astro, React, Tailwind, schema, and LLM helpers. Do not add a
  new framework or duplicate source of truth for the score corpus.
- Make the smallest complete change and preserve routes, redirects, analytics,
  metadata, schema, and machine documents unless the task explicitly changes
  them.

## Required QA

Run the following before handing off code:

```sh
npm run lint
npm run qa:content
SITE_URL=https://qa.puresleep.example npm run build
SITE_URL=https://qa.puresleep.example npm run qa:dist
npm run qa:external
```

The external-link check may report bot-blocked or rate-limited official pages
as inconclusive; investigate confirmed 404 or 410 responses before release.
Also inspect representative desktop and mobile pages, validate the final
configured domain separately, and report exactly what passed, failed, was
corrected, or still requires approval. Do not call a worker-preview result a
production-domain verification.
