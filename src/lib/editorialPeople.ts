export const FIRDOUS_FARHAD = {
  name: 'Firdous Farhad',
  role: 'Health and Sleep Content Reviewer',
  credentials: 'Licensed massage therapist and certified sleep science coach.',
  firstPersonBio: "I'm a licensed massage therapist and certified sleep science coach.",
  path: '/contributors/firdous-farhad/',
} as const;

export const firdousFarhadSchemaId = (siteUrl: string) =>
  `${siteUrl.replace(/\/$/, '')}${FIRDOUS_FARHAD.path}#person`;
