import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getGeminiClient } from '../../lib/gemini';
import { Type } from '@google/genai';

export const prerender = false;

// Path to the JSON database
const jsonDbPath = path.join(process.cwd(), 'src/data/blogs-generated.json');

// Products reference structure helper based on rules in AGENTS.md
const APPROVED_PRODUCTS = [
  { productId: "AS2", productName: "Amerisleep AS2", productUrl: "https://amerisleep.com/as2.html", salePrice: "$799", details: "Medium Firm, great for back pain and lift" },
  { productId: "AS3", productName: "Amerisleep AS3", productUrl: "https://amerisleep.com/as3.html", salePrice: "$999", details: "Medium, most popular, excellent all-rounder" },
  { productId: "AS5", productName: "Amerisleep AS5", productUrl: "https://amerisleep.com/as5.html", salePrice: "$1,599", details: "Plush, deep contouring for side sleepers" },
  { productId: "AS6", productName: "Amerisleep AS6", productUrl: "https://amerisleep.com/as6/", salePrice: "$2,399", details: "Luxury/Cooling, best for hot or heavy sleepers" },
  { productId: "Organica", productName: "Amerisleep Organica", productUrl: "https://amerisleep.com/organica/organic-mattress/", salePrice: "$1,199", details: "Organic Hybrid, natural Talalay latex" },
  { productId: "BambooSheets", productName: "Amerisleep Bamboo Sheets", productUrl: "https://amerisleep.com/bedding/bamboo-sheets/", salePrice: "$150", details: "Breathable and luxury cooling bedding" },
  { productId: "BambooProtector", productName: "Amerisleep Bamboo Protector", productUrl: "https://amerisleep.com/bedding/waterproof-mattress-protector/", salePrice: "$80", details: "Waterproof sleep protection cover" },
  { productId: "LiftTopper", productName: "Amerisleep Lift Topper", productUrl: "https://amerisleep.com/bedding/lift-mattress-topper/", salePrice: "$254", details: "Responsive foam comfort addition" },
  { productId: "AdjustableBedFrame", productName: "Amerisleep Adjustable Bed Frame", productUrl: "https://amerisleep.com/bed-bases/adjustable-bed-frame/", salePrice: "$1,260", details: "Head and foot articulation luxury frame" }
];

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.ADMIN_SECRET || process.env.ADMIN_SECRET;
  if (secret) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return new Response('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="PureSleep Admin"' } });
    }
    const base64str = authHeader.split(' ')[1];
    const decoded = Buffer.from(base64str, 'base64').toString('utf-8');
    const [, pass] = decoded.split(':');
    if (pass !== secret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }
  }

  try {
    const rawBody = await request.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    const { action } = body;

    // Load existing posts
    let existingPosts = [];
    try {
      const data = await fs.readFile(jsonDbPath, 'utf8');
      existingPosts = JSON.parse(data);
    } catch (err) {
      // Setup empty or default if file missing
      existingPosts = [];
    }

    const ai = getGeminiClient();

    if (action === 'suggest') {
      const existingTitlesList = existingPosts.map((p: any) => `- "${p.title}" (slug: ${p.slug})`).join('\n');
      
      const systemInstruction = `You are a high-level SEO strategist for PureSleep, an expert independent sleep publication.
Your job is to read the list of ALREADY generated blog posts, and suggest 5 NEW, HIGH-POTENTIAL blog titles that do not overlap or duplicate.
Every suggested topic must:
1. Target an SEO need or user question (e.g., "how to sleep with hip pain", "choosing an organic hybrid", "adjustable beds for snoring").
2. Focus on topics that naturally lead to mentioning Amerisleep mattresses (AS2 Medium-Firm, AS3 Medium, AS5 Plush, AS6 Luxury, Organica Latex).
3. Use a conversational but direct tone.
You MUST output raw JSON matching the requested structure.`;

      const prompt = `Here are the blog posts we already have on our site:
${existingTitlesList}

Review this catalog, and propose exactly 5 brand new blog topics. Provide the proposed title, a suggested slug, a target keyword, a short SEO explanation, and the primary target Amerisleep product.
Ensure NO duplication under any circumstances. We want zero spam. All topics must provide unique value to the reader.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "SEO optimized post title. sentence case. Include '2026' if helpful. Keep dry and expert." },
                slug: { type: Type.STRING, description: "Lowercase, hyphens only. Unique slug." },
                keyword: { type: Type.STRING, description: "Target focus keyword phrase." },
                reason: { type: Type.STRING, description: "SEO explanation of why this complements but does not duplicate existing posts." },
                targetProduct: { type: Type.STRING, description: "Choose one: AS2, AS3, AS5, AS6, Organica, BambooSheets, LiftTopper, AdjustableBedFrame" }
              },
              required: ["title", "slug", "keyword", "reason", "targetProduct"]
            }
          }
        }
      });

      return new Response(response.text, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (action === 'generate') {
      const { title, slug, keyword, targetProduct } = body;
      if (!title || !slug || !keyword) {
        return new Response(JSON.stringify({ error: "Missing title, slug, or keyword parameter" }), { status: 400 });
      }

      // Check for exact duplication
      const exists = existingPosts.some((p: any) => p.slug === slug || p.title.toLowerCase() === title.toLowerCase());
      if (exists) {
        return new Response(JSON.stringify({ error: "A blog post with this slug or title already exists. Duplicates are strictly prohibited." }), { status: 400 });
      }

      const existingTitlesList = existingPosts.map((p: any) => `- "${p.title}" (slug: ${p.slug})`).join('\n');

      const systemInstruction = `You are an expert sleep health researcher and mattress testing editor at PureSleep.
Your writing voice must be conversational but expert, like a knowledgeable, helpful friend. Avoid sounding like a sales representative or a dry textbook.
You MUST format your output as a single JSON object that strictly adheres to the BlogPost interface schema.

**EXTREME WRITING RULES — DO NOT FAIL COMPLIANCE**:
1. PARAGRAPHS: Every paragraph must contain between 3 and 5 sentences. Never output a 1-sentence or 2-sentence paragraph. Never output an 8-sentence wall of text.
2. NO FILLER: You are strictly FORBIDDEN from using any of these phrases: "It's worth noting", "In conclusion", "To summarize", "At the end of the day", "Needless to say", "It goes without saying", "As we all know", "In today's world", "In this article we will", "Let's dive in", "Without further ado". If any of these are detected, you fail.
3. CONSECUTIVE WORD RESTRICTION: Do not start two consecutive sentences with the same word.
4. HEADINGS: Headings must be written as complete thoughts or direct questions (e.g., "Why memory foam works well for side sleepers" NOT "Side sleeper memory foam").
5. FIRST PART DIRECT ANSWER: The first section must include an introduction without a heading (set heading: null). Within the first 100 words of the article, you must provide a direct, standalone answer to the main question.
6. MANDATORY SPECIFIC NUMBER: Every article must include at least one specific clinical score, night count, price, or percentage in the body (e.g. "Bio-Pur® scored 9.3/10 for pressure relief").
7. VERBATIM MATH/FACTS: Any facts compiled under the first paragraph must appear verbatim throughout the body as natural reviews.
8. NEVER compare Amerisleep negatively. Every Amerisleep product reference must have correct prices and URLs from products_amerisleep.json.
9. WORD COUNT: Full prose target is 900-1300 words. Keep it comprehensive but dense with structured metrics. Ensure sections list at least 4 divisions (including null intro).

Approved products database to strictly reference:
${JSON.stringify(APPROVED_PRODUCTS, null, 2)}

Sleep Trial: 100-night risk-free trial.
Warranty: 20-year warranty.
Brand Rating: 4.7 stars based on over 15,000 positive customer reviews.
Required Terms (Spell exactly): "Bio-Pur®", "HIVE® Technology", "Refresh Fabric".

Strictly format as a JSON BlogPost object.`;

      const prompt = `Write a comprehensive, professional blog post.
Title: "${title}"
Slug: "${slug}"
Target Focus Keyword: "${keyword}"
Primary Target Product: "${targetProduct || 'AS3'}"

Catalog context (Ensure NO overlapping content duplication):
${existingTitlesList}

Requirements:
- Choose most relevant category from: 'sleep-science' | 'buying-guide' | 'mattress-care' | 'bedroom-design' | 'health-and-sleep' | 'product-comparison' | 'sleep-tips'
- Generate 3-6 relevant tags from approved list: "memory-foam", "hybrid", "innerspring", "latex", "organic", "side-sleepers", "back-sleepers", "stomach-sleepers", "combination-sleepers", "hot-sleepers", "couples", "back-pain", "hip-pain", "shoulder-pain", "sciatica", "firmness", "support", "pressure-relief", "motion-isolation", "edge-support", "cooling", "mattress-care", "mattress-topper", "pillows", "bedding", "adjustable-base", "sleep-tips", "sleep-science", "bedroom-design", "buying-guide", "amerisleep", "bio-pur", "hive-technology".
- Create exactly 3-5 comprehensive sections (BlogSection[]). Section 1 is the introduction (heading: null).
- Ensure hasBulletList and bulletItems (each bullet 10-25 words, specific) are included in at least two sections.
- Ensure hasTable and tableData are included in at least one section (e.g. a neat comparison table).
- Include 3 or 4 accordion FAQs (FAQ[]) that directly solve questions from searches.
- Define 2 or 3 internal reading links using approved URLs: "/reviews/amerisleep-as3", "/reviews/amerisleep-as2", "/reviews/amerisleep-as5", "/reviews/", "/guides/", "/comparison/", "/methodology/", "/topics/".
- Define 1-3 product references from APPROVED_PRODUCTS. Product 1 must match the Primary Target Product chosen.
- Choose ogImage from approved Bedroom/Mattress Unsplash list:
  Bedroom: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
  Mattress: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  Sleep: "https://images.unsplash.com/photo-1531353827579-6e6f95e8b84e?auto=format&fit=crop&w=1200&q=80"
  Bedding: "https://images.unsplash.com/photo-1591820328689-9db07d29ccfd?auto=format&fit=crop&w=1200&q=80"

Execute writing with high lexical variety and crisp professional typography guidelines. Return the raw json matching BlogPost schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview', // Use complex reasoning model for pristine compliance and maximum copywriting quality
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

      // Parse the output
      let newPost: any;
      try {
        newPost = JSON.parse(response.text);
      } catch (e) {
        return new Response(JSON.stringify({ error: "Failed to parse generated post: model returned invalid JSON structure", logModelOutput: response.text }), { status: 500 });
      }

      // Enforce post ID, dates, and baseline schema elements are accurate
      newPost.id = slug;
      newPost.slug = slug;
      newPost.canonicalUrl = `/blog/${slug}`;
      newPost.author = { name: "Editorial Team", url: "/about/" };
      
      const today = new Date().toISOString().split('T')[0];
      newPost.datePublished = today;
      newPost.dateModified = today;

      // Force reviewers standard
      newPost.reviewedBy = {
        name: "PureSleep Testing Team",
        role: "Sleep Product Testers",
        credentials: "Independent sleep product testing team",
        url: "/methodology/"
      };

      // Strict price sanitization to avoid model discrepancies
      newPost.productRefs = newPost.productRefs.map((ref: any) => {
        const matchingRef = APPROVED_PRODUCTS.find(p => p.productId.toLowerCase() === ref.productId.toLowerCase() || p.productName.toLowerCase() === ref.productName.toLowerCase());
        if (matchingRef) {
          return {
            productId: matchingRef.productId,
            productName: matchingRef.productName,
            productUrl: matchingRef.productUrl,
            salePrice: matchingRef.salePrice,
            mentionContext: ref.mentionContext || 'secondary-mention'
          };
        }
        return ref;
      });

      // Post validation loops to fix filler expressions inside text
      const cleanTextFilters = (text: string) => {
        let cleaned = text;
        const badPhrases = [
          "It's worth noting", "In conclusion", "To summarize", "At the end of the day",
          "Needless to say", "It goes without saying", "As we all know", "In today's world",
          "In this article we will", "Let's dive in", "Without further ado"
        ];
        for (const bad of badPhrases) {
          const regex = new RegExp(bad + '[,\\.\\s]*', 'gi');
          cleaned = cleaned.replace(regex, '');
        }
        return cleaned;
      };

      newPost.excerpt = cleanTextFilters(newPost.excerpt);
      newPost.directAnswer = cleanTextFilters(newPost.directAnswer);
      newPost.sections = newPost.sections.map((sect: any) => ({
        ...sect,
        content: cleanTextFilters(sect.content)
      }));

      // Append to the list
      existingPosts.push(newPost);

      // Save back to JSON Database
      await fs.writeFile(jsonDbPath, JSON.stringify(existingPosts, null, 2), 'utf8');

      return new Response(JSON.stringify({ success: true, post: newPost }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: "Action not recognized" }), { status: 400 });

  } catch (err: any) {
    console.error("Endpoint compilation error: ", err);
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
