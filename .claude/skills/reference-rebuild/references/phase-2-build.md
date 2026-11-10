# Phase 2: build

## Stack

`STACK` unless a logged decision says otherwise: static output, zero configuration on the deploy host, no UI framework, no client JavaScript beyond the interactive components. Scoped component CSS driven by design tokens as custom properties, with brand overrides written from config onto the root element so a client never edits a stylesheet.

## Architecture (the parts that make it a template)

- **One typed config** (`site.config.ts`) is the only file a client build edits: `defineConfig`, a `SiteConfig` type, a discriminated union of section configs. Every text slot holds an instruction written to within 10% of the reference content's character count. A comment above each field names the section's job, the objection it handles and the asset it needs. Searching for `[` finds every placeholder.
- **A section registry** keyed by type. The page renders `config.sections` in order; `enabled: false` removes a section; reordering the array reorders the page; `tone` pins a section's background; otherwise backgrounds are planned from the rendered order (a hero owns its photo; strips inherit the tone above; "mechanism" sections prefer the dark tone but never two in a row; every third light section in a run goes muted) so removing or reordering still looks deliberate. Spacing is padding only, never margins between sections, so gaps cannot double or collapse.
- **One image component** renders an optimised responsive image when a file is supplied and a labelled grey box at the right ratio when it is not (label: slot id, export size, the shot needed). Alt text comes from config. The hero image is preloaded with high priority and never lazy.
- **One CTA component**: one label from config, overridable per section, one line of proof beneath it (a review badge when proof exists, a bonus reinforcement line when it does not, nothing when neither), scrolling to the form.
- **The form**: the fields `CONVERSION` needs (text, email, tel, postcode, textarea, select with options), `MARKET` validation with inline errors, a honeypot, a loading state, first-touch UTM capture, one function where a lead leaves the page that posts a flat JSON body to `LEAD_DESTINATION` or logs when unset, and a redirect to a real thank-you route listing what happens next with a click-to-call number.
- **Tracking**: `TRACKING` events, output only when an ID is set, no-op guarded; the lead event fires once on the thank-you page after a real submit, never on refresh or direct visit.
- **Interactive components** (carousel, compare slider, marquee, accordion, gallery expand, modals, video tiles): dependency free, touch, mouse and keyboard, never trap vertical scroll, respect reduced motion. Video embeds load nothing until tapped.
- **Guide mode**: an environment flag overlays each section with its job and principle; nothing from it reaches the normal build.
- **Fonts**: an open-licensed reference font is self-hosted as a variable file per unicode subset with a metric-matched fallback face computed from the font's own metrics (size-adjust from average character width, ascent and descent overrides). A non-open font gets the closest open face, logged.
- **Legal**: terms and privacy in config, opened in native dialogs. No outbound links except the phone number and whatever `CONVERSION` needs.
- **Design tokens**: the reference's measured values as custom properties (colour roles, type scale per width, spacing, shape, elevation, controls), with the mobile values as the base and desktop values in one media query.

## Mobile-first quality bar at 390 wide (checked, not assumed)

- The first screen at 390x664 holds the eyebrow, headline, paragraph, CTA and the line beneath it in full.
- No horizontal overflow at 360 or 430.
- Text wraps as the reference wraps or better; the narrowest column still fits whole words.
- Tap targets 44 px, inputs 16 px (stops iOS zoom), focus rings visible.
- The page reads correctly with every image missing.
- Nothing fixed on scroll unless the reference has it, and then as a config option.

## EXTEND mode

When adding a reference to an existing template:

- A section whose job and slots are new becomes a new type (component, content type, union member, registry entry, planner metadata, guide note, slot spec entries).
- A section with the same job and slots but a different shape becomes a `layout` or `variant` option on the existing type, so a client can switch shape without re-keying content.
- Optional fields on existing types stay optional and default to the earlier behaviour, so every earlier config and preset still builds unchanged.
- The new reference's sequence ships as a preset, `examples/site.config.<label or niche>.ts`, with every slot an instruction at the measured length and brand values from the new reference (contrast-corrected where it failed). Give its sections stable ids (`<label>-hero`, `<label>-comparison`, and meaningful ids for repeated types such as the four uses of a split section) so the content checker measures them against the new reference's lengths.
- The content checker skips slots whose section is not in a config and measures id-specific slots against id-specific lengths, so one spec file serves every preset and any mixed page.
- Fonts, dark tone looks and CTA proof styles become brand options, not forks.
- Write a section catalogue (`docs/sections.md`) or extend it: a table from "what the client has" to "which sections to use", then every type with its job, assets, count range, layouts and what to swap in when the asset is missing.

## Judgement calls that recur

Log each one in `docs/decisions.md`. The common ones: a reference colour that fails contrast (keep it for decoration, derive a darker shade for text and button surfaces); a reference tap target under 44 px (enlarge it); reference inputs under 16 px (use 16); composite image sprites (take individual images with alt text); script-injected city, month or year (never; the urgency line is hand-written or empty); a success popup instead of a thank-you route (use a route, so the lead event has a page to fire on); a hero photo lazy loaded (preload it); a carousel library (a native scroll-snap row); a missing reduced-motion rule (add one).
