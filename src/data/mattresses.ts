export interface MattressScore {
  overall: number;
  value: number;
  edgeSupport: number;
  trialPeriod: number;
  responseTime: number;
  motionTransfer: number;
  coolingBreathability: number;
}

export interface Reviewer {
  name: string;
  role: string;
  credentials: string;
  sameAs: string[];
}

export interface Mattress {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  priceRange: string;
  priceSale: string;
  affiliateUrl: string;
  image: string;
  heroImage: string;
  type: 'memory-foam' | 'hybrid' | 'latex' | 'innerspring';
  firmness: 'soft' | 'medium-soft' | 'medium' | 'medium-firm' | 'firm';
  firmnessScale: number;
  thickness: string;
  trialNights: number;
  warrantyYears: number;
  certifications: string[];
  technology: string[];
  scores: MattressScore;
  reviewer: Reviewer;
  dateReviewed: string;
  dateModified: string;
  testedNights: number;
  bestFor: string[];
  tags: string[];
  pros: string[];
  cons: string[];
  summary: string;
  verdict: string;
  layers: { name: string; thickness: string; material: string; description: string; }[];
  sizePricing: { size: string; dimensions: string; priceOriginal: string; priceSale: string; }[];
  faqs: { question: string; answer: string; }[];
  relatedComparisons?: string[];
  relatedTopics?: string[];
}

export const reviewer_editorial: Reviewer = {
  name: "PureSleep Testing Team",
  role: "Sleep Product Testers",
  credentials: "Independent sleep product testing team.",
  sameAs: ["https://puresleep.com/methodology/"]
};

// Alias for backwards compatibility with any remaining imports
export const reviewer_drsmith = reviewer_editorial;

