// Owner self-check, automated against built HTML (dist/). Covers the checklist in
// workspace/owner/mattressinquirer-claude-project-instructions.md wherever a rule is machine-checkable.
// Usage: node scripts/verify-owner-rules.mjs [--only=reviews/amerisleep-as3] [--warn]
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const only = process.argv.find(a => a.startsWith('--only='))?.slice(7);
const showWarnings = process.argv.includes('--warn');

const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true }))
  .map(e => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])))).flat();

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
// Inline tags vanish without a space; block-level tags become a space.
const text = (html) => decode(html
  .replace(/<\/?(a|strong|em|span|b|i|time)\b[^>]*>/gi, '')
  .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Remove every element whose opening tag matches `open` (balanced on its tag name). */
const removeElements = (html, open) => {
  let out = html;
  for (;;) {
    const m = out.match(open);
    if (!m) return out;
    const tag = m[0].match(/^<([a-z0-9]+)/i)[1];
    let depth = 0;
    const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = m.index;
    let end = -1;
    for (let t; (t = re.exec(out));) {
      if (t[0].startsWith('</')) depth -= 1; else if (!t[0].endsWith('/>')) depth += 1;
      if (depth === 0) { end = re.lastIndex; break; }
    }
    if (end === -1) return out;
    out = out.slice(0, m.index) + out.slice(end);
  }
};

const TEMPLATE_SECTIONS = {
  review: ['Quick Answer', 'Specs at a Glance', 'Strengths and Limitations', 'How It Was Scored', 'Construction', 'Performance', 'Firmness and Feel by Sleep Position', 'Who Should Buy It / Who Should Skip It', 'How It Compares', 'Trial, Warranty, Shipping and Returns', 'FAQs', 'Verdict', 'Related'],
  comparison: ['Quick Verdict', 'Side by Side', 'Feel and Firmness', 'Construction', 'Edge Support', 'Motion Transfer', 'Cooling', 'Response', 'Value and Policies', null, 'FAQs', 'Related'],
};

const WORD_RANGE = {
  review: [2000, 3000],
  'best-of': [2500, 4000],
  comparison: [1800, 2500],
  brand: [400, 700],
  'brand-single': [250, 400],
  methodology: [500, 800],
  about: [200, 300],
  'editorial-policy': [150, 260],
};

const RULES = [
  ['dash', /[—–]|--/],
  ['testing language', /\b(tested|testing|hands-on|we tried|slept|testers?|lab|labs)\b/i],
  ['medical claim', /\b(relieves?|relieved|relieving|treats?|treated|treatment|cures?|cured|heals?|healing|therapeutic|circulation|recovery|prevents?|prevented|alleviat\w*|pain relief)\b/i],
  ['price comparison', /\b(cheaper|cheapest|most affordable|budget-friendly|pricier|best deal|inexpensive|bargain)\b/i],
  ['hype word', /\b(game-changer|revolutionary|unparalleled|ultimate|dreamy|cloud-like|heavenly)\b/i],
  ['filler opener', /\b(When it comes to|In today's market|Look no further|It's no secret|Whether you're)\b/i],
  ['excluded brand or source', /eachnight|Sleep Junkie|BestMattressBrand|LuckyMag|MattressNut|One Sleep Group|Ferdie|score_source/i],
  ['named person', /Firdous|Farhad/i],
  ['banned pattern', /records \d+(\.\d)?\/10 Overall|Its strongest scorecard fields are|locked scorecard|source dataset/i],
  ['unscoped top claim', /\b(highest-rated|highest-scoring|top-scoring|top-rated|best-rated)\b/i],
  ['UK spelling', /\b(colour|favourite|centre|favour|behaviour|organis|optimis|recognis|mould)\w*/i],
];
// Exempt: the pain-page sentence, model names, and "pressure relief" used as a comfort term.
const EXEMPT = [
  'A mattress is a comfort choice, not a treatment. Persistent pain is worth raising with a doctor.',
  'Westin Heavenly Bed',
  'pressure relief', 'Pressure Relief', 'Pressure relief',
];
const stripExempt = (s) => EXEMPT.reduce((acc, e) => acc.split(e).join(' '), s);

const pageTypeOf = (html) => html.match(/data-page-type="([^"]+)"/)?.[1] ?? null;

// Model names from the generated spec module (owner master names), longest first so
// "Amerisleep AS3 Hybrid" is matched before "Amerisleep AS3".
const specSource = await readFile(path.join(process.cwd(), 'src', 'data', 'specs.generated.ts'), 'utf8');
const specJson = JSON.parse(specSource.slice(specSource.indexOf('= {') + 2, specSource.lastIndexOf('}') + 1));
const MODELS = Object.values(specJson).map(s => ({ slug: s.slug, name: s.model })).sort((a, b) => b.name.length - a.name.length);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NAME_RE = new RegExp(MODELS.map(m => escapeRe(m.name).replace(/"/g, '(?:"|&quot;|&#34;)')).join('|'), 'g');
const nameToSlug = new Map(MODELS.map(m => [m.name, m.slug]));

const files = (await walk(dist)).filter(f => f.endsWith('index.html'));
const failures = [];
const warnings = [];
let checked = 0;

for (const file of files) {
  const route = path.relative(dist, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  if (only && !route.startsWith(only)) continue;
  const html = await readFile(file, 'utf8');
  if (/<meta http-equiv="refresh"/i.test(html)) continue;
  const type = pageTypeOf(html);
  if (!type) continue;
  checked += 1;
  const fail = (msg) => failures.push(`/${route}: ${msg}`);
  const warn = (msg) => warnings.push(`/${route}: ${msg}`);

  const article = html.match(/<article[^>]*data-body[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  const meta = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');

  // 9, 6, 8, 10, 11: wording rules across title, meta, and the full article.
  const corpus = stripExempt(`${title}\n${meta}\n${text(article)}`);
  for (const [label, re] of RULES) {
    const m = corpus.match(re);
    if (m) fail(`${label}: "${corpus.slice(Math.max(0, m.index - 50), m.index + 50)}"`);
  }

  // Title and meta description.
  if (title.length > 60) fail(`title is ${title.length} characters (max 60): ${title}`);
  if (type !== 'disclosure' && (meta.length < 140 || meta.length > 160)) fail(`meta description is ${meta.length} characters (140 to 160).`);

  // Single H1.
  const h1s = html.match(/<h1\b/g) ?? [];
  if (h1s.length !== 1) fail(`${h1s.length} H1 tags.`);

  // 8: the editorial score line appears exactly once wherever a score card or score table appears.
  const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<head\b[\s\S]*?<\/head>/, '');
  const scoreLines = (visibleHtml.match(/Scores are Mattress Inquirer's editorial ratings on a 0 to 10 scale\./g) ?? []).length;
  const hasScores = /data-score-card|data-score-table/.test(html);
  if (hasScores && scoreLines !== 1) fail(`editorial score line appears ${scoreLines} times (must be 1).`);
  if (!hasScores && scoreLines > 0) fail('editorial score line appears on a page without a score card.');

  // 1: Overall always shown to one decimal.
  for (const m of html.matchAll(/data-overall[^>]*>([^<]*)</g)) {
    if (!/^\d\.\d$/.test(m[1].trim())) fail(`Overall not shown to one decimal: "${m[1]}"`);
  }

  // 13: CTAs carry data-slot and the exact rel; every outbound product link is a CTA.
  for (const m of article.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    const href = tag.match(/href="([^"]+)"/)?.[1] ?? '';
    if (/^https?:/.test(href)) {
      if (!/data-slot="MI-[a-z0-9-]+-[a-z0-9-]+"/.test(tag)) fail(`outbound link without data-slot: ${href}`);
      if (!/rel="sponsored nofollow noopener"/.test(tag)) fail(`CTA rel is not "sponsored nofollow noopener": ${href}`);
      if (!/target="_blank"/.test(tag)) fail(`CTA missing target="_blank": ${href}`);
    }
  }
  for (const m of article.matchAll(/>(Check [^<]+ Price)</g)) {
    if (!/^Check [A-Za-z ]+ Price$/.test(m[1])) fail(`CTA label format: ${m[1]}`);
  }

  // 12: FAQPage schema matches the visible FAQs word for word.
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let json;
    try { json = JSON.parse(block[1]); } catch { fail('invalid JSON-LD'); continue; }
    const nodes = [json, ...(json['@graph'] ?? [])];
    for (const node of nodes) {
      if (node['@type'] !== 'FAQPage') continue;
      const visible = text(article);
      for (const q of node.mainEntity ?? []) {
        if (!visible.includes(q.name)) fail(`FAQ schema question not visible: ${q.name}`);
        if (!visible.includes(q.acceptedAnswer.text)) fail(`FAQ schema answer not visible for: ${q.name}`);
      }
    }
  }

  // 15: section order.
  const h2s = [...article.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(m => text(m[1]));
  const expected = TEMPLATE_SECTIONS[type];
  if (type === 'best-of') {
    const pickH2s = h2s.slice(2, -3);
    const ok = h2s[0] === 'Our Picks at a Glance' && h2s[1] === 'How We Picked'
      && /^What Matters for /.test(h2s.at(-3) ?? '') && h2s.at(-2) === 'FAQs' && h2s.at(-1) === 'Related'
      && pickH2s.length >= 4 && pickH2s.length <= 8 && pickH2s.every((h, i) => new RegExp(`^#${i + 1} .+: .+`).test(h));
    if (!ok) fail(`section order differs from the best-of template: ${h2s.join(' | ')}`);
  }
  if (expected) {
    const ok = expected.length === h2s.length && expected.every((s, i) => s === null || s === h2s[i]);
    if (!ok) fail(`section order differs from the template: ${h2s.join(' | ')}`);
  }

  // 14: word count of body copy (paragraphs and list items, excluding tables, score cards, byline, Related).
  let body = removeElements(article, /<table\b/i);
  body = removeElements(body, /<div[^>]*data-score-card/i);
  body = removeElements(body, /<div[^>]*data-byline/i);
  body = removeElements(body, /<section[^>]*data-section="Related"/i);
  body = body.replace(/<h[1-6]\b[\s\S]*?<\/h[1-6]>/g, ' ');
  const words = text(body).split(' ').filter(w => /[A-Za-z0-9]/.test(w)).length;
  const rangeKey = type === 'brand' && html.includes('data-brand-models="1"') ? 'brand-single' : type;
  const range = WORD_RANGE[rangeKey];
  if (range && (words < range[0] || words > range[1])) fail(`body word count ${words} outside ${range[0]} to ${range[1]}.`);

  // Per-section word ranges from the templates.
  const countWords = (h) => text(removeElements(h, /<table\b/i).replace(/<h[1-6]\b[\s\S]*?<\/h[1-6]>/g, ' ')).split(' ').filter(w => /[A-Za-z0-9]/.test(w)).length;
  const sectionHtml = (name) => article.match(new RegExp(`<section[^>]*data-section="${name.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}"[^>]*>([\\s\\S]*?)</section>`))?.[1];
  const rangeCheck = (label, n, lo, hi) => { if (n < lo || n > hi) fail(`${label} has ${n} words (${lo} to ${hi}).`); };
  if (type === 'review') {
    const qa = sectionHtml('Quick Answer'); if (qa) rangeCheck('Quick Answer', countWords(qa), 40, 70);
    const con = sectionHtml('Construction'); if (con) rangeCheck('Construction text', countWords(con), 80, 150);
    const perf = sectionHtml('Performance');
    if (perf) for (const block of perf.split(/<h3\b/).slice(1)) {
      const name = text(block.match(/^[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? '');
      rangeCheck(`Performance "${name}"`, countWords(`<h3${block}`), 80, 150);
    }
    const verdict = sectionHtml('Verdict'); if (verdict) rangeCheck('Verdict', countWords(verdict), 60, 100);
  }
  if (type === 'best-of') {
    const qa = text(html.match(/<p[^>]*data-quick-answer[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '');
    const qaSentences = qa.split(/(?<=[.!?])\s+/).filter(Boolean).length;
    if (qaSentences < 2 || qaSentences > 3) fail(`quick answer has ${qaSentences} sentences (2 to 3).`);
    for (const pick of article.matchAll(/<section[^>]*data-pick="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)) {
      const why = pick[2].match(/<div[^>]*data-why[^>]*>([\s\S]*?)<\/div>\s*<div class="w-full overflow-x-auto/)?.[1] ?? '';
      rangeCheck(`Pick "${pick[1]}" why`, countWords(why), 150, 250);
      const prosCons = pick[2].match(/<div[^>]*data-proscons[^>]*>([\s\S]*?)<\/div>\s*<div class="flex flex-wrap/)?.[1] ?? '';
      for (const m of prosCons.matchAll(NAME_RE)) {
        const slug = nameToSlug.get(decode(m[0]));
        if (slug && slug !== pick[1]) fail(`pick "${pick[1]}" strengths or limitations name another product: "${decode(m[0])}".`);
      }
    }
    const wm = sectionHtml('What Matters'); if (wm) rangeCheck('What Matters', countWords(wm), 200, 400);
  }
  if (type === 'review' || type === 'best-of' || type === 'comparison') {
    const faqs = sectionHtml('FAQs');
    if (faqs) {
      const answers = [...faqs.matchAll(/<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m => text(m[1]));
      const [lo, hi] = type === 'comparison' ? [4, 6] : [5, 8];
      if (answers.length < lo || answers.length > hi) fail(`${answers.length} FAQs (${lo} to ${hi}).`);
      answers.forEach((a, i) => { const n = a.split(' ').length; if (n < 40 || n > 80) fail(`FAQ answer ${i + 1} has ${n} words (40 to 80).`); });
      // Template-required questions.
      const questions = [...faqs.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map(m => text(m[1]));
      const h1Text = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
      const required = [];
      if (type === 'review') {
        const model = h1Text.replace(/ Review \(2026\).*$/, '');
        required.push(`Is the ${model} good for side sleepers?`, `How firm is the ${model}?`);
      }
      if (type === 'comparison') {
        const [a, b] = h1Text.split(' vs ');
        required.push(`Which is better, ${a} or ${b}?`);
      }
      for (const q of required) if (!questions.includes(q)) fail(`missing required FAQ "${q}".`);
    }
  }

  // Links: in each H2 section, the first mention of another model links to its review.
  const ownSlug = route.startsWith('reviews/') ? route.split('/')[1] : null;
  for (const sec of article.matchAll(/<section([^>]*)data-section="([^"]+)"([^>]*)>([\s\S]*?)<\/section>/g)) {
    sec.splice(1, 3, sec[2], sec[4], sec[1] + sec[3]);
    if (sec[1] === 'Related') continue;
    const sectionOwn = sec[3].match(/data-pick="([^"]+)"/)?.[1] ?? ownSlug;
    const body = removeElements(sec[2], /<div[^>]*data-score-card/i).replace(/<h[1-6]\b[\s\S]*?<\/h[1-6]>/g, ' ');
    const seen = new Set();
    for (const m of body.matchAll(NAME_RE)) {
      const name = decode(m[0]);
      const slug = nameToSlug.get(name);
      if (!slug || slug === sectionOwn || seen.has(slug)) continue;
      seen.add(slug);
      // Pros and cons never name another product.
      if (sec[1] === 'Strengths and Limitations') { fail(`Strengths and Limitations names another product: "${name}".`); continue; }
      const before = body.slice(0, m.index);
      const inLink = before.lastIndexOf('<a ') > before.lastIndexOf('</a>');
      if (!inLink) fail(`"${name}" first mention in "${sec[1]}" is not linked to its review.`);
    }
  }

  // Style: sentences under 25 words (warning-level; reviewed by hand).
  const sentences = text(body).split(/(?<=[.!?])\s+/);
  const longOnes = sentences.filter(s => s.split(' ').length >= 25);
  if (longOnes.length) warn(`${longOnes.length} sentence(s) of 25+ words, e.g. "${longOnes[0].slice(0, 90)}"`);

  // 4: superlatives must name a field and a set. Flag candidates for manual review.
  for (const s of sentences) {
    if (/\b(highest|lowest|longest|best|most|only)\b/i.test(s) && !/\b(of the|among|on this page|in this list|on this list|of all|ties|tied|tie)\b/i.test(s) && !/Best (Overall|Value|Mattress|for)/.test(s)) {
      warn(`superlative to check: "${s.slice(0, 110)}"`);
      break;
    }
  }
}

console.log(`Owner rules: checked ${checked} pages; ${failures.length} failure(s); ${warnings.length} warning(s).`);
failures.forEach(f => console.log(`FAIL ${f}`));
if (showWarnings) warnings.forEach(w => console.log(`WARN ${w}`));
process.exit(failures.length ? 1 : 0);
