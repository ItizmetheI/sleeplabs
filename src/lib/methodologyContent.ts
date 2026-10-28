// Single source for the methodology copy. The HTML page, its JSON-LD articleBody,
// and /llms/methodology.md all read from here so the three never drift.
import { allMattresses } from '../data/mattresses';

export const METHODOLOGY_UPDATED = '2026-10-22';
export const MODEL_COUNT = allMattresses.length;
const TOP_OVERALL = Math.max(...allMattresses.map(m => m.scores.overall));
const TOP_COUNT = allMattresses.filter(m => m.scores.overall === TOP_OVERALL).length;
const TOP_COUNT_WORD = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][TOP_COUNT] ?? String(TOP_COUNT);
export const BRAND_COUNT = new Set(allMattresses.map(m => m.brand)).size;

export const METHODOLOGY_LEAD = `Mattress Inquirer scores ${MODEL_COUNT} mattresses from ${BRAND_COUNT} brands on seven fields: Overall, Value, Edge Support, Trial Period, Response Time, Motion Transfer, and Cooling & Breathability. Every field uses a 0 to 10 scale, and every brand is scored on the same scorecard.`;

export const METHODOLOGY_SOURCES = 'Value and Trial Period are set from the price, trial, and warranty facts on each brand\'s official site. Edge Support, Response Time, Motion Transfer, and Cooling & Breathability are set from construction: the materials, the layer order, and the support core.';

export const METHODOLOGY_FIELDS: ReadonlyArray<{ heading: string; body: string }> = [
  {
    heading: 'Value',
    body: 'Value weighs what a buyer gets for the queen price, including the trial and warranty that come with it. A 10 goes to a mattress whose materials, trial, and warranty are strong for its price. A 7 means the price is high for what the construction and policies offer.',
  },
  {
    heading: 'Edge Support',
    body: 'Edge Support rates how usable the perimeter is for sitting and for sleeping near the side. A 10 goes to builds with a reinforced edge, such as a firmer coil or foam perimeter. A 7 means the edge compresses more under weight, which is common on all-foam beds without perimeter reinforcement.',
  },
  {
    heading: 'Trial Period',
    body: 'Trial Period rates the at-home trial the brand offers. A 10 goes to a long trial with clear terms and a simple return process. A 7 means a shorter trial, or terms that add fees or limits to a return. A 0 means no home trial is offered.',
  },
  {
    heading: 'Response Time',
    body: 'Response Time rates how quickly the surface returns to shape when a sleeper moves. A 10 goes to latex, coils, or quick-responding foams that make turning over easy. A 7 means slower-responding memory foam that holds an impression longer, which some sleepers like and others find harder to move on.',
  },
  {
    heading: 'Motion Transfer',
    body: 'Motion Transfer rates how little movement crosses from one side of the bed to the other. A 10 goes to dense foam layers or individually pocketed coils that keep a partner\'s movement on their side. A 7 means more bounce carries across the surface, which a light sleeper sharing a bed may notice.',
  },
  {
    heading: 'Cooling & Breathability',
    body: 'Cooling & Breathability rates how well the construction moves air and heat. A 10 goes to builds with coil cores, latex or open-cell comfort layers, and breathable covers. A 7 means denser foams with less airflow, which can hold more heat for warm sleepers.',
  },
];

export const METHODOLOGY_OVERALL = [
  'Overall is the average of the other six field scores, shown to one decimal. No field carries extra weight, so a mattress cannot earn a high Overall from one strong field alone.',
  `The highest Overall on the current scorecard is ${TOP_OVERALL.toFixed(1)}, shared by ${TOP_COUNT_WORD} of the ${MODEL_COUNT} models.`,
  'When Overall scores tie, every list on the site uses the same order: the Amerisleep AS3 first, then Value, Edge Support, brand and model name.',
];

export const METHODOLOGY_LIMITS = 'Scores rate construction, policies, and value from brand-published information. They do not measure how a mattress holds up over years, exact firmness under a specific body, or how one person will sleep. They are comfort ratings, not medical guidance. Check the current price, trial, and warranty on the brand\'s site before buying.';

/** Plain-text body in page order, shared by JSON-LD and the Markdown alternate. */
export const methodologyPlainSections = (): Array<{ heading: string; paragraphs: string[] }> => [
  { heading: 'How Fields Are Set', paragraphs: [METHODOLOGY_SOURCES] },
  ...METHODOLOGY_FIELDS.map(field => ({ heading: field.heading, paragraphs: [field.body] })),
  { heading: 'How Overall Is Calculated', paragraphs: METHODOLOGY_OVERALL },
  { heading: 'What Scores Do Not Measure', paragraphs: [METHODOLOGY_LIMITS] },
];