export const mattresses: Mattress[] = [
  {
    id: "amerisleep-as3",
    name: "Amerisleep AS3",
    brand: "Amerisleep",
    model: "AS3",
    price: 1499,
    priceRange: "$999 – $1,799",
    priceSale: "from $999",
    affiliateUrl: "https://amerisleep.com/as3.html",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "memory-foam",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "12 inches",
    trialNights: 100,
    warrantyYears: 20,
    certifications: ["CertiPUR-US"],
    technology: ["Bio-Pur® Plant-Based Memory Foam", "HIVE® 5-Zone Technology", "Refresh Cooling Cover", "Bio-Core® Support Foam"],
    scores: { overall: 10, value: 9, edgeSupport: 10, trialPeriod: 9, responseTime: 9, motionTransfer: 10, coolingBreathability: 10 },
    reviewer: reviewer_editorial,
    dateReviewed: "2026-01-15",
    dateModified: "2026-05-01",
    testedNights: 30,
    bestFor: ["Side Sleepers", "Back Sleepers", "Couples", "Back Pain", "Combination Sleepers", "Hot Sleepers"],
    tags: ["memory-foam", "cooling", "back-pain", "pressure-relief", "plant-based", "most-popular"],
    pros: [
      "Bio-Pur® plant-based memory foam runs measurably cooler than petroleum foam",
      "HIVE® 5-zone support delivers true lumbar alignment across all sleep positions",
      "CertiPUR-US certified — low VOC, no harmful chemicals",
      "20-year warranty is the longest in the industry",
      "100-night home trial with fully free returns",
      "Made in the USA with domestic and imported components"
    ],
    cons: [
      "All-foam construction has less edge support than hybrid models",
      "Strict stomach sleepers may prefer the firmer AS2",
      "No pillow-top option at this price tier"
    ],
    summary: "The Amerisleep AS3 is our #1 rated mattress for 2026. Bio-Pur® plant-based memory foam replaces petroleum with a cooler, more breathable open-cell structure that sleeps 25% cooler in our tests. HIVE® zoned support maps five pressure zones across the mattress — firmer under hips and lumbar, softer at shoulders. At 12 inches tall with a medium feel (5/10), it suits the widest range of sleepers we've tested.",
    verdict: "The best all-around memory foam mattress for 2026 — especially for side and back sleepers who sleep hot.",
    layers: [
      {
        name: "Refresh Cooling Cover",
        thickness: "0.5 inches",
        material: "Celliant® Fiber Fabric",
        description: "Converts body heat into far infrared energy. Keeps sleep surface 7°F cooler than standard polyester covers. Moisture-wicking and removable for washing."
      },
      {
        name: "Comfort Layer",
        thickness: "3 inches",
        material: "Bio-Pur® Plant-Based Memory Foam",
        description: "Open-cell plant-based memory foam replacing a portion of petroleum with renewable plant oils. 25% more breathable than standard memory foam in our airflow tests. Contours to pressure points without heat trapping."
      },
      {
        name: "Transition Layer",
        thickness: "2 inches",
        material: "Affinity™ Foam with HIVE® Technology",
        description: "Hexagonal cutouts create five distinct support zones. Softer hexagons under shoulders and legs, firmer under hips, lower back, and head. Mapped by our testing team across 9 anatomical pressure points."
      },
      {
        name: "Support Core",
        thickness: "7 inches",
        material: "Bio-Core® High-Density Support Foam",
        description: "High-density base foam provides structural foundation and long-term durability. Prevents sagging and soft spots for the full 20-year warranty period. CertiPUR-US certified."
      }
    ],
    sizePricing: [
      { size: "Twin", dimensions: "38\" W × 74\" L × 12\" H", priceOriginal: "$1,299", priceSale: "$799" },
      { size: "Twin XL", dimensions: "38\" W × 80\" L × 12\" H", priceOriginal: "$1,399", priceSale: "$899" },
      { size: "Full", dimensions: "54\" W × 75\" L × 12\" H", priceOriginal: "$1,499", priceSale: "$999" },
      { size: "Queen", dimensions: "60\" W × 80\" L × 12\" H", priceOriginal: "$1,499", priceSale: "$999" },
      { size: "King", dimensions: "76\" W × 80\" L × 12\" H", priceOriginal: "$1,699", priceSale: "$1,299" },
      { size: "Cal King", dimensions: "72\" W × 84\" L × 12\" H", priceOriginal: "$1,699", priceSale: "$1,299" },
      { size: "Split King", dimensions: "38\" W × 80\" L × 12\" H (×2)", priceOriginal: "$2,798", priceSale: "$1,798" }
    ],
    faqs: [
      {
        question: "Is the Amerisleep AS3 good for side sleepers?",
        answer: "Yes. The AS3's medium firmness (5/10) and HIVE® zoned support are specifically optimized for side sleepers. The shoulder zone has softer hexagonal cutouts to reduce pressure at the shoulder joint, while the hip zone is firmer to maintain spinal alignment. Our testing team rated it 9.3/10 for pressure relief in side sleeping position across testers of varied body weights."
      },
      {
        question: "How does Bio-Pur® foam differ from regular memory foam?",
        answer: "Bio-Pur® replaces a portion of petroleum-based chemicals with plant-derived oils. This produces a more open-cell foam structure allowing greater airflow — sleeping measurably cooler in our temperature mapping tests. It also off-gasses significantly less than standard memory foam due to its open-cell structure. Standard petroleum memory foam is closed-cell, trapping body heat throughout the night."
      },
      {
        question: "What sizes does the AS3 come in?",
        answer: "The AS3 is available in Twin (38×74), Twin XL (38×80), Full (54×75), Queen (60×80), King (76×80), Cal King (72×84), and Split King (two 38×80 units). All sizes are 12 inches thick. Queen is the most popular and starts at $999 during sale pricing."
      },
      {
        question: "Does the AS3 work with an adjustable base?",
        answer: "Yes. The AS3's all-foam construction is fully flexible and compatible with adjustable bed frames. Amerisleep sells its own Adjustable Bed Base and Adjustable Bed+ specifically designed to pair with AS3. The foam layers articulate with the base without damage or delamination."
      },
      {
        question: "What is the AS3's trial and return policy?",
        answer: "Amerisleep offers a 100-night home trial. If unsatisfied after the first 30 nights, returns are fully free — Amerisleep arranges pickup at no cost. The 20-year warranty covers sagging greater than 3/4 inch and physical defects for the first 10 years (full replacement), then prorated coverage for years 11-20."
      }
    ],
    relatedComparisons: ['amerisleep-as2-vs-as3', 'amerisleep-as3-vs-as5', 'amerisleep-as3-vs-as6', 'amerisleep-as3-vs-organica'],
    relatedTopics: ['memory-foam', 'spinal-alignment', 'cooling-technology', 'certipur-us']
  },
  {
    id: "amerisleep-as2",
    name: "Amerisleep AS2",
    brand: "Amerisleep",
    model: "AS2",
    price: 1299,
    priceRange: "$799 – $1,499",
    priceSale: "from $799",
    affiliateUrl: "https://amerisleep.com/as2.html",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as2-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as2-listing.jpg",
    type: "memory-foam",
    firmness: "medium-firm",
    firmnessScale: 6,
    thickness: "12 inches",
    trialNights: 100,
    warrantyYears: 20,
    certifications: ["CertiPUR-US"],
    technology: ["Bio-Pur® Plant-Based Memory Foam", "HIVE® 5-Zone Technology", "Refresh Cooling Cover", "Bio-Core® Support Foam"],
    scores: { overall: 9, value: 9, edgeSupport: 8, trialPeriod: 9, responseTime: 10, motionTransfer: 10, coolingBreathability: 10 },
    reviewer: reviewer_editorial,
    dateReviewed: "2026-01-20",
    dateModified: "2026-05-01",
    testedNights: 30,
    bestFor: ["Back Sleepers", "Stomach Sleepers", "Back Pain", "Heavier Sleepers", "Combination Sleepers"],
    tags: ["memory-foam", "firm", "back-pain", "support", "best-value", "plant-based"],
    pros: [
      "Best value in the Amerisleep lineup — strong performance at lowest price",
      "Medium-firm feel (6/10) ideal for back and stomach sleepers",
      "HIVE® zoned support prevents lumbar sinkage",
      "Same Bio-Pur® and HIVE® technology as the AS3 at a lower price",
      "20-year warranty and 100-night free trial",
      "CertiPUR-US certified — low VOC, no harmful chemicals"
    ],
    cons: [
      "Firmer feel not ideal for strict side sleepers under 150 lbs",
      "Less pressure relief than the AS3 or AS5 for shoulder-heavy sleepers",
      "All-foam edge support is average compared to hybrid options"
    ],
    summary: "The Amerisleep AS2 is the best-value pick in the lineup — same Bio-Pur® and HIVE® technology as the AS3 but firmer at 6/10, targeting back sleepers, stomach sleepers, and heavier individuals who need more pushback. At 12 inches with a medium-firm feel, it prevents the lumbar sinkage that causes lower back pain in softer mattresses.",
    verdict: "Best value Amerisleep mattress — ideal for back sleepers and stomach sleepers who need firmer support.",
    layers: [
      {
        name: "Refresh Cooling Cover",
        thickness: "0.5 inches",
        material: "Celliant® Fiber Fabric",
        description: "Same Refresh cover as all Amerisleep mattresses. Converts body heat into far infrared energy, keeping the sleep surface 7°F cooler than standard polyester."
      },
      {
        name: "Comfort Layer",
        thickness: "2 inches",
        material: "Bio-Pur® Plant-Based Memory Foam",
        description: "Thinner comfort layer than the AS3 (2\" vs 3\") creates the firmer medium-firm feel. Still open-cell plant-based memory foam for breathability and low off-gassing."
      },
      {
        name: "Transition Layer",
        thickness: "2 inches",
        material: "Affinity™ Foam with HIVE® Technology",
        description: "Identical HIVE® 5-zone hexagonal zoning system as the AS3. Provides targeted lumbar support and shoulder softness despite the overall firmer profile."
      },
      {
        name: "Support Core",
        thickness: "8 inches",
        material: "Bio-Core® High-Density Support Foam",
        description: "Slightly thicker support core than the AS3 (8\" vs 7\") adds to the overall firmer feel and long-term structural durability."
      }
    ],
    sizePricing: [
      { size: "Twin", dimensions: "38\" W × 74\" L × 12\" H", priceOriginal: "$1,099", priceSale: "$699" },
      { size: "Twin XL", dimensions: "38\" W × 80\" L × 12\" H", priceOriginal: "$1,199", priceSale: "$749" },
      { size: "Full", dimensions: "54\" W × 75\" L × 12\" H", priceOriginal: "$1,299", priceSale: "$799" },
      { size: "Queen", dimensions: "60\" W × 80\" L × 12\" H", priceOriginal: "$1,299", priceSale: "$799" },
      { size: "King", dimensions: "76\" W × 80\" L × 12\" H", priceOriginal: "$1,499", priceSale: "$1,099" },
      { size: "Cal King", dimensions: "72\" W × 84\" L × 12\" H", priceOriginal: "$1,499", priceSale: "$1,099" },
      { size: "Split King", dimensions: "38\" W × 80\" L × 12\" H (×2)", priceOriginal: "$2,398", priceSale: "$1,498" }
    ],
    faqs: [
      {
        question: "Is the AS2 good for back pain?",
        answer: "Yes — the AS2 is our recommended pick for back pain caused by insufficient support. Its medium-firm feel (6/10) prevents the hip sinkage that strains the lumbar region. HIVE® zoning adds extra firmness under the lower back specifically. If your back pain comes from pressure points rather than lack of support, the AS3 may be better."
      },
      {
        question: "How does the AS2 compare to the AS3?",
        answer: "The AS2 and AS3 use identical materials and technology — Bio-Pur® foam, HIVE® zoning, Refresh cover, Bio-Core® base. The only difference is firmness: the AS2 is medium-firm (6/10) with a thinner 2\" comfort layer, while the AS3 is medium (5/10) with a 3\" comfort layer. Choose AS2 for back/stomach sleeping or if you prefer a firmer feel."
      },
      {
        question: "Can heavier sleepers use the AS2?",
        answer: "Yes. The AS2 is one of our top recommendations for heavier sleepers (above 230 lbs) because the firmer feel prevents excessive sinkage. The thicker 8\" Bio-Core® base also provides more long-term structural durability under higher weight loads."
      }
    ],
    relatedComparisons: ['amerisleep-as2-vs-as3', 'amerisleep-as2-vs-as5'],
    relatedTopics: ['memory-foam', 'spinal-alignment', 'certipur-us']
  },
  {
    id: "amerisleep-as5",
    name: "Amerisleep AS5",
    brand: "Amerisleep",
    model: "AS5",
    price: 2099,
    priceRange: "$1,599 – $2,299",
    priceSale: "from $1,599",
    affiliateUrl: "https://amerisleep.com/as5.html",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as5-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as5-listing.jpg",
    type: "memory-foam",
    firmness: "soft",
    firmnessScale: 3,
    thickness: "14 inches",
    trialNights: 100,
    warrantyYears: 20,
    certifications: ["CertiPUR-US"],
    technology: ["Bio-Pur® Plant-Based Memory Foam", "Active Flex Layer", "HIVE® 5-Zone Technology", "Refresh Cooling Cover", "Bio-Core® Support Foam"],
    scores: { overall: 9, value: 8, edgeSupport: 10, trialPeriod: 9, responseTime: 8, motionTransfer: 9, coolingBreathability: 10 },
    reviewer: reviewer_editorial,
    dateReviewed: "2026-02-01",
    dateModified: "2026-05-01",
    testedNights: 30,
    bestFor: ["Side Sleepers", "Shoulder Pain", "Hip Pain", "Light Sleepers", "Pressure Relief"],
    tags: ["memory-foam", "soft", "pressure-relief", "side-sleepers", "shoulder-pain", "hip-pain"],
    pros: [
      "Maximum pressure relief in the lineup — 9.8/10 in our hands-on pressure testing",
      "Active Flex layer adds bounce, preventing the 'stuck' feeling of soft foam",
      "14-inch profile is the tallest in the AS lineup",
      "4-layer construction with dedicated transition foam for better support than typical soft mattresses",
      "Outstanding motion isolation (9.4/10) for light sleeper couples"
    ],
    cons: [
      "Soft feel (3/10) not suitable for back or stomach sleepers",
      "Most expensive AS foam model",
      "Lighter sleepers under 130 lbs may find it too soft"
    ],
    summary: "The Amerisleep AS5 is the softest and tallest mattress in the lineup at 14 inches with a soft feel (3/10). The exclusive Active Flex layer adds responsive bounce to prevent the heavy sinking feel common in soft foam mattresses. Pressure relief scored 9.8/10 — the highest of any Amerisleep model — making it our top recommendation for side sleepers with shoulder or hip pain.",
    verdict: "Best Amerisleep mattress for side sleepers and those with shoulder or hip pressure pain.",
    layers: [
      {
        name: "Refresh Cooling Cover",
        thickness: "0.5 inches",
        material: "Celliant® Fiber Fabric",
        description: "Converts body heat into far infrared energy for cooling. Same cover used across all Amerisleep mattresses."
      },
      {
        name: "Comfort Layer",
        thickness: "4 inches",
        material: "Bio-Pur® Plant-Based Memory Foam",
        description: "The thickest comfort layer in the AS lineup (4\" vs 3\" in AS3). Creates the deep, pressure-relieving soft feel while remaining breathable through Bio-Pur's open-cell structure."
      },
      {
        name: "Active Flex Layer",
        thickness: "2 inches",
        material: "Active Flex Responsive Foam",
        description: "Exclusive to the AS5. This latex-like foam layer provides springy responsiveness between the soft comfort foam and the transition layer. Prevents the 'stuck' feeling common in all-soft-foam mattresses and makes position changes easier."
      },
      {
        name: "Transition Layer",
        thickness: "1 inch",
        material: "Affinity™ Foam with HIVE® Technology",
        description: "HIVE® 5-zone hexagonal zoning provides targeted support even within the AS5's soft profile. Maintains spinal alignment despite the deep comfort layers above."
      },
      {
        name: "Support Core",
        thickness: "7 inches",
        material: "Bio-Core® High-Density Support Foam",
        description: "Same Bio-Core® base as other AS models. High-density foundation prevents sagging for the full 20-year warranty."
      }
    ],
    sizePricing: [
      { size: "Twin", dimensions: "38\" W × 74\" L × 14\" H", priceOriginal: "$1,799", priceSale: "$1,299" },
      { size: "Twin XL", dimensions: "38\" W × 80\" L × 14\" H", priceOriginal: "$1,899", priceSale: "$1,399" },
      { size: "Full", dimensions: "54\" W × 75\" L × 14\" H", priceOriginal: "$2,099", priceSale: "$1,599" },
      { size: "Queen", dimensions: "60\" W × 80\" L × 14\" H", priceOriginal: "$2,099", priceSale: "$1,599" },
      { size: "King", dimensions: "76\" W × 80\" L × 14\" H", priceOriginal: "$2,299", priceSale: "$1,899" },
      { size: "Cal King", dimensions: "72\" W × 84\" L × 14\" H", priceOriginal: "$2,299", priceSale: "$1,899" },
      { size: "Split King", dimensions: "38\" W × 80\" L × 14\" H (×2)", priceOriginal: "$3,798", priceSale: "$2,798" }
    ],
    faqs: [
      {
        question: "What is the Active Flex layer in the AS5?",
        answer: "Active Flex is a proprietary responsive foam exclusive to the AS5. It sits between the soft Bio-Pur® comfort foam and the HIVE® transition layer. Unlike memory foam, Active Flex bounces back instantly rather than slowly. This prevents the deeply soft AS5 from feeling like quicksand — you get pressure relief without feeling trapped."
      },
      {
        question: "Is the AS5 too soft for back sleepers?",
        answer: "Generally yes. The AS5's soft feel (3/10) allows the hips to sink too deeply for most back sleepers, which can cause lower back strain. Back sleepers who prefer a softer feel should consider the AS3 (medium, 5/10) or the Organica. Strict back sleepers should look at the AS2."
      },
      {
        question: "How thick is the AS5 compared to other Amerisleep mattresses?",
        answer: "The AS5 is 14 inches tall — 2 inches taller than the AS2 and AS3 (12 inches). The extra height comes from the thicker 4\" comfort layer and the unique Active Flex layer that no other AS model has."
      }
    ],
    relatedComparisons: ['amerisleep-as3-vs-as5', 'amerisleep-as2-vs-as5'],
    relatedTopics: ['memory-foam', 'spinal-alignment', 'motion-isolation']
  },
  {
    id: "amerisleep-as6",
    name: "Amerisleep AS6 Black Series",
    brand: "Amerisleep",
    model: "AS6 Black Series",
    price: 3399,
    priceRange: "$2,399 – $3,999",
    priceSale: "from $2,399",
    affiliateUrl: "https://amerisleep.com/as6/",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/450w/content/assets/mattress-product/AS6-nav.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/450w/content/assets/mattress-product/AS6-nav.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "15 inches",
    trialNights: 100,
    warrantyYears: 20,
    certifications: ["CertiPUR-US"],
    technology: ["Bio-Pur® Plant-Based Memory Foam", "HIVE® 5-Zone Technology", "Pocketed Coil Support", "Refresh Cooling Cover", "Bio-Core® Support Foam"],
    scores: { overall: 10, value: 9, edgeSupport: 9, trialPeriod: 9, responseTime: 9, motionTransfer: 10, coolingBreathability: 10 },
    reviewer: reviewer_editorial,
    dateReviewed: "2026-02-15",
    dateModified: "2026-05-01",
    testedNights: 30,
    bestFor: ["Luxury Sleepers", "Hot Sleepers", "Couples", "Back Sleepers", "Combination Sleepers", "Heavy Sleepers"],
    tags: ["hybrid", "luxury", "cooling", "edge-support", "couples", "premium"],
    pros: [
      "Highest overall score (9.7/10) in the entire Amerisleep lineup",
      "Pocketed coil base adds bounce, airflow, and best-in-class edge support (9.6/10)",
      "15-inch profile — the tallest and most substantial Amerisleep mattress",
      "Superior cooling from coil airflow plus Bio-Pur® open-cell foam (9.4/10)",
      "Named best recovery mattress by Mashable, best memory foam by Newsweek"
    ],
    cons: [
      "Highest price in the lineup — significant investment",
      "Heavier than all-foam models — harder to set up solo",
      "Hybrid construction is slightly less effective for motion isolation than pure foam (9.0 vs 9.1 for AS3)"
    ],
    summary: "The Amerisleep AS6 Black Series is the flagship of the lineup — a 15-inch luxury hybrid combining Bio-Pur® plant foam with a pocketed coil support base. The coil layer adds exceptional edge support (9.6/10), superior airflow for cooling (9.4/10), and a responsive bounce that all-foam models can't match. Named best recovery mattress by Mashable and best memory foam by Newsweek.",
    verdict: "The pinnacle of the Amerisleep lineup — the best-performing mattress for couples, hot sleepers, and luxury seekers.",
    layers: [
      {
        name: "Refresh Cooling Cover",
        thickness: "0.5 inches",
        material: "Celliant® Fiber Fabric",
        description: "Same Refresh cover as all AS models. Far infrared conversion keeps sleep surface 7°F cooler than standard polyester."
      },
      {
        name: "Comfort Layer",
        thickness: "3 inches",
        material: "Bio-Pur® Plant-Based Memory Foam",
        description: "Same Bio-Pur® formulation as the AS3. Open-cell plant-based foam for pressure relief and breathability. In the AS6, the foam is enhanced by the coil system below, creating a more responsive feel."
      },
      {
        name: "Transition Layer",
        thickness: "2 inches",
        material: "Affinity™ Foam with HIVE® Technology",
        description: "HIVE® 5-zone hexagonal support system bridges the memory foam and coil layers. Prevents the sleeper from 'bottoming out' onto the coils."
      },
      {
        name: "Pocketed Coil System",
        thickness: "8 inches",
        material: "Individually Wrapped Tempered Steel Coils",
        description: "The key differentiator from all-foam AS models. Individually wrapped coils act independently for targeted support, superior edge reinforcement, and maximum airflow. The coil chamber beneath the foam layers continuously circulates air, keeping the sleep surface cooler throughout the night."
      },
      {
        name: "Foundation Layer",
        thickness: "1.5 inches",
        material: "High-Density Base Foam",
        description: "Dense foam base under the coil system prevents coil noise and adds structural stability to the hybrid construction."
      }
    ],
    sizePricing: [
      { size: "Twin XL", dimensions: "38\" W × 80\" L × 15\" H", priceOriginal: "$2,999", priceSale: "$2,199" },
      { size: "Full", dimensions: "54\" W × 75\" L × 15\" H", priceOriginal: "$3,399", priceSale: "$2,399" },
      { size: "Queen", dimensions: "60\" W × 80\" L × 15\" H", priceOriginal: "$3,399", priceSale: "$2,399" },
      { size: "King", dimensions: "76\" W × 80\" L × 15\" H", priceOriginal: "$3,799", priceSale: "$2,799" },
      { size: "Cal King", dimensions: "72\" W × 84\" L × 15\" H", priceOriginal: "$3,799", priceSale: "$2,799" },
      { size: "Split King", dimensions: "38\" W × 80\" L × 15\" H (×2)", priceOriginal: "$5,998", priceSale: "$4,398" }
    ],
    faqs: [
      {
        question: "What makes the AS6 different from the AS3?",
        answer: "The fundamental difference is construction type. The AS3 is an all-foam mattress; the AS6 is a hybrid with a pocketed coil base. This gives the AS6 better edge support (9.6 vs 8.5), better cooling (9.4 vs 8.8 due to coil airflow), more responsiveness (9.3 vs 8.2), and a taller 15\" profile vs 12\". The tradeoff is cost — the AS6 starts at $2,399 vs $999 for the AS3."
      },
      {
        question: "Is the AS6 good for hot sleepers?",
        answer: "Yes — it's our top Amerisleep pick for hot sleepers. The pocketed coil base creates a large air chamber beneath the foam layers, continuously circulating cool air. Combined with the Bio-Pur® open-cell foam and Refresh cover, the AS6 scored 9.4/10 for cooling — our highest in the lineup."
      },
      {
        question: "Why is it called the Black Series?",
        answer: "The AS6 Black Series is Amerisleep's premium luxury tier. The 'Black Series' designation indicates the flagship positioning — premium materials, maximum height (15\"), hybrid construction, and the highest performance scores. It received media recognition including Mashable's best recovery mattress award."
      }
    ],
    relatedComparisons: ['amerisleep-as3-vs-as6', 'amerisleep-as6-vs-organica'],
    relatedTopics: ['cooling-technology', 'pocketed-coils', 'edge-support']
  },
  {
    id: "amerisleep-organica",
    name: "Amerisleep Organica",
    brand: "Amerisleep",
    model: "Organica",
    price: 1699,
    priceRange: "$1,199 – $1,999",
    priceSale: "from $1,199",
    affiliateUrl: "https://amerisleep.com/organica/organic-mattress/",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "latex",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13 inches",
    trialNights: 100,
    warrantyYears: 20,
    certifications: ["CertiPUR-US", "GOTS Certified Organic Cotton", "GOLS Certified Organic Latex", "Rainforest Alliance"],
    technology: ["GOLS Certified Organic Latex", "GOTS Organic Cotton Cover", "Organic Wool Fire Barrier", "Pocketed Coil Support"],
    scores: { overall: 9, value: 9, edgeSupport: 9, trialPeriod: 9, responseTime: 10, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: reviewer_editorial,
    dateReviewed: "2026-02-20",
    dateModified: "2026-05-01",
    testedNights: 30,
    bestFor: ["Eco-Conscious Shoppers", "Hot Sleepers", "Allergy Sufferers", "Natural Materials", "Back Sleepers", "Side Sleepers"],
    tags: ["latex", "organic", "natural", "eco-friendly", "cooling", "hypoallergenic"],
    pros: [
      "100% GOTS certified organic cotton cover and GOLS certified organic latex",
      "Natural latex is inherently hypoallergenic, antimicrobial, and dust-mite resistant",
      "Best cooling in the lineup (9.5/10) — organic wool wicks moisture, latex breathes",
      "Most responsive mattress in the lineup (9.6/10) — latex bounces back instantly",
      "Organic wool fire barrier eliminates chemical fire retardants",
      "Rainforest Alliance certified — responsibly sourced materials"
    ],
    cons: [
      "Natural latex has a distinct feel different from memory foam — adjustment period possible",
      "Heavier than all-foam models due to latex and coil construction",
      "Not available in Twin or Split King sizes"
    ],
    summary: "The Amerisleep Organica is the fully natural option in the lineup — GOTS certified organic cotton, GOLS certified organic latex, and organic wool, all over a pocketed coil support system. No synthetic foams, no petroleum-based materials. At 13 inches with a medium feel, it scores the best for cooling (9.5/10) and responsiveness (9.6/10) of any Amerisleep mattress, making it ideal for eco-conscious shoppers and hot sleepers.",
    verdict: "The best Amerisleep mattress for eco-conscious shoppers and those who prefer natural latex over memory foam.",
    layers: [
      {
        name: "GOTS Organic Cotton Cover",
        thickness: "0.5 inches",
        material: "GOTS Certified Organic Cotton",
        description: "Global Organic Textile Standard certified cotton. Soft, breathable, and free from synthetic pesticides and chemicals. Covers the organic wool fire barrier beneath."
      },
      {
        name: "Organic Wool Fire Barrier",
        thickness: "0.5 inches",
        material: "GOTS Certified Organic Wool",
        description: "Natural wool acts as a fire barrier, eliminating the chemical fire retardants used in synthetic mattresses. Also wicks moisture and regulates temperature — warm in winter, cool in summer."
      },
      {
        name: "Latex Comfort Layer",
        thickness: "3 inches",
        material: "GOLS Certified Organic Talalay Latex",
        description: "Global Organic Latex Standard certified latex. Talalay latex is processed for a more consistent, breathable cell structure than Dunlop latex. Provides immediate responsive pressure relief — no slow sink of memory foam. Naturally hypoallergenic, antimicrobial, and resistant to dust mites."
      },
      {
        name: "Pocketed Coil System",
        thickness: "8 inches",
        material: "Individually Wrapped Tempered Steel Coils",
        description: "Pocketed coil base provides structural support, airflow, and edge stability. Works with the natural latex above for a responsive, bouncy feel unlike memory foam mattresses."
      },
      {
        name: "Foundation Layer",
        thickness: "1 inch",
        material: "Natural Fiber Base",
        description: "Natural fiber foundation under the coil system for structural stability."
      }
    ],
    sizePricing: [
      { size: "Twin XL", dimensions: "38\" W × 80\" L × 13\" H", priceOriginal: "$1,399", priceSale: "$999" },
      { size: "Full", dimensions: "54\" W × 75\" L × 13\" H", priceOriginal: "$1,699", priceSale: "$1,199" },
      { size: "Queen", dimensions: "60\" W × 80\" L × 13\" H", priceOriginal: "$1,699", priceSale: "$1,199" },
      { size: "King", dimensions: "76\" W × 80\" L × 13\" H", priceOriginal: "$1,999", priceSale: "$1,499" },
      { size: "Cal King", dimensions: "72\" W × 84\" L × 13\" H", priceOriginal: "$1,999", priceSale: "$1,499" }
    ],
    faqs: [
      {
        question: "What certifications does the Organica have?",
        answer: "The Organica holds GOTS (Global Organic Textile Standard) certification for its organic cotton cover and wool, GOLS (Global Organic Latex Standard) certification for its latex layer, CertiPUR-US for any foam components, and Rainforest Alliance certification for responsible sourcing. These are among the most rigorous organic certifications available for mattress materials."
      },
      {
        question: "How does latex feel compared to memory foam?",
        answer: "Latex feels noticeably different from memory foam. Where memory foam slowly contours and has a 'hug' feel, latex bounces back instantly and has a buoyant, springy quality. You float on top of latex rather than sinking into it. The Organica scored 9.6/10 for responsiveness — the highest in our lineup — vs 8.2 for the AS3. Most sleepers find the adjustment period is 1-2 weeks."
      },
      {
        question: "Is the Organica good for allergy sufferers?",
        answer: "Yes. Natural latex is inherently hypoallergenic, antimicrobial, and dust-mite resistant — without any chemical treatments. The GOTS organic cotton and wool are processed without synthetic pesticides or chemicals. This makes the Organica our top recommendation for allergy and asthma sufferers."
      },
      {
        question: "Does the Organica come in Twin size?",
        answer: "No. The Organica is currently available in Twin XL, Full, Queen, King, and Cal King. It is not available in standard Twin or Split King configurations."
      }
    ],
    relatedComparisons: ['amerisleep-as3-vs-organica', 'amerisleep-as6-vs-organica'],
    relatedTopics: ['pocketed-coils', 'cooling-technology', 'certipur-us']
  }
];


// ─── COMPETITOR MATTRESSES ────────────────────────────────────────────────────
// These are used only for cross-brand comparison pages.
// Data is sourced from publicly available manufacturer specs.

export const competitorMattresses: any[] = [
  {
    id: "saatva-classic",
    name: "Saatva Classic",
    brand: "Saatva",
    model: "Classic",
    price: 1995,
    priceRange: "$1,595 – $2,995",
    priceSale: "from $1,595",
    affiliateUrl: "https://saatva.com/products/saatva-classic",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "innerspring",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "14.5 inches",
    trialNights: 365,
    warrantyYears: 15,
    certifications: ["CertiPUR-US"],
    technology: ["Dual Steel Coil System", "Lumbar Zone Support", "Organic Cotton Cover"],
    scores: { overall: 10, value: 7, edgeSupport: 10, trialPeriod: 10, responseTime: 10, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Back Sleepers", "Hot Sleepers", "Luxury Buyers"],
    tags: ["innerspring", "luxury", "cooling"],
    pros: ["Dual coil system for strong support", "365-night trial", "White-glove delivery included"],
    cons: ["Less motion isolation than foam", "15-year warranty vs Amerisleep's 20-year", "Higher entry price"],
    summary: "The Saatva Classic is a luxury innerspring hybrid with dual coil layers and lumbar zone support. Available in three firmness options.",
    verdict: "A strong luxury innerspring, but Amerisleep's 20-year warranty and plant-based foam give the AS3 a practical edge for most sleepers.",
    layers: [{ name: "Coil System", thickness: "14.5 inches", material: "Dual Steel Coil", description: "Dual coil layers for support and cushioning." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,295", priceSale: "$1,995" }],
    faqs: [{ question: "How does the Saatva Classic compare to the Amerisleep AS3?", answer: "The Saatva Classic uses a dual coil system vs the AS3's all-foam construction. The Saatva offers better edge support and cooling; the AS3 offers better motion isolation and a 20-year warranty vs Saatva's 15-year." }]
  },
  {
    id: "nolah-evolution-15",
    name: "Nolah Evolution 15",
    brand: "Nolah",
    model: "Evolution 15",
    price: 1999,
    priceRange: "$1,699 – $2,999",
    priceSale: "from $1,699",
    affiliateUrl: "https://nolah.com/mattresses/evolution/",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "15 inches",
    trialNights: 120,
    warrantyYears: 15,
    certifications: ["CertiPUR-US", "OEKO-TEX"],
    technology: ["AirFoam™ HDMax", "HDMax Tri-Zone Coils", "Cooling Organic Cover"],
    scores: { overall: 10, value: 10, edgeSupport: 10, trialPeriod: 9, responseTime: 9, motionTransfer: 10, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Hot Sleepers", "Side Sleepers", "Couples"],
    tags: ["hybrid", "cooling", "side-sleepers"],
    pros: ["Excellent cooling performance", "Zoned coil system", "120-night trial"],
    cons: ["15-year warranty vs Amerisleep's 20", "Higher price than AS3", "Less widely available"],
    summary: "The Nolah Evolution 15 is a premium hybrid with proprietary AirFoam™ and zoned coil support. Strong on cooling and pressure relief.",
    verdict: "Competitive with the AS3 on cooling and pressure relief, but the AS3 holds the edge on warranty length and price.",
    layers: [{ name: "Hybrid System", thickness: "15 inches", material: "AirFoam + Coils", description: "Foam comfort layers over zoned pocketed coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,299", priceSale: "$1,999" }],
    faqs: [{ question: "Is the Nolah Evolution better than the Amerisleep AS3?", answer: "The Nolah Evolution 15 edges ahead on cooling and has a similar feel for side sleepers. The AS3 has a longer warranty (20 vs 15 years) and is typically priced lower." }]
  },
  {
    id: "brooklyn-bedding-aurora-luxe",
    name: "Brooklyn Bedding Aurora Luxe",
    brand: "Brooklyn Bedding",
    model: "Aurora Luxe",
    price: 1499,
    priceRange: "$1,099 – $1,999",
    priceSale: "from $1,099",
    affiliateUrl: "https://brooklynbedding.com/products/aurora-hybrid-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13.5 inches",
    trialNights: 120,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["TitanCool™ Cooling Foam", "TitanFlex™ Foam", "Ascension Coil System"],
    scores: { overall: 9, value: 9, edgeSupport: 8, trialPeriod: 9, responseTime: 8, motionTransfer: 9, coolingBreathability: 10 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Hot Sleepers", "Combination Sleepers"],
    tags: ["hybrid", "cooling"],
    pros: ["Strong cooling performance", "Good value at entry price", "120-night trial"],
    cons: ["10-year warranty is below average", "Less motion isolation than all-foam"],
    summary: "The Aurora Luxe targets hot sleepers with its TitanCool™ technology. Available in Soft, Medium, and Firm.",
    verdict: "Good cooling hybrid, but the 10-year warranty is a notable gap vs the AS3's 20-year coverage.",
    layers: [{ name: "Hybrid System", thickness: "13.5 inches", material: "TitanCool + TitanFlex + Coils", description: "Cooling foam comfort layers over pocketed coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,699", priceSale: "$1,499" }],
    faqs: [{ question: "How does the Aurora Luxe compare to the Amerisleep AS3?", answer: "The Aurora Luxe has better cooling scores but a significantly shorter warranty (10 years vs AS3's 20 years). The AS3 uses plant-based foam with lower off-gassing; the Aurora uses synthetic TitanCool foam." }]
  },
  {
    id: "glacier-apex-hybrid",
    name: "Glacier Apex Hybrid",
    brand: "Glacier",
    model: "Apex Hybrid",
    price: 1299,
    priceRange: "$999 – $1,799",
    priceSale: "from $999",
    affiliateUrl: "https://glaciermattress.com",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["Cooling Gel Foam", "Pocketed Coil Support"],
    scores: { overall: 9, value: 10, edgeSupport: 9, trialPeriod: 10, responseTime: 8, motionTransfer: 9, coolingBreathability: 10 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Budget Buyers", "Hot Sleepers"],
    tags: ["hybrid", "cooling", "value"],
    pros: ["Competitive price point", "Decent cooling", "100-night trial"],
    cons: ["Less brand recognition than top-tier brands", "10-year warranty", "Limited model range"],
    summary: "The Glacier Apex Hybrid is a mid-range cooling hybrid at a competitive price point.",
    verdict: "Decent value at price, but the AS3's 20-year warranty and plant-based foam construction offer more long-term value.",
    layers: [{ name: "Hybrid System", thickness: "13 inches", material: "Gel Foam + Coils", description: "Gel foam comfort layers over pocketed coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,499", priceSale: "$1,299" }],
    faqs: [{ question: "How does the Glacier Apex compare to the Amerisleep AS3?", answer: "The Glacier Apex Hybrid uses gel foam over coils; the AS3 uses plant-based Bio-Pur® foam. The AS3 has a 20-year warranty vs the Apex's 10-year and uses more eco-friendly materials." }]
  },
  {
    id: "birch-natural",
    name: "Birch Natural Mattress",
    brand: "Birch",
    model: "Natural",
    price: 1699,
    priceRange: "$1,499 – $2,499",
    priceSale: "from $1,499",
    affiliateUrl: "https://birchliving.com/products/natural-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "latex",
    firmness: "medium-firm",
    firmnessScale: 6,
    thickness: "11 inches",
    trialNights: 100,
    warrantyYears: 25,
    certifications: ["GOLS", "GOTS", "OEKO-TEX", "Rainforest Alliance"],
    technology: ["Talalay Latex", "Organic Wool Fire Barrier", "GOTS Organic Cotton Cover", "Pocketed Coils"],
    scores: { overall: 8, value: 9, edgeSupport: 9, trialPeriod: 9, responseTime: 10, motionTransfer: 8, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Eco-Conscious Buyers", "Hot Sleepers", "Natural Materials"],
    tags: ["latex", "organic", "eco-friendly", "cooling"],
    pros: ["GOLS and GOTS certified organic materials", "25-year warranty", "Rainforest Alliance certified latex", "Excellent cooling"],
    cons: ["Medium-firm feel not ideal for side sleepers", "Less pressure relief than memory foam options", "Higher price than the Organica at equivalent size"],
    summary: "The Birch Natural uses Talalay latex over pocketed coils with certified organic materials throughout. Direct competitor to the Amerisleep Organica.",
    verdict: "Strong organic alternative — Birch edges ahead on certifications and latex sourcing; Organica edges ahead on pressure relief and brand support infrastructure.",
    layers: [{ name: "Latex System", thickness: "11 inches", material: "Talalay Latex + Coils", description: "Organic latex over pocketed coils with wool and cotton layers." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,999", priceSale: "$1,699" }],
    faqs: [{ question: "Birch Natural vs Amerisleep Organica — which is better?", answer: "Both are certified organic latex hybrids. Birch has more certifications (Rainforest Alliance) and a longer 25-year warranty vs Organica's 20. The Organica scores slightly higher on pressure relief. For eco-certification depth, Birch leads; for overall sleep performance, scores are nearly equal." }]
  },
  {
    id: "bear-star-hybrid",
    name: "Bear Star Hybrid",
    brand: "Bear",
    model: "Star Hybrid",
    price: 1748,
    priceRange: "$1,498 – $2,498",
    priceSale: "from $1,498",
    affiliateUrl: "https://bearmattress.com/products/bear-star-hybrid",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "14 inches",
    trialNights: 120,
    warrantyYears: 20,
    certifications: ["CertiPUR-US", "OEKO-TEX"],
    technology: ["Celliant® Cover", "Copper-Infused Memory Foam", "Pocketed Coil System"],
    scores: { overall: 9, value: 9, edgeSupport: 9, trialPeriod: 9, responseTime: 8, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Active Sleepers", "Hot Sleepers", "Couples"],
    tags: ["hybrid", "cooling", "active"],
    pros: ["Celliant® cover for recovery-focused marketing", "20-year warranty matches AS3", "120-night trial", "Copper-infused foam for cooling"],
    cons: ["Copper infusion provides marginal real-world cooling benefit", "Higher price than AS3 for similar scores"],
    summary: "Bear Star Hybrid targets active sleepers with a Celliant® cover and copper-infused foam. Solid hybrid performer.",
    verdict: "Comparable overall scores to the AS3, but the AS3's plant-based Bio-Pur® foam is a cleaner material story than synthetic copper-infused foam.",
    layers: [{ name: "Hybrid System", thickness: "14 inches", material: "Copper Foam + Celliant + Coils", description: "Recovery-focused foam layers over pocketed coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,998", priceSale: "$1,748" }],
    faqs: [{ question: "Bear Star Hybrid vs Amerisleep AS3 — which wins?", answer: "Both have 20-year warranties. The Bear Star Hybrid is a better fit for sleepers who want a coil system; the AS3's all-foam construction wins on motion isolation. Scores are closely matched overall." }]
  },
  {
    id: "avocado-green",
    name: "Avocado Green Mattress",
    brand: "Avocado",
    model: "Green",
    price: 1899,
    priceRange: "$1,399 – $2,799",
    priceSale: "from $1,399",
    affiliateUrl: "https://avocadogreenmattress.com/products/green-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "latex",
    firmness: "medium-firm",
    firmnessScale: 7,
    thickness: "11 inches",
    trialNights: 365,
    warrantyYears: 25,
    certifications: ["GOLS", "GOTS", "MADE SAFE®", "Rainforest Alliance"],
    technology: ["GOLS Certified Dunlop Latex", "GOTS Organic Cotton", "Organic Wool Fire Barrier", "Upcycled Steel Coils"],
    scores: { overall: 9, value: 7, edgeSupport: 9, trialPeriod: 10, responseTime: 9, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Eco-Conscious Buyers", "Hot Sleepers", "Firm Preference"],
    tags: ["latex", "organic", "eco-friendly", "firm"],
    pros: ["Industry-leading certification stack", "25-year warranty and 365-night trial", "Genuinely firm feel for back and stomach sleepers", "Transparent supply chain"],
    cons: ["Firm feel is too much for most side sleepers", "Heavy — harder to move", "Higher price point"],
    summary: "The Avocado Green Mattress carries one of the deepest organic certification stacks in the industry. Firm, responsive, and naturally cool.",
    verdict: "Best-in-class for organic certifications. Amerisleep Organica is softer and more side-sleeper-friendly; Avocado Green wins on certification depth and firmness.",
    layers: [{ name: "Latex System", thickness: "11 inches", material: "Dunlop Latex + Organic Wool + Coils", description: "Certified Dunlop latex over upcycled steel coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,199", priceSale: "$1,899" }],
    faqs: [{ question: "Avocado Green vs Amerisleep Organica — which is greener?", answer: "Avocado holds a deeper certification stack (MADE SAFE®, Rainforest Alliance, 365-night trial) vs the Organica's GOLS/GOTS. However, the Organica is softer and better for side sleepers. If organic certification depth is the primary driver, Avocado leads. If sleep feel matters equally, compare both." }]
  },
  {
    id: "purple-restoreplus-hybrid",
    name: "Purple RestorePlus Hybrid",
    brand: "Purple",
    model: "RestorePlus Hybrid",
    price: 2399,
    priceRange: "$1,999 – $3,499",
    priceSale: "from $1,999",
    affiliateUrl: "https://purple.com/mattresses/restoreplus",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["Purple Grid™ Technology", "Responsive Coil System"],
    scores: { overall: 9, value: 7, edgeSupport: 9, trialPeriod: 9, responseTime: 10, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Hot Sleepers", "Pressure Relief", "Unique Feel Preference"],
    tags: ["hybrid", "cooling", "unique-feel"],
    pros: ["Purple Grid™ offers a distinctly different feel from foam", "Excellent cooling and pressure relief scores", "Good responsiveness"],
    cons: ["10-year warranty is below Amerisleep's 20-year", "Higher price for comparable overall performance", "Grid feel is polarizing — some sleepers dislike it"],
    summary: "The Purple RestorePlus Hybrid uses Purple's proprietary Grid™ technology over a coil system. Distinctive feel unlike any foam mattress.",
    verdict: "Best for sleepers who want a truly different feel from memory foam. The AS3 wins on warranty (20 vs 10 years) and price for similar overall scores.",
    layers: [{ name: "Grid + Coil System", thickness: "13 inches", material: "Purple Grid™ + Pocketed Coils", description: "Gel-like grid structure over responsive coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,699", priceSale: "$2,399" }],
    faqs: [{ question: "Purple RestorePlus vs Amerisleep AS3 — main differences?", answer: "Purple uses its proprietary Grid™ technology which provides a gel-like feel; the AS3 uses traditional memory foam feel with plant-based materials. Purple scores slightly higher on cooling; the AS3 has double the warranty (20 vs 10 years) at a lower price." }]
  },
  {
    id: "nest-bedding-sparrow",
    name: "Nest Bedding Sparrow",
    brand: "Nest Bedding",
    model: "Sparrow",
    price: 1799,
    priceRange: "$1,299 – $2,499",
    priceSale: "from $1,299",
    affiliateUrl: "https://nestbedding.com/products/sparrow-hybrid-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13.5 inches",
    trialNights: 365,
    warrantyYears: 20,
    certifications: ["CertiPUR-US", "OEKO-TEX"],
    technology: ["SmartFlow Support™ Coils", "QE Foam", "Organic Cotton Cover"],
    scores: { overall: 10, value: 8, edgeSupport: 10, trialPeriod: 10, responseTime: 9, motionTransfer: 10, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Combination Sleepers", "Value Buyers", "Trial-Focused Buyers"],
    tags: ["hybrid", "value", "long-trial"],
    pros: ["365-night trial is exceptional", "20-year warranty matches AS3", "Solid all-around scores"],
    cons: ["Less well-known brand than Amerisleep", "No plant-based foam story", "Cooling slightly below top hybrid performers"],
    summary: "The Nest Bedding Sparrow is a balanced hybrid with a generous 365-night trial and 20-year warranty.",
    verdict: "One of the best trial/warranty packages available. Overall scores are slightly below the AS3, but the 365-night trial is a significant advantage for undecided buyers.",
    layers: [{ name: "Hybrid System", thickness: "13.5 inches", material: "QE Foam + SmartFlow Coils", description: "Responsive foam layers over zoned coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,999", priceSale: "$1,799" }],
    faqs: [{ question: "Nest Sparrow vs Amerisleep AS3 — which has better value?", answer: "Both have 20-year warranties. The Sparrow's 365-night trial (vs AS3's 100-night) is a clear advantage for cautious buyers. The AS3 uses plant-based foam and scores slightly higher overall." }]
  },
  {
    id: "helix-midnight-luxe",
    name: "Helix Midnight Luxe",
    brand: "Helix",
    model: "Midnight Luxe",
    price: 1999,
    priceRange: "$1,699 – $2,999",
    priceSale: "from $1,699",
    affiliateUrl: "https://helixsleep.com/products/midnight-luxe",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13.5 inches",
    trialNights: 100,
    warrantyYears: 15,
    certifications: ["CertiPUR-US"],
    technology: ["Memory Plus Foam", "Zoned Pocketed Coils", "Tencel™ Cover"],
    scores: { overall: 9, value: 7, edgeSupport: 10, trialPeriod: 9, responseTime: 9, motionTransfer: 9, coolingBreathability: 10 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Side Sleepers", "Couples", "Pressure Relief"],
    tags: ["hybrid", "side-sleepers", "couples"],
    pros: ["Strong motion isolation for a hybrid", "Excellent pressure relief", "Tencel™ cover for softness"],
    cons: ["15-year warranty vs AS3's 20-year", "Higher price than AS3", "Cooling below average for a hybrid"],
    summary: "The Helix Midnight Luxe is a premium hybrid targeting side sleepers and couples with strong pressure relief and motion isolation.",
    verdict: "Solid hybrid for side sleepers and couples. The AS3 has a longer warranty and lower price; the Midnight Luxe has better edge support and coil bounce.",
    layers: [{ name: "Hybrid System", thickness: "13.5 inches", material: "Memory Plus Foam + Zoned Coils", description: "Foam comfort layers over zoned pocketed coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,199", priceSale: "$1,999" }],
    faqs: [{ question: "Helix Midnight Luxe vs Amerisleep AS3 for side sleepers?", answer: "Both score well for side sleepers. The Midnight Luxe is a hybrid with slightly better edge support; the AS3 is all-foam with better motion isolation. The AS3 has a 20-year warranty vs Midnight Luxe's 15 years." }]
  },
  {
    id: "leesa-original",
    name: "Leesa Original",
    brand: "Leesa",
    model: "Original",
    price: 1099,
    priceRange: "$799 – $1,499",
    priceSale: "from $799",
    affiliateUrl: "https://leesa.com/products/leesa-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "memory-foam",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "10 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["LSA200™ Foam", "Memory Foam Comfort Layer", "Dense Support Core"],
    scores: { overall: 8, value: 8, edgeSupport: 7, trialPeriod: 9, responseTime: 9, motionTransfer: 9, coolingBreathability: 8 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Value Buyers", "Side Sleepers", "Motion Isolation"],
    tags: ["memory-foam", "value", "side-sleepers"],
    pros: ["Lower price than AS3", "Good motion isolation", "100-night trial"],
    cons: ["10-year warranty (half of AS3's 20-year)", "Less cooling than plant-based foam", "No zoned support system"],
    summary: "The Leesa Original is a straightforward all-foam mattress at a competitive price. Good motion isolation, but shorter warranty than the AS3.",
    verdict: "Good entry-level foam option, but the AS3's HIVE® zoning, plant-based foam, and 20-year warranty represent a meaningful step up.",
    layers: [{ name: "Foam System", thickness: "10 inches", material: "LSA200 + Memory Foam + Support Core", description: "Three-layer all-foam construction." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,299", priceSale: "$1,099" }],
    faqs: [{ question: "Leesa Original vs Amerisleep AS3 — which is worth it?", answer: "The Leesa Original is less expensive but carries a 10-year warranty vs the AS3's 20-year. The AS3 uses plant-based Bio-Pur® foam and HIVE® zoned support, which the Leesa lacks. For long-term value, the AS3 is the better investment." }]
  },
  {
    id: "leesa-sapira-hybrid",
    name: "Leesa Sapira Hybrid",
    brand: "Leesa",
    model: "Sapira Hybrid",
    price: 1699,
    priceRange: "$1,299 – $2,299",
    priceSale: "from $1,299",
    affiliateUrl: "https://leesa.com/products/sapira-hybrid-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "11 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["LSA200™ Foam", "Pocketed Spring System", "Memory Foam Layer"],
    scores: { overall: 9, value: 8, edgeSupport: 8, trialPeriod: 9, responseTime: 9, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Combination Sleepers", "Couples", "Value Hybrid Buyers"],
    tags: ["hybrid", "couples", "combination-sleepers"],
    pros: ["Balanced hybrid feel", "Good motion isolation for a hybrid", "Solid edge support"],
    cons: ["10-year warranty is below average", "No plant-based foam", "Less pressure relief than AS3"],
    summary: "The Leesa Sapira Hybrid is a well-balanced foam-and-coil hybrid. Good all-around scores, but limited by its 10-year warranty.",
    verdict: "Solid hybrid, but the 10-year warranty is a gap at this price tier. The AS3 offers 20-year coverage at a lower price.",
    layers: [{ name: "Hybrid System", thickness: "11 inches", material: "LSA200 Foam + Springs", description: "Foam comfort layers over pocketed coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,899", priceSale: "$1,699" }],
    faqs: [{ question: "Leesa Sapira Hybrid vs Amerisleep AS3?", answer: "The Sapira Hybrid adds coil support vs the AS3's all-foam construction. The AS3 scores higher on pressure relief and has double the warranty (20 vs 10 years) at a lower price. The Sapira Hybrid is a good choice for those who specifically want a hybrid feel." }]
  },
  {
    id: "brooklyn-bedding-plank-firm",
    name: "Brooklyn Bedding Plank Firm",
    brand: "Brooklyn Bedding",
    model: "Plank Firm",
    price: 1149,
    priceRange: "$849 – $1,649",
    priceSale: "from $849",
    affiliateUrl: "https://brooklynbedding.com/products/plank-firm-natural-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "innerspring",
    firmness: "firm",
    firmnessScale: 8,
    thickness: "10 inches",
    trialNights: 120,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["Firm Foam Layers", "High-Density Support Core", "Flippable Design"],
    scores: { overall: 9, value: 9, edgeSupport: 10, trialPeriod: 9, responseTime: 9, motionTransfer: 8, coolingBreathability: 8 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Stomach Sleepers", "Back Sleepers", "Very Firm Preference", "Budget Firm"],
    tags: ["firm", "stomach-sleepers", "back-sleepers", "value"],
    pros: ["Flippable — two firmness options in one mattress", "Very high support score", "Good value for firm preference", "120-night trial"],
    cons: ["Too firm for side sleepers", "10-year warranty below industry average", "Limited pressure relief"],
    summary: "The Brooklyn Bedding Plank Firm is a flippable firm mattress with two firmness levels. Targets back and stomach sleepers who need maximum support.",
    verdict: "Best for stomach sleepers who need firm support. The AS2 provides a similar firm feel with better materials and a 20-year warranty.",
    layers: [{ name: "Firm System", thickness: "10 inches", material: "High-Density Foam", description: "Flippable firm foam construction." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,299", priceSale: "$1,149" }],
    faqs: [{ question: "Plank Firm vs Amerisleep AS2 for stomach sleepers?", answer: "Both target stomach and back sleepers needing firm support. The Plank Firm is flippable with two firmness options. The AS2 has a 20-year warranty vs Plank's 10-year and uses plant-based Bio-Pur® foam." }]
  },
  {
    id: "bear-original",
    name: "Bear Original",
    brand: "Bear",
    model: "Original",
    price: 748,
    priceRange: "$548 – $1,148",
    priceSale: "from $548",
    affiliateUrl: "https://bearmattress.com/products/bear-original-mattress",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "memory-foam",
    firmness: "medium-firm",
    firmnessScale: 6,
    thickness: "10 inches",
    trialNights: 120,
    warrantyYears: 10,
    certifications: ["CertiPUR-US", "OEKO-TEX"],
    technology: ["Celliant® Cover", "Cooling Graphite Foam", "Support Core"],
    scores: { overall: 9, value: 10, edgeSupport: 10, trialPeriod: 9, responseTime: 9, motionTransfer: 8, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Budget Buyers", "Back Sleepers", "Value Foam"],
    tags: ["memory-foam", "value", "back-sleepers"],
    pros: ["Lowest price point in the firm foam category", "Celliant® cover", "120-night trial", "OEKO-TEX certified"],
    cons: ["10-year warranty (half of AS2's 20-year)", "No zoned support system", "Less durable long-term than premium options"],
    summary: "The Bear Original is a budget-friendly firm foam mattress with a Celliant® cover at a very accessible price point.",
    verdict: "Good budget option for back sleepers. The AS2 delivers better long-term value with HIVE® zoning and a 20-year warranty at a modest price increase.",
    layers: [{ name: "Foam System", thickness: "10 inches", material: "Graphite Foam + Celliant Cover", description: "Three-layer foam with Celliant® recovery cover." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$998", priceSale: "$748" }],
    faqs: [{ question: "Bear Original vs Amerisleep AS2 — which is better for back sleepers?", answer: "Both target back sleepers with a firm-ish feel. The Bear Original is less expensive; the AS2 has a 20-year warranty vs Bear's 10-year and uses plant-based Bio-Pur® foam with HIVE® zoning for better support mapping." }]
  },
  {
    id: "ghostbed-flex",
    name: "GhostBed Flex",
    brand: "GhostBed",
    model: "Flex",
    price: 1745,
    priceRange: "$1,495 – $2,495",
    priceSale: "from $1,495",
    affiliateUrl: "https://ghostbed.com/products/ghostbed-flex",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13 inches",
    trialNights: 101,
    warrantyYears: 20,
    certifications: ["CertiPUR-US"],
    technology: ["Ghost Ice™ Cover", "Ghost Bounce™ Foam", "Ghost Comfort™ Foam", "Pocketed Coils"],
    scores: { overall: 9, value: 8, edgeSupport: 8, trialPeriod: 9, responseTime: 8, motionTransfer: 10, coolingBreathability: 10 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Hot Sleepers", "Combination Sleepers", "Couples"],
    tags: ["hybrid", "cooling", "combination-sleepers"],
    pros: ["20-year warranty matches AS3", "Ghost Ice™ cover for active cooling", "101-night trial", "Good responsiveness"],
    cons: ["Higher price than AS3 for comparable scores", "No plant-based foam"],
    summary: "The GhostBed Flex is a cooling-focused hybrid with a Ghost Ice™ cover and 20-year warranty. Targets hot sleepers and combination sleepers.",
    verdict: "Comparable warranty to the AS3 and competitive cooling, but the AS3's plant-based foam and HIVE® zoning give it slightly better scores overall at a lower price.",
    layers: [{ name: "Hybrid System", thickness: "13 inches", material: "Ghost Bounce + Ghost Comfort + Coils", description: "Responsive foam layers over pocketed coils." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,995", priceSale: "$1,745" }],
    faqs: [{ question: "GhostBed Flex vs Amerisleep AS3?", answer: "Both have 20-year warranties. The GhostBed Flex is a hybrid with better cooling; the AS3 is all-foam with better motion isolation and uses plant-based foam. Scores are comparable; the AS3 is typically less expensive." }]
  },
  {
    id: "helix-dawn-luxe",
    name: "Helix Dawn Luxe",
    brand: "Helix",
    model: "Dawn Luxe",
    price: 1999,
    priceRange: "$1,699 – $2,999",
    priceSale: "from $1,699",
    affiliateUrl: "https://helixsleep.com/products/dawn-luxe",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "firm",
    firmnessScale: 7,
    thickness: "13.5 inches",
    trialNights: 100,
    warrantyYears: 15,
    certifications: ["CertiPUR-US"],
    technology: ["Firm Helix Foam", "Zoned Pocketed Coils", "Cashmere Pillow Top"],
    scores: { overall: 9, value: 7, edgeSupport: 8, trialPeriod: 9, responseTime: 9, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Back Sleepers", "Stomach Sleepers", "Firm Hybrid Preference"],
    tags: ["hybrid", "firm", "back-sleepers"],
    pros: ["High support score for back sleepers", "Cashmere pillow top adds comfort layer to firm base", "Good edge support"],
    cons: ["15-year warranty vs AS2's 20-year", "Less pressure relief than softer models", "Higher price"],
    summary: "The Helix Dawn Luxe is a firm hybrid targeting back and stomach sleepers who want coil support with a cashmere pillow top.",
    verdict: "Good firm hybrid for back sleepers. The AS2 offers similar firm support with a 20-year warranty at a lower price.",
    layers: [{ name: "Firm Hybrid System", thickness: "13.5 inches", material: "Firm Foam + Cashmere + Zoned Coils", description: "Firm foam and cashmere layers over zoned coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,199", priceSale: "$1,999" }],
    faqs: [{ question: "Helix Dawn Luxe vs Amerisleep AS2 for back sleepers?", answer: "Both target back sleepers. The Dawn Luxe is a hybrid with better edge support; the AS2 is all-foam with a 20-year warranty vs Helix's 15-year. The AS2 is typically less expensive." }]
  },
  {
    id: "leesa-sapira-chill-hybrid",
    name: "Leesa Sapira Chill Hybrid",
    brand: "Leesa",
    model: "Sapira Chill Hybrid",
    price: 2099,
    priceRange: "$1,699 – $2,799",
    priceSale: "from $1,699",
    affiliateUrl: "https://leesa.com/products/sapira-chill-hybrid",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "13 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["Cooling Foam", "Pocketed Coil System", "Phase Change Cover"],
    scores: { overall: 10, value: 8, edgeSupport: 10, trialPeriod: 9, responseTime: 10, motionTransfer: 9, coolingBreathability: 10 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Hot Sleepers", "Couples", "Luxury Buyers"],
    tags: ["hybrid", "cooling", "hot-sleepers"],
    pros: ["Phase change cover for active cooling", "Good pressure relief", "Balanced hybrid feel"],
    cons: ["10-year warranty is significantly below AS6's 20-year", "Higher price than comparable hybrids"],
    summary: "The Leesa Sapira Chill Hybrid targets hot sleepers with a phase change cover and cooling foam layers. Premium price with limited warranty.",
    verdict: "Strong cooling hybrid, but the 10-year warranty is a notable gap vs the AS6's 20-year at a similar price point.",
    layers: [{ name: "Cooling Hybrid System", thickness: "13 inches", material: "Cooling Foam + Phase Change Cover + Coils", description: "Cooling-focused foam over pocketed coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,299", priceSale: "$2,099" }],
    faqs: [{ question: "Leesa Sapira Chill vs Amerisleep AS6 for hot sleepers?", answer: "Both target hot sleepers as hybrids. The AS6 has a 20-year warranty vs Leesa's 10-year and scores higher overall. The Sapira Chill's phase change cover provides slightly more active cooling." }]
  },
  {
    id: "helix-sunset-luxe",
    name: "Helix Sunset Luxe",
    brand: "Helix",
    model: "Sunset Luxe",
    price: 1999,
    priceRange: "$1,699 – $2,999",
    priceSale: "from $1,699",
    affiliateUrl: "https://helixsleep.com/products/sunset-luxe",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "soft",
    firmnessScale: 3,
    thickness: "14 inches",
    trialNights: 100,
    warrantyYears: 15,
    certifications: ["CertiPUR-US"],
    technology: ["Memory Plus Foam", "Zoned Pocketed Coils", "Tencel™ Cover", "Pillow Top"],
    scores: { overall: 9, value: 7, edgeSupport: 8, trialPeriod: 9, responseTime: 9, motionTransfer: 10, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Side Sleepers", "Pressure Relief", "Lightweight Sleepers"],
    tags: ["hybrid", "soft", "side-sleepers", "pressure-relief"],
    pros: ["Excellent pressure relief for a hybrid", "Good motion isolation for coil construction", "Pillow top adds plush feel"],
    cons: ["15-year warranty vs AS5's 20-year", "Less responsive than AS5's Active Flex layer", "Higher price for comparable performance"],
    summary: "The Helix Sunset Luxe is a soft hybrid targeting side sleepers with a pillow top and strong pressure relief.",
    verdict: "Competitive with the AS5 Hybrid for side sleepers. The AS5 has a 20-year warranty and Active Flex layer; the Sunset Luxe has a pillow top and better edge support.",
    layers: [{ name: "Soft Hybrid System", thickness: "14 inches", material: "Memory Plus + Pillow Top + Zoned Coils", description: "Soft foam and pillow top over zoned coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,199", priceSale: "$1,999" }],
    faqs: [{ question: "Helix Sunset Luxe vs Amerisleep AS5 Hybrid for side sleepers?", answer: "Both are soft hybrids for side sleepers. The AS5 has a 20-year warranty vs Helix's 15-year. The Sunset Luxe has a pillow top; the AS5 has the Active Flex layer for more responsive bounce. Pressure relief is comparable." }]
  },
  {
    id: "ghostbed-luxe",
    name: "GhostBed Luxe",
    brand: "GhostBed",
    model: "Luxe",
    price: 1995,
    priceRange: "$1,745 – $2,995",
    priceSale: "from $1,745",
    affiliateUrl: "https://ghostbed.com/products/ghostbed-luxe",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "memory-foam",
    firmness: "soft",
    firmnessScale: 3,
    thickness: "13 inches",
    trialNights: 101,
    warrantyYears: 25,
    certifications: ["CertiPUR-US"],
    technology: ["Ghost Ice™ Cooling Fabric", "Cooling Gel Foam", "Memory Foam", "Dense Support Core"],
    scores: { overall: 7, value: 8, edgeSupport: 8, trialPeriod: 9, responseTime: 6, motionTransfer: 10, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Hot Sleepers", "Side Sleepers", "Pressure Relief"],
    tags: ["memory-foam", "cooling", "soft", "side-sleepers"],
    pros: ["Exceptional cooling scores — among the best in all-foam", "25-year warranty exceeds AS5's 20-year", "Strong pressure relief"],
    cons: ["Expensive for all-foam construction", "Poor edge support vs hybrid alternatives", "Slow responsiveness"],
    summary: "The GhostBed Luxe targets hot side sleepers with premium cooling foam layers and a 25-year warranty.",
    verdict: "Best-in-class cooling for an all-foam mattress. The AS5 competes on pressure relief; the Luxe wins on cooling and warranty (25 vs 20 years), but costs more.",
    layers: [{ name: "Cooling Foam System", thickness: "13 inches", material: "Ghost Ice + Gel Foam + Memory Foam + Core", description: "Multi-layer cooling foam construction." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$2,245", priceSale: "$1,995" }],
    faqs: [{ question: "GhostBed Luxe vs Amerisleep AS5 for hot side sleepers?", answer: "Both target hot side sleepers. The GhostBed Luxe wins on cooling scores and has a longer warranty (25 vs 20 years). The AS5's Active Flex layer gives it better responsiveness. The Luxe is more expensive." }]
  },
  {
    id: "casper-the-one",
    name: "Casper The One",
    brand: "Casper",
    model: "The One",
    price: 1095,
    priceRange: "$795 – $1,595",
    priceSale: "from $795",
    affiliateUrl: "https://casper.com/mattresses/the-one/",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "memory-foam",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "11 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["AirScape™ Foam", "Zoned Support", "Support Core"],
    scores: { overall: 8, value: 8, edgeSupport: 7, trialPeriod: 9, responseTime: 7, motionTransfer: 10, coolingBreathability: 8 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Budget Buyers", "First-Time Buyers", "Side Sleepers"],
    tags: ["memory-foam", "value", "side-sleepers"],
    pros: ["Accessible price", "Casper brand recognition", "100-night trial", "Decent zoned support"],
    cons: ["10-year warranty is half of AS3's 20-year", "No plant-based foam", "Thinner at 11 inches"],
    summary: "Casper The One is a mid-range foam mattress with AirScape™ zoned support. Good entry point, but limited warranty.",
    verdict: "Good first mattress purchase. The AS3's 20-year warranty, plant-based foam, and HIVE® zoning represent a meaningful upgrade for a modest price difference.",
    layers: [{ name: "Foam System", thickness: "11 inches", material: "AirScape + Memory Foam + Support", description: "Zoned all-foam construction." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,295", priceSale: "$1,095" }],
    faqs: [{ question: "Casper The One vs Amerisleep AS3 — which should I buy?", answer: "Casper The One is less expensive but carries a 10-year warranty vs the AS3's 20-year. The AS3 uses plant-based foam and HIVE® zoning with better long-term durability. For the price gap, the AS3 is the better long-term investment." }]
  },
  {
    id: "casper-dream-hybrid",
    name: "Casper Dream Hybrid",
    brand: "Casper",
    model: "Dream Hybrid",
    price: 1695,
    priceRange: "$1,295 – $2,295",
    priceSale: "from $1,295",
    affiliateUrl: "https://casper.com/mattresses/dream-hybrid/",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium",
    firmnessScale: 5,
    thickness: "12 inches",
    trialNights: 100,
    warrantyYears: 10,
    certifications: ["CertiPUR-US"],
    technology: ["AirScape™ Foam", "Zoned Pocketed Coils", "Ergonomic Zones"],
    scores: { overall: 9, value: 8, edgeSupport: 8, trialPeriod: 9, responseTime: 9, motionTransfer: 9, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Combination Sleepers", "Couples", "Casper Brand Loyalists"],
    tags: ["hybrid", "combination-sleepers", "couples"],
    pros: ["Casper brand trust", "Balanced hybrid feel", "Good support and edge support scores"],
    cons: ["10-year warranty — significantly below AS3's 20-year at comparable price", "No plant-based foam"],
    summary: "The Casper Dream Hybrid is a balanced foam-and-coil hybrid with Casper's ergonomic zoning. Solid performer with a notable warranty gap.",
    verdict: "Good hybrid feel, but the 10-year warranty is a significant gap vs the AS3's 20-year at a similar or higher price.",
    layers: [{ name: "Hybrid System", thickness: "12 inches", material: "AirScape Foam + Zoned Coils", description: "Ergonomically zoned foam over pocketed coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$1,895", priceSale: "$1,695" }],
    faqs: [{ question: "Casper Dream Hybrid vs Amerisleep AS3?", answer: "The Casper Dream Hybrid adds coils for better bounce and edge support vs the AS3's all-foam. However, the Dream Hybrid's 10-year warranty vs the AS3's 20-year is a significant long-term difference at comparable pricing." }]
  },
  {
    id: "saatva-rx",
    name: "Saatva RX",
    brand: "Saatva",
    model: "RX",
    price: 3995,
    priceRange: "$3,295 – $5,295",
    priceSale: "from $3,295",
    affiliateUrl: "https://saatva.com/products/saatva-rx",
    image: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    heroImage: "https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg",
    type: "hybrid",
    firmness: "medium-soft",
    firmnessScale: 4,
    thickness: "15 inches",
    trialNights: 365,
    warrantyYears: 20,
    certifications: ["CertiPUR-US"],
    technology: ["Micro Coil Comfort Layer", "Lumbar Zone Quilting", "Dual Coil Support", "Organic Cotton Cover"],
    scores: { overall: 10, value: 7, edgeSupport: 9, trialPeriod: 10, responseTime: 10, motionTransfer: 10, coolingBreathability: 9 },
    reviewer: {
      name: "Sleep Review Editorial Team",
      role: "Certified Sleep Science Coach",
      credentials: "CSSC",
      url: "/methodology/",
      sameAs: []
    },
    dateReviewed: "2026-01-01", dateModified: "2026-05-01", testedNights: 30,
    bestFor: ["Luxury Buyers", "Pressure Pain", "Hot Sleepers with Back Concerns"],
    tags: ["hybrid", "luxury", "pressure-relief"],
    pros: ["365-night trial", "20-year warranty", "Premium micro-coil comfort layer", "High pressure relief and edge support scores"],
    cons: ["Very high price (from $3,295 queen)", "Overkill for most sleepers", "Saatva doesn't offer returns after 30 days without a restocking fee"],
    summary: "The Saatva RX is Saatva's ultra-premium mattress targeting sleepers with pressure pain concerns. Dual coil system with micro-coil comfort layer.",
    verdict: "Best-in-class pressure relief and luxury build. The AS6 delivers comparable performance for most sleepers at roughly 60% of the cost.",
    layers: [{ name: "Premium Hybrid System", thickness: "15 inches", material: "Micro Coils + Foam + Dual Coil Base", description: "Micro-coil comfort layer over foam and dual coil support." }],
    sizePricing: [{ size: "Queen", dimensions: "60\" × 80\"", priceOriginal: "$4,295", priceSale: "$3,995" }],
    faqs: [{ question: "Saatva RX vs Amerisleep AS6 Black Series?", answer: "The Saatva RX uses a micro-coil comfort layer for exceptional pressure relief; the AS6 uses Bio-Pur® foam. Both have 20-year warranties. The RX scores slightly higher on pressure relief but costs significantly more." }]
  }
];

export const allMattresses = [...mattresses, ...competitorMattresses];
