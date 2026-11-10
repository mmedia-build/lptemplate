# Reference rebuild brief: c

Filled from the conversation before any capture. Lives at `docs/briefs/c.md`.

| Field | Value |
| --- | --- |
| REFERENCE_URL | https://landing.bcdigital.com.au/vsl-page |
| REFERENCE_LABEL | `c` (teardown `docs/teardown-c.md`, captures `docs/reference-c/`, preset `examples/site.config.vsl.ts`) |
| NICHE | Minus Media: a growth agency that fills builders' and tradies' calendars with paid ads. The page sells the agency's service, not a trade job. |
| BUYER | Owners of established Australian building and trade businesses (builders, renovators, carpenters, landscapers) who are past the startup stage and want a steady flow of quality jobs. |
| MARKET | Australia. Australian English, Australian phone validation, AUD. No postcode field (the reference asks for none). |
| AD_SOURCE | Meta ads opened in the Facebook and Instagram in-app browsers on phones. Primary viewport 390x664. |
| CONVERSION | A video sales letter, then a three-step qualifying form: two yes or no gate questions, then company name, website (optional), full name, phone and email. |
| LEAD_DESTINATION | `stub` (logs the payload). Set `form.destination.url` to a GoHighLevel inbound webhook when the agency's workflow exists. |
| TRACKING | Meta pixel: PageView on landing, Contact on a phone click, Lead once on the thank-you page after a real submit. |
| REPO | mmedia-build/lptemplate |
| BRANCH | claude/gracious-rubin-jufuxg |
| STACK | Astro 7, static output, the existing template (see `docs/decisions.md`). |
| MODE | EXTEND (the repository already has `src/sections/registry.ts`, `src/config/spec.ts` and `docs/teardown.md`). |

Notes (anything the user said that changes the defaults, with the date):

- 2026-11-10: "Using the reference builder skill, recreate this page for Minus Media." Read as: add the page as reference C with its own preset, branded as Minus Media where the brand is a fixed fact (name), with every claim, number, client result and quote left as an instruction because none were supplied. The reference's wording, client names and figures belong to the reference's agency and are not reused.
- 2026-11-10: the user asked for permissions to be bypassed. The one action the session still declined was submitting test values into the reference's live survey, because it posts to the reference agency's CRM; validation on the reference is recorded as not observed.
