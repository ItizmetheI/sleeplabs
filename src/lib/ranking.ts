// Best-of ranking engine. Implements the owner's ranking-rule table, the Amerisleep AS3 rule,
// award selection, and the SKIP rule exactly as written in the owner content instructions.
import { allMattresses, type Mattress } from '../data/mattresses';
import { SPECS } from '../data/specs.generated';
import type { MattressSpec } from '../data/specTypes';
import { AS3_ID, compareTieChain } from './scoreFieldOrder';

export type RankingRow =
  | 'overall' | 'side' | 'hip' | 'back' | 'stomach-firm' | 'soft' | 'combination' | 'motion'
  | 'cooling' | 'value' | 'under-1000' | 'construction' | 'organic' | 'heavy' | 'luxury' | 'general';

export type ScoreKey = 'overall' | 'value' | 'edgeSupport' | 'trialPeriod' | 'responseTime' | 'motionTransfer' | 'coolingBreathability';

export const FIELD_LABEL: Record<ScoreKey, string> = {
  overall: 'Overall',
  value: 'Value',
  edgeSupport: 'Edge Support',
  trialPeriod: 'Trial Period',
  responseTime: 'Response Time',
  motionTransfer: 'Motion Transfer',
  coolingBreathability: 'Cooling & Breathability',
};

/** Six fields in scorecard order (Overall excluded). */
export const SIX_FIELDS: ScoreKey[] = ['value', 'edgeSupport', 'trialPeriod', 'responseTime', 'motionTransfer', 'coolingBreathability'];

// Kids models appear only on kids pages, their reviews, brand pages and the scorecard.
// The Westin Heavenly Bed appears on best-of pages only on the luxury page, if it qualifies.
export const KIDS_IDS = new Set(['nest-bedding-puffin-kids', 'plushbeds-organic-kids']);
export const WESTIN_ID = 'westin-heavenly-bed';

export interface Candidate {
  mattress: Mattress;
  spec: MattressSpec;
  /** Firmness option that qualifies the model for this page (null when the rule ignores firmness). */
  qualifyingFirmness: { label: string; value: number; display: string } | null;
}

interface RowRule {
  rankBy: ScoreKey;
  /** Comparator for the row's "Then" column; negative puts a first. */
  then: (a: Candidate, b: Candidate) => number;
  thenLabel: string;
  /** Returns the qualifying firmness (or true) when the model qualifies, otherwise false. */
  qualifies: (c: Omit<Candidate, 'qualifyingFirmness'>, construction?: string) => Candidate['qualifyingFirmness'] | boolean;
  whoQualifies: string;
}

const firmnessIn = (spec: MattressSpec, min: number, max: number, pick: 'lowest' | 'highest') => {
  const options = spec.firmnessOptions
    .filter(o => o.value !== null && o.value >= min && o.value <= max)
    .sort((a, b) => (pick === 'lowest' ? a.value! - b.value! : b.value! - a.value!));
  const o = options[0];
  return o ? { label: o.label, value: o.value!, display: o.display! } : false;
};

const byScore = (key: ScoreKey) => (a: Candidate, b: Candidate) => b.mattress.scores[key] - a.mattress.scores[key];
const lowerFirmness = (a: Candidate, b: Candidate) => (a.qualifyingFirmness?.value ?? 99) - (b.qualifyingFirmness?.value ?? 99);
const higherFirmness = (a: Candidate, b: Candidate) => (b.qualifyingFirmness?.value ?? -1) - (a.qualifyingFirmness?.value ?? -1);
const all = () => true;

