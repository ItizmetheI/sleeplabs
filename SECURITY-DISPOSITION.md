# Dependency and supply-chain disposition (gate G024)

Analysis date: 2026-08-26
Analyst: automated review, unsigned
Lockfile: `package-lock.json` at working tree
Runtime: Node 25.6.1 / npm 11.9.0
Build mode: `output: 'static'` — Astro emits static HTML plus client-side React island bundles

**Status: ANALYSIS COMPLETE, ACCEPTANCE UNSIGNED.** G024 requires a dated risk acceptance
naming an owner, rationale, compensating controls, and expiry. The owner signature block at the
bottom is deliberately blank. This document does not close the gate on its own.

## Remediated

| Package | Severity | Action |
|---|---|---|
| `@astrojs/node` | moderate | **Removed.** It was imported in `astro.config.mjs` but never called; the configured adapter is `cloudflare()`. Dead dependency left over from the migration recorded in `DOMAIN_MIGRATION.md`. Removing it eliminated the Server Islands DoS and cache-poisoning advisories from the production tree. |

Production advisories before: 15 (10 high, 3 moderate, 2 low), 4 direct.
Production advisories after: **14** (10 high, 2 moderate, 2 low), **3 direct**.

## Reachability analysis

The decisive fact is that this is a **static build**. No package below executes when a visitor
requests a page; the served artifact is pre-rendered HTML plus a client bundle. That moves most
findings from "production dependency" to "build-time toolchain", which is a different risk class:
a compromise requires an attacker inside the build, not a request from the internet.

| Package | Severity | Reachable at runtime? | Rationale |
|---|---|---|---|
| `astro` | high | **No** | The advisory is XSS in `define:vars` via incomplete `</script>` sanitization. `grep -rn "define:vars" src/` returns zero matches — the vulnerable feature is not used anywhere in this codebase. The Server Islands advisory needs an SSR adapter; this build is static. |
| `@astrojs/cloudflare` | moderate | **Only if deployed to Cloudflare Workers** | SSRF via the image-binding-transform endpoint. The project is not currently planned for Cloudflare deployment. If the target host changes, re-evaluate; if Cloudflare is dropped, this adapter should be replaced and the finding disappears with it. |
| `vite`, `esbuild`, `postcss`, `svgo`, `nanoid`, `js-yaml` | high/low | **No** | Build-time only. Not present in the emitted `dist/`. The `esbuild` and `vite` advisories are explicitly dev-server issues on Windows and do not apply to a produced artifact. |
| `sharp` (libvips CVEs) | high | **No** | Image processing runs at build time. Note the build already logs that Cloudflare does not support sharp at runtime. |
| `undici`, `ws`, `miniflare`, `wrangler` | high/moderate | **No** | Wrangler-family tooling. Only in the path if Cloudflare Workers is the deploy target, and even then only for the local dev/deploy tooling, not the served response. |
| `@astrojs/tailwind` | low | **No** | Transitive on `astro`; build-time. |

## Residual risk

1. **Build-integrity risk is real even when runtime risk is not.** A compromised build machine or a
   malicious update to any package above can inject content into the emitted HTML. The compensating
   control is a deterministic `npm ci` from a committed lockfile in reviewed CI, not developer laptops.
2. **`npm audit fix --force` is not an option here.** npm's aggregate fix requires a semver-major
   Astro/adapter move. The release package records that an isolated Astro 7 migration was attempted
   and failed to produce a complete build. Any upgrade belongs on its own branch, repeating every gate.
3. **This analysis is host-dependent.** If the deploy target is not Cloudflare, `@astrojs/cloudflare`
   and the wrangler family should be removed entirely, which would drop the remaining direct moderate
   finding and several high transitive ones.

## Required before this gate closes

- [ ] Confirm the production host; if not Cloudflare, remove `@astrojs/cloudflare` and wrangler and re-run this analysis.
- [ ] Attach `npm audit` and `npm audit --omit=dev` JSON output taken from the **frozen release commit**, not the working tree.
- [ ] Reproduce with `npm ci` on a clean checkout (Node 22.12+) and confirm identical results.
- [ ] Named owner signs the acceptance below with an expiry date.

## Acceptance

| Field | Value |
|---|---|
| Accepting owner | _unsigned_ |
| Date | _unsigned_ |
| Expiry | _unsigned_ |
| Compensating controls | Deterministic `npm ci` in reviewed CI; no `--force` upgrades on the release branch |

Until this block is signed by a named person, gate G024 remains **OPEN**.
