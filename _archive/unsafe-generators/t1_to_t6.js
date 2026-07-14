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

// TASK 1
let blogSchema = fs.readFileSync('src/data/blogSchema.ts', 'utf8');
blogSchema = blogSchema.replace(/category:\s*'[^;]+;/g, 'category: string;');
blogSchema = blogSchema.replace(/name:\s*'Editorial Team';/, 'name: string;');
blogSchema = blogSchema.replace(/schemaType:\s*'Article'\s*\|\s*'HowTo'\s*\|\s*'FAQPage';/, 'schemaType: string;');
blogSchema = blogSchema.replace(/context:\s*string;/g, 'context?: string;');
blogSchema = blogSchema.replace(/mentionContext:[^;]+;/g, 'mentionContext: string;');
fs.writeFileSync('src/data/blogSchema.ts', blogSchema);

// TASK 2
replaceInFile('src/data/mattresses.ts', [
    {regex: /,\s*"GREENGUARD Gold"/g, replacement: ""},
    {regex: /"GREENGUARD Gold",\s*/g, replacement: ""},
    {regex: /"GREENGUARD Gold"/g, replacement: ""},
    {regex: /CertiPUR-US and GREENGUARD Gold certified — low VOC off-gassing/g, replacement: "CertiPUR-US certified — low VOC, independently tested for harmful chemicals"},
    {regex: /It also off-gasses significantly less than standard memory foam, which is why it earns GREENGUARD Gold certification\./g, replacement: "It also off-gasses less than standard petroleum memory foam due to its open-cell structure."}
]);

// TASK 3
replaceInFile('src/components/FinalPick.tsx', [
    {regex: /Bio-Pur® plant memory foam\. HIVE® zoned support\. 100-night trial\. 20-year warranty\. GREENGUARD Gold certified\./g, replacement: "Bio-Pur® plant memory foam. HIVE® zoned support. 100-night trial. 20-year warranty. CertiPUR-US certified."}
]);

// TASK 4
replaceInFile('src/components/LatestGuides.tsx', [
    {regex: /120 nights tested\. Bio-Pur® foam, HIVE® zoning, 20-year warranty\./g, replacement: "Hands-on tested. Bio-Pur® foam, HIVE® zoning, 20-year warranty."}
]);

// TASK 5
replaceInFile('src/components/Methodology.tsx', [
    {regex: /Every mattress we review is physically tested in our facility\. No manufacturer samples, no affiliate-first ranking\./g, replacement: "Every mattress we review is evaluated hands-on. No manufacturer-supplied units, no affiliate-first ranking."}
]);

// TASK 6
replaceInFile('src/pages/reviews/index.astro', [
    {regex: /Independent, physically tested Amerisleep mattress reviews\. 5 models evaluated over 90–120 nights each\. No paid placements\. Tested by the PureSleep testing team\./g, replacement: "Independent Amerisleep mattress reviews. 5 models hands-on evaluated. Affiliate-disclosed. Tested by the PureSleep Testing Team."}
]);