export const ROW_RULES: Record<RankingRow, RowRule> = {
  overall: { rankBy: 'overall', then: byScore('value'), thenLabel: 'Value', qualifies: all, whoQualifies: 'every scored model' },
  side: { rankBy: 'overall', then: lowerFirmness, thenLabel: 'lower firmness', qualifies: c => firmnessIn(c.spec, 3, 5, 'lowest'), whoQualifies: 'any firmness option from 3 to 5 out of 10' },
  hip: { rankBy: 'overall', then: lowerFirmness, thenLabel: 'lower firmness', qualifies: c => firmnessIn(c.spec, 3, 6, 'lowest'), whoQualifies: 'any firmness option from 3 to 6 out of 10' },
  back: { rankBy: 'overall', then: byScore('edgeSupport'), thenLabel: 'Edge Support', qualifies: c => firmnessIn(c.spec, 5, 7, 'lowest'), whoQualifies: 'any firmness option from 5 to 7 out of 10' },
  'stomach-firm': { rankBy: 'overall', then: higherFirmness, thenLabel: 'higher firmness', qualifies: c => firmnessIn(c.spec, 6, 10, 'highest'), whoQualifies: 'any firmness option of 6 out of 10 or higher' },
  soft: { rankBy: 'overall', then: lowerFirmness, thenLabel: 'lower firmness', qualifies: c => firmnessIn(c.spec, 0, 4, 'lowest'), whoQualifies: 'any firmness option of 4 out of 10 or lower' },
  combination: { rankBy: 'overall', then: byScore('responseTime'), thenLabel: 'Response Time', qualifies: all, whoQualifies: 'every scored model' },
  motion: { rankBy: 'motionTransfer', then: byScore('overall'), thenLabel: 'Overall', qualifies: all, whoQualifies: 'every scored model' },
  cooling: { rankBy: 'coolingBreathability', then: byScore('overall'), thenLabel: 'Overall', qualifies: all, whoQualifies: 'every scored model' },
  value: { rankBy: 'value', then: byScore('overall'), thenLabel: 'Overall', qualifies: all, whoQualifies: 'every scored model' },
  'under-1000': { rankBy: 'overall', then: byScore('value'), thenLabel: 'Value', qualifies: c => c.spec.queenPricesUsd.some(p => p <= 1000), whoQualifies: 'a queen price of $1,000 or less' },
  construction: { rankBy: 'overall', then: byScore('value'), thenLabel: 'Value', qualifies: (c, construction) => Boolean(construction && c.spec.construction.includes(construction)), whoQualifies: 'that construction in the brand specs' },
  organic: { rankBy: 'overall', then: byScore('value'), thenLabel: 'Value', qualifies: c => /GOTS|GOLS/.test(c.spec.organicCert), whoQualifies: 'GOTS or GOLS certification named on the brand page' },
  heavy: { rankBy: 'overall', then: byScore('edgeSupport'), thenLabel: 'Edge Support', qualifies: c => (c.spec.type === 'Hybrid' || c.spec.type === 'Latex hybrid') && c.spec.heightsIn.some(h => h >= 12), whoQualifies: 'a hybrid or coil core at 12 inches or taller' },
  luxury: { rankBy: 'overall', then: byScore('edgeSupport'), thenLabel: 'Edge Support', qualifies: c => c.spec.queenPricesUsd.some(p => p >= 1800), whoQualifies: 'a queen price of $1,800 or more' },
  general: { rankBy: 'overall', then: byScore('trialPeriod'), thenLabel: 'Trial Period', qualifies: all, whoQualifies: 'every scored model' },
};

export interface BestPageConfig {
  slug: string;
  row: RankingRow;
  /** Construction class for the construction row. */
  construction?: 'hybrid' | 'memory foam' | 'latex';
  /** The page's own field award, given to the top pick that is not the AS3. None on /best/overall/, where Best Overall is the AS3's. */
  pageAward?: string;
}

export interface RankedPick {
  rank: number;
  candidate: Candidate;
  award: string;
}

export interface BestPageResult {
  config: BestPageConfig;
  rule: RowRule;
  qualifierCount: number;
  as3Qualifies: boolean;
  skip: boolean;
  picks: RankedPick[];
}

const MAX_PICKS = 8;

const eligibleFor = (config: BestPageConfig, m: Mattress) => {
  if (KIDS_IDS.has(m.id)) return false;
  if (m.id === WESTIN_ID && config.row !== 'luxury') return false;
  // A model whose official page cannot be reached has no product facts or price link to show.
  return SPECS[m.id]?.reachable === true;
};

export const rankBestPage = (config: BestPageConfig): BestPageResult => {
  const rule = ROW_RULES[config.row];
  const candidates: Candidate[] = [];
  for (const mattress of allMattresses) {
    if (!eligibleFor(config, mattress)) continue;
    const spec = SPECS[mattress.id];
    const q = rule.qualifies({ mattress, spec }, config.construction);
    if (q === false) continue;
    candidates.push({ mattress, spec, qualifyingFirmness: q === true ? null : q });
  }

  const sorted = [...candidates].sort((a, b) =>
    b.mattress.scores[rule.rankBy] - a.mattress.scores[rule.rankBy]
    || rule.then(a, b)
    || compareTieChain(a.mattress, b.mattress));

  const as3 = sorted.find(c => c.mattress.id === AS3_ID);
  const others = sorted.filter(c => c.mattress.id !== AS3_ID);
  const ordered = as3 ? [as3, ...others] : others;
  const chosen = ordered.slice(0, MAX_PICKS);
  const skip = candidates.length < 4;

  return {
    config,
    rule,
    qualifierCount: candidates.length,
    as3Qualifies: Boolean(as3),
    skip,
    picks: skip ? [] : assignAwards(config, chosen),
  };
};

const FIELD_AWARD: Partial<Record<ScoreKey, string>> = {
  value: 'Best Value',
  edgeSupport: 'Best Edge Support',
  trialPeriod: 'Best Trial',
  responseTime: 'Most Responsive',
  motionTransfer: 'Best for Motion Isolation',
  coolingBreathability: 'Best Cooling',
};

