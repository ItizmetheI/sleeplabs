# Archived obsolete tooling

These utilities are not part of the PureSleep build or deployment path. They
were moved here because they target removed data files, duplicate current QA,
or scrape external sites without feeding a reviewed production workflow.

Do not run them against `src/data`, `public`, or generated output. Current
validation lives in `scripts/verify-content-integrity.ts` and
`scripts/verify-build-output.mjs`; current image maintenance must use the
reviewed scripts still present in `scripts/`.
