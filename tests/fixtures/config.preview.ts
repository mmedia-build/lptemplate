/** Hosted-preview fixture: relative thank-you path so the page works when served from a sub-folder. Not deployed. */
import base from '../../site.config.ts';
import type { SiteConfig } from '../../src/config/types.ts';

const config: SiteConfig = { ...base, form: { ...base.form, thankYouPath: 'thank-you.html' } };
export default config;
