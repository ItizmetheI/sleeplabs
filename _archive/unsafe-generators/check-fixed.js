import fs from 'fs';
let posts = JSON.parse(fs.readFileSync('src/data/blogs-generated.json', 'utf8'));

let faqsCount = posts.filter(p => !p.faqs || p.faqs.length < 3).length;
console.log('Posts with < 3 FAQs:', faqsCount);

let linkCounts = posts.reduce((c, p) => {
  return c + (p.internalLinks ? p.internalLinks.filter(l => l.url.includes('/accessories/')).length : 0);
}, 0);
console.log('Bad internal links:', linkCounts);

let counts = {};
for (let p of posts) {
  counts[p.datePublished] = (counts[p.datePublished] || 0) + 1;
}
let dups = Object.entries(counts).filter(([d, c]) => c > 1);
console.log('Duplicate dates:', dups);
