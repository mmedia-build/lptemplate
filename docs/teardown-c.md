# Teardown of the third reference page (agency booking page)

Reference C: `https://miratadigital.com.au/holiday-pipeline/bathrooms-kitchens/start` (a growth agency's Meta-ad booking page selling a seasonal "pipeline" offer to bathroom and kitchen renovators, captured 10 November 2026; built in GoHighLevel's funnel builder with the visible page written as two custom-code blocks around a native GHL form, Cloudflare Turnstile on the form, League Spartan from Google Fonts, the Meta pixel and Cloudflare Insights). Nothing in this file is template copy. Reference wording appears only as short excerpts for internal study. The screenshots in `docs/reference-c/` are the full record of the page.

The earlier references are called A (a concreter, `docs/teardown.md`) and B (a renovator, `docs/teardown-b.md`). C is a different kind of page: the visitor is a business owner, not a homeowner, the conversion is a booked call, and the whole page is five blocks long. Where C does the same thing as A or B the entry is short and points there; the differences are what became new layouts and options.

How the measurements were taken: the build container's network policy blocks the host, so the page was rendered in Chromium through Firecrawl's interactive browser with device emulation set over the DevTools protocol: an iPhone profile with an Instagram in-app user agent at 390x844 (touch, 2x), the same at 390x664, and a desktop profile at 1440x900. Bounding boxes, computed styles, loaded fonts, keyframes, form attributes, resource hosts and the copy inventory were read from the live DOM after a full scroll. Full-page and first-screen captures were taken through Firecrawl's screenshot endpoint (device scale 1) and cropped per section locally. Raw material: `docs/reference-c/sections/` (crops at 390 and 1440 for all five blocks), `docs/reference-c/mobile-390x664-first-screen.png`, `docs/reference-c/mobile-390-full.png`, `docs/reference-c/desktop-1440-full.png`, `docs/reference-c/copy-inventory.json`.

