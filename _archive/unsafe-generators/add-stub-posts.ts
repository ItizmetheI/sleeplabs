import fs from 'fs';
import path from 'path';

const postsPath = path.join(process.cwd(), 'src/data/blogs-generated.json');
let existing = [];
if (fs.existsSync(postsPath)) {
  existing = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
}

const requiredTags = [
  'back-sleepers', 'stomach-sleepers', 'combination-sleepers', 'memory-foam',
  'side-sleepers', 'hip-pain', 'cooling', 'couples'
];

const requiredCategories = [
  'sleep-science', 'buying-guides', 'mattress-care', 'bedroom-design'
];

function createStub(id, title, tag, category) {
  return {
    "id": id,
    "slug": id,
    "category": category,
    "title": title,
    "metaTitle": title,
    "metaDescription": `A comprehensive guide about ${title}.`,
    "author": {
      "name": "Alex Sleep",
      "url": "https://puresleep.com/authors/alex"
    },
    "datePublished": "2026-05-28",
    "dateModified": "2026-05-28",
    "readTimeMinutes": 5,
    "schemaType": "Article",
    "canonicalUrl": `https://puresleep.com/blog/${id}`,
    "ogImage": "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=1200&q=80",
    "ogTitle": title,
    "ogDescription": `A comprehensive guide about ¹${title}.`,
    "directAnswer": `Quick answer for ${title}.`,
    "excerpt": `Learn everything you need to know about ${title.toLowerCase()} in our extensive guide.`,
    "tags": [tag.replace(/-/g, ' ')],
    "wordCountTarget": 1000,
    "sections": [
      {
        "heading": `Understanding ${title}`,
        "headingLevel": 2,
        "content": `Lorem ipsum dolor sit amet. This is a placeholder for ${title} to ensure the category and tag pages are not empty.`,
        "hasTable": false,
        "hasBulletList": false
      }
    ],
    "faqSchema": [],
    "productRefs": [],
    "faqs": [],
    "internalLinks": [],
    "entityMentions": [],
    "citableFacts": []
  };
}

let addedCount = 0;

requiredTags.forEach(tag => {
  // Add a post for each required tag
  const title = `The Ultimate Guide to ${tag.replace(/-/g, ' ')}`;
  const id = `stub-tag-${tag}`;
  if (!existing.some(p => p.id === id)) {
    existing.push(createStub(id, title, tag, requiredCategories[0]));
    addedCount++;
  }
});

requiredCategories.forEach(cat => {
  // Add a post for each required category
  const title = `Essential ${cat.replace(/-/g, ' ')} Tips`;
  const id = `stub-cat-${cat}`;
  if (!existing.some(p => p.id === id)) {
    existing.push(createStub(id, title, requiredTags[0], cat));
    addedCount++;
  }
});

fs.writeFileSync(postsPath, JSON.stringify(existing, null, 2));
console.log(`Added ${addedCount} stub posts to fill out categories and tags.`);
