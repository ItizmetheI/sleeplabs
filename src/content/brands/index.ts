// Brand copy registry, keyed by brand slug. Every copy file in this folder is listed here.
import type { BrandCopy } from '../types';
import amerisleep from './amerisleep';
import avocado from './avocado';
import bear from './bear';
import birch from './birch';
import brooklynBedding from './brooklyn-bedding';
import casper from './casper';
import ecoTerra from './eco-terra';
import form from './form';
import ghostbed from './ghostbed';
import glacier from './glacier';
import happsy from './happsy';
import helix from './helix';
import latexForLess from './latex-for-less';
import leesa from './leesa';
import naturepedic from './naturepedic';
import nestBedding from './nest-bedding';
import nolah from './nolah';
import plushbeds from './plushbeds';
import purple from './purple';
import saatva from './saatva';
import sweetnight from './sweetnight';
import vaya from './vaya';
import westin from './westin';
import zoma from './zoma';

export const BRAND_COPY: Record<string, BrandCopy> = Object.fromEntries(
  [amerisleep, avocado, bear, birch, brooklynBedding, casper, ecoTerra, form, ghostbed, glacier, happsy, helix, latexForLess, leesa, naturepedic, nestBedding, nolah, plushbeds, purple, saatva, sweetnight, vaya, westin, zoma].map(copy => [copy.slug, copy]),
);
