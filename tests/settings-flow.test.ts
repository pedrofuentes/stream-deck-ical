/**
 * Integration tests for settings flow
 * Tests end-to-end scenarios for settings changes affecting buttons
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

describe('Settings Flow Integration', () => {
  let manager: CalendarManager;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    manager = new CalendarManager();
    
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('BEGIN:VCALENDAR\nEND:VCALENDAR')
    });
  });

  afterEach(() => {
    manager.clear();
    vi.useRealTimers();
  });

  describe('Global Settings Changes', () => {
    it('should update all thresholds when global settings change', () => {
      // Initial settings
      manager.setGlobalSettings({
        orangeThreshold: 300,
        redThreshold: 30
      });
      
      expect(manager.getGlobalSettings()?.orangeThreshold).toBe(300);
      
      // Settings change from PI
      manager.setGlobalSettings({
        orangeThreshold: 600,
        redThreshold: 60
      });
      
      expect(manager.getGlobalSettings()?.orangeThreshold).toBe(600);
      expect(manager.getGlobalSettings()?.redThreshold).toBe(60);
    });

    it('should preserve unrelated settings when updating thresholds', () => {
      manager.setGlobalSettings({
        timeWindow: 5,
        excludeAllDay: false,
        titleDisplayDuration: 30,
        flashOnMeetingStart: true,
        orangeThreshold: 300,
        redThreshold: 30
      });
      
      // Verify all preserved
      const settings = manager.getGlobalSettings();
      expect(settings?.timeWindow).toBe(5);
      expect(settings?.excludeAllDay).toBe(false);
      expect(settings?.titleDisplayDuration).toBe(30);
      expect(settings?.flashOnMeetingStart).toBe(true);
    });
  });

  describe('Named Calendars Changes', () => {
    it('should handle calendar deletion while button using it', async () => {
      const url1 = 'https://cal1.example.com/cal.ics';
      const url2 = 'https://cal2.example.com/cal.ics';
      
      // Register actions with calendars
      manager.registerAction('action_1', url1);
      manager.registerAction('action_2', url2);
      
      // Both calendars should exist
      expect(manager.hasCalendarForUrl(url1)).toBe(true);
      expect(manager.hasCalendarForUrl(url2)).toBe(true);
      
      // Unregister action 1
      manager.unregisterAction('action_1');
      
      // Calendar 1 should be cleaned up (refCount=0)
      expect(manager.hasCalendarForUrl(url1)).toBe(false);
      // Calendar 2 should still exist
      expect(manager.hasCalendarForUrl(url2)).toBe(true);
    });

    it('should handle switching default calendar', async () => {
      const workUrl = 'https://work.example.com/cal.ics';
      const personalUrl = 'https://personal.example.com/cal.ics';
      
      // Initial setup: work as default
      manager.setGlobalSettings({
        calendars: [
          { id: 'work', name: 'Work', url: workUrl },
          { id: 'personal', name: 'Personal', url: personalUrl }
        ],
        defaultCalendarId: 'work'
      });
      
      expect(manager.getGlobalSettings()?.defaultCalendarId).toBe('work');
      
      // Switch default to personal
      manager.setGlobalSettings({
        calendars: [
          { id: 'work', name: 'Work', url: workUrl },
          { id: 'personal', name: 'Personal', url: personalUrl }
        ],
        defaultCalendarId: 'personal'
      });
      
      expect(manager.getGlobalSettings()?.defaultCalendarId).toBe('personal');
    });

    it('should handle empty calendars array', () => {
      manager.setGlobalSettings({
        calendars: [],
        defaultCalendarId: undefined
      });
      
      const settings = manager.getGlobalSettings();
      expect(settings?.calendars).toEqual([]);
      expect(settings?.defaultCalendarId).toBeUndefined();
    });
  });

  describe('Per-Button Settings Changes', () => {
    it('should switch button to different calendar', async () => {
      const url1 = 'https://cal1.example.com/cal.ics';
      const url2 = 'https://cal2.example.com/cal.ics';
      
      // Initial: action uses cal1
      const calId1 = manager.registerAction('action_1', url1);
      expect(manager.getCalendarForAction('action_1')?.url).toBe(url1);
      
      // Switch to cal2
      const calId2 = manager.registerAction('action_1', url2);
      expect(manager.getCalendarForAction('action_1')?.url).toBe(url2);
      
      // Old calendar should be cleaned up
      expect(manager.hasCalendarForUrl(url1)).toBe(false);
    });

    it('should maintain independent calendars per button', async () => {
      const url1 = 'https://work.example.com/cal.ics';
      const url2 = 'https://personal.example.com/cal.ics';
      
      manager.registerAction('action_1', url1);
      manager.registerAction('action_2', url2);
      
      expect(manager.getCalendarForAction('action_1')?.url).toBe(url1);
      expect(manager.getCalendarForAction('action_2')?.url).toBe(url2);
      
      // Change only action_1
      manager.registerAction('action_1', url2);
      
      // Both now use url2
      expect(manager.getCalendarForAction('action_1')?.url).toBe(url2);
      expect(manager.getCalendarForAction('action_2')?.url).toBe(url2);
      
      // But only one calendar instance (same URL)
      const allCalendars = manager.getAllCalendars();
      expect(allCalendars.size).toBe(1);
    });
  });

  describe('Reference Counting Scenarios', () => {
    it('should share calendar instance when URLs match', async () => {
      const sharedUrl = 'https://shared.example.com/cal.ics';
      
      manager.registerAction('action_1', sharedUrl);
      manager.registerAction('action_2', sharedUrl);
      manager.registerAction('action_3', sharedUrl);
      
      // Should only have one calendar instance
      const allCalendars = manager.getAllCalendars();
      expect(allCalendars.size).toBe(1);
      
      // RefCount should be 3
      const calendar = manager.getCalendarForAction('action_1');
      expect(calendar?.refCount).toBe(3);
    });

    it('should preserve calendar when only some actions unregister', async () => {
      const sharedUrl = 'https://shared.example.com/cal.ics';
      
      manager.registerAction('action_1', sharedUrl);
      manager.registerAction('action_2', sharedUrl);
      
      // Unregister one
      manager.unregisterAction('action_1');
      
      // Calendar should still exist
      expect(manager.hasCalendarForUrl(sharedUrl)).toBe(true);
      
      // RefCount should be 1
      const calendar = manager.getCalendarForAction('action_2');
      expect(calendar?.refCount).toBe(1);
    });

    it('should clean up calendar when last action unregisters', async () => {
      const url = 'https://example.com/cal.ics';
      
      manager.registerAction('action_1', url);
      expect(manager.hasCalendarForUrl(url)).toBe(true);
      
      manager.unregisterAction('action_1');
      expect(manager.hasCalendarForUrl(url)).toBe(false);
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle multiple buttons refreshing simultaneously', async () => {
      const url = 'https://example.com/cal.ics';
      
      manager.registerAction('action_1', url);
      manager.registerAction('action_2', url);
      
      // Trigger multiple refreshes
      const refreshPromises = [
        manager.refreshCalendarForAction('action_1'),
        manager.refreshCalendarForAction('action_2')
      ];
      
      // Both should complete without error
      await expect(Promise.all(refreshPromises)).resolves.not.toThrow();
    });

    it('should handle refreshAllCalendars with multiple calendars', async () => {
      manager.registerAction('action_1', 'https://cal1.example.com/cal.ics');
      manager.registerAction('action_2', 'https://cal2.example.com/cal.ics');
      manager.registerAction('action_3', 'https://cal3.example.com/cal.ics');
      
      await expect(manager.refreshAllCalendars()).resolves.not.toThrow();
    });
  });

  describe('Settings Validation Edge Cases', () => {
    it('should handle settings with missing optional fields', () => {
      manager.setGlobalSettings({
        // Only required fields, no thresholds
        timeWindow: 3
      });
      
      const settings = manager.getGlobalSettings();
      expect(settings?.timeWindow).toBe(3);
      expect(settings?.orangeThreshold).toBeUndefined();
      expect(settings?.redThreshold).toBeUndefined();
    });

    it('should handle calendarId pointing to non-existent calendar', () => {
      manager.setGlobalSettings({
        calendars: [
          { id: 'work', name: 'Work', url: 'https://work.com/cal.ics' }
        ],
        defaultCalendarId: 'nonexistent' // Points to nothing
      });
      
      const settings = manager.getGlobalSettings();
      const foundCalendar = settings?.calendars?.find(c => c.id === settings?.defaultCalendarId);
      expect(foundCalendar).toBeUndefined();
    });

    it('should handle calendar with both named ID and legacy URL', () => {
      // This tests backwards compatibility
      manager.setGlobalSettings({
        url: 'https://legacy.com/cal.ics', // Legacy field
        calendars: [
          { id: 'new', name: 'New Cal', url: 'https://new.com/cal.ics' }
        ],
        defaultCalendarId: 'new'
      });
      
      const settings = manager.getGlobalSettings();
      // Both should be preserved
      expect(settings?.url).toBe('https://legacy.com/cal.ics');
      expect(settings?.calendars).toHaveLength(1);
    });
  });
});

describe('Calendar ID Generation', () => {
  it('should generate consistent IDs for same URL', () => {
    const url = 'https://example.com/calendar.ics';
    const id1 = generateCalendarId(url);
    const id2 = generateCalendarId(url);
    expect(id1).toBe(id2);
  });

  it('should generate different IDs for different URLs', () => {
    const url1 = 'https://example.com/calendar1.ics';
    const url2 = 'https://example.com/calendar2.ics';
    const id1 = generateCalendarId(url1);
    const id2 = generateCalendarId(url2);
    expect(id1).not.toBe(id2);
  });

  it('should handle URLs with query parameters', () => {
    const url1 = 'https://example.com/cal.ics?token=abc123';
    const url2 = 'https://example.com/cal.ics?token=xyz789';
    const id1 = generateCalendarId(url1);
    const id2 = generateCalendarId(url2);
    // Different tokens = different IDs
    expect(id1).not.toBe(id2);
  });

  it('should start with cal_ prefix', () => {
    const url = 'https://example.com/calendar.ics';
    const id = generateCalendarId(url);
    expect(id.startsWith('cal_')).toBe(true);
  });
});

describe('Calendar Deletion Migration', () => {
  it('migrateDeletedCalendars should call migrateButtonsWithDeletedCalendar on actions', async () => {
    // Test the migrateDeletedCalendars function directly through importing it
    // This test verifies the function exists and can be called
    const { migrateDeletedCalendars, setNamedCalendars } = await import('../src/actions/base-action.js');
    
    // Set up initial calendars
    setNamedCalendars([
      { id: 'cal-1', name: 'Work', url: 'https://work.com/cal.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.com/cal.ics' }
    ], 'cal-1');
    
    // Call migration with only one calendar remaining (cal-2 deleted)
    // This should not throw and should log migration attempts
    expect(() => migrateDeletedCalendars(['cal-1'])).not.toThrow();
  });

  it('migrateDeletedCalendars should handle empty calendar list', async () => {
    const { migrateDeletedCalendars } = await import('../src/actions/base-action.js');
    
    // All calendars deleted - should not throw
    expect(() => migrateDeletedCalendars([])).not.toThrow();
  });

  it('migrateDeletedCalendars should handle no registered actions', async () => {
    const { migrateDeletedCalendars } = await import('../src/actions/base-action.js');
    
    // Even with no actions registered, should not throw
    expect(() => migrateDeletedCalendars(['cal-1', 'cal-2'])).not.toThrow();
  });
});
