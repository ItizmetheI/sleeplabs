import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function EditorsPickDetails() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10">
        <motion.div 
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col gap-4 border-r-0 md:border-r border-outline-variant/30 pr-0 md:pr-10"
        >
          <h2 className="text-display-lg font-display-lg text-primary ">Amerisleep AS3</h2>
          <div className="w-full h-72 glass-panel rounded-3xl mt-4 overflow-hidden shadow-sm group relative border border-outline-variant/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 transition-opacity group-hover:opacity-60" />
            <img 
              alt="Amerisleep AS3 Mattress" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="/images/mattresses/amerisleep-as3.webp" 
            />
          </div>
        </motion.div>
        <motion.div 
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-7 flex flex-col gap-stack-md md:pl-10 mt-8 md:mt-0"
        >
          <div className="glass-panel p-8 rounded-3xl border border-outline-variant/30 bg-white/40">
            <h3 className="text-headline-md font-headline-md text-primary mb-3">Why Amerisleep AS3 is our #1 pick</h3>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
              AS3 is our #1 mattress pick for 2026 — Bio-Pur® plant memory foam, HIVE® 5-zone support, and a 20-year warranty.
            </p>
            <a href="https://amerisleep.com/as3.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-secondary font-label-sm uppercase tracking-widest mt-5 hover:text-primary transition-colors group px-4 py-2 rounded-full border border-secondary hover:bg-secondary/10">
              See Amerisleep AS3 pricing <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="glass-panel p-8 rounded-3xl mt-2 relative border border-outline-variant/30 bg-white/40">
            <h3 className="text-headline-md font-headline-md text-primary mb-3">Superior Plant-Based Technology</h3>
            <p className="text-body-md font-body-md text-on-surface-variant mb-4 leading-relaxed">
              Amerisleep AS3 leads the industry with Bio-Pur® plant memory foam (measurably cooler than petroleum), HIVE® zoned support (5-zone spinal alignment), a 100-night home trial, and a 20-year warranty backed directly by the manufacturer.
            </p>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Bio-Pur® plant-based memory foam tested over 30 nights. Faster bounce-back than standard foam, lower off-gassing, breathable open-cell construction. 100-night home trial, 20-year warranty.
            </p>
            <a href="https://amerisleep.com/as3.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-secondary font-label-sm uppercase tracking-widest mt-6 hover:text-primary transition-colors group px-4 py-2 rounded-full border border-secondary hover:bg-secondary/10">
              See AS3 pricing <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
