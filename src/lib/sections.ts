/**
 * Decides, from the rendered order alone, which background each section gets.
 * Rules (see docs/decisions.md):
 *  - The hero owns its photo background.
 *  - Strips (trust strip, logo strip, photo grids, gallery, before/after)
 *    inherit the tone of the section above them and do not count towards
 *    alternation.
 *  - Comparison, benefits and guarantee prefer the "dark" tone, but a dark
 *    section never directly follows another dark section.
 *  - In a run of light sections, every third one becomes "muted" (off-white)
 *    so long runs still have rhythm.
 *  - A section with `tone` set in config takes that tone and still counts in
 *    the run, so the sections around it re-plan.
 */
import type { SectionConfig, SectionType } from '../config/types.ts';

export type Tone = 'hero' | 'light' | 'muted' | 'dark';

interface SectionMeta {
  surface: 'own' | 'strip' | 'alternate';
  prefersDark?: boolean;
}

export const sectionMeta: Record<SectionType, SectionMeta> = {
  hero: { surface: 'own' },
  trustStrip: { surface: 'strip' },
  beforeAfter: { surface: 'strip' },
  letter: { surface: 'alternate' },
  projects: { surface: 'alternate' },
  photoGrid: { surface: 'strip' },
  comparison: { surface: 'alternate', prefersDark: true },
  testimonials: { surface: 'alternate' },
  benefits: { surface: 'alternate', prefersDark: true },
  futurePacing: { surface: 'alternate' },
  bentoGallery: { surface: 'alternate' },
  steps: { surface: 'alternate' },
  guarantee: { surface: 'alternate', prefersDark: true },
  offerForm: { surface: 'alternate' },
  logoStrip: { surface: 'strip' },
  gallery: { surface: 'strip' },
  split: { surface: 'alternate' },
  statement: { surface: 'alternate' },
  beforeAfterGrid: { surface: 'alternate' },
  logoGrid: { surface: 'alternate' },
  faq: { surface: 'alternate' },
};

export interface RenderedSection {
  section: SectionConfig;
  tone: Tone;
  /** Index among rendered sections. */
  index: number;
  /** True when the section directly follows one with the same tone (used for spacing). */
  sameToneAsPrevious: boolean;
}

export function planSections(sections: SectionConfig[]): RenderedSection[] {
  const enabled = sections.filter((s) => s.enabled);
  const out: RenderedSection[] = [];
  let lastCounted: Tone | null = null;
  let lightRun = 0;
  let previousTone: Tone | null = null;

  enabled.forEach((section, index) => {
    const meta = sectionMeta[section.type];
    const pinned = section.tone && section.tone !== 'auto' ? section.tone : null;
    let tone: Tone;
    if (meta.surface === 'own') {
      tone = 'hero';
      lastCounted = 'light';
      lightRun = 0;
    } else if (pinned) {
      tone = pinned;
      if (meta.surface !== 'strip') {
        lastCounted = tone;
        if (tone === 'dark') lightRun = 0;
        else lightRun += 1;
      }
    } else if (meta.surface === 'strip') {
      tone = previousTone && previousTone !== 'hero' ? previousTone : 'light';
    } else if (meta.prefersDark && lastCounted !== 'dark') {
      tone = 'dark';
      lastCounted = 'dark';
      lightRun = 0;
    } else {
      lightRun += 1;
      tone = lightRun % 3 === 0 ? 'muted' : 'light';
      lastCounted = tone;
    }
    out.push({
      section,
      tone,
      index,
      sameToneAsPrevious: previousTone === tone && meta.surface !== 'strip',
    });
    previousTone = tone;
  });

  return out;
}

/** True when a section type carries the shared CTA button (by default; some types can turn it off per section). */
export const sectionHasCta: Record<SectionType, boolean> = {
  hero: true,
  trustStrip: false,
  beforeAfter: false,
  letter: true,
  projects: true,
  photoGrid: false,
  comparison: true,
  testimonials: true,
  benefits: true,
  futurePacing: true,
  bentoGallery: false,
  steps: true,
  guarantee: false,
  offerForm: true,
  logoStrip: false,
  gallery: false,
  split: true,
  statement: true,
  beforeAfterGrid: true,
  logoGrid: false,
  faq: true,
};
