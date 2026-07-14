import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const needs = [
  { num: '01', title: 'Side Sleepers', desc: 'Compare soft-to-medium models across brands for cushioning and fit.', href: '/best/side-sleepers' },
  { num: '02', title: 'Back Sleepers', desc: 'Compare medium-firm models with strong response and edge scores.', href: '/best/back-sleepers' },
  { num: '03', title: 'Hot Sleepers', desc: 'Ranked cooling picks spanning foam, hybrid, latex, and innerspring builds.', href: '/best/cooling' },
  { num: '04', title: 'Couples', desc: 'Compare motion-transfer and edge-support scores across multiple brands.', href: '/best/couples' },
  { num: '05', title: 'Back Discomfort', desc: 'Compare firmer support and pressure-distributing options; not medical advice', href: '/best/back-pain' },
  { num: '06', title: 'Pressure Relief', desc: 'Compare softer comfort layers and recorded firmness across brands.', href: '/best/pressure-relief' },
  { num: '07', title: 'Eco-Conscious', desc: 'Compare organic-material claims and current third-party certifications.', href: '/best/organic' },
  { num: '08', title: 'Combination Sleepers', desc: 'Compare responsive medium-feel models for easier position changes.', href: '/best/combination-sleepers' }
];

export default function FindYourMatch() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      <div className="mb-12 max-w-2xl relative z-10">
        <motion.h2 
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display-lg font-display-lg text-primary  mb-4"
        >
          Find your match
        </motion.h2>
        <motion.h3 
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-label-sm font-label-sm uppercase tracking-normal text-secondary mb-3"
        >
          Browse by Sleep Need
        </motion.h3>
        <motion.p 
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed"
        >
          Start with how you sleep, what feels uncomfortable, or what you want to improve. Each category uses the same scorecard and includes multiple brands.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {needs.map((need, index) => (
          <motion.a 
            key={need.num} 
            href={need.href} 
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group block p-6 bg-white border border-outline-variant hover:border-secondary transition-colors rounded-lg h-full flex flex-col shadow-sm"
          >
            <div className="text-label-sm font-label-sm text-secondary uppercase mb-4 font-bold">{need.num}</div>
            <h3 className="text-headline-md font-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">{need.title}</h3>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6 flex-grow">{need.desc}</p>
            <div className="mt-auto">
              <div className="w-10 h-10 rounded-lg border border-secondary flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                <ArrowRight className="text-secondary group-hover:text-white w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
