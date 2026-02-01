/**
 * Base action class for Stream Deck actions
 * Provides common functionality for all action types
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import streamDeck, { action, SingletonAction, WillAppearEvent, WillDisappearEvent, KeyDownEvent, KeyUpEvent, DidReceiveSettingsEvent } from '@elgato/streamdeck';
import { calendarCache, getStatusText, forceRefreshCache, getSettings } from '../services/calendar-service.js';
import { calendarManager } from '../services/calendar-manager.js';
import { CalendarEvent, ActionSettings, ErrorState } from '../types/index.js';
import { logger } from '../utils/logger.js';

// Global settings (set by plugin.ts)
let globalUrl: string = '';
let globalTimeWindow: number = 3;
let globalExcludeAllDay: boolean = true;

/**
 * Set global calendar settings (called from plugin.ts)
 */
export function setGlobalCalendarConfig(url: string, timeWindow: number, excludeAllDay: boolean): void {
  globalUrl = url;
  globalTimeWindow = timeWindow;
  globalExcludeAllDay = excludeAllDay;
}

/**
 * Per-button state for SingletonAction pattern
 * Since SingletonAction uses one instance for all buttons, we track state per button ID
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
}

/**
 * Base action class with common functionality
 */
export abstract class BaseAction extends SingletonAction {
  // Per-button state storage (SingletonAction = one instance for all buttons)
  protected buttonStates: Map<string, ButtonState> = new Map();
  
  // Color zones (in seconds)
  protected readonly RED_ZONE = 30;
  protected readonly ORANGE_ZONE = 300; // 5 minutes
  
  /**
   * Get or create button state for an action ID
   */
  protected getButtonState(actionId: string): ButtonState {
    let state = this.buttonStates.get(actionId);
    if (!state) {
      state = {
        cacheVersion: 0,
        currentImage: '',
        lastKeyPress: 0,
        actionRef: null,
        isFlashing: false,
        useCustomCalendar: false
      };
      this.buttonStates.set(actionId, state);
    }
    return state;
  }
  
  /**
   * Called when action appears on Stream Deck
   */
  async onWillAppear(ev: WillAppearEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    logger.debug(`${this.constructor.name} will appear: ${actionId}`);
    
    // Get or create button state
    const state = this.getButtonState(actionId);
    state.actionRef = ev.action;
    
    // Check for per-action settings
    const settings = ev.payload.settings as ActionSettings | undefined;
    state.useCustomCalendar = settings?.useCustomCalendar ?? false;
    
    if (state.useCustomCalendar && settings?.customUrl) {
      // Register with custom calendar
      state.calendarId = calendarManager.registerAction(
        actionId,
        settings.customUrl,
        settings.customTimeWindow ?? globalTimeWindow,
        settings.customExcludeAllDay ?? globalExcludeAllDay
      );
      logger.info(`[${this.constructor.name}] ${actionId} using custom calendar: ${settings.customLabel || settings.customUrl.substring(0, 30)}...`);
    } else if (globalUrl) {
      // Register with global calendar
      state.calendarId = calendarManager.registerAction(
        actionId,
        globalUrl,
        globalTimeWindow,
        globalExcludeAllDay
      );
      logger.debug(`[${this.constructor.name}] ${actionId} using global calendar`);
    }
    
    // Set initial image
    await this.setInitialImage(ev.action);
    
    // Check cache status and start timer when ready
    this.waitForCacheAndStart(actionId, ev.action);
  }
  
  /**
   * Get events for a specific action (from its registered calendar)
   */
  protected getEventsForButton(actionId: string): CalendarEvent[] {
    const state = this.buttonStates.get(actionId);
    if (state?.calendarId) {
      return calendarManager.getEventsForAction(actionId);
    }
    // Fallback to global cache for backwards compatibility
    return calendarCache.events;
  }
  
  /**
   * Get cache status for a specific action
   */
  protected getCacheStatusForButton(actionId: string): ErrorState {
    const state = this.buttonStates.get(actionId);
    if (state?.calendarId) {
      return calendarManager.getStatusForAction(actionId);
    }
    // Fallback to global cache
    return calendarCache.status;
  }
  
  /**
   * Get cache version for a specific action
   */
  protected getCacheVersionForButton(actionId: string): number {
    const state = this.buttonStates.get(actionId);
    if (state?.calendarId) {
      const calendar = calendarManager.getCalendarForAction(actionId);
      return calendar?.cache.version ?? 0;
    }
    return calendarCache.version;
  }
  
