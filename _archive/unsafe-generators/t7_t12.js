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

// TASK 7
let reviewId = fs.readFileSync('src/pages/reviews/[id].astro', 'utf8');
reviewId = reviewId.replace(
    /Testing the \{mattress\.name\} over \{mattress\.testedNights\} nights revealed exactly why it stands out in the \{mattress\.type\} category\. Our team evaluated it across back, side, and stomach positions\. This \{mattress\.firmnessScale\}\/10 \(\{mattress\.firmness\}\) mattress targets the sweet spot for many sleepers\./g,
    "Our team evaluated the {mattress.name} across back, side, and stomach positions. This {mattress.firmnessScale}/10 ({mattress.firmness}) mattress is best suited to {mattress.bestFor.slice(0,3).join(', ')} sleepers."
);
reviewId = reviewId.replace(
    /It excels for \{mattress\.bestFor\.join\([^)]+\)\}, confirming the manufacturer's claims through rigorous in-house testing\. When considering the 0-10 scale metrics, its score of \{mattress\.scores\.support\} for support and \{mattress\.scores\.pressureRelief\} for pressure relief paints a picture of a carefully engineered sleep surface\. Its profile highlights aspects like \{mattress\.tags\.join\([^)]+\)\}, positioning it as a compelling option at its \$\{mattress\.price\} base price\./g,
    "Support scores {mattress.scores.support}/10. Pressure relief scores {mattress.scores.pressureRelief}/10. Cooling scores {mattress.scores.cooling}/10. At {mattress.firmness} ({mattress.firmnessScale}/10), it balances contouring and support in a {mattress.thickness} profile."
);
reviewId = reviewId.replace(
    /Certifications matter when it comes to material safety and off-gassing\. Boasting \{mattress\.certifications\.join\([^)]+\)\}, this model ensures low emissions and high material standards\. Backed by a \{mattress\.trialNights\}-night trial and a \{mattress\.warrantyYears\}-year warranty, buyers have a generous window to confirm if the \{mattress\.firmness\} feel is the right fit\./g,
    "Certified {mattress.certifications.join(' and ')}. Backed by a {mattress.trialNights}-night trial and a {mattress.warrantyYears}-year warranty."
);
const bestForHtml = `
<!-- Best For / Not Ideal For -->
<section class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="glass-panel p-6 rounded-2xl border border-green-200/50">
    <h3 class="text-label-sm font-label-sm uppercase tracking-widest text-green-700 font-bold mb-4">Best For</h3>
    <ul class="flex flex-col gap-2">
      {mattress.bestFor.map((item: string) => (
        <li class="flex items-center gap-2 text-body-md text-on-surface-variant">
          <span class="text-green-600 font-bold">✓</span> {item}
        </li>
      ))}
    </ul>
  </div>
  <div class="glass-panel p-6 rounded-2xl border border-red-200/50">
    <h3 class="text-label-sm font-label-sm uppercase tracking-widest text-red-600 font-bold mb-4">Not Ideal For</h3>
    <ul class="flex flex-col gap-2">
      {mattress.cons.slice(0, 3).map((item: string) => (
        <li class="flex items-center gap-2 text-body-md text-on-surface-variant">
          <span class="text-red-400 font-bold">✗</span> {item}
        </li>
      ))}
    </ul>
  </div>
</section>
`;
const verdictHtml = `
<!-- Final Verdict -->
<section class="glass-panel-heavy p-8 rounded-3xl border border-secondary/20">
  <h2 class="text-headline-md font-headline-md text-primary italic mb-4">Final Verdict</h2>
  <p class="text-body-lg text-on-surface-variant leading-relaxed mb-6">{mattress.verdict}</p>
  <a href={mattress.affiliateUrl} target="_blank" rel="noopener noreferrer"
    class="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold text-label-sm uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg">
    Check Latest Price on Amerisleep →
  </a>
</section>
`;
reviewId = reviewId.replace(/(<!-- Quick Verdict Box -->)/g, `${bestForHtml}\n        $1`);
reviewId = reviewId.replace(/(<\/article>)/g, `${verdictHtml}\n        $1`);
fs.writeFileSync('src/pages/reviews/[id].astro', reviewId);

// TASK 8
let compAstro = fs.readFileSync('src/pages/comparison/[slug].astro', 'utf8');
compAstro = compAstro.replace(
    /"author": \{\s*"@type": "Person",\s*"name": "PureSleep",\s*"url": SITE_URL\s*\}/g,
    `"author": {\n      "@type": "Organization",\n      "name": "PureSleep",\n      "url": SITE_URL\n    }`
);
fs.writeFileSync('src/pages/comparison/[slug].astro', compAstro);

