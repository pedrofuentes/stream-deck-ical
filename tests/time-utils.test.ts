/**
 * Tests for time utilities
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { sec2time, secondsUntil, secondsSince, isWithinHours } from '../src/utils/time-utils';

describe('sec2time', () => {
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
});
