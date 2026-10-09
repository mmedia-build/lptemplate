/**
 * THE ONE PLACE WHERE A LEAD LEAVES THE PAGE.
 *
 * The form component collects and validates the values, then calls
 * submitLead() with the assembled payload. Today this is a stub: it logs the
 * payload and resolves, and the form then redirects to the thank-you page.
 *
 * To wire a real destination, set form.destination.url in site.config.ts and
 * replace the TODO block below. Nothing else needs to change.
 */

export interface LeadPayload {
  /** Field name to value, as typed, with the phone normalised to a 0-prefixed local number. */
  fields: Record<string, string>;
  /** Full URL of the page the form was on. */
  pageUrl: string;
  /** First-touch UTM parameters captured when the visitor landed. */
  utm: Record<string, string>;
  /** ISO 8601 timestamp of the submit. */
  submittedAt: string;
  /** Extra static fields from form.destination.extra. */
  extra: Record<string, string>;
}

export interface LeadDestination {
  url: string;
  method: 'POST';
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitLead(payload: LeadPayload, destination: LeadDestination): Promise<SubmitResult> {
  console.info('[lead] payload assembled', payload);

  if (!destination.url) {
    console.warn('[lead] form.destination.url is empty, so the lead was logged only');
    return { ok: true };
  }

  // TODO: wire the real destination here (CRM webhook, Zapier, Make, GoHighLevel, email relay).
  // The example below posts JSON and treats any 2xx as success. Replace the body
  // shape if the destination expects form-encoded fields.
  try {
    const response = await fetch(destination.url, {
      method: destination.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { ok: false, error: `Destination responded ${response.status}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}
