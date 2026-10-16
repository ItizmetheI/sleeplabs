// Review copy registry, keyed by review slug. Every review file in this folder is listed here.
import type { ReviewCopy } from '../types';
import amerisleepAs2 from './amerisleep-as2';
import amerisleepAs3 from './amerisleep-as3';
import amerisleepAs3Hybrid from './amerisleep-as3-hybrid';
import amerisleepAs5 from './amerisleep-as5';
import amerisleepAs5Hybrid from './amerisleep-as5-hybrid';
import amerisleepAs6 from './amerisleep-as6';
import amerisleepOrganica from './amerisleep-organica';
import amerisleepOrganicaPlush from './amerisleep-organica-plush';
import avocadoGreen from './avocado-green';
import bearOriginal from './bear-original';
import birchNatural from './birch-natural';
import brooklynBeddingAuroraLuxe from './brooklyn-bedding-aurora-luxe';
import brooklynBeddingPlankFirm from './brooklyn-bedding-plank-firm';
import casperDreamHybrid from './casper-dream-hybrid';
import casperTheOne from './casper-the-one';
import ecoTerraHybridLatex from './eco-terra-hybrid-latex';
import formCore from './form-core';
import formCoreHybrid from './form-core-hybrid';
import formPrime from './form-prime';
import formPrimeX from './form-prime-x';
import ghostbedLuxe from './ghostbed-luxe';
import glacierApexHybrid from './glacier-apex-hybrid';
import glacierOriginalHybrid from './glacier-original-hybrid';
import glacierSummitHybrid from './glacier-summit-hybrid';
import happsy from './happsy';
import helixDawnLuxe from './helix-dawn-luxe';
import helixMidnightLuxe from './helix-midnight-luxe';
import helixSunsetLuxe from './helix-sunset-luxe';
import latexForLessHybridLatexMattress from './latex-for-less-hybrid-latex-mattress';
import leesaOriginal from './leesa-original';
import leesaSapiraChillHybrid from './leesa-sapira-chill-hybrid';
import leesaSapiraHybrid from './leesa-sapira-hybrid';
import naturepedicConcertoPlush from './naturepedic-concerto-plush';
import naturepedicEosClassic from './naturepedic-eos-classic';
import nestBeddingOwl from './nest-bedding-owl';
import nestBeddingPuffinKids from './nest-bedding-puffin-kids';
import nestBeddingRaven from './nest-bedding-raven';
import nestBeddingSparrow from './nest-bedding-sparrow';
import nolahEvolution15 from './nolah-evolution-15';
import nolahNatural11 from './nolah-natural-11';
import plushbedsBotanicalBliss from './plushbeds-botanical-bliss';
import plushbedsLuxuryBliss from './plushbeds-luxury-bliss';
import plushbedsOrganicBliss from './plushbeds-organic-bliss';
import plushbedsOrganicKids from './plushbeds-organic-kids';
import plushbedsSignatureBliss from './plushbeds-signature-bliss';
import purpleRestoreplusHybrid from './purple-restoreplus-hybrid';
import saatvaClassic from './saatva-classic';
import saatvaRx from './saatva-rx';
import sweetnightCoolnest from './sweetnight-coolnest';
import vayaFoam from './vaya-foam';
import vayaHybrid from './vaya-hybrid';
import westinHeavenlyBed from './westin-heavenly-bed';
import zomaBoost from './zoma-boost';
import zomaHybrid from './zoma-hybrid';
import zomaStart from './zoma-start';

export const REVIEW_COPY: Record<string, ReviewCopy> = Object.fromEntries(
  [
    amerisleepAs2, amerisleepAs3, amerisleepAs3Hybrid, amerisleepAs5, amerisleepAs5Hybrid,
    amerisleepAs6, amerisleepOrganica, amerisleepOrganicaPlush, avocadoGreen, bearOriginal, birchNatural, brooklynBeddingAuroraLuxe, brooklynBeddingPlankFirm, casperDreamHybrid, casperTheOne, ecoTerraHybridLatex, formCore, formCoreHybrid, formPrime, formPrimeX, ghostbedLuxe, glacierApexHybrid, glacierOriginalHybrid, glacierSummitHybrid, happsy, helixDawnLuxe, helixMidnightLuxe, helixSunsetLuxe, latexForLessHybridLatexMattress, leesaOriginal, leesaSapiraChillHybrid, leesaSapiraHybrid, naturepedicConcertoPlush, naturepedicEosClassic, nestBeddingOwl, nestBeddingPuffinKids, nestBeddingRaven, nestBeddingSparrow, nolahEvolution15, nolahNatural11, plushbedsBotanicalBliss, plushbedsLuxuryBliss, plushbedsOrganicBliss, plushbedsOrganicKids, plushbedsSignatureBliss, purpleRestoreplusHybrid, saatvaClassic, saatvaRx, sweetnightCoolnest, vayaFoam, vayaHybrid, westinHeavenlyBed, zomaBoost, zomaHybrid, zomaStart,
  ].map(copy => [copy.slug, copy]),
);
