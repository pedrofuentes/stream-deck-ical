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
 *  - #79/#82.2: invalid-TZID warn-dedup cache evicts a SINGLE oldest entry
 *    (FIFO) on overflow instead of full-clearing; cap boundary behavior.
 *  - #80: explicit eventTimezone argument overrides event.eventTimezone
 *    (mutation-sensitive precedence pin).
 *  - #81: MAX_RAW_OCCURRENCES is derived from WINDOW_PAD_MS — pad-occupancy
 *    invariant so pad widening cannot silently starve the in-window cap.
 *  - #82.1: suppressed-repeat count is reported when a zone is evicted.
 *  - #82.3: SECONDLY residual (raw pre-cap consumed by the pad) and the
 *    both-caps-warn-in-one-expansion branch are pinned.
 *  - #98.1: suppressed-repeat eviction line is logged at warn (Sentinel
 *    digest #98 item 1 — feeds the diagnostics Error Summary counter).
 *  - #98.2: dedup cache eviction is LRU (recency-refreshed), not plain
 *    insertion-order FIFO (Sentinel digest #98 item 2).
 *  - #98.4: #81's invariant comment softened — both sides of the inequality
 *    scale together since MAX_RAW_OCCURRENCES is derived from WINDOW_PAD_MS,
 *    so pad-widening alone is self-adjusting rather than something this
 *    assertion guards against (Sentinel digest #98 item 4, comment-only).
 *  - #113.2: raw pre-cap `>=` boundary pinned exactly (mutation-sensitive:
 *    a >= → > mutation admits one extra raw occurrence at the boundary and
 *    is caught) — Sentinel digest #113 item 2.
 *  - #113.3: the #79 test's now-dead info-level "suppressed" assertion
 *    (vacuous — no code path ever emitted it at info) flipped to assert on
 *    warn.mock.calls, consistent with the #98.1 warn-level spec — Sentinel
 *    digest #113 item 3.
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

// ─────────────────────────────────────────────────────────────
// #80 — explicit eventTimezone argument overrides event.eventTimezone
// ─────────────────────────────────────────────────────────────

describe('#80 — explicit eventTimezone argument wins over event.eventTimezone', () => {
  it('should expand in the explicit argument zone when it differs from the event zone (exact instants)', () => {
    // PURE PIN (mutation-sensitive): current behavior is correct, but no test
    // exercised the precedence — swapping the `eventTimezone ??
    // event.eventTimezone` operands left the suite green.
    //
    // 2026-07-05T00:30:00Z is Saturday 19:30 in America/Chicago (CDT, UTC-5)
    // but Sunday 02:30 in Europe/Prague (CEST, UTC+2). With BYDAY=SU:
    //  - Prague expansion (explicit argument): Sundays 02:30 CEST
    //    → Jul 5/12/19 at 00:30:00Z.
    //  - Chicago expansion (event zone, i.e. the swapped-operand mutation):
    //    Sundays 19:30 CDT → Jul 6/13/20 at 00:30:00Z — disjoint instants,
    //    so the mutation MUST fail this test.
    const chicagoEvent: CalendarEvent = {
      uid: 'precedence-override',
      summary: 'Precedence Override Event',
      start: new Date('2026-07-05T00:30:00Z'),
      end: new Date('2026-07-05T01:30:00Z'),
      isRecurring: true,
      eventTimezone: 'America/Chicago'
    };

    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SU;COUNT=3',
      [],
      new Date('2026-07-01T00:00:00Z'),
      new Date('2026-07-25T00:00:00Z'),
      'Europe/Prague' // explicit override — must win over America/Chicago
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-05T00:30:00.000Z',
      '2026-07-12T00:30:00.000Z',
      '2026-07-19T00:30:00.000Z'
    ]);
  });
});

// ─────────────────────────────────────────────────────────────
// #79 / #82.1 / #82.2 — invalid-zone warn cache: FIFO eviction,
// cap boundary, suppressed-repeat count
// ─────────────────────────────────────────────────────────────

/** Cap of the module-level warn-dedup cache (MAX_WARNED_INVALID_ZONES). */
const WARN_CACHE_CAP = 100;

/**
 * The warn-dedup cache is module-level state. Each test below re-imports a
 * FRESH expander instance (vi.resetModules re-runs the vi.mock logger factory
 * too), so tests are isolated from each other and from the statically
 * imported instance used by the rest of this file.
 */
async function freshExpander() {
  vi.resetModules();
  const { expandRecurringEvent: expand } = await import('../src/services/recurrence-expander');
  const { logger: freshLogger } = await import('../src/utils/logger');
  return {
    expand,
    warn: vi.mocked(freshLogger.warn),
    info: vi.mocked(freshLogger.info)
  };
}

