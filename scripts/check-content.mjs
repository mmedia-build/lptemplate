#!/usr/bin/env node
/**
 * Checks every text slot in the config against the reference length in
 * src/config/spec.ts (10% tolerance unless the slot says otherwise), flags
 * em dashes and common US spellings, and exits 1 on any failure.
 *
 *   node --experimental-strip-types scripts/check-content.mjs [path/to/config.ts]
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const configPath = path.resolve(process.argv[2] || 'site.config.ts');
const { default: config } = await import(pathToFileURL(configPath).href);
const { textSlots } = await import(pathToFileURL(path.resolve('src/config/spec.ts')).href);

const US_SPELLINGS = [/\bcolor\b/i, /\bcolors\b/i, /\borganize/i, /\bcenter\b/i, /\bfavorite/i, /\bneighbor/i, /\bcatalog\b/i, /\bprogram\b/i];

function sectionsOfType(type) {
  return config.sections.filter((s) => s.type === type);
}

/** Resolves a spec path to one or more [label, text] pairs. */
function resolve(pathExpr) {
  const results = [];
  const walk = (obj, parts, label) => {
    if (!parts.length) {
      if (obj == null) return;
      if (typeof obj === 'string') results.push([label, obj]);
      else if (typeof obj === 'object' && 'lead' in obj) results.push([label, [obj.lead, obj.text].filter(Boolean).join(' ')]);
      return;
    }
    const [head, ...rest] = parts;
    const m = head.match(/^(\w+)\[(\w+)\]$/);
    if (m) {
      const [, key, sel] = m;
      const arr = obj?.[key];
      if (!Array.isArray(arr)) return;
      if (key === 'sections') {
        sectionsOfType(sel).forEach((s, i) => walk(s, rest, `${label}${key}[${sel}${i ? '#' + (i + 1) : ''}].`));
      } else if (sel === 'n') {
        arr.forEach((item, i) => walk(item, rest, `${label}${key}[${i}].`));
      } else if (/^\d+$/.test(sel)) {
        walk(arr[Number(sel)], rest, `${label}${key}[${sel}].`);
      } else {
        const item = arr.find((x) => x?.name === sel);
        walk(item, rest, `${label}${key}[${sel}].`);
      }
      return;
    }
    walk(obj?.[head], rest, `${label}${head}.`);
  };
  walk(config, pathExpr.split('.'), '');
  return results.map(([label, text]) => [label.replace(/\.$/, ''), text]);
}

let failures = 0;
const rows = [];
for (const slot of textSlots) {
  const tol = slot.tolerance ?? 0.1;
  const min = Math.floor(slot.chars * (1 - tol));
  const max = Math.ceil(slot.chars * (1 + tol));
  const found = resolve(slot.path);
  if (!found.length) {
    rows.push(['MISSING', slot.path, '', `${slot.chars}`, '']);
    failures++;
    continue;
  }
  for (const [label, text] of found) {
    const len = text.length;
    const problems = [];
    if (len === 0 && slot.path === 'urgency.line') {
      rows.push(['ok', label, '0', `${slot.chars} (optional)`, 'empty by design']);
      continue;
    }
    if (len < min || len > max) problems.push(`length ${len} outside ${min}-${max}`);
    if (/—|–/.test(text)) problems.push('contains an em or en dash');
    for (const re of US_SPELLINGS) if (re.test(text)) problems.push(`US spelling: ${re.source}`);
    if (problems.length) failures++;
    rows.push([problems.length ? 'FAIL' : 'ok', label, String(len), `${min}-${max}`, problems.join('; ')]);
  }
}

const width = Math.max(...rows.map((r) => r[1].length));
for (const [status, label, len, range, note] of rows) {
  console.log(`${status.padEnd(7)} ${label.padEnd(width)} ${len.padStart(4)}  ${range.padEnd(12)} ${note}`);
}
console.log(`\n${rows.length} slots checked, ${failures} problem(s).`);
process.exit(failures ? 1 : 0);
