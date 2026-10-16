# Domain migration checklist

`mattressinquirer.com` is taken and currently serves a different site. The
Mattress Inquirer build therefore uses the Cloudflare Workers preview origin
`mattressinquirer.ahmedbarkat1067.workers.dev` until a production domain is confirmed.

## Automatic — zero manual edits needed

Every canonical tag, JSON-LD URL, sitemap entry, `robots.txt` sitemap line, and
published `/llms/` URL is generated from the `SITE_URL` environment variable.
When `SITE_URL` is unset, the build uses the working Workers preview origin.
The postbuild step rewrites only generated `dist/llms.txt` and `dist/llms/*.md`
files, leaving source files stable.

**To cut over:** `SITE_URL` alone is no longer sufficient. The build fails
closed, so setting only `SITE_URL` produces a fully non-indexable site: every
page emits `noindex, nofollow, noarchive` and `robots.txt` returns
`Disallow: /`.

A production cutover needs all of these set in the hosting platform's env vars:

```sh
SITE_URL=https://<approved-domain>          # origin only, no path or trailing slash
PUBLIC_INDEXING_MODE=production             # default is preview
PUBLIC_CONTENT_CUTOFF_DATE=YYYY-MM-DD       # the approved publication cutoff
PUBLIC_CONTACT_EMAIL=<monitored mailbox>    # required for production
PUBLIC_BRAND_APPROVED=true                  # only after Firas's dated decision
PUBLIC_DISCLOSURE_APPROVED=true             # only after ownership is certified
```

Verify the configuration before building:

```sh
npm run qa:release-config
```

That gate rejects a `workers.dev` or reserved hostname and refuses production
indexing while any approval value is missing. After deploying, run
`npm run qa:live` against the real origin and confirm canonicals, JSON-LD,
sitemap, robots, and LLM files in the generated output before production
approval. See `.env.example` for the full variable reference.

## Remaining manual decisions

1. Confirm the production origin and configure `SITE_URL` in Cloudflare.
2. Confirm a monitored contact address before adding an email link. The inactive
   legacy support address has been removed from the site. Until
   `PUBLIC_CONTACT_EMAIL` is set, About and Privacy state plainly that no public
   contact is published yet.
3. If the final domain changes the Mattress Inquirer brand name, treat that as a full
   entity and metadata migration rather than a domain-only cutover.

## Separate ops items, not code

- **Cloudflare adapter PR (#2, `cloudflare/workers-autoconfig`) — merged
  2026-06-23.** Cloudflare auto-generated this proposing a swap from the
  `@astrojs/node` adapter to `@astrojs/cloudflare`, plus committing a real
  `wrangler.jsonc` (confirms the live worker is named `mattressinquirer`, no custom
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

## Adapter state (2026-08-27)

The `@astrojs/node` dependency was removed. It was still imported in
`astro.config.mjs` but never called — the configured adapter is
`cloudflare()` with `output: 'static'`. Removing it dropped two moderate
advisories from the production tree. `@astrojs/cloudflare` and `wrangler` are
now pinned to the exact versions covered by `qa/QA-REPORT.md` (12.6.13 and
4.103.0). If the deploy target stops being Cloudflare, both should be removed
and the dependency analysis in `SECURITY-DISPOSITION.md` re-run.
