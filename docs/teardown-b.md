# Teardown of the second reference page (renovation)

Reference B: `https://offer.champagnefinish.com.au` (a Melbourne kitchen and bathroom renovator's Meta-ad landing page, captured 12 October 2026; built by an agency on a Tailwind-style utility pipeline with hashed class names, Swiper, an Infusionsoft form, GTM, GA4, Google Ads, CrazyEgg and the Meta pixel). Nothing in this file is template copy. Reference wording appears only as short excerpts for internal study. The screenshots in `docs/reference-b/` are the full record of the page.

The first reference (a concreter, `docs/teardown.md`) is called reference A below. Where B does the same thing as A the entry is short and points there; where B differs, the difference is what this file records, because the differences are what became new section types and new options.

How the measurements were taken: the same method as reference A. The page was rendered in Chromium through Firecrawl's interactive browser (the build container's network policy blocks the host) with an iPhone profile at 390x844 (touch, 2x), an in-app profile at 390x664, and a desktop profile at 1440x900. Bounding boxes, computed styles, fonts, animations, form attributes, scripts and the copy inventory were read from the live DOM. Full pages were captured in 4,500 px clips and stitched. Raw material: `docs/reference-b/sections/` (crops at 390 and 1440 for all 20 blocks), `docs/reference-b/interaction-*.jpg` (states), `docs/reference-b/mobile-390x664-*.jpg` (first screen and scroll positions), `docs/reference-b/copy-inventory.json` (every text node with its length).

## Page summary

| Measure | 390 wide (phone) | 1440 wide (desktop) |
| --- | --- | --- |
| Page height | 24,050 px (36 screens at 664, 28 at 844) | 21,254 px |
| Content width | 358 px (16 px side padding) | 1,138 px (1,170 container, 16 px padding, centred) |
| Body font | Plus Jakarta Sans Regular 16/25.6 px, #444444 | same |
| Heading colour | #000000 | same |
| H1 | 28/33.6 px, Medium, Title Case | 55/67 px, Medium, max 1,000 wide, letter-spacing -1.65 px |
| H2 | 26/31.2 px, Medium, Title Case, -0.5 px | 38/46.4 px, Medium |
| CTA button | full width, 358x59, 14 px SemiBold uppercase, bg #b09359, square corners | 548x69, 18 px SemiBold uppercase |
| Line under every CTA | 14/21 px "includes" reinforcement line, max 296 wide | 16/24 px, max 386 wide |
| Fixed or sticky elements while scrolling | none (header is `position: absolute`) | none |
| Navigation | none | none |
| Outbound links | agency credit in footer (one) | same |
| CTA count | 11 anchors + 1 submit, all to `#offer-form` | same |
| Review badge count | 0. The page has no star rating or review count anywhere | same |
| Phone | icon only, 28x28, in the header | icon plus "Got Questions?" and a masked number |

Section order on the live page (20 blocks including header and footer; two of them are bare `<picture>` elements between sections):

| # | Section | 390 height | screens at 664 | 1440 height | Background | Mobile padding |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Header (absolute over hero) | 93 | 0.1 | 132 | transparent | 28/28 |
| 1 | Hero with trust panel at its foot | 818 | 1.2 | 1,045 | #fafafa, photo in the lower part | 80/0 |
| 2 | Logo marquee strip | 55 | 0.1 | 90 | white | 0/0 |
| 3 | Gallery collage (tap to expand) | 388 | 0.6 | 878 | white, fades to white | 0/50 |
| 4 | Dream outcome (text + image) | 1,035 | 1.6 | 736 | white | 50/50 |
| 5 | Problem, dark (two images + text) | 1,457 | 2.2 | 994 | black with a blurred photo | 50/50 |
| 6 | Before and after grid (six sliders) | 2,743 | 4.1 | 1,355 | white | 50/50 |
| 7 | In-house method statement | 1,096 | 1.7 | 1,178 | #fafafa over a fading photo | 50/178 |
| 8 | Owner story (text + two images) | 1,286 | 1.9 | 908 | white | 50/50 |
| 9 | Comparison cards | 1,662 | 2.5 | 1,520 | #f8f6f1 | 50/50 |
| 10 | Testimonials carousel | 1,062 | 1.6 | 939 | white | 50/50 |
| 11 | Full-width photo set | 681 | 1.0 | 1,164 | the photo itself | 0/0 |
| 12 | Benefits list | 1,452 | 2.2 | 1,398 | #fafafa | 50/50 |
| 13 | Liveable-home system (two images + text) | 1,269 | 1.9 | 904 | white | 50/50 |
| 14 | Materials and supplier logos | 1,792 | 2.7 | 1,385 | #f8f6f1, photo at the foot | 50/0 |
| 15 | Three steps | 2,112 | 3.2 | 1,574 | white | 50/50 |
| 16 | Guarantee, dark | 1,444 | 2.2 | 1,607 | black with a blurred photo | 50/50 |
| 17 | Offer and form | 1,863 | 2.8 | 1,988 | #fafafa over a fading photo | 50/100 |
| 18 | FAQ accordion | 1,191 | 1.8 | 1,270 | white | 50/50 |
| 19 | Footer | 277 | 0.4 | 320 | white, 1 px top rule | 0/0 |

