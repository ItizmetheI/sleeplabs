import { Activity, ArrowRight, Moon, Thermometer, Users } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { Icon: Activity, title: 'Hip & Joint Comfort', desc: 'Compare soft-to-medium comfort options. General comfort guidance only.', href: '/best/hip-pain/' },
  { Icon: Moon, title: 'Back Comfort', desc: 'Compare support-focused picks across brands. Not medical advice.', href: '/best/back-pain/' },
  { Icon: Thermometer, title: 'Sleeping Hot', desc: 'Compare cooling and breathability scores across construction types.', href: '/best/cooling/' },
  { Icon: Users, title: 'Shared Beds', desc: 'Compare motion transfer and edge support for partner sleep.', href: '/best/couples/' },
];

export default function UseCases() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <motion.div initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-10">
        <p className="text-label-sm font-label-sm uppercase text-secondary mb-3 font-bold">Browse by category</p>
        <h2 className="text-display-lg font-display-lg text-primary">Find a relevant comparison</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map(({ Icon, title, desc, href }, index) => (
          <motion.a
            key={href}
            href={href}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white border border-outline-variant p-6 rounded-lg flex flex-col gap-4 shadow-sm hover:border-secondary transition-colors group"
          >
            <Icon className="w-6 h-6 text-secondary" aria-hidden="true" />
            <h3 className="text-headline-md font-headline-md text-primary group-hover:text-secondary transition-colors">{title}</h3>
            <p className="text-body-md text-on-surface-variant flex-grow leading-relaxed">{desc}</p>
            <span className="inline-flex items-center gap-2 text-label-sm uppercase font-bold text-secondary">
              See picks <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
