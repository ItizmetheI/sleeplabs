// Scorecard rows shared by /reviews/ and /scores.csv, in the owner's tie order (AS3 first).
import { allMattresses, type Mattress } from '../data/mattresses';
import { getSpec, scoreText } from './pageData';
import { orderScorecard } from './scoreFieldOrder';
import { firmnessShort, typeText, trialText, warrantyText } from './ownerSite';

export const SCORECARD_HEADERS = [
  'Mattress', 'Overall', 'Value', 'Edge Support', 'Trial Period', 'Response Time',
  'Motion Transfer', 'Cooling & Breathability', 'Firmness', 'Type', 'Trial', 'Warranty',
] as const;

export const scorecardRows = (): { mattress: Mattress; cells: string[] }[] =>
  orderScorecard(allMattresses).map(m => {
    const spec = getSpec(m.id);
    return {
      mattress: m,
      cells: [
        m.name,
        scoreText(m, 'overall'), scoreText(m, 'value'), scoreText(m, 'edgeSupport'), scoreText(m, 'trialPeriod'),
        scoreText(m, 'responseTime'), scoreText(m, 'motionTransfer'), scoreText(m, 'coolingBreathability'),
        firmnessShort(spec), typeText(spec), trialText(spec), warrantyText(spec),
      ],
    };
  });

/** Month the specs were recorded, for the "as of" lead. */
export const scorecardAsOf = (): string => (getSpec(allMattresses[0].id).sourceChecked ?? 'October 2026').split(';')[0].trim(); // the note after ';' is internal
