import fs from 'node:fs/promises';
import path from 'node:path';

const JSON_DB_PATH = path.join(process.cwd(), 'src/data/blogs-generated.json');

async function main() {
  try {
    const data = await fs.readFile(JSON_DB_PATH, 'utf8');
    const posts = JSON.parse(data);
    console.log(`CURRENT_COUNT_TOTAL=${posts.length}`);
    // Output all titles and dates
    console.log("Titles:");
    posts.forEach((p: any, idx: number) => {
      console.log(`[${idx+1}] ${p.title} (${p.datePublished})`);
    });
  } catch (err: any) {
    console.error("Error reading JSON file:", err.message);
  }
}

main();
