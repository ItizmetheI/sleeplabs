import fs from 'fs';
import path from 'path';

function replaceInFile(filepath, oldStrOrRegex, newStr) {
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(oldStrOrRegex, newStr);
    fs.writeFileSync(filepath, content);
  } else {
    console.warn(`File not found: ${filepath}`);
  }
}

// StatsRow.tsx
replaceInFile('src/components/StatsRow.tsx', '{ value: "120", label: "Nights Tested Per Mattress" },', '{ value: "7", label: "Metrics Scored Per Mattress" },');
replaceInFile('src/components/StatsRow.tsx', '{ value: "1", label: "Chiropractor on Staff" },', '{ value: "100", label: "Night Trial on All Models" },');
replaceInFile('src/components/StatsRow.tsx', '{ value: "15,000+", label: "Verified Owner Reviews" },', '{ value: "20", label: "Year Warranty — Industry Leading" },');

// Hero.tsx
replaceInFile('src/components/Hero.tsx', 'INDEPENDENT · CHIROPRACTOR-REVIEWED · PHYSICALLY TESTED', 'INDEPENDENT · HANDS-ON TESTED · EDITORIALLY INDEPENDENT');
replaceInFile('src/components/Hero.tsx', 'Chiropractor-reviewed', 'Hands-on tested');

// Methodology.tsx
replaceInFile('src/components/Methodology.tsx', 'Our on-staff chiropractor evaluates spinal support for side, back, and stomach sleepers.', 'Our team evaluates support, pressure relief, cooling, and motion isolation across multiple sleep positions and body types.');
replaceInFile('src/components/Methodology.tsx', '{ stat: "120h", title: "Testing Per Mattress", desc: "Minimum sleep trial before any review is published." },', '{ stat: "7", title: "Scoring Criteria", desc: "Support, Pressure Relief, Cooling, Motion Isolation, Edge Support, Responsiveness, and Value — each scored 0–10." },');
replaceInFile('src/components/Methodology.tsx', '{ stat: "27", title: "Test Criteria", desc: "From firmness and edge support to off-gassing and durability." },', '{ stat: "5", title: "Models Reviewed", desc: "AS2, AS3, AS5, AS6 Black Series, and Organica — the full Amerisleep lineup." },');
replaceInFile('src/components/Methodology.tsx', '{ stat: "9", title: "Spinal Pressure Zones", desc: "Our chiropractor maps 9 pressure points per sleep position on every mattress tested." },', '{ stat: "100", title: "Night Trial", desc: "All Amerisleep models carry a 100-night home trial with free returns." },');

// reviews/[id].astro
replaceInFile('src/pages/reviews/[id].astro', 'Dr. Mitchell focused specifically on its performance across various sleeper types, prioritizing spinal alignment and pressure points.', 'Our team evaluated it across back, side, and stomach positions.');

let reviewIdMatch1 = `"author": {
      "@type": "Person",
      "name": mattress.reviewer.name,
      "jobTitle": mattress.reviewer.role,
      "description": mattress.reviewer.credentials,
      "sameAs": mattress.reviewer.sameAs
    },
    "reviewedBy": {
      "@type": "Person",
      "name": mattress.reviewer.name
    },`;
let reviewIdRepl1 = `"author": {
      "@type": "Organization",
      "name": "PureSleep",
      "url": SITE_URL
    },
    "reviewedBy": {
      "@type": "Organization",
      "name": "PureSleep Testing Team"
    },`;
replaceInFile('src/pages/reviews/[id].astro', reviewIdMatch1, reviewIdRepl1);

replaceInFile('src/pages/reviews/[id].astro', 
  `<span><strong class="text-on-background">Tested By:</strong> {mattress.reviewer.name}, {mattress.reviewer.role}</span>`,
  `<span><strong class="text-on-background">Reviewed By:</strong> PureSleep Testing Team</span>`);
replaceInFile('src/pages/reviews/[id].astro', 
  `<span><strong class="text-on-background">Reviewed By:</strong> {mattress.reviewer.name}, {mattress.reviewer.role}</span>`,
  `<span><strong class="text-on-background">Reviewed By:</strong> PureSleep Testing Team</span>`);

// comparison/[slug].astro
replaceInFile('src/pages/comparison/[slug].astro', 
  /"author":\s*\{\s*"@type":\s*"Person",\s*"name":\s*mattressA\.reviewer\.name.*?"url":.*?`\$\{SITE_URL\}\/methodology\/`\s*\},/s,
  `"author": {\n      "@type": "Organization",\n      "name": "PureSleep",\n      "url": SITE_URL\n    },\n    "reviewedBy": {\n      "@type": "Organization",\n      "name": "PureSleep Testing Team"\n    },`
);
replaceInFile('src/pages/comparison/[slug].astro', '{mattressA.reviewer.name}', 'PureSleep Testing Team');


// mattresses.ts
let mattressesMatchStr = `export const reviewer_drsmith: Reviewer = {
  name: "Dr. Sarah Mitchell",
  role: "Staff Chiropractor & Lead Reviewer",
  credentials: "Doctor of Chiropractic, licensed in 12 states. 14 years clinical practice.",
  sameAs: ["https://puresleep.com/methodology/"]
};`;
let mattressesReplStr = `export const reviewer_editorial: Reviewer = {
  name: "PureSleep Testing Team",
  role: "Sleep Product Testers",
  credentials: "Independent sleep product testing team.",
  sameAs: ["https://puresleep.com/methodology/"]
};

// Alias for backwards compatibility with any remaining imports
export const reviewer_drsmith = reviewer_editorial;`;
replaceInFile('src/data/mattresses.ts', mattressesMatchStr, mattressesReplStr);
replaceInFile('src/data/mattresses.ts', /testedNights:\s*120,/g, 'testedNights: 30,');
replaceInFile('src/data/mattresses.ts', /testedNights:\s*90,/g, 'testedNights: 30,');
replaceInFile('src/data/mattresses.ts', 'certifications: ["CertiPUR-US", "GREENGUARD Gold"],', 'certifications: ["CertiPUR-US"],');
replaceInFile('src/data/mattresses.ts', /reviewer:\s*reviewer_drsmith,/g, 'reviewer: reviewer_editorial,');

// blogSchema.ts
let schemaOld = `  reviewedBy: {
    name: 'Dr. Sarah Mitchell';
    role: 'Staff Chiropractor & Lead Reviewer';
    credentials: 'Doctor of Chiropractic, licensed in 12 states';
    url: '/methodology/';
  } | null;`;
let schemaNew = `  reviewedBy: {
    name: string;
    role: string;
    url: string;
  } | null;`;
replaceInFile('src/data/blogSchema.ts', schemaOld, schemaNew);

// blogs-generated.json
if (fs.existsSync('src/data/blogs-generated.json')) {
  let text = fs.readFileSync('src/data/blogs-generated.json', 'utf8');
  text = text.replace(/the AS2 deploys the exact zoned structural tension chiropractors recommend\./gi, 'the AS2 has a firmer, more supportive feel that may suit back and stomach sleepers.');
  fs.writeFileSync('src/data/blogs-generated.json', text);
  fs.writeFileSync('src/data/blogs-generated.ts', `import type { BlogPost } from './blogSchema';\n\nexport const blogPosts: BlogPost[] = ${text};\n`);
}

console.log("All replacements finished");
