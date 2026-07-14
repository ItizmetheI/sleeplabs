import { comparisons } from './src/data/comparisons.js';
for (let c of comparisons) {
  if (c.faqs && c.faqs.length === 1) {
    console.log(c.slug);
  }
}
