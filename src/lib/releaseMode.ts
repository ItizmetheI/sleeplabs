// ponytail: default is preview, not production. A missing env var must fail CLOSED (noindex),
// because the failure mode of guessing wrong is a duplicate site indexed under the wrong brand.
// Production indexing is opt-in: PUBLIC_INDEXING_MODE=production.
const MODE = process.env.PUBLIC_INDEXING_MODE === 'production' ? 'production' : 'preview';

export const indexingMode = (): 'preview' | 'production' => MODE;
export const isPreviewMode = (): boolean => MODE === 'preview';
