/**
 * site.config.ts: the only file to edit for a new client.
 *
 * Every text slot below holds an instruction, not sample copy. Each instruction
 * is written to roughly the length of the real content that belongs there, so
 * the page lays out correctly before the client's copy goes in. Replace every
 * instruction. Search for "[" to find bracketed placeholders.
 *
 * Images: put files under src/images and reference them by file name, for
 * example { src: 'hero.jpg', alt: '...' }. Leave src empty to show the grey
 * placeholder box with its export size and shot description.
 *
 * Australian English spelling throughout. No em dashes. Plain, direct sentences.
 * The job, the objection and the asset each slot needs are in the comment above it.
 * Lengths and shot lists for every slot: docs/content-spec.md.
 */
import { defineConfig } from './src/config/define.ts';

export default defineConfig({
  /* ---------------------------------------------------------------------- */
  /* Business                                                                */
  /* ---------------------------------------------------------------------- */
  business: {
    // Trading name as customers know it. Used in the title, the footer and the white comparison column fallback.
    name: 'Business Name',
    // Full colour logo, transparent PNG or SVG, at least 440 px wide. Rendered 100x33 on phones and 150x50 on desktop.
    logo: { src: '', alt: 'Business Name logo' },
    // White version of the logo for the sage comparison column. Optional: the business name in white is used when empty.
    logoWhite: { src: '', alt: 'Business Name' },
    // Number as dialled. Opens the phone dialler from inside Facebook and Instagram. Australian formats with or without +61.
    phone: '0400000000',
    // Number as displayed. Spacing as customers expect it.
    phoneDisplay: '0400 000 000',
    // Short invitation above the number in the desktop header. The reference uses a two-word question.
    phoneEyebrow: 'HAVE QUESTIONS?',
    // City or region the ads target. Appears in the fallback page title only.
    serviceArea: 'City',
    // Optional. Shown in the footer when present.
    abn: '',
  },

  /* ---------------------------------------------------------------------- */
  /* Brand                                                                   */
  /* ---------------------------------------------------------------------- */
  brand: {
    // Colour roles override the defaults in src/tokens/tokens.css. Leave empty to keep the measured reference palette.
    // Keep the primary dark enough for white text (contrast 4.5:1 or better) and the accent readable on white.
    colours: {
      // primary: '#224b1c',
      // accent: '#839478',        // icons and decoration
      // 'accent-text': '#5b6b50', // eyebrow text, must stay 4.5:1 on white
      // 'accent-strong': '#647558', // surfaces that carry white text
    },
    fonts: {
      // Manrope is bundled and self-hosted. To change it, add font files under public/fonts and rules in src/styles/fonts.css.
      family: 'Manrope',
    },
    // Optional plaster or paper texture for the "dark" sections. Empty uses a generated texture.
    texture: { src: '', alt: '' },
    // White wash over the hero photo, 0 to 1. Most client photos need 0.5 to 0.7 so the headline stays readable.
    heroWash: 0.6,
  },

  /* ---------------------------------------------------------------------- */
  /* Proof                                                                   */
  /* ---------------------------------------------------------------------- */
  proof: {
    // Real figures from the client's review profile. Leave rating or count empty to hide every badge on the page.
    rating: '4.9',
    count: '137',
    source: 'Google',
    // Row of four round customer faces, 164x48 export. Shown in the two stacked badges. Optional.
    avatars: { src: '', alt: '' },
  },

  /* ---------------------------------------------------------------------- */
  /* Tracking                                                                */
  /* ---------------------------------------------------------------------- */
  tracking: {
    // Meta pixel ID. Empty means no pixel code is output. PageView fires on every page, Contact on phone clicks, Lead once on the thank-you page.
    metaPixelId: '',
  },

  /* ---------------------------------------------------------------------- */
  /* CTA                                                                     */
  /* ---------------------------------------------------------------------- */
  cta: {
    // One label for every button including the submit. Pattern: REQUEST A FREE [what they get] NOW. Uppercase, about 34 characters.
    label: 'REQUEST A FREE [THING THEY GET] NOW',
    // Anchor every CTA scrolls to. Matches the offer form section id.
    target: '#offer-section',
  },

  header: {
    // The reference has nothing fixed on scroll. Turn this on for a fixed phone button on phones.
    stickyPhoneButton: false,
  },

  /* ---------------------------------------------------------------------- */
  /* Form                                                                    */
  /* ---------------------------------------------------------------------- */
  form: {
    // Five fields by default. Order and set are yours. Types: text, email, tel, postcode, textarea.
    fields: [
      { name: 'name', type: 'text', label: 'Name', placeholder: 'Name*', required: true, autocomplete: 'name', icon: 'person', minLength: 2 },
      { name: 'email', type: 'email', label: 'Email', placeholder: 'Email*', required: true, icon: 'mail' },
      { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone*', required: true, icon: 'phone' },
      { name: 'postcode', type: 'postcode', label: 'Postcode', placeholder: 'Postcode*', required: true, icon: 'pin' },
      {
        name: 'description',
        type: 'textarea',
        label: 'What do you want done?',
        // The job question. Pattern: ask them to explain in a few sentences exactly what they want done. About 81 characters.
        placeholder: 'Ask them to explain in a few sentences exactly what they want done, as a question?*',
        required: true,
        icon: 'dollar',
        minLength: 10,
        rows: 3,
      },
    ],
    // Empty uses cta.label so the submit matches every other button.
    submitLabel: '',
    // Where leads go. Empty logs the payload to the console. Wiring lives in src/lib/submit-lead.ts.
    destination: { url: '', method: 'POST', extra: {} },
    thankYouPath: '/thank-you/',
    messages: {
      required: 'Please fill in this field',
      email: 'Enter a valid email address',
      phone: 'Enter an Australian number, like 0412 345 678 or (03) 9123 4567',
      postcode: 'Enter a four digit postcode',
      minLength: 'Please add a little more detail',
      generic: 'Something went wrong. Please try again or call us.',
    },
    sendingLabel: 'SENDING...',
  },

  /* ---------------------------------------------------------------------- */
  /* Urgency                                                                 */
  /* ---------------------------------------------------------------------- */
  urgency: {
    // One optional line above the offer headline, written by hand. Example pattern: HURRY! We can only take 2 more jobs in October:
    // Empty by default. Nothing on this page generates dates, months or remaining counts.
    line: '',
  },

  /* ---------------------------------------------------------------------- */
  /* Legal                                                                   */
  /* ---------------------------------------------------------------------- */
  legal: {
    terms: {
      title: 'Terms & Conditions',
      label: 'Terms & Conditions',
      // Four short numbered parts on the reference: product disclaimer, payment terms, variations, access and site conditions.
      sections: [
        { heading: '1. Product disclaimer', paragraphs: ['State what the material is and the natural variation it can show, so no one claims a normal feature is a defect. Two or three short sentences from the client\'s existing terms.'] },
        { heading: '2. Payment terms', paragraphs: ['One sentence on what happens if payments are late.'], bullets: ['Deposit percentage and when it is due.', 'Progress payment percentage and the trigger for it.', 'Final balance and when it is due.'] },
        { heading: '3. Variations', paragraphs: ['How changes to the agreed scope, unforeseen site conditions or engineering requirements are charged.'] },
        { heading: '4. Access and site conditions', paragraphs: ['Who is responsible for clear, safe access and what happens when access or site conditions slow the work.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      label: 'Privacy Policy',
      sections: [
        { heading: 'What we collect', paragraphs: ['List the details the form collects and that the page uses advertising cookies through the Meta pixel.'] },
        { heading: 'How we use it', paragraphs: ['Say the details are used to contact the visitor about their enquiry and to measure the ads, and are not sold.'] },
        { heading: 'Contact', paragraphs: ['How to ask for details to be corrected or deleted, with the business phone number and an email address.'] },
      ],
    },
  },

  /* ---------------------------------------------------------------------- */
  /* SEO                                                                     */
  /* ---------------------------------------------------------------------- */
  seo: {
    // Browser tab title. Ad landing pages are not search pages, so keep it plain.
    title: 'Offer | Business Name',
    // Used only by social previews and by Meta when the pixel reports the page. One sentence naming the trade, the area and the offer.
    description: 'One sentence naming the trade, the service area and the offer, for link previews.',
    // Keeps the page out of search engines. Leave true for ad landing pages.
    noindex: true,
    ogImage: { src: '', alt: '' },
  },

  footer: {
    // Appended after the year and business name in the copyright line.
    copyrightSuffix: 'All rights reserved.',
  },

  /* ---------------------------------------------------------------------- */
  /* Thank-you page                                                          */
  /* ---------------------------------------------------------------------- */
  thankYou: {
    // Two words. Nothing to instruct here.
    headline: 'Thank You',
    // Pattern: when and how you will be in touch. About 35 characters.
    subheadline: 'Say when and how you will be in touch',
    // Three steps that happen after the form, so the visitor knows what to expect and recognises your call.
    steps: [
      { title: 'Step one: first contact', body: 'Who calls or messages, from which number, and within what time, so they recognise it when it comes.' },
      { title: 'Step two: the free visit', body: 'What happens at the measure and quote: who comes, how long it takes and what they should have ready.' },
      { title: 'Step three: the quote', body: 'When the itemised quote arrives, how it is sent, and that there is no pressure to decide on the spot.' },
    ],
    // Line above the click-to-call number.
    phoneLabel: 'Prefer to talk? Call us now:',
    seoTitle: 'Thank You | Business Name',
  },

  /* ---------------------------------------------------------------------- */
  /* Sections, in render order. Reorder to reorder the page. enabled: false  */
  /* removes a section and the backgrounds and spacing adjust automatically. */
  /* ---------------------------------------------------------------------- */
  sections: [
    {
      type: 'hero',
      enabled: true,
      // Job: qualify the visitor, state the outcome with a timeframe and a stacked bonus with its dollar value,
      // and keep the CTA and review badge on the first phone screen. Objection: "is this for me, and is it worth a tap?".
      // Assets: one wide finished-job photo (2400x1400) that can be washed out behind the text.
      content: {
        // Qualifying question naming the trade and the city, uppercase, about 43 characters.
        eyebrow: 'Qualifying question naming the trade and city?',
        // Outcome, timeframe, bonus and dollar value, in Title Case, about 163 characters and 29 words.
        headline: 'Outcome they want, in a specific timeframe, plus the bonus and its dollar value. Name the two or three core services you sell here, in Title Case. Keep it to 30 words.',
        // Pain question, then the lifestyle gain and the financial gain with a percentage. About 209 characters.
        body: 'One pain question about their current surface. Then the lifestyle gain and the financial gain with a percentage, in two plain sentences a homeowner would say out loud. Keep it to about 30 words.',
        image: { src: '', alt: '' },
      },
    },
    {
      type: 'trustStrip',
      enabled: true,
      // Job: six fast credibility points before the first scroll. Objection: "who are you and why should I trust you?".
      // Assets: none. Pick an icon name per item from src/icons/index.ts.
      content: {
        // Two to five words each, Title Case, 17 to 31 characters. Introduce the method names you will repeat later.
        items: [
          { icon: 'pin', label: 'Ownership or local claim' },
          { icon: 'cog', label: 'Named method, 2 to 3 words' },
          { icon: 'trowel', label: 'Included follow-up visit' },
          { icon: 'target', label: 'Named process or standard' },
          { icon: 'hardhat', label: 'No subcontractor claim' },
          { icon: 'house', label: 'Jobs completed count' },
        ],
      },
    },
    {
      type: 'beforeAfter',
      enabled: true,
      // Job: prove transformation within the first swipe. Objection: "can they really change a space like mine?".
      // Assets: seven matched pairs, portrait 3:4 (700x930), same spot, height and direction for each pair.
      content: {
        beforeLabel: 'Before',
        afterLabel: 'After',
        direction: 'right',
        pairs: [
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
          { before: { src: '', alt: '' }, after: { src: '', alt: '' } },
        ],
      },
    },
    {
      type: 'letter',
      enabled: true,
      // Job: name the visitor's experience so they feel understood, then reframe the cause so your method is the answer.
      // Objection: "I have been burnt before". Assets: two landscape photos (1100x782) of one house before and after, from the footpath.
      content: {
        // A question to the repeat renovator who is still unhappy. About 82 characters, 14 words.
        headline: 'Have they done this before and still feel the pain? Ask it as a question, 14 words.',
        // Bold salutation to the city's homeowners. About 26 characters.
        salutation: 'Dear [city] homeowners,',
        paragraphs: [
          // About 458 characters, 69 words.
          'Paragraph one of the letter. Describe what homeowners in the service area have already spent money on, hoping for a specific result. Then say how the result fell short, in three sensory ways they would recognise: how it looks, how the space feels, what is slightly off. End with what goes wrong within months, naming two or three specific failures. Write it in the customer\'s own words, not the trade\'s. About 70 words in three or four sentences.',
          // About 369 characters, 58 words.
          'Paragraph two reframes the cause. Explain that most work in this trade only treats the surface, and that crews focus on the visible job rather than the hidden causes underneath. Name those causes in plain words. Then say that is why the same problems return, listing three symptoms, and finish with the loop the homeowner is stuck in: temporary fixes and growing frustration. About 55 words.',
        ],
        images: [
          { src: '', alt: '' },
          { src: '', alt: '' },
        ],
      },
    },
    {
      type: 'projects',
      enabled: true,
      // Job: prove you work in the visitor's suburbs with footage that cannot be faked. Objection: "do they work near me?".
      // Assets: five or six portrait clips (9:16, 10 to 30 seconds) with a poster frame each (640x1138), one per suburb the ads target.
      content: {
        // About 38 characters, ends with a colon.
        headline: 'Invite them to see other recent jobs:',
        items: [
          { suburb: 'Suburb 1', poster: { src: '', alt: '' }, videoUrl: '' },
          { suburb: 'Suburb 2', poster: { src: '', alt: '' }, videoUrl: '' },
          { suburb: 'Suburb 3', poster: { src: '', alt: '' }, videoUrl: '' },
          { suburb: 'Suburb 4', poster: { src: '', alt: '' }, videoUrl: '' },
          { suburb: 'Suburb 5', poster: { src: '', alt: '' }, videoUrl: '' },
          { suburb: 'Suburb 6', poster: { src: '', alt: '' }, videoUrl: '' },
        ],
      },
    },
    {
      type: 'photoGrid',
      enabled: true,
      // Job: keep proof density high between arguments. Assets: four square job photos (700x700), at least one with the crew working.
      content: {
        images: [
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
        ],
      },
    },
    {
      type: 'comparison',
      enabled: true,
      // Job: inoculate against the cheaper quote by turning your method into four checkable points and the typical competitor's into four failures.
      // Objection: "the other quote was cheaper". Assets: white logo for the left column title.
      content: {
        // Why most jobs in this trade fail and how you do it differently. About 75 characters, 12 words.
        headline: 'Why most jobs in this trade fail, and how this business does it differently',
        us: {
          // Shown only when logoWhite is empty.
          title: 'Business Name',
          // Each row: bold named method, then what it is and the lasting benefit. 81 to 108 characters.
          items: [
            { lead: 'Named method number one:', text: 'what it is in three parts, and the lasting benefit it gives the owner. Twelve words.' },
            { lead: 'Named method number two:', text: 'how the work is adjusted to the site for durability.' },
            { lead: 'Named method number three:', text: 'how the work is aligned with the home and its surrounds, in a dozen words.' },
            { lead: 'Included follow-up:', text: 'what you come back to do, when you come back, and that it is included free of charge.' },
          ],
        },
        them: {
          // Most other [trade plural]. About 21 characters.
          title: 'Most other [trades]',
          // Each row mirrors the row beside it: bold failure label, then what they do and the consequence. 49 to 87 characters.
          items: [
            { lead: 'Skipped prep:', text: 'what they leave out and the cracking or sinking it causes, ten words.' },
            { lead: 'A single generic mix:', text: 'the shortcut they take, in eight words.' },
            { lead: 'No thought for the home:', text: 'what gets ignored about its layout or flow, ten words.' },
            { lead: 'Gone after the pour:', text: 'no return visit, no check.' },
          ],
        },
      },
    },
    {
      type: 'photoGrid',
      enabled: true,
      // Second strip. Four different square photos if you have them; the reference reuses the same four.
      content: {
        images: [
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
        ],
      },
    },
    {
      type: 'testimonials',
      enabled: true,
      // Job: let customers say what you cannot say about yourself. Objection: "will they do what they say?".
      // Assets: three reviews with first names, suburb and state, a star rating, and a photo of each job (790x844).
      content: {
        // Local homeowners who chose you and the result. About 61 characters, 9 words.
        headline: 'Local homeowners who chose you: write the headline as their result',
        items: [
          {
            // The reviewer's own summary line using the trait words customers use. About 84 characters.
            headline: 'The reviewer\'s own one-line summary, using the trait words customers use, 13 words',
            // About 205 characters, 31 words, first person.
            body: 'First-person review in the customer\'s words. Name the owner by first name, mention the start to finish experience, the communication, the finished result and a recommendation. About 30 words.',
            name: 'First name',
            suburb: 'Suburb VIC',
            rating: 5,
            image: { src: '', alt: '' },
          },
          {
            // Short praise line, five words. About 44 characters.
            headline: 'Short praise line, five words, as they said it',
            // About 228 characters, 41 words.
            body: 'Second review. A couple who did not know where to start, guided step by step, with the result they got. Keep the customer\'s phrasing, including small imperfections, because polished reviews read as fake. Around 40 words.',
            name: 'Name & Name',
            suburb: 'Suburb name VIC',
            rating: 5,
            image: { src: '', alt: '' },
          },
          {
            // A quoted line about doing what was promised, ten words. About 51 characters.
            headline: 'A quoted line about doing what was promised, ten words',
            // About 177 characters, 29 words.
            body: 'Third review, quoted. No issues, the result matched what they asked for, the owner was easy to deal with and kept them updated, stress free, would recommend. About 29 words.',
            name: 'First & First',
            suburb: 'Suburb Name VIC',
            rating: 5,
            image: { src: '', alt: '' },
          },
        ],
      },
    },
    {
      type: 'benefits',
      enabled: true,
      // Job: restate the method as five named benefits with one concrete fact each. Objection: "what actually makes you better?".
      // Assets: one landscape photo (740x600) of a crew member finishing a surface by hand, plus an icon name per card.
      content: {
        // Turn their space into the aspirational thing they want, plus a durability promise. About 90 characters, 15 words.
        headline: 'Turn their space into the aspirational thing they want, plus a durability promise, 15 words',
        items: [
          { icon: 'layers', title: 'Named Method One, Title Case', body: 'Open with a statistic about why jobs fail, then the two or three things you do about it, then the result for the owner over a stated timeframe. Plain words, about 26 of them.' },
          { icon: 'ruler', title: 'Named Method Two In Title Case', body: 'Say how every job is designed to suit the home\'s shape, colours and flow, and what that means for the owner: a space that feels like part of the house, not an add-on. About 29 words.' },
          { icon: 'sparkle', title: 'Named Method Three Title Case', body: 'Describe the included follow-up visit: when you return, what you check and redo, and that it costs nothing extra. About 23 words.' },
          { icon: 'clipboard', title: 'Named Method Four, Title Case', body: 'Describe one team handling the whole job, with clear timelines and regular updates, so the owner has nothing to chase. About 20 words.' },
          { icon: 'shield', title: 'Named Method Five, Title Case', body: 'Name the materials or standards you use and where else they are trusted, then say how they outperform the usual residential choice. About 19 words.' },
        ],
        image: { src: '', alt: '' },
      },
    },
    {
      type: 'futurePacing',
      enabled: true,
      // Job: move the visitor from problem to desired future in their own daily moment, and let them perform the transformation with their thumb.
      // Objection: "is it worth the disruption?". Assets: one matched square pair (1160x1160) of a driveway from the kerb, before and after.
      content: {
        // Imagine a [place] that [reflects them]. About 41 characters, 7 words.
        headline: 'Imagine a home that [reflects them], 7 words',
        paragraphs: [
          // About 178 characters, 30 words.
          'Picture a daily moment, like driving up to the house, and describe what they see: the finished surface, compared to something aspirational, in three sensory adjectives. About 30 words.',
          // About 227 characters, 37 words.
          'List the three pains that are gone. Then say what the space becomes in a stated timeframe: who uses it and for what. Close with the two fears about tradies that simply will not happen here. About 37 words.',
          // About 114 characters, 21 words.
          'Contrast how they feel about the space now with how they will feel every time they come home. About 21 words.',
        ],
        before: { src: '', alt: '' },
        after: { src: '', alt: '' },
        beforeLabel: 'Before',
        afterLabel: 'After',
      },
    },
    {
      type: 'bentoGallery',
      enabled: true,
      // Job: a denser proof block of finished work after the emotional peak. Assets: seven finished exteriors, two wide (1506x732) and five square (734x732), no people.
      content: {
        // About 31 characters, 6 words.
        headline: 'Invite them to see recent jobs',
        images: [
          { src: '', alt: '', wide: true },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '', hideOnMobile: true },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '', wide: true },
        ],
      },
    },
    {
      type: 'steps',
      enabled: true,
      // Job: remove the fear of what happens after the form with three small steps, the first free. Objection: "what am I committing to?".
      // Assets: three landscape photos (936x536): the visit, the work, the finished detail.
      content: {
        // About 46 characters, 8 words.
        headline: 'Get the outcome they want in 3 simple steps',
        items: [
          { title: 'Request the free first visit', body: 'What the owner tells you, the two or three job types you handle, what you inspect on the visit, the design talk, and the honest itemised quote they walk away with. About 31 words.', image: { src: '', alt: '' } },
          { title: 'Receive a plan made for the home', body: 'What you map out for them: layout, materials and finish to suit the home and how they live. Promise they see exactly how it will look before work starts, so there are no surprises. About 34 words.', image: { src: '', alt: '' } },
          { title: 'Approve it and relax while we do the work', body: 'Once approved, who manages what: site prep, the work itself, the finish and a final inspection. Say how often they get updates. End by restating the included follow-up visit and the bonus they were promised. About 38 words.', image: { src: '', alt: '' } },
        ],
      },
    },
    {
      type: 'guarantee',
      enabled: true,
      // Job: reverse the risk in plain words with a named guarantee and a stated term. Objection: "what if it fails later?". Assets: none, the badge is drawn from the text.
      content: {
        // Two short lines on the shield badge: the guarantee name, then the promise. 18 and 13 characters.
        badgeLine1: '[Trade] Guarantee',
        badgeLine2: 'or you pay $0',
        // About 31 characters.
        headline: '[Trade] guarantee or you pay $0',
        // One sentence that names the guarantee and says it covers every job, ending with a colon. About 81 characters.
        subheadline: 'One sentence that names the guarantee and says it applies to every job, then a colon',
        paragraphs: [
          // About 193 characters, 31 words.
          'If the finished work develops the specific defects you cover, as a result of your workmanship, within a stated number of years, say exactly what you will do about it and that it costs nothing. About 31 words.',
          // About 228 characters, 40 words.
          'Explain what they are really paying for: not just the surface but workmanship built to last, and a team that still answers the phone long after the job is done. Keep it to one or two sentences, about 40 words.',
        ],
      },
    },
    {
      type: 'photoGrid',
      enabled: true,
      // Third strip, closes the guarantee section on the reference.
      content: {
        images: [
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
        ],
      },
    },
    {
      type: 'offerForm',
      enabled: true,
      id: 'offer-section',
      // Job: convert. Restate the offer at full value, list what the visit delivers, and take the lead with the fewest fields that still qualify the job.
      // Objection: "what do I get for filling this in?". Assets: a device mock-up of the offer (1528x764) on white.
      content: {
        // Claim your free [visit] with a free [bonus one] on [existing thing] and a free [bonus two] (worth $[value]+). About 145 characters, 27 words.
        headline: 'Claim your free [visit name] with a free [bonus one] on [the existing thing] and a free [bonus two] (worth $[value]+), restating the hero offer',
        bundleImage: { src: '', alt: '' },
        // Four bullets: bold lead-in with what you will do on the visit, then the specific recommendation, saving or percentage. The last is bold only.
        bullets: [
          { lead: 'Bold lead in: we\'ll discuss styles, trends and the look they are after', text: 'with exact recommendations on how to make the most of their budget for the two or three job types you offer.' },
          { lead: 'Bold lead in: we\'ll inspect the job area and point out what to consider to avoid budget blowouts', text: 'then a specific saving you have made clients, with a dollar figure and the years of experience behind it.' },
          { lead: 'Bold lead in: we\'ll walk them through upgrades that add value, with a percentage', text: 'then how many upgrades owners usually add and why doing them together is cheaper, with a percentage.' },
          { lead: 'Bold only: and the free visit!', text: '' },
        ],
        // One line under the submit button that repeats the bonus items and their value. About 110 characters, 20 words.
        reinforcement: 'PLUS restate the bonus items and their total value here, under the button, in one line of about 20 words',
      },
    },
  ],
});