function expandWithBadZone(expand: typeof expandRecurringEvent, zone: string) {
  const event: CalendarEvent = {
    uid: `bad-zone-${zone}`,
    summary: `Bad Zone ${zone}`,
    start: new Date('2026-01-05T10:00:00Z'),
    end: new Date('2026-01-05T11:00:00Z'),
    isRecurring: true,
    eventTimezone: zone
  };
  return expand(
    event,
    'FREQ=WEEKLY;BYDAY=MO;COUNT=1',
    [],
    new Date('2026-01-01T00:00:00Z'),
    new Date('2026-01-31T23:59:59Z'),
    zone
  );
}

/** Invalid-timezone warn calls, optionally narrowed to one zone value. */
function invalidZoneWarns(warn: ReturnType<typeof vi.fn>, zone?: string) {
  return warn.mock.calls.filter(call => {
    const message = String(call[0]);
    return (
      message.includes('Invalid event timezone') &&
      (zone === undefined || message.includes(`"${zone}"`))
    );
  });
}

describe('#82.2 — warn-dedup cache behavior exactly at the cap', () => {
  it('should keep deduping every cached zone while the cache is exactly at the cap (no premature eviction)', async () => {
    const { expand, warn } = await freshExpander();

    // Fill to EXACTLY the cap: each distinct zone warns once.
    for (let i = 1; i <= WARN_CACHE_CAP; i++) {
      expandWithBadZone(expand, `Sentinel/AtCap_${i}`);
    }
    expect(invalidZoneWarns(warn).length).toBe(WARN_CACHE_CAP);

    // Re-seeing every zone at the cap must stay silent — reaching the cap
    // alone (without a NEW zone overflowing it) must not drop anything.
    warn.mockClear();
    for (let i = 1; i <= WARN_CACHE_CAP; i++) {
      expandWithBadZone(expand, `Sentinel/AtCap_${i}`);
    }
    expect(invalidZoneWarns(warn).length).toBe(0);
  });
});

describe('#79 — FIFO single-oldest eviction on cache overflow (cap+1)', () => {
  it('should evict only the oldest zone, keep zones 2..cap deduped, and re-warn zone 1 only after eviction', async () => {
    const { expand, warn } = await freshExpander();

    for (let i = 1; i <= WARN_CACHE_CAP; i++) {
      expandWithBadZone(expand, `Sentinel/Fifo_${i}`);
    }
    warn.mockClear();

    // Zone #cap+1 is new → warns once and evicts ONLY zone #1 (the oldest).
    expandWithBadZone(expand, `Sentinel/Fifo_${WARN_CACHE_CAP + 1}`);
    expect(invalidZoneWarns(warn, `Sentinel/Fifo_${WARN_CACHE_CAP + 1}`).length).toBe(1);
    expect(invalidZoneWarns(warn).length).toBe(1);

    // Zone #1 never had suppressed repeats → no suppressed-count eviction log
    // either. That eviction line is emitted at WARN (#98.1), not info, so
    // asserting against info.mock.calls (as this test previously did) was
    // vacuous — no code path in this module ever emits 'suppressed' at info,
    // meaning the assertion could never fail regardless of behavior
    // (Sentinel digest #113 item 3). Asserting against warn.mock.calls is the
    // reachable, discriminating check: it would catch a regression where the
    // eviction path logged a suppressed-count line even when suppressed
    // === 0.
    expect(warn.mock.calls.filter(call => String(call[0]).includes('suppressed')).length).toBe(0);

    // Zones #2..#cap must STILL be deduped — the old full clear() re-warned
    // all of them here, defeating the #59.2 log-churn reduction.
    warn.mockClear();
    for (let i = 2; i <= WARN_CACHE_CAP; i++) {
      expandWithBadZone(expand, `Sentinel/Fifo_${i}`);
    }
    expect(invalidZoneWarns(warn).length).toBe(0);

    // Zone #1 WAS evicted → seeing it again warns exactly once more.
    expandWithBadZone(expand, 'Sentinel/Fifo_1');
    expect(invalidZoneWarns(warn, 'Sentinel/Fifo_1').length).toBe(1);
  });
});

