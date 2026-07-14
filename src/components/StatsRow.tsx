import { motion } from 'motion/react';

const stats = [
  { value: "59", label: "Mattress Models Scored" },
  { value: "24", label: "Brands Covered" },
  { value: "7", label: "Metrics Scored Per Mattress" },
  { value: "30", label: "Head-to-Head Comparisons" },
];

export default function StatsRow() {
  return (
    <section className="py-10 border-b border-outline-variant bg-white">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-outline-variant/30">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col"
            >
              <span className="text-headline-lg font-headline-lg text-secondary">{stat.value}</span>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase mt-2 font-bold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