What could not be captured: interaction states as images (the interactive browser returns screenshots only as inline base64, which this session cannot write to disk; the states are described from the DOM instead), a submit on the live form (blocked as a live-site action, so the reference's validation messages are unknown), and the booking calendar the form leads to.

## Page summary

| Measure | 390 wide (phone) | 1440 wide (desktop) |
| --- | --- | --- |
| Page height | 2,376 px (3.6 screens at 664, 2.8 at 844), of which 84 px is body padding under the footer | 3,001 px |
| Content width | 350 px (20 px side padding) in the hero and proof blocks, 358 px (16 px) in the form block | 1,120 px header, 870 px video, 600 px form card, 1,060 px proof block |
| Body font | League Spartan (SIL OFL), Google Fonts, weights 300 to 700 | same |
| Section headings | Times New Roman 400 (the system serif; no web font is loaded for it) | same |
| H1 (hero) | League Spartan 600, 38/41 px, -1.2 px tracking, centred, cream with the second half in lime | 58/62.6 px, -1.7 px, max 950 wide |
| H2 (form, proof) | Times New Roman 400, 28/29.4 px (form) and 29/31.3 px (proof), -0.7 to -1.2 px | 42/47 px and 36/38.9 px |
| CTA button | full width, 350x70, League Spartan 600 20 px, lime `#d7ff3f` on 1 px near-black border, radius 5, an up-right arrow icon | 370x77, 22 px |
| Line under the hero CTA | a lime dot plus "x of y spots available" (15 px) and a deadline line with a hard-coded date (11 px grey) | 16 px and 12 px |
| Fixed or sticky elements while scrolling | none (a fixed cream layer sits behind the page at z-index -1) | none |
| Navigation | none; on desktop a "book" link sits at the right of the header | same |
| Outbound links | none in the page body; Cloudflare Turnstile links inside the form widget | same |
| CTA count | hero CTA, four per-card CTAs in the proof carousel, the form submit; every anchor points to the form section | plus the header link |
| Proof count | four video testimonials with five stars, a name and business, one result line each; no rating total, no review count | same |
| Phone | none anywhere on the page | none |

Section order on the live page (five visible blocks; the GHL page also carries five hidden blocks, see the inventory):

| # | Section | 390 height | screens at 664 | 1440 height | Background | Mobile padding |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Header | 60 | 0.1 | 82 | `#0a0a0a`, 1 px `#303029` rule beneath | 17/17 |
| 1 | Hero with video | 742 | 1.1 | 1,022 | `#0a0a0a` | 26/24 |
| 2 | Booking form | 638 | 1.0 | 907 | cream `#fffcf2`, white form card | 18/18 |
| 3 | Video testimonials carousel | 583 | 0.9 | 754 | cream `#fffcf2` | 24/58 |
| 4 | Footer | 215 | 0.3 | 236 | cream on phones, `#0a0a0a` on desktop | 0/0 |

Desktop padding: hero 34/24, form section 48/48, proof 40/40.

## Mobile first screen (390x664)

Capture: `docs/reference-c/mobile-390x664-first-screen.png`.

What a visitor sees before scrolling: the white wordmark (132x25) at the top left on black, a 1 px rule at 60 px; the lime eyebrow pill (350x60, two lines of 14 px bold uppercase) from 86 to 146; the four-line headline (38 px) from 172 to 336 with a small Santa hat drawn on one letter; the guarantee line (18 px, with a lime hand-drawn underline) from 353 to 383; and the 16:9 video (350x198, autoplaying muted with an "unmute" overlay) from 414 to 612. The CTA starts at 641 and is cut off by the bottom of the screen at 664: only its top 23 px show. The scarcity line is below the fold.

So reference C fails the template's first-screen rule: the CTA and the line beneath it are not on the first screen at 390x664 (they are at 390x844). The template's video hero keeps the same order (eyebrow, headline, guarantee line, video, CTA, line) and tightens it so the whole stack ends inside 664: a one-line 12 px eyebrow pill, a 34 px headline, smaller gaps and a 52 px header. This is logged in `docs/decisions.md`.

Compared with A and B: those pages spend the first screen on copy (a paragraph of 209 or 375 characters). C spends it on a video and replaces the paragraph with a six-word guarantee line, because the video does the explaining.

## What stays fixed on mobile while scrolling

Nothing. The header scrolls away. A `position: fixed` cream layer sits behind everything at z-index -1 (it only colours overscroll). The page relies on the per-card CTAs and the short length.

## Design tokens observed

Fonts: League Spartan for everything except the two section headings, which fall through to Times New Roman because no serif web font is requested. League Spartan is published under the SIL Open Font License, so the template self-hosts it as a variable woff2 with a metric-matched Arial fallback; the serif headings use the system serif stack, which costs nothing to load.

Type scale (measured):

| Role | 390 | 1440 |
| --- | --- | --- |
| Eyebrow pill | 14/18.9, 700, uppercase, 0.5 px tracking, near-black on lime, 1 px near-black border, radius 40, padding 10/14 | 16/21.6 |
| H1 | 38/41, 600, -1.2 px | 58/62.6, -1.7 px |
| Guarantee line | 18/25.2, 700 lead word then 600, cream `#e5e5d8` | 20/28 |
| Video overlay | 20/22 700 "unmute", 12/15.6 caption | 29/31.9 and 17/23 |
| CTA | 20/26, 600 | 22/28.6 |
| Scarcity line | 15/21, 500, `#e7e6dc`; deadline 11/16.5 `#909187` | 16/22.4; 12/18 |
| Form H2 (serif) | 28/29.4, 400, -0.7 px | 42/47, -1 px |
| Form intro | 14/18.2, `#45443e`, bold lead | 18/26.1 |
| Field label | 12/14.4, 500 | 15 |
| Input | 16 px, 42 to 47 px tall, cream fill, 1 px `#d0d5dd`, radius 6 | same, 48 px tall |
| Checkbox label | Roboto 12/15.6 500 with bold phrases; hint 10/12 `#55554b` | Poppins 17/23.8; hint 14/19.6 |
| Proof H2 (serif) | 29/31.3, 400, -1.2 px | 36/38.9 |
| Card name | 18/22.5, 600 | same |
| Card result | 15/20.3, `#515149` | same |
| Card CTA | 15/18.8, 600, 10/14 padding, 41 px tall | 45 px tall |
| Footer | 12/16.8 | 13 to 14 px, `#bcb9af` on black |

Colours: page black `#0a0a0a`; cream `#fffcf2` (text on black and the light surface); lime `#d7ff3f` (eyebrow, CTA surface, headline accent, status dot); a warm card tint `#f3f0e5` with a `#dfdccf` border (active proof card); form card white with `#e3dfd3` border; star gold `#e6a500`; body greys `#45443e`, `#515149`, `#55554b`, `#909187` (on black).

Spacing: 20 px side gutter in the custom blocks, 16 px in the GHL form block; hero stack gaps 26 (eyebrow to headline), 17 (headline to guarantee line), 31 (to video), 29 (to CTA), 22 (to status). Shape: radius 5 on buttons, 6 on inputs, 8 on the video shell and the checkbox panel, 10 on the form card, 12 on proof cards, 40 on the eyebrow pill. Elevation: none; borders do the work. Motion: proof cards transition transform, opacity and filter over 280 ms; the page ships a large library of GHL keyframes and does include a `prefers-reduced-motion` rule.

## Sections

### 0. Header

Job: say whose page this is and, on desktop, offer the booking link without scrolling. Principle: a single exit (the CTA) and nothing else to click. Mechanics: 60 px tall at 390 (17/20 padding), the logo 132x25, a 1 px `#303029` rule under it; the right-hand "book" link is hidden on phones. At 1440 it is 82 px inside a 1,120 px container with the logo at 160x31. Slots: logo (white version, because the header sits on black), the CTA label. Differs from A and B: no phone number at all. The template adds `header.action: 'cta'` (a compact CTA link at the right on desktop, hidden on phones, as here) beside the existing phone action, and the header turns dark with the white logo and a rule when the hero is the video layout.

### 1. Hero with video

Job: qualify the visitor by trade, name the outcome with a dollar figure and a season, guarantee it, then let a video explain the offer. Principle: qualification first (the eyebrow names who it is for and says "only"), a concrete outcome in the visitor's own unit (work to quote), risk reversal immediately under the claim, and a moving face before the ask. Mechanics at 390: black surface, everything centred in a 350 px column. Eyebrow pill 350x60 (wraps to two lines). Headline four lines, the second half in lime on its own line. Guarantee line 30 px tall with a lime underline drawn under its second sentence. Video shell 350x198 (16:9) with a 1 px `#454545` border and radius 8, the clip autoplaying muted, a centred 174x106 "unmute" button (black at 90%, 2 px cream border, a 4 px cream glow) with a speaker icon, a bold label and a two-line caption. CTA 350x70. Status block 350x45: a 7 px lime dot, the scarcity count, the deadline. At 1440: the headline runs two lines at 58 px, the video is 870x490, the CTA 370 wide centred. Slots: eyebrow (40 characters, 6 words), headline in two parts (27 and 29 characters), guarantee line (36), video (a 16:9 clip of about three and a half minutes, 1920x1080, poster frame), unmute label (15) and caption (30), CTA label (26), scarcity and deadline lines (22 and 46, both hard-coded). Differs from A and B: a video in place of the photo and paragraph, a two-tone headline, and a scarcity block with a date. The template adds `imageLayout: 'video'` with `headlineAccent`, a `video` object and `showUrgency`; the scarcity line is the existing hand-written `urgency.line`, empty by default, and no date or count is ever generated.

### 2. Booking form

Job: take the details that qualify the call, with as little reading as possible. Principle: lower the stakes before asking ("this isn't a sales call", a short free chat, no commitment), then qualify with a single confirmation instead of a question. Mechanics at 390: cream surface, 18/16 padding. Serif H2 one line (28 px). Intro paragraph three lines, centred, bold lead sentence. A white card (358x486, 1 px `#e3dfd3`, radius 10) holding visible labels over four 42 to 47 px inputs (full name, phone with a country picker, email with an envelope icon, company name), a qualification panel (cream fill, 1 px near-black border, radius 8) with a 16 px checkbox, a two-line confirmation with two bold phrases and a 10 px hint, and the submit (330x46, lime), which stays disabled at 50% opacity until the box is ticked. Turnstile runs on the form. At 1440 the card is 600 wide. Slots: headline (31), intro lead (24) and the rest of the intro (145), four labels, the confirmation (109), the hint (44), the submit label (26). Differs from A and B: no offer bullets or bundle image, visible field labels, a company field and a required checkbox, and the next step is a calendar. The template adds `layout: 'booking'` to the offer form section (headline, `lead`, `intro`, the form in a card), a `checkbox` field type with bold phrases marked `**like this**` and an optional `hint`, `form.labels: 'visible'`, and `thankYou.bookingUrl` so the thank-you page hands the visitor to the calendar.

### 3. Video testimonials carousel

Job: show other renovators (and neighbouring trades) talking about results. Principle: similarity proof (people like the visitor, named with their business) plus a specific result line; a CTA on every card so the decision can happen at the moment of belief. Mechanics at 390: serif H2 (29 px) centred; a coverflow track 350 wide where the active card is 280 wide and the cards either side are scaled to 0.89, blurred 2 px and at 48% opacity, peeking about 15 px; each card is a 16:9 video (280x158, radius 6, native controls, no autoplay, `preload="none"`, a poster frame with the result in large type), then a body (14/16 padding) with five gold stars, the name and business (18 px), the result line (15 px) and a small lime CTA. Two 44 px circular arrow buttons sit centred beneath. At 1440 the active card is 540 wide on a `#f3f0e5` tint with a `#dfdccf` border. Slots: headline (25), four items each with a name and business (19 to 24), a result line (33 to 59), a rating, a poster and a clip. Differs from A and B: video, not photos; a result line, not a quote; a CTA per card. The template adds `layout: 'videos'` to the testimonials section: a centred scroll-snap row with peeking neighbours (dimmed, not blurred, so they stay legible), 16:9 video tiles that load nothing until tapped, a small CTA per card, and arrows only.

### 4. Footer

Job: the legal minimum. Mechanics: on phones a cream block with the wordmark, the copyright and the platform disclaimer, centred at 12 px; on desktop the same text on black at 13 to 14 px in `#bcb9af`. Slots: copyright (35), platform disclaimer (173). Differs from A and B: a platform disclaimer and no terms or privacy links. The template keeps its footer (terms and privacy buttons, which C lacks and an agency page still needs) and adds an optional `footer.disclaimer`.

## Page-level patterns

Persuasion sequence as one chain: qualify (trade and "only") then outcome with a number and a season then guarantee then video explanation then book then form (lower the stakes, qualify by confirmation) then similar businesses on video with a CTA on each card.

Compared with A and B: A and B argue for a long time (16 and 20 blocks) because a homeowner needs to be talked out of fear before a stranger comes to the house. C is five blocks because the buyer is a business owner who already knows the problem (an empty quote book), the video carries the argument, and the ask is small (a 15-minute call, qualified). The form comes second, not last: everything after it is proof for the visitor who scrolled past it.

CTA cadence: one in the hero, one per proof card, the submit. Every anchor scrolls to the form. Proof pattern: no aggregate rating or count; each card carries five stars and a named result. Background rhythm: black, then cream for the rest. Shared components: the CTA style repeats at two sizes. Scripts: GHL's Nuxt runtime, Turnstile, the Meta pixel, Cloudflare Insights, Google Fonts; five MP4 files from the GHL media CDN, the hero one autoplaying (`preload="auto"`, about 215 seconds at 1920x1080). Copy voice: second person, short declaratives, the offer named as a product ("the Holiday Pipeline") and repeated in every label.

## Accessibility and performance notes on the reference

- The CTA is below the first screen at 390x664 (above). The template fixes the fit.
- The submit is disabled until the checkbox is ticked, at 50% opacity with white text on lime (about 1.1:1). The template keeps the button enabled and validates the checkbox with an inline message, so the reason for a failed submit is announced.
- The checkbox is 16 px with only its own box clickable in the GHL widget. The template's checkbox is 24 px inside a label that is the whole panel (over 44 px tall).
- The checkbox hint is 10 px. The template sets it at 12 px.
- Field labels are 12 px. The template keeps visible labels at 14 px.
- Star gold `#e6a500` on the cream card is 1.9:1, under the 3:1 needed for a meaningful graphic. The template's star colour for this preset is `#a56f00` (3.8:1 on the card tint, 4.2:1 on cream).
- Proof cards either side are blurred and at 48% opacity, which makes their text unreadable while still in the reading order. The template dims them to 55% without blur and marks them as not current.
- The hero video autoplays a 1920x1080 MP4 with `preload="auto"` on a phone in an in-app browser. The template's video tiles load nothing until tapped and show the poster frame.
- Headings: the form block uses an H1 as well as the hero, so the page has two H1s. The template uses one H1 (hero) and H2s.
- Two language-level slips the template does not reproduce: a hard-coded month and day in the deadline line, and a scarcity count that is not tied to anything.
