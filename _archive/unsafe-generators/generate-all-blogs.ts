import fs from 'node:fs/promises';
import path from 'node:path';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const JSON_DB_PATH = path.join(process.cwd(), 'src/data/blogs-generated.json');

const MASTER_PROMPT = `You are a senior sleep health editor writing for a sleep review publication.
Your job is to write one blog post at a time as a TypeScript BlogPost object.

You write like a real human editor — specific, opinionated, conversational.
You do NOT write like a content farm. You do NOT write like a corporate press release.
You write direct, useful, with personality.

CRITICAL: WHAT MUST NEVER APPEAR IN ANY OUTPUT
NEVER mention, reference, link to, or imply the existence of:
  - Any competitor mattress brand (Casper, Purple, Saatva, Tuft & Needle, etc.)
  - Any other sleep review website by name
  - Any specific external affiliate or review platform

The site sells ONE brand of mattresses only: Amerisleep. Every product reference must be from the approved product list.

APPROVED PRODUCTS (USE ONLY THESE):
  AS2 (Medium Firm, 12", 3 layers), salePrice: "from $799", url: "https://amerisleep.com/mattresses/as2-memory-foam-mattress.html"
  AS3 (Medium, 12", 3 layers), salePrice: "from $999", url: "https://amerisleep.com/mattresses/as3-memory-foam-mattress.html"
  AS5 (Plush/Soft, 14", 4 layers), salePrice: "from $1,599", url: "https://amerisleep.com/mattresses/as5-memory-foam-mattress.html"
  AS6 Black Series (Luxury, cooling), salePrice: "from $2,399", url: "https://amerisleep.com/mattresses/as6-memory-foam-mattress.html"
  Organica (Natural/Organic), salePrice: "from $1,199", url: "https://amerisleep.com/mattresses/organica-natural-mattress.html"
  Amerisleep Foundation (from $300), Adjustable Bed (from $1,200), Bamboo Sheets Set (from $150), Lift Mattress Topper ($254).

APPROVED INTERNAL LINKS (USE ONLY THESE):
  /reviews/amerisleep-as2, /reviews/amerisleep-as3, /reviews/amerisleep-as5, /reviews/amerisleep-as6, /reviews/amerisleep-organica, /reviews/, /comparison/, /methodology/, /topics/, /blog/, /about/

RULES:
  - Second person ("you") throughout. Active voice.
  - No filler openers: "It's worth noting", "In conclusion".
  - Output raw JSON matching the BlogPost schema.

Required Schema Details for JSON output:
sections: Min 5. First section heading: null, headingLevel: null. Main sections headingLevel: 2. content: min 150 words per section.
faqs: 4-6 items.
internalLinks: 3 min (use approved ones).
productRefs: 1-3.

Before outputting verify: No competitor names, exact matching URLs, no filler.`;

