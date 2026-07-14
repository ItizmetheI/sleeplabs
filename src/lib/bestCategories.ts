export interface FAQ {
  question: string;
  answer: string;
}

export interface CategoryConfig {
  title: string;
  h1: string;
  description: string;
  intro: string;
  winner: string;
  winnerNote: string;
  picks: string[];
  filterNote?: string;
  faqs?: FAQ[];
}

export const BEST_CATEGORIES: Record<string, CategoryConfig> = {
  overall: {
    title: 'Best Mattress 2026 — Top Overall Picks | PureSleep',
    h1: 'Best Mattress of 2026',
    description: 'Best overall mattress picks for 2026, ranked with PureSleep\'s seven-metric editorial scorecard.',
    intro: 'The best-overall ranking sorts first by the published Overall field. Models tying at 10/10 Overall follow the documented tie-break sequence using Value, recorded warranty length, and breadth of listed fit categories.',
    winner: 'amerisleep-as3',
    winnerNote: 'The AS3 records 10/10 on the published Overall field. Its medium firmness, construction, trial, warranty, and certification references should be verified on Amerisleep\'s current product and policy pages before purchase.',
    picks: ['amerisleep-as3', 'amerisleep-as6', 'nest-bedding-sparrow', 'leesa-sapira-chill-hybrid', 'plushbeds-signature-bliss', 'nest-bedding-owl'],
    faqs: [
      {
        question: 'What is the best mattress overall for 2026?',
        answer: 'The Amerisleep AS3 ranks first in the current Overall category after sorting by the published Overall field and the documented tie-break sequence. It records 10/10 Overall, Edge Support, Motion Transfer, and Cooling & Breathability. These are editorial scores, not laboratory measurements.'
      },
      {
        question: 'How does PureSleep score mattresses?',
        answer: 'We use a standardized 7-metric system: Overall, Value, Edge Support, Trial Period, Response Time, Motion Transfer, and Cooling & Breathability. Every field is scored 0–10 in the published PureSleep score dataset. The scores are not laboratory findings, manufacturer ratings, or collected customer ratings.'
      },
      {
        question: 'Is an expensive mattress always better?',
        answer: 'Not according to our scoring data. Several models priced under $1,200 score 9–10/10 overall, while some luxury models at $3,000+ score lower on value and overall. Price tier affects materials and some construction details, but a higher price does not guarantee a higher score in our system.'
      }
    ]
  },
  luxury: {
    title: 'Best Luxury Mattress 2026 | PureSleep',
    h1: 'Best Luxury Mattress of 2026',
    description: 'Best luxury mattress picks for 2026, ranked with the same seven-metric editorial scorecard.',
    intro: 'Luxury picks are defined by premium materials, advanced construction, and scores above 9.0 overall. All models below score 9–10/10 overall.',
    winner: 'amerisleep-as6',
    winnerNote: 'The Amerisleep AS6 Black Series is our top luxury pick: 10/10 overall, Bio-Pur® plant-based foam, HIVE® 5-zone support, pocketed coil base, Refresh Cooling Cover, and a 20-year warranty. It earns its price with performance that matches anything in the luxury category.',
    picks: ['amerisleep-as6', 'amerisleep-as3-hybrid', 'plushbeds-signature-bliss', 'naturepedic-eos-classic', 'westin-heavenly-bed', 'nest-bedding-owl'],
    faqs: [
      {
        question: 'What makes a mattress "luxury"?',
        answer: 'In our system, luxury mattresses combine premium comfort materials (high-density Bio-Pur® foam, organic latex, or micro-coils) with advanced construction (zoned support, hybrid coil bases) and comprehensive ownership terms (long trial periods, 15+ year warranties). A luxury score in our ranking requires 9–10/10 overall with a starting price above $1,500 for a queen.'
      },
      {
        question: 'Is the AS6 Black Series worth the price?',
        answer: 'The AS6 scores 10/10 overall and 9/10 on value — meaning it delivers strong performance per dollar even at its price point. It includes Bio-Pur® plant-based foam, HIVE® zoning, a pocketed coil support system, and a 20-year warranty. For shoppers in the luxury tier, it scores higher across most metrics than competitors at similar or higher prices.'
      },
      {
        question: 'What is the difference between a luxury and a standard mattress?',
        answer: 'Standard mattresses typically use basic polyurethane foam and offer 10-year warranties. Luxury models generally use plant-based or organic foam comfort layers, zoned support systems, pocketed coil bases (in hybrids), and 15–20-year warranties. Construction quality affects durability and how the mattress performs over time, not just on first night.'
      }
    ]
  },
  cooling: {
    title: 'Best Cooling Mattress 2026 | PureSleep',
    h1: 'Best Mattress for Hot Sleepers 2026',
    description: 'Best cooling mattress picks for 2026, ranked by the Cooling & Breathability field in PureSleep\'s editorial scorecard.',
    intro: 'Cooling rankings use the Cooling & Breathability metric from our 7-metric system. Hybrids with coil bases generally score higher because airflow moves through the coil layer alongside the comfort foam.',
    winner: 'amerisleep-as6',
    winnerNote: 'The AS6 Black Series scores 10/10 on Cooling & Breathability. Its Refresh Cooling Cover works alongside a pocketed coil base that allows airflow through the mattress, not just across the surface. At 10/10 overall it is also the strongest all-around performer in the hot-sleeper category.',
    picks: ['amerisleep-as6', 'amerisleep-as3', 'leesa-sapira-chill-hybrid', 'brooklyn-bedding-aurora-luxe', 'glacier-original-hybrid', 'glacier-summit-hybrid'],
    faqs: [
      {
        question: 'What type of mattress is best for hot sleepers?',
        answer: 'Hybrids with pocketed coil bases score higher on cooling in the approved editorial scorecard because the coil layer allows air to circulate through the mattress. All-foam models rely on open-cell foam construction. Among all-foam models, Bio-Pur® plant-based foam performs better than standard polyurethane foam due to its open-cell structure. All picks in this list score 9–10/10 on Cooling & Breathability.'
      },
      {
        question: 'Do cooling covers actually work?',
        answer: 'Phase-change material and cooling-fiber covers may change first-contact feel. In our editorial rubric, cover materials contribute to the Cooling & Breathability score alongside broader construction factors such as foam type and coil presence.'
      },
      {
        question: 'Is memory foam bad for hot sleepers?',
        answer: 'Traditional petroleum-based memory foam traps heat because of its dense, closed-cell structure. Bio-Pur® plant-based foam, used in Amerisleep models, has a more open-cell structure that allows more airflow. The AS3 (all-foam, Bio-Pur®) scores 10/10 on Cooling despite being all-foam, which demonstrates that foam construction quality matters more than the foam-vs-hybrid distinction alone.'
      }
    ]
  },
  'side-sleepers': {
    title: 'Best Mattress for Side Sleepers 2026 | PureSleep',
    h1: 'Best Mattress for Side Sleepers 2026',
    description: 'Best mattress for side sleepers in 2026, ranked by fit, motion transfer, firmness, and overall score.',
    intro: 'Side sleepers need a mattress that allows the shoulder and hip to sink in slightly while still supporting the waist and lower back. Our top picks are soft-to-medium (3–5/10 firmness) with strong overall scores.',
    winner: 'amerisleep-as5',
    winnerNote: 'The AS5 scores 9/10 overall with soft firmness (3/10) designed for side sleepers. Its Active Flex layer and Bio-Pur® comfort foam are structured to absorb pressure at the shoulder and hip. 10/10 Cooling & Breathability makes it a strong pick for side sleepers who also sleep warm.',
    picks: ['amerisleep-as5', 'amerisleep-as5-hybrid', 'nest-bedding-raven', 'plushbeds-botanical-bliss', 'plushbeds-luxury-bliss', 'naturepedic-concerto-plush'],
    faqs: [
      {
        question: 'What firmness is best for side sleepers?',
        answer: 'Most side sleepers sleep best on soft-to-medium firmness (3–5/10 on our scale). A firmer surface concentrates pressure at the shoulder and hip bone, which can cause discomfort during the night. A surface that is too soft, however, can cause the hips to sink too deep and throw the spine out of alignment. The AS5 at 3/10 and AS3 at 5/10 bracket the sweet spot for most side sleepers.'
      },
      {
        question: 'Can a side sleeper use a medium-firm mattress?',
        answer: 'It depends on body weight and shoulder width. Lighter sleepers (under 150 lbs) often do fine on a medium mattress (5/10). Heavier side sleepers or those with broader shoulders typically need softer support (3–4/10 firmness) to avoid shoulder pressure. Our picks cover soft (3/10) through medium (5/10) to give side sleepers of different builds the right option.'
      },
      {
        question: 'Is foam or hybrid better for side sleepers?',
        answer: 'Both perform well for side sleepers. All-foam models (like the AS5) provide the deepest contouring and highest motion isolation. Hybrid models (like the AS5 Hybrid) add a coil layer that improves edge support and cooling while maintaining the soft comfort layer side sleepers need. The best choice depends on whether you prioritize contouring (foam) or bounce and edge support (hybrid).'
      }
    ]
  },
  'back-pain': {
    title: 'Best Mattress for Back Pain 2026 | PureSleep',
    h1: 'Best Mattress for Back Pain 2026',
    description: 'Best mattress for back discomfort in 2026: medium-firm models ranked for general sleep support and fit. Not medical advice.',
    intro: 'Our back pain category covers mattresses with medium-firm to firm support designed to promote neutral spinal alignment. This is a general sleep comfort category — consult a healthcare provider for mattress advice related to specific medical conditions.',
    winner: 'amerisleep-as2',
    winnerNote: 'The AS2 is medium-firm (6/10 firmness) and earns 9/10 overall. Its HIVE® lumbar zone technology provides differentiated support across 7 zones, with a firmer response in the lumbar region. With 10/10 on both Response Time and Motion Transfer, it suits active sleepers who change position during the night.',
    picks: ['amerisleep-as2', 'amerisleep-as3', 'glacier-summit-hybrid', 'saatva-classic', 'helix-dawn-luxe', 'brooklyn-bedding-plank-firm'],
    filterNote: 'Saatva Classic scores 10/10 overall and is a strong innerspring option for back sleepers. Brooklyn Bedding Plank Firm is flippable between firm and extra-firm for sleepers who need more support than medium-firm provides. The AS2 is our editorial pick for this category because of its specifically designed HIVE® lumbar zone and medium-firm profile.',
    faqs: [
      {
        question: 'What mattress firmness is recommended for back pain?',
        answer: 'Medium-firm (5–7/10 on our scale) is the most common recommendation for sleepers with lower back discomfort, as it tends to keep the hips from sinking too far while still allowing some pressure relief. That said, the right firmness depends on sleep position, body weight, and the source of the discomfort. Consult a healthcare provider for advice specific to your condition — mattress selection is a personal decision, not a medical treatment.'
      },
      {
        question: 'Is memory foam good for back pain?',
        answer: 'Memory foam can be a good option for back pain because it conforms to the body and distributes weight, which reduces concentrated pressure. The key is finding the right firmness — medium-firm foam (like the AS2 at 6/10) generally works better for back pain than very soft or very firm foam. The AS2 also includes HIVE® zoning that provides a firmer response in the lumbar zone specifically.'
      },
      {
        question: 'Can a new mattress help with back discomfort?',
        answer: 'A mattress that better supports spinal alignment during sleep can reduce morning stiffness and discomfort for many sleepers. A worn-out mattress that sags in the middle creates an uneven surface that stresses the lower back. Replacing it with a medium-firm model that holds its shape may help. However, persistent back pain has many possible causes — a mattress is one factor, not a replacement for professional medical advice.'
      }
    ]
  },
  'memory-foam': {
    title: 'Best Memory Foam Mattress 2026 | PureSleep',
    h1: 'Best Memory Foam Mattress of 2026',
    description: 'Best memory foam mattress picks for 2026, ranked by overall score in PureSleep\'s editorial dataset.',
    intro: 'Memory foam picks are all-foam models (no coil base). They score highest on motion isolation and pressure distribution, at the trade-off of slightly less edge support and responsiveness compared to hybrids.',
    winner: 'amerisleep-as3',
    winnerNote: 'The AS3 is our top foam pick: 10/10 overall using Bio-Pur® plant-based memory foam — a meaningful upgrade over standard petroleum-based foam. HIVE® zoning provides differentiated lumbar and shoulder support across 7 zones. A 20-year warranty makes it the most durable purchase in the foam category.',
    picks: ['amerisleep-as3', 'amerisleep-as2', 'nest-bedding-raven', 'plushbeds-organic-bliss', 'leesa-original', 'casper-the-one'],
    faqs: [
      {
        question: 'What is the difference between plant-based and standard memory foam?',
        answer: 'Standard memory foam is made from petroleum-derived polyurethane. Plant-based memory foam (like Bio-Pur® in Amerisleep models) replaces a portion of the petroleum content with plant-derived oils. The result is a more open-cell foam structure that sleeps cooler, responds faster to movement, and carries CertiPUR-US certification for reduced chemical off-gassing. It is still a foam mattress — not latex or organic — but a meaningfully different composition from standard memory foam.'
      },
      {
        question: 'Does memory foam sleep hot?',
        answer: 'Traditional petroleum-based memory foam can trap heat due to its dense closed-cell structure. Bio-Pur® plant-based foam has a more open-cell structure that allows better airflow. The AS3 scores 10/10 on Cooling & Breathability despite being all-foam — demonstrating that foam quality matters more than construction type alone when it comes to temperature.'
      },
      {
        question: 'How long does a memory foam mattress last?',
        answer: 'High-quality memory foam mattresses typically maintain their support and shape for 8–12 years. Warranty length is a useful indicator: the AS3 and AS2 carry 20-year warranties, which signals confidence in long-term durability. Lower-density foam mattresses (common at budget price points) tend to soften more quickly, often within 5–7 years.'
      }
    ]
  },
  hybrid: {
    title: 'Best Hybrid Mattress 2026 | PureSleep',
    h1: 'Best Hybrid Mattress of 2026',
    description: 'Best hybrid mattress picks for 2026. Foam-over-coil models ranked by the same seven score fields.',
    intro: 'Hybrid picks combine foam comfort layers over pocketed coil support systems. They score higher on edge support and cooling than all-foam models, at the trade-off of slightly higher prices.',
    winner: 'amerisleep-as6',
    winnerNote: 'The AS6 Black Series is our top hybrid: 10/10 overall with Bio-Pur® foam, HIVE® zoning, pocketed coil support, and a Refresh Cooling Cover. With a 20-year warranty and 10/10 Motion Transfer and Cooling scores, it leads on both comfort and longevity.',
    picks: ['amerisleep-as6', 'nest-bedding-sparrow', 'leesa-sapira-chill-hybrid', 'plushbeds-signature-bliss', 'nest-bedding-owl', 'naturepedic-eos-classic'],
    faqs: [
      {
        question: 'What is a hybrid mattress?',
        answer: 'A hybrid mattress combines a foam comfort layer (memory foam, latex, or poly-foam) with a pocketed coil support system. The foam layer provides pressure relief and motion absorption; the coil layer adds support, edge reinforcement, and airflow. Most hybrids are 12–16 inches tall, with the coil layer making up 6–8 inches of that height.'
      },
      {
        question: 'Is hybrid or foam better?',
        answer: 'Both have strengths. Hybrids score higher on edge support and cooling because the coil layer reinforces the perimeter and allows airflow. All-foam mattresses score higher on motion isolation because there is no spring to transmit movement. For couples who prioritize motion isolation, foam can be the stronger choice. For those who want better edge support, more bounce, or superior cooling, hybrids are the better fit.'
      },
      {
        question: 'Do hybrid mattresses last as long as foam?',
        answer: 'A well-built hybrid typically lasts 8–12 years, comparable to high-quality foam. The pocketed coil system in a hybrid can maintain its structure longer than foam alone because individual coils are independently wrapped and less prone to compression set. The AS6 Black Series comes with a 20-year warranty, which indicates long-term durability expectations from the manufacturer.'
      }
    ]
  },
  organic: {
    title: 'Best Organic Mattress 2026 | PureSleep',
    h1: 'Best Organic Mattress of 2026',
    description: 'Best organic mattress picks for 2026, ranked by score and recorded certification fields. Verify current certification scope.',
    intro: 'Organic picks carry meaningful third-party certifications: GOLS (organic latex), GOTS (organic cotton/wool), OEKO-TEX, and/or eco-INSTITUT. Models below are ranked by overall score. Verify current certifications on each brand\'s official site before purchasing.',
    winner: 'plushbeds-signature-bliss',
    winnerNote: 'The PlushBeds Signature Bliss scores 10/10 overall and carries four certifications: GOLS, GOTS, OEKO-TEX, and eco-INSTITUT. It is the strongest-certified, highest-scoring organic hybrid in our database. Amerisleep Organica is the strongest pick for shoppers who prefer a foam-forward organic build with GOLS + GOTS + OEKO-TEX.',
    picks: ['plushbeds-signature-bliss', 'amerisleep-organica', 'amerisleep-organica-plush', 'naturepedic-eos-classic', 'eco-terra-hybrid-latex', 'nolah-natural-11'],
    filterNote: 'Sub-category: Best Organic with Bio-Pur® Technology — Amerisleep Organica (9/10 overall). Best Organic for Side Sleepers — Amerisleep Organica Plush (9/10 overall, softer firmness). Best Budget Organic — Eco Terra Hybrid Latex (9/10 overall, 10/10 value).',
    faqs: [
      {
        question: 'What certifications should an organic mattress have?',
        answer: 'Look for GOLS (Global Organic Latex Standard) if the mattress contains latex, and GOTS (Global Organic Textile Standard) for organic cotton and wool. OEKO-TEX Standard 100 certifies that materials have been tested for harmful substances. eco-INSTITUT is a German certification for low emissions. A mattress claiming to be "natural" or "organic" without third-party certification is a marketing claim, not a verified standard. Always verify current certifications at each brand\'s official website — they can change by model year.'
      },
      {
        question: 'Are organic mattresses worth the higher price?',
        answer: 'Certified organic mattresses use materials that have been verified by independent organizations to meet stricter sourcing and processing standards. Whether that is worth the premium depends on your priorities. If reducing synthetic chemical exposure and supporting sustainable sourcing matter to you, the premium is meaningful. On measured performance alone, our top organic picks score 9–10/10 overall — comparable to non-organic models at similar prices.'
      },
      {
        question: 'What is the difference between organic and natural mattresses?',
        answer: '"Natural" is an unregulated marketing term with no required standard. "Organic" is only meaningful when backed by a recognized third-party certification like GOLS, GOTS, or OEKO-TEX. A mattress labeled "natural latex" may or may not use certified organic latex. Check for the actual certification seal and verify it at the certifying body\'s database, not just on the brand\'s website.'
      }
    ]
  },
  value: {
    title: 'Best Value Mattress 2026 | PureSleep',
    h1: 'Best Value Mattress of 2026',
    description: 'Best value mattress picks for 2026, ranked by the Value field with overall score and recorded price considered.',
    intro: 'Value rankings use the Value metric from our 7-metric system, weighted by overall score. A 10/10 value score at 7/10 overall is not the same as a 10/10 value score at 10/10 overall.',
    winner: 'vaya-hybrid',
    winnerNote: 'The Vaya Hybrid is the value-category pick from the approved ranking brief. It scores 10/10 on Value and Response Time, pairs foam with pocketed coils, and carries an 8/10 overall score at a lower recorded entry price than most hybrids. Recorded prices and policies are reference fields; verify current terms with Vaya.',
    picks: ['vaya-hybrid', 'eco-terra-hybrid-latex', 'bear-original', 'glacier-summit-hybrid', 'amerisleep-as2', 'sweetnight-coolnest'],
    filterNote: 'Vaya Hybrid leads this category under the approved ranking brief. Eco Terra Hybrid Latex has the stronger overall score among 10/10-value picks, while Amerisleep AS2 is the value pick within the Amerisleep lineup.',
    faqs: [
      {
        question: 'What is the best budget mattress for 2026?',
        answer: 'The Vaya Hybrid is the approved value-category pick. It scores 10/10 on Value and Response Time with an 8/10 overall score. Eco Terra Hybrid Latex scores 10/10 on Value and 9/10 overall at a higher recorded entry price, while Amerisleep AS2 scores 9/10 overall and 9/10 on Value. Verify current prices before comparing cost.'
      },
      {
        question: 'How do you measure value in a mattress?',
        answer: 'Our Value metric measures performance relative to price — combining overall score, trial length, warranty coverage, and price per feature. A mattress that scores 10/10 overall and costs $3,000 queen may score lower on value than one scoring 9/10 overall at $900. Value is not just the cheapest option; it is the best ratio of what you get relative to what you pay.'
      },
      {
        question: 'Do I need to spend more than $1,000 for a good mattress?',
        answer: 'No. Several models in our database score 9–10/10 overall at queen prices under $1,000. The Eco Terra Hybrid Latex, Bear Original, Vaya Hybrid, and Sweetnight CoolNest all score strong overall ratings at accessible price points. The main trade-off at lower price points is often warranty length (10 years vs 20 years) and material quality (standard foam vs plant-based foam or certified latex).'
      }
    ]
  },
  'back-sleepers': {
    title: 'Best Mattress for Back Sleepers 2026 | PureSleep',
    h1: 'Best Mattress for Back Sleepers 2026',
    description: 'Best mattress for back sleepers in 2026, ranked by medium-firm fit, response, edge support, and overall score.',
    intro: 'Back sleepers need a surface firm enough to prevent hip sinkage while still allowing some contouring at the lumbar spine. Our top picks are medium-firm to firm, with high scores on response time and edge support.',
    winner: 'amerisleep-as2',
    winnerNote: 'The AS2 is medium-firm (6/10 firmness) and scores 9/10 overall. Its HIVE® lumbar zone provides differentiated zoned support specifically designed for the lower back. With 10/10 on both Response Time and Motion Transfer, it suits back sleepers who change position during the night.',
    picks: ['amerisleep-as2', 'amerisleep-as3', 'saatva-classic', 'nest-bedding-sparrow', 'helix-dawn-luxe', 'zoma-boost'],
    filterNote: 'Saatva Classic scores 10/10 overall and is a strong back-sleeper innerspring pick. The AS2 is our editorial pick for its dedicated HIVE® lumbar zoning and 20-year warranty.',
    faqs: [
      {
        question: 'What type of mattress is best for back sleepers?',
        answer: 'Back sleepers generally need a medium-firm to firm surface (5–7/10 firmness) that keeps the hips from sinking too deep, maintaining a neutral spine. Both foam and hybrid mattresses work well for back sleepers. Zoned support — like HIVE® technology in Amerisleep models — provides a firmer response in the lumbar region specifically, which can be an advantage over mattresses with uniform firmness.'
      },
      {
        question: 'Can back sleepers use a soft mattress?',
        answer: 'Soft mattresses (3/10 firmness) are generally not recommended for back sleepers because they allow the hips to sink significantly, which can push the lumbar spine out of neutral alignment. Most back sleepers sleep best on medium (5/10) to medium-firm (6–7/10) surfaces. Lighter back sleepers (under 130 lbs) may be comfortable on medium firmness; heavier sleepers often need medium-firm or firm.'
      },
      {
        question: 'Is foam or innerspring better for back sleepers?',
        answer: 'Both work well for back sleepers. Foam models with zoned support (like the AS2 with HIVE® technology) provide differentiated lumbar support and high motion isolation. Innerspring and hybrid models (like Saatva Classic) provide a firmer feel from a coil base, stronger edge support, and more bounce. The choice comes down to feel preference: foam contouring vs. the traditional spring feel.'
      }
    ]
  },
  'stomach-sleepers': {
    title: 'Best Mattress for Stomach Sleepers 2026 | PureSleep',
    h1: 'Best Mattress for Stomach Sleepers 2026',
    description: 'Best mattress for stomach sleepers in 2026, ranked by firmer feel, response, edge support, and overall score.',
    intro: 'Stomach sleepers require a firmer surface to prevent the pelvis from sinking and curving the lumbar spine forward. All picks here are medium-firm to firm (6/10+ firmness). This is a general sleep comfort category — consult a healthcare provider for advice related to specific conditions.',
    winner: 'amerisleep-as2',
    winnerNote: 'The AS2 scores 9/10 overall at medium-firm (6/10 firmness). Its HIVE® zoning provides 7 zones of differentiated support with a firmer response under the hips — the key requirement for stomach sleepers. 10/10 on Response Time makes position changes easy throughout the night.',
    picks: ['amerisleep-as2', 'brooklyn-bedding-plank-firm', 'bear-original', 'helix-dawn-luxe', 'saatva-classic', 'zoma-boost'],
    filterNote: 'Brooklyn Bedding Plank Firm is the firmest option in this list — suited for stomach sleepers who want maximum firmness and minimal contouring. Bear Original (9/10 overall, 10/10 value) is the strongest budget stomach-sleeper pick.',
    faqs: [
      {
        question: 'Do stomach sleepers need a firm mattress?',
        answer: 'Yes — stomach sleeping puts the most demand on mattress firmness. A soft mattress causes the hips and abdomen to sink, which arches the lower back and can create significant discomfort over time. Most stomach sleepers sleep best on medium-firm to firm surfaces (6–8/10 firmness). This is a general guideline — heavier stomach sleepers often need firmer support, while lighter sleepers may be comfortable on medium-firm.'
      },
      {
        question: 'Is memory foam good for stomach sleepers?',
        answer: 'Memory foam can work for stomach sleepers if the firmness level is appropriate — medium-firm or firm (6–7/10). Very soft memory foam is not well-suited for stomach sleeping because it allows the hips to sink too deeply. The AS2 uses Bio-Pur® foam at medium-firm firmness and includes HIVE® zoning with a firmer response in the hip zone, making it a better option than a one-zone-firmness foam mattress.'
      },
      {
        question: 'What pillow should stomach sleepers use?',
        answer: 'Pillow selection is a separate question from mattress selection, but they work together. Stomach sleepers generally benefit from a thin, low-loft pillow (or no pillow) to avoid pushing the neck upward. A thicker pillow that elevates the head can increase neck strain in the stomach position. We review mattresses, not pillows — consult a sleep specialist for personalized pillow advice.'
      }
    ]
  },
  'combination-sleepers': {
    title: 'Best Mattress for Combination Sleepers 2026 | PureSleep',
    h1: 'Best Mattress for Combination Sleepers 2026',
    description: 'Best mattress for combination sleepers in 2026, ranked for responsive medium-feel fit across positions.',
    intro: 'Combination sleepers shift between side, back, and stomach positions during the night. The best mattresses for them are medium firmness with high response time scores — so they move without resistance — and strong motion transfer scores for partner comfort.',
    winner: 'amerisleep-as3',
    winnerNote: 'The AS3 is medium firmness (5/10) and scores 10/10 overall with 9/10 on Response Time. Its Bio-Pur® foam reacts faster than traditional memory foam, accommodating position changes without resistance. HIVE® zoning adapts across the body as you shift from side to back.',
    picks: ['amerisleep-as3', 'amerisleep-as3-hybrid', 'casper-dream-hybrid', 'leesa-sapira-hybrid', 'ghostbed-flex', 'bear-star-hybrid'],
    faqs: [
      {
        question: 'What makes a mattress good for combination sleepers?',
        answer: 'Combination sleepers need two things: medium firmness that works for all three positions, and high response time so the mattress adapts quickly when they shift. A slow-responding foam can feel like it resists movement, while a too-firm surface creates pressure on the shoulder during side sleeping. Medium firmness (5/10) with a response time score of 9–10/10 covers the widest range of positions.'
      },
      {
        question: 'Is foam or hybrid better for combination sleepers?',
        answer: 'Hybrids with coil bases have higher response time scores because coils push back quickly when you shift position. All-foam models with plant-based foam (like Bio-Pur®) also score well on response time — the AS3 scores 9/10 despite being all-foam. Both work for combination sleepers, though hybrids tend to feel more natural for those who change positions frequently due to the bounce from the coil layer.'
      },
      {
        question: 'Can a combination sleeper use a firm mattress?',
        answer: 'A firm mattress can work for back and stomach positions, but it will create shoulder and hip pressure in the side-sleeping position. Most combination sleepers who regularly sleep on their side need a medium (5/10) or medium-firm (6/10) surface that works across all positions without creating concentrated pressure in any one. Strict firm mattresses are better suited to back-only or stomach-only sleepers.'
      }
    ]
  },
  'heavy-sleepers': {
    title: 'Best Mattress for Heavy Sleepers 2026 | PureSleep',
    h1: 'Best Mattress for Heavy Sleepers 2026',
    description: 'Best mattress for heavier sleepers in 2026, ranked by edge support, profile, construction, and overall score.',
    intro: 'Heavier sleepers (230 lbs+) need mattresses with strong edge support to prevent roll-off, durable materials that resist premature softening, and deep enough comfort layers to provide pressure relief without bottoming out. Hybrids with pocketed coil bases generally perform better in this category.',
    winner: 'amerisleep-as6',
    winnerNote: 'The AS6 Black Series scores 10/10 overall with a hybrid coil base, 9/10 edge support, and 15-inch profile for deep compression without bottoming out. Bio-Pur® foam and a 20-year warranty indicate long-term durability — important for heavier sleepers who compress materials at a higher rate.',
    picks: ['amerisleep-as6', 'amerisleep-as3-hybrid', 'saatva-classic', 'nest-bedding-sparrow', 'brooklyn-bedding-aurora-luxe', 'bear-star-hybrid'],
    filterNote: 'Saatva Classic (10/10 overall, 10/10 edge) and Nest Bedding Sparrow (10/10 overall, 10/10 edge) are both strong picks for heavier sleepers who need maximum edge support.',
    faqs: [
      {
        question: 'What thickness mattress do heavy sleepers need?',
        answer: 'Heavier sleepers (230 lbs+) generally need at least 12 inches of total mattress height, with a comfort layer of at least 3–4 inches to provide adequate pressure relief before reaching the firmer support core. Mattresses under 10 inches can feel too firm or cause a "bottoming out" feeling for heavier sleepers. The AS6 at 15 inches and the Saatva Classic at 14.5 inches both provide enough depth for heavier compression.'
      },
      {
        question: 'Is a hybrid better than foam for heavy sleepers?',
        answer: 'Generally yes. Pocketed coil systems provide more durable structural support than foam alone and maintain their shape longer under higher compression. They also provide better edge support, which heavier sleepers need to get in and out of bed safely. All-foam mattresses can work for heavier sleepers if they use high-density foam, but hybrids score higher on edge support and tend to maintain performance longer.'
      },
      {
        question: 'What edge support score should heavy sleepers look for?',
        answer: 'We recommend an edge support score of 9/10 or higher for heavier sleepers. Edge support affects how much of the bed\'s surface is usable (so both partners can sleep near the edge), how easy it is to get in and out of bed, and how well the mattress maintains its shape at the perimeter over time. Saatva Classic, Nest Bedding Sparrow, and the AS3-family hybrids all score 10/10 on edge support.'
      }
    ]
  },
  couples: {
    title: 'Best Mattress for Couples 2026 | PureSleep',
    h1: 'Best Mattress for Couples 2026',
    description: 'Best mattress for couples in 2026, ranked by Motion Transfer, Edge Support, and overall score.',
    intro: 'Couples need a mattress that isolates movement (high motion transfer score) and allows use of the full bed width (high edge support score). Our top picks score 9–10/10 on both metrics.',
    winner: 'amerisleep-as3',
    winnerNote: 'The AS3 scores 10/10 on both Motion Transfer and Edge Support — tied for the highest dual score in our database. At 10/10 overall and 9/10 value, it is the strongest all-around couples pick across all price tiers.',
    picks: ['amerisleep-as3', 'amerisleep-as6', 'nest-bedding-sparrow', 'leesa-sapira-chill-hybrid', 'helix-sunset-luxe', 'ghostbed-luxe'],
    filterNote: 'For couples who sleep hot: AS6 adds a Refresh Cooling Cover while matching the AS3 on motion transfer (10/10). Ghostbed Luxe scores 10/10 on motion transfer and is a strong pick for couples where one or both partners sleep warm.',
    faqs: [
      {
        question: 'What is the most important mattress feature for couples?',
        answer: 'Motion isolation is the highest-priority feature for couples who have different sleep schedules or where one partner is a light sleeper. A mattress with strong motion isolation (9–10/10) absorbs movement so that rolling over or getting up does not disturb the other partner. Edge support is the second priority — it determines how much of the mattress width is actually usable and how easily both partners can get in and out of bed.'
      },
      {
        question: 'Is memory foam or hybrid better for couples?',
        answer: 'All-foam models (like the AS3) score higher on motion isolation because foam absorbs movement rather than transmitting it through a coil spring. Hybrids generally score higher on edge support and cooling. If motion isolation is your top priority, foam is the stronger choice. If you want good motion isolation with better edge support and cooling, a hybrid like the AS6 or Leesa Sapira Chill is a good compromise.'
      },
      {
        question: 'What if two partners have different firmness preferences?',
        answer: 'A medium (5/10) mattress covers the widest range of preferences and positions. For couples with significantly different needs (one prefers soft, one prefers firm), a split firmness setup — available in Split King size from Amerisleep and others — allows each side of the bed to be a different firmness level. Both sides share a base and fitted sheet but have independently chosen firmness on each side.'
      }
    ]
  },
  'hip-pain': {
    title: 'Best Mattress for Hip Pain 2026 | PureSleep',
    h1: 'Best Mattress for Hip Pain 2026',
    description: 'Best mattress for hip discomfort in 2026: soft-to-medium models ranked for side-sleeper fit. Not medical advice.',
    intro: 'Hip discomfort during sleep is often worsened by a mattress that is too firm, concentrating pressure at the hip bone for side sleepers. Our top picks are soft to medium (3–5/10 firmness). This is a general sleep comfort category — consult a healthcare provider for advice related to specific medical conditions.',
    winner: 'amerisleep-as5',
    winnerNote: 'The AS5 is our softest all-foam model (3/10 firmness) and scores 9/10 overall with 10/10 Cooling & Breathability. Its Active Flex layer and Bio-Pur® comfort foam are structured to absorb pressure at the shoulder and hip — the key surface points for side sleepers who experience hip discomfort on a firm mattress.',
    picks: ['amerisleep-as5', 'amerisleep-as5-hybrid', 'amerisleep-as3', 'helix-midnight-luxe', 'purple-restoreplus-hybrid', 'saatva-rx'],
    faqs: [
      {
        question: 'What firmness is best for hip pain?',
        answer: 'For side sleepers with hip discomfort, soft to medium firmness (3–5/10) allows the hip to sink slightly into the mattress, distributing pressure across a larger surface area rather than concentrating it at the hip bone. A surface that is too firm keeps the hip bone at a point of concentrated contact. Back and stomach sleepers with hip issues may need a different firmness — consult a healthcare provider for personalized guidance.'
      },
      {
        question: 'Can a mattress help with hip pain?',
        answer: 'A mattress that better distributes body weight may reduce the pressure concentration that contributes to hip discomfort during sleep. Switching from a firm to a medium or soft mattress can make a meaningful difference for side sleepers. However, hip pain has many possible causes — structural, muscular, nerve-related — and a mattress is one factor in sleep comfort, not a medical treatment. Consult a healthcare provider for persistent hip pain.'
      },
      {
        question: 'Is foam or hybrid better for hip pain?',
        answer: 'All-foam models with soft comfort layers (like the AS5) provide the deepest contouring at the hip, which reduces concentrated pressure. Hybrid models with a soft foam comfort layer over coils (like the AS5 Hybrid) provide similar hip relief with added bounce and edge support. Either construction works — the key variable is the softness of the comfort layer (3–5/10 firmness), not foam vs. hybrid.'
      }
    ]
  },
  'shoulder-pain': {
    title: 'Best Mattress for Shoulder Pain 2026 | PureSleep',
    h1: 'Best Mattress for Shoulder Pain 2026',
    description: 'Best mattress for shoulder discomfort in 2026: soft-to-medium models ranked for side-sleeper fit. Not medical advice.',
    intro: 'Shoulder discomfort during sleep typically affects side sleepers on a surface that is too firm. Our top picks are soft to medium firmness with high overall scores and cooling. This is a general sleep comfort category — consult a healthcare provider for specific medical conditions.',
    winner: 'amerisleep-as5',
    winnerNote: 'The AS5 (3/10 firmness, soft) allows the shoulder to sink without creating a point of concentrated pressure. The Active Flex layer beneath the comfort foam maintains spinal support even as the shoulder sinks into the surface, helping keep the spine more level while you sleep on your side.',
    picks: ['amerisleep-as5', 'amerisleep-as5-hybrid', 'helix-midnight-luxe', 'helix-sunset-luxe', 'ghostbed-luxe', 'plushbeds-luxury-bliss'],
    faqs: [
      {
        question: 'What type of mattress helps with shoulder discomfort?',
        answer: 'Side sleepers with shoulder discomfort typically benefit from a soft to medium mattress (3–5/10 firmness) that allows the shoulder to compress into the surface. A soft comfort layer distributes pressure across the shoulder joint rather than concentrating it at the shoulder bone. The AS5 at 3/10 firmness and the Helix Midnight Luxe and Sunset Luxe at plush-soft are the strongest picks in this category.'
      },
      {
        question: 'How soft should a mattress be for shoulder pain?',
        answer: 'Soft (3/10) to medium-soft (4/10) is the most common comfort range for side sleepers with shoulder discomfort, as it provides enough give to reduce surface pressure. Going too soft (under 2/10) can cause the hips to sink deeper than the shoulders, creating misalignment that can worsen discomfort. The AS5 at 3/10 and AS5 Hybrid at a similar feel balance shoulder give with enough support underneath.'
      },
      {
        question: 'Can a mattress cause shoulder pain?',
        answer: 'A mattress that is too firm for your sleep position can contribute to shoulder discomfort for side sleepers. A worn-out mattress that sags unevenly can also create pressure points. However, shoulder pain while sleeping has many possible causes — rotator cuff issues, bursitis, nerve compression — that are unrelated to the mattress surface. A new, softer mattress may reduce discomfort from pressure, but it is not a treatment for underlying shoulder conditions. Consult a healthcare provider for persistent shoulder pain.'
      }
    ]
  },
  'motion-isolation': {
    title: 'Best Mattress for Motion Isolation 2026 | PureSleep',
    h1: 'Best Mattress for Motion Isolation 2026',
    description: 'Best mattress for motion isolation in 2026, ranked by the Motion Transfer field in PureSleep\'s editorial scorecard.',
    intro: 'Motion isolation rankings use the Motion Transfer metric from our 7-metric scoring system. All-foam models absorb motion more effectively than hybrids because foam does not transmit movement through a coil spring network.',
    winner: 'amerisleep-as3',
    winnerNote: 'The AS3 scores 10/10 on Motion Transfer — tied for the highest score in our database. At 10/10 overall and 9/10 value, it is also the strongest all-around buy in the motion isolation category. Its Bio-Pur® all-foam construction absorbs movement at the source rather than transmitting it through a coil system.',
    picks: ['amerisleep-as3', 'amerisleep-as6', 'casper-the-one', 'ghostbed-luxe', 'helix-sunset-luxe', 'leesa-sapira-chill-hybrid'],
    filterNote: 'Ghostbed Luxe, Casper The One, Helix Sunset Luxe, and Leesa Sapira Chill Hybrid all score 10/10 on motion transfer. AS3 and AS6 score 10/10 while also leading on value, edge support, and overall score.',
    faqs: [
      {
        question: 'Which mattresses have the best motion isolation?',
        answer: 'All-foam mattresses consistently score highest on motion isolation because foam absorbs movement at the source. In the approved editorial scorecard, the AS3, AS6, Casper The One, Ghostbed Luxe, Helix Sunset Luxe, and Leesa Sapira Chill Hybrid all score 10/10 on motion transfer. Among these, the AS3 and AS6 score higher overall, making them the strongest all-around picks for couples who prioritize motion isolation.'
      },
      {
        question: 'Is memory foam or innerspring better for motion isolation?',
        answer: 'Memory foam (and all-foam construction generally) is significantly better for motion isolation than innerspring. Coil systems — whether traditional or pocketed — transfer some movement through the spring network to the other side of the bed. Pocketed coils isolate motion better than open-coil systems, but all-foam still scores higher. If motion isolation is your top priority, an all-foam mattress is the stronger choice over any hybrid or innerspring.'
      },
      {
        question: 'What score indicates good motion isolation?',
        answer: 'In our 7-metric system, a Motion Transfer score of 9/10 or 10/10 indicates strong motion isolation. A score of 7–8/10 is moderate — you may feel some movement from your partner but it will not be disruptive. Scores below 7/10 indicate noticeable motion transfer, which can disturb light sleepers. For couples with different sleep schedules or light sleepers, we recommend filtering for 9–10/10 motion transfer.'
      }
    ]
  },
  'pressure-relief': {
    title: 'Best Mattress for Pressure Relief 2026 | PureSleep',
    h1: 'Best Mattress for Pressure Relief 2026',
    description: 'Best mattress for pressure relief in 2026, ranked by firmness, fit, motion transfer, and overall score.',
    intro: 'Pressure relief rankings favor mattresses with soft-to-medium firmness, high overall scores, and construction designed to distribute body weight across a larger surface area. This is a general sleep comfort category — consult a healthcare provider for advice related to specific medical conditions.',
    winner: 'amerisleep-as5',
    winnerNote: 'The AS5 is our softest foam model (3/10 firmness) and scores 9/10 overall. Its Bio-Pur® foam and Active Flex layer are structured to absorb concentrated pressure at the shoulder, hip, and knee — the main contact points for side sleepers who experience joint discomfort on a firmer surface.',
    picks: ['amerisleep-as5', 'amerisleep-as5-hybrid', 'saatva-rx', 'purple-restoreplus-hybrid', 'helix-midnight-luxe', 'amerisleep-as3'],
    filterNote: 'Saatva RX (10/10 overall, 10/10 motion transfer) is designed for sleepers with musculoskeletal concerns and uses a micro-coil comfort layer. Purple RestorePlus Hybrid (9/10 overall, 10/10 response time) uses the GelFlex Grid for a different approach to pressure distribution.',
    faqs: [
      {
        question: 'What type of mattress provides the best pressure relief?',
        answer: 'Soft-to-medium foam mattresses provide the most direct surface contouring, distributing body weight across a larger area and reducing concentrated pressure at bony prominences like the shoulder and hip. All-foam models with slow-responding comfort foam (memory foam) score highest on pressure relief for side sleepers. The AS5 and AS5 Hybrid combine soft Bio-Pur® foam with an Active Flex layer that maintains alignment even as the comfort layer absorbs pressure.'
      },
      {
        question: 'What firmness is best for pressure relief?',
        answer: 'Soft to medium-soft (3–4/10 firmness) provides the most pressure relief for side sleepers because it allows bony contact points to sink into the surface rather than pressing against a firm layer. Medium (5/10) works well for combination sleepers who also sleep on their back. Firm mattresses provide the least surface contouring and are not recommended for pressure relief-focused shoppers.'
      },
      {
        question: 'Can a mattress help with joint discomfort during sleep?',
        answer: 'A mattress with a soft-to-medium comfort layer can reduce the concentrated pressure at joint contact points during sleep, which may reduce discomfort for some sleepers. This is a general sleep comfort effect — softer surfaces distribute body weight more evenly than firm ones. Persistent joint pain has many possible causes that a mattress cannot address. Consult a healthcare provider for ongoing joint conditions.'
      }
    ]
  },
};
