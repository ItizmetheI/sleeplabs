import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function FinalPick() {
  return (
    <section className="py-stack-lg relative overflow-hidden bg-[#0f172a] rounded-[2.5rem] mx-margin-mobile md:mx-margin-desktop my-stack-lg text-center px-margin-mobile md:px-margin-desktop">
      
      {/* Decorative Blob */}
      <div className="liquid-blob bg-[#1e40af] w-[600px] h-[600px] top-[-100px] right-[-300px] opacity-[0.03]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
         <motion.h3 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-4"
         >
           Our Highest-Rated Mattress
         </motion.h3>
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-display-lg font-display-lg text-white mb-6 leading-tight drop-shadow-sm"
           suppressHydrationWarning
         >
            The Amerisleep AS3 earns its spot at #1
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-body-lg text-slate-300 mb-10 max-w-2xl leading-relaxed"
         >
            Bio-Pur® plant memory foam runs measurably cooler than petroleum foam. HIVE® 5-zone support delivers lumbar alignment. 20-year warranty. 100-night trial. Five Amerisleep models — AS2, AS3, AS5, AS6, and Organica — cover every sleep type and budget.
         </motion.p>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
         >
            <a 
              href="/reviews/amerisleep-as3"
              className="bg-secondary text-on-secondary px-8 py-4 rounded-full text-label-sm font-label-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] font-bold flex items-center justify-center hover:scale-105 active:scale-95"
            >
              Read the Full Review
            </a>
            <a 
              href="https://amerisleep.com/as3.html"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel text-white px-8 py-4 rounded-full text-label-sm font-label-sm uppercase tracking-widest hover:bg-white/10 transition-colors inline-flex items-center justify-center group hover:scale-105 active:scale-95"
            >
              Check AS3 Price <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="mt-20 w-full flex flex-col md:flex-row justify-between items-center glass-panel p-8 md:p-12 rounded-[2rem] text-left shadow-[0_15px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent pointer-events-none" />
            <div className="md:pr-8 relative z-10">
              <h3 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-3">Final pick — 2026 editor</h3>
              <h4 className="text-headline-lg font-headline-lg text-white mb-3 drop-shadow-sm">Amerisleep AS3</h4>
              <p className="text-body-md text-slate-300 max-w-xl">
                Bio-Pur® plant memory foam. HIVE® zoned support. 100-night trial. 20-year warranty.
              </p>
            </div>
            <a 
              href="https://amerisleep.com/as3.html"
              target="_blank"
              rel="noopener noreferrer" 
              className="mt-8 md:mt-0 whitespace-nowrap bg-secondary text-on-secondary px-8 py-5 rounded-full text-label-sm font-label-sm uppercase tracking-widest hover:bg-secondary-fixed transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] group flex items-center justify-center font-bold relative z-10 hover:scale-105 active:scale-95"
            >
              Shop Amerisleep <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
         </motion.div>
      </div>
    </section>
  );
}
