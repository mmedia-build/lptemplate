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
  { path: 'cta.label', chars: 34, words: 7, purpose: 'The one CTA label used on every button and the submit', exemplar: 'copy-hero' },
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
  { path: 'form.fields[description].placeholder', chars: 81, words: 15, purpose: 'The job question', exemplar: 'copy-offer-and-form' },
  { path: 'sections[offerForm].content.reinforcement', chars: 110, words: 20, purpose: 'Bonus restated under the button', exemplar: 'copy-offer-and-form' },
  { path: 'thankYou.headline', chars: 9, words: 2, purpose: 'Thanks', exemplar: 'copy-thank-you-page', tolerance: 0.5 },
  { path: 'thankYou.subheadline', chars: 35, words: 7, purpose: 'When and how you will be in touch', exemplar: 'copy-thank-you-page' },
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
  { path: 'brand.texture', specKey: 'gridTile', shot: 'Optional seamless plaster or paper texture for the dark sections.', exemplar: 'imagery-hero' },
  { path: 'seo.ogImage', specKey: 'bentoWide', shot: 'Optional link preview image, 1200x630 works best.', exemplar: 'imagery-hero' },
];
