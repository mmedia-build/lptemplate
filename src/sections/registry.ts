/**
 * Section type to component. The page renders config.sections in order
 * through this map, so adding a section type is: write the component, add
 * the type to src/config/types.ts, register it here, describe it in
 * src/lib/sections.ts and src/guide/notes.ts, and list its slots in
 * src/config/spec.ts. The catalogue of every type is docs/sections.md.
 */
import type { SectionType } from '../config/types.ts';
import Hero from './Hero.astro';
import TrustStrip from './TrustStrip.astro';
import BeforeAfterStrip from './BeforeAfterStrip.astro';
import ProblemLetter from './ProblemLetter.astro';
import Projects from './Projects.astro';
import PhotoGrid from './PhotoGrid.astro';
import Comparison from './Comparison.astro';
import Testimonials from './Testimonials.astro';
import Benefits from './Benefits.astro';
import FuturePacing from './FuturePacing.astro';
import BentoGallery from './BentoGallery.astro';
import Steps from './Steps.astro';
import Guarantee from './Guarantee.astro';
import OfferForm from './OfferForm.astro';
import LogoStrip from './LogoStrip.astro';
import Gallery from './Gallery.astro';
import Split from './Split.astro';
import Statement from './Statement.astro';
import BeforeAfterGrid from './BeforeAfterGrid.astro';
import LogoGrid from './LogoGrid.astro';
import Faq from './Faq.astro';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registry: Record<SectionType, (props: any) => any> = {
  hero: Hero,
  trustStrip: TrustStrip,
  beforeAfter: BeforeAfterStrip,
  letter: ProblemLetter,
  projects: Projects,
  photoGrid: PhotoGrid,
  comparison: Comparison,
  testimonials: Testimonials,
  benefits: Benefits,
  futurePacing: FuturePacing,
  bentoGallery: BentoGallery,
  steps: Steps,
  guarantee: Guarantee,
  offerForm: OfferForm,
  logoStrip: LogoStrip,
  gallery: Gallery,
  split: Split,
  statement: Statement,
  beforeAfterGrid: BeforeAfterGrid,
  logoGrid: LogoGrid,
  faq: Faq,
};
