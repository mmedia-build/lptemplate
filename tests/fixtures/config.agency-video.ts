/**
 * Agency preset with the links a client build fills in: a hero video URL, a testimonial video URL,
 * a booking calendar and a hand-written urgency line. Used by scripts/verify.mjs to check tap-to-load
 * video, the urgency line under the hero CTA and the calendar hand-off on the thank-you page.
 */
import base from '../../examples/site.config.agency.ts';
import type { SiteConfig, SectionConfig } from '../../src/config/types.ts';

const sections = base.sections.map((s): SectionConfig => {
  if (s.type === 'hero') return { ...s, content: { ...s.content, video: { ...s.content.video!, videoUrl: 'https://www.youtube.com/watch?v=aaaaaaaaaaa' } } };
  if (s.type === 'testimonials') {
    const items = s.content.items.map((item, i) => (i === 0 ? { ...item, videoUrl: 'https://vimeo.com/1' } : item));
    return { ...s, content: { ...s.content, items } };
  }
  return s;
});

const config: SiteConfig = {
  ...base,
  urgency: { line: 'Test line written by hand' },
  thankYou: { ...base.thankYou, bookingUrl: 'https://example.com/calendar' },
  sections,
};
export default config;
