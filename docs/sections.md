# Section catalogue

Every section type the template can render, what it is for, what it needs from the client, and what to use instead when that asset is missing. A page is the `sections` array in `site.config.ts`: any type, any order, any number of times (within the ranges below). `enabled: false` drops a section; the backgrounds re-plan from the rendered order. `tone: 'light' | 'muted' | 'dark'` pins a background; `brand.darkTone` decides whether dark means plaster texture (reference A) or near-black with white text (reference B).

Two presets show the two reference sequences: `site.config.ts` (reference A, a concreter: fast trade job, strong review profile) and `examples/site.config.renovation.ts` (reference B, a renovator: slow high-anxiety job, no reviews, a named owner, suppliers, a penalty guarantee). Start from the one closer to the client and swap sections in from the other.

## Choosing sections from what the client has

| The client has | Use |
| --- | --- |
| A real review rating and count | `proof` filled in, `cta.under: 'auto'`; the badge sits under every CTA. Testimonials in the `rows` layout with name, suburb and stars. |
| No review profile | `proof` empty and `cta.reinforcement` set; the bonus line sits under every CTA. Testimonials in the `carousel` layout with job type and quote, or drop the section. Add `split` (owner story) and `logoStrip` or `logoGrid` for authority instead. |
| Seven or more matched before and after pairs | `beforeAfter` (marquee) near the top. |
| Three to six matched pairs with suburbs | `beforeAfterGrid` (one slider per job, labelled). |
| One matched pair | `futurePacing` (one slider beside the "imagine" copy). |
| No matched pairs | Drop all three; use `gallery` and `photoGrid` for proof. |
| Portrait phone videos by suburb | `projects`. |
| Lots of finished-job photos, no videos | `gallery` (collapsed wall) near the top and `photoGrid` strips between arguments. |
| An owner willing to be named, with a licence number | `split` with id `owner`, first person. |
| A written customer problem story | `letter` (reference A's letter device) or `split` with id `problem` on a dark tone (reference B). |
| A named method with three or four parts | `trustStrip` (strip variant), `comparison`, `benefits`, `steps`: the method repeats across them. |
| An offer that is the whole pitch (timeframe, price, penalty) | `trustStrip` (panel variant) restating the offer as facts under the hero; `statement` for the method. |
| Supplier relationships with permission to show marks | `logoStrip` under the hero, `logoGrid` where durability doubt surfaces. |
| A guarantee with a term in years | `guarantee`. With a cash penalty and a statutory warranty, use the six-paragraph shape with `termsLink: true`. |
| No guarantee | Drop the section. Never write a soft one. |
| Recurring phone questions | `faq` after the form. |

## The types

Columns: job on the page; assets and copy it needs; count range; what to do when the asset is missing.

### hero

Job: qualify, state the outcome with a timeframe and a stacked bonus or a penalty, CTA on the first screen. Needs: eyebrow, headline, paragraph, one wide finished-job photo. `imageLayout: 'cover'` (A) washes the photo behind the text; `'band'` (B) puts the photo under the CTA on phones. Always first; one per page. Missing photo: the grey slot renders; a band hero without a photo still lays out.

### trustStrip

Job: handle fast objections before the first scroll. Needs: 3 to 8 icon and label pairs (`variant: 'strip'`, A) or 3 to 6 (`variant: 'panel'`, B, charcoal panel). Inherits the tone above it. Missing: drop it; the hero's bottom padding closes the gap.

### logoStrip

Job: borrowed authority in the two seconds after the hero. Needs: 4 to 24 supplier or brand marks (the suppliers' own files, with permission). Inherits the tone above. Missing: drop it.

### gallery

Job: a wall of finished work that looks endless, with a "see more" tap. Needs: 6 to 15 square finished-job photos (9 or 12 fill the rows) and a button label. Full bleed; inherits the tone above. Missing: use `photoGrid` with fewer photos.

### beforeAfter

Job: prove transformation in the first swipe (marquee of pairs). Needs: 3 to 12 matched portrait pairs. Inherits the tone above. Missing or fewer than three: use `beforeAfterGrid` or `futurePacing`.

### beforeAfterGrid

Job: one draggable pair per job, labelled with the suburb. Needs: 2 to 9 matched 5:4 pairs, a label and a caption each. Missing captions: use the room type alone.

### letter

Job: the visitor's own experience in a letter, then the reframe. Needs: headline, salutation, 1 to 4 paragraphs, 1 or 2 landscape photos. Missing photos: the slots render grey; the copy still works.

### split

Job: one argument beside photos; four uses on reference B (dream outcome, problem, owner story, liveable home). Needs: headline, 1 to 4 paragraphs, 1 or 2 landscape photos, `imageSide`. Set `tone: 'dark'` for the problem variant. Give each split an id (`dream`, `problem`, `owner`, `liveable`) so the content checker measures it against the right lengths. Missing photos: one grey slot still reads; drop to a `statement` if there is no photo at all.

### statement

Job: the method in full, centred, no photo in the body, optional photo fading in at the foot. Needs: headline, 1 to 4 paragraphs. Missing foot photo: leave `footImage` out; the section ends with its padding.

### projects

Job: suburb-labelled video proof. Needs: 2 to 8 portrait clips (YouTube, Vimeo, Wistia or MP4) or posters, each with a suburb. Missing videos: posters alone render with a play glyph; no posters: drop it.

### photoGrid

Job: proof density between arguments. Needs: 2 to 12 square photos; `columns` sets the desktop row (default up to four). Inherits the tone above. Reference B's six-photo set is `columns: 3`.

### comparison

Job: inoculate against the cheaper quote. Needs: headline, 2 to 10 rows per side, the white logo (or the business name). `layout: 'columns'` (A, joined accent and white columns, four rows) or `'cards'` (B, two cards with header plates, ten short rows). Prefers the dark tone in the planner. Missing white logo: the name renders in white.

### testimonials

Job: customers say it. Needs: 1 to 6 reviews with a photo each; `layout: 'rows'` (A) wants headline, body, name, suburb, rating; `'carousel'` (B) needs headline (job type) and body, the rest optional. Missing names: the carousel hides them; the standard still asks for a first name and suburb.

### benefits

Job: the method as named promises. Needs: headline, 3 to 6 items with icon, title and body; `layout: 'grid'` (A) also needs one landscape crew photo; `'list'` (B) needs no photo. Prefers the dark tone.

### futurePacing

Job: "imagine" copy beside one drag slider. Needs: headline, 1 to 4 paragraphs, one matched square pair. Missing pair: drop it and keep the copy in a `split`.

### bentoGallery

Job: a magazine grid of finished exteriors. Needs: 3 to 9 photos (two wide). Missing: use `photoGrid` or `gallery`.

### logoGrid

Job: durability promise with the suppliers' marks on tiles. Needs: headline, 1 to 4 paragraphs, 4 to 24 marks, optional foot photo. Missing marks: drop it; keep the durability paragraphs in a `statement`.

### steps

Job: the process as three small steps. Needs: headline, 2 to 6 steps with title, body and landscape photo; `layout: 'rail'` (A, circles on a dashed line) or `'rows'` (B, muted cards). Missing photos: the slots render grey.

### guarantee

Job: risk reversal with a name, a badge and a term. Needs: badge lines (two, optionally three), headline, optional sub-headline, 1 to 6 paragraphs; optional decorative drawing; `termsLink: true` adds a button to the terms modal. Prefers the dark tone. Missing guarantee: drop it.

### offerForm

Job: convert. Needs: headline, bundle image, optional lead line, 2 to 6 bullets, the form (1 to 8 fields: text, email, tel, postcode, textarea, select with options), the reinforcement line. One per page, last or second last; its id is the CTA target. `urgency.line` stays empty unless hand-written.

### faq

Job: the partner's questions, answered honestly, for the visitor who scrolled past the form. Needs: headline, 3 to 10 question and answer pairs. Usually after the form. Missing: drop it.

## Lengths and shots

Every slot's target length, accepted range and shot is in `docs/content-spec.md`. The copy patterns are in `docs/exemplar.md` (Parts 3 and 4). `npm run check:content` measures `site.config.ts`; pass another config path to measure a preset: `node --experimental-strip-types scripts/check-content.mjs examples/site.config.renovation.ts`.
