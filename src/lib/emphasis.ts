/**
 * Reference C's text slots mark a phrase with **double asterisks**: the hero callout shows it in
 * the accent colour, the headline underlines it, P.S. paragraphs set it in bold. This turns the
 * markers into one wrapping element and escapes everything else, so config text can never inject
 * markup. Unmatched asterisks are left as they are.
 */
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function emphasis(text: string, tag: 'strong' | 'span' = 'strong', className = ''): string {
  const cls = className ? ` class="${className}"` : '';
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, (_m, inner) => `<${tag}${cls}>${inner}</${tag}>`);
}

/** The text a visitor reads, with the markers removed (for aria labels and length checks). */
export const plainText = (text: string) => text.replace(/\*\*/g, '');
