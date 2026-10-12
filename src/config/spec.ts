/**
 * Content spec: the target length of every text slot, measured from the
 * reference, and the export size of every image slot. Used by
 * scripts/check-content.mjs to confirm placeholder (and client) copy stays
 * within 10% of the reference length, and by scripts/build-content-spec.mjs
 * to write docs/content-spec.md. Slot paths are JSON-pointer style paths into
 * site.config.ts; [n] means every item in that array.
 */

export interface TextSlotSpec {
  /** Path into the config, for example sections[hero].content.headline. */
  path: string;
  /** Reference length in characters. */
  chars: number;
  /** Reference length in words. */
  words: number;
  /** What the slot is for, one line. */
  purpose: string;
  /** Anchor in docs/exemplar.md. */
  exemplar: string;
  /** Tolerance as a fraction. Defaults to 0.1. */
  tolerance?: number;
}

export interface ImageSlotDoc {
  path: string;
  specKey: string;
  shot: string;
  exemplar: string;
}

export const textSlots: TextSlotSpec[] = [
  { path: 'cta.label', chars: 34, words: 7, purpose: 'The one CTA label used on every button and the submit (34 on reference A, 45 on B)', exemplar: 'copy-hero', tolerance: 0.35 },
  { path: 'business.phoneEyebrow', chars: 15, words: 2, purpose: 'Invitation above the number in the desktop header', exemplar: 'copy-header', tolerance: 0.4 },
  { path: 'sections[hero].content.eyebrow', chars: 43, words: 6, purpose: 'Qualifying question naming the trade and city', exemplar: 'copy-hero' },
  { path: 'sections[hero].content.headline', chars: 163, words: 29, purpose: 'Outcome, timeframe, bonus and dollar value', exemplar: 'copy-hero' },
  { path: 'sections[hero].content.body', chars: 209, words: 30, purpose: 'Pain question, lifestyle gain, financial gain', exemplar: 'copy-hero' },
  { path: 'sections[trustStrip].content.items[n].label', chars: 24, words: 3, purpose: 'Two to five word proof point', exemplar: 'copy-hero', tolerance: 0.3 },
  { path: 'sections[beforeAfter].content.beforeLabel', chars: 6, words: 1, purpose: 'Tile label', exemplar: 'copy-before-and-after-marquee', tolerance: 0.5 },
  { path: 'sections[beforeAfter].content.afterLabel', chars: 5, words: 1, purpose: 'Tile label', exemplar: 'copy-before-and-after-marquee', tolerance: 0.5 },
  { path: 'sections[letter].content.headline', chars: 82, words: 14, purpose: 'Question to the repeat renovator', exemplar: 'copy-problem-letter' },
  { path: 'sections[letter].content.salutation', chars: 26, words: 3, purpose: 'Dear [city] homeowners', exemplar: 'copy-problem-letter', tolerance: 0.15 },
  { path: 'sections[letter].content.paragraphs[0]', chars: 458, words: 69, purpose: 'The spend, the shortfall, the failures within months', exemplar: 'copy-problem-letter' },
  { path: 'sections[letter].content.paragraphs[1]', chars: 369, words: 58, purpose: 'Reframe the cause as surface-only work', exemplar: 'copy-problem-letter' },
  { path: 'sections[projects].content.headline', chars: 38, words: 7, purpose: 'Invitation to see other recent jobs', exemplar: 'copy-recent-projects' },
  { path: 'sections[projects].content.items[n].suburb', chars: 7, words: 1, purpose: 'Suburb name', exemplar: 'copy-recent-projects', tolerance: 0.5 },
  { path: 'sections[comparison].content.headline', chars: 75, words: 12, purpose: 'Why most jobs fail and how you differ', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.us.items[0]', chars: 108, words: 12, purpose: 'Named method one', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.us.items[1]', chars: 81, words: 12, purpose: 'Named method two', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.us.items[2]', chars: 96, words: 12, purpose: 'Named method three', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.us.items[3]', chars: 108, words: 19, purpose: 'Included follow-up', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.them.title', chars: 21, words: 3, purpose: 'Most other [trade]', exemplar: 'copy-comparison', tolerance: 0.15 },
  { path: 'sections[comparison].content.them.items[0]', chars: 78, words: 12, purpose: 'Prep failure', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.them.items[1]', chars: 60, words: 12, purpose: 'Generic mix', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.them.items[2]', chars: 87, words: 13, purpose: 'No design thought', exemplar: 'copy-comparison' },
  { path: 'sections[comparison].content.them.items[3]', chars: 49, words: 8, purpose: 'No follow-up', exemplar: 'copy-comparison' },
  { path: 'sections[testimonials].content.headline', chars: 61, words: 9, purpose: 'Local homeowners who chose you', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[0].headline', chars: 84, words: 13, purpose: 'Reviewer summary line', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[0].body', chars: 205, words: 31, purpose: 'Review body', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[1].headline', chars: 44, words: 5, purpose: 'Reviewer summary line', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[1].body', chars: 228, words: 41, purpose: 'Review body', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[2].headline', chars: 51, words: 10, purpose: 'Reviewer summary line', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[2].body', chars: 177, words: 29, purpose: 'Review body', exemplar: 'copy-testimonials' },
  { path: 'sections[testimonials].content.items[n].name', chars: 10, words: 2, purpose: 'First name or names', exemplar: 'copy-testimonials', tolerance: 0.4 },
  { path: 'sections[testimonials].content.items[n].suburb', chars: 13, words: 2, purpose: 'Suburb and state', exemplar: 'copy-testimonials', tolerance: 0.3 },
  { path: 'sections[benefits].content.headline', chars: 90, words: 15, purpose: 'Aspiration plus durability promise', exemplar: 'copy-benefits' },
  { path: 'sections[benefits].content.items[n].title', chars: 30, words: 3, purpose: 'Named method, Title Case', exemplar: 'copy-benefits', tolerance: 0.15 },
  { path: 'sections[benefits].content.items[0].body', chars: 178, words: 26, purpose: 'Statistic, what you do, result', exemplar: 'copy-benefits' },
  { path: 'sections[benefits].content.items[1].body', chars: 171, words: 29, purpose: 'Design to suit the home', exemplar: 'copy-benefits' },
  { path: 'sections[benefits].content.items[2].body', chars: 136, words: 23, purpose: 'Included follow-up', exemplar: 'copy-benefits' },
  { path: 'sections[benefits].content.items[3].body', chars: 134, words: 20, purpose: 'One team, clear updates', exemplar: 'copy-benefits' },
  { path: 'sections[benefits].content.items[4].body', chars: 151, words: 19, purpose: 'Materials and standards', exemplar: 'copy-benefits' },
  { path: 'sections[futurePacing].content.headline', chars: 41, words: 7, purpose: 'Imagine a home that...', exemplar: 'copy-future-pacing' },
  { path: 'sections[futurePacing].content.paragraphs[0]', chars: 178, words: 30, purpose: 'Daily moment and what they see', exemplar: 'copy-future-pacing' },
  { path: 'sections[futurePacing].content.paragraphs[1]', chars: 227, words: 37, purpose: 'Pains gone, new use, fears removed', exemplar: 'copy-future-pacing' },
  { path: 'sections[futurePacing].content.paragraphs[2]', chars: 114, words: 21, purpose: 'Feeling now versus feeling then', exemplar: 'copy-future-pacing' },
  { path: 'sections[bentoGallery].content.headline', chars: 31, words: 6, purpose: 'See recent projects', exemplar: 'copy-bento-gallery' },
  { path: 'sections[steps].content.headline', chars: 46, words: 8, purpose: 'Outcome in three simple steps', exemplar: 'copy-three-steps' },
  { path: 'sections[steps].content.items[0].title', chars: 30, words: 6, purpose: 'Step one title', exemplar: 'copy-three-steps' },
  { path: 'sections[steps].content.items[0].body', chars: 190, words: 31, purpose: 'The visit', exemplar: 'copy-three-steps' },
  { path: 'sections[steps].content.items[1].title', chars: 32, words: 7, purpose: 'Step two title', exemplar: 'copy-three-steps' },
  { path: 'sections[steps].content.items[1].body', chars: 197, words: 34, purpose: 'The plan', exemplar: 'copy-three-steps' },
  { path: 'sections[steps].content.items[2].title', chars: 42, words: 7, purpose: 'Step three title', exemplar: 'copy-three-steps' },
  { path: 'sections[steps].content.items[2].body', chars: 229, words: 38, purpose: 'The work and the follow-up', exemplar: 'copy-three-steps' },
  { path: 'sections[guarantee].content.badgeLine1', chars: 18, words: 2, purpose: 'Guarantee name on the badge', exemplar: 'copy-guarantee', tolerance: 0.2 },
  { path: 'sections[guarantee].content.badgeLine2', chars: 13, words: 3, purpose: 'Promise on the badge', exemplar: 'copy-guarantee', tolerance: 0.2 },
  { path: 'sections[guarantee].content.headline', chars: 31, words: 5, purpose: 'Guarantee headline', exemplar: 'copy-guarantee' },
  { path: 'sections[guarantee].content.subheadline', chars: 81, words: 13, purpose: 'Names the guarantee, ends with a colon', exemplar: 'copy-guarantee' },
  { path: 'sections[guarantee].content.paragraphs[0]', chars: 193, words: 31, purpose: 'Defects, term in years, the fix', exemplar: 'copy-guarantee' },
  { path: 'sections[guarantee].content.paragraphs[1]', chars: 228, words: 40, purpose: 'What they are really paying for', exemplar: 'copy-guarantee' },
  { path: 'urgency.line', chars: 47, words: 10, purpose: 'Optional hand-written scarcity line', exemplar: 'copy-offer-and-form', tolerance: 1 },
  { path: 'sections[offerForm].content.headline', chars: 145, words: 27, purpose: 'Claim the free visit and the bonuses with value', exemplar: 'copy-offer-and-form' },
  { path: 'sections[offerForm].content.bullets[0]', chars: 190, words: 28, purpose: 'Design talk bullet', exemplar: 'copy-offer-and-form' },
  { path: 'sections[offerForm].content.bullets[1]', chars: 194, words: 35, purpose: 'Budget blowout bullet', exemplar: 'copy-offer-and-form' },
  { path: 'sections[offerForm].content.bullets[2]', chars: 181, words: 30, purpose: 'Upgrades bullet', exemplar: 'copy-offer-and-form' },
  { path: 'sections[offerForm].content.bullets[3]', chars: 29, words: 6, purpose: 'And the free visit', exemplar: 'copy-offer-and-form' },
  { path: 'form.fields[description].placeholder', chars: 81, words: 15, purpose: 'The job question (81 on reference A; B uses a 39 character comments prompt)', exemplar: 'copy-offer-and-form', tolerance: 0.55 },
  { path: 'sections[offerForm].content.reinforcement', chars: 110, words: 20, purpose: 'Bonus restated under the button', exemplar: 'copy-offer-and-form' },
  { path: 'thankYou.headline', chars: 9, words: 2, purpose: 'Thanks', exemplar: 'copy-thank-you-page', tolerance: 0.5 },
  { path: 'thankYou.subheadline', chars: 35, words: 7, purpose: 'When and how you will be in touch', exemplar: 'copy-thank-you-page' },

  /* ---- Slots introduced by reference B. Checked only when the section (or the section with that id) is in the config. ---- */
  { path: 'cta.reinforcement', chars: 76, words: 12, purpose: 'Bonus and value restated under every CTA when there is no review badge', exemplar: 'copy-hero-b', tolerance: 0.2 },
  { path: 'sections[gallery].content.moreLabel', chars: 15, words: 4, purpose: 'Button that expands the wall', exemplar: 'imagery-reference-b', tolerance: 0.4 },
  { path: 'sections[split:dream].content.headline', chars: 92, words: 13, purpose: 'The finished state in one line', exemplar: 'copy-dream-outcome' },
  { path: 'sections[split:dream].content.paragraphs[0]', chars: 342, words: 55, purpose: 'Picture this: the finished rooms', exemplar: 'copy-dream-outcome' },
  { path: 'sections[split:dream].content.paragraphs[1]', chars: 314, words: 47, purpose: 'Why it is believable', exemplar: 'copy-dream-outcome' },
  { path: 'sections[split:problem].content.headline', chars: 95, words: 19, purpose: 'How to avoid the blowout and the delay', exemplar: 'copy-problem-dark-split' },
  { path: 'sections[split:problem].content.paragraphs[0]', chars: 391, words: 59, purpose: 'The middleman model and its numbers', exemplar: 'copy-problem-dark-split' },
  { path: 'sections[split:problem].content.paragraphs[1]', chars: 464, words: 74, purpose: 'The daily consequence and the one fixable cause', exemplar: 'copy-problem-dark-split' },
  { path: 'sections[split:owner].content.headline', chars: 106, words: 14, purpose: 'Meet the owner', exemplar: 'copy-owner-story' },
  { path: 'sections[split:owner].content.paragraphs[0]', chars: 367, words: 57, purpose: 'First person career arc and why the business exists', exemplar: 'copy-owner-story' },
  { path: 'sections[split:owner].content.paragraphs[1]', chars: 282, words: 40, purpose: 'Licence number, scale, personal involvement', exemplar: 'copy-owner-story' },
  { path: 'sections[split:liveable].content.headline', chars: 91, words: 13, purpose: 'The system that keeps the home liveable', exemplar: 'copy-liveable-home-split' },
  { path: 'sections[split:liveable].content.paragraphs[0]', chars: 382, words: 59, purpose: 'Name the real fear, then the measures', exemplar: 'copy-liveable-home-split' },
  { path: 'sections[split:liveable].content.paragraphs[1]', chars: 253, words: 42, purpose: 'Short disruption, then the reward', exemplar: 'copy-liveable-home-split' },
  { path: 'sections[statement].content.headline', chars: 147, words: 21, purpose: 'The thesis: in-house method removes three failures', exemplar: 'copy-method-statement' },
  { path: 'sections[statement].content.paragraphs[0]', chars: 509, words: 70, purpose: 'The chain of hand-offs under one roof', exemplar: 'copy-method-statement' },
  { path: 'sections[statement].content.paragraphs[1]', chars: 293, words: 41, purpose: 'The result and the named method', exemplar: 'copy-method-statement' },
  { path: 'sections[beforeAfterGrid].content.headline', chars: 53, words: 9, purpose: 'Homes transformed in the timeframe', exemplar: 'copy-before-and-after-grid' },
  { path: 'sections[beforeAfterGrid].content.items[n].label', chars: 18, words: 2, purpose: 'Suburb and room', exemplar: 'copy-before-and-after-grid', tolerance: 0.4 },
  { path: 'sections[beforeAfterGrid].content.items[n].caption', chars: 46, words: 6, purpose: 'One line naming the change', exemplar: 'copy-before-and-after-grid', tolerance: 0.3 },
  { path: 'sections[logoGrid].content.headline', chars: 76, words: 13, purpose: 'Durability promise with timeframes', exemplar: 'copy-materials-and-suppliers' },
  { path: 'sections[logoGrid].content.paragraphs[0]', chars: 424, words: 67, purpose: 'Still stunning years later; the one decision', exemplar: 'copy-materials-and-suppliers' },
  { path: 'sections[logoGrid].content.paragraphs[1]', chars: 415, words: 60, purpose: 'The suppliers and why', exemplar: 'copy-materials-and-suppliers' },
  { path: 'sections[faq].content.headline', chars: 89, words: 11, purpose: 'Everything you are wondering, answered honestly', exemplar: 'copy-faq' },
  { path: 'sections[faq].content.items[n].question', chars: 37, words: 6, purpose: 'The question in the customer\'s words', exemplar: 'copy-faq', tolerance: 0.4 },
  { path: 'sections[faq].content.items[n].answer', chars: 207, words: 32, purpose: 'Two to four honest sentences with a number', exemplar: 'copy-faq', tolerance: 0.35 },
  { path: 'sections[hero:b-hero].content.eyebrow', chars: 74, words: 11, purpose: 'For [city] homeowners who are done with [category] horror stories', exemplar: 'copy-hero-b' },
  { path: 'sections[hero:b-hero].content.headline', chars: 99, words: 19, purpose: 'Outcome, timeframe, fixed price and the penalty', exemplar: 'copy-hero-b' },
  { path: 'sections[hero:b-hero].content.body', chars: 375, words: 52, purpose: 'The named method, what it removes, No X. No Y. No Z.', exemplar: 'copy-hero-b' },
  { path: 'sections[trustStrip:b-trust].content.items[n].label', chars: 23, words: 4, purpose: 'The offer restated as five facts', exemplar: 'copy-hero-b', tolerance: 0.4 },
  { path: 'sections[comparison:b-comparison].content.headline', chars: 73, words: 11, purpose: 'Dream timeframe versus nightmare timeframe', exemplar: 'copy-comparison-b-cards' },
  { path: 'sections[comparison:b-comparison].content.us.items[n]', chars: 30, words: 5, purpose: 'Bold mechanism, plain benefit', exemplar: 'copy-comparison-b-cards', tolerance: 0.3 },
  { path: 'sections[comparison:b-comparison].content.them.title', chars: 18, words: 2, purpose: 'Typical [trade plural]', exemplar: 'copy-comparison-b-cards', tolerance: 0.2 },
  { path: 'sections[comparison:b-comparison].content.them.items[n]', chars: 34, words: 6, purpose: 'Bold failure, what the bad tradie says', exemplar: 'copy-comparison-b-cards', tolerance: 0.35 },
  { path: 'sections[testimonials:b-testimonials].content.headline', chars: 70, words: 9, purpose: 'What [city] homeowners say', exemplar: 'copy-testimonials-b-carousel' },
  { path: 'sections[testimonials:b-testimonials].content.items[n].headline', chars: 22, words: 3, purpose: 'Job type', exemplar: 'copy-testimonials-b-carousel', tolerance: 0.3 },
  { path: 'sections[testimonials:b-testimonials].content.items[n].body', chars: 155, words: 28, purpose: 'The customer\'s own thank-you', exemplar: 'copy-testimonials-b-carousel', tolerance: 0.2 },
  { path: 'sections[benefits:b-benefits].content.headline', chars: 81, words: 13, purpose: 'From first step to last in the timeframe', exemplar: 'copy-benefits-b-list' },
  { path: 'sections[benefits:b-benefits].content.items[n].title', chars: 38, words: 7, purpose: '[Promise] - [Named principle]', exemplar: 'copy-benefits-b-list', tolerance: 0.3 },
  { path: 'sections[benefits:b-benefits].content.items[n].body', chars: 225, words: 37, purpose: 'What we do, why we can, the daily image', exemplar: 'copy-benefits-b-list', tolerance: 0.15 },
  { path: 'sections[steps:b-steps].content.headline', chars: 89, words: 14, purpose: 'From site start to handover in the timeframe', exemplar: 'copy-three-steps-b' },
  { path: 'sections[steps:b-steps].content.items[n].title', chars: 32, words: 4, purpose: '[Deliverable] & [Deliverable]', exemplar: 'copy-three-steps-b', tolerance: 0.2 },
  { path: 'sections[steps:b-steps].content.items[n].body', chars: 244, words: 37, purpose: 'What happens, where, how long, what they hold', exemplar: 'copy-three-steps-b' },
  { path: 'sections[guarantee:b-guarantee].content.badgeLine1', chars: 14, words: 2, purpose: 'Outcome on the badge', exemplar: 'copy-guarantee-b', tolerance: 0.3 },
  { path: 'sections[guarantee:b-guarantee].content.badgeLine2', chars: 30, words: 7, purpose: 'Timeframe or penalty on the badge', exemplar: 'copy-guarantee-b', tolerance: 0.3 },
  { path: 'sections[guarantee:b-guarantee].content.headline', chars: 61, words: 12, purpose: 'Outcome in the timeframe or we pay you', exemplar: 'copy-guarantee-b' },
  { path: 'sections[guarantee:b-guarantee].content.paragraphs[0]', chars: 79, words: 15, purpose: 'The promise in one line', exemplar: 'copy-guarantee-b', tolerance: 0.15 },
  { path: 'sections[guarantee:b-guarantee].content.paragraphs[1]', chars: 134, words: 22, purpose: 'The nightmare in one line', exemplar: 'copy-guarantee-b', tolerance: 0.15 },
  { path: 'sections[guarantee:b-guarantee].content.paragraphs[2]', chars: 159, words: 23, purpose: 'What we do instead', exemplar: 'copy-guarantee-b', tolerance: 0.15 },
  { path: 'sections[guarantee:b-guarantee].content.paragraphs[3]', chars: 146, words: 29, purpose: 'The guarantee restated with the penalty', exemplar: 'copy-guarantee-b', tolerance: 0.15 },
  { path: 'sections[guarantee:b-guarantee].content.paragraphs[4]', chars: 274, words: 39, purpose: 'The statutory warranty with its terms', exemplar: 'copy-guarantee-b', tolerance: 0.15 },
  { path: 'sections[guarantee:b-guarantee].content.paragraphs[5]', chars: 85, words: 15, purpose: 'Closing line', exemplar: 'copy-guarantee-b', tolerance: 0.15 },
  { path: 'sections[offerForm:offer-form].content.headline', chars: 136, words: 25, purpose: 'Claim the free consultation and see how', exemplar: 'copy-offer-and-form-b' },
  { path: 'sections[offerForm:offer-form].content.lead', chars: 73, words: 12, purpose: 'Line introducing the bullets', exemplar: 'copy-offer-and-form-b', tolerance: 0.3 },
  { path: 'sections[offerForm:offer-form].content.bullets[0]', chars: 115, words: 18, purpose: 'The process bullet', exemplar: 'copy-offer-and-form-b', tolerance: 0.15 },
  { path: 'sections[offerForm:offer-form].content.bullets[1]', chars: 103, words: 17, purpose: 'The trends bullet', exemplar: 'copy-offer-and-form-b', tolerance: 0.15 },
  { path: 'sections[offerForm:offer-form].content.bullets[2]', chars: 181, words: 26, purpose: 'The protection bullet', exemplar: 'copy-offer-and-form-b', tolerance: 0.15 },
  { path: 'sections[offerForm:offer-form].content.bullets[3]', chars: 99, words: 14, purpose: 'The bonus bullet with its value', exemplar: 'copy-offer-and-form-b', tolerance: 0.15 },
  { path: 'sections[offerForm:offer-form].content.reinforcement', chars: 76, words: 12, purpose: 'Bonus restated under the button', exemplar: 'copy-offer-and-form-b', tolerance: 0.2 },
];

export const imageSlots: ImageSlotDoc[] = [
  { path: 'business.logo', specKey: 'logo', shot: 'Full colour logo on transparent background.', exemplar: 'imagery-logo-and-brand-marks' },
  { path: 'business.logoWhite', specKey: 'logoWhite', shot: 'Flat white logo for the sage comparison column.', exemplar: 'imagery-logo-and-brand-marks' },
  { path: 'proof.avatars', specKey: 'avatars', shot: 'Four round customer head shots overlapping in a row.', exemplar: 'imagery-logo-and-brand-marks' },
  { path: 'sections[hero].content.image', specKey: 'heroBackground', shot: 'Wide finished job, house visible, no people, subject in the centre third; washed out behind the text.', exemplar: 'imagery-hero' },
  { path: 'sections[beforeAfter].content.pairs[n].before', specKey: 'beforeAfterTile', shot: 'Before, portrait, same spot and height as the after, a fixed landmark in frame.', exemplar: 'imagery-before-and-after-marquee' },
  { path: 'sections[beforeAfter].content.pairs[n].after', specKey: 'beforeAfterTile', shot: 'After, portrait, matched to the before.', exemplar: 'imagery-before-and-after-marquee' },
  { path: 'sections[letter].content.images[n]', specKey: 'letterImage', shot: 'One house from the footpath, before (top) and after (bottom), daytime, no people.', exemplar: 'imagery-problem-letter' },
  { path: 'sections[projects].content.items[n].poster', specKey: 'videoPoster', shot: 'Portrait poster frame from the clip, crew or surface visible, readable at 188 px wide.', exemplar: 'imagery-recent-projects' },
  { path: 'sections[photoGrid].content.images[n]', specKey: 'gridTile', shot: 'Square job photo; mix finished surfaces with crew at work.', exemplar: 'imagery-photo-grid-strips' },
  { path: 'sections[testimonials].content.items[n].image', specKey: 'testimonialImage', shot: 'The reviewer\'s finished job, drone or street level, subject in the vertical centre.', exemplar: 'imagery-testimonials' },
  { path: 'sections[benefits].content.image', specKey: 'benefitsImage', shot: 'A crew member finishing a surface by hand, landscape.', exemplar: 'imagery-benefits' },
  { path: 'sections[futurePacing].content.before', specKey: 'compareImage', shot: 'Driveway from the kerb before work, square, same position as the after.', exemplar: 'imagery-future-pacing-compare-slider' },
  { path: 'sections[futurePacing].content.after', specKey: 'compareImage', shot: 'Same driveway finished, same position, square.', exemplar: 'imagery-future-pacing-compare-slider' },
  { path: 'sections[bentoGallery].content.images[wide]', specKey: 'bentoWide', shot: 'Finished exterior, wide, clean sky or dusk, no people.', exemplar: 'imagery-bento-gallery' },
  { path: 'sections[bentoGallery].content.images[square]', specKey: 'bentoSquare', shot: 'Finished exterior or detail, square, no people.', exemplar: 'imagery-bento-gallery' },
  { path: 'sections[steps].content.items[n].image', specKey: 'stepImage', shot: 'Step one the visit, step two the work, step three the finished detail; landscape.', exemplar: 'imagery-three-steps' },
  { path: 'sections[offerForm].content.bundleImage', specKey: 'offerBundle', shot: 'Device mock-up of the offer with the logo, on white or transparent.', exemplar: 'imagery-offer-bundle' },
  { path: 'brand.texture', specKey: 'gridTile', shot: 'Optional seamless plaster or paper texture for the dark sections, or the photo blurred behind night sections.', exemplar: 'imagery-hero' },
  { path: 'seo.ogImage', specKey: 'bentoWide', shot: 'Optional link preview image, 1200x630 works best.', exemplar: 'imagery-hero' },
  /* Slots introduced by reference B */
  { path: 'sections[logoStrip].content.logos[n]', specKey: 'supplierLogo', shot: 'Supplier or brand mark, the supplier\'s own file, on transparent.', exemplar: 'imagery-reference-b' },
  { path: 'sections[gallery].content.images[n]', specKey: 'gridTile', shot: 'Finished room, square, daylight, no people; eight or more.', exemplar: 'imagery-reference-b' },
  { path: 'sections[split].content.images[n]', specKey: 'splitImagePair', shot: 'Finished room landscape (one photo: 11:10; two photos: 3:2 each). The owner story can show the owner on site.', exemplar: 'imagery-reference-b' },
  { path: 'sections[statement].content.footImage', specKey: 'footImage', shot: 'Optional wide interior at low contrast that fades in under the text.', exemplar: 'imagery-reference-b' },
  { path: 'sections[beforeAfterGrid].content.items[n].before', specKey: 'compareTile', shot: 'Before, from the doorway, 5:4, same position as the after.', exemplar: 'imagery-reference-b' },
  { path: 'sections[beforeAfterGrid].content.items[n].after', specKey: 'compareTile', shot: 'After, same doorway, 5:4.', exemplar: 'imagery-reference-b' },
  { path: 'sections[logoGrid].content.logos[n]', specKey: 'supplierLogo', shot: 'Supplier mark on transparent, 12 to 18 of them.', exemplar: 'imagery-reference-b' },
  { path: 'sections[logoGrid].content.footImage', specKey: 'footImage', shot: 'Optional wide interior at low contrast under the logo tiles.', exemplar: 'imagery-reference-b' },
  { path: 'sections[guarantee].content.decorativeImage', specKey: 'decorative', shot: 'Optional line drawing on transparent, for example a floor plan.', exemplar: 'imagery-reference-b' },
];
