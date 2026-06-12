export interface Comparison {
  slug: string;
  mattressAId: string;
  mattressBId: string;
  title: string;
  description: string;
  verdict: string;
  dateModified: string;
  winnerFor: {
    category: string;
    winnerId: string;
    reason: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const comparisons: Comparison[] = [
  {
    slug: "amerisleep-as2-vs-as3",
    mattressAId: "amerisleep-as2",
    mattressBId: "amerisleep-as3",
    title: "Amerisleep AS2 vs AS3",
    description: "The two most popular Amerisleep mattresses compared head-to-head. Same technology, different firmness — how to choose.",
    verdict: "The AS3 wins for side sleepers and combination sleepers who need pressure relief. The AS2 wins for back sleepers, stomach sleepers, and heavier individuals who need firmer support to prevent lumbar sinkage.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Side Sleepers", winnerId: "amerisleep-as3", reason: "Softer 3\" comfort layer relieves shoulder and hip pressure better than the AS2's 2\" layer." },
      { category: "Back Sleepers", winnerId: "amerisleep-as2", reason: "Medium-firm (6/10) prevents lumbar sinkage that strains the lower back." },
      { category: "Stomach Sleepers", winnerId: "amerisleep-as2", reason: "Firmer feel keeps hips elevated to maintain spinal alignment." },
      { category: "Back Pain (Support)", winnerId: "amerisleep-as2", reason: "Higher support score (9.7 vs 9.6) with firmer feel prevents the hip sinkage that causes lower back pain." },
      { category: "Best Value", winnerId: "amerisleep-as2", reason: "Lower starting price ($799 vs $999) with the same core technology." },
      { category: "Pressure Relief", winnerId: "amerisleep-as3", reason: "Thicker comfort layer and softer feel scores 9.3/10 vs 8.8/10 for the AS2." }
    ],
    faqs: [
      {
        question: "What is the actual difference between the AS2 and AS3?",
        answer: "The AS2 and AS3 use identical materials — Bio-Pur® foam, HIVE® zoning, Refresh cover, Bio-Core® base. The sole difference is the comfort layer: the AS3 has a 3-inch Bio-Pur® layer (medium, 5/10 firmness) while the AS2 has a 2-inch layer (medium-firm, 6/10). Everything else is the same."
      },
      {
        question: "Which is better for couples?",
        answer: "Both have strong motion isolation due to all-foam construction. The right choice depends on the dominant sleep position: if both partners are side sleepers, go AS3. If one is a back or stomach sleeper, go AS2. If partners have different firmness preferences, consider two separate Twin XLs on a Split King adjustable base."
      },
      {
        question: "Is the AS2 or AS3 better for heavy people?",
        answer: "The AS2 is generally better for heavier sleepers (230+ lbs) because the firmer feel prevents excessive sinkage. The slightly thicker 8\" Bio-Core® base in the AS2 vs the 7\" base in the AS3 also provides more long-term structural support under higher weight loads."
      },
      {
        question: "Can I return and exchange if I choose wrong?",
        answer: "Yes. Amerisleep's 100-night trial covers both models. If you choose the AS2 and find it too firm, or the AS3 and find it too soft, you can return it within 100 nights (after at least 30 nights) for a full refund and reorder the other model."
      }
    ]
  },
  {
    slug: "amerisleep-as3-vs-as5",
    mattressAId: "amerisleep-as3",
    mattressBId: "amerisleep-as5",
    title: "Amerisleep AS3 vs AS5",
    description: "Medium vs soft — how the AS3 and AS5 differ in construction, feel, and ideal sleeper types.",
    verdict: "The AS3 wins for most sleepers due to its versatile medium feel. The AS5 wins specifically for side sleepers with shoulder or hip pain, or anyone who sleeps predominantly on their side and prefers a plush, cloud-like surface.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Side Sleepers (Pressure Pain)", winnerId: "amerisleep-as5", reason: "Maximum pressure relief score (9.8/10) — best in the entire lineup for shoulder and hip pain." },
      { category: "Back Sleepers", winnerId: "amerisleep-as3", reason: "Medium feel maintains spinal alignment; AS5's soft feel can cause lumbar sinkage for back sleepers." },
      { category: "Combination Sleepers", winnerId: "amerisleep-as3", reason: "Medium feel suits both side and back positions; AS5 is too soft for back sleeping." },
      { category: "Responsiveness", winnerId: "amerisleep-as5", reason: "Active Flex layer in the AS5 adds bounce, making position changes easier despite the soft feel (8.8 vs 8.2)." },
      { category: "Value", winnerId: "amerisleep-as3", reason: "Lower price ($999 vs $1,599 queen) for a more versatile mattress." },
      { category: "Motion Isolation", winnerId: "amerisleep-as5", reason: "Deeper comfort layers absorb more motion (9.4 vs 9.1)." }
    ],
    faqs: [
      {
        question: "What is the Active Flex layer in the AS5 and why doesn't the AS3 have it?",
        answer: "Active Flex is a latex-like responsive foam layer exclusive to the AS5. It adds springy bounce between the soft Bio-Pur® comfort layer and the HIVE® transition layer. Without it, a 4-inch soft foam comfort layer would feel like quicksand. The AS3's medium feel doesn't require this bounce layer because the shorter 3-inch comfort layer at medium firmness is responsive enough on its own."
      },
      {
        question: "Is the AS5 too soft for a 180 lb back sleeper?",
        answer: "Yes, almost certainly. At soft (3/10), a 180 lb back sleeper would sink too deeply through the 4-inch comfort layer, causing lumbar strain. The AS3 at medium (5/10) or the AS2 at medium-firm (6/10) would be more appropriate for back sleeping at that weight."
      },
      {
        question: "How much taller is the AS5 than the AS3?",
        answer: "The AS5 is 14 inches tall vs 12 inches for the AS3 — a 2-inch difference. The extra height comes from the thicker 4\" comfort layer (vs 3\" in AS3) and the additional Active Flex layer (2\") that the AS3 doesn't have."
      }
    ]
  },
  {
    slug: "amerisleep-as3-vs-as6",
    mattressAId: "amerisleep-as3",
    mattressBId: "amerisleep-as6",
    title: "Amerisleep AS3 vs AS6 Black Series",
    description: "All-foam vs hybrid — the AS3 and AS6 share DNA but differ fundamentally in construction and performance.",
    verdict: "The AS3 wins on value and motion isolation. The AS6 wins on every performance metric — edge support, cooling, responsiveness, and overall score — making it the right choice for those who can invest in the flagship.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Overall Score", winnerId: "amerisleep-as6", reason: "9.7 vs 9.5 — the highest-scoring mattress in the lineup." },
      { category: "Cooling", winnerId: "amerisleep-as6", reason: "Pocketed coil airflow chamber scores 9.4 vs 8.8 for the all-foam AS3." },
      { category: "Edge Support", winnerId: "amerisleep-as6", reason: "Pocketed coil perimeter scores 9.6 vs 8.5 — significant real-world difference for couples." },
      { category: "Value", winnerId: "amerisleep-as3", reason: "$999 vs $2,399 — the AS3 delivers 97% of the performance at 42% of the cost." },
      { category: "Motion Isolation", winnerId: "amerisleep-as3", reason: "All-foam construction absorbs motion better (9.1 vs 9.0) — though the difference is minimal." },
      { category: "Hot Sleepers", winnerId: "amerisleep-as6", reason: "Coil airflow makes it measurably cooler for those who sleep especially warm." }
    ],
    faqs: [
      {
        question: "Is the AS6 worth the extra $1,400 over the AS3?",
        answer: "It depends on your priorities. If cooling, edge support, and bounce are important — especially for couples or hot sleepers — the AS6's coil-based construction delivers measurably better performance (9.7 vs 9.5 overall). If value is the priority and you don't sleep especially hot, the AS3 delivers exceptional performance for $999. Most people choose the AS3; those who upgrade to the AS6 consistently rate it higher."
      },
      {
        question: "Which is better for couples?",
        answer: "The AS6 is better for couples for two reasons: edge support (9.6/10 means both partners can sleep to the full edge without roll-off) and cooling (coil airflow keeps both partners cooler). The only advantage the AS3 has is marginally better motion isolation (9.1 vs 9.0), but both are excellent."
      },
      {
        question: "Does the AS6 feel like a foam mattress or a coil mattress?",
        answer: "The AS6 feels like a high-end hybrid — you get the pressure-relieving contouring of the Bio-Pur® foam on top, with the responsive bounce and edge support of pocketed coils beneath. It doesn't feel like a traditional innerspring. Most sleepers describe it as the AS3's comfort with more 'lift' and bounce."
      }
    ]
  },
  {
    slug: "amerisleep-as3-vs-organica",
    mattressAId: "amerisleep-as3",
    mattressBId: "amerisleep-organica",
    title: "Amerisleep AS3 vs Organica",
    description: "Memory foam vs natural latex — the fundamental material difference between Amerisleep's most popular and most natural mattresses.",
    verdict: "The AS3 wins for those who prefer the classic memory foam feel, want the widest size selection, or are on a tighter budget. The Organica wins for eco-conscious buyers, allergy sufferers, and those who prefer the responsive bouncy feel of natural latex.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Eco-Conscious / Natural Materials", winnerId: "amerisleep-organica", reason: "GOTS, GOLS, and Rainforest Alliance certified. No synthetic foams, no petroleum materials." },
      { category: "Cooling", winnerId: "amerisleep-organica", reason: "9.5 vs 8.8 — organic wool moisture wicking plus latex breathability outperforms foam." },
      { category: "Responsiveness / Bounce", winnerId: "amerisleep-organica", reason: "9.6 vs 8.2 — natural latex bounces back instantly vs memory foam's slow response." },
      { category: "Allergy Sufferers", winnerId: "amerisleep-organica", reason: "Natural latex is inherently hypoallergenic, antimicrobial, and dust-mite resistant without chemical treatments." },
      { category: "Value", winnerId: "amerisleep-as3", reason: "$999 vs $1,199 queen, plus broader size availability including Twin." },
      { category: "Motion Isolation", winnerId: "amerisleep-as3", reason: "All-foam construction absorbs motion better (9.1 vs 8.7) — relevant for light sleeper couples." }
    ],
    faqs: [
      {
        question: "What does 'GOLS certified' mean for the Organica?",
        answer: "GOLS stands for Global Organic Latex Standard — the most rigorous certification for organic latex. It verifies that the latex comes from organically farmed rubber trees, processed without synthetic chemicals, with documented supply chain traceability. The Organica's latex layer is GOLS certified, meaning it meets strict organic and environmental standards from farm to finished product."
      },
      {
        question: "Does the Organica feel completely different from the AS3?",
        answer: "Yes, meaningfully different. The AS3 has the classic memory foam feel — slow contouring, pressure-relieving 'hug', gradual bounce-back. The Organica with natural latex has a buoyant, instantly responsive feel — you float on top rather than sinking in. Most sleepers know within a few nights which they prefer. Both offer medium firmness (5/10) but the underlying feel is distinctly different."
      },
      {
        question: "Is the Organica available in Twin size?",
        answer: "No — the Organica comes in Twin XL, Full, Queen, King, and Cal King only. The AS3 is available in all sizes including standard Twin and Split King. If you need a standard Twin, the AS3 is your option."
      }
    ]
  },
  {
    slug: "amerisleep-as2-vs-as5",
    mattressAId: "amerisleep-as2",
    mattressBId: "amerisleep-as5",
    title: "Amerisleep AS2 vs AS5",
    description: "The firmest vs the softest in the Amerisleep foam lineup — opposite ends of the comfort spectrum.",
    verdict: "These two mattresses serve opposite sleep needs. The AS2 is for back and stomach sleepers who need firm support. The AS5 is for side sleepers who need maximum pressure relief. There is minimal overlap in ideal users.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Back Sleepers", winnerId: "amerisleep-as2", reason: "Medium-firm (6/10) maintains lumbar alignment; AS5's soft feel (3/10) allows harmful hip sinkage for back sleepers." },
      { category: "Stomach Sleepers", winnerId: "amerisleep-as2", reason: "Firmer feel keeps hips elevated. AS5 is completely unsuitable for stomach sleeping." },
      { category: "Side Sleepers (Pressure Pain)", winnerId: "amerisleep-as5", reason: "Maximum pressure relief score (9.8/10) specifically targets shoulder and hip pain." },
      { category: "Heavier Sleepers (230+ lbs)", winnerId: "amerisleep-as2", reason: "Firmer feel and thicker base core prevents excessive sinkage at higher body weights." },
      { category: "Value", winnerId: "amerisleep-as2", reason: "$799 vs $1,599 queen — significant price difference for opposite use cases." }
    ],
    faqs: [
      {
        question: "Who should never buy the AS5?",
        answer: "Back sleepers, stomach sleepers, and heavy sleepers over 250 lbs should avoid the AS5. The soft feel (3/10) with a 4\" comfort layer allows too much sinkage for proper spinal alignment in back and stomach positions. The AS2 or AS3 is more appropriate for these groups."
      },
      {
        question: "Who should never buy the AS2?",
        answer: "Lightweight side sleepers under 150 lbs who experience shoulder or hip pressure pain should avoid the AS2. The firmer feel doesn't allow enough shoulder sinkage for lateral pressure relief. The AS3 or AS5 would be more appropriate."
      },
      {
        question: "Which one sleeps cooler?",
        answer: "The AS2 typically sleeps slightly cooler than the AS5. The AS5's deep plush layers envelop the body more, which can trap more heat compared to the AS2's firmer surface that keeps you sleeping on top of the mattress."
      }
    ]
  },
  {
    slug: "amerisleep-as6-vs-organica",
    mattressAId: "amerisleep-as6",
    mattressBId: "amerisleep-organica",
    title: "Amerisleep AS6 vs Organica",
    description: "Two hybrid mattresses at the premium tier — synthetic foam vs natural latex, compared in detail.",
    verdict: "The AS6 wins on overall performance score and is better for hot sleepers and luxury seekers. The Organica wins for eco-conscious buyers and those who specifically prefer natural materials and the responsive feel of latex.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Overall Score", winnerId: "amerisleep-as6", reason: "9.7 vs 9.3 — the AS6 leads in support, pressure relief, and edge support." },
      { category: "Natural / Organic Materials", winnerId: "amerisleep-organica", reason: "GOTS, GOLS, Rainforest Alliance certified. No synthetic foams whatsoever." },
      { category: "Responsiveness", winnerId: "amerisleep-organica", reason: "Natural latex bounces back faster (9.6 vs 9.3)." },
      { category: "Edge Support", winnerId: "amerisleep-as6", reason: "Reinforced coil perimeter scores 9.6 vs 9.0 for the Organica." },
      { category: "Allergy Sufferers", winnerId: "amerisleep-organica", reason: "Natural latex is inherently hypoallergenic; organic cotton and wool are chemical-free." }
    ],
    faqs: [
      {
        question: "Both are hybrids — what's the structural difference?",
        answer: "Both use pocketed coils for support, but the comfort systems are completely different. The AS6 uses Bio-Pur® synthetic plant-based memory foam for its comfort layer — slow contouring, deep pressure relief. The Organica uses GOLS certified natural latex — instant bounce-back, buoyant feel. The feel is dramatically different despite both being hybrids."
      },
      {
        question: "Which is better for a couple where one partner sleeps hot?",
        answer: "Both are excellent for hot sleepers due to their hybrid construction. The AS6 has a slight edge in our cooling tests (9.4 vs 9.5 for the Organica), but the difference is minimal. The deciding factor should be feel preference: memory foam (AS6) vs natural latex (Organica)."
      },
      {
        question: "Does the Organica smell when unpacked?",
        answer: "Because the Organica uses natural latex, wool, and cotton rather than petroleum-based foams, it does not have the typical chemical off-gassing smell associated with memory foam. You may notice an earthy or sweet scent from the latex, but it dissipates quickly."
      }
    ]
  }
