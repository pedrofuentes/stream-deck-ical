/**
 * URL utilities for iCal feed handling
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

/**
 * Normalize an iCal feed URL for fetching.
 *
 * Apple/iCloud calendar share links use the `webcal://` (and `webcals://`)
 * scheme, which Node's `fetch` cannot dereference (it throws a generic
 * `TypeError: fetch failed`). Since `webcal(s)://` is defined to behave
 * identically to `http(s)://` for a plain GET of the feed, rewrite it to
 * the equivalent `https://` scheme so the URL can be fetched normally (#43).
 *
 * Any other URL is returned unchanged, aside from trimming surrounding
 * whitespace.
 *
 * Non-string input (`null`/`undefined`/other types slipping through at
 * runtime despite the `string` type) is returned unchanged rather than
 * throwing — callers such as `CalendarManager` and the Property Inspector
 * treat an unusable URL as an INVALID_URL state, not a crash (#49 item 3).
 *
 * @param url - Raw URL as entered/stored by the user
 * @returns Normalized URL safe to pass to fetch()
 */
export function normalizeICalUrl(url: string): string {
  if (typeof url !== 'string') {
    return url;
  }
  const trimmed = url.trim();
  return trimmed.replace(/^webcals?:\/\//i, 'https://');
}

/**
 * Check whether a URL is a supported iCal feed URL.
 *
 * A URL is supported if, after normalizing `webcal(s)://` to `https://`,
 * it parses as a valid URL whose protocol is `http:` or `https:`. This
 * rejects schemes `fetch()` cannot handle (e.g. `ftp://`, `file://`) up
 * front so callers can surface a clear INVALID_URL state instead of a
 * confusing network error (#43).
 *
 * Non-string input is safely rejected (returns `false`) rather than
 * throwing (#49 item 3).
 *
 * @param url - URL to validate
 * @returns True if the URL (after normalization) is fetchable via http(s)
 */
export function isSupportedICalUrl(url: string): boolean {
  try {
    const normalized = normalizeICalUrl(url);
    const parsed = new URL(normalized);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
