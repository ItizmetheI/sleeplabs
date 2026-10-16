// Release configuration gate (AHMED-RUNBOOK.md step 6).
// Blocks a production-indexing build unless every approval input is present and well-formed.
// Fails closed: a missing value is a failure, never a default.

const mode = process.env.PUBLIC_INDEXING_MODE || 'preview';
const siteUrl = process.env.SITE_URL || '';
const contentCutoffDate = process.env.PUBLIC_CONTENT_CUTOFF_DATE || '';
const contactEmail = process.env.PUBLIC_CONTACT_EMAIL || '';
const brandApproved = process.env.PUBLIC_BRAND_APPROVED === 'true';
const disclosureApproved = process.env.PUBLIC_DISCLOSURE_APPROVED === 'true';

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(
  mode === 'preview' || mode === 'production',
  `PUBLIC_INDEXING_MODE must be preview or production; received ${JSON.stringify(mode)}.`,
);

let parsedSiteUrl = null;
if (siteUrl) {
  try {
    parsedSiteUrl = new URL(siteUrl);
  } catch {
    failures.push(`SITE_URL is not a valid absolute URL: ${siteUrl}`);
  }
}

if (contentCutoffDate) {
  assert(
    /^\d{4}-\d{2}-\d{2}$/.test(contentCutoffDate)
      && !Number.isNaN(Date.parse(`${contentCutoffDate}T00:00:00Z`)),
    'PUBLIC_CONTENT_CUTOFF_DATE must be a real date in YYYY-MM-DD format.',
  );
}

if (mode === 'production') {
  assert(Boolean(parsedSiteUrl), 'Production indexing requires SITE_URL.');
  if (parsedSiteUrl) {
    const hostname = parsedSiteUrl.hostname.toLowerCase();
    assert(parsedSiteUrl.protocol === 'https:', 'Production SITE_URL must use HTTPS.');
    assert(
      !parsedSiteUrl.pathname || parsedSiteUrl.pathname === '/',
      'Production SITE_URL must be an origin with no path.',
    );
    assert(
      !parsedSiteUrl.search && !parsedSiteUrl.hash,
      'Production SITE_URL must not contain a query or fragment.',
    );
    assert(
      !hostname.endsWith('.workers.dev'),
      'A workers.dev preview host cannot be the approved production origin.',
    );
    for (const reserved of ['.example', '.invalid', '.test', '.local']) {
      assert(
        !hostname.endsWith(reserved),
        `A reserved ${reserved} hostname cannot be approved for production.`,
      );
    }
    assert(
      hostname !== 'localhost' && hostname !== '127.0.0.1',
      'A local hostname cannot be approved for production.',
    );
  }

  assert(Boolean(contentCutoffDate), 'Production indexing requires PUBLIC_CONTENT_CUTOFF_DATE.');
  assert(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail),
    'Production indexing requires a valid PUBLIC_CONTACT_EMAIL (monitored public contact).',
  );
  assert(
    brandApproved,
    'Production indexing requires PUBLIC_BRAND_APPROVED=true after the public brand and hostname are approved in a dated decision record.',
  );
  assert(
    disclosureApproved,
    'Production indexing requires PUBLIC_DISCLOSURE_APPROVED=true after the owner/operator and commercial-relationship disclosure is certified.',
  );
}

if (failures.length) {
  console.error(JSON.stringify({ status: 'fail', mode, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'pass',
  mode,
  siteUrl: parsedSiteUrl?.origin ?? null,
  contentCutoffDate: contentCutoffDate || null,
  contactConfigured: Boolean(contactEmail),
  brandApproved,
  disclosureApproved,
}, null, 2));
