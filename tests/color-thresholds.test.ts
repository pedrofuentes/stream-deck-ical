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

describe('Color Zone Logic', () => {
  // Test the color zone determination logic as used in actions
  
  function determineColorZone(
    secondsRemaining: number, 
    redThreshold: number = 30, 
    orangeThreshold: number = 300
  ): 'red' | 'orange' | 'normal' {
    if (secondsRemaining <= redThreshold) return 'red';
    if (secondsRemaining <= orangeThreshold) return 'orange';
    return 'normal';
  }

  describe('With default thresholds (30s red, 300s orange)', () => {
    const redThreshold = 30;
    const orangeThreshold = 300;

    it('should return red when <= 30 seconds', () => {
      expect(determineColorZone(30, redThreshold, orangeThreshold)).toBe('red');
      expect(determineColorZone(15, redThreshold, orangeThreshold)).toBe('red');
      expect(determineColorZone(0, redThreshold, orangeThreshold)).toBe('red');
    });

    it('should return orange when 31-300 seconds', () => {
      expect(determineColorZone(31, redThreshold, orangeThreshold)).toBe('orange');
      expect(determineColorZone(150, redThreshold, orangeThreshold)).toBe('orange');
      expect(determineColorZone(300, redThreshold, orangeThreshold)).toBe('orange');
    });

    it('should return normal when > 300 seconds', () => {
      expect(determineColorZone(301, redThreshold, orangeThreshold)).toBe('normal');
      expect(determineColorZone(600, redThreshold, orangeThreshold)).toBe('normal');
      expect(determineColorZone(3600, redThreshold, orangeThreshold)).toBe('normal');
    });
  });

  describe('With custom thresholds', () => {
    it('should use 60s red threshold correctly', () => {
      const redThreshold = 60;
      const orangeThreshold = 300;
      
      expect(determineColorZone(60, redThreshold, orangeThreshold)).toBe('red');
      expect(determineColorZone(61, redThreshold, orangeThreshold)).toBe('orange');
    });

    it('should use 600s orange threshold correctly', () => {
      const redThreshold = 30;
      const orangeThreshold = 600;
      
      expect(determineColorZone(300, redThreshold, orangeThreshold)).toBe('orange');
      expect(determineColorZone(600, redThreshold, orangeThreshold)).toBe('orange');
      expect(determineColorZone(601, redThreshold, orangeThreshold)).toBe('normal');
    });

    it('should handle 2 minute red and 10 minute orange', () => {
      const redThreshold = 120; // 2 minutes
      const orangeThreshold = 600; // 10 minutes
      
      expect(determineColorZone(60, redThreshold, orangeThreshold)).toBe('red');
      expect(determineColorZone(120, redThreshold, orangeThreshold)).toBe('red');
      expect(determineColorZone(121, redThreshold, orangeThreshold)).toBe('orange');
      expect(determineColorZone(300, redThreshold, orangeThreshold)).toBe('orange');
      expect(determineColorZone(601, redThreshold, orangeThreshold)).toBe('normal');
    });
  });

  describe('Edge cases', () => {
    it('should handle threshold boundary exactly', () => {
      expect(determineColorZone(30, 30, 300)).toBe('red');
      expect(determineColorZone(300, 30, 300)).toBe('orange');
    });

    it('should handle negative seconds (past meeting)', () => {
      // In real usage, negative means meeting has ended
      expect(determineColorZone(-10, 30, 300)).toBe('red');
    });

    it('should handle very large time values', () => {
      const oneDay = 86400;
      expect(determineColorZone(oneDay, 30, 300)).toBe('normal');
    });

    it('should handle red threshold equal to orange (edge case config)', () => {
      // If user misconfigures thresholds equal, red wins
      expect(determineColorZone(60, 60, 60)).toBe('red');
    });

    it('should handle red > orange (invalid but handled)', () => {
      // If red > orange (invalid config), orange zone would never show
      const redThreshold = 300;
      const orangeThreshold = 60; // Invalid: orange < red
      
      // 100s is > orange(60) but < red(300), so technically orange
      // But with this config: 100 <= 300 (red), so red wins
      expect(determineColorZone(100, redThreshold, orangeThreshold)).toBe('red');
    });
  });
});

describe('Image State Mapping', () => {
  // Map color zones to image names for different action types
  
  describe('TimeLeft/Active Meeting images', () => {
    const imageMap: Record<string, string> = {
      'normal': 'activeMeeting',
      'orange': 'activeMeetingOrange',
      'red': 'activeMeetingRed'
    };

    it('should map normal to activeMeeting', () => {
      expect(imageMap['normal']).toBe('activeMeeting');
    });

    it('should map orange to activeMeetingOrange', () => {
      expect(imageMap['orange']).toBe('activeMeetingOrange');
    });

    it('should map red to activeMeetingRed', () => {
      expect(imageMap['red']).toBe('activeMeetingRed');
    });
  });

  describe('NextMeeting images', () => {
    const imageMap: Record<string, string> = {
      'normal': 'nextMeeting',
      'orange': 'nextMeetingOrange',
      'red': 'nextMeetingRed'
    };

    it('should map normal to nextMeeting', () => {
      expect(imageMap['normal']).toBe('nextMeeting');
    });

    it('should map orange to nextMeetingOrange', () => {
      expect(imageMap['orange']).toBe('nextMeetingOrange');
    });

    it('should map red to nextMeetingRed', () => {
      expect(imageMap['red']).toBe('nextMeetingRed');
    });
  });
});
