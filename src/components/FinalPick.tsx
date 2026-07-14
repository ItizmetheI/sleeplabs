import { ArrowRight, BookOpen, FileText, Scale } from 'lucide-react';
import { motion } from 'motion/react';

const evidencePaths = [
  {
    href: '/best/overall/',
    title: 'Complete score field',
    description: 'Compare all 59 models across the same seven metrics.',
    Icon: Scale,
  },
  {
    href: '/methodology/',
    title: 'Scoring methodology',
    description: 'See what the scores mean, and what they do not prove.',
    Icon: BookOpen,
  },
  {
    href: '/model-coverage.json',
    title: 'Published model manifest',
    description: 'Inspect the model, brand, score, source, and update fields.',
    Icon: FileText,
  },
];

export default function FinalPick() {
  return (
    <section className="py-stack-lg bg-primary text-white border-y border-primary px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mb-10">
          <p className="text-label-sm font-label-sm uppercase text-tertiary-container font-bold mb-3">Verify before you decide</p>
          <h2 className="text-display-lg font-display-lg text-white mb-5">Follow the evidence, not the loudest claim.</h2>
          <p className="text-body-lg text-inverse-on-surface leading-relaxed">
            A single score cannot determine comfort. Use the full scorecard, read the evidence limits, and confirm current construction, pricing, trial, return, and warranty terms with the manufacturer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/20 rounded-lg overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/20">
          {evidencePaths.map(({ href, title, description, Icon }) => (
            <a key={href} href={href} className="p-6 bg-white/5 hover:bg-white/10 transition-colors group">
              <Icon className="w-5 h-5 text-tertiary-container mb-5" aria-hidden="true" />
              <h3 className="text-headline-md text-white font-bold">{title}</h3>
              <p className="text-body-md text-inverse-on-surface mt-3 min-h-14">{description}</p>
              <span className="inline-flex items-center gap-2 mt-5 text-label-sm uppercase font-bold text-tertiary-container">
                Open source <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
