#!/usr/bin/env node
/**
 * Screenshots the built site (dist/) the same way the reference was captured:
 * full page at 390 and 1440, the 390x664 first screen, three scroll
 * positions, every section at both widths, plus 360 and 430 overflow checks.
 * When the page has a quiz funnel it also walks every screen at both widths
 * (and checks 360 for overflow on each), then the loader and the not-a-fit page.
 *
 *   node scripts/shoot.mjs [outDir=docs/build] [--mobile-only]
 */
import { chromium } from 'playwright';
import { launchOptions } from './lib/browser.mjs';
import { createServer } from 'node:http';
import { promises as fs, createReadStream, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { hasQuiz, activeStep, fillStep, walkToContact, fillContact } from './lib/quiz-walk.mjs';

const args = process.argv.slice(2);
const outDir = args.find((a) => !a.startsWith('--')) || 'docs/build';
const mobileOnly = args.includes('--mobile-only');
const distArg = args.find((a) => a.startsWith('--dist='));
const dist = path.resolve(distArg ? distArg.slice(7) : 'dist');
const IOS_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 330.0.0.0';

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.json': 'application/json' };

export function serveDist(port = 0, root = dist) {
  const server = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, p);
    if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!existsSync(file)) file = path.join(root, '404.html');
    if (!existsSync(file)) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` })));
}

async function settle(page) {
  await page.waitForLoadState('networkidle');
  // Capture at exact scroll positions: the page's smooth scrolling would otherwise be caught mid-move.
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
    // Screenshots are about layout, not the reveal animation: show everything.
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    await new Promise((r) => setTimeout(r, 600));
  });
}

async function sectionShots(page, prefix, dir) {
  const handles = await page.$$('header, main > section, footer');
  const names = await page.$$eval('header, main > section, footer', (els) => els.map((el, i) => `${String(i).padStart(2, '0')}-${el.dataset.section || el.tagName.toLowerCase()}`));
  for (let i = 0; i < handles.length; i++) {
    await handles[i].screenshot({ path: path.join(dir, `${prefix}-s${names[i]}.png`), animations: 'disabled' });
  }
  return names;
}


/** Reference C: one capture per quiz screen, with the numbers the comparison table needs. */
async function quizShots(browser, url, dir, report) {
  await fs.mkdir(path.join(dir, 'quiz'), { recursive: true });
  report.quiz = { steps390: [], steps1440: [], overflow360: [] };
  const profiles = [
    { key: 'steps390', prefix: 'mobile-390', ctx: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IOS_UA } },
    { key: 'steps1440', prefix: 'desktop-1440', ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
    { key: 'overflow360', prefix: null, ctx: { viewport: { width: 360, height: 780 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: IOS_UA } },
  ];
  for (const profile of profiles) {
    const ctx = await browser.newContext({ ...profile.ctx, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${url}/`);
    await page.waitForLoadState('networkidle');
    await walkToContact(page, {
      onStep: async (step) => {
        const n = String(step.index).padStart(2, '0');
        const m = await page.evaluate(() => {
          const el = document.querySelector('[data-quiz] [data-step]:not([hidden])');
          const box = (sel) => { const e = el.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top + scrollY), bottom: Math.round(b.bottom + scrollY), width: Math.round(b.width), height: Math.round(b.height) }; };
          const b = el.getBoundingClientRect();
          return {
            top: Math.round(b.top + scrollY), height: Math.round(b.height),
            question: box('h1, h2'), control: box('.quiz__input, .quiz__textarea, .quiz__cards, .quiz__pills, .quiz__multi, .quiz__scale, .quiz__yesno, .quiz__offers, .quiz__btn'), button: box('.quiz__btn'),
            lit: document.querySelectorAll('.quiz__progress li.is-lit').length,
            scrollWidth: document.documentElement.scrollWidth, innerWidth,
            wide: Array.from(el.querySelectorAll('*')).filter((x) => x.getBoundingClientRect().right > innerWidth + 1).slice(0, 4).map((x) => x.tagName + '.' + String(x.className).slice(0, 30)),
          };
        });
        report.quiz[profile.key].push({ step: step.name, kind: step.kind, ...m });
        if (!profile.prefix) return;
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: path.join(dir, 'quiz', `${profile.prefix}-q${n}-${step.name}.jpg`), type: 'jpeg', quality: 80, fullPage: m.top + m.height > page.viewportSize().height, animations: 'disabled' });
        if (step.kind !== 'intro' && step.kind !== 'contact' && step.index <= 5) {
          await fillStep(page);
          await page.screenshot({ path: path.join(dir, 'quiz', `${profile.prefix}-q${n}-${step.name}-answered.jpg`), type: 'jpeg', quality: 80, animations: 'disabled' });
        }
      },
    });
    if (profile.prefix) {
      // Empty submit shows one error per required field.
      await page.locator('[data-quiz-submit]').click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(dir, 'quiz', `${profile.prefix}-contact-errors.jpg`), type: 'jpeg', quality: 80, fullPage: true, animations: 'disabled' });
      await fillContact(page);
      await page.locator('[data-quiz-submit]').click();
      const loader = page.locator('[data-quiz-loader]');
      if (await loader.count()) {
        await loader.waitFor({ state: 'visible' });
        await page.waitForTimeout(700);
        await page.screenshot({ path: path.join(dir, 'quiz', `${profile.prefix}-loader.jpg`), type: 'jpeg', quality: 80 });
      }
      await page.waitForURL('**/thank-you/**', { timeout: 20000 }).catch(() => {});
      const notFit = await page.request.get(`${url}/not-a-fit/`);
      if (notFit.ok()) {
        await page.goto(`${url}/not-a-fit/`);
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: path.join(dir, `${profile.prefix}-not-a-fit.png`), fullPage: true });
      }
    }
    await ctx.close();
  }
  // Exit prompt, desktop only.
  const d = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await d.newPage();
  await page.goto(`${url}/`);
  await page.waitForLoadState('networkidle');
  if (await page.locator('[data-quiz-exit]').count()) {
    await page.mouse.move(700, 300);
    await page.evaluate(() => document.dispatchEvent(new MouseEvent('mouseout', { clientY: -1, relatedTarget: null, bubbles: true })));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(dir, 'quiz', 'desktop-1440-exit-prompt.jpg'), type: 'jpeg', quality: 80 });
  }
  await d.close();
}