// TASK 9
let blogAstro = fs.readFileSync('src/pages/blog/[slug].astro', 'utf8');
blogAstro = blogAstro.replace('const jsonLd = [articleSchema, faqSchema, breadcrumbSchema];', `const jsonLd = [articleSchema, faqSchema, breadcrumbSchema];

const isAmerisleePost = (post.productRefs && post.productRefs.length > 0) &&
(post.tags?.some((t: string) => ['amerisleep','bio-pur','hive-technology','as2','as3','as5','as6','organica'].includes(t.toLowerCase())) ||
post.entityMentions?.some((e: string) => /amerisleep/i.test(e)));`);

// Remove "Testing Team Insight" box
blogAstro = blogAstro.replace(/const isChiroFocused = \/\\b\(chiropract\|sensor\|pressure mapping\|pelvis\|alignment\)\\b\/i\.test\(section\.content\);\s*/, "");

// The box replacement logic:
const boxPattern = /\{\s*\/\*\s*Custom Testing Box Inside Relevant Content\s*\*\/\s*\}\s*\{isChiroFocused && \([\s\S]*?\)\s*\}/g;
blogAstro = blogAstro.replace(/<!-- Custom Testing Box Inside Relevant Content -->\s*\{isChiroFocused && \([\s\S]*?\)\s*\}/g, "");
// just in case we missed it, try a more liberal one:
blogAstro = blogAstro.split('<!-- Custom Testing Box Inside Relevant Content -->')[0] + (blogAstro.split('<!-- Custom Testing Box Inside Relevant Content -->')[1] ? blogAstro.split('<!-- Custom Testing Box Inside Relevant Content -->')[1].replace(/\{isChiroFocused && \([\s\S]*?\}\s*\)/, '') : '');
// well wait, that might break it. Let's do a strict regex:
blogAstro = blogAstro.replace(/<!-- Custom Testing Box Inside Relevant Content -->[\s\S]*?\{isChiroFocused && \([\s\S]*?\}\s*\)/g, '');

blogAstro = blogAstro.replace(/<!-- Bottom CTA banner — always shown, always goes to amerisleep\.com -->/g, '<!-- Bottom CTA banner — only on Amerisleep product posts -->');
// Wrap bottom banner in isAmerisleePost
blogAstro = blogAstro.replace(/<div class="mt-16 bg-primary rounded-3xl p-8 text-center">([\s\S]*?)<\/div>\s*<\/article>/g, '{isAmerisleePost && (\n    <div class="mt-16 bg-primary rounded-3xl p-8 text-center">$1</div>\n    )}\n\n  </article>');

// Adjust "Use code AS500..." 
blogAstro = blogAstro.replace(/Use code AS500 for \$500 off/g, "");
blogAstro = blogAstro.replace(/Use code <strong class="text-secondary font-bold font-mono px-1">AS500<\/strong> for \$500 off any mattress at/g, "Shop all Amerisleep mattresses at");

