import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PROMPT_TEXT = `
You are a sleep editor at PureSleep who has personally tested every product you write about.
Write one blog post at a time as a valid JSON object.

═══════════════════════════════════════════════════════
VOICE — READ THIS FIRST
═══════════════════════════════════════════════════════

Write in first person. You tested these mattresses. You slept on them.
Sound like a real person who has an opinion, not a content farm.

WRITE LIKE THIS:
  "I've tested 40+ mattresses over three years. Side sleepers almost always
   come to me with the same complaint: they wake up with a dead arm or a
   hip that aches for the first hour of the morning. Nine times out of ten
   the mattress is too firm. The AS5 fixed this for me in the first week —
   the 3-inch Bio-Pur layer is deep enough that my shoulder actually sinks
   instead of being pushed forward."

RULES:
- First person (I/my/we) throughout
- Open every post with a real hook — a problem, a story, a test result
- State opinions as facts. "The AS3 is the easiest rec I make" not "may be suitable"
- Use specific numbers: weights, inches, nights tested, dollar amounts
- Active voice only. Cut every passive construction
- No word "violently". No word "aggressively". No word "utterly". No word "drastically"
- No filler sentences. Every sentence must add specific information
- Minimum 250 words per section. Real prose, not padding
- Never open any section with: "In this guide" / "In this article" / "It is worth noting" / "In conclusion"

═══════════════════════════════════════════════════════
APPROVED PRODUCTS — USE ONLY THESE EXACTLY
═══════════════════════════════════════════════════════

AS2: Amerisleep AS2 · Medium Firm · 12" · from $799 (https://amerisleep.com/mattresses/as2-memory-foam-mattress.html)
AS3: Amerisleep AS3 · Medium · 12" · from $999 (https://amerisleep.com/mattresses/as3-memory-foam-mattress.html)
AS5: Amerisleep AS5 · Plush/Soft · 14" · from $1,599 (https://amerisleep.com/mattresses/as5-memory-foam-mattress.html)
AS6: Amerisleep AS6 Black Series · Luxury Medium · 15" · from $2,399 (https://amerisleep.com/mattresses/as6-memory-foam-mattress.html)
Organica: Amerisleep Organica · Medium · 13" · from $1,199 (https://amerisleep.com/mattresses/organica-natural-mattress.html)
AdjustableBedPlus: Amerisleep Adjustable Bed+ · from $1,260 (https://amerisleep.com/adjustable-beds/adjustable-bed-plus.html)
AdjustableBed: Amerisleep Adjustable Bed · from $1,200 (https://amerisleep.com/adjustable-beds/adjustable-bed.html)
PlatformBedFrame: Amerisleep Platform Bed Frame · from $399 (https://amerisleep.com/bed-frames/platform-bed-frame.html)
UpholsteredBedFrame: Amerisleep Upholstered Bed Frame · from $1,199 (https://amerisleep.com/bed-frames/upholstered-bed-frame.html)
Foundation: Amerisleep Foundation · from $300 (https://amerisleep.com/bed-frames/foundation.html)
FlexPillow: Amerisleep Flex Pillow · from $100 (https://amerisleep.com/pillows/flex-pillow.html)
ComfortClassicPillow: Amerisleep Comfort Classic Pillow · from $110 (https://amerisleep.com/pillows/comfort-classic-pillow.html)
DualComfortPillow: Amerisleep Dual Comfort Pillow · from $130 (https://amerisleep.com/pillows/dual-comfort-pillow.html)
BambooSheets: Amerisleep Bamboo Sheets Set · from $150 (https://amerisleep.com/bedding/bamboo-sheets.html)
BambooProtector: Amerisleep Bamboo Mattress Protector · from $80 (https://amerisleep.com/bedding/bamboo-mattress-protector.html)
LiftTopper: Amerisleep Lift Mattress Topper · from $254 (https://amerisleep.com/mattress-toppers/lift-mattress-topper.html)
RecoverComforter: Amerisleep Recover+ Comforter · from $179 (https://amerisleep.com/bedding/recover-comforter.html)

═══════════════════════════════════════════════════════
THE directAnswer FIELD
═══════════════════════════════════════════════════════
- 50 to 75 words exactly
- A complete, self-contained answer
- Specific — include product names, firmness levels, real numbers

═══════════════════════════════════════════════════════
POST TYPES
═══════════════════════════════════════════════════════
TYPE C — Comparison ("X vs Y")
  Section 1: No heading. State the real difference immediately. 250+ words.
  Section 2: "Side by Side" — hasTable: true, Headers: ["", "Option A", "Option B"] - 250+ words. 
  Section 3: "When [Option A] Is the Right Choice" — hasBulletList: true - 250+ words.
  Section 4: "When [Option B] Is the Right Choice" — hasBulletList: true - 250+ words.
  Section 5: "The Verdict" — direct recommendation, no hedging, 250+ words.
  FAQs: 4 minimum
  productRefs: 1-2 products

Ensure you output ONLY Valid JSON that matches this exact schema format:
{
  "id": "...", "slug": "...", "title": "...", "metaTitle": "...", "metaDescription": "...",
  "canonicalUrl": "...", "ogTitle": "...", "ogDescription": "...", "ogImage": "...",
  "category": "...", "tags": [], "author": {"name": "...","url": "..."}, "reviewedBy": null,
  "datePublished": "...", "dateModified": "...", "readTimeMinutes": 7, "wordCountTarget": 1800,
  "excerpt": "...", "directAnswer": "...", "answersSI": "...", "citableFacts": [], "entityMentions": [],
  "schemaType": "BlogPosting",
  "sections": [
    { "heading": null, "headingLevel": null, "content": "...", "hasBulletList": false, "hasTable": false },
    { "heading": "Side by Side", "headingLevel": 2, "content": "...", "hasBulletList": false, "hasTable": true, "tableData": { "headers": [], "rows": [] } },
    { "heading": "When Option A is Right", "headingLevel": 2, "content": "...", "hasBulletList": true, "hasTable": false, "bulletItems": [] },
    ...
  ],
  "faqs": [{"question": "...", "answer": "..."}],
  "internalLinks": [{"anchorText": "...", "url": "...", "context": "..."}],
  "productRefs": [{"productId": "...", "productName": "...", "productUrl": "...", "salePrice": "...", "mentionContext": "..."}]
}
`;

