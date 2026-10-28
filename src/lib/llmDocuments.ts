// Machine-readable Markdown alternates (/llms/*.md). Every document is built from the same copy files,
// spec helpers and ranking engine as its HTML page, so facts, scores and limits stay identical.
import { comparisons } from '../data/comparisons';
import { EDITORIAL_INDEPENDENCE_DISCLOSURE, LINK_DISCLOSURE } from './disclosure';
import { allMattresses, type Mattress } from '../data/mattresses';
import { topics } from '../data/topics';
import { REVIEW_COPY } from '../content/reviews';
import { COMPARISON_COPY } from '../content/comparisons';
import { BEST_COPY } from '../content/best';
import { BRAND_COPY } from '../content/brands';
import { BEST_PAGE_CONFIGS, FIELD_LABEL, SIX_FIELDS, rankBestPage } from './ranking';
import { METHODOLOGY_LEAD, METHODOLOGY_UPDATED, methodologyPlainSections } from './methodologyContent';
import { orderScorecard, formatOverall } from './scoreFieldOrder';
import {
  alternativesFor, as3RankingSentence, brandModels, brandSlug, brandTopLead, getMattress, getSpec,
  leadsSentence, reviewSpecRows, SCORECARD_FIELDS, scoreText as fieldScore, winnerLine,
} from './pageData';
import {
  COMFORT_NOT_TREATMENT, PAIN_PAGE_SLUGS, h1For, plainInline, qualifyingFirmnessText,
  firmnessShort, firmnessText, heightText, PRICE_LABEL, SEE_PRICE, trialText, typeText, warrantyText,
} from './ownerSite';
import { SCORECARD_HEADERS, scorecardRows } from './scorecard';
import type { MattressSpec } from '../data/specTypes';

export const SCORE_METRICS = [
  { label: 'Overall', key: 'overall' },
  { label: 'Value', key: 'value' },
  { label: 'Edge Support', key: 'edgeSupport' },
  { label: 'Trial Period', key: 'trialPeriod' },
  { label: 'Response Time', key: 'responseTime' },
  { label: 'Motion Transfer', key: 'motionTransfer' },
  { label: 'Cooling & Breathability', key: 'coolingBreathability' },
] as const;

export type LlmDocumentKind =
  | 'methodology' | 'review-index' | 'review' | 'comparison-index' | 'comparison'
  | 'best-index' | 'best' | 'brand-index' | 'brand' | 'topic-index' | 'topic';

export interface LlmDocument {
  slug: string;
  kind: LlmDocumentKind;
  title: string;
  canonicalPath: string;
  dateModified: string;
  content: string;
}

/** Markdown form of the owner's "See Price" CTA; machine documents carry no prices. */
const seePrice = (spec: MattressSpec) => `[${SEE_PRICE}](${spec.productUrl})`;

const UPDATED = '2026-10-22';
const SCORE_LINE = "Scores are Mattress Inquirer's editorial ratings on a 0 to 10 scale.";

