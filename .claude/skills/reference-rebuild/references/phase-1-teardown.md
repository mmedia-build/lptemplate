# Phase 1: access and teardown

## Access

Render `REFERENCE_URL` in a real browser with DOM access. The measurements below come from `getComputedStyle` and `getBoundingClientRect`, so a text or HTML scrape cannot substitute. If the host is blocked from the container's network, use an interactive browser service available to the session (one that runs code against a live page) and export screenshots as base64 and DOM data as JSON through its output; chunk anything over the output limit. Log the route in `docs/decisions.md`. Do not submit valid data to a live form; a bad-values submit to observe validation is fine.

## Profiles

Measure with three browser profiles:

- Phone: 390x844, touch, device scale 2, an in-app user agent for `AD_SOURCE` (for Meta traffic, an Instagram in-app string).
- First screen: 390x664, the viewport an in-app browser leaves after its chrome.
- Desktop: 1440x900, scale 1.

Scroll the whole page once before measuring so lazy images and reveal animations have fired, then return to the top.

## What to read from the DOM

For the header, every section (top-level blocks in document order, including bare image blocks between sections), the footer, every modal and the thank-you state:

- Bounding box, padding, margin, background colour, background image or blur layer, overlay.
- Per text role: font family and licence, weight, size, line height, letter spacing, text transform, colour, alignment, max width, and the character and word count of the content.
- Images: natural size, rendered box, object fit, radius, shadow, lazy or eager, alt.
- Videos: host, player, aspect, autoplay, mute, poster, captions, length when readable.
- Grid and flex settings, gaps, column counts at both widths.
- Buttons and links: href or target, size, padding, colours, radius, shadow, transition, hover state on desktop.
- Form: action, method, every field (name, type, placeholder, required, autocomplete, inputmode, options), hidden fields, honeypot, validation messages and styling on a bad submit, the success state.
- Scripts and third-party hosts loaded; animations and keyframes; reduced-motion rules; anything fixed or sticky while scrolling.
- Every CTA and what it scrolls to; every proof element (badges, ratings, counts, logos); every outbound link.

## Captures

Save under `docs/reference-<label>/` (`docs/reference/` in `FRESH` mode):

- Full page at 390 and 1440 (capture in clips of about 4,500 px if the page exceeds the browser's capture limit, then stitch).
- First screen at 390x664, and scroll positions (0, about 1,500, about 6,000, near the end).
- Per-section crops at both widths, named by index and section (`mobile-390-s06-comparison.png`).
- Every interaction state: carousel before and after swipe, slider before and after drag, accordion open and closed, gallery expand, modal open, desktop CTA hover, bad-values submit.
- The copy inventory as JSON: every text node with its tag, length and word count, grouped by section.

## The teardown document

Write `docs/teardown-<label>.md` (`docs/teardown.md` in `FRESH` mode). Reference wording appears only as short excerpts marked as such. Structure:

1. **Header**: URL, what the business is, capture date, how the measurements were taken, where the raw material lives.
2. **Page summary table**: height at both widths with screens at 664, content width and side padding, body font, heading sizes, CTA size and style, the line under every CTA, what is fixed on scroll, navigation, outbound links, CTA count, proof count, phone placement.
3. **Section table**: number, name, height at 390, screens at 664, height at 1440, background, padding at both widths.
4. **Mobile first screen**: what is visible at 390x664 before scrolling, with pixel positions, and why that matters for the template.
5. **What stays fixed on scroll.**
6. **Design tokens**: fonts and licence, a type scale table per role at both widths, colours, spacing, shape, elevation, animation.
7. **One entry per section** with four parts: Job (what it does for the visitor), Principle (the persuasion mechanism), Mechanics (measured layout at both widths, numbers throughout), Slots (every text slot with character and word counts, every image with export size and ratio, every data value and option list).
8. **Page-level patterns**: the persuasion sequence as a chain, CTA cadence, proof pattern, background rhythm, which sections share one component, scripts, third-party weight, copy voice.
9. **Accessibility and performance notes on the reference**: what fails and what the template does instead.

In `EXTEND` mode every section entry says in one line how it differs from the earlier reference and what the template takes from it (a new type, a layout variant, an option), and the page-level patterns section compares the two persuasion sequences.

## The exemplar

`docs/exemplar.md` is the standard a client page is measured against. Client copy is never written by rewording its excerpts; the excerpts show the pattern.

- **Part 1, imagery**: slot by slot, the shot, light, framing, whether people appear, the ratio; a page-level summary (counts, mix, colour families, treatments); a minimum shot list with counts.
- **Part 2, video**: a table per embed (host, format, length, orientation, playback, poster, captions, what sampled frames show), what could not be verified, and the standard for a client's clips.
- **Part 3, copy**: slot by slot, the pattern as a reusable formula with bracketed parts, a short excerpt, why it works where it sits, the reference length; then a page-level voice summary (reading level, specificity, named mechanism, offer stack, the customer's problem in their words, you-to-we ratio, CTA consistency).
- **Checklist**: the questions a reviewer runs on a client page, numbered, grouped by imagery, proof and copy.

In `EXTEND` mode, add a new part for the new reference (imagery notes, copy patterns per new or reshaped slot, a voice summary) and new checklist items under their own heading. Never rewrite the earlier parts; the earlier reference is still the standard for the sections it defined.
