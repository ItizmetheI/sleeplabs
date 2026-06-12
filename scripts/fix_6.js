import fs from 'fs';

function replaceInFile(filepath, replacements) {
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    for (let r of replacements) {
        content = content.replace(r.regex, r.replacement);
    }
    fs.writeFileSync(filepath, content);
  } else {
    console.log(`File not found: ${filepath}`);
  }
}

// FIX 1: blogs-generated.json
let blogsJson = fs.readFileSync('src/data/blogs-generated.json', 'utf8');
let blogs = JSON.parse(blogsJson);

for (let blog of blogs) {
  if (blog.slug === 'best-mattress-for-back-pain') {
    let blogStr = JSON.stringify(blog);
    blogStr = blogStr.replace(/violently fights gravity, driving aggressive support straight into your lower lumbar curve to permanently stop morning stiffness/g, "provides firm, supportive resistance that may help reduce mattress-related lower back discomfort for some sleepers");
    blogStr = blogStr.replace(/The AS2 acts practically as a medical brace for your spine/g, "The AS2 has a firmer, more supportive feel that may suit back and stomach sleepers");
    blogStr = blogStr.replace(/shuts it down immediately/g, "may help reduce mattress-related discomfort");
    blogStr = blogStr.replace(/Does the AS2 cure back pain\?/g, "Can the AS2 help with mattress-related back discomfort?");
    blogStr = blogStr.replace(/violently compressing the lumbar discs and generating immense inflammation/g, "can leave some sleepers feeling unsupported or misaligned");
    
    // Internal link rewrite
    let b = JSON.parse(blogStr);
    if (b.internalLinks) {
        for (let link of b.internalLinks) {
            if (link.anchorText && (link.anchorText.includes("medical brace for your spine") || link.anchorText.includes("brace"))) {
                link.anchorText = "Amerisleep AS2 review";
                link.url = "/reviews/amerisleep-as2";
            }
        }
    }
    
    // safe directAnswer / answersSI changes (in case they have it too)
    if (b.directAnswer) {
      b.directAnswer = b.directAnswer.replace(/violently /ig, "").replace(/permanently stop morning stiffness/ig, "reduce mattress-related lower back discomfort").replace(/medical brace/ig, "supportive feel");
    }
    if (b.answersSI) {
      b.answersSI = b.answersSI.replace(/violently /ig, "").replace(/permanently stop morning stiffness/ig, "reduce mattress-related lower back discomfort").replace(/medical brace/ig, "supportive feel");
    }

    Object.assign(blog, b);
  }
  
  if (blog.slug === 'best-mattress-for-stomach-sleepers') {
    let blogStr = JSON.stringify(blog);
    blogStr = blogStr.replace(/violently compresses your lower vertebrae/g, "can leave your lower vertebrae feeling unsupported");
    Object.assign(blog, JSON.parse(blogStr));
  }
}

fs.writeFileSync('src/data/blogs-generated.json', JSON.stringify(blogs, null, 2));
fs.writeFileSync('src/data/blogs-generated.ts', `import type { BlogPost } from './blogSchema';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(blogs, null, 2)};\n`);

// FIX 2: mattresses.ts
replaceInFile('src/data/mattresses.ts', [
    { regex: /,\s*"GREENGUARD Gold"/g, replacement: "" },
    { regex: /"GREENGUARD Gold",\s*/g, replacement: "" },
    { regex: /"GREENGUARD Gold"/g, replacement: "" },
    { regex: /CertiPUR-US and GREENGUARD Gold certified/g, replacement: "CertiPUR-US certified — low VOC, no harmful chemicals" },
    { regex: /It also off-gasses significantly less than standard memory foam, which is why it earns GREENGUARD Gold certification\./g, replacement: "It also off-gasses significantly less than standard memory foam due to its open-cell structure." }
]);

// FIX 3: src/components/FinalPick.tsx
replaceInFile('src/components/FinalPick.tsx', [
    { regex: / GREENGUARD Gold certified\./g, replacement: "" }
]);

// FIX 4: src/components/LatestGuides.tsx
replaceInFile('src/components/LatestGuides.tsx', [
    { regex: /120 nights tested\./g, replacement: "Hands-on tested." }
]);

// FIX 5: src/pages/reviews/index.astro
replaceInFile('src/pages/reviews/index.astro', [
    { regex: /5 models evaluated over 90–120 nights each\. No paid placements\./g, replacement: "5 models evaluated hands-on. Affiliate-disclosed." }
]);

// FIX 6: src/data/blogSchema.ts
let blogSchemaContent = fs.readFileSync('src/data/blogSchema.ts', 'utf8');

blogSchemaContent = blogSchemaContent.replace(/category:\s*'sleep-science'\s*\|\s*'buying-guide'\s*\|\s*'mattress-care'\s*\|\s*'bedroom-design'\s*\|\s*'health-and-sleep'\s*\|\s*'product-comparison'\s*\|\s*'sleep-tips';/g, 'category: string;');
blogSchemaContent = blogSchemaContent.replace(/name:\s*'Editorial Team';/g, 'name: string;');
blogSchemaContent = blogSchemaContent.replace(/schemaType:\s*'Article'\s*\|\s*'HowTo'\s*\|\s*'FAQPage';/g, 'schemaType: string;');
blogSchemaContent = blogSchemaContent.replace(/context:\s*string;/g, 'context?: string;');
blogSchemaContent = blogSchemaContent.replace(/mentionContext:\s*'primary-recommendation'\s*\|\s*'secondary-mention'\s*\|\s*'comparison-mention';/g, 'mentionContext: string;');

fs.writeFileSync('src/data/blogSchema.ts', blogSchemaContent);

console.log('Done!');