describe('#82.1 — suppressed-repeat count reported at eviction', () => {
  it('should log how many warnings were suppressed for a zone when it is evicted from the cache', async () => {
    const { expand, warn } = await freshExpander();

    // First sighting warns; the next two are suppressed (count = 2).
    expandWithBadZone(expand, 'Sentinel/Counted');
    expandWithBadZone(expand, 'Sentinel/Counted');
    expandWithBadZone(expand, 'Sentinel/Counted');
    expect(invalidZoneWarns(warn, 'Sentinel/Counted').length).toBe(1);

    // Fill the rest of the cache, then overflow → evicts Sentinel/Counted.
    for (let i = 1; i <= WARN_CACHE_CAP - 1; i++) {
      expandWithBadZone(expand, `Sentinel/CountFill_${i}`);
    }
    expandWithBadZone(expand, 'Sentinel/CountOverflow');

    // #98.1: the suppressed-repeat eviction line is emitted at WARN (not
    // info), so it feeds the diagnostics Error Summary's totalWarnings
    // counter instead of being invisible to it (Sentinel digest #98 item 1).
    const suppressedCountLogs = warn.mock.calls.filter(call =>
      String(call[0]).includes('"Sentinel/Counted"') &&
      String(call[0]).includes('2 repeat warning(s) suppressed')
    );
    expect(suppressedCountLogs.length).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────
// #98.2 — LRU dedup cache: recency refresh on repeat hits
// ─────────────────────────────────────────────────────────────

describe('#98.2 — LRU dedup cache: a repeatedly-hit zone is not the eviction victim', () => {
  it('should evict a genuinely stale zone instead of a zone seen first but hit repeatedly since', async () => {
    const { expand, warn } = await freshExpander();

    // Zone A is the very first zone ever inserted.
    expandWithBadZone(expand, 'Sentinel/LRU_A');

    // Fill the rest of the cache with distinct zones so the cache sits
    // exactly at the cap: insertion order is A, Fill_2, Fill_3, ..., Fill_cap.
    for (let i = 2; i <= WARN_CACHE_CAP; i++) {
      expandWithBadZone(expand, `Sentinel/LRU_Fill_${i}`);
    }

    // Re-hit A repeatedly (a "hot" zone). Under plain FIFO (insertion-order)
    // eviction, repeat hits never move A's position, so A remains the oldest
    // entry. Under LRU, a repeat hit refreshes A's recency, moving it to the
    // newest end — Fill_2 (untouched since insertion) becomes the oldest.
    expandWithBadZone(expand, 'Sentinel/LRU_A');
    expandWithBadZone(expand, 'Sentinel/LRU_A');

    // Overflow the cache with one new zone — exactly one entry is evicted.
    expandWithBadZone(expand, 'Sentinel/LRU_Overflow');

    // A must still be cached (LRU protected it via recency refresh): seeing
    // it again must NOT re-warn. Under FIFO this would fail (A was evicted).
    warn.mockClear();
    expandWithBadZone(expand, 'Sentinel/LRU_A');
    expect(invalidZoneWarns(warn, 'Sentinel/LRU_A').length).toBe(0);

    // Fill_2 — the genuinely stale zone, never touched since its initial
    // insertion — must have been the eviction victim: seeing it again fires
    // a fresh warn. Under FIFO this would fail (Fill_2 was never evicted).
    warn.mockClear();
    expandWithBadZone(expand, 'Sentinel/LRU_Fill_2');
    expect(invalidZoneWarns(warn, 'Sentinel/LRU_Fill_2').length).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────
// #81 — MAX_RAW_OCCURRENCES derived from WINDOW_PAD_MS
// ─────────────────────────────────────────────────────────────

describe('#81 — raw pre-cap is derived from the window pad (starvation invariant)', () => {
  it('should reserve worst-case minutely pad occupancy PLUS the full in-window cap', async () => {
    const constants = await import('../src/services/recurrence-expander');
    const { MAX_OCCURRENCES, WINDOW_PAD_MS, MAX_RAW_OCCURRENCES } = constants;

    expect(typeof MAX_OCCURRENCES).toBe('number');
    expect(typeof WINDOW_PAD_MS).toBe('number');
    expect(typeof MAX_RAW_OCCURRENCES).toBe('number');

    // Module-load invariant (#81): a minutely rule can occupy at most
    // 2 * (WINDOW_PAD_MS / 60_000) slots with pad-only occurrences, so the
    // raw pre-cap must leave at least MAX_OCCURRENCES slots for the real
    // window. MAX_RAW_OCCURRENCES is a formula OF WINDOW_PAD_MS (#81), so
    // both sides of this inequality scale together and merely widening
    // WINDOW_PAD_MS is self-adjusting — it keeps this assertion green rather
    // than tripping it (#98.4). What this assertion actually guards,
    // non-vacuously, is the derivation formula itself: a wrong multiplier or
    // a negative RAW_OCCURRENCES_MARGIN would trip it even though every
    // value the formula is CURRENTLY permitted to take satisfies the real
    // starvation requirement.
    const worstCaseMinutelyPadOccupancy = Math.ceil(2 * (WINDOW_PAD_MS / 60_000));
    expect(MAX_RAW_OCCURRENCES).toBeGreaterThanOrEqual(
      worstCaseMinutelyPadOccupancy + MAX_OCCURRENCES
    );
  });
});

// ─────────────────────────────────────────────────────────────
// #82.3 — SECONDLY residual + pre-cap warn branch
// ─────────────────────────────────────────────────────────────

describe('#82.3 — SECONDLY residual and the raw pre-cap warn branch', () => {
  it('should pre-cap a zoned FREQ=SECONDLY;INTERVAL=1 rule with a past DTSTART and (pinned) yield 0 in-window occurrences', async () => {
    const { MAX_RAW_OCCURRENCES } = await import('../src/services/recurrence-expander');

    // DTSTART 2026-07-05T00:00:00Z = 02:00 CEST — exactly one day before the
    // window, i.e. at the leading edge of the ±1-day pad.
    const secondlyEvent: CalendarEvent = {
      uid: 'secondly-residual',
      summary: 'Secondly Residual',
      start: new Date('2026-07-05T00:00:00Z'),
      end: new Date('2026-07-05T00:01:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const expanded = expandRecurringEvent(
      secondlyEvent,
      'FREQ=SECONDLY;INTERVAL=1',
      [],
      new Date('2026-07-06T00:00:00Z'),
      new Date('2026-07-06T01:00:00Z'),
      'Europe/Prague'
    );

    // Pinned residual behavior: the raw pre-cap (~73 minutes of 1-second
    // occurrences) is consumed entirely by the leading pad day, so ZERO
    // occurrences survive the real-UTC window filter. This is the documented
    // strict narrowing of the original starvation defect — pathological
    // SECONDLY-scale rules only — traded for the #26 CPU bound.
    expect(expanded).toEqual([]);

    // The raw pre-cap warn fires, quoting the DERIVED cap value…
    const preCapWarns = vi.mocked(logger.warn).mock.calls.filter(call =>
      String(call[0]).includes(`pre-capping at ${MAX_RAW_OCCURRENCES}`)
    );
    expect(preCapWarns.length).toBe(1);

    // …and the tight in-window cap warn must NOT fire (0 in-window ≤ cap).
    const inWindowCapWarns = vi.mocked(logger.warn).mock.calls.filter(call =>
      String(call[0]).includes('— capping at')
    );
    expect(inWindowCapWarns.length).toBe(0);
  });

  it('should fire BOTH cap warnings with distinct messages in one expansion and still fill the in-window cap', async () => {
    const { MAX_OCCURRENCES, MAX_RAW_OCCURRENCES } = await import('../src/services/recurrence-expander');

    // FREQ=SECONDLY;INTERVAL=30 = 2880/day. Over the 1-day window + 2-day pad
    // the raw padded count (~8641) exceeds the raw pre-cap → pre-cap warn.
    // The truncated raw list still reaches well past the window start, leaving
    // > MAX_OCCURRENCES in-window entries → the tight cap warns too.
    const denseEvent: CalendarEvent = {
      uid: 'both-caps',
      summary: 'Both Caps Event',
      start: new Date('2026-07-04T22:00:00Z'), // 2026-07-05 00:00:00 CEST
      end: new Date('2026-07-04T22:00:30Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const startWindow = new Date('2026-07-06T00:00:00Z');
    const endWindow = new Date('2026-07-07T00:00:00Z');

    const expanded = expandRecurringEvent(
      denseEvent,
      'FREQ=SECONDLY;INTERVAL=30',
      [],
      startWindow,
      endWindow,
      'Europe/Prague'
    );

    const warnMessages = vi.mocked(logger.warn).mock.calls.map(call => String(call[0]));
    const preCapWarns = warnMessages.filter(m => m.includes(`raw occurrences — pre-capping at ${MAX_RAW_OCCURRENCES}`));
    const inWindowCapWarns = warnMessages.filter(m => m.includes(`— capping at ${MAX_OCCURRENCES}`));
    expect(preCapWarns.length).toBe(1);
    expect(inWindowCapWarns.length).toBe(1);
    // Distinct messages: the pre-cap text must not satisfy the tight-cap
    // matcher and vice versa.
    expect(preCapWarns[0]).not.toBe(inWindowCapWarns[0]);

    // The in-window cap still FILLS from the real window (no starvation):
    // first kept occurrence is exactly the window start.
    expect(expanded.length).toBe(500);
    expect(expanded[0].start.toISOString()).toBe('2026-07-06T00:00:00.000Z');
    expect(expanded[499].start.toISOString()).toBe('2026-07-06T04:09:30.000Z');
    for (const occurrence of expanded) {
      expect(occurrence.start.getTime()).toBeGreaterThanOrEqual(startWindow.getTime());
      expect(occurrence.start.getTime()).toBeLessThanOrEqual(endWindow.getTime());
    }
  });
});

// ─────────────────────────────────────────────────────────────
// #113.2 — raw pre-cap exact boundary (mutation-sensitive pin)
// ─────────────────────────────────────────────────────────────

describe('#113.2 — raw pre-cap fires at the exact boundary (>= vs > pin)', () => {
  it('should reject exactly the (MAX_RAW_OCCURRENCES + 1)-th raw occurrence, not admit it', async () => {
    const { MAX_RAW_OCCURRENCES } = await import('../src/services/recurrence-expander');

    // The pre-cap guard is `if (len >= MAX_RAW_OCCURRENCES) { reject; stop }`,
    // where `len` is the number of occurrences already accepted (0-based) —
    // see the derivation comment above rruleSet.between() in
    // recurrence-expander.ts (verified directly against rrule 2.8.1's
    // CallbackIterResult.add(), which calls `iterator(date,
    // this._result.length)` BEFORE pushing).
    //
    // This test places a 1-second-cadence SECONDLY rule so the raw
    // occurrence that WOULD be the (MAX_RAW_OCCURRENCES + 1)-th acceptance
    // (0-based index MAX_RAW_OCCURRENCES) lands EXACTLY at startWindow —
    // i.e. it would survive the real-UTC window filter IF it were ever
    // generated. Every earlier occurrence (0-based index < MAX_RAW_OCCURRENCES)
    // lands strictly before startWindow, so it gets discarded by the window
    // filter regardless of whether the pre-cap admits it.
    //
    // Correct `>=` behavior: at 0-based index MAX_RAW_OCCURRENCES (the
    // boundary occurrence, exactly at startWindow), len === MAX_RAW_OCCURRENCES
    // when the callback runs → `len >= MAX_RAW_OCCURRENCES` is true →
    // rejected, generation stops. That occurrence — the only one that could
    // have survived the window filter — is never generated, so
    // expanded.length must be 0.
    //
    // A `>=` → `>` mutation makes that same check false (MAX_RAW_OCCURRENCES
    // > MAX_RAW_OCCURRENCES is false), so the boundary occurrence IS
    // generated, DOES survive the real-UTC window filter (it lands exactly
    // at startWindow, inclusive), and expanded.length becomes 1 instead —
    // the mutation flips this assertion. This pins the exact `>=` boundary
    // that #82.3's SECONDLY-residual test leaves unpinned: there, the raw
    // cap is consumed entirely ~73 minutes into a 1-day leading pad, nowhere
    // near the real window boundary, so a >= → > mutation there would still
    // leave expanded.length at 0 (Sentinel digest #113 item 2).
    const startWindow = new Date('2026-07-06T00:00:00Z');
    const endWindow = new Date('2026-07-06T00:01:00Z');

    // DTSTART is MAX_RAW_OCCURRENCES seconds before startWindow, so the
    // 0-based k-th generated occurrence lands at (startWindow - (cap - k))
    // seconds — occurrence k = cap lands exactly at startWindow. No DST
    // transition occurs anywhere in this window (deep CEST summer), so
    // wall-clock and real-UTC seconds advance 1:1.
    const dtstartReal = new Date(startWindow.getTime() - MAX_RAW_OCCURRENCES * 1000);

    const boundaryEvent: CalendarEvent = {
      uid: 'raw-cap-exact-boundary',
      summary: 'Raw Cap Exact Boundary',
      start: dtstartReal,
      end: new Date(dtstartReal.getTime() + 1000),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const expanded = expandRecurringEvent(
      boundaryEvent,
      'FREQ=SECONDLY;INTERVAL=1',
      [],
      startWindow,
      endWindow,
      'Europe/Prague'
    );

    expect(expanded).toEqual([]);

    // Generation WAS stopped early by the pre-cap (confirms the boundary
    // occurrence was actually reachable by this setup, not just absent for
    // an unrelated reason).
    const preCapWarns = vi.mocked(logger.warn).mock.calls.filter(call =>
      String(call[0]).includes(`pre-capping at ${MAX_RAW_OCCURRENCES}`)
    );
    expect(preCapWarns.length).toBe(1);
  });
});
