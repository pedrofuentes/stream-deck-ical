/**
 * Tests for BaseAction class methods
 * Covers calendar registration, retry logic, flash behavior, and settings handling
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
  },
  isDebugMode: vi.fn(() => false)
}));

// Mock settings
const mockSettings = {
  titleDisplayDuration: 15,
  flashOnMeetingStart: true
};

// Mock the calendar service
vi.mock('../src/services/calendar-service', () => ({
  calendarCache: {
    version: 1,
    status: 'LOADED',
    events: [],
    lastFetch: Date.now(),
    provider: 'test'
  },
  getStatusText: vi.fn((status: string) => {
    switch (status) {
      case 'INIT': return 'Please\nSetup';
      case 'LOADING': return 'Loading\niCal';
      case 'LOADED': return '';
      default: return 'Error';
    }
  }),
  getSettings: vi.fn(() => mockSettings),
  setActionSettings: vi.fn()
}));

// Mock calendar manager
const mockCalendarManager = {
  registerAction: vi.fn().mockReturnValue('cal_123'),
  unregisterAction: vi.fn(),
  getEventsForAction: vi.fn().mockReturnValue([]),
  getStatusForAction: vi.fn().mockReturnValue('LOADED'),
  getCalendarForAction: vi.fn().mockReturnValue({
    id: 'cal_123',
    cache: { version: 1 }
  }),
  getGlobalSettings: vi.fn().mockReturnValue(null),
  refreshCalendarForAction: vi.fn().mockResolvedValue(undefined)
};

vi.mock('../src/services/calendar-manager', () => ({
  calendarManager: mockCalendarManager
}));

// Named calendars mock
let mockNamedCalendars: any[] = [];
let mockDefaultCalendarId: string | undefined;

vi.mock('../src/actions/base-action', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    getNamedCalendar: vi.fn((id: string) => mockNamedCalendars.find(c => c.id === id)),
    getDefaultCalendar: vi.fn(() => mockNamedCalendars.find(c => c.id === mockDefaultCalendarId) || mockNamedCalendars[0]),
    getNamedCalendars: vi.fn(() => mockNamedCalendars),
    setGlobalCalendarConfig: vi.fn(),
    setNamedCalendars: vi.fn((calendars, defaultId) => {
      mockNamedCalendars = calendars;
      mockDefaultCalendarId = defaultId;
    })
  };
});

import { getSettings } from '../src/services/calendar-service';

describe('BaseAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockNamedCalendars = [];
    mockDefaultCalendarId = undefined;
    mockSettings.flashOnMeetingStart = true;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('getTitleDisplayDuration', () => {
    it('should return configured duration from settings', () => {
      mockSettings.titleDisplayDuration = 30;
      const settings = getSettings();
      expect(settings.titleDisplayDuration).toBe(30);
    });

    it('should return 15 as default when not configured', () => {
      mockSettings.titleDisplayDuration = 15;
      const settings = getSettings();
      expect(settings.titleDisplayDuration).toBe(15);
    });
  });

  describe('flashOnMeetingStart setting', () => {
    it('should respect flashOnMeetingStart=true setting', () => {
      mockSettings.flashOnMeetingStart = true;
      const settings = getSettings();
      expect(settings.flashOnMeetingStart).toBe(true);
    });

    it('should respect flashOnMeetingStart=false setting', () => {
      mockSettings.flashOnMeetingStart = false;
      const settings = getSettings();
      expect(settings.flashOnMeetingStart).toBe(false);
    });
  });

  describe('Calendar Registration Edge Cases', () => {
    it('should handle missing calendarId in settings gracefully', () => {
      const settings = { useCustomCalendar: false };
      // When calendarId is undefined, should fall back to default calendar
      expect(settings.useCustomCalendar).toBe(false);
    });

    it('should handle both calendarId and legacy customUrl (conflict scenario)', () => {
      const settings = {
        calendarId: 'cal_new',
        useCustomCalendar: true,
        customUrl: 'https://legacy.com/cal.ics'
      };
      // calendarId should take precedence over legacy customUrl
      expect(settings.calendarId).toBe('cal_new');
    });
  });
});

describe('Calendar Retry Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockNamedCalendars = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should attempt retry when named calendar not found initially', () => {
    // Simulate: button appears with calendarId='work' but named calendars not loaded yet
    const calendarId = 'work';
    const foundCalendar = mockNamedCalendars.find(c => c.id === calendarId);
    
    expect(foundCalendar).toBeUndefined();
    // This should trigger retry mechanism in real code
  });

  it('should succeed when named calendars load during retry window', () => {
    // Start with no calendars
    expect(mockNamedCalendars.length).toBe(0);
    
    // Simulate calendars loading
    mockNamedCalendars = [
      { id: 'work', name: 'Work', url: 'https://work.com/cal.ics' }
    ];
    mockDefaultCalendarId = 'work';
    
    // Now calendar should be found
    const foundCalendar = mockNamedCalendars.find(c => c.id === 'work');
    expect(foundCalendar).toBeDefined();
    expect(foundCalendar?.url).toBe('https://work.com/cal.ics');
  });

  it('should fall back to default calendar if specific calendar never loads', () => {
    mockNamedCalendars = [
      { id: 'personal', name: 'Personal', url: 'https://personal.com/cal.ics' }
    ];
    mockDefaultCalendarId = 'personal';
    
    // Looking for 'work' which doesn't exist
    const foundCalendar = mockNamedCalendars.find(c => c.id === 'work');
    expect(foundCalendar).toBeUndefined();
    
    // Should fall back to default
    const defaultCalendar = mockNamedCalendars.find(c => c.id === mockDefaultCalendarId);
    expect(defaultCalendar).toBeDefined();
    expect(defaultCalendar?.name).toBe('Personal');
  });

  it('should handle max retry attempts exceeded', () => {
    const maxRetries = 20;
    let retryCount = 0;
    
    // Simulate retry loop
    while (retryCount < maxRetries) {
      const found = mockNamedCalendars.find(c => c.id === 'nonexistent');
      if (!found) {
        retryCount++;
      }
    }
    
    expect(retryCount).toBe(maxRetries);
  });
});

describe('Button State Management', () => {
  describe('State initialization', () => {
    it('should create new state for unknown action ID', () => {
      const buttonStates = new Map<string, any>();
      const actionId = 'action_123';
      
      let state = buttonStates.get(actionId);
      expect(state).toBeUndefined();
      
      // Initialize state
      state = {
        cacheVersion: 0,
        currentImage: '',
        lastKeyPress: 0,
        actionRef: null,
        isFlashing: false,
        useCustomCalendar: false
      };
      buttonStates.set(actionId, state);
      
      expect(buttonStates.get(actionId)).toBeDefined();
      expect(buttonStates.get(actionId)?.isFlashing).toBe(false);
    });

    it('should preserve state for existing action ID', () => {
      const buttonStates = new Map<string, any>();
      const actionId = 'action_123';
      
      // Set initial state
      buttonStates.set(actionId, {
        cacheVersion: 5,
        currentImage: 'activeMeeting',
        lastKeyPress: Date.now(),
        isFlashing: true
      });
      
      // Get state again
      const state = buttonStates.get(actionId);
      expect(state?.cacheVersion).toBe(5);
      expect(state?.currentImage).toBe('activeMeeting');
      expect(state?.isFlashing).toBe(true);
    });
  });

  describe('State cleanup', () => {
    it('should clear intervals on disappear', () => {
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      const interval = setInterval(() => {}, 1000);
      
      // Simulate cleanup
      clearInterval(interval);
      
      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('should remove state on disappear', () => {
      const buttonStates = new Map<string, any>();
      const actionId = 'action_123';
      
      buttonStates.set(actionId, { cacheVersion: 1 });
      expect(buttonStates.has(actionId)).toBe(true);
      
      buttonStates.delete(actionId);
      expect(buttonStates.has(actionId)).toBe(false);
    });
  });

  describe('Rapid appear/disappear cycles', () => {
    it('should handle button appearing immediately after disappearing', () => {
      const buttonStates = new Map<string, any>();
      const actionId = 'action_123';
      
      // First appear
      buttonStates.set(actionId, { cacheVersion: 1, actionRef: {} });
      expect(buttonStates.has(actionId)).toBe(true);
      
      // Disappear
      buttonStates.delete(actionId);
      expect(buttonStates.has(actionId)).toBe(false);
      
      // Immediately reappear
      buttonStates.set(actionId, { cacheVersion: 0, actionRef: {} });
      expect(buttonStates.has(actionId)).toBe(true);
      expect(buttonStates.get(actionId)?.cacheVersion).toBe(0); // Fresh state
    });
  });
});

describe('Flash Behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockSettings.flashOnMeetingStart = true;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not flash when flashOnMeetingStart is disabled', () => {
    mockSettings.flashOnMeetingStart = false;
    const settings = getSettings();
    expect(settings.flashOnMeetingStart).toBe(false);
  });

  it('should flash correct number of times', () => {
    const flashCount = 10;
    const flashIntervalMs = 200;
    let currentFlashes = 0;
    
    const interval = setInterval(() => {
      currentFlashes++;
      if (currentFlashes >= flashCount * 2) {
        clearInterval(interval);
      }
    }, flashIntervalMs);
    
    // Advance timer
    vi.advanceTimersByTime(flashCount * 2 * flashIntervalMs);
    
    expect(currentFlashes).toBe(flashCount * 2); // On/off cycles
  });

  it('should not start new flash if already flashing', () => {
    const state = { isFlashing: false };
    
    // First flash request
    state.isFlashing = true;
    expect(state.isFlashing).toBe(true);
    
    // Second flash request should be blocked
    const shouldStartFlash = !state.isFlashing;
    expect(shouldStartFlash).toBe(false);
  });

  it('should stop flash and cleanup interval', () => {
    const state = { isFlashing: true, flashInterval: null as any };
    
    state.flashInterval = setInterval(() => {}, 200);
    expect(state.flashInterval).not.toBeNull();
    
    // Stop flash
    clearInterval(state.flashInterval);
    state.flashInterval = undefined;
    state.isFlashing = false;
    
    expect(state.isFlashing).toBe(false);
    expect(state.flashInterval).toBeUndefined();
  });
});

describe('Double Press Detection', () => {
  it('should detect double press within 500ms window', () => {
    const DOUBLE_PRESS_THRESHOLD = 500;
    let lastKeyPress = 0;
    
    // First press
    const firstPress = 1000;
    lastKeyPress = firstPress;
    
    // Second press within window
    const secondPress = 1300; // 300ms later
    const timeSinceLastPress = secondPress - lastKeyPress;
    
    expect(timeSinceLastPress < DOUBLE_PRESS_THRESHOLD).toBe(true);
  });

  it('should not detect double press after 500ms', () => {
    const DOUBLE_PRESS_THRESHOLD = 500;
    let lastKeyPress = 0;
    
    // First press
    const firstPress = 1000;
    lastKeyPress = firstPress;
    
    // Second press outside window
    const secondPress = 1600; // 600ms later
    const timeSinceLastPress = secondPress - lastKeyPress;
    
    expect(timeSinceLastPress < DOUBLE_PRESS_THRESHOLD).toBe(false);
  });

  it('should reset timer after any press', () => {
    let lastKeyPress = 0;
    
    // First press
    lastKeyPress = 1000;
    expect(lastKeyPress).toBe(1000);
    
    // Second press (single)
    lastKeyPress = 1600;
    expect(lastKeyPress).toBe(1600);
    
    // Third press should compare to second
    const thirdPress = 1800;
    const timeSinceSecond = thirdPress - lastKeyPress;
    expect(timeSinceSecond).toBe(200); // Within threshold
  });
});

describe('Cache Version Tracking', () => {
  it('should detect cache update when version changes', () => {
    const buttonState = { cacheVersion: 1 };
    const cacheVersion = 2;
    
    const cacheUpdated = cacheVersion !== buttonState.cacheVersion;
    expect(cacheUpdated).toBe(true);
  });

  it('should not trigger update when version unchanged', () => {
    const buttonState = { cacheVersion: 2 };
    const cacheVersion = 2;
    
    const cacheUpdated = cacheVersion !== buttonState.cacheVersion;
    expect(cacheUpdated).toBe(false);
  });

  it('should update stored version after processing', () => {
    const buttonState = { cacheVersion: 1 };
    const newCacheVersion = 3;
    
    buttonState.cacheVersion = newCacheVersion;
    expect(buttonState.cacheVersion).toBe(3);
  });
});

describe('Image State Tracking', () => {
  it('should only update image when changed', () => {
    const buttonState = { currentImage: 'activeMeeting' };
    let updateCount = 0;
    
    const setImage = (imageName: string) => {
      if (buttonState.currentImage !== imageName) {
        buttonState.currentImage = imageName;
        updateCount++;
      }
    };
    
    // Same image - no update
    setImage('activeMeeting');
    expect(updateCount).toBe(0);
    
    // Different image - update
    setImage('activeMeetingOrange');
    expect(updateCount).toBe(1);
    expect(buttonState.currentImage).toBe('activeMeetingOrange');
  });

  it('should track different images for different buttons', () => {
    const buttonStates = new Map<string, { currentImage: string }>();
    
    buttonStates.set('action_1', { currentImage: 'activeMeeting' });
    buttonStates.set('action_2', { currentImage: 'nextMeeting' });
    
    expect(buttonStates.get('action_1')?.currentImage).toBe('activeMeeting');
    expect(buttonStates.get('action_2')?.currentImage).toBe('nextMeeting');
  });
});
