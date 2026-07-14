const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'PURESLEEP_IMAGES.md');
const jsonPath = path.join(__dirname, 'src/data/blogs-generated.json');

const mdContent = fs.readFileSync(mdPath, 'utf8');
const blogs = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Parse table
const lines = mdContent.split('\n');
const slugToImg = {};

for (const line of lines) {
  const parts = line.split('\t').map(p => p.trim());
  if (parts.length >= 3) {
    const slug = parts[1];
    const img = parts[2];
    if (slug && img && slug !== 'slug') {
      slugToImg[slug] = img;
    }
  }
}


let updated = 0;
for (const blog of blogs) {
  if (slugToImg[blog.slug]) {
    blog.ogImage = slugToImg[blog.slug];
    updated++;
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(blogs, null, 2));
console.log(`Updated ${updated} blog post images.`);
