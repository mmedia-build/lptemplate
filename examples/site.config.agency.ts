/**
 * Agency preset: the quiz funnel of reference C (a marketing agency's free
 * strategy-session page, see docs/teardown-c.md). The whole page is one
 * section: an intro screen, one question per screen, the contact step, a
 * loader, then the thank-you route with the calendar. Every text slot holds
 * an instruction written to the length of the real content.
 *
 * Use it when the business sells a call (an agency, a consultant, a coach, a
 * builder who qualifies hard) and the ad has already done the persuading.
 * The page asks; it does not argue. For a page that has to persuade, start
 * from site.config.ts or the renovation preset and end with the offer form.
 *
 * To build with it: SITE_CONFIG=examples/site.config.agency.ts npm run build
 * Or copy it over site.config.ts in a client repository.
 *
 * The section id "c-quiz" tells scripts/check-content.mjs to measure the
 * quiz against reference C's lengths, step by step, by step name. Keep the
 * id and the step names; drop a step by deleting it (the checker skips it).
 */
import { defineConfig } from '../src/config/define.ts';

export default defineConfig({
  business: {
    name: 'Business Name',
    logo: { src: '', alt: 'Business Name logo' },
    logoWhite: { src: '', alt: 'Business Name' },
    phone: '0300000000',
    phoneDisplay: '03 0000 0000',
    // Not shown in the funnel bar (reference C has no phone). Used on the thank-you page.
    phoneEyebrow: 'GOT QUESTIONS?',
    serviceArea: 'Australia',
    abn: '',
  },

  brand: {
    // Reference C's palette. Black on the lime is 16.6:1. The lime is never used for text on white;
    // 'accent-text' is the darker green for the offer card eyebrow (the reference's fails contrast).
    colours: {
      heading: '#000000',
      body: '#495057',
      primary: '#cff128',
      'primary-hover': '#d5f342',
      'on-primary': '#000000',
      accent: '#cff128',
      'accent-text': '#566b00',
      'accent-strong': '#1a1a1a',
      surface: '#ffffff',
      'surface-muted': '#f9f9f9',
      border: '#cbcbcb',
      danger: '#c62828',
    },
    fonts: {
      family: 'Inter',
      headingFamily: 'Inter',
      // The reference's display face is a commercial condensed Futura. Anton is the bundled open stand-in.
      displayFamily: 'Anton',
    },
    texture: { src: '', alt: '' },
    heroWash: 0,
    darkTone: 'texture',
    tokens: {},
  },

  proof: {
    // Reference C shows no rating on the first screen. Proof sits inside the offer cards late in the quiz.
    rating: '',
    count: '',
    source: 'Google',
    avatars: { src: '', alt: '' },
  },

  tracking: {
    metaPixelId: '',
    // Lead score at which the custom "QualifiedLead" pixel event fires on submit (reference C: 60).
    qualifiedLeadScore: 60,
  },

  cta: {
    // Not rendered by the quiz (its buttons have their own labels) but kept so sections from A or B can be mixed in.
    label: 'CLAIM YOUR FREE [LENGTH] [CALL NAME]',
    target: '#c-quiz',
    under: 'none',
    reinforcement: '',
  },

  header: {
    stickyPhoneButton: false,
  },

  // The slim bar (logo and Back) and a one-line legal footer.
  layout: { chrome: 'funnel' },

  form: {
    // The quiz collects its own fields; this block only carries where the lead goes and the thank-you route.
    fields: [],
    submitLabel: '',
    destination: { url: '', method: 'POST', extra: {} },
    thankYouPath: '/thank-you/',
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Enter an Australian number, like 0412 345 678',
      postcode: 'Enter a four digit postcode',
      minLength: 'Please add a little more',
      generic: 'Something went wrong. Please try again or call us.',
    },
    sendingLabel: 'Sending...',
  },

  urgency: { line: '' },

  legal: {
    terms: {
      title: 'Terms & Conditions',
      label: 'Terms & Conditions',
      sections: [
        { heading: '1. The free call', paragraphs: ['What the call is, how long it runs, who it is for and that booking it creates no obligation to buy.'] },
        { heading: '2. Eligibility', paragraphs: ['Who qualifies for a call (the answers that screen a business out) and the countries or states served.'] },
        { heading: '3. No-shows', paragraphs: ['What happens when a booked call is missed without notice, and how to reschedule.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      label: 'Privacy Policy',
      sections: [
        { heading: 'What we collect', paragraphs: ['List every answer the quiz collects. Say that the first name and email are saved as soon as the email step is passed, before the form is finished, and that the page uses advertising cookies through the Meta pixel.'] },
        { heading: 'How we use it', paragraphs: ['Say the details are used to prepare for the call, to contact the visitor about it and to measure the ads, and are not sold.'] },
        { heading: 'Contact', paragraphs: ['How to ask for details to be corrected or deleted, with the business phone number and an email address.'] },
      ],
    },
  },

  seo: {
    title: 'Free [Call Name] | Business Name',
    description: 'One sentence naming who the call is for, what they leave with and that it is free, for link previews.',
    noindex: true,
    ogImage: { src: '', alt: '' },
  },

  footer: {
    copyrightSuffix: 'All rights reserved.',
  },

  thankYou: {
    // With booking.embedUrl set this page is the calendar; the steps under it say what happens after they pick a time.
    headline: 'Pick A Time',
    subheadline: 'Say the call is booked once they pick',
    booking: { embedUrl: '', title: 'Choose a time for your call', height: 760 },
    steps: [
      { title: 'Step one: choose a slot', body: 'Tell them to pick a time in the calendar and that a confirmation arrives by SMS and email straight away.' },
      { title: 'Step two: before the call', body: 'What to have ready (numbers, logins, examples) and who will call, from which number, so they answer.' },
      { title: 'Step three: on the call', body: 'What the call covers, how long it runs and what they leave with, whether or not you work together.' },
    ],
    phoneLabel: 'Prefer to talk now? Call us:',
    seoTitle: 'Book Your Call | Business Name',
  },

  // Where a screened-out visitor lands. A kind no, then something free to take away. Delete to skip the page
  // (and clear quiz.notFitPath so nobody is sent there).
  notFit: {
    seoTitle: 'Not The Right Fit Yet | Business Name',
    // About 52 characters.
    headline: 'Say kindly that the call is not the right fit yet',
    // About 169 characters.
    body: 'Explain who the calls are kept for, that looking around is fine, and that you cannot book a call today. Keep it warm and short, with no blame on the visitor at all.',
    resources: [
      // Title about 15, body about 95, link label about 12 characters.
      { title: '[Free resource]', body: 'One or two lines on what this free resource is and the result it helps them reach alone.', linkLabel: 'Get It Free', href: '', image: { src: '', alt: '' } },
      // Title about 24, body about 82, link label about 16 characters.
      { title: '[Second free resource]', body: 'One or two lines on a second free thing they can learn from without you.', linkLabel: 'Watch It For Free', href: '', image: { src: '', alt: '' } },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* One section. The order of the steps is the order of the screens.       */
  /* docs/sections.md says what each step kind is for.                      */
  /* ---------------------------------------------------------------------- */
  sections: [
    {
      type: 'quiz',
      id: 'c-quiz',
      enabled: true,
      content: {
        // Job: restate the ad's offer on one screen and get a tap that submits nothing.
        // Fit: eyebrow, headline, paragraph and button must all sit above 664 px at 390 wide. They do at these lengths.
        intro: {
          // A short uppercase qualifier, hand written. About 21 characters. Never looked up from the visitor's location.
          eyebrow: 'FOR [WHO IT IS FOR]:',
          // Pattern: Free [length] [named deliverable] session. About 41 characters, six words. Set in the display face, uppercase.
          headline: 'Free [length] [named deliverable] session',
          // Pattern: the claim, the dollar value in brackets, who it is strictly for, then an invitation. About 193 characters.
          body: 'Say what they claim and that it is free with no obligation ($[value] value). Say who it is strictly for, in one line that filters. Close with an invitation in the same plain, upbeat voice.',
          // Two to five words. It starts the questions; nothing is sent. The reference tested "Get Started" against a fit-check label.
          cta: 'Get Started',
        },
        // Ten dots for sixteen questions: one lights per question, so the row is full well before the end.
        progressDots: 10,
        backLabel: 'Back',
        continueLabel: 'Continue',

        steps: [
          {
            // Job: the easiest possible first answer, asked like a person would. About 125 characters.
            name: 'first_name',
            kind: 'text',
            question: 'Promise this will be quick and painless, add a light aside in brackets, then ask for their name as if it were only polite.',
            label: 'First name',
            placeholder: 'Enter your first name',
            autocomplete: 'given-name',
            minLength: 2,
          },
          {
            // Job: capture the lead on screen two. A one-word reaction, then the ask. About 28 characters plus the name.
            name: 'email',
            kind: 'email',
            question: 'Awesome! What\'s your email{name}?',
            label: 'Email address',
            placeholder: 'Email *',
          },
          {
            // Job: split the audience in one tap. About 24 characters; the sub-line about 126 and uses the name.
            name: 'sells',
            kind: 'cards',
            question: 'First, what do you [do]?',
            sub: 'Thanks{name}, then say you have a few questions to find out whether the business is a good fit for helping them to grow.',
            options: [
              // Title about 7 characters; description about 35: three or four examples of who picks this card.
              { label: '[Type A]', description: 'Three or four examples of this type', icon: 'box' },
              { label: '[Type B]', description: 'Three or four examples of this one', icon: 'briefcase' },
            ],
          },
          {
            // Job: learn what they already do; recognition, not recall. About 60 characters. Nine options on the reference.
            name: 'marketing',
            kind: 'multi',
            question: 'Okay great! What types of [thing] are you currently using?',
            note: '(Select more than one if applicable)',
            // Points once if either of the first two is ticked (already advertising).
            scoreAny: { values: ['[Channel one]', '[Channel two]'], score: 5 },
            options: [
              { label: '[Channel one]', icon: 'megaphone' },
              { label: '[Channel two]', icon: 'search' },
              { label: '[Channel three]', icon: 'video' },
              { label: '[Other paid channel]', icon: 'megaphone', icon2: 'briefcase' },
              { label: '[Search and content]', icon: 'search' },
              { label: '[Organic social]', icon: 'video', icon2: 'chat' },
              { label: 'Referrals / Word of Mouth', icon: 'people' },
              { label: 'TV, Radio or Print', icon: 'broadcast' },
              { label: 'None', icon: 'ban' },
            ],
          },
          {
            // Job: where they are, for routing. About 39 characters. Preselect the common answer so Continue is live.
            name: 'location',
            kind: 'select',
            question: 'What [state] is your business based in?',
            label: 'Where the business is based',
            prompt: 'Choose one',
            preselect: '[Most common answer]',
            options: [{ label: '[Most common answer]' }, { label: '[Second answer]' }, { label: '[Third answer]' }, { label: '[Fourth answer]' }, { label: 'Somewhere else' }],
          },
          {
            // Job: the first money question. Say why you ask. Question about 42, sub-line about 142 characters.
            name: 'budget',
            kind: 'choice',
            question: 'How much is your monthly [kind of] budget?',
            sub: 'Say you ask this first to see if you would be a good fit, and second to work out which approach is the best one inside what they can spend.',
            // The client's own bands, lowest first. Eight on the reference. Scores add to the lead score (up to 30 here).
            options: [
              { label: '[Under lowest band]' },
              { label: '[Band two]', score: 10 },
              { label: '[Band three]', score: 18 },
              { label: '[Band four]', score: 24 },
              { label: '[Band five]', score: 30 },
              { label: '[Band six]', score: 30 },
              { label: '[Band seven]', score: 30 },
              { label: '[Top band and above]', score: 30 },
            ],
          },
          {
            // Job: a fact you can research before the call. About 26 characters after the name; sub-line about 44.
            name: 'website',
            kind: 'text',
            question: '{name|Great}, what\'s your website url?',
            sub: 'If you don\'t have one, type "don\'t have one"',
            label: 'Website',
            placeholder: 'Website *',
            inputmode: 'url',
            minLength: 2,
          },
          {
            // Job: get them to write the call's opening for you. About 81 characters. The dictate chip label about 43.
            name: 'about',
            kind: 'longtext',
            question: 'Ask them to briefly describe the business: what they sell, to whom, at what price?',
            label: 'About your business',
            placeholder: 'Type your answer here…',
            rows: 5,
            dictateLabel: 'Dictate about your business for 1-2 minutes',
          },
          {
            // Job: the qualifying number. About 36 characters; the sub-line about 119 and gives the reason.
            name: 'revenue',
            kind: 'choice',
            question: 'What is your current YEARLY revenue?',
            sub: 'Say you ask so that you only suggest things that will have a meaningful effect on the money their company brings in.',
            // The lowest band screens out. Scores up to 30.
            options: [
              { label: '[Under lowest band]', disqualify: true },
              { label: '[Band two]' },
              { label: '[Band three]', score: 8 },
              { label: '[Band four]', score: 14 },
              { label: '[Band five]', score: 20 },
              { label: '[Band six]', score: 25 },
              { label: '[Band seven]', score: 28 },
              { label: '[Top band and above]', score: 30 },
            ],
          },
          {
            // Job: make them say the goal. The gap between this and the last answer is the sale. About 36 and 79 characters.
            name: 'revenue_goal',
            kind: 'choice',
            question: 'What is your TARGET yearly revenue?',
            sub: 'Say you ask so you can build them a plan that helps them get to that number.',
            options: [
              { label: '[Under lowest band]' },
              { label: '[Band two]' },
              { label: '[Band three]' },
              { label: '[Band four]' },
              { label: '[Band five]' },
              { label: '[Band six]' },
              { label: '[Band seven]' },
              { label: '[Top band and above]' },
            ],
          },
          {
            // Job: the pain, in their words. About 91 characters after the name; the bracketed nudge about 162.
            name: 'obstacle',
            kind: 'longtext',
            question: '{name|Alright}, be honest: what is the number one obstacle holding you back from that goal?',
            note: '(Ask them not to skip the uncomfortable details, say you need to know every one, and ask for as much as they can give about what they feel is in the way.)',
            label: 'Your biggest obstacle',
            placeholder: 'Type your answer here…',
            rows: 5,
            dictateLabel: 'Dictate what is holding you back for 1-2 minutes',
          },
          {
            // Job: urgency, in their words. About 36 characters. "Never" screens out. Scores up to 15.
            name: 'timing',
            kind: 'choice',
            question: 'When are you looking to get started?',
            options: [
              { label: 'Immediately', score: 15 },
              { label: 'In the Next 2 Weeks', score: 10 },
              { label: '2-4 Weeks', score: 10 },
              { label: '4-6 Weeks', score: 10 },
              { label: '6 Weeks+', score: 5 },
              { label: 'Never', disqualify: true },
              { label: '[A joke option in the brand voice]' },
            ],
          },
          {
            // Job: a choice between two yeses, each with its own proof. Delete this step when the business sells one thing.
            // Question about 93 characters. Per card: eyebrow about 12 to 21, title 6 or 7, description about 253, button about 11.
            name: 'offer',
            kind: 'offers',
            question: 'Okay great, which of the following best describes your situation and what you are after?',
            offers: [
              {
                value: 'Done for you',
                eyebrow: 'Do It For Me',
                title: '[Name]',
                description: 'In the visitor\'s voice: say they would rather hire you to do it all. In brackets, the honest trade-off (costs more, takes less of their time). Close with a P.S. that says what makes you unlike others they have tried, with one light line.',
                cta: 'Get Started',
                proofImage: { src: '', alt: 'Businesses we have worked with' },
                proofLine: '[Rating] stars out of [count] reviews',
                score: 10,
              },
              {
                value: 'Teach me',
                eyebrow: 'Teach Me How To Do It',
                title: '[Name]',
                description: 'In the visitor\'s voice: say they want to learn it and do it themselves, and name what they get. In brackets, the honest trade-off (costs less, takes more of their time). Close with a P.S. naming one extra that comes with it, such as a community.',
                cta: 'Get Started',
                proofImage: { src: '', alt: 'People who have taken the course' },
                proofLine: '[Rating] stars out of [count] reviews',
                score: 4,
              },
            ],
          },
          {
            // Job: measure commitment and prime it. Pill about 41 characters; question about 130. 1 or 2 screens out.
            name: 'commitment',
            kind: 'scale',
            pill: 'We\'re almost done, just 2 more questions.',
            question: 'On a scale of 1-10, with 1 being fine where they are and 10 being willing to do anything to reach the goal, what number are they?',
            min: 1,
            max: 10,
            disqualifyAtOrBelow: 2,
            scoreBands: [[9, 10], [7, 6], [5, 3]],
          },
          {
            // Job: attribution you cannot get from the pixel. About 34 characters; sub-line about 87. Fifteen sources on the reference.
            name: 'heard',
            kind: 'select',
            question: 'Where did you FIRST hear about us?',
            sub: 'Say you are honestly curious and that answering this one helps the business get better.',
            label: 'Where you first heard about us',
            prompt: 'Please select one*',
            options: [
              { label: 'Facebook ad' },
              { label: 'Instagram ad' },
              { label: 'YouTube' },
              { label: 'A friend, past client or colleague referred me' },
              { label: 'Search engine' },
              { label: 'ChatGPT, Claude, Gemini or another AI' },
              { label: '[Email from the business]' },
              { label: '[A podcast, book or show the business appears in]' },
            ],
            otherOption: 'Other (please specify)',
            otherPlaceholder: 'Where did you hear about us? *',
          },
          {
            // Job: a promise to turn up, made before they see the calendar. Pill about 33 characters plus the name; question about 97.
            name: 'promise',
            kind: 'yesno',
            pill: 'Okay{name} you made it. Last question…',
            question: 'Ask them to promise that if they qualify for a call they will show up at the time they pick?',
            options: [
              { label: 'No', emoji: '🙅' },
              { label: 'Yes', emoji: '👌' },
            ],
          },
        ],

        // Job: the only real form, shown after they have qualified. First name and website arrive filled in.
        contact: {
          // About 54 characters: tell them they qualified.
          question: 'Tell them they made the cut and it gets good from here',
          // About 141 characters.
          sub: 'Say not everyone is a fit but, going on their answers, you can help. Ask them to pop in their details and pick a time for the call.',
          fields: [
            { name: 'first_name_confirm', type: 'text', label: 'First name', placeholder: 'First Name *', required: true, autocomplete: 'given-name', prefillFrom: 'first_name' },
            { name: 'last_name', type: 'text', label: 'Last name', placeholder: 'Last Name *', required: true, autocomplete: 'family-name' },
            { name: 'phone', type: 'tel', label: 'Mobile', placeholder: 'Mobile *', required: true },
            { name: 'company', type: 'text', label: 'Company name', placeholder: 'Company Name *', required: true, autocomplete: 'organization' },
            { name: 'website_confirm', type: 'text', label: 'Website', placeholder: 'Website *', required: true, prefillFrom: 'website' },
          ],
          // About 24 characters.
          submitLabel: 'Book My [Name Of Call]',
        },

        // Job: cover the wait and make the booking feel earned. Lines of about 21 to 39 characters; closing line about 31.
        loader: {
          enabled: true,
          lines: ['Checking your answers', 'Reviewing your business goals', 'Connecting you with the best [role]', 'Loading your calendar'],
          doneLine: 'All set! Opening your calendar…',
          durationMs: 7250,
        },

        // First name and email are sent as soon as the email step passes, flagged partial, so an abandoned quiz is still a lead.
        capturePartial: true,
        notFitPath: '/not-a-fit/',

        // Desktop only, once: shown when the pointer leaves through the top of the window. Clear the headline to turn it off.
        exitPrompt: {
          // About 21 characters, display face.
          headline: 'Hold on, [nickname].',
          // About 195 characters.
          body: 'Suggest trying that again. Say the form takes less than two minutes, tell them to focus in the brand voice, and restate what they get their hands on at the end with its ($[value] value).',
          // About 36 characters.
          cta: 'Give me the $[value] [thing] for free',
          // About 87 characters.
          disclaimer: 'Privacy line in the brand voice: say what you think of spam and that you never send it.',
          image: { src: '', alt: '' },
        },

        messages: {
          required: 'This field is required',
          email: 'Please enter a valid email address',
          phone: 'Enter an Australian number, like 0412 345 678',
          minLength: 'Please add a little more',
          choose: 'Please choose an option',
          generic: 'Something went wrong. Please try again or call us.',
        },
      },
    },
  ],
});
