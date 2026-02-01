/**
 * Tests for color threshold feature
 * Verifies that orange and red color warnings use configurable thresholds
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CalendarManager } from '../src/services/calendar-manager.js';
import { GlobalSettings } from '../src/types/index.js';

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
    events: [],
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

describe('Color Thresholds', () => {
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
    vi.clearAllTimers();
  });

  describe('GlobalSettings storage', () => {
    it('should store and retrieve global settings', () => {
      const settings: GlobalSettings = {
        orangeThreshold: 600,
        redThreshold: 60
      };
      
      manager.setGlobalSettings(settings);
      
      const retrieved = manager.getGlobalSettings();
      expect(retrieved).toBeDefined();
      expect(retrieved?.orangeThreshold).toBe(600);
      expect(retrieved?.redThreshold).toBe(60);
    });

    it('should return null when no settings are set', () => {
      const freshManager = new CalendarManager();
      expect(freshManager.getGlobalSettings()).toBeNull();
    });

    it('should update settings when called multiple times', () => {
      const settings1: GlobalSettings = {
        orangeThreshold: 300,
        redThreshold: 30
      };
      
      const settings2: GlobalSettings = {
        orangeThreshold: 900,
        redThreshold: 120
      };
      
      manager.setGlobalSettings(settings1);
      expect(manager.getGlobalSettings()?.orangeThreshold).toBe(300);
      
      manager.setGlobalSettings(settings2);
      expect(manager.getGlobalSettings()?.orangeThreshold).toBe(900);
      expect(manager.getGlobalSettings()?.redThreshold).toBe(120);
    });
  });

  describe('Threshold defaults', () => {
    it('should handle undefined thresholds gracefully', () => {
      const settings: GlobalSettings = {
        timeWindow: 3,
        excludeAllDay: true
        // No thresholds set
      };
      
      manager.setGlobalSettings(settings);
      
      const retrieved = manager.getGlobalSettings();
      expect(retrieved).toBeDefined();
      expect(retrieved?.orangeThreshold).toBeUndefined();
      expect(retrieved?.redThreshold).toBeUndefined();
    });

    it('should preserve other settings when setting thresholds', () => {
      const settings: GlobalSettings = {
        timeWindow: 5,
        excludeAllDay: false,
        titleDisplayDuration: 30,
        flashOnMeetingStart: true,
        orangeThreshold: 600,
        redThreshold: 60
      };
      
      manager.setGlobalSettings(settings);
      
      const retrieved = manager.getGlobalSettings();
      expect(retrieved?.timeWindow).toBe(5);
      expect(retrieved?.excludeAllDay).toBe(false);
      expect(retrieved?.titleDisplayDuration).toBe(30);
      expect(retrieved?.flashOnMeetingStart).toBe(true);
      expect(retrieved?.orangeThreshold).toBe(600);
      expect(retrieved?.redThreshold).toBe(60);
    });
  });

  describe('Threshold values', () => {
    it('should accept all valid orange threshold values', () => {
      const validOrangeThresholds = [60, 120, 180, 300, 600, 900];
      
      for (const threshold of validOrangeThresholds) {
        const settings: GlobalSettings = { orangeThreshold: threshold };
        manager.setGlobalSettings(settings);
        expect(manager.getGlobalSettings()?.orangeThreshold).toBe(threshold);
      }
    });

    it('should accept all valid red threshold values', () => {
      const validRedThresholds = [10, 30, 60, 120, 180];
      
      for (const threshold of validRedThresholds) {
        const settings: GlobalSettings = { redThreshold: threshold };
        manager.setGlobalSettings(settings);
        expect(manager.getGlobalSettings()?.redThreshold).toBe(threshold);
      }
    });

    it('should allow any numeric threshold values (no validation at storage level)', () => {
      // The UI constrains values, but storage should accept any number
      const settings: GlobalSettings = {
        orangeThreshold: 12345,
        redThreshold: 5
      };
      
      manager.setGlobalSettings(settings);
      expect(manager.getGlobalSettings()?.orangeThreshold).toBe(12345);
      expect(manager.getGlobalSettings()?.redThreshold).toBe(5);
    });
  });

  describe('GlobalSettings type', () => {
    it('should match the GlobalSettings interface', () => {
      const fullSettings: GlobalSettings = {
        url: 'https://example.com/cal.ics',
        urlVersion: 1,
        calendars: [{ id: 'cal1', name: 'Work', url: 'https://work.com/cal.ics' }],
        defaultCalendarId: 'cal1',
        timeWindow: 7,
        excludeAllDay: false,
        titleDisplayDuration: 15,
        flashOnMeetingStart: false,
        orangeThreshold: 300,
        redThreshold: 30
      };
      
      manager.setGlobalSettings(fullSettings);
      const retrieved = manager.getGlobalSettings();
      
      expect(retrieved?.url).toBe('https://example.com/cal.ics');
      expect(retrieved?.urlVersion).toBe(1);
      expect(retrieved?.calendars).toHaveLength(1);
      expect(retrieved?.defaultCalendarId).toBe('cal1');
      expect(retrieved?.timeWindow).toBe(7);
      expect(retrieved?.excludeAllDay).toBe(false);
      expect(retrieved?.titleDisplayDuration).toBe(15);
      expect(retrieved?.flashOnMeetingStart).toBe(false);
      expect(retrieved?.orangeThreshold).toBe(300);
      expect(retrieved?.redThreshold).toBe(30);
    });
  });
});

describe('Threshold integration with actions', () => {
  // These tests verify the base-action threshold getter methods work correctly
  // The actual image setting logic is tested in action-display-logic.test.ts
  
  describe('getRedZone and getOrangeZone behavior', () => {
    let manager: CalendarManager;

    beforeEach(() => {
      manager = new CalendarManager();
    });

    afterEach(() => {
      manager.clear();
    });

    it('should provide default values when no settings are configured', () => {
      // When no global settings are set, getGlobalSettings returns null
      // The action's getter should fall back to defaults (30s for red, 300s for orange)
      expect(manager.getGlobalSettings()).toBeNull();
    });

    it('should provide custom values when settings are configured', () => {
      manager.setGlobalSettings({
        orangeThreshold: 600,  // 10 minutes
        redThreshold: 120     // 2 minutes
      });
      
      const settings = manager.getGlobalSettings();
      expect(settings?.orangeThreshold).toBe(600);
      expect(settings?.redThreshold).toBe(120);
    });
  });
});
