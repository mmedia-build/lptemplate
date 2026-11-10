# Teardown of the third reference page (agency VSL)

Reference C: `https://landing.bcdigital.com.au/vsl-page`, captured 10 November 2026. A marketing agency's ad landing page that sells its lead-generation service to builders and tradies: a video sales letter, a three-step qualifying quiz and fifteen video case studies. It is a GoHighLevel funnel whose whole design sits in one hand-written custom-code block (Poppins from Google Fonts, inline CSS and a small script), with the quiz in a LeadConnector survey iframe. Nothing in this file is template copy. Reference wording appears only as short excerpts for internal study.

References A (a concreter, `docs/teardown.md`) and B (a renovator, `docs/teardown-b.md`) sell a trade job to a homeowner. C sells a service to a business owner, and it is the first reference where the page's main argument is a video rather than text. Where C does what A or B does the entry is short and points there; the differences are what became new section types and options.

How the measurements were taken: the build container's network policy blocks the host, so the page was rendered in Chromium through Firecrawl's interactive browser with an iPhone profile (390x844, touch, 2x, Instagram in-app user agent), an in-app profile at 390x664 and a desktop profile at 1440x900. Bounding boxes, computed styles, fonts, keyframes, the reduced-motion rule, form attributes, third-party hosts and the copy lengths were read from the live DOM, including inside the survey iframe. Full-page captures came from Firecrawl's screenshot service at the same viewports and were downloaded into the repository. Raw material: `docs/reference-c/measurements.json` (every number below), `docs/reference-c/copy-inventory.json` (lengths, word counts and five-word excerpts), `docs/reference-c/sections/` (crops at 390 and 1440), `docs/reference-c/mobile-390x664-*` (first screen and scroll positions). The quiz was stepped through to read its second question; it was not submitted, so its validation messages are not recorded.

## Page summary

| Measure | 390 wide (phone) | 1440 wide (desktop) |
| --- | --- | --- |
| Page height | 12,487 px at 844 tall (10,738 at 664, because the hero is one screen tall); 16 screens at 664 | 13,942 px |
| Content width | 350 px (20 px side padding) | 720 px column (760 with padding, centred); results cards 395 wide |
| Body font | Poppins Regular 16/25.6, #1a1a1a | 17/27.2 |
| H1 | 40.95/44.2 ExtraBold, -0.025em, white, centred | 64/69.1 |
| H2 | 24/28.8 ExtraBold (results); step headings 17/22.1 Bold | 32/38.4; 20/26 |
| CTA button | full width 350x63, 17 px Bold sentence case, #1a1a1a on #ff6b00, radius 12, solid 6 px darker shadow beneath | 520x70, 19 px |
| Line under the CTA | none | none |
| Fixed or sticky elements while scrolling | none visible | none |
| Navigation | none; no header bar (the logo sits inside the hero) | none |
| Outbound links | the review pill, whose href is the literal text `GOOGLE_REVIEWS_URL` (broken) | same |
| CTA count | 2: a scroll link to the video and one button to the quiz | same |
| Proof | one review pill (rating and count) under the quiz; fifteen video case studies | same |
| Phone | none anywhere | none |
| Footer | none; the page ends on the P.S. | none |

Section order (five blocks):

| # | Section | 390 height | screens at 664 | 1440 height | Background | Padding 390 / 1440 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Video hero (logo, callout, headline, scroll link) | 844 (100svh; 664 at 664) | 1.0 | 900 | black, autoplay video, dark gradient | callout 18/14, inner 24/72 |
| 1 | VSL and qualify (step 1 video, step 2 quiz, review pill) | 1,011 | 1.5 | 1,142 | white | 24/44 and 64/56 |
| 2 | Results (fifteen 9:16 video case studies) | 9,912 | 14.9 | 11,265 | #141414 | 48/48 and 64/64 |
| 3 | CTA band | 175 | 0.3 | 182 | white | 56/56 |
| 4 | P.S. from the founder | 545 | 0.8 | 453 | white | 0/64 and 8/80 |

## Mobile first screen (390x664)

Capture: `docs/reference-c/mobile-390x664-first-screen.png`.

The hero is exactly one screen tall (`100svh`), so at 664 it ends at 664. What shows: the logo (121x34, centred, top 18); the two-line callout (top 64) addressing the trades by name with the trade list in orange; the four-line headline (top 219 to 396) with two words underlined in orange; and the scroll link ("learn how" plus a circled down arrow that bobs 6 px), top 426 to 518. There is no paragraph, no button and no proof on the first screen. The video heading starts at 688, 24 px below the fold.

