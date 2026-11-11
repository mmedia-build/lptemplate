# Verification (Phase 3)

Results from the built placeholder page. Re-run with `npm run build && npm run shoot && npm run verify && npm run lighthouse`. Raw outputs: `docs/build/report.json`, `docs/build/verify-report.json`, `docs/build/lighthouse-mobile.json`, `docs/build/lighthouse-mobile-thank-you.json`.

## Lighthouse (mobile, simulated 4G, Chromium 153 headless)

| Page | Performance | Accessibility | Best practices | SEO | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (placeholder content) | 97 | 100 | 100 | 60 | 2.2 s | 1.8 s | 0 ms | 0 |
| `/thank-you/` | 100 | 100 | 100 | 60 | | | | |

SEO is 60 because the page is `noindex` on purpose (`seo.noindex` defaults to true for an ad landing page); the only failing SEO audit is "is-crawlable". With a real hero photo the LCP element becomes that image: it is preloaded with `fetchpriority="high"`, served as AVIF/WebP with a 480 to 2400 px srcset, and never lazy loaded.

## Section heights, built versus reference

Measured on the placeholder build with the reference values from `docs/teardown.md`. The reference hero includes its trust strip; here they are separate sections, so compare the hero plus trust strip rows together.

| Section | Built 390 | Reference 390 | Built 1440 | Reference 1440 |
| --- | --- | --- | --- | --- |
| Header | 88 | 89 | 106 | 106 |
| Hero + trust strip | 650 + 161 = 811 | 811 | 667 + 196 = 863 | 834 |
| Before and after | 311 | 311 | 314 | 314 |
| Problem letter | 1,381 | 1,403 | 1,000 | 1,000 |
| Recent projects | 754 | 716 | 1,200 | 1,193 |
| Photo grid | 390 | 390 | 349 | 349 |
| Comparison | 1,254 | 1,358 | 1,156 | 1,137 |
| Testimonials | 2,392 | 2,332 | 1,933 | 1,928 |
| Benefits | 1,595 | 1,608 | 1,134 | 1,131 |
| Future pacing | 1,029 | 1,103 | 930 | 902 |
| Bento gallery | 903 | 898 | 1,398 | 1,416 |
| Three steps | 1,399 | 1,489 | 1,455 | 1,486 |
| Guarantee (text part) | 869 | 865 | 908 | 841 |
| Offer and form | 1,553 | 1,654 | 1,745 | 1,845 |
| Footer | 270 | 260 | 259 | 252 |
| Whole page | 15,691 | 15,979 | 15,341 | 15,387 |

The two larger mobile differences are intended: the comparison columns are 104 px shorter because the placeholder rows wrap to fewer lines than the reference copy, and the offer section is 101 px shorter because the urgency line is empty by default (62 px) and the bundle placeholder is exactly 2:1.

## First screen at 390x664

Eyebrow, the whole headline (seven lines of placeholder), the whole paragraph, the full-width CTA and the review badge are all fully visible; the badge ends at 616 px with 48 px to spare. Nothing is cut mid-line. With the review fields empty the badge disappears and the hero closes up by 28 px. Captures: `docs/build/mobile-390x664-first-screen.png` and `docs/build/noproof/mobile-390x664-first-screen.png`.

## Fixed elements while scrolling

None, matching the reference. The header is absolute over the hero and scrolls away. `header.stickyPhoneButton` adds a fixed phone button when wanted. Captures: `docs/build/mobile-390x664-scroll-*.jpg`.

## Widths

| Width | Horizontal scroll | Overflowing elements | Notes |
| --- | --- | --- | --- |
| 360 | none (scrollWidth 360) | none | Comparison columns stack below 375 px; nothing else changes. |
| 390 | none | none | Primary target. |
| 430 | none (scrollWidth 430) | none | |

## Scripted checks (`npm run verify`, 30 of 30 passing)

Modularity (fixture `tests/fixtures/config.modular.ts`: trust strip, comparison, projects, guarantee and the second photo grid disabled; steps moved above testimonials; bento moved after the letter): disabled sections are absent, the new order holds, backgrounds re-plan so no two textured sections touch, and the remaining dark-preferring section (benefits) stays textured. Capture: `docs/build/modular/`.

Empty proof (fixture `tests/fixtures/config.noproof.ts`): zero badges in the output, every CTA still present, hero and headings close up. Capture: `docs/build/noproof/`.

