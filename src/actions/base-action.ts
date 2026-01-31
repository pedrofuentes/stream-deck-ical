/**
 * Base action class for Stream Deck actions
 * Provides common functionality for all action types
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import streamDeck, { action, SingletonAction, WillAppearEvent, WillDisappearEvent, KeyDownEvent, KeyUpEvent } from '@elgato/streamdeck';
import { calendarCache, getStatusText, forceRefreshCache } from '../services/calendar-service.js';
import { logger } from '../utils/logger.js';

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
    
    // Set initial image
    await this.setInitialImage(ev.action);
    
    // Check cache status and start timer when ready
    this.waitForCacheAndStart(ev.action);
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
    
    // If cache is loaded, start immediately
    if (calendarCache.status === 'LOADED' || calendarCache.status === 'NO_EVENTS') {
      this.startTimer(action);
      return;
    }
    
    // Show loading status
    const statusText = getStatusText(calendarCache.status);
    action.setTitle(statusText);
    
    // Check every 2 seconds for cache to become available
    this.waitingForCacheInterval = setInterval(() => {
      if (calendarCache.status === 'LOADED' || calendarCache.status === 'NO_EVENTS') {
        // Cache is ready, start timer
        if (this.waitingForCacheInterval) {
          clearInterval(this.waitingForCacheInterval);
          this.waitingForCacheInterval = undefined;
        }
        this.startTimer(action);
      } else {
        // Update status text while waiting
        const statusText = getStatusText(calendarCache.status);
        action.setTitle(statusText);
      }
    }, 2000);
    
    logger.debug('Waiting for cache to become available...');
  }
  
  /**
   * Called when action disappears from Stream Deck
   */
  async onWillDisappear(ev: WillDisappearEvent<any>): Promise<void> {
    logger.debug(`${this.constructor.name} will disappear`);
    this.stopTimer();
    
    // Clear waiting interval
    if (this.waitingForCacheInterval) {
      clearInterval(this.waitingForCacheInterval);
      this.waitingForCacheInterval = undefined;
    }
    
    this.actionRef = undefined;
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
      // Actually refresh the calendar cache
      await forceRefreshCache();
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
    this.cacheVersion = calendarCache.version;
    
    // Clear any existing timer
    this.stopTimer();
    
    // Update immediately
    this.updateDisplay(action);
    
    // Set up interval for updates (every second)
    this.interval = setInterval(() => {
      // Check if cache is still loaded
      if (calendarCache.status !== 'LOADED' && calendarCache.status !== 'NO_EVENTS') {
        // Cache is reloading, stop timer and wait again
        this.stopTimer();
        this.waitForCacheAndStart(action);
        return;
      }
      
      // Check if cache was updated
      if (this.cacheVersion !== calendarCache.version) {
        this.cacheVersion = calendarCache.version;
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
}
