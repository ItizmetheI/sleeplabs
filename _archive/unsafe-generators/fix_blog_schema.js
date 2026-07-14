import fs from 'fs';

let blogs = JSON.parse(fs.readFileSync('src/data/blogs-generated.json', 'utf8'));

// The valid categories are: 'sleep-science' | 'buying-guide' | 'mattress-care' | 'bedroom-design' | 'health-and-sleep' | 'product-comparison' | 'sleep-tips'
const categoryMap = {
  "Buying Guide": "buying-guide",
  "Buying Guides": "buying-guide",
  "Sleep Science": "sleep-science",
  "Mattress Care": "mattress-care",
  "Pain & Health": "health-and-sleep",
  "Accessories": "buying-guide", 
  "Comparisons": "product-comparison",
  "Product Comparison": "product-comparison"
};

for (let b of blogs) {
  if (categoryMap[b.category]) {
    b.category = categoryMap[b.category];
  } else if (b.category.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-') !== b.category) {
      b.category = b.category.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
  }

  if (b.author) {
    b.author.name = "Editorial Team";
  }

  if (b.schemaType === "BlogPosting") {
    b.schemaType = "Article";
  }

  if (b.reviewedBy) {
    delete b.reviewedBy.credentials;
  }

  if (b.internalLinks) {
    for (let link of b.internalLinks) {
      if (!link.context) {
         link.context = "Further reading suggestion";
      }
    }
  }

  if (b.productRefs) {
      for (let req of b.productRefs) {
          if (!req.mentionContext || !['primary-recommendation', 'secondary-mention', 'comparison-mention'].includes(req.mentionContext)) {
              req.mentionContext = "primary-recommendation";
          }
      }
  }
}

fs.writeFileSync('src/data/blogs-generated.json', JSON.stringify(blogs, null, 2));

const tsContent = `import type { BlogPost } from './blogSchema';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(blogs, null, 2)};\n`;
fs.writeFileSync('src/data/blogs-generated.ts', tsContent);

console.log('Fixed blogs-generated schema compliance');