const normalizeSiteUrl = (siteUrl: string) => siteUrl.replace(/\/$/, '');
const markdownCell = (value: unknown) => String(value ?? '').replaceAll('|', '\\|').replace(/\s*\n\s*/g, ' ').trim();
const markdownTable = (headers: string[], rows: unknown[][]) => [
  `| ${headers.map(markdownCell).join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map(row => `| ${row.map(markdownCell).join(' | ')} |`),
].join('\n');
const bullets = (items: string[]) => items.map(item => `- ${plainInline(item)}`).join('\n');
const paras = (items: string[]) => items.map(plainInline).join('\n\n');
const faqBlock = (faqs: { q: string; a: string }[]) => faqs.map(f => `### ${f.q}\n\n${plainInline(f.a)}`).join('\n\n');

const header = (title: string, canonicalUrl: string, dateModified: string, documentType: string) => [
  `# ${title}`,
  '',
  `Canonical: ${canonicalUrl}`,
  `Last updated: ${dateModified}`,
  `Document type: ${documentType}`,
  'Publisher: Mattress Inquirer',
  'Editorial byline: Mattress Inquirer Editorial Team',
].join('\n');

const evidenceLimits = [
  '## Evidence and limits',
  '',
  `- ${SCORE_LINE}`,
  "- Price, trial, warranty, certification, and material details can change. Verify current facts on the brand's official site before purchase or citation.",
  '- Scores are comfort ratings, not medical guidance.',
  `- ${EDITORIAL_INDEPENDENCE_DISCLOSURE} ${LINK_DISCLOSURE}`,
].join('\n');

const scoreText = (mattress: Mattress, key: typeof SCORE_METRICS[number]['key']) =>
  key === 'overall' ? formatOverall(mattress.scores.overall) : String(mattress.scores[key]);
const scoreRows = (mattress: Mattress) => SCORE_METRICS.map(metric => [metric.label, `${scoreText(mattress, metric.key)}/10`]);

const buildReviewDocument = (siteUrl: string, mattress: Mattress): LlmDocument => {
  const copy = REVIEW_COPY[mattress.id];
  if (!copy) throw new Error(`Missing review copy for ${mattress.id}`);
  const spec = getSpec(mattress.id);
  const canonicalPath = `/reviews/${mattress.id}/`;
  const title = h1For(canonicalPath);
  const weights = [['under130', 'Under 130 lb'], ['from130to230', '130 to 230 lb'], ['over230', 'Over 230 lb']] as const;
  const positions = [['side', 'Side Sleepers'], ['back', 'Back Sleepers'], ['stomach', 'Stomach Sleepers'], ['combination', 'Combination Sleepers']] as const;
  const alternatives = [mattress, ...alternativesFor(mattress.id)];
  const content = [
    header(title, `${siteUrl}${canonicalPath}`, copy.dateModified, 'mattress review'),
    '', '## Quick Answer', '', plainInline(copy.quickAnswer),
    '', '## Scorecard', '', markdownTable(['Metric', 'Editorial score'], scoreRows(mattress)),
    '', `Firmness: ${firmnessShort(spec)}`, '', SCORE_LINE,
    '', '## Specs at a Glance', '', markdownTable(['Spec', 'Detail'], reviewSpecRows(spec).map(([k, v]) => [k, v === SEE_PRICE ? seePrice(spec) : v])),
    '', '## Strengths and Limitations', '', '### Strengths', '', bullets(copy.strengths), '', '### Limitations', '', bullets(copy.limitations),
    '', '## How It Was Scored', '', plainInline(copy.howScored),
    '', '## Construction', '',
    spec.layers.length ? markdownTable(['Layer', 'Thickness', 'Material', 'What it does'], spec.layers.map((l, i) => [i + 1, l.thickness === 'not listed' ? 'Not listed' : `${l.thickness} in`, l.name, plainInline(copy.layerRoles[i] ?? '')])) : '',
    '', paras(copy.construction),
    '', '## Performance', '',
    SIX_FIELDS.map(k => `### ${FIELD_LABEL[k]}: ${fieldScore(mattress, k)}/10\n\n${paras(copy.performance[k as keyof typeof copy.performance])}`).join('\n\n'),
    '', '## Firmness and Feel by Sleep Position', '', plainInline(copy.positionsIntro), '',
    positions.map(([key, label]) => `### ${label}\n\n${weights.map(([w, wl]) => `- ${wl}: ${plainInline(copy.positions[key][w])}`).join('\n')}`).join('\n\n'),
    '', '## Who Should Buy It / Who Should Skip It', '', '### Who Should Buy It', '', bullets(copy.buy), '', '### Who Should Skip It', '', bullets(copy.skip),
    '', '## How It Compares', '', plainInline(copy.compareIntro), '',
    markdownTable(['Mattress', 'Overall', 'Type', 'Firmness', 'Trial', 'Warranty'], alternatives.map(m => {
      const s = getSpec(m.id);
      return [m.name, `${fieldScore(m, 'overall')}/10`, typeText(s), firmnessShort(s), trialText(s), warrantyText(s)];
    })),
    '', '## Trial, Warranty, Shipping and Returns', '', paras(copy.policies),
    '', '## FAQs', '', faqBlock(copy.faqs),
    '', '## Verdict', '', plainInline(copy.verdict),
    '', evidenceLimits, '', `Methodology: ${siteUrl}/methodology/`,
  ].join('\n');
  return { slug: `reviews-${mattress.id}`, kind: 'review', title, canonicalPath, dateModified: copy.dateModified, content };
};

export const buildReviewLlmDocuments = (rawSiteUrl: string): LlmDocument[] => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  return [...allMattresses].sort((a, b) => a.name.localeCompare(b.name)).map(m => buildReviewDocument(siteUrl, m));
};

