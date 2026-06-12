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

const reps = [
  { regex: /Chiropractor-reviewed/gi, replacement: "Editorially Independent" },
  { regex: /Chiropractor-scored for spinal support\./gi, replacement: "Tested by the PureSleep testing team." },
  { regex: /Chiropractor-scored\./gi, replacement: "Tested by the PureSleep testing team." },
  { regex: /Dr\. Sarah Mitchell, Lead Chiropractor/gi, replacement: "PureSleep Testing Team" },
  { regex: /Dr\. Sarah Mitchell, Staff Chiropractor & Lead Reviewer/gi, replacement: "PureSleep Testing Team" },
  { regex: /Physically tested by our in-house chiropractor./gi, replacement: "Tested by the PureSleep testing team." },
  { regex: /role: "Staff Chiropractor & Lead Reviewer"/gi, replacement: 'role: "Sleep Product Testers"' },
  { regex: /credentials: "Doctor of Chiropractic, licensed in 12 states"/gi, replacement: 'credentials: "Independent sleep product testing team"' },
  { regex: /Chiropractor-reviewed where applicable\./gi, replacement: "" },
  { regex: /<!-- Custom Chiropractor's Box Inside Relevant Content -->/gi, replacement: "<!-- Custom Testing Box Inside Relevant Content -->" }
];

const paths = [
    'src/pages/index.astro', 
    'src/pages/reviews/index.astro',
    'src/pages/comparison/index.astro',
    'src/pages/blog/[...page].astro',
    'src/pages/blog/[slug].astro', // For the custom chiro box
    'src/pages/guides/index.astro',
    'src/pages/api/generate.ts'
];

for (let p of paths) {
    replaceInFile(p, reps);
}

console.log('Done!');