Form, on the iPhone profile by touch: empty submit shows one inline error per required field and stays on the page; a one-letter name, a bad email, a five-digit phone number, a two-digit postcode and a five-character job description are all rejected; a landline typed as "(03) 9123 4567" plus a four-digit postcode submits, the payload (fields, page URL, UTM from the landing URL, timestamp) is assembled and logged, and the visitor lands on `/thank-you/`. Inputs are 16 px so iOS does not zoom; email, tel and postcode fields carry the right `type`, `inputmode` and `autocomplete`. A filled honeypot field skips the send and still redirects. Every button and the phone link is at least 44 px tall.

Tracking (fixture with a dummy pixel ID, pixel script blocked): PageView is queued on landing, Contact fires on a phone-link click, Lead fires exactly once on the thank-you page after a submit and not again on refresh.

Interactions: the terms modal opens and Escape closes it; the compare slider moves by touch drag and by arrow keys, and a vertical swipe over it still scrolls the page; the carousel's next button scrolls the track.

Guide mode: with `GUIDE_MODE=1` every section carries its job and principle; the normal build contains none of that text.

## Type and tap-target checks

Body 16/22.4, headings 28/30/18 (mobile) and 40/42/26 (desktop) as measured on the reference; see `src/tokens/tokens.css`. Mobile CTA height is 44 px (reference 40), the header phone target 44 px (reference 32), footer legal buttons 44 px (reference 22). Side padding 20 px everywhere.

## Screenshot passes

Mobile: three passes (first build, after the scoped-style fix, after the contrast and spacing fixes). Desktop: two passes (after the scoped-style fix, after the testimonial and steps fixes). Captures in `docs/build/` mirror the names in `docs/reference/`.

## Not verified

- WebKit: Playwright's WebKit build could not be downloaded in the build environment (download hosts blocked by the network policy). Mobile checks ran in Chromium only. The WebKit-sensitive choices (dynamic viewport units, `touch-action: pan-y` on the slider, `scroll-snap`, native `<dialog>`, `100dvh` for the modal) are all supported in iOS 16 and later.
- Real-device keyboard behaviour on iOS (the "submit stays reachable with the keyboard open" case) cannot be emulated in headless Chromium; the form is in normal flow with no fixed elements, which is the condition that keeps it reachable.
- Video playback: the tile swaps in the host player on tap; it was exercised with no `videoUrl` set (poster only) because the environment cannot reach video hosts.
- Lighthouse with real client images: scores above are for the placeholder page. A 2400 px hero photo adds roughly 60 to 120 KB as AVIF at 390 wide and is the only asset on the first screen.

## Renovation preset (reference B sections)

Built from `examples/site.config.renovation.ts` with `SITE_CONFIG=examples/site.config.renovation.ts OUT_DIR=./dist-renovation npx astro build`, screenshotted with `node scripts/shoot.mjs docs/build/renovation --dist=dist-renovation` and scored with `node scripts/lighthouse.mjs / --dist=dist-renovation --tag=renovation`. Raw outputs: `docs/build/renovation/report.json`, `docs/build/renovation/lighthouse-mobile.json`, `docs/build/renovation/lighthouse-mobile-thank-you.json`, captures in `docs/build/renovation/` and per-section crops in `docs/build/renovation/sections/`.

### Lighthouse (mobile, simulated 4G)

| Page | Performance | Accessibility | Best practices | SEO | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (placeholder content, Plus Jakarta Sans, night dark tone) | 98 | 100 | 100 | 60 | 2.1 s | 1.9 s | 0 ms | 0.001 |
| `/thank-you/` | 100 | 100 | 100 | 60 | | | | |

SEO is 60 for the same reason as the default build (`noindex` on purpose).

### First screen at 390x664

Eyebrow top 88, headline 138 to 292, paragraph (375 characters, nine lines) 306 to 508, CTA 528 to 588, reinforcement line ending at 652: everything reference B puts on its first screen fits with 12 px to spare, the same margin as the reference. The band layout uses a 12 px eyebrow and tighter gaps measured from B to make this fit; the default cover layout is unchanged.

### Section heights, built versus reference B

Reference values from `docs/teardown-b.md`. Reference B's hero includes its trust panel; here they are separate sections, so compare the two rows together (built 901 + 375 = 1,276 at 390 against 818 + the panel's share of the hero on B, where the panel sits inside the 818; the built panel is taller because its five labels wrap to two lines at 14 px uppercase where B's embedded SVG uses 11 px).

