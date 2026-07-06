import { Star, StarHalf } from 'lucide-react';
import { motion } from 'motion/react';
import heroImg from '../assets/images/regenerated_image_1780219880901.png';
import { mattresses } from '../data/mattresses';

export default function Hero() {
  const as3 = mattresses.find(m => m.id === 'amerisleep-as3')!;

  return (
    <header className="relative pt-[100px] pb-[100px] px-margin-mobile md:px-margin-desktop overflow-hidden">
      {/* Specific Hero liquid background blobs to ensure extra brightness here */}
      <div className="liquid-blob bg-[#1e40af] w-[600px] h-[600px] top-[-100px] left-[-200px] opacity-[0.03]" />
      <div className="liquid-blob bg-[#fbbf24] w-[500px] h-[500px] bottom-[-50px] right-[-100px] opacity-[0.05]" />
      <div className="liquid-blob bg-[#3b82f6] w-[400px] h-[400px] top-[20%] right-[30%] opacity-[0.05]" />

      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center relative z-10">
        {/* Left Col */}
        <motion.div 
          initial={false} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-7 flex flex-col gap-stack-md pr-0 md:pr-12"
        >
          <div className="inline-flex">
            <motion.span 
              initial={false} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-panel text-secondary text-label-sm font-label-sm px-4 py-1.5 rounded-full uppercase tracking-wider font-bold"
            >
              HANDS-ON TESTED · 59 MODELS · 7 METRICS
            </motion.span>
          </div>
          <h1 className="text-display-lg font-display-lg  text-primary leading-tight">
            The Mattress Review You Can Actually <span className="text-secondary drop-shadow-sm">Trust.</span>
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            Independent, hands-on testing team reviews to help you find your best night's sleep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a 
              href="/reviews"
              className="bg-primary text-on-primary px-8 py-4 rounded-full shadow-xl shadow-primary/20 text-label-sm font-label-sm uppercase tracking-widest hover:bg-blue-800 transition-all duration-300 font-bold text-center hover:scale-105 active:scale-95"
            >
              FIND MY PERFECT MATTRESS
            </a>
            <a 
              href="/reviews/amerisleep-as3"
              className="glass-panel text-primary px-8 py-4 rounded-full text-label-sm font-label-sm uppercase tracking-widest hover:bg-primary/5 transition-colors font-bold text-center hover:scale-105 active:scale-95"
            >
              READ OUR TOP PICK
            </a>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-label-sm font-label-sm text-secondary uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary block"></span> Physically tested</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary block"></span> Hands-on tested</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary block"></span> Updated monthly</span>
          </div>
        </motion.div>

        {/* Right Col */}
        <motion.div 
          initial={false} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-5 relative mt-12 md:mt-0 flex flex-col gap-stack-md"
        >
          {/* Stacked Image Card */}
          <motion.a 
            href="/reviews/amerisleep-as3"
            whileHover={{ y: -5 }}
            className="relative rounded-3xl overflow-hidden glass-panel h-72 group border border-[rgba(255,255,255,1)] block"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 transition-opacity group-hover:opacity-60" />
            <img 
              alt="Premium minimalist bedroom setup" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={typeof heroImg === 'string' ? heroImg : heroImg.src} 
            />
            <div className="absolute bottom-5 left-5 z-20">
              <span className="bg-primary/90 text-white text-label-sm font-label-sm px-5 py-2.5 rounded-full shadow-lg border border-primary/20 backdrop-blur-md font-bold">
                AMERISLEEP AS3 — #1 PICK 2026
              </span>
            </div>
          </motion.a>

          {/* Product Score Card */}
          <motion.div 
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="glass-panel-heavy rounded-3xl p-7 flex flex-col gap-stack-sm relative z-30 -mt-20 ml-8 lg:-ml-8 lg:-mt-16 border border-white"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/50 pb-4">
              <div className="flex items-center gap-1 text-tertiary drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <StarHalf size={18} fill="currentColor" strokeWidth={0} />
              </div>
              <span className="text-label-sm font-label-sm text-tertiary uppercase tracking-widest bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/20 font-bold">
                OUR TOP PICK
              </span>
            </div>
            
            <h3 className="text-headline-md font-headline-md text-primary mt-2">Amerisleep AS3</h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mt-4 text-center">
              <div className="flex flex-col bg-white/80 shadow-sm border border-outline-variant/30 p-3 rounded-2xl transition-transform hover:scale-105">
                <span className="text-headline-md font-headline-md text-primary font-bold">{as3.scores.overall}</span>
                <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant mt-1">Overall</span>
              </div>
              <div className="flex flex-col bg-white/80 shadow-sm border border-outline-variant/30 p-3 rounded-2xl transition-transform hover:scale-105">
                <span className="text-headline-md font-headline-md text-secondary font-bold">{as3.trialNights}</span>
                <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant mt-1">Night Trial</span>
              </div>
              <div className="flex flex-col bg-white/80 shadow-sm border border-outline-variant/30 p-3 rounded-2xl transition-transform hover:scale-105">
                <span className="text-headline-md font-headline-md text-primary font-bold">5</span>
                <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant mt-1">Models</span>
              </div>
              <div className="flex flex-col bg-white/80 shadow-sm border border-outline-variant/30 p-3 rounded-2xl transition-transform hover:scale-105">
                <span className="text-headline-md font-headline-md text-primary font-bold">{as3.warrantyYears}</span>
                <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant mt-1">Years</span>
              </div>
            </div>

            {/* Rating Bars — real 7-metric scores, not invented numbers */}
            <div className="flex flex-col gap-3.5 mt-5">
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-label-sm w-28 text-on-surface-variant">Edge Support</span>
                <div className="flex-grow mx-4 h-1.5 bg-outline-variant/40 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${as3.scores.edgeSupport * 10}%` }} transition={{ delay: 1, duration: 1 }} className="bg-tertiary h-full rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></motion.div>
                </div>
                <span className="text-label-sm font-label-sm text-primary font-bold">{as3.scores.edgeSupport}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-label-sm w-28 text-on-surface-variant">Cooling</span>
                <div className="flex-grow mx-4 h-1.5 bg-outline-variant/40 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${as3.scores.coolingBreathability * 10}%` }} transition={{ delay: 1.1, duration: 1 }} className="bg-tertiary h-full rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></motion.div>
                </div>
                <span className="text-label-sm font-label-sm text-primary font-bold">{as3.scores.coolingBreathability}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-label-sm w-28 text-on-surface-variant">Value</span>
                <div className="flex-grow mx-4 h-1.5 bg-outline-variant/40 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${as3.scores.value * 10}%` }} transition={{ delay: 1.2, duration: 1 }} className="bg-tertiary h-full rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></motion.div>
                </div>
                <span className="text-label-sm font-label-sm text-primary font-bold">{as3.scores.value}</span>
              </div>
            </div>

            <motion.a 
              href="/reviews/amerisleep-as3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-3.5 mt-5 rounded-full text-label-sm font-label-sm uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-primary/20 font-bold text-center block"
            >
              READ FULL REVIEW
            </motion.a>
            <div className="text-center mt-3 text-label-sm font-label-sm text-on-surface-variant">
              From $999 · Free Shipping & Returns
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