  /**
   * Wait for cache to be available, then start timer
   */
  private waitForCacheAndStart(actionId: string, action: any): void {
    const state = this.getButtonState(actionId);
    
    // Clear any existing waiting interval
    if (state.waitingForCacheInterval) {
      clearInterval(state.waitingForCacheInterval);
      state.waitingForCacheInterval = undefined;
    }
    
    // Get status from the action's calendar
    const status = this.getCacheStatusForButton(actionId);
    
    // If cache is loaded, start immediately
    if (status === 'LOADED' || status === 'NO_EVENTS') {
      this.startTimerForButton(actionId, action);
      return;
    }
    
    // Show loading status
    const statusText = getStatusText(status);
    action.setTitle(statusText);
    
    // Check every 500ms for cache to become available (faster response on startup)
    state.waitingForCacheInterval = setInterval(() => {
      // Use stored actionRef if available (more reliable after plugin restart)
      const currentAction = state.actionRef || action;
      
      const currentStatus = this.getCacheStatusForButton(actionId);
      
      if (currentStatus === 'LOADED' || currentStatus === 'NO_EVENTS') {
        // Cache is ready, start timer
        if (state.waitingForCacheInterval) {
          clearInterval(state.waitingForCacheInterval);
          state.waitingForCacheInterval = undefined;
        }
        logger.debug(`Cache ready for ${actionId}, starting timer`);
        this.startTimerForButton(actionId, currentAction);
      } else {
        // Update status text while waiting
        const statusText = getStatusText(currentStatus);
        currentAction.setTitle(statusText);
      }
    }, 500);
    
    logger.debug(`Waiting for cache for ${actionId}...`);
  }
  
  /**
   * Called when action disappears from Stream Deck
   */
  async onWillDisappear(ev: WillDisappearEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    logger.debug(`${this.constructor.name} will disappear: ${actionId}`);
    
    const state = this.buttonStates.get(actionId);
    if (state) {
      // Stop button's timer
      if (state.interval) {
        clearInterval(state.interval);
      }
      
      // Clear waiting interval
      if (state.waitingForCacheInterval) {
        clearInterval(state.waitingForCacheInterval);
      }
      
      // Stop any flash
      if (state.flashInterval) {
        clearInterval(state.flashInterval);
      }
      
      // Unregister from CalendarManager
      calendarManager.unregisterAction(actionId);
      
      // Remove state for this button
      this.buttonStates.delete(actionId);
    }
  }
  
  /**
   * Called when settings are received/updated from Property Inspector
   */
  async onDidReceiveSettings(ev: DidReceiveSettingsEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    const settings = ev.payload.settings as ActionSettings | undefined;
    logger.debug(`[${this.constructor.name}] Settings received for ${actionId}:`, JSON.stringify(settings));
    
    const state = this.buttonStates.get(actionId);
    if (!state) {
      logger.debug(`[${this.constructor.name}] No state for action ${actionId}, skipping settings update`);
      return;
    }
    
    const newUseCustomCalendar = settings?.useCustomCalendar ?? false;
    
    // Check if calendar settings changed
    if (newUseCustomCalendar !== state.useCustomCalendar || 
        (newUseCustomCalendar && settings?.customUrl)) {
      
      state.useCustomCalendar = newUseCustomCalendar;
      
      // Re-register with the appropriate calendar
      if (newUseCustomCalendar && settings?.customUrl) {
        state.calendarId = calendarManager.registerAction(
          actionId,
          settings.customUrl,
          settings.customTimeWindow ?? globalTimeWindow,
          settings.customExcludeAllDay ?? globalExcludeAllDay
        );
        logger.info(`[${this.constructor.name}] Switched ${actionId} to custom calendar: ${settings.customLabel || settings.customUrl.substring(0, 30)}...`);
      } else if (globalUrl) {
        state.calendarId = calendarManager.registerAction(
          actionId,
          globalUrl,
          globalTimeWindow,
          globalExcludeAllDay
        );
        logger.info(`[${this.constructor.name}] Switched ${actionId} to global calendar`);
      }
      
      // Restart the display with new calendar
      this.stopTimerForButton(actionId);
      if (state.actionRef) {
        this.waitForCacheAndStart(actionId, state.actionRef);
      }
    }
  }
  
  /**
   * Called when key is pressed down
   */
  async onKeyDown(ev: KeyDownEvent<any>): Promise<void> {
    // Override in subclasses if needed
  }
  
  /**
   * Called when key is released
   */
  async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Check for double press
    const now = Date.now();
    const timeSinceLastPress = now - state.lastKeyPress;
    state.lastKeyPress = now;
    
