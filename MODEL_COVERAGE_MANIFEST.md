# Model coverage manifest

Cross-references every model in the EachStory workbook
(`Mattress Scores For Eachstory Blogs.xlsx`, 5 sheets: EachNight, SleepJunkie,
BMB, HealthyAmericans, Lucky) against the live source data in
`src/data/mattresses.ts`. Full row-by-row data is in
`MODEL_COVERAGE_MANIFEST.csv` (workbook model name, source id, live review
URL, all 7 scores, and whether each model appears on a `/best/` page and/or a
`/comparison/` page).

## Headline result: full coverage, zero missing models

- **59 source models** in `mattresses.ts`, **60 distinct model-name strings**
  across all 5 workbook sheets (60, not 59, because one model — Amerisleep
  Organica Plush — is written two different ways across sheets: `"Amerisleep
  Organica (Plush)"` in EachNight/HealthyAmericans vs. just `"Organica
  (Plush)"` in BMB/Lucky/SleepJunkie).
- Every one of the 59 source models has at least one matching workbook name.
  Every workbook model name maps to a real source model. **Zero gaps in
  either direction.**
- Happsy is in — confirmed live at `/reviews/happsy/`, not excluded.

## What the "naming mismatches" actually were

None of the differences are wrong data — they're inconsistent name *strings*
for the same product, which is exactly what made the workbook hard to audit
line-by-line:

| Workbook variant(s) | Source id | Source name |
|---|---|---|
| `Amerisleep Organica (Plush)` / `Organica (Plush)` | `amerisleep-organica-plush` | Amerisleep Organica Plush |
| `Happsy` (bare brand) | `happsy` | Happsy Organic Mattress |
| `Brooklyn Plank Firm` | `brooklyn-bedding-plank-firm` | Brooklyn Bedding Plank Firm |
| `Naturepedic Concerto Plush ` (trailing space, some sheets) | `naturepedic-concerto-plush` | Naturepedic Concerto Plush |
| `Naturepedic EOS Classic ` (trailing space, some sheets) | `naturepedic-eos-classic` | Naturepedic EOS Classic |
| `Bear Original ` (trailing space, SleepJunkie only) | `bear-original` | Bear Original |
| `Casper "The One" Mattress` | `casper-the-one` | Casper The One |
| `Leesa Original Mattress` | `leesa-original` | Leesa Original |

The CSV's `source_id` column is the stable join key going forward — use that,
not the free-text model name, for any future audit.

## Page-presence gaps (not naming issues, real coverage notes)

- **17 of 59 models** don't appear in any `/best/` category page picks list.
  This is expected — `/best/` pages are curated top-6 picks per category, not
  every model needs to be featured everywhere. Not a defect, just listed in
  the CSV (`in_best_page = No`) for visibility.
- **31 of 59 models** don't appear in any `/comparison/` page. Same caveat —
  comparisons are hand-picked head-to-head pairs, not exhaustive.
- The `/blog/best-*` column from Joey's original spec is now moot for the 17
  posts that were either 301-redirected to a `/best/` page or rewritten to be
  genuinely multi-brand — see the redirect list in `public/_redirects` and the
  sitemap-exclusion list in `astro.config.mjs` for exactly which slugs were
  retired.
