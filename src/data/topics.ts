export interface Topic {
  id: string;
  title: string;
  description: string;
  body: string;
  relatedMattresses: string[];
  relatedGuides: string[];
  dateModified: string;
}

export const topics: Topic[] = [
  {
    id: 'memory-foam',
    title: 'Memory Foam',
    description: 'How memory foam works, its history, and which mattresses use the best formulations.',
    body: `Memory foam (viscoelastic polyurethane foam) was developed by NASA in the 1960s to absorb impact energy in aircraft seats. It entered the consumer mattress market in the 1990s. The core property of memory foam is viscoelasticity: it deforms slowly under pressure and recovers slowly when pressure is removed. This creates the characteristic "hug" and pressure relief memory foam is known for.\n\nStandard petroleum-based memory foam has one major drawback: it traps body heat. The closed-cell structure slows airflow, raising sleep surface temperature over the course of a night. Multiple innovations have addressed this: open-cell memory foam (faster airflow), gel-infused memory foam (heat dispersion), and plant-based memory foam (Bio-Pur® replaces a portion of petroleum with plant-derived materials, creating a more open cell structure).\n\nFor mattress shoppers, memory foam excels at pressure relief and motion isolation — both near-perfect in well-formulated foams. It underperforms on responsiveness (slow to spring back, making position changes harder) and edge support (foam compresses at the perimeter). Cooling varies significantly by formulation — plant-based and open-cell versions sleep measurably cooler than standard memory foam in our temperature tests.\n\nOur top-rated memory foam mattress is the Amerisleep AS3, which uses Bio-Pur® plant-based memory foam and scores 9.5/10 overall.`,
    relatedMattresses: ['amerisleep-as3', 'amerisleep-as2', 'amerisleep-as5'],
    relatedGuides: ['memory-foam-vs-hybrid-mattress', 'how-to-choose-mattress-firmness'],
    dateModified: '2026-05-01'
  },
  {
    id: 'cooling-technology',
    title: 'Cooling Technology',
    description: 'The science of thermal regulation in mattresses and how different materials dissipate body heat.',
    body: `Cooling is a critical performance metric, as the human body needs to drop in temperature by 1-2 degrees Fahrenheit to initiate and sustain deep sleep. Mattresses handle heat in two distinct ways: passive breathability and active heat dissipation.\n\nPassive breathability relies on airflow. Innerspring and hybrid mattresses naturally excel here, as the coil layers act as large air chambers. Materials like latex and open-cell foams also offer passive breathability by allowing air to move through their structures.\n\nActive heat dissipation involves materials engineered to pull heat away from the body. Gel infusions in memory foam aim to do this, though their effectiveness often wanes after the mattress reaches thermal equilibrium. Phase Change Materials (PCMs) change state (from solid to liquid) to absorb heat, providing longer-lasting cooling. For hot sleepers, hybrid constructions like the Amerisleep AS6 (9.4/10 cooling) use pocketed coil air chambers beneath the foam layers to continuously circulate cool air. Natural latex mattresses like the Organica (9.5/10 cooling) are inherently breathable — latex's open-cell structure allows airflow that synthetic foam cannot match.`,
    relatedMattresses: ['amerisleep-as6', 'amerisleep-organica', 'amerisleep-as3'],
    relatedGuides: ['best-mattress-for-hot-sleepers', 'how-to-sleep-cooler'],
    dateModified: '2026-05-01'
  },
  {
    id: 'pocketed-coils',
    title: 'Pocketed Coils',
    description: 'Understanding individually wrapped coils and why they replaced traditional continuous coil systems.',
    body: `Pocketed coils, also known as individually wrapped or Marshall coils, represent a massive leap forward from older continuous coil systems. In a pocketed coil system, each steel spring is individually wrapped in its own fabric sleeve.\n\nBecause the coils are not wired together, they act independently. When you press down on one coil, the surrounding coils are unaffected. This yields two major benefits: contoured pressure relief (the coils map to your body shape rather than sinking as a flat unit) and superior motion isolation (a restless partner's movement isn't transferred across a wire grid).\n\nModern hybrids often feature zoned pocketed coil systems. Denser, firmer coils are placed in the center third of the mattress to support the heavier lumbar and hip regions, while softer coils are used near the shoulders to allow for compression. Most premium hybrids like the Amerisleep AS6 utilize some form of pocketed coil technology.`,
    relatedMattresses: ['amerisleep-as6', 'amerisleep-organica'],
    relatedGuides: ['memory-foam-vs-hybrid-mattress', 'best-hybrid-mattress'],
    dateModified: '2026-05-01'
  },
  {
    id: 'spinal-alignment',
    title: 'Spinal Alignment',
    description: 'The importance of maintaining neutral spine posture during sleep and how mattresses facilitate it.',
    body: `Neutral spinal alignment means your spine maintains its natural curvature while you sleep—the same posture you should have when standing with good posture. For a mattress to provide proper spinal alignment, it must offer a careful balance of support (keeping the heavy parts of the body, like hips, from sinking too far) and pressure relief (allowing lighter or protruding parts, like shoulders, to sink in).\n\nIf a mattress is too soft, the hips sink too deeply, creating a hammock effect that strains the lower back. If it's too firm, the hips and shoulders don't sink enough, pushing the spine out of alignment and causing pressure point pain.\n\nZoned support systems—whether achieved through variable foam densities (like Amerisleep's HIVE® technology across the AS lineup) or targeted core layers—are designed specifically to optimize spinal alignment for the widest range of body types and sleep positions.`,
    relatedMattresses: ['amerisleep-as3', 'amerisleep-as2', 'amerisleep-as6'],
    relatedGuides: ['best-mattress-for-back-pain', 'best-mattress-firmness-for-back-sleepers'],
    dateModified: '2026-05-01'
  },
  {
    id: 'motion-isolation',
    title: 'Motion Isolation',
    description: 'How mattresses absorb kinetic energy and why it matters for couples sharing a bed.',
    body: `Motion isolation refers to a mattress's ability to localize movement. If one person changes positions or gets out of bed, a mattress with good motion isolation prevents that kinetic energy from transferring across the bed and disturbing their partner.\n\nMemory foam is widely considered the gold standard for motion isolation. Its viscoelastic properties naturally absorb and dissipate energy rather than transferring it. Traditional continuous coil mattresses are generally the worst performers, as the interconnected wire grid acts as a conduit for movement. To combat this, modern hybrids and innersprings use pocketed coils, which operate independently.\n\nThe Amerisleep AS5 and AS3 score 9.4 and 9.1/10 respectively in our motion isolation tests, making them highly recommended for light sleepers who share a bed.`,
    relatedMattresses: ['amerisleep-as5', 'amerisleep-as3', 'amerisleep-as2'],
    relatedGuides: ['best-mattress-for-couples', 'best-mattress-for-light-sleepers'],
    dateModified: '2026-05-01'
  },
  {
    id: 'edge-support',
    title: 'Edge Support',
    description: 'Evaluating the perimeter stability of a mattress and its impact on the usable sleep surface.',
    body: `Edge support measures the structural integrity of the mattress perimeter. Good edge support prevents the sensation of 'rolling off' when sleeping near the side of the bed, and it provides a stable sitting surface when getting in or out of bed.\n\nMattresses achieve edge support through various methods. Innerspring and hybrid models often use high-density foam encasements around the coil unit or deploy thicker, firmer coils along the perimeter. All-foam mattresses historically struggle with edge support, as standard foams compress heavily under targeted weight. However, higher-end foam mattresses combat this by utilizing very dense base foams that extend to the edges.\n\nStrong edge support effectively widens the usable sleep surface, allowing couples to use the entire width of the mattress without feeling unstable. The Amerisleep AS6's pocketed coil perimeter consistently leads our edge support tests (9.6/10).`,
    relatedMattresses: ['amerisleep-as6', 'amerisleep-organica', 'amerisleep-as3'],
    relatedGuides: ['best-mattress-for-couples', 'best-mattress-for-heavy-sleepers'],
    dateModified: '2026-05-01'
  },
  {
    id: 'certipur-us',
    title: 'CertiPUR-US Certification',
    description: 'What this standard means for foam safety, emissions, and environmental impact in mattresses.',
    body: `The CertiPUR-US® program is a rigorous, third-party certification designed to ensure the safety and environmental responsibility of polyurethane foams used in bedding and furniture. Foams that earn this certification are tested by independent, accredited laboratories.\n\nA CertiPUR-US certified foam is guaranteed to be made without ozone depleters, PBDEs, TDCPP, or TCEP ('Tris') flame retardants, mercury, lead, heavy metals, and formaldehyde. Furthermore, it is certified to have low VOC (Volatile Organic Compound) emissions for indoor air quality (less than 0.5 parts per million).\n\nWhen buying a foam-based or hybrid mattress, looking for this certification is an essential baseline to ensure you aren't breathing in harmful chemicals while you sleep. Amerisleep's full AS lineup utilize CertiPUR-US certified foams.`,
    relatedMattresses: ['amerisleep-as3', 'amerisleep-as2', 'amerisleep-as5'],
    relatedGuides: ['non-toxic-mattress-guide', 'best-organic-mattress'],
    dateModified: '2026-05-01'
  },
  {
    id: 'sleep-cycles',
    title: 'Sleep Cycles',
    description: 'The science of sleep architecture and the progression through NREM and REM stages.',
    body: `Sleep is not a uniform state of rest; it's a dynamic, structured process characterized by distinct stages. A typical night of sleep involves cycling through these stages 4 to 6 times, with each cycle lasting roughly 90 to 110 minutes.\n\nNon-Rapid Eye Movement (NREM) sleep constitutes the first three stages. Stage 1 is the transition from wakefulness to light sleep. Stage 2 is slightly deeper, featuring brain wave activity known as sleep spindles. Stage 3 is deep, slow-wave sleep (SWS), vital for physical restoration, muscle growth, and immune system strengthening.\n\nFollowing deep sleep, the brain enters Rapid Eye Movement (REM) sleep. REM sleep is characterized by high brain activity (similar to wakefulness), rapid eye movements, and temporary muscle paralysis to prevent acting out dreams. REM sleep is crucial for cognitive functions, emotional regulation, and memory consolidation. A mattress that causes pressure pain or sleeps hot can easily disrupt these essential cycles.`,
    relatedMattresses: [],
    relatedGuides: ['how-to-improve-sleep-quality', 'sleep-hygiene-tips'],
    dateModified: '2026-05-01'
  }
];
