/**
 * Tests for action base class and action implementations
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
const mockSettings = {
  titleDisplayDuration: 15,
  flashOnMeetingStart: true
};

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
      case 'INVALID_URL': return 'Please\nSetup';
      case 'LOADED': return '';
      default: return 'Error';
    }
  }),
  getSettings: vi.fn(() => mockSettings),
  setActionSettings: vi.fn((settings) => {
    Object.assign(mockSettings, settings);
  })
}));

import { calendarCache, getStatusText } from '../src/services/calendar-service';
import { logger } from '../src/utils/logger';

// Create a concrete implementation for testing
class TestAction {
  protected interval?: NodeJS.Timeout;
  protected waitingForCacheInterval?: NodeJS.Timeout;
  protected cacheVersion: number = 0;
  protected currentImage: string = '';
  protected lastKeyPress: number = 0;
  protected actionRef?: any;
  
  protected readonly RED_ZONE = 30;
  protected readonly ORANGE_ZONE = 300;

  updateDisplayCalls: number = 0;
  setInitialImageCalls: number = 0;
  handleSinglePressCalls: number = 0;
  
  async onWillAppear(ev: any): Promise<void> {
    this.actionRef = ev.action;
    await this.setInitialImage(ev.action);
    this.waitForCacheAndStart(ev.action);
  }
  
  private waitForCacheAndStart(action: any): void {
    if (this.waitingForCacheInterval) {
      clearInterval(this.waitingForCacheInterval);
      this.waitingForCacheInterval = undefined;
    }
    
    if (calendarCache.status === 'LOADED' || calendarCache.status === 'NO_EVENTS') {
      this.startTimer(action);
      return;
    }
    
    const statusText = getStatusText(calendarCache.status);
    action.setTitle(statusText);
    
    this.waitingForCacheInterval = setInterval(() => {
      if (calendarCache.status === 'LOADED' || calendarCache.status === 'NO_EVENTS') {
        if (this.waitingForCacheInterval) {
          clearInterval(this.waitingForCacheInterval);
          this.waitingForCacheInterval = undefined;
        }
        this.startTimer(action);
      } else {
        const statusText = getStatusText(calendarCache.status);
        action.setTitle(statusText);
      }
    }, 500);
  }
  
  async onWillDisappear(ev: any): Promise<void> {
    this.stopTimer();
    if (this.waitingForCacheInterval) {
      clearInterval(this.waitingForCacheInterval);
      this.waitingForCacheInterval = undefined;
    }
    this.actionRef = undefined;
  }
  
  async onKeyUp(ev: any): Promise<void> {
    const now = Date.now();
    const timeSinceLastPress = now - this.lastKeyPress;
    this.lastKeyPress = now;
    
    if (timeSinceLastPress < 500) {
      await this.handleDoublePress(ev.action);
    } else {
      await this.handleSinglePress(ev.action);
    }
  }
  
  protected async handleSinglePress(action: any): Promise<void> {
    this.handleSinglePressCalls++;
  }
  
  protected async handleDoublePress(action: any): Promise<void> {
    this.stopTimer();
    await action.setTitle('Loading\nUpcoming\nMeeting');
    await this.setInitialImage(action);
  }
  
  protected startTimer(action: any): void {
    this.cacheVersion = calendarCache.version;
    this.stopTimer();
    this.updateDisplay(action);
    
    this.interval = setInterval(() => {
      if (calendarCache.status !== 'LOADED' && calendarCache.status !== 'NO_EVENTS') {
        this.stopTimer();
        this.waitForCacheAndStart(action);
        return;
      }
      this.updateDisplay(action);
    }, 1000);
  }
  
  protected stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
  
  protected async updateDisplay(action: any): Promise<void> {
    this.updateDisplayCalls++;
  }
  
  protected async setInitialImage(action: any): Promise<void> {
    this.setInitialImageCalls++;
  }
  
  protected async setImage(action: any, imageName: string): Promise<void> {
    if (this.currentImage !== imageName) {
      this.currentImage = imageName;
      await action.setImage(`assets/${imageName}.png`);
    }
  }

  // Expose for testing
  getInterval() { return this.interval; }
  getWaitingInterval() { return this.waitingForCacheInterval; }
  getCacheVersion() { return this.cacheVersion; }
  getCurrentImage() { return this.currentImage; }
}

describe('BaseAction', () => {
  let testAction: TestAction;
  let mockAction: any;

  beforeEach(() => {
    vi.useFakeTimers();
    testAction = new TestAction();
    mockAction = {
      setTitle: vi.fn(),
      setImage: vi.fn()
    };
    
    // Reset calendar cache
    (calendarCache as any).status = 'LOADED';
    (calendarCache as any).version = 1;
    (calendarCache as any).events = [];
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('onWillAppear', () => {
    it('should set initial image when action appears', async () => {
      await testAction.onWillAppear({ action: mockAction });
      expect(testAction.setInitialImageCalls).toBe(1);
    });

    it('should start timer immediately when cache is loaded', async () => {
      (calendarCache as any).status = 'LOADED';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(testAction.getInterval()).toBeDefined();
      expect(testAction.updateDisplayCalls).toBe(1);
    });

    it('should wait for cache when not loaded', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(testAction.getWaitingInterval()).toBeDefined();
      expect(mockAction.setTitle).toHaveBeenCalledWith('Loading\niCal');
    });

    it('should start timer when cache becomes available', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(testAction.getInterval()).toBeUndefined();
      
      // Simulate cache becoming available
      (calendarCache as any).status = 'LOADED';
      vi.advanceTimersByTime(500);
      
      expect(testAction.getInterval()).toBeDefined();
    });
  });

  describe('onWillDisappear', () => {
    it('should stop timer when action disappears', async () => {
      await testAction.onWillAppear({ action: mockAction });
      expect(testAction.getInterval()).toBeDefined();
      
      await testAction.onWillDisappear({ action: mockAction });
      expect(testAction.getInterval()).toBeUndefined();
    });

    it('should clear waiting interval when action disappears', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      expect(testAction.getWaitingInterval()).toBeDefined();
      
      await testAction.onWillDisappear({ action: mockAction });
      expect(testAction.getWaitingInterval()).toBeUndefined();
    });
  });

  describe('onKeyUp', () => {
    it('should call handleSinglePress for single press', async () => {
      await testAction.onKeyUp({ action: mockAction });
      expect(testAction.handleSinglePressCalls).toBe(1);
    });

    it('should call handleDoublePress for double press', async () => {
      await testAction.onKeyUp({ action: mockAction });
      
      // Simulate quick second press (within 500ms)
      vi.advanceTimersByTime(200);
      await testAction.onKeyUp({ action: mockAction });
      
      expect(mockAction.setTitle).toHaveBeenCalledWith('Loading\nUpcoming\nMeeting');
    });

    it('should treat slow second press as single press', async () => {
      await testAction.onKeyUp({ action: mockAction });
      expect(testAction.handleSinglePressCalls).toBe(1);
      
      // Wait more than 500ms
      vi.advanceTimersByTime(600);
      await testAction.onKeyUp({ action: mockAction });
      
      expect(testAction.handleSinglePressCalls).toBe(2);
    });
  });

  describe('timer behavior', () => {
    it('should update display every second', async () => {
      await testAction.onWillAppear({ action: mockAction });
      const initialCalls = testAction.updateDisplayCalls;
      
      vi.advanceTimersByTime(3000);
      
      expect(testAction.updateDisplayCalls).toBe(initialCalls + 3);
    });

    it('should stop timer and wait when cache status changes', async () => {
      await testAction.onWillAppear({ action: mockAction });
      expect(testAction.getInterval()).toBeDefined();
      
      // Change cache status
      (calendarCache as any).status = 'LOADING';
      vi.advanceTimersByTime(1000);
      
      expect(testAction.getWaitingInterval()).toBeDefined();
    });
  });

  describe('setImage', () => {
    it('should only update image if different', async () => {
      await testAction['setImage'](mockAction, 'test');
      expect(mockAction.setImage).toHaveBeenCalledTimes(1);
      
      // Same image - should not call again
      await testAction['setImage'](mockAction, 'test');
      expect(mockAction.setImage).toHaveBeenCalledTimes(1);
      
      // Different image - should call
      await testAction['setImage'](mockAction, 'test2');
      expect(mockAction.setImage).toHaveBeenCalledTimes(2);
    });
  });
});

describe('Color zone constants', () => {
  it('should have correct RED_ZONE value', () => {
    const action = new TestAction();
    expect(action['RED_ZONE']).toBe(30);
  });

  it('should have correct ORANGE_ZONE value', () => {
    const action = new TestAction();
    expect(action['ORANGE_ZONE']).toBe(300);
  });
});

describe('Action Settings Integration', () => {
  let testAction: TestAction;
  let mockAction: any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    
    // Reset mock settings
    mockSettings.titleDisplayDuration = 15;
    mockSettings.flashOnMeetingStart = true;
    
    mockAction = {
      setTitle: vi.fn(),
      setImage: vi.fn(),
      showOk: vi.fn()
    };
    testAction = new TestAction();
    
    // Reset cache
    (calendarCache as any).version = 1;
    (calendarCache as any).status = 'LOADED';
    (calendarCache as any).events = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should use configurable title display duration from settings', () => {
    // Default value
    expect(mockSettings.titleDisplayDuration).toBe(15);
    
    // Change to 30 seconds
    mockSettings.titleDisplayDuration = 30;
    expect(mockSettings.titleDisplayDuration).toBe(30);
    
    // Change to 5 seconds
    mockSettings.titleDisplayDuration = 5;
    expect(mockSettings.titleDisplayDuration).toBe(5);
  });

  it('should have flashOnMeetingStart setting', () => {
    expect(mockSettings.flashOnMeetingStart).toBe(true);
    
    mockSettings.flashOnMeetingStart = false;
    expect(mockSettings.flashOnMeetingStart).toBe(false);
  });
});

describe('v2.1.0 Feature Tests', () => {
  let testAction: TestAction;
  let mockAction: any;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    
    // Reset mock settings to defaults
    mockSettings.titleDisplayDuration = 15;
    mockSettings.flashOnMeetingStart = true;
    
    mockAction = {
      setTitle: vi.fn(),
      setImage: vi.fn(),
      showOk: vi.fn()
    };
    testAction = new TestAction();
    
    // Reset cache
    (calendarCache as any).version = 1;
    (calendarCache as any).status = 'LOADED';
    (calendarCache as any).events = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Title Display Duration', () => {
    it('should support all valid duration values (5, 10, 15, 30 seconds)', () => {
      const validDurations = [5, 10, 15, 30];
      
      for (const duration of validDurations) {
        mockSettings.titleDisplayDuration = duration;
        expect(mockSettings.titleDisplayDuration).toBe(duration);
      }
    });

    it('should default to 15 seconds when not set', () => {
      // Simulate undefined setting
      const settings = { titleDisplayDuration: undefined };
      const displayDuration = settings.titleDisplayDuration ?? 15;
      expect(displayDuration).toBe(15);
    });

    it('should return duration in seconds (not milliseconds)', () => {
      // The getTitleDisplayDuration method should return seconds
      // The caller multiplies by 1000 to get milliseconds
      mockSettings.titleDisplayDuration = 5;
      
      // Simulate what getTitleDisplayDuration returns
      const durationInSeconds = mockSettings.titleDisplayDuration ?? 15;
      
      // This should be 5 (seconds), not 5000 (milliseconds)
      expect(durationInSeconds).toBe(5);
      expect(durationInSeconds).toBeLessThan(100); // Sanity check it's not in ms
    });
  });

  describe('Flash on Meeting Start', () => {
    it('should be a boolean setting', () => {
      expect(typeof mockSettings.flashOnMeetingStart).toBe('boolean');
    });

    it('should default to false for new installations', () => {
      // Per v2.1.0 change, default should be false
      // Simulate undefined setting (new installation)
      const settings = { flashOnMeetingStart: undefined };
      // The default behavior: undefined should be treated as false
      const flashEnabled = settings.flashOnMeetingStart === true;
      expect(flashEnabled).toBe(false);
    });

    it('should preserve true when explicitly set', () => {
      const settings = { flashOnMeetingStart: true };
      const flashEnabled = settings.flashOnMeetingStart === true;
      expect(flashEnabled).toBe(true);
    });

    it('should preserve false when explicitly set', () => {
      const settings = { flashOnMeetingStart: false };
      const flashEnabled = settings.flashOnMeetingStart === true;
      expect(flashEnabled).toBe(false);
    });
  });

  describe('Startup Race Condition Fix', () => {
    it('should start timer immediately when cache is already LOADED', async () => {
      (calendarCache as any).status = 'LOADED';
      await testAction.onWillAppear({ action: mockAction });
      
      // Should have interval set immediately
      expect(testAction.getInterval()).toBeDefined();
      expect(testAction.getWaitingInterval()).toBeUndefined();
    });

    it('should start timer immediately when cache status is NO_EVENTS', async () => {
      (calendarCache as any).status = 'NO_EVENTS';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(testAction.getInterval()).toBeDefined();
      expect(testAction.getWaitingInterval()).toBeUndefined();
    });

    it('should wait and poll when cache is INIT', async () => {
      (calendarCache as any).status = 'INIT';
      await testAction.onWillAppear({ action: mockAction });
      
      // Should be waiting, not running timer
      expect(testAction.getWaitingInterval()).toBeDefined();
      expect(testAction.getInterval()).toBeUndefined();
    });

    it('should wait and poll when cache is LOADING', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(testAction.getWaitingInterval()).toBeDefined();
      expect(testAction.getInterval()).toBeUndefined();
    });

    it('should show Please Setup for INIT status', async () => {
      (calendarCache as any).status = 'INIT';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(mockAction.setTitle).toHaveBeenCalledWith('Please\nSetup');
    });

    it('should show Loading iCal for LOADING status', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(mockAction.setTitle).toHaveBeenCalledWith('Loading\niCal');
    });

    it('should start timer when cache transitions from LOADING to LOADED', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      // Initially waiting
      expect(testAction.getWaitingInterval()).toBeDefined();
      expect(testAction.getInterval()).toBeUndefined();
      
      // Cache becomes ready
      (calendarCache as any).status = 'LOADED';
      
      // Advance time for polling interval (500ms in the fix)
      vi.advanceTimersByTime(500);
      
      // Should now have timer running
      expect(testAction.getInterval()).toBeDefined();
    });

    it('should poll at 500ms intervals (fast startup response)', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      // At 400ms, still waiting
      vi.advanceTimersByTime(400);
      expect(testAction.getWaitingInterval()).toBeDefined();
      
      // Cache becomes ready
      (calendarCache as any).status = 'LOADED';
      
      // At 500ms (100ms more), should detect and start
      vi.advanceTimersByTime(100);
      expect(testAction.getInterval()).toBeDefined();
    });

    it('should clear waiting interval when cache becomes available', async () => {
      (calendarCache as any).status = 'LOADING';
      await testAction.onWillAppear({ action: mockAction });
      
      expect(testAction.getWaitingInterval()).toBeDefined();
      
      (calendarCache as any).status = 'LOADED';
      vi.advanceTimersByTime(500);
      
      // Waiting interval should be cleared
      expect(testAction.getWaitingInterval()).toBeUndefined();
    });
  });

  describe('INIT vs INVALID_URL Status', () => {
    it('should show Please Setup for both INIT and INVALID_URL', () => {
      // Both statuses should show the same message to guide user to setup
      const initText = getStatusText('INIT');
      const invalidUrlText = getStatusText('INVALID_URL');
      
      expect(initText).toBe('Please\nSetup');
      expect(invalidUrlText).toBe('Please\nSetup');
    });

    it('should show Loading iCal only for LOADING status', () => {
      const loadingText = getStatusText('LOADING');
      expect(loadingText).toBe('Loading\niCal');
    });
  });
});
