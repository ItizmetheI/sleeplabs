// Data helpers shared by the review, comparison, brand, and hub templates.
import { allMattresses, type Mattress } from '../data/mattresses';
import { comparisons } from '../data/comparisons';
import { SPECS } from '../data/specs.generated';
import type { MattressSpec } from '../data/specTypes';
import { FIELD_LABEL, KIDS_IDS, WESTIN_ID, type BestPageConfig, type BestPageResult, type ScoreKey } from './ranking';
import { firmnessText, heightText, listOrNotListed, plainOrNotListed, PRICE_LABEL, SEE_PRICE, trialText, typeText, warrantyText } from './ownerSite';
import { compareTieChain, formatOverall, orderScorecard } from './scoreFieldOrder';

export const getMattress = (id: string): Mattress => {
  const mattress = allMattresses.find(m => m.id === id);
  if (!mattress) throw new Error(`Unknown mattress id: ${id}`);
  return mattress;
};

export const getSpec = (id: string): MattressSpec => {
  const spec = SPECS[id];
  if (!spec) throw new Error(`No spec row for ${id}`);
  return spec;
};

export const SCORECARD_FIELDS: ScoreKey[] = ['overall', 'value', 'edgeSupport', 'trialPeriod', 'responseTime', 'motionTransfer', 'coolingBreathability'];

export const scoreText = (m: Mattress, key: ScoreKey) => (key === 'overall' ? formatOverall(m.scores.overall) : String(m.scores[key]));

/** Comparison pages that include this model, in data order. */
export const comparisonsFor = (id: string) => comparisons.filter(c => c.mattressAId === id || c.mattressBId === id);

/**
 * How It Compares: models with a comparison page with this one first, then the nearest Overall
 * of the same type. Kids models only compare with kids models; the Westin is never an alternative.
 */
export const alternativesFor = (id: string, count = 3): Mattress[] => {
  const self = getMattress(id);
  const isKids = KIDS_IDS.has(id);
  // Kids models never appear on adult pages; a kids review lists the other kids model first, then adults.
  const eligible = (m: Mattress) => m.id !== id && m.id !== WESTIN_ID && (isKids || !KIDS_IDS.has(m.id));
  const near = (a: Mattress, b: Mattress) =>
    Math.abs(a.scores.overall - self.scores.overall) - Math.abs(b.scores.overall - self.scores.overall) || compareTieChain(a, b);

  const partners = comparisonsFor(id)
    .map(c => getMattress(c.mattressAId === id ? c.mattressBId : c.mattressAId))
    .filter(eligible)
    .sort(near);
  const chosen = isKids
    ? allMattresses.filter(m => KIDS_IDS.has(m.id) && m.id !== id)
    : partners.slice(0, count);
  if (chosen.length < count) {
    const type = getSpec(id).type;
    const sameType = allMattresses
      .filter(m => eligible(m) && !chosen.includes(m) && type !== null && getSpec(m.id).type === type)
      .sort(near);
    chosen.push(...sameType.slice(0, count - chosen.length));
  }
  if (chosen.length < 2) {
    const any = allMattresses.filter(m => eligible(m) && !chosen.includes(m)).sort(near);
    chosen.push(...any.slice(0, 2 - chosen.length));
  }
  return chosen;
};

export interface Leads {
  leadA: ScoreKey[];
  leadB: ScoreKey[];
  ties: ScoreKey[];
}

export const fieldLeads = (a: Mattress, b: Mattress): Leads => ({
  leadA: SCORECARD_FIELDS.filter(k => a.scores[k] > b.scores[k]),
  leadB: SCORECARD_FIELDS.filter(k => b.scores[k] > a.scores[k]),
  ties: SCORECARD_FIELDS.filter(k => a.scores[k] === b.scores[k]),
});

