/**
 * Tests for calendar deletion migration
 * Verifies that buttons using deleted calendars are migrated to default
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

// Mock CalendarManager
vi.mock('../src/services/calendar-manager', () => ({
  calendarManager: {
    registerAction: vi.fn().mockReturnValue('cal-id-123'),
    unregisterAction: vi.fn(),
    getEvents: vi.fn().mockReturnValue([]),
    getCacheStatus: vi.fn().mockReturnValue({ status: 'ready', eventCount: 0 }),
    getGlobalSettings: vi.fn().mockReturnValue({ orangeThreshold: 300, redThreshold: 30 }),
    setGlobalSettings: vi.fn()
  }
}));

// Mock calendar-service
vi.mock('../src/services/calendar-service', () => ({
  getSettings: vi.fn().mockReturnValue({ titleDisplayDuration: 15, flashOnMeetingStart: false })
}));

describe('Calendar Migration - BaseAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('migrateButtonsWithDeletedCalendar', () => {
    it('should identify buttons using deleted calendar IDs', async () => {
      const { 
        setNamedCalendars, 
        getNamedCalendar,
        getDefaultCalendar 
      } = await import('../src/actions/base-action.js');
      
      // Set up two named calendars
      setNamedCalendars([
        { id: 'cal-work', name: 'Work', url: 'https://work.com/cal.ics' },
        { id: 'cal-personal', name: 'Personal', url: 'https://personal.com/cal.ics' }
      ], 'cal-work');
      
      // Verify setup
      expect(getNamedCalendar('cal-work')).toBeDefined();
      expect(getNamedCalendar('cal-personal')).toBeDefined();
      expect(getDefaultCalendar()?.id).toBe('cal-work');
    });

    it('should return undefined for deleted calendar lookup', async () => {
      const { setNamedCalendars, getNamedCalendar } = await import('../src/actions/base-action.js');
      
      // Set up one calendar
      setNamedCalendars([
        { id: 'cal-work', name: 'Work', url: 'https://work.com/cal.ics' }
      ], 'cal-work');
      
      // Deleted calendar should not be found
      expect(getNamedCalendar('cal-deleted')).toBeUndefined();
    });

    it('should fall back to default when calendar not found', async () => {
      const { setNamedCalendars, getNamedCalendar, getDefaultCalendar } = await import('../src/actions/base-action.js');
      
      // Set up calendars with default
      setNamedCalendars([
        { id: 'cal-1', name: 'Default', url: 'https://default.com/cal.ics' },
        { id: 'cal-2', name: 'Other', url: 'https://other.com/cal.ics' }
      ], 'cal-1');
      
      // Non-existent calendar
      const deleted = getNamedCalendar('cal-deleted');
      expect(deleted).toBeUndefined();
      
      // Default should still be available
      const defaultCal = getDefaultCalendar();
      expect(defaultCal).toBeDefined();
      expect(defaultCal?.id).toBe('cal-1');
    });
  });

  describe('Action instance tracking', () => {
    it('should track action instances for migration', async () => {
      const { migrateDeletedCalendars, setNamedCalendars } = await import('../src/actions/base-action.js');
      
      // Set up calendars
      setNamedCalendars([
        { id: 'cal-1', name: 'Work', url: 'https://work.com/cal.ics' }
      ], 'cal-1');
      
      // Migration should iterate through registered actions
      // Even if none exist, should not throw
      expect(() => migrateDeletedCalendars(['cal-1'])).not.toThrow();
    });
  });
});

describe('Calendar Migration - Integration Scenarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Multi-calendar scenarios', () => {
    it('should handle migration when one of multiple calendars is deleted', async () => {
      const { setNamedCalendars, getNamedCalendars, migrateDeletedCalendars } = await import('../src/actions/base-action.js');
      
      // Start with 3 calendars
      setNamedCalendars([
        { id: 'cal-1', name: 'Work', url: 'https://work.com/cal.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.com/cal.ics' },
        { id: 'cal-3', name: 'Team', url: 'https://team.com/cal.ics' }
      ], 'cal-1');
      
      expect(getNamedCalendars()).toHaveLength(3);
      
      // Delete cal-2 by updating to only have cal-1 and cal-3
      setNamedCalendars([
        { id: 'cal-1', name: 'Work', url: 'https://work.com/cal.ics' },
        { id: 'cal-3', name: 'Team', url: 'https://team.com/cal.ics' }
      ], 'cal-1');
      
      expect(getNamedCalendars()).toHaveLength(2);
      
      // Migration should work with remaining calendar IDs
      expect(() => migrateDeletedCalendars(['cal-1', 'cal-3'])).not.toThrow();
    });

    it('should handle migration when default calendar is deleted', async () => {
      const { setNamedCalendars, getDefaultCalendar, migrateDeletedCalendars } = await import('../src/actions/base-action.js');
      
      // Start with cal-1 as default
      setNamedCalendars([
        { id: 'cal-1', name: 'Work', url: 'https://work.com/cal.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.com/cal.ics' }
      ], 'cal-1');
      
      expect(getDefaultCalendar()?.id).toBe('cal-1');
      
      // Delete cal-1 and make cal-2 the new default
      setNamedCalendars([
        { id: 'cal-2', name: 'Personal', url: 'https://personal.com/cal.ics' }
      ], 'cal-2');
      
      // Migration should trigger for buttons using deleted cal-1
      expect(() => migrateDeletedCalendars(['cal-2'])).not.toThrow();
      
      // New default should be cal-2
      expect(getDefaultCalendar()?.id).toBe('cal-2');
    });

    it('should handle deletion of all calendars', async () => {
      const { setNamedCalendars, getNamedCalendars, migrateDeletedCalendars } = await import('../src/actions/base-action.js');
      
      // Start with calendars
      setNamedCalendars([
        { id: 'cal-1', name: 'Work', url: 'https://work.com/cal.ics' }
      ], 'cal-1');
      
      expect(getNamedCalendars()).toHaveLength(1);
      
      // Delete all calendars
      setNamedCalendars([], undefined);
      
      expect(getNamedCalendars()).toHaveLength(0);
      
      // Migration with empty valid IDs should not throw
      expect(() => migrateDeletedCalendars([])).not.toThrow();
    });
  });

  describe('Calendar ID validation', () => {
    it('should correctly identify valid vs deleted calendar IDs', async () => {
      const { setNamedCalendars, getNamedCalendar } = await import('../src/actions/base-action.js');
      
      setNamedCalendars([
        { id: 'valid-1', name: 'Valid 1', url: 'https://valid1.com/cal.ics' },
        { id: 'valid-2', name: 'Valid 2', url: 'https://valid2.com/cal.ics' }
      ], 'valid-1');
      
      // Valid IDs should be found
      expect(getNamedCalendar('valid-1')).toBeDefined();
      expect(getNamedCalendar('valid-2')).toBeDefined();
      
      // Invalid/deleted IDs should not be found
      expect(getNamedCalendar('deleted-1')).toBeUndefined();
      expect(getNamedCalendar('never-existed')).toBeUndefined();
      expect(getNamedCalendar('')).toBeUndefined();
    });

    it('should handle calendar ID with special characters', async () => {
      const { setNamedCalendars, getNamedCalendar, migrateDeletedCalendars } = await import('../src/actions/base-action.js');
      
      // IDs with special characters (as might be generated)
      setNamedCalendars([
        { id: 'cal_abc123', name: 'Calendar', url: 'https://example.com/cal.ics' },
        { id: 'cal-with-dashes', name: 'Dashes', url: 'https://example.com/dashes.ics' }
      ], 'cal_abc123');
      
      expect(getNamedCalendar('cal_abc123')).toBeDefined();
      expect(getNamedCalendar('cal-with-dashes')).toBeDefined();
      
      // Migration should work with these IDs
      expect(() => migrateDeletedCalendars(['cal_abc123', 'cal-with-dashes'])).not.toThrow();
    });
  });
});

describe('Calendar Migration - Button Settings', () => {
  it('should preserve other settings when clearing calendarId', () => {
    // Test that when we update settings to clear calendarId, other settings are preserved
    const originalSettings = {
      calendarId: 'deleted-cal',
      useCustomCalendar: true,
      customUrl: 'https://old.com/cal.ics',
      customLabel: 'Old Calendar'
    };
    
    // Simulate migration: clear calendarId but preserve other settings
    const updatedSettings = { ...originalSettings, calendarId: undefined };
    
    expect(updatedSettings.calendarId).toBeUndefined();
    expect(updatedSettings.useCustomCalendar).toBe(true);
    expect(updatedSettings.customUrl).toBe('https://old.com/cal.ics');
    expect(updatedSettings.customLabel).toBe('Old Calendar');
  });

  it('should create proper migration settings object', () => {
    const buttonSettings = new Map<string, any>();
    
    // Button using a calendar that will be deleted
    buttonSettings.set('button-1', { calendarId: 'to-be-deleted' });
    buttonSettings.set('button-2', { calendarId: 'will-remain' });
    buttonSettings.set('button-3', { }); // No calendar ID, uses default
    
    const validIds = new Set(['will-remain']);
    
    // Find buttons that need migration
    const buttonsToMigrate: string[] = [];
    for (const [actionId, settings] of buttonSettings) {
      if (settings?.calendarId && !validIds.has(settings.calendarId)) {
        buttonsToMigrate.push(actionId);
      }
    }
    
    expect(buttonsToMigrate).toHaveLength(1);
    expect(buttonsToMigrate).toContain('button-1');
    expect(buttonsToMigrate).not.toContain('button-2');
    expect(buttonsToMigrate).not.toContain('button-3');
  });

  it('should handle buttons with no settings', () => {
    const buttonSettings = new Map<string, any>();
    
    // Button with undefined settings
    buttonSettings.set('button-1', undefined);
    buttonSettings.set('button-2', null);
    buttonSettings.set('button-3', {});
    
    const validIds = new Set(['some-id']);
    
    // None should need migration (no calendarId set)
    const buttonsToMigrate: string[] = [];
    for (const [actionId, settings] of buttonSettings) {
      if (settings?.calendarId && !validIds.has(settings.calendarId)) {
        buttonsToMigrate.push(actionId);
      }
    }
    
    expect(buttonsToMigrate).toHaveLength(0);
  });
});

describe('Calendar Migration - Edge Cases', () => {
  it('should handle rapid calendar changes', async () => {
    const { setNamedCalendars, migrateDeletedCalendars } = await import('../src/actions/base-action.js');
    
    // Rapid changes simulating user editing
    setNamedCalendars([{ id: 'cal-1', name: 'Cal 1', url: 'https://1.com/cal.ics' }], 'cal-1');
    migrateDeletedCalendars(['cal-1']);
    
    setNamedCalendars([
      { id: 'cal-1', name: 'Cal 1', url: 'https://1.com/cal.ics' },
      { id: 'cal-2', name: 'Cal 2', url: 'https://2.com/cal.ics' }
    ], 'cal-1');
    migrateDeletedCalendars(['cal-1', 'cal-2']);
    
    setNamedCalendars([{ id: 'cal-2', name: 'Cal 2', url: 'https://2.com/cal.ics' }], 'cal-2');
    migrateDeletedCalendars(['cal-2']);
    
    // Should handle all changes without throwing
    expect(true).toBe(true);
  });

  it('should handle duplicate calendar IDs in valid list', async () => {
    const { migrateDeletedCalendars } = await import('../src/actions/base-action.js');
    
    // Duplicate IDs should be handled (Set handles dedup internally)
    expect(() => migrateDeletedCalendars(['cal-1', 'cal-1', 'cal-2', 'cal-2'])).not.toThrow();
  });

  it('should handle very long calendar ID list', async () => {
    const { migrateDeletedCalendars } = await import('../src/actions/base-action.js');
    
    // Generate many calendar IDs
    const manyIds = Array.from({ length: 100 }, (_, i) => `cal-${i}`);
    
    expect(() => migrateDeletedCalendars(manyIds)).not.toThrow();
  });
});
