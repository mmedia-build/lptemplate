# Teardown of the third reference page (agency strategy-session quiz funnel)

Reference C: `https://kingkong.co/30-minute-strategy-session/` (a marketing agency's Meta-ad landing page for a free 30-minute strategy call, captured 11 November 2026; WordPress theme, a Keap/Infusionsoft form driven by a custom multi-step script, Lottie arrow, intl-tel-input, reCAPTCHA Enterprise, GTM, GA, Google Ads, Meta pixel with a server-side event relay, AdRoll, LinkedIn, Lucky Orange, Convert split testing, Wicked Reports, WiserNotify). Nothing in this file is template copy. Reference wording appears only as short excerpts for internal study, marked "excerpt".

References A (concreter, `docs/teardown.md`) and B (renovator, `docs/teardown-b.md`) are long scrolling pages that end in a form. Reference C is a different shape: one screen. The whole page is a hero that turns into a quiz. There is no scroll, no section below the fold, no footer. Every entry below says in one line how it differs from A and B and what the template takes from it.

How the measurements were taken: the page was rendered in Chromium through Firecrawl's interactive browser (the build container's network policy blocks the host) with an iPhone profile at 390x844 (touch, 2x, an Instagram in-app user agent), an in-app profile at 390x664, and a desktop profile at 1440x900. Bounding boxes, computed styles, pseudo-elements, form attributes, the stylesheet rules that matched the funnel, the funnel script and the copy inventory were read from the live DOM. Every outbound write was stubbed in the browser (form posts, the partial-lead post, tracking beacons and the email check) so no test data reached the business. The final form was only ever submitted empty, to see validation. The post-submit loader was captured through the page's own preview flag. Raw material: `docs/reference-c/` (screenshots per step at both widths, interaction states, `copy-inventory.json`, `measurements.json`).

## Page summary

| Measure | 390 wide (phone) | 1440 wide (desktop) |
| --- | --- | --- |
| Page height | 1,575 px document, but the content of the tallest step that matters ends by 775; the intro ends at 530 (0.8 of a 664 screen) | 927 px; one screen for every step except the offer cards (915) |
| Content width | 360 px (15 px side padding) | 1,140 container; text and controls sit in a centred column of 520 to 798 px depending on the step |
| Page background | #f9f9f9, flat | same |
| Body font | Inter Regular 18/27 px, #495057 | Inter Regular 22/33 px |
| Display font | Futura LT Condensed Extra Bold (commercial), uppercase, letter-spacing -0.06em | same |
| Intro headline (h2) | 37.05/34.8 px, three lines | 74/69.6 px, two lines, 798 wide |
| Question (p.h4) | Inter SemiBold 27/32.4 px, #000, centred | Inter SemiBold 36/43.2 px |
| CTA button | full width 360x65, Inter SemiBold 23 px, black on #cff128, radius 10, 20 px padding, animated arrow to the right of the label | 420x72 on the intro, 520x72 on input steps, 680 on text areas |
| Line under the CTA | none on the intro. A star rating line exists only in an alternate first screen for one traffic source | same |
| Fixed or sticky | nothing; the header is in the flow and the page never scrolls far enough to matter | same |
| Navigation | none. The site header and the site footer are both `display: none` on this template | same |
| Outbound links | none visible in the default path (review links sit inside the two offer cards) | same |
| CTA count | one per screen: 1 intro button, 9 Continue buttons, 9 auto-advancing choice screens, 1 submit | same |
| Proof count | 0 on the intro; a logo row with a client count and a star line inside each offer card at step 13 | same |
| Phone | none on the page | none |

The page is a sequence of 18 screens inside one form. Only one is visible at a time.