const joinFields = (keys: ScoreKey[]) => {
  const labels = keys.map(k => FIELD_LABEL[k]);
  if (labels.length <= 1) return labels.join('');
  return `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
};

/** "[A] leads on [fields]. [B] leads on [fields]. They tie on [fields]." */
export const leadsSentence = (a: Mattress, b: Mattress): string => {
  const { leadA, leadB, ties } = fieldLeads(a, b);
  const part = (m: Mattress, keys: ScoreKey[]) =>
    keys.length ? `The ${m.name} leads on ${joinFields(keys)}.` : `The ${m.name} does not lead on any of the seven fields.`;
  return [part(a, leadA), part(b, leadB), ties.length ? `They tie on ${joinFields(ties)}.` : ''].filter(Boolean).join(' ');
};

/** Quick Verdict winner line; `link` wraps each name (markdown link on the page, plain on the hub). */
export const winnerLine = (a: Mattress, b: Mattress, link: (m: Mattress) => string = m => m.name): string => {
  const oa = a.scores.overall, ob = b.scores.overall;
  if (oa === ob) return `The ${link(a)} and the ${link(b)} tie at ${scoreText(a, 'overall')}/10 Overall.`;
  const [hi, lo] = oa > ob ? [a, b] : [b, a];
  return `The ${link(hi)} wins at ${scoreText(hi, 'overall')}/10 Overall, against ${scoreText(lo, 'overall')}/10 for the ${link(lo)}.`;
};

const MAX_TITLE = 60;
const firstFit = (candidates: string[]) => candidates.find(t => t.length <= MAX_TITLE) ?? candidates[candidates.length - 1];

/** Brand prefix stripped ("Leesa Sapira Chill Hybrid" -> "Sapira Chill Hybrid"); used only when the full names cannot fit. */
const brandless = (m: Mattress) => shortName(m).replace(new RegExp(`^${m.brand} `), "");

/** Short name for the lower title rungs. Only Amerisleep's own AS-line names stay clear without the brand
 *  ("Amerisleep AS6 Black Series" -> "AS6"); other models keep their brand ("Avocado Green", "Saatva RX"). */
export const shortName = (m: Mattress) =>
  m.name.replace(/^Amerisleep /, '').replace(/ Black Series$/, '');

/** "[Model] Review (2026): [x.x]/10 Score, Specs and Verdict" with the owner's fallback ladder. */
export const reviewSeoTitle = (m: Mattress) => {
  const o = formatOverall(m.scores.overall);
  return firstFit([
    `${m.name} Review (2026): ${o}/10 Score, Specs and Verdict`,
    `${m.name} Review: ${o}/10 Score, Specs and Verdict`,
    `${m.name} Review: ${o}/10 Score and Specs`,
    `${shortName(m)} Review: ${o}/10 Score and Specs`,
    `${shortName(m)} Review: ${o}/10 Score`,
    `${brandless(m)} Review: ${o}/10 Score and Specs`,
    `${brandless(m)} Review: ${o}/10 Score`,
  ]);
};

/** "[A] vs [B] (2026): [Winner] Wins on [fields]" or "Which Is Better for You?" on an Overall tie. */
export const comparisonSeoTitle = (a: Mattress, b: Mattress) => {
  const { leadA, leadB } = fieldLeads(a, b);
  if (a.scores.overall === b.scores.overall) {
    return firstFit([
      `${a.name} vs ${b.name} (2026): Which Is Better for You?`,
      `${a.name} vs ${b.name}: Which Is Better for You?`,
      `${shortName(a)} vs ${shortName(b)} (2026): Which Is Better for You?`,
      `${shortName(a)} vs ${shortName(b)}: Which Is Better for You?`,
      `${shortName(a)} vs ${shortName(b)}: Which Is Better?`,
    ]);
  }
  const winner = a.scores.overall > b.scores.overall ? a : b;
  const leads = (winner === a ? leadA : leadB).slice(0, 2);
  const one = leads.slice(0, 1);
  return firstFit([
    `${a.name} vs ${b.name} (2026): ${winner.name} Wins on ${joinFields(leads)}`,
    `${a.name} vs ${b.name}: ${winner.name} Wins on ${joinFields(leads)}`,
    `${a.name} vs ${b.name}: ${shortName(winner)} Wins on ${joinFields(one)}`,
    `${shortName(a)} vs ${shortName(b)}: ${shortName(winner)} Wins on ${joinFields(leads)}`,
    `${shortName(a)} vs ${shortName(b)}: ${shortName(winner)} Wins on ${joinFields(one)}`,
    `${shortName(a)} vs ${shortName(b)}: ${shortName(winner)} Wins (2026)`,
    `${shortName(a)} vs ${shortName(b)}: ${shortName(winner)} Wins`,
    `${brandless(a)} vs ${brandless(b)}: ${brandless(winner)} Wins`,
    `${shortName(a)} vs ${shortName(b)}: Scores Compared`,
  ]);
};

/** "[H1]: [N] Picks, Scored and Compared" with the fallback ladder. */
export const bestSeoTitle = (h1: string, picks: number) => firstFit([
  `${h1}: ${picks} Picks, Scored and Compared`,
  `${h1.replace(' (2026)', '')}: ${picks} Picks, Scored and Compared`,
  `${h1.replace(' (2026)', '')}: ${picks} Picks Scored`,
  `${h1}: ${picks} Picks Scored`,
]);

export const brandModels = (brand: string) => orderScorecard(allMattresses.filter(m => m.brand === brand));

export const brandSlug = (brand: string) => brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Best-of "How We Picked" opener: the owner's fixed AS3 sentence plus the ranking rule in plain words. */
export const as3RankingSentence = (config: BestPageConfig, result: BestPageResult): string => {
  const rankPhrase = config.row === 'motion' || config.row === 'cooling' || config.row === 'value'
    ? `${FIELD_LABEL[result.rule.rankBy]} score`
    : 'Overall score';
  // One "then", each tie-break once, never the rank field itself (owner fix list item 8).
  const tieChain = [...new Set([result.rule.thenLabel, 'Value', 'Edge Support', 'brand', 'model name'])]
    .filter(label => label !== FIELD_LABEL[result.rule.rankBy]);
  const tieText = `${tieChain.slice(0, -1).join(', ')} and ${tieChain[tieChain.length - 1]}`;
  const checked = result.picks[0]?.candidate.spec.priceChecked;
  const qualifies = config.row === 'luxury'
    ? `Every pick was listed at $1,800 or more for a queen when we checked in ${checked}. `
    : config.row === 'construction'
    ? `Models qualify when the brand lists ${config.construction} in the construction. `
    : result.rule.whoQualifies === 'every scored model' ? '' : `Models qualify with ${result.rule.whoQualifies}. `;
  return qualifies + (result.as3Qualifies
    ? `The [Amerisleep AS3](/reviews/amerisleep-as3/) is our editorial Best Overall pick and is listed first. The other picks are ranked by ${rankPhrase}, then ${tieText}.`
    : `The [Amerisleep AS3](/reviews/amerisleep-as3/) is our editorial Best Overall pick, shown above. The picks below are ranked by ${rankPhrase}, then ${tieText}.`);
};

/** Specs at a Glance rows for a review, in the owner's fixed order. */
export const reviewSpecRows = (spec: MattressSpec): [string, string][] => [
  ['Type', typeText(spec)],
  ['Firmness', firmnessText(spec)],
  ['Height', heightText(spec)],
  ['Comfort layers', spec.layers.length ? spec.layers.map(l => (l.thickness === 'not listed' ? l.name : `${l.name} (${l.thickness} in)`)).join('; ') : 'Not listed'],
  ...(spec.reachable ? [[PRICE_LABEL, SEE_PRICE] as [string, string]] : []),
  ['Trial', trialText(spec)],
  ['Warranty', warrantyText(spec)],
  ['Sizes', listOrNotListed(spec.sizes)],
  ['Certifications', listOrNotListed(spec.certifications)],
  ['Made in', plainOrNotListed(spec.madeIn)],
];

const listNames = (names: string[]) => (names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);

/** Brand page top-score sentence, with any tie stated. Names are markdown review links. */
export const brandTopLead = (brand: string): string => {
  const models = brandModels(brand);
  const top = models[0];
  const md = (m: Mattress) => `[${m.name}](/reviews/${m.id}/)`;
  const tied = models.filter(m => m.id !== top.id && m.scores.overall === top.scores.overall);
  if (models.length === 1) return `The ${md(top)} is the only ${brand} model we score, at ${scoreText(top, 'overall')}/10 Overall.`;
  if (tied.length) return `The ${md(top)} ties with the ${listNames(tied.map(md))} for the highest Overall score among the ${models.length} ${brand} models we score, at ${scoreText(top, 'overall')}/10.`;
  return `The ${md(top)} has the highest Overall score among the ${models.length} ${brand} models we score, at ${scoreText(top, 'overall')}/10.`;
};
