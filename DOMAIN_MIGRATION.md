# Domain migration checklist

`puresleep.com` is taken (serving Shopify) and not available. The site currently
runs on the Cloudflare Workers staging URL `finalize.ahmedbarkat1067.workers.dev`.
Once a real domain is bought/assigned, here's exactly what needs to happen and
where, so nothing gets missed.

## Automatic — zero manual edits needed

Every canonical tag, JSON-LD schema URL, sitemap entry, and `robots.txt`'s
`Sitemap:` line are generated dynamically from one source: the `SITE_URL`
environment variable (falls back to `https://puresleep.com` only when unset).

**To cut over:** set `SITE_URL=https://<real-domain>` in the hosting platform's
dashboard env vars, then redeploy. Verified working end-to-end by rebuilding
with a fake test domain — canonical tags, JSON-LD, sitemap, and `robots.txt`
all switched correctly with zero leftover `puresleep.com` references in any
dynamically-generated output.

## Manual — needs a real decision, not just a rebuild

These don't read `SITE_URL` and won't update automatically. Each one needs a
person to decide the right value once the real domain (and possibly brand
name) is known.

### 1. The 64 static `/llms/` files (`public/llms.txt` + `public/llms/*.md`)
Every internal URL in these files is hardcoded to `https://puresleep.com/...`
(e.g. `https://puresleep.com/reviews/amerisleep-as3/`). These are static files
generated from Joey's own locked, pre-approved content — not touched here on
purpose, since editing approved copy without sign-off is worse than leaving
a known gap. Once the real domain is confirmed:
```
grep -rl "puresleep.com" public/llms.txt public/llms/   # lists all 64 files
```
A single global find-replace (`puresleep.com` → real domain) across those 64
files closes this out. Do this *after* Joey confirms the domain, not before —
otherwise it's two edits instead of one.

### 2. Contact email — `support@puresleep.com`
Hardcoded in 3 places: `src/components/Footer.tsx`, `src/pages/about/index.astro`,
`src/pages/disclosure/index.astro`. If the new domain isn't `puresleep.com`,
this inbox may not exist (unless mail forwarding is set up to keep it alive).
Decide: keep forwarding the old address, or swap to a new one — then
`grep -rl "support@puresleep.com" src/` to find and update all 3.

### 3. Brand name in legal copy — `src/pages/privacy-policy/index.astro`,
`src/pages/terms-of-service/index.astro`
Both reference `puresleep.com` *by name* in the visible legal text (e.g. "By
accessing puresleep.com, you agree to these terms"), not just as a URL. If
the site keeps the "PureSleep" brand and only the TLD/registrar changes,
this is a 2-line copy edit. If the new domain implies a different brand name
entirely, this is a bigger rebrand — "PureSleep" also appears as the
publisher name in every page's JSON-LD, the footer, and page titles
sitewide, which would need a project of its own.

## Separate ops items, not code

- **Cloudflare adapter PR (#2, `cloudflare/workers-autoconfig`, currently
  open/unmerged):** Cloudflare auto-generated this proposing a swap from the
  `@astrojs/node` adapter to `@astrojs/cloudflare`, plus committing a real
  `wrangler.jsonc` (confirms the live worker is named `finalize`, no custom
  domain attached yet). Reasonable to merge, but it's an infra decision —
  hasn't been merged here.
- **`claude/repo-overview-alpy9p` branch — do not merge.** Diverged from the
  very first commit in this repo's history (missing the entire multi-brand
  build: all 52 competitor brands, every comparison page, the trust/disclosure
  layer, the performance fix — everything from this engagement). One of its
  own commits is titled "Remove all competitor brands and links; site is
  Amerisleep-only," which directly contradicts Joey's explicit independent,
  multi-brand requirement. Any individually-good fixes on that branch (pain
  language, SITE_URL swappability) have already been re-implemented properly
  on the correct base in this branch instead.
