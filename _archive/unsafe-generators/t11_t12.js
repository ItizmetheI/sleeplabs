import fs from 'fs';

// TASK 11
let compTs = fs.readFileSync('src/data/comparisons.ts', 'utf8');

// The 24 comparisons:
const newComparisons = `
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
`;

// It should be injected right before the ending `];`
compTs = compTs.replace(/\];\s*$/, `,\n${newComparisons}\n];`);
fs.writeFileSync('src/data/comparisons.ts', compTs);


// TASK 12
let indexAstro = fs.readFileSync('src/pages/index.astro', 'utf8');

const topPicksHtml = `
<!-- Top Picks By Category -->
<section class="py-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
  <h2 class="text-display-lg font-display-lg text-primary mb-3">Top picks by category</h2>
  <p class="text-body-lg text-on-surface-variant mb-10 max-w-2xl">The right Amerisleep depends on how you sleep. Here's our top recommendation for each sleeper type.</p>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Best Overall", model: "AS3", href: "/reviews/amerisleep-as3", badge: "#1 Pick", desc: "Medium feel. Best for side and combination sleepers.", score: "9.5" },
      { label: "Best for Back Sleepers", model: "AS2", href: "/reviews/amerisleep-as2", badge: "Most Supportive", desc: "Medium-firm. Prevents lumbar sinkage.", score: "9.2" },
      { label: "Best for Side Sleepers", model: "AS5", href: "/reviews/amerisleep-as5", badge: "Best Pressure Relief", desc: "Soft. Maximum shoulder and hip relief.", score: "9.2" },
      { label: "Best for Couples", model: "AS6", href: "/reviews/amerisleep-as6", badge: "Top Performer", desc: "Hybrid. Best edge support and cooling.", score: "9.7" },
      { label: "Best Organic", model: "Organica", href: "/reviews/amerisleep-organica", badge: "GOLS Certified", desc: "Latex hybrid. Certified organic throughout.", score: "9.4" },
      { label: "Best Value", model: "AS2", href: "/reviews/amerisleep-as2", badge: "From $799", desc: "Same Bio-Pur® tech at the lowest entry price.", score: "9.2" },
    ].map(pick => (
      <a href={pick.href} class="glass-panel p-6 rounded-2xl border border-outline-variant/30 hover:border-secondary/40 transition-all group flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-label-sm font-label-sm uppercase tracking-widest text-secondary font-bold">{pick.label}</span>
          <span class="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{pick.badge}</span>
        </div>
        <h3 class="text-headline-md font-headline-md text-primary group-hover:text-secondary transition-colors">Amerisleep {pick.model}</h3>
        <p class="text-body-md text-on-surface-variant">{pick.desc}</p>
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant/20">
          <span class="text-label-sm text-on-surface-variant">PureSleep Score</span>
          <span class="text-secondary font-bold text-title-md">{pick.score}/10</span>
        </div>
      </a>
    ))}
  </div>
</section>
`;

const faqHtml = `
<!-- Homepage FAQ -->
<section class="py-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
  <h2 class="text-display-lg font-display-lg text-primary mb-3">Frequently asked questions</h2>
  <p class="text-body-lg text-on-surface-variant mb-10 max-w-2xl">Common questions about Amerisleep mattresses answered by the PureSleep Testing Team.</p>
  <div class="flex flex-col gap-3 max-w-3xl">
    {[
      { q: "Which Amerisleep mattress is best for most people?", a: "The AS3 (medium, 5/10) is our top pick for most sleepers. Its Bio-Pur® plant-based foam and HIVE® 5-zone support work well for side sleepers, combination sleepers, and couples. If you sleep primarily on your back or stomach, the AS2 (medium-firm, 6/10) is the better fit." },
      { q: "How does Amerisleep compare to Casper or Purple?", a: "Amerisleep has a 20-year warranty — double the 10-year warranty on most Casper and Purple models. The AS3 scores higher on pressure relief than the Casper The One. Purple's Grid technology provides better cooling; the AS3 provides better motion isolation at a lower price." },
      { q: "Is the 100-night trial enough time to test a mattress?", a: "Yes. Most sleep researchers suggest 3–4 weeks to adapt to a new mattress. Amerisleep's 100 nights gives you over 13 weeks — well past the adjustment period. You must sleep on it at least 30 nights before initiating a return." },
      { q: "What's the difference between the AS3 and AS5?", a: "The AS3 is medium (5/10) and suits side and combination sleepers. The AS5 is soft (3/10) with a thicker comfort layer and Active Flex layer — it's for dedicated side sleepers who want maximum pressure relief. The AS5 is also 14 inches tall vs the AS3's 12 inches." },
      { q: "Do Amerisleep mattresses need a box spring?", a: "No. Amerisleep mattresses work on any firm, flat surface: a platform bed, adjustable base, slatted frame (slats no more than 3 inches apart), or the floor. A box spring is not recommended as it can reduce support and void the warranty." },
    ].map(faq => (
      <details class="group glass-panel rounded-2xl border border-outline-variant/30 overflow-hidden">
        <summary class="flex justify-between items-center cursor-pointer p-6 font-bold text-on-surface list-none text-body-lg">
          {faq.q}
          <span class="transition-transform group-open:rotate-180 shrink-0 ml-4">
            <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <div class="px-6 pb-6 text-body-md text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
          {faq.a}
        </div>
      </details>
    ))}
  </div>
</section>
`;

// Insert Top Picks By Category after <ScoreSheet client:visible />
indexAstro = indexAstro.replace(/(<ScoreSheet client:visible \/>)/, `$1\n      ${topPicksHtml}`);

// Insert Homepage FAQ after <Methodology client:visible />
indexAstro = indexAstro.replace(/(<Methodology client:visible \/>)/, `$1\n      ${faqHtml}`);

fs.writeFileSync('src/pages/index.astro', indexAstro);

console.log('Done 11 and 12');
