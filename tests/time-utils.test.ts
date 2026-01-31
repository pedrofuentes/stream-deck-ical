/**
 * Tests for time utilities
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { sec2time, secondsUntil, secondsSince, isWithinHours, sleep } from '../src/utils/time-utils';

describe('sec2time', () => {
  describe('basic formatting', () => {
    it('should format seconds correctly', () => {
      expect(sec2time(30)).toBe('30s');
      expect(sec2time(90)).toBe('1m 30s');
      expect(sec2time(300)).toBe('5m 0s');
      expect(sec2time(3600)).toBe('1h');
      expect(sec2time(3660)).toBe('1h 1m');
      expect(sec2time(7200)).toBe('2h');
    });

    it('should handle negative values', () => {
      expect(sec2time(-30)).toBe('- 30s');
      expect(sec2time(-90)).toBe('- 1m 30s');
      expect(sec2time(-3600)).toBe('- 1h');
    });

    it('should handle zero', () => {
      expect(sec2time(0)).toBe('0s');
    });
  });

  describe('edge cases', () => {
    it('should handle exactly 1 minute', () => {
      expect(sec2time(60)).toBe('1m 0s');
    });

    it('should handle exactly 1 hour', () => {
      expect(sec2time(3600)).toBe('1h');
    });

    it('should handle 1 hour with seconds only (no minutes)', () => {
      // The function only shows hours once time > 1 hour
      expect(sec2time(3630)).toBe('1h'); // 1h 0m 30s -> shows just 1h
    });

    it('should show only hours for more than 1 hour', () => {
      expect(sec2time(7200)).toBe('2h');
      expect(sec2time(10800)).toBe('3h');
    });

    it('should handle very large values', () => {
      expect(sec2time(86400)).toBe('24h'); // 24 hours
      expect(sec2time(172800)).toBe('48h'); // 48 hours
    });

    it('should handle fractional seconds (floor)', () => {
      expect(sec2time(30.9)).toBe('30s');
      expect(sec2time(59.9)).toBe('59s');
    });

    it('should handle negative fractional seconds', () => {
      expect(sec2time(-30.5)).toBe('- 30s');
    });

    it('should handle 59 seconds', () => {
      expect(sec2time(59)).toBe('59s');
    });

    it('should handle 59 minutes', () => {
      expect(sec2time(59 * 60)).toBe('59m 0s');
    });

    it('should handle 59 minutes 59 seconds', () => {
      expect(sec2time(59 * 60 + 59)).toBe('59m 59s');
    });
  });

  describe('boundary conditions', () => {
    it('should handle transition from seconds to minutes', () => {
      expect(sec2time(59)).toBe('59s');
      expect(sec2time(60)).toBe('1m 0s');
      expect(sec2time(61)).toBe('1m 1s');
    });

    it('should handle transition from minutes to hours', () => {
      expect(sec2time(3599)).toBe('59m 59s');
      expect(sec2time(3600)).toBe('1h');
      expect(sec2time(3601)).toBe('1h'); // Still shows 1h (no minutes shown when 0)
    });
  });
});

describe('secondsUntil', () => {
  it('should calculate seconds until a future date', () => {
    const future = new Date(Date.now() + 5000);
    const result = secondsUntil(future);
    expect(result).toBeGreaterThanOrEqual(4);
    expect(result).toBeLessThanOrEqual(5);
  });

  it('should return negative for past dates', () => {
    const past = new Date(Date.now() - 5000);
    const result = secondsUntil(past);
    expect(result).toBeLessThanOrEqual(-4);
    expect(result).toBeGreaterThanOrEqual(-5);
  });

  it('should return approximately 0 for current time', () => {
    const now = new Date();
    const result = secondsUntil(now);
    expect(result).toBeLessThanOrEqual(1);
    expect(result).toBeGreaterThanOrEqual(-1);
  });

  it('should handle large time differences', () => {
    const farFuture = new Date(Date.now() + 86400000); // 1 day
    const result = secondsUntil(farFuture);
    expect(result).toBeGreaterThanOrEqual(86399);
    expect(result).toBeLessThanOrEqual(86400);
  });

  it('should handle dates at midnight', () => {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const result = secondsUntil(midnight);
    expect(typeof result).toBe('number');
  });
});

describe('secondsSince', () => {
  it('should calculate seconds since a past date', () => {
    const past = new Date(Date.now() - 5000);
    const result = secondsSince(past);
    expect(result).toBeGreaterThanOrEqual(4);
    expect(result).toBeLessThanOrEqual(5);
  });

  it('should return negative for future dates', () => {
    const future = new Date(Date.now() + 5000);
    const result = secondsSince(future);
    expect(result).toBeLessThanOrEqual(-4);
    expect(result).toBeGreaterThanOrEqual(-5);
  });

  it('should return approximately 0 for current time', () => {
    const now = new Date();
    const result = secondsSince(now);
    expect(result).toBeLessThanOrEqual(1);
    expect(result).toBeGreaterThanOrEqual(-1);
  });

  it('should be opposite of secondsUntil', () => {
    const date = new Date(Date.now() + 10000);
    const until = secondsUntil(date);
    const since = secondsSince(date);
    expect(until + since).toBeLessThanOrEqual(1);
    expect(until + since).toBeGreaterThanOrEqual(-1);
  });
});

describe('isWithinHours', () => {
  it('should return true for dates within the time window', () => {
    const now = new Date();
    const future = new Date(now.getTime() + (2 * 60 * 60 * 1000)); // 2 hours ahead
    const past = new Date(now.getTime() - (2 * 60 * 60 * 1000)); // 2 hours ago
    
    expect(isWithinHours(future, 24)).toBe(true);
    expect(isWithinHours(past, 24)).toBe(true);
  });

  it('should return false for dates outside the time window', () => {
    const now = new Date();
    const farFuture = new Date(now.getTime() + (50 * 60 * 60 * 1000)); // 50 hours ahead
    const farPast = new Date(now.getTime() - (50 * 60 * 60 * 1000)); // 50 hours ago
    
    expect(isWithinHours(farFuture, 24)).toBe(false);
    expect(isWithinHours(farPast, 24)).toBe(false);
  });

  it('should handle current time (edge case)', () => {
    const now = new Date();
    expect(isWithinHours(now, 24)).toBe(true);
    expect(isWithinHours(now, 1)).toBe(true);
    expect(isWithinHours(now, 0.1)).toBe(true);
  });

  it('should handle boundary conditions', () => {
    const now = new Date();
    // Exactly at boundary (12 hours for a 24-hour window centered on now)
    const atBoundary = new Date(now.getTime() + (12 * 60 * 60 * 1000));
    expect(isWithinHours(atBoundary, 24)).toBe(true);
    
    // Just past boundary
    const pastBoundary = new Date(now.getTime() + (12.1 * 60 * 60 * 1000));
    expect(isWithinHours(pastBoundary, 24)).toBe(false);
  });

  it('should handle small time windows', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const oneMinuteLater = new Date(now.getTime() + 60000);
    
    // 1 hour window = 30 minutes on each side
    expect(isWithinHours(oneMinuteAgo, 1)).toBe(true);
    expect(isWithinHours(oneMinuteLater, 1)).toBe(true);
  });

  it('should handle zero hour window', () => {
    const now = new Date();
    // Zero hour window should only include exactly now
    expect(isWithinHours(now, 0)).toBe(true);
    
    const oneSecondLater = new Date(now.getTime() + 1000);
    expect(isWithinHours(oneSecondLater, 0)).toBe(false);
  });
});

describe('sleep', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now();
    await sleep(100);
    const elapsed = Date.now() - start;
    
    // Allow some tolerance for timing
    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(elapsed).toBeLessThan(200);
  });

  it('should handle zero milliseconds', async () => {
    const start = Date.now();
    await sleep(0);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });

  it('should return a Promise', () => {
    const result = sleep(1);
    expect(result).toBeInstanceOf(Promise);
  });
});
