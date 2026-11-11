/**
 * Minus Media: the quiz funnel of reference C (examples/site.config.agency.ts)
 * filled for the agency's own roadmap call. A working draft, not a finished
 * client build.
 *
 * What is filled comes from the agency's own records (Notion and the
 * GoHighLevel sub-account, read on 11 November 2026): the name, phone, the
 * accent blue, who the calls are for, the live "15 Min Roadmap Call" calendar,
 * the no-show rule, and the answer options already used in its surveys.
 * What could not be verified is left as a bracketed placeholder or left out,
 * and is listed in docs/verification.md under "Minus Media draft". Nothing
 * here states a guarantee, a review count, a result or a dollar value.
 *
 * Differences from the preset: no budget step and no offer cards (one service,
 * and the agency's surveys ask revenue by month, not ad budget), Australian
 * states in place of countries, and no screening on revenue (no minimum is
 * written down anywhere).
 *
 * To build with it: SITE_CONFIG=examples/site.config.minus-media.ts npm run build
 */
import { defineConfig } from '../src/config/define.ts';

export default defineConfig({
  business: {
    name: 'Minus Media',
    // The logo PNG lives in the Notion brand assets; copy it to src/images/minus-media/ and name it here.
    logo: { src: '', alt: 'Minus Media logo' },
    logoWhite: { src: '', alt: 'Minus Media' },
    phone: '0451027610',
    phoneDisplay: '0451 027 610',
    phoneEyebrow: 'GOT QUESTIONS?',
    serviceArea: 'Australia',
    // Not found in the records. Add before launch.
    abn: '',
  },

  brand: {
    // The agency's palette is black, white and grey with one blue accent (#518CFF, from its reporting SOP).
    // White on that blue is 3.2:1, so buttons carry black text (6.5:1), as the reference does on its lime.
    colours: {
      heading: '#0b0b0c',
      body: '#495057',
      primary: '#518cff',
      'primary-hover': '#6a9cff',
      'on-primary': '#000000',
      accent: '#518cff',
      'accent-text': '#1f5fe0',
      'accent-strong': '#111111',
      surface: '#ffffff',
      'surface-muted': '#f6f7f9',
      border: '#cbcbcb',
      danger: '#c62828',
      focus: '#111111',
    },
    fonts: {
      // The brand faces (Proxima Nova, Avenir) are commercial and not bundled. Inter and Anton stand in, as on the reference.
      family: 'Inter',
      headingFamily: 'Inter',
      displayFamily: 'Anton',
    },
    texture: { src: '', alt: '' },
    heroWash: 0,
    darkTone: 'texture',
    tokens: {},
  },

  proof: {
    // No rating or review count is recorded anywhere. Leave empty until there is a real profile to quote.
    rating: '',
    count: '',
    source: 'Google',
    avatars: { src: '', alt: '' },
  },

  tracking: {
    // The live funnel's pixel is 2483145255500869 (read from its tracking code). Left empty so a preview build
    // does not fire into the live pixel; set it for the production deploy.
    metaPixelId: '',
    qualifiedLeadScore: 60,
  },

  cta: {
    label: 'BOOK YOUR FREE ROADMAP CALL',
    target: '#c-quiz',
    under: 'none',
    reinforcement: '',
  },

  header: { stickyPhoneButton: false },

  layout: { chrome: 'funnel' },

  form: {
    fields: [],
    submitLabel: '',
    // The GoHighLevel inbound webhook for the Minus Media sub-account. Not found; see src/lib/submit-lead.ts.
    destination: { url: '', method: 'POST', extra: { source: 'quiz-funnel' } },
    thankYouPath: '/thank-you/',
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Enter an Australian number, like 0412 345 678',
      postcode: 'Enter a four digit postcode',
      minLength: 'Please add a little more',
      generic: 'Something went wrong. Please try again or call us on 0451 027 610.',
    },
    sendingLabel: 'Sending...',
  },

  urgency: { line: '' },

  legal: {
    // No terms or privacy policy were found. These are instructions, not legal text.
    terms: {
      title: 'Terms & Conditions',
      label: 'Terms & Conditions',
      sections: [
        { heading: '1. The roadmap call', paragraphs: ['[What the call is, that it runs for 15 minutes by phone, who it is for, and that booking it creates no obligation to buy.]'] },
        { heading: '2. Missed calls', paragraphs: ['[The no-show rule from the booking calendar, in plain words, and how to reschedule.]'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      label: 'Privacy Policy',
      sections: [
        { heading: 'What we collect', paragraphs: ['[List every answer the quiz collects. Say that the first name and email are saved as soon as the email step is passed, and that the page uses advertising cookies through the Meta pixel.]'] },
        { heading: 'How we use it', paragraphs: ['[What the details are used for and who they are shared with.]'] },
        { heading: 'Contact', paragraphs: ['[How to ask for details to be corrected or deleted: 0451 027 610 or nick@minusmedia.com.au.]'] },
      ],
    },
  },

  seo: {
    title: 'Free Roadmap Call | Minus Media',
    description: 'A free 15-minute roadmap call for building, renovation and landscaping businesses that want more of the right customers.',
    noindex: true,
    ogImage: { src: '', alt: '' },
  },

  footer: { copyrightSuffix: 'All rights reserved.' },

  thankYou: {
    headline: 'Thank You',
    // Rewrite once the calendar is embedded, for example "Pick a time below to lock in your call".
    subheadline: '[How and when the call time is set]',
    // The live calendar is "Minus Media - 15 Min Roadmap Call" (GoHighLevel id KLxtQf33csANO4QvCYVO). Paste its embed URL
    // here (Calendars, Share, Embed code, the iframe src) and this page becomes the booking step.
    booking: { embedUrl: '', title: 'Choose a time for your roadmap call', height: 760 },
    steps: [
      { title: '[Step one: locking in a time]', body: '[Who gets in touch, from which number and how soon, or that they choose a slot in the calendar above.]' },
      { title: 'Step two: the call', body: 'It is a phone call at the time you pick. We talk through your business, your goals and what would work best for you.' },
      { title: '[Step three: what happens after]', body: '[What they leave the call with and what the next step is if it looks like a fit.]' },
    ],
    phoneLabel: 'Prefer to talk now? Call us:',
    seoTitle: 'Thank You | Minus Media',
  },

  notFit: {
    seoTitle: 'Not The Right Fit Yet | Minus Media',
    headline: 'It looks like we\'re not the right fit for you yet',
    body: 'Our roadmap calls are kept for trade businesses that are ready to grow right now. If you\'re still weighing things up, no dramas. We just can\'t book you a call today.',
    // No free resource is on record. Add one or two (title, a line, a link) and they show as cards.
    resources: [],
  },

  sections: [
    {
      type: 'quiz',
      id: 'c-quiz',
      enabled: true,
      content: {
        intro: {
          eyebrow: 'FOR BUILDERS AND TRADES:',
          headline: 'Free 15-minute lead flow roadmap call',
          body: 'Claim a free, no-obligation 15-minute roadmap call. We\'ll talk through your business, your goals and the best way to get more of the right customers. It\'s only for trade businesses that are ready to grow.',
          cta: 'Let\'s Go',
        },
        // One dot per question here: thirteen questions, ten dots, so the row still fills before the end.
        progressDots: 10,
        backLabel: 'Back',
        continueLabel: 'Continue',

        steps: [
          {
            name: 'first_name',
            kind: 'text',
            question: 'Righto, this takes about two minutes and there are no trick questions (promise). First things first, what\'s your first name?',
            label: 'First name',
            placeholder: 'Enter your first name',
            autocomplete: 'given-name',
            minLength: 2,
          },
          {
            name: 'email',
            kind: 'email',
            question: 'Good one{name}. What\'s your email?',
            label: 'Email address',
            placeholder: 'Email *',
          },
          {
            name: 'sells',
            kind: 'cards',
            question: 'First up, what do you do?',
            sub: 'Thanks{name}. We\'ve got a few quick questions to see whether we\'re the right people to help you win more of the right jobs.',
            options: [
              { label: 'Builder', description: 'New homes, extensions, knockdown rebuilds', icon: 'house' },
              { label: 'Renovator', description: 'Kitchens, bathrooms, whole-home renos', icon: 'tools' },
              { label: 'Landscaper', description: 'Landscapes, decks, pergolas and pools', icon: 'leaf' },
              { label: 'Other trade', description: 'Roofing, windows, cleaning and others', icon: 'hardhat' },
            ],
          },
          {
            // Options are the ones already in the agency's "What have you tried in the past" survey field.
            name: 'marketing',
            kind: 'multi',
            question: 'Nice one. How are you getting your work at the moment?',
            note: '(Tick every one that applies)',
            scoreAny: { values: ['A marketing agency', 'Running ads myself'], score: 5 },
            options: [
              { label: 'Word of mouth', icon: 'people' },
              { label: 'Hipages', icon: 'search' },
              { label: 'Bought lead lists', icon: 'document' },
              { label: 'A marketing agency', icon: 'briefcase' },
              { label: 'Running ads myself', icon: 'megaphone' },
              { label: 'Flyers or letter drops', icon: 'mail' },
              { label: 'SEO', icon: 'search' },
              { label: 'Nothing yet', icon: 'ban' },
            ],
          },
          {
            name: 'location',
            kind: 'select',
            question: 'Where is your business based?',
            label: 'State or territory',
            prompt: 'Choose your state',
            preselect: 'Victoria',
            options: [
              { label: 'Victoria' },
              { label: 'New South Wales' },
              { label: 'Queensland' },
              { label: 'South Australia' },
              { label: 'Western Australia' },
              { label: 'Tasmania' },
              { label: 'Australian Capital Territory' },
              { label: 'Northern Territory' },
            ],
          },
          {
            name: 'website',
            kind: 'text',
            question: '{name|Great}, what\'s your website?',
            sub: 'If you don\'t have one yet, just type "none"',
            label: 'Website',
            placeholder: 'Website *',
            inputmode: 'url',
            minLength: 2,
          },
          {
            name: 'about',
            kind: 'longtext',
            question: 'Tell us about the business in a few lines. What do you build, where, and who for?',
            label: 'About your business',
            placeholder: 'Type your answer here…',
            rows: 5,
            dictateLabel: 'Rather talk? Dictate it for a minute or two',
          },
          {
            // Bands are the agency's own "current monthly revenue range" survey options. The points are a starting
            // weighting only; nobody is screened out on revenue because no minimum is written down.
            name: 'revenue',
            kind: 'choice',
            question: 'What\'s your current MONTHLY revenue?',
            sub: 'We ask so the plan we suggest matches where the business is right now, not where a textbook says it should be.',
            options: [
              { label: '$0 to $25,000' },
              { label: '$25,000 to $100,000', score: 15 },
              { label: '$100,000 to $200,000', score: 25 },
              { label: '$200,000+', score: 30 },
            ],
          },
          {
            name: 'revenue_goal',
            kind: 'choice',
            question: 'What monthly revenue are you aiming for?',
            sub: 'We ask so we can map out what it would take to get you from here to there.',
            options: [{ label: '$0 to $25,000' }, { label: '$25,000 to $100,000' }, { label: '$100,000 to $200,000' }, { label: '$200,000+' }],
          },
          {
            name: 'obstacle',
            kind: 'longtext',
            question: '{name|Alright}, be straight with us: what\'s the biggest thing holding the business back right now?',
            note: '(Not enough work? Leads that go nowhere? No time in the day? Give us the full picture, warts and all. The more you tell us, the more useful the call will be.)',
            label: 'Your biggest obstacle',
            placeholder: 'Type your answer here…',
            rows: 5,
            dictateLabel: 'Rather talk? Dictate what\'s getting in the way',
          },
          {
            name: 'timing',
            kind: 'choice',
            question: 'When do you want to get started?',
            options: [
              { label: 'Straight away', score: 15 },
              { label: 'In the next 2 weeks', score: 10 },
              { label: 'In the next month', score: 10 },
              { label: 'In 1 to 3 months', score: 5 },
              { label: 'Not any time soon', disqualify: true },
            ],
          },
          {
            name: 'commitment',
            kind: 'scale',
            pill: 'Nearly done. Two more after this one.',
            question: 'On a scale of 1 to 10, how serious are you about growing the business this year? (1 is happy as things are, 10 is ready to do what it takes.)',
            min: 1,
            max: 10,
            disqualifyAtOrBelow: 2,
            scoreBands: [[9, 30], [7, 20], [5, 10]],
          },
          {
            name: 'heard',
            kind: 'select',
            question: 'Where did you first hear about us?',
            sub: 'No wrong answers. It just helps us work out which of our own marketing is working.',
            label: 'Where you first heard about us',
            prompt: 'Please select one*',
            options: [
              { label: 'Facebook ad' },
              { label: 'Instagram ad' },
              { label: 'A friend or another tradie told me' },
              { label: 'Google search' },
              { label: 'YouTube' },
            ],
            otherOption: 'Somewhere else',
            otherPlaceholder: 'Where did you hear about us? *',
          },
          {
            // The live calendar says the call is by phone and that an unanswered call without notice cannot be rebooked.
            name: 'promise',
            kind: 'yesno',
            pill: 'Last one{name}, then you\'re done.',
            question: 'This is a phone call at the time you pick. Do you promise to answer, or tell us if plans change?',
            options: [
              { label: 'No', emoji: '🙅' },
              { label: 'Yes', emoji: '🤝' },
            ],
          },
        ],

        contact: {
          question: 'You\'re a fit. Last step: where can we reach you?',
          sub: 'Based on your answers, we can help. Pop your details in below and one of the team will be in touch about your free roadmap call.',
          fields: [
            { name: 'first_name_confirm', type: 'text', label: 'First name', placeholder: 'First Name *', required: true, autocomplete: 'given-name', prefillFrom: 'first_name' },
            { name: 'last_name', type: 'text', label: 'Last name', placeholder: 'Last Name *', required: true, autocomplete: 'family-name' },
            { name: 'phone', type: 'tel', label: 'Mobile', placeholder: 'Mobile *', required: true },
            { name: 'company', type: 'text', label: 'Business name', placeholder: 'Business Name *', required: true, autocomplete: 'organization' },
            { name: 'website_confirm', type: 'text', label: 'Website', placeholder: 'Website *', required: true, prefillFrom: 'website' },
          ],
          submitLabel: 'Book My Roadmap Call',
        },

        loader: {
          enabled: true,
          lines: ['Going over your answers', 'Looking at your goals', 'Lining up the right person', 'Getting your booking ready'],
          doneLine: 'All done. Taking you through…',
          durationMs: 7250,
        },

        capturePartial: true,
        notFitPath: '/not-a-fit/',

        exitPrompt: {
          headline: 'Hang on a second.',
          body: 'You\'re nearly there. The questions take about two minutes, and at the end you can book a free 15-minute roadmap call to talk through getting more of the right customers. Want to keep going?',
          cta: 'Yes, take me back to the questions',
          // A privacy line belongs here once the privacy policy exists.
          disclaimer: '',
          image: { src: '', alt: '' },
        },

        messages: {
          required: 'This field is required',
          email: 'Please enter a valid email address',
          phone: 'Enter an Australian number, like 0412 345 678',
          minLength: 'Please add a little more',
          choose: 'Please choose an option',
          generic: 'Something went wrong. Please try again or call us on 0451 027 610.',
        },
      },
    },
  ],
});