Compared with A and B: A and B put eyebrow, headline, paragraph, CTA and proof on the first screen and ask for the conversion at once. C asks for one thing only, a scroll to the video, and spends the first screen on a moving background and a big promise. The template keeps C's fit rule as stated: logo, callout, headline and the scroll link inside 664, with the hero one viewport tall.

## What stays fixed on mobile while scrolling

Nothing visible. GoHighLevel puts a fixed white layer behind the page (the page background), which never shows. There is no header, no sticky CTA and no phone button.

## Design tokens observed

Fonts: Poppins at 400, 600, 700 and 800 from Google Fonts (SIL Open Font License). The template self-hosts the four latin weights and adds a metric-matched fallback, as it does for Manrope and Plus Jakarta Sans.

Type scale (measured; hero sizes scale with the viewport width up to a cap):

| Role | 390 | 1440 |
| --- | --- | --- |
| Callout over the hero | 15.2/21.3 SemiBold white, trades part Bold #ff8a33 | 17/23.8 |
| H1 | 40.95/44.2 ExtraBold, -0.025em | 64/69.1 |
| Scroll link label | 16/25.6 SemiBold | 17/27.2 |
| Step heading | 17/22.1 Bold #1a1a1a | 20/26 |
| Play hint on the VSL | 13/20.8 SemiBold white | 13/20.8 |
| Review pill | 14/22.4, rating Bold, #3a3a3a | 15/24 |
| Results H2 | 24/28.8 ExtraBold, white, max 680 | 32/38.4 |
| Card tab name / trade | 13/17.6 Bold #1a1a1a / 11.7/15.8 #555 | 15/20.3 / 13.5 |
| Card figure | 42/42 ExtraBold, -0.02em | 78/78 |
| Card timeframe | 17/19.6 ExtraBold uppercase | 28/32.2 |
| Card detail | 14/19.6 SemiBold, max 420 | 17/23.8 |
| Card quote (no figure) | 25 ExtraBold | 40/44.8, max 520 |
| CTA | 17/27.2 Bold | 19/30.4 |
| P.S. body | 16/27.2 #2a2a2a, bold parts #1a1a1a | 17/28.9, column 640 |
| P.S. tag | 20/34 ExtraBold | same |
| Sign-off name / role | 19/26.6 Bold / 15/21 #5a5a5a | same |

Colours: orange `#ff6b00` (buttons, play buttons, underline), lighter orange `#ff8a33` for the callout's trades, ink `#1a1a1a` (headings, button text), `#2a2a2a` body in the P.S., `#141414` results background, `#1a1a1a` video boxes, white tabs on the cards, `#e6e6e6` pill border and rule, star gold. The button carries dark text on orange (6.6:1), not white (2.9:1 would fail).

Spacing: 20 px side padding; step heading margins 24/10 and 34/4; 24 px between result cards (32 on desktop); results section 48 px top and bottom (64 desktop); CTA band 56 px; P.S. 28 px under a 1 px rule (36 desktop), 16 px between paragraphs.

Shape and elevation: radius 10 on the VSL box, 12 on cards and the button, 999 on the pill; the button's only depth is a 6 px solid darker orange shadow, pressed on tap (0.08 s transform and shadow transition); play buttons carry a 25% orange ring (10 px on the VSL, 8 px on cards).

Animation: one keyframe, a 6 px bob on the scroll arrow. A `prefers-reduced-motion` rule turns off every transition and animation inside the page, and the script pauses the background video for reduced motion and skips it on save-data or 2G connections.

## Sections

### 0. Video hero

Job: stop the scroll with motion and one large promise, name who the page is for, and send the visitor to the video. Nothing is asked of them yet.

Principle: pattern interrupt and identity call-out. The moving background reads as "real footage of real work", the callout names the trades so the right owner self-selects, and the headline is a status outcome (being the one everyone in the area has heard of) rather than a feature. The only action is a low-commitment scroll.

Mechanics: section `100svh` tall, black, with an autoplaying 3840x2160 MP4 (27 s loop, muted, no poster set, so the first screen is black until it plays), covered by a four-stop vertical gradient from 70% black at the top through 45% and 50% to 75% at the foot. A callout block at the top (padding 18/16/14): logo 121x34 centred, 12 px gap, the two-line callout. Below, a flex column centred vertically in the remaining height (padding 24/20/72): the H1 (max 820) and, 30 px below, the scroll link: a column of the label and a 40 px outlined circle with a down arrow, bobbing. Desktop is the same layout at 1440x900 with the H1 on two lines (720 wide).

