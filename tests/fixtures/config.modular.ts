/**
 * Modularity fixture: four sections disabled (including the dark comparison
 * section) and two reordered (steps moved above testimonials, bento moved
 * after the letter). Built by scripts/verify.mjs; never deployed.
 */
import base from '../../site.config.ts';
import type { SiteConfig, SectionConfig } from '../../src/config/types.ts';

const disabled = new Set(['trustStrip', 'comparison', 'projects', 'guarantee']);
let secondGrid = 0;
const sections: SectionConfig[] = base.sections.map((s) => {
  if (disabled.has(s.type)) return { ...s, enabled: false };
  if (s.type === 'photoGrid' && ++secondGrid === 2) return { ...s, enabled: false };
  return s;
});
const take = (type: string) => {
  const i = sections.findIndex((s) => s.type === type);
  return sections.splice(i, 1)[0];
};
const steps = take('steps');
sections.splice(sections.findIndex((s) => s.type === 'testimonials'), 0, steps);
const bento = take('bentoGallery');
sections.splice(sections.findIndex((s) => s.type === 'letter') + 1, 0, bento);

const config: SiteConfig = { ...base, sections };
export default config;
