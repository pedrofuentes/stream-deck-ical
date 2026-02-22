/**
 * Unit tests for iCal parser using Mozilla's ical.js
 * Tests edge cases and robustness scenarios
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { parseICS, parseICalFeed } from '../src/services/ical-parser.js';

describe('iCal Parser', () => {
  describe('parseICS', () => {
    it('should handle minimal valid calendar', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:test-1
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Minimal Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].uid).toBe('test-1');
      expect(result.events[0].summary).toBe('Minimal Event');
    });

    it('should handle events without optional fields', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:no-optional
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toBe('(No title)');
      expect(result.events[0].description).toBeUndefined();
      expect(result.events[0].location).toBeUndefined();
    });

    it('should handle escaped characters in text fields', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:escaped-chars
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Meeting\\, with comma
DESCRIPTION:Line 1\\nLine 2\\nLine 3
LOCATION:Room\\; Building A
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toBe('Meeting, with comma');
      expect(result.events[0].description).toContain('Line 1');
      expect(result.events[0].location).toBe('Room; Building A');
    });

    it('should handle folded lines (long lines wrapped)', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:folded-lines
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:This is a very long summary that should be properly unfolded when 
 parsed by the iCal parser
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toContain('very long summary');
      expect(result.events[0].summary).toContain('unfolded');
    });

    it('should handle multiple events in one calendar', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:event-1
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Event 1
END:VEVENT
BEGIN:VEVENT
UID:event-2
DTSTART:20260201T140000Z
DTEND:20260201T150000Z
SUMMARY:Event 2
END:VEVENT
BEGIN:VEVENT
UID:event-3
DTSTART:20260201T160000Z
DTEND:20260201T170000Z
SUMMARY:Event 3
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(3);
      expect(result.events.map(e => e.summary)).toContain('Event 1');
      expect(result.events.map(e => e.summary)).toContain('Event 2');
      expect(result.events.map(e => e.summary)).toContain('Event 3');
    });

    it('should detect recurring events with RRULE', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:recurring-test
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Weekly Meeting
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].isRecurring).toBe(true);
    });

    it('should handle non-recurring events', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:single-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:One-time Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].isRecurring).toBe(false);
    });

    it('should handle all-day events (DATE only)', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:all-day
DTSTART;VALUE=DATE:20260215
DTEND;VALUE=DATE:20260216
SUMMARY:All Day Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].start).toBeInstanceOf(Date);
      expect(result.events[0].end).toBeInstanceOf(Date);
      // All-day event should start at midnight
      expect(result.events[0].start.getHours()).toBe(0);
      expect(result.events[0].start.getMinutes()).toBe(0);
    });

    it('should handle UTC times (Z suffix)', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:utc-time
DTSTART:20260201T150000Z
DTEND:20260201T160000Z
SUMMARY:UTC Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      // The time should be 15:00 UTC
      expect(result.events[0].start.getUTCHours()).toBe(15);
      expect(result.events[0].start.getUTCMinutes()).toBe(0);
    });

    it('should handle events with STATUS field', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:confirmed-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Confirmed Meeting
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
UID:cancelled-event
DTSTART:20260201T140000Z
DTEND:20260201T150000Z
SUMMARY:Cancelled Meeting
STATUS:CANCELLED
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(2);
      const confirmed = result.events.find(e => e.uid === 'confirmed-event');
      const cancelled = result.events.find(e => e.uid === 'cancelled-event');
      expect(confirmed?.status).toBe('CONFIRMED');
      expect(cancelled?.status).toBe('CANCELLED');
    });

    it('should extract calendar name from X-WR-CALNAME', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
X-WR-CALNAME:My Work Calendar
BEGIN:VEVENT
UID:test-1
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.calendarName).toBe('My Work Calendar');
    });

    it('should return UTC as default timezone when none specified', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:no-tz
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:No TZ Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.timezone).toBe('UTC');
    });

    it('should handle CRLF line endings (Windows style)', () => {
      const ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Test//Test//EN\r\nBEGIN:VEVENT\r\nUID:crlf-test\r\nDTSTART:20260201T100000Z\r\nDTEND:20260201T110000Z\r\nSUMMARY:CRLF Event\r\nEND:VEVENT\r\nEND:VCALENDAR';

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toBe('CRLF Event');
    });

    it('should handle LF line endings (Unix style)', () => {
      const ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Test//Test//EN\nBEGIN:VEVENT\nUID:lf-test\nDTSTART:20260201T100000Z\nDTEND:20260201T110000Z\nSUMMARY:LF Event\nEND:VEVENT\nEND:VCALENDAR';

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toBe('LF Event');
    });
  });

  describe('Provider Detection', () => {
    it('should detect Google Calendar', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
BEGIN:VEVENT
UID:google-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Google Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.provider).toBe('google');
    });

    it('should detect Microsoft Outlook', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
BEGIN:VEVENT
UID:outlook-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Outlook Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.provider).toBe('outlook');
    });

    it('should detect Apple Calendar', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
BEGIN:VEVENT
UID:apple-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Apple Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.provider).toBe('apple');
    });

    it('should return unknown for unrecognized PRODID', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Custom Calendar App//v1.0//EN
BEGIN:VEVENT
UID:custom-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Custom Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.provider).toBe('unknown');
    });
  });

  describe('Timezone Handling', () => {
    it('should extract timezone from X-WR-TIMEZONE', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
X-WR-TIMEZONE:America/New_York
BEGIN:VEVENT
UID:tz-test
DTSTART:20260201T100000
DTEND:20260201T110000
SUMMARY:NY Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.timezone).toBe('America/New_York');
    });

    it('should extract timezone from VTIMEZONE component', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VTIMEZONE
TZID:America/Los_Angeles
BEGIN:STANDARD
DTSTART:19701101T020000
TZOFFSETFROM:-0700
TZOFFSETTO:-0800
TZNAME:PST
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:vtimezone-test
DTSTART;TZID=America/Los_Angeles:20260201T100000
DTEND;TZID=America/Los_Angeles:20260201T110000
SUMMARY:LA Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.timezone).toBe('America/Los_Angeles');
    });

    it('should handle events with different timezones', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VTIMEZONE
TZID:Europe/London
BEGIN:STANDARD
DTSTART:19701025T020000
TZOFFSETFROM:+0100
TZOFFSETTO:+0000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:london-event
DTSTART;TZID=Europe/London:20260201T100000
DTEND;TZID=Europe/London:20260201T110000
SUMMARY:London Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(1);
      expect(result.events[0].start).toBeInstanceOf(Date);
    });
  });

  describe('parseICalFeed (async wrapper)', () => {
    it('should return parsed calendar data', async () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:async-test
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Async Event
END:VEVENT
END:VCALENDAR`;

      const result = await parseICalFeed(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toBe('Async Event');
    });

    it('should throw on invalid iCal content', async () => {
      const invalidIcs = 'This is not valid iCal content';
      
      await expect(parseICalFeed(invalidIcs)).rejects.toThrow();
    });

    it('should throw on empty content', async () => {
      await expect(parseICalFeed('')).rejects.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle calendar with no events', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(0);
    });

    it('should handle multi-day events', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:multi-day
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260205
SUMMARY:4-Day Conference
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      const event = result.events[0];
      // Start date should be Feb 1
      expect(event.start.getDate()).toBe(1);
      // End date should be Feb 5
      expect(event.end.getDate()).toBe(5);
    });

    it('should handle special characters in summary', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:special-chars
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Meeting: Q1 Review (Important!) @Main Office #planning
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toContain('Q1 Review');
      expect(result.events[0].summary).toContain('@Main Office');
    });

    it('should handle events with VALARM components', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:alarm-event
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Event with Alarm
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER:-PT15M
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      // Should parse event despite VALARM component
      expect(result.events).toHaveLength(1);
      expect(result.events[0].summary).toBe('Event with Alarm');
    });

    it('should handle recurrence exception (RECURRENCE-ID)', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:recurring-base
DTSTART:20260201T100000Z
DTEND:20260201T110000Z
SUMMARY:Weekly Meeting
RRULE:FREQ=WEEKLY
END:VEVENT
BEGIN:VEVENT
UID:recurring-base
RECURRENCE-ID:20260208T100000Z
DTSTART:20260208T140000Z
DTEND:20260208T150000Z
SUMMARY:Weekly Meeting (Rescheduled)
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      
      // Should have both the base event and the exception
      expect(result.events.length).toBeGreaterThanOrEqual(1);
      const exception = result.events.find(e => e.recurrenceId);
      expect(exception).toBeDefined();
    });
  });

  describe('eventTimezone extraction', () => {
    it('should extract eventTimezone from DTSTART TZID', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VTIMEZONE
TZID:America/New_York
BEGIN:STANDARD
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:tz-test-1
DTSTART;TZID=America/New_York:20260601T100000
DTEND;TZID=America/New_York:20260601T110000
SUMMARY:New York Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(1);
      expect(result.events[0].eventTimezone).toBe('America/New_York');
    });

    it('should fallback to calendar timezone when DTSTART has no TZID', () => {
      // Floating DTSTART with X-WR-TIMEZONE on calendar
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
X-WR-TIMEZONE:Europe/London
BEGIN:VEVENT
UID:tz-test-2
DTSTART:20260601T100000
DTEND:20260601T110000
SUMMARY:Floating Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(1);
      // Floating DTSTART → falls back to calendar timezone
      expect(result.events[0].eventTimezone).toBe('Europe/London');
    });

    it('should leave eventTimezone undefined for UTC-only events with no calendar timezone', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:tz-test-3
DTSTART:20260601T100000Z
DTEND:20260601T110000Z
SUMMARY:UTC Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(1);
      // UTC zone is explicitly excluded from eventTimezone
      expect(result.events[0].eventTimezone).toBeUndefined();
    });

    it('should resolve Windows timezone name to IANA via parseTimezone', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Microsoft//Outlook//EN
BEGIN:VTIMEZONE
TZID:Eastern Standard Time
BEGIN:STANDARD
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:tz-test-4
DTSTART;TZID=Eastern Standard Time:20260601T100000
DTEND;TZID=Eastern Standard Time:20260601T110000
SUMMARY:Outlook Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(1);
      // "Eastern Standard Time" should resolve to America/New_York
      expect(result.events[0].eventTimezone).toBe('America/New_York');
    });

    it('should not set eventTimezone for all-day events', () => {
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:tz-test-5
DTSTART;VALUE=DATE:20260601
DTEND;VALUE=DATE:20260602
SUMMARY:All Day Event
END:VEVENT
END:VCALENDAR`;

      const result = parseICS(ics);
      expect(result.events).toHaveLength(1);
      expect(result.events[0].isAllDay).toBe(true);
      // DATE values have no timezone component — should be undefined
      expect(result.events[0].eventTimezone).toBeUndefined();
    });
  });
});
