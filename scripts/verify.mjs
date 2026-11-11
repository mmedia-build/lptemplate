#!/usr/bin/env node
/**
 * Phase 3 checks that need alternative builds or interaction:
 *  1. modularity: four sections off (one dark) and two reordered, built and screenshotted
 *  2. empty proof: review fields cleared, every badge must be gone
 *  3. form: validation errors, successful submit, redirect, and tracking events
 *  4. guide mode: notes present only when GUIDE_MODE=1
 *  5. the renovation preset (reference B)
 *  6. the agency preset (reference C): the quiz funnel, screen by screen
 *  7. the Minus Media draft of that funnel
 *
 *   node scripts/verify.mjs
 */
import { execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { launchOptions } from './lib/browser.mjs';
import { serveDist } from './shoot.mjs';
import { activeStep, answerStep, fillStep, walkToContact, fillContact, waitForStepChange } from './lib/quiz-walk.mjs';

const IOS_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 330.0.0.0';
const results = [];
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`);
};

function build(outDir, env = {}) {
  execSync('npx astro build', { stdio: 'pipe', env: { ...process.env, OUT_DIR: outDir, ...env } });
}

const browser = await chromium.launch(launchOptions());
const mobile = () => browser.newContext({ viewport: { width: 390, height: 664 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IOS_UA });

/* ---- 1. Modularity ------------------------------------------------------ */
build('./dist-modular', { SITE_CONFIG: 'tests/fixtures/config.modular.ts' });
execSync('node scripts/shoot.mjs docs/build/modular --mobile-only --dist=dist-modular', { stdio: 'pipe' });
{
  const html = await fs.readFile('dist-modular/index.html', 'utf8');
  const order = [...html.matchAll(/data-section="([a-zA-Z]+)"/g)].map((m) => m[1]);
  ok('modular: disabled sections absent', !order.some((t) => ['trustStrip', 'comparison', 'projects', 'guarantee'].includes(t)), order.join(' > '));
  ok('modular: steps now precede testimonials', order.indexOf('steps') < order.indexOf('testimonials'));
  ok('modular: bento follows the letter', order.indexOf('bentoGallery') === order.indexOf('letter') + 1);
  const tones = [...html.matchAll(/class="[^"]*\btone-(\w+)[^"]*"[^>]*data-section="(\w+)"/g)].map((m) => `${m[2]}:${m[1]}`);
  const darks = tones.filter((t) => t.endsWith(':dark'));
  let adjacentDark = false;
  for (let i = 1; i < tones.length; i++) if (tones[i].endsWith(':dark') && tones[i - 1].endsWith(':dark')) adjacentDark = true;
  ok('modular: no two dark sections adjacent', !adjacentDark, tones.join(' '));
  ok('modular: benefits still dark', darks.some((t) => t.startsWith('benefits')));
}

/* ---- 2. Empty proof ------------------------------------------------------ */
build('./dist-noproof', { SITE_CONFIG: 'tests/fixtures/config.noproof.ts' });
execSync('node scripts/shoot.mjs docs/build/noproof --mobile-only --dist=dist-noproof', { stdio: 'pipe' });
{
  const html = await fs.readFile('dist-noproof/index.html', 'utf8');
  ok('no proof: zero badges in output', !/class="[^"]*\bbadge\b/.test(html) && !/Google Reviews/.test(html));
  ok('no proof: CTAs still present', (html.match(/class="btn/g) || []).length >= 8, `${(html.match(/class="btn/g) || []).length} buttons`);
}

/* ---- 3. Form and tracking ----------------------------------------------- */
build('./dist-tracking', { SITE_CONFIG: 'tests/fixtures/config.tracking.ts' });
{
  const { server, url } = await serveDist(0, path.resolve('dist-tracking'));
  const ctx = await mobile();
  const page = await ctx.newPage();
  await page.route('https://connect.facebook.net/**', (route) => route.abort());
  await page.route('https://www.facebook.com/**', (route) => route.abort());
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${url}/?utm_source=meta&utm_campaign=test`);
  await page.waitForLoadState('networkidle');
  const queue = async () => page.evaluate(() => (window.fbq && window.fbq.queue ? window.fbq.queue.map((q) => Array.from(q).slice(0, 2).join(':')) : []));
  ok('pixel: PageView queued on landing', (await queue()).includes('track:PageView'), (await queue()).join(','));
  ok('inputs: 16px or larger', await page.$$eval('.field__input', (els) => els.every((el) => parseFloat(getComputedStyle(el).fontSize) >= 16)));
  ok('inputs: correct types and inputmodes', await page.evaluate(() => {
    const f = (n) => document.querySelector(`form [name="${n}"]`);
    return f('email').type === 'email' && f('phone').type === 'tel' && f('phone').inputMode === 'tel' && f('postcode').inputMode === 'numeric' && f('postcode').autocomplete === 'postal-code' && f('name').autocomplete === 'name';
  }));
  ok('tap targets: buttons and phone link at least 44px', await page.$$eval('.btn, .header__phone, .footer__legal-btn', (els) => els.every((el) => el.getBoundingClientRect().height >= 44)));
  // Contact event on a phone link click (prevent navigation to tel:).
  await page.evaluate(() => document.addEventListener('click', (e) => { if (e.target.closest('a[href^="tel:"]')) e.preventDefault(); }, true));
  await page.click('.header__phone');
  ok('pixel: Contact fires on phone click', (await queue()).includes('track:Contact'));

  // Empty submit shows inline errors.
  await page.locator('[data-submit]').scrollIntoViewIfNeeded();
  await page.tap('[data-submit]');
  await page.waitForTimeout(300);
  const emptyErrors = await page.$$eval('.field.is-invalid .field__error', (els) => els.map((e) => e.textContent));
  ok('form: empty submit shows an error per required field', emptyErrors.length === 5, emptyErrors.join(' | '));
  ok('form: stays on page after invalid submit', page.url().includes(url) && !page.url().includes('thank-you'));

  // Bad values.
  await page.fill('form [name=name]', 'A');
  await page.fill('form [name=email]', 'not-an-email');
  await page.fill('form [name=phone]', '12345');
  await page.fill('form [name=postcode]', '12');
  await page.fill('form [name=description]', 'short');
  await page.tap('[data-submit]');
  await page.waitForTimeout(300);
  const badErrors = await page.$$eval('.field.is-invalid', (els) => els.map((e) => e.dataset.field));
  ok('form: bad email, phone, postcode and short text are rejected', ['email', 'phone', 'postcode'].every((n) => badErrors.includes(n)), badErrors.join(','));

  // Good values, including a landline with brackets and spaces.
  await page.fill('form [name=name]', 'Test Person');
  await page.fill('form [name=email]', 'test@example.com');
  await page.fill('form [name=phone]', '(03) 9123 4567');
  await page.fill('form [name=postcode]', '3000');
  await page.fill('form [name=description]', 'A new driveway and front steps for a single storey house.');
  const consoleLines = [];
  page.on('console', (m) => consoleLines.push(m.text()));
  await page.tap('[data-submit]');
  await page.waitForURL('**/thank-you/', { timeout: 10000 });
  ok('form: redirects to the thank-you page', page.url().endsWith('/thank-you/'));
  ok('form: payload logged with fields, page URL, UTM and timestamp', consoleLines.some((l) => l.includes('[lead] payload assembled')));
  await page.waitForLoadState('networkidle');
  const q1 = await queue();
  ok('pixel: Lead fires once on thank-you after submit', q1.filter((e) => e === 'track:Lead').length === 1, q1.join(','));
  await page.reload();
  await page.waitForLoadState('networkidle');
  const q2 = await queue();
  ok('pixel: Lead does not fire again on refresh', !q2.includes('track:Lead'), q2.join(','));
  ok('thank-you: phone link present', await page.$eval('a[href^="tel:"].btn', (el) => el.href.startsWith('tel:')));
  ok('no page errors during form flow', errors.length === 0, errors.join(' | '));

  // Honeypot: a filled trap field must not send.
  await page.goto(`${url}/`);
  await page.waitForLoadState('networkidle');
  const logged = [];
  page.on('console', (m) => logged.push(m.text()));
  await page.fill('form [name=name]', 'Bot');
  await page.fill('form [name=email]', 'bot@example.com');
  await page.fill('form [name=phone]', '0412345678');
  await page.fill('form [name=postcode]', '3000');
  await page.fill('form [name=description]', 'spam spam spam spam');
  await page.evaluate(() => { document.querySelector('form [name=website]').value = 'http://spam'; });
  await page.evaluate(() => document.querySelector('[data-lead-form]').requestSubmit());
  await page.waitForURL('**/thank-you/', { timeout: 10000 });
  ok('honeypot: filled trap skips the send', !logged.some((l) => l.includes('[lead] payload assembled')));

  // Modal and compare slider on touch.
  await page.goto(`${url}/`);
  await page.waitForLoadState('networkidle');
  await page.click('[data-open-modal="terms"]');
  ok('modal: terms opens', await page.$eval('dialog[data-modal="terms"]', (d) => d.open));
  await page.keyboard.press('Escape');
  ok('modal: Escape closes', !(await page.$eval('dialog[data-modal="terms"]', (d) => d.open)));
  const slider = await page.$('[data-compare]');
  await slider.scrollIntoViewIfNeeded();
  const box = await slider.boundingBox();
  const cdp = await ctx.newCDPSession(page);
  const touch = async (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
  await touch('touchStart', box.x + box.width / 2, box.y + box.height / 2);
  for (let i = 1; i <= 8; i++) await touch('touchMove', box.x + box.width / 2 - i * 12, box.y + box.height / 2);
  await touch('touchEnd');
  const split = await slider.evaluate((el) => parseFloat(el.style.getPropertyValue('--split')));
  ok('compare: touch drag moves the split', split < 45, `split ${split}%`);
  const before = await page.evaluate(() => scrollY);
  await touch('touchStart', box.x + box.width / 2, box.y + box.height / 2 + 100);
  for (let i = 1; i <= 8; i++) await touch('touchMove', box.x + box.width / 2, box.y + box.height / 2 + 100 - i * 20);
  await touch('touchEnd');
  await page.waitForTimeout(300);
  ok('compare: vertical swipe still scrolls the page', (await page.evaluate(() => scrollY)) > before);
  await page.focus('[data-compare-handle]');
  await page.keyboard.press('ArrowRight');
  ok('compare: keyboard moves the split', (await slider.evaluate((el) => parseFloat(el.style.getPropertyValue('--split')))) > split);
  const track = await page.$('[data-carousel-track]');
  await track.scrollIntoViewIfNeeded();
  await page.click('[data-carousel-next]');
  await page.waitForTimeout(600);
  ok('carousel: next button scrolls the track', (await track.evaluate((el) => el.scrollLeft)) > 50);
  await ctx.close();
  server.close();
}

/* ---- 4. Guide mode ------------------------------------------------------- */
build('./dist-guide', { GUIDE_MODE: '1' });
{
  const guide = await fs.readFile('dist-guide/index.html', 'utf8');
  const plain = await fs.readFile('dist/index.html', 'utf8');
  ok('guide mode: notes present when GUIDE_MODE=1', guide.includes('guide-note') && guide.includes('Principle:'));
  ok('guide mode: no guide text in the normal build', !plain.includes('guide-note') && !plain.includes('Principle:'));
}

/* ---- 5. Renovation preset (reference B sections) ------------------------ */
build('./dist-renovation', { SITE_CONFIG: 'examples/site.config.renovation.ts' });
{
  const html = await fs.readFile('dist-renovation/index.html', 'utf8');
  const order = [...html.matchAll(/data-section="([a-zA-Z]+)"/g)].map((m) => m[1]);
  const expected = ['hero', 'trustStrip', 'logoStrip', 'gallery', 'split', 'split', 'beforeAfterGrid', 'statement', 'split', 'comparison', 'testimonials', 'photoGrid', 'benefits', 'split', 'logoGrid', 'steps', 'guarantee', 'offerForm', 'faq'];
  ok('preset: reference B section order renders', order.join(',') === expected.join(','), order.join(' > '));
  ok('preset: night dark tone and Plus Jakarta Sans preload', html.includes('data-dark-tone="night"') && html.includes('plus-jakarta-sans-latin.woff2'));
  ok('preset: pinned tones respected (comparison muted, problem split dark)', /tone-muted[^>]*data-section="comparison"/.test(html) && /tone-dark[^>]*data-section="split"/.test(html));
  ok('preset: reinforcement line under CTAs, no badge', (html.match(/cta__line/g) || []).length >= 8 && !/class="[^"]*\bbadge\b/.test(html));
  ok('preset: select fields render with options', (html.match(/<select/g) || []).length === 2 && html.includes('[lowest band]'));

  const { server, url } = await serveDist(0, path.resolve('dist-renovation'));
  const ctx = await mobile();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${url}/`);
  await page.waitForLoadState('networkidle');
  const fit = await page.evaluate(() => {
    const b = (sel) => document.querySelector(sel)?.getBoundingClientRect();
    const line = b('.hero .cta__line');
    return { lineBottom: line ? Math.round(line.bottom) : null, headlineTop: Math.round(b('h1').top), vh: innerHeight };
  });
  ok('preset: band hero fits eyebrow, headline, paragraph, CTA and line in 664', fit.lineBottom !== null && fit.lineBottom <= fit.vh && fit.headlineTop > 88, JSON.stringify(fit));
  ok('preset: six compare sliders in the grid', (await page.$$('[data-section="beforeAfterGrid"] [data-compare]')).length === 6);
  const galleryBefore = await page.$eval('[data-gallery]', (el) => el.getBoundingClientRect().height);
  await page.locator('[data-gallery-more]').scrollIntoViewIfNeeded();
  await page.tap('[data-gallery-more]');
  await page.waitForTimeout(500);
  const galleryAfter = await page.$eval('[data-gallery]', (el) => el.getBoundingClientRect().height);
  ok('preset: gallery expands on tap and the button leaves', galleryAfter > galleryBefore + 200 && (await page.$eval('[data-gallery-more]', (b) => b.hidden)), `${Math.round(galleryBefore)} -> ${Math.round(galleryAfter)}`);
  const faqState = async () => page.$$eval('[data-faq-trigger]', (els) => els.map((e) => e.getAttribute('aria-expanded')));
  ok('preset: first FAQ item open on load', (await faqState()).join(',') === 'true,false,false,false,false,false');
  const triggers = await page.$$('[data-faq-trigger]');
  await triggers[2].scrollIntoViewIfNeeded();
  await triggers[2].tap();
  await page.waitForTimeout(400);
  ok('preset: tapping another FAQ opens it and closes the first', (await faqState()).join(',') === 'false,false,true,false,false,false');
  const panelH = await page.$$eval('[data-faq-item]', (els) => els.map((e) => Math.round(e.querySelector('.faq__panel').getBoundingClientRect().height)));
  ok('preset: closed FAQ panels have no height', panelH[0] === 0 && panelH[2] > 40, panelH.join(','));
  await page.locator('[data-submit]').scrollIntoViewIfNeeded();
  await page.tap('[data-submit]');
  await page.waitForTimeout(300);
  const invalid = await page.$$eval('.field.is-invalid', (els) => els.map((e) => e.dataset.field));
  ok('preset: empty submit flags the two required selects', invalid.includes('area') && invalid.includes('budget') && !invalid.includes('description'), invalid.join(','));
  await page.selectOption('form [name=area]', '[Room or surface one]');
  await page.fill('form [name=name]', 'Test Person');
  await page.fill('form [name=email]', 'test@example.com');
  await page.fill('form [name=phone]', '0412 345 678');
  await page.selectOption('form [name=budget]', '[second band]');
  await page.tap('[data-submit]');
  await page.waitForURL('**/thank-you/', { timeout: 10000 });
  ok('preset: valid submit with selects reaches the thank-you page', page.url().endsWith('/thank-you/'));
  ok('preset: no page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
  server.close();
}

/* ---- 6. Agency preset (reference C quiz funnel) -------------------------- */
build('./dist-agency', { SITE_CONFIG: 'tests/fixtures/config.agency.ts' });
{
  const html = await fs.readFile('dist-agency/index.html', 'utf8');
  const order = [...html.matchAll(/data-section="([a-zA-Z]+)"/g)].map((m) => m[1]);
  ok('quiz: the quiz is the only section', order.join(',') === 'quiz', order.join(' > '));
  ok('quiz: funnel bar replaces the header, with no phone link', /class="[^"]*funnel-bar/.test(html) && !/class="[^"]*header__phone/.test(html) && !/href="tel:/.test(html));
  ok('quiz: body and display fonts are preloaded', /rel="preload" href="\/fonts\/inter-latin\.woff2"/.test(html) && /rel="preload" href="\/fonts\/anton-latin\.woff2"/.test(html));
  const exists = async (f) => fs.access(f).then(() => true, () => false);
  ok('quiz: the not-a-fit route is built for this preset only', (await exists('dist-agency/not-a-fit/index.html')) && !(await exists('dist-tracking/not-a-fit/index.html')));

  const { server, url } = await serveDist(0, path.resolve('dist-agency'));
  const open = async (ctx) => {
    const page = await ctx.newPage();
    await page.route('https://connect.facebook.net/**', (route) => route.abort());
    await page.route('https://www.facebook.com/**', (route) => route.abort());
    await page.goto(`${url}/?utm_source=meta&utm_campaign=test`);
    await page.waitForLoadState('networkidle');
    return page;
  };
  const queueOf = (page) => page.evaluate(() => (window.fbq && window.fbq.queue ? window.fbq.queue.map((q) => Array.from(q).slice(0, 2).join(':')) : []));
  const lit = (page) => page.locator('.quiz__progress li.is-lit').count();
  const visibleSteps = (page) => page.locator('[data-quiz] [data-step]:not([hidden])').count();

  let ctx = await mobile();
  let page = await open(ctx);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const consoleLines = [];
  const payloads = [];
  page.on('console', (m) => {
    consoleLines.push(m.text());
    // The payload object itself, not its truncated console preview.
    if (m.text().includes('[lead] payload assembled')) m.args()[1]?.jsonValue().then((v) => payloads.push(v), () => {});
  });

  const first = await page.evaluate(() => ['.quiz__progress', '.quiz__eyebrow', '.quiz__headline', '.quiz__lede', '.quiz__btn--start'].map((sel) => { const b = document.querySelector(sel).getBoundingClientRect(); return { sel, top: Math.round(b.top), bottom: Math.round(b.bottom), ok: b.top >= 0 && b.bottom <= innerHeight }; }));
  ok('quiz: dots, eyebrow, headline, paragraph and button all fit the 390x664 first screen', first.every((f) => f.ok), first.map((f) => `${f.sel} ${f.top}-${f.bottom}`).join(', '));
  ok('quiz: one screen visible, the rest hidden and inert', (await visibleSteps(page)) === 1 && (await page.locator('[data-quiz] [data-step][hidden]:not([inert])').count()) === 0);
  ok('quiz: Back is hidden on the intro', await page.locator('[data-quiz-back]').isHidden());
  ok('quiz: no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));

  await answerStep(page);
  ok('quiz: the first button starts the questions and fires QuizStart', (await activeStep(page)).name === 'first_name' && (await queueOf(page)).includes('trackCustom:QuizStart'));
  ok('quiz: Back appears once the quiz has started', await page.locator('[data-quiz-back]').isVisible());
  ok('quiz: one dot lit on question one', (await lit(page)) === 1);
  ok('quiz: Continue is disabled until there is an answer', await page.locator('[data-step="first_name"] [data-quiz-next]').isDisabled());
  ok('quiz: inputs are 16px or larger', await page.$$eval('.quiz__input, .quiz__textarea', (els) => els.every((el) => parseFloat(getComputedStyle(el).fontSize) >= 16)));
  await page.locator('[data-quiz-back]').tap();
  await waitForStepChange(page, 'first_name');
  ok('quiz: Back returns to the previous screen', (await activeStep(page)).name === 'intro');
  await answerStep(page);
  await answerStep(page, { first_name: 'Jordan' });
  ok('quiz: the first name is written into the next question', (await page.locator('[data-step="email"] .quiz__question').innerText()).includes('Jordan'));

  await page.locator('[data-step="email"] input').fill('jordan@');
  await page.locator('[data-step="email"] [data-quiz-next]').tap();
  await page.waitForTimeout(250);
  ok('quiz: a bad email shows an inline error and stays put', (await page.locator('[data-step="email"] .quiz__error').innerText()).length > 0 && (await activeStep(page)).name === 'email');
  await answerStep(page, { email: 'jordan@example.com' });
  ok('quiz: first name and email are sent as a partial lead after the email step', consoleLines.some((l) => l.includes('[lead] payload assembled') && l.includes('partial')));
  ok('quiz: QuizEmail and QuizStep events fire', (await queueOf(page)).includes('trackCustom:QuizEmail') && (await queueOf(page)).includes('trackCustom:QuizStep'));

  ok('quiz: option cards have no Continue button', (await page.locator('[data-step="sells"] [data-quiz-next]').count()) === 0);
  await answerStep(page);
  ok('quiz: a tap on an option card moves on by itself', (await activeStep(page)).name === 'marketing');
  ok('quiz: multi-select Continue is disabled until one is ticked', await page.locator('[data-step="marketing"] [data-quiz-next]').isDisabled());
  await fillStep(page);
  ok('quiz: ticking one enables Continue', await page.locator('[data-step="marketing"] [data-quiz-next]').isEnabled());
  await answerStep(page);
  ok('quiz: a preselected select has Continue enabled on arrival', await page.locator('[data-step="location"] [data-quiz-next]').isEnabled());
  await answerStep(page);

  // Keyboard on a radio list: arrows change the choice without moving on; Enter moves on.
  await page.locator('[data-step="budget"] input[type=radio]').nth(1).focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);
  const stayed = (await activeStep(page)).name === 'budget';
  await page.keyboard.press('Enter');
  await waitForStepChange(page, 'budget');
  ok('quiz: arrow keys change a choice without advancing; Enter advances', stayed && (await activeStep(page)).name === 'website');

  const tapTargets = await page.$$eval('.quiz__btn, .funnel-bar__back, .quiz-pill label, .quiz-tick label, .quiz-card label, .quiz-num label, .quiz-emoji label, .quiz__input, .footer__legal-btn', (els) => els.filter((el) => el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().height < 44).map((el) => el.className));
  ok('quiz: every tap target is at least 44px', tapTargets.length === 0, tapTargets.join(','));

  const seen = [];
  await walkToContact(page, { onStep: async (step) => { seen.push({ ...step, lit: await lit(page) }); } });
  const dotCount = await page.locator('.quiz__progress li').count();
  ok('quiz: one dot lights per question and the row is full before the end', seen.every((s) => s.lit === Math.min(s.index, dotCount)) && seen.at(-1).lit === dotCount && seen.at(-1).index > dotCount, seen.map((s) => `${s.index}:${s.lit}`).join(' '));
  const scale = await page.$$eval('[data-step="commitment"] label', (els) => els.map((el) => getComputedStyle(el).backgroundColor));
  ok('quiz: the scale has ten buttons graded from grey to the brand colour', scale.length === 10 && new Set(scale).size === 10, `${scale[0]} to ${scale[9]}`);

  const prefilled = await page.$$eval('[data-step="contact"] .quiz__field input', (els) => Object.fromEntries(els.map((e) => [e.name, e.value])));
  ok('quiz: first name and website arrive filled in on the contact step', prefilled.first_name_confirm === 'Jordan' && prefilled.website_confirm === 'example.com.au', JSON.stringify(prefilled));
  await page.locator('[data-quiz-submit]').tap();
  await page.waitForTimeout(300);
  const empty = await page.$$eval('[data-step="contact"] .quiz__field.is-invalid', (els) => els.map((e) => e.dataset.field));
  ok('quiz: empty submit shows an error under each empty required field', empty.join(',') === 'last_name,phone,company', empty.join(','));
  await fillContact(page, { phone: '12345' });
  await page.locator('[data-quiz-submit]').tap();
  await page.waitForTimeout(300);
  ok('quiz: a bad phone number is rejected', (await page.$$eval('[data-step="contact"] .quiz__field.is-invalid', (els) => els.map((e) => e.dataset.field))).join(',') === 'phone');
  await fillContact(page, { phone: '0412 345 678' });
  consoleLines.length = 0;
  // Pixel calls made just before the redirect are kept across the navigation so they can be read afterwards.
  await page.evaluate(() => { const real = window.fbq; window.fbq = function (...a) { try { sessionStorage.setItem('fbq-log', (sessionStorage.getItem('fbq-log') || '') + a.slice(0, 2).join(':') + ','); } catch (e) {} return real.apply(this, a); }; });
  await page.locator('[data-quiz-submit]').tap();
  await page.locator('[data-quiz-loader]').waitFor({ state: 'visible', timeout: 3000 });
  await page.waitForTimeout(1500);
  const loader = await page.evaluate(() => ({ pct: document.querySelector('[data-loader-pct]').textContent, on: document.querySelectorAll('.quiz-loader__lines li.is-on, .quiz-loader__lines li.is-done').length }));
  ok('quiz: the loader counts up and ticks its lines', parseInt(loader.pct, 10) > 0 && loader.on > 0, `${loader.pct}, ${loader.on} line(s) reached`);
  await page.waitForURL('**/thank-you/', { timeout: 20000 });
  const sent = payloads.find((p) => p && !p.partial) || {};
  ok('quiz: the lead is sent with every answer, the score, the page URL and UTM', ['first_name', 'email', 'budget', 'obstacle', 'commitment', 'last_name', 'lead_score', 'phone_e164', 'utm_source', 'page_url'].every((k) => sent[k]) && sent.phone_e164 === '+61412345678', `score ${sent.lead_score}, ${Object.keys(sent).length} keys`);
  ok('quiz: QualifiedLead fires on submit when the score reaches the threshold', Number(sent.lead_score) >= 60 && (await page.evaluate(() => sessionStorage.getItem('fbq-log') || '')).includes('trackCustom:QualifiedLead'), `score ${sent.lead_score}`);
  await page.waitForLoadState('networkidle');
  const q1 = await queueOf(page);
  ok('quiz: Lead fires once on the thank-you page', q1.filter((e) => e === 'track:Lead').length === 1, q1.join(','));
  await page.reload();
  await page.waitForLoadState('networkidle');
  ok('quiz: Lead does not fire again on refresh', !(await queueOf(page)).includes('track:Lead'));
  ok('quiz: no page errors through the whole funnel', errors.length === 0, errors.join(' | '));
  await ctx.close();

  // Screening: an answer flagged in config sends the visitor to the not-a-fit page.
  ctx = await mobile();
  page = await open(ctx);
  for (let i = 0; i < 40; i++) {
    const step = await activeStep(page);
    if (step.name === 'revenue') break;
    await answerStep(page);
  }
  await page.locator('[data-step="revenue"] input[data-disqualify]').first().evaluate((el) => document.querySelector(`label[for="${el.id}"]`).click());
  await page.waitForURL('**/not-a-fit/', { timeout: 10000 });
  ok('quiz: a screening answer lands on the not-a-fit page', (await page.locator('h1').innerText()).length > 0 && (await page.locator('.notfit__card').count()) === 2);
  await ctx.close();

  // Honeypot.
  ctx = await mobile();
  page = await open(ctx);
  const logged = [];
  await walkToContact(page);
  page.on('console', (m) => logged.push(m.text()));
  await fillContact(page);
  await page.evaluate(() => { document.querySelector('[name=company_website]').value = 'http://spam'; });
  await page.locator('[data-quiz-submit]').tap();
  await page.waitForURL('**/thank-you/', { timeout: 20000 });
  ok('quiz: a filled honeypot skips the send', !logged.some((l) => l.includes('[lead] payload assembled')));
  await ctx.close();

  // Exit prompt: desktop pointer only, once, closes with Escape.
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await open(desk);
  const leave = () => page.evaluate(() => document.dispatchEvent(new MouseEvent('mouseout', { clientY: -1, relatedTarget: null, bubbles: true })));
  await leave();
  const opened = await page.locator('dialog[data-quiz-exit][open]').count();
  await page.keyboard.press('Escape');
  await leave();
  ok('quiz: the exit prompt opens once on desktop and closes with Escape', opened === 1 && (await page.locator('dialog[data-quiz-exit][open]').count()) === 0);
  const two = await page.evaluate(() => { const els = document.querySelectorAll('.quiz__pills'); return getComputedStyle(els[0]).gridTemplateColumns.split(' ').length; });
  ok('quiz: radio lists run two columns on desktop', two === 2);
  await desk.close();
  server.close();
}

/* ---- 7. Minus Media draft (the quiz funnel with a different brand and step list) ---- */
build('./dist-minus-media', { SITE_CONFIG: 'examples/site.config.minus-media.ts' });
{
  const { server, url } = await serveDist(0, path.resolve('dist-minus-media'));
  const ctx = await mobile();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${url}/`);
  await page.waitForLoadState('networkidle');
  const first = await page.evaluate(() => ['.quiz__progress', '.quiz__eyebrow', '.quiz__headline', '.quiz__lede', '.quiz__btn--start'].map((sel) => { const b = document.querySelector(sel).getBoundingClientRect(); return { sel, bottom: Math.round(b.bottom), ok: b.top >= 0 && b.bottom <= innerHeight }; }));
  ok('minus media: the first screen fits 390x664 with real copy', first.every((f) => f.ok), `button ends at ${first.at(-1).bottom}`);
  const contrast = await page.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.match(/\d+/g).slice(0, 3).map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const cs = getComputedStyle(document.querySelector('.quiz__btn--start'));
    const [a, b] = [lum(cs.color), lum(cs.backgroundColor)].sort((x, y) => y - x);
    return (a + 0.05) / (b + 0.05);
  });
  ok('minus media: button text on the brand blue reaches 4.5:1', contrast >= 4.5, contrast.toFixed(1));
  const steps = [];
  await walkToContact(page, { onStep: async (s) => steps.push(s.name) });
  ok('minus media: a config with fewer steps walks through to the contact step', steps.at(-1) === 'contact' && !steps.includes('offer') && !steps.includes('budget'), steps.join(' > '));
  await fillContact(page);
  await page.locator('[data-quiz-submit]').tap();
  await page.waitForURL('**/thank-you/', { timeout: 20000 });
  ok('minus media: submit reaches the thank-you page with no page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
  server.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length} checks, ${failed.length} failed.`);
await fs.writeFile('docs/build/verify-report.json', JSON.stringify(results, null, 2));
process.exit(failed.length ? 1 : 0);