,

  {
    slug: "amerisleep-as3-vs-saatva-classic",
    mattressAId: "amerisleep-as3",
    mattressBId: "saatva-classic",
    title: "Amerisleep AS3 vs Saatva Classic",
    description: "Plant-based memory foam vs luxury innerspring hybrid. Two very different constructions at similar price points.",
    verdict: "The AS3 wins for motion isolation, warranty (20 vs 15 years), side sleepers, and value. The Saatva Classic wins for cooling, edge support, and the feel of a traditional coil mattress.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Motion Isolation", winnerId: "amerisleep-as3", reason: "All-foam absorbs motion significantly better than a dual-coil system." },
      { category: "Cooling", winnerId: "saatva-classic", reason: "Dual coil construction allows more airflow than all-foam." },
      { category: "Edge Support", winnerId: "saatva-classic", reason: "Innerspring perimeter provides firmer edge than foam." },
      { category: "Warranty", winnerId: "amerisleep-as3", reason: "20-year warranty vs Saatva's 15-year." },
      { category: "Value", winnerId: "amerisleep-as3", reason: "Lower starting price with comparable or better overall scores." },
      { category: "Side Sleepers", winnerId: "amerisleep-as3", reason: "Bio-Pur foam with HIVE zoning scores higher on pressure relief." }
    ],
    faqs: [
      { question: "AS3 vs Saatva Classic — which is better for side sleepers?", answer: "The AS3 is better for most side sleepers due to superior pressure relief and motion isolation from its all-foam construction. The Saatva's innerspring feel suits back sleepers more." },
      { question: "Which has the better warranty?", answer: "The AS3 carries a 20-year warranty vs Saatva's 15-year, both non-prorated." }
    ]
  },
  {
    slug: "amerisleep-as3-vs-nolah-evolution-15",
    mattressAId: "amerisleep-as3",
    mattressBId: "nolah-evolution-15",
    title: "Amerisleep AS3 vs Nolah Evolution 15",
    description: "Amerisleep's memory foam vs Nolah's luxury hybrid.",
    verdict: "AS3 provides better value and closer contouring. Nolah Evolution 15 is taller and has more bounce due to its coils.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Value", winnerId: "amerisleep-as3", reason: "Lower price point for comparable luxury features." },
      { category: "Cooling", winnerId: "nolah-evolution-15", reason: "Coils allow for superior airflow." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-brooklyn-bedding-aurora-luxe",
    mattressAId: "amerisleep-as3",
    mattressBId: "brooklyn-bedding-aurora-luxe",
    title: "Amerisleep AS3 vs Brooklyn Bedding Aurora Luxe",
    description: "Amerisleep vs a cooling-focused hybrid.",
    verdict: "Aurora Luxe wins slightly on cooling, but AS3 offers better motion isolation and pressure relief for side sleepers.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Pressure Relief", winnerId: "amerisleep-as3", reason: "Advanced Bio-Pur foam closely conforms to joints." },
      { category: "Cooling", winnerId: "brooklyn-bedding-aurora-luxe", reason: "Phase change surface panel." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-glacier-apex-hybrid",
    mattressAId: "amerisleep-as3",
    mattressBId: "glacier-apex-hybrid",
    title: "Amerisleep AS3 vs Glacier Apex Hybrid",
    description: "All-foam AS3 vs hybrid.",
    verdict: "AS3 remains standard for pressure relief and value.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-organica-vs-birch-natural",
    mattressAId: "amerisleep-organica",
    mattressBId: "birch-natural",
    title: "Amerisleep Organica vs Birch Natural",
    description: "Two popular organic latex hybrids.",
    verdict: "Organica's Talalay latex provides slightly better contouring. Birch uses slightly firmer Talalay.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Pressure Relief", winnerId: "amerisleep-organica", reason: "Slightly softer latex finish contours better." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-bear-star-hybrid",
    mattressAId: "amerisleep-as3",
    mattressBId: "bear-star-hybrid",
    title: "Amerisleep AS3 vs Bear Star Hybrid",
    description: "Comparing two recovery-focused brands.",
    verdict: "AS3 isolates motion better; Bear Star Hybrid adds Celliant technology.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-organica-vs-avocado-green",
    mattressAId: "amerisleep-organica",
    mattressBId: "avocado-green",
    title: "Amerisleep Organica vs Avocado Green",
    description: "Top natural organic choices.",
    verdict: "Organica is distinctly softer and better for side sleepers, whereas Avocado Green is quite firm without its topper.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Side Sleepers", winnerId: "amerisleep-organica", reason: "More accommodating surface than base Avocado." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-purple-restoreplus-hybrid",
    mattressAId: "amerisleep-as3",
    mattressBId: "purple-restoreplus-hybrid",
    title: "Amerisleep AS3 vs Purple RestorePlus Hybrid",
    description: "Bio-Pur foam vs Purple Grid.",
    verdict: "Purple excels in cooling, AS3 excels in classic contouring and value.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Cooling", winnerId: "purple-restoreplus-hybrid", reason: "Open grid structure." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-nest-bedding-sparrow",
    mattressAId: "amerisleep-as3",
    mattressBId: "nest-bedding-sparrow",
    title: "Amerisleep AS3 vs Nest Bedding Sparrow",
    description: "All foam vs interchangeable hybrid.",
    verdict: "AS3 is purely focused on zoned support and foam durability.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-helix-midnight-luxe",
    mattressAId: "amerisleep-as3",
    mattressBId: "helix-midnight-luxe",
    title: "Amerisleep AS3 vs Helix Midnight Luxe",
    description: "Two popular medium-feel side-sleeper beds.",
    verdict: "Both offer excellent pressure relief; AS3 has better motion isolation due to all-foam design.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Motion Isolation", winnerId: "amerisleep-as3", reason: "Foam absorbs movement completely." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-leesa-original",
    mattressAId: "amerisleep-as3",
    mattressBId: "leesa-original",
    title: "Amerisleep AS3 vs Leesa Original",
    description: "All-foam bed comparison.",
    verdict: "AS3 features better zoned support (HIVE) and higher quality plant-based foams.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Support", winnerId: "amerisleep-as3", reason: "HIVE zoning provides dynamic lumbar reinforcement." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-leesa-sapira-hybrid",
    mattressAId: "amerisleep-as3",
    mattressBId: "leesa-sapira-hybrid",
    title: "Amerisleep AS3 vs Leesa Sapira Hybrid",
    description: "AS3 all-foam vs Sapira Hybrid.",
    verdict: "Sapira has more bounce; AS3 provides superior motion isolation.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as2-vs-brooklyn-bedding-plank-firm",
    mattressAId: "amerisleep-as2",
    mattressBId: "brooklyn-bedding-plank-firm",
    title: "Amerisleep AS2 vs Brooklyn Bedding Plank Firm",
    description: "Firm support mattresses compared.",
    verdict: "AS2 is firm but contours. Plank Firm is exceptionally hard and flat.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Pressure Relief", winnerId: "amerisleep-as2", reason: "Still provides foam contouring despite firm designation." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as2-vs-bear-original",
    mattressAId: "amerisleep-as2",
    mattressBId: "bear-original",
    title: "Amerisleep AS2 vs Bear Original",
    description: "Firmest all-foam models.",
    verdict: "AS2 maintains better alignment for heavier back sleepers through its dense zoned support.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-ghostbed-flex",
    mattressAId: "amerisleep-as3",
    mattressBId: "ghostbed-flex",
    title: "Amerisleep AS3 vs GhostBed Flex",
    description: "Medium feels compared.",
    verdict: "AS3 has deeper contouring to its foam.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as2-vs-helix-dawn-luxe",
    mattressAId: "amerisleep-as2",
    mattressBId: "helix-dawn-luxe",
    title: "Amerisleep AS2 vs Helix Dawn Luxe",
    description: "Comparing firm options for back and stomach sleepers.",
    verdict: "Both perform exceptionally well for keeping hips aligned.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as6-black-series-vs-leesa-sapira-chill-hybrid",
    mattressAId: "amerisleep-as6",
    mattressBId: "leesa-sapira-chill-hybrid",
    title: "Amerisleep AS6 vs Leesa Sapira Chill Hybrid",
    description: "Luxury cooling hybrids.",
    verdict: "AS6 Black Series offers premium pressure relief alongside its active cooling technologies.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as5-hybrid-vs-helix-sunset-luxe",
    mattressAId: "amerisleep-as5",
    mattressBId: "helix-sunset-luxe",
    title: "Amerisleep AS5 vs Helix Sunset Luxe",
    description: "Soft options for side sleepers.",
    verdict: "AS5's Active Flex layer prevents bottoming out on a soft bed.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Support", winnerId: "amerisleep-as5", reason: "Active flex layers maintain pushback." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as5-vs-ghostbed-luxe",
    mattressAId: "amerisleep-as5",
    mattressBId: "ghostbed-luxe",
    title: "Amerisleep AS5 vs GhostBed Luxe",
    description: "Two plush mattresses.",
    verdict: "AS5 offers a better balance of plush feel without losing fundamental lumbar support.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as5-hybrid-vs-leesa-sapira-chill-hybrid",
    mattressAId: "amerisleep-as5",
    mattressBId: "leesa-sapira-chill-hybrid",
    title: "Amerisleep AS5 vs Leesa Sapira Chill Hybrid",
    description: "Premium plush vs cooling hybrid.",
    verdict: "AS5 delivers superior pressure relief on the shoulders.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-casper-the-one",
    mattressAId: "amerisleep-as3",
    mattressBId: "casper-the-one",
    title: "Amerisleep AS3 vs Casper The One",
    description: "All-foam comparison.",
    verdict: "AS3 offers better motion isolation and a far longer warranty.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Warranty", winnerId: "amerisleep-as3", reason: "20-year vs 10-year." }
    ],
    faqs: []
  },
  {
    slug: "amerisleep-as6-black-series-vs-purple-restoreplus-hybrid",
    mattressAId: "amerisleep-as6",
    mattressBId: "purple-restoreplus-hybrid",
    title: "Amerisleep AS6 vs Purple RestorePlus Hybrid",
    description: "Top-tier constructions from both brands.",
    verdict: "Both offer excellent cooling. Purple's feel is entirely unique, while AS6 provides a more traditional luxury foam comfort.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as3-vs-casper-dream-hybrid",
    mattressAId: "amerisleep-as3",
    mattressBId: "casper-dream-hybrid",
    title: "Amerisleep AS3 vs Casper Dream Hybrid",
    description: "Contouring foam vs bouncy hybrid.",
    verdict: "AS3 gives zero-gravity pressure relief, while Casper Dream provides more bounce.",
    dateModified: "2026-05-01",
    winnerFor: [],
    faqs: []
  },
  {
    slug: "amerisleep-as6-black-series-vs-saatva-rx",
    mattressAId: "amerisleep-as6",
    mattressBId: "saatva-rx",
    title: "Amerisleep AS6 vs Saatva RX",
    description: "Two beds designed for maximum pressure relief.",
    verdict: "AS6 gives you the Bio-Pur foam cradle. Saatva RX uses micro-coils. Both provide excellent relief, but AS6 is notably less expensive.",
    dateModified: "2026-05-01",
    winnerFor: [
      { category: "Value", winnerId: "amerisleep-as6", reason: "Lower overall cost for premium relief features." }
    ],
    faqs: []
  }

];