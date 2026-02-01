/**
 * Base action class for Stream Deck actions
 * Provides common functionality for all action types
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import streamDeck, { action, SingletonAction, WillAppearEvent, WillDisappearEvent, KeyDownEvent, KeyUpEvent } from '@elgato/streamdeck';
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
 * Base action class with common functionality
 */
export abstract class BaseAction extends SingletonAction {
  protected interval?: NodeJS.Timeout;
  protected waitingForCacheInterval?: NodeJS.Timeout;
  protected cacheVersion: number = 0;
  protected currentImage: string = '';
  protected lastKeyPress: number = 0;
  protected actionRef?: any; // Keep reference to action for async operations
  protected flashInterval?: NodeJS.Timeout;
  protected isFlashing: boolean = false;
  
  // Per-action calendar settings
  protected actionId?: string;
  protected calendarId?: string;
  protected useCustomCalendar: boolean = false;
  
  // Color zones (in seconds)
  protected readonly RED_ZONE = 30;
  protected readonly ORANGE_ZONE = 300; // 5 minutes
  
  /**
   * Called when action appears on Stream Deck
   */
  async onWillAppear(ev: WillAppearEvent<any>): Promise<void> {
    logger.debug(`${this.constructor.name} will appear`);
    
    // Keep reference to action
    this.actionRef = ev.action;
    this.actionId = ev.action.id;
    
    // Check for per-action settings
    const settings = ev.payload.settings as ActionSettings | undefined;
    this.useCustomCalendar = settings?.useCustomCalendar ?? false;
    
    if (this.useCustomCalendar && settings?.customUrl) {
      // Register with custom calendar
      this.calendarId = calendarManager.registerAction(
        this.actionId,
        settings.customUrl,
        settings.customTimeWindow ?? globalTimeWindow,
        settings.customExcludeAllDay ?? globalExcludeAllDay
      );
      logger.info(`[${this.constructor.name}] Using custom calendar: ${settings.customLabel || settings.customUrl.substring(0, 30)}...`);
    } else if (globalUrl) {
      // Register with global calendar
      this.calendarId = calendarManager.registerAction(
        this.actionId,
        globalUrl,
        globalTimeWindow,
        globalExcludeAllDay
      );
      logger.debug(`[${this.constructor.name}] Using global calendar`);
    }
    
    // Set initial image
    await this.setInitialImage(ev.action);
    
    // Check cache status and start timer when ready
    this.waitForCacheAndStart(ev.action);
  }
  
  /**
   * Get events for this action (from its registered calendar)
   */
  protected getEvents(): CalendarEvent[] {
    if (this.actionId && this.calendarId) {
      return calendarManager.getEventsForAction(this.actionId);
    }
    // Fallback to global cache for backwards compatibility
    return calendarCache.events;
  }
  
  /**
   * Get cache status for this action
   */
  protected getCacheStatus(): ErrorState {
    if (this.actionId && this.calendarId) {
      return calendarManager.getStatusForAction(this.actionId);
    }
    // Fallback to global cache
    return calendarCache.status;
  }
  
  /**
   * Get cache version for this action
   */
  protected getCacheVersion(): number {
    if (this.actionId && this.calendarId) {
      const calendar = calendarManager.getCalendarForAction(this.actionId);
      return calendar?.cache.version ?? 0;
    }
    return calendarCache.version;
  }
  
  /**
   * Wait for cache to be available, then start timer
   */
  private waitForCacheAndStart(action: any): void {
    // Clear any existing waiting interval
    if (this.waitingForCacheInterval) {
      clearInterval(this.waitingForCacheInterval);
      this.waitingForCacheInterval = undefined;
    }
    
    // Get status from the action's calendar
    const status = this.getCacheStatus();
    
    // If cache is loaded, start immediately
    if (status === 'LOADED' || status === 'NO_EVENTS') {
      this.startTimer(action);
      return;
    }
    
    // Show loading status
    const statusText = getStatusText(status);
    action.setTitle(statusText);
    
    // Check every 500ms for cache to become available (faster response on startup)
    this.waitingForCacheInterval = setInterval(() => {
      // Use stored actionRef if available (more reliable after plugin restart)
      const currentAction = this.actionRef || action;
      
      const currentStatus = this.getCacheStatus();
      
      if (currentStatus === 'LOADED' || currentStatus === 'NO_EVENTS') {
        // Cache is ready, start timer
        if (this.waitingForCacheInterval) {
          clearInterval(this.waitingForCacheInterval);
          this.waitingForCacheInterval = undefined;
        }
        logger.debug('Cache ready, starting timer');
        this.startTimer(currentAction);
      } else {
        // Update status text while waiting
        const statusText = getStatusText(currentStatus);
        currentAction.setTitle(statusText);
      }
    }, 500);
    
    logger.debug('Waiting for cache to become available...');
  }
  
