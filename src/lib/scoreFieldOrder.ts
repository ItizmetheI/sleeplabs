type ScoreFieldModel = {
  brand: string;
  name: string;
  scores: {
    overall: number;
  };
};

export const orderFullScoreField = <T extends ScoreFieldModel>(models: T[]): T[] => {
  const scoreBuckets = new Map<number, T[]>();

  for (const model of models) {
    const bucket = scoreBuckets.get(model.scores.overall) ?? [];
    bucket.push(model);
    scoreBuckets.set(model.scores.overall, bucket);
  }

  return [...scoreBuckets.keys()]
    .sort((a, b) => b - a)
    .flatMap(score => {
      const byBrand = new Map<string, T[]>();
      for (const model of scoreBuckets.get(score) ?? []) {
        const brandModels = byBrand.get(model.brand) ?? [];
        brandModels.push(model);
        byBrand.set(model.brand, brandModels);
      }

      const brandQueues = [...byBrand.entries()]
        .sort(([brandA], [brandB]) => brandA.localeCompare(brandB))
        .map(([, brandModels]) => brandModels.sort((a, b) => a.name.localeCompare(b.name)));
      const longestQueue = Math.max(...brandQueues.map(queue => queue.length));

      return Array.from({ length: longestQueue }, (_, index) =>
        brandQueues.map(queue => queue[index]).filter((model): model is T => Boolean(model))
      ).flat();
    });
};
