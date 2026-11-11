/**
 * Quiz funnel behaviour (reference C): one question per screen, progress
 * dots, Back, auto-advance on a tap, Continue enabled once there is an
 * answer, inline validation, the first name written into later questions,
 * lead scoring, screening out, an optional partial lead after the email
 * step, the loader, and the hand-off to submit-lead.ts.
 *
 * No dependencies. Touch, mouse and keyboard. Never traps scroll. Respects
 * reduced motion (the CSS removes the transitions; this file shortens the waits).
 */
import { isEmail, isAustralianPhone, normalisePhone } from '../lib/validate.ts';
import { submitLead, type LeadDestination } from '../lib/submit-lead.ts';
import { readUtm } from '../lib/utm.ts';
import { markLeadSubmitted, trackCustom } from '../lib/tracking.ts';

interface StepMeta {
  name: string;
  kind: string;
  minLength?: number;
  scoreAny?: { values: string[]; score: number };
  disqualifyAtOrBelow?: number;
  scoreBands?: Array<[number, number]>;
  otherOption?: string;
}
interface ContactMeta { name: string; type: 'text' | 'tel' | 'email'; required: boolean; prefillFrom?: string }
interface QuizRuntime {
  steps: StepMeta[];
  contact: ContactMeta[];
  dots: number;
  messages: { required: string; email: string; phone: string; minLength: string; choose: string; generic: string };
  destination: LeadDestination & { extra: Record<string, string> };
  thankYouPath: string;
  notFitPath: string;
  capturePartial: boolean;
  loader: { enabled: boolean; durationMs: number };
  qualifiedLeadScore: number | null;
}

/** Share of the loader's run time and the percentage reached at its end. Two holds, as measured on the reference (23% and 66%). */
const LOADER_CURVE: Array<[number, number]> = [
  [0.055, 0], [0.097, 17], [0.076, 23], [0.055, 23], [0.062, 38], [0.11, 46], [0.041, 51],
  [0.055, 59], [0.138, 66], [0.076, 66], [0.041, 76], [0.076, 88], [0.062, 94], [0.056, 100],
];

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function initQuiz(): void {
  document.querySelectorAll<HTMLElement>('[data-quiz]').forEach((root) => {
    if (root.dataset.quizReady) return;
    root.dataset.quizReady = '1';
    setup(root);
  });
}