Desktop section padding is 120/120 everywhere (the statement section has 350 at the foot for its photo, the materials section 0).

## Mobile first screen (390x664)

Capture: `docs/reference-b/mobile-390x664-first-screen.jpg`.

What a visitor sees before scrolling: logo (124x37) top left and a 28 px phone icon top right; the gold eyebrow in two lines on a white pill (11 px, letter-spaced, uppercase); the four-line headline (28 px); the nine-line supporting paragraph (16 px, centred, 375 characters); the full-width gold CTA (59 px tall); and the two-line "includes" reinforcement line, which ends at 652 px with 12 px to spare. The hero photo starts at 496 px, behind the CTA, and runs to 818 px, so only its top band shows under the button. The dark trust panel is below the fold.

Compared with A: the same five things fit (eyebrow, headline, paragraph, CTA, a line of proof under it), but B spends its proof line on the bonus value rather than a review badge, and B's paragraph is nearly twice as long (375 versus 209 characters) at a smaller size. The template keeps the fit rule: eyebrow, headline, paragraph, CTA and the line beneath it must end inside 664 px at 390 wide.

## What stays fixed on mobile while scrolling

Nothing, as on A. The header is absolute and scrolls away. The terms modal is a `position: fixed` overlay that is present in the DOM at opacity 0 with pointer events off until a terms link is clicked. The page relies on a CTA in eleven sections.

## Design tokens observed

Fonts: Plus Jakarta Sans, self-hosted as four static woff files, one family name per weight (Regular, Medium, SemiBold, Bold), each declared at `font-weight: 400`, so the weight is chosen by family name. Plus Jakarta Sans is published under the SIL Open Font License, so the template can self-host it as a variable woff2 the same way it hosts Manrope.

Where each weight is used: Regular for body, labels, options and the footer; Medium for H1, H2, H4 titles, FAQ questions on mobile and the suburb labels on the before and after cards; SemiBold for the CTA, H3 titles in the benefits list and the FAQ questions on desktop; Bold for the eyebrow, the lead-in words inside comparison rows and offer bullets, and the header phone number.

Type scale (measured):

| Role | 390 | 1440 |
| --- | --- | --- |
| Eyebrow (hero and offer) | 11/17.6, Bold, uppercase, 1 px tracking, gold on a white pill | 14/22.4, 0.6 px tracking |
| H1 | 28/33.6, Medium, Title Case | 55/67.1, -1.65 px, max 1,000 |
| H2 | 26/31.2, Medium, Title Case, -0.5 px | 38/46.4 |
| Body | 16/25.6 Regular | 16/25.6 |
| Testimonial quote | 16/24 | 18/28.8 |
| Benefit title (H3) | 18/30, SemiBold | 20/33.4 |
| Step title (H4) | 18/20.9, Medium | 20/23.2 |
| Testimonial job title (H4) | 21/25.2, Medium | 20/24.4 |
| Comparison row | 16/19, Regular with Bold lead | 16/19 |
| FAQ question | 16/25.6, Medium | 20/32, SemiBold |
| Suburb label on cards | 14/22.4, Medium, gold | 16/25.6 |
| CTA | 14/16.4, SemiBold, uppercase | 18/21.1 |
| Reinforcement line under CTA | 14/21, -0.3 px, max 296 | 16/24, max 386 |
| Form input | 14 px (below the 16 px iOS zoom threshold; the template keeps 16) | 16 px |

