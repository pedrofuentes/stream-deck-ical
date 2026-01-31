/**
 * NextMeeting action - shows countdown to next upcoming meeting
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action, KeyUpEvent } from '@elgato/streamdeck';
import { BaseAction } from './base-action.js';
import { calendarCache, getStatusText } from '../services/calendar-service.js';
import { findNextEvent } from '../utils/event-utils.js';
import { secondsUntil, sec2time } from '../utils/time-utils.js';
import { logger } from '../utils/logger.js';

/**
 * NextMeeting action class
 */
@action({ UUID: 'com.pedrofuentes.ical.nextmeeting' })
export class NextMeetingAction extends BaseAction {
  private showingTitle: boolean = false;
  private titleTimeout?: NodeJS.Timeout;
  private marqueeInterval?: NodeJS.Timeout;
  private marqueePosition: number = 0;
  
  /**
   * Set initial image for next meeting
   */
  protected async setInitialImage(action: any): Promise<void> {
    await this.setImage(action, 'nextMeeting');
  }
  
  /**
   * Override onKeyUp to handle button press - required for SDK event routing
   */
  async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    await super.onKeyUp(ev);
  }
  
  /**
   * Handle single key press - show meeting title
   */
  protected async handleSinglePress(action: any): Promise<void> {
    if (this.showingTitle) {
      // Already showing title, stop marquee
      this.stopMarquee();
      this.showingTitle = false;
      // Resume normal display
      await this.updateDisplay(action);
    } else {
      // Show title as marquee
      const nextEvent = findNextEvent(calendarCache.events);
      if (nextEvent) {
        this.startMarquee(action, nextEvent.summary);
      }
    }
  }
  
  /**
   * Start marquee display of meeting title
   */
  private startMarquee(action: any, title: string): void {
    this.showingTitle = true;
    this.marqueePosition = 0;
    
    // Clear any existing marquee
    this.stopMarquee();
    
    // Pad title for smooth scrolling (spaces at end for wrap-around)
    const paddedTitle = `${title}  •  `;
    const displayWidth = 7; // Characters visible at once (fits Stream Deck button)
    
    const updateMarquee = async () => {
      // Extract visible portion with wrap-around
      let displayText = '';
      for (let i = 0; i < displayWidth; i++) {
        const charIndex = (this.marqueePosition + i) % paddedTitle.length;
        displayText += paddedTitle[charIndex];
      }
      
      await action.setTitle(displayText);
      
      this.marqueePosition++;
      if (this.marqueePosition >= paddedTitle.length) {
        this.marqueePosition = 0;
      }
    };
    
    // Update immediately
    updateMarquee();
    
    // Update every 250ms for smooth scrolling
    this.marqueeInterval = setInterval(updateMarquee, 250);
    
    // Auto-stop after 15 seconds
    this.titleTimeout = setTimeout(() => {
      this.stopMarquee();
      this.showingTitle = false;
      this.updateDisplay(action);
    }, 15000);
  }
  
  /**
   * Stop marquee display
   */
  private stopMarquee(): void {
    if (this.marqueeInterval) {
      clearInterval(this.marqueeInterval);
      this.marqueeInterval = undefined;
    }
    if (this.titleTimeout) {
      clearTimeout(this.titleTimeout);
      this.titleTimeout = undefined;
    }
  }
  
  /**
   * Update display with countdown to next meeting
   */
  protected async updateDisplay(action: any): Promise<void> {
    // Don't update if showing marquee
    if (this.showingTitle) {
      return;
    }
    
    // Check cache status
    if (calendarCache.status !== 'LOADED' && calendarCache.status !== 'NO_EVENTS') {
      const statusText = getStatusText(calendarCache.status);
      logger.debug(`[NextMeeting] Cache status: ${calendarCache.status}, showing: ${statusText}`);
      await action.setTitle(statusText);
      await this.setImage(action, 'nextMeeting');
      return;
    }
    
    // Find next event
    const nextEvent = findNextEvent(calendarCache.events);
    
    logger.debug(`[NextMeeting] Cache has ${calendarCache.events.length} total events, next=${nextEvent ? nextEvent.summary : 'none'}`);
    
    if (!nextEvent) {
      logger.debug(`[NextMeeting] No upcoming events in cache`);
      await action.setTitle('No\nUpcoming\nMeeting');
      await this.setImage(action, 'nextMeeting');
      return;
    }
    
    // Calculate time until meeting
    const secondsRemaining = secondsUntil(nextEvent.start);
    
    logger.debug(`[NextMeeting] Event: "${nextEvent.summary}", starts: ${nextEvent.start.toISOString()}, in ${secondsRemaining}s`);
    
    if (secondsRemaining < 0) {
      // Event has started, find the next one
      logger.debug(`[NextMeeting] Event already started (${secondsRemaining}s ago), will refresh on next tick`);
      // Don't update this tick, let next tick handle it
      return;
    }
    
    // Update image based on time remaining
    let imageState = 'normal';
    if (secondsRemaining <= this.RED_ZONE) {
      imageState = 'red';
      await this.setImage(action, 'nextMeetingRed');
    } else if (secondsRemaining <= this.ORANGE_ZONE) {
      imageState = 'orange';
      await this.setImage(action, 'nextMeetingOrange');
    } else {
      await this.setImage(action, 'nextMeeting');
    }
    
    // Update title with countdown
    const timeText = sec2time(secondsRemaining);
    logger.debug(`[NextMeeting] Display: ${timeText}, image=${imageState}`);
    await action.setTitle(timeText);
  }
  
  /**
   * Override to stop marquee when disappearing
   */
  async onWillDisappear(ev: any): Promise<void> {
    this.stopMarquee();
    await super.onWillDisappear(ev);
  }
}
