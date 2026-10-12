// /scores.csv: the full scorecard as CSV, same rows and order as /reviews/.
import { SCORECARD_HEADERS, scorecardRows } from '../lib/scorecard';
import { reviewUrl } from '../lib/ownerSite';

export const prerender = true;

const SITE_URL = import.meta.env.SITE_URL || 'https://mattressinquirer.ahmedbarkat1067.workers.dev';
const cell = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

export const GET = () => {
  const lines = [
    [...SCORECARD_HEADERS, 'Review URL'].map(cell).join(','),
    ...scorecardRows().map(r => [...r.cells, `${SITE_URL}${reviewUrl(r.mattress.id)}`].map(cell).join(',')),
  ];
  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'inline; filename="scores.csv"' },
  });
};