const buildComparisonDocument = (siteUrl: string, slug: string, aId: string, bId: string): LlmDocument => {
  const copy = COMPARISON_COPY[slug];
  if (!copy) throw new Error(`Missing comparison copy for ${slug}`);
  const a = getMattress(aId), b = getMattress(bId);
  const sa = getSpec(a.id), sb = getSpec(b.id);
  const canonicalPath = `/comparison/${slug}/`;
  const title = h1For(canonicalPath);
  const rows = [
    ...SCORECARD_FIELDS.map(k => [FIELD_LABEL[k], `${fieldScore(a, k)}/10`, `${fieldScore(b, k)}/10`]),
    ['Type', typeText(sa), typeText(sb)],
    ['Firmness', firmnessText(sa), firmnessText(sb)],
    ['Height', heightText(sa), heightText(sb)],
    [PRICE_LABEL, seePrice(sa), seePrice(sb)],
    ['Trial', trialText(sa), trialText(sb)],
    ['Warranty', warrantyText(sa), warrantyText(sb)],
  ];
  const sections: [string, string[]][] = [
    ['Feel and Firmness', copy.feel], ['Construction', copy.construction], ['Edge Support', copy.edgeSupport],
    ['Motion Transfer', copy.motionTransfer], ['Cooling', copy.cooling], ['Response', copy.response], ['Value and Policies', copy.valuePolicies],
  ];
  const content = [
    header(title, `${siteUrl}${canonicalPath}`, copy.dateModified, 'head-to-head comparison'),
    '', '## Quick Verdict', '', `${winnerLine(a, b)} ${leadsSentence(a, b)}`, '', plainInline(copy.quickVerdict),
    '', '## Side by Side', '', markdownTable(['Field', a.name, b.name], rows), '', SCORE_LINE,
    ...sections.flatMap(([h, p]) => ['', `## ${h}`, '', paras(p)]),
    '', `## Who Should Buy the ${a.name} / Who Should Buy the ${b.name}`, '',
    `### Who Should Buy the ${a.name}`, '', bullets(copy.buyA), '', `### Who Should Buy the ${b.name}`, '', bullets(copy.buyB),
    '', '## FAQs', '', faqBlock(copy.faqs),
    '', '## Entity URLs', '', `- ${a.name}: ${siteUrl}/reviews/${a.id}/`, `- ${b.name}: ${siteUrl}/reviews/${b.id}/`,
    '', evidenceLimits,
  ].join('\n');
  return { slug: `comparison-${slug}`, kind: 'comparison', title, canonicalPath, dateModified: copy.dateModified, content };
};

