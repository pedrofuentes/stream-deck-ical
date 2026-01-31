/**
 * Base action class for Stream Deck actions
 * Provides common functionality for all action types
 */

import streamDeck, { action, SingletonAction, WillAppearEvent, WillDisappearEvent, KeyDownEvent, KeyUpEvent } from '@elgato/streamdeck';
import { calendarCache, getStatusText } from '../services/calendar-service.js';
import { logger } from '../utils/logger.js';

/**
 * Base action class with common functionality
 */
export abstract class BaseAction extends SingletonAction {
  protected interval?: NodeJS.Timeout;
  protected cacheVersion: number = 0;
  protected currentImage: string = '';
  protected lastKeyPress: number = 0;
  
  // Color zones (in seconds)
  protected readonly RED_ZONE = 30;
  protected readonly ORANGE_ZONE = 300; // 5 minutes
  
  /**
   * Called when action appears on Stream Deck
   */
  async onWillAppear(ev: WillAppearEvent<any>): Promise<void> {
    logger.debug(`${this.constructor.name} will appear`);
    
    // Check cache status
    if (calendarCache.events.length === 0) {
      const statusText = getStatusText(calendarCache.status);
      await ev.action.setTitle(statusText);
    }
    
    // Set initial image
    await this.setInitialImage(ev.action);
    
    // Start timer if cache is available
    if (calendarCache.status === 'LOADED') {
      this.startTimer(ev.action);
    }
  }
  
  /**
   * Called when action disappears from Stream Deck
   */
  async onWillDisappear(ev: WillDisappearEvent<any>): Promise<void> {
    logger.debug(`${this.constructor.name} will disappear`);
    this.stopTimer();
  }
  
  /**
   * Called when key is pressed down
   */
  async onKeyDown(ev: KeyDownEvent<any>): Promise<void> {
    // Override in subclasses
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
    logger.debug('Double press detected - forcing refresh');
    this.stopTimer();
    await action.setTitle('Loading\nUpcoming\nMeeting');
    await this.setInitialImage(action);
    
    // Wait a moment and restart
    setTimeout(() => {
      if (calendarCache.status === 'LOADED') {
        this.startTimer(action);
      }
    }, 1000);
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
