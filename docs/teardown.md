# Teardown of the reference page

Reference: `https://offer.rosellaconcreting.com.au` (a Melbourne concreter's Meta-ad landing page, built with Astro 6 and Tailwind, captured 9 October 2026). Nothing in this file is template copy. Reference wording appears only as short excerpts for internal study. The screenshots in `docs/reference/` are the full record of the page.

How the measurements were taken: the page was rendered in a real Chromium browser (through Firecrawl's interactive browser, because this build environment's network policy blocks the host directly) with an iPhone profile at 390x844 (touch, 2x), an in-app profile at 390x664, and a desktop profile at 1440x900. Bounding boxes, computed styles, fonts, animations, swiper options, form attributes and scripts were read from the live DOM. Raw dumps: `docs/reference/sections/` (crops), `docs/reference/interaction-*.jpg` (states), `docs/reference/mobile-390x664-scroll-*.jpg` (scroll positions).

## Page summary

| Measure | 390 wide (phone) | 1440 wide (desktop) |
| --- | --- | --- |
| Page height | 15,979 px (24 screens at 664, 19 at 844) | 15,387 px |
| Content width | 350 px (20 px side padding) | 1,140 px (1,180 container, 20 px padding, centred) |
| Body font | Manrope 16/24 px, weight 400, #37373c | Manrope 17/23.8 px |
| Heading colour | #181819 | same |
| CTA button | full width, 350x40, 15 px/600 uppercase, bg #224b1c | 483x60 auto width, 18 px/600 |
| Fixed or sticky elements while scrolling | none (header is `position: absolute`, scrolls away) | none |
| Navigation | none | none |
| Outbound links | agency credit in footer (one) | same |
| CTA count | 8 anchors + 1 submit button, all to `#offer-section` | same |
| Review badge count | 10 (under 8 CTAs, plus 2 heading badges) | same |

Section order on the live page (the quick-read inventory was correct except for the trust strip, which lives inside the hero, and the third photo grid, which lives inside the guarantee section):

| # | Section | 390 height | screens at 664 | 1440 height | Background |
| --- | --- | --- | --- | --- | --- |
| 0 | Header (absolute over hero) | 89 | 0.1 | 106 | transparent |
| 1 | Hero with trust strip at its foot | 811 | 1.2 | 834 | pale photo, cover |
| 2 | Before and after marquee | 311 | 0.5 | 314 | white |
| 3 | Problem letter | 1,403 | 2.1 | 1,000 | white |
| 4 | Recent projects (video carousel) | 716 | 1.1 | 1,193 | white |
| 5 | Photo grid strip | 390 | 0.6 | 349 | full bleed photos |
| 6 | Comparison | 1,358 | 2.0 | 1,137 | plaster texture |
| 7 | Photo grid strip | 390 | 0.6 | 349 | full bleed photos |
| 8 | Testimonials | 2,332 | 3.5 | 1,928 | white |
| 9 | Benefits | 1,608 | 2.4 | 1,131 | plaster texture |
| 10 | Future pacing with compare slider | 1,103 | 1.7 | 902 | white |
| 11 | Bento gallery | 898 | 1.4 | 1,416 | white |
| 12 | Three steps | 1,489 | 2.2 | 1,486 | off-white #f5f4f0 |
| 13 | Guarantee, then photo grid strip | 1,255 | 1.9 | 1,250 | plaster texture |
| 14 | Offer and form | 1,654 | 2.5 | 1,845 | white |
| 15 | Footer | 260 | 0.4 | 252 | white, 1 px top rule |

## Mobile first screen (390x664, the Instagram in-app viewport)

Capture: `docs/reference/mobile-390x664-first-screen.png`.

What a visitor sees before scrolling: the logo (100x33) top left and a 32 px phone icon top right, the sage eyebrow question in two lines, the whole eight-line headline, the whole four-line supporting paragraph, the full-width green CTA, and the Google review badge directly under it. The badge is the last thing on screen, with 22 px to spare. The trust strip starts 19 px below the fold and is not visible. The hero photo is a pale, washed-out driveway shot behind all of this. Only its faint texture reads; no subject is identifiable. At 390x844 the first two trust icons and labels also appear.

Why it matters: the whole offer, the proof and the action all fit one in-app screen. Nothing competes for attention and nothing is cut off mid-line. The template keeps this: eyebrow, headline, paragraph, CTA and badge must fit 664 px at 390 wide with the measured type sizes.

## What stays fixed on mobile while scrolling

Captures: `docs/reference/mobile-390x664-scroll-0.jpg`, `-scroll-1500.jpg`, `-scroll-6000.jpg`, `-scroll-14700.jpg`.

Nothing. The page has no fixed or sticky element on any width. The header is `position: absolute` and scrolls away with the hero. There is no floating phone button and no sticky CTA bar. The page relies on the CTA repeating in every section instead. The template reproduces this (no sticky header, no sticky bar), with the option left open in config for a sticky phone button because the measured phone tap target on the reference (32x32) is under the 44 px minimum the template enforces.

## Design tokens observed

Fonts: Manrope at weights 200 to 800, self-hosted as woff2 and woff (seven static files, `font-display: swap`). Manrope is published under the SIL Open Font License, so the template self-hosts it too (one variable woff2 per subset, from the Google Fonts build).

| Role | 390 | 1440 | Weight | Letter spacing | Case |
| --- | --- | --- | --- | --- | --- |
| Eyebrow (hero, urgency) | 14 / 21 | 18 / 27 | 800 | 0.2 em | uppercase, sage #839478 |
| H1 | 28 / 30.8 | 40 / 44 | 700 | -0.4 px / -1.08 px | Title Case |
| H2 | 30 / 36 | 42 / 50.4 | 600 | -0.02 em | Title Case |
| H3 testimonial | 18 / 19.8 | 26 / 28.6 | 600 | -0.02 em | Title Case |
| H3 benefit card | 14 / 15.4 | 20 / 22 | 600 | 0 | Title Case |
| H3 step | 20 / 24 | 26 / 31.2 | 600 | -0.02 em | as written |
| H3 guarantee sub-headline | 24 / 32 | 24 / 32 | 600 | -0.02 em | Title Case |
| Comparison column title | 22 / 24.2 | 25 / 27.5 | 600 | 0 | Title Case |
| Body paragraph | 16 / 22.4 | 17 / 23.8 | 400 | 0 | |
| Comparison rows, offer bullets | 16 / 24 | 16 / 24 | 400, lead in 700 | 0 | |
| Testimonial quote | 14 / 16.8 | 17 / 20.4 | 400 | 0 | |
| Testimonial name | 16 / 16 | 16 / 16 | 600 | 0 | |
| Benefit card copy | 14 / 16.8 | 17 / 20.4 | 400 | 0 | |
| Trust strip label | 16 / 22.4 | 20 / 28 | 500 | 0 | Title Case |
| Project suburb label | 15 / 15 | 26 / 26 | 700 | 0 | Title Case |
| Review badge | 12 / 16.8 (14 under headings) | 16 / 22.4 (18 under headings) | 400, rating 700 | 0 | |
| Button | 15 / 18 | 18 / 21.6 | 600 | 0 | uppercase |
| Input text and placeholder | 16 | 16 | 400 | 0 | |
| Step number | 14 in 36 px circle | 32 in 80 px circle | 700 | 0 | |
| Header phone | 20 / 20 (desktop only) | 20 | 600 | -0.8 px | |
| Footer text | 16 / 22.4 | 17 / 23.8 | 400 | 0 | |

Colours: headings #181819; body #37373c; header phone #1e180b; CTA #224b1c on white text; sage accent #839478 (eyebrows, icons, step circles, comparison column, check circles, quote marks); off-white #f5f4f0 (steps section, testimonial cards); input border oklch(0.928 0.006 26) about #e6e3e1; focus ring 1 px blue (Tailwind blue-600); stars #ff8b00; comparison X icons red on white circles; footer rule #ddd8d8; dialog backdrop rgba(0,0,0,0.1) with 8 px blur. The "dark" sections are not dark: they use a near-white plaster texture photo (`bg-textured.jpg`, cover) that reads as warm grey against the white sections.

Spacing: container 1180 max with 20 px padding at every width. Section padding 50 px top and bottom on mobile; 100 on desktop. Textured sections 52/44 mobile, 100/72 desktop. Hero 104/34 mobile, 150/80 desktop. Testimonials 110/120 desktop. Steps 120/30 desktop. Offer 120/80 desktop. Photo grids have no padding (the second grid has 20 px top margin). Heading to body gaps: 20 px (hero), 25 to 50 px (section H2 to content).

Radii and shadows: 0 radius on sections, cards, images, buttons and the dialog; 10 px on form inputs; full round on step numbers and the compare handle; about 8 px on video tiles. Shadows: the CTA uses Tailwind `shadow-md`; step images use `shadow-lg`; nothing else.

Buttons: `<a href="#offer-section">`, display block, 350x40 full width on mobile (padding 10/20/12/20), 483x60 auto on desktop (padding 18/32/20/32). Hover does not change anything (measured: same background, shadow and transform). Smooth scroll comes from `scroll-behavior: smooth` on `html`. The submit button is a `<button type="submit">` with identical styling.

Tap targets at 390: CTA 350x40 (under 44), phone icon 32x32 (under 44), inputs 350x64, textarea 350x88, footer terms button 143x22 (under 44), swiper dots 8x8 (under 44), compare handle 40x40. Side padding 20 px everywhere. Line lengths: body paragraphs run about 42 to 46 characters per line at 390 in the letter, 38 to 40 in the comparison columns (which are only 155 px wide), 34 to 38 in benefit cards.

## Sections

### 0. Header

Job: identify the business and give an impatient visitor a phone escape hatch, without offering any navigation that could leak attention away from the page.

Principle: authority and trust framing. A real logo and a real number say "this is a real business", and the lack of a menu keeps the page single-path (the only exits are the form and the phone).

Mechanics: absolute positioned over the hero, 28 px top padding, flex row space-between inside the container. Mobile: logo 100x33 left, phone icon 32x32 right (`tel:` link, icon only, no label). Desktop: logo 150x50, right side is a phone icon plus two lines: a 12 px/500 "have questions" line and a 20 px/600 phone number. The number is masked with an ellipsis until clicked (a 10 line script swaps in the full number from a data attribute), which is an anti-scraping touch. No background, no border, no shadow, not sticky.

Slots: logo image (440x146 source, transparent); phone number (15 characters as displayed, masked); phone eyebrow (15 characters, "HAVE QUESTIONS?").

### 1. Hero

Job: in one screen, qualify the visitor (right city, right service), state the outcome with a timeframe and a stacked bonus with a dollar value, agitate the current pain in one line, and put the single CTA and the review proof within thumb reach.

Principle: specificity and offer stacking (a precise timeframe, a precise bonus value), with social proof placed directly beneath the action so the click and the reassurance happen together. The eyebrow is a yes-question the right visitor answers "yes" to, which is the classic qualifying hook for cold ad traffic.

Mechanics: full-bleed background image 1372x1352 (avif/webp/jpg sources, object-fit cover, 50% 50%, `loading="lazy"` with no preload, which is a performance mistake the template fixes). The photo is pre-washed to near white so the dark text stays readable with no overlay. Content column centred, max 1000 px for the H1 and 740 px for the paragraph. Order: eyebrow (20 px gap), H1 (20 px gap), paragraph (30 px gap), CTA (10 px gap), review badge (41 px gap), trust strip. Mobile: 104 px top padding (clears the absolute header), everything centred, CTA full width, badge centred. Desktop: 150 px top padding, CTA 483 px wide centred.

Trust strip (inside the hero): six items, each a 40 px sage icon over a two-line label. Mobile: Swiper, 2.5 slides per view, 4 px gap, loop, autoplay every 2.5 s, no dots, no arrows, so it reads as a slow marquee. Desktop: six static items across the 1140 container (190 px each). Labels are 16 px/500 (mobile) and 20 px/500 (desktop), centred, Title Case.

Slots: eyebrow question (43 characters); headline (163 characters, 29 words); supporting paragraph (209 characters, 30 words); CTA label (34 characters, shared across the page); review rating, count and source (data, not copy: "4.9", "491", "Google"); background photo; six trust items of 17 to 31 characters (average 24) each with an icon.

### 2. Before and after marquee

Job: prove transformation within the first swipe, before any argument is made, with real jobs rather than stock.

Principle: demonstration and contrast. Pairs shown side by side make the difference legible in under a second, and a moving strip rewards the eye without asking for a tap.

Mechanics: seven pairs. Each pair is a 2 column grid (234x311 portrait tiles, 2 px gap, white gap colour) with a small white pill in the top corner of each tile: 12 px red X icon plus "Before", 12 px green tick icon plus "After" (16 px/600, Title Case, 5/7 px padding). The strip is a pure CSS marquee: two identical tracks of seven pairs, `animation: marquee-x 60s linear infinite reverse`, 12 px gap mobile and 16 px desktop, `overflow: hidden`, no JS. No pause on hover, no reduced-motion rule (the template adds one). The section has no padding; it sits flush under the hero and flush above the letter. Vertical swipes over it scroll the page normally. The track moves right to left at about 56 px per second at 390 (3369 px in 60 s).

Slots: seven before images and seven after images (each 700x930 export, 3:4), optional "before" and "after" labels (6 and 5 characters).

### 3. Problem letter

Job: name the visitor's actual experience (money spent, result still wrong, cracks within months) so they feel understood, then reframe the cause (surface-only work) so the business's method becomes the obvious answer.

Principle: problem agitation and the "letter" device (a salutation to the city's homeowners makes it personal and signals a considered argument rather than a brochure). Placed third because the visitor has now seen proof and will tolerate text.

Mechanics: two column grid at desktop (550 + 550, 40 px gap, items centred vertically): left column H2 (42 px, left aligned, 550 wide), salutation in bold, two paragraphs, CTA (418 wide, left aligned) with badge beneath; right column two stacked landscape photos (550x391 each, 18 px gap, fade-left reveal on scroll). Mobile: single column, H2 first (30 px, left aligned, 144 px tall at four lines), then the two photos (350x250 each, 10 px gap), then salutation and paragraphs, then full-width CTA and badge. Section padding 50 mobile, 100 desktop.

Slots: headline (82 characters); salutation (26 characters, bold); paragraph one (458 characters, 69 words); paragraph two (369 characters, 58 words); CTA (shared); two photos (1100x782 export, 7:5).

### 4. Recent projects (suburb-labelled videos)

Job: prove the business works in the visitor's suburbs, with raw footage that could not be faked, and let them self-select by place name.

Principle: social proof with local specificity. Suburb names are a stronger relevance signal than any adjective for a local trade. Video also raises time on page.

Mechanics: centred H2 (42 px desktop, max 860) then a Swiper carousel of six slides. Each slide is a Wistia player (`<wistia-player>` custom element, aspect 0.5625, portrait 9:16), with a bold suburb label 15 px (mobile) or 26 px (desktop) centred 15 to 30 px beneath. Mobile: 2 slides per view, 14 px gap, 188 px wide tiles about 334 px tall, five pagination dots (8 px, black at 20% opacity, active blue #007aff which is Swiper's default theme colour, not the brand), no arrows, touch swipe moves one slide. Desktop: 4 per view, three dots. Videos load from Wistia with a sage play button overlay (`Click for sound` means silent autoplay is configured) and the sixth media ID returns "Video not found", so the live page shows an error tile for "Basin". CTA and badge beneath the dots.

Video detail (what could be verified): six embeds, host Wistia (fast.wistia.com player.js plus one embed script per media ID), format portrait 9:16, poster frames served at 640x1138, autoplay muted when in view, no captions track found on five of them (one exposes a single text track), lengths could not be read because the Wistia player never exposed a loaded `<video>` element in the headless session. Audio cannot be heard in this environment, so nothing is claimed about voiceover or music. Sampled poster frames (`docs/reference/video-frames-strip.jpg`): a finished modern home at dusk with lit floating steps; an overhead site shot of formwork and fresh pours beside a dark timber house; a drone view of a dark two-storey build with a new pale driveway; a pink concrete truck and crew on a residential street; a close shot of a mini-excavator bucket over formwork; and one missing media tile.

Slots: headline (38 characters); six items each with a suburb label (5 to 10 characters), a video (or poster image) and the video host ID; CTA (shared).

### 5 and 7. Photo grid strips (and the third grid inside section 13)

Job: keep the proof density high between arguments with four finished-job photos, and visually break the long text sections.

Principle: repetition of evidence. Each strip is a palate cleanser that keeps saying "we have done this many times".

Mechanics: four square images, full bleed (no container). Mobile 2x2 (191 px tiles, 8 px gap). Desktop one row of four (349 px, 15 px gap). Object-fit cover. Fade-in reveal on scroll. No padding; the second strip has a 20 px top margin and the third (inside the guarantee section) has about 60 px above it on the texture. The second and third strips reuse the same four images.

Slots: four images per strip (700x700 export, square).

### 6. Comparison

Job: inoculate against the cheaper quote the visitor will also get, by turning the business's method into four checkable points and the typical competitor's into four failures.

Principle: contrast and mechanism naming. The left column states the named method (compaction, mix, integration, follow-up) and the right column states the matching failure mode. Placed after proof so the visitor reads it as explanation, not defensiveness.

Mechanics: section on the plaster texture, 52/44 padding mobile and 100/72 desktop. Centred H2 (two to three lines). Then a two column block: desktop 960 px wide centred (two 480 columns, 32/68/65/68 padding each); mobile the two columns stay side by side at 175 px each (padding 30/10/28/10), which is the one place the reference lets lines get very short. Left column background sage #839478 with the white logo (104x46 mobile, 131x58 desktop) as its title, white text, 28 px white tick icons; right column white with a 22 px (mobile) or 25 px (desktop) Title Case title, dark text, 28 px red X-in-circle icons. Rows: icon column 28 px plus text column with 8 px gap (12 desktop); each row is bold lead-in plus plain continuation, 16/24. Row gap 20 px mobile, 60 px desktop. CTA and badge centred beneath.

Slots: headline (75 characters); left title (logo image); four left rows (81 to 108 characters each, lead-ins 20 to 26 characters); right title (21 characters); four right rows (49 to 87 characters, lead-ins 15 to 23 characters); CTA (shared).

### 8. Testimonials

Job: let three customers say the things the business cannot say about itself (honesty, communication, finish quality), with a name, a suburb and a job photo so each reads as a real person.

Principle: social proof with similarity. Suburb plus first names plus a photo of their actual job; the headline quote does the work of a subhead so a skimmer gets the point without reading the body.

Mechanics: white section, 50 padding mobile, 110/120 desktop. A stacked badge first (Google G, five 18 px stars, a 68x20 avatar strip of four faces, then the rating line at 14 px), then the H2 (centred, max 730). Three rows. Desktop: grid of photo (395 wide) and card (725 wide), 20 px gap, 422 px tall, alternating sides (photo left, right, left). Mobile: each row stacks card then photo (350x263), 16 px gap, rows 60 px apart. Card: background #f5f4f0, padding 20 px (mobile) or 42 px (desktop), a 30 px sage opening quote mark, H3 quote headline (18/26 px), quote body (14/17 px), a 1 px divider, then name and suburb (16 px/600) with a 115x23 five-star image on the right (desktop) or beneath (mobile). Fade-up reveal on scroll. CTA and badge beneath.

Slots: headline (61 characters); three items each with quote headline (44 to 84 characters), quote body (177 to 228 characters, 29 to 41 words), name (6 to 12 characters), suburb and state (11 to 16 characters), star rating (5), photo (790x844 export); review badge data; CTA (shared).

### 9. Benefits

Job: restate the method as five named benefits with one concrete fact each, so the visitor can repeat the business's differences to a partner.

Principle: specificity and mechanism naming. Each title is a proper-noun style label for a process step; each body carries one number or one named material.

Mechanics: plaster texture section, 52/44 mobile and 100/72 desktop. Centred H2 max 702. Desktop: 3 column grid (369 each, 16 px gap), two rows: three cards, then card, photo, card, so the photo sits in the centre of the block. Cards: white, 32 px padding, 300 px tall, icon (40 px sage line icon) and H3 (20 px) in a row, then copy at 17/20.4. Photo 369x300 cover. Mobile: single column, cards 350 wide with 32 px padding, icon 32 px, H3 14 px, copy 14/16.8, photo (350x257) placed after the fourth card. CTA and badge beneath.

Slots: headline (90 characters); five items each with an icon, title (28 to 32 characters), body (134 to 178 characters, 19 to 29 words); one photo (740x600 export).

### 10. Future pacing with compare slider

Job: move the visitor from problem to desired future state in their own daily moment (driving up to the house), and let them "do" the transformation with their thumb.

Principle: future pacing and interactive demonstration. The drag slider turns the before and after into an action the visitor controls, which is more memorable than a static pair.

Mechanics: white section, 52/44 mobile and 100/72 desktop. Desktop two columns (530 + 530, 40 px gap, centred vertically): slider on the left, H2 (42 px, left) plus three paragraphs, CTA (418 wide) and badge on the right. Mobile: content 310 px wide (extra 20 px inset), H2 first, slider (310x310) second, then paragraphs, CTA (310 wide) and badge. Slider: two stacked images (before below, after above with `clip-path: polygon(var(--split) 0, 100% 0, 100% 100%, var(--split) 100%)`), a 4 px white vertical line at the split, a handle (40 px mobile, 64 px desktop) drawn as an SVG white circle at 80% opacity with a 3 px white stroke and two black chevrons, `cursor: grab`, `touch-action: none` only on the handle. Dragging the handle or swiping across the image moves the split; vertical swipes still scroll the page (measured). No keyboard support on the reference (the template adds arrow keys). Images 580x580 source, 1160 export.

Slots: headline (41 characters); three paragraphs (178, 227 and 114 characters); before and after images (1160x1160 export); CTA (shared).

### 11. Bento gallery

Job: a second, denser proof block of finished work in a magazine layout, after the emotional peak of future pacing, so the aspiration is backed by real results.

Principle: repetition of evidence with variety of framing. Wide and square tiles mix establishing shots with detail.

Mechanics: white section, 0 top and 50 bottom padding (120 desktop). Stacked badge with avatars, then H2 (31 characters). Desktop: 3 column grid (366 px, 20 px gap), rows of 366 px: wide (2 columns) + square, three squares, square + wide (2 columns): seven images. Mobile: 2 column grid (170.5 px, 9 px gap): wide (full width, 170 tall), two squares, wide, two squares: six images (the fourth image is hidden on mobile with `display: none`).

Slots: headline (31 characters); seven images (two wide at 1506x732, five square at 734x732); review badge data.

### 12. Three steps

Job: remove the "what happens if I fill this in" fear by showing the process is three small, low-commitment steps, the first of which is free.

Principle: simplicity and commitment laddering. Numbered steps with photos make the path feel short and already decided.

Mechanics: off-white #f5f4f0 section, 50 padding mobile, 120/30 desktop. Centred H2 max 520. Desktop: each step is a 3 column grid (468 photo, 80 number circle, 468 text; 50 px gaps; 268 px rows; 80 px between rows), alternating photo side; a 2 px dashed vertical line joins the circles. Photos 468x268 with `shadow-lg`. Number circle 80 px sage with white 32 px/700 numerals. Text column: H3 26 px, then paragraph 17/23.8 with 5 px gap. Mobile: left rail (36 px circle, 14 px numerals, dashed 2 px line) and content indented 60 px: photo 290x158, H3 20 px, paragraph 16/22.4; 30 px between steps. CTA and badge beneath.

Slots: headline (46 characters); three steps each with a number, title (30 to 42 characters), body (190 to 229 characters, 31 to 38 words), photo (936x536 export).

### 13. Guarantee

Job: reverse the risk in plain words, with a named guarantee and a stated term (years), so the last objection ("what if it cracks") is answered before the form.

Principle: risk reversal and naming. Giving the guarantee a name and a badge makes it feel like a product feature rather than fine print.

Mechanics: plaster texture section, 52 top padding mobile (100 desktop), 0 bottom because the photo grid closes the section. Narrow centred column (max 512) with 32 px gaps: an inline SVG shield badge 220x265 (sage outline, three stars, the guarantee name in two lines), H2 (two lines), H3 24/32 (two to three lines), two paragraphs 16/22.4 left aligned. Then the four-tile photo grid full bleed, about 60 px below the text.

Slots: guarantee name as shown on the badge (two short lines, 18 and 13 characters); headline (31 characters); sub-headline (81 characters); paragraph one (193 characters); paragraph two (228 characters); four grid images.

### 14. Offer and form

Job: convert. Restate the offer at full value, list what the visitor gets on the visit, and take the lead with the fewest fields that still qualify the job.

Principle: offer stacking plus urgency (a scarcity eyebrow), reason-why bullets, and a reinforcement line under the button that repeats the bonus at the moment of commitment.

Mechanics: white section, `id="offer-section"` (the anchor every CTA targets), 50 padding mobile, 120/80 desktop. Centred column: urgency eyebrow (14/18 px, 800, 0.2 em, sage, uppercase; the month is a separate span, which shows it was meant to be edited by hand), H2 max 780 (four lines on desktop, seven on mobile), bundle image (764x382 desktop, 350x175 mobile, fade-up reveal), four bullets in a 526 px column (32 px sage check circle, 15 px gap, bold lead-in then plain text, 16/24; fourth bullet is bold only), then the form in the same 526 px column. Form: five fields stacked with 12 px gaps, each 64 px tall, white, 1 px light border, 10 px radius, 16 px text, 60 px left padding for a 20 px sage line icon (person, envelope, flag dropdown for phone, map pin, dollar), placeholders carry the asterisk ("Name*"), labels are visually hidden 1 px elements. Phone uses intl-tel-input with geolocation (the headless session showed a US flag, then a German flag, so an Australian visitor may see a wrong default). Email is `type="text"`, so bad emails pass. Postcode label says "Postcode" but placeholder says "Suburb". Textarea 88 px tall. Submit button full width, same styling as the CTA. Reinforcement line 12 px centred, 6 px below. Honeypot: a text input named "planet", absolutely positioned at the page edge. Form posts to `/thank-you/` with a hidden `form-name` (Netlify-style). Validation: native `required` plus an external validator script; the only inline message observed was "Phone number is too short" in red under the phone field with a red border.

Slots: urgency line (47 characters, optional); headline (145 characters, 27 words); bundle image (1528x764 export); four bullets (190, 194, 181 and 29 characters; lead-ins 74, 100, 77 and 29); field placeholders (Name, Email, Phone, Postcode or Suburb, 81 character job question); submit label (34 characters, same as CTA); reinforcement line (110 characters).

### 15. Footer

Job: close the page without offering an exit: logo, copyright, and the legal text behind a modal rather than a link away.

Principle: completeness and compliance. The modal keeps the visitor on the page.

Mechanics: white, 1 px top rule #ddd8d8 on the inner container, 50/50 padding mobile, 80/30 desktop. Centred column: logo 120x40, copyright line 16 px (17 desktop) with the year in a span (the live page renders a template bracket bug), "Terms & Conditions" as a `<button>` that opens a `<dialog>`, and an agency credit line with an outbound link. Dialog: `showModal()`, white, no radius, max-width 672, max-height calc(100% - 38px), 32 px inner padding, 24 px close icon top right, scrolls internally, backdrop rgba(0,0,0,.1) with 8 px blur, Escape closes, body scroll locked. Prose: H2 30/600, H3 24/600, paragraphs 16/22.4 with 21 px gaps, bullets for payment terms. A second dialog for the privacy policy exists but has an empty paragraph and no visible trigger.

Slots: logo; copyright text (41 characters plus year); terms button label (18 characters); terms body (about 1,500 characters: a heading and four numbered sub-headings with short paragraphs); privacy body (empty on the reference).

### Thank-you page

Captured by DOM read only (`/thank-you/`, HTTP 200): same header and footer, one section 771 px tall at 390: H1 "Thank You" 36 px/700, H2 35 characters at 30 px/600, and a full-width "RETURN TO HOME" button linking to `/`. No next-steps list, no phone number in the body. Meta pixel fires `init` and `PageView` only; no `Lead` event is present in page scripts (it may be fired by GTM, which cannot be verified).

## Page-level patterns

CTA cadence: the same label appears nine times: hero, letter, projects, comparison, testimonials, benefits, future pacing, steps and the form submit. Every anchor scrolls to `#offer-section`. The guarantee and bento sections have no CTA (they lead straight into the next proof or the form). Under every anchor CTA sits the review badge (Google G, five stars, bold rating, review count). Under the submit sits the reinforcement line instead.

Review badge: ten instances. Eight are the compact single-line form under CTAs; two are the stacked form with the avatar strip above the testimonials and bento headings.

Backgrounds: white for argument sections, plaster texture for the three "mechanism" sections (comparison, benefits, guarantee), off-white for the steps, full-bleed photo strips as separators. Pattern across the page: photo, white, white, white, strip, texture, strip, white, texture, white, white, off-white, texture, strip, white.

No navigation, no footer links beyond the terms modal and one agency credit, no social icons, no outbound links in the body. Phone is reachable in the header only.

Scroll reveals: elements with `.view-animation` get `.animate` from an IntersectionObserver (threshold 0.1, bottom margin -50 px), which plays `fade-up`, `fade-left` or `fade-in` for 0.5 s. No reduced-motion rule exists for these or for the marquee.

Third-party weight on the reference: Meta pixel, GTM plus GA4, CrazyEgg, Sentry, Wistia (six embed scripts), intl-tel-input with an ipapi.co lookup, and an external validation script. The template keeps only the Meta pixel (and only when an ID is configured).

Copy voice (details in `docs/exemplar.md`): second person throughout, Title Case headings, numbers everywhere (hours, years, percentages, dollar values, review counts), the method named with capitalised labels and repeated in the trust strip, comparison, benefits and steps.