function setup(root: HTMLElement): void {
  const cfg = JSON.parse(root.dataset.quizConfig || '{}') as QuizRuntime;
  const form = root.querySelector<HTMLFormElement>('[data-quiz-form]');
  if (!form) return;
  const stepEls = Array.from(form.querySelectorAll<HTMLElement>('[data-step]'));
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-quiz-progress] li'));
  const status = root.querySelector<HTMLElement>('[data-quiz-status]');
  const backButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-quiz-back]'));
  const formError = form.querySelector<HTMLElement>('[data-quiz-form-error]');
  const metaByName = new Map(cfg.steps.map((s) => [s.name, s]));

  let current = 0;
  const history: number[] = [];
  let busy = false;
  let arrowKey = false;
  let partialSent = false;
  let started = false;

  const el = (i: number) => stepEls[i];
  const nameOf = (i: number) => el(i).dataset.step || '';
  const kindOf = (i: number) => el(i).dataset.kind || 'intro';

  /* ---- Answers ---- */
  const answer = (name: string): string => {
    const controls = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${name}"]`));
    if (!controls.length) return '';
    const first = controls[0];
    if (first instanceof HTMLInputElement && (first.type === 'radio' || first.type === 'checkbox')) {
      return (controls as HTMLInputElement[]).filter((c) => c.checked).map((c) => c.value).join(', ');
    }
    if (first instanceof HTMLSelectElement) {
      const meta = metaByName.get(name);
      if (meta?.otherOption && first.value === meta.otherOption) {
        const other = form.querySelector<HTMLInputElement>(`[name="${name}_other"]`);
        return other?.value.trim() ? `${first.value}: ${other.value.trim()}` : first.value;
      }
    }
    return first.value.trim();
  };

  const firstName = () => answer('first_name');

  const paintName = () => {
    const name = firstName();
    root.querySelectorAll<HTMLElement>('[data-quiz-name]').forEach((span) => {
      span.textContent = name ? (span.dataset.lead === '1' ? ` ${name}` : name) : span.dataset.fallback || '';
    });
  };

  const score = (): number => {
    let total = 0;
    form.querySelectorAll<HTMLInputElement>('input[data-score]:checked').forEach((i) => (total += Number(i.dataset.score) || 0));
    form.querySelectorAll<HTMLSelectElement>('select').forEach((s) => (total += Number(s.selectedOptions[0]?.dataset.score) || 0));
    for (const meta of cfg.steps) {
      if (meta.kind === 'scale' && meta.scoreBands) {
        const v = Number(answer(meta.name));
        const band = meta.scoreBands.find(([min]) => v >= min);
        if (band) total += band[1];
      }
      if (meta.kind === 'multi' && meta.scoreAny) {
        const picked = answer(meta.name).split(', ');
        if (meta.scoreAny.values.some((v) => picked.includes(v))) total += meta.scoreAny.score;
      }
    }
    return Math.max(0, Math.min(100, total));
  };

  const screenedOut = (i: number): boolean => {
    if (!cfg.notFitPath) return false;
    const stepEl = el(i);
    if (stepEl.querySelector('input[data-disqualify]:checked')) return true;
    const select = stepEl.querySelector<HTMLSelectElement>('select');
    if (select?.selectedOptions[0]?.dataset.disqualify) return true;
    const meta = metaByName.get(nameOf(i));
    if (meta?.kind === 'scale' && meta.disqualifyAtOrBelow != null) {
      const v = Number(answer(meta.name));
      if (v && v <= meta.disqualifyAtOrBelow) return true;
    }
    return false;
  };

  /* ---- Errors ---- */
  const setError = (field: HTMLElement | null, message: string | null) => {
    if (!field) return;
    const input = field.querySelector<HTMLElement>('input:not([hidden]), textarea, select');
    const err = field.querySelector<HTMLElement>('.quiz__error');
    field.classList.toggle('is-invalid', Boolean(message));
    input?.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) err.textContent = message || '';
  };

  const validateStep = (i: number): boolean => {
    const stepEl = el(i);
    const kind = kindOf(i);
    const meta = metaByName.get(nameOf(i));
    const field = stepEl.querySelector<HTMLElement>('.quiz__field');
    const value = answer(nameOf(i));
    let message: string | null = null;
    if (kind === 'text' || kind === 'longtext') {
      const min = meta?.minLength ?? (kind === 'text' ? 2 : 1);
      if (!value) message = cfg.messages.required;
      else if (value.length < min) message = cfg.messages.minLength;
    } else if (kind === 'email') {
      if (!value) message = cfg.messages.required;
      else if (!isEmail(value)) message = cfg.messages.email;
    } else if (kind === 'select') {
      const select = stepEl.querySelector<HTMLSelectElement>('select');
      if (!select?.value) message = cfg.messages.choose;
      else if (meta?.otherOption && select.value === meta.otherOption) {
        const other = stepEl.querySelector<HTMLInputElement>('.quiz__other');
        if (!other?.value.trim()) message = cfg.messages.required;
      }
    } else if (kind === 'multi') {
      if (!value) message = cfg.messages.choose;
    } else if (['cards', 'choice', 'scale', 'yesno', 'offers'].includes(kind)) {
      if (!value) message = cfg.messages.choose;
    }
    setError(field, message);
    if (message) field?.querySelector<HTMLElement>('input:not([hidden]), textarea, select')?.focus({ preventScroll: true });
    return !message;
  };

  const validateContact = (): boolean => {
    let firstBad: HTMLElement | null = null;
    for (const f of cfg.contact) {
      const field = form.querySelector<HTMLElement>(`.quiz__step--contact [data-field="${f.name}"]`);
      const input = field?.querySelector<HTMLInputElement>('input');
      const value = input?.value.trim() ?? '';
      let message: string | null = null;
      if (f.required && !value) message = cfg.messages.required;
      else if (value && f.type === 'tel' && !isAustralianPhone(value)) message = cfg.messages.phone;
      else if (value && f.type === 'email' && !isEmail(value)) message = cfg.messages.email;
      else if (f.required && f.type === 'text' && value.length < 2) message = cfg.messages.minLength;
      setError(field, message);
      if (message && !firstBad) firstBad = input ?? null;
    }
    if (firstBad) {
      firstBad.focus({ preventScroll: true });
      firstBad.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
      return false;
    }
    return true;
  };

  /* ---- Continue enabled only when there is something to send ---- */
  const refreshContinue = (i: number) => {
    const stepEl = el(i);
    const button = stepEl.querySelector<HTMLButtonElement>('[data-quiz-next]');
    if (!button) return;
    const kind = kindOf(i);
    let ready = false;
    if (kind === 'multi') ready = Boolean(stepEl.querySelector('input:checked'));
    else if (kind === 'select') {
      const select = stepEl.querySelector<HTMLSelectElement>('select');
      const meta = metaByName.get(nameOf(i));
      const other = stepEl.querySelector<HTMLInputElement>('.quiz__other');
      const isOther = Boolean(meta?.otherOption && select?.value === meta.otherOption);
      if (other) other.hidden = !isOther;
      ready = Boolean(select?.value) && (!isOther || Boolean(other?.value.trim()));
    } else ready = answer(nameOf(i)).length > 0;
    button.disabled = !ready;
  };

  /* ---- Progress, status, Back ---- */
  const paintProgress = () => {
    const index = Number(el(current).dataset.index || 0);
    dots.forEach((dot, n) => dot.classList.toggle('is-lit', n < index));
    if (status && index > 0) status.textContent = (status.dataset.template || '').replace('{n}', String(index));
    backButtons.forEach((b) => (b.hidden = current === 0));
    document.documentElement.toggleAttribute('data-quiz-started', current > 0);
    const bar = root.querySelector<HTMLElement>('[data-quiz-exit-bar]');
    if (bar) bar.style.width = `${Math.max(15, Math.round((index / (stepEls.length - 1)) * 100))}%`;
  };

  /* ---- Moving between screens ---- */
  const show = async (next: number, direction: 'forward' | 'back') => {
    const from = el(current);
    const to = el(next);
    const quick = reducedMotion();
    from.classList.add('is-leaving');
    await wait(quick ? 0 : 200);
    from.hidden = true;
    from.inert = true;
    from.classList.remove('is-leaving', 'is-active');
    to.classList.add('is-entering');
    to.hidden = false;
    to.inert = false;
    to.classList.add('is-active');
    current = next;
    paintName();
    paintProgress();
    refreshContinue(next);
    window.scrollTo({ top: 0, behavior: quick ? 'auto' : 'smooth' });
    // Next frame, so the entering state is painted before it is released.
    requestAnimationFrame(() => requestAnimationFrame(() => to.classList.remove('is-entering')));
    setTimeout(() => {
      // Typing screens focus their field, as on the reference. Option screens and the contact step focus the
      // question instead, so it is announced and no option looks chosen before the visitor chooses.
      const typed = ['text', 'email', 'longtext', 'select'].includes(kindOf(next));
      const target = typed ? to.querySelector<HTMLElement>('.quiz__input:not([hidden]), textarea') : to.querySelector<HTMLElement>('.quiz__question');
      target?.focus({ preventScroll: true });
    }, quick ? 0 : 200);
    if (direction === 'forward') trackCustom('QuizStep', { step: Number(to.dataset.index || 0), name: nameOf(next) });
    await wait(quick ? 0 : 450);
  };

  const sendPartial = (stage: string) => {
    if (!cfg.capturePartial || !answer('email')) return;
    if (stage === 'email' && partialSent) return;
    partialSent = true;
    void submitLead(
      {
        fields: { first_name: firstName(), email: answer('email'), partial: 'true', stage },
        pageUrl: window.location.href,
        utm: readUtm(),
        submittedAt: new Date().toISOString(),
        extra: cfg.destination.extra || {},
      },
      cfg.destination,
    );
  };

  const prefillContact = () => {
    for (const f of cfg.contact) {
      if (!f.prefillFrom) continue;
      const input = form.querySelector<HTMLInputElement>(`.quiz__step--contact [name="${f.name}"]`);
      if (input && !input.value) input.value = answer(f.prefillFrom);
    }
  };

  const advance = async () => {
    if (busy) return;
    busy = true;
    try {
      if (current > 0 && kindOf(current) !== 'contact') {
        if (!validateStep(current)) return;
        if (kindOf(current) === 'email') {
          sendPartial('email');
          trackCustom('QuizEmail');
        }
        if (screenedOut(current)) {
          sendPartial('not_fit');
          window.location.assign(cfg.notFitPath);
          return;
        }
      }
      const next = current + 1;
      if (next >= stepEls.length) return;
      if (kindOf(next) === 'contact') prefillContact();
      history.push(current);
      await show(next, 'forward');
    } finally {
      busy = false;
    }
  };

  const back = async () => {
    if (busy || !history.length) return;
    busy = true;
    try {
      await show(history.pop() as number, 'back');
    } finally {
      busy = false;
    }
  };

  /* ---- Loader ---- */
  const runLoader = async () => {
    const loader = root.querySelector<HTMLElement>('[data-quiz-loader]');
    if (!loader || !cfg.loader.enabled) return;
    const pct = loader.querySelector<HTMLElement>('[data-loader-pct]');
    const lines = Array.from(loader.querySelectorAll<HTMLElement>('.quiz-loader__lines li'));
    (document.activeElement as HTMLElement | null)?.blur?.();
    loader.hidden = false;
    const total = reducedMotion() ? Math.min(cfg.loader.durationMs, 1500) : cfg.loader.durationMs;
    // Each segment runs within 20% of its share, so two visitors never see the same count.
    const segments = LOADER_CURVE.map(([share, to], n) => [share * total * (n === 0 ? 1 : 0.8 + 0.4 * Math.random()), to] as [number, number]);
    const startedAt = performance.now();
    const valueAt = (elapsed: number): number => {
      let from = 0;
      let t = elapsed;
      for (const [duration, to] of segments) {
        if (t < duration) {
          const x = t / duration;
          return from + (to - from) * (x * x * (3 - 2 * x));
        }
        t -= duration;
        from = to;
      }
      return 100;
    };
    await new Promise<void>((resolve) => {
      const tick = () => {
        const value = Math.round(valueAt(performance.now() - startedAt));
        const active = value >= 100 ? lines.length : Math.min(lines.length - 1, Math.floor(value / (100 / lines.length)));
        loader.style.setProperty('--p', String(value / 100));
        if (pct) pct.textContent = `${value}%`;
        lines.forEach((li, n) => {
          li.classList.toggle('is-done', n < active);
          li.classList.toggle('is-on', n === active);
        });
        if (value < 100) setTimeout(tick, 40);
        else resolve();
      };
      tick();
    });
    loader.classList.add('is-complete');
    await wait(reducedMotion() ? 300 : 1000);
  };

  const hideLoader = () => {
    const loader = root.querySelector<HTMLElement>('[data-quiz-loader]');
    if (!loader) return;
    loader.hidden = true;
    loader.classList.remove('is-complete');
  };

  /* ---- Submit ---- */
  const submit = async () => {
    if (busy) return;
    if (formError) formError.textContent = '';
    if (!validateContact()) return;
    busy = true;
    document.documentElement.setAttribute('data-quiz-submitting', '');

    const fields: Record<string, string> = {};
    for (const meta of cfg.steps) fields[meta.name] = answer(meta.name);
    for (const f of cfg.contact) {
      const input = form.querySelector<HTMLInputElement>(`.quiz__step--contact [name="${f.name}"]`);
      const value = input?.value.trim() ?? '';
      fields[f.name] = f.type === 'tel' ? normalisePhone(value) : value;
    }
    const leadScore = score();
    fields.lead_score = String(leadScore);

    const honeypot = form.querySelector<HTMLInputElement>('[name="company_website"]');
    const send = honeypot && honeypot.value
      ? Promise.resolve({ ok: true } as { ok: boolean; error?: string })
      : submitLead(
          { fields, pageUrl: window.location.href, utm: readUtm(), submittedAt: new Date().toISOString(), extra: cfg.destination.extra || {} },
          cfg.destination,
        );
    if (honeypot && honeypot.value) console.info('[lead] honeypot filled, send skipped');

    const [result] = await Promise.all([send, runLoader()]);
    if (!result.ok) {
      hideLoader();
      document.documentElement.removeAttribute('data-quiz-submitting');
      if (formError) formError.textContent = cfg.messages.generic;
      busy = false;
      return;
    }
    if (!(honeypot && honeypot.value)) {
      markLeadSubmitted();
      if (cfg.qualifiedLeadScore != null && leadScore >= cfg.qualifiedLeadScore) trackCustom('QualifiedLead', { lead_score: leadScore });
    }
    window.location.assign(cfg.thankYouPath);
  };

  /* ---- Wiring ---- */
  root.querySelector<HTMLButtonElement>('[data-quiz-start]')?.addEventListener('click', () => {
    if (!started) {
      started = true;
      trackCustom('QuizStart');
    }
    void advance();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (kindOf(current) === 'contact') void submit();
  });

  form.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-quiz-next]')) {
      void advance();
      return;
    }
    // A tap on a single-answer option moves on. Arrow keys also "click" a radio; those only change the choice.
    const input = target.closest<HTMLInputElement>('input[data-advance]');
    if (input && !arrowKey) void advance();
  });

  form.addEventListener('keydown', (event) => {
    arrowKey = /^Arrow/.test(event.key);
    const target = event.target as HTMLElement;
    if (event.key !== 'Enter') return;
    if (target instanceof HTMLTextAreaElement && !(event.metaKey || event.ctrlKey)) return;
    if (target instanceof HTMLButtonElement) return;
    event.preventDefault();
    if (target instanceof HTMLInputElement && target.type === 'radio') target.checked = true;
    if (kindOf(current) === 'contact') void submit();
    else if (current === 0) root.querySelector<HTMLButtonElement>('[data-quiz-start]')?.click();
    else void advance();
  });
  form.addEventListener('keyup', () => (arrowKey = false));

  form.addEventListener('input', (event) => {
    const target = event.target as HTMLElement;
    const stepEl = target.closest<HTMLElement>('[data-step]');
    if (!stepEl) return;
    const i = stepEls.indexOf(stepEl);
    refreshContinue(i);
    const field = target.closest<HTMLElement>('.quiz__field');
    if (field?.classList.contains('is-invalid')) setError(field, null);
    if (target.getAttribute('name') === 'first_name') paintName();
  });
  form.addEventListener('change', (event) => {
    const stepEl = (event.target as HTMLElement).closest<HTMLElement>('[data-step]');
    if (stepEl) refreshContinue(stepEls.indexOf(stepEl));
  });

  backButtons.forEach((b) => b.addEventListener('click', () => void back()));

  stepEls.forEach((_, i) => refreshContinue(i));
  paintName();
  paintProgress();
  initDictation(root);
  initExitPrompt(root);
}

