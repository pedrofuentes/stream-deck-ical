/**
 * Tests for Named Calendars feature
 * 
 * Tests the new Named Calendars approach where users define calendars once
 * with friendly names, then select by name per button.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock the @elgato/streamdeck module
vi.mock('@elgato/streamdeck', () => ({
  default: {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    },
    actions: {
      registerAction: vi.fn()
    },
    connect: vi.fn()
  },
  action: vi.fn((config) => (target: any) => target),
  SingletonAction: class {
    actions = new Map();
  }
}));

// Mock the logger
vi.mock('../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

// Mock the calendar service
vi.mock('../src/services/calendar-service', () => ({
  calendarCache: {
    version: 1,
    status: 'LOADED',
    events: [],
    lastFetch: Date.now(),
    provider: 'test'
  },
  getStatusText: vi.fn((status: string) => status),
  getSettings: vi.fn(() => ({ titleDisplayDuration: 15, flashOnMeetingStart: true })),
  forceRefreshCache: vi.fn()
}));

// Mock the calendar manager
vi.mock('../src/services/calendar-manager', () => ({
  calendarManager: {
    registerAction: vi.fn().mockReturnValue('calendar-1'),
    unregisterAction: vi.fn(),
    getEventsForAction: vi.fn().mockReturnValue([]),
    getCalendarForAction: vi.fn().mockReturnValue({
      cache: { status: 'LOADED', events: [], version: 1 }
    }),
    getStatusForAction: vi.fn().mockReturnValue('LOADED'),
    refreshCalendarForAction: vi.fn()
  }
}));

import { NamedCalendar, ActionSettings, GlobalSettings } from '../src/types/index';
import {
  setNamedCalendars,
  getNamedCalendar,
  getDefaultCalendar,
  getNamedCalendars,
  setGlobalCalendarConfig
} from '../src/actions/base-action';

describe('Named Calendars', () => {
  beforeEach(() => {
    // Reset named calendars before each test
    setNamedCalendars([], undefined);
    setGlobalCalendarConfig('', 3, true);
  });

  describe('NamedCalendar type', () => {
    it('should have required fields', () => {
      const calendar: NamedCalendar = {
        id: 'cal-1',
        name: 'Work',
        url: 'https://calendar.google.com/calendar/ical/work@example.com/basic.ics'
      };
      
      expect(calendar.id).toBe('cal-1');
      expect(calendar.name).toBe('Work');
      expect(calendar.url).toBe('https://calendar.google.com/calendar/ical/work@example.com/basic.ics');
    });
    
    it('should support optional override fields', () => {
      const calendar: NamedCalendar = {
        id: 'cal-2',
        name: 'Personal',
        url: 'https://calendar.google.com/calendar/ical/personal@example.com/basic.ics',
        timeWindow: 7,
        excludeAllDay: false
      };
      
      expect(calendar.timeWindow).toBe(7);
      expect(calendar.excludeAllDay).toBe(false);
    });
  });

  describe('setNamedCalendars', () => {
    it('should store named calendars', () => {
      const calendars: NamedCalendar[] = [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ];
      
      setNamedCalendars(calendars, 'cal-1');
      
      expect(getNamedCalendars()).toEqual(calendars);
    });
    
    it('should set the default calendar ID', () => {
      const calendars: NamedCalendar[] = [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ];
      
      setNamedCalendars(calendars, 'cal-2');
      
      const defaultCal = getDefaultCalendar();
      expect(defaultCal?.id).toBe('cal-2');
      expect(defaultCal?.name).toBe('Personal');
    });
    
    it('should handle empty calendars array', () => {
      setNamedCalendars([], undefined);
      
      expect(getNamedCalendars()).toEqual([]);
      expect(getDefaultCalendar()).toBeUndefined();
    });
  });

  describe('getNamedCalendar', () => {
    beforeEach(() => {
      const calendars: NamedCalendar[] = [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' },
        { id: 'cal-3', name: 'Team', url: 'https://team.ics', timeWindow: 5 }
      ];
      setNamedCalendars(calendars, 'cal-1');
    });
    
    it('should return calendar by ID', () => {
      const cal = getNamedCalendar('cal-2');
      expect(cal).toBeDefined();
      expect(cal?.name).toBe('Personal');
      expect(cal?.url).toBe('https://personal.ics');
    });
    
    it('should return undefined for non-existent ID', () => {
      const cal = getNamedCalendar('cal-999');
      expect(cal).toBeUndefined();
    });
    
    it('should return calendar with overrides', () => {
      const cal = getNamedCalendar('cal-3');
      expect(cal?.timeWindow).toBe(5);
    });
  });

  describe('getDefaultCalendar', () => {
    it('should return the calendar set as default', () => {
      const calendars: NamedCalendar[] = [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ];
      setNamedCalendars(calendars, 'cal-2');
      
      const defaultCal = getDefaultCalendar();
      expect(defaultCal?.id).toBe('cal-2');
    });
    
    it('should return first calendar if no default set', () => {
      const calendars: NamedCalendar[] = [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ];
      setNamedCalendars(calendars, undefined);
      
      const defaultCal = getDefaultCalendar();
      expect(defaultCal?.id).toBe('cal-1');
    });
    
    it('should return undefined if no calendars', () => {
      setNamedCalendars([], undefined);
      
      const defaultCal = getDefaultCalendar();
      expect(defaultCal).toBeUndefined();
    });
  });

  describe('ActionSettings with calendarId', () => {
    it('should support calendarId for named calendar selection', () => {
      const settings: ActionSettings = {
        calendarId: 'cal-2'
      };
      
      expect(settings.calendarId).toBe('cal-2');
    });
    
    it('should support legacy useCustomCalendar fields for backwards compat', () => {
      const settings: ActionSettings = {
        useCustomCalendar: true,
        customUrl: 'https://legacy.ics',
        customLabel: 'Legacy Calendar',
        customTimeWindow: 5,
        customExcludeAllDay: false
      };
      
      expect(settings.useCustomCalendar).toBe(true);
      expect(settings.customUrl).toBe('https://legacy.ics');
    });
  });

  describe('GlobalSettings with calendars', () => {
    it('should support calendars array', () => {
      const settings: GlobalSettings = {
        calendars: [
          { id: 'cal-1', name: 'Work', url: 'https://work.ics' }
        ],
        defaultCalendarId: 'cal-1',
        timeWindow: 3,
        excludeAllDay: true
      };
      
      expect(settings.calendars).toHaveLength(1);
      expect(settings.defaultCalendarId).toBe('cal-1');
    });
    
    it('should support legacy url field for backwards compat', () => {
      const settings: GlobalSettings = {
        url: 'https://legacy.ics',
        urlVersion: 1,
        timeWindow: 3
      };
      
      expect(settings.url).toBe('https://legacy.ics');
    });
  });
});

describe('Named Calendars Migration', () => {
  /**
   * Test the migration logic that would be in setup.js
   */
  function migrateOldSettings(globalSettings: any): any {
    if (globalSettings.calendars && globalSettings.calendars.length > 0) {
      return globalSettings;
    }
    
    if (globalSettings.url) {
      const defaultCal = {
        id: 'migrated-default',
        name: 'Default',
        url: globalSettings.url,
        timeWindow: globalSettings.timeWindow,
        excludeAllDay: globalSettings.excludeAllDay
      };
      
      return {
        ...globalSettings,
        calendars: [defaultCal],
        defaultCalendarId: defaultCal.id
      };
    }
    
    return globalSettings;
  }
  
  it('should migrate old single-URL format to named calendars', () => {
    const oldSettings = {
      url: 'https://old-calendar.ics',
      timeWindow: 5,
      excludeAllDay: false
    };
    
    const migrated = migrateOldSettings(oldSettings);
    
    expect(migrated.calendars).toHaveLength(1);
    expect(migrated.calendars[0].name).toBe('Default');
    expect(migrated.calendars[0].url).toBe('https://old-calendar.ics');
    expect(migrated.calendars[0].timeWindow).toBe(5);
    expect(migrated.calendars[0].excludeAllDay).toBe(false);
    expect(migrated.defaultCalendarId).toBe(migrated.calendars[0].id);
  });
  
  it('should not migrate if calendars already exist', () => {
    const newSettings = {
      url: 'https://legacy-url.ics',
      calendars: [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' }
      ],
      defaultCalendarId: 'cal-1'
    };
    
    const migrated = migrateOldSettings(newSettings);
    
    // Should not create new calendars
    expect(migrated.calendars).toHaveLength(1);
    expect(migrated.calendars[0].id).toBe('cal-1');
  });
  
  it('should handle empty settings', () => {
    const emptySettings = {};
    
    const migrated = migrateOldSettings(emptySettings);
    
    expect(migrated.calendars).toBeUndefined();
  });
});

