# PureSleep E-E-A-T and Citation Readiness Audit

Prepared: 2026-07-14
Reviewed state: local remediation branch based on `2159fa4`
Production recommendation: **HOLD until the launch gates below are satisfied**

## Scorecard

| Area | Score | Verified basis |
| --- | ---: | --- |
| Experience | 3.0/10 | The site publishes a consistent 59-model score dataset, but it does not have verified first-hand test logs, original test photography, pressure maps, thermal measurements, durability records, or sleeper diaries. |
| Expertise | 5.2/10 | Firdous Farhad now has a named health and sleep content reviewer profile with an explicit scope and owner-supplied credentials. Article-level review is not claimed until signoff, and the active blog corpus still lacks explicit source fields. |
| Authoritativeness | 3.5/10 | Entity coverage is broad and internally consistent, but no independent recognition, backlink quality, publisher citations, or external expert participation was supplied for verification. |
| Trust | 6.8/10 | Independence, link compensation, corrections, methodology, score limits, official product sources, schema consistency, redirects, reviewer-scope limits, and health-content gates are visible. The final domain, public contact, credential-source links, broader mobile proof, and dependency migration remain open. |
| **Overall E-E-A-T** | **5.0/10** | The named reviewer improves accountability, but stronger transparency still cannot substitute for original testing evidence, article-level signoff, named authors, and external authority. |
| **Technical AEO / LLM readiness** | **9.2/10** | Clear answers, complete Article bodies, 145 Markdown documents, `llms.txt`, stable entities, comparison charts, full score fields, internal links, synchronized metadata, and machine-readable methodology are present and QA-enforced. |

## What Passed

- 59 mattress models across 24 brands with the locked seven-score hash unchanged.
- 59 review routes, 30 comparison routes, 18 ranked-category routes, 24 brand routes, and 8 topic routes.
- Every ranked-category page, Article schema, and corresponding Markdown document includes all 59 models and all seven scores.
- Full score fields are ordered by Overall score and interleave brands when scores tie, preventing a same-brand block at the top.
- 251 Article schemas contain complete `articleBody` text; the shortest is 1,277 characters.
- 145 machine-readable Markdown documents are indexed through `llms.txt` and consolidated in `llms-full.txt`.
- No relationship language, invented tester, unsupported completed-review attribution, lab-test claim, live-offer schema, or customer-rating schema remains on the generated public surface.
- Firdous Farhad has a visible contributor profile, `Person` schema, health and sleep content review scope, and the supplied credential statement: licensed massage therapist and certified sleep science coach.
- The 67 pending health and sleep-science pages identify Firdous as the assigned reviewer without falsely presenting assignment as completed review.
- Internal links, same-origin images, canonical hosts, sitemap host, robots host, schema host, and Markdown alternate links pass build QA.
- Sixty-seven unsourced health or sleep-science articles are visibly marked source-review pending, set to `noindex, follow`, and excluded from the sitemap.

## Why It Does Not Yet Match MattressNut

MattressNut's defensible advantage is not schema volume. Its public methodology and team pages show named people, test durations, original test evidence, and professional reviewer context. PureSleep now has a named health and sleep content reviewer, stronger extraction architecture, and broader normalized model coverage, but it cannot claim equivalent first-hand experience or reviewed health content until real proof and article-level signoff exist.

The gap is closed by evidence, not additional markup:

1. Add real named authors and editors with profile pages, bios, relevant experience, and visible article ownership; Firdous currently covers the reviewer role only.
2. Create a Proof Vault for each tested model: dated original photos, acquisition record, test protocol, raw measurements, observations, limitations, and retest history.
3. Add article-specific authoritative citations and a source record to every scientific or health-adjacent article.
4. Have Firdous review and approve medical-adjacent pages individually, record the review date, and publish article-level attribution only after signoff.
5. Earn independent authority through original datasets, journalist citations, expert participation, and relevant backlinks.

## Launch Gates

1. Configure the final production domain and `PUBLIC_CONTACT_EMAIL`; rebuild and verify every host-dependent file.
2. Keep the 67 source-review-pending pages noindexed until each has explicit sources and Firdous's documented article-level approval.
3. Add the public source for Firdous's massage-therapy license jurisdiction/status and sleep-science certification issuer before using the credentials as a stronger authority signal.
4. Resolve or formally accept the 10 dependency advisories through a tested Astro and Cloudflare adapter migration; 4 are high severity.
5. Deploy the approved branch, then rerun content, rendered-output, external-link, desktop, and mobile QA against the public production host.
6. Do not describe the site as conducting hands-on, laboratory, clinical, or long-duration testing until the supporting evidence is published.

## Verification Sources

- Google Search Central: AI search features and ordinary SEO fundamentals: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central: helpful, reliable, people-first content and clear who/how/why: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: high-quality reviews require evidence, measurements, competitors, and original value: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
- Google Search Central: Article authorship and author profile guidance: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central: structured data must match visible content: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- MattressNut methodology benchmark: https://www.mattressnut.com/how-we-test/
- MattressNut team benchmark: https://www.mattressnut.com/our-team/

## Acceptance Standard

Technical completion means the automated suite passes. E-E-A-T completion requires publishable proof for experience, real accountable people for expertise, and external evidence for authority. Those are separate gates and must not be collapsed into one score.
