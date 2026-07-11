/**
 * Regression tests for issue #39 (weekly BYDAY events disappear when the
 * local start day differs from the UTC start day) and issue #30 (recurring
 * events display +1h after a DST switch).
 *
 * Root cause (shared): RRULE expansion was anchored to the UTC components of
 * DTSTART, so BYDAY was evaluated against the UTC weekday and weekly stepping
 * ignored DST. The fix expands recurring events as wall-clock time in the
 * event's IANA timezone (eventTimezone) and converts occurrences back to UTC.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { DateTime } from 'luxon';

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

// The logger mock is module-level and never reset by vitest between tests,
// so a toHaveBeenCalledWith oracle could be satisfied by an EARLIER test's
// call. Clear recorded calls before every test (#59 item 8).
beforeEach(() => {
  vi.mocked(logger.warn).mockClear();
});

// ─────────────────────────────────────────────────────────────
// Issue #39: BYDAY weekly event vanishes when UTC day ≠ local day
// ─────────────────────────────────────────────────────────────

describe('Issue #39 — weekly BYDAY expansion in the event timezone', () => {
  // Saturday 2026-07-04 19:30 America/Chicago (CDT, UTC-5) = Sunday 2026-07-05 00:30 UTC.
  // In UTC the DTSTART is a Sunday, so FREQ=WEEKLY;BYDAY=SA anchored to UTC
  // skips to the NEXT Saturday and the occurrence vanishes from a ±1.5-day window.
  const chicagoEvent: CalendarEvent = {
    uid: 'ffxiv-raid',
    summary: 'FFXIV',
    start: new Date('2026-07-05T00:30:00Z'),
    end: new Date('2026-07-05T01:30:00Z'),
    isRecurring: true,
    eventTimezone: 'America/Chicago'
  };

  it('should expand exactly one occurrence in the exact #39 diagnostic window', () => {
    const startWindow = new Date('2026-07-03T11:50:10Z');
    const endWindow = new Date('2026-07-06T11:50:10Z');

    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SA;WKST=SU',
      [],
      startWindow,
      endWindow,
      'America/Chicago'
    );

    expect(expanded.length).toBe(1);
    expect(expanded[0].start.toISOString()).toBe('2026-07-05T00:30:00.000Z');
    // Duration preserved (1 hour)
    expect(expanded[0].end.toISOString()).toBe('2026-07-05T01:30:00.000Z');
  });

  it('should produce Saturdays (in Chicago) 7 days apart over a 14-day window', () => {
    const startWindow = new Date('2026-07-03T00:00:00Z');
    const endWindow = new Date('2026-07-17T00:00:00Z');

    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SA;WKST=SU',
      [],
      startWindow,
      endWindow,
      'America/Chicago'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-05T00:30:00.000Z',
      '2026-07-12T00:30:00.000Z'
    ]);

    // 7 days apart, no DST in July so identical UTC time-of-day
    expect(expanded[1].start.getTime() - expanded[0].start.getTime()).toBe(7 * 24 * 60 * 60 * 1000);

    // Every occurrence is a Saturday in America/Chicago (luxon weekday 6 = Saturday)
    expanded.forEach(e => {
      const local = DateTime.fromJSDate(e.start, { zone: 'America/Chicago' });
      expect(local.weekday).toBe(6);
      expect(local.toFormat('HH:mm')).toBe('19:30');
    });
  });

  it('should rewrite a UTC UNTIL to the event timezone (inclusive boundary)', () => {
    const startWindow = new Date('2026-07-03T00:00:00Z');
    const endWindow = new Date('2026-07-24T00:00:00Z');

    // UNTIL is the UTC instant of the second occurrence (Sat Jul 11 19:30 CDT).
    // RFC 5545: UNTIL is inclusive, so Jul 5 and Jul 12 (UTC) occur; Jul 19 does not.
    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SA;UNTIL=20260712T003000Z',
      [],
      startWindow,
      endWindow,
      'America/Chicago'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-05T00:30:00.000Z',
      '2026-07-12T00:30:00.000Z'
    ]);
  });

  it('should exclude EXDATEs given as real-UTC instants', () => {
    const startWindow = new Date('2026-07-03T00:00:00Z');
    const endWindow = new Date('2026-07-17T00:00:00Z');

    const expanded = expandRecurringEvent(
      chicagoEvent,
      'FREQ=WEEKLY;BYDAY=SA',
      [new Date('2026-07-12T00:30:00Z')], // excludes the second occurrence
      startWindow,
      endWindow,
      'America/Chicago'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-07-05T00:30:00.000Z'
    ]);
  });

  it('should expand the Google fixture through the full parse pipeline', () => {
    const fixturePath = path.join(__dirname, '..', '__fixtures__', 'google-calendar', 'issue-39-evening-byday.ics');
    const icsContent = fs.readFileSync(fixturePath, 'utf8');
    const parsed = parseICS(icsContent);

    expect(parsed.provider).toBe('google');
    expect(parsed.events.length).toBe(1);
    expect(parsed.events[0].start.toISOString()).toBe('2026-07-05T00:30:00.000Z');
    expect(parsed.events[0].eventTimezone).toBe('America/Chicago');

    // The exact window from the #39 diagnostic logs
    const startWindow = new Date('2026-07-03T11:50:10Z');
    const endWindow = new Date('2026-07-06T11:50:10Z');

    const processed = processRecurringEvents(parsed.events, startWindow, endWindow);

    expect(processed.length).toBe(1);
    expect(processed[0].summary).toBe('FFXIV Raid Night');
    expect(processed[0].start.toISOString()).toBe('2026-07-05T00:30:00.000Z');
    expect(processed[0].end.toISOString()).toBe('2026-07-05T01:30:00.000Z');
  });
});

// ─────────────────────────────────────────────────────────────
// Issue #30: recurring events shift +1h after a DST switch
// ─────────────────────────────────────────────────────────────

describe('Issue #30 — DST-aware weekly expansion', () => {
  it('should keep 10:00 local time across the March 2026 DST switch (unit)', () => {
    // Wednesday 2026-03-25 10:00 Europe/Prague (CET, UTC+1) = 09:00 UTC.
    // Europe switches to summer time on Sunday 2026-03-29.
    const event: CalendarEvent = {
      uid: 'prague-weekly',
      summary: 'Weekly Sync',
      start: new Date('2026-03-25T09:00:00Z'),
      end: new Date('2026-03-25T10:00:00Z'),
      isRecurring: true,
      eventTimezone: 'Europe/Prague'
    };

    const startWindow = new Date('2026-03-22T00:00:00Z');
    const endWindow = new Date('2026-04-05T00:00:00Z');

    const expanded = expandRecurringEvent(
      event,
      'FREQ=WEEKLY;BYDAY=WE',
      [],
      startWindow,
      endWindow,
      'Europe/Prague'
    );

    // Before the switch: 10:00 CET = 09:00 UTC. After: 10:00 CEST = 08:00 UTC.
    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-03-25T09:00:00.000Z',
      '2026-04-01T08:00:00.000Z'
    ]);

    expanded.forEach(e => {
      const local = DateTime.fromJSDate(e.start, { zone: 'Europe/Prague' });
      expect(local.toFormat('HH:mm')).toBe('10:00');
      expect(local.weekday).toBe(3); // Wednesday
    });
  });

  it('should expand the Outlook fixture (Central Europe Standard Time) across the DST switch', () => {
    const fixturePath = path.join(__dirname, '..', '__fixtures__', 'outlook', 'issue-30-dst-weekly.ics');
    const icsContent = fs.readFileSync(fixturePath, 'utf8');
    const parsed = parseICS(icsContent);

    expect(parsed.provider).toBe('outlook');
    expect(parsed.events.length).toBe(1);
    // Windows TZID mapped to a concrete IANA zone during parsing:
    // windows-iana maps "Central Europe Standard Time" → "Europe/Budapest"
    // (first territory entry; same CET/CEST rules as the event's locale).
    expect(parsed.events[0].eventTimezone).toBe('Europe/Budapest');
    expect(parsed.events[0].start.toISOString()).toBe('2026-03-25T09:00:00.000Z');

    const startWindow = new Date('2026-03-22T00:00:00Z');
    const endWindow = new Date('2026-04-05T00:00:00Z');

    const processed = processRecurringEvents(parsed.events, startWindow, endWindow);

    expect(processed.map(e => e.start.toISOString())).toEqual([
      '2026-03-25T09:00:00.000Z',
      '2026-04-01T08:00:00.000Z'
    ]);
    processed.forEach(e => expect(e.summary).toBe('Weekly Planning'));
  });
});

// ─────────────────────────────────────────────────────────────
// No-regression guards: events without a usable zone keep the
// exact pre-fix UTC-component expansion behavior.
// ─────────────────────────────────────────────────────────────

describe('No-regression guards — UTC expansion path unchanged', () => {
  const utcEvent: CalendarEvent = {
    uid: 'utc-weekly',
    summary: 'UTC Weekly',
    start: new Date('2026-01-05T10:00:00Z'), // A Monday
    end: new Date('2026-01-05T11:00:00Z'),
    isRecurring: true
  };

  it('should expand a UTC event without eventTimezone exactly as before', () => {
    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const expanded = expandRecurringEvent(
      utcEvent,
      'FREQ=WEEKLY;BYDAY=MO;COUNT=3',
      [],
      startWindow,
      endWindow
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-01-05T10:00:00.000Z',
      '2026-01-12T10:00:00.000Z',
      '2026-01-19T10:00:00.000Z'
    ]);
  });

  it('should treat eventTimezone "UTC" the same as no timezone', () => {
    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const expanded = expandRecurringEvent(
      utcEvent,
      'FREQ=WEEKLY;BYDAY=MO;COUNT=3',
      [],
      startWindow,
      endWindow,
      'UTC'
    );

    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-01-05T10:00:00.000Z',
      '2026-01-12T10:00:00.000Z',
      '2026-01-19T10:00:00.000Z'
    ]);
  });

  it('should fall back to UTC expansion for an invalid timezone without crashing', () => {
    // Discriminating oracle: same event shape as the no-zone guard test above,
    // which yields NONZERO occurrences via the UTC fallback path. If the
    // invalid-zone guard (isValidIANATimezone) were removed, luxon would
    // format an "Invalid DateTime" DTSTART, rrulestr would throw, and the
    // catch path would return [] — failing the 3-occurrence assertion below.
    const event: CalendarEvent = {
      ...utcEvent,
      uid: 'invalid-zone',
      summary: 'Invalid Zone Event',
      eventTimezone: 'Invalid/Not_A_Zone'
    };

    const startWindow = new Date('2026-01-01T00:00:00Z');
    const endWindow = new Date('2026-01-31T23:59:59Z');

    const expanded = expandRecurringEvent(
      event,
      'FREQ=WEEKLY;BYDAY=MO;COUNT=3',
      [],
      startWindow,
      endWindow,
      'Invalid/Not_A_Zone'
    );

    // Exactly the same instants as the no-eventTimezone guard test
    expect(expanded.map(e => e.start.toISOString())).toEqual([
      '2026-01-05T10:00:00.000Z',
      '2026-01-12T10:00:00.000Z',
      '2026-01-19T10:00:00.000Z'
    ]);

    // The fallback is logged, not silent
    expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
      expect.stringContaining('Invalid event timezone "Invalid/Not_A_Zone"')
    );
  });

  it('pins pre-fix UTC behavior: BYDAY evaluated against the UTC weekday when no zone is set', () => {
    const event: CalendarEvent = {
      uid: 'no-zone-byday',
      summary: 'No Zone BYDAY',
      start: new Date('2026-07-05T00:30:00Z'), // Sunday in UTC
      end: new Date('2026-07-05T01:30:00Z'),
      isRecurring: true
    };

    const startWindow = new Date('2026-07-03T11:50:10Z');
    const endWindow = new Date('2026-07-06T11:50:10Z');

    const expanded = expandRecurringEvent(
      event,
      'FREQ=WEEKLY;BYDAY=SA',
      [],
      startWindow,
      endWindow
    );

    // Without a timezone there is no way to know the intended local day;
    // the UTC anchor makes the first Saturday Jul 11 — outside this window.
    expect(expanded.length).toBe(0);
  });
});