describe('Calendar Selection Priority', () => {
  /**
   * Test the calendar selection logic from base-action.ts
   */
  function determineCalendarUrl(
    settings: ActionSettings | undefined,
    namedCalendars: NamedCalendar[],
    defaultCalendarId: string | undefined,
    globalUrl: string
  ): { url: string; source: string } | undefined {
    // Priority 1: calendarId in action settings
    if (settings?.calendarId) {
      const namedCal = namedCalendars.find(c => c.id === settings.calendarId);
      if (namedCal) {
        return { url: namedCal.url, source: 'named-calendar' };
      }
    }
    
    // Priority 2: Legacy useCustomCalendar
    if (settings?.useCustomCalendar && settings?.customUrl) {
      return { url: settings.customUrl, source: 'legacy-custom' };
    }
    
    // Priority 3: Default named calendar
    const defaultCal = defaultCalendarId 
      ? namedCalendars.find(c => c.id === defaultCalendarId)
      : namedCalendars[0];
    if (defaultCal) {
      return { url: defaultCal.url, source: 'default-named' };
    }
    
    // Priority 4: Legacy global URL
    if (globalUrl) {
      return { url: globalUrl, source: 'legacy-global' };
    }
    
    return undefined;
  }
  
  const namedCalendars: NamedCalendar[] = [
    { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
    { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
  ];
  
  it('should prioritize calendarId over everything', () => {
    const result = determineCalendarUrl(
      { calendarId: 'cal-2' },
      namedCalendars,
      'cal-1',
      'https://global.ics'
    );
    
    expect(result?.url).toBe('https://personal.ics');
    expect(result?.source).toBe('named-calendar');
  });
  
  it('should use legacy customUrl if calendarId not set', () => {
    const result = determineCalendarUrl(
      { useCustomCalendar: true, customUrl: 'https://custom.ics' },
      namedCalendars,
      'cal-1',
      'https://global.ics'
    );
    
    expect(result?.url).toBe('https://custom.ics');
    expect(result?.source).toBe('legacy-custom');
  });
  
  it('should use default named calendar if no action settings', () => {
    const result = determineCalendarUrl(
      undefined,
      namedCalendars,
      'cal-1',
      'https://global.ics'
    );
    
    expect(result?.url).toBe('https://work.ics');
    expect(result?.source).toBe('default-named');
  });
  
  it('should use first calendar if no default set', () => {
    const result = determineCalendarUrl(
      undefined,
      namedCalendars,
      undefined,
      'https://global.ics'
    );
    
    expect(result?.url).toBe('https://work.ics');
    expect(result?.source).toBe('default-named');
  });
  
  it('should fall back to legacy global URL', () => {
    const result = determineCalendarUrl(
      undefined,
      [],
      undefined,
      'https://global.ics'
    );
    
    expect(result?.url).toBe('https://global.ics');
    expect(result?.source).toBe('legacy-global');
  });
  
  it('should return undefined if no calendar available', () => {
    const result = determineCalendarUrl(
      undefined,
      [],
      undefined,
      ''
    );
    
    expect(result).toBeUndefined();
  });
  
  it('should ignore invalid calendarId', () => {
    const result = determineCalendarUrl(
      { calendarId: 'invalid-id' },
      namedCalendars,
      'cal-1',
      'https://global.ics'
    );
    
    // Falls through to default named calendar
    expect(result?.url).toBe('https://work.ics');
    expect(result?.source).toBe('default-named');
  });
});

describe('Property Inspector - Legacy URL Support', () => {
  /**
   * Test the PI logic that creates synthetic calendars from legacy URLs
   * This is what updateCalendarDropdown does in pi.js
   */
  function createCalendarListForDropdown(globalSettings: any): { calendars: NamedCalendar[]; defaultCalendarId: string | undefined } {
    let calendars = globalSettings.calendars || [];
    let defaultCalendarId = globalSettings.defaultCalendarId;
    
    // Handle legacy settings: if no calendars but we have a URL, create a synthetic entry
    if (calendars.length === 0 && globalSettings.url) {
      calendars = [{
        id: '__legacy__',
        name: 'Default Calendar',
        url: globalSettings.url
      }];
      defaultCalendarId = '__legacy__';
    }
    
    return { calendars, defaultCalendarId };
  }
  
  it('should create synthetic calendar from legacy URL', () => {
    const globalSettings = {
      url: 'https://legacy-calendar.ics',
      timeWindow: 3
    };
    
    const result = createCalendarListForDropdown(globalSettings);
    
    expect(result.calendars).toHaveLength(1);
    expect(result.calendars[0].id).toBe('__legacy__');
    expect(result.calendars[0].name).toBe('Default Calendar');
    expect(result.calendars[0].url).toBe('https://legacy-calendar.ics');
    expect(result.defaultCalendarId).toBe('__legacy__');
  });
  
  it('should use existing calendars when available', () => {
    const globalSettings = {
      url: 'https://legacy-calendar.ics',
      calendars: [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ],
      defaultCalendarId: 'cal-2'
    };
    
    const result = createCalendarListForDropdown(globalSettings);
    
    expect(result.calendars).toHaveLength(2);
    expect(result.calendars[0].id).toBe('cal-1');
    expect(result.defaultCalendarId).toBe('cal-2');
  });
  
  it('should return empty when no calendars and no URL', () => {
    const globalSettings = {
      timeWindow: 3
    };
    
    const result = createCalendarListForDropdown(globalSettings);
    
    expect(result.calendars).toHaveLength(0);
    expect(result.defaultCalendarId).toBeUndefined();
  });
});

describe('Property Inspector - Calendar Selection', () => {
  /**
   * Test the PI logic for determining which calendar is selected
   * This is what updateSelectedCalendar does in pi.js
   */
  function getSelectedCalendarId(
    actionSettings: ActionSettings | undefined,
    globalSettings: any
  ): string {
    let defaultCalendarId = globalSettings.defaultCalendarId;
    
    // Handle legacy URL
    if ((!globalSettings.calendars || globalSettings.calendars.length === 0) && globalSettings.url) {
      defaultCalendarId = '__legacy__';
    }
    
    // If no explicit selection, use the default calendar
    return actionSettings?.calendarId || defaultCalendarId || '';
  }
  
  it('should use explicit calendarId when set', () => {
    const actionSettings = { calendarId: 'cal-2' };
    const globalSettings = {
      calendars: [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ],
      defaultCalendarId: 'cal-1'
    };
    
    const selected = getSelectedCalendarId(actionSettings, globalSettings);
    
    expect(selected).toBe('cal-2');
  });
  
  it('should use default calendar when no explicit selection', () => {
    const actionSettings = {};
    const globalSettings = {
      calendars: [
        { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
        { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
      ],
      defaultCalendarId: 'cal-2'
    };
    
    const selected = getSelectedCalendarId(actionSettings, globalSettings);
    
    expect(selected).toBe('cal-2');
  });
  
  it('should use legacy calendar ID when only legacy URL exists', () => {
    const actionSettings = {};
    const globalSettings = {
      url: 'https://legacy.ics'
    };
    
    const selected = getSelectedCalendarId(actionSettings, globalSettings);
    
    expect(selected).toBe('__legacy__');
  });
  
  it('should return empty string when no calendars at all', () => {
    const actionSettings = {};
    const globalSettings = {};
    
    const selected = getSelectedCalendarId(actionSettings, globalSettings);
    
    expect(selected).toBe('');
  });
});

describe('Property Inspector - Dropdown Rendering', () => {
  /**
   * Test the dropdown rendering logic from pi.js
   */
  function renderDropdownOptions(
    calendars: NamedCalendar[],
    defaultCalendarId: string | undefined
  ): { value: string; text: string }[] {
    const options: { value: string; text: string }[] = [];
    
    // Simply list all calendars - mark default with ★
    calendars.forEach(cal => {
      options.push({
        value: cal.id,
        text: cal.name + (cal.id === defaultCalendarId ? ' ★' : '')
      });
    });
    
    return options;
  }
  
  it('should render single calendar without duplication', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Default', url: 'https://default.ics' }
    ];
    
    const options = renderDropdownOptions(calendars, 'cal-1');
    
    expect(options).toHaveLength(1);
    expect(options[0].value).toBe('cal-1');
    expect(options[0].text).toBe('Default ★');
  });
  
  it('should render multiple calendars with star on default', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' },
      { id: 'cal-3', name: 'Team', url: 'https://team.ics' }
    ];
    
    const options = renderDropdownOptions(calendars, 'cal-2');
    
    expect(options).toHaveLength(3);
    expect(options[0].text).toBe('Work');
    expect(options[1].text).toBe('Personal ★');
    expect(options[2].text).toBe('Team');
  });
  
  it('should handle no default calendar', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
    ];
    
    const options = renderDropdownOptions(calendars, undefined);
    
    expect(options).toHaveLength(2);
    expect(options[0].text).toBe('Work');
    expect(options[1].text).toBe('Personal');
    // No stars when no default set
  });
  
  it('should render legacy synthetic calendar', () => {
    const calendars: NamedCalendar[] = [
      { id: '__legacy__', name: 'Default Calendar', url: 'https://legacy.ics' }
    ];
    
    const options = renderDropdownOptions(calendars, '__legacy__');
    
    expect(options).toHaveLength(1);
    expect(options[0].value).toBe('__legacy__');
    expect(options[0].text).toBe('Default Calendar ★');
  });
});