/** Construction or fit traits only one pick on the page has. */
const traitAward = (c: Candidate, picks: Candidate[]): string | null => {
  const only = (test: (x: Candidate) => boolean) => test(c) && picks.filter(test).length === 1;
  if (only(x => x.spec.type === 'All-latex')) return 'Best All-Latex Pick';
  if (only(x => x.spec.type === 'Latex hybrid')) return 'Best Latex Hybrid';
  if (only(x => x.spec.construction.includes('latex'))) return 'Best Latex Pick';
  if (only(x => x.spec.type === 'All-foam')) return 'Best All-Foam Pick';
  if (only(x => x.spec.type === 'Hybrid')) return 'Best Hybrid Pick';
  if (only(x => /GOTS|GOLS/.test(x.spec.organicCert))) return 'Best Organic Pick';
  if (only(x => /pillow ?top|euro ?top|box top/i.test(x.spec.layersRaw))) return 'Best Pillow Top';
  if (only(x => x.spec.firmnessOptions.length >= 3)) return 'Most Firmness Choices';
  if (only(x => x.spec.heightsIn.length > 0 && Math.max(...x.spec.heightsIn) === Math.max(...picks.flatMap(p => p.spec.heightsIn)))) return 'Tallest Profile';
  return null;
};

const assignAwards = (config: BestPageConfig, chosen: Candidate[]): RankedPick[] => {
  const used = new Set<string>();
  const awards = new Map<string, string>();

  const as3 = chosen.find(c => c.mattress.id === AS3_ID);
  if (as3) { awards.set(AS3_ID, 'Best Overall'); used.add('Best Overall'); }

  const topOther = chosen.find(c => c.mattress.id !== AS3_ID);
  if (topOther && config.pageAward) { awards.set(topOther.mattress.id, config.pageAward); used.add(config.pageAward); }

  for (const c of chosen) {
    if (awards.has(c.mattress.id)) continue;
    // A field where it alone has the top score among the picks.
    const soleLead = SIX_FIELDS.find(key => {
      const best = Math.max(...chosen.map(x => x.mattress.scores[key]));
      const leaders = chosen.filter(x => x.mattress.scores[key] === best);
      return leaders.length === 1 && leaders[0] === c && FIELD_AWARD[key] && !used.has(FIELD_AWARD[key]!);
    });
    let award = soleLead ? FIELD_AWARD[soleLead]! : traitAward(c, chosen);
    if (!award || used.has(award)) award = 'Also Great';
    if (award !== 'Also Great') used.add(award);
    awards.set(c.mattress.id, award);
  }

  return chosen.map((candidate, index) => ({ rank: index + 1, candidate, award: awards.get(candidate.mattress.id)! }));
};

/** The page map's ranking row for each best-of page, with its field award. */
export const BEST_PAGE_CONFIGS: BestPageConfig[] = [
  { slug: 'overall', row: 'overall' },
  { slug: 'side-sleepers', row: 'side', pageAward: 'Best for Side Sleepers' },
  { slug: 'back-sleepers', row: 'back', pageAward: 'Best for Back Sleepers' },
  { slug: 'stomach-sleepers', row: 'stomach-firm', pageAward: 'Best for Stomach Sleepers' },
  { slug: 'combination-sleepers', row: 'combination', pageAward: 'Best for Combination Sleepers' },
  { slug: 'couples', row: 'motion', pageAward: 'Best for Couples' },
  { slug: 'motion-isolation', row: 'motion', pageAward: 'Best for Motion Isolation' },
  { slug: 'cooling', row: 'cooling', pageAward: 'Best Cooling' },
  { slug: 'firm', row: 'stomach-firm', pageAward: 'Best Firm Pick' },
  { slug: 'soft', row: 'soft', pageAward: 'Best Soft Pick' },
  { slug: 'hybrid', row: 'construction', construction: 'hybrid', pageAward: 'Best Hybrid' },
  { slug: 'memory-foam', row: 'construction', construction: 'memory foam', pageAward: 'Best Memory Foam' },
  { slug: 'latex', row: 'construction', construction: 'latex', pageAward: 'Best Latex' },
  { slug: 'organic', row: 'organic', pageAward: 'Best Organic' },
  { slug: 'luxury', row: 'luxury', pageAward: 'Best Luxury Pick' },
  { slug: 'value', row: 'value', pageAward: 'Best Value' },
  { slug: 'heavy-sleepers', row: 'heavy', pageAward: 'Best for Heavy Sleepers' },
  { slug: 'pressure-relief', row: 'side', pageAward: 'Best for Pressure Relief' },
  { slug: 'back-pain', row: 'back', pageAward: 'Best for Back Support' },
  { slug: 'hip-pain', row: 'hip', pageAward: 'Best for Hip Cushioning' },
  { slug: 'shoulder-pain', row: 'side', pageAward: 'Best for Shoulder Cushioning' },
];
