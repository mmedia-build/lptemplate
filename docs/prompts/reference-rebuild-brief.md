# Reference rebuild brief (any niche)

A reusable prompt for turning any high-performing landing page into a modular, placeholder-filled template, or for adding a new reference page to a template that already exists. It is the brief that produced this repository, with the niche, market, conversion path and stack pulled out into a fill-in block so the same rigour applies to a builder, an agency, a clinic, a SaaS page or anything else.

Copy everything below the line into a new Claude Code session. Fill in the block at the top. Leave the rest as it is; the rigidity is the point.

---

## Fill in before sending

```
REFERENCE_URL:        https://example.com/offer            (the page to study)
REFERENCE_LABEL:      c                                    (a, b, c... one letter or short slug; first reference in a fresh repo is "a")
NICHE:                residential builders                 (what the business sells, in five words)
BUYER:                homeowners planning an extension     (who the page converts, in ten words)
MARKET:               Australia, en-AU                     (country and spelling; drives phone and postcode validation, date formats, legal text)
AD_SOURCE:            Meta ads, phone first                (where the traffic comes from and the device it arrives on)
CONVERSION:           lead form + click to call            (form | call | booking | checkout | download; list the fields the business needs)
LEAD_DESTINATION:     webhook (GoHighLevel)                (where a lead goes; "stub" if unknown)
TRACKING:             Meta pixel PageView, Lead, Contact   (events required; add GA4 or others only if asked)
REPO:                 github.com/<org>/<repo>              (fresh, or an existing template built with this brief)
BRANCH:               claude/<name>
STACK:                static Astro, zero-config Vercel     (keep unless there is a reason recorded in decisions)
MODE:                 FRESH | EXTEND                        (FRESH: no template yet. EXTEND: a template built with this brief exists in REPO)
```

## The job

Produce a reusable, modular landing page template for NICHE in MARKET that reproduces the structure, mobile layout mechanics and persuasion sequence of REFERENCE_URL, with every piece of content replaced by an instructional placeholder written to the length of the real content, so that a client page can be built by filling one typed config file and adding images. In EXTEND mode, add REFERENCE_URL as a second (or later) reference to the existing template: tear it down the same way, add the section types and layout variants it introduces, ship a preset config that reproduces its sequence, and keep every existing section and preset working.

Mobile is primary. The page arrives from AD_SOURCE on a phone, usually inside an in-app browser with a 390x664 viewport. Desktop is the second citizen, not the first.

## Hard boundaries

