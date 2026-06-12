import fs from 'fs';

function replaceInFile(filepath, replacements) {
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    for (let r of replacements) {
        content = content.replace(r.regex, r.replacement);
    }
    fs.writeFileSync(filepath, content);
  }
}

// 1. blogs-generated.json
let blogs = JSON.parse(fs.readFileSync('src/data/blogs-generated.json', 'utf8'));

for (let b of blogs) {
   if (b.reviewedBy) {
       b.reviewedBy.name = "PureSleep Testing Team";
       b.reviewedBy.role = "Sleep Product Testers";
   }
}
fs.writeFileSync('src/data/blogs-generated.json', JSON.stringify(blogs, null, 2));

const tsContent = `import type { BlogPost } from './blogSchema';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(blogs, null, 2)};\n`;
fs.writeFileSync('src/data/blogs-generated.ts', tsContent);

// 2. src/data/mattresses.ts
replaceInFile('src/data/mattresses.ts', [
  { regex: /Mapped by our chiropractor/gi, replacement: "Mapped by our testing team" },
  { regex: /Our chiropractor rated it/gi, replacement: "Our testing team rated it" },
]);

// 3. src/data/blogSchema.ts
replaceInFile('src/data/blogSchema.ts', [
    { regex: /chiropractor-backed guidance/gi, replacement: "expert-backed guidance" }
]);

// 4. src/components/UseCases.tsx
replaceInFile('src/components/UseCases.tsx', [
    { regex: /Chiropractor picks\./g, replacement: "Testing team picks." }
]);

console.log('Removed all chiropractor mentions');
