import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Methodology() {
  return (
    <section className="bg-transparent py-stack-lg border-y border-outline-variant/30 relative overflow-hidden">
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-3">Our Methodology</h3>
            <h2 className="text-display-lg font-display-lg text-primary  mb-6">How We Test Mattresses</h2>
            <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              Every mattress we review is evaluated by the PureSleep testing team using the same published rubric. We score value, edge support, trial period, response time, motion transfer, and cooling &amp; breathability across multiple sleep positions.
            </p>
            <a href="/methodology" className="inline-flex items-center text-label-sm font-label-sm uppercase tracking-widest text-primary border border-primary/20 rounded-full px-8 py-4 hover:bg-white transition-all group shadow-sm hover:shadow-md glass-panel font-bold">
              Read Our Full Methodology <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {[
              { stat: "7", title: "Scoring Criteria", desc: "Overall, Value, Edge Support, Trial Period, Response Time, Motion Transfer, and Cooling & Breathability — each scored 0–10." },
              { stat: "59", title: "Models Reviewed", desc: "Mattresses from 24 brands, including affiliated One Sleep Group brands and their competitors." },
              { stat: "24", title: "Brands Covered", desc: "Each brand is evaluated using the same seven scoring criteria and 0–10 scale." },
              { stat: "1", title: "Published Rubric", desc: "Every covered mattress uses the same seven score fields, 0–10 scale, and evidence limits." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col border-t border-outline-variant/30 pt-5 relative group"
              >
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                <span className="text-display-lg font-display-lg text-secondary mb-2">{item.stat}</span>
                <span className="text-label-sm font-label-sm text-primary uppercase tracking-widest mb-3 font-bold">{item.title}</span>
                <span className="text-body-md text-on-surface-variant leading-relaxed">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
