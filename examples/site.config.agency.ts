/**
 * Agency booking preset: the section order, layouts and lengths of reference C
 * (an agency's Meta-ad booking page for renovation businesses, see
 * docs/teardown-c.md), set up for Minus Media, with every text slot holding an
 * instruction written to the length of the real content.
 *
 * Use it when the page sells a call, not a job: the visitor is a business owner,
 * a video does the explaining, and the form qualifies with a confirmation box
 * before the visitor picks a time in a booking calendar. For a trade selling to
 * homeowners, start from site.config.ts or examples/site.config.renovation.ts.
 *
 * To build with it: SITE_CONFIG=examples/site.config.agency.ts npm run build
 * Or copy it over site.config.ts in a client repository.
 *
 * Section ids starting with "c-" (and the field named "qualified") tell
 * scripts/check-content.mjs to measure them against reference C's lengths; keep them.
 *
 * Nothing here is Minus Media's real copy. No figures, guarantee terms, client
 * names or results were supplied, so each of those is an instruction in brackets.
 */
import { defineConfig } from '../src/config/define.ts';

export default defineConfig({
  business: {
    name: 'Minus Media',
    // The header sits on near-black in this layout, so the white logo is the one that shows there.
    logo: { src: '', alt: 'Minus Media logo' },
    logoWhite: { src: '', alt: 'Minus Media' },
    // Reference C has no phone number anywhere. Leave empty to keep it that way (the header shows the CTA instead
    // and the thank-you page leads with the booking calendar); fill both to add a click-to-call on the thank-you page.
    phone: '',
    phoneDisplay: '',
    phoneEyebrow: '',
    serviceArea: 'Australia',
    abn: '',
  },

  brand: {
    // Reference C's palette: near-black, cream and one acid lime. The lime only ever carries near-black text
    // (17.2:1). Star gold is darkened from the reference's #e6a500 (1.9:1 on the card) to #a56f00 (3.8:1).
    colours: {
      heading: '#0a0a0a',
      body: '#45443e',
      primary: '#d7ff3f',
      'primary-hover': '#c6f02a',
      'on-primary': '#0a0a0a',
      accent: '#0a0a0a',
      'accent-text': '#0a0a0a',
      surface: '#fffcf2',
      'surface-muted': '#f3f0e5',
      border: '#d0d5dd',
      star: '#a56f00',
      night: '#0a0a0a',
      'on-night': '#fffcf2',
      highlight: '#d7ff3f',
      card: '#f3f0e5',
      'card-border': '#dfdccf',
    },
    fonts: {
      // Bundled and self-hosted (SIL OFL). Reference C's family for everything but the section headlines.
      family: 'League Spartan',
      // Reference C's section headlines fall through to the system serif; no file is loaded for it.
      displayFamily: 'Times New Roman',
    },
    texture: { src: '', alt: '' },
    heroWash: 0,
    darkTone: 'night',
    tokens: {
      'radius-button': '5px',
      'radius-input': '6px',
      'radius-card': '12px',
      'radius-media': '8px',
      'button-transform': 'none',
      'button-border': '1px solid #0a0a0a',
      'button-shadow': 'none',
      'input-pad-icon': '14px',
      // Serif section headlines: 28 px at 390 wide, 36 px at 1440, regular weight, tight tracking.
      'fs-h2': 'clamp(28px, 0.762vw + 25px, 36px)',
      'lh-h2': '1.08',
      'ls-h2': '-0.035em',
      'weight-h2': '400',
      'fs-button': '17px',
      // 28 px of section padding at 390 wide, 40 at 1440, as measured.
      'section-pad': 'clamp(28px, 1.143vw + 23.5px, 40px)',
    },
  },

  proof: {
    // Reference C shows no rating total or review count; each video card carries its own five stars.
    rating: '',
    count: '',
    source: '',
    avatars: { src: '', alt: '' },
  },

  tracking: {
    // From Minus Media's Meta Business Manager.
    metaPixelId: '',
  },

  cta: {
    // Pattern: Book your [named offer] call. The named offer is repeated on every button. About 26 characters.
    label: 'Book your [offer name] call',
    target: '#c-booking',
    // Nothing sits under the buttons on reference C (the hero has its own urgency line, empty by default).
    under: 'none',
    reinforcement: '',
    icon: 'arrow',
  },

  header: {
    stickyPhoneButton: false,
    // A compact CTA at the right of the header on desktop, nothing on phones.
    action: 'cta',
  },

  form: {
    // Reference C's fields: four contact fields and one required confirmation, with visible labels.
    labels: 'visible',
    fields: [
      { name: 'name', type: 'text', label: 'Full name', placeholder: 'Full name', required: true, autocomplete: 'name', minLength: 2 },
      { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Phone', required: true },
      { name: 'email', type: 'email', label: 'Email', placeholder: 'Email', required: true },
      { name: 'company', type: 'text', label: 'Company name', placeholder: 'Company name', required: true, autocomplete: 'organization', minLength: 2 },
      {
        name: 'qualified',
        type: 'checkbox',
        // Pattern: I confirm my business [does the trade] and already [meets the threshold], both in **bold**. About 109 characters.
        label: 'I confirm my business **[works in the trades the offer is for]** and **[meets the real qualifying threshold]**.',
        placeholder: '',
        required: true,
        // About 44 characters.
        hint: 'Required to book your [offer name] call.',
      },
    ],
    submitLabel: '',
    // The GoHighLevel inbound webhook for this campaign (see src/lib/submit-lead.ts).
    destination: { url: '', method: 'POST', extra: {} },
    thankYouPath: '/thank-you/',
    messages: {
      required: 'Please fill in this field',
      email: 'Enter a valid email address',
      phone: 'Enter an Australian number, like 0412 345 678 or (03) 9123 4567',
      postcode: 'Enter a four digit postcode',
      minLength: 'Please add a little more detail',
      generic: 'Something went wrong. Please try again.',
      checkbox: 'Please tick the box to confirm your business qualifies',
    },
    sendingLabel: 'Sending...',
  },

  urgency: {
    // Reference C hard-codes "x of y spots available" and a closing date under the hero CTA. Never generate either.
    // If Minus Media has a real, written intake limit, write it here by hand and remove it the day it stops being true.
    line: '',
  },

  legal: {
    terms: {
      title: 'Terms & Conditions',
      label: 'Terms & Conditions',
      sections: [
        { heading: 'The call', paragraphs: ['What the call is, how long it runs, that it is free, and that booking it does not commit the business to anything.'] },
        { heading: 'The offer and guarantee', paragraphs: ['The offer and any guarantee word for word from the signed agreement: what is promised, by when, how it is measured and what is refunded.'] },
        { heading: 'Who it is for', paragraphs: ['The qualifying threshold, the trades and the regions the offer covers.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      label: 'Privacy Policy',
      sections: [
        { heading: 'What we collect', paragraphs: ['List the details the form collects and that the page uses advertising cookies through the Meta pixel.'] },
        { heading: 'How we use it', paragraphs: ['Say the details are used to arrange the call and to measure the ads, and are not sold.'] },
        { heading: 'Contact', paragraphs: ['How to ask for details to be corrected or deleted, with an email address.'] },
      ],
    },
  },

  seo: {
    title: 'Book a call | Minus Media',
    description: 'One sentence naming who the offer is for and what the call decides, for link previews.',
    noindex: true,
    ogImage: { src: '', alt: '' },
  },

  footer: {
    copyrightSuffix: 'All rights reserved.',
    // Optional. About 173 characters on the reference. Leave empty to hide the line.
    disclaimer: 'Optional platform disclaimer the client\'s adviser has approved, for example that this site is not part of or endorsed by the ad platform. Leave empty to hide it.',
  },

  thankYou: {
    headline: 'Thank You',
    subheadline: '[What to do next, in a few words]',
    steps: [
      { title: 'Step one: choose a time', body: 'Say the calendar opens from the button above and how long the call takes, so they pick a time that suits.' },
      { title: 'Step two: the confirmation', body: 'What arrives after booking (an email or text), from whom, and what to have ready for the call.' },
      { title: 'Step three: the call', body: 'Who they will speak with and what the call decides, and that there is no obligation either way.' },
    ],
    phoneLabel: 'Prefer to talk? Call us now:',
    seoTitle: 'Thank You | Minus Media',
    // The booking calendar the visitor picks a time in (a GoHighLevel calendar link). Empty hides the button.
    bookingUrl: '',
    bookingLabel: 'Choose a time for your call',
  },

  /* ---------------------------------------------------------------------- */
  /* Sections, in reference C's order. Set enabled: false to drop one; the  */
  /* backgrounds re-plan. docs/sections.md says what each one needs.        */
  /* ---------------------------------------------------------------------- */
  sections: [
    {
      // Job: qualify by trade, name the outcome with a number, reverse the risk, let the video explain, ask.
      // Objection handled: "is this for a business like mine, and what if it does not work?"
      // Asset: a 16:9 explainer (two to four minutes, captions burned in) and its poster frame.
      type: 'hero',
      id: 'c-hero',
      enabled: true,
      content: {
        imageLayout: 'video',
        // Pattern: FOR [TRADE] [ROLE PLURAL] ONLY. Must fit one line on the pill at 390 wide. About 40 characters.
        eyebrow: 'FOR [TRADE] AND [TRADE] BUSINESSES ONLY',
        // Two parts: the moment they dread, ending in "to" (about 27), then the outcome in their unit of work (about 29).
        headline: '[The moment they dread] to',
        headlineAccent: '$[amount] worth of [work unit].',
        // The guarantee line. Only with written terms; otherwise the qualifying condition. About 36 characters.
        body: 'Guaranteed. Or [what you give back].',
        image: { src: '', alt: '' },
        video: {
          poster: { src: '', alt: 'Poster frame of the explainer video' },
          // A YouTube, Vimeo or Wistia link, or a direct MP4. Nothing loads until the visitor taps play.
          videoUrl: '',
          label: '[Play label]',
          caption: '[What the video explains]',
        },
        showUrgency: true,
      },
    },
    {
      // Job: take the details that qualify the call with as little reading as possible.
      // Objection handled: "this will be a sales call". Asset: none.
      type: 'offerForm',
      id: 'c-booking',
      enabled: true,
      content: {
        layout: 'booking',
        // Pattern: Book your [named offer] call. About 31 characters.
        headline: 'Book your [offer name] call',
        // The fear, removed, in one short sentence (bold). About 24 characters.
        lead: 'This isn\'t a [fear].',
        // About 144 characters.
        intro: 'Say the call is [free], how long it runs and what it decides, and that they will not be asked to sign up or commit to anything on it.',
        bundleImage: { src: '', alt: '' },
        bullets: [],
        reinforcement: '',
      },
    },
    {
      // Job: business owners like the visitor, on video, naming a result. A CTA on every card.
      // Objection handled: "does this work for businesses like mine?"
      // Assets: three to six 16:9 client videos with poster frames that print the result, used with permission.
      type: 'testimonials',
      id: 'c-testimonials',
      enabled: true,
      content: {
        layout: 'videos',
        // About 25 characters.
        headline: 'Hear it from [who they are].',
        items: [
          { headline: '[Result as a number, from their records].', body: '', name: '[Name]', suburb: '[Business name]', rating: 5, image: { src: '', alt: '' }, videoUrl: '' },
          { headline: '[Result as a number, from their records].', body: '', name: '[Name]', suburb: '[Business name]', rating: 5, image: { src: '', alt: '' }, videoUrl: '' },
          { headline: '[Result as a number, from their records].', body: '', name: '[Name]', suburb: '[Business name]', rating: 5, image: { src: '', alt: '' }, videoUrl: '' },
          { headline: '[Result as a number, from their records].', body: '', name: '[Name]', suburb: '[Business name]', rating: 5, image: { src: '', alt: '' }, videoUrl: '' },
        ],
      },
    },
  ],
});
