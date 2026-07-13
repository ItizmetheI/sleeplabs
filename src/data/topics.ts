export interface Topic {
  id: string;
  title: string;
  description: string;
  body: string;
  relatedMattresses: string[];
  relatedGuides: string[];
  sources?: { name: string; url: string }[];
  dateModified: string;
}

export const topics: Topic[] = [
  {
    id: 'memory-foam',
    title: 'Memory Foam',
    description: 'How memory foam works, how formulations differ, and how to compare scored models.',
    body: `Memory foam is viscoelastic polyurethane foam: it deforms under heat and pressure, then recovers after pressure is removed. NASA-funded researchers developed an early form of the material in the late 1960s for aircraft cushioning. Consumer mattress formulations now vary considerably in density, cell structure, additives, and response.\n\nMemory foam is known for contouring and motion isolation. Common tradeoffs include slower response, softer perimeter support, and greater heat retention in some dense formulations. Open-cell structures, perforations, gel infusions, and hybrid coil bases are different design approaches intended to improve airflow or surface feel; none guarantees a particular temperature outcome for every sleeper.\n\nPureSleep evaluates complete mattresses rather than treating a single foam label as proof of performance. In the current 59-model dataset, the Amerisleep AS3 scores 10/10 overall. The Casper The One and Leesa Original provide non-affiliated memory-foam comparisons using the same seven-metric rubric. Scores are editorial evaluations, not laboratory measurements.`,
    relatedMattresses: ['amerisleep-as3', 'casper-the-one', 'leesa-original'],
    relatedGuides: ['memory-foam-vs-hybrid-mattress', 'how-to-choose-mattress-firmness'],
    sources: [
      { name: 'NASA: Memory Foam', url: 'https://www.nasa.gov/image-article/memory-foam/' }
    ],
    dateModified: '2026-07-13'
  },
  {
    id: 'cooling-technology',
    title: 'Cooling Technology',
    description: 'The science of thermal regulation in mattresses and how different materials dissipate body heat.',
    body: `Mattress cooling is better understood as a combination of airflow, surface heat management, room conditions, bedding, and individual physiology. Coil layers leave more open space for air movement than solid foam cores. Latex and open-cell foams may also permit more airflow, while dense foams can retain more heat.\n\nCooling covers, gel infusions, and phase-change materials are designed to change initial surface feel or manage heat near the sleeper. Their real-world effect depends on the full mattress and bedding system, so a material name alone should not be treated as a guaranteed result.\n\nPureSleep's Cooling & Breathability score is a standardized editorial evaluation, not a thermal-camera or laboratory measurement. The Amerisleep AS6 scores 10/10 on this metric in the current dataset. The Brooklyn Bedding Aurora Luxe and Leesa Sapira Chill Hybrid are non-affiliated alternatives evaluated on the same scale.`,
    relatedMattresses: ['amerisleep-as6', 'brooklyn-bedding-aurora-luxe', 'leesa-sapira-chill-hybrid'],
    relatedGuides: ['best-mattress-for-hot-sleepers', 'how-to-sleep-cooler'],
    dateModified: '2026-07-13'
  },
  {
    id: 'pocketed-coils',
    title: 'Pocketed Coils',
    description: 'Understanding individually wrapped coils and why they replaced traditional continuous coil systems.',
    body: `Pocketed coils, also called individually wrapped coils, place each steel spring in a fabric sleeve instead of joining the full unit with a continuous wire grid. This lets sections of the support core respond more locally to weight and movement.\n\nBrands may vary coil gauge, count, height, perimeter reinforcement, and zoning. Those specifications do not translate directly into comfort or durability without considering the comfort layers and complete construction. Pocketed coils also leave open space through the support core, which can aid airflow compared with a solid foam base.\n\nThe Amerisleep AS6, Saatva Classic, and Nolah Evolution 15 are three differently constructed coil-based models in PureSleep's current dataset. Each is scored with the same seven-metric rubric so shoppers can compare the complete mattress rather than relying on coil terminology alone.`,
    relatedMattresses: ['amerisleep-as6', 'saatva-classic', 'nolah-evolution-15'],
    relatedGuides: ['memory-foam-vs-hybrid-mattress', 'best-hybrid-mattress'],
    dateModified: '2026-07-13'
  },
  {
    id: 'spinal-alignment',
    title: 'Spinal Alignment',
    description: 'The importance of maintaining neutral spine posture during sleep and how mattresses facilitate it.',
    body: `Neutral spinal alignment is a comfort concept: the mattress should support the body's natural curves without allowing one area to sink much farther than another. The appropriate balance of contouring and support varies by sleep position, body type, and personal preference.\n\nA surface that feels too soft may allow excessive hip sinkage for some sleepers. A surface that feels too firm may concentrate pressure near the shoulders or hips, especially in side sleeping. Firmness labels are not standardized across brands, so the trial period remains important.\n\nZoned foams and coils are designed to vary response by body area, but they are not medical devices and do not guarantee pain relief. The Amerisleep AS2, Saatva Rx, and Helix Dawn Luxe provide three construction approaches to compare. Persistent pain or neurological symptoms should be discussed with a healthcare professional.`,
    relatedMattresses: ['amerisleep-as2', 'saatva-rx', 'helix-dawn-luxe'],
    relatedGuides: ['best-mattress-for-back-pain', 'best-mattress-firmness-for-back-sleepers'],
    dateModified: '2026-07-13'
  },
  {
    id: 'motion-isolation',
    title: 'Motion Isolation',
    description: 'How mattresses absorb kinetic energy and why it matters for couples sharing a bed.',
    body: `Motion isolation describes how well a mattress limits movement from spreading across its surface. It can matter when partners keep different schedules or one sleeper changes position frequently.\n\nFoam comfort layers often absorb movement, while connected coil systems can transmit more of it. Pocketed coils respond more independently than a continuous wire unit, although the complete construction still determines the result. Bed frame stability and mattress size also affect how much movement a partner notices.\n\nPureSleep scores Motion Transfer as an editorial evaluation, not a sensor-based laboratory measurement. The Amerisleep AS3 scores 10/10 on the current dataset. The Casper The One and Leesa Original provide non-affiliated all-foam comparisons using the same rubric.`,
    relatedMattresses: ['amerisleep-as3', 'casper-the-one', 'leesa-original'],
    relatedGuides: ['best-mattress-for-couples', 'best-mattress-for-light-sleepers'],
    dateModified: '2026-07-13'
  },
  {
    id: 'edge-support',
    title: 'Edge Support',
    description: 'Evaluating the perimeter stability of a mattress and its impact on the usable sleep surface.',
    body: `Edge support describes how stable the mattress feels near its perimeter. It affects sitting at the side, getting in and out of bed, and how usable the outer portion feels to sleepers.\n\nBrands reinforce edges with firmer perimeter coils, foam rails, denser base materials, or combinations of those methods. Construction type alone does not guarantee the result: some all-foam models score well, while some hybrids provide only moderate perimeter stability.\n\nPureSleep's Edge Support score is an editorial evaluation on the same 0-10 scale used for all 59 models. The Amerisleep AS3 and Happsy each score 10/10 in the current dataset; the Saatva Classic offers another non-affiliated coil-based comparison.`,
    relatedMattresses: ['amerisleep-as3', 'happsy', 'saatva-classic'],
    relatedGuides: ['best-mattress-for-couples', 'best-mattress-for-heavy-sleepers'],
    dateModified: '2026-07-13'
  },
  {
    id: 'certipur-us',
    title: 'CertiPUR-US Certification',
    description: 'What this standard means for foam safety, emissions, and environmental impact in mattresses.',
    body: `CertiPUR-US is a certification program for flexible polyurethane foam used in products such as mattresses and upholstered furniture. The certification belongs to the foam manufacturer, so a mattress described as containing certified foam is not necessarily certified as a complete product.\n\nAccording to CertiPUR-US, certified foam is tested by independent, accredited laboratories against program criteria for content, emissions, and durability. The program states that certified foam has low VOC emissions below its stated limit and is made without several specified substances. Shoppers should use the program's current directory to verify participating companies and should not extend a foam certification to unrelated mattress components.\n\nThe Amerisleep AS3, Bear Original, and Casper The One are examples in PureSleep's dataset that list CertiPUR-US among their foam certifications. Verify current model-level claims with each brand and the certification directory before purchase.`,
    relatedMattresses: ['amerisleep-as3', 'bear-original', 'casper-the-one'],
    relatedGuides: ['non-toxic-mattress-guide', 'best-organic-mattress'],
    sources: [
      { name: 'CertiPUR-US: Frequently Asked Questions', url: 'https://certipur.us/about-the-certification/frequently-asked-questions/' }
    ],
    dateModified: '2026-07-13'
  },
  {
    id: 'sleep-cycles',
    title: 'Sleep Cycles',
    description: 'The science of sleep architecture and the progression through NREM and REM stages.',
    body: `Sleep cycles through rapid eye movement (REM) and non-REM phases. The National Heart, Lung, and Blood Institute describes three non-REM stages: the transition from wakefulness, a deeper stage with characteristic brain activity, and deep or slow-wave sleep. REM sleep involves active brain patterns, rapid eye movement, and normally reduced muscle activity.\n\nThe sequence repeats several times during a typical night, and the amount of time spent in each stage changes as the night progresses. Sleep studies use physiological measurements to classify stages; a consumer mattress review cannot measure or diagnose a person's sleep architecture.\n\nA mattress can affect comfort, temperature perception, and disturbance from movement, but PureSleep does not claim that any mattress guarantees a specific amount of REM or deep sleep. Persistent sleep disruption, daytime sleepiness, gasping, or suspected sleep disorders should be discussed with a healthcare professional.`,
    relatedMattresses: ['amerisleep-as3', 'casper-the-one', 'leesa-original'],
    relatedGuides: ['how-to-improve-sleep-quality', 'sleep-hygiene-tips'],
    sources: [
      { name: 'NHLBI: Sleep Phases and Stages', url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep' }
    ],
    dateModified: '2026-07-13'
  }
];
