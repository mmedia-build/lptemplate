# Content spec

Every slot on the page in order, with its purpose, target length and, for images, the export size and the shot needed. Generated from `src/config/spec.ts` and `src/tokens/tokens.ts` by `npm run content-spec`; edit those files, not this one.

How to read the lengths: the target is the reference page's own content length. `npm run check:content` fails any slot outside the tolerance (10% unless stated). Staying inside the range keeps the mobile layout as measured in `docs/teardown.md`; going outside is allowed, but re-check the page at 390 wide.

Each slot links to the matching pattern and standard in `docs/exemplar.md`. Client copy is written from the client's own customer research and offer, never by rewording the exemplar excerpts.

Image files go under `src/images/` and are referenced by file name in `site.config.ts`. Export at the listed size (2x the largest rendered size); the build makes the responsive versions.

## Global (header, CTA, proof)

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `cta.label` | The one CTA label used on every button and the submit | 34 chars, 7 words | 30 to 38 chars | [pattern](exemplar.md#copy-hero) |
| `business.phoneEyebrow` | Invitation above the number in the desktop header | 15 chars, 2 words | 9 to 21 chars | [pattern](exemplar.md#copy-header) |

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

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `sections[hero].content.image` | 2400x1400 px | 1.71:1 | Wide finished job, house visible, no people, subject in the centre third; washed out behind the text. | Covers the hero at every width. Centre of the frame is what survives the mobile crop (390x811). | [standard](exemplar.md#imagery-hero) |

## 2. Trust strip

Supported range: 3 to 8 items (6 on the reference). Below 5 the phone marquee repeats the set to stay seamless.

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `sections[trustStrip].content.items[n].label` | Two to five word proof point | 24 chars, 3 words | 16 to 32 chars | [pattern](exemplar.md#copy-hero) |

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

## 16. Offer and form

Supported range: 2 to 6 bullets (4 on the reference); 1 to 8 form fields (5 on the reference).

| Slot | Purpose | Target | Accepted range | Exemplar |
| --- | --- | --- | --- | --- |
| `urgency.line` | Optional hand-written scarcity line | 47 chars, 10 words | empty, or up to 94 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.headline` | Claim the free visit and the bonuses with value | 145 chars, 27 words | 130 to 160 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[0]` | Design talk bullet | 190 chars, 28 words | 171 to 210 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[1]` | Budget blowout bullet | 194 chars, 35 words | 174 to 214 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[2]` | Upgrades bullet | 181 chars, 30 words | 162 to 200 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.bullets[3]` | And the free visit | 29 chars, 6 words | 26 to 32 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `form.fields[description].placeholder` | The job question | 81 chars, 15 words | 72 to 90 chars | [pattern](exemplar.md#copy-offer-and-form) |
| `sections[offerForm].content.reinforcement` | Bonus restated under the button | 110 chars, 20 words | 99 to 122 chars | [pattern](exemplar.md#copy-offer-and-form) |

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
| `brand.texture` | 700x700 px | 1.00:1 | Optional seamless plaster or paper texture for the dark sections. | Square. Rendered 191x191 (mobile) and 349x349 (desktop), object-fit cover. | [standard](exemplar.md#imagery-hero) |

## SEO

| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |
| --- | --- | --- | --- | --- | --- |
| `seo.ogImage` | 1506x732 px | 2.06:1 | Optional link preview image, 1200x630 works best. | Landscape 2:1. Rendered 350x170 (mobile) and 753x366 (desktop). | [standard](exemplar.md#imagery-hero) |

## Video slots

| Slot | Format | Standard |
| --- | --- | --- |
| `sections[projects].content.items[n].videoUrl` | YouTube, Vimeo or Wistia URL, or a direct MP4. Empty shows the poster only. | Portrait 9:16, 10 to 30 seconds, one per suburb, crew or surface visible. See [Part 2 of the exemplar](exemplar.md#part-2-video). |

## Shot list summary

Minimum set to fill the page to the standard: 1 hero wide shot, 14 matched before and after photos (7 pairs, portrait), 2 matched letter photos (landscape), 12 square job photos for three strips (at least 3 with crew working), 3 testimonial job photos, 1 crew-at-work landscape, 2 matched square compare photos, 7 finished exteriors for the bento (2 wide, 5 square), 3 process photos (landscape), 1 offer mock-up, logo in colour and white, 4 customer head shots, 6 portrait clips with posters. Details in [the exemplar's page-level imagery summary](exemplar.md#page-level-imagery-summary).
