# Intake brief

Run this on the intake call (about 45 minutes) and record it. The transcript is the source for every text slot on the page, so each question below is tied to the slot it feeds. Ask in the client's words and let them ramble; specifics (numbers, timeframes, dollar values, named methods, suburbs) are what the page needs.

## Before the call

Send the client the asset list at the bottom and ask for review figures, logo files and their existing terms and privacy documents.

## Part 1: Offer (feeds hero, offer headline, bullets, reinforcement line)

1. What is the one job you most want more of, and the two other jobs you would happily take with it? (`hero.headline` services)
2. If someone books today, how fast can you start or finish? What is the honest timeframe you would put your name to? (`hero.headline` timeframe)
3. What can you include free that costs you little and the customer values? Put a dollar value on each. (`hero.headline` bonus, `offerForm.headline`, `offerForm.reinforcement`)
4. What happens on the free visit? Walk me through it: what you look at, what you advise, what they walk away with. (`offerForm.bullets`, `steps.items[0]`)
5. What mistakes do you save customers from, and what has that saved them in dollars? (`offerForm.bullets[1]`)
6. What upgrades do people add once you are there, and how much cheaper is it to do them together? (`offerForm.bullets[2]`)
7. What is the exact wording you want on the button? One phrase, used everywhere. (`cta.label`)

## Part 2: The customer (feeds eyebrow, letter, future pacing)

8. Which suburbs do you want the ads to run in? List the top six. (`hero.eyebrow` city, `projects.items[n].suburb`)
9. Describe the person who calls you. What have they already tried? What went wrong with it, in their words? (`letter.paragraphs[0]`)
10. When a job fails after a cheaper tradie, what does the customer notice first, and within how long? (`letter.paragraphs[0]`, `futurePacing.paragraphs[1]`)
11. Why does that keep happening? What do most tradies skip? (`letter.paragraphs[1]`, `comparison.them.items`)
12. When the job is done right, what does the customer say the first time they see it? What do they do differently with the space? (`futurePacing.paragraphs`)

## Part 3: The method (feeds trust strip, comparison, benefits, steps)

13. Name the three or four things you do that most others do not. Give each one a two or three word name you are happy to see on the page. (`trustStrip.items`, `comparison.us.items`, `benefits.items[n].title`)
14. For each one: what exactly is it, and what does it stop from going wrong? Any numbers, materials, standards or tools? (`comparison.us.items`, `benefits.items[n].body`)
15. Do you use subcontractors? How many jobs or homes have you completed? How long have you been doing this? (`trustStrip.items`, `offerForm.bullets[1]`)
16. After the job: do you come back? When, and what do you do? Is it included? (`trustStrip.items`, `benefits.items`, `steps.items[2]`)
17. From first call to finished job, what are the steps and how do you keep the customer informed? (`steps.items`)

## Part 4: Proof (feeds proof, testimonials, projects)

18. Where are your reviews, what is the rating and the count today? (`proof`)
19. Pick three reviews that mention honesty, communication or the finish. For each: first name, suburb, and do you have a photo of that job? (`testimonials.items`)
20. Which recent jobs could you film a 15-second phone clip of, one per suburb? (`projects.items`)

## Part 5: Guarantee and legal (feeds guarantee, legal)

21. What will you fix for free if it goes wrong, for how many years, and what is excluded? Do you have a name for it? (`guarantee`)
22. Send your current terms and payment schedule and your privacy policy. (`legal`)

## Part 6: Brand and tracking

23. Logo files (colour and white), brand colours if any, phone number as you want it displayed, business name as customers know it, ABN if you want it shown. (`business`, `brand`)
24. Who manages your Meta ads account and Facebook page? We need the pixel ID. (`tracking`)
25. Which GoHighLevel sub-account should leads land in, and who gets notified? (`form.destination`)

## Asset list for the client

Photos, phone shots are fine, no filters:

- 1 wide shot of a finished job from the street at dusk, house in frame, no people (hero).
- 7 before and after pairs, portrait, same spot and height for each pair, a fixed landmark in both.
- 2 shots of one house from the footpath, before and after (letter).
- 12 square job photos, at least 3 with the crew working (grid strips; 8 is the minimum, the third strip can repeat).
- 3 photos of the three reviewers' finished jobs.
- 1 landscape photo of a crew member finishing a surface by hand (benefits).
- 2 matched square shots of one driveway from the kerb, before and after (compare slider).
- 7 finished exteriors in clean light, 2 wide and 5 square, no people (bento).
- 3 process photos: the visit, the work, the finished detail (steps).
- 1 mock-up of the offer on a device, or we make one (offer bundle).
- 4 customer head shots for the avatar strip (optional).

Videos: 5 or 6 portrait clips, 10 to 30 seconds, one per target suburb, crew or surface visible, uploaded to YouTube (unlisted), Vimeo or Wistia; we take the poster frame from the first second.

The full standard with examples of what each shot should contain is in `docs/exemplar.md`.
