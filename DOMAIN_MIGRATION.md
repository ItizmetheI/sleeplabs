# Domain migration checklist

`puresleep.com` is taken and currently serves a different Shopify store. The
PureSleep build therefore uses the Cloudflare Workers preview origin
`finalize.ahmedbarkat1067.workers.dev` until a production domain is confirmed.

## Automatic — zero manual edits needed

Every canonical tag, JSON-LD URL, sitemap entry, `robots.txt` sitemap line, and
published `/llms/` URL is generated from the `SITE_URL` environment variable.
When `SITE_URL` is unset, the build uses the working Workers preview origin.
The postbuild step rewrites only generated `dist/llms.txt` and `dist/llms/*.md`
files, leaving source files stable.

**To cut over:** set `SITE_URL=https://<real-domain>` in the hosting platform's
dashboard env vars, then rebuild and deploy. Verify canonicals, JSON-LD,
sitemap, robots, and LLM files against the generated output before production
approval.

## Remaining manual decisions

1. Confirm the production origin and configure `SITE_URL` in Cloudflare.
2. Confirm a monitored contact address before adding an email link. The inactive
   legacy support address has been removed from the site.
3. If the final domain changes the PureSleep brand name, treat that as a full
   entity and metadata migration rather than a domain-only cutover.

## Separate ops items, not code

- **Cloudflare adapter PR (#2, `cloudflare/workers-autoconfig`) — merged
  2026-06-23.** Cloudflare auto-generated this proposing a swap from the
  `@astrojs/node` adapter to `@astrojs/cloudflare`, plus committing a real
  `wrangler.jsonc` (confirms the live worker is named `finalize`, no custom
  domain attached yet). This is what fixed the Workers Builds CI failures
  that had been silently blocking redeploys.
- **`claude/repo-overview-alpy9p` branch — do not merge.** Diverged from the
  very first commit in this repo's history (missing the entire multi-brand
  build: all 52 competitor brands, every comparison page, the trust/disclosure
  layer, the performance fix — everything from this engagement). One of its
  own commits is titled "Remove all competitor brands and links; site is
  Amerisleep-only," which directly contradicts the required scored,
  multi-brand coverage. Any individually-good fixes on that branch (pain
  language, SITE_URL swappability) have already been re-implemented properly
  on the correct base in this branch instead.
