/**
 * NextMeeting action - shows countdown to next upcoming meeting
 */

import { action, SingletonAction, KeyUpEvent, WillAppearEvent } from '@elgato/streamdeck';
import { BaseAction } from './base-action.js';
import { calendarCache, getStatusText } from '../services/calendar-service.js';
import { findNextEvent } from '../utils/event-utils.js';
import { secondsUntil } from '../utils/time-utils.js';
import { sec2time } from '../utils/time-utils.js';
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
    
    // Pad title for smooth scrolling
    const paddedTitle = `${title}     `;
    
    const updateMarquee = async () => {
      // Display 9 characters at a time (3 lines of 3 chars each for readability)
      const displayText = paddedTitle.substring(this.marqueePosition, this.marqueePosition + 9);
      
      // Format as 3 lines
      const line1 = displayText.substring(0, 3);
      const line2 = displayText.substring(3, 6);
      const line3 = displayText.substring(6, 9);
      const formatted = `${line1}\n${line2}\n${line3}`.trim();
      
      await action.setTitle(formatted);
      
      this.marqueePosition++;
      if (this.marqueePosition >= paddedTitle.length) {
        this.marqueePosition = 0;
      }
    };
    
    // Update immediately
    updateMarquee();
    
    // Update every 300ms for smooth scrolling
    this.marqueeInterval = setInterval(updateMarquee, 300);
    
    // Auto-stop after 10 seconds
    this.titleTimeout = setTimeout(() => {
      this.stopMarquee();
      this.showingTitle = false;
      this.updateDisplay(action);
    }, 10000);
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
    if (calendarCache.status !== 'LOADED') {
      const statusText = getStatusText(calendarCache.status);
      await action.setTitle(statusText);
      await this.setImage(action, 'nextMeeting');
      return;
    }
    
    // Find next event
    const nextEvent = findNextEvent(calendarCache.events);
    
    if (!nextEvent) {
      await action.setTitle('No\nUpcoming\nMeeting');
      await this.setImage(action, 'nextMeeting');
      return;
    }
    
    // Calculate time until meeting
    const secondsRemaining = secondsUntil(nextEvent.start);
    
    if (secondsRemaining < 0) {
      // Event has started, find the next one
      logger.debug('Event has started, finding next event');
      // Don't update this tick, let next tick handle it
      return;
    }
    
    // Update image based on time remaining
    if (secondsRemaining <= this.RED_ZONE) {
      await this.setImage(action, 'nextMeetingRed');
    } else if (secondsRemaining <= this.ORANGE_ZONE) {
      await this.setImage(action, 'nextMeetingOrange');
    } else {
      await this.setImage(action, 'nextMeeting');
    }
    
    // Update title with countdown
    const timeText = sec2time(secondsRemaining);
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
