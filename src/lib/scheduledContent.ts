// ponytail: publication eligibility must come from an explicit cutoff, not the build machine's
// clock, or the same commit builds differently on different days. Falls back to today's date.
const CUTOFF = process.env.PUBLIC_CONTENT_CUTOFF_DATE
  || new Date().toISOString().slice(0, 10);

export const contentCutoffDate = (): string => CUTOFF;

/** A post is scheduled (not yet publishable) when its date is after the approved cutoff. */
export const isScheduled = (datePublished: string, cutoff: string = CUTOFF): boolean =>
  Boolean(datePublished) && datePublished > cutoff;
