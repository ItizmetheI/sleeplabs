import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_SITE_URL = 'https://finalize.ahmedbarkat1067.workers.dev';
const sourceSiteUrls = [
  DEFAULT_SITE_URL,
  'https://production-domain-not-set.example',
  'https://puresleep.com',
];
const configuredUrl = new URL(process.env.SITE_URL || DEFAULT_SITE_URL);
if (!['http:', 'https:'].includes(configuredUrl.protocol) || configuredUrl.pathname !== '/' || configuredUrl.search || configuredUrl.hash) {
  throw new Error('SITE_URL must be an http(s) origin without a path, query, or hash.');
}

const siteUrl = configuredUrl.origin;
const outputRoot = path.resolve(process.argv[2] || 'dist');
const llmsDirectory = path.join(outputRoot, 'llms');
const llmsFiles = (await readdir(llmsDirectory, { withFileTypes: true }))
  .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
  .map(entry => path.join(llmsDirectory, entry.name));
const files = [
  path.join(outputRoot, 'llms.txt'),
  path.join(outputRoot, 'llms-full.txt'),
  ...llmsFiles,
];

let changed = 0;
for (const file of files) {
  const input = await readFile(file, 'utf8');
  let output = sourceSiteUrls.reduce(
    (content, sourceSiteUrl) => content.replaceAll(sourceSiteUrl, siteUrl),
    input,
  );

  if (output !== input) {
    await writeFile(file, output, 'utf8');
    changed += 1;
  }
}

console.log(`Synced ${files.length} LLM files to ${siteUrl}; updated ${changed}.`);
