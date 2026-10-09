/** Empty proof fixture: every review badge must disappear and layouts close up. */
import base from '../../site.config.ts';
import type { SiteConfig } from '../../src/config/types.ts';

const config: SiteConfig = { ...base, proof: { ...base.proof, rating: '', count: '' } };
export default config;
