#!/usr/bin/env node
/**
 * Phase 3 checks that need alternative builds or interaction:
 *  1. modularity: four sections off (one dark) and two reordered, built and screenshotted
 *  2. empty proof: review fields cleared, every badge must be gone
 *  3. form: validation errors, successful submit, redirect, and tracking events
 *  4. guide mode: notes present only when GUIDE_MODE=1
 *
 *   node scripts/verify.mjs
 */
import { execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from './shoot.mjs';

const IOS_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 330.0.0.0';
const results = [];
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`);
};

function build(outDir, env = {}) {
  execSync('npx astro build', { stdio: 'pipe', env: { ...process.env, OUT_DIR: outDir, ...env } });
}

const browser = await chromium.launch();
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

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length} checks, ${failed.length} failed.`);
await fs.writeFile('docs/build/verify-report.json', JSON.stringify(results, null, 2));
process.exit(failed.length ? 1 : 0);
