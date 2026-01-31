/**
 * Tests for timezone service
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { parseTimezone, getTimezoneFromParams, isValidIANATimezone } from '../src/services/timezone-service';

describe('parseTimezone', () => {
  it('should parse IANA timezone names', () => {
    const result = parseTimezone('America/New_York');
    expect(result.ianaName).toBe('America/New_York');
    expect(result.isQuoted).toBe(false);
    expect(result.windowsName).toBeUndefined();
  });

  it('should parse quoted timezone names (Outlook format)', () => {
    const result = parseTimezone('"Eastern Standard Time"');
    expect(result.isQuoted).toBe(true);
    expect(result.windowsName).toBe('Eastern Standard Time');
    expect(result.ianaName).toBe('America/New_York');
  });

  it('should parse unquoted Windows timezone names', () => {
    const result = parseTimezone('Pacific Standard Time');
    expect(result.windowsName).toBe('Pacific Standard Time');
    expect(result.ianaName).toBe('America/Los_Angeles');
  });

  it('should handle empty timezone', () => {
    const result = parseTimezone('');
    expect(result.ianaName).toBe('UTC');
    expect(result.isQuoted).toBe(false);
  });

  it('should convert common Windows timezones', () => {
    const testCases = [
      { windows: 'Eastern Standard Time', iana: 'America/New_York' },
      { windows: 'Pacific Standard Time', iana: 'America/Los_Angeles' },
      { windows: 'Central Standard Time', iana: 'America/Chicago' },
      { windows: 'Mountain Standard Time', iana: 'America/Denver' }
    ];

    for (const { windows, iana } of testCases) {
      const result = parseTimezone(windows);
      expect(result.ianaName).toBe(iana);
    }
  });
});

describe('getTimezoneFromParams', () => {
  it('should extract timezone from TZID parameter', () => {
    const params = ['TZID=America/New_York', 'OTHER=VALUE'];
    const result = getTimezoneFromParams(params);
    expect(result).toBe('America/New_York');
  });

  it('should handle quoted TZID', () => {
    const params = ['TZID="Eastern Standard Time"'];
    const result = getTimezoneFromParams(params);
    expect(result).toBe('America/New_York');
  });

  it('should return UTC when no TZID found', () => {
    const params = ['OTHER=VALUE'];
    const result = getTimezoneFromParams(params);
    expect(result).toBe('UTC');
  });

  it('should return UTC for empty params', () => {
    const result = getTimezoneFromParams([]);
    expect(result).toBe('UTC');
  });
});

describe('isValidIANATimezone', () => {
  it('should validate common IANA timezones', () => {
    expect(isValidIANATimezone('America/New_York')).toBe(true);
    expect(isValidIANATimezone('Europe/London')).toBe(true);
    expect(isValidIANATimezone('Asia/Tokyo')).toBe(true);
    expect(isValidIANATimezone('UTC')).toBe(true);
  });

  it('should reject invalid timezones', () => {
    expect(isValidIANATimezone('Invalid/Timezone')).toBe(false);
    expect(isValidIANATimezone('NotATimezone')).toBe(false);
    expect(isValidIANATimezone('')).toBe(false);
  });
});
