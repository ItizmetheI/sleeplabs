import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const walk = d => fs.readdirSync(d, { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

const htmlFiles = walk(dist).filter(f => f.endsWith('.html'));
const issues = [];
const counts = { pages: 0, blocks: 0, parseErrors: 0, types: new Map() };

const flatten = node => Array.isArray(node) ? node.flatMap(flatten)
  : (node && typeof node === 'object')
    ? [node, ...(node['@graph'] ? flatten(node['@graph']) : [])]
    : [];

for (const f of htmlFiles) {
  const route = path.relative(dist, f).split(path.sep).join('/');
  const html = fs.readFileSync(f, 'utf8');
  counts.pages++;

  const blocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
  for (const [, raw] of blocks) {
    counts.blocks++;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      counts.parseErrors++;
      issues.push(`PARSE  ${route}: ${e.message.slice(0, 60)}`);
      continue;
    }
    for (const node of flatten(parsed)) {
      const t = node['@type'];
      for (const one of (Array.isArray(t) ? t : [t]).filter(Boolean)) {
        counts.types.set(one, (counts.types.get(one) || 0) + 1);
      }

      // Claims disposition: AggregateRating requires a real collected rating corpus -> withheld.
      if (String(t).includes('AggregateRating') || node.aggregateRating) {
        issues.push(`AGGREGATE_RATING  ${route} emits aggregateRating (withheld by claims disposition)`);
      }
      // Claims disposition: do not emit live Offer schema from recorded prices.
      if (String(t) === 'Offer' || node.offers) {
        issues.push(`OFFER  ${route} emits Offer schema from recorded prices (prohibited)`);
      }
      // Medical schema is prohibited.
      if (/Medical|Drug|MedicalCondition/i.test(String(t))) {
        issues.push(`MEDICAL_SCHEMA  ${route} emits ${t}`);
      }
      // reviewedBy must not assert completed review.
      if (node.reviewedBy) {
        const name = node.reviewedBy.name || JSON.stringify(node.reviewedBy);
        if (!html.includes('Reviewer assigned:')) {
          issues.push(`REVIEWED_BY  ${route} asserts reviewedBy=${name} without a visible pending-assignment status`);
        }
      }
      // Rating parity: schema rating must appear in the visible page.
      if (String(t) === 'Rating' && node.ratingValue !== undefined) {
        const v = String(node.ratingValue);
        const text = html.replace(/<script[\s\S]*?<\/script>/g, '');
        if (!text.includes(v)) {
          issues.push(`RATING_PARITY  ${route} schema ratingValue=${v} not visible on page`);
        }
      }
    }
  }
}

console.log(JSON.stringify({
  status: issues.length ? 'fail' : 'pass',
  pagesScanned: counts.pages,
  jsonLdBlocks: counts.blocks,
  parseErrors: counts.parseErrors,
  schemaTypes: Object.fromEntries([...counts.types.entries()].sort((a, b) => b[1] - a[1])),
  issueCount: issues.length,
  issues: issues.slice(0, 20),
}, null, 2));
process.exit(issues.length ? 1 : 0);
