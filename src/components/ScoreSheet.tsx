import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { mattresses } from '../data/mattresses';
import imgOrganica from '../assets/images/regenerated_image_1780219884937.png';
import imgAS2 from '../assets/images/regenerated_image_1780219887684.jpg';

export default function ScoreSheet() {
  // Sort by overall score descending and take top 5
  const rankings = [...mattresses]
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, 5)
    .map((m, index) => {
      let rating = '';
      if (m.scores.overall >= 9.5) rating = 'Outstanding';
      else if (m.scores.overall >= 9.0) rating = 'Excellent';
      else if (m.scores.overall >= 8.5) rating = 'Very Good';
      else rating = 'Good';

      let badge = '';
      if (index === 0) badge = '#1 Pick';
      else if (m.id === 'amerisleep-as6') badge = 'Top Performer';
      else if (m.id === 'amerisleep-organica') badge = 'Best Natural';
      else if (m.id === 'amerisleep-as2') badge = 'Best Value';
      else if (m.id === 'amerisleep-as5') badge = 'Best Soft';

      let resolvedImg = m.image;
      if (m.id === 'amerisleep-organica') resolvedImg = typeof imgOrganica === 'string' ? imgOrganica : imgOrganica.src;
      if (m.id === 'amerisleep-as2') resolvedImg = typeof imgAS2 === 'string' ? imgAS2 : imgAS2.src;

      return {
        rank: index + 1,
        name: m.name,
        desc: m.summary.split('.')[0] + '.',
        score: m.scores.overall.toFixed(1),
        rating,
        href: `/reviews/${m.id}`,
        badge,
        img: resolvedImg
      };
    });

  return (
    <section className="py-stack-lg relative overflow-hidden">
      <div className="liquid-blob bg-[#3b82f6] w-[600px] h-[400px] -right-[100px] top-[10%] opacity-[0.03]" />
      <div className="liquid-blob bg-[#fbbf24] w-[500px] h-[300px] left-[5%] top-[40%] opacity-[0.04]" />
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <motion.div 
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-display-lg font-display-lg text-primary mb-4">The score sheet</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Amerisleep mattresses ranked by composite testing score across comfort, support, cooling, motion isolation, and value. Updated May 2026.
          </p>
        </motion.div>

        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-outline-variant/30 text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant backdrop-blur-sm">
                  <th className="py-6 px-6 font-bold">Rank</th>
                  <th className="py-6 px-6 w-24 font-bold text-center">Photo</th>
                  <th className="py-6 px-6 font-bold">Mattress</th>
                  <th className="py-6 px-6 font-bold">Score</th>
                  <th className="py-6 px-6 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {rankings.map((item, index) => (
                  <motion.tr 
                    key={item.rank}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    <td className="py-7 px-6 text-headline-md font-headline-md text-secondary w-16 text-center">{item.rank}</td>
                    <td className="py-7 px-6">
                      <div className="w-20 h-14 rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                      </div>
                    </td>
                    <td className="py-7 px-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-body-lg font-bold text-primary group-hover:text-secondary transition-colors">{item.name}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-secondary/10 text-secondary px-2 py-0.5 rounded-full border border-secondary/20">{item.badge}</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
                      </div>
                    </td>
                    <td className="py-7 px-6">
                      <div className="flex flex-col">
                        <span className="text-headline-md font-headline-md text-primary tracking-tight group-hover:text-secondary">{item.score}</span>
                        <span className="text-[10px] font-label-sm text-secondary uppercase tracking-widest mt-1 font-bold">{item.rating}</span>
                      </div>
                    </td>
                    <td className="py-7 px-6 text-right">
                      <a href={item.href} className="inline-flex items-center justify-center text-[11px] font-label-sm uppercase tracking-widest text-primary bg-white/80 hover:bg-secondary hover:text-white transition-all rounded-full border border-primary/20 hover:border-transparent px-6 py-3 shadow-sm hover:shadow-md font-bold">
                        Read review <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
