/**
 * Comprehensive tests for recurring event parsing and expansion
 * Tests the full pipeline from iCal parsing to recurrence expansion
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

import { parseICS, parseICalFeed } from '../src/services/ical-parser.js';
import { processRecurringEvents, expandRecurringEvent } from '../src/services/recurrence-expander.js';

describe('Recurring Events - Full Pipeline', () => {
  describe('RRULE Extraction from iCal', () => {
    it('should extract RRULE string from parsed event', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:daily-recurring
DTSTART:20260130T094800Z
DTEND:20260130T095300Z
RRULE:FREQ=DAILY
SUMMARY:Daily Standup
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].isRecurring).toBe(true);
      expect(result.events[0].rrule).toBe('FREQ=DAILY');
    });

    it('should extract complex RRULE with multiple parameters', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:weekly-mwf
DTSTART:20260202T100000Z
DTEND:20260202T110000Z
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10
SUMMARY:MWF Meeting
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      // ical.js normalizes RRULE parameter order
      expect(result.events[0].rrule).toContain('FREQ=WEEKLY');
      expect(result.events[0].rrule).toContain('BYDAY=MO,WE,FR');
      expect(result.events[0].rrule).toContain('COUNT=10');
    });

    it('should extract EXDATE exclusions', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:with-exceptions
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
RRULE:FREQ=DAILY;COUNT=5
EXDATE:20260203T100000Z
SUMMARY:Daily with Skip
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].rrule).toBe('FREQ=DAILY;COUNT=5');
      expect(result.events[0].exdate).toBeDefined();
      expect(result.events[0].exdate?.length).toBeGreaterThan(0);
    });
  });

  describe('Google Calendar Recurring Events', () => {
    it('should parse daily recurring event with timezone', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
X-WR-TIMEZONE:America/Los_Angeles
BEGIN:VTIMEZONE
TZID:America/Los_Angeles
BEGIN:STANDARD
TZOFFSETFROM:-0700
TZOFFSETTO:-0800
TZNAME:PST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
BEGIN:DAYLIGHT
TZOFFSETFROM:-0800
TZOFFSETTO:-0700
TZNAME:PDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
DTSTART;TZID=America/Los_Angeles:20260130T014800
DTEND;TZID=America/Los_Angeles:20260130T015300
RRULE:FREQ=DAILY
DTSTAMP:20260131T095133Z
UID:daily-google@google.com
SUMMARY:Daily Standup
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.provider).toBe('google');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].isRecurring).toBe(true);
      expect(result.events[0].rrule).toBe('FREQ=DAILY');
    });

    it('should expand daily recurring event to show today\'s instance', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260130T094800Z
DTEND:20260130T095300Z
RRULE:FREQ=DAILY
UID:daily-event@google.com
SUMMARY:Daily Standup
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      // Time window: Jan 30 to Feb 2
      const startWindow = new Date('2026-01-30T00:00:00Z');
      const endWindow = new Date('2026-02-02T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should have 4 occurrences: Jan 30, 31, Feb 1, 2
      expect(expanded.length).toBe(4);
      expect(expanded.every(e => e.summary === 'Daily Standup')).toBe(true);
      expect(expanded.every(e => e.isRecurring === true)).toBe(true);
    });

    it('should parse weekly recurring event (BYDAY=SA)', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260131T095400Z
DTEND:20260131T100000Z
RRULE:FREQ=WEEKLY;BYDAY=SA
UID:weekly-sat@google.com
SUMMARY:Weekly Review
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events[0].rrule).toBe('FREQ=WEEKLY;BYDAY=SA');
      
      // Expand over 3 weeks
      const startWindow = new Date('2026-01-31T00:00:00Z');
      const endWindow = new Date('2026-02-21T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should have Saturdays: Jan 31, Feb 7, Feb 14, Feb 21
      expect(expanded.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Outlook/Office 365 Recurring Events', () => {
    it('should parse Outlook event with quoted Windows timezone', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
VERSION:2.0
BEGIN:VTIMEZONE
TZID:"Eastern Standard Time"
BEGIN:STANDARD
DTSTART:16011104T020000
RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=11
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010311T020000
RRULE:FREQ=YEARLY;BYDAY=2SU;BYMONTH=3
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:outlook-weekly@microsoft.com
DTSTAMP:20260131T120000Z
DTSTART;TZID="Eastern Standard Time":20260203T140000
DTEND;TZID="Eastern Standard Time":20260203T150000
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10
SUMMARY:Team Standup
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.provider).toBe('outlook');
      expect(result.events).toHaveLength(1);
      expect(result.events[0].isRecurring).toBe(true);
      // ical.js normalizes RRULE parameter order
      expect(result.events[0].rrule).toContain('FREQ=WEEKLY');
      expect(result.events[0].rrule).toContain('BYDAY=MO,WE,FR');
      expect(result.events[0].rrule).toContain('COUNT=10');
    });

    it('should parse Outlook event with EXDATE exclusions', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
VERSION:2.0
BEGIN:VEVENT
UID:outlook-with-exdate@microsoft.com
DTSTAMP:20260131T120000Z
DTSTART:20260205T140000Z
DTEND:20260205T143000Z
RRULE:FREQ=DAILY;COUNT=10
EXDATE:20260207T140000Z
EXDATE:20260208T140000Z
SUMMARY:Morning Huddle
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events[0].rrule).toBe('FREQ=DAILY;COUNT=10');
      expect(result.events[0].exdate).toBeDefined();
      expect(result.events[0].exdate?.length).toBe(2);
      
      // Expand and verify exclusions are respected
      const startWindow = new Date('2026-02-05T00:00:00Z');
      const endWindow = new Date('2026-02-15T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should have 8 occurrences (10 - 2 excluded)
      expect(expanded.length).toBe(8);
    });

    it('should handle Outlook monthly recurring event', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
VERSION:2.0
BEGIN:VEVENT
UID:monthly-outlook@microsoft.com
DTSTART:20260115T100000Z
DTEND:20260115T110000Z
RRULE:FREQ=MONTHLY;BYMONTHDAY=15
SUMMARY:Monthly Review
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events[0].rrule).toBe('FREQ=MONTHLY;BYMONTHDAY=15');
      
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-04-30T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should have Jan 15, Feb 15, Mar 15, Apr 15
      expect(expanded.length).toBe(4);
    });
  });

  describe('Apple Calendar Recurring Events', () => {
    it('should parse Apple Calendar weekly event with UNTIL', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
VERSION:2.0
X-WR-CALNAME:Work Calendar
X-WR-TIMEZONE:America/Los_Angeles
BEGIN:VTIMEZONE
TZID:America/Los_Angeles
BEGIN:STANDARD
TZOFFSETFROM:-0700
TZOFFSETTO:-0800
TZNAME:PST
DTSTART:19701101T020000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
CREATED:20260101T000000Z
UID:apple-weekly@apple.com
DTSTART;TZID=America/Los_Angeles:20260203T110000
DTEND;TZID=America/Los_Angeles:20260203T113000
RRULE:FREQ=WEEKLY;BYDAY=TU;UNTIL=20260228T235959Z
SUMMARY:Weekly Review
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.provider).toBe('apple');
      expect(result.events[0].rrule).toBe('FREQ=WEEKLY;BYDAY=TU;UNTIL=20260228T235959Z');
    });

    it('should expand Apple calendar event with UNTIL date', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
VERSION:2.0
BEGIN:VEVENT
UID:apple-until@apple.com
DTSTART:20260203T110000Z
DTEND:20260203T113000Z
RRULE:FREQ=WEEKLY;BYDAY=TU;UNTIL=20260224T235959Z
SUMMARY:Limited Series
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-03-31T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should stop at Feb 24
      expect(expanded.length).toBeLessThanOrEqual(4);
      expanded.forEach(e => {
        expect(e.start.getTime()).toBeLessThanOrEqual(new Date('2026-02-24T23:59:59Z').getTime());
      });
    });

    it('should parse Apple calendar bi-weekly event', () => {
      const ics = `BEGIN:VCALENDAR
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
VERSION:2.0
BEGIN:VEVENT
UID:apple-biweekly@apple.com
DTSTART:20260203T150000Z
DTEND:20260203T160000Z
RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU
SUMMARY:Bi-weekly Sync
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events[0].rrule).toBe('FREQ=WEEKLY;INTERVAL=2;BYDAY=TU');
      
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-03-31T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should have Feb 3, Feb 17, Mar 3, Mar 17, Mar 31
      expect(expanded.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Edge Cases', () => {
    it('should handle event starting before time window with occurrences in window', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:before-window
DTSTART:20260101T100000Z
DTEND:20260101T110000Z
RRULE:FREQ=DAILY
SUMMARY:Daily from Jan 1
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      // Time window starts Jan 30
      const startWindow = new Date('2026-01-30T00:00:00Z');
      const endWindow = new Date('2026-02-02T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should include Jan 30, 31, Feb 1, 2
      expect(expanded.length).toBe(4);
    });

    it('should not include non-recurring events outside time window', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:outside-window
DTSTART:20260115T100000Z
DTEND:20260115T110000Z
SUMMARY:Past Event
END:VEVENT
BEGIN:VEVENT
UID:inside-window
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Current Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-01-30T00:00:00Z');
      const endWindow = new Date('2026-02-05T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should only include the event inside window
      expect(expanded.length).toBe(1);
      expect(expanded[0].summary).toBe('Current Event');
    });

    it('should handle mix of recurring and non-recurring events', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:single-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:One-time Event
END:VEVENT
BEGIN:VEVENT
UID:recurring-event
DTSTART:20260201T140000Z
DTEND:20260201T150000Z
RRULE:FREQ=DAILY;COUNT=3
SUMMARY:Daily Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-02-05T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // 1 single + 3 recurring = 4 total
      expect(expanded.length).toBe(4);
      expect(expanded.filter(e => e.summary === 'One-time Event').length).toBe(1);
      expect(expanded.filter(e => e.summary === 'Daily Event').length).toBe(3);
    });

    it('should preserve event duration in expanded occurrences', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:with-duration
DTSTART:20260201T100000Z
DTEND:20260201T113000Z
RRULE:FREQ=DAILY;COUNT=3
SUMMARY:90-min Meeting
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-02-05T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // All occurrences should have 90-minute duration
      expanded.forEach(e => {
        const duration = e.end.getTime() - e.start.getTime();
        expect(duration).toBe(90 * 60 * 1000);
      });
    });

    it('should sort expanded events by start time', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:afternoon-event
DTSTART:20260201T140000Z
DTEND:20260201T150000Z
RRULE:FREQ=DAILY;COUNT=2
SUMMARY:Afternoon
END:VEVENT
BEGIN:VEVENT
UID:morning-event
DTSTART:20260201T090000Z
DTEND:20260201T100000Z
RRULE:FREQ=DAILY;COUNT=2
SUMMARY:Morning
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-02-03T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // Should be sorted: Morning Feb 1, Afternoon Feb 1, Morning Feb 2, Afternoon Feb 2
      for (let i = 1; i < expanded.length; i++) {
        expect(expanded[i].start.getTime()).toBeGreaterThanOrEqual(expanded[i - 1].start.getTime());
      }
    });
  });

  describe('Yearly and Monthly Recurrence', () => {
    it('should expand yearly recurring event', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:yearly-event
DTSTART:20250115T100000Z
DTEND:20250115T110000Z
RRULE:FREQ=YEARLY
SUMMARY:Annual Review
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-01-01T00:00:00Z');
      const endWindow = new Date('2026-01-31T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      expect(expanded.length).toBe(1);
      expect(expanded[0].start.getFullYear()).toBe(2026);
    });

    it('should expand monthly by day of week (first Monday)', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:first-monday
DTSTART:20260202T100000Z
DTEND:20260202T110000Z
RRULE:FREQ=MONTHLY;BYDAY=1MO
SUMMARY:First Monday Meeting
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      const startWindow = new Date('2026-02-01T00:00:00Z');
      const endWindow = new Date('2026-04-30T23:59:59Z');
      
      const expanded = processRecurringEvents(result.events, startWindow, endWindow);
      
      // First Monday of Feb (2), Mar (2), Apr (6)
      expect(expanded.length).toBe(3);
    });
  });
});
