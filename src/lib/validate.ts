/**
 * Client-side validation for the lead form. Pure functions, no DOM, so they
 * can be unit tested. Australian phone formats and four-digit postcodes.
 */
import type { FieldType } from '../config/types.ts';

export interface ValidationMessages {
  required: string;
  email: string;
  phone: string;
  postcode: string;
  minLength: string;
}

export interface FieldRule {
  name: string;
  type: FieldType;
  required: boolean;
  minLength?: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strips spaces, dashes, dots and brackets so "(03) 9123 4567" and "+61 412 345 678" both validate. */
export function normalisePhone(raw: string): string {
  let digits = raw.replace(/[\s().-]/g, '');
  if (digits.startsWith('+61')) digits = '0' + digits.slice(3);
  else if (digits.startsWith('0061')) digits = '0' + digits.slice(4);
  else if (digits.startsWith('61') && digits.length === 11) digits = '0' + digits.slice(2);
  return digits;
}

/**
 * Accepts Australian mobiles (04xx xxx xxx), landlines with area code
 * (02, 03, 07, 08 plus eight digits), 1300 and 1800 numbers and 13 numbers.
 */
export function isAustralianPhone(raw: string): boolean {
  const d = normalisePhone(raw);
  if (!/^\d+$/.test(d)) return false;
  if (/^04\d{8}$/.test(d)) return true;
  if (/^0[2378]\d{8}$/.test(d)) return true;
  if (/^1[38]00\d{6}$/.test(d)) return true;
  if (/^13\d{4}$/.test(d)) return true;
  return false;
}

export function isAustralianPostcode(raw: string): boolean {
  const d = raw.trim();
  if (!/^\d{4}$/.test(d)) return false;
  const n = Number(d);
  return n >= 200 && n <= 9999;
}

export function isEmail(raw: string): boolean {
  return EMAIL_RE.test(raw.trim());
}

/** Returns an error message for a field value, or null when valid. */
export function validateField(rule: FieldRule, value: string, messages: ValidationMessages): string | null {
  const v = value.trim();
  if (!v) return rule.required ? messages.required : null;
  switch (rule.type) {
    case 'email':
      return isEmail(v) ? null : messages.email;
    case 'tel':
      return isAustralianPhone(v) ? null : messages.phone;
    case 'postcode':
      return isAustralianPostcode(v) ? null : messages.postcode;
    default:
      if (rule.minLength && v.length < rule.minLength) return messages.minLength;
      return null;
  }
}
