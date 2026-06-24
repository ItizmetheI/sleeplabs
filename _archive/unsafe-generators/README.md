# Archived unsafe content generators

The scripts in this directory are deprecated one-off content generators used
early in the project to bulk-generate blog posts. They have been moved out of
`scripts/` (and out of `app/applet/scripts/`) so they are no longer part of
the live build/deploy path and can't be accidentally rerun.

They contain unsafe placeholder patterns that must not end up in production
content again, including:

- Fake-expert / fake-doctor citations (e.g. "Dr. Sarah", "chiropractor")
  presented as medical-sounding authority claims.
- Hotlinked Unsplash image URLs used as placeholder imagery instead of
  licensed/owned assets.

**Do not run any script in this directory against the live data files**
(`src/data/*`, blog content, etc.). They are kept here only for historical
reference and git history continuity. If similar generation tooling is
needed again, write a new script from scratch with reviewed, safe content
sources.
