/**
 * Guide mode notes, one per section type. Shown as an overlay when the build
 * runs with GUIDE_MODE=1. Nothing in this file reaches the normal build output:
 * it is only imported by the GuideNote component, which renders nothing when
 * guide mode is off.
 */
import type { SectionType } from '../config/types.ts';

export interface GuideNoteText {
  job: string;
  principle: string;
}

export const guideNotes: Record<SectionType | 'header' | 'footer', GuideNoteText> = {
  header: {
    job: 'Identify the business and give an impatient visitor a phone escape hatch, with no navigation to leak attention.',
    principle: 'Authority and single-path design: the only exits are the form and the phone.',
  },
  hero: {
    job: 'Qualify the visitor, state the outcome with a timeframe and a stacked bonus with a dollar value, and put the CTA and review proof within thumb reach on the first screen.',
    principle: 'Specificity and offer stacking, with social proof directly under the action.',
  },
  trustStrip: {
    job: 'Handle six fast objections (who you are, your method, your follow-up, your process, your crew, your track record) before the first scroll.',
    principle: 'Credibility signals as a pre-emptive strike; naming the mechanism early so later sections can repeat it.',
  },
  beforeAfter: {
    job: 'Prove transformation within the first swipe with matched before and after pairs of real jobs.',
    principle: 'Demonstration and contrast: side-by-side pairs make the difference legible in a second.',
  },
  letter: {
    job: 'Describe the visitor\'s own experience (money spent, result still wrong, problems within months) so they feel understood, then reframe the cause so your method becomes the obvious answer.',
    principle: 'Problem agitation and the personal letter device.',
  },
  projects: {
    job: 'Prove you work in the visitor\'s suburbs with footage that could not be faked, and let them self-select by place name.',
    principle: 'Social proof with local specificity.',
  },
  photoGrid: {
    job: 'Keep proof density high between arguments and break up long text with four finished-job photos.',
    principle: 'Repetition of evidence.',
  },
  comparison: {
    job: 'Inoculate against the cheaper quote by turning your method into four checkable points and the typical competitor\'s into four failures.',
    principle: 'Contrast and mechanism naming.',
  },
  testimonials: {
    job: 'Let customers say what you cannot say about yourself, with a name, a suburb and a job photo so each reads as a real person.',
    principle: 'Social proof with similarity.',
  },
  benefits: {
    job: 'Restate the method as five named benefits with one concrete fact each, so the visitor can repeat your differences to a partner.',
    principle: 'Specificity and mechanism naming.',
  },
  futurePacing: {
    job: 'Move the visitor from problem to desired future in their own daily moment, and let them perform the transformation with their thumb.',
    principle: 'Future pacing and interactive demonstration.',
  },
  bentoGallery: {
    job: 'A denser proof block of finished work after the emotional peak, so the aspiration is backed by results.',
    principle: 'Repetition of evidence with variety of framing.',
  },
  steps: {
    job: 'Remove the fear of what happens after the form by showing three small, low-commitment steps, the first free.',
    principle: 'Simplicity and commitment laddering.',
  },
  guarantee: {
    job: 'Reverse the risk in plain words with a named guarantee and a stated term, answering the last objection before the form.',
    principle: 'Risk reversal and naming.',
  },
  offerForm: {
    job: 'Convert: restate the offer at full value, list what the visit delivers, and take the lead with the fewest fields that still qualify the job.',
    principle: 'Offer stacking, reason-why bullets, optional urgency, and a reinforcement line at the moment of commitment.',
  },
  footer: {
    job: 'Close the page without offering an exit: logo, copyright and legal text in modals.',
    principle: 'Completeness and compliance without leaking attention.',
  },
};
