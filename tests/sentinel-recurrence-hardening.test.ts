/**
 * Sentinel follow-up hardening tests for zone-aware recurrence expansion.
 *
 * Covers:
 *  - #57: RECURRENCE-ID date-fallback branch when the master expands WITHOUT
 *    a usable zone (exact-key genuinely misses).
 *  - #58: boundary behaviors of zone-aware expansion (date-only UNTIL,
 *    spring-forward gap, floating, cross-DST UNTIL inclusive boundary).
 *  - #59 minors: UNTIL rewrite robustness (invalid stamp, lowercase),
 *    invalid-zone warn dedup, exact real-UTC window filtering across DST,
 *    EXDATE matching in the spring-forward gap, eventTimezone parameter
 *    defaulting to event.eventTimezone.
 *  - Code scanning alert #2: UID fallback uses crypto randomness.
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
import { parseICS } from '../src/services/ical-parser';
import { CalendarEvent } from '../src/types/index';
import { logger } from '../src/utils/logger';

// The logger mock is module-level; clear recorded calls so per-test call-count
// oracles cannot be satisfied by earlier tests (#59 item 8 pattern).
beforeEach(() => {
  vi.mocked(logger.warn).mockClear();
});

// ─────────────────────────────────────────────────────────────
// #57 — RECURRENCE-ID date-fallback with a UTC-expanded master
// ─────────────────────────────────────────────────────────────

describe('Issue #57 — RECURRENCE-ID date-fallback when the exact key misses', () => {
  it('should match the exception via the date fallback when the master expands without a zone', () => {
    // Master has NO eventTimezone, so it expands on the plain UTC path:
    // every Tuesday at 12:00:00Z, including 2025-11-04T12:00:00Z.
    // The exception's RECURRENCE-ID was resolved via its own TZID
    // (15:00 FLE winter, UTC+2) to 2025-11-04T13:00:00Z.
    // Exact key: "uid|2025-11-04T12:00:00.000Z" vs "uid|2025-11-04T13:00:00.000Z"
    // → genuinely MISSES; only the date fallback ("uid|2025-11-04") can match.
    const events: CalendarEvent[] = [
      {
        uid: 'no-zone-master',
        summary: 'Weekly DST',
        start: new Date('2025-07-01T12:00:00Z'), // Tue 15:00 FLE summer (UTC+3)
        end: new Date('2025-07-01T13:00:00Z'),
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=TU;COUNT=30'
        // no eventTimezone — UTC expansion path
      },
      {
        uid: 'no-zone-master',
        summary: 'Weekly DST (Moved)',
        start: new Date('2025-11-04T14:00:00Z'),
        end: new Date('2025-11-04T15:00:00Z'),
        recurrenceId: new Date('2025-11-04T13:00:00Z').toISOString()
      }
    ];

    const startWindow = new Date('2025-11-01T00:00:00Z');
    const endWindow = new Date('2025-11-08T00:00:00Z');

    const processed = processRecurringEvents(events, startWindow, endWindow);

    // Nov 4 must contain ONLY the moved version — no 12:00Z ghost from the
    // UTC-expanded master.
    const nov4Events = processed.filter(e => e.start.toISOString().startsWith('2025-11-04'));
    expect(nov4Events.length).toBe(1);
    expect(nov4Events[0].summary).toBe('Weekly DST (Moved)');
    expect(nov4Events[0].start.toISOString()).toBe('2025-11-04T14:00:00.000Z');
    expect(processed.some(e => e.start.toISOString() === '2025-11-04T12:00:00.000Z')).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────
// #58 — zone-aware expansion boundary behaviors
// ─────────────────────────────────────────────────────────────

describe('Issue #58 — zone-aware expansion boundary behaviors', () => {
  // Saturday 2026-07-04 19:30 America/Chicago (CDT, UTC-5) = 2026-07-05T00:30Z
  const chicagoEvent: CalendarEvent = {
    uid: 'chicago-sat',
    summary: 'Chicago Saturday',
    start: new Date('2026-07-05T00:30:00Z'),
    end: new Date('2026-07-05T01:30:00Z'),
    isRecurring: true,
    eventTimezone: 'America/Chicago'
  };

  it('(a) should leave a date-only UNTIL untouched and stop at wall-clock midnight of that date', () => {
    // rewriteUntilForZone only rewrites UNTIL=YYYYMMDDTHHMMSSZ; a date-only
    // UNTIL=20260712 stays as-is and rrule reads it as wall-clock
    // 2026-07-12T00:00:00, so the Sat Jul 11 19:30 wall occurrence is kept
    // and Sat Jul 18 is dropped.
    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SA;UNTIL=20260712',
      [],
      new Date('2026-07-03T00:00:00Z'),
      new Date('2026-07-24T00:00:00Z'),
      'America/Chicago'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-05T00:30:00.000Z',
      '2026-07-12T00:30:00.000Z'
    ]);
  });

  it('(b) should resolve a spring-forward-gap occurrence to the exact luxon-shifted UTC instant', () => {
    // Sunday 02:30 Europe/Prague. On 2026-03-29 clocks jump 02:00→03:00, so
    // 02:30 does not exist; luxon resolves it forward to 03:30 CEST = 01:30Z.
    const gapEvent: CalendarEvent = {
      uid: 'prague-gap',
      summary: 'Gap Time Event',
      start: new Date('2026-03-22T01:30:00Z'), // Sun 02:30 CET (UTC+1)
      end: new Date('2026-03-22T02:30:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const expanded = expandRecurringEvent(
      gapEvent,
      'FREQ=WEEKLY;BYDAY=SU',
      [],
      new Date('2026-03-20T00:00:00Z'),
      new Date('2026-04-08T00:00:00Z'),
      'Europe/Prague'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-03-22T01:30:00.000Z', // 02:30 CET
      '2026-03-29T01:30:00.000Z', // nonexistent 02:30 → 03:30 CEST
      '2026-04-05T00:30:00.000Z'  // 02:30 CEST
    ]);
  });

  it('(c) should treat eventTimezone "floating" identically to the no-zone UTC path', () => {
    const base: CalendarEvent = {
      uid: 'floating-weekly',
      summary: 'Floating Weekly',
      start: new Date('2026-01-05T10:00:00Z'), // A Monday
      end: new Date('2026-01-05T11:00:00Z'),
      isRecurring: true
    };
    const floating: CalendarEvent = { ...base, eventTimezone: 'floating' };

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const floatingResult = expandRecurringEvent(
      floating, 'FREQ=WEEKLY;BYDAY=MO;COUNT=3', [], startWindow, endWindow, 'floating'
    );
    const noZoneResult = expandRecurringEvent(
      base, 'FREQ=WEEKLY;BYDAY=MO;COUNT=3', [], startWindow, endWindow
    );

    const expected = [
      '2026-01-05T10:00:00.000Z',
      '2026-01-12T10:00:00.000Z',
      '2026-01-19T10:00:00.000Z'
    ];
    expect(floatingResult.map(e => e.start.toISOString())).toEqual(expected);
    expect(noZoneResult.map(e => e.start.toISOString())).toEqual(expected);
  });

  it('(d) should honor the inclusive UNTIL boundary when UNTIL falls in the opposite DST regime from DTSTART', () => {
    // DTSTART: Wednesday 2026-01-07 10:00 Europe/Prague (CET, UTC+1) = 09:00Z.
    // UNTIL: 2026-07-15T08:00:00Z = Wednesday 10:00 CEST (UTC+2) — the exact
    // instant of a July occurrence. RFC 5545: UNTIL is inclusive, so Jul 15
    // must be the LAST occurrence; Jul 22 must not appear.
    const pragueWinter: CalendarEvent = {
      uid: 'cross-dst-until',
      summary: 'Cross-DST UNTIL',
      start: new Date('2026-01-07T09:00:00Z'),
      end: new Date('2026-01-07T10:00:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const expanded = expandRecurringEvent(
      pragueWinter,
      'FREQ=WEEKLY;BYDAY=WE;UNTIL=20260715T080000Z',
      [],
      new Date('2026-06-30T00:00:00Z'),
      new Date('2026-08-01T00:00:00Z'),
      'Europe/Prague'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-01T08:00:00.000Z',
      '2026-07-08T08:00:00.000Z',
      '2026-07-15T08:00:00.000Z' // inclusive boundary kept; Jul 22 dropped
    ]);
  });
});

// ─────────────────────────────────────────────────────────────
// #59 item 1 — rewriteUntilForZone robustness
// ─────────────────────────────────────────────────────────────

describe('#59.1 — UNTIL rewrite robustness', () => {
  it('should keep the original token for a malformed UNTIL stamp instead of emitting "Invalid DateTime"', () => {
    // 2026-02-31T99:30:00 is not a real datetime. The rewrite must leave the
    // token untouched (documented behavior: the series expands as if the
    // token had not been rewritten — rrule itself rolls the components over,
    // landing the UNTIL far past this January window), rather than producing
    // "UNTIL=Invalid DateTime" which aborts the whole expansion.
    const pragueMonday: CalendarEvent = {
      uid: 'malformed-until',
      summary: 'Malformed UNTIL',
      start: new Date('2026-01-05T09:00:00Z'), // Mon 10:00 CET
      end: new Date('2026-01-05T10:00:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const expanded = expandRecurringEvent(
      pragueMonday,
      'FREQ=WEEKLY;BYDAY=MO;UNTIL=20260231T993000Z',
      [],
      new Date('2026-01-01T00:00:00Z'),
      new Date('2026-02-01T00:00:00Z'),
      'Europe/Prague'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-01-05T09:00:00.000Z',
      '2026-01-12T09:00:00.000Z',
      '2026-01-19T09:00:00.000Z',
      '2026-01-26T09:00:00.000Z'
    ]);
  });

  it('should rewrite a lowercase until= token (uppercase-normalized) so the boundary occurrence is kept', () => {
    // Tuesday 15:00 Europe/Kiev summer (UTC+3) = 12:00Z. The lowercase token
    // until=20250708t120000z must be rewritten to UNTIL=20250708T150000
    // (wall-clock, uppercase). Without the rewrite rrule rejects the
    // lowercase stamp ("Invalid UNTIL value") and the expansion returns [].
    const kievEvent: CalendarEvent = {
      uid: 'lowercase-until',
      summary: 'Lowercase UNTIL',
      start: new Date('2025-07-01T12:00:00Z'),
      end: new Date('2025-07-01T13:00:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Kiev'
    };

    const expanded = expandRecurringEvent(
      kievEvent,
      'FREQ=WEEKLY;BYDAY=TU;until=20250708t120000z',
      [],
      new Date('2025-07-01T00:00:00Z'),
      new Date('2025-07-31T00:00:00Z'),
      'Europe/Kiev'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2025-07-01T12:00:00.000Z',
      '2025-07-08T12:00:00.000Z' // inclusive UNTIL boundary
    ]);
  });
});

// ─────────────────────────────────────────────────────────────
// #59 item 2 — invalid-zone warn dedup
// ─────────────────────────────────────────────────────────────

describe('#59.2 — invalid-zone warning dedup', () => {
  it('should warn only once per unique invalid zone across repeated expansions', () => {
    // Zone value unique to this test: the dedup cache is module-level and
    // survives beforeEach mock clearing.
    const badZoneEvent: CalendarEvent = {
      uid: 'dedup-warn',
      summary: 'Dedup Warn Event',
      start: new Date('2026-01-05T10:00:00Z'),
      end: new Date('2026-01-05T11:00:00Z'),
      isRecurring: true,
      eventTimezone: 'Sentinel/Bad_Zone'
    };

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const first = expandRecurringEvent(
      badZoneEvent, 'FREQ=WEEKLY;BYDAY=MO;COUNT=3', [], startWindow, endWindow, 'Sentinel/Bad_Zone'
    );
    const second = expandRecurringEvent(
      badZoneEvent, 'FREQ=WEEKLY;BYDAY=MO;COUNT=3', [], startWindow, endWindow, 'Sentinel/Bad_Zone'
    );

    // Both expansions still succeed via the UTC fallback
    expect(first.length).toBe(3);
    expect(second.length).toBe(3);

    const dedupWarns = vi.mocked(logger.warn).mock.calls.filter(call =>
      String(call[0]).includes('Invalid event timezone "Sentinel/Bad_Zone"')
    );
    expect(dedupWarns.length).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────
// #59 item 3 — exact real-UTC window filtering across DST
// ─────────────────────────────────────────────────────────────

describe('#59.3 — real-UTC window filtering near a DST transition', () => {
  // Daily 02:45 Europe/Prague, starting in CEST (UTC+2):
  // 2026-10-20 02:45 CEST = 00:45Z. Clocks fall back 2026-10-25 03:00→02:00
  // (01:00Z), so on Oct 25 the wall time 02:45 is ambiguous; luxon resolves
  // it to the EARLIER offset (CEST) = 2026-10-25T00:45:00Z.
  const foldEvent: CalendarEvent = {
    uid: 'prague-fold-window',
    summary: 'Fold Window Event',
    start: new Date('2026-10-20T00:45:00Z'),
    end: new Date('2026-10-20T01:15:00Z'),
    isRecurring: true,
    eventTimezone: 'Europe/Prague'
  };

  it('should include an occurrence inside the real-UTC window that fake-UTC comparison would drop', () => {
    // endWindow 2026-10-25T01:30:00Z is AFTER the fall-back (CET, UTC+1), so
    // its wall clock is 02:30. The Oct 25 occurrence has wall time 02:45
    // (> 02:30 in fake-UTC space) but its real instant is 00:45Z — an hour
    // INSIDE the window. Wall-clock between() alone drops it incorrectly.
    const expanded = expandRecurringEvent(
      foldEvent,
      'FREQ=DAILY',
      [],
      new Date('2026-10-23T00:00:00Z'),
      new Date('2026-10-25T01:30:00Z'),
      'Europe/Prague'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-10-23T00:45:00.000Z',
      '2026-10-24T00:45:00.000Z',
      '2026-10-25T00:45:00.000Z'
    ]);
  });

  it('should still exclude occurrences outside the real-UTC window (padding must not overshoot)', () => {
    const expanded = expandRecurringEvent(
      foldEvent,
      'FREQ=DAILY',
      [],
      new Date('2026-10-23T00:00:00Z'),
      new Date('2026-10-25T00:30:00Z'), // ends before the 00:45Z occurrence
      'Europe/Prague'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-10-23T00:45:00.000Z',
      '2026-10-24T00:45:00.000Z'
    ]);
  });
});

describe('#59.3 — occurrence cap interacts correctly with the padded window', () => {
  it('should return MAX_OCCURRENCES in-window occurrences for a zoned minutely event with a past DTSTART', () => {
    // The ±1-day padding places up to 1440 minutely occurrences BEFORE the
    // real window start. If the 500-occurrence cap (#26) is applied to the
    // padded between() result before the real-UTC window filter, the cap
    // truncates to 500 entries that all sit inside the leading pad and the
    // filter then yields ZERO — the event silently vanishes. The cap must
    // count occurrences that are actually inside the caller's window.
    const minutelyEvent: CalendarEvent = {
      uid: 'prague-minutely-past-dtstart',
      summary: 'Minutely Past DTSTART',
      start: new Date('2026-06-01T08:00:00Z'), // 10:00 CEST, weeks before window
      end: new Date('2026-06-01T08:05:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const startWindow = new Date('2026-07-06T00:00:00Z');
    const endWindow = new Date('2026-07-07T00:00:00Z');

    const expanded = expandRecurringEvent(
      minutelyEvent,
      'FREQ=MINUTELY',
      [],
      startWindow,
      endWindow,
      'Europe/Prague'
    );

    // Exactly the cap, filled from the REAL window (not the leading pad)
    expect(expanded.length).toBe(500);
    expect(expanded[0].start.toISOString()).toBe('2026-07-06T00:00:00.000Z');
    expect(expanded[499].start.toISOString()).toBe('2026-07-06T08:19:00.000Z');

    // All occurrences inside the real-UTC window and in ascending order
    for (let i = 0; i < expanded.length; i++) {
      expect(expanded[i].start.getTime()).toBeGreaterThanOrEqual(startWindow.getTime());
      expect(expanded[i].start.getTime()).toBeLessThanOrEqual(endWindow.getTime());
      if (i > 0) {
        expect(expanded[i].start.getTime()).toBeGreaterThan(expanded[i - 1].start.getTime());
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────
// #59 item 4 — EXDATE matching in the spring-forward gap
// ─────────────────────────────────────────────────────────────

describe('#59.4 — EXDATE whose wall time falls in the spring-forward gap', () => {
  it('should cancel the gap occurrence via the real-UTC exdate instant', () => {
    // Sunday 02:30 Europe/Prague. The 2026-03-29 occurrence's nominal wall
    // time 02:30 does not exist (clocks jump 02:00→03:00); the parser resolves
    // the EXDATE to the real instant 2026-03-29T01:30:00Z (03:30 CEST). Its
    // wall-clock conversion (03:30) can never match the rrule-generated
    // nominal wall time (02:30), so the exclusion must also be applied against
    // the converted occurrence's real-UTC timestamp.
    const gapEvent: CalendarEvent = {
      uid: 'prague-gap-exdate',
      summary: 'Gap EXDATE Event',
      start: new Date('2026-03-22T01:30:00Z'), // Sun 02:30 CET
      end: new Date('2026-03-22T02:30:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const expanded = expandRecurringEvent(
      gapEvent,
      'FREQ=WEEKLY;BYDAY=SU',
      [new Date('2026-03-29T01:30:00Z')], // parser-resolved gap EXDATE
      new Date('2026-03-20T00:00:00Z'),
      new Date('2026-04-08T00:00:00Z'),
      'Europe/Prague'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-03-22T01:30:00.000Z',
      '2026-04-05T00:30:00.000Z'
    ]);
  });
});

// ─────────────────────────────────────────────────────────────
// #59 item 5 — eventTimezone parameter defaults to event.eventTimezone
// ─────────────────────────────────────────────────────────────

describe('#59.5 — eventTimezone parameter defaulting', () => {
  it('should use event.eventTimezone for zone-aware expansion when the parameter is omitted', () => {
    // Same scenario as the #39 diagnostic: Saturday 19:30 America/Chicago is
    // Sunday 00:30 UTC. Zone-aware expansion finds the occurrence in the
    // window; plain UTC expansion (BYDAY=SA against the UTC weekday) does not.
    const chicagoEvent: CalendarEvent = {
      uid: 'default-zone',
      summary: 'Default Zone Event',
      start: new Date('2026-07-05T00:30:00Z'),
      end: new Date('2026-07-05T01:30:00Z'),
      isRecurring: true,
      eventTimezone: 'America/Chicago'
    };

    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SA;WKST=SU',
      [],
      new Date('2026-07-03T11:50:10Z'),
      new Date('2026-07-06T11:50:10Z')
      // no eventTimezone argument — must fall back to event.eventTimezone
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-05T00:30:00.000Z'
    ]);
  });
});

// ─────────────────────────────────────────────────────────────
// Code scanning alert #2 — UID fallback randomness
// ─────────────────────────────────────────────────────────────

describe('Code scanning #2 — generated UID fallback', () => {
  it('should generate crypto-random UUIDs for events without a UID, distinct per event', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Test//Sentinel Hardening//EN',
      'BEGIN:VEVENT',
      'DTSTART:20260115T100000Z',
      'DTEND:20260115T110000Z',
      'SUMMARY:No UID One',
      'END:VEVENT',
      'BEGIN:VEVENT',
      'DTSTART:20260116T100000Z',
      'DTEND:20260116T110000Z',
      'SUMMARY:No UID Two',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const parsed = parseICS(ics);
    expect(parsed.events.length).toBe(2);

    for (const event of parsed.events) {
      expect(event.uid).toMatch(/^generated-[0-9a-f-]{36}$/);
    }
    expect(parsed.events[0].uid).not.toBe(parsed.events[1].uid);
  });
});
