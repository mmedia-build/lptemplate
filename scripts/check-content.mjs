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

/**
 * `type:id` matches the section of that type with that id. Plain `type` matches every section
 * of that type except ones whose id has its own `type:id` entries in the spec, so a reference B
 * variant (for example comparison with id b-comparison) is measured against its own lengths.
 */
const specificIds = new Map();
for (const slot of textSlots) {
  const m = slot.path.match(/^sections\[(\w+):([\w-]+)\]/);
  if (m) (specificIds.get(m[1]) ?? specificIds.set(m[1], new Set()).get(m[1])).add(m[2]);
}
function sectionsOfType(selector) {
  const [type, id] = selector.split(':');
  if (id) return config.sections.filter((s) => s.type === type && s.id === id);
  const specific = specificIds.get(type);
  return config.sections.filter((s) => s.type === type && !(s.id && specific && specific.has(s.id)));
}

/** A slot under a section selector is skipped (not failed) when no such section is in this config. */
function sectionPresent(pathExpr) {
  const m = pathExpr.match(/^sections\[([\w:-]+)\]/);
  return m ? sectionsOfType(m[1]).length > 0 : true;
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
    const m = head.match(/^(\w+)\[([\w:-]+)\]$/);
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
  if (!sectionPresent(slot.path)) {
    rows.push(['skip', slot.path, '', `${slot.chars}`, 'section not in this config']);
    continue;
  }
  const found = resolve(slot.path);
  if (!found.length) {
    const optional = ['cta.reinforcement', 'sections[offerForm].content.lead'].includes(slot.path);
    rows.push([optional ? 'skip' : 'MISSING', slot.path, '', `${slot.chars}`, optional ? 'optional, not set' : '']);
    if (!optional) failures++;
    continue;
  }
  for (const [label, text] of found) {
    const len = text.length;
    const problems = [];
    if (len === 0 && ['urgency.line', 'cta.reinforcement'].includes(slot.path)) {
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
