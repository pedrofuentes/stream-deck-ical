/**
 * Tests for URL utilities
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { normalizeICalUrl, isSupportedICalUrl } from '../src/utils/url-utils';

describe('normalizeICalUrl', () => {
  it('rewrites webcal:// to https://', () => {
    expect(normalizeICalUrl('webcal://example.com/cal.ics')).toBe('https://example.com/cal.ics');
  });

  it('rewrites webcals:// to https://', () => {
    expect(normalizeICalUrl('webcals://example.com/cal.ics')).toBe('https://example.com/cal.ics');
  });

  it('rewrites webcal:// case-insensitively', () => {
    expect(normalizeICalUrl('WEBCAL://example.com/cal.ics')).toBe('https://example.com/cal.ics');
    expect(normalizeICalUrl('WebCal://example.com/cal.ics')).toBe('https://example.com/cal.ics');
  });

  it('rewrites webcals:// case-insensitively', () => {
    expect(normalizeICalUrl('WEBCALS://example.com/cal.ics')).toBe('https://example.com/cal.ics');
  });

  it('leaves https:// URLs unchanged', () => {
    expect(normalizeICalUrl('https://example.com/cal.ics')).toBe('https://example.com/cal.ics');
  });

  it('leaves http:// URLs unchanged', () => {
    expect(normalizeICalUrl('http://example.com/cal.ics')).toBe('http://example.com/cal.ics');
  });

  it('leaves non-URL/garbage strings unchanged (aside from trimming)', () => {
    expect(normalizeICalUrl('not-a-url')).toBe('not-a-url');
    expect(normalizeICalUrl('ftp://example.com/cal.ics')).toBe('ftp://example.com/cal.ics');
  });

  it('trims leading/trailing whitespace', () => {
    expect(normalizeICalUrl('  webcal://example.com/cal.ics  ')).toBe('https://example.com/cal.ics');
    expect(normalizeICalUrl('  https://example.com/cal.ics  ')).toBe('https://example.com/cal.ics');
  });
});

describe('isSupportedICalUrl', () => {
  it('returns true for https:// URLs', () => {
    expect(isSupportedICalUrl('https://example.com/cal.ics')).toBe(true);
  });

  it('returns true for http:// URLs', () => {
    expect(isSupportedICalUrl('http://example.com/cal.ics')).toBe(true);
  });

  it('returns true for webcal:// URLs (normalizes to https)', () => {
    expect(isSupportedICalUrl('webcal://example.com/cal.ics')).toBe(true);
  });

  it('returns true for webcals:// URLs (normalizes to https)', () => {
    expect(isSupportedICalUrl('webcals://example.com/cal.ics')).toBe(true);
  });

  it('returns false for ftp:// URLs', () => {
    expect(isSupportedICalUrl('ftp://example.com/cal.ics')).toBe(false);
  });

  it('returns false for file:// URLs', () => {
    expect(isSupportedICalUrl('file:///etc/passwd')).toBe(false);
  });

  it('returns false for non-URL strings', () => {
    expect(isSupportedICalUrl('not-a-url')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isSupportedICalUrl('')).toBe(false);
  });
});

describe('null/undefined/non-string safety (#49)', () => {
  it('normalizeICalUrl returns null unchanged instead of throwing', () => {
    expect(normalizeICalUrl(null as unknown as string)).toBe(null);
  });

  it('normalizeICalUrl returns undefined unchanged instead of throwing', () => {
    expect(normalizeICalUrl(undefined as unknown as string)).toBe(undefined);
  });

  it('normalizeICalUrl returns a non-string input unchanged instead of throwing', () => {
    expect(normalizeICalUrl(42 as unknown as string)).toBe(42);
  });

  it('isSupportedICalUrl returns false for null instead of throwing', () => {
    expect(isSupportedICalUrl(null as unknown as string)).toBe(false);
  });

  it('isSupportedICalUrl returns false for undefined instead of throwing', () => {
    expect(isSupportedICalUrl(undefined as unknown as string)).toBe(false);
  });

  it('isSupportedICalUrl returns false for a non-string input instead of throwing', () => {
    expect(isSupportedICalUrl(42 as unknown as string)).toBe(false);
  });
});