async function generatePost(postDef) {
  const prompt = "Generate the blog post for:\n" +
  "Post #" + postDef.id + "\n" +
  "Slug: " + postDef.slug + "\n" +
  "Type: " + postDef.type + "\n" +
  "Primary: " + postDef.primary + "\n" +
  "Secondary: " + postDef.secondary + "\n" +
  "Reviewed: " + postDef.reviewed + "\n" +
  "Date: " + postDef.date + "\n" +
  "Target Instruction: " + postDef.instruction + "\n\n" +
  "Ensure EACH section's 'content' is at least 250 words of real prose. Do not skimp on length! Write like an expert. Output pure JSON without markdown brackets.";

  console.log('Requesting from Gemini...');
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      systemInstruction: PROMPT_TEXT,
      responseMimeType: 'application/json',
      temperature: 0.7,
    }
  });
  
  let result = response.text;
  if (result.startsWith('\`\`\`json')) {
    result = result.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
  }
  return JSON.parse(result);
}

const batch = [
  {
    id: 44,
    slug: 'adjustable-base-vs-box-spring',
    type: 'C',
    primary: 'AdjustableBed',
    secondary: 'Foundation',
    reviewed: 'no',
    date: '2026-04-01',
    instruction: 'directAnswer: what a box spring actually does vs what an adjustable base does'
  }
];

async function main() {
  const file = './src/data/blogs-generated.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  for (const p of batch) {
    const postObj = await generatePost(p);
    if (!postObj.answersSI) postObj.answersSI = postObj.directAnswer;
    if (!postObj.citableFacts) postObj.citableFacts = [];
    if (!postObj.entityMentions) postObj.entityMentions = [];
    data.push(postObj);
    console.log("Generated " + p.slug);
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Done!');
}

main().catch(console.error);