Slots: logo (white version); callout (56 characters, 7 words, with a 46 character highlighted part); headline (44 characters, 9 words, with a 10 character underlined part); scroll label (18 characters); background video and its poster (none set on the reference).

What the template takes: a new `videoHero` section type: logo inside the hero, a callout with a highlighted part, a headline with an underlined part, a scroll link instead of a CTA, a poster image (always, so the first screen is never black and the poster is the LCP) and an optional background video that loads only after the page has loaded, never for reduced motion or save-data. A new `header.mode: 'none'` drops the header bar when the hero carries the logo.

### 1. VSL and qualify

Job: deliver the pitch as a video, then filter who may book. Step headings turn the page into a two-step task.

Principle: commitment and consistency plus reverse selling. "Step 1, step 2" framing makes watching feel like progress; the quiz's first question asks whether they watched, the second sets a revenue floor and asks if they will go on camera, and both offer a "no" that tells the visitor to leave. Exclusion raises the value of being accepted.

Mechanics: step 1 heading (17 px Bold, 24 px above, 10 below) with a pointing emoji; a 16:9 box (350x197, radius 10, #1a1a1a) that shows a frame from the video at 2 s once loaded, a 68 px orange play button with a 10 px 25% ring in the centre and "click to watch, sound on" in 13 px white near the foot; tap swaps in a native player with controls (the VSL runs 3:12; no captions). Step 2 heading 34 px below. The quiz is a LeadConnector survey iframe (350x569; 720x453 desktop) with Inter type: "Question 1 of 3", a question label, two 15 px radio buttons, a text-less 70x50 arrow button to go on and "1 of 3" in pale blue. Question 1 (107 characters) asks if they watched; question 2 (156 characters) sets the qualifying bar; question 3 is the contact step: company name, website (optional), full name, phone, email. Five UTM fields ride along hidden. Under the iframe, 20 px down, a pill with five stars, the rating in bold and the review count (312x42).

Slots: step 1 heading (53 characters incl. emoji); play hint (25); step 2 heading (38); quiz question 1 (107) and its two options (16, 28); question 2 (156) and options (13, 17); five contact fields; review rating and count; the VSL file and a poster.

What the template takes: a new `vslForm` section type with the two step headings, a 16:9 VSL tile (poster plus any of YouTube, Vimeo, Wistia or MP4, loaded on tap) and the template's own form, rendered as steps. The form gains a `radio` field type, a `step` number per field and per-option stop messages, so a gate question can turn a visitor away on the page; the steps share one grid cell so the form never changes height between steps. Radio choices are 52 px tall cards (the reference's are 15 px). The review pill is a new `pill` variant of the review badge and is hidden with no proof.

### 2. Results

Job: prove the service works for businesses like theirs, at volume. Fifteen case studies, each a client on camera.

Principle: social proof by similarity and specificity. Each card leads with the client's business name and trade (so a deck builder finds a deck builder), then a dollar figure and a timeframe. When there is no figure, a short outcome quote takes the slot. The sheer length (fifteen screens on a phone) is part of the argument.

Mechanics: section #141414, H2 (98 characters, 18 words, white, max 680) 32 px above a single column of cards with 24 px gaps (32 desktop). Each card is 9:16 (350x622; 395x702 on desktop, sized as 78% of the viewport height times the clip's ratio), radius 12, overflow hidden: a white tab at the top (name Bold 13 px, trade 11.7 px #555, about 49 px tall), then the poster frame with a 45% to 70% black gradient and, centred, either figure (42 px) over timeframe (17 px uppercase) over a one-line detail (14 px SemiBold), or a quote (25 px ExtraBold), then a 50 px orange play button with an 8 px ring. The whole card is one button; tapping it hides the overlay and plays the clip with controls. Clips lazy-load a frame at 1 s when near the screen. Ten cards carry figures, five carry quotes.

Slots per card: client name (6 to 30 characters, mean 16), trade (7 to 28, mean 14), figure (4 to 5), timeframe (10 to 12), detail (37 to 57, mean 48) or quote (31 to 42, mean 34), poster, clip. Section: H2.

What the template takes: a new `videoResults` section type with exactly those slots, a `column` layout (the reference) and a `grid` layout (three across on desktop) so fifteen cards need not be 11,000 px tall on a laptop.

### 3. CTA band

