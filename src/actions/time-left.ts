/**
 * TimeLeft action - shows time remaining in current meeting
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action } from '@elgato/streamdeck';
import { BaseAction } from './base-action.js';
import { calendarCache, getStatusText } from '../services/calendar-service.js';
import { findActiveEvents } from '../utils/event-utils.js';
import { secondsUntil, sec2time } from '../utils/time-utils.js';
import { logger } from '../utils/logger.js';

/**
 * TimeLeft action class
 */
@action({ UUID: 'com.pedrofuentes.ical.timeleft' })
export class TimeLeftAction extends BaseAction {
  private currentMeetingIndex: number = 0;
  private meetingEnded: boolean = false;
  private endTimeout?: NodeJS.Timeout;
  
  /**
   * Set initial image for active meeting
   */
  protected async setInitialImage(action: any): Promise<void> {
    await this.setImage(action, 'activeMeeting');
  }
  
  /**
   * Handle single key press - cycle through concurrent meetings
   */
  protected async handleSinglePress(action: any): Promise<void> {
    const activeEvents = findActiveEvents(calendarCache.events);
    
    if (activeEvents.length > 1) {
      // Cycle to next meeting
      this.currentMeetingIndex = (this.currentMeetingIndex + 1) % activeEvents.length;
      logger.debug(`Switched to meeting ${this.currentMeetingIndex + 1} of ${activeEvents.length}`);
      await this.updateDisplay(action);
    } else if (this.meetingEnded) {
      // Meeting ended, try to show next meeting
      this.meetingEnded = false;
      this.currentMeetingIndex = 0;
      await this.updateDisplay(action);
    }
  }
  
  /**
   * Update display with time remaining in meeting
   */
  protected async updateDisplay(action: any): Promise<void> {
    // Check cache status
    if (calendarCache.status !== 'LOADED' && calendarCache.status !== 'NO_EVENTS') {
      const statusText = getStatusText(calendarCache.status);
      logger.debug(`[TimeLeft] Cache status: ${calendarCache.status}, showing: ${statusText}`);
      await action.setTitle(statusText);
      await this.setImage(action, 'activeMeeting');
      return;
    }
    
    // Find active events
    const activeEvents = findActiveEvents(calendarCache.events);
    
    logger.debug(`[TimeLeft] Cache has ${calendarCache.events.length} total events, ${activeEvents.length} active`);
    
    if (activeEvents.length === 0) {
      // No active meetings
      logger.debug(`[TimeLeft] No active meetings, meetingEnded=${this.meetingEnded}`);
      if (!this.meetingEnded) {
        await action.setTitle('No\nActive\nMeeting');
        await this.setImage(action, 'activeMeeting');
      }
      return;
    }
    
    // Reset meeting ended flag if we have active meetings
    this.meetingEnded = false;
    
    // Get current meeting (cycle through if multiple)
    if (this.currentMeetingIndex >= activeEvents.length) {
      this.currentMeetingIndex = 0;
    }
    
    const currentMeeting = activeEvents[this.currentMeetingIndex];
    
    // Calculate time remaining
    const secondsRemaining = secondsUntil(currentMeeting.end);
    
    logger.debug(`[TimeLeft] Meeting ${this.currentMeetingIndex + 1}/${activeEvents.length}: "${currentMeeting.summary}", ends: ${currentMeeting.end.toISOString()}, ${secondsRemaining}s remaining`);
    
    // Check if meeting has ended
    if (secondsRemaining < -300) {
      // Meeting ended more than 5 minutes ago
      logger.debug(`[TimeLeft] Meeting ended >5min ago (${secondsRemaining}s), clearing display`);
      this.meetingEnded = true;
      this.currentMeetingIndex = 0;
      await action.setTitle('No\nActive\nMeeting');
      await this.setImage(action, 'activeMeeting');
      return;
    }
    
    // Update image based on time remaining
    let imageState = 'normal';
    if (secondsRemaining < 0) {
      // Meeting has ended but within 5 minute grace period
      imageState = 'red (grace period)';
      await this.setImage(action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.RED_ZONE) {
      imageState = 'red';
      await this.setImage(action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.ORANGE_ZONE) {
      imageState = 'orange';
      await this.setImage(action, 'activeMeetingOrange');
    } else {
      await this.setImage(action, 'activeMeeting');
    }
    logger.debug(`[TimeLeft] Display: ${secondsRemaining}s, image=${imageState}`);
    
    // Update title with time remaining
    const timeText = sec2time(secondsRemaining);
    
    // Add indicator if multiple meetings
    const titleText = activeEvents.length > 1 
      ? `${timeText}\n(${this.currentMeetingIndex + 1}/${activeEvents.length})`
      : timeText;
    
    await action.setTitle(titleText);
  }
  
  /**
   * Override to clear timeouts when disappearing
   */
  async onWillDisappear(ev: any): Promise<void> {
    if (this.endTimeout) {
      clearTimeout(this.endTimeout);
      this.endTimeout = undefined;
    }
    await super.onWillDisappear(ev);
  }
}
