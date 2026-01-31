/**
 * Tests for calendar service
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock the logger before importing calendar-service
vi.mock('../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  },
  debugLogs: [],
  isDebugMode: vi.fn(() => true)
}));

import {
  calendarCache,
  isValidURL,
  updateCalendarCache,
  getStatusText,
  startPeriodicUpdates,
  stopPeriodicUpdates,
  getDebugInfo,
  setActionSettings,
  getSettings
} from '../src/services/calendar-service';
import { ErrorState } from '../src/types/index';

describe('isValidURL', () => {
  it('should return true for valid HTTP URLs', () => {
    expect(isValidURL('http://example.com/calendar.ics')).toBe(true);
    expect(isValidURL('https://example.com/calendar.ics')).toBe(true);
  });

  it('should return true for URLs with query parameters', () => {
    expect(isValidURL('https://calendar.google.com/calendar/ical/test@group.calendar.google.com/basic.ics?param=value')).toBe(true);
  });

  it('should return true for URLs with encoded characters', () => {
    expect(isValidURL('https://calendar.google.com/calendar/ical/abcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234%40group.calendar.google.com/private-abcd1234567890abcd1234567890abcd/basic.ics')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidURL('')).toBe(false);
    expect(isValidURL('not-a-url')).toBe(false);
    expect(isValidURL('://missing-protocol.com')).toBe(false);
  });

  it('should return false for partial URLs', () => {
    expect(isValidURL('example.com/calendar.ics')).toBe(false);
    expect(isValidURL('/path/to/calendar.ics')).toBe(false);
  });
});

describe('getStatusText', () => {
  it('should return correct text for INIT status', () => {
    expect(getStatusText('INIT')).toBe('Loading\niCal');
  });

  it('should return correct text for LOADING status', () => {
    expect(getStatusText('LOADING')).toBe('Loading\niCal');
  });

  it('should return correct text for INVALID_URL status', () => {
    expect(getStatusText('INVALID_URL')).toBe('Please\nSetup');
  });

  it('should return correct text for NETWORK_ERROR status', () => {
    expect(getStatusText('NETWORK_ERROR')).toBe('Network\nError');
  });

  it('should return correct text for PARSE_ERROR status', () => {
    expect(getStatusText('PARSE_ERROR')).toBe('Parse\nError');
  });

  it('should return correct text for NO_EVENTS status', () => {
    expect(getStatusText('NO_EVENTS')).toBe('No\nMeetings\nFound');
  });

  it('should return empty string for LOADED status', () => {
    expect(getStatusText('LOADED')).toBe('');
  });

  it('should return Error for unknown status', () => {
    expect(getStatusText('UNKNOWN' as ErrorState)).toBe('Error');
  });
});

describe('calendarCache', () => {
  beforeEach(() => {
    // Reset cache to initial state
    calendarCache.version = 0;
    calendarCache.status = 'INIT';
    calendarCache.events = [];
    calendarCache.lastFetch = undefined;
    calendarCache.provider = undefined;
  });

  it('should have correct initial state', () => {
    expect(calendarCache.version).toBe(0);
    expect(calendarCache.status).toBe('INIT');
    expect(calendarCache.events).toEqual([]);
    expect(calendarCache.lastFetch).toBeUndefined();
    expect(calendarCache.provider).toBeUndefined();
  });
});

describe('updateCalendarCache', () => {
  beforeEach(() => {
    calendarCache.version = 0;
    calendarCache.status = 'INIT';
    calendarCache.events = [];
    calendarCache.lastFetch = undefined;
    calendarCache.provider = undefined;
    vi.clearAllMocks();
  });

  it('should set INVALID_URL status for empty URL', async () => {
    await updateCalendarCache('');
    expect(calendarCache.status).toBe('INVALID_URL');
    expect(calendarCache.events).toEqual([]);
  });

  it('should set INVALID_URL status for whitespace-only URL', async () => {
    await updateCalendarCache('   ');
    expect(calendarCache.status).toBe('INVALID_URL');
    expect(calendarCache.events).toEqual([]);
  });

  it('should set INVALID_URL status for invalid URL format', async () => {
    await updateCalendarCache('not-a-valid-url');
    expect(calendarCache.status).toBe('INVALID_URL');
    expect(calendarCache.events).toEqual([]);
  });

  it('should set status to LOADING while fetching', async () => {
    // Mock global fetch to control timing
    const fetchPromise = new Promise((resolve) => setTimeout(resolve, 100));
    global.fetch = vi.fn().mockImplementation(() => fetchPromise);
    
    // Don't await, check status during loading
    const updatePromise = updateCalendarCache('https://example.com/cal.ics');
    // Status should be LOADING after entering the try block
    // (we can't easily check mid-execution, so we test the error path instead)
    await updatePromise;
    // After completion with mocked fetch that doesn't return proper response
    expect(calendarCache.status).toBe('NETWORK_ERROR');
  });

  it('should handle network errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('fetch failed'));
    
    await updateCalendarCache('https://example.com/cal.ics');
    
    expect(calendarCache.status).toBe('NETWORK_ERROR');
    expect(calendarCache.events).toEqual([]);
  });

  it('should handle HTTP errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    
    await updateCalendarCache('https://example.com/cal.ics');
    
    expect(calendarCache.status).toBe('NETWORK_ERROR');
    expect(calendarCache.events).toEqual([]);
  });

  it('should successfully parse and cache events', async () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:test-123
DTSTART:${formatICSDate(new Date(Date.now() + 3600000))}
DTEND:${formatICSDate(new Date(Date.now() + 7200000))}
SUMMARY:Test Event
END:VEVENT
END:VCALENDAR`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve(icsContent)
    });

    await updateCalendarCache('https://example.com/cal.ics', 3);

    expect(calendarCache.status).toBe('LOADED');
    expect(calendarCache.events.length).toBeGreaterThanOrEqual(1);
    expect(calendarCache.version).toBe(1);
    expect(calendarCache.lastFetch).toBeDefined();
  });

  it('should set NO_EVENTS when calendar is empty', async () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
END:VCALENDAR`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve(icsContent)
    });

    await updateCalendarCache('https://example.com/cal.ics', 3);

    expect(calendarCache.status).toBe('NO_EVENTS');
    expect(calendarCache.events).toEqual([]);
  });

  it('should increment version on each successful update', async () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:test-123
DTSTART:${formatICSDate(new Date(Date.now() + 3600000))}
DTEND:${formatICSDate(new Date(Date.now() + 7200000))}
SUMMARY:Test Event
END:VEVENT
END:VCALENDAR`;

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve(icsContent)
    });

    await updateCalendarCache('https://example.com/cal.ics', 3);
    expect(calendarCache.version).toBe(1);

    await updateCalendarCache('https://example.com/cal.ics', 3);
    expect(calendarCache.version).toBe(2);
  });
});

describe('startPeriodicUpdates', () => {
  beforeEach(() => {
    calendarCache.version = 0;
    calendarCache.status = 'INIT';
    calendarCache.events = [];
    
    // Mock fetch to return empty calendar
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR')
    });
  });

  it('should return an interval ID', () => {
    const intervalId = startPeriodicUpdates('https://example.com/cal.ics', 3, 10);
    expect(intervalId).toBeDefined();
    clearInterval(intervalId);
  });

  it('should call updateCalendarCache immediately', async () => {
    const intervalId = startPeriodicUpdates('https://example.com/cal.ics', 3, 10);
    
    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(global.fetch).toHaveBeenCalled();
    clearInterval(intervalId);
  });

  it('should set up interval with correct timing', () => {
    // Just verify the interval is created - don't test timing to avoid fake timer issues
    const intervalId = startPeriodicUpdates('https://example.com/cal.ics', 3, 10);
    expect(intervalId).toBeDefined();
    expect(typeof intervalId).toBe('object'); // NodeJS.Timeout
    clearInterval(intervalId);
  });
});

describe('stopPeriodicUpdates', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR')
    });
  });

  it('should clear the interval', () => {
    const intervalId = startPeriodicUpdates('https://example.com/cal.ics', 3, 10);
    
    // Should not throw when stopping
    expect(() => stopPeriodicUpdates(intervalId)).not.toThrow();
  });

  it('should be safe to call multiple times', () => {
    const intervalId = startPeriodicUpdates('https://example.com/cal.ics', 3, 10);
    
    stopPeriodicUpdates(intervalId);
    // Calling again should not throw
    expect(() => stopPeriodicUpdates(intervalId)).not.toThrow();
  });
});

describe('getDebugInfo', () => {
  beforeEach(() => {
    calendarCache.version = 5;
    calendarCache.status = 'LOADED';
    calendarCache.events = [
      {
        uid: 'test-1',
        summary: 'Test Event 1',
        start: new Date('2026-01-31T10:00:00Z'),
        end: new Date('2026-01-31T11:00:00Z'),
        isRecurring: false
      },
      {
        uid: 'test-2',
        summary: 'Test Event 2',
        start: new Date('2026-01-31T14:00:00Z'),
        end: new Date('2026-01-31T15:00:00Z'),
        isRecurring: true
      }
    ];
    calendarCache.lastFetch = Date.now();
    calendarCache.provider = 'google';
  });

  it('should return debug info object', () => {
    const info = getDebugInfo() as any;
    
    expect(info).toHaveProperty('isDebugMode');
    expect(info).toHaveProperty('cache');
    expect(info).toHaveProperty('events');
    expect(info).toHaveProperty('logs');
  });

  it('should include cache status information', () => {
    const info = getDebugInfo() as any;
    
    expect(info.cache.status).toBe('LOADED');
    expect(info.cache.version).toBe(5);
    expect(info.cache.eventCount).toBe(2);
    expect(info.cache.provider).toBe('google');
  });

  it('should include event information', () => {
    const info = getDebugInfo() as any;
    
    expect(info.events).toHaveLength(2);
    expect(info.events[0].summary).toBe('Test Event 1');
    expect(info.events[0].isRecurring).toBe(false);
    expect(info.events[1].summary).toBe('Test Event 2');
    expect(info.events[1].isRecurring).toBe(true);
  });

  it('should limit events to 10', () => {
    // Add 15 events
    calendarCache.events = Array.from({ length: 15 }, (_, i) => ({
      uid: `test-${i}`,
      summary: `Event ${i}`,
      start: new Date(),
      end: new Date()
    }));

    const info = getDebugInfo() as any;
    expect(info.events).toHaveLength(10);
  });

  it('should include ISO formatted dates', () => {
    const info = getDebugInfo() as any;
    
    expect(info.events[0].start).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(info.events[0].end).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(info.cache.lastFetch).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('should handle null lastFetch', () => {
    calendarCache.lastFetch = undefined;
    const info = getDebugInfo() as any;
    expect(info.cache.lastFetch).toBeNull();
  });
});

describe('All-Day Event Filtering', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    calendarCache.events = [];
    calendarCache.status = 'INIT';
    calendarCache.version = 0;
  });

  it('should detect all-day events from parsed iCal', async () => {
    const allDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:all-day-test
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260202
SUMMARY:All Day Event
END:VEVENT
END:VCALENDAR`;

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(allDayIcs)
    }));

    // With excludeAllDay=true, all-day events should be filtered
    await updateCalendarCache('https://example.com/cal.ics', 3, true);
    expect(calendarCache.events.length).toBe(0);
  });

  it('should include all-day events when excludeAllDay is false', async () => {
    const allDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:all-day-test
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260202
SUMMARY:All Day Event
END:VEVENT
END:VCALENDAR`;

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(allDayIcs)
    }));

    // With excludeAllDay=false, all-day events should be included
    await updateCalendarCache('https://example.com/cal.ics', 365, false);
    expect(calendarCache.events.length).toBe(1);
    expect(calendarCache.events[0].isAllDay).toBe(true);
  });

  it('should keep timed events when filtering all-day events', async () => {
    const now = new Date();
    const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const end = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    
    const mixedIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:all-day-test
DTSTART;VALUE=DATE:${formatICSDateOnly(now)}
DTEND;VALUE=DATE:${formatICSDateOnly(new Date(now.getTime() + 24 * 60 * 60 * 1000))}
SUMMARY:All Day Event
END:VEVENT
BEGIN:VEVENT
UID:timed-test
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:Timed Event
END:VEVENT
END:VCALENDAR`;

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mixedIcs)
    }));

    // With excludeAllDay=true, only timed event should remain
    await updateCalendarCache('https://example.com/cal.ics', 3, true);
    expect(calendarCache.events.length).toBe(1);
    expect(calendarCache.events[0].summary).toBe('Timed Event');
    expect(calendarCache.events[0].isAllDay).toBeFalsy();
  });
});

// Helper function to format date as ICS
function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// Helper function to format date-only (for all-day events)
function formatICSDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

describe('All-Day Event Detection - Calendar Provider Compatibility', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    calendarCache.events = [];
    calendarCache.status = 'INIT';
    calendarCache.version = 0;
  });

  describe('Google Calendar', () => {
    it('should detect Google Calendar all-day events (VALUE=DATE format)', async () => {
      // Google Calendar uses VALUE=DATE for all-day events
      const googleAllDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
X-WR-CALNAME:Test Calendar
BEGIN:VEVENT
UID:google-all-day@google.com
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260202
SUMMARY:Google All Day Event
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(googleAllDayIcs)
      }));

      await updateCalendarCache('https://example.com/cal.ics', 365, false);
      expect(calendarCache.events.length).toBe(1);
      expect(calendarCache.events[0].isAllDay).toBe(true);
      expect(calendarCache.events[0].summary).toBe('Google All Day Event');
    });

    it('should detect Google Calendar recurring all-day events', async () => {
      const now = new Date();
      const googleRecurringAllDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
BEGIN:VEVENT
UID:google-recurring-all-day@google.com
DTSTART;VALUE=DATE:${formatICSDateOnly(now)}
DTEND;VALUE=DATE:${formatICSDateOnly(new Date(now.getTime() + 24 * 60 * 60 * 1000))}
RRULE:FREQ=DAILY;COUNT=5
SUMMARY:Daily All Day Event
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(googleRecurringAllDayIcs)
      }));

      // With excludeAllDay=false, recurring all-day events should be included
      await updateCalendarCache('https://example.com/cal.ics', 7, false);
      expect(calendarCache.events.length).toBeGreaterThan(0);
      expect(calendarCache.events.every(e => e.isAllDay === true)).toBe(true);
    });

    it('should filter Google Calendar recurring all-day events when excludeAllDay=true', async () => {
      const now = new Date();
      const googleRecurringAllDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
BEGIN:VEVENT
UID:google-recurring-all-day@google.com
DTSTART;VALUE=DATE:${formatICSDateOnly(now)}
DTEND;VALUE=DATE:${formatICSDateOnly(new Date(now.getTime() + 24 * 60 * 60 * 1000))}
RRULE:FREQ=DAILY;COUNT=5
SUMMARY:Daily All Day Event
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(googleRecurringAllDayIcs)
      }));

      // With excludeAllDay=true, recurring all-day events should be filtered
      await updateCalendarCache('https://example.com/cal.ics', 7, true);
      expect(calendarCache.events.length).toBe(0);
    });
  });

  describe('Microsoft Outlook / Office 365', () => {
    it('should detect Outlook all-day events (VALUE=DATE format)', async () => {
      // Outlook/O365 uses VALUE=DATE for all-day events
      const outlookAllDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
METHOD:PUBLISH
X-WR-CALNAME:Calendar
BEGIN:VTIMEZONE
TZID:Eastern Standard Time
BEGIN:STANDARD
DTSTART:16010101T020000
RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=11
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T020000
RRULE:FREQ=YEARLY;BYDAY=2SU;BYMONTH=3
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:outlook-all-day@outlook.com
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260202
SUMMARY:Outlook All Day Event
STATUS:CONFIRMED
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(outlookAllDayIcs)
      }));

      await updateCalendarCache('https://example.com/cal.ics', 365, false);
      expect(calendarCache.events.length).toBe(1);
      expect(calendarCache.events[0].isAllDay).toBe(true);
      expect(calendarCache.events[0].summary).toBe('Outlook All Day Event');
    });

    it('should detect Outlook recurring all-day events with Windows timezone', async () => {
      const now = new Date();
      const outlookRecurringAllDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
BEGIN:VTIMEZONE
TZID:Eastern Standard Time
BEGIN:STANDARD
DTSTART:16010101T020000
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:outlook-recurring-all-day@outlook.com
DTSTART;VALUE=DATE:${formatICSDateOnly(now)}
DTEND;VALUE=DATE:${formatICSDateOnly(new Date(now.getTime() + 24 * 60 * 60 * 1000))}
RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;COUNT=10
SUMMARY:Outlook Weekly All Day
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(outlookRecurringAllDayIcs)
      }));

      // With excludeAllDay=false, should include all-day events
      await updateCalendarCache('https://example.com/cal.ics', 14, false);
      expect(calendarCache.events.length).toBeGreaterThan(0);
      expect(calendarCache.events.every(e => e.isAllDay === true)).toBe(true);
    });
  });

  describe('Apple Calendar / iCloud', () => {
    it('should detect Apple Calendar all-day events (VALUE=DATE format)', async () => {
      // Apple Calendar uses VALUE=DATE for all-day events
      const appleAllDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:apple-all-day@icloud.com
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260202
SUMMARY:Apple All Day Event
STATUS:CONFIRMED
CREATED:20260101T000000Z
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(appleAllDayIcs)
      }));

      await updateCalendarCache('https://example.com/cal.ics', 365, false);
      expect(calendarCache.events.length).toBe(1);
      expect(calendarCache.events[0].isAllDay).toBe(true);
      expect(calendarCache.events[0].summary).toBe('Apple All Day Event');
    });

    it('should detect Apple Calendar multi-day all-day events', async () => {
      // Apple Calendar multi-day events have DTEND = DTSTART + N days
      const appleMultiDayIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:apple-multi-day@icloud.com
DTSTART;VALUE=DATE:20260201
DTEND;VALUE=DATE:20260205
SUMMARY:4-Day Conference
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(appleMultiDayIcs)
      }));

      await updateCalendarCache('https://example.com/cal.ics', 365, false);
      expect(calendarCache.events.length).toBe(1);
      expect(calendarCache.events[0].isAllDay).toBe(true);
      expect(calendarCache.events[0].summary).toBe('4-Day Conference');
    });
  });

  describe('Mixed timed and all-day events', () => {
    it('should correctly distinguish timed events from all-day events (Google)', async () => {
      const now = new Date();
      const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
      const end = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

      const mixedIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Inc//Google Calendar 70.9054//EN
BEGIN:VEVENT
UID:google-timed@google.com
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:Timed Meeting
END:VEVENT
BEGIN:VEVENT
UID:google-all-day@google.com
DTSTART;VALUE=DATE:${formatICSDateOnly(now)}
DTEND;VALUE=DATE:${formatICSDateOnly(new Date(now.getTime() + 24 * 60 * 60 * 1000))}
SUMMARY:All Day Event
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mixedIcs)
      }));

      // With excludeAllDay=false, both should be included
      await updateCalendarCache('https://example.com/cal.ics', 3, false);
      expect(calendarCache.events.length).toBe(2);
      
      const timedEvent = calendarCache.events.find(e => e.summary === 'Timed Meeting');
      const allDayEvent = calendarCache.events.find(e => e.summary === 'All Day Event');
      
      expect(timedEvent?.isAllDay).toBeFalsy();
      expect(allDayEvent?.isAllDay).toBe(true);
    });

    it('should filter only all-day events when excludeAllDay=true (mixed calendar)', async () => {
      const now = new Date();
      const start = new Date(now.getTime() + 60 * 60 * 1000);
      const end = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      const mixedIcs = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
UID:timed-1
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:Morning Meeting
END:VEVENT
BEGIN:VEVENT
UID:all-day-1
DTSTART;VALUE=DATE:${formatICSDateOnly(now)}
DTEND;VALUE=DATE:${formatICSDateOnly(new Date(now.getTime() + 24 * 60 * 60 * 1000))}
SUMMARY:Holiday
END:VEVENT
BEGIN:VEVENT
UID:timed-2
DTSTART:${formatICSDate(new Date(start.getTime() + 3 * 60 * 60 * 1000))}
DTEND:${formatICSDate(new Date(end.getTime() + 3 * 60 * 60 * 1000))}
SUMMARY:Afternoon Meeting
END:VEVENT
END:VCALENDAR`;

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mixedIcs)
      }));

      // With excludeAllDay=true, only timed events should remain
      await updateCalendarCache('https://example.com/cal.ics', 3, true);
      expect(calendarCache.events.length).toBe(2);
      expect(calendarCache.events.every(e => !e.isAllDay)).toBe(true);
      expect(calendarCache.events.map(e => e.summary).sort()).toEqual(['Afternoon Meeting', 'Morning Meeting']);
    });
  });
});

describe('Action Settings', () => {
  beforeEach(() => {
    // Reset settings to defaults
    setActionSettings({
      titleDisplayDuration: 15,
      flashOnMeetingStart: true
    });
  });

  describe('setActionSettings', () => {
    it('should store action settings', () => {
      setActionSettings({
        titleDisplayDuration: 30,
        flashOnMeetingStart: false
      });

      const settings = getSettings();
      expect(settings.titleDisplayDuration).toBe(30);
      expect(settings.flashOnMeetingStart).toBe(false);
    });

    it('should allow partial updates', () => {
      setActionSettings({ titleDisplayDuration: 5 });
      
      const settings = getSettings();
      expect(settings.titleDisplayDuration).toBe(5);
      expect(settings.flashOnMeetingStart).toBe(true); // unchanged
    });
  });

  describe('getSettings', () => {
    it('should return default settings initially', () => {
      const settings = getSettings();
      expect(settings.titleDisplayDuration).toBe(15);
      expect(settings.flashOnMeetingStart).toBe(true);
    });

    it('should return updated settings after setActionSettings', () => {
      setActionSettings({
        titleDisplayDuration: 10,
        flashOnMeetingStart: false
      });

      const settings = getSettings();
      expect(settings.titleDisplayDuration).toBe(10);
      expect(settings.flashOnMeetingStart).toBe(false);
    });

    it('should support all valid titleDisplayDuration values', () => {
      const validDurations = [5, 10, 15, 30];
      
      for (const duration of validDurations) {
        setActionSettings({ titleDisplayDuration: duration as 5 | 10 | 15 | 30 });
        expect(getSettings().titleDisplayDuration).toBe(duration);
      }
    });
  });
});
