import fs from 'node:fs/promises';
import path from 'node:path';
import { GoogleGenAI, Type } from '@google/genai';

// Centralised configuration
const JSON_DB_PATH = path.join(process.cwd(), 'src/data/blogs-generated.json');

const APPROVED_PRODUCTS = [
  { productId: "AS2", productName: "Amerisleep AS2", productUrl: "https://amerisleep.com/as2.html", salePrice: "$799", details: "Medium Firm, great for back pain" },
  { productId: "AS3", productName: "Amerisleep AS3", productUrl: "https://amerisleep.com/as3.html", salePrice: "$999", details: "Medium, most popular, excellent all-rounder" },
  { productId: "AS5", productName: "Amerisleep AS5", productUrl: "https://amerisleep.com/as5.html", salePrice: "$1,599", details: "Plush, deep contouring for side sleepers" },
  { productId: "AS6", productName: "Amerisleep AS6", productUrl: "https://amerisleep.com/as6/", salePrice: "$2,399", details: "Luxury/Cooling, best for hot or heavy sleepers" },
  { productId: "Organica", productName: "Amerisleep Organica", productUrl: "https://amerisleep.com/organica/organic-mattress/", salePrice: "$1,199", details: "Organic Hybrid, natural Talalay latex" }
];

async function main() {
  console.log("=========================================");
  console.log("   PURESLEEP AUTONOMOUS GENERATOR AGENT  ");
  console.log("=========================================\n");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable is not set.");
    console.error("Please export GEMINI_API_KEY over shell before running.");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  // 1. Read existing posts
  let existingPosts: any[] = [];
  try {
    const data = await fs.readFile(JSON_DB_PATH, 'utf8');
    existingPosts = JSON.parse(data);
  } catch (err) {
    console.log("Warning: Could not load existing blogs-generated.json. Starting fresh.");
  }

  console.log(`Current catalog: ${existingPosts.length} posts detected.`);

  let targetTitle = process.argv[2];
  let targetSlug = "";
  let targetKeyword = "";
  let targetProduct = "AS3";

  if (!targetTitle) {
    console.log("Action: Proposing a non-duplicate, relevant SEO topic...");
    const existingTitlesList = existingPosts.map((p: any) => `- "${p.title}"`).join('\n');
    
    const suggestPrompt = `You are the lead strategist for PureSleep.
We have these posts:
${existingTitlesList}

Review this dataset, and propose a SINGLE brand new healthy sleep topic title that does not duplicate or overlap any of these.
Provide the proposed title, unique lowercase hyphenated-only slug, and target focus keyword. Choose a suitable primary Amerisleep product.
Output ONLY JSON matching structure: { "title": "...", "slug": "...", "keyword": "...", "product": "..." }`;

    const suggestRes = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: suggestPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            slug: { type: Type.STRING },
            keyword: { type: Type.STRING },
            product: { type: Type.STRING }
          },
          required: ["title", "slug", "keyword", "product"]
        }
      }
    });

    const proposal = JSON.parse(suggestRes.text);
    targetTitle = proposal.title;
    targetSlug = proposal.slug;
    targetKeyword = proposal.keyword;
    targetProduct = proposal.product;

    console.log(`\nProposed Topic:\n- Title: "${targetTitle}"\n- Slug: "${targetSlug}"\n- Keyword: "${targetKeyword}"\n- Anchor: ${targetProduct}`);
  } else {
    // Computed from user CLI input
    targetSlug = targetTitle.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    targetKeyword = process.argv[3] || targetTitle.toLowerCase();
    targetProduct = process.argv[4] || "AS3";
    console.log(`Using custom parameters:\n- Title: "${targetTitle}"\n- Slug: "${targetSlug}"\n- Keyword: "${targetKeyword}"`);
  }

  // Double check duplication
  const duplicate = existingPosts.some((p: any) => p.slug === targetSlug || p.title.toLowerCase() === targetTitle.toLowerCase());
  if (duplicate) {
    console.error("Aborting: This topic or slug already exists inside database to protect content uniqueness.");
    process.exit(1);
  }

  console.log("\nInovking writing agent pipeline on gemini-3.1-pro-preview... (Hold tight, compiling content...)");

  const systemInstruction = `You are a sleep health expert and senior editorial writer for PureSleep.
Write a long-form article that matches the BlogPost interface JSON schema.

**CRITICAL RULES**:
1. PARAGRAPHS: 3-5 sentences each. Do NOT use 1-sentence paragraphs. Do NOT use 8-sentence text walls.
2. NO FILLER: Never write: "It's worth noting", "In conclusion", "To summarize", "At the end of the day", "Needless to say", "It goes without saying", "As we all know", "In today's world", "In this article we will", "Let's dive in", "Without further ado".
3. NO CONSECUTIVE REPETITION: Do not start two consecutive sentences with the same word.
4. HEADINGS: Complete thoughts as questions or full sentences.
5. INTRO: Section 1 must have heading: null. Answer the query directly in the first 100 words.
6. MANDATORY SPECIFIC NUMBER: Must mention at least one clinical load score or night count.
7. PRICES & URLS: Must match standard Amerisleep credentials verbatim.`;

  const prompt = `Write a comprehensive website guide.
Title: "${targetTitle}"
Slug: "${targetSlug}"
Focus Keyword: "${targetKeyword}"
Primary Target Product: "${targetProduct}"

Current Catalog:
${existingPosts.map((p: any) => `- "${p.title}"`).join('\n')}

Format as standard JSON BlogPost.`;

  const writeRes = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
    config: {
      systemInstruction,
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
          reviewedBy: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              credentials: { type: Type.STRING },
              url: { type: Type.STRING }
            }
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
              required: ["heading", "headingLevel", "content", "hasBulletList", "hasTable"]
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
                  required: ["productId", "productName", "productUrl", "salePrice", "mentionContext"]
                }
              },
              schemaType: { type: Type.STRING }
            },
            required: [
              "id", "slug", "title", "metaTitle", "metaDescription", "canonicalUrl", "ogTitle",
              "ogDescription", "ogImage", "category", "tags", "author", "datePublished",
              "dateModified", "readTimeMinutes", "wordCountTarget", "excerpt", "directAnswer",
              "sections", "faqs", "internalLinks", "productRefs", "schemaType"
            ]
          }
        }
      });

  const parsed = JSON.parse(writeRes.text);
  
  // Clean fillers
  const cleanFilters = (text: string) => {
    let cleaned = text;
    const bad = [
      "It's worth noting", "In conclusion", "To summarize", "At the end of the day",
      "Needless to say", "It goes without saying", "As we all know", "In today's world",
      "In this article we will", "Let's dive in", "Without further ado"
    ];
    for (const b of bad) {
      const regex = new RegExp(b + '[,\\.\\s]*', 'gi');
      cleaned = cleaned.replace(regex, '');
    }
    return cleaned;
  };

  parsed.id = targetSlug;
  parsed.slug = targetSlug;
  parsed.canonicalUrl = `/blog/${targetSlug}`;
  parsed.excerpt = cleanFilters(parsed.excerpt);
  parsed.directAnswer = cleanFilters(parsed.directAnswer);
  parsed.sections = parsed.sections.map((s: any) => ({
    ...s,
    content: cleanFilters(s.content)
  }));

  // Clean prices and URLs
  parsed.productRefs = parsed.productRefs.map((ref: any) => {
    const match = APPROVED_PRODUCTS.find(p => p.productId.toLowerCase() === ref.productId.toLowerCase());
    if (match) {
      return {
        productId: match.productId,
        productName: match.productName,
        productUrl: match.productUrl,
        salePrice: match.salePrice,
        mentionContext: ref.mentionContext || 'secondary-mention'
      };
    }
    return ref;
  });

  const today = new Date().toISOString().split('T')[0];
  parsed.datePublished = today;
  parsed.dateModified = today;

  existingPosts.push(parsed);

  await fs.writeFile(JSON_DB_PATH, JSON.stringify(existingPosts, null, 2), 'utf8');

  console.log("\n=========================================");
  console.log("   SUCCESS: ARTICLE GENERATED SUCCESSFULLY");
  console.log("=========================================");
  console.log(`- Title: "${parsed.title}"`);
  console.log(`- Slug: "/blog/${parsed.slug}"`);
  console.log(`- Word count: ~${parsed.wordCountTarget} words`);
  console.log(`- Saved cleanly to ${JSON_DB_PATH}`);
  console.log("=========================================\n");
}

main().catch((err) => {
  console.error("FATAL pipeline crash: ", err);
  process.exit(1);
});