/** Dictate chip: shown only where speech recognition exists; appends what it hears to the text area. */
function initDictation(root: HTMLElement): void {
  const w = window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any };
  const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Recognition) return;
  root.querySelectorAll<HTMLButtonElement>('[data-dictate]').forEach((button) => {
    const area = button.parentElement?.querySelector<HTMLTextAreaElement>('textarea');
    const label = button.querySelector<HTMLElement>('[data-dictate-label]');
    const timer = button.querySelector<HTMLElement>('[data-dictate-timer]');
    if (!area || !label || !timer) return;
    const idle = label.textContent || '';
    let listening = false;
    let base = '';
    let finals = '';
    let startedAt = 0;
    let ticker: ReturnType<typeof setInterval> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let recognition: any;
    try {
      recognition = new Recognition();
    } catch {
      return;
    }
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-AU';

    const paintTimer = () => {
      const s = Math.floor((Date.now() - startedAt) / 1000);
      timer.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    };
    const stop = () => {
      listening = false;
      clearInterval(ticker);
      button.classList.remove('is-listening');
      button.setAttribute('aria-pressed', 'false');
      label.textContent = idle;
      timer.textContent = '';
    };
    const fail = () => {
      stop();
      try { recognition.abort(); } catch { /* ignore */ }
      label.textContent = 'Dictation is not available here. Type your answer instead.';
      button.disabled = true;
      setTimeout(() => (button.hidden = true), 8000);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finals += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      const heard = (finals + interim).trim();
      area.value = heard ? (base ? `${base} ${heard}` : heard) : base;
      area.scrollTop = area.scrollHeight;
      area.dispatchEvent(new Event('input', { bubbles: true }));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') fail();
    };
    recognition.onend = () => {
      if (listening) {
        try { recognition.start(); } catch { fail(); }
      }
    };
    button.addEventListener('click', () => {
      if (listening) {
        stop();
        recognition.stop();
        return;
      }
      listening = true;
      base = area.value.replace(/\s+$/, '');
      finals = '';
      startedAt = Date.now();
      button.classList.add('is-listening');
      button.setAttribute('aria-pressed', 'true');
      label.textContent = 'Listening. Tap to stop';
      paintTimer();
      ticker = setInterval(paintTimer, 1000);
      try { recognition.start(); } catch { fail(); }
    });
    // Leaving the step stops the microphone.
    const step = button.closest<HTMLElement>('[data-step]');
    if (step) new MutationObserver(() => { if (listening && step.hidden) { stop(); recognition.stop(); } }).observe(step, { attributes: true, attributeFilter: ['hidden'] });
    button.hidden = false;
  });
}

/** One-time prompt when a desktop pointer leaves through the top of the window. Never while submitting. */
function initExitPrompt(root: HTMLElement): void {
  const dialog = root.querySelector<HTMLDialogElement>('[data-quiz-exit]');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let shown = false;
  document.addEventListener('mouseout', (event) => {
    if (shown || event.relatedTarget !== null || event.clientY > 0) return;
    if (document.documentElement.hasAttribute('data-quiz-submitting')) return;
    if (document.querySelector('dialog[open]')) return;
    shown = true;
    dialog.showModal();
  });
  dialog.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-quiz-exit-close]') || target === dialog) dialog.close();
  });
}
