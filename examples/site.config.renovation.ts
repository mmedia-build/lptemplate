/**
 * Renovation preset: the section order, layouts and lengths of reference B
 * (a kitchen and bathroom renovator, see docs/teardown-b.md), with every text
 * slot holding an instruction written to the length of the real content.
 *
 * Use it when the client sells a large, slow, high-anxiety job (renovations,
 * extensions, pools, landscaping over $30k) and has no review profile worth
 * showing but does have an owner who can be named, supplier relationships
 * and a guarantee with teeth. For a fast trade job with reviews, start from
 * site.config.ts instead.
 *
 * To build with it: SITE_CONFIG=examples/site.config.renovation.ts npm run build
 * Or copy it over site.config.ts in a client repository.
 *
 * Section ids starting with "b-" tell scripts/check-content.mjs to measure
 * those sections against reference B's lengths; keep them.
 */
import { defineConfig } from '../src/config/define.ts';

export default defineConfig({
  business: {
    name: 'Business Name',
    logo: { src: '', alt: 'Business Name logo' },
    logoWhite: { src: '', alt: 'Business Name' },
    phone: '0300000000',
    phoneDisplay: '03 0000 0000',
    // Two-word invitation above the number in the desktop header. About 14 characters.
    phoneEyebrow: 'GOT QUESTIONS?',
    serviceArea: 'City',
    abn: '',
  },

  brand: {
    // Reference B's palette, adjusted where the reference failed contrast: its gold (#b09359) stays for icons and
    // decoration; text and button surfaces use darker golds that reach 4.5:1 on white.
    colours: {
      heading: '#000000',
      body: '#444444',
      primary: '#85703f',
      'primary-hover': '#6f5d34',
      accent: '#b09359',
      'accent-text': '#7a6636',
      'accent-strong': '#85703f',
      'surface-muted': '#f8f6f1',
      border: '#e5e7eb',
    },
    fonts: {
      // Bundled and self-hosted, like Manrope. Reference B's family.
      family: 'Plus Jakarta Sans',
    },
    // With darkTone 'night' this photo is blurred behind the dark sections. A wide interior works; nothing is identifiable after the blur.
    texture: { src: '', alt: '' },
    // Desktop only in the band layout (phones show the photo under the text, unwashed).
    heroWash: 0.55,
    darkTone: 'night',
    tokens: {
      // Reference B has no rounded corners anywhere.
      'radius-input': '0px',
      'radius-media': '0px',
    },
  },

  proof: {
    // Reference B shows no rating anywhere. Leave empty to use the reinforcement line under every CTA,
    // or fill in a real rating and count and the badge takes over (cta.under decides).
    rating: '',
    count: '',
    source: 'Google',
    avatars: { src: '', alt: '' },
  },

  tracking: {
    metaPixelId: '',
  },

  cta: {
    // Pattern: CLAIM YOUR FREE [duration] [thing they get]. Uppercase, about 45 characters.
    label: 'CLAIM YOUR FREE [LENGTH] [NAME OF THE VISIT]',
    target: '#offer-form',
    under: 'auto',
    // Pattern: Includes your [deliverable one] and [deliverable two] (valued at $[value]). About 76 characters.
    reinforcement: 'Includes your [deliverable one] and [deliverable two] (valued at $[amount])',
  },

  header: {
    stickyPhoneButton: false,
  },

  form: {
    // Six fields as on reference B: three contact fields, two selects that qualify the job, one free-text field.
    fields: [
      { name: 'name', type: 'text', label: 'Full name', placeholder: 'Full Name*', required: true, autocomplete: 'name', icon: 'person', minLength: 2 },
      { name: 'email', type: 'email', label: 'Email address', placeholder: 'Email Address*', required: true, icon: 'mail' },
      { name: 'phone', type: 'tel', label: 'Phone number', placeholder: 'Phone Number*', required: true, icon: 'phone' },
      {
        name: 'area',
        type: 'select',
        label: 'What would you like to renovate?',
        placeholder: 'What would you like to renovate?*',
        required: true,
        icon: 'pin',
        // The rooms or surfaces the client quotes, in their words.
        options: ['[Room or surface one]', '[Room or surface two]', 'Both'],
      },
      {
        name: 'budget',
        type: 'select',
        label: 'Do you have a ballpark budget?',
        placeholder: 'Do you have a ballpark budget?*',
        required: true,
        icon: 'dollar',
        // The client's own price bands, lowest first. Five on the reference.
        options: ['[lowest band]', '[second band]', '[third band]', '[fourth band]', '[top band and above]'],
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Comments or questions',
        placeholder: 'Any comments or questions for the team?',
        required: false,
        icon: 'document',
        rows: 3,
      },
    ],
    submitLabel: '',
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

  urgency: {
    // Reference B injects the month by script. Never do that: write a real limit by hand or leave this empty.
    line: '',
  },

  legal: {
    terms: {
      title: 'Campaign Terms & Conditions',
      label: 'Terms & Conditions',
      // Ten short numbered parts on reference B. Use the client's own terms; the guarantee section links here.
      sections: [
        { heading: '1. Eligibility', paragraphs: ['Who the offer is open to: the area served, owner-occupiers over 18, the job types it covers.'] },
        { heading: '2. The free consultation', paragraphs: ['What the consultation includes and what it does not (for example no drawings until a design agreement is signed).'] },
        { heading: '3. The completion guarantee', paragraphs: ['When the clock starts, what must be in place first, and the delays that are excluded.'] },
        { heading: '4. The compensation', paragraphs: ['The amount, how it is paid or deducted, one per project, and the exclusions it inherits.'] },
        { heading: '5. Pricing and variations', paragraphs: ['Pricing is in the contract; variations in writing; variations may void the guarantee.'] },
        { heading: '6. Warranty and insurance', paragraphs: ['The statutory warranty that applies in the client\'s state, its terms in years, and what it excludes.'] },
        { heading: '7. Campaign availability', paragraphs: ['The business may update or withdraw the campaign; benefits are not transferable.'] },
        { heading: '8. Client responsibilities', paragraphs: ['Safe access, timely approvals and selections, and the effect of client delays.'] },
        { heading: '9. Limitation of liability', paragraphs: ['No indirect or consequential loss; liability limited to Australian Consumer Law requirements.'] },
        { heading: '10. Acceptance', paragraphs: ['Proceeding with the consultation or a contract indicates acceptance of these terms.'] },
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

  seo: {
    title: 'Offer | Business Name',
    description: 'One sentence naming the trade, the service area and the offer, for link previews.',
    noindex: true,
    ogImage: { src: '', alt: '' },
  },

  footer: {
    copyrightSuffix: 'All rights reserved.',
  },

  thankYou: {
    headline: 'Thank You',
    subheadline: 'Say when and how you will be in touch',
    steps: [
      { title: 'Step one: first contact', body: 'Who calls or messages, from which number, and within what time, so they recognise it when it comes.' },
      { title: 'Step two: the consultation', body: 'What happens at the visit: who comes, how long it takes and what they should have ready to show.' },
      { title: 'Step three: the design and quote', body: 'When the design and fixed quote arrive, how they are sent, and that there is no pressure to decide.' },
    ],
    phoneLabel: 'Prefer to talk? Call us now:',
    seoTitle: 'Thank You | Business Name',
  },

  /* ---------------------------------------------------------------------- */
  /* Sections, in reference B's order. Set enabled: false to drop one; the  */
  /* backgrounds re-plan. docs/sections.md says what each one needs.        */
  /* ---------------------------------------------------------------------- */
  sections: [
    {
      type: 'hero',
      id: 'b-hero',
      enabled: true,
      // Job: qualify by identity and prior pain, state the outcome with a timeframe and a penalty, name the method, CTA with the bonus value beneath.
      // Objection: "another renovation horror story". Assets: one wide finished-room photo (band under the text on phones).
      content: {
        // Pattern: FOR [city] [identity] HOMEOWNERS WHO ARE DONE WITH [category] HORROR STORIES. About 74 characters.
        eyebrow: 'For [city] [identity] homeowners who are done with [category] horror stories',
        // Pattern: Get your [adjective] [category] in [timeframe] with a fixed price guaranteed, or we pay you $[penalty]. About 99 characters.
        headline: 'Get your [adjective] [category] in [timeframe] with a fixed price guaranteed, or we pay you $[penalty]',
        // Pattern: [City]'s only '[Named Method]' brings [four functions] under one roof, so you get [three outcomes] without [the fear].
        // No [X]. No [Y]. No [Z]. Just [the promise]. About 375 characters, 52 words.
        body: '[City]\'s only \'[Named Method]\' brings [function one], [function two], [function three] and [function four] under one roof, so you get a [adjective], [adjective] [category] delivered on time, on budget and without the [fear] most homeowners go through. No [failure one]. No [failure two]. No [failure three]. Just a fast, seamless, premium transformation from concept to completion.',
        image: { src: '', alt: 'Finished [room] by Business Name' },
        imageLayout: 'band',
      },
    },
    {
      type: 'trustStrip',
      id: 'b-trust',
      enabled: true,
      // Job: restate the offer as five facts on a charcoal panel directly under the hero.
      content: {
        variant: 'panel',
        // Pattern: [years] years experience; transformed in [timeframe]; free custom [deliverable]; free [duration] [consultation]; fixed price quote. 16 to 31 characters each.
        items: [
          { icon: 'shield', label: '[Years] years experience' },
          { icon: 'calendar', label: 'Transformed in [timeframe]' },
          { icon: 'ruler', label: 'Free custom [deliverable]' },
          { icon: 'handshake', label: 'Free [duration] consultation' },
          { icon: 'dollar', label: 'Fixed price quote' },
        ],
      },
    },
    {
      type: 'logoStrip',
      enabled: true,
      // Job: borrow authority from suppliers and brands the visitor recognises. Assets: 8 to 18 supplier marks, the suppliers' own files, with permission.
      content: {
        logos: Array.from({ length: 12 }, (_, i) => ({ src: '', alt: `Supplier ${i + 1}` })),
      },
    },
    {
      type: 'gallery',
      enabled: true,
      // Job: a wall of finished rooms cropped to look endless, with a tap that reveals the rest. Assets: 9 or 12 square finished-room photos, no people.
      content: {
        images: Array.from({ length: 9 }, (_, i) => ({ src: '', alt: `Finished room ${i + 1}` })),
        // About 15 characters.
        moreLabel: 'Tap to see more',
      },
    },
    {
      type: 'split',
      id: 'dream',
      enabled: true,
      // Job: paint the finished state before any argument. Objection: "is this even possible?". Assets: one landscape finished-room photo.
      content: {
        // Pattern: A [adjective], [adjective] [space] delivered in [timeframe] without [the fear]... About 92 characters.
        headline: 'A [adjective], [adjective] [room one] or [room two] delivered in [timeframe] without [the fear]...',
        paragraphs: [
          // Pattern: Picture this: your [current space] is now [finished state with two specifics]. Or your [other space] is now [finished state]. The [job] happened on schedule, stayed on budget and did not [the fear]. About 342 characters.
          'Picture this: your [current room one] is now [finished state with one specific feature] that [fits their life]. Or your [current room two] is now [finished state with a second specific feature]. The whole [job] happened on schedule, stayed on budget, and did not turn your home into [the fear] for months on end.',
          // Pattern: Sound too good to be true? This is what happens when [credential] handles [the whole job] with no [three failure modes]. Just [the promise]. About 314 characters.
          'Sound too good to be true? This is what happens when a team with [years] of experience handles your entire [job] from [first stage] to [last stage] with no [failure one], no [failure two] between contractors, and no [failure three]. Just a seamless [timeframe] transformation creating a [adjective], [adjective] space.',
        ],
        images: [{ src: '', alt: 'Finished [room] with [feature]' }],
        imageSide: 'right',
        showCta: false,
      },
    },
    {
      type: 'split',
      id: 'problem',
      enabled: true,
      tone: 'dark',
      // Job: name the cause of failure (middlemen, outsourcing, nobody accountable) with the visitor's own numbers, on the page's low point.
      // Objection: "why did it go wrong last time?". Assets: two landscape interiors.
      content: {
        // Pattern: How to lock in your [price] and [timeline] so you never face a $[number] [failure] or [duration] delay... About 95 characters.
        headline: 'How to lock in your [price] and [timeline] so you never face a $[amount] [failure] or [duration] delay...',
        paragraphs: [
          // Pattern: Most [category] companies are just middlemen. They outsource [A] to one company, [B] to another, and hire whoever is available for [C]. Nobody is accountable. That is why the $[quote] becomes $[blown quote]. Why the '[promised duration]' drags into [actual]. Why you are stuck managing [n] contractors who blame each other. About 391 characters.
          'Most [category] companies are just middlemen. They outsource your [stage one] to one company, your [stage two] to another, and hire whoever is available for [stage three]. Nobody is accountable for the whole project. That is why the $[quote] quote becomes $[blown quote]. Why the "[promised duration] job" drags into [actual duration]. Why you are stuck managing [number] contractors who blame each other.',
          // Pattern: You end up [vivid daily consequence] while [the tradie disappears]. Your finished [space] has [two visible defects]. But this entire nightmare stems from one fixable problem: [the cause]. Lock in [the fix], and suddenly [three outcomes]. About 464 characters.
          'You end up [vivid daily consequence, in their words] while your [tradie] goes silent. Your finished [room one] has [visible defect one], and your [room two] a [visible defect two] within weeks. But this entire nightmare stems from one fixable problem: outsourcing to [number] different companies who have never worked together. Lock in one team that handles everything in-house, and suddenly your quote stays fixed, your timeline stays on track, and quality gets guaranteed.',
        ],
        images: [
          { src: '', alt: 'Finished [room] by Business Name' },
          { src: '', alt: 'Finished [room] by Business Name' },
        ],
        imageSide: 'left',
        showCta: true,
      },
    },
    {
      type: 'beforeAfterGrid',
      enabled: true,
      // Job: prove transformation in the suburbs the ads target, one draggable pair per job. Assets: six before and after pairs from the same doorway (5:4).
      content: {
        // Pattern: [City] homes transformed in [timeframe] (not [the usual]). About 53 characters.
        headline: '[City] homes transformed in [timeframe] (not [usual])',
        beforeLabel: 'Before',
        afterLabel: 'After',
        items: Array.from({ length: 6 }, (_, i) => ({
          before: { src: '', alt: `Before: [room] in [suburb ${i + 1}]` },
          after: { src: '', alt: `After: [room] in [suburb ${i + 1}]` },
          // Pattern: [Suburb] [Room]. 16 to 21 characters.
          label: `[Suburb ${i + 1}] [Room]`,
          // Pattern: one line naming the change. 38 to 54 characters.
          caption: 'One line naming the change, from state to state',
        })),
        showCta: true,
      },
    },
    {
      type: 'statement',
      enabled: true,
      // Job: state the method in full, the chain of hand-offs under one roof, and the result. Assets: optional wide interior at low contrast for the foot.
      content: {
        // Pattern: Our [credential], in-house [method] eliminates [three failures] from day one, so you enjoy [the outcome] sooner... About 147 characters.
        headline: 'Our [credential], in-house [method] eliminates [failure one], [failure two] and [failure three] from day one, so you enjoy a new, [adjective] space sooner...',
        paragraphs: [
          // Pattern: [Business] works differently. Everything happens in-house with one accountable team. Our [role], [role], [role] and [role] work together daily. They have collaborated on [count] projects. When [stage 1], [the next role] [does the next thing] immediately. When [stage 2], [role] is already [doing stage 3]. When [stage 4] begins, it is our team, not [the alternative]. About 509 characters.
          'Business Name works differently. Everything happens in-house with one accountable team. Our [role one], [role two], [role three] and [role four] work together daily. They have collaborated on [count] projects. When your [role one] creates your [stage one deliverable], the [role two] review it immediately. When your [stage two deliverable] is being built in our [city] workshop, our [role three] is already coordinating [trusted trades]. When [stage four] begins, it is our team, not random subcontractors.',
          // Pattern: The result? No [X]. No [Y]. No [Z]. Your [job] starts and finishes exactly when promised, with [quality]. That is the [Named Method], and it is why we have grown to [scale] by word of mouth alone. About 293 characters.
          'The result? No [failure one]. No [failure two]. No [failure three]. Your [job] starts and finishes exactly when promised, with the [adjective] quality you expected. That is the [Named Method], and it is why we have grown to a [scale claim the client can prove] by word of mouth alone.',
        ],
        footImage: { src: '', alt: '' },
        showCta: true,
      },
    },
    {
      type: 'split',
      id: 'owner',
      enabled: true,
      // Job: put a named owner with a licence number and a career arc behind the promise. First person. Assets: two landscape photos, ideally with the owner on site.
      content: {
        // Pattern: Meet the owner-operator with [years] of hands-on experience (who personally oversees your [job])... About 106 characters.
        headline: 'Meet the owner-operator with [years] of hands-on experience (who personally oversees your [job])...',
        paragraphs: [
          // Pattern: I am [name], and I have spent over [years] in this industry, from [first role] to [current credential]. I started [business] [years] ago because I saw how [the typical model] fails [the customer]. I knew there had to be a better way: [three principles]. About 367 characters.
          'I am [owner first name and surname], and I have spent over [years] in this industry, from [first role] to [current credential]. I started Business Name [years] ago because I saw how the typical [category] model fails families who are making a significant investment. I knew there had to be a better way: one accountable team, clear communication, flawless finishes.',
          // Pattern: Today we are [licence with its number] with [credential]. We have [count] [outcome]. But we are still owner-operated. I am personally involved in every project. Your [job] is not just another job. It is our reputation on the line. About 282 characters.
          'Today we are [registration or licence type] ([licence number]) with [a credential the client holds]. We have transformed [count] [city] homes. But we are still owner-operated. I am personally involved in every project. Your [job] is not just another job. It is our reputation on the line.',
        ],
        images: [
          { src: '', alt: '[Owner name] on site' },
          { src: '', alt: 'Finished [room] by Business Name' },
        ],
        imageSide: 'right',
        showCta: true,
      },
    },
    {
      type: 'comparison',
      id: 'b-comparison',
      enabled: true,
      // Reference B keeps the cards on an off-white surface; without this the planner would make the section dark.
      tone: 'muted',
      // Job: inoculate against the cheaper quote with ten checkable rows against ten failures, as two cards. Assets: white logo for the header plate.
      content: {
        layout: 'cards',
        // Pattern: The difference between a [timeframe] dream [category] and a [longer timeframe] nightmare... About 73 characters.
        headline: 'The difference between a [timeframe] dream [category] and a [longer] nightmare...',
        us: {
          title: 'Business Name',
          // Pattern: [Bold mechanism], [plain benefit]. 24 to 36 characters, bold lead 9 to 16. Ten rows on the reference; 2 to 10 work.
          items: [
            { lead: 'One in-house', text: 'team handles everything' },
            { lead: 'Fixed [timeframe]', text: 'timeline, guaranteed' },
            { lead: 'Fixed-price', text: 'quote, no surprises' },
            { lead: 'Custom [deliverable]', text: 'before we start' },
            { lead: 'Custom [product]', text: 'made in [city]' },
            { lead: 'Owner-operated,', text: '[years] experience' },
            { lead: 'One contact,', text: 'daily updates' },
            { lead: 'Total accountability,', text: 'one standard' },
            { lead: '[Named measure]', text: 'on every job' },
            { lead: '[Warranty name]', text: '([licence number])' },
          ],
        },
        them: {
          // Pattern: Typical [trade plural]. About 18 characters.
          title: 'Typical [trade]',
          // Pattern: [Bold failure] [what the bad tradie says or does]. 25 to 44 characters.
          items: [
            { lead: 'You juggle [n]', text: 'separate contractors' },
            { lead: '"Maybe [short],', text: 'maybe [long]"' },
            { lead: 'Budget blowouts', text: 'of [range] par for the course' },
            { lead: 'Rough sketches', text: 'and "trust us"' },
            { lead: '[Cheap product]', text: 'or cheapest outsourcing' },
            { lead: 'Subcontractors', text: 'managed by newcomers' },
            { lead: 'Silent treatment', text: 'for days' },
            { lead: 'Finger-pointing', text: 'when things go wrong' },
            { lead: 'Your home becomes', text: 'a construction site' },
            { lead: 'Unlicensed', text: 'or fly-by-night operators' },
          ],
        },
      },
    },
    {
      type: 'testimonials',
      id: 'b-testimonials',
      enabled: true,
      // Job: let customers say it, one swipe at a time. Reference B gives only a job type and a quote; add the first name and suburb when the client has them (the standard asks for both).
      // Assets: four portrait photos of the reviewers' finished rooms.
      content: {
        layout: 'carousel',
        // Pattern: What [city] homeowners say about their [business] experience... About 70 characters.
        headline: 'What [city] homeowners say about their Business Name experience...',
        items: Array.from({ length: 4 }, (_, i) => ({
          // The job type. 18 to 27 characters.
          headline: `[Job type for review ${i + 1}]`,
          // The customer's own words in quotation marks, naming the from-state and to-state or the people. 128 to 178 characters.
          body: '"The customer\'s own thank-you in their words, naming the from-state and the to-state, or the people they dealt with, and whether they would recommend you."',
          name: '',
          suburb: '',
          rating: 0,
          image: { src: '', alt: `Finished [room] for reviewer ${i + 1}` },
        })),
      },
    },
    {
      type: 'photoGrid',
      enabled: true,
      // Job: a dense proof wall between the social proof and the benefits. Assets: six square finished-room photos (two rows of three on desktop).
      content: {
        columns: 3,
        images: Array.from({ length: 6 }, (_, i) => ({ src: '', alt: `Finished room ${i + 1}` })),
      },
    },
    {
      type: 'benefits',
      id: 'b-benefits',
      enabled: true,
      tone: 'light',
      // Job: restate the method as four named promises in one column, each ending in a daily image the reader can repeat to a partner.
      content: {
        layout: 'list',
        // Pattern: From [first step] to [last step] in just [timeframe] (here is exactly how)... About 81 characters.
        headline: 'From [first milestone] to [last milestone] in just [timeframe] (here is exactly how)...',
        // Pattern per item: title "[Promise] - [Named principle]" (29 to 47 characters); body: what we do, why we can, the daily image (202 to 248 characters).
        items: [
          { icon: 'dollar', title: 'No [failure] - [Named principle]', body: 'What you do about it in one sentence. Because everything is in-house, why you can promise it. The guarantee in writing, or the measure that makes it true, in a third sentence of about fifteen words.' },
          { icon: 'house', title: 'Your family [benefit] - [Named principle]', body: 'What you refuse to do to their home. How the timeframe limits the disruption, measured in weeks not months. The concrete measures: containment, protection, daily cleanup. The daily image: what the kids are not doing for months.' },
          { icon: 'handshake', title: 'One team, zero [finger-pointing]', body: 'One question. One team. One answer. Because we handle [stage one], [stage two] and [stage three] in-house, you never get the runaround. Just clear communication and seamless execution from start to finish.' },
          { icon: 'sparkle', title: 'Design that is yours, not ours', body: 'We listen to how you live, [verb] and [verb]. Then we create a custom solution that reflects your taste and solves your problems. You will see it in [deliverable] before we build it. This is your home, not our portfolio piece.' },
        ],
        image: { src: '', alt: '' },
      },
    },
    {
      type: 'split',
      id: 'liveable',
      enabled: true,
      // Job: answer the fear that outranks the finished result (living through it) with the measures that contain it. Assets: two landscape in-progress photos with floor and dust protection visible.
      content: {
        // Pattern: The [timeframe] system that prevents your home from becoming [the fear]... About 91 characters.
        headline: 'The [timeframe] system that prevents your home from becoming an uninhabitable [the fear]...',
        paragraphs: [
          // Pattern: What worries you more, [the result] or [living through it]? For most families, it is the latter. [Three sensory pains]. We get it, and we have designed our entire process around [the fix]: [four concrete measures]. About 382 characters.
          'What worries you more: the finished [room], or living through the [job] to get there? For most families, it is the latter. The [sensory pain one] everywhere. The [sensory pain two]. Months without a proper [room]. We get it, and we have designed our entire process around keeping your home liveable: [measure one], [measure two], [measure three], and clear communication about what is happening when.',
          // Pattern: Most importantly, we stick to our [timeframe]. The fastest way to reduce [pain] is to finish properly and promptly. You are not [the fear] for [long duration]. Just [short duration] of transformation, then a lifetime of [the reward]. About 253 characters.
          'Most importantly, we stick to our [timeframe]. The fastest way to reduce disruption is to finish properly and promptly. You are not living in a construction zone for [long duration]. Just [short duration] of transformation, then a lifetime of loving your space.',
        ],
        images: [
          { src: '', alt: 'Floor and dust protection during a [job]' },
          { src: '', alt: 'Finished [room] by Business Name' },
        ],
        imageSide: 'left',
        showCta: true,
      },
    },
    {
      type: 'logoGrid',
      enabled: true,
      // Job: promise durability and prove it with the suppliers' marks. Assets: 12 to 18 supplier marks with permission; optional wide interior for the foot.
      content: {
        // Pattern: Your [surface] will still look flawless [long term] later, not [defect] after [short term]... About 76 characters.
        headline: 'Your [surface] will still look flawless [years] later, not [defect] after [few]...',
        paragraphs: [
          // Pattern: A flawless [space] does not just look stunning on handover day. It looks stunning [time 1] when [occasion]. [Time 2] when [occasion]. [Time 3] when [occasion]. That kind of lasting quality starts with one decision: [the material choice], not [the cheap alternative]. About 424 characters.
          'A flawless [room one] or [room two] does not just look stunning on handover day. It looks stunning [time one] later when [occasion one]. [Time two] later when [occasion two]. [Time three] later when it is still the heart of your home. That kind of lasting quality starts with one decision: using premium materials from suppliers who have proven themselves over decades, not whoever offers the cheapest quote that week.',
          // Pattern: We partner exclusively with [city]'s most trusted suppliers for [five categories]. These are not [generic alternatives]. They are [what they are]. When we specify a product, we know it will perform because we have used it [count] times. About 415 characters.
          'We partner exclusively with [city]\'s most trusted suppliers for [category one], [category two], [category three], [category four] and [category five]. These are not generic brands or budget imports. They are industry-leading names known for durability, precision engineering and finishes that do not fade, chip or fail after a few years. When we specify a product, we know it will perform flawlessly because we have used it [count] times.',
        ],
        logos: Array.from({ length: 12 }, (_, i) => ({ src: '', alt: `Supplier ${i + 1}` })),
        footImage: { src: '', alt: '' },
        showCta: false,
      },
    },
    {
      type: 'steps',
      id: 'b-steps',
      enabled: true,
      // Job: the process as three muted rows with a photo each. Assets: three landscape process photos (the consult, the workshop, the install).
      content: {
        layout: 'rows',
        // Pattern: From [first milestone] to [last milestone] in just [timeframe] (here is exactly how)... About 89 characters.
        headline: 'From [first site milestone] to [final milestone] in just [timeframe] (here is exactly how)...',
        // Pattern per step: title "[Deliverable] & [Deliverable]" (29 to 36 characters); body: what happens, where, how long, what they hold at the end (226 to 259 characters).
        items: [
          { title: 'Free consultation & [deliverable]', body: 'We visit your home for a [duration] consultation. We will measure your space, discuss your vision, and provide a fixed-price quote. Within days, you will receive a custom [deliverable] with [extras] so you see exactly what you are getting before we start.', image: { src: '', alt: 'The consultation at the customer\'s home' } },
          { title: 'Custom [production] & planning', body: 'Your [product] goes into production at our [city] workshop using premium materials. Meanwhile, our [role] coordinates every trade and schedules the timeline. Chaos gets prevented here. Before your [job] begins, everything is planned and ready.', image: { src: '', alt: 'Work in progress at the workshop' } },
          { title: 'Swift installation & handover', body: 'Our team transforms your space in [timeframe]. We contain the mess, minimise disruption, and keep your family comfortable. No mystery delays. Just steady progress until we hand you your beautifully finished space, exactly on time.', image: { src: '', alt: 'A tradesperson finishing the install' } },
        ],
      },
    },
    {
      type: 'guarantee',
      id: 'b-guarantee',
      enabled: true,
      tone: 'dark',
      // Job: reverse the risk twice: a cash penalty the business pays and the statutory warranty the law provides. Links to the terms. Assets: optional line drawing for the decorative slot.
      content: {
        // The badge: outcome, timeframe or penalty, and the word that closes it. 14, 30 and 10 characters.
        badgeLine1: '[Outcome name]',
        badgeLine2: 'in under [timeframe] or we pay $[sum]',
        badgeLine3: 'Guaranteed',
        // Pattern: [Outcome] in under [timeframe] or we pay you $[penalty], guaranteed. About 61 characters.
        headline: '[Outcome] in under [timeframe] or we pay you $[penalty], guaranteed',
        subheadline: '',
        paragraphs: [
          // The promise in one line. About 79 characters.
          'Get your [room one] or [room two] [job] completed in [timeframe] or we pay you $[sum]!',
          // The nightmare in one line. About 134 characters.
          'Most [jobs] turn into a nightmare: blown budgets, endless delays, trades that do not show up, and chaos that takes over your home.',
          // What we do instead. About 159 characters.
          'Business Name does it differently. Our skilled, in-house team handles everything, from a custom [deliverable one] to custom [product] and flawless installation.',
          // The guarantee restated with the penalty. About 146 characters.
          'We guarantee your [job] is finished in just [timeframe], on time, on budget, and with a premium, timeless finish. If we miss it, we pay you $[sum].',
          // The statutory warranty with its terms in years. About 274 characters.
          'Plus, your [job] is fully protected by [state]\'s mandatory [warranty name], covering structural defects for [years] years and non-structural defects for [years] years. If anything goes wrong due to builder insolvency, disappearance or defects, you are fully covered by it.',
          // Closing line. About 85 characters.
          'Finally, a [job] that is seamless, precise and in budget, the way it should always be.',
        ],
        decorativeImage: { src: '', alt: '' },
        termsLink: true,
      },
    },
    {
      type: 'offerForm',
      id: 'offer-form',
      enabled: true,
      // Job: convert. Assets: device mock-up of the offer. The urgency line stays empty unless written by hand.
      content: {
        // Pattern: Claim your FREE [duration] [consultation] and see exactly how we can deliver your dream [space] in just [timeframe] or less! About 136 characters.
        headline: 'Claim your FREE [duration] [name of the visit] and see exactly how we can deliver your dream [room one] or [room two] in just [timeframe] or less!',
        bundleImage: { src: '', alt: 'The free [name of the visit] shown on a device' },
        // Pattern: Here is just a fraction of what you will discover in your FREE [consultation]: About 73 characters.
        lead: 'Here is just a fraction of what you will discover in your FREE [visit]:',
        // Pattern: [Bold deliverable] [plain detail with a timeframe, a value or a protection]. 99 to 181 characters; leads 30 to 54.
        bullets: [
          { lead: 'The exact step-by-step process', text: 'to transform your [room one] or [room two] in [timeframe] without delays, or budget blowouts.' },
          { lead: 'The latest premium [category] trends and design styles', text: 'that make your home stand out and raise its value' },
          { lead: 'Work with a fully licensed, insured builder', text: 'backed by [state]\'s [warranty name], protecting you from structural and non-structural defects and giving you complete peace of mind.' },
          { lead: 'Your personalised [deliverable]...', text: 'FREE, created on the spot during your [visit] (worth $[value])' },
        ],
        // Same line as cta.reinforcement; shown under the submit. About 76 characters.
        reinforcement: 'Includes your [deliverable one] and [deliverable two] (valued at $[amount])',
      },
    },
    {
      type: 'faq',
      enabled: true,
      // Job: answer the six questions a partner asks at the kitchen table, honestly, for the visitor who scrolled past the form.
      content: {
        // Pattern: Everything you are wondering about your [category] (answered honestly). About 89 characters.
        headline: 'Everything you are wondering about your [room one] or [room two] [job] (answered honestly)',
        // Questions in the customer's words (29 to 50 characters); answers in two to four sentences with a number (163 to 274 characters).
        items: [
          { question: 'Where do we [daily activity] during the [job]?', answer: 'The temporary arrangement you set up and how long it lasts, tied to the timeframe. For [room one], what you set up elsewhere. For [room two], how you stage the work. The timeframe means weeks, not months.' },
          { question: 'What about [mess] throughout our home?', answer: 'The containment measure, the daily routine and what you protect, in three short sentences. End with the outcome: they will not have [the mess] coating their entire home.' },
          { question: 'Can we make changes once you have started?', answer: 'Minor tweaks? Yes. Major changes after materials are ordered? Complicated and costly. That is why you perfect the [deliverable] up front, so they are confident before you start. The honest limit is what buys belief.' },
          { question: 'How do you guarantee [timeframe]?', answer: 'Everything is in-house. We [make the product] in our workshop, our [role] coordinates trusted trades, our crew has done this [count] times. We control every variable. If we miss it, we pay you $[penalty].' },
          { question: 'What if something goes wrong after?', answer: 'Every project has [state]\'s [warranty name]: [years] years structural, [years] years non-structural. Plus we are owner-operated. [Owner first name]\'s reputation is on every job. If something needs fixing, call us directly.' },
          { question: 'Which [city] suburbs do you cover?', answer: 'We service [city] homeowners across [named ring of suburbs]. Our work is concentrated in areas that suit our level of finish, access requirements and project scale. For projects outside these areas, availability is assessed case by case.' },
        ],
        showCta: true,
      },
    },
  ],
});