async function main() {
const { server, url } = await serveDist();
await fs.mkdir(path.join(outDir, 'sections'), { recursive: true });
const browser = await chromium.launch(launchOptions());
const report = {};

// Mobile, 1x for the full page (matches the reference capture), 2x for details.
const m1 = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: IOS_UA });
let page = await m1.newPage();
await page.goto(`${url}/`);
await settle(page);
await page.screenshot({ path: path.join(outDir, 'mobile-390-full.png'), fullPage: true, animations: 'disabled' });
report.mobileHeight = await page.evaluate(() => document.documentElement.scrollHeight);
report.sections390 = await page.$$eval('header, main > section, footer', (els) => els.map((el) => ({ type: el.dataset.section || el.tagName.toLowerCase(), top: Math.round(el.getBoundingClientRect().top + scrollY), height: Math.round(el.getBoundingClientRect().height) })));
await m1.close();

const m2 = await browser.newContext({ viewport: { width: 390, height: 664 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IOS_UA });
page = await m2.newPage();
await page.goto(`${url}/`);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, 'mobile-390x664-first-screen.png'), animations: 'disabled' });
report.firstScreen = await page.evaluate(() => {
  const vis = (sel) => { const el = document.querySelector(sel); if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), fullyVisible: b.top >= 0 && b.bottom <= innerHeight }; };
  return { headline: vis('h1'), cta: vis('.btn, .quiz__btn'), badge: vis('.badge'), eyebrow: vis('.eyebrow, .quiz__eyebrow'), body: vis('.hero__body, .quiz__lede'), progress: vis('.quiz__progress') };
});
await settle(page);
for (const y of [0, 1500, 6000, 14000]) {
  await page.evaluate((yy) => window.scrollTo(0, Math.min(yy, document.documentElement.scrollHeight - innerHeight)), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, `mobile-390x664-scroll-${y}.jpg`), type: 'jpeg', quality: 85, animations: 'disabled' });
}
await page.evaluate(() => window.scrollTo(0, 0));
await sectionShots(page, 'mobile-390', path.join(outDir, 'sections'));
await m2.close();

for (const w of [360, 430]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 780 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: IOS_UA });
  page = await ctx.newPage();
  await page.goto(`${url}/`);
  await settle(page);
  report[`overflow${w}`] = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth, overflowing: Array.from(document.querySelectorAll('body *')).filter((el) => { const r = el.getBoundingClientRect(); return r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('.marquee, .carousel__track'); }).slice(0, 8).map((el) => el.tagName + '.' + String(el.className).slice(0, 40)) }));
  await page.screenshot({ path: path.join(outDir, `mobile-${w}-full.png`), fullPage: true, animations: 'disabled' });
  await ctx.close();
}

if (!mobileOnly) {
  const d = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page = await d.newPage();
  await page.goto(`${url}/`);
  await settle(page);
  await page.screenshot({ path: path.join(outDir, 'desktop-1440-full.png'), fullPage: true, animations: 'disabled' });
  report.desktopHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  report.sections1440 = await page.$$eval('header, main > section, footer', (els) => els.map((el) => ({ type: el.dataset.section || el.tagName.toLowerCase(), top: Math.round(el.getBoundingClientRect().top + scrollY), height: Math.round(el.getBoundingClientRect().height) })));
  await sectionShots(page, 'desktop-1440', path.join(outDir, 'sections'));
  await page.goto(`${url}/thank-you/`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(outDir, 'desktop-1440-thank-you.png'), fullPage: true });
  await d.close();
  const t = await browser.newContext({ viewport: { width: 390, height: 664 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: IOS_UA });
  page = await t.newPage();
  await page.goto(`${url}/thank-you/`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(outDir, 'mobile-390-thank-you.png'), fullPage: true });
  await t.close();
}

{
  const probe = await browser.newContext({ viewport: { width: 390, height: 664 } });
  const probePage = await probe.newPage();
  await probePage.goto(`${url}/`);
  const quiz = await hasQuiz(probePage);
  await probe.close();
  if (quiz && !mobileOnly) await quizShots(browser, url, outDir, report);
}

await browser.close();
server.close();
await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));

}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
