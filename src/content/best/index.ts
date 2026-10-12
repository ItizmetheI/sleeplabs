// Best-of copy registry, keyed by page slug. Every copy file in this folder is listed here.
import type { BestCopy } from '../types';
import overall from './overall';
import sideSleepers from './side-sleepers';
import backSleepers from './back-sleepers';
import stomachSleepers from './stomach-sleepers';
import combinationSleepers from './combination-sleepers';
import couples from './couples';
import motionIsolation from './motion-isolation';
import cooling from './cooling';
import firm from './firm';
import soft from './soft';
import hybrid from './hybrid';
import memoryFoam from './memory-foam';
import latex from './latex';
import organic from './organic';
import luxury from './luxury';
import value from './value';
import heavySleepers from './heavy-sleepers';
import pressureRelief from './pressure-relief';
import backPain from './back-pain';
import hipPain from './hip-pain';
import shoulderPain from './shoulder-pain';

export const BEST_COPY: Record<string, BestCopy> = Object.fromEntries(
  [overall, sideSleepers, backSleepers, stomachSleepers, combinationSleepers, couples, motionIsolation, cooling, firm, soft, hybrid, memoryFoam, latex, organic, luxury, value, heavySleepers, pressureRelief, backPain, hipPain, shoulderPain].map(copy => [copy.slug, copy]),
);