    if (timeSinceLastPress < 500) {
      // Double press detected - force refresh
      await this.handleDoublePress(actionId, ev.action);
    } else {
      // Single press
      await this.handleSinglePress(actionId, ev.action);
    }
  }
  
  /**
   * Handle single key press (override in subclasses)
   */
  protected async handleSinglePress(actionId: string, action: any): Promise<void> {
    // Override in subclasses
  }
  
  /**
   * Handle double key press (force refresh)
   */
  protected async handleDoublePress(actionId: string, action: any): Promise<void> {
    logger.info(`🔄 Double press detected on ${actionId} - forcing calendar refresh`);
    
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Stop the current timer
    this.stopTimerForButton(actionId);
    
    // Show loading state
    await action.setTitle('Refreshing\n...');
    await this.setInitialImage(action);
    
    try {
      // Refresh the appropriate calendar
      if (state.calendarId) {
        // Refresh through CalendarManager (handles URL-level deduplication)
        await calendarManager.refreshCalendarForAction(actionId);
      } else {
        // Fallback to global refresh
        await forceRefreshCache();
      }
      logger.info('✅ Force refresh completed');
    } catch (error) {
      logger.error('❌ Force refresh failed:', error);
    }
    
    // Restart the timer to show updated data
    this.waitForCacheAndStart(actionId, action);
  }
  
  /**
   * Start the update timer for a specific button
   */
  protected startTimerForButton(actionId: string, action: any): void {
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    state.cacheVersion = this.getCacheVersionForButton(actionId);
    
    // Clear any existing timer for this button
    this.stopTimerForButton(actionId);
    
    // Update immediately
    this.updateDisplay(actionId, action);
    
    // Set up interval for updates (every second)
    state.interval = setInterval(() => {
      // Check if cache is still loaded
      const status = this.getCacheStatusForButton(actionId);
      if (status !== 'LOADED' && status !== 'NO_EVENTS') {
        // Cache is reloading, stop timer and wait again
        this.stopTimerForButton(actionId);
        this.waitForCacheAndStart(actionId, action);
        return;
      }
      
      // Check if cache was updated
      const currentVersion = this.getCacheVersionForButton(actionId);
      if (state.cacheVersion !== currentVersion) {
        state.cacheVersion = currentVersion;
        logger.debug(`Cache updated for ${actionId}, refreshing display`);
      }
      
      this.updateDisplay(actionId, action);
    }, 1000);
    
    logger.debug(`Timer started for ${actionId}`);
  }
  
  /**
   * Stop the update timer for a specific button
   */
  protected stopTimerForButton(actionId: string): void {
    const state = this.buttonStates.get(actionId);
    if (state?.interval) {
      clearInterval(state.interval);
      state.interval = undefined;
      logger.debug(`Timer stopped for ${actionId}`);
    }
  }
  
  /**
   * Update the display (override in subclasses)
   */
  protected abstract updateDisplay(actionId: string, action: any): Promise<void>;
  
  /**
   * Set initial image (override in subclasses)
   */
  protected abstract setInitialImage(action: any): Promise<void>;
  
  /**
   * Set action image by name
   */
  protected async setImage(actionId: string, action: any, imageName: string): Promise<void> {
    const state = this.buttonStates.get(actionId);
    if (state && state.currentImage !== imageName) {
      state.currentImage = imageName;
      await action.setImage(`assets/${imageName}.png`);
    }
  }
  
  /**
   * Flash the button to draw attention (e.g., meeting starting)
   * Alternates between normal and highlight image
   */
  protected async flashButton(actionId: string, action: any, normalImage: string, highlightImage: string, count: number = 10): Promise<void> {
    // Check if flash is enabled in settings
    const settings = getSettings();
    if (settings.flashOnMeetingStart === false) {
      return;
    }
    
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Don't start new flash if already flashing
    if (state.isFlashing) {
      return;
    }
    
    state.isFlashing = true;
    let flashCount = 0;
    const flashIntervalMs = 200; // ms between flashes
    
    logger.info(`🔔 Flashing button ${actionId} ${count} times`);
    
    state.flashInterval = setInterval(async () => {
      if (flashCount >= count * 2) {
        // Done flashing
        if (state.flashInterval) {
          clearInterval(state.flashInterval);
          state.flashInterval = undefined;
        }
        state.isFlashing = false;
        // Reset to normal image
        state.currentImage = '';
        await this.setImage(actionId, action, normalImage);
        return;
      }
      
      // Alternate between highlight and normal
      const useHighlight = flashCount % 2 === 0;
      state.currentImage = ''; // Force image update
      await action.setImage(`assets/${useHighlight ? highlightImage : normalImage}.png`);
      flashCount++;
    }, flashIntervalMs);
  }
  
  /**
   * Stop any ongoing flash for a specific button
   */
  protected stopFlashForButton(actionId: string): void {
    const state = this.buttonStates.get(actionId);
    if (state) {
      if (state.flashInterval) {
        clearInterval(state.flashInterval);
        state.flashInterval = undefined;
      }
      state.isFlashing = false;
    }
  }
  
  /**
   * Get title display duration from settings (in seconds)
   */
  protected getTitleDisplayDuration(): number {
    const settings = getSettings();
    return settings.titleDisplayDuration ?? 15;
  }
}
