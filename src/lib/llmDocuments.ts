import { comparisons } from '../data/comparisons';
import { allMattresses, type Mattress } from '../data/mattresses';
import { topics } from '../data/topics';
import { BEST_CATEGORIES } from './bestCategories';
import { FIRDOUS_FARHAD } from './editorialPeople';
import { orderFullScoreField } from './scoreFieldOrder';

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
  | 'methodology'
  | 'review-index'
  | 'review'
  | 'comparison-index'
  | 'comparison'
  | 'best-index'
  | 'best'
  | 'brand-index'
  | 'brand'
  | 'topic-index'
  | 'topic';

export interface LlmDocument {
  slug: string;
  kind: LlmDocumentKind;
  title: string;
  canonicalPath: string;
  dateModified: string;
  content: string;
}

const UPDATED = '2026-07-14';

const normalizeSiteUrl = (siteUrl: string) => siteUrl.replace(/\/$/, '');

const markdownCell = (value: unknown) => String(value ?? '')
  .replaceAll('|', '\\|')
  .replace(/\s*\n\s*/g, ' ')
  .trim();

const markdownTable = (headers: string[], rows: unknown[][]) => [
  `| ${headers.map(markdownCell).join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map(row => `| ${row.map(markdownCell).join(' | ')} |`),
].join('\n');

const toBrandSlug = (brand: string) => brand
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const getMattress = (id: string) => {
  const mattress = allMattresses.find(item => item.id === id);
  if (!mattress) throw new Error(`Unknown mattress ID in LLM document generator: ${id}`);
  return mattress;
};

const header = (title: string, canonicalUrl: string, dateModified: string, documentType: string) => [
  `# ${title}`,
  '',
  `Canonical: ${canonicalUrl}`,
  `Last updated: ${dateModified}`,
  `Document type: ${documentType}`,
  'Publisher: PureSleep',
  'Editorial byline: PureSleep Editorial Team',
].join('\n');

const evidenceLimits = [
  '## Evidence and limits',
  '',
  '- Scores are PureSleep editorial evaluations on a shared 0-10 rubric; they are not laboratory measurements or manufacturer ratings.',
  '- Price, trial, warranty, certification, and material details can change. Verify current facts on the official brand or certification source before purchase or citation.',
  '- No mattress can diagnose, treat, or cure a health condition.',
  '- Editorial context: PureSleep is independently operated. The same rubric and evidence limits apply to every covered brand, and outbound product links do not generate per-click or per-sale commissions.',
].join('\n');

const scoreRows = (mattress: Mattress) => SCORE_METRICS.map(metric => [
  metric.label,
  `${mattress.scores[metric.key]}/10`,
]);

const modelScoreRow = (mattress: Mattress) => [
  mattress.name,
  mattress.brand,
  ...SCORE_METRICS.map(metric => mattress.scores[metric.key]),
  `/reviews/${mattress.id}/`,
];

const scoreHeaders = ['Model', 'Brand', ...SCORE_METRICS.map(metric => metric.label), 'Review'];