const buildBestDocument = (siteUrl: string, config: (typeof BEST_PAGE_CONFIGS)[number]): LlmDocument => {
  const copy = BEST_COPY[config.slug];
  if (!copy) throw new Error(`Missing best-of copy for ${config.slug}`);
  const result = rankBestPage(config);
  const canonicalPath = `/best/${config.slug}/`;
  const title = h1For(canonicalPath);
  const showPrice = config.row === 'luxury' || config.row === 'under-1000';
  const howWePicked = [as3RankingSentence(config, result), ...(PAIN_PAGE_SLUGS.has(config.slug) ? [COMFORT_NOT_TREATMENT] : [])];
  const content = [
    header(title, `${siteUrl}${canonicalPath}`, copy.dateModified, 'ranked mattress category'),
    '', plainInline(copy.quickAnswer),
    '', '## Our Picks at a Glance', '',
    markdownTable(['Rank', 'Mattress', 'Award', 'Overall', 'Firmness', 'Type', 'Trial', 'Warranty'], result.picks.map(p => {
      const m = p.candidate.mattress, s = p.candidate.spec, q = p.candidate.qualifyingFirmness;
      return [p.rank, m.name, p.award, `${fieldScore(m, 'overall')}/10`, q?.label ? `${q.display}/10, ${q.label} option` : firmnessShort(s), typeText(s), trialText(s), warrantyText(s)];
    })),
    '', SCORE_LINE,
    '', '## How We Picked', '', paras(howWePicked),
    ...result.picks.flatMap((p, i) => {
      const m = p.candidate.mattress, s = p.candidate.spec, pc = copy.picks[i];
      const mini = [
        ['Type', typeText(s)], ['Firmness', qualifyingFirmnessText(s, p.candidate.qualifyingFirmness)], ['Height', heightText(s)],
        ['Trial', trialText(s)], ['Warranty', warrantyText(s)], ...(showPrice ? [[PRICE_LABEL, seePrice(s)]] : []),
      ];
      return [
        '', `## #${p.rank} ${p.award}: ${m.name}`, '', markdownTable(['Metric', 'Editorial score'], scoreRows(m)),
        '', paras(pc.why), '', markdownTable(['Spec', 'Detail'], mini),
        '', '### Strengths', '', bullets(pc.strengths), '', '### Limitations', '', bullets(pc.limitations),
        '', `Review: ${siteUrl}/reviews/${m.id}/`,
      ];
    }),
    '', `## ${copy.whatMattersHeading}`, '', paras(copy.whatMatters),
    '', '## FAQs', '', faqBlock(copy.faqs),
    '', evidenceLimits,
  ].join('\n');
  return { slug: `best-${config.slug}`, kind: 'best', title, canonicalPath, dateModified: copy.dateModified, content };
};

const buildBrandDocument = (siteUrl: string, brand: string): LlmDocument => {
  const slug = brandSlug(brand);
  const copy = BRAND_COPY[slug];
  if (!copy) throw new Error(`Missing brand copy for ${slug}`);
  const canonicalPath = `/brands/${slug}/`;
  const title = h1For(canonicalPath);
  const models = brandModels(brand);
  const ids = new Set(models.map(m => m.id));
  const brandComparisons = comparisons.filter(c => ids.has(c.mattressAId) || ids.has(c.mattressBId));
  const content = [
    header(title, `${siteUrl}${canonicalPath}`, copy.dateModified, 'brand page'),
    '', `## About ${brand}`, '', paras(copy.summary),
    '', `## ${brand} Models We Score`, '',
    markdownTable(['Mattress', 'Overall', 'Type', 'Firmness', 'Trial', 'Warranty'], models.map(m => {
      const s = getSpec(m.id);
      return [m.name, `${fieldScore(m, 'overall')}/10`, typeText(s), firmnessShort(s), trialText(s), warrantyText(s)];
    })),
    '', SCORE_LINE,
    '', `## Highest ${brand} Score`, '', paras([brandTopLead(brand), ...copy.topModel]),
    '', `## ${brand} Reviews and Comparisons`, '',
    ...models.map(m => `- ${m.name} Review: ${siteUrl}/reviews/${m.id}/`),
    ...brandComparisons.map(c => `- ${h1For(`/comparison/${c.slug}/`)}: ${siteUrl}/comparison/${c.slug}/`),
    '', evidenceLimits,
  ].join('\n');
  return { slug: `brand-${slug}`, kind: 'brand', title, canonicalPath, dateModified: copy.dateModified, content };
};

