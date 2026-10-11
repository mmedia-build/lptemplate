# Launch playbook

The repeatable pathway from "new client" to "ads live", using this template with a Claude Code session per client, Vercel previews for approval and GoHighLevel for leads. One repository per client. Typical elapsed time is five working days, most of it waiting on the client for assets and sign-off.

## One-time setup (do once, not per client)

1. Make this repository a GitHub template: Settings, tick "Template repository". New client repos are created with "Use this template", which copies files without history.
2. Connect Vercel to the GitHub organisation once (Vercel, Add New Project, Import). After that every client repo imports in two clicks.
3. In GoHighLevel, build one workflow snapshot named "Landing page lead" with an Inbound Webhook trigger, Create/Update Contact, Add Tag, pipeline stage and the notification you want. Save it as a snapshot so each client sub-account gets the same workflow.
4. Keep the intake brief (`docs/intake-brief.md`) as your call script.

## Per client

### Day 1: intake

1. Create the client repository from the template. Name it `lp-<client-slug>`.
2. Run the intake call with `docs/intake-brief.md`. Record it. Get the transcript into a file (for example `intake/transcript.md` in the client repo, or your transcript tooling's output).
3. Send the client the asset list from the bottom of the intake brief. Give them a shared folder to drop photos and clips into.
4. In GoHighLevel: create or open the client sub-account, load the "Landing page lead" snapshot, copy the Inbound Webhook URL from the workflow.
5. From the client's Meta Business Manager: copy the pixel ID.

### Day 2: build

6. Start a Claude Code session in the client repository. Give it the transcript, the review figures, the webhook URL, the pixel ID, the legal documents and the asset folder. The project's `CLAUDE.md` tells it the rest: write copy to the content spec and exemplar, place images, run the checks, open a pull request.
7. Review the pull request: read every slot against the "Is this client page at the standard?" checklist at the end of `docs/exemplar.md`. Anything invented (a number, a suburb, a quote) gets removed, not improved.
8. Import the repository into Vercel (first push). Vercel builds the PR branch and posts a preview URL on the pull request.

### Day 3: client approval

9. Send the client the Vercel preview URL and ask them to open it on their phone. Ask three questions: is every number true, are these your photos and your words, and would you be happy for a customer to see it. Collect changes in one message, not a trickle.
10. Apply changes in the same Claude session or by editing `site.config.ts`, push, and the preview updates. Repeat until the client writes "approved".
11. Merge the pull request to `main`. Vercel deploys production.

### Day 4: wire and test

12. Add the custom domain in Vercel (Project, Settings, Domains), usually `offer.<clientdomain>.com.au`, and have the client's DNS host add the CNAME Vercel shows. Wait for the certificate.
13. Submit the live form once with your own details. Confirm in GoHighLevel: contact created, phone in E.164, tag applied, notification received. Map any field that did not land using the sample payload GHL captured.
14. Open the Meta Events Manager test tool, load the page, confirm PageView; tap the phone number, confirm Contact; submit the form, confirm one Lead on the thank-you page. Refresh the thank-you page and confirm no second Lead.
15. Run `npm run lighthouse` against the production URL if you want a recorded score with real images (the script can take a URL once you set `BASE_URL`; otherwise run it against the local build).

### Day 5: launch

16. Hand the client the thank-you page's "what happens next" promise as their own checklist: who calls, how fast, what the visit covers. The page has made that promise; the business has to keep it.
17. Start the ads with the landing URL plus UTM parameters (`?utm_source=meta&utm_campaign=<name>`); the page stores them and sends them with each lead.
18. Archive the intake transcript and the final `site.config.ts` in the client repo. That pair is the full record of the page.

## Definition of done

- `npm run check:content` passes with the client's copy.
- `npm run verify` passes (30 checks).
- Lighthouse mobile performance and accessibility are 90 or above on the production build.
- The first screen at 390x664 shows eyebrow, headline, paragraph, CTA and badge in full.
- One real lead has arrived in GoHighLevel and one Lead event has shown in Meta Events Manager.
- The client has written "approved" against the preview URL.

## When something is missing

| Missing | Do this |
| --- | --- |
| Fewer than seven before and after pairs | Use what exists (three is the minimum); the strip loops more copies. Do not pad with unmatched photos. |
| No videos | Keep the projects section with posters only, or disable it (`enabled: false`); the backgrounds and spacing re-plan. |
| No reviews yet | Leave `proof.rating` empty; every badge disappears. Disable the testimonials section until there are three real reviews. |
| No guarantee | Disable the guarantee section. Do not write a soft one. |
| No logo in white | Leave `logoWhite` empty; the business name renders in white on the comparison column. |
| Client wants a different section order | Reorder `sections` in the config; nothing else changes. Keep the offer form last. |

## Changing the template itself

Fixes and improvements go to this template repository, not to a client repo. After merging here, a client repo picks them up by creating a new repo from the template or by cherry-picking the commit. Keep `docs/decisions.md` updated with the reason for each change.
