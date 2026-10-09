/**
 * Lead form behaviour: inline validation, honeypot, loading state, single
 * submit, payload assembly, hand-off to submit-lead.ts, then redirect.
 */
import { validateField, normalisePhone, type FieldRule, type ValidationMessages } from '../lib/validate.ts';
import { submitLead, type LeadDestination } from '../lib/submit-lead.ts';
import { readUtm } from '../lib/utm.ts';
import { markLeadSubmitted } from '../lib/tracking.ts';

interface FormRuntimeConfig {
  rules: FieldRule[];
  messages: ValidationMessages & { generic: string };
  destination: LeadDestination & { extra: Record<string, string> };
  thankYouPath: string;
  sendingLabel: string;
}

export function initLeadForms(): void {
  document.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach((form) => {
    const config = JSON.parse(form.dataset.formConfig || '{}') as FormRuntimeConfig;
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    if (!submit) return;
    const idleLabel = submit.textContent || '';
    let busy = false;

    const fieldEl = (name: string) => form.querySelector<HTMLElement>(`[data-field="${name}"]`);
    const control = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;

    const showError = (name: string, message: string | null) => {
      const wrap = fieldEl(name);
      const input = control(name);
      if (!wrap || !input) return;
      const err = wrap.querySelector<HTMLElement>('.field__error');
      wrap.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (err) err.textContent = message || '';
    };

    const validateAll = (): boolean => {
      let firstBad: string | null = null;
      for (const rule of config.rules) {
        const input = control(rule.name);
        const message = validateField(rule, input?.value ?? '', config.messages);
        showError(rule.name, message);
        if (message && !firstBad) firstBad = rule.name;
      }
      if (firstBad) {
        const input = control(firstBad);
        input?.focus({ preventScroll: true });
        input?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return false;
      }
      return true;
    };

    // Validate a field once the visitor leaves it, and clear its error as they fix it.
    for (const rule of config.rules) {
      const input = control(rule.name);
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
      if (status) status.textContent = '';
      if (!validateAll()) return;

      const honeypot = control('website');
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
        const value = control(rule.name)?.value.trim() ?? '';
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