Job: one button after the proof, for the visitor convinced by the case studies, that scrolls back up to the quiz.

Principle: a single, repeated call to the one action, placed where intent peaks.

Mechanics: white, 56 px padding, one 350x63 button (520x70 desktop) with "check if you qualify" in sentence case; no line beneath it.

Slots: the CTA label (20 characters).

What the template takes: a new `ctaBand` section type (button and the configured line beneath, nothing else) and brand tokens for the button's shape (radius, case, weight and the solid shadow), so a client can switch between A's square uppercase button and C's rounded one without touching CSS.

### 4. P.S. from the founder

Job: close in a human voice: name the visitor's real problem, restate the proof and give the reason for the limit.

Principle: the sales-letter P.S. (the most-read part of a letter after the headline), reframing ("the problem is not your work, it is that nobody has heard of you"), authority from the founder's name and genuine scarcity (a limited number of clients per area).

Mechanics: a 640 px column (350 on phones) under a 1 px rule, 28 px down; four paragraphs, the first opening with a bold "P.S." tag; one bold phrase per paragraph from the second on; sign-off with the founder's first name (19 px Bold) and "Founder, agency" (15 px grey). No photo or signature image.

Slots: paragraph one (70 characters after the tag), two (136, with an 87 character bold part), three (118, bold 31), four (100, bold 56); name (5); role (19).

What the template takes: a new `postscript` section type with a tag, paragraphs that accept bold phrases (`**like this**`), a name and a role.

## Page-level patterns

Persuasion sequence: interrupt and call out the trades (hero) → promise a status outcome → pitch on video (VSL) → filter with a quiz (commitment, exclusion) → prove at volume with similar businesses on camera (results) → one more ask → founder's P.S. with the reframe and the scarcity reason.

Against A and B: A and B argue in text across nineteen or twenty sections and ask for the lead eight or more times. C argues almost entirely in video (one VSL plus fifteen clips) in five sections and asks twice. The qualifying burden moves from the visitor's form fields (B's budget select) to explicit gate questions.

CTA cadence: two asks (a scroll to the video, a button to the quiz) and the quiz itself. The template keeps that: the hero's scroll link targets the VSL, every CTA targets the form step heading.

Proof pattern: one rating pill under the form; everything else is case-study video with a named business, a trade and a number.

Background rhythm: black hero, white VSL and quiz, near-black results, white CTA band and P.S. The planner produces this order with no pinned tones (results prefers the dark tone).

Shared components: the result cards and the VSL share a play button style; the template uses the existing video embed script for both.

Scripts and third-party weight: GoHighLevel's runtime, Cloudflare insights, the Meta pixel, Google Fonts, the LeadConnector survey iframe (with Cloudflare Turnstile inside) and the CDN serving a 4K background video on page load. The background video alone is the heaviest request on the page, on a phone, on the first screen.

Copy voice: second person to a business owner, plain and short, trade words ("tradie", "booked out"), dollar figures with timeframes, first-person founder voice in the P.S., emoji only as pointers in the step headings. You-to-we is roughly even; the P.S. is first person singular.

## Accessibility and performance notes on the reference

| Issue on the reference | What the template does |
| --- | --- |
| 4K background video autoplays on the first screen of a phone with no poster (black until it plays) | poster image is the LCP and preloaded; the video loads after the page has loaded, at most 1080p advised, never for reduced motion or save-data |
| Quiz radios are 15x15 px and the next button is a 70x50 icon with no text | radio choices are full-width 52 px labelled cards; Next and Back are text buttons at 44 px or more |
| The quiz is a third-party iframe in another font with its own pale-blue progress text (`#b2ccff` on white, 1.6:1) | native form in the page's font; progress text in body colour |
| Phone field has `autocomplete="off"` | `tel` with `autocomplete="tel"` and `inputmode="tel"` |
| Review pill links to a placeholder URL | the pill is not a link (no outbound links), and it hides when proof is empty |
| No captions on the VSL or the fifteen clips | recorded in the exemplar as a requirement for client clips (burned-in captions) |
| No footer, terms or privacy | the template's footer with both legal texts in native dialogs |
| No thank-you route was observed (the survey's own success state) | the template's thank-you route, where the Lead event fires once |
| Result cards change shape when each clip's metadata loads | fixed 9:16 cards; the exemplar asks for 9:16 exports |
| Callout orange `#ff8a33` on the shaded video | kept: it sits on the 70% black top of the gradient (over 7:1); the template's shade is a CSS gradient, not part of the video |
