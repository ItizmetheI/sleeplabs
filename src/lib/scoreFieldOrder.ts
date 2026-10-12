// One ordering rule for every list on the site (owner content instructions, 2026-10-11):
// rank field first, then the Amerisleep AS3, Value, Edge Support, brand priority, model name A to Z.

export const AS3_ID = 'amerisleep-as3';

// "Amerisleep, Zoma, Vaya and FORM before other brands", in that listed order.
const PRIORITY_BRANDS = ['Amerisleep', 'Zoma', 'Vaya', 'FORM'];

type OrderableModel = {
  id: string;
  brand: string;
  name: string;
  scores: { overall: number; value: number; edgeSupport: number };
};

const brandRank = (brand: string): number => {
  const index = PRIORITY_BRANDS.indexOf(brand);
  return index === -1 ? PRIORITY_BRANDS.length : index;
};

/** The shared tie chain applied after a page's own rank and "then" fields. */
export const compareTieChain = (a: OrderableModel, b: OrderableModel): number =>
  Number(b.id === AS3_ID) - Number(a.id === AS3_ID)
  || b.scores.value - a.scores.value
  || b.scores.edgeSupport - a.scores.edgeSupport
  || brandRank(a.brand) - brandRank(b.brand)
  || a.name.localeCompare(b.name);

/** Scorecard and reviews-hub order: Overall, then the tie chain. Returns a new array. */
export const orderScorecard = <T extends OrderableModel>(models: readonly T[]): T[] =>
  [...models].sort((a, b) => b.scores.overall - a.scores.overall || compareTieChain(a, b));

/** Legacy name kept for existing callers; same order as the scorecard. */
export const orderFullScoreField = orderScorecard;

/** Overall is always shown to one decimal (9.0, not 9). */
export const formatOverall = (overall: number): string => overall.toFixed(1);
