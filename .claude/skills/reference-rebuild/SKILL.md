---
name: reference-rebuild
description: Turn any high-performing landing page into a modular, placeholder-filled template (one typed config, swappable sections, measured lengths, scripted verification), or add a new reference page to a template already built this way. Use this whenever the user gives a landing page URL and wants it "rebuilt", "torn down", "templated", "cloned as a template", "reproduced with placeholders", wants "another reference" or "another niche" added to an existing landing page template, or asks for a reusable landing page for a trade, builder, agency, clinic, SaaS or any other niche based on a page that already converts. Also use it when the user says "repeat the process you did for the first landing page" or similar. Do not use it for filling an existing template with one client's content (that is a client build, covered by the repository's CLAUDE.md).
---

# Reference rebuild

Rebuild a reference landing page as a reusable template, or extend an existing template with a new reference. The work runs in four phases: access, teardown, build, verify and document. Each phase has a specification in `references/`; read the one for the phase you are in before starting it, because the details are what keep the template faithful to the reference and the rigour the same from one niche to the next.

Why this much structure: a landing page that converts does so because of hundreds of small, measured decisions (what fits the first phone screen, how long each paragraph is, where the proof sits under each button). A template that reproduces the look but not the measurements loses the thing that made the page work. The brief below makes every measurement explicit so a later client page can be checked against it.

## Step 1: settle the brief

Before any capture, fill the brief block. Take the values from the conversation; ask only for what cannot be inferred, and ask all of it in one go. Copy `assets/brief-template.md` into the repository as `docs/briefs/<label>.md` with the values filled in, so the brief is on record.

| Field | What it is |
| --- | --- |
| `REFERENCE_URL` | The page to study. |
| `REFERENCE_LABEL` | One letter or short slug: `a` for the first reference in a fresh repository, then `b`, `c`, or a niche slug. Names the teardown file, the capture folder and the preset. |
| `NICHE`, `BUYER` | What the business sells and who the page converts, a line each. |
| `MARKET` | Country and spelling variant. Drives phone, postcode and address validation, legal text and date formats. |
| `AD_SOURCE` | Where traffic comes from and on what device. Sets the primary viewport (in-app browsers on phones: 390x664). |
| `CONVERSION` | Form, call, booking, checkout or download, with the fields the business needs. |
| `LEAD_DESTINATION` | Where a lead goes (a webhook, a CRM) or `stub`. |
| `TRACKING` | Pixel events required. |
| `REPO`, `BRANCH`, `STACK` | Where the work lives. Static output on a zero-configuration host unless a decision says otherwise. |
| `MODE` | `FRESH` (no template yet) or `EXTEND` (a template built with this skill exists in the repository). |

Detect `MODE` yourself: if the repository has `src/sections/registry.ts`, `src/config/spec.ts` and `docs/teardown.md`, it is `EXTEND`.

## Step 2: hard boundaries

These hold in every phase and every niche. They are the conditions under which a rebuilt page is legal and honest, so they are not negotiable from inside a session.

- Rebuild from scratch. Never copy the reference's source, CSS, image files, logo, font files or wording into the template, the config, the presets or the built output. Short excerpts (a phrase or a sentence) may appear only in the teardown and the exemplar, as marked study notes.
- No CMS, database, auth, multi-tenancy or admin. One repository is one client. One typed config file is the only thing a client build edits.
- Never generate dates, months, countdowns or remaining-spot counts. An urgency line exists in config, empty by default, only ever written by hand.
- Never invent numbers, place names, review counts, timeframes, guarantee terms, licence numbers or customer quotes. Placeholders are instructions that name what goes there and how long it is.
- Spelling and validation follow `MARKET`. No em dashes anywhere.
- Record every judgement call in `docs/decisions.md` with one line of reasoning. Do not stop to ask questions mid-build; decide, log, keep going. Report what could not be verified rather than working around it silently.
- Push only to `BRANCH`. Do not open a pull request unless asked.
- Accessibility floor: WCAG AA contrast (fix the reference's failures and log them), 44 px tap targets, 16 px inputs, keyboard access to every interactive component, reduced motion respected, native semantics before ARIA.

## Step 3: run the phases

Work through them in order. Each is a checklist in its reference file; the file says what to produce and why each item matters.

1. **Access** (`references/phase-1-teardown.md`, first section). Confirm the page renders in a real browser with DOM access. A text scrape is not enough: the teardown needs computed styles and bounding boxes. If the build container cannot reach the host, use an interactive browser service the session has and export captures through it; log the route.
2. **Teardown** (`references/phase-1-teardown.md`). Measure the page at 390x844, 390x664 and 1440x900, capture everything, write `docs/teardown-<label>.md` (or `docs/teardown.md` in `FRESH` mode) and write or extend `docs/exemplar.md`.
3. **Build** (`references/phase-2-build.md`). The architecture that makes the template modular, the mobile-first quality bar, and the `EXTEND` rules for adding section types, layout variants and a preset.
4. **Verify** (`references/phase-3-verify.md`). The scripted checks, the screenshot harness, Lighthouse thresholds and the comparison passes.
5. **Document and report** (`references/phase-4-document.md`). The document set and the final report format.

Track the phases as tasks so a long session does not lose its place.

## What good looks like

- At 390x664 the first screen holds the eyebrow, headline, paragraph, CTA and the line beneath it in full, with a margin like the reference's.
- Every text placeholder is within 10% of the reference content's character count, enforced by a script, and every image slot is a labelled grey box at the right ratio until a file arrives.
- Any section can be disabled or reordered and the page still looks deliberate.
- The verification script, the screenshot harness and Lighthouse all pass, and the results are committed.
- A reader of `docs/teardown-<label>.md` could rebuild the page without seeing it, and a reader of `docs/exemplar.md` could brief a photographer and a copywriter without seeing it.

## Delivery

End with the report in `references/phase-4-document.md`, commit with clear messages, and push to `BRANCH`. If a preview is useful and a hosting tool is available, publish the placeholder build and give the link.
