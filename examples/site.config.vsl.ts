/**
 * VSL preset: the section order, layouts and lengths of reference C (an
 * agency's video sales letter page, see docs/teardown-c.md), set up for
 * Minus Media's own client acquisition page. Every text slot holds an
 * instruction written to the length of the reference content; no claim,
 * figure, client name or quote is filled in, because none may be invented.
 *
 * Use it when the page sells a service to a business owner (or any
 * high-ticket service) and the argument lives on video: one VSL, a quiz that
 * qualifies before the contact step, and case-study clips from real clients.
 * For a homeowner trade job start from site.config.ts (reviews, fast job) or
 * examples/site.config.renovation.ts (slow, high-value job).
 *
 * To build with it: SITE_CONFIG=examples/site.config.vsl.ts npm run build
 * Or copy it over site.config.ts in a client repository.
 *
 * Section ids starting with "c-" (and "qualify") are kept so scripts and the
 * CTA target line up; the content checker measures the five reference C
 * section types against reference C's lengths.
 *
 * Text marked with **double asterisks** is highlighted: accent colour in the
 * hero callout, underlined in the headline, bold in the P.S.
 */
import { defineConfig } from '../src/config/define.ts';

export default defineConfig({
  business: {
    name: 'Minus Media',
    // Full colour logo (thank-you page and footer).
    logo: { src: '', alt: 'Minus Media logo' },
    // White logo on transparent: sits inside the dark video hero at 121x34.
    logoWhite: { src: '', alt: 'Minus Media' },
    // The agency's number, shown on the thank-you page only. Reference C shows no phone on the landing page.
    phone: '0400000000',
    phoneDisplay: '0400 000 000',
    // Not shown with header.mode 'none'; kept for the thank-you page header. About 14 characters.
    phoneEyebrow: 'GOT QUESTIONS?',
    serviceArea: 'Australia',
    abn: '',
  },

  brand: {
    // Reference C's palette: orange buttons with dark text (6.1:1), a lighter orange for highlights on the dark hero,
    // near-black results. Replace with Minus Media's own colours; keep dark text on a light button colour or
    // check contrast again.
    colours: {
      heading: '#1a1a1a',
      body: '#2a2a2a',
      primary: '#ff6b00',
      'primary-hover': '#e85f00',
      'on-primary': '#1a1a1a',
      accent: '#ff8a33',
      'accent-text': '#b34700',
      'accent-strong': '#a84600',
      'surface-muted': '#f5f5f5',
      border: '#e6e6e6',
      star: '#f5a623',
      night: '#141414',
    },
    fonts: {
      // Bundled and self-hosted (four static weights). Reference C's family.
      family: 'Poppins',
    },
    texture: { src: '', alt: '' },
    heroWash: 0,
    // Results run on near black, as on the reference.
    darkTone: 'night',
    tokens: {
      // Reference C's button: rounded, sentence case, bold, with a solid darker shadow underneath.
      'radius-button': '12px',
      'button-transform': 'none',
      'weight-button': '700',
      'shadow-button': '0 6px 0 #c85400',
      'fs-button': '17px',
      'lh-button': '1.6',
      'button-pad': '18px 20px',
    },
  },

  proof: {
    // The pill under the quiz shows "[rating] from [count] [source] reviews". Use Minus Media's real Google
    // rating and count, or leave empty to hide the pill.
    rating: '',
    count: '',
    source: 'Google',
    avatars: { src: '', alt: '' },
  },

  tracking: {
    metaPixelId: '',
  },

  cta: {
    // Reference C asks people to check whether they qualify, in sentence case. About 20 characters.
    label: '[See if you qualify]',
    // The step two heading inside the VSL section (its id plus "-form").
    target: '#qualify-form',
    // Reference C has nothing under its button.
    under: 'none',
    reinforcement: '',
  },

  header: {
    stickyPhoneButton: false,
    // The video hero carries the logo; no header bar on the landing page.
    mode: 'none',
  },

  form: {
    // Three steps as on reference C: two gate questions, then the contact details. Gate answers with a stop
    // message keep the visitor on that step with the message; they can change their answer.
    fields: [
      {
        name: 'watched',
        type: 'radio',
        step: 1,
        // Pattern: Before you [contact us], watch the video above to the end. It answers [most] of your questions. About 107 characters.
        label: 'Before you [get in touch], watch the video above right to the end. It answers [most] of the questions you have.',
        placeholder: '',
        required: true,
        options: ['Yes, I watched it', 'No ([send them back to it])'],
        stops: {
          'No ([send them back to it])': '[One line pointing them back to the video above. Say this form will still be here when it ends.]',
        },
      },
      {
        name: 'fit',
        type: 'radio',
        step: 2,
        // Pattern: We only work with [business type] doing $[floor]+ a year, [attitude], and [condition]. Use Minus Media's real criteria. About 156 characters.
        label: 'We only work with [established business type] turning over $[revenue floor]+ a year, who are [attitude one] and [willing to do condition two]. Is that you?',
        placeholder: '',
        required: true,
        options: ['Yes, that is me', 'No ([polite exit])'],
        stops: {
          'No ([polite exit])': '[Thank them, say who the service is for, and invite them back when their business fits.]',
        },
      },
      { name: 'company', type: 'text', step: 3, label: 'Company name', placeholder: 'Company name*', required: true, autocomplete: 'organization', minLength: 2 },
      // Not "website": that name is the form's spam trap.
      { name: 'company_website', type: 'url', step: 3, label: 'Website (leave blank if none)', placeholder: 'Website (leave blank if none)', required: false },
      { name: 'name', type: 'text', step: 3, label: 'Full name', placeholder: 'Full name*', required: true, autocomplete: 'name', minLength: 2 },
      { name: 'phone', type: 'tel', step: 3, label: 'Phone number', placeholder: 'Phone*', required: true },
      { name: 'email', type: 'email', step: 3, label: 'Email address', placeholder: 'Email*', required: true },
    ],
    // Says what happens on submit. Empty uses cta.label.
    submitLabel: '[Book my call]',
    destination: { url: '', method: 'POST', extra: {} },
    thankYouPath: '/thank-you/',
    messages: {
      required: 'Please fill in this field',
      email: 'Enter a valid email address',
      phone: 'Enter an Australian number, like 0412 345 678 or (03) 9123 4567',
      postcode: 'Enter a four digit postcode',
      minLength: 'Please add a little more detail',
      generic: 'Something went wrong. Please try again.',
      choice: 'Please choose an answer',
      url: 'Enter a web address, like example.com.au, or leave it blank',
    },
    sendingLabel: 'Sending...',
    steps: {
      nextLabel: 'Next',
      backLabel: 'Back',
      counter: 'Question {n} of {total}',
    },
  },

  urgency: {
    // Never generated. Reference C's scarcity lives in the P.S. as a real per-area limit.
    line: '',
  },

  legal: {
    terms: {
      title: 'Terms & Conditions',
      label: 'Terms & Conditions',
      sections: [
        { heading: '1. Who this is for', paragraphs: ['The businesses the service is open to and the criteria the quiz checks.'] },
        { heading: '2. The call', paragraphs: ['What the strategy call includes, how long it runs and that it carries no obligation.'] },
        { heading: '3. Results', paragraphs: ['That the case studies are individual clients\' results and are not a promise of the same result.'] },
        { heading: '4. Availability', paragraphs: ['The per-area limit and that the agency may decline or withdraw an offer of service.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      label: 'Privacy Policy',
      sections: [
        { heading: 'What we collect', paragraphs: ['List the details the form collects, the quiz answers, and that the page uses advertising cookies through the Meta pixel.'] },
        { heading: 'How we use it', paragraphs: ['Say the details are used to assess fit and contact the business about the enquiry, and are not sold.'] },
        { heading: 'Contact', paragraphs: ['How to ask for details to be corrected or deleted, with an email address.'] },
      ],
    },
  },

  seo: {
    title: 'Minus Media',
    description: 'One sentence naming who Minus Media works with and what the call is for, for link previews.',
    noindex: true,
    ogImage: { src: '', alt: '' },
  },

  footer: {
    copyrightSuffix: 'All rights reserved.',
  },

  thankYou: {
    headline: 'Thank You',
    subheadline: 'Say what happens next and how soon',
    steps: [
      { title: 'Step one: we review your answers', body: 'Who reads the answers, how soon, and what they look for before the call is confirmed.' },
      { title: 'Step two: the call', body: 'Who they will speak to, how long it runs, and what to have ready (numbers, the areas they want to own).' },
      { title: 'Step three: the plan', body: 'What they leave the call with and that there is no obligation to go ahead.' },
    ],
    phoneLabel: 'Prefer to talk? Call us now:',
    seoTitle: 'Thank You | Minus Media',
  },

  /* ---------------------------------------------------------------------- */
  /* Sections, in reference C's order. Set enabled: false to drop one; the  */
  /* backgrounds re-plan. docs/sections.md says what each one needs.        */
  /* ---------------------------------------------------------------------- */
  sections: [
    {
      type: 'videoHero',
      id: 'c-hero',
      enabled: true,
      // Job: stop the scroll, name the buyer by trade, one big promise, send them down to the video.
      // Assets: a 10 to 30 second muted loop (1080p MP4 under 4 MB, no faces or text) and its first frame as the poster.
      content: {
        // Pattern: Attention **[trade], [trade], [trade] & [trade]**. The starred part shows in the accent colour. About 56 characters.
        callout: 'Calling all **[trade one], [trade two], [trade 3] & [trade 4]**',
        // Pattern: Be the **[status]** [buyer] in [their area]. The starred words are underlined. About 44 characters.
        headline: 'Be the **[status]** [buyer type] in [their area]',
        // Pattern: [Verb] how it works. About 18 characters.
        scrollLabel: '[Watch] how it works',
        scrollTarget: '#qualify',
        poster: { src: '', alt: '' },
        videoUrl: '',
      },
    },
    {
      type: 'vslForm',
      id: 'qualify',
      enabled: true,
      // Job: the pitch on video, then the quiz. Assets: the VSL (2 to 5 minutes, 16:9, burned-in captions) and a poster with the presenter's face.
      content: {
        // Pattern: Step 1: Watch this [short] video to see [what they learn] 👇. About 53 characters.
        stepOne: 'Step 1: Watch this [length] video to see [benefit] 👇',
        // Pattern: Tap to watch (sound on). About 25 characters.
        playHint: 'Tap to watch ([sound on])',
        poster: { src: '', alt: '' },
        videoUrl: '',
        // Pattern: Step 2: [Check whether you qualify] 👇. About 38 characters.
        stepTwo: 'Step 2: [Check whether you qualify] 👇',
        showReviews: true,
      },
    },
    {
      type: 'videoResults',
      id: 'c-results',
      enabled: true,
      // Job: proof at volume, clients on camera. Assets: 6 to 15 portrait clips from real clients (with permission), each with a poster frame.
      content: {
        // Pattern: [Count]+ [buyers] use us to [outcome one], [outcome two] and [outcome three]. About 98 characters.
        headline: '[Real client count]+ [buyers] use us to [outcome one], [outcome two] and [outcome three] in town',
        layout: 'column',
        // Ten cards with a confirmed figure, five with a quote, as on the reference. Never both on one card, never invented.
        items: [
          ...Array.from({ length: 10 }, (_, i) => ({
            name: `[Client business ${i + 1}]`,
            trade: '[Their trade]',
            figure: '$[n]M',
            timeframe: 'in [n] months',
            detail: '[What changed: staff, premises or bookings]',
            quote: '',
            poster: { src: '', alt: '' },
            videoUrl: '',
          })),
          ...Array.from({ length: 5 }, (_, i) => ({
            name: `[Client business ${i + 11}]`,
            trade: '[Their trade]',
            figure: '',
            timeframe: '',
            detail: '',
            quote: '[Outcome in the client\'s words]',
            poster: { src: '', alt: '' },
            videoUrl: '',
          })),
        ],
      },
    },
    {
      type: 'ctaBand',
      id: 'c-cta',
      enabled: true,
      // Job: one ask after the proof, back up to the quiz.
      content: {
        lead: '',
      },
    },
    {
      type: 'postscript',
      id: 'c-ps',
      enabled: true,
      // Job: the founder's close: the real problem, the proof restated, the true reason for the limit.
      content: {
        tag: 'P.S.',
        paragraphs: [
          // Pattern: Most [buyers] I meet [do something well], but [the frustration]. About 70 characters after the tag.
          'Most [buyers] I meet [do great work], but [their frustration here].',
          // Pattern: The problem isn't [what they assume]. **[The real cause.]** That's what we fix. About 136 characters.
          'The problem is not [what they assume]. **[The real cause, said plainly, in one or two short lines of copy.]** That is what we fix.',
          // Pattern: **Our [count]+ clients [result]**, and [a first-person belief]. The results above back it up. About 118 characters.
          '**Our [count]+ clients [result]**, and [a belief you hold about the agency, in your words]. The proof is above.',
          // Pattern: Our mission is to [the promise]. **So we only take on [the real limit].** About 100 characters.
          'Our mission is to [the promise]. **So we only take on [the real limit per area that we keep].**',
        ],
        name: '[First name]',
        role: 'Founder, Minus Media',
      },
    },
  ],
});
