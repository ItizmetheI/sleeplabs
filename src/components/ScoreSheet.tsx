import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { allMattresses } from '../data/mattresses';

const leaderConfig = [
  { id: 'amerisleep-as3', category: 'Overall' },
  { id: 'plushbeds-signature-bliss', category: 'Organic' },
  { id: 'vaya-hybrid', category: 'Value' },
  { id: 'nest-bedding-sparrow', category: 'Trial period' },
  { id: 'ghostbed-luxe', category: 'Cooling foam' },
  { id: 'westin-heavenly-bed', category: 'Hotel-style feel' },
];

export default function ScoreSheet() {
  const leaders = leaderConfig.map(config => {
    const mattress = allMattresses.find(item => item.id === config.id);
    if (!mattress) throw new Error(`Missing score-sheet model: ${config.id}`);
    return { ...config, mattress };
  });

  return (
    <section className="py-stack-lg relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <p className="text-label-sm font-label-sm uppercase text-secondary font-bold mb-3">Cross-brand starting points</p>
          <h2 className="text-display-lg font-display-lg text-primary mb-4">Selected category leaders</h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Six models illustrating different strengths. These are category entry points, not one overall ranking. Open the full score field to compare every model.
          </p>
        </motion.div>

        <div className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low text-label-sm font-label-sm uppercase text-on-surface-variant">
                  <th className="py-4 px-5 font-bold">Category</th>
                  <th className="py-4 px-5 w-24 font-bold">Product</th>
                  <th className="py-4 px-5 font-bold">Mattress</th>
                  <th className="py-4 px-5 font-bold">Overall</th>
                  <th className="py-4 px-5 text-right font-bold">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {leaders.map(({ category, mattress }, index) => (
                  <motion.tr
                    key={mattress.id}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    className="hover:bg-surface-container-low transition-colors group"
                  >
                    <td className="py-5 px-5 text-body-md font-bold text-secondary">{category}</td>
                    <td className="py-5 px-5">
                      <div className="w-20 h-14 bg-white overflow-hidden">
                        <img src={mattress.image} alt="" className="w-full h-full object-contain" />
                      </div>
                    </td>
                    <td className="py-5 px-5">
                      <h3 className="text-body-lg font-bold text-primary group-hover:text-secondary transition-colors">{mattress.name}</h3>
                      <p className="text-body-sm text-on-surface-variant mt-1">{mattress.type.replaceAll('-', ' ')} · {mattress.firmness.replaceAll('-', ' ')}</p>
                    </td>
                    <td className="py-5 px-5">
                      <span className="text-headline-md font-bold text-primary">{mattress.scores.overall}</span>
                      <span className="text-body-sm text-on-surface-variant">/10</span>
                    </td>
                    <td className="py-5 px-5 text-right">
                      <a href={`/reviews/${mattress.id}/`} aria-label={`Read the ${mattress.name} review`} className="inline-flex w-10 h-10 items-center justify-center rounded-lg border border-outline-variant text-primary hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-outline-variant bg-surface-container-low flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-body-sm text-on-surface-variant">Every category page includes all 59 models and all seven score fields.</p>
            <a href="/best/overall/" className="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors">
              Compare the complete field <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