| Section | Built 390 | Reference 390 | Built 1440 | Reference 1440 |
| --- | --- | --- | --- | --- |
| Header | 88 | 93 | 106 | 132 |
| Hero | 901 | 818 (with panel) | 655 | 1,045 (with panel) |
| Trust panel | 375 | inside hero | 262 | inside hero |
| Logo strip | 60 | 55 | 90 | 90 |
| Gallery (collapsed) | 388 | 388 | 928 | 878 |
| Dream outcome split | 981 | 1,035 | 696 | 736 |
| Problem split (dark) | 1,463 | 1,457 | 966 | 994 |
| Before and after grid | 2,691 | 2,743 | 1,328 | 1,355 |
| Method statement | 1,248 | 1,096 | 1,291 | 1,178 |
| Owner story split | 1,329 | 1,286 | 955 | 908 |
| Comparison cards | 1,842 | 1,662 | 1,224 | 1,520 |
| Testimonials carousel | 1,083 | 1,062 | 926 | 939 |
| Photo set | 589 | 681 | 955 | 1,164 |
| Benefits list | 1,503 | 1,452 | 1,317 | 1,398 |
| Liveable-home split | 1,351 | 1,269 | 955 | 904 |
| Materials and logos | 1,624 | 1,792 | 1,290 | 1,385 |
| Three steps | 1,830 | 2,112 | 1,605 | 1,574 |
| Guarantee | 1,252 | 1,444 | 1,323 | 1,607 |
| Offer and form | 1,691 | 1,863 | 1,833 | 1,988 |
| FAQ | 1,178 | 1,191 | 1,224 | 1,270 |
| Footer | 270 | 277 | 259 | 320 |
| Whole page | 23,650 | 24,050 | 20,081 | 21,254 |

Where the built page is shorter: the photo set renders six square tiles in two rows of three where B's composite has taller tiles; the three steps use B's measured row card but with shorter placeholder bodies; the guarantee has no decorative drawing in the placeholder build (the slot renders nothing until a file is supplied); the comparison cards on desktop sit closer to their heading. Where it is taller: the comparison cards on phones carry 16 px between rows rather than B's banded 15 px rows with tighter line height; the method statement's foot photo band is a fixed 300 px.

### Checks

`npm run verify` now runs 44 checks: the 30 from the default build plus 14 on the preset (section order, pinned tones, font preload and night tone, reinforcement line with no badge, two selects with options, first screen fit, six sliders, gallery expand, FAQ open state and single-open behaviour, select validation, and a full submit with selects reaching the thank-you page). All 44 pass; the record is `docs/build/verify-report.json`. Overflow checks at 360 and 430 report no horizontal overflow on the preset.

### Interactions carried over from reference B

Gallery expand (one tap, button leaves), FAQ accordion (buttons with `aria-expanded`, grid-row animation, first open), before and after grid sliders (pointer, touch and keyboard through the shared slider), select fields (native, placeholder option unselectable when required), guarantee terms button (opens the terms modal), testimonials carousel (the shared scroll-snap carousel, one slide per view). Not reproduced on purpose: B's script-injected city, month and year; B's success popup in place of a thank-you route; B's composite logo and photo sprites.

## Agency preset (reference C quiz funnel)

Built from `examples/site.config.agency.ts` with `SITE_CONFIG=examples/site.config.agency.ts OUT_DIR=./dist-agency npx astro build`, screenshotted with `node scripts/shoot.mjs docs/build/agency --dist=dist-agency` (which walks every quiz screen at 390, 1440 and 360) and scored with `node scripts/lighthouse.mjs <route> --dist=dist-agency --tag=agency`. Raw outputs: `docs/build/agency/` (`report.json`, `quiz/` with one capture per screen at both widths, the contact errors, the loader, the exit prompt, the thank-you and not-a-fit pages, and three Lighthouse reports). Run on 11 November 2026 in headless Chromium.

### Lighthouse (mobile, simulated 4G)

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (the quiz, placeholder content, Inter and Anton) | 97 | 100 | 100 | 60 | 2.3 s | 0 ms | 0 |
| `/thank-you/` | 100 | 100 | 100 | 60 | 1.7 s | 0 ms | 0 |
| `/not-a-fit/` | 100 | 100 | 100 | 60 | 1.7 s | 0 ms | 0 |

SEO is 60 for the same reason as the other builds (`noindex` on purpose; the only failing audit is "is-crawlable"). The default build was re-scored after the shared components changed: 96 and 100 for performance, 100 for accessibility on both routes, inside run-to-run variation of the recorded 97.