export const buildGeneratedLlmDocuments = (rawSiteUrl: string): LlmDocument[] => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const documents: LlmDocument[] = [];
  const brands = [...new Set(allMattresses.map(m => m.brand))];

  documents.push({
    slug: 'methodology',
    kind: 'methodology',
    title: 'How Mattress Inquirer Scores Mattresses',
    canonicalPath: '/methodology/',
    dateModified: METHODOLOGY_UPDATED,
    content: [
      header('How Mattress Inquirer Scores Mattresses', `${siteUrl}/methodology/`, METHODOLOGY_UPDATED, 'methodology'),
      '', METHODOLOGY_LEAD, '',
      ...methodologyPlainSections().flatMap(section => [`## ${section.heading}`, '', ...section.paragraphs.flatMap(p => [p, ''])]),
      '## Coverage', '',
      `- Mattress models: ${allMattresses.length}`,
      `- Brands: ${brands.length}`,
      `- Ranked categories: ${BEST_PAGE_CONFIGS.length}`,
      `- Head-to-head comparisons: ${comparisons.length}`,
      `- Topic guides: ${topics.length}`,
      '', evidenceLimits,
    ].join('\n'),
  });

  const rows = scorecardRows();
  documents.push({
    slug: 'reviews',
    kind: 'review-index',
    title: h1For('/reviews/'),
    canonicalPath: '/reviews/',
    dateModified: UPDATED,
    content: [
      header(h1For('/reviews/'), `${siteUrl}/reviews/`, UPDATED, 'scorecard'),
      '', `This scorecard rates ${rows.length} mattresses from ${brands.length} brands on seven fields, sorted by Overall score.`,
      '', markdownTable([...SCORECARD_HEADERS, 'Review'], rows.map(r => [...r.cells, `/reviews/${r.mattress.id}/`])),
      '', SCORE_LINE, '', `CSV download: ${siteUrl}/scores.csv`,
      '', '## Machine-readable review files', '',
      ...orderScorecard(allMattresses).map(m => `- ${siteUrl}/llms/reviews-${m.id}.md`),
      '', evidenceLimits,
    ].join('\n'),
  });

  const comparisonDocuments = comparisons.map(c => buildComparisonDocument(siteUrl, c.slug, c.mattressAId, c.mattressBId));
  const bestDocuments = BEST_PAGE_CONFIGS.map(config => buildBestDocument(siteUrl, config));
  const brandDocuments = brands.sort((x, y) => x.localeCompare(y)).map(brand => buildBrandDocument(siteUrl, brand));
  documents.push(...comparisonDocuments, ...bestDocuments, ...brandDocuments);

  const topicDocuments = topics.map(topic => {
    const related = topic.relatedMattresses.map(getMattress);
    const canonicalPath = `/topics/${topic.id}/`;
    return {
      slug: `topic-${topic.id}`,
      kind: 'topic' as const,
      title: topic.title,
      canonicalPath,
      dateModified: topic.dateModified,
      content: [
        header(topic.title, `${siteUrl}${canonicalPath}`, topic.dateModified, 'topic guide'),
        '', '## Direct answer and context', '', topic.body,
        '', '## Related scored models', '',
        markdownTable(['Model', 'Brand', ...SCORE_METRICS.map(m => m.label), 'Review'], related.map(m => [m.name, m.brand, ...SCORE_METRICS.map(x => scoreText(m, x.key)), `/reviews/${m.id}/`])),
        '',
        ...(topic.sources?.length ? ['## Primary sources', '', ...topic.sources.map(s => `- ${s.name}: ${s.url}`), ''] : []),
        evidenceLimits,
      ].join('\n'),
    };
  });
  documents.push(...topicDocuments);

  const indexes: [string, LlmDocumentKind, string, string, string[]][] = [
    ['comparisons', 'comparison-index', h1For('/comparison/'), '/comparison/',
      comparisons.map(c => `- ${h1For(`/comparison/${c.slug}/`)}: ${winnerLine(getMattress(c.mattressAId), getMattress(c.mattressBId))} ${siteUrl}/llms/comparison-${c.slug}.md`)],
    ['best', 'best-index', 'Mattress Inquirer Category Index', '/best/overall/',
      bestDocuments.map(d => `- ${d.title}: ${siteUrl}/llms/${d.slug}.md`)],
    ['topics', 'topic-index', 'Mattress Inquirer Topic Guide Index', '/topics/',
      topicDocuments.map(d => `- ${d.title}: ${siteUrl}/llms/${d.slug}.md`)],
    ['brands', 'brand-index', h1For('/brands/'), '/brands/',
      brandDocuments.map(d => {
        const brand = brands.find(b => `brand-${brandSlug(b)}` === d.slug)!;
        const models = brandModels(brand);
        return `- ${brand}: ${models.length} model${models.length === 1 ? '' : 's'}, highest Overall ${fieldScore(models[0], 'overall')}/10. ${siteUrl}/llms/${d.slug}.md`;
      })],
  ];
  for (const [slug, kind, title, canonicalPath, lines] of indexes) {
    documents.push({
      slug, kind, title, canonicalPath, dateModified: UPDATED,
      content: [header(title, `${siteUrl}${canonicalPath}`, UPDATED, kind.replace('-', ' ')), '', '## Machine-readable documents', '', ...lines, '', evidenceLimits].join('\n'),
    });
  }

  return documents.sort((a, b) => a.slug.localeCompare(b.slug));
};

