/**
 * Tests for SingletonAction multi-button state management
 * 
 * The Stream Deck SDK's SingletonAction means ONE instance handles ALL buttons
 * of that action type. These tests verify that each button maintains independent state.
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
    refreshCalendarForAction: vi.fn()
  }
}));

/**
 * Per-button state interface (mirrors actual implementation)
 */
interface ButtonState {
  interval?: NodeJS.Timeout;
  waitingForCacheInterval?: NodeJS.Timeout;
  cacheVersion: number;
  currentImage: string;
  lastKeyPress: number;
  actionRef: any;
  flashInterval?: NodeJS.Timeout;
  isFlashing: boolean;
  calendarId?: string;
  useCustomCalendar: boolean;
  updateCount: number; // For testing
}

/**
 * Test implementation that mirrors BaseAction's per-button state management
 */
class TestMultiButtonAction {
  protected buttonStates: Map<string, ButtonState> = new Map();
  
  protected getButtonState(actionId: string): ButtonState {
    let state = this.buttonStates.get(actionId);
    if (!state) {
      state = {
        cacheVersion: 0,
        currentImage: '',
        lastKeyPress: 0,
        actionRef: null,
        isFlashing: false,
        useCustomCalendar: false,
        updateCount: 0
      };
      this.buttonStates.set(actionId, state);
    }
    return state;
  }
  
  async onWillAppear(ev: { action: { id: string; setTitle: Function; setImage: Function } }): Promise<void> {
    const actionId = ev.action.id;
    const state = this.getButtonState(actionId);
    state.actionRef = ev.action;
    this.startTimerForButton(actionId, ev.action);
  }
  
  async onWillDisappear(ev: { action: { id: string } }): Promise<void> {
    const actionId = ev.action.id;
    const state = this.buttonStates.get(actionId);
    if (state) {
      if (state.interval) {
        clearInterval(state.interval);
      }
      this.buttonStates.delete(actionId);
    }
  }
  
  protected startTimerForButton(actionId: string, action: any): void {
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Stop existing timer for this button
    this.stopTimerForButton(actionId);
    
    // Start new timer
    state.interval = setInterval(() => {
      state.updateCount++;
      action.setTitle(`Button ${actionId}: ${state.updateCount}`);
    }, 100);
  }
  
  protected stopTimerForButton(actionId: string): void {
    const state = this.buttonStates.get(actionId);
    if (state?.interval) {
      clearInterval(state.interval);
      state.interval = undefined;
    }
  }
  
  // Expose for testing
  getButtonStates() { return this.buttonStates; }
  getUpdateCount(actionId: string) { return this.buttonStates.get(actionId)?.updateCount ?? 0; }
  hasTimer(actionId: string) { return !!this.buttonStates.get(actionId)?.interval; }
}

