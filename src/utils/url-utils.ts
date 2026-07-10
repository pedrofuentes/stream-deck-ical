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
 * @param url - Raw URL as entered/stored by the user
 * @returns Normalized URL safe to pass to fetch()
 */
export function normalizeICalUrl(url: string): string {
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
 * @param url - URL to validate
 * @returns True if the URL (after normalization) is fetchable via http(s)
 */
export function isSupportedICalUrl(url: string): boolean {
  const normalized = normalizeICalUrl(url);
  try {
    const parsed = new URL(normalized);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
