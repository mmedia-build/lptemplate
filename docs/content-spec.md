# Content spec

Every slot on the page in order, with its purpose, target length and, for images, the export size and the shot needed. Generated from `src/config/spec.ts` and `src/tokens/tokens.ts` by `npm run content-spec`; edit those files, not this one.

How to read the lengths: the target is the reference page's own content length. `npm run check:content` fails any slot outside the tolerance (10% unless stated). Staying inside the range keeps the mobile layout as measured in `docs/teardown.md`; going outside is allowed, but re-check the page at 390 wide.

Each slot links to the matching pattern and standard in `docs/exemplar.md`. Client copy is written from the client's own customer research and offer, never by rewording the exemplar excerpts.

Image files go under `src/images/` and are referenced by file name in `site.config.ts`. Export at the listed size (2x the largest rendered size); the build makes the responsive versions.

## Global (header, CTA, proof)

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `cta.label` | The one CTA label used on every button and the submit (34 on reference A, 45 on B) | 34 chars, 7 words | 22 to 46 chars | [pattern](exemplar.md#copy-hero) |
| `business.phoneEyebrow` | Invitation above the number in the desktop header | 15 chars, 2 words | 9 to 21 chars | [pattern](exemplar.md#copy-header) |
| `cta.reinforcement` | Bonus and value restated under every CTA when there is no review badge | 76 chars, 12 words | 60 to 92 chars | [pattern](exemplar.md#copy-hero-b) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `business.logo` | 440x146 px | 3.01:1 | Full colour logo on transparent background. | Rendered 100x33 (mobile) and 150x50 (desktop). Transparent PNG or SVG. | [standard](exemplar.md#imagery-logo-and-brand-marks) |
| `business.logoWhite` | 262x116 px | 2.26:1 | Flat white logo for the sage comparison column. | Rendered 104x46 (mobile) and 131x58 (desktop) on the sage comparison column. | [standard](exemplar.md#imagery-logo-and-brand-marks) |
| `proof.avatars` | 164x48 px | 3.42:1 | Four round customer head shots overlapping in a row. | Row of four round customer faces, overlapping. Rendered 68x20 (mobile) and 82x24 (desktop). | [standard](exemplar.md#imagery-logo-and-brand-marks) |

## 1. Hero

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[hero].content.eyebrow` | Qualifying question naming the trade and city | 43 chars, 6 words | 38 to 48 chars | [pattern](exemplar.md#copy-hero) |
| `sections[hero].content.headline` | Outcome, timeframe, bonus and dollar value | 163 chars, 29 words | 146 to 180 chars | [pattern](exemplar.md#copy-hero) |
| `sections[hero].content.body` | Pain question, lifestyle gain, financial gain | 209 chars, 30 words | 188 to 230 chars | [pattern](exemplar.md#copy-hero) |
| `sections[hero:b-hero].content.eyebrow` | For [city] homeowners who are done with [category] horror stories | 74 chars, 11 words | 66 to 82 chars | [pattern](exemplar.md#copy-hero-b) |
| `sections[hero:b-hero].content.headline` | Outcome, timeframe, fixed price and the penalty | 99 chars, 19 words | 89 to 109 chars | [pattern](exemplar.md#copy-hero-b) |
| `sections[hero:b-hero].content.body` | The named method, what it removes, No X. No Y. No Z. | 375 chars, 52 words | 337 to 413 chars | [pattern](exemplar.md#copy-hero-b) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[hero].content.image` | 2400x1400 px | 1.71:1 | Wide finished job, house visible, no people, subject in the centre third; washed out behind the text. | Covers the hero at every width. Centre of the frame is what survives the mobile crop (390x811). | [standard](exemplar.md#imagery-hero) |

## 2. Trust strip

Supported range: 3 to 8 items (6 on the reference). Below 5 the phone marquee repeats the set to stay seamless.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[trustStrip].content.items[n].label` | Two to five word proof point | 24 chars, 3 words | 16 to 32 chars | [pattern](exemplar.md#copy-hero) |
| `sections[trustStrip:b-trust].content.items[n].label` | The offer restated as five facts | 23 chars, 4 words | 13 to 33 chars | [pattern](exemplar.md#copy-hero-b) |

## 3. Before and after marquee

Supported range: 3 to 12 pairs (7 on the reference). Fewer pairs get more copies in the loop.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[beforeAfter].content.beforeLabel` | Tile label | 6 chars, 1 words | 3 to 9 chars | [pattern](exemplar.md#copy-before-and-after-marquee) |
| `sections[beforeAfter].content.afterLabel` | Tile label | 5 chars, 1 words | 2 to 8 chars | [pattern](exemplar.md#copy-before-and-after-marquee) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[beforeAfter].content.pairs[n].before` | 700x930 px | 1:1.33 | Before, portrait, same spot and height as the after, a fixed landmark in frame. | Portrait 3:4. Rendered 234x311. Each pair sits side by side with a 2px gap. | [standard](exemplar.md#imagery-before-and-after-marquee) |
| `sections[beforeAfter].content.pairs[n].after` | 700x930 px | 1:1.33 | After, portrait, matched to the before. | Portrait 3:4. Rendered 234x311. Each pair sits side by side with a 2px gap. | [standard](exemplar.md#imagery-before-and-after-marquee) |

## 4. Problem letter

Supported range: 1 to 4 paragraphs and 1 or 2 images (2 and 2 on the reference).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[letter].content.headline` | Question to the repeat renovator | 82 chars, 14 words | 73 to 91 chars | [pattern](exemplar.md#copy-problem-letter) |
| `sections[letter].content.salutation` | Dear [city] homeowners | 26 chars, 3 words | 22 to 30 chars | [pattern](exemplar.md#copy-problem-letter) |
| `sections[letter].content.paragraphs[0]` | The spend, the shortfall, the failures within months | 458 chars, 69 words | 412 to 504 chars | [pattern](exemplar.md#copy-problem-letter) |
| `sections[letter].content.paragraphs[1]` | Reframe the cause as surface-only work | 369 chars, 58 words | 332 to 406 chars | [pattern](exemplar.md#copy-problem-letter) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[letter].content.images[n]` | 1100x782 px | 1.41:1 | One house from the footpath, before (top) and after (bottom), daytime, no people. | Landscape 7:5. Rendered 350x250 (mobile) and 550x391 (desktop). | [standard](exemplar.md#imagery-problem-letter) |

## 5. Recent projects

Supported range: 2 to 8 items (6 on the reference). Two per view on phones, four on desktop.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[projects].content.headline` | Invitation to see other recent jobs | 38 chars, 7 words | 34 to 42 chars | [pattern](exemplar.md#copy-recent-projects) |
| `sections[projects].content.items[n].suburb` | Suburb name | 7 chars, 1 words | 3 to 11 chars | [pattern](exemplar.md#copy-recent-projects) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[projects].content.items[n].poster` | 640x1138 px | 1:1.78 | Portrait poster frame from the clip, crew or surface visible, readable at 188 px wide. | Portrait 9:16 poster frame for each project video. | [standard](exemplar.md#imagery-recent-projects) |

## 6, 8 and 15. Photo grid strips

Supported range: 2 to 8 images per strip (4 on the reference). 4 or 8 look best; desktop shows up to 4 per row.

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[photoGrid].content.images[n]` | 700x700 px | 1.00:1 | Square job photo; mix finished surfaces with crew at work. | Square. Rendered 191x191 (mobile) and 349x349 (desktop), object-fit cover. | [standard](exemplar.md#imagery-photo-grid-strips) |

## 7. Comparison

Supported range: 2 to 6 rows per column, independently (4 and 4 on the reference).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[comparison].content.headline` | Why most jobs fail and how you differ | 75 chars, 12 words | 67 to 83 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.us.items[0]` | Named method one | 108 chars, 12 words | 97 to 119 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.us.items[1]` | Named method two | 81 chars, 12 words | 72 to 90 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.us.items[2]` | Named method three | 96 chars, 12 words | 86 to 106 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.us.items[3]` | Included follow-up | 108 chars, 19 words | 97 to 119 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.them.title` | Most other [trade] | 21 chars, 3 words | 17 to 25 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.them.items[0]` | Prep failure | 78 chars, 12 words | 70 to 86 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.them.items[1]` | Generic mix | 60 chars, 12 words | 54 to 66 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.them.items[2]` | No design thought | 87 chars, 13 words | 78 to 96 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison].content.them.items[3]` | No follow-up | 49 chars, 8 words | 44 to 54 chars | [pattern](exemplar.md#copy-comparison) |
| `sections[comparison:b-comparison].content.headline` | Dream timeframe versus nightmare timeframe | 73 chars, 11 words | 65 to 81 chars | [pattern](exemplar.md#copy-comparison-b-cards) |
| `sections[comparison:b-comparison].content.us.items[n]` | Bold mechanism, plain benefit | 30 chars, 5 words | 21 to 39 chars | [pattern](exemplar.md#copy-comparison-b-cards) |
| `sections[comparison:b-comparison].content.them.title` | Typical [trade plural] | 18 chars, 2 words | 14 to 22 chars | [pattern](exemplar.md#copy-comparison-b-cards) |
| `sections[comparison:b-comparison].content.them.items[n]` | Bold failure, what the bad tradie says | 34 chars, 6 words | 22 to 46 chars | [pattern](exemplar.md#copy-comparison-b-cards) |

## 9. Testimonials

Supported range: 1 to 6 items (3 on the reference).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[testimonials].content.headline` | Local homeowners who chose you | 61 chars, 9 words | 54 to 68 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[0].headline` | Reviewer summary line | 84 chars, 13 words | 75 to 93 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[0].body` | Review body | 205 chars, 31 words | 184 to 226 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[1].headline` | Reviewer summary line | 44 chars, 5 words | 39 to 49 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[1].body` | Review body | 228 chars, 41 words | 205 to 251 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[2].headline` | Reviewer summary line | 51 chars, 10 words | 45 to 57 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[2].body` | Review body | 177 chars, 29 words | 159 to 195 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[n].name` | First name or names | 10 chars, 2 words | 6 to 14 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials].content.items[n].suburb` | Suburb and state | 13 chars, 2 words | 9 to 17 chars | [pattern](exemplar.md#copy-testimonials) |
| `sections[testimonials:b-testimonials].content.headline` | What [city] homeowners say | 70 chars, 9 words | 63 to 77 chars | [pattern](exemplar.md#copy-testimonials-b-carousel) |
| `sections[testimonials:b-testimonials].content.items[n].headline` | Job type | 22 chars, 3 words | 15 to 29 chars | [pattern](exemplar.md#copy-testimonials-b-carousel) |
| `sections[testimonials:b-testimonials].content.items[n].body` | The customer's own thank-you | 155 chars, 28 words | 124 to 186 chars | [pattern](exemplar.md#copy-testimonials-b-carousel) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[testimonials].content.items[n].image` | 790x844 px | 1:1.07 | The reviewer's finished job, drone or street level, subject in the vertical centre. | Near square portrait. Rendered 350x263 (mobile, cropped) and 395x422 (desktop). | [standard](exemplar.md#imagery-testimonials) |

## 10. Benefits

Supported range: 3 to 6 cards (5 on the reference). With 5 the photo sits in the centre of the desktop grid, otherwise before the last card.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[benefits].content.headline` | Aspiration plus durability promise | 90 chars, 15 words | 81 to 100 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits].content.items[n].title` | Named method, Title Case | 30 chars, 3 words | 25 to 35 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits].content.items[0].body` | Statistic, what you do, result | 178 chars, 26 words | 160 to 196 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits].content.items[1].body` | Design to suit the home | 171 chars, 29 words | 153 to 189 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits].content.items[2].body` | Included follow-up | 136 chars, 23 words | 122 to 150 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits].content.items[3].body` | One team, clear updates | 134 chars, 20 words | 120 to 148 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits].content.items[4].body` | Materials and standards | 151 chars, 19 words | 135 to 167 chars | [pattern](exemplar.md#copy-benefits) |
| `sections[benefits:b-benefits].content.headline` | From first step to last in the timeframe | 81 chars, 13 words | 72 to 90 chars | [pattern](exemplar.md#copy-benefits-b-list) |
| `sections[benefits:b-benefits].content.items[n].title` | [Promise] - [Named principle] | 38 chars, 7 words | 26 to 50 chars | [pattern](exemplar.md#copy-benefits-b-list) |
| `sections[benefits:b-benefits].content.items[n].body` | What we do, why we can, the daily image | 225 chars, 37 words | 191 to 259 chars | [pattern](exemplar.md#copy-benefits-b-list) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[benefits].content.image` | 740x600 px | 1.23:1 | A crew member finishing a surface by hand, landscape. | Landscape 5:4. Rendered 350x257 (mobile) and 369x300 (desktop). | [standard](exemplar.md#imagery-benefits) |

## 11. Future pacing

Supported range: 1 to 4 paragraphs (3 on the reference).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[futurePacing].content.headline` | Imagine a home that... | 41 chars, 7 words | 36 to 46 chars | [pattern](exemplar.md#copy-future-pacing) |
| `sections[futurePacing].content.paragraphs[0]` | Daily moment and what they see | 178 chars, 30 words | 160 to 196 chars | [pattern](exemplar.md#copy-future-pacing) |
| `sections[futurePacing].content.paragraphs[1]` | Pains gone, new use, fears removed | 227 chars, 37 words | 204 to 250 chars | [pattern](exemplar.md#copy-future-pacing) |
| `sections[futurePacing].content.paragraphs[2]` | Feeling now versus feeling then | 114 chars, 21 words | 102 to 126 chars | [pattern](exemplar.md#copy-future-pacing) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[futurePacing].content.before` | 1160x1160 px | 1.00:1 | Driveway from the kerb before work, square, same position as the after. | Square. Both halves of the slider must be the same size and framing. | [standard](exemplar.md#imagery-future-pacing-compare-slider) |
| `sections[futurePacing].content.after` | 1160x1160 px | 1.00:1 | Same driveway finished, same position, square. | Square. Both halves of the slider must be the same size and framing. | [standard](exemplar.md#imagery-future-pacing-compare-slider) |

## 12. Bento gallery

Supported range: 3 to 9 images (7 on the reference). Mark wide tiles with wide: true; use hideOnMobile to keep the two-column phone grid even.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[bentoGallery].content.headline` | See recent projects | 31 chars, 6 words | 27 to 35 chars | [pattern](exemplar.md#copy-bento-gallery) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[bentoGallery].content.images[wide]` | 1506x732 px | 2.06:1 | Finished exterior, wide, clean sky or dusk, no people. | Landscape 2:1. Rendered 350x170 (mobile) and 753x366 (desktop). | [standard](exemplar.md#imagery-bento-gallery) |
| `sections[bentoGallery].content.images[square]` | 734x732 px | 1.00:1 | Finished exterior or detail, square, no people. | Square. Rendered 171x170 (mobile) and 367x366 (desktop). | [standard](exemplar.md#imagery-bento-gallery) |

## 13. Three steps

Supported range: 2 to 6 steps (3 on the reference).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[steps].content.headline` | Outcome in three simple steps | 46 chars, 8 words | 41 to 51 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps].content.items[0].title` | Step one title | 30 chars, 6 words | 27 to 33 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps].content.items[0].body` | The visit | 190 chars, 31 words | 171 to 210 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps].content.items[1].title` | Step two title | 32 chars, 7 words | 28 to 36 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps].content.items[1].body` | The plan | 197 chars, 34 words | 177 to 217 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps].content.items[2].title` | Step three title | 42 chars, 7 words | 37 to 47 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps].content.items[2].body` | The work and the follow-up | 229 chars, 38 words | 206 to 252 chars | [pattern](exemplar.md#copy-three-steps) |
| `sections[steps:b-steps].content.headline` | From site start to handover in the timeframe | 89 chars, 14 words | 80 to 98 chars | [pattern](exemplar.md#copy-three-steps-b) |
| `sections[steps:b-steps].content.items[n].title` | [Deliverable] & [Deliverable] | 32 chars, 4 words | 25 to 39 chars | [pattern](exemplar.md#copy-three-steps-b) |
| `sections[steps:b-steps].content.items[n].body` | What happens, where, how long, what they hold | 244 chars, 37 words | 219 to 269 chars | [pattern](exemplar.md#copy-three-steps-b) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[steps].content.items[n].image` | 936x536 px | 1.75:1 | Step one the visit, step two the work, step three the finished detail; landscape. | Landscape 7:4. Rendered 290x158 (mobile) and 468x268 (desktop). | [standard](exemplar.md#imagery-three-steps) |

## 14. Guarantee

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[guarantee].content.badgeLine1` | Guarantee name on the badge | 18 chars, 2 words | 14 to 22 chars | [pattern](exemplar.md#copy-guarantee) |
| `sections[guarantee].content.badgeLine2` | Promise on the badge | 13 chars, 3 words | 10 to 16 chars | [pattern](exemplar.md#copy-guarantee) |
| `sections[guarantee].content.headline` | Guarantee headline | 31 chars, 5 words | 27 to 35 chars | [pattern](exemplar.md#copy-guarantee) |
| `sections[guarantee].content.subheadline` | Names the guarantee, ends with a colon | 81 chars, 13 words | 72 to 90 chars | [pattern](exemplar.md#copy-guarantee) |
| `sections[guarantee].content.paragraphs[0]` | Defects, term in years, the fix | 193 chars, 31 words | 173 to 213 chars | [pattern](exemplar.md#copy-guarantee) |
| `sections[guarantee].content.paragraphs[1]` | What they are really paying for | 228 chars, 40 words | 205 to 251 chars | [pattern](exemplar.md#copy-guarantee) |
| `sections[guarantee:b-guarantee].content.badgeLine1` | Outcome on the badge | 14 chars, 2 words | 9 to 19 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.badgeLine2` | Timeframe or penalty on the badge | 30 chars, 7 words | 21 to 39 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.headline` | Outcome in the timeframe or we pay you | 61 chars, 12 words | 54 to 68 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.paragraphs[0]` | The promise in one line | 79 chars, 15 words | 67 to 91 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.paragraphs[1]` | The nightmare in one line | 134 chars, 22 words | 113 to 155 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.paragraphs[2]` | What we do instead | 159 chars, 23 words | 135 to 183 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.paragraphs[3]` | The guarantee restated with the penalty | 146 chars, 29 words | 124 to 168 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.paragraphs[4]` | The statutory warranty with its terms | 274 chars, 39 words | 232 to 316 chars | [pattern](exemplar.md#copy-guarantee-b) |
| `sections[guarantee:b-guarantee].content.paragraphs[5]` | Closing line | 85 chars, 15 words | 72 to 98 chars | [pattern](exemplar.md#copy-guarantee-b) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[guarantee].content.decorativeImage` | 948x700 px | 1.35:1 | Optional line drawing on transparent, for example a floor plan. | Line drawing or diagram on transparent, for example a floor plan. Rendered 308x225 (mobile) and 474x347 (desktop). | [standard](exemplar.md#imagery-reference-b) |

## 16. Offer and form

Supported range: 2 to 6 bullets (4 on the reference); 1 to 8 form fields (5 on reference A, 6 on B including two selects).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `urgency.line` | Optional hand-written scarcity line | 47 chars, 10 words | empty, or up to 94 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.headline` | Claim the free visit and the bonuses with value | 145 chars, 27 words | 130 to 160 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[0]` | Design talk bullet | 190 chars, 28 words | 171 to 210 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[1]` | Budget blowout bullet | 194 chars, 35 words | 174 to 214 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[2]` | Upgrades bullet | 181 chars, 30 words | 162 to 200 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[3]` | And the free visit | 29 chars, 6 words | 26 to 32 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `form.fields[description].placeholder` | The job question (81 on reference A; B uses a 39 character comments prompt) | 81 chars, 15 words | 36 to 126 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.reinforcement` | Bonus restated under the button | 110 chars, 20 words | 99 to 122 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm:offer-form].content.headline` | Claim the free consultation and see how | 136 chars, 25 words | 122 to 150 chars | [pattern](exemplar.md#copy-offer-and-form-b) |
| `sections[offerForm:offer-form].content.lead` | Line introducing the bullets | 73 chars, 12 words | 51 to 95 chars | [pattern](exemplar.md#copy-offer-and-form-b) |
| `sections[offerForm:offer-form].content.bullets[0]` | The process bullet | 115 chars, 18 words | 97 to 133 chars | [pattern](exemplar.md#copy-offer-and-form-b) |
| `sections[offerForm:offer-form].content.bullets[1]` | The trends bullet | 103 chars, 17 words | 87 to 119 chars | [pattern](exemplar.md#copy-offer-and-form-b) |
| `sections[offerForm:offer-form].content.bullets[2]` | The protection bullet | 181 chars, 26 words | 153 to 209 chars | [pattern](exemplar.md#copy-offer-and-form-b) |
| `sections[offerForm:offer-form].content.bullets[3]` | The bonus bullet with its value | 99 chars, 14 words | 84 to 114 chars | [pattern](exemplar.md#copy-offer-and-form-b) |
| `sections[offerForm:offer-form].content.reinforcement` | Bonus restated under the button | 76 chars, 12 words | 60 to 92 chars | [pattern](exemplar.md#copy-offer-and-form-b) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[offerForm].content.bundleImage` | 1528x764 px | 2.00:1 | Device mock-up of the offer with the logo, on white or transparent. | Landscape 2:1, transparent or white background. Rendered 350x175 (mobile) and 764x382 (desktop). | [standard](exemplar.md#imagery-offer-bundle) |

## Thank-you page

Supported range: 2 to 5 next steps (3 in the template).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `thankYou.headline` | Thanks | 9 chars, 2 words | 4 to 14 chars | [pattern](exemplar.md#copy-thank-you-page) |
| `thankYou.subheadline` | When and how you will be in touch | 35 chars, 7 words | 31 to 39 chars | [pattern](exemplar.md#copy-thank-you-page) |

## Brand

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `brand.texture` | 700x700 px | 1.00:1 | Optional seamless plaster or paper texture for the dark sections, or the photo blurred behind night sections. | Square. Rendered 191x191 (mobile) and 349x349 (desktop), object-fit cover. | [standard](exemplar.md#imagery-hero) |

## SEO

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `seo.ogImage` | 1506x732 px | 2.06:1 | Optional link preview image, 1200x630 works best. | Landscape 2:1. Rendered 350x170 (mobile) and 753x366 (desktop). | [standard](exemplar.md#imagery-hero) |

## B. Logo strip (reference B)

Supported range: 4 to 24 logos (18 on reference B). Fewer logos get more copies in the loop.

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[logoStrip].content.logos[n]` | 400x120 px | 3.33:1 | Supplier or brand mark, the supplier's own file, on transparent. | Supplier or brand mark, transparent PNG or SVG, contained in a 120x36 (strip) or 160x50 (grid tile) box. | [standard](exemplar.md#imagery-reference-b) |

## B. Gallery wall (reference B)

Supported range: 6 to 15 square photos (9 or 12 fill the rows). Collapsed to 338 px on phones and 828 px on desktop until tapped.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[gallery].content.moreLabel` | Button that expands the wall | 15 chars, 4 words | 9 to 21 chars | [pattern](exemplar.md#imagery-reference-b) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[gallery].content.images[n]` | 700x700 px | 1.00:1 | Finished room, square, daylight, no people; eight or more. | Square. Rendered 191x191 (mobile) and 349x349 (desktop), object-fit cover. | [standard](exemplar.md#imagery-reference-b) |

## B. Split sections: dream, problem, owner, liveable (reference B)

Supported range: 1 to 4 paragraphs and 1 or 2 photos per section. Reference B uses four split sections with ids dream, problem, owner and liveable; the lengths below are per id.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[split:dream].content.headline` | The finished state in one line | 92 chars, 13 words | 82 to 102 chars | [pattern](exemplar.md#copy-dream-outcome) |
| `sections[split:dream].content.paragraphs[0]` | Picture this: the finished rooms | 342 chars, 55 words | 307 to 377 chars | [pattern](exemplar.md#copy-dream-outcome) |
| `sections[split:dream].content.paragraphs[1]` | Why it is believable | 314 chars, 47 words | 282 to 346 chars | [pattern](exemplar.md#copy-dream-outcome) |
| `sections[split:problem].content.headline` | How to avoid the blowout and the delay | 95 chars, 19 words | 85 to 105 chars | [pattern](exemplar.md#copy-problem-dark-split) |
| `sections[split:problem].content.paragraphs[0]` | The middleman model and its numbers | 391 chars, 59 words | 351 to 431 chars | [pattern](exemplar.md#copy-problem-dark-split) |
| `sections[split:problem].content.paragraphs[1]` | The daily consequence and the one fixable cause | 464 chars, 74 words | 417 to 511 chars | [pattern](exemplar.md#copy-problem-dark-split) |
| `sections[split:owner].content.headline` | Meet the owner | 106 chars, 14 words | 95 to 117 chars | [pattern](exemplar.md#copy-owner-story) |
| `sections[split:owner].content.paragraphs[0]` | First person career arc and why the business exists | 367 chars, 57 words | 330 to 404 chars | [pattern](exemplar.md#copy-owner-story) |
| `sections[split:owner].content.paragraphs[1]` | Licence number, scale, personal involvement | 282 chars, 40 words | 253 to 311 chars | [pattern](exemplar.md#copy-owner-story) |
| `sections[split:liveable].content.headline` | The system that keeps the home liveable | 91 chars, 13 words | 81 to 101 chars | [pattern](exemplar.md#copy-liveable-home-split) |
| `sections[split:liveable].content.paragraphs[0]` | Name the real fear, then the measures | 382 chars, 59 words | 343 to 421 chars | [pattern](exemplar.md#copy-liveable-home-split) |
| `sections[split:liveable].content.paragraphs[1]` | Short disruption, then the reward | 253 chars, 42 words | 227 to 279 chars | [pattern](exemplar.md#copy-liveable-home-split) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[split].content.images[n]` | 1100x740 px | 1.49:1 | Finished room landscape (one photo: 11:10; two photos: 3:2 each). The owner story can show the owner on site. | Landscape 3:2. Rendered 358x241 (mobile) and 545x367 (desktop). Two stacked photos beside the text. | [standard](exemplar.md#imagery-reference-b) |

## B. Method statement (reference B)

Supported range: 1 to 4 paragraphs (2 on reference B). The foot photo is optional.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[statement].content.headline` | The thesis: in-house method removes three failures | 147 chars, 21 words | 132 to 162 chars | [pattern](exemplar.md#copy-method-statement) |
| `sections[statement].content.paragraphs[0]` | The chain of hand-offs under one roof | 509 chars, 70 words | 458 to 560 chars | [pattern](exemplar.md#copy-method-statement) |
| `sections[statement].content.paragraphs[1]` | The result and the named method | 293 chars, 41 words | 263 to 323 chars | [pattern](exemplar.md#copy-method-statement) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[statement].content.footImage` | 2732x1100 px | 2.48:1 | Optional wide interior at low contrast that fades in under the text. | Wide, low contrast. Rendered full width, 300 tall (mobile) and 520 (desktop), cover, fading in from the section colour. | [standard](exemplar.md#imagery-reference-b) |

## B. Before and after grid (reference B)

Supported range: 2 to 9 items (6 on reference B), three per row on desktop.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[beforeAfterGrid].content.headline` | Homes transformed in the timeframe | 53 chars, 9 words | 47 to 59 chars | [pattern](exemplar.md#copy-before-and-after-grid) |
| `sections[beforeAfterGrid].content.items[n].label` | Suburb and room | 18 chars, 2 words | 10 to 26 chars | [pattern](exemplar.md#copy-before-and-after-grid) |
| `sections[beforeAfterGrid].content.items[n].caption` | One line naming the change | 46 chars, 6 words | 32 to 60 chars | [pattern](exemplar.md#copy-before-and-after-grid) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[beforeAfterGrid].content.items[n].before` | 1100x880 px | 1.25:1 | Before, from the doorway, 5:4, same position as the after. | Landscape 5:4. Rendered 358x286 (mobile) and 369x295 (desktop). Before and after from the same doorway. | [standard](exemplar.md#imagery-reference-b) |
| `sections[beforeAfterGrid].content.items[n].after` | 1100x880 px | 1.25:1 | After, same doorway, 5:4. | Landscape 5:4. Rendered 358x286 (mobile) and 369x295 (desktop). Before and after from the same doorway. | [standard](exemplar.md#imagery-reference-b) |

## B. Materials and supplier logos (reference B)

Supported range: 4 to 24 logos (18 on reference B), six per row on desktop. The foot photo is optional.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[logoGrid].content.headline` | Durability promise with timeframes | 76 chars, 13 words | 68 to 84 chars | [pattern](exemplar.md#copy-materials-and-suppliers) |
| `sections[logoGrid].content.paragraphs[0]` | Still stunning years later; the one decision | 424 chars, 67 words | 381 to 467 chars | [pattern](exemplar.md#copy-materials-and-suppliers) |
| `sections[logoGrid].content.paragraphs[1]` | The suppliers and why | 415 chars, 60 words | 373 to 457 chars | [pattern](exemplar.md#copy-materials-and-suppliers) |

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[logoGrid].content.logos[n]` | 400x120 px | 3.33:1 | Supplier mark on transparent, 12 to 18 of them. | Supplier or brand mark, transparent PNG or SVG, contained in a 120x36 (strip) or 160x50 (grid tile) box. | [standard](exemplar.md#imagery-reference-b) |
| `sections[logoGrid].content.footImage` | 2732x1100 px | 2.48:1 | Optional wide interior at low contrast under the logo tiles. | Wide, low contrast. Rendered full width, 300 tall (mobile) and 520 (desktop), cover, fading in from the section colour. | [standard](exemplar.md#imagery-reference-b) |

## B. FAQ (reference B)

Supported range: 3 to 10 questions (6 on reference B). The first starts open.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[faq].content.headline` | Everything you are wondering, answered honestly | 89 chars, 11 words | 80 to 98 chars | [pattern](exemplar.md#copy-faq) |
| `sections[faq].content.items[n].question` | The question in the customer's words | 37 chars, 6 words | 22 to 52 chars | [pattern](exemplar.md#copy-faq) |
| `sections[faq].content.items[n].answer` | Two to four honest sentences with a number | 207 chars, 32 words | 134 to 280 chars | [pattern](exemplar.md#copy-faq) |

## Video slots

| Slot | Format | Standard |
| --- | --- | --- |
| `sections[projects].content.items[n].videoUrl` | YouTube, Vimeo or Wistia URL, or a direct MP4. Empty shows the poster only. | Portrait 9:16, 10 to 30 seconds, one per suburb, crew or surface visible. See [Part 2 of the exemplar](exemplar.md#part-2-video). |

## Shot list summary

Minimum set to fill the page to the standard: 1 hero wide shot, 14 matched before and after photos (7 pairs, portrait), 2 matched letter photos (landscape), 12 square job photos for three strips (at least 3 with crew working), 3 testimonial job photos, 1 crew-at-work landscape, 2 matched square compare photos, 7 finished exteriors for the bento (2 wide, 5 square), 3 process photos (landscape), 1 offer mock-up, logo in colour and white, 4 customer head shots, 6 portrait clips with posters. Details in [the exemplar's page-level imagery summary](exemplar.md#page-level-imagery-summary).
