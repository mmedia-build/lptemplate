/** Agency preset with a dummy pixel ID, so the quiz's pixel events can be observed in tests. */
import base from '../../examples/site.config.agency.ts';
import type { SiteConfig } from '../../src/config/types.ts';

const config: SiteConfig = { ...base, tracking: { ...base.tracking, metaPixelId: '000000000000000' } };
export default config;
