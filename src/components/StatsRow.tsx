import { motion } from 'motion/react';

const stats = [
  { value: "5", label: "Amerisleep Models Reviewed" },
  { value: "7", label: "Metrics Scored Per Mattress" },
  { value: "100", label: "Night Trial on All Models" },
  { value: "20", label: "Year Warranty — Industry Leading" },
];

export default function StatsRow() {
  return (
    <section className="py-stack-md border-b border-outline-variant/30 relative">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-outline-variant/30">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col group hover:scale-105 transition-transform"
            >
              <span className="text-display-lg font-display-lg text-secondary  drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">{stat.value}</span>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mt-2 group-hover:text-primary transition-colors font-bold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
