# Project instructions for client builds

This repository is the trade landing page template. A client page is built by filling `site.config.ts` and adding images under `src/images/`. Nothing else should normally change. Read `docs/launch-playbook.md` for the process, `docs/sections.md` to choose sections from what the client has, and `docs/content-spec.md` for every slot's target length and shot.

Two presets exist: `site.config.ts` (reference A: a fast trade job with a review profile) and `examples/site.config.renovation.ts` (reference B: a slow, high-value job with no reviews, a named owner, suppliers and a penalty guarantee). Start from the closer one; copy the renovation preset over `site.config.ts` when it fits. Sections from either can be mixed; keep the `b-` ids and the split ids (`dream`, `problem`, `owner`, `liveable`) so the content checker measures them correctly.

## When asked to build a client page

1. Inputs you need before writing anything: the intake call transcript or notes (see `docs/intake-brief.md`), the client's review figures, the offer and bonus with its dollar value, the guarantee terms, the suburbs the ads target, and the photo and video files. For the renovation preset also: the owner's name and licence number, the supplier marks with permission, the budget bands, and the questions customers ask on the phone. If any of these are missing, list what is missing and fill what you can, or drop the section that needs it (`docs/sections.md` says what to use instead); never invent numbers, suburbs, review counts, timeframes, guarantee terms, licence numbers or customer quotes.
2. Write the copy from the intake material against `docs/exemplar.md` (patterns and standard) and `docs/content-spec.md` (lengths). Australian English, no em dashes, plain sentences, second person. Keep every slot inside its accepted range; the layout at 390 wide depends on it.
3. Replace every instruction in `site.config.ts`. Search for `[` to find bracketed placeholders. The CTA label is set once in `cta.label`.
4. Place images: copy the client's files into `src/images/<client>/`, export at the sizes in `docs/content-spec.md`, and reference them by file name. Match before and after pairs by framing. Leave a slot empty rather than using a stock or reference image.
5. Set `proof` from the client's real review profile (or leave empty to hide badges), `tracking.metaPixelId` from the client's Meta Business Manager, `legal.terms` and `legal.privacy` from the client's documents, and `form.destination.url` from the GoHighLevel inbound webhook (see `src/lib/submit-lead.ts`). `urgency.line` stays empty unless the client has written a real limit.
6. Run, in order: `npm run check:content`, `npm run build`, `npm run verify`, `npm run shoot`, `npm run lighthouse`. Fix anything that fails. Look at `docs/build/mobile-390x664-first-screen.png` and confirm the eyebrow, headline, paragraph, CTA and badge all fit.
7. Open a pull request titled "Client: <business name>" with the Lighthouse scores, the verify summary and the preview screenshots listed, and anything missing from the inputs called out as a checklist.

## Rules

- Do not edit `src/` or `scripts/` for a client build unless the template has a bug; fix the bug in a separate PR against the template repository.
- Do not change `docs/teardown.md`, `docs/exemplar.md` or `docs/reference/`; they are the standard, not client material.
- Never write dates, months or remaining-spot counts into the page.
- Never paste wording from `docs/teardown.md` or `docs/exemplar.md` excerpts into client copy.
- Keep `seo.noindex` true.
- Commit images with the config; Vercel builds from the repository.
