import { ArrowRight, BookOpen, Scale } from 'lucide-react';
import { motion } from 'motion/react';
import { allMattresses } from '../data/mattresses';

const leaderConfig = [
  { id: 'amerisleep-as3', label: 'Overall score leader' },
  { id: 'plushbeds-signature-bliss', label: 'Organic category leader' },
  { id: 'nest-bedding-sparrow', label: 'Trial-period leader' },
];

export default function Hero() {
  const leaders = leaderConfig.map(config => {
    const mattress = allMattresses.find(item => item.id === config.id);
    if (!mattress) throw new Error(`Missing homepage leader: ${config.id}`);
    return { ...config, mattress };
  });

  return (
    <header className="border-b border-outline-variant bg-surface py-14 md:py-20 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <p className="text-label-sm font-label-sm uppercase text-secondary font-bold">
            59 models · 24 brands · one published rubric
          </p>
          <h1 className="text-[44px] leading-[1.14] md:text-display-lg md:font-display-lg font-bold text-primary max-w-3xl">
            Compare mattresses with every score in view.
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            PureSleep organizes 59 mattress models with one seven-metric editorial scorecard, complete comparison tables, and clearly labeled evidence limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="/reviews/"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-label-sm font-label-sm uppercase font-bold hover:bg-primary/90 transition-colors"
            >
              Explore all reviews <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="/methodology/"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-lg border border-outline-variant text-label-sm font-label-sm uppercase font-bold hover:border-secondary hover:text-secondary transition-colors"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" /> Read the methodology
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-2"><Scale className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" /> Independently operated</span>
            <span>Scores are editorial, not lab results</span>
            <span>Updated July 2026</span>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 bg-white border border-outline-variant rounded-lg shadow-sm overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4 p-5 border-b border-outline-variant bg-surface-container-low">
            <div>
              <p className="text-label-sm font-label-sm uppercase text-secondary font-bold">Selected category leaders</p>
              <h2 className="text-headline-md font-headline-md text-primary mt-2">Start with three different strengths</h2>
            </div>
            <span className="text-label-sm text-on-surface-variant whitespace-nowrap">July 2026</span>
          </div>
          <div className="divide-y divide-outline-variant">
            {leaders.map(({ label, mattress }) => (
              <a
                key={mattress.id}
                href={`/reviews/${mattress.id}/`}
                className="grid grid-cols-[72px_1fr_auto] items-center gap-4 p-4 hover:bg-surface-container-low transition-colors group"
              >
                <div className="w-[72px] h-14 bg-white flex items-center justify-center overflow-hidden">
                  <img src={mattress.image} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-label-sm text-secondary font-bold">{label}</p>
                  <h3 className="text-body-md text-primary font-bold mt-1 break-words group-hover:text-secondary transition-colors">{mattress.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-headline-md font-bold text-primary">{mattress.scores.overall}</span>
                  <span className="block text-[11px] text-on-surface-variant">Overall</span>
                </div>
              </a>
            ))}
          </div>
          <a href="/best/overall/" className="flex items-center justify-between gap-4 p-5 border-t border-outline-variant text-primary font-bold hover:text-secondary transition-colors">
            View the full 59-model score field <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </header>
  );
}
