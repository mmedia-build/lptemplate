# Phase 3: verify

Every check is a script committed to the repository, so the same verification runs on every client page later. Raw outputs are committed under `docs/build/` (and `docs/build/<preset>/` for presets).

## Content checker

`scripts/check-content.mjs`: reads a config (the default or a path argument) and the slot spec; measures every text slot against the reference length with a 10% tolerance unless the slot declares another; flags em dashes and the wrong spelling for `MARKET`; skips slots whose section is not in the config; measures sections with ids against id-specific lengths when the spec has them; treats the urgency line and the reinforcement line as optional. Exits non-zero on any failure. Run it on every config and preset.

## Screenshot harness

`scripts/shoot.mjs`: serves the built site, forces reveal animations visible and disables smooth scrolling (captures are about layout), then captures full pages at 390 and 1440, the first screen at 390x664, scroll positions, every section at both widths, the thank-you page, and overflow checks at 360 and 430. Writes `report.json` with section heights at both widths, first-screen element positions and visibility, and any overflowing elements. Takes an output folder and a `--dist` argument so presets can be shot into their own folder.

## Verification script

`scripts/verify.mjs` builds fixtures into separate output folders and checks at least:

- Modularity: several sections disabled (one of them dark) and two reordered; the disabled ones are absent, the order is right, backgrounds re-plan, no two dark sections are adjacent.
- Empty proof: with the rating and count cleared, no badge renders anywhere and CTAs remain.
- Form: inputs are 16 px with the right types, inputmodes and autocomplete; empty submit shows one error per required field and stays on the page; bad values (email, phone, postcode, short text) are rejected; good values (including a landline with brackets and spaces) redirect to the thank-you page with the payload logged; a filled honeypot skips the send.
- Tracking: page view queued on landing, contact on a phone click, lead once on the thank-you page after a submit, not again on refresh.
- Tap targets: buttons and phone links at least 44 px.
- Modal opens and closes (button and Escape); slider moves by touch and keyboard and a vertical swipe still scrolls the page; carousel controls move the track.
- Guide mode: notes present only when the flag is set.
- In `EXTEND` mode, the preset: section order, pinned tones, font preload and dark tone attribute, proof line style, select fields with options, first-screen fit, every new interaction (gallery expand, accordion single-open and panel heights, grid of sliders), select validation, and a full submit reaching the thank-you page.

Print PASS or FAIL per check and write `docs/build/verify-report.json`.

## Lighthouse

`scripts/lighthouse.mjs` runs mobile Lighthouse (simulated 4G) against the served build for `/` and the thank-you route, with `--dist` and `--tag` arguments for presets. Performance and accessibility must be 90 or above. Read the failing audits and fix the cause (contrast, tap target size, label mismatch, lazy hero); do not explain them away. SEO scoring low because the page is intentionally `noindex` is the one accepted failure; say so.

## Comparison passes

Three passes at 390 and two at 1440 against the reference, section by section, looking at the built crops beside the reference crops. Record in `docs/verification.md` a table of built height versus reference height per section at both widths, the first-screen numbers, and a sentence for every difference over a few percent (placeholder length, a slot without a file, a deliberate deviation).

## Browser coverage

Chromium is the baseline. Run WebKit and Firefox when the environment allows; when it does not, say so in the report as unverified rather than skipping silently.
