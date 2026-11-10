/**
 * Reference C preset with test values for the parts that are empty in the
 * preset: a review rating (so the pill renders) and video URLs (so the VSL
 * and a result card have something to play). Values are test data only.
 */
import preset from '../../examples/site.config.vsl.ts';
import type { SiteConfig, SectionConfig } from '../../src/config/types.ts';

const sections = preset.sections.map((s): SectionConfig => {
  if (s.type === 'vslForm') return { ...s, content: { ...s.content, videoUrl: '/test-vsl.mp4' } };
  if (s.type === 'videoResults') {
    return { ...s, content: { ...s.content, items: s.content.items.map((item, i) => (i === 0 ? { ...item, videoUrl: '/test-case.mp4' } : item)) } };
  }
  return s;
});

const config: SiteConfig = {
  ...preset,
  proof: { ...preset.proof, rating: '5.0', count: '12' },
  sections,
};

export default config;
