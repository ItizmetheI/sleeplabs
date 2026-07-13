export type ArticleBodyPart =
  | string
  | number
  | boolean
  | null
  | undefined
  | ArticleBodyPart[];

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&nbsp;': ' ',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
};

const flattenParts = (parts: ArticleBodyPart[]): ArticleBodyPart[] =>
  parts.flatMap((part) => (Array.isArray(part) ? flattenParts(part) : [part]));

const cleanArticleText = (value: ArticleBodyPart): string => {
  if (value === null || value === undefined || value === false) return '';

  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(amp|nbsp|quot|#39|apos|lt|gt);/g, (match) => HTML_ENTITIES[match] ?? match)
    .replace(/\s+/g, ' ')
    .trim();
};

export const toArticleBody = (...parts: ArticleBodyPart[]): string =>
  flattenParts(parts)
    .map(cleanArticleText)
    .filter(Boolean)
    .join('\n\n');

export const articleList = (heading: string, items: ArticleBodyPart[] = []): ArticleBodyPart[] =>
  items.length > 0 ? [heading, items.map((item) => `- ${item}`)] : [];

export const articleTable = (
  heading: string,
  headers: ArticleBodyPart[] = [],
  rows: ArticleBodyPart[][] = []
): ArticleBodyPart[] =>
  rows.length > 0 ? [heading, headers.join(' | '), rows.map((row) => row.join(' | '))] : [];
