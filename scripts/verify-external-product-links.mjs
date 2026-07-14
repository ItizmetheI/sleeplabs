import { allMattresses } from '../src/data/mattresses.ts';

const concurrency = 8;
const timeoutMs = 15_000;

const checkLink = async (mattress) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(mattress.productUrl, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        accept: 'text/html,application/xhtml+xml',
        'user-agent': 'Mozilla/5.0 (compatible; PureSleepLinkQA/1.0)',
      },
    });

    return {
      id: mattress.id,
      status: response.status,
      sourceUrl: mattress.productUrl,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      id: mattress.id,
      status: 0,
      sourceUrl: mattress.productUrl,
      error: error instanceof Error ? error.name : 'UnknownError',
    };
  } finally {
    clearTimeout(timeout);
  }
};

const results = [];
for (let index = 0; index < allMattresses.length; index += concurrency) {
  results.push(...await Promise.all(allMattresses.slice(index, index + concurrency).map(checkLink)));
}

const hardFailures = results.filter(({ status }) => status === 404 || status === 410);
const blockedOrRateLimited = results.filter(({ status }) => [401, 403, 429].includes(status));
const inconclusive = results.filter(({ status }) => status === 0 || status >= 500);
const statusCounts = results.reduce((counts, { status }) => {
  counts[status] = (counts[status] ?? 0) + 1;
  return counts;
}, {});

console.log(JSON.stringify({
  status: hardFailures.length === 0 ? 'pass' : 'fail',
  checked: results.length,
  statusCounts,
  hardFailures,
  blockedOrRateLimited,
  inconclusive,
}, null, 2));

if (hardFailures.length > 0) process.exit(1);