### First screen at 390x664

| Element | Reference C | Built preset | Built Minus Media draft |
| --- | --- | --- | --- |
| Bar | 0 to 50 | 0 to 50 | 0 to 50 |
| Progress dots | 78 to 102 | 78 to 102 | 78 to 102 |
| Eyebrow | 130 to 150 | 130 to 151 | 130 to 151 |
| Headline | 169 to 273 (three lines) | 170 to 239 (two lines) | 170 to 239 (two lines) |
| Paragraph | 304 to 439 (five lines) | 269 to 404 (five lines) | 269 to 431 (six lines) |
| Button | 465 to 530 | 430 to 495 | 457 to 522 |
| Spare below the button | 134 px | 169 px | 142 px |

Everything the reference puts on its first screen fits, with more room than the reference. The headline runs two lines where the reference runs three because Anton sets slightly narrower than the reference's commercial condensed Futura and the placeholder has shorter words; the offsets of the eyebrow and headline match to the pixel.

### Screen heights, built versus reference C

Height of the active step (question to last control), in px.

| # | Step | Ref 390 | Built 390 | Diff | Ref 1440 | Built 1440 | Diff |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | intro | 400 | 365 | -9% | 413 | 410 | -1% |
| 1 | first_name | 368 | 335 | -9% | 326 | 326 | +0% |
| 2 | email | 238 | 238 | +0% | not captured | 239 |  |
| 3 | sells | 422 | 423 | +0% | 355 | 355 | +0% |
| 4 | marketing | 1028 | 1028 | +0% | 509 | 508 | +0% |
| 5 | location | 238 | 238 | +0% | 283 | 282 | +0% |
| 6 | budget | 832 | 800 | -4% | 479 | 479 | +0% |
| 7 | website | 304 | 304 | +0% | not captured | 284 |  |
| 8 | about | 537 | 504 | -6% | 501 | 500 | +0% |
| 9 | revenue | 800 | 773 | -3% | 436 | 436 | +0% |
| 10 | revenue_goal | 746 | 746 | +0% | not captured | 436 |  |
| 11 | obstacle | 645 | 645 | +0% | not captured | 604 |  |
| 12 | timing | 605 | 615 | +2% | 358 | 368 | +3% |
| 13 | offer | 1433 | 1454 | +1% | 785 | 799 | +2% |
| 14 | commitment | 390 | 357 | -8% | 270 | 270 | +0% |
| 15 | heard | 349 | 331 | -5% | not captured | 360 |  |
| 16 | promise | 365 | 377 | +3% | 374 | 386 | +3% |
| 17 | contact | 644 | 670 | +4% | 715 | 704 | -2% |

Eleven of eighteen phone screens and ten of thirteen captured desktop screens are within 1%. Every difference over 3% is a line count, not a measure: the placeholder for the intro headline, the name question, the budget question and the scale question each wrap one line shorter than the reference's wording (minus 4 to 9%); the "heard" sub-line is two lines for three (minus 5%); the contact question wraps to three lines for two on phones (plus 4%). Controls match: inputs 360x60 and 520x76, buttons 360x65 and 520x72, radio pills 62 tall at a 13 px gap, multi-select pills 70 tall at 16, option cards 114 and 96, the scale 5 by 2 and 10 by 1, text areas 290 tall, offer cards within 2%. Five desktop screens were not captured on the reference (email, website, target revenue, obstacle, heard); their built values are recorded without a comparison.

Progress: one dot lit per question and ten lit from question ten on, as measured on the reference.

### Checks

`npm run verify` now runs 88 checks (30 on the default build and fixtures, 14 on the renovation preset, 40 on the agency preset and 4 on the Minus Media draft); all pass. The agency checks cover: the quiz is the only section; the funnel bar has no phone link; both fonts are preloaded; the not-a-fit route exists for this preset only; the whole intro fits 390x664; one screen visible and the rest hidden and inert; no overflow at 360 on any screen; Back hidden on the intro, shown after, and returning to the previous screen; one dot per question and a full row before the end; Continue disabled until answered; 16 px inputs; 44 px tap targets; the first name written into the next question; a bad email rejected inline; the partial lead after the email step; the QuizStart, QuizStep, QuizEmail and QualifiedLead pixel events; option cards advancing on a tap with no button; multi-select and preselected select behaviour; arrow keys not advancing and Enter advancing; ten graded scale buttons; prefilled contact fields; one error per empty required field; a bad phone rejected; the loader counting and ticking; the full payload (every answer, `lead_score`, `phone_e164`, page URL, UTM); Lead once on the thank-you page and not on refresh; a screening answer landing on the not-a-fit page; the honeypot; the exit prompt opening once on desktop and closing with Escape; two-column radio lists on desktop; no page errors.