const buildReviewDocument = (siteUrl: string, mattress: Mattress): LlmDocument => {
  const canonicalPath = `/reviews/${mattress.id}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const content = [
    header(`${mattress.name} Review`, canonicalUrl, mattress.dateModified, 'mattress review'),
    '',
    '## Direct answer',
    '',
    mattress.verdict,
    '',
    '## Seven-metric scorecard',
    '',
    markdownTable(['Metric', 'Editorial score'], scoreRows(mattress)),
    '',
    '## Construction and fit',
    '',
    `${mattress.name} is a ${mattress.type.replaceAll('-', ' ')} mattress with a ${mattress.firmness.replaceAll('-', ' ')} feel (${mattress.firmnessScale}/10) and a ${mattress.thickness} profile.`,
    '',
    `Best suited to: ${mattress.bestFor.join(', ')}.`,
    '',
    '## Layer summary',
    '',
    markdownTable(['Layer', 'Thickness', 'Material', 'Description'], mattress.layers.map(layer => [
      layer.name,
      layer.thickness,
      layer.material,
      layer.description,
    ])),
    '',
    '## Recorded policy fields',
    '',
    `- Trial: ${mattress.trialNights} nights in the source dataset`,
    `- Warranty: ${mattress.warrantyYears} years in the source dataset`,
    `- Recorded price range: ${mattress.priceRange}`,
    ...(mattress.availabilityNote ? [
      '',
      '## Availability note',
      '',
      mattress.availabilityNote,
    ] : []),
    '',
    evidenceLimits,
    '',
    `Methodology: ${siteUrl}/methodology/`,
  ].join('\n');

  return {
    slug: `reviews-${mattress.id}`,
    kind: 'review',
    title: `${mattress.name} Review`,
    canonicalPath,
    dateModified: mattress.dateModified,
    content,
  };
};

export const buildReviewLlmDocuments = (rawSiteUrl: string): LlmDocument[] => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  return [...allMattresses]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(mattress => buildReviewDocument(siteUrl, mattress));
};

export const buildGeneratedLlmDocuments = (rawSiteUrl: string): LlmDocument[] => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const documents: LlmDocument[] = [];

  const methodologyContent = [
    header('PureSleep Scoring Methodology', `${siteUrl}/methodology/`, UPDATED, 'methodology'),
    '',
    '## Direct answer',
    '',
    'PureSleep evaluates 59 mattress models across 24 brands with one shared seven-metric editorial rubric. Each field is scored from 0 to 10: Overall, Value, Edge Support, Trial Period, Response Time, Motion Transfer, and Cooling & Breathability.',
    '',
    '## Score definitions',
    '',
    markdownTable(['Metric', 'What the score represents'], [
      ['Overall', 'The dataset\'s editorial summary score for the complete mattress.'],
      ['Value', 'Editorial value relative to the recorded price, construction, and policy fields.'],
      ['Edge Support', 'Editorial assessment of perimeter stability.'],
      ['Trial Period', 'Editorial score for the recorded home-trial policy.'],
      ['Response Time', 'Editorial assessment of how quickly the surface regains shape after pressure changes.'],
      ['Motion Transfer', 'Editorial assessment of how well the mattress limits movement across the surface.'],
      ['Cooling & Breathability', 'Editorial assessment of airflow and temperature-related construction features.'],
    ]),
    '',
    'The Overall score is stored directly in the source dataset. PureSleep does not publish an unsupported weighting formula or convert these values into laboratory claims.',
    '',
    '## Health and sleep content reviewer',
    '',
    `${FIRDOUS_FARHAD.name} is PureSleep's ${FIRDOUS_FARHAD.role.toLowerCase()}. ${FIRDOUS_FARHAD.credentials} Article-level review attribution appears only after completed review and approval. Reviewer profile: ${siteUrl}${FIRDOUS_FARHAD.path}`,
    '',
    '## Coverage',
    '',
    `- Mattress models: ${allMattresses.length}`,
    `- Brands: ${new Set(allMattresses.map(item => item.brand)).size}`,
    `- Ranked categories: ${Object.keys(BEST_CATEGORIES).length}`,
    `- Head-to-head comparisons: ${comparisons.length}`,
    `- Topic guides: ${topics.length}`,
    '',
    evidenceLimits,
  ].join('\n');

  documents.push({
    slug: 'methodology',
    kind: 'methodology',
    title: 'PureSleep Scoring Methodology',
    canonicalPath: '/methodology/',
    dateModified: UPDATED,
    content: methodologyContent,
  });

  const reviewDocuments = buildReviewLlmDocuments(siteUrl);
  documents.push({
    slug: 'reviews',
    kind: 'review-index',
    title: 'PureSleep Mattress Review Dataset',
    canonicalPath: '/reviews/',
    dateModified: UPDATED,
    content: [
      header('PureSleep Mattress Review Dataset', `${siteUrl}/reviews/`, UPDATED, 'review index'),
      '',
      '## Coverage',
      '',
      `This index contains ${allMattresses.length} scored mattress models from ${new Set(allMattresses.map(item => item.brand)).size} brands.`,
      '',
      '## Complete score table',
      '',
      markdownTable(scoreHeaders, [...allMattresses]
        .sort((a, b) => b.scores.overall - a.scores.overall || a.name.localeCompare(b.name))
        .map(modelScoreRow)),
      '',
      '## Machine-readable review files',
      '',
      ...reviewDocuments.map(document => `- ${siteUrl}/llms/${document.slug}.md`),
      '',
      evidenceLimits,
    ].join('\n'),
  });

  const comparisonDocuments = comparisons.map(comparison => {
    const mattressA = getMattress(comparison.mattressAId);
    const mattressB = getMattress(comparison.mattressBId);
    const canonicalPath = `/comparison/${comparison.slug}/`;
    const metricRows = SCORE_METRICS.map(metric => {
      const scoreA = mattressA.scores[metric.key];
      const scoreB = mattressB.scores[metric.key];
      const leader = scoreA === scoreB ? 'Tie' : scoreA > scoreB ? mattressA.name : mattressB.name;
      return [metric.label, `${scoreA}/10`, `${scoreB}/10`, leader];
    });

    return {
      slug: `comparison-${comparison.slug}`,
      kind: 'comparison' as const,
      title: `${mattressA.name} vs ${mattressB.name}`,
      canonicalPath,
      dateModified: comparison.dateModified,
      content: [
        header(`${mattressA.name} vs ${mattressB.name}`, `${siteUrl}${canonicalPath}`, comparison.dateModified, 'head-to-head comparison'),
        '',
        '## Direct answer',
        '',
        comparison.verdict,
        '',
        '## Seven-metric comparison chart data',
        '',
        markdownTable(['Metric', mattressA.name, mattressB.name, 'Leader'], metricRows),
        '',
        '## Recorded specifications',
        '',
        markdownTable(['Field', mattressA.name, mattressB.name], [
          ['Type', mattressA.type.replaceAll('-', ' '), mattressB.type.replaceAll('-', ' ')],
          ['Firmness', `${mattressA.firmness} (${mattressA.firmnessScale}/10)`, `${mattressB.firmness} (${mattressB.firmnessScale}/10)`],
          ['Thickness', mattressA.thickness, mattressB.thickness],
          ['Recorded price range', mattressA.priceRange, mattressB.priceRange],
          ['Recorded trial', `${mattressA.trialNights} nights`, `${mattressB.trialNights} nights`],
          ['Recorded warranty', `${mattressA.warrantyYears} years`, `${mattressB.warrantyYears} years`],
        ]),
        '',
        '## Winner by use case',
        '',
        ...comparison.winnerFor.map(winner => {
          const model = winner.winnerId === mattressA.id ? mattressA : mattressB;
          return `- ${winner.category}: ${model.name}. ${winner.reason}`;
        }),
        '',
        '## Entity URLs',
        '',
        `- ${mattressA.name}: ${siteUrl}/reviews/${mattressA.id}/`,
        `- ${mattressB.name}: ${siteUrl}/reviews/${mattressB.id}/`,
        '',
        evidenceLimits,
      ].join('\n'),
    };
  });
  documents.push(...comparisonDocuments);

  const bestDocuments = Object.entries(BEST_CATEGORIES).map(([category, config]) => {
    const picks = config.picks.map(getMattress);
    const fullScoreField = orderFullScoreField(allMattresses);
    const canonicalPath = `/best/${category}/`;
    return {
      slug: `best-${category}`,
      kind: 'best' as const,
      title: config.h1,
      canonicalPath,
      dateModified: UPDATED,
      content: [
        header(config.h1, `${siteUrl}${canonicalPath}`, UPDATED, 'ranked mattress category'),
        '',
        '## Direct answer',
        '',
        config.intro,
        '',
        `Top editorial pick: ${getMattress(config.winner).name}. ${config.winnerNote}`,
        '',
        '## Ranked score table',
        '',
        markdownTable(['Rank', ...scoreHeaders], picks.map((mattress, index) => [index + 1, ...modelScoreRow(mattress)])),
        '',
        config.filterNote ? `## Selection context\n\n${config.filterNote}\n` : '',
        '## Full 59-model score field',
        '',
        'The ranked table above contains the six category picks. The complete table below contains every model and all 24 brands, ordered by Overall score with brands interleaved when scores tie; inclusion does not mean every model is recommended for this category.',
        '',
        markdownTable(scoreHeaders, fullScoreField.map(modelScoreRow)),
        '',
        evidenceLimits,
      ].filter(Boolean).join('\n'),
    };
  });
  documents.push(...bestDocuments);

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
        '',
        '## Direct answer and context',
        '',
        topic.body,
        '',
        '## Related scored models',
        '',
        markdownTable(scoreHeaders, related.map(modelScoreRow)),
        '',
        topic.sources?.length ? '## Primary sources' : '',
        topic.sources?.length ? '' : '',
        ...(topic.sources ?? []).map(source => `- ${source.name}: ${source.url}`),
        topic.sources?.length ? '' : '',
        evidenceLimits,
      ].filter(value => value !== '').join('\n'),
    };
  });
  documents.push(...topicDocuments);

  const brandGroups = new Map<string, Mattress[]>();
  for (const mattress of allMattresses) {
    const group = brandGroups.get(mattress.brand) ?? [];
    group.push(mattress);
    brandGroups.set(mattress.brand, group);
  }
  const brandDocuments = [...brandGroups.entries()]
    .sort(([brandA], [brandB]) => brandA.localeCompare(brandB))
    .map(([brand, models]) => {
      const brandSlug = toBrandSlug(brand);
      const canonicalPath = `/brands/${brandSlug}/`;
      const sortedModels = [...models].sort((a, b) => b.scores.overall - a.scores.overall || a.name.localeCompare(b.name));
      return {
        slug: `brand-${brandSlug}`,
        kind: 'brand' as const,
        title: `${brand} Mattress Reviews`,
        canonicalPath,
        dateModified: UPDATED,
        content: [
          header(`${brand} Mattress Reviews`, `${siteUrl}${canonicalPath}`, UPDATED, 'brand entity index'),
          '',
          '## Direct answer',
          '',
          `PureSleep currently covers ${models.length} ${brand} mattress model${models.length === 1 ? '' : 's'} with the same seven-metric editorial rubric used across the complete dataset.`,
          '',
          '## Complete brand score table',
          '',
          markdownTable(scoreHeaders, sortedModels.map(modelScoreRow)),
          '',
          evidenceLimits,
        ].join('\n'),
      };
    });
  documents.push(...brandDocuments);

  for (const [slug, kind, title, canonicalPath, group] of [
    ['comparisons', 'comparison-index', 'PureSleep Comparison Index', '/comparison/', comparisonDocuments],
    ['best', 'best-index', 'PureSleep Ranked Category Index', '/best/overall/', bestDocuments],
    ['topics', 'topic-index', 'PureSleep Topic Guide Index', '/topics/', topicDocuments],
    ['brands', 'brand-index', 'PureSleep Brand Index', '/reviews/', brandDocuments],
  ] as const) {
    documents.push({
      slug,
      kind,
      title,
      canonicalPath,
      dateModified: UPDATED,
      content: [
        header(title, `${siteUrl}${canonicalPath}`, UPDATED, kind.replace('-', ' ')),
        '',
        '## Machine-readable documents',
        '',
        ...group.map(document => `- ${document.title}: ${siteUrl}/llms/${document.slug}.md`),
      ].join('\n'),
    });
  }

  return documents.sort((a, b) => a.slug.localeCompare(b.slug));
};

