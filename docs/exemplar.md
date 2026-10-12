# Exemplar: what a page at the standard looks like

Read this before briefing a photographer or writing copy for a client page. It describes the standard the two reference pages set for imagery, video and copy, slot by slot, so a client page can be checked against it. Parts 1 to 3 come from reference A (a concreter, `docs/teardown.md`). Part 4 adds what reference B (a kitchen and bathroom renovator, `docs/teardown-b.md`) does differently and the slots it introduced. A client page follows whichever sections it uses; the checklist at the end covers both.

**This file is not source text.** Client copy is written from the client's own customer research and offer, never by rewording the excerpts below. Excerpts are kept to a phrase or a sentence and exist only to show the pattern. Client images are the client's own jobs, never stock and never the reference's photos.

Slot IDs match `site.config.ts` and `docs/content-spec.md`. Character counts are the reference's own content, measured from the live DOM.

---

## Part 1: Imagery

Every image on the reference, in page order. "Proves" is what the image is there to establish in that section.

### Imagery: Logo and brand marks
- `business.logo`: a red badge with the business name in white block capitals and a hand-drawn rosella (a native parrot) perched on the left edge. Transparent PNG, rendered 100x33 on mobile and 150x50 on desktop. Proves: a named, branded local business, not a lead-gen front. Treatment: none. Also used at 120x40 in the footer.
- `business.logoWhite`: the same mark as a flat white wordmark in two lines (name over trade), used as the title of the sage comparison column. Proves: the "us" column belongs to the brand.
- `proof.avatars`: four circular head-and-shoulders crops of real customers, overlapping in a row, rendered 68x20 and 82x24. Proves: the review count is people, not a number.

### Imagery: Hero

Slots: ``hero.image``

