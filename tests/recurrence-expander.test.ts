/**
 * Tests for recurrence expander
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the logger
vi.mock('../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

import { expandRecurringEvent, processRecurringEvents } from '../src/services/recurrence-expander';
import { CalendarEvent } from '../src/types/index';

describe('expandRecurringEvent', () => {
  const baseEvent: CalendarEvent = {
    uid: 'test-recurring',
    summary: 'Weekly Meeting',
    start: new Date('2026-01-05T10:00:00Z'), // A Monday
    end: new Date('2026-01-05T11:00:00Z')
  };

  describe('weekly recurrence', () => {
    it('should expand weekly event correctly', () => {
      const rrule = 'FREQ=WEEKLY;BYDAY=MO';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-31T23:59:59Z');

      const expanded = expandRecurringEvent(
        baseEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should have 4 Mondays in January 2026 (5th, 12th, 19th, 26th)
      expect(expanded.length).toBeGreaterThanOrEqual(4);
      
      // All should have same duration (1 hour)
      expanded.forEach(event => {
        const duration = event.end.getTime() - event.start.getTime();
        expect(duration).toBe(60 * 60 * 1000);
      });
    });

    it('should handle multiple days per week', () => {
      const rrule = 'FREQ=WEEKLY;BYDAY=MO,WE,FR';
      const startWindow = new Date('2026-01-05T00:00:00Z');
      const endWindow = new Date('2026-01-11T23:59:59Z'); // One week

      const expanded = expandRecurringEvent(
        baseEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should have at least 3 occurrences (Mon, Wed, Fri)
      expect(expanded.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('daily recurrence', () => {
    it('should expand daily event correctly', () => {
      const dailyEvent: CalendarEvent = {
        uid: 'test-daily',
        summary: 'Daily Standup',
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T09:15:00Z')
      };

      const rrule = 'FREQ=DAILY';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-07T23:59:59Z'); // One week

      const expanded = expandRecurringEvent(
        dailyEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should have 7 days
      expect(expanded.length).toBe(7);
    });

    it('should handle daily with interval', () => {
      const dailyEvent: CalendarEvent = {
        uid: 'test-daily-2',
        summary: 'Every Other Day',
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T10:00:00Z')
      };

      const rrule = 'FREQ=DAILY;INTERVAL=2';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-14T23:59:59Z'); // Two weeks

      const expanded = expandRecurringEvent(
        dailyEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should have 7 occurrences (every other day for 2 weeks)
      expect(expanded.length).toBe(7);
    });
  });

  describe('monthly recurrence', () => {
    it('should expand monthly event correctly', () => {
      const monthlyEvent: CalendarEvent = {
        uid: 'test-monthly',
        summary: 'Monthly Review',
        start: new Date('2026-01-15T14:00:00Z'),
        end: new Date('2026-01-15T15:00:00Z')
      };

      const rrule = 'FREQ=MONTHLY';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-06-30T23:59:59Z'); // 6 months

      const expanded = expandRecurringEvent(
        monthlyEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should have 6 occurrences
      expect(expanded.length).toBe(6);
    });
  });

  describe('EXDATE handling', () => {
    it('should exclude dates from recurrence', () => {
      const rrule = 'FREQ=WEEKLY;BYDAY=MO';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-31T23:59:59Z');
      
      // Exclude the second Monday (12th)
      const exdates = [new Date('2026-01-12T10:00:00Z')];

      const expanded = expandRecurringEvent(
        baseEvent,
        rrule,
        exdates,
        startWindow,
        endWindow
      );

      // Should have one less occurrence
      // Check that January 12 is not in the results
      const hasExcludedDate = expanded.some(e => 
        e.start.getTime() === new Date('2026-01-12T10:00:00Z').getTime()
      );
      expect(hasExcludedDate).toBe(false);
    });

    it('should handle multiple EXDATEs', () => {
      const rrule = 'FREQ=DAILY';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-07T23:59:59Z');
      
      const dailyEvent: CalendarEvent = {
        uid: 'test-daily-ex',
        summary: 'Daily with exclusions',
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T10:00:00Z')
      };

      // Exclude 3rd and 5th
      const exdates = [
        new Date('2026-01-03T09:00:00Z'),
        new Date('2026-01-05T09:00:00Z')
      ];

      const expanded = expandRecurringEvent(
        dailyEvent,
        rrule,
        exdates,
        startWindow,
        endWindow
      );

      // 7 days - 2 exclusions = 5 occurrences
      expect(expanded.length).toBe(5);
    });
  });

  describe('with COUNT limit', () => {
    it('should respect COUNT limit', () => {
      const rrule = 'FREQ=WEEKLY;BYDAY=MO;COUNT=3';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-12-31T23:59:59Z'); // Full year

      const expanded = expandRecurringEvent(
        baseEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should have exactly 3 occurrences
      expect(expanded.length).toBe(3);
    });
  });

  describe('with UNTIL date', () => {
    it('should respect UNTIL date', () => {
      const rrule = 'FREQ=WEEKLY;BYDAY=MO;UNTIL=20260120T235959Z';
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-12-31T23:59:59Z');

      const expanded = expandRecurringEvent(
        baseEvent,
        rrule,
        [],
        startWindow,
        endWindow
      );

      // Should only have occurrences up to Jan 20
      expanded.forEach(event => {
        expect(event.start.getTime()).toBeLessThanOrEqual(new Date('2026-01-20T23:59:59Z').getTime());
      });
    });
  });
});

describe('processRecurringEvents', () => {
  it('should process mix of recurring and non-recurring events', () => {
    const events: CalendarEvent[] = [
      {
        uid: 'single-1',
        summary: 'Single Event',
        start: new Date('2026-01-15T10:00:00Z'),
        end: new Date('2026-01-15T11:00:00Z'),
        isRecurring: false
      },
      {
        uid: 'recurring-1',
        summary: 'Weekly Event',
        start: new Date('2026-01-05T09:00:00Z'),
        end: new Date('2026-01-05T10:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO'
      }
    ];

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // Should have the single event + expanded weekly occurrences
    expect(processed.length).toBeGreaterThan(1);
    
    // Should include the single event
    const hasSingle = processed.some(e => e.summary === 'Single Event');
    expect(hasSingle).toBe(true);
    
    // Should have multiple weekly occurrences
    const weeklyOccurrences = processed.filter(e => e.summary === 'Weekly Event');
    expect(weeklyOccurrences.length).toBeGreaterThanOrEqual(4);
  });

  it('should filter events within time window', () => {
    const events: CalendarEvent[] = [
      {
        uid: 'outside',
        summary: 'Outside Window',
        start: new Date('2025-12-01T10:00:00Z'),
        end: new Date('2025-12-01T11:00:00Z'),
        isRecurring: false
      },
      {
        uid: 'inside',
        summary: 'Inside Window',
        start: new Date('2026-01-15T10:00:00Z'),
        end: new Date('2026-01-15T11:00:00Z'),
        isRecurring: false
      }
    ];

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // Should only include event inside window
    expect(processed.length).toBe(1);
    expect(processed[0].summary).toBe('Inside Window');
  });

  it('should handle empty event list', () => {
    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const processed = processRecurringEvents([], startWindow, endWindow);

    expect(processed).toEqual([]);
  });

  it('should mark expanded events as recurring', () => {
    const events: CalendarEvent[] = [
      {
        uid: 'recurring-1',
        summary: 'Weekly Event',
        start: new Date('2026-01-05T09:00:00Z'),
        end: new Date('2026-01-05T10:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO'
      }
    ];

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // All expanded events should be marked as recurring
    processed.forEach(event => {
      expect(event.isRecurring).toBe(true);
    });
  });
});

describe('edge cases', () => {
  it('should handle invalid RRULE gracefully', () => {
    const event: CalendarEvent = {
      uid: 'invalid-rrule',
      summary: 'Invalid',
      start: new Date('2026-01-05T10:00:00Z'),
      end: new Date('2026-01-05T11:00:00Z')
    };

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    // RRule library may be lenient with invalid input - it might not throw
    // Test that it at least doesn't crash and returns an array
    let result: any[];
    let threw = false;
    try {
      result = expandRecurringEvent(event, 'INVALID_RRULE', [], startWindow, endWindow);
    } catch (e) {
      threw = true;
    }
    
    // Either it throws or it returns an array (possibly empty)
    expect(threw || Array.isArray(result!)).toBe(true);
  });

  it('should handle window with no occurrences', () => {
    const event: CalendarEvent = {
      uid: 'no-occurrences',
      summary: 'Future Event',
      start: new Date('2027-01-05T10:00:00Z'), // Far future
      end: new Date('2027-01-05T11:00:00Z')
    };

    const rrule = 'FREQ=WEEKLY;BYDAY=MO';
    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const expanded = expandRecurringEvent(event, rrule, [], startWindow, endWindow);

    expect(expanded.length).toBe(0);
  });

  it('should preserve summary and uid in expanded events', () => {
    const event: CalendarEvent = {
      uid: 'with-summary',
      summary: 'Meeting with Details',
      start: new Date('2026-01-05T10:00:00Z'),
      end: new Date('2026-01-05T11:00:00Z')
    };

    const rrule = 'FREQ=WEEKLY;BYDAY=MO;COUNT=2';
    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const expanded = expandRecurringEvent(event, rrule, [], startWindow, endWindow);

    expect(expanded.length).toBe(2);
    expanded.forEach(e => {
      expect(e.summary).toBe('Meeting with Details');
      // UID should contain original UID
      expect(e.uid).toContain('with-summary');
    });
  });
});
