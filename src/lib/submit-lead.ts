/**
 * THE ONE PLACE WHERE A LEAD LEAVES THE PAGE.
 *
 * The form component collects and validates the values, then calls
 * submitLead() with the assembled payload. With form.destination.url empty
 * the payload is logged and the visitor is still sent to the thank-you page.
 * With a URL set, the payload is POSTed as flat JSON, which is what a
 * GoHighLevel workflow "Inbound Webhook" trigger (and Zapier or Make) expects.
 *
 * GoHighLevel wiring, per client:
 *  1. In the client's sub-account: Automation, Workflows, create a workflow
 *     with the trigger "Inbound Webhook". Copy the webhook URL.
 *  2. Paste it into form.destination.url in site.config.ts.
 *  3. Submit the form once from the deployed preview so GHL captures a sample
 *     payload, then add the actions "Create/Update Contact" (map name, email,
 *     phone_e164 to the phone field, postcode, description to a custom field)
 *     and "Add Tag" or "Add to Pipeline", then publish the workflow.
 * Nothing else on the page needs to change.
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
  /** Extra static fields from form.destination.extra (for example a client or campaign id). */
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

/** Australian local number to E.164 (0412 345 678 becomes +61412345678), the format CRMs match on. */
export function toE164(local: string): string {
  const digits = local.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) return `+61${digits.slice(1)}`;
  if (digits.startsWith('61')) return `+${digits}`;
  return digits ? `+61${digits}` : '';
}

/** Flat key/value body: every webhook mapper (GHL, Zapier, Make) handles this without nesting. */
export function flattenPayload(payload: LeadPayload): Record<string, string> {
  const flat: Record<string, string> = { ...payload.fields };
  if (payload.fields.phone) flat.phone_e164 = toE164(payload.fields.phone);
  flat.page_url = payload.pageUrl;
  flat.submitted_at = payload.submittedAt;
  for (const [key, value] of Object.entries(payload.utm)) flat[key] = value;
  for (const [key, value] of Object.entries(payload.extra)) flat[key] = value;
  return flat;
}

export async function submitLead(payload: LeadPayload, destination: LeadDestination): Promise<SubmitResult> {
  const body = flattenPayload(payload);
  console.info('[lead] payload assembled', body);

  if (!destination.url) {
    console.warn('[lead] form.destination.url is empty, so the lead was logged only');
    return { ok: true };
  }

  try {
    const response = await fetch(destination.url, {
      method: destination.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) return { ok: false, error: `Destination responded ${response.status}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}
