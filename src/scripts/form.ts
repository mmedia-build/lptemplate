/**
 * Lead form behaviour: inline validation, honeypot, loading state, single
 * submit, payload assembly, hand-off to submit-lead.ts, then redirect.
 *
 * Stepped forms (any field with a `step` in config, reference C's quiz) show
 * one step at a time. Next validates only the current step and refuses to move
 * on when a radio answer carries a stop message; Back never validates. A
 * submit that finds an error on an earlier step goes back to that step.
 */
import { validateField, normalisePhone, type FieldRule, type ValidationMessages } from '../lib/validate.ts';
import { submitLead, type LeadDestination } from '../lib/submit-lead.ts';
import { readUtm } from '../lib/utm.ts';
import { markLeadSubmitted } from '../lib/tracking.ts';

interface RuntimeRule extends FieldRule {
  stops?: Record<string, string>;
}

interface FormRuntimeConfig {
  rules: RuntimeRule[];
  messages: ValidationMessages & { generic: string };
  destination: LeadDestination & { extra: Record<string, string> };
  thankYouPath: string;
  sendingLabel: string;
}

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function initLeadForms(): void {
  document.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach((form) => {
    const config = JSON.parse(form.dataset.formConfig || '{}') as FormRuntimeConfig;
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    if (!submit) return;
    const idleLabel = submit.textContent || '';
    let busy = false;

    const fieldEl = (name: string) => form.querySelector<HTMLElement>(`[data-field="${name}"]`);
    /** The element to focus for a field: the input itself, or the first radio of a group. */
    const focusable = (name: string): Control | null => {
      const item = form.elements.namedItem(name);
      if (!item) return null;
      if (item instanceof RadioNodeList) return (item[0] as HTMLInputElement) ?? null;
      return item as Control;
    };
    const valueOf = (name: string): string => {
      const item = form.elements.namedItem(name);
      if (!item) return '';
      return (item as RadioNodeList | Control).value ?? '';
    };
    const isRadio = (name: string) => form.elements.namedItem(name) instanceof RadioNodeList;

    const showError = (name: string, message: string | null) => {
      const wrap = fieldEl(name);
      if (!wrap) return;
      const err = wrap.querySelector<HTMLElement>('.field__error');
      wrap.classList.toggle('is-invalid', Boolean(message));
      if (isRadio(name)) wrap.setAttribute('aria-invalid', message ? 'true' : 'false');
      else focusable(name)?.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (err) err.textContent = message || '';
    };

    /** The stop message for a radio answer, if the chosen option has one. */
    const stopFor = (rule: RuntimeRule): string | null => {
      if (!rule.stops) return null;
      const v = valueOf(rule.name);
      return v && rule.stops[v] ? rule.stops[v] : null;
    };
    const showStop = (rule: RuntimeRule) => {
      const box = form.querySelector<HTMLElement>(`[data-stop-for="${rule.name}"]`);
      if (!box) return;
      const message = stopFor(rule);
      box.hidden = !message;
      box.textContent = message || '';
    };

    /* ---- Steps ---- */
    const steps = Array.from(form.querySelectorAll<HTMLElement>('[data-step]'));
    const stepped = steps.length > 1;
    let current = 0;
    const stepOf = (name: string) => {
      const el = fieldEl(name);
      return el ? steps.findIndex((s) => s.contains(el)) : -1;
    };
    const rulesIn = (index: number) => config.rules.filter((r) => !stepped || stepOf(r.name) === index);

    const showStep = (index: number, moveFocus: boolean) => {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((s, i) => {
        const on = i === current;
        s.classList.toggle('is-current', on);
        s.toggleAttribute('inert', !on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      if (!moveFocus) return;
      const counter = steps[current].querySelector<HTMLElement>('[data-step-counter]');
      counter?.focus({ preventScroll: true });
      const top = form.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) form.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };

    if (stepped) {
      form.classList.add('is-stepped');
      showStep(0, false);
      form.querySelectorAll<HTMLButtonElement>('[data-step-next]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!validateRules(rulesIn(current))) return;
          showStep(current + 1, true);
        });
      });
      form.querySelectorAll<HTMLButtonElement>('[data-step-back]').forEach((btn) => {
        btn.addEventListener('click', () => showStep(current - 1, true));
      });
    }

    /** Validates a set of rules; shows errors and stop messages; focuses the first problem. */
    function validateRules(rules: RuntimeRule[]): boolean {
      let firstBad: string | null = null;
      for (const rule of rules) {
        const message = validateField(rule, valueOf(rule.name), config.messages);
        showError(rule.name, message);
        showStop(rule);
        if ((message || stopFor(rule)) && !firstBad) firstBad = rule.name;
      }
      if (firstBad) {
        if (stepped) {
          const idx = stepOf(firstBad);
          if (idx !== -1 && idx !== current) showStep(idx, false);
        }
        const el = focusable(firstBad);
        el?.focus({ preventScroll: true });
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return false;
      }
      return true;
    }

    // Validate a field once the visitor leaves it, and clear its error as they fix it.
    for (const rule of config.rules) {
      if (isRadio(rule.name)) {
        form.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${rule.name}"]`).forEach((radio) => {
          radio.addEventListener('change', () => {
            showError(rule.name, null);
            showStop(rule);
          });
        });
        continue;
      }
      const input = focusable(rule.name);
      if (!input) continue;
      input.addEventListener('blur', () => {
        if (input.value.trim()) showError(rule.name, validateField(rule, input.value, config.messages));
      });
      input.addEventListener('input', () => {
        if (fieldEl(rule.name)?.classList.contains('is-invalid')) {
          showError(rule.name, validateField(rule, input.value, config.messages));
        }
      });
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (busy) return;
      // Enter in a field on an earlier step means Next, not submit.
      if (stepped && current < steps.length - 1) {
        if (validateRules(rulesIn(current))) showStep(current + 1, true);
        return;
      }
      if (status) status.textContent = '';
      if (!validateRules(config.rules)) return;

      const honeypot = form.elements.namedItem('website') as HTMLInputElement | null;
      if (honeypot && honeypot.value) {
        // A bot filled the hidden field: pretend to succeed without sending anything.
        window.location.assign(config.thankYouPath);
        return;
      }

      busy = true;
      submit.setAttribute('aria-busy', 'true');
      submit.disabled = true;
      submit.textContent = config.sendingLabel || idleLabel;

      const fields: Record<string, string> = {};
      for (const rule of config.rules) {
        const value = valueOf(rule.name).trim();
        fields[rule.name] = rule.type === 'tel' ? normalisePhone(value) : value;
      }

      const result = await submitLead(
        {
          fields,
          pageUrl: window.location.href,
          utm: readUtm(),
          submittedAt: new Date().toISOString(),
          extra: config.destination.extra ?? {},
        },
        config.destination,
      );

      if (result.ok) {
        markLeadSubmitted();
        window.location.assign(config.thankYouPath);
        return;
      }

      busy = false;
      submit.removeAttribute('aria-busy');
      submit.disabled = false;
      submit.textContent = idleLabel;
      if (status) status.textContent = config.messages.generic;
    });
  });
}
