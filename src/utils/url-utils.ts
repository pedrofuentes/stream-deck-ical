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
 * throwing (#49 item 3) — note this means the return value can itself be
 * non-string in that case, despite the declared `string` return type.
 * Callers that may receive untrusted/corrupted input (e.g. hand-edited
 * settings) must not rely on this function alone to reach an INVALID_URL
 * state; they need their own string boundary guard before normalizing, as
 * `CalendarManager.getOrCreateCalendar` does (#65).
 *
 * @param url - Raw URL as entered/stored by the user
 * @returns Normalized URL safe to pass to fetch(); if `url` is not a
 *   string, the same non-string value is returned unchanged (the `string`
 *   return type does not hold for non-string input)
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
 * throwing (#49 item 3): `normalizeICalUrl` returns the non-string value
 * unchanged, and the subsequent `new URL(...)` call then throws (caught
 * below) since a non-string argument cannot parse as an http(s) URL.
 *
 * @param url - URL to validate
 * @returns True if the URL (after normalization) is fetchable via http(s);
 *   false for any non-string input
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