- Rebuild from scratch. Never copy the reference's source, CSS, images, logo, fonts files or wording into the template, the config, the presets or the built output. Short excerpts (a phrase or a sentence) may appear only in the teardown and the exemplar as study notes, each marked as an excerpt.
- No CMS, database, auth, multi-tenancy or admin. One repository is one client. One typed config file is the only thing a client build edits.
- Never generate dates, months, countdowns or remaining-spot counts anywhere in the page. An urgency line exists in config, is empty by default, and is only ever written by hand.
- Never invent numbers, place names, review counts, timeframes, guarantee terms, licence numbers or customer quotes. Placeholders are instructions that name what goes there and how long it is.
- Spelling and phone, postcode and address validation follow MARKET. No em dashes anywhere.
- Record every judgement call in `docs/decisions.md` with one line of reasoning. Do not stop to ask questions; decide, log, and keep going. Report what could not be verified rather than working around it silently.
- Push only to BRANCH. Do not open a pull request unless asked. End commit messages with the attribution lines the session is given.
- Accessibility floor: WCAG AA contrast on all text (fix the reference's failures and log them), 44 px tap targets, 16 px inputs, keyboard access to every interactive component, `prefers-reduced-motion` respected, native semantics (buttons, dialogs, lists) before ARIA.

## Phase 0: access

Confirm the page can be rendered in a real browser with DOM access. If the host is blocked from the build container, use any interactive browser service available to the session and export screenshots and DOM data through it; log the route taken. Do not proceed on a text scrape alone: the measurements in Phase 1 need computed styles and bounding boxes.

## Phase 1: teardown

Render the page with three profiles: a phone at 390x844 (touch, 2x, in-app user agent), the in-app first screen at 390x664, and desktop at 1440x900. From the live DOM read, for every section and for the header, footer, modals and thank-you state: bounding boxes, padding and margins, backgrounds (colour, image, overlay, blur), fonts (family, weight, size, line height, letter spacing, transform) per text role, colours, radii, shadows, grid and flex settings, image natural sizes and rendered boxes, video hosts and players, scripts loaded, form attributes (action, method, field names, types, required, hidden fields, honeypot), validation behaviour on a bad submit, animations and transitions, fixed or sticky elements while scrolling, every CTA and what it targets, every outbound link, and the copy of every text node with its character and word count. Capture full pages at both widths (in clips if the page exceeds the capture limit, then stitch), the first screen, scroll positions, per-section crops at both widths, and every interaction state (carousel swipe, slider drag, accordion, modal, gallery expand, hover on desktop, bad-values submit). Do not submit valid data to a live form.

Write `docs/teardown-<REFERENCE_LABEL>.md` (in FRESH mode `docs/teardown.md`) with: a page summary table (height at both widths, content width, body font, heading sizes, CTA size and style, what is fixed on scroll, CTA count, proof count, phone placement); a section table (number, name, height at 390, screens at 664, height at 1440, background, padding); the first screen at 390x664 and why it matters; what stays fixed on scroll; design tokens (fonts and licence, type scale per role at both widths, colours, spacing, shape, elevation, animation); then one entry per section with Job, Principle, Mechanics (measured, with numbers) and Slots (every text slot with character and word counts, every image with export size and ratio, every data value); then page-level patterns (persuasion sequence, CTA cadence, proof pattern, background rhythm, scripts, third-party weight, copy voice) and accessibility and performance notes on the reference. In EXTEND mode, every entry says in one line how it differs from the earlier references and what the template takes from it.

Write (or in EXTEND mode, extend) `docs/exemplar.md`: the standard a client page is measured against. Part 1 imagery, slot by slot (shot, light, framing, people or not, ratio) with a minimum shot list. Part 2 video (host, length, orientation, playback, poster, captions; sampled frames; what could not be verified). Part 3 copy, slot by slot: the pattern as a reusable formula, a short excerpt, why it works where it sits, and the reference length; then a page-level voice summary (reading level, specificity, named mechanism, offer stack, the customer's problem in their words, you-to-we ratio, CTA consistency). End with a checklist a reviewer runs on a client page. In EXTEND mode add a new part for the new reference and new checklist items; never rewrite the earlier parts.

## Phase 2: build

Stack: STACK unless decisions say otherwise. Static output, zero configuration on the deploy target, no UI framework, no client JavaScript except what the interactive components need. Scoped component CSS driven by design tokens as custom properties, with brand overrides written from config.

Structure:

- `site.config.ts` is the only file a client build edits, typed end to end (`defineConfig`, a `SiteConfig` type, a discriminated union of section configs). Every text slot holds an instruction written to within 10% of the reference content's character count, with a comment above each field naming the section's job, the objection it handles and the asset it needs. Search for `[` finds every placeholder.
- Sections are a registry keyed by type. The page renders `config.sections` in order; `enabled: false` removes one; reordering the array reorders the page; a section can pin its own background tone; otherwise backgrounds are planned from the rendered order so removing or reordering sections still looks deliberate. Spacing is padding only, never margins between sections.
- Every image goes through one component that renders an optimised responsive image when a file is supplied and a labelled grey box at the right aspect ratio when it is not (label: slot id, export size, the shot needed). Alt text comes from config. The hero image is preloaded and never lazy.
- The CTA is one component with one label from config and one line of proof beneath it (review badge when proof exists, a bonus reinforcement line when it does not, nothing when neither), used in every section that carries a CTA. Every CTA scrolls to the form.
- The form has the fields CONVERSION needs, with MARKET validation, inline errors, a honeypot, a loading state, first-touch UTM capture, one place where a lead leaves the page (`submitLead`) that posts a flat JSON body to LEAD_DESTINATION or logs when unset, and a redirect to a real thank-you route that lists what happens next and shows a click-to-call number.
- Tracking: TRACKING events, output only when an ID is configured, with no-op guards; the lead event fires once on the thank-you page after a real submit and never on a refresh or direct visit.
- Interactive components (carousel, compare slider, marquee, accordion, gallery expand, modals, video tiles) are dependency free, work by touch, mouse and keyboard, never trap vertical scroll, and respect reduced motion. Video embeds load nothing until tapped.
- A guide mode (environment flag) overlays each section with its job and persuasion principle; nothing from it reaches the normal build.
- Fonts: if the reference font is open licensed, self-host it as a variable file per subset with a metric-matched fallback face computed from the font's own metrics; otherwise choose the closest open licensed face and log it.
- Legal texts (terms, privacy) live in config and open in native dialogs; no outbound links on the page except the phone number and whatever CONVERSION requires.

In EXTEND mode, add the new reference's sections as new types where the shape is new and as layout variants of existing types where only the shape differs (same job, same slots). Give the new preset's sections stable ids so the content checker can measure them against the new reference's lengths, and ship it as `examples/site.config.<REFERENCE_LABEL or niche>.ts` with every slot an instruction at the measured length. Keep the default config and every earlier preset building and passing.

Mobile-first quality bar at 390 wide, checked, not assumed: the first screen at 390x664 holds the eyebrow, headline, paragraph, CTA and the line beneath it in full; no horizontal overflow at 360 or 430; nothing fixed on scroll unless the reference has it (and then as a config option); text wraps as the reference wraps or better; tap targets 44 px; inputs 16 px; the page is readable with images missing.

## Phase 3: verify

Scripted, repeatable, committed:

- A content checker that measures every text slot in a config against the reference lengths (10% tolerance unless a slot says otherwise), flags em dashes and the wrong spelling for MARKET, skips slots whose section is not in the config, and measures sections with ids against id-specific lengths. Run it on every config and preset.
- A screenshot harness that serves the built site and captures full pages at 390 and 1440, the first screen at 390x664, scroll positions, every section at both widths, the thank-you page, and 360 and 430 overflow checks, writing a JSON report of section heights and first-screen fit.
- A verification script with at least these checks: modularity (sections disabled and reordered, backgrounds re-planned, no two dark sections adjacent); empty proof (badges vanish, layouts close up); form (empty submit errors per required field, bad values rejected, good values redirect, payload logged, honeypot skips the send); tracking (page view on landing, contact on phone click, lead once on thank-you, not again on refresh); modal open and close; slider by touch, keyboard and vertical-swipe scroll; carousel controls; guide mode present only when the flag is set; and, in EXTEND mode, the preset's section order, pinned tones, first-screen fit and every new interaction.
- Lighthouse mobile on the home and thank-you pages: performance and accessibility 90 or above, with the failing audits read and fixed, not explained away.
- Three comparison passes against the reference at 390 and two at 1440, section by section, recording heights built versus reference in `docs/verification.md` and explaining every difference over a few percent.

## Phase 4: document

- `README.md`: what it is, how to launch a client (copy, install, pick a preset, fill the config, add images, colours and fonts, proof and tracking and legal, run, check, deploy, domain, wire the form), what is in the box, the sections and presets, tracking, how to add a section type, licence notes.
- `docs/sections.md`: the catalogue. A table mapping what a client has (reviews or not, matched photo pairs, videos, a named owner, suppliers, a guarantee, recurring questions) to the sections to use, then every type with its job, assets, count range, layouts and what to swap in when the asset is missing.
- `docs/content-spec.md`: generated from the slot spec, every slot with purpose, target length, accepted range, export size, shot and a link to the exemplar pattern.
- `docs/decisions.md`: every judgement call, newest at the bottom.
- `docs/verification.md`: the results above, with the raw outputs committed under `docs/build/`.
- `CLAUDE.md`: the instructions a later session follows to build a client page from this template (inputs required, never-invent rules, the check sequence, the pull request format, what not to edit).

## Final report

End with a report that stands on its own: the stack and why; the section types and presets shipped; Lighthouse scores for every page and preset; the first-screen fit numbers; every deviation from the reference and the reason; every accessibility fix made to the reference's design; what could not be verified and why; and where each deliverable lives.