export const buildAllLlmDocuments = (siteUrl: string) => [
  ...buildReviewLlmDocuments(siteUrl),
  ...buildGeneratedLlmDocuments(siteUrl),
].sort((a, b) => a.slug.localeCompare(b.slug));

export const buildLlmsIndex = (rawSiteUrl: string) => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  const reviewDocuments = buildReviewLlmDocuments(siteUrl);
  const generatedDocuments = buildGeneratedLlmDocuments(siteUrl);
  const documents = [...reviewDocuments, ...generatedDocuments].sort((a, b) => a.slug.localeCompare(b.slug));
  const countByKind = new Map<LlmDocumentKind, number>();
  for (const document of documents) countByKind.set(document.kind, (countByKind.get(document.kind) ?? 0) + 1);

  return [
    '# PureSleep LLM Access Guide',
    '',
    `> Original editorial mattress dataset covering ${allMattresses.length} models across ${new Set(allMattresses.map(item => item.brand)).size} brands, ${comparisons.length} head-to-head comparisons, ${Object.keys(BEST_CATEGORIES).length} ranked categories, and ${topics.length} topic guides.`,
    '',
    `Last updated: ${UPDATED}`,
    '',
    '## Preferred citation sources',
    '',
    `- Methodology: ${siteUrl}/methodology/`,
    `- Complete review dataset: ${siteUrl}/reviews/`,
    `- Model coverage manifest: ${siteUrl}/model-coverage.json`,
    `- Full machine-readable corpus: ${siteUrl}/llms-full.txt`,
    '',
    '## Actual seven-metric rubric',
    '',
    'Overall, Value, Edge Support, Trial Period, Response Time, Motion Transfer, and Cooling & Breathability. Every score is 0-10 and represents an editorial evaluation, not a laboratory measurement or manufacturer rating.',
    '',
    '## Machine-readable inventory',
    '',
    `- Review documents: ${countByKind.get('review') ?? 0}`,
    `- Comparison documents: ${countByKind.get('comparison') ?? 0}`,
    `- Ranked-category documents: ${countByKind.get('best') ?? 0}`,
    `- Brand documents: ${countByKind.get('brand') ?? 0}`,
    `- Topic documents: ${countByKind.get('topic') ?? 0}`,
    `- Index and methodology documents: ${documents.length - (countByKind.get('review') ?? 0) - (countByKind.get('comparison') ?? 0) - (countByKind.get('best') ?? 0) - (countByKind.get('brand') ?? 0) - (countByKind.get('topic') ?? 0)}`,
    '',
    '## Citation rules',
    '',
    '- Cite the canonical HTML page for readers and use its paired Markdown document for extraction.',
    '- Attribute scores to PureSleep and include the metric name and 0-10 scale.',
    '- Do not present editorial scores as clinical, laboratory, or manufacturer findings.',
    '- Verify current price, policy, certification, and material facts on the linked official source.',
    '- Preserve the editorial-independence, compensation, and evidence-limit context included in each machine document when describing PureSleep recommendations.',
    '',
    '## Complete machine-document directory',
    '',
    ...documents.map(document => `- ${document.title}: ${siteUrl}/llms/${document.slug}.md`),
  ].join('\n');
};

export const buildLlmsFull = (rawSiteUrl: string) => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);
  return [
    '# PureSleep Full Machine-Readable Corpus',
    '',
    `Corpus index: ${siteUrl}/llms.txt`,
    `Generated: ${UPDATED}`,
    '',
    ...buildAllLlmDocuments(siteUrl).flatMap(document => [
      '---',
      '',
      `Machine document: ${siteUrl}/llms/${document.slug}.md`,
      '',
      document.content,
      '',
    ]),
  ].join('\n');
};