| # | Screen | Control | 390 height of the step | Advance | Dots lit |
| --- | --- | --- | --- | --- | --- |
| 0 | Intro (eyebrow, headline, paragraph, button) | button | 400 | button | 0 |
| 1 | First name | text input | 368 | Continue or Enter | 1 |
| 2 | Email | email input | 238 | Continue, after an email check | 2 |
| 3 | What do you sell | 2 option cards with icon, title, description | 423 | tap | 3 |
| 4 | Marketing in use | 9 multi-select pills with brand icons | 1,028 | Continue | 4 |
| 5 | Country | native select, 5 preferred countries first | 238 | Continue | 5 |
| 6 | Monthly marketing budget | 8 radio pills | 832 | tap | 6 |
| 7 | Website | text input | 304 | Continue | 7 |
| 8 | Describe the business | text area with a dictate chip | 537 | Continue | 8 |
| 9 | Current yearly revenue | 8 radio pills | 800 | tap | 9 |
| 10 | Target yearly revenue | 8 radio pills | 800 | tap | 10 |
| 11 | Biggest obstacle | text area with a dictate chip | 645 | Continue | 10 |
| 12 | When to start | 7 radio pills | 605 | tap | 10 |
| 13 | Done-for-you or teach-me | 2 tall offer cards | 1,433 | tap | 10 |
| 14 | Commitment, 1 to 10 | 10 graded round buttons | 390 | tap | 10 |
| 15 | Where did you first hear about us | native select, 15 options, "Other" reveals a text input | 349 | Continue | 10 |
| 16 | Pinky promise to show up | 2 emoji cards | 365 | tap | 10 |
| 17 | Contact details | first name (prefilled), last name, mobile with dial code, company, website (prefilled) | 644 | submit | 10 |
| after | Loader overlay, then the calendar | none | full screen | automatic | n/a |

## Mobile first screen (390x664)

Everything on the intro is above 530 px, so the whole screen fits with 134 px to spare at 664 and 314 px at 844.

| Element | Top | Bottom |
| --- | --- | --- |
| Header bar (white, 1 px soft shadow) with the logo centred, 143x20 | 0 | 50 |
| Progress dots (10) | 78 | 102 |
| Eyebrow, 18 px uppercase, grey, with a flag emoji | 130 | 150 |
| Headline, three lines | 169 | 273 |
| Paragraph, five lines, 193 characters | 304 | 439 |
| Button, 360x65 | 465 | 530 |

Why it matters for the template: this is the only reference where the first screen is the whole page. The fit rule is stricter than on A and B: eyebrow, headline, paragraph and button must all end above 664 with the progress dots visible, and every later step should put its first control on screen without scrolling. On the reference the question plus the first two or three options are always visible at 664; the long lists (steps 4, 6, 9, 10, 13) scroll inside the document.

## What stays fixed on scroll

Nothing. The 50 px header scrolls with the page. After every advance the script scrolls the window to the top (smooth), so each new question starts at the same place.

## Design tokens observed

Fonts: Inter (SIL Open Font License) at 400, 500, 600 and Futura LT Condensed Extra Bold (commercial, not redistributable). The template bundles Inter as a variable file and replaces Futura with Anton (OFL), the closest open condensed heavy face; see `docs/decisions.md`.

| Role | 390 | 1440 |
| --- | --- | --- |
| Eyebrow | Inter 400 18/14.4, uppercase, #495057 | 22/17.6 |
| Intro headline | Futura Condensed 37.05/34.83, -2.22 px tracking, uppercase, #000, margin-bottom 30 | 74/69.56, -4.44 px |
| Intro paragraph | Inter 400 18/27, #495057 | 22/33, 740 wide |
| Question | Inter 600 27/32.4, #000, margin-bottom 28 (12 when a sub-line follows) | 36/43.2, column 480 to 798 wide by step |
| Sub-line under a question | Inter 400 18/27, #495057, margin-bottom 28 | 22/33 |
| Small note under a question | Inter 400 16/24, #595959 | same |
| Step pill | Inter 600 11/14.3, +0.66 px tracking, uppercase, #495057 on white, radius 47, padding 8/14, red 10 px dot before the text, margin-bottom 17 | 15/19.5, +2.1 px tracking, padding 10/20 |
| Button label | Inter 600 23/23 (20/20 on the long submit label) | 23/23 |
| Input text | Inter 400 22/33 | same |
| Radio pill label | Inter 500 20/24, #595959 | same |
| Multi-select pill label | Inter 500 19/22.8, #4a4a4a | same |
| Option card title and description | Inter 600 21/27.3 and Inter 500 16/22.4 #6b6b6b | same |
| Error line | Inter 500 14/18.2, #d6312b, 6 px above, 4 px indent | same |
| Back button | Inter 500 15/15, #333, 18 px arrow, 75x30 | same |

