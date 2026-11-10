# Reference rebuild brief: c

Filled from the conversation before any capture. Lives at `docs/briefs/c.md`.

| Field | Value |
| --- | --- |
| REFERENCE_URL | https://miratadigital.com.au/holiday-pipeline/bathrooms-kitchens/start |
| REFERENCE_LABEL | c |
| NICHE | A growth agency selling a seasonal lead-generation offer (a booked pipeline of quote requests over a slow period) to renovation businesses. Rebuilt for Minus Media, an agency that runs Meta ads for builders and renovators. |
| BUYER | The owner of an established bathroom and kitchen renovation business (the reference qualifies at a stated monthly or yearly revenue) deciding whether to book a short qualifying call. |
| MARKET | Australia, en-AU spelling, Australian phone validation, AUD. |
| AD_SOURCE | Meta ads (Facebook and Instagram) opened in the in-app browser on phones; primary viewport 390x664. |
| CONVERSION | A short booking form: full name, phone, email, company name and a required qualifying checkbox, then the visitor chooses a call time in a booking calendar. |
| LEAD_DESTINATION | `stub` (the GoHighLevel inbound webhook is set per build in `form.destination.url`; the calendar link in `thankYou.bookingUrl`). |
| TRACKING | Meta pixel: PageView on landing, Lead once on the thank-you page after a real submit, Contact on a phone click when a phone link exists. |
| REPO | mmedia-build/lptemplate |
| BRANCH | claude/compassionate-lovelace-1ouvuw |
| STACK | Astro static output on Vercel, no UI framework, scoped CSS on design tokens (unchanged from references A and B). |
| MODE | EXTEND (`src/sections/registry.ts`, `src/config/spec.ts` and `docs/teardown.md` exist) |

Notes (anything the user said that changes the defaults, with the date):

- 10 November 2026: "recreate this page for Minus Media". Read as: rebuild the reference as reference C of this template, with a preset an agency (Minus Media) can fill for its own booking page. No Minus Media figures, testimonials, guarantee terms or client names were supplied, so every such slot stays an instruction; the preset names the business only.
- 10 November 2026: the user switched the session to bypass permissions; the remote browser still refused a submit on the live form, so validation on the reference is recorded as unverified rather than tested.
