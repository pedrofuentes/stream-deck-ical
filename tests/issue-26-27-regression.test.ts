/**
 * Regression tests for issue #26 (CPU spike / stuck on Loading)
 * and issue #27 (RECURRENCE-ID override not matching across DST).
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

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
import { parseICS } from '../src/services/ical-parser';
import { CalendarEvent } from '../src/types/index';

// ─────────────────────────────────────────────────────────────
// Issue #26: CPU spike / safeguards
// ─────────────────────────────────────────────────────────────

describe('Issue #26 — RRULE expansion safeguards', () => {
  it('should cap occurrences at MAX_OCCURRENCES (500)', () => {
    // A minutely event with no COUNT/UNTIL over a 7-day window would produce 2016 occurrences.
    const event: CalendarEvent = {
      uid: 'minutely-no-limit',
      summary: 'Every 5 Minutes',
      start: new Date('2026-01-01T09:00:00Z'),
      end: new Date('2026-01-01T09:05:00Z')
    };

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-08T00:00:00Z'); // 7 days

    const expanded = expandRecurringEvent(
      event,
      'FREQ=MINUTELY;INTERVAL=5',
      [],
      startWindow,
      endWindow
    );

    // The exact cap is 500 (MAX_OCCURRENCES)
    expect(expanded.length).toBeLessThanOrEqual(500);
    expect(expanded.length).toBeGreaterThan(0);
  });

  it('should not crash on invalid/malformed RRULE', () => {
    const event: CalendarEvent = {
      uid: 'bad-rrule',
      summary: 'Broken Event',
      start: new Date('2026-01-05T10:00:00Z'),
      end: new Date('2026-01-05T11:00:00Z')
    };

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    // Should not throw — returns empty array on failure
    const result = expandRecurringEvent(event, 'COMPLETELY_INVALID', [], startWindow, endWindow);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should isolate per-event errors in processRecurringEvents', () => {
    // One broken event should not prevent other events from being processed
    const events = [
      {
        uid: 'good-single',
        summary: 'Normal Event',
        start: new Date('2026-01-15T10:00:00Z'),
        end: new Date('2026-01-15T11:00:00Z'),
        isRecurring: false
      },
      {
        uid: 'bad-recurring',
        summary: 'Bad Recurring',
        start: new Date('2026-01-05T09:00:00Z'),
        end: new Date('2026-01-05T10:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=INVALID_GARBAGE'
      },
      {
        uid: 'good-recurring',
        summary: 'Good Recurring',
        start: new Date('2026-01-05T14:00:00Z'),
        end: new Date('2026-01-05T15:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=2'
      }
    ];

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // Normal single event should be present
    expect(processed.some(e => e.summary === 'Normal Event')).toBe(true);
    // Good recurring should still expand
    expect(processed.some(e => e.summary === 'Good Recurring')).toBe(true);
  });

  it('should handle stress test fixture without crashing', () => {
    const fixturePath = path.join(__dirname, '..', '__fixtures__', 'google-calendar', 'many-recurring.ics');
    const icsContent = fs.readFileSync(fixturePath, 'utf8');
    const parsed = parseICS(icsContent);

    // Wide window to trigger many occurrences
    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-08T00:00:00Z'); // 7 days

    // Should complete without hanging; occurrences are capped
    const processed = processRecurringEvents(parsed.events, startWindow, endWindow);
    expect(Array.isArray(processed)).toBe(true);
    // The normal weekly event should still be present
    expect(processed.some(e => e.summary === 'Normal Weekly Meeting')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// Issue #27: RECURRENCE-ID not matching across DST
// ─────────────────────────────────────────────────────────────

describe('Issue #27 — RECURRENCE-ID matching', () => {
  describe('basic RECURRENCE-ID matching (no DST)', () => {
    it('should replace original occurrence with modified one', () => {
      const events: CalendarEvent[] = [
        {
          uid: 'weekly-1',
          summary: 'Weekly Meeting',
          start: new Date('2026-01-05T10:00:00Z'),
          end: new Date('2026-01-05T11:00:00Z'),
          isRecurring: true,
          rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=4'
        },
        {
          uid: 'weekly-1',
          summary: 'Weekly Meeting (Moved)',
          start: new Date('2026-01-12T14:00:00Z'),
          end: new Date('2026-01-12T15:00:00Z'),
          isRecurring: false,
          recurrenceId: new Date('2026-01-12T10:00:00Z').toISOString()
        }
      ];

      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-02-01T00:00:00Z');

      const processed = processRecurringEvents(events, startWindow, endWindow);

      // Should NOT have a duplicate for Jan 12 at the original time
      const jan12Events = processed.filter(e =>
        e.start.toISOString().startsWith('2026-01-12')
      );
      expect(jan12Events.length).toBe(1);
      expect(jan12Events[0].summary).toBe('Weekly Meeting (Moved)');
      expect(jan12Events[0].start.getUTCHours()).toBe(14);
    });
  });

  describe('date-fallback matching for DST mismatch', () => {
    it('should match RECURRENCE-ID to expanded occurrence via date fallback', () => {
      // Simulate DST mismatch: RRULE expands to 12:00 UTC but
      // RECURRENCE-ID converts to 13:00 UTC for the same local-time occurrence.
      // This happens when master DTSTART is in summer (UTC+3) but the
      // exception's RECURRENCE-ID falls in winter (UTC+2).
      const events: CalendarEvent[] = [
        {
          uid: 'dst-mismatch',
          summary: 'Weekly DST',
          start: new Date('2025-07-01T12:00:00Z'), // 15:00 FLE summer (UTC+3)
          end: new Date('2025-07-01T13:00:00Z'),
          isRecurring: true,
          rrule: 'FREQ=WEEKLY;BYDAY=TU;COUNT=30',
          eventTimezone: 'Europe/Kiev'
        },
        {
          uid: 'dst-mismatch',
          summary: 'Weekly DST (Moved)',
          start: new Date('2025-11-04T14:00:00Z'), // Modified occurrence
          end: new Date('2025-11-04T15:00:00Z'),
          // RECURRENCE-ID: 15:00 FLE in winter = 13:00 UTC
          // But RRule expansion from summer DTSTART gives 12:00 UTC for Nov 4
          recurrenceId: new Date('2025-11-04T13:00:00Z').toISOString()
        }
      ];

      const startWindow = new Date('2025-11-01T00:00:00Z');
      const endWindow = new Date('2025-11-08T00:00:00Z');

      const processed = processRecurringEvents(events, startWindow, endWindow);

      // Nov 4 should have only ONE event, the modified version
      const nov4Events = processed.filter(e =>
        e.start.toISOString().startsWith('2025-11-04')
      );

      // The date-fallback should prevent duplicates
      expect(nov4Events.length).toBe(1);
      expect(nov4Events[0].summary).toBe('Weekly DST (Moved)');
    });

    it('should not false-match occurrences on different dates', () => {
      // Ensure the date-fallback only matches same-date, same-UID
      const events: CalendarEvent[] = [
        {
          uid: 'weekly-2',
          summary: 'Event A',
          start: new Date('2026-01-05T10:00:00Z'),
          end: new Date('2026-01-05T11:00:00Z'),
          isRecurring: true,
          rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=4'
        },
        {
          uid: 'weekly-2',
          summary: 'Event A (Modified Jan 19)',
          start: new Date('2026-01-19T12:00:00Z'),
          end: new Date('2026-01-19T13:00:00Z'),
          recurrenceId: new Date('2026-01-19T10:00:00Z').toISOString()
        }
      ];

      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-02-01T00:00:00Z');

      const processed = processRecurringEvents(events, startWindow, endWindow);

      // Jan 5 and Jan 12 should still be the original event
      const jan5 = processed.filter(e => e.start.toISOString().startsWith('2026-01-05'));
      expect(jan5.length).toBe(1);
      expect(jan5[0].summary).toBe('Event A');

      const jan12 = processed.filter(e => e.start.toISOString().startsWith('2026-01-12'));
      expect(jan12.length).toBe(1);
      expect(jan12[0].summary).toBe('Event A');

      // Jan 19 should be the modified version only
      const jan19 = processed.filter(e => e.start.toISOString().startsWith('2026-01-19'));
      expect(jan19.length).toBe(1);
      expect(jan19[0].summary).toBe('Event A (Modified Jan 19)');
    });
  });

  describe('Outlook FLE Standard Time fixture', () => {
    it('should parse RECURRENCE-ID with FLE Standard Time timezone', () => {
      const fixturePath = path.join(__dirname, '..', '__fixtures__', 'outlook', 'recurrence-id-fle.ics');
      const icsContent = fs.readFileSync(fixturePath, 'utf8');
      const parsed = parseICS(icsContent);

      // Should have two events: the master + the exception
      expect(parsed.events.length).toBe(2);

      const master = parsed.events.find(e => !e.recurrenceId);
      const exception = parsed.events.find(e => !!e.recurrenceId);

      expect(master).toBeDefined();
      expect(exception).toBeDefined();
      expect(master!.summary).toBe('Weekly Team Sync');
      expect(exception!.summary).toBe('Weekly Team Sync (Rescheduled)');
      expect(exception!.recurrenceId).toBeDefined();
    });

    it('should not produce duplicate events for FLE RECURRENCE-ID', () => {
      const fixturePath = path.join(__dirname, '..', '__fixtures__', 'outlook', 'recurrence-id-fle.ics');
      const icsContent = fs.readFileSync(fixturePath, 'utf8');
      const parsed = parseICS(icsContent);

      // Feb 2026: FLE Standard Time is UTC+2 (winter)
      // DTSTART: 20260211T150000 FLE = 13:00 UTC
      // RECURRENCE-ID: 20260218T150000 FLE = 13:00 UTC
      // Both in winter, so no DST mismatch. This tests the basic path.
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-03-01T00:00:00Z');

      const processed = processRecurringEvents(parsed.events, startWindow, endWindow);

      // Check Feb 18 specifically — should only have the rescheduled version
      const feb18Events = processed.filter(e =>
        e.start.toISOString().startsWith('2026-02-18')
      );
      expect(feb18Events.length).toBe(1);
      expect(feb18Events[0].summary).toBe('Weekly Team Sync (Rescheduled)');
    });

    it('should handle DST-crossing RECURRENCE-ID fixture', () => {
      const fixturePath = path.join(__dirname, '..', '__fixtures__', 'outlook', 'recurrence-id-dst.ics');
      const icsContent = fs.readFileSync(fixturePath, 'utf8');
      const parsed = parseICS(icsContent);

      // Master: 20250701T150000 FLE (summer, UTC+3 → 12:00 UTC)
      // Weekly on Tuesday, COUNT=30
      // Exception: RECURRENCE-ID 20251104T150000 FLE (winter after Oct DST change, UTC+2 → 13:00 UTC)
      // RRule expansion from 12:00 UTC DTSTART → Nov 4 at 12:00 UTC
      // RECURRENCE-ID → Nov 4 at 13:00 UTC — MISMATCH!
      // The date-fallback should handle this.

      const startWindow = new Date('2025-11-01T00:00:00Z');
      const endWindow = new Date('2025-11-08T00:00:00Z');

      const processed = processRecurringEvents(parsed.events, startWindow, endWindow);

      // Nov 4 should appear only once with the modified version
      const nov4Events = processed.filter(e =>
        e.start.toISOString().startsWith('2025-11-04')
      );
      expect(nov4Events.length).toBe(1);
      expect(nov4Events[0].summary).toBe('Weekly DST Crossing Meeting (Moved)');
    });
  });

  describe('eventTimezone is preserved through expansion', () => {
    it('should propagate eventTimezone to expanded events', () => {
      const events: CalendarEvent[] = [
        {
          uid: 'tz-propagation',
          summary: 'TZ Event',
          start: new Date('2026-01-05T10:00:00Z'),
          end: new Date('2026-01-05T11:00:00Z'),
          isRecurring: true,
          rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=2',
          eventTimezone: 'Europe/Kiev'
        }
      ];

      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-31T23:59:59Z');

      const processed = processRecurringEvents(events, startWindow, endWindow);
      expect(processed.length).toBe(2);
      processed.forEach(e => {
        expect(e.eventTimezone).toBe('Europe/Kiev');
      });
    });
  });
});

// ─────────────────────────────────────────────────────────────
// Issue #30: DST boundary crossing — recurring events shift by 1 hour
// ─────────────────────────────────────────────────────────────

describe('Issue #30 — DST boundary crossing for recurring events', () => {
  it('should keep wall-clock time consistent across spring-forward DST boundary', () => {
    // Europe/Berlin: CET (UTC+1) → CEST (UTC+2) on March 29 2026
    // A weekly Monday 10:00 event should stay at 10:00 local time on both sides.
    const events: CalendarEvent[] = [
      {
        uid: 'dst-spring-forward',
        summary: 'Weekly Standup',
        // Monday Jan 5 2026, 10:00 CET = 09:00 UTC
        start: new Date('2026-01-05T09:00:00Z'),
        end: new Date('2026-01-05T10:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        eventTimezone: 'Europe/Berlin'
      }
    ];

    // Window spanning the DST boundary (March 29 2026)
    const startWindow = new Date('2026-03-01T00:00:00Z');
    const endWindow = new Date('2026-04-15T00:00:00Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // March 23 (last Monday before DST): 10:00 CET = 09:00 UTC
    const mar23 = processed.find(e => e.start.toISOString().startsWith('2026-03-23'));
    expect(mar23).toBeDefined();
    expect(mar23!.start.getUTCHours()).toBe(9); // 10:00 CET = 09:00 UTC

    // March 30 (first Monday after DST): 10:00 CEST = 08:00 UTC
    const mar30 = processed.find(e => e.start.toISOString().startsWith('2026-03-30'));
    expect(mar30).toBeDefined();
    expect(mar30!.start.getUTCHours()).toBe(8); // 10:00 CEST = 08:00 UTC

    // April 6: still CEST, should also be 08:00 UTC
    const apr6 = processed.find(e => e.start.toISOString().startsWith('2026-04-06'));
    expect(apr6).toBeDefined();
    expect(apr6!.start.getUTCHours()).toBe(8); // 10:00 CEST = 08:00 UTC
  });

  it('should keep wall-clock time consistent across fall-back DST boundary', () => {
    // Europe/Berlin: CEST (UTC+2) → CET (UTC+1) on October 25 2026
    const events: CalendarEvent[] = [
      {
        uid: 'dst-fall-back',
        summary: 'Weekly Review',
        // Monday July 6 2026, 14:00 CEST = 12:00 UTC
        start: new Date('2026-07-06T12:00:00Z'),
        end: new Date('2026-07-06T13:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO',
        eventTimezone: 'Europe/Berlin'
      }
    ];

    const startWindow = new Date('2026-10-01T00:00:00Z');
    const endWindow = new Date('2026-11-15T00:00:00Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // Oct 19 (before fall-back): 14:00 CEST = 12:00 UTC
    const oct19 = processed.find(e => e.start.toISOString().startsWith('2026-10-19'));
    expect(oct19).toBeDefined();
    expect(oct19!.start.getUTCHours()).toBe(12); // 14:00 CEST = 12:00 UTC

    // Oct 26 (after fall-back): 14:00 CET = 13:00 UTC
    const oct26 = processed.find(e => e.start.toISOString().startsWith('2026-10-26'));
    expect(oct26).toBeDefined();
    expect(oct26!.start.getUTCHours()).toBe(13); // 14:00 CET = 13:00 UTC

    // Nov 2: still CET, should also be 13:00 UTC
    const nov2 = processed.find(e => e.start.toISOString().startsWith('2026-11-02'));
    expect(nov2).toBeDefined();
    expect(nov2!.start.getUTCHours()).toBe(13); // 14:00 CET = 13:00 UTC
  });

  it('should fall back to UTC expansion when eventTimezone is not set', () => {
    // Events without eventTimezone should behave as before (UTC-based expansion)
    const events: CalendarEvent[] = [
      {
        uid: 'no-tz',
        summary: 'UTC Event',
        start: new Date('2026-01-05T10:00:00Z'),
        end: new Date('2026-01-05T11:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=4'
        // no eventTimezone
      }
    ];

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-02-01T00:00:00Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);
    expect(processed.length).toBe(4);

    // All should be at 10:00 UTC
    processed.forEach(e => {
      expect(e.start.getUTCHours()).toBe(10);
    });
  });
});

// Logger enhancement exports are tested in diagnostics-service.test.ts
// (the mock in this file overrides the real module, so direct import tests
// would fail — they are verified via the diagnostics service instead).