describe('Setup - Auto-Save Calendars', () => {
  /**
   * Test the auto-save logic from setup.js
   */
  function buildGlobalSettingsForAutoSave(
    calendars: NamedCalendar[],
    defaultCalendarId: string | undefined,
    formValues: {
      timeWindow: number;
      excludeAllDay: boolean;
      titleDisplayDuration: number;
      flashOnMeetingStart: boolean;
    },
    currentUrlVersion: number
  ): any {
    return {
      calendars: calendars,
      defaultCalendarId: defaultCalendarId,
      url: calendars.find(c => c.id === defaultCalendarId)?.url || calendars[0]?.url || '',
      urlVersion: currentUrlVersion + 1,
      timeWindow: formValues.timeWindow,
      excludeAllDay: formValues.excludeAllDay,
      titleDisplayDuration: formValues.titleDisplayDuration,
      flashOnMeetingStart: formValues.flashOnMeetingStart
    };
  }
  
  it('should build settings with all calendars', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
    ];
    
    const settings = buildGlobalSettingsForAutoSave(
      calendars,
      'cal-1',
      { timeWindow: 3, excludeAllDay: true, titleDisplayDuration: 15, flashOnMeetingStart: false },
      5
    );
    
    expect(settings.calendars).toHaveLength(2);
    expect(settings.defaultCalendarId).toBe('cal-1');
    expect(settings.url).toBe('https://work.ics'); // Legacy URL from default calendar
    expect(settings.urlVersion).toBe(6); // Incremented
  });
  
  it('should increment urlVersion to trigger refresh', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' }
    ];
    
    const settings = buildGlobalSettingsForAutoSave(
      calendars,
      'cal-1',
      { timeWindow: 3, excludeAllDay: true, titleDisplayDuration: 15, flashOnMeetingStart: false },
      10
    );
    
    expect(settings.urlVersion).toBe(11);
  });
  
  it('should use first calendar URL as legacy URL when no default set', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
    ];
    
    const settings = buildGlobalSettingsForAutoSave(
      calendars,
      undefined,
      { timeWindow: 3, excludeAllDay: true, titleDisplayDuration: 15, flashOnMeetingStart: false },
      0
    );
    
    expect(settings.url).toBe('https://work.ics');
  });
  
  it('should handle empty calendars', () => {
    const settings = buildGlobalSettingsForAutoSave(
      [],
      undefined,
      { timeWindow: 3, excludeAllDay: true, titleDisplayDuration: 15, flashOnMeetingStart: false },
      0
    );
    
    expect(settings.calendars).toHaveLength(0);
    expect(settings.defaultCalendarId).toBeUndefined();
    expect(settings.url).toBe('');
  });
  
  it('should preserve form values in settings', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' }
    ];
    
    const settings = buildGlobalSettingsForAutoSave(
      calendars,
      'cal-1',
      { timeWindow: 7, excludeAllDay: false, titleDisplayDuration: 30, flashOnMeetingStart: true },
      0
    );
    
    expect(settings.timeWindow).toBe(7);
    expect(settings.excludeAllDay).toBe(false);
    expect(settings.titleDisplayDuration).toBe(30);
    expect(settings.flashOnMeetingStart).toBe(true);
  });
});

