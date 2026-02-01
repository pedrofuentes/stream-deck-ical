/**
 * Tests for CalendarManager service
 * 
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CalendarManager, generateCalendarId } from '../src/services/calendar-manager.js';

// Mock the logger
vi.mock('../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  },
  isDebugMode: vi.fn(() => false)
}));

// Mock parseICalFeed
vi.mock('../src/services/ical-parser', () => ({
  parseICalFeed: vi.fn().mockResolvedValue({
    events: [
      {
        uid: 'event1',
        summary: 'Test Meeting',
        start: new Date('2026-01-31T10:00:00Z'),
        end: new Date('2026-01-31T11:00:00Z'),
        isAllDay: false
      }
    ],
    provider: 'google'
  })
}));

// Mock processRecurringEvents
vi.mock('../src/services/recurrence-expander', () => ({
  processRecurringEvents: vi.fn((events) => events)
}));

// Mock sortEventsByStartTime
vi.mock('../src/utils/event-utils', () => ({
  sortEventsByStartTime: vi.fn((events) => events)
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('CalendarManager', () => {
  let manager: CalendarManager;

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new CalendarManager();
    
    // Default successful fetch response
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('BEGIN:VCALENDAR\nEND:VCALENDAR')
    });
  });

  afterEach(() => {
    manager.clear();
  });

  describe('generateCalendarId', () => {
    it('should generate consistent IDs for same URL', () => {
      const url = 'https://calendar.google.com/test.ics';
      const id1 = generateCalendarId(url);
      const id2 = generateCalendarId(url);
      
      expect(id1).toBe(id2);
    });

    it('should generate different IDs for different URLs', () => {
      const id1 = generateCalendarId('https://calendar1.com/test.ics');
      const id2 = generateCalendarId('https://calendar2.com/test.ics');
      
      expect(id1).not.toBe(id2);
    });

    it('should prefix IDs with "cal_"', () => {
      const id = generateCalendarId('https://example.com/calendar.ics');
      expect(id).toMatch(/^cal_[0-9a-f]+$/);
    });
  });

  describe('getOrCreateCalendar', () => {
    it('should create a new calendar instance', () => {
      const url = 'https://calendar.google.com/test.ics';
      const calendar = manager.getOrCreateCalendar(url, 3, true);
      
      expect(calendar).toBeDefined();
      expect(calendar.url).toBe(url);
      expect(calendar.timeWindow).toBe(3);
      expect(calendar.excludeAllDay).toBe(true);
      expect(calendar.refCount).toBe(0);
    });

    it('should return existing calendar for same URL', () => {
      const url = 'https://calendar.google.com/test.ics';
      const calendar1 = manager.getOrCreateCalendar(url, 3, true);
      const calendar2 = manager.getOrCreateCalendar(url, 3, true);
      
      expect(calendar1).toBe(calendar2);
    });

    it('should use larger time window when reusing calendar', () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.getOrCreateCalendar(url, 3, true);
      const calendar = manager.getOrCreateCalendar(url, 7, true);
      
      expect(calendar.timeWindow).toBe(7);
    });

    it('should include all-day events if any action wants them', () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.getOrCreateCalendar(url, 3, true); // exclude all-day
      const calendar = manager.getOrCreateCalendar(url, 3, false); // include all-day
      
      expect(calendar.excludeAllDay).toBe(false);
    });
  });

  describe('registerAction', () => {
    it('should register an action to a calendar', () => {
      const url = 'https://calendar.google.com/test.ics';
      const calendarId = manager.registerAction('action1', url, 3, true);
      
      expect(calendarId).toBeDefined();
      expect(manager.getCalendarForAction('action1')).toBeDefined();
    });

    it('should increment refCount when registering', () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      const calendar = manager.getCalendarForAction('action1');
      
      expect(calendar?.refCount).toBe(1);
    });

    it('should share calendar between actions with same URL', () => {
      const url = 'https://calendar.google.com/test.ics';
      const id1 = manager.registerAction('action1', url);
      const id2 = manager.registerAction('action2', url);
      
      expect(id1).toBe(id2);
      
      const calendar = manager.getCalendarForAction('action1');
      expect(calendar?.refCount).toBe(2);
    });

    it('should create separate calendars for different URLs', () => {
      const id1 = manager.registerAction('action1', 'https://cal1.com/test.ics');
      const id2 = manager.registerAction('action2', 'https://cal2.com/test.ics');
      
      expect(id1).not.toBe(id2);
    });

    it('should switch calendars when re-registering with different URL', () => {
      manager.registerAction('action1', 'https://cal1.com/test.ics');
      const oldCalendar = manager.getCalendarForAction('action1');
      expect(oldCalendar?.refCount).toBe(1);
      
      manager.registerAction('action1', 'https://cal2.com/test.ics');
      
      // Old calendar should have decremented refCount (cleaned up since 0)
      expect(manager.hasCalendarForUrl('https://cal1.com/test.ics')).toBe(false);
      
      // New calendar should be registered
      const newCalendar = manager.getCalendarForAction('action1');
      expect(newCalendar?.refCount).toBe(1);
    });
  });

  describe('unregisterAction', () => {
    it('should unregister an action', () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      manager.unregisterAction('action1');
      
      expect(manager.getCalendarForAction('action1')).toBeUndefined();
    });

    it('should decrement refCount when unregistering', () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      manager.registerAction('action2', url);
      
      manager.unregisterAction('action1');
      
      const calendar = manager.getCalendarForAction('action2');
      expect(calendar?.refCount).toBe(1);
    });

    it('should cleanup calendar when refCount reaches 0', () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      manager.unregisterAction('action1');
      
      expect(manager.hasCalendarForUrl(url)).toBe(false);
    });

    it('should handle unregistering non-existent action gracefully', () => {
      expect(() => manager.unregisterAction('nonexistent')).not.toThrow();
    });
  });

  describe('getEventsForAction', () => {
    it('should return empty array for unregistered action', () => {
      const events = manager.getEventsForAction('nonexistent');
      expect(events).toEqual([]);
    });

    it('should return events from the action\'s calendar', async () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      
      // Wait for async update to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const events = manager.getEventsForAction('action1');
      expect(events.length).toBeGreaterThan(0);
    });
  });

  describe('getStatusForAction', () => {
    it('should return INIT for unregistered action', () => {
      const status = manager.getStatusForAction('nonexistent');
      expect(status).toBe('INIT');
    });

    it('should return calendar status for registered action', async () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      
      // Wait for async update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const status = manager.getStatusForAction('action1');
      expect(['LOADED', 'NO_EVENTS', 'LOADING']).toContain(status);
    });
  });

  describe('refreshCalendarForAction', () => {
    it('should refresh the calendar for an action', async () => {
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      
      // Wait for initial update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Track fetch calls
      const fetchCountBefore = mockFetch.mock.calls.length;
      
      await manager.refreshCalendarForAction('action1');
      
      // Should have made another fetch
      expect(mockFetch.mock.calls.length).toBeGreaterThan(fetchCountBefore);
    });

    it('should not throw for non-existent action', async () => {
      await expect(manager.refreshCalendarForAction('nonexistent')).resolves.not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
      
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      
      // Wait for async update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const status = manager.getStatusForAction('action1');
      expect(status).toBe('NETWORK_ERROR');
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });
      
      const url = 'https://calendar.google.com/test.ics';
      manager.registerAction('action1', url);
      
      // Wait for async update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const status = manager.getStatusForAction('action1');
      expect(status).toBe('NETWORK_ERROR');
    });

    it('should handle invalid URL', async () => {
      const url = 'not-a-valid-url';
      manager.registerAction('action1', url);
      
      // Wait for async update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const status = manager.getStatusForAction('action1');
      expect(status).toBe('INVALID_URL');
    });
  });

  describe('clear', () => {
    it('should clear all calendars and mappings', () => {
      manager.registerAction('action1', 'https://cal1.com/test.ics');
      manager.registerAction('action2', 'https://cal2.com/test.ics');
      
      manager.clear();
      
      expect(manager.getAllCalendars().size).toBe(0);
      expect(manager.getActionMappings().size).toBe(0);
    });
  });

  describe('concurrent actions', () => {
    it('should handle multiple actions registering simultaneously', () => {
      const url = 'https://calendar.google.com/shared.ics';
      
      // Simulate 5 buttons all using the same calendar
      for (let i = 0; i < 5; i++) {
        manager.registerAction(`action${i}`, url);
      }
      
      const calendar = manager.getCalendarForAction('action0');
      expect(calendar?.refCount).toBe(5);
      
      // All actions should share the same calendar
      for (let i = 0; i < 5; i++) {
        expect(manager.getCalendarForAction(`action${i}`)).toBe(calendar);
      }
    });

    it('should handle mixed URLs across actions', () => {
      manager.registerAction('action1', 'https://work.com/cal.ics');
      manager.registerAction('action2', 'https://personal.com/cal.ics');
      manager.registerAction('action3', 'https://work.com/cal.ics'); // Same as action1
      
      const workCal = manager.getCalendarForAction('action1');
      const personalCal = manager.getCalendarForAction('action2');
      const workCal2 = manager.getCalendarForAction('action3');
      
      expect(workCal).toBe(workCal2);
      expect(workCal).not.toBe(personalCal);
      expect(workCal?.refCount).toBe(2);
      expect(personalCal?.refCount).toBe(1);
    });
  });
});
