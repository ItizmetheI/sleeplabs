import { ArrowRight } from 'lucide-react';
import as2Img from '../assets/images/regenerated_image_1780219890458.jpg';

export default function LatestGuides() {
  return (
    <section className="py-stack-lg bg-transparent relative overflow-hidden border-t border-outline-variant/30 mt-10">
      <div className="liquid-blob bg-[#3b82f6] w-[600px] h-[600px] right-[-300px] top-[-100px] opacity-[0.03]" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6 border-b border-outline-variant/30 pb-8">
          <div>
            <h3 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-3 font-bold drop-shadow-sm">Expert Coverage</h3>
            <h2 className="text-display-lg font-display-lg text-primary drop-shadow-sm">Latest Guides & Reviews</h2>
          </div>
          <a href="/blog" className="inline-flex items-center text-label-sm font-label-sm uppercase tracking-widest border border-outline-variant px-6 py-3 hover:bg-outline-variant/20 hover:text-primary text-on-surface-variant transition-colors group rounded-full font-bold">
            All Articles <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-gutter">
          {/* Main featured article */}
          <div className="md:col-span-7 flex flex-col gap-6 group">
            <a href="/reviews/amerisleep-as3" className="w-full h-64 md:h-96 glass-panel rounded-3xl overflow-hidden relative shadow-md border border-outline-variant/30 block">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 opacity-30 group-hover:opacity-60" />
               <img src="https://cdn11.bigcommerce.com/s-36im9ihtig/content/assets/mattress-category-listing/amerisleep-as3-listing.jpg" alt="Amerisleep AS3 Review" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 text-primary border border-white/50 backdrop-blur-md px-6 py-2 rounded-full text-label-sm uppercase tracking-widest font-bold">Read Article</span>
               </div>
            </a>
            <div>
              <div className="text-label-sm font-label-sm uppercase tracking-widest text-secondary mb-3 font-bold drop-shadow-sm">
                Review · Updated May 2026
              </div>
              <h3 className="text-headline-lg font-headline-lg mb-4 text-primary hover:text-secondary transition-colors cursor-pointer">
                <a href="/reviews/amerisleep-as3">Amerisleep AS3 Review (2026): Our #1 Rated Mattress</a>
              </h3>
              <p className="text-body-lg text-on-surface-variant mb-6 max-w-xl leading-relaxed">
                Hands-on tested. Bio-Pur® foam, HIVE® zoning, 20-year warranty. Full breakdown of every layer and every score.
              </p>
              <a href="/reviews/amerisleep-as3" className="inline-flex items-center text-label-sm font-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors group font-bold">
                Read Full Review <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Secondary articles */}
          <div className="md:col-span-5 flex flex-col gap-8 md:pl-8 md:border-l border-outline-variant/30">
            <div className="flex flex-col gap-5 group cursor-pointer">
              <a href="/comparison/amerisleep-as2-vs-as3" className="w-full h-48 glass-panel rounded-3xl overflow-hidden relative border border-outline-variant/30 block">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                 <img src={typeof as2Img === 'string' ? as2Img : as2Img.src} alt="AS2 vs AS3 Comparison" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </a>
              <div>
                <div className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant mb-2">
                  Comparison · May 2026
                </div>
                <h4 className="text-headline-md font-headline-md mb-3 text-primary group-hover:text-secondary transition-colors leading-snug">
                  <a href="/comparison/amerisleep-as2-vs-as3">Amerisleep AS2 vs AS3: Which Is Right for You?</a>
                </h4>
                <a href="/comparison/amerisleep-as2-vs-as3" className="inline-flex items-center text-label-sm font-label-sm uppercase tracking-widest group-hover:text-primary transition-colors text-secondary font-bold">
                  Read Comparison <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="w-full h-[1px] bg-outline-variant/30 my-2"></div>

            <div className="flex flex-col gap-5 group cursor-pointer">
              <div>
                <div className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant mb-2">
                  Guide · May 2026
                </div>
                <h4 className="text-headline-md font-headline-md mb-3 text-primary group-hover:text-secondary transition-colors leading-snug">
                  <a href="/topics">Memory Foam vs Latex vs Hybrid: Which Type Is Best?</a>
                </h4>
                <a href="/topics" className="inline-flex items-center text-label-sm font-label-sm uppercase tracking-widest group-hover:text-primary transition-colors text-secondary font-bold">
                  Read Guide <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
