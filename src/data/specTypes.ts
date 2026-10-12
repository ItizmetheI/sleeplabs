export interface FirmnessOption {
  label: string;
  /** Lower number of the stated range; null when the brand gives no number and the word is unmapped. */
  value: number | null;
  /** Number exactly as recorded ("4-5"), or null. */
  display: string | null;
}

export interface SpecLayer {
  name: string;
  /** Inches as stated by the brand, or "not listed". */
  thickness: string;
}

export interface MattressSpec {
  slug: string;
  model: string;
  /** False when the official product page could not be reached (spec row is FAIL). */
  reachable: boolean;
  type: 'All-foam' | 'Hybrid' | 'Latex hybrid' | 'All-latex' | null;
  construction: string[];
  firmnessRaw: string;
  firmnessOptions: FirmnessOption[];
  heightRaw: string;
  heightsIn: number[];
  layersRaw: string;
  layers: SpecLayer[];
  queenPriceRaw: string;
  queenPricesUsd: number[];
  priceChecked: string;
  trialNights: number | null;
  warranty: string;
  shipping: string;
  returns: string;
  sizes: string[];
  certifications: string[];
  organicCert: string;
  madeIn: string;
  productUrl: string;
  sourceChecked: string;
}
