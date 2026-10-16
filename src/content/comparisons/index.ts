// Comparison copy registry, keyed by comparison slug. Every copy file in this folder is listed here.
import type { ComparisonCopy } from '../types';
import amerisleepAs3VsCasperTheOne from './amerisleep-as3-vs-casper-the-one';
import amerisleepAs3VsCasperDreamHybrid from './amerisleep-as3-vs-casper-dream-hybrid';
import amerisleepAs3VsLeesaOriginal from './amerisleep-as3-vs-leesa-original';
import amerisleepAs3VsLeesaSapiraHybrid from './amerisleep-as3-vs-leesa-sapira-hybrid';
import amerisleepAs3VsPurpleRestoreplusHybrid from './amerisleep-as3-vs-purple-restoreplus-hybrid';
import amerisleepAs3VsSaatvaClassic from './amerisleep-as3-vs-saatva-classic';
import amerisleepAs2VsAs3 from './amerisleep-as2-vs-as3';
import amerisleepAs3VsAs5 from './amerisleep-as3-vs-as5';
import amerisleepAs3VsAs6 from './amerisleep-as3-vs-as6';
import amerisleepAs3VsOrganica from './amerisleep-as3-vs-organica';
import amerisleepAs2VsAs5 from './amerisleep-as2-vs-as5';
import amerisleepAs6VsOrganica from './amerisleep-as6-vs-organica';
import amerisleepAs3VsNolahEvolution15 from './amerisleep-as3-vs-nolah-evolution-15';
import amerisleepAs3VsHelixMidnightLuxe from './amerisleep-as3-vs-helix-midnight-luxe';
import amerisleepAs3VsNestBeddingSparrow from './amerisleep-as3-vs-nest-bedding-sparrow';
import amerisleepAs3VsGlacierApexHybrid from './amerisleep-as3-vs-glacier-apex-hybrid';
import amerisleepAs3VsBrooklynBeddingAuroraLuxe from './amerisleep-as3-vs-brooklyn-bedding-aurora-luxe';
import amerisleepOrganicaVsBirchNatural from './amerisleep-organica-vs-birch-natural';
import amerisleepOrganicaVsAvocadoGreen from './amerisleep-organica-vs-avocado-green';
import amerisleepAs2VsBrooklynBeddingPlankFirm from './amerisleep-as2-vs-brooklyn-bedding-plank-firm';
import amerisleepAs2VsBearOriginal from './amerisleep-as2-vs-bear-original';
import amerisleepAs2VsHelixDawnLuxe from './amerisleep-as2-vs-helix-dawn-luxe';
import amerisleepAs6BlackSeriesVsLeesaSapiraChillHybrid from './amerisleep-as6-black-series-vs-leesa-sapira-chill-hybrid';
import amerisleepAs6BlackSeriesVsPurpleRestoreplusHybrid from './amerisleep-as6-black-series-vs-purple-restoreplus-hybrid';
import amerisleepAs6BlackSeriesVsSaatvaRx from './amerisleep-as6-black-series-vs-saatva-rx';
import amerisleepAs5HybridVsHelixSunsetLuxe from './amerisleep-as5-hybrid-vs-helix-sunset-luxe';
import amerisleepAs5VsGhostbedLuxe from './amerisleep-as5-vs-ghostbed-luxe';
import amerisleepAs5HybridVsLeesaSapiraChillHybrid from './amerisleep-as5-hybrid-vs-leesa-sapira-chill-hybrid';

export const COMPARISON_COPY: Record<string, ComparisonCopy> = Object.fromEntries(
  [amerisleepAs3VsCasperTheOne, amerisleepAs3VsCasperDreamHybrid, amerisleepAs3VsLeesaOriginal, amerisleepAs3VsLeesaSapiraHybrid, amerisleepAs3VsPurpleRestoreplusHybrid, amerisleepAs3VsSaatvaClassic, amerisleepAs2VsAs3, amerisleepAs3VsAs5, amerisleepAs3VsAs6, amerisleepAs3VsOrganica, amerisleepAs2VsAs5, amerisleepAs6VsOrganica, amerisleepAs3VsNolahEvolution15, amerisleepAs3VsHelixMidnightLuxe, amerisleepAs3VsNestBeddingSparrow, amerisleepAs3VsGlacierApexHybrid, amerisleepAs3VsBrooklynBeddingAuroraLuxe, amerisleepOrganicaVsBirchNatural, amerisleepOrganicaVsAvocadoGreen, amerisleepAs2VsBrooklynBeddingPlankFirm, amerisleepAs2VsBearOriginal, amerisleepAs2VsHelixDawnLuxe, amerisleepAs6BlackSeriesVsLeesaSapiraChillHybrid, amerisleepAs6BlackSeriesVsPurpleRestoreplusHybrid, amerisleepAs6BlackSeriesVsSaatvaRx, amerisleepAs5HybridVsHelixSunsetLuxe, amerisleepAs5VsGhostbedLuxe, amerisleepAs5HybridVsLeesaSapiraChillHybrid].map(copy => [copy.slug, copy]),
);
