# Reference rebuild brief: c

Filled from the conversation before any capture. Lives at `docs/briefs/c.md`.

| Field | Value |
| --- | --- |
| REFERENCE_URL | `https://kingkong.co/30-minute-strategy-session/` (the tracking query string from the ad click was dropped) |
| REFERENCE_LABEL | `c` (preset and niche slug: `agency`) |
| NICHE | A marketing agency selling a free strategy call |
| BUYER | Business owners who clicked a Meta ad and want more leads or sales |
| MARKET | Australia, en-AU (the reference serves several countries; the template keeps Australian phone validation and spelling) |
| AD_SOURCE | Meta ads, phone first, in-app browser (primary viewport 390x664) |
| CONVERSION | Booking: a one-question-per-screen qualifying quiz (name, email, qualifying answers, then last name, mobile, business name, website), then a calendar |
| LEAD_DESTINATION | Webhook (GoHighLevel inbound webhook); `stub` until the URL is supplied. The calendar is an embed URL on the thank-you route |
| TRACKING | Meta pixel PageView, Contact, Lead (once, on the thank-you route), plus custom events for quiz start, each step, the email step and a qualified lead |
| REPO | `mmedia-build/lptemplate` |
| BRANCH | `claude/pensive-hawking-aiq0s5` |
| STACK | Static Astro, zero-config Vercel (unchanged) |
| MODE | EXTEND |

Notes (anything the user said that changes the defaults, with the date):

- 2026-11-11: "This funnel here, I love it. The minor details are important, ensure the nuance is captured. Run the reference skill to recreate for minus media." Read as: add the page as reference C, keep every small behaviour (progress dots, personalised prompts, auto-advance, pills, graded scale, loader, exit prompt, disqualification), and ship a Minus Media configuration of it beside the instruction preset.
- 2026-11-11: Minus Media facts were read from the agency's own Notion workspace and GoHighLevel sub-account (read only). Google Drive was not reachable. What could not be verified is listed in `docs/verification.md` and left as a bracketed placeholder.