Colours: gold `#b09359` (176,147,89: CTA, eyebrow, icons, suburb labels, dashed card border, pagination); heading `#000`; body `#444`; surfaces white, `#fafafa` and `#f8f6f1`; dark sections pure black behind a blurred photo at full opacity; input background white with a 1 px white border (no visible border at rest); validation red `#ff0000` for field messages and `#ef4444` for the form summary; select border `#f7f7f9`.

Spacing: side padding 16 at every width; section padding 50 mobile, 120 desktop; H2 to body gap 28 (60 before the comparison cards); paragraph gap 27; cards gap 16; CTA to reinforcement line 12 (16 desktop); two-column gap 48 desktop.

Shape: no border radius anywhere except the 50 px round slider handle and the 6 px pagination pills. No shadows on cards or buttons. The CTA hover is opacity 0.8 with a 0.5 s transition and no colour change.

Animation: `@keyframes marquee` (translate 0 to -100% minus 20 px, 30 s linear infinite) for the logo strip; a 0.3 s height transition for the FAQ panels; a 0.15 s transition for the gallery expand; a `moveProgress` keyframe for the thank-you popup's progress bar. One `prefers-reduced-motion` rule exists (Tailwind's default), which does not cover the marquee. No scroll reveals at all: nothing fades in.

## Sections

### 0. Header

Same job and principle as A. Mechanics: absolute over the hero, 28 px padding, logo 124x37 (mobile) or 250x76 (desktop) linking to `#top`, phone icon 28x28 (under the 44 px target the template enforces). Desktop adds a two-line block right of the icon: "Got Questions?" at 14 px gold and the number at 24 px Bold, masked with an ellipsis until clicked, as on A.

Slots: logo; phone number; phone eyebrow (14 characters).

### 1. Hero with trust panel

Job: qualify the visitor by identity rather than by trade ("for homeowners who are done with horror stories"), state the outcome with a timeframe and a penalty guarantee in the headline, name the method in the paragraph, and put the CTA with the bonus value beneath it on the first screen.

Principle: identity-based qualification plus a risk-reversal headline. Where A's headline stacks bonuses, B's headline stacks a timeframe, a fixed price and a cash penalty. The paragraph names the mechanism (a trademarked-sounding method name in quotes) and lists what it removes ("No outsourcing. No juggling trades. No surprises.").

Mechanics: section background `#fafafa` with the photo as an absolute layer. Desktop: photo covers the whole 1,045 px section (4,098 px source, cover), pre-washed to near white at the top so the dark text sits on it. Mobile: the photo is not a cover layer; it sits as a 390x323 band at the foot of the section (y 496 to 819) with the text on flat `#fafafa` above it, which is cheaper and more legible than A's washed cover. Content column centred: eyebrow as an inline white pill (padding 9/13, 1 px tracking) 13 px above the H1; H1 (max 1,000 desktop); paragraph (max 854 desktop) 19 px below; CTA (548 wide desktop) 12 px above the reinforcement line.

Trust panel: an inline SVG (1,209x163 viewBox, 1,090x147 rendered) on desktop and a separate mobile SVG, both drawn as a charcoal `#333` panel with five gold line icons (512 px PNGs embedded in the SVG) over white uppercase labels. Desktop: one row of five across 1,090 px. Mobile: two columns of two plus one centred, 1,142 px of panel including the gap. Labels: "25 years experience", "transformed in 42 days", "free custom 3D design plan", "free 60 min design consultation", "fixed price quote" (16 to 31 characters). The panel overlaps the bottom of the hero photo on desktop and sits flush under it on mobile.

Slots: eyebrow (74 characters with the city injected by script); headline (99 characters, 19 words); paragraph (375 characters, 52 words); CTA label (45 characters, shared); reinforcement line (76 characters, shared); hero photo; five trust items with icons.

