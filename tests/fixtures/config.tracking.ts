/** Tracking fixture: a dummy pixel ID so PageView, Contact and Lead can be observed in tests. */
import base from '../../site.config.ts';
import type { SiteConfig } from '../../src/config/types.ts';

const config: SiteConfig = { ...base, tracking: { metaPixelId: '000000000000000' } };
export default config;