export const buildAllLlmDocuments = (siteUrl: string) => [
  ...buildReviewLlmDocuments(siteUrl),
  ...buildGeneratedLlmDocuments(siteUrl),
].sort((a, b) => a.slug.localeCompare(b.slug));

// Owner-specified llms.txt format: summary line, 8 to 12 top pages with a numeric hook, citation block.
export const buildLlmsIndex = (rawSiteUrl: string) => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const modelCount = allMattresses.length;
  const brandCount = new Set(allMattresses.map(item => item.brand)).size;
  const topReviews = orderScorecard(allMattresses).slice(0, 3);
  return [
    '# Mattress Inquirer',
    '',
    `> Editorial scorecards for ${modelCount} mattresses from ${brandCount} brands on one seven-field scale, plus head-to-head comparisons.`,
    '',
    '## Top pages',
    `- ${siteUrl}/reviews/ : Scores for ${modelCount} mattresses on seven fields`,
    `- ${siteUrl}/methodology/ : How the seven fields are scored from 0 to 10`,
    `- ${siteUrl}/best/overall/ : Best mattress picks from the ${modelCount}-model scorecard`,
    `- ${siteUrl}/best/side-sleepers/ : Side sleeper picks ranked by Overall score`,
    `- ${siteUrl}/best/back-sleepers/ : Back sleeper picks ranked by Overall score`,
    `- ${siteUrl}/best/cooling/ : Cooling picks ranked by the Cooling & Breathability score`,
    `- ${siteUrl}/best/hybrid/ : Hybrid picks ranked by Overall score`,
    `- ${siteUrl}/best/value/ : Value picks ranked by the Value score`,
    `- ${siteUrl}/comparison/ : ${comparisons.length} head-to-head comparisons on all seven fields`,
    ...topReviews.map(m => `- ${siteUrl}/reviews/${m.id}/ : ${m.name}, ${formatOverall(m.scores.overall)}/10 Overall`),
    '',
    '## Citation',
    "Cite as Mattress Inquirer. Link to the page URL. Scores are out of 10 on Mattress Inquirer's seven-field scorecard.",
  ].join('\n');
};

export const buildLlmsFull = (rawSiteUrl: string) => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  return [
    '# Mattress Inquirer Full Machine-Readable Corpus',
    '',
    `Corpus index: ${siteUrl}/llms.txt`,
    `Generated: ${UPDATED}`,
    '',
    ...buildAllLlmDocuments(siteUrl).flatMap(document => [
      '---', '', `Machine document: ${siteUrl}/llms/${document.slug}.md`, '', document.content, '',
    ]),
  ].join('\n');
};