describe('SingletonAction Multi-Button State Management', () => {
  let testAction: TestMultiButtonAction;
  
  beforeEach(() => {
    vi.useFakeTimers();
    testAction = new TestMultiButtonAction();
  });
  
  afterEach(() => {
    // Clean up all button states
    for (const [actionId] of testAction.getButtonStates()) {
      testAction.onWillDisappear({ action: { id: actionId } });
    }
    vi.useRealTimers();
  });
  
  describe('Independent button state', () => {
    it('should create separate state for each button', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      expect(testAction.getButtonStates().size).toBe(2);
      expect(testAction.getButtonStates().has('button-1')).toBe(true);
      expect(testAction.getButtonStates().has('button-2')).toBe(true);
    });
    
    it('should maintain independent timers for each button', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      expect(testAction.hasTimer('button-1')).toBe(true);
      expect(testAction.hasTimer('button-2')).toBe(true);
    });
    
    it('should update each button independently', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      // Advance time to trigger timer updates
      vi.advanceTimersByTime(350); // ~3 updates
      
      // Both buttons should have been updated independently
      expect(testAction.getUpdateCount('button-1')).toBeGreaterThan(0);
      expect(testAction.getUpdateCount('button-2')).toBeGreaterThan(0);
      
      // Each button's setTitle should have been called
      expect(mockAction1.setTitle).toHaveBeenCalled();
      expect(mockAction2.setTitle).toHaveBeenCalled();
    });
    
    it('should not affect other buttons when one disappears', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      // Button 1 disappears
      await testAction.onWillDisappear({ action: { id: 'button-1' } });
      
      // Button 1 state should be removed
      expect(testAction.getButtonStates().has('button-1')).toBe(false);
      
      // Button 2 should still be active
      expect(testAction.getButtonStates().has('button-2')).toBe(true);
      expect(testAction.hasTimer('button-2')).toBe(true);
      
      // Button 2 should continue updating
      const countBefore = testAction.getUpdateCount('button-2');
      vi.advanceTimersByTime(200);
      expect(testAction.getUpdateCount('button-2')).toBeGreaterThan(countBefore);
    });
    
    it('should handle adding a third button while two are active', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction3 = { id: 'button-3', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      vi.advanceTimersByTime(200);
      
      // Add third button
      await testAction.onWillAppear({ action: mockAction3 });
      
      // All three should have independent state
      expect(testAction.getButtonStates().size).toBe(3);
      expect(testAction.hasTimer('button-1')).toBe(true);
      expect(testAction.hasTimer('button-2')).toBe(true);
      expect(testAction.hasTimer('button-3')).toBe(true);
      
      // First two should have updates, third should start fresh
      expect(testAction.getUpdateCount('button-1')).toBeGreaterThan(0);
      expect(testAction.getUpdateCount('button-2')).toBeGreaterThan(0);
      expect(testAction.getUpdateCount('button-3')).toBe(0);
      
      vi.advanceTimersByTime(200);
      
      // Now third should have updates too
      expect(testAction.getUpdateCount('button-3')).toBeGreaterThan(0);
    });
  });
  
  describe('State isolation', () => {
    it('should not share actionRef between buttons', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      const state1 = testAction.getButtonStates().get('button-1');
      const state2 = testAction.getButtonStates().get('button-2');
      
      expect(state1?.actionRef).toBe(mockAction1);
      expect(state2?.actionRef).toBe(mockAction2);
      expect(state1?.actionRef).not.toBe(state2?.actionRef);
    });
    
    it('should not share interval references between buttons', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      const mockAction2 = { id: 'button-2', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      await testAction.onWillAppear({ action: mockAction2 });
      
      const state1 = testAction.getButtonStates().get('button-1');
      const state2 = testAction.getButtonStates().get('button-2');
      
      expect(state1?.interval).toBeDefined();
      expect(state2?.interval).toBeDefined();
      expect(state1?.interval).not.toBe(state2?.interval);
    });
  });
  
  describe('Cleanup', () => {
    it('should clear timer when button disappears', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      expect(testAction.hasTimer('button-1')).toBe(true);
      
      await testAction.onWillDisappear({ action: { id: 'button-1' } });
      expect(testAction.hasTimer('button-1')).toBe(false);
      expect(testAction.getButtonStates().has('button-1')).toBe(false);
    });
    
    it('should handle disappearing button that was never added', async () => {
      // Should not throw
      await expect(
        testAction.onWillDisappear({ action: { id: 'nonexistent' } })
      ).resolves.not.toThrow();
    });
  });
  
  describe('Re-appearing buttons', () => {
    it('should create fresh state when button re-appears', async () => {
      const mockAction1 = { id: 'button-1', setTitle: vi.fn(), setImage: vi.fn() };
      
      await testAction.onWillAppear({ action: mockAction1 });
      vi.advanceTimersByTime(500);
      const countBeforeDisappear = testAction.getUpdateCount('button-1');
      
      await testAction.onWillDisappear({ action: { id: 'button-1' } });
      
      // Re-appear
      await testAction.onWillAppear({ action: mockAction1 });
      
      // Should start fresh
      expect(testAction.getUpdateCount('button-1')).toBe(0);
      expect(testAction.hasTimer('button-1')).toBe(true);
    });
  });
});