In frame: a finished concrete driveway edge photographed low and at an angle, with garden plants on the left and a rendered house wall on the right, daytime, dry, no people. The photo has been washed out to near white so only shapes and texture survive. Proves: nothing on its own; it is set dressing that says "concrete, outdoors, residential" while leaving the headline fully readable. Aspect 1372x1352 (near square) cropped to a wide band on desktop (1440x834) and a tall band on mobile (390x811), object-fit cover, centre anchored. Treatment: pre-lightened in the image file; no CSS overlay. For a client: export at 2400x1400, keep the subject in the centre third, and lighten in the file (or leave the template's optional overlay on).

### Imagery: Before and after marquee

Slots: ``beforeAfter.pairs[0..6]``

Seven pairs, each two portrait tiles (3:4, 234x311) side by side with a 2 px gap and a small white "Before" (red X) or "After" (green tick) pill in the top corner. All shot at street or garden level on a phone, daytime, mostly sunny, no people, the house always in frame so the viewer knows it is the same property.

- Pair 1: a side passage between a garage and a timber fence. Before: old cracked pale concrete. After: new exposed-aggregate path, same angle from the gate.
- Pair 2: a weatherboard house with a grey tiled roof seen from the street. Before: bare earth and gravel where the driveway was. After: a new dark driveway and crossover, same angle, same kerb in frame.
- Pair 3: a pool-side path along a fence. Before: a narrow strip of grass and dirt. After: a wide pale aggregate path, the pool fence and pool visible in both.
- Pair 4: a backyard beside a dark-brick house. Before: patchy lawn and a raised garden bed. After: a large smooth grey patio slab running to the fence.
- Pairs 5 to 7: a front yard with a timber slat fence, a courtyard, and a driveway, each following the same rule: same spot, same height, same direction.

How the pairs are matched: the "after" is taken from the same standing position and camera height as the "before", with the same fixed landmark (fence post, garage door, pool gate) in the same place in the frame. That is what makes the difference read at a glance: the eye only has to compare the ground. Proves: real transformation on real local homes. Treatment: none (no rounded corners, no filter).

### Imagery: Problem letter

Slots: ``letter.images[0..1]``

Two landscape photos (7:5, 550x391) of the same single-storey brick-and-render house from the footpath, blue sky, late morning, bins and letterbox in shot, no people.

- Image 1 (top): the house before: lawn to the kerb, a small path, loose gravel at the garage.
- Image 2 (bottom): after: a pale concrete driveway with three floating step slabs across a mulched garden bed to the front door.

Proves: the letter's claim that the right job makes the house look "complete". Matching: same angle, so the pair reads as before and after even though it is not labelled. Treatment: none.

### Imagery: Recent projects

Slots: ``projects.items[0..5].poster``

Six portrait video posters (9:16, served at 640x1138). What the sampled frames show: a modern rendered two-storey home at dusk with lit floating steps; an overhead site shot of formwork and fresh slabs beside a dark timber-clad house with two workers; a drone view of a dark two-storey build with a new pale driveway and a person standing on it; a pink concrete truck and three crew on a suburban street; a close shot of a mini-excavator bucket over formwork; and one missing media tile. Proves: active work in named suburbs and a crew that exists. Treatment: a sage rounded play button overlay from the player, tiles have about 8 px corners.

### Imagery: Photo grid strips

Slots: ``photoGrid.images[0..3]`, three instances`

Four square tiles (700x700 export), full bleed, 2x2 on mobile and one row of four on desktop.

- Strip 1 (after projects): two crew in red and black hoodies setting formwork at a white modern house; a site seen from above with a freshly poured slab; a worker screeding by a white wall; a wide shot of blue tarps and timber across a prepared site. Mostly overcast, working light.
- Strip 2 (after comparison) and strip 3 (after guarantee): the same four images: a man in a wide hat kneeling on formwork in front of a grey garage door; a dark wet slab with pegs and formwork; finished dark floating steps at a black-clad house entry; timber formwork laid out before a pour at a house entry.

Proves: volume of work and the stages of a job (prep, pour, finish). Mix: three of eight are "work in progress with people", five are "finished or in-progress surfaces with no people". Treatment: none, object-fit cover.

### Imagery: Testimonials

Slots: ``testimonials.items[0..2].image``

Three near-square photos (395x422 desktop, 350x263 mobile crop), each paired with a review card.

- Item 1: a straight-down drone shot of a dark-roofed house with solar panels, a new pale path winding past a pool and gum trees. Midday sun, hard shadows.
- Item 2: a crew member screeding a wet driveway beside a brick house, two more workers behind, suburban street and trees. Overcast.
- Item 3: an oblique drone shot of a house, driveway and backyard with a crew member and tools on the lawn. Sunny.

Proves: the reviewer's job is real and recent. The photos are of jobs, not of the reviewers. Treatment: none. Mobile crop takes the middle band, so the subject must sit in the vertical centre.

### Imagery: Benefits

Slots: ``benefits.image``

One landscape photo (369x300): a man in a cap and shorts pulling a screed across a fresh pale driveway in front of a brick garage, a dark fence and trimmed shrubs behind, afternoon light. Proves: the "no shortcuts" claim with a person doing the work by hand. Treatment: none; it sits in the centre of the card grid at the same size as a card.

### Imagery: Future pacing compare slider

Slots: ``futurePacing.before`, `futurePacing.after``

One square pair (580x580 source, rendered 310 and 530). Before: the same driveway dug out to dirt and crushed rock beside a timber fence, the two-storey brick house and gum trees behind. After: the finished exposed-aggregate driveway with the house. Shot from the kerb at the same height and angle, which is essential: the drag only works if everything but the ground lines up. Proves: the "imagine" copy with the strongest possible demonstration. Treatment: a 4 px white divider and a round handle at the split.

### Imagery: Bento gallery

Slots: ``bentoGallery.images[0..6]``

Seven finished-job photos, all exterior, all without people, all at the golden-hour or clean-sky end of the day: a modern grey-brick house with a flat roof and house number beside a pale driveway (wide); a single-storey home with a wide pale driveway in morning light (square); a modern home with a timber garage door and large-format pavers set in gravel (square); lit floating steps rising to a two-storey house at dusk (square); a pale aggregate path beside a pool fence and lawn (square); a white two-storey modern house with a concrete landing (square); a white single-storey house with a new wide driveway and lit facade at dusk (wide). Proves: the finished product at its most aspirational, matching the "architectural magazine" line in the copy above it. Treatment: none; the two wide tiles are 2:1, the squares 1:1.

### Imagery: Three steps

Slots: ``steps.items[0..2].image``

Three landscape photos (7:4, 468x268) with a drop shadow. Step 1: a two-storey rendered house with a fresh slab across the front and crew and vans in shot (the "measure and quote" visit). Step 2: a man in a red shirt kneeling at a slab edge with a tool, houses behind (the "design and build" work). Step 3: a close shot of a pale finished landing with black steel edging and a mulched garden (the finished, "relax" result). Proves: the process is real and the steps happen in order. Treatment: `shadow-lg` style drop shadow, no corners.

### Imagery: Guarantee badge

Slots: ``guarantee.badge``

Not a photo: an inline SVG shield outline in sage with three small stars, the guarantee name in two lines of dark capitals, a dot divider, and the "or it's free" line. 220x265. The template draws this from config text; no image is needed.

### Imagery: Offer bundle

Slots: ``offerForm.bundleImage``

A composite mock-up, 2:1 (764x382): a laptop screen showing the offer headline and logo, flanked by a tablet and a phone showing guide covers, two printed sheets fanned behind, and a green roundel for the bonus. White background. Proves: the offer is a tangible package worth the stated value. For a client: export at 1528x764 on white or transparent; a single device with the offer on screen is enough if a full composite is not available.

### Imagery: Icons
All line icons, sage #839478, 40 px in the trust strip, 32 to 40 px in benefit cards, 28 to 32 px check and X circles. Trust strip icon subjects on the reference: location pin, cog with handshake, trowel, target, hard hat, house. Benefit icons: document and cog, wheelbarrow, floor polisher, clipboard with tick, trowel and bucket. The template ships a small set of generic line icons and takes an SVG path string per item.

### Page-level imagery summary
- Total images: 44 raster images plus six video posters, the logo three times, the avatar strip twice, and the five-star image three times.
- Mix: 12 wide establishing shots (house plus driveway from the street or air), 24 medium shots (a surface with its surroundings, before and after pairs, grid tiles), 8 detail or working shots (hands, tools, formwork, fresh slabs).
- People: 11 of 44 show people, always crew at work, never posed, never looking at the camera, never customers.
- Colour and light: three families that are kept consistent within each section: pale concrete under blue sky (before and after, letter, bento), warm overcast working light with red or black crew clothing (grids, steps, benefits), and dusk with lit facades (bento). Nothing is filtered or colour graded; the only treatments are the washed-out hero and the drop shadow on step images.
- Minimum shot list to fill the page to this standard: 1 wide driveway shot for the hero (can be lightened), 7 matched before and after pairs (14 photos, portrait), 2 matched before and after photos of one house from the footpath (landscape), 8 square job photos of which at least 3 show crew working, 3 near-square photos of named customers' finished jobs, 1 landscape photo of a crew member finishing a surface, 1 matched square before and after pair of one driveway from the kerb, 7 finished exteriors (2 wide, 5 square) at clean-sky or dusk, 3 landscape process photos (visit, work, finished detail), 1 device mock-up of the offer, 4 customer head shots for the avatar strip, the logo in full colour and in white, 6 portrait videos or posters labelled by suburb. That is 47 photos, 6 videos and 3 graphics; the 8 square job photos are reused across three grid strips on the reference, so 4 more would avoid the repetition.

---

## Part 2: Video

Checked: the whole page, including the suburb-labelled projects section, any background video and any embeds. Result: one video section, no background video, no other embeds.

| # | Position | Host and format | Length | Orientation | Playback | Poster | Captions | What the sampled frames show |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Projects slide 1, label "Berwick" | Wistia (`<wistia-player>` custom element, media ID fxklb5otm8), MP4/HLS from Wistia | unknown (player never exposed duration in a headless session) | portrait 9:16 | silent autoplay when in view, tap for sound | 640x1138 JPEG from Wistia | none found | modern rendered two-storey home at dusk, lit floating steps to the door |
| 2 | Slide 2, "Sorrento" | Wistia, bqog4i0e9r | unknown | 9:16 | same | same | none | overhead of formwork and fresh slabs beside a dark timber house, two workers |
| 3 | Slide 3, "Clyde" | Wistia, ihdemihnxm | unknown | 9:16 | same | same | none | drone view of a dark two-storey build with a new pale driveway, one person on it |
| 4 | Slide 4, "Frankston" | Wistia, yy6tr8nz0v | unknown | 9:16 | same | same | none | pink concrete truck and crew on a suburban street |
| 5 | Slide 5, "Camberwell" | Wistia, 3hqpboprjm | unknown | 9:16 | same | same | one text track present, content unread | close shot of a mini-excavator bucket over formwork and fresh concrete |
| 6 | Slide 6, "Basin" | Wistia, c5dmff3i18 | n/a | 9:16 | n/a | n/a | n/a | the media is missing on the live page ("Video not found") |

Audio cannot be heard in this environment, so nothing is claimed about voiceover, music or ambient sound. The standard for a client page: five or six portrait clips of 10 to 30 seconds, one per suburb, phone-shot is fine, showing the crew and the surface, with a still poster chosen from the first second so the tile reads before play.

---

## Part 3: Copy

For each text slot: the pattern as a reusable formula, a short excerpt, why it works where it sits, and the reference length.

### Copy: Header

- `header.phoneEyebrow`: pattern "two-word invitation to call". Excerpt: "HAVE QUESTIONS?". Why: a low-pressure reason to use the number. 15 characters, 2 words.
- `business.phone`: the number in local format, masked until clicked on desktop. 15 characters as displayed.

### Copy: Hero

- `hero.eyebrow`: pattern "qualifying question naming the quality tier, the trade and the city". Excerpt: "Looking for A-grade concreter in Melbourne?". Why: a cold visitor confirms in a glance that the page is for them. 43 characters, 6 words.
- `hero.headline`: pattern "Get a [quality adjective] [service 1], [service 2] or [service 3] in as little as [timeframe], plus a FREE [bonus 1] and [bonus 2] (worth $[value]+)". Excerpt: "...In As Little As 48 Hours - Plus A FREE Pressure Clean...". Why: outcome, speed, bonus and dollar value in one breath; the services list lets three audiences see themselves. 163 characters, 29 words, eight lines on mobile.
- `hero.body`: pattern "pain question, then the lifestyle gain, then the financial gain with a percentage". Excerpt: "Tired of cracked, stained concrete?". Why: the question agitates, the rest reframes the purchase as an investment. 209 characters, 30 words.
- `cta.label` (shared): pattern "REQUEST A FREE [thing they get] NOW". Excerpt: "REQUEST A FREE MEASURE & QUOTE NOW". Why: names the exact free step, uppercase, identical on every button so the page feels like one path. 34 characters, 7 words.
- `proof` badge: pattern "[rating] Stars From [count] [source] Reviews". Data, not copy. 33 characters as rendered.
- `trustStrip.items[n].label`: pattern "two to five word proof point, one of: ownership, named method, included follow-up, named process, no subcontracting, jobs completed count". Excerpt: "No Subcontractors". Why: six fast objections handled before the first scroll. 17 to 31 characters, 2 to 5 words, two lines each.

### Copy: Before and after marquee

- `beforeAfter.beforeLabel`, `afterLabel`: single words. 6 and 5 characters.

### Copy: Problem letter

- `letter.headline`: pattern "Have you [done the thing] more than once and still [feel the pain]?". Excerpt: "...And Still Unhappy With The End Result?". Why: targets the repeat renovator, the highest-intent visitor. 82 characters, 14 words.
- `letter.salutation`: pattern "Dear [city] homeowners,". 26 characters.
- `letter.paragraphs[0]`: pattern "in [area], many homeowners have [spent money on the category] hoping for [goal]; however [the result falls short in three sensory ways]; worse, within [timeframe] [specific failures] appear". Excerpt: "...within months, small cracks appear...". Why: describes the problem in the customer's terms (how it looks and feels), not the trade's. 458 characters, 69 words.
- `letter.paragraphs[1]`: pattern "the truth is most [trade] work only addresses [surface]; teams focus on [the visible job] rather than [the hidden causes]; that is why the same issues return: [three symptoms], leaving homeowners stuck in [the loop]". Excerpt: "most concreting work only addresses the surface". Why: reframes the cause so the mechanism sections that follow land as the cure. 369 characters, 58 words.

### Copy: Recent projects

- `projects.headline`: pattern "See some of our other recent projects:". 38 characters, 7 words.
- `projects.items[n].suburb`: a single suburb name. 5 to 10 characters.

### Copy: Comparison

- `comparison.headline`: pattern "Why most [category] jobs fail, and how [business] does it differently". 75 characters, 12 words.
- `comparison.us.items[n]`: pattern "[Named method]: [what it is in three parts] for [benefit]". Excerpt lead-in: "Precision foundations:". Why: the bold lead-in is the proper-noun mechanism, repeated from the trust strip; the body makes it checkable. 81 to 108 characters each, lead-ins 20 to 26 characters.
- `comparison.them.title`: pattern "Most other [trade plural]". 21 characters.
- `comparison.them.items[n]`: pattern "[Failure label]: [what they do] causing [consequence]". Excerpt lead-in: "Finish and forget:". Why: each row is the mirror of the row beside it, so the reader scores the competitor themselves. 49 to 87 characters, lead-ins 15 to 23.

### Copy: Testimonials

- `testimonials.headline`: pattern "[City] homeowners who chose [business], and never looked back". 61 characters, 9 words.
- `testimonials.items[n].headline`: pattern "the reviewer's own summary line, quoted or paraphrased, with the trait words customers use (honest, reliable, communication, quality)". Excerpt: "Great Communication And Quality Workmanship.". 44 to 84 characters.
- `testimonials.items[n].body`: pattern "first-person account naming the owner by first name, the start-to-finish experience, the communication, the result, a recommendation". Excerpt: "...kept us updated, and made the whole process stress-free". Why: it answers the fears the letter raised (reliability, surprises) in a customer's voice. 177 to 228 characters, 29 to 41 words.
- `testimonials.items[n].name` and `.suburb`: "[First name(s)], [Suburb] [State]". 20 to 29 characters combined.

### Copy: Benefits

- `benefits.headline`: pattern "Turn your [space] into [aspirational noun phrase] that [durability promise]". 90 characters, 15 words.
- `benefits.items[n].title`: pattern "Title Case method name, two to four words". Excerpt: "Precision Ground Engineering". 28 to 32 characters.
- `benefits.items[n].body`: pattern "a statistic or a named material, then what we do, then the result for the reader over [timeframe]". Excerpt: "70% of concrete failures come from poor prep.". Why: one hard fact per card makes the card quotable. 134 to 178 characters, 19 to 29 words.

### Copy: Future pacing

- `futurePacing.headline`: pattern "Imagine a [place] that [reflects the reader's self-image]". 41 characters, 7 words.
- `futurePacing.paragraphs[0]`: pattern "Picture [daily moment] and seeing [the result] that looks like [aspirational comparison], [three sensory adjectives]". Excerpt: "Picture driving up to your home...". 178 characters, 30 words.
- `futurePacing.paragraphs[1]`: pattern "No more [three pains]. In just [timeframe], you can turn [wasted space] into [new use], without [two fears about tradies]". 227 characters, 37 words.
- `futurePacing.paragraphs[2]`: pattern "Instead of [current feeling], you will [future feeling] every time you [daily moment]". 114 characters, 21 words.

### Copy: Bento gallery

- `bentoGallery.headline`: pattern "see some of our recent projects". 31 characters, 6 words.

### Copy: Three steps

- `steps.headline`: pattern "Transform your [space] in 3 simple steps". 46 characters, 8 words.
- `steps.items[n].title`: pattern "imperative verb phrase: Request..., Get..., Approve and relax...". 30 to 42 characters.
- `steps.items[n].body`: pattern "what the reader does or receives, what we inspect or plan, and the no-surprises reassurance; the last step restates the bonus and the follow-up". Excerpt: "...so there are no surprises.". 190 to 229 characters, 31 to 38 words.

### Copy: Guarantee

- `guarantee.badgeLine1/2`: pattern "[Category] Guarantee" over "or it's free". 18 and 13 characters.
- `guarantee.headline`: pattern "[Category] guarantee or it's free". 31 characters.
- `guarantee.subheadline`: pattern "Every project is backed by our exclusive [name]. Here's how it works:". 81 characters.
- `guarantee.paragraphs[0]`: pattern "If your [surface] develops [three specific defects] as a result of our workmanship within [term], we'll return and fix it completely FREE". Excerpt: "...within 10 years of completion...". Why: a term in years and named defects make the promise concrete. 193 characters, 31 words.
- `guarantee.paragraphs[1]`: pattern "Because when you choose us you're not just paying for [the product], you're investing in [workmanship promise] and [a team that stands behind it]". 228 characters, 40 words.

### Copy: Offer and form

- `urgency.line`: pattern "HURRY! We can only take [n] more jobs in [month]:" (hand-written, never generated). 47 characters. Empty by default in the template.
- `offerForm.headline`: pattern "Claim your FREE [visit] with a free [bonus 1] on [existing thing] and free [bonus 2] (worth $[value]+)". 145 characters, 27 words.
- `offerForm.bullets[n]`: pattern "bold: We'll [do a consultative thing]; plain: with [specific recommendations or a saving or a percentage]". Excerpt lead-in: "We'll review the job area and provide detailed insights...". Why: turns a quote visit into three deliverables plus the obvious one. 190, 194, 181 and 29 characters; lead-ins 74, 100, 77 and 29.
- `form.fields[n].placeholder`: short noun with an asterisk, except the job question: pattern "Please explain to us in a few sentences exactly what you're looking to get done?*". 81 characters.
- `form.submitLabel`: identical to the CTA label. 34 characters.
- `offerForm.reinforcement`: pattern "PLUS get [bonus 1] and [bonus 2] (worth $[value]+)". 110 characters, 20 words.

### Copy: Footer and legal

- `footer.copyright`: "Copyright © [year]. All Rights Reserved." 41 characters.
- `legal.termsLabel`: "Terms & Conditions". 18 characters.
- `legal.termsBody`: about 1,500 characters: four numbered headings (product disclaimer, payment terms with three percentages, variations, access and site conditions) each with one to three short paragraphs or bullets.

### Copy: Thank-you page

- `thankYou.headline`: "Thank You". 9 characters. `thankYou.subheadline`: "We'll be in touch with you shortly." 35 characters. The reference stops there; the template adds three next steps and the phone number.

### Page-level voice summary

- Reading level: about grade 8 to 9. Sentences average 18 to 22 words in paragraphs, under 10 words in bullets and cards.
- Specificity: numbers on almost every screen: 48 hours, $2,500+, 15 to 20%, 491 reviews, 4.9 stars, 500+ homes, 70% of failures, 12 months, 10 years, 25 years, $1,000, 20 to 30%, three steps, two jobs left.
- Unique mechanism: four named methods (precision ground engineering, adaptive mix technology, architectural integration, the 12-month clean and seal) are introduced in the trust strip, defined in the comparison, expanded in the benefits, and repeated in step three and the guarantee.
- Offer stack: free visit, free pressure clean, free 12-month clean and seal, stated value, plus three consultative deliverables in the bullets; restated in the hero, the offer headline and the reinforcement line.
- Customer's problem in their own terms: cracks, puddles, patch jobs, "looks disconnected", "doesn't feel complete", unreliable tradies, drawn-out renovations, budget blowouts.
- You to we ratio: about 1.3 to 1 across the page (the letter and future pacing are nearly all "you"; the comparison and benefits are "we" because they describe the method).
- CTA consistency: one label, uppercase, nine times, and the submit button uses the same words.

---

## Part 4: Reference B (renovation) patterns

Reference B sells a bigger, slower, higher-anxiety purchase (a $35,000 to $180,000 renovation) than reference A, and its page shows what changes when it does: future pacing moves to the front, the owner appears in person, the villain is named, the guarantee carries a cash penalty, a FAQ follows the form, and there is no review badge at all. The sections below are the ones B adds or reshapes. Section types that B shares with A (header, trust strip, comparison, testimonials, benefits, steps, guarantee, offer and form, footer) follow the Part 3 patterns unless noted here.

### Imagery: reference B

- Total: 52 photos in 20 blocks, no video, no people except in the three step photos (a customer on the phone, a tradesman at a sink) and none posed to camera.
- Mix: finished interiors dominate (kitchens with island benches, bathrooms with walk-in showers), shot in daylight from standing height with the room's longest line running into the frame. Six matched before and after pairs of the same room from the same doorway. Two in-progress photos (floor protection, dust sheets) for the "living through it" section. One dusk exterior is not used anywhere; B stays inside the house.
- Two dark sections use a heavily blurred kitchen photo behind white text; the blur is strong enough that nothing is identifiable. The template reproduces the effect with a client photo and a CSS blur, never the reference's file.
- Three sections end with a photo fading in from the section colour (statement, materials, offer). The photo is a wide interior at low contrast; the fade starts at about 40% of the photo's height.
- Logos: 18 supplier marks on white tiles (materials section) and a slow strip of the same marks under the hero. Each mark must be the supplier's own file with permission; the template takes individual files.
- Minimum shot list for a page built on B's sections: 1 wide finished-room shot for the hero band, 10 square or portrait finished-room photos for the collapsed gallery, 1 landscape finished room (dream outcome), 2 landscape interiors (problem), 6 before and after pairs from the same doorway (5:4), 2 landscape interiors (owner story, ideally with the owner on site), 4 portrait photos of reviewers' finished rooms, 6 square photos for the photo set, 2 landscape in-progress photos with floor and dust protection visible (liveable-home), 3 landscape process photos (consult, workshop, install), 1 device mock-up of the offer, a guarantee badge graphic (the template draws one from the badge lines), the logo in full colour and in white, 12 to 18 supplier logos. That is 40 photos, 1 mock-up and the logos.

### Copy: Hero (B)

- `hero.eyebrow`: pattern "FOR [city] [identity adjective] HOMEOWNERS WHO ARE DONE WITH [category] HORROR STORIES". Excerpt: "...who are done with renovation horror stories". Why: qualifies by identity and prior pain instead of by trade and city, which suits a purchase the visitor has already been burned by. 74 characters, 11 words, uppercase on a pill.
- `hero.headline`: pattern "Get your [aspirational adjective] [category] in [timeframe] with a fixed price guaranteed, or we pay you $[penalty]". Excerpt: "...In 42 Days With A Fixed Price Guaranteed...". Why: timeframe, price certainty and a cash penalty in one sentence; the penalty is the hook because it is checkable. 99 characters, 19 words.
- `hero.body`: pattern "[City]'s only '[Named Method]' brings [four functions] under one roof, so you get [three outcomes] without [the chaos they fear]. No [X]. No [Y]. No [Z]. Just [the promise]." Excerpt: "No outsourcing. No juggling trades. No surprises.". Why: names the mechanism in quotation marks the first time it appears, then strips the fear in three two-word sentences. 375 characters, 52 words (nearly double A; it fits because B's hero photo is a band beneath the text).
- `cta.label` (B): pattern "CLAIM YOUR FREE [duration] [thing they get]". Excerpt: "CLAIM YOUR FREE 60-MINUTE DESIGN CONSULTATION". Why: the duration makes the free thing concrete. 45 characters, 6 words.
- `cta.reinforcement` (B, under every CTA in place of the review badge): pattern "Includes your [deliverable 1] and [deliverable 2] (valued at $[value])". 76 characters, 12 words. Use this line when the client has no review profile worth showing; use the badge when they do; never both under one button.
- `trustStrip.items[n].label` (B): five items, pattern "[years] years experience", "transformed in [timeframe]", "free custom [deliverable]", "free [duration] [consultation]", "fixed price quote". 16 to 31 characters. On B these are the offer restated as facts rather than A's named methods.

### Copy: Dream outcome

- `split.headline`: pattern "A [adjective], [adjective] [space] delivered in [timeframe] without [the fear]...". 92 characters, 13 words, ends in an ellipsis as most B headings do.
- `split.paragraphs[0]`: pattern "Picture this: your [current space] is now [finished state with two specifics]. Or your [other space] is now [finished state]. The [job] happened on schedule, stayed on budget, and didn't [the fear]." Excerpt: "Picture this: Your outdated kitchen is now...". Why: the same future-pacing device as A's section 10, placed fourth so every later argument is read as the route there. 342 characters, 55 words.
- `split.paragraphs[1]`: pattern "Sound too good to be true? This is what happens when [credential] handles [the whole job] with no [three failure modes]. Just [the promise]." 314 characters, 47 words.

### Copy: Problem (dark split)

- `split.headline`: pattern "How to lock in your [price] and [timeline] so you never face a $[number] [failure] or [duration] delay...". 95 characters, 19 words.
- `split.paragraphs[0]`: pattern "Most [category] companies are just middlemen. They outsource [A] to one company, [B] to another, and hire whoever's available for [C]. Nobody's accountable. That's why the $[quote] becomes $[blown quote]. Why the '[promised duration]' drags into [actual]. Why you're stuck managing [n] contractors who blame each other." Excerpt: "That's why the $80,000 quote becomes $110,000.". Why: the villain is a structure (middlemen), not a person, so the reader does not feel accused for having hired one. 391 characters, 59 words.
- `split.paragraphs[1]`: pattern "You end up [vivid daily consequence] while [the tradie disappears]. Your finished [space] has [two visible defects]. But this entire nightmare stems from one fixable problem: [the cause]. Lock in [the fix], and suddenly [three outcomes]." Excerpt: "...cooking on a camping stove while your builder goes silent.". 464 characters, 74 words (the longest paragraph pair on B; the dark background and the two photos carry it).

### Copy: Before and after grid

- `beforeAfterGrid.headline`: pattern "[City] homes transformed in [timeframe] (not [the usual])". 53 characters, 9 words.
- `beforeAfterGrid.items[n].label`: pattern "[Suburb] [Room]". Excerpt: "Camberwell Bathroom". 16 to 21 characters. The suburb list is the ad targeting list.
- `beforeAfterGrid.items[n].caption`: pattern "one line naming the change: [from state] to [to state], or [what was custom], or [what was kept on schedule]". Excerpt: "From 1980s dark space to modern retreat". 38 to 54 characters.

### Copy: Method statement

- `statement.headline`: pattern "Our [credential], in-house [method] eliminates [three failures] from day one, so you enjoy [the outcome] sooner...". 147 characters, 21 words, the longest heading on either page; it is the thesis of the page.
- `statement.paragraphs[0]`: pattern "[Business] works differently. Everything happens in-house with one accountable team. Our [role], [role], [role] and [role] work together daily. They've collaborated on [count] projects. When [stage 1 happens], [the next role] [does the next thing] immediately. When [stage 2], [role] is already [doing stage 3]. When [stage 4] begins, it's our team, not [the alternative]." Excerpt: "When installation begins, it's our team, not random subcontractors.". Why: the mechanism shown as a chain of hand-offs makes "in-house" concrete. 509 characters, 70 words.
- `statement.paragraphs[1]`: pattern "The result? No [X]. No [Y]. No [Z]. Your [job] starts and finishes exactly when promised, with [quality]. That's the [Named Method], and it's why we've grown to [scale] by word of mouth alone." 293 characters, 41 words.

### Copy: Owner story

- `split.headline`: pattern "Meet the owner-operator with [years] of hands-on experience (who personally oversees your [job])...". 106 characters, 14 words.
- `split.paragraphs[0]` (first person): pattern "I'm [name], and I've spent over [years] in this industry, from [first role] to [current credential]. I started [business] [years] ago because I saw how [the typical model] fails [the customer]. I knew there had to be a better way: [three principles]." Excerpt: "...from cabinet-making apprentice to registered builder.". Why: a named person with a career arc is the strongest authority signal a small business has. 367 characters, 57 words.
- `split.paragraphs[1]`: pattern "Today we're [licence or registration with its number] with [credential]. We've [count] [outcome]. But we're still owner-operated. I'm personally involved in every project. Your [job] isn't just another job. It's our reputation on the line." Excerpt: "(DB-L 72500)". Why: the licence number is the one detail that cannot be faked. 282 characters, 40 words.

### Copy: Comparison (B, cards)

- `comparison.headline`: pattern "The difference between a [timeframe] dream [category] and a [longer timeframe] nightmare...". 73 characters, 11 words.
- `comparison.us.items[n]`: ten short rows with a Bold lead, pattern "[Bold mechanism], [plain benefit]". Excerpts: "Fixed-price quote, no surprises", "Custom cabinetry made in Melbourne". 24 to 36 characters, leads 9 to 16. Each row is checkable (a timeframe, a place, a licence number).
- `comparison.them.title`: pattern "Typical [trade plural]". 18 characters.
- `comparison.them.items[n]`: pattern "[Bold failure] [plain consequence]", quoting what the bad tradie says. Excerpts: "'Maybe 4 weeks, maybe 4 months'", "Rough sketches and 'trust us'". 25 to 44 characters. The quoted speech is the device: the reader has heard it.

### Copy: Testimonials (B, carousel)

- `testimonials.headline`: pattern "What [city] homeowners say about their [business] experience...". 70 characters, 9 words.
- `testimonials.items[n].headline`: the job type rather than a quote line. Excerpt: "Full Bathroom Renovation". 18 to 27 characters. The template keeps A's pattern (a quote line) as the default and allows the job type.
- `testimonials.items[n].body`: pattern "the customer's own thank-you, naming the from-state and to-state or the people, in quotation marks". Excerpt: "...from a 1980's dark cold space to a bright modern comfortable home.". 128 to 178 characters, 21 to 34 words. B gives no name, suburb or rating; the template's standard still asks for a first name and suburb, because B's unnamed quotes are the weakest proof on the page.

### Copy: Benefits (B, list)

- `benefits.headline`: pattern "From [first step] to [last step] in just [timeframe] (here's exactly how)...". 81 characters, 13 words.
- `benefits.items[n].title`: pattern "[Promise] - [Named principle]" in Title Case. Excerpts: "No Budget Ambush - Fixed Pricing You Can Trust", "One Team, Zero Finger-Pointing". 29 to 47 characters.
- `benefits.items[n].body`: pattern "what we do, why we can (because everything's in-house), what it means for the reader's family in a daily image". Excerpt: "Your kids aren't eating takeaway for four months.". Why: the daily image at the end of each card is what gets repeated to a partner. 202 to 248 characters, 29 to 46 words.

### Copy: Liveable-home split

- `split.headline`: pattern "The [timeframe] system that prevents your home from becoming [the fear]...". 91 characters, 13 words.
- `split.paragraphs[0]`: pattern "What worries you more, [the result] or [living through it]? For most families, it's the latter. [Three sensory pains]. We get it, and we've designed our entire process around [the fix]: [four concrete measures]." Excerpt: "What worries you more - the finished kitchen, or living through the renovation to get there?". Why: names the objection the reader has not said out loud. 382 characters, 59 words.
- `split.paragraphs[1]`: pattern "Most importantly, we stick to our [timeframe]. The fastest way to reduce [pain] is to finish properly and promptly. You're not [the fear] for [long duration]. Just [short duration] of transformation, then a lifetime of [the reward]." 253 characters, 42 words.

### Copy: Materials and suppliers

- `logoGrid.headline`: pattern "Your [surface] will still look flawless [long term] later, not [defect] after [short term]...". 76 characters, 13 words.
- `logoGrid.paragraphs[0]`: pattern "A flawless [space] doesn't just look stunning on handover day. It looks stunning [time 1] when [occasion]. [Time 2] when [occasion]. [Time 3] when [occasion]. That kind of lasting quality starts with one decision: [the material choice], not [the cheap alternative]." 424 characters, 67 words.
- `logoGrid.paragraphs[1]`: pattern "We partner exclusively with [city]'s most trusted suppliers for [five categories]. These aren't [generic alternatives]. They're [what they are]. When we specify a product, we know it'll perform because we've used it [count] times." 415 characters, 60 words.

### Copy: Three steps (B)

- `steps.headline`: pattern "From [first milestone] to [last milestone] in just [timeframe] (here's exactly how)...". 89 characters, 14 words.
- `steps.items[n].title`: pattern "[Deliverable] & [Deliverable]" in Title Case. Excerpts: "Free Consultation & Custom 3D Design", "Swift Installation & Handover". 29 to 36 characters.
- `steps.items[n].body`: pattern "what happens, where, how long, and what the reader holds at the end; the middle step says 'chaos gets prevented here'". Excerpt: "Before your renovation begins, everything's planned and ready.". 226 to 259 characters, 35 to 41 words.

### Copy: Guarantee (B)

- `guarantee.badgeLines`: three lines: "[Outcome]", "in under [timeframe] or we pay you $[penalty]", "Guaranteed". The template draws the badge from these lines.
- `guarantee.headline`: pattern "[Outcome] in under [timeframe] or we pay you $[penalty], guaranteed". 61 characters, 12 words.
- `guarantee.paragraphs`: six short paragraphs, 79 to 274 characters: the promise in one line; the nightmare in one line; what we do instead; the guarantee restated with the penalty; the statutory warranty with its terms in years; a closing line. Excerpt: "...covering structural defects for six years and non-structural defects for two years.". Why: a penalty the business pays plus a statutory cover the law pays is two layers of risk reversal. The terms link ("T&C's Apply*") sits last.

### Copy: Offer and form (B)

- `urgency.line` (B): pattern "STRICTLY LIMITED TO THE NEXT [n] ENQUIRIES IN [month]". 51 characters. B injects the month by script; the template never does, and leaves the line empty unless the client writes a real limit.
- `offerForm.headline`: pattern "Claim your FREE [duration] [consultation] and see exactly how we can deliver your dream [space] in just [timeframe] or less!". 136 characters, 25 words.
- `offerForm.lead`: pattern "Here's just a fraction of what you'll discover in your FREE [consultation]:". 73 characters.
- `offerForm.bullets[n]`: pattern "[Bold deliverable] [plain detail with a timeframe, a value or a protection]". Excerpt lead: "The exact step-by-step process". 99 to 181 characters, leads 30 to 54. The last bullet restates the bonus value "(worth $1800)".
- `form.fields`: name, email, phone, a room select ("What area would you like to renovate?" with three options), a budget select (five ranges, written as the client quotes them), a free-text comments field. Why: the two selects qualify the job before the call without adding typing. 38 and 86 character labels.

### Copy: FAQ

- `faq.headline`: pattern "Everything you're wondering about your [category] (answered honestly)". 89 characters, 11 words.
- `faq.items[n].question`: the partner's question in plain words. Excerpts: "Where do we cook and shower during the renovation?", "How do you guarantee 42 days?". 29 to 50 characters.
- `faq.items[n].answer`: two to four sentences, the first one answers, the rest give the mechanism and a number. Excerpt: "Minor tweaks? Yes. Major changes after materials are ordered? Complicated and costly.". Why: an honest "it's costly" answer buys belief for the rest. 163 to 274 characters, 25 to 43 words.

### Copy: Footer and legal (B)

- Terms: about 2,400 characters in ten numbered headings (eligibility, the free consultation, the completion guarantee, the compensation, pricing and variations, warranty and insurance, campaign availability, client responsibilities, liability, acceptance), each with one to four one-line clauses. B has no privacy policy; the template requires one.

### Page-level voice summary (B)

- Reading level: grade 7 to 8. Headings run long (53 to 147 characters) and nearly all end with an ellipsis; sentences inside paragraphs are short, often two to four words ("No delays. No budget surprises.").
- Specificity: 42 days in 14 headings and paragraphs, $3,000, $1,800, 25 years, 15 years, 60 minutes, $80,000 to $110,000, 20 to 40%, six and two years, hundreds of projects, a licence number.
- Unique mechanism: one named method in quotation marks, defined as "everything in-house with one accountable team", restated in the statement, the comparison, the benefits, the steps and two FAQ answers.
- Villain: "middlemen", "five contractors who blame each other", "'Maybe 4 weeks, maybe 4 months'", "fly-by-night operators".
- Offer stack: free consultation, custom 3D design, fixed-price quote, stated value, plus the penalty guarantee; restated in the hero, the trust panel, the reinforcement line under every CTA, the offer headline and the last bullet.
- Social proof: no rating, no count, no names; four unnamed quotes, 18 supplier logos, one named owner with a licence. The template treats this as the fallback shape for a client with no review profile, not as the standard.
- You to we ratio: about 1 to 1; the owner section and the statement are "we" and "I", the dream, problem, liveable and FAQ sections are "you".
- CTA consistency: one label, uppercase, twelve times, with the same reinforcement line under eleven of them.

---

## Is this client page at the standard?

### Imagery

1. Is every photo the client's own job, with no stock and none of the reference's images?
2. Are there at least seven before and after pairs, each shot from the same spot, height and direction with a fixed landmark in both frames?
3. Does the hero photo read as near white behind the headline at 390 wide, with the subject in the centre third?
4. Do the letter's two photos show the same house from the footpath, before and after?
5. Do at least three photos show the crew working, and none show posed people or customers?
6. Are the bento's seven exteriors shot in clean sky or dusk light with no people?
7. Is the compare slider pair square and shot from exactly the same position?
8. Are all photos unfiltered, with no colour grading, rounded corners or borders?
9. Are the four grid tiles different in each strip (or is the repetition deliberate)?
10. Is there a full-colour logo and a white logo, both transparent?

### Proof

11. Does the review badge show a real rating, count and source, or is the badge turned off?
12. Does each testimonial have a first name, a suburb and state, a star rating and a photo of that job?
13. Does each project tile carry a real suburb name the ads will target?
14. Does the comparison have four "us" rows naming methods and four "them" rows naming failures?
15. Does the guarantee state a term in years and name the defects it covers?
16. Are the videos portrait, 10 to 30 seconds, with a readable poster frame?

### Copy

17. Does the eyebrow qualify the city and the trade as a question?
18. Does the headline carry outcome, timeframe, bonus and a dollar value?
19. Does every number on the page come from the client (no invented statistics)?
20. Are the named methods introduced in the trust strip and repeated in the comparison, benefits and steps?
21. Is the CTA label identical on every button including the submit?
22. Is the urgency line either empty or hand-written with a real limit, with no generated dates or counts?
23. Is every placeholder instruction gone, with no text starting with "Write" or "Describe"?
24. Is the spelling Australian English with no em dashes?
25. Does every paragraph fall within 10% of the slot's target length, or has the layout been re-checked at 390 wide?
26. Are the terms and privacy texts the client's own and current?

### Sections from reference B (only when used)

27. Does the hero band photo (if the band layout is used) show a finished room with no text over it, and does the text still end inside 664 px at 390 wide?
28. Does the owner story name a real person, a real licence or registration number and a career the client has confirmed?
29. Does each before and after grid tile carry a suburb the ads target and a caption that describes that job, with both photos from the same doorway?
30. Are the supplier logos the suppliers' own files, used with permission, and are they suppliers the client actually buys from?
31. Does the FAQ answer the questions customers ask on the phone, with at least one honest limitation?
32. If the reinforcement line is used under the CTAs instead of the review badge, does it state a deliverable and a value the client has put in writing?
33. Does any cash penalty or timeframe guarantee match the client's terms word for word?
34. Is the gallery's collapsed view made of the client's own finished rooms, at least eight, with no composite image?
