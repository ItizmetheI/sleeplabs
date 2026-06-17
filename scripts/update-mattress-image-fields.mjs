/**
 * Updates image and heroImage fields in mattresses.ts to use self-hosted webp paths.
 * Run: node scripts/update-mattress-image-fields.mjs
 */
import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MATTRESSES_TS = path.join(__dirname, '..', 'src', 'data', 'mattresses.ts');
const IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'mattresses');

// Get all downloaded webp files
const files = await readdir(IMG_DIR);
const downloadedIds = new Set(
  files
    .filter(f => f.endsWith('.webp'))
    .map(f => f.replace('.webp', ''))
);

console.log(`Found ${downloadedIds.size} self-hosted webp images`);

let content = await readFile(MATTRESSES_TS, 'utf8');
let updateCount = 0;

// For each downloaded id, replace the image and heroImage fields
for (const id of downloadedIds) {
  const selfHostedPath = `/images/mattresses/${id}.webp`;

  // Match the entire mattress object block containing this id and update its image fields
  // Strategy: find image: "..." lines within the context where this id appears

  // We'll do a targeted replacement: find the id, then replace the next image: and heroImage: within the same object
  const idPattern = new RegExp(`(id:\\s*"${id.replace(/-/g, '\\-')}"[\\s\\S]*?)(image:\\s*")([^"]+)(")([\s\S]*?)(heroImage:\\s*")([^"]+)(")`, '');

  if (idPattern.test(content)) {
    const before = content;
    content = content.replace(idPattern, (match, pre, imgPre, _imgUrl, imgClose, mid, heroPre, _heroUrl, heroClose) => {
      return `${pre}${imgPre}${selfHostedPath}${imgClose}${mid}${heroPre}${selfHostedPath}${heroClose}`;
    });
    if (content !== before) {
      updateCount++;
      console.log(`  ✓ Updated: ${id}`);
    }
  } else {
    // Try just updating image: without heroImage (some objects may not have heroImage)
    const imgOnlyPattern = new RegExp(`(id:\\s*"${id.replace(/-/g, '\\-')}"[\\s\\S]*?)(image:\\s*")([^"]+)(")`, '');
    if (imgOnlyPattern.test(content)) {
      const before = content;
      content = content.replace(imgOnlyPattern, (match, pre, imgPre, _imgUrl, imgClose) => {
        return `${pre}${imgPre}${selfHostedPath}${imgClose}`;
      });
      if (content !== before) {
        updateCount++;
        console.log(`  ✓ Updated (image only): ${id}`);
      }
    } else {
      console.log(`  ? Not found in mattresses.ts: ${id}`);
    }
  }
}

await writeFile(MATTRESSES_TS, content, 'utf8');
console.log(`\nUpdated ${updateCount} mattress image fields`);
