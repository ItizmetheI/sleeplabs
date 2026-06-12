import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { emoji: '🦴', title: 'Hip & Joint Pain', desc: 'Side sleepers especially. Zoned support changes everything.', href: '/reviews/amerisleep-as5' },
  { emoji: '🌟', title: 'Back Pain', desc: 'Spinal alignment starts with your mattress. Testing team picks.', href: '/reviews/amerisleep-as2' },
  { emoji: '🌡️', title: 'Sleeping Hot', desc: 'Gel, copper, and airflow coil systems that actually stay cool.', href: '/reviews/amerisleep-as6' },
  { emoji: '🌙', title: 'Partner Disturbance', desc: 'Motion isolation and edge support for two different sleepers.', href: '/reviews/amerisleep-as6' }
];

export default function UseCases() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
           <h3 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-3 font-bold">Browse by category</h3>
           <h2 className="text-display-lg font-display-lg text-primary  drop-shadow-sm">Find your fix</h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="glass-panel border-outline-variant/30 p-8 rounded-3xl flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all group bg-white/40"
          >
            <div className="text-5xl mb-2 drop-shadow-sm transform transition-transform group-hover:scale-110 origin-bottom-left">{cat.emoji}</div>
            <h4 className="text-headline-md font-headline-md text-primary group-hover:text-secondary transition-colors">{cat.title}</h4>
            <p className="text-body-md text-on-surface-variant flex-grow leading-relaxed">{cat.desc}</p>
            <a href={cat.href} className="inline-flex items-center w-max px-4 py-2 rounded-full border border-secondary hover:bg-secondary/10 text-label-sm font-label-sm uppercase tracking-widest text-secondary mt-4 hover:text-primary transition-colors group">
              See Picks <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