What the template takes: the mobile hero layout with the photo as a band under the text (`hero.imageLayout: 'band'` as an option beside A's cover); the shared reinforcement line under every CTA as an alternative to the review badge (`cta.reinforcement`); the five-item dark trust panel as a variant of the trust strip (`trustStrip.variant: 'panel'`).

### 2. Logo marquee strip

Job: borrow authority from suppliers and brands the visitor recognises, in the two seconds after the hero.

Principle: association. Eighteen supplier and brand marks moving slowly read as "the trade knows us".

Mechanics: a single 6,912 px wide image of logos (one source file, not individual logos) rendered 3,475x90 on desktop and 2,166x55 on mobile, duplicated once, both copies inside a flex row animated `marquee 30s linear infinite` (translate to -100% minus the 20 px gap). White background, no padding, `overflow: hidden`. Moves right to left at about 116 px per second on desktop and 72 on mobile. No pause on hover and no reduced-motion rule.

Slots: logos (the template takes individual logo images with alt text rather than one composite, so each can be swapped).

### 3. Gallery collage (tap to expand)

Job: a wall of finished work immediately after the logos, cropped so it looks endless, with a tap that rewards curiosity.

Principle: demonstration and the curiosity gap. Cropping the collage and fading it to white says there is more; the tap is a micro-commitment before any argument.

Mechanics: one composite image per breakpoint (desktop 1,440x1,557 source rendered 1,425x1,541; mobile 390x852), inside a wrapper with `max-height: 828px` (desktop) or `338px` (mobile) and `overflow: hidden`. An absolute white gradient covers the lower part with a 54 px circled up-arrow icon and "Tap to see more" (16 px, Title Case) centred at the bottom. A six-line script adds `.active` on click, which sets the max-height to none (0.15 s transition) and hides the fade. The expanded mobile height is 852 px (about 1.3 screens). Captures: `interaction-gallery-before-tap.jpg`, `interaction-gallery-after-tap.jpg`.

Slots: the collage. The template takes a grid of individual square and portrait photos (8 to 12) with the same collapsed height and fade, so no composite is needed.

### 4. Dream outcome (text + image)

Job: paint the finished state before any argument: "picture this", then the specific finished kitchen and bathroom, then the no-chaos promise, then why it is believable (25 years, no outsourcing).

Principle: future pacing placed early, right after proof, so the rest of the page is read as the way to get there. A does this at section 10; B does it at section 4.

Mechanics: white section. Desktop: two columns of 545 with a 48 px gap, vertically centred: H2 (left aligned, 185 px tall at four lines) and two paragraphs on the left, a 545x496 photo on the right (1,440x1,309 source, `object-fit: fill`). Mobile: H2, then the photo 358x325, then the two paragraphs (the image is placed between heading and body on every split section of this page).

Slots: headline (92 characters, 13 words); paragraph one (342 characters, 55 words); paragraph two (314 characters, 47 words); one landscape photo (1,082x982 export, 11:10).

### 5. Problem, dark (two images + text)

Job: explain why renovations go wrong (middlemen, outsourcing, nobody accountable) with the visitor's own numbers ("$80,000 quote becomes $110,000", "6-8 week job drags into four months") and name the one fixable cause.

Principle: problem agitation with a single-cause reframe, as A's letter does, but on a black section so it reads as the low point of the page.

Mechanics: section background black with an absolute blurred photo at full opacity (2,732x1,080 source, cover). Desktop: two 545 columns, 48 gap: two stacked photos 545x370 (16 px gap) on the left; H2 (white), two paragraphs (white), CTA and reinforcement line (white text) on the right. Mobile: H2, two photos 358x243 stacked, paragraphs, CTA. All text white; the CTA keeps its gold.

Slots: headline (95 characters, 19 words); paragraph one (391 characters, 59 words); paragraph two (464 characters, 74 words); two landscape photos (1,082x732, 3:2); CTA.

### 6. Before and after grid (six sliders)

Job: prove transformation in the visitor's suburbs with six interactive pairs, each labelled with a suburb and room type and a one-line caption.

Principle: demonstration with local specificity and an action the thumb can take (A gives one slider in the future-pacing section; B gives six, one per job).

Mechanics: white section. Centred H2 (53 characters). Desktop: three-column grid (369 px tiles, 16 px gap), two rows. Mobile: one column of 358 px tiles. Each tile: a 298 px tall compare slider. Implementation: two absolute layers, the after image at full width and the before image in a wrapper whose inline `width` style is set by drag (the inner picture is held at the full tile width so the photo does not squash), a 50 px white circle handle with a two-way arrow glyph positioned with an inline `left` style, initial split at 51% of the tile. Pointer drag on the handle moves it (mouse verified: 184 to 333 px of 358 after a 150 px drag; touch events on the handle did not move it in the headless run, which is a bug the template does not inherit: it uses pointer events). No before and after labels at all. Below each tile: suburb and room type in gold (14 px Medium, "Camberwell Bathroom"), then a caption line (16 px, 38 to 54 characters). Grid gap 16, tile to label 10. CTA under the grid. Captures: `interaction-compare-before-drag.jpg`, `interaction-desktop-compare-after-drag.jpg`.

Slots: headline (53 characters, 9 words); six items each with a before and after photo (736x596 export, 5:4), a label (16 to 21 characters) and a caption (38 to 54 characters); CTA.

### 7. In-house method statement

Job: name the method and walk through how it works (designers, cabinet makers, project manager, installers under one roof), then the result ("no finger-pointing, no delays, no budget surprises") and the proof of scale ("multi-million dollar, word-of-mouth alone").

Principle: mechanism naming. The paragraph is the longest on the page (509 characters) because it is the central claim; everything after it repeats it in another shape.

Mechanics: `#fafafa` section with a full-width photo (2,732x1,234) absolutely positioned at the foot and faded in from the surface colour; the bottom padding (178 mobile, 350 desktop) exists to show that photo. Centred H2 (147 characters, the longest heading, 185 px tall at four lines on desktop). Two left-aligned paragraphs in a 569 px column centred. CTA. No images in the content itself.

Slots: headline (147 characters, 21 words); paragraph one (509 characters, 70 words); paragraph two (293 characters, 41 words); foot photo (optional); CTA.

### 8. Owner story (text + two images)

Job: put a named owner with a licence number and a career arc behind the promise, and say they are personally involved.

Principle: authority through a person. A has no owner section; this is the main structural addition in B.

Mechanics: white split section. Desktop: H2 (left, 106 characters), two paragraphs and CTA on the left 545 column; two stacked photos 545x327 (16 gap) on the right. Mobile: H2, two photos 358x215, paragraphs, CTA. First person throughout ("I'm ..., and I've spent over 25 years").

Slots: headline (106 characters, 14 words); paragraph one (367 characters, 57 words, first person); paragraph two (282 characters, 40 words, with licence number); two photos (1,068x640, 5:3); CTA.

### 9. Comparison cards

Job and principle as A's comparison, with ten rows per side instead of four and the two sides as separate cards rather than two halves of one block.

Mechanics: `#f8f6f1` section, 50 padding (120 desktop). Centred H2 then 60 px (106 desktop). Two white cards: desktop 466 px each with a 16 px gap in a 948 px block; mobile stacked, 16 px gap. The "us" card has a 2 px dashed gold border and a header plate that overhangs the card top: a gold rectangle image carrying the white logo (300x88 mobile, 390x114 desktop) with a soft shadow. The "them" card has a light grey header plate with "Typical Renovators" at 21 px. Card padding 80/36/30 (desktop) so the plate sits half outside. Rows: 16/19 px, a 16 px gold circle with a white diamond for "us" and a grey circle for "them", 15 px vertical padding, 31 px text indent; alternate rows carry a light grey band. Ten rows each, 24 to 44 characters, each with a Bold lead ("Fixed-price quote, no surprises"; "Budget blowouts of 20-40% par for the course"). CTA under the cards.

Slots: headline (73 characters); us title (logo); ten us rows (24 to 36 characters, lead 9 to 16); them title (18 characters); ten them rows (25 to 44 characters); CTA. The template's comparison takes 2 to 10 rows per side and a `layout: 'cards'` option with the dashed border and header plates.

### 10. Testimonials carousel

Job and principle as A, with a job-type title ("Full Bathroom Renovation") in place of a quote headline and no star rating.

Mechanics: white section. Centred H2 (70 characters), 15 px gap (46 desktop). A Swiper carousel, loop on, centred slides, four slides. Desktop: slides 736 wide with a 30 px gap, the active slide centred and its neighbours peeking either side (the page is `overflow: hidden` horizontally); each slide a 255x332 portrait photo on the left and a 481 px text block on the right: gold quote glyph 37x30, H4 job type 20 px, quote 18/28.8 in quotation marks. Mobile: slides 358 wide, photo 358x386 above the text block (quote glyph, H4 21 px, quote 16/24). Pagination: 6 px gold dots at 30% opacity, the active one a 60 px gold pill. No arrows. Swiping works by touch. CTA under the dots. The reviewer is not named anywhere; only the job type is given. Captures: `interaction-carousel-before-swipe.jpg`, `-after-swipe.jpg`.

Slots: headline (70 characters, 9 words); four items each with a job title (18 to 27 characters), a quote (128 to 178 characters, 21 to 34 words) and a photo (510x722 desktop, 670x722 mobile); CTA. The template's testimonials section gains `layout: 'carousel'` and makes the name, suburb and stars optional so B's shape can be configured; the exemplar still asks for a first name and suburb.

### 11. Full-width photo set

Job: a dense proof wall between the social proof and the benefits.

Mechanics: a bare `<picture>` between sections: one composite image (2,732x1,176 desktop rendered 1,425x1,164; mobile 390x681), no padding, no text, no overlay. In the mobile composite the photos sit in a six-tile grid with thin white gaps.

Slots: six to eight photos. The template renders them as a full-bleed grid (the existing `photoGrid` with a `rows: 2` or `rows: 3` option) rather than a composite.

### 12. Benefits list

Job and principle as A's benefits (named benefits with one concrete promise each), as a single-column list rather than a card grid, four items.

Mechanics: `#fafafa` section. Centred H2 (81 characters). Desktop: a 688 px column centred; each item a white card 197 to 223 px tall with a 30 px gold line icon at the top left (28 px inset), an H3 at 20/33 SemiBold Title Case and a 16/25.6 paragraph, 10 px between cards. Mobile: cards 358 wide, icon 30 px, H3 18/30, text indented 54 px. CTA under the list. The titles are "[Promise] - [Named principle]" pairs ("No Budget Ambush - Fixed Pricing You Can Trust").

Slots: headline (81 characters, 13 words); four items each with an icon, a title (29 to 47 characters) and a body (202 to 248 characters, 29 to 46 words); CTA. The template's benefits section gains `layout: 'list'`.

### 13. Liveable-home system (two images + text)

Job: answer the fear that outranks the finished result ("what worries you more, the finished kitchen or living through the renovation?") with the process that contains dust and finishes in 42 days.

Principle: objection handling by naming the real objection in a question, then the mechanism.

Mechanics: the same split as section 8, mirrored: two photos 545x324 on the left (desktop), H2, two paragraphs and CTA on the right. Mobile: H2, two photos 358x213, paragraphs, CTA.

Slots: headline (91 characters, 13 words); paragraph one (382 characters, 59 words); paragraph two (253 characters, 42 words); two photos (1,082x648, 5:3); CTA.

### 14. Materials and supplier logos

Job: promise durability ("still flawless 10 years later, not chipped after 2") and prove it with the supplier marks.

Principle: authority by association, placed where durability doubt would otherwise surface.

Mechanics: `#f8f6f1` section, 50 top padding and none at the foot. Centred H2 (76 characters), two paragraphs in a 569 column. Then a composite logo image: desktop 1,138x289 (two rows of nine white tiles), mobile 335x812 (nine rows of two white tiles with a gold tint behind). Then a full-width photo 390x334 (desktop 1,425x904) flush at the foot. No CTA.

Slots: headline (76 characters, 13 words); paragraph one (424 characters, 67 words); paragraph two (415 characters, 60 words); 12 to 18 supplier logos (the template takes individual files and renders the tile grid); optional foot photo.

### 15. Three steps

Job and principle as A's steps.

Mechanics: white section. Centred H2 (89 characters, max 650 desktop). Three rows, each a `#fafafa` card 1,138x328 on desktop: a 569x328 photo on one side (cover) and a text block on the other (padding 44/50): a 30 px gold square with the step number ("1."), an H4 at 20 px Medium, a 16/25.6 paragraph. Photo side alternates (right, left, right). Rows are flush (no gap). Mobile: each card is photo (358x317, the second 358x206) above the text block (padding 20) with the number square inline before the H4. CTA under the rows.

Slots: headline (89 characters, 14 words); three steps with a title (29 to 36 characters), a body (226 to 259 characters, 35 to 41 words) and a photo (1,142x656, 7:4); CTA. The template's steps section gains `layout: 'rows'` (the A layout with circles and a dashed line stays the default).

### 16. Guarantee, dark

Job and principle as A's guarantee: name it, give it a badge, state the term, add the statutory warranty, send the reader to the terms.

Mechanics: section with an absolute blurred dark photo (2,732x1,692, cover). Centred: a 158x152 (242x233 desktop) badge image (laurel wreath, three stars, the guarantee in three lines); H2 (61 characters, white); then a 569 px column of six white paragraphs (79 to 274 characters) left aligned; between paragraphs four and five sits a decorative floor-plan line drawing (308x225 mobile, 474x347 desktop) with two thin horizontal rules either side; the last line is "T&C's Apply*" as a link that opens the terms modal. No CTA in this section (the form is next).

Slots: badge lines (three short lines); headline (61 characters); six paragraphs (79, 134, 159, 146, 274 and 85 characters); optional decorative image; terms link label.

### 17. Offer and form

Job and principle as A: restate the offer, list what the consultation delivers, take the lead.

Mechanics: `#fafafa` section with an absolute foot photo fading in behind the form (1,425x1,078 desktop). `id="offer-form"` on the container (the anchor every CTA targets). Centred column: scarcity eyebrow on a white pill (51 characters: "strictly limited to the next 5 enquiries in [month]", the month injected by script, which the template never does); H2 (136 characters, max 854); offer mock-up image (854x366 desktop, 358x175 mobile); "Here's just a fraction..." lead line; four bullets with a 25 px gold check circle and a Bold lead (99 to 181 characters); the form; CTA submit; reinforcement line.

Form: Infusionsoft action (`/app/form/process/...`) with three hidden fields and a honeypot named `planet` (absolute, 26x42, off the content edge). Six visible fields: name, email, phone, a required select (room: kitchen, bathroom, both), a required select (budget: five ranges from 35k to 180k+), and a textarea. Inputs 62 px tall, white, no visible border, 14 px text (16 desktop), a 20 px gold line icon at the left, padding-left 53 (71 desktop), 10 px between fields; the textarea 211 px. Submit is an `<input type="submit">` styled as the CTA. Validation is custom (`.kk-validation`, `novalidate`): on submit each bad field gets an `.error` class and a red `.field-error` line ("Please enter a valid email address!", "This field is required!") and a red summary under the form ("Please ensure all required fields have been completed!"). Capture: `interaction-form-bad-values-submit.jpg`. Submitting valid data was not tested (live CRM).

Thank-you: there is no thank-you route. A fixed overlay (`#thank-you-message`, black at 80%) shows a white card with a tick, "Success!", a three-line rotating status and a green progress bar, then presumably redirects. The Meta pixel on the page fires `init` and `PageView` only; the `Lead` event, if any, comes from GTM.

Slots: urgency line (51 characters, hand-written, optional); headline (136 characters, 25 words); offer image (2,430x1,040 export); lead line (73 characters); four bullets (99 to 181 characters, leads 30 to 54); six fields including two selects with 3 and 5 options; submit label (shared CTA); reinforcement line (shared). The template's form gains a `select` field type with options.

### 18. FAQ accordion

Job: answer the six questions a partner would ask at the kitchen table (where do we cook, dust, changes, how is 42 days guaranteed, what if something goes wrong, which suburbs), each in two to four sentences.

Principle: objection handling after the form, for the visitor who scrolled past it; the last CTA follows.

Mechanics: white section. Centred H2 (89 characters). Six items in a 759 px column (desktop): each a white `<button data-accordion-trigger aria-expanded>` 80 px tall (padding 24/112/24/38, 20 px SemiBold, left aligned, a gold chevron at the right that rotates when open) and a panel `<div>` whose height animates over 0.3 s (`overflow: hidden`); the first item is open on load; opening one closes the others. Mobile: buttons 74 to 99 px tall (padding 24/50/24/15, 16 px Medium), 15 px between items, answers 16/25.6 with 27 px bottom padding. CTA under the list. Captures: `interaction-faq-before-tap.jpg` (first item open), `-after-tap.jpg` (closed).

Slots: headline (89 characters, 11 words); six questions (29 to 50 characters) with answers (163 to 274 characters, 25 to 43 words); CTA.

### 19. Footer

Same as A: 1 px top rule, centred logo 168x51 (188x57 desktop) linking to `#top`, copyright line with the year in a span, "Terms & Conditions" as a link that opens the fixed modal, an agency credit with an outbound link. Modal: a white box 358 wide (1,000 desktop) with 36/20 padding, a 16 px close cross top right, ten numbered headings and 2,900 px of terms on mobile; `body` overflow is locked while open. Capture: `interaction-modal-terms-open.jpg`.

Slots: logo; copyright suffix; terms label (18 characters); terms body (about 2,400 characters in ten numbered headings with one to four short clauses each). There is no privacy policy.

## Page-level patterns

Persuasion sequence (compared with A): hero (identity + outcome + penalty) > borrowed authority (logos) > proof wall (gallery) > future pacing (dream outcome) > problem and cause (dark) > proof with locality (six sliders) > mechanism (statement) > authority of a person (owner) > contrast (comparison) > social proof (carousel) > proof wall (photo set) > benefits > objection (living through it) > durability and suppliers > process (steps) > risk reversal (guarantee) > offer and form > FAQ > footer. A runs proof > problem > proof > contrast > social proof > benefits > future pacing > proof > steps > guarantee > form. B moves future pacing to the front, adds an owner section, a supplier section, a FAQ and two dark "low point" sections, and leans on a cash penalty rather than reviews.

CTA cadence: the same 45-character label twelve times (eleven anchors and the submit). Under every anchor sits the 76-character reinforcement line that restates the bonus and its value. B has no review badge anywhere, which is the single largest difference from A: B's social proof is the carousel, the logos and the owner; A's is the rating repeated ten times.

Backgrounds: white, `#fafafa` and `#f8f6f1` alternate for argument sections; two black-with-photo sections mark the problem (5) and the guarantee (16); three sections use a photo fading in at the foot (7, 14, 17) rather than a strip between sections; two full-bleed photo blocks (3 and 11) act as proof walls. Pattern: photo band, strip, photo, white, dark, white, grey-photo, white, muted, white, photo, grey, white, muted-photo, white, dark, grey-photo, white.

Split sections: four sections (4, 5, 8, 13) are the same component: a heading, two paragraphs and a CTA beside one or two photos, with the photo side alternating and the dark variant for section 5. On mobile the photos always sit between the heading and the paragraphs. The template adds this as one `split` section type with `images: 1 | 2`, `imageSide` and `tone` options.

Scripts: no scroll reveals; Swiper for the carousel; a drag handler for the sliders; a click handler for the gallery; an accordion script; a form validator; the terms modal; and three "dynamic" spans (`dyn-location`, `dyn-month`, `dyn-year`) that inject the city, the current month and the year, which the template never does (the urgency line is hand-written or empty).

Third-party weight on the reference: Meta pixel, GTM plus GA4 and Google Ads conversion tags, Google call tracking, CrazyEgg, the agency's own tracker, and the Infusionsoft form endpoint. The template keeps only the Meta pixel.

Copy voice (details in `docs/exemplar.md`, part 4): Title Case headings that run to 147 characters, a number in nearly every heading (42 days, $3,000, 25 years, 10 years, 60 minutes, $1,800), a named method in quotation marks, triplets of "No X. No Y. No Z.", the villain named as "middlemen" and "five contractors who blame each other", and a first-person owner section.

## Accessibility and performance notes on the reference

- The phone target is 28x28 and the FAQ chevrons are decorative; form inputs are 14 px on mobile (iOS zooms); the slider handle is a `<div>` with no keyboard access; the accordion is correct (`button`, `aria-expanded`). The template keeps the 44 px targets, 16 px inputs and keyboard support from A.
- Eyebrow gold on white at 11 px is about 3.1:1, below AA; the template uses its darker accent text colour for eyebrows, as it did for A's sage.
- No reduced-motion rule for the marquee; the template adds one.
- The hero photo loads lazily with no preload on both references; the template preloads it.
- The two logo composites, the gallery composite and the photo set composite are single large images (up to 6,912 px wide); the template renders individual images with srcset.
