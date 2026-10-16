// Ownership / compensation disclosure.
//
// EVIDENCE-AND-CLAIMS-DISPOSITION.md holds "independent" and "independently operated" as
// WITHHELD until the owner and operator are certified, so that wording only ships when
// PUBLIC_DISCLOSURE_APPROVED=true. The un-approved text states only what is verifiable and
// carries no ownership language (owner content instructions, 2026-10-11).
//
// Compensation is no longer withheld: the owner supplied the affiliate disclosure text, so
// the site states it may earn a commission. Never claim "no commissions" anywhere.
const disclosureApproved = process.env.PUBLIC_DISCLOSURE_APPROVED === 'true';

export const isDisclosureApproved = (): boolean => disclosureApproved;

export const EDITORIAL_INDEPENDENCE_DISCLOSURE = disclosureApproved
  ? 'Mattress Inquirer is an independently operated editorial publication.'
  : 'Mattress Inquirer scores every brand on the same seven-field scorecard.';

/** Fixed owner text shown under every byline. Never rewrite. */
export const BYLINE_DISCLOSURE = 'We may earn a commission when you buy through links on this page.';

export const LINK_DISCLOSURE = `${BYLINE_DISCLOSURE} Commissions never change our scores.`;

export const RANKING_DISCLOSURE =
  `${EDITORIAL_INDEPENDENCE_DISCLOSURE} ${LINK_DISCLOSURE}`;

/** Short badge text. Never asserts independence unless the disclosure is certified. */
export const TRUST_BADGE_LABEL = disclosureApproved
  ? 'Independently operated'
  : 'One seven-field scorecard';
