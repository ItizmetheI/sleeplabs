import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const needs = [
  { num: '01', title: 'Side Sleepers', desc: 'AS3 and AS5 relieve shoulder and hip pressure with HIVE® zoning', href: '/reviews/amerisleep-as3' },
  { num: '02', title: 'Back Sleepers', desc: 'AS2 medium-firm support prevents lumbar sinkage and lower back strain', href: '/reviews/amerisleep-as2' },
  { num: '03', title: 'Hot Sleepers', desc: 'AS6 pocketed coils and Bio-Pur® open-cell foam tested 9.4/10 for cooling', href: '/reviews/amerisleep-as6' },
  { num: '04', title: 'Couples', desc: 'Motion isolation 9.0–9.4/10 across the lineup. AS6 best for edge support', href: '/reviews/amerisleep-as6' },
  { num: '05', title: 'Back Pain', desc: 'AS2 medium-firm prevents sinkage. AS3 relieves pressure-point back pain', href: '/reviews/amerisleep-as2' },
  { num: '06', title: 'Pressure Relief', desc: 'AS5 scores maximum 9.8/10 for shoulder and hip pressure relief', href: '/reviews/amerisleep-as5' },
  { num: '07', title: 'Eco-Conscious', desc: 'Organica uses GOLS latex, GOTS cotton, organic wool — no synthetic foams', href: '/reviews/amerisleep-organica' },
  { num: '08', title: 'Combination Sleepers', desc: 'AS3 medium feel suits both side and back positions equally well', href: '/reviews/amerisleep-as3' }
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
          className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-3"
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
          Start with how you sleep, what feels uncomfortable, or what you want to improve. We've grouped our top-tested picks by the needs that matter most.
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
            whileHover={{ y: -8, scale: 1.02 }}
            className="group block p-7 glass-panel hover:glass-panel-heavy hover:border-secondary transition-all duration-300 rounded-3xl h-full flex flex-col relative overflow-hidden shadow-sm hover:shadow-lg"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-4 opacity-70 group-hover:opacity-100 transition-opacity relative z-10 font-bold">{need.num}</div>
            <h4 className="text-headline-md font-headline-md text-primary mb-2 group-hover:text-secondary transition-colors relative z-10">{need.title}</h4>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6 flex-grow relative z-10">{need.desc}</p>
            <div className="mt-auto relative z-10">
              <div className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                <ArrowRight className="text-secondary group-hover:text-white w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
