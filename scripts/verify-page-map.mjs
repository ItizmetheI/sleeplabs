// Page-map check against the build: every owner row renders with its exact H1, every cut row
// 301s to its target, and the "301 X to here" notes are in public/_redirects.
// Usage: node scripts/verify-page-map.mjs (after `npm run build`).
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
// Rows come from src/data/pageMap.generated.ts (generated from the owner's page-map CSV and committed).
const generated = await readFile(path.join(root, 'src', 'data', 'pageMap.generated.ts'), 'utf8');
const rows = JSON.parse(generated.slice(generated.indexOf('= [') + 2, generated.lastIndexOf(']') + 1));
const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&quot;|&#34;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const redirects = new Map((await readFile(path.join(root, 'public', '_redirects'), 'utf8'))
  .split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'))
  .map(l => l.split(/\s+/)).filter(p => p.length >= 3).map(([from, to, code]) => [from, { to, code }]));

const failures = [];
let rendered = 0, cut = 0;
for (const { url, pageType: type, h1, notes } of rows) {
  if (!url.startsWith('/')) continue;
  if (type === 'cut') {
    cut += 1;
    const target = notes.match(/301 to (\/\S*)/)?.[1];
    const rule = redirects.get(url);
    if (!rule || rule.code !== '301' || rule.to !== target) failures.push(`${url}: expected 301 to ${target}, found ${rule ? `${rule.code} to ${rule.to}` : 'no rule'}.`);
    // Astro may emit a noindex meta-refresh stub for a redirect; it must point at the same target.
    const stub = path.join(root, 'dist', url, 'index.html');
    if (existsSync(stub)) {
      const html = await readFile(stub, 'utf8');
      const refresh = html.match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];
      if (refresh !== target || !/name="robots" content="noindex"/.test(html)) failures.push(`${url}: cut row renders a page instead of a redirect stub to ${target}.`);
    }
    continue;
  }
  rendered += 1;
  const file = path.join(root, 'dist', url, 'index.html');
  if (!existsSync(file)) { failures.push(`${url}: no built page.`); continue; }
  const html = await readFile(file, 'utf8');
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => decode(m[1]));
  if (h1s.length !== 1) failures.push(`${url}: ${h1s.length} H1 tags.`);
  else if (!h1.startsWith('[') && h1s[0] !== h1) failures.push(`${url}: H1 "${h1s[0]}" should be "${h1}".`);
  for (const from of (notes.match(/301 (\/\S*) to here/g) ?? []).map(n => n.split(' ')[1])) {
    const rule = redirects.get(from);
    if (!rule || rule.code !== '301' || rule.to !== url) failures.push(`${from}: expected 301 to ${url}.`);
  }
}

console.log(`Page map: ${rendered} rendered rows, ${cut} cut rows, ${failures.length} failure(s).`);
failures.forEach(f => console.log(`FAIL ${f}`));
process.exit(failures.length ? 1 : 0);