async function main() {
  const titlesBuf = await fs.readFile(path.join(process.cwd(), 'scripts/150-titles.json'), 'utf-8');
  const allTitles = JSON.parse(titlesBuf);

  let existingPosts: any[] = [];

  const generatedCount = existingPosts.length;
  console.log(`Currently have ${generatedCount} generated posts. Target is 150.`);

  let postsToGenerateThisRun = process.argv[2] ? parseInt(process.argv[2], 10) : 150;
  
  const postsToGenerate = [];
  for (let i = 0; i < allTitles.length; i++) {
    const currentTitle = allTitles[i];
    const exists = existingPosts.some(p => p.title.toLowerCase() === currentTitle.toLowerCase() || p.id === currentTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'));
    if (!exists) {
      postsToGenerate.push({ index: i, title: currentTitle });
    }
  }

  console.log(`Found ${postsToGenerate.length} missing posts to generate.`);
  postsToGenerate.splice(postsToGenerateThisRun);

  const CONCURRENCY = 8;
  for (let i = 0; i < postsToGenerate.length; i += CONCURRENCY) {
    const batch = postsToGenerate.slice(i, i + CONCURRENCY);
    console.log(`Processing batch ${Math.floor(i/CONCURRENCY)+1} (size ${batch.length})...`);
    
    await Promise.all(batch.map(async (item) => {
      const idx = item.index;
      const currentTitle = item.title;
      const currentSlug = currentTitle.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      const pubDate = new Date(2026, 0, 5 + idx * 2);
      const dateStr = pubDate.toISOString().split('T')[0];
      const typeHint = idx < 35 ? "TYPE A (roundup) - Include quick picks table (hasTable: true)" 
                   : idx < 60 ? "TYPE C (comparison) - Include side-by-side table (hasTable: true)"
                   : idx < 100 ? "TYPE B (informational) - Hook and direct answer in first paragraph"
                   : idx < 125 ? "TYPE D (how-to) - Step by step sections"
                   : "TYPE B (sleep tips) - Teach first";

      const prompt = `Generate blog post for the topic: "${currentTitle}".
Slug: "${currentSlug}"
Type: ${typeHint}
Publish Date (use this exactly for datePublished and dateModified): "${dateStr}"

Return ONLY raw JSON matching BlogPost scheme.`;

      let success = false;
      let retries = 50;
      while (!success && retries > 0) {
        try {
          const resp = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
            config: {
            systemInstruction: MASTER_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                slug: { type: Type.STRING },
                title: { type: Type.STRING },
                metaTitle: { type: Type.STRING },
                metaDescription: { type: Type.STRING },
                canonicalUrl: { type: Type.STRING },
                ogTitle: { type: Type.STRING },
                ogDescription: { type: Type.STRING },
                ogImage: { type: Type.STRING },
                category: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                author: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, url: { type: Type.STRING } }
                },
                datePublished: { type: Type.STRING },
                dateModified: { type: Type.STRING },
                readTimeMinutes: { type: Type.INTEGER },
                wordCountTarget: { type: Type.INTEGER },
                excerpt: { type: Type.STRING },
                directAnswer: { type: Type.STRING },
                sections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      heading: { type: Type.STRING },
                      headingLevel: { type: Type.INTEGER },
                      content: { type: Type.STRING },
                      hasBulletList: { type: Type.BOOLEAN },
                      hasTable: { type: Type.BOOLEAN },
                      bulletItems: { type: Type.ARRAY, items: { type: Type.STRING } },
                      tableData: {
                        type: Type.OBJECT,
                        properties: {
                          headers: { type: Type.ARRAY, items: { type: Type.STRING } },
                          rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } }
                        }
                      }
                    },
                    required: ["content", "hasBulletList", "hasTable"]
                  }
                },
                faqs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING }
                    },
                    required: ["question", "answer"]
                  }
                },
                internalLinks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      anchorText: { type: Type.STRING },
                      url: { type: Type.STRING },
                      context: { type: Type.STRING }
                    },
                    required: ["anchorText", "url", "context"]
                  }
                },
                productRefs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      productId: { type: Type.STRING },
                      productName: { type: Type.STRING },
                      productUrl: { type: Type.STRING },
                      salePrice: { type: Type.STRING },
                      mentionContext: { type: Type.STRING }
                    },
                    required: ["productId", "productName", "productUrl"]
                  }
                },
                schemaType: { type: Type.STRING }
              },
              required: [
                "id", "slug", "title", "metaTitle", "metaDescription", "sections", "faqs"
              ]
            }
          }
        });
        
        const resText = resp.text || "";
        let newPost = JSON.parse(resText);
        
        newPost.id = currentSlug;
        newPost.slug = currentSlug;
        newPost.canonicalUrl = "/blog/" + currentSlug;
        newPost.ogImage = "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80";
        
        existingPosts.push(newPost);
        console.log(`Generated: ${currentTitle}`);
        success = true;
      } catch (e: any) {
        retries--;
        console.error(`Error on "${currentTitle}" (Retries left: ${retries}): ${e.message}`);
        if (retries > 0) {
          await new Promise(r => setTimeout(r, 22000));
        }
      }
      } // end while
    }));
    
    // Save after each batch
    await fs.writeFile(JSON_DB_PATH, JSON.stringify(existingPosts, null, 2), "utf8");
    console.log(`Saved batch ${Math.floor(i/CONCURRENCY)+1}. Total posts now: ${existingPosts.length}`);
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`Finished processing. Total posts now: ${existingPosts.length}`);
}

main().catch(err => console.error(err));
