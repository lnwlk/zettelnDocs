/** Turn a heading/step title into a stable, URL-safe anchor id (handles
 *  German umlauts so ids stay readable, e.g. "Anzahl wählen" → "anzahl-waehlen"). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
