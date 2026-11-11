/**
 * Helpers that drive the quiz funnel in Playwright, shared by the screenshot
 * harness and the verification script. They answer whatever step is on screen
 * with a sensible default (the highest-scoring option that does not screen
 * the visitor out) unless an override is given by step name.
 */

export const QUIZ = '[data-quiz]';

export async function hasQuiz(page) {
  return (await page.locator(QUIZ).count()) > 0;
}

export async function activeStep(page) {
  return page.evaluate(() => {
    const el = document.querySelector('[data-quiz] [data-step]:not([hidden])');
    return el ? { name: el.dataset.step, kind: el.dataset.kind || 'intro', index: Number(el.dataset.index || 0) } : null;
  });
}

/** Waits until a different step is on screen and its entrance has finished. */
export async function waitForStepChange(page, from, timeout = 5000) {
  await page.waitForFunction(
    (name) => {
      const el = document.querySelector('[data-quiz] [data-step]:not([hidden])');
      return el && el.dataset.step !== name && !el.classList.contains('is-entering');
    },
    from,
    { timeout },
  );
  // show() holds the lock for the length of the entrance; wait it out so the next action is accepted.
  await page.waitForTimeout(650);
}

/** Fills or picks an answer on the active step without moving on. Returns the step. */
export async function fillStep(page, overrides = {}) {
  const step = await activeStep(page);
  const { name, kind } = step;
  const root = page.locator(`${QUIZ} [data-step="${name}"]`);
  const o = overrides[name];
  if (kind === 'text') await root.locator('input.quiz__input').fill(o ?? (/web|site|url/.test(name) ? 'example.com.au' : 'Alex'));
  else if (kind === 'email') await root.locator('input.quiz__input').fill(o ?? 'alex@example.com');
  else if (kind === 'longtext') await root.locator('textarea').fill(o ?? 'We build custom homes and large renovations for families at a mid to high price point.');
  else if (kind === 'multi') {
    // Ticking is a toggle, so only tick when nothing is ticked yet.
    if (!(await root.locator('input:checked').count())) await root.locator('label').first().click();
  }
  else if (kind === 'select') {
    const current = await root.locator('select').inputValue();
    if (o) await root.locator('select').selectOption(o);
    else if (!current) await root.locator('select').selectOption({ index: 1 });
  }
  return step;
}

/** Answers the active step and waits for the next one. */
export async function answerStep(page, overrides = {}) {
  const step = await fillStep(page, overrides);
  const { name, kind } = step;
  const root = page.locator(`${QUIZ} [data-step="${name}"]`);
  const o = overrides[name];
  if (kind === 'intro') await root.locator('[data-quiz-start]').click();
  else if (['text', 'email', 'longtext', 'multi', 'select'].includes(kind)) await root.locator('[data-quiz-next]').click();
  else if (['cards', 'choice', 'yesno', 'offers', 'scale'].includes(kind)) {
    const id = await root.evaluate((el, want) => {
      const inputs = Array.from(el.querySelectorAll('input[type="radio"]'));
      if (want != null) return (inputs.find((i) => i.value === String(want)) || inputs[0]).id;
      const ok = inputs.filter((i) => !i.dataset.disqualify);
      ok.sort((a, b) => (Number(b.dataset.score) || 0) - (Number(a.dataset.score) || 0));
      // A scale has no per-option score: the top of the scale is the committed answer.
      return (el.dataset.kind === 'scale' ? inputs[inputs.length - 1] : ok[0] || inputs[0]).id;
    }, o);
    const label = root.locator(`label[for="${id}"]`);
    await label.scrollIntoViewIfNeeded();
    await label.click({ position: { x: 30, y: 20 } });
  } else if (kind === 'contact') throw new Error('answerStep does not submit the contact step');
  await waitForStepChange(page, name);
  return step;
}

/** Walks from wherever the quiz is to the contact step. `onStep` runs on every screen before it is answered. */
export async function walkToContact(page, { overrides = {}, onStep } = {}) {
  for (let guard = 0; guard < 60; guard++) {
    const step = await activeStep(page);
    if (!step) throw new Error('no active quiz step');
    if (onStep) await onStep(step);
    if (step.kind === 'contact') return step;
    await answerStep(page, overrides);
  }
  throw new Error('quiz did not reach the contact step');
}

export async function fillContact(page, values = {}) {
  const root = page.locator(`${QUIZ} [data-step="contact"]`);
  const names = await root.locator('.quiz__field input').evaluateAll((els) => els.map((e) => ({ name: e.name, type: e.type, value: e.value })));
  for (const f of names) {
    if (values[f.name] !== undefined) await root.locator(`[name="${f.name}"]`).fill(values[f.name]);
    else if (!f.value) await root.locator(`[name="${f.name}"]`).fill(f.type === 'tel' ? '0412 345 678' : f.type === 'email' ? 'alex@example.com' : 'Example');
  }
}
