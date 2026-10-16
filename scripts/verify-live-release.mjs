// Live release gate (AHMED-RUNBOOK.md step 10).
// Read-only HTTP checks against a deployed origin. Emits JSON; exits non-zero on any failure.
//
// Usage:
//   SITE_URL=https://approved-origin \
//   PUBLIC_CONTACT_EMAIL=editorial@approved-origin \
//   PREVIEW_URLS=https://a.workers.dev,https://b.workers.dev \
//   node scripts/verify-live-release.mjs

const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
const contactEmail = process.env.PUBLIC_CONTACT_EMAIL || '';
const previewUrls = (process.env.PREVIEW_URLS || '')
  .split(',').map(v => v.trim().replace(/\/$/, '')).filter(Boolean);

if (!siteUrl) {
  console.error(JSON.stringify({ status: 'fail', failures: ['SITE_URL is required.'] }, null, 2));
  process.exit(1);
}

const failures = [];
const checks = [];
const record = (name, ok, detail) => {
  checks.push({ name, ok, detail });
  if (!ok) failures.push(`${name}: ${detail}`);
};

const TIMEOUT_MS = 20_000;
const get = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'MattressInquirerReleaseQA/1.0', accept: 'text/html,text/plain,*/*' },
    });
    return { status: res.status, url: res.url, body: await res.text() };
  } catch (error) {
    return { status: 0, url, body: '', error: error?.name ?? 'UnknownError' };
  } finally {
    clearTimeout(timer);
  }
};

const REQUIRED_ROUTES = [
  '/', '/reviews/', '/best/overall/', '/comparison/', '/brands/', '/blog/',
  '/methodology/', '/about/', '/disclosure/', '/editorial-policy/',
  '/privacy-policy/', '/terms-of-service/', '/topics/', '/guides/',
];

// 1. HTTPS origin
record('https-origin', siteUrl.startsWith('https://'), `SITE_URL must be HTTPS; got ${siteUrl}`);
record('origin-not-preview', !/\.workers\.dev$/i.test(new URL(siteUrl).hostname),
  `Production origin must not be a workers.dev preview host`);

// 2. Required routes return 200
for (const route of REQUIRED_ROUTES) {
  const res = await get(siteUrl + route);
  record(`route${route}`, res.status === 200, `expected 200, got ${res.status}${res.error ? ` (${res.error})` : ''}`);
}

// 3. Home page: self-canonical, indexable, brand + contact visible
const home = await get(siteUrl + '/');
const canonical = home.body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1] ?? '';
record('home-self-canonical', canonical.replace(/\/$/, '') === siteUrl,
  `canonical is ${canonical || '<missing>'}, expected ${siteUrl}/`);
const robotsMeta = home.body.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i)?.[1] ?? '';
record('home-indexable', !/noindex/i.test(robotsMeta),
  `home carries robots="${robotsMeta}" — production origin must be indexable`);
if (contactEmail) {
  const contactPages = await Promise.all([get(siteUrl + '/about/'), get(siteUrl + '/privacy-policy/')]);
  record('public-contact-visible', contactPages.some(p => p.body.includes(contactEmail)),
    `PUBLIC_CONTACT_EMAIL not visible on /about/ or /privacy-policy/`);
}

// 4. robots.txt allows crawling and advertises this origin's sitemap
const robots = await get(siteUrl + '/robots.txt');
record('robots-200', robots.status === 200, `robots.txt returned ${robots.status}`);
record('robots-allows', /^\s*Allow:\s*\//mi.test(robots.body), 'robots.txt does not allow crawling');
record('robots-sitemap-origin', robots.body.includes(`${siteUrl}/sitemap-index.xml`),
  'robots.txt sitemap does not use the production origin');

// 5. Sitemap uses the production origin only
const sitemap = await get(siteUrl + '/sitemap-index.xml');
record('sitemap-200', sitemap.status === 200, `sitemap-index.xml returned ${sitemap.status}`);
const foreignLocs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1]).filter(loc => !loc.startsWith(siteUrl));
record('sitemap-origin-parity', foreignLocs.length === 0,
  `${foreignLocs.length} sitemap entries use a different origin (first: ${foreignLocs[0] ?? 'n/a'})`);

// 6. Machine-readable surfaces
const manifest = await get(siteUrl + '/model-coverage.json');
record('model-manifest-200', manifest.status === 200, `model-coverage.json returned ${manifest.status}`);
let modelCount = 0;
try { const j = JSON.parse(manifest.body); modelCount = (j.models ?? j.data ?? j).length ?? 0; } catch { /* reported below */ }
record('model-manifest-55', modelCount === 55, `expected 55 models in manifest, found ${modelCount}`);
const llms = await get(siteUrl + '/llms.txt');
record('llms-txt-200', llms.status === 200, `llms.txt returned ${llms.status}`);
record('llms-txt-origin', !llms.body.includes('workers.dev') || siteUrl.includes('workers.dev'),
  'llms.txt still references a preview origin');

// 7. Legacy redirect still resolves
const legacy = await get(siteUrl + '/best-mattress/');
record('legacy-best-mattress-redirect', legacy.status === 200 && /\/best\/overall\/?$/.test(new URL(legacy.url).pathname),
  `expected redirect to /best/overall/, landed on ${legacy.url} (${legacy.status})`);

// 8. Source-review-pending health content stays noindex
const pending = await get(siteUrl + '/blog/how-to-sleep-with-sciatica/');
if (pending.status === 200) {
  const meta = pending.body.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i)?.[1] ?? '';
  record('pending-health-noindex', /noindex/i.test(meta),
    `source-review-pending page is index-eligible (robots="${meta || '<none>'}")`);
}

// 9. Every preview host must fail closed
for (const preview of previewUrls) {
  const pHome = await get(preview + '/');
  const pRobots = await get(preview + '/robots.txt');
  const pMeta = pHome.body.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i)?.[1] ?? '';
  const blocked = pHome.status === 401 || pHome.status === 403;
  record(`preview-noindex ${preview}`, blocked || /noindex/i.test(pMeta),
    `preview home is index-eligible (status ${pHome.status}, robots="${pMeta || '<none>'}")`);
  record(`preview-robots-disallow ${preview}`, blocked || /^\s*Disallow:\s*\/\s*$/mi.test(pRobots.body),
    'preview robots.txt does not disallow all crawling');
}

const out = {
  status: failures.length ? 'fail' : 'pass',
  siteUrl,
  previewHostsChecked: previewUrls.length,
  checksRun: checks.length,
  failed: failures.length,
  failures,
};
console.log(JSON.stringify(out, null, 2));
process.exit(failures.length ? 1 : 0);