### Interactions carried over from reference C

Step transitions (0.2 s out, 0.45 s fade and 0.55 s rise in), the nudging arrow that stops when the button is disabled, button hover lift and press, option card hover lift with the chevron shift, tick circles on chosen pills, the lime-to-grey graded scale with a ring on the chosen number, the pill with a red dot, the dictate chip (shown only where speech recognition exists), the loader with two holds and a random 20% variation, the exit prompt, Back, the logo sliding beside Back on phones, scroll to top on every screen. All respect reduced motion.

### Deliberately not reproduced

The flag looked up from the visitor's address, the dial-code picker and phone lookup, the server email check, the offer-mismatch notice, the tab title that fakes a new message, the "someone just booked" pop-ups, third-party brand icons, and the reference's 50 third-party hosts. Reasons are in `docs/decisions.md`.

### Not verified

- WebKit and Firefox: not run; the browser downloads are still blocked in the build environment. The quiz uses `inert`, `:focus-visible`, `text-wrap: balance`, `color-mix()` (hover tints only), native `<dialog>` and `100svh`; each has a plain fallback or is cosmetic, but none was seen in Safari.
- Dictation: the chip appears in Chromium; recognition itself needs a microphone and was not exercised.
- The calendar embed: the thank-you route was built with `booking.embedUrl` empty; no booking tool was loaded.
- A real webhook: the lead was logged, not posted (`form.destination.url` is empty in every config here).
- The in-app browser keyboard on a real phone: each typing screen has its field and button in the first 400 px, which is what keeps Continue reachable above a keyboard, but it was not tested on a device.
- Reference C in an Australian session, the offer-mismatch notice, the dictation chip while listening, and the reference's calendar page: see the end of `docs/teardown-c.md`.

### Minus Media draft

Built from `examples/site.config.minus-media.ts` into `dist-minus-media`; captures in `docs/build/minus-media/`. Lighthouse: `/` 98, `/thank-you/` 100, `/not-a-fit/` 100 for performance; 100 for accessibility and best practices on all three. First-screen numbers are in the table above. Button text on the brand blue is 6.5:1.

Filled from the agency's own records (Notion and the GoHighLevel sub-account, read only, 11 November 2026): business name, phone 0451 027 610, the accent blue #518CFF and the black, white and grey palette, the audience (building, renovation and landscaping businesses, Australia), the live "15 Min Roadmap Call" (a phone call, with the calendar's own no-show rule), the monthly revenue bands and the "what have you tried" options from its existing surveys.

Missing or unconfirmed, and therefore left out or bracketed:

- [ ] Logo file (a PNG is in the Notion brand assets; copy it to `src/images/minus-media/`). An SVG was not found.
- [ ] ABN and legal entity.
- [ ] Privacy policy and terms (none found). The privacy text must cover the partial lead at the email step.
- [ ] Review rating and count (none recorded). The page shows no rating.
- [ ] A dollar value for the call (none recorded). The intro and exit prompt state no value.
- [ ] Which guarantee is current (three versions are on file). The page states none.
- [ ] Case studies and client logos cleared for public use. The page uses none.
- [ ] The calendar embed URL for `thankYou.booking.embedUrl` (the calendar id is KLxtQf33csANO4QvCYVO), then the thank-you headline, sub-line and steps one and three.
- [ ] The GoHighLevel inbound webhook for `form.destination.url`.
- [ ] Pixel: 2483145255500869 was read from the live funnel; confirm and set `tracking.metaPixelId` for production.
- [ ] Screening rules and points: the draft screens out "not any time soon" and a commitment of 1 or 2, and weights revenue, timing, commitment and current advertising. Confirm or change.
- [ ] States served: the select lists every state and territory with Victoria preselected; no written rule was found.
- [ ] Ad budget question: dropped because no bands exist in the records. Add the `budget` step back with real bands if wanted.
- [ ] Brand fonts: Proxima Nova and Avenir are commercial; Inter and Anton stand in.
- [ ] Google Drive was not reachable, so ad scripts and files stored there were not read.