describe('Setup - Calendar CRUD Operations', () => {
  /**
   * Test calendar add/edit/delete operations from setup.js
   */
  
  function generateId(): string {
    return 'cal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  function addCalendar(
    calendars: NamedCalendar[],
    name: string,
    url: string,
    defaultCalendarId: string | undefined
  ): { calendars: NamedCalendar[]; defaultCalendarId: string | undefined; newId: string } {
    const newCal: NamedCalendar = {
      id: generateId(),
      name: name,
      url: url
    };
    
    const newCalendars = [...calendars, newCal];
    
    // If this is the first calendar, make it the default
    const newDefaultId = calendars.length === 0 ? newCal.id : defaultCalendarId;
    
    return { calendars: newCalendars, defaultCalendarId: newDefaultId, newId: newCal.id };
  }
  
  function deleteCalendar(
    calendars: NamedCalendar[],
    idToDelete: string,
    defaultCalendarId: string | undefined
  ): { calendars: NamedCalendar[]; defaultCalendarId: string | undefined } {
    const newCalendars = calendars.filter(c => c.id !== idToDelete);
    
    // If deleted calendar was default, set new default
    let newDefaultId = defaultCalendarId;
    if (defaultCalendarId === idToDelete) {
      newDefaultId = newCalendars.length > 0 ? newCalendars[0].id : undefined;
    }
    
    return { calendars: newCalendars, defaultCalendarId: newDefaultId };
  }
  
  it('should add calendar and set as default if first', () => {
    const result = addCalendar([], 'Work', 'https://work.ics', undefined);
    
    expect(result.calendars).toHaveLength(1);
    expect(result.calendars[0].name).toBe('Work');
    expect(result.defaultCalendarId).toBe(result.newId);
  });
  
  it('should add calendar without changing default if not first', () => {
    const existing: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' }
    ];
    
    const result = addCalendar(existing, 'Personal', 'https://personal.ics', 'cal-1');
    
    expect(result.calendars).toHaveLength(2);
    expect(result.defaultCalendarId).toBe('cal-1'); // Unchanged
  });
  
  it('should delete calendar and update default if needed', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
    ];
    
    const result = deleteCalendar(calendars, 'cal-1', 'cal-1');
    
    expect(result.calendars).toHaveLength(1);
    expect(result.calendars[0].id).toBe('cal-2');
    expect(result.defaultCalendarId).toBe('cal-2'); // Updated to next available
  });
  
  it('should delete calendar without changing default if not default', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' },
      { id: 'cal-2', name: 'Personal', url: 'https://personal.ics' }
    ];
    
    const result = deleteCalendar(calendars, 'cal-2', 'cal-1');
    
    expect(result.calendars).toHaveLength(1);
    expect(result.defaultCalendarId).toBe('cal-1'); // Unchanged
  });
  
  it('should set default to undefined when deleting last calendar', () => {
    const calendars: NamedCalendar[] = [
      { id: 'cal-1', name: 'Work', url: 'https://work.ics' }
    ];
    
    const result = deleteCalendar(calendars, 'cal-1', 'cal-1');
    
    expect(result.calendars).toHaveLength(0);
    expect(result.defaultCalendarId).toBeUndefined();
  });
});