Colours: page #f9f9f9; surfaces #ffffff; brand lime #cff128 (hover #d5f342, pressed #c3e326); heading #000; body #495057; pill text #595959; input border #cbcbcb with a 3 px #ebebeb outer ring; placeholder #8a8a8a; disabled button #c7c7c7 with #737373 text; error #d6312b; inactive dot and connector #c7c7c7; selected card tint #fffdf3; pill red dot #e53935; offer eyebrow #8fb000; overlay behind modals rgba(40,39,40,0.8).

Contrast on the reference: black on lime is 16.6:1 (passes). Disabled button text #737373 on #c7c7c7 is 2.9:1 (acceptable for a disabled control, but the template darkens it). Placeholder #8a8a8a on white is 3.5:1 (fails 4.5:1). Offer eyebrow #8fb000 on white is 2.5:1 (fails). Grey 5 on the scale buttons (#595959 on #dceb92) is 5.5:1 (passes).

Shape: buttons and inputs radius 10; radio and multi-select pills radius 100; option cards radius 10; offer cards radius 22; emoji cards radius 10; dots 20 px circles.

Elevation: button `1px 8px 30px rgba(0,0,0,.03), 1px 4px 10px rgba(0,0,0,.05)`; pills and cards `1px 2px 3px rgba(0,0,0,.08)`; hovered or focused option card `1px 8px 16px rgba(0,0,0,.08)` and a 2 px lift; header `1px 1px 3px rgba(0,0,0,.1)`.

Motion: a leaving step fades and drops 12 px in 0.2 s; the arriving step fades in over 0.45 s and rises over 0.55 s on `cubic-bezier(.2,.8,.2,1)`, both after a 0.2 s delay. Button hover (pointer devices only): lighter lime, 3 px lift, a lime-tinted shadow, the arrow slides 5 px right; pressed: darker lime, 1 px down, scale 0.98, 0.08 s. The arrow in every enabled button is a looping animation and stops when the button is disabled. A `prefers-reduced-motion` rule removes the step and button transforms (the reference does this properly).

## Sections

### 0. Header bar

- Job: say whose page this is and give one way back.
- Principle: no exits. A visitor can go forward, go back one question, or leave.
- Mechanics: 50 px white bar, 15 px vertical padding, soft shadow. The logo is 143x20 and centred on the intro. From the first question a Back button appears at the left (x 32, 75x30, arrow plus the word) and on phones the logo slides left to sit beside it (x 124). On desktop the logo stays centred. Back is hidden again on the intro.
- Slots: logo; back label (4 characters).
- Differs from A and B: no phone number, no overlay on a photo. The template adds a `funnel` page chrome with this bar.

### 1. Progress dots

- Job: show how short the task is and how far along the visitor is.
- Principle: goal gradient. There are 10 dots for 17 questions, one dot lights per question, so the row is full by question 10. The last seven screens run with a completed bar and two pills that say the end is near.
- Mechanics: a row of 10 circles, 20 px, joined by a 3 px line, 360 wide on phones (36 px per dot cell) and 600 wide on desktop, grey #c7c7c7, lit #cff128 including the connector. 28 px below the row before the content.
- Slots: none (the count is a config number).
- New to the template.

### 2. Intro screen

- Job: restate the ad's offer in one screen and get the first tap.
- Principle: a small first commitment. The button does not submit anything; it only starts the questions. The split test on the day of capture changed only the button label between a plain "start" label and a fit-check label (excerpt: "See If You're A Fit").
- Mechanics: centred stack. Eyebrow, 19 px gap, headline, 30 px, paragraph, 26 px, button. The eyebrow ends with a flag emoji for the visitor's country, filled by an IP lookup after load; the eyebrow stays invisible until the lookup returns.
- Slots: eyebrow 21 characters, 3 words (plus the flag); headline 41 characters, 6 words; paragraph 193 characters, 33 words; button label 11 characters, 2 words (variant 19 characters, 5 words).
- Copy pattern: headline is "Free [length] [named deliverable] session"; the paragraph is claim, dollar value in brackets, a "strictly for people who" filter, then an invitation.
- Differs from A and B: no photo, no badge, no trust strip. The template takes the screen as the first state of the new `quiz` section. The country flag is not reproduced by lookup; the eyebrow is a hand-written line.