  /**
   * Called when action disappears from Stream Deck
   */
  async onWillDisappear(ev: WillDisappearEvent<any>): Promise<void> {
    logger.debug(`${this.constructor.name} will disappear`);
    this.stopTimer();
    
    // Unregister from CalendarManager
    if (this.actionId) {
      calendarManager.unregisterAction(this.actionId);
    }
    
    // Clear waiting interval
    if (this.waitingForCacheInterval) {
      clearInterval(this.waitingForCacheInterval);
      this.waitingForCacheInterval = undefined;
    }
    
    this.actionRef = undefined;
    this.actionId = undefined;
    this.calendarId = undefined;
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
    // Check for double press
    const now = Date.now();
    const timeSinceLastPress = now - this.lastKeyPress;
    this.lastKeyPress = now;
    
    if (timeSinceLastPress < 500) {
      // Double press detected - force refresh
      await this.handleDoublePress(ev.action);
    } else {
      // Single press
      await this.handleSinglePress(ev.action);
    }
  }
  
  /**
   * Handle single key press (override in subclasses)
   */
  protected async handleSinglePress(action: any): Promise<void> {
    // Override in subclasses
  }
  
  /**
   * Handle double key press (force refresh)
   */
  protected async handleDoublePress(action: any): Promise<void> {
    logger.info('🔄 Double press detected - forcing calendar refresh');
    
    // Stop the current timer
    this.stopTimer();
    
    // Show loading state
    await action.setTitle('Refreshing\n...');
    await this.setInitialImage(action);
    
    try {
      // Refresh the appropriate calendar
      if (this.actionId && this.calendarId) {
        // Refresh through CalendarManager (handles URL-level deduplication)
        await calendarManager.refreshCalendarForAction(this.actionId);
      } else {
        // Fallback to global refresh
        await forceRefreshCache();
      }
      logger.info('✅ Force refresh completed');
    } catch (error) {
      logger.error('❌ Force refresh failed:', error);
    }
    
    // Restart the timer to show updated data
    this.waitForCacheAndStart(action);
  }
  
  /**
   * Start the update timer
   */
  protected startTimer(action: any): void {
    this.cacheVersion = this.getCacheVersion();
    
    // Clear any existing timer
    this.stopTimer();
    
    // Update immediately
    this.updateDisplay(action);
    
    // Set up interval for updates (every second)
    this.interval = setInterval(() => {
      // Check if cache is still loaded
      const status = this.getCacheStatus();
      if (status !== 'LOADED' && status !== 'NO_EVENTS') {
        // Cache is reloading, stop timer and wait again
        this.stopTimer();
        this.waitForCacheAndStart(action);
        return;
      }
      
      // Check if cache was updated
      const currentVersion = this.getCacheVersion();
      if (this.cacheVersion !== currentVersion) {
        this.cacheVersion = currentVersion;
        logger.debug('Cache updated, refreshing display');
      }
      
      this.updateDisplay(action);
    }, 1000);
    
    logger.debug('Timer started');
  }
  
  /**
   * Stop the update timer
   */
  protected stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
      logger.debug('Timer stopped');
    }
  }
  
  /**
   * Update the display (override in subclasses)
   */
  protected abstract updateDisplay(action: any): Promise<void>;
  
  /**
   * Set initial image (override in subclasses)
   */
  protected abstract setInitialImage(action: any): Promise<void>;
  
  /**
   * Set action image by name
   */
  protected async setImage(action: any, imageName: string): Promise<void> {
    if (this.currentImage !== imageName) {
      this.currentImage = imageName;
      await action.setImage(`assets/${imageName}.png`);
    }
  }
  
  /**
   * Flash the button to draw attention (e.g., meeting starting)
   * Alternates between normal and highlight image
   */
  protected async flashButton(action: any, normalImage: string, highlightImage: string, count: number = 10): Promise<void> {
    // Check if flash is enabled in settings
    const settings = getSettings();
    if (settings.flashOnMeetingStart === false) {
      return;
    }
    
    // Don't start new flash if already flashing
    if (this.isFlashing) {
      return;
    }
    
    this.isFlashing = true;
    let flashCount = 0;
    const flashInterval = 200; // ms between flashes
    
    logger.info(`🔔 Flashing button ${count} times`);
    
    this.flashInterval = setInterval(async () => {
      if (flashCount >= count * 2) {
        // Done flashing
        if (this.flashInterval) {
          clearInterval(this.flashInterval);
          this.flashInterval = undefined;
        }
        this.isFlashing = false;
        // Reset to normal image
        this.currentImage = '';
        await this.setImage(action, normalImage);
        return;
      }
      
      // Alternate between highlight and normal
      const useHighlight = flashCount % 2 === 0;
      this.currentImage = ''; // Force image update
      await action.setImage(`assets/${useHighlight ? highlightImage : normalImage}.png`);
      flashCount++;
    }, flashInterval);
  }
  
  /**
   * Stop any ongoing flash
   */
  protected stopFlash(): void {
    if (this.flashInterval) {
      clearInterval(this.flashInterval);
      this.flashInterval = undefined;
    }
    this.isFlashing = false;
  }
  
  /**
   * Get title display duration from settings (in seconds)
   */
  protected getTitleDisplayDuration(): number {
    const settings = getSettings();
    return settings.titleDisplayDuration ?? 15;
  }
}
