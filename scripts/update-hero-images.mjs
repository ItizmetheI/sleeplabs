/**
 * Updates heroImage fields in mattresses.ts to use self-hosted webp paths.
 * Processes each mattress object block independently to match id → heroImage.
 */
import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MATTRESSES_TS = path.join(__dirname, '..', 'src', 'data', 'mattresses.ts');
const IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'mattresses');

const files = await readdir(IMG_DIR);
const downloadedIds = new Set(
  files.filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', ''))
);

console.log(`Found ${downloadedIds.size} self-hosted webp images`);

let content = await readFile(MATTRESSES_TS, 'utf8');
let updateCount = 0;

for (const id of downloadedIds) {
  const selfHostedPath = `/images/mattresses/${id}.webp`;
  const escapedId = id.replace(/-/g, '\\-');

  // Find the block starting with this id, then find its heroImage and replace if it's an external URL
  // Pattern: id: "the-id" ... heroImage: "anything-external"
  // We use a two-step: locate the id, then within next 2000 chars find and replace heroImage if external

  let updated = false;
  let searchFrom = 0;

  while (true) {
    // Find this id in the content
    const idMatch = new RegExp(`id:\\s*"${escapedId}"`, 'g');
    idMatch.lastIndex = searchFrom;
    const idFound = idMatch.exec(content);
    if (!idFound) break;

    const blockStart = idFound.index;
    const blockEnd = Math.min(blockStart + 2000, content.length);
    const block = content.slice(blockStart, blockEnd);

    // Replace heroImage only if it's an external URL (https://)
    const heroPattern = /(heroImage:\s*")https:\/\/[^"]+(")/;
    if (heroPattern.test(block)) {
      const newBlock = block.replace(heroPattern, `$1${selfHostedPath}$2`);
      content = content.slice(0, blockStart) + newBlock + content.slice(blockEnd);
      updateCount++;
      console.log(`  ✓ heroImage updated: ${id}`);
      updated = true;
      break;
    }

    // heroImage was already self-hosted or not found in this block, try next occurrence
    searchFrom = idFound.index + 1;
  }

  if (!updated) {
    // Check if already self-hosted
    const alreadyOk = new RegExp(`id:\\s*"${escapedId}"[\\s\\S]{0,2000}heroImage:\\s*"/images/`);
    if (alreadyOk.test(content)) {
      console.log(`  ✓ heroImage already self-hosted: ${id}`);
    } else {
      console.log(`  ? heroImage not found for: ${id}`);
    }
  }
}

await writeFile(MATTRESSES_TS, content, 'utf8');
console.log(`\nUpdated ${updateCount} heroImage fields`);