### 3. Short-answer steps (first name, email, website)

- Job: collect one fact per screen with the keyboard already up.
- Principle: momentum. Each screen asks one thing, in a voice that reacts to the last answer. From step 2 the first name typed at step 1 is written into the questions (excerpt: "Awesome! What's your email Alex?").
- Mechanics: question, 28 px gap, input 360x60 (radius 10, 1 px #cbcbcb border, 3 px #ebebeb ring, 24 px side padding, 22 px text), 20 px gap, Continue 360x65. Continue is grey and disabled until the field has any character, then turns lime. Enter submits the step. On arrival the first control is focused after 200 ms. Desktop: input and button 520 wide, input 76 tall.
- Validation: text needs at least two letters; the email must match a pattern and then pass a server check while a "Validating..." line shows. Errors appear under the field in red with a red border (excerpt: "Please enter a valid email address", "This field is required"). When the email passes, the first name and email are posted to the business straight away as a partial lead and a step-one pixel event fires, 15 screens before the form is finished.
- Slots: name question 125 characters, 22 words; name placeholder 21; email question 28 characters plus the name; email placeholder 7; website question 26 plus the name; website sub-line 44; website placeholder 9.
- New to the template: step kinds `text` and `email`, the `{name}` token, the partial-lead option.

### 4. Option cards (what do you sell)

- Job: split the audience in one tap.
- Principle: easy first qualifying question, phrased as being about the visitor.
- Mechanics: question (margin 12), sub-line of 126 characters with the name in bold, then two cards stacked 14 px apart, each 360x114: a 56 px rounded-square icon tile (#f3f4f5, lime when hovered or chosen), title, description, and a chevron at the right. Hover, focus and chosen: cream tint #fffdf3, 2 px lime border, deeper shadow, 2 px lift. A tap selects and advances. Desktop: cards 560x96.
- Slots: question 24 characters; sub-line 126; per card a title of 7 characters and a description of 34 to 37.
- New step kind `cards`.

### 5. Multi-select pills (marketing in use)

- Job: learn what the visitor already does.
- Principle: recognition, not recall; brand icons make the list scannable.
- Mechanics: question, small note in brackets, then 9 pills in one column on phones (360x70, 16 px gap, radius 100, 2 px #dcdcdc border) and three columns of 330 on desktop. Each pill starts with one or two overlapping 42 px white icon circles holding a 26 px brand icon, then the label. Chosen: lime fill and border, a white 24 px tick circle at the right. Continue stays disabled until one is ticked, and sits 44 px below the grid.
- Slots: question 60; note 36; 9 labels of 4 to 25 characters.
- New step kind `multi`. The template draws neutral line icons; it does not ship third-party brand marks.

### 6. Select steps (country, where did you hear)

- Job: a long list without a long screen.
- Mechanics: native select styled as the inputs (360x60, 52 px right padding for the chevron). Country lists five preferred countries, a divider, then every country with its flag; the visitor's country is preselected so Continue is live at once. The "heard about us" select starts on a disabled prompt and has 15 sources; its last option reveals a text input for a free answer. Desktop: 520 wide.
- Slots: country question 39; heard question 34, sub-line 87, 15 option labels of 10 to 69 characters.
- New step kind `select`, with an optional "other" free-text reveal.

### 7. Radio pill lists (budget, current revenue, target revenue, timing)

- Job: the qualifying numbers, one tap each.
- Principle: each asks for a band, not a figure, and each explains why it is asked (excerpt: "We're asking you this first to see if we'd be a good fit").
- Mechanics: question, sub-line, then pills 360x62, 13 px apart, radius 100, white, soft shadow, a 30 px grey circle at the left that turns lime with a tick when chosen. A tap advances. Desktop: two columns of 390 with a 17 px gap. The timing list has a seventh, joke option centred under the grid.
- Slots: budget question 42 and sub-line 142; revenue questions 36 each with sub-lines of 119 and 79; timing question 36; 7 or 8 labels of 5 to 26 characters.
- Logic carried by the options: the lowest revenue band and the "never" timing option send the visitor to a "not eligible" page; bands add points to a lead score.
- New step kind `choice`.

### 8. Long-answer steps (describe the business, biggest obstacle)

- Job: get the prospect to write the sales call's opening for you.
- Principle: effort invested raises show-up rate; the second one asks for the pain in the visitor's own words, with a bracketed nudge to give detail.
- Mechanics: text area 360x290 (five rows, 18/27 px text, 18/24/76 padding) with a "dictate" chip pinned inside its bottom edge: a 36 px lime circle with a microphone, a label of 43 to 47 characters, and a timer while listening. The chip shows only when the browser supports speech recognition; errors swap its label and hide it after eight seconds. Continue is 24 px below. Desktop: 680 wide.
- Slots: first question 81 characters; second question 91 plus the name, with a 162 character bracketed note; placeholder 22; chip labels 43 and 47.
- New step kind `longtext` with a `dictation` option.

### 9. Offer cards (done-for-you or teach-me)

- Job: let the visitor choose the product, and let the business route them.
- Principle: a choice between two yeses. Each card carries its own proof.
- Mechanics: two cards 360x624 stacked 24 px apart on phones (527x623 side by side on desktop), white, radius 22, 1 px #e6e6e6 border. A 147 px black circle with the brand mark overlaps the top edge. Then a spaced uppercase eyebrow (16 px, +3.2 px tracking), a Futura title at 60 px (85 on desktop), a 253 character description, a full-width lime button strip 64 tall, a row of client logos or faces 40 tall with a count badge, and a star line with rating and review count. The chosen card gets a lime border.
- Logic: the choice is cross-checked with revenue and product type. A mismatch opens a small notice (headline, two short paragraphs, one "keep going" button) that explains which offer fits, then continues.
- Slots: question 93; per card eyebrow 12 to 21, title 6 to 7, description 253, button 11, proof line.
- New step kind `offers`. Skip it when the business sells one thing.

### 10. Scale (1 to 10)

- Job: measure commitment and prime it.
- Mechanics: a pill above the question (excerpt: "We're almost done, just 2 more questions."), the question of 130 characters, then ten round buttons 65.6x56 in two rows of five on phones (72x56 in one row on desktop), 8 px gap. Their fill steps from grey #e6e6e6 at 1 to full lime #cff128 at 10, so the high end looks like the brand's button. Text is grey on 1 to 5 and black on 6 to 10. Chosen: 2 px black ring. A tap advances. Answers of 1 or 2 are sent to the "not eligible" page.
- Slots: pill 41; question 130.
- New step kind `scale`.

### 11. Commitment (yes or no)

- Job: get a promise to turn up.
- Principle: consistency. A promise made in the form is kept on the day.
- Mechanics: pill with the name in it, question of 97 characters, two cards 135x160 side by side, 16 px gap, each a 60 px emoji over a 20 px label.
- Slots: pill 33 plus the name; question 97; two labels of 2 and 3 characters.
- New step kind `yesno`.

### 12. Contact details and submit

- Job: the only real form on the page, shown after 16 answers.
- Principle: the screen says the visitor qualified before it asks for a phone number (excerpt: "You made the cut."). First name and website are already filled from earlier answers.
- Mechanics: question 54 characters, sub-line 141, then five inputs 360x60, 10 px apart: first name, last name, mobile (a dial-code picker 103 wide inside the field), company, website. Submit 360x62, 20 px label. An empty submit puts "This field is required" under each empty field. The mobile is checked by a lookup before the form continues.
- Hidden fields: UTM source, medium, content, term and campaign, referrer, IP, time zone, the service the answers qualify for, and a lead score from 0 to 100 (budget up to 30, revenue up to 30, timing up to 15, commitment up to 10, service up to 10, already advertising 5). A score of 60 or more fires a "qualified lead" event.
- Slots: question 54; sub-line 141; five placeholders of 9 to 14; submit label 24.
- Differs from A and B: the form is the last step of the quiz, not a section. New step kind `contact`.

### 13. Loader, then the calendar

- Job: cover the wait and make the booking feel earned.
- Principle: labour illusion. Seven seconds of visible "work" on the visitor's answers before the calendar.
- Mechanics: a white full-screen overlay. A 96x108 brand mark fills with lime from the bottom with a moving wave, a percentage in Inter SemiBold 40 counts up, and four lines tick off in turn (22 px circles: grey outline, spinning lime ring while active, lime with a tick when done; text grey until reached). The count is eased and pauses at 23% and 66%; durations are randomised by 20% so it never looks the same twice; total about 7.25 s, then a closing line fades in for 1 s and the form posts. The calendar that follows is outside this page.
- Slots: four lines of 21 to 39 characters; closing line 31.
- New to the template: the `loader` block of the quiz.

### 14. Exit prompt (desktop)

- Job: one more ask when the pointer leaves through the top of the window.
- Mechanics: fires once, never while submitting. Dark overlay, a 900 px panel: a pill-shaped progress bar, a Futura headline at 70 px, a 195 character paragraph, an animated picture, a full-width button and a one-line disclaimer.
- Slots: headline 21; paragraph 195; button 36; disclaimer 87.
- New to the template as an optional `exitPrompt` block. The animated picture is an image slot.

### 15. Not eligible page

- Job: a soft landing for visitors the quiz screens out, with something free to take away.
- Mechanics: same header bar; headline of 52 characters; paragraph of 169; then two resource cards (image, title, one or two lines, button).
- New to the template: the `notFit` page, built only when a config has one.

## Page-level patterns

Persuasion sequence as a chain: offer restated with a value and a filter, a no-risk first tap, name, email (lead already captured), easy identity question, what you do now, where you are, money you spend, your website, your business in your words, money you make, money you want, what is in the way, how soon, which offer, how serious (1 to 10), where you heard of us, promise to show up, "you qualified", contact details, visible processing, calendar.

Compared with A and B: A and B persuade with content (photos, comparison, reviews, guarantee) and ask once at the end. C persuades with the act of answering. It has almost no claims; the questions do the selling by making the visitor state their revenue goal, the gap and the obstacle, then promise to attend. Proof appears once, late, inside the offer cards.

- CTA cadence: one action per screen. Choice screens advance on tap, so 9 of the 17 questions need no button press.
- Order of asks: easy and identity first, money in the middle after the reason for asking is given, effortful writing after the visitor is seven screens in, the phone number last.
- Voice: first person plural, casual, jokes in brackets, the visitor's name repeated. Around 6th grade reading level. Questions begin with a reaction to the previous answer ("Okay great", "Awesome").
- Pills: two late screens open with a white pill with a red dot that counts down what is left.
- One component pattern: every screen is the same shell (optional pill, question, optional sub-line or note, one control, optional Continue).
- Scripts and weight: about 50 third-party hosts load on the reference. The template loads none.
- Tab recall: when the tab is hidden the reference swaps the favicon and flashes a fake "new message" count in the title. Not reproduced.
- Social proof pop-ups: a notification service is loaded and each submit is logged to it by first name. None appeared during capture. Not reproduced.

## Accessibility and performance notes on the reference

- The questions are `p` elements, not headings, and the options are spans holding inputs. The template uses a heading per step, a `fieldset` with a `legend` for option groups and real labels.
- Placeholders stand in for labels on every input. The template adds visually hidden labels.
- Placeholder grey and the offer eyebrow fail contrast; the template uses #737373 and a darker accent text colour.
- Hidden steps are removed with `visibility: hidden`, which is correct; the template also sets `inert` on inactive steps so keyboard focus cannot land in them.
- The progress row has no text alternative. The template exposes "Step n of m" to assistive technology.
- Error lines are not linked to their fields. The template sets `aria-invalid` and `aria-describedby`.
- The emoji carry the meaning on the commitment cards only together with the label, which is fine; they are marked decorative.
- The loader has `role="status"` and `aria-live` on the reference; kept.
- The reference's first load pulls about 50 third-party hosts and a 287 KB theme script. The template's quiz script is a few kilobytes and nothing else loads.
- The country and source lists are injected by script. The template renders its options in the HTML.

What could not be captured: the dictation chip while listening (needs a microphone), the notice shown when the chosen offer does not match the answers (its text was read from the script; the browser session ended before a screenshot), the phone lookup result, and the calendar page that follows a real submit.