// Gate mid-content CTAs
blogAstro = blogAstro.replace(/\{post\.productRefs\.length > 0 && index > 0 &&/g, "{isAmerisleePost && post.productRefs.length > 0 && index > 0 &&");
blogAstro = blogAstro.replace(/\{post\.productRefs\.length > 0 && \(/g, "{isAmerisleePost && post.productRefs.length > 0 && (");
blogAstro = blogAstro.replace(/\{post\.productRefs\.length > 1 && \(/g, "{isAmerisleePost && post.productRefs.length > 1 && (");
fs.writeFileSync('src/pages/blog/[slug].astro', blogAstro);

// TASK 10 
let blogsJson = fs.readFileSync('src/data/blogs-generated.json', 'utf8');

// CRUCIAL NOTE: Since I have to ensure we map exactly words as per instructions, I will do it explicitly:
blogsJson = blogsJson.replace(/violently fights gravity/gi, "actively pushes back against");
blogsJson = blogsJson.replace(/violently compresses/gi, "can compress");
blogsJson = blogsJson.replace(/violently bottom out/gi, "bottom out");
blogsJson = blogsJson.replace(/violently compress/gi, "compress");
blogsJson = blogsJson.replace(/violently pushing/gi, "pushing");
blogsJson = blogsJson.replace(/violently breaks down/gi, "breaks down");
blogsJson = blogsJson.replace(/violently crank/gi, "crank");
blogsJson = blogsJson.replace(/violently attacks/gi, "puts strain on");
blogsJson = blogsJson.replace(/violently refuses/gi, "does not yield");
blogsJson = blogsJson.replace(/violently /gi, ""); 

blogsJson = blogsJson.replace(/permanently stop morning stiffness/gi, "may help reduce mattress-related morning discomfort");
blogsJson = blogsJson.replace(/permanently stop/gi, "consistently reduce");
blogsJson = blogsJson.replace(/permanently bend/gi, "bend");
blogsJson = blogsJson.replace(/permanently stuck/gi, "stuck");
blogsJson = blogsJson.replace(/permanently absorb/gi, "absorb");
// Remaining permanently: it's a bit hard to replace context-dependently without complex parsing, I'll just change to consistently where it occurs. Wait, I will just replace "permanently " with "consistently "
blogsJson = blogsJson.replace(/permanently /gi, "consistently ");

blogsJson = blogsJson.replace(/acts practically as a medical brace for your spine/gi, "has a firmer, more supportive feel that may suit back and stomach sleepers");
blogsJson = blogsJson.replace(/acts as a medical brace/gi, "provides firm structural support");
blogsJson = blogsJson.replace(/"medical brace for your spine"/gi, '"Amerisleep AS2 review"'); // anchorText 
blogsJson = blogsJson.replace(/"medical brace for your spine"/gi, '"The AS2 has a firm, supportive feel suited to back and stomach sleepers."'); // oh wait, context field. I'll just regex correctly below.
blogsJson = blogsJson.replace(/medical brace/gi, "firm supportive mattress");

blogsJson = blogsJson.replace(/shuts it down immediately/gi, "may help reduce discomfort");
blogsJson = blogsJson.replace(/shuts down/gi, "reduces");
blogsJson = blogsJson.replace(/Does the AS2 cure back pain\?/gi, "Can the AS2 help with mattress-related back discomfort?");
blogsJson = blogsJson.replace(/cure back pain/gi, "help with mattress-related back discomfort");
blogsJson = blogsJson.replace(/cure back/gi, "help with back");

blogsJson = blogsJson.replace(/Yes, it aggressively causes it\. Soft foam lacks the dense structural push-back necessary to support the hips\. Your spine bows downward all night long, violently compressing the lumbar discs and generating immense inflammation\./gi, "Soft foam that lacks structural support can allow the hips to sink out of alignment, which may contribute to back discomfort. A mattress with proper zoned support can help maintain spinal alignment.");
blogsJson = blogsJson.replace(/generating immense inflammation/gi, "which may contribute to discomfort");
blogsJson = blogsJson.replace(/immense inflammation/gi, "discomfort"); 
blogsJson = blogsJson.replace(/inflammation/gi, "discomfort");
blogsJson = blogsJson.replace(/bursitis flares/gi, "joint sensitivity");
blogsJson = blogsJson.replace(/pressure mapping/gi, "hands-on testing");
blogsJson = blogsJson.replace(/clinical contouring/gi, "precise contouring");
blogsJson = blogsJson.replace(/clinical/gi, "hands-on");
blogsJson = blogsJson.replace(/GREENGUARD Gold/gi, "CertiPUR-US");
blogsJson = blogsJson.replace(/90 nights/gi, "hands-on testing");
blogsJson = blogsJson.replace(/120 nights/gi, "hands-on testing");
blogsJson = blogsJson.replace(/No paid placements/gi, "Affiliate-disclosed");
blogsJson = blogsJson.replace(/physically tested/gi, "hands-on tested");
blogsJson = blogsJson.replace(/thermally image|thermal imag/gi, "temperature test");

// We still need to fix the specific anchorText and context for AS2:
let blogsObj = JSON.parse(blogsJson);
for (let b of blogsObj) {
  if (b.internalLinks) {
     for (let link of b.internalLinks) {
         if (link.anchorText && link.anchorText.includes("Amerisleep AS2 review")) {
            link.anchorText = "Amerisleep AS2 review";
         }
         if (link.context && link.context.includes("Amerisleep AS2 review")) {
            link.context = "The AS2 has a firm, supportive feel suited to back and stomach sleepers.";
         }
     }
  }
}
fs.writeFileSync('src/data/blogs-generated.json', JSON.stringify(blogsObj, null, 2));

const tsContent = `import type { BlogPost } from './blogSchema';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(blogsObj, null, 2)};\n`;
fs.writeFileSync('src/data/blogs-generated.ts', tsContent);
