/**
 * TimeLeft action - shows time remaining in current meeting
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action, KeyDownEvent, KeyUpEvent } from '@elgato/streamdeck';
import { BaseAction } from './base-action.js';
import { getStatusText } from '../services/calendar-service.js';
import { findActiveEvents } from '../utils/event-utils.js';
import { secondsUntil, sec2time } from '../utils/time-utils.js';
import { logger } from '../utils/logger.js';

/**
 * Per-button state for TimeLeft (concurrent meeting cycling, end tracking)
 */
interface TimeLeftButtonState {
  currentMeetingIndex: number;
  meetingEnded: boolean;
  endTimeout?: NodeJS.Timeout;
  lastActiveMeetingIds: Set<string>;
}

/**
 * TimeLeft action class
 */
@action({ UUID: 'com.pedrofuentes.ical.timeleft' })
export class TimeLeftAction extends BaseAction {
  // Per-button TimeLeft state
  private timeLeftStates: Map<string, TimeLeftButtonState> = new Map();
  
  /**
   * Get or create TimeLeft-specific state for a button
   */
  private getTimeLeftState(actionId: string): TimeLeftButtonState {
    let state = this.timeLeftStates.get(actionId);
    if (!state) {
      state = {
        currentMeetingIndex: 0,
        meetingEnded: false,
        lastActiveMeetingIds: new Set()
      };
      this.timeLeftStates.set(actionId, state);
    }
    return state;
  }
  
  /**
   * Set initial image for active meeting
   */
  protected async setInitialImage(action: any): Promise<void> {
    const actionId = action.id;
    await this.setImage(actionId, action, 'activeMeeting');
  }
  
  /**
   * Override onKeyUp to handle button press - required for SDK event routing
   */
  async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    await super.onKeyUp(ev);
  }
  
  /**
   * Handle single key press - cycle through concurrent meetings
   */
  protected async handleSinglePress(actionId: string, action: any): Promise<void> {
    const tlState = this.getTimeLeftState(actionId);
    const activeEvents = findActiveEvents(this.getEventsForButton(actionId));
    
    if (activeEvents.length > 1) {
      // Cycle to next meeting
      tlState.currentMeetingIndex = (tlState.currentMeetingIndex + 1) % activeEvents.length;
      logger.info(`[TimeLeft:${actionId}] Switched to meeting ${tlState.currentMeetingIndex + 1}/${activeEvents.length}: "${activeEvents[tlState.currentMeetingIndex].summary}"`);
      await this.updateDisplay(actionId, action);
    } else if (tlState.meetingEnded) {
      // Meeting ended, try to show next meeting
      tlState.meetingEnded = false;
      tlState.currentMeetingIndex = 0;
      await this.updateDisplay(actionId, action);
    }
  }
  
  /**
   * Update display with time remaining in meeting
   */
  protected async updateDisplay(actionId: string, action: any): Promise<void> {
    const tlState = this.getTimeLeftState(actionId);
    
    // Check cache status
    const status = this.getCacheStatusForButton(actionId);
    if (status !== 'LOADED' && status !== 'NO_EVENTS') {
      const statusText = getStatusText(status);
      logger.debug(`[TimeLeft:${actionId}] Cache status: ${status}, showing: ${statusText}`);
      await action.setTitle(statusText);
      await this.setImage(actionId, action, 'activeMeeting');
      return;
    }
    
    // Find active events
    const events = this.getEventsForButton(actionId);
    const activeEvents = findActiveEvents(events);
    
    logger.debug(`[TimeLeft:${actionId}] Cache has ${events.length} total events, ${activeEvents.length} active`);
    
    if (activeEvents.length === 0) {
      // No active meetings
      logger.debug(`[TimeLeft:${actionId}] No active meetings, meetingEnded=${tlState.meetingEnded}`);
      if (!tlState.meetingEnded) {
        await action.setTitle('No\nActive\nMeeting');
        await this.setImage(actionId, action, 'activeMeeting');
      }
      return;
    }
    
    // Reset meeting ended flag if we have active meetings
    tlState.meetingEnded = false;
    
    // Check for newly started meetings (flash if enabled)
    const currentMeetingIds = new Set(activeEvents.map(e => `${e.summary}-${e.start.getTime()}`));
    const newMeetings = activeEvents.filter(e => !tlState.lastActiveMeetingIds.has(`${e.summary}-${e.start.getTime()}`));
    
    if (newMeetings.length > 0 && tlState.lastActiveMeetingIds.size > 0 || (newMeetings.length > 0 && tlState.lastActiveMeetingIds.size === 0 && activeEvents.length === newMeetings.length)) {
      // New meeting started - flash the button
      logger.info(`[TimeLeft:${actionId}] New meeting started: "${newMeetings[0].summary}" - flashing button`);
      this.flashButton(actionId, action, 'activeMeeting', 'activeMeetingRed');
    }
    
    // Update tracking
    tlState.lastActiveMeetingIds = currentMeetingIds;
    
    // Get current meeting (cycle through if multiple)
    if (tlState.currentMeetingIndex >= activeEvents.length) {
      tlState.currentMeetingIndex = 0;
    }
    
    const currentMeeting = activeEvents[tlState.currentMeetingIndex];
    
    // Calculate time remaining
    const secondsRemaining = secondsUntil(currentMeeting.end);
    
    logger.debug(`[TimeLeft:${actionId}] Meeting ${tlState.currentMeetingIndex + 1}/${activeEvents.length}: "${currentMeeting.summary}", ends: ${currentMeeting.end.toISOString()}, ${secondsRemaining}s remaining`);
    
    // Check if meeting has ended
    if (secondsRemaining < -300) {
      // Meeting ended more than 5 minutes ago
      logger.debug(`[TimeLeft:${actionId}] Meeting ended >5min ago (${secondsRemaining}s), clearing display`);
      tlState.meetingEnded = true;
      tlState.currentMeetingIndex = 0;
      await action.setTitle('No\nActive\nMeeting');
      await this.setImage(actionId, action, 'activeMeeting');
      return;
    }
    
    // Update image based on time remaining
    let imageState = 'normal';
    if (secondsRemaining < 0) {
      // Meeting has ended but within 5 minute grace period
      imageState = 'red (grace period)';
      await this.setImage(actionId, action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.RED_ZONE) {
      imageState = 'red';
      await this.setImage(actionId, action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.ORANGE_ZONE) {
      imageState = 'orange';
      await this.setImage(actionId, action, 'activeMeetingOrange');
    } else {
      await this.setImage(actionId, action, 'activeMeeting');
    }
    logger.debug(`[TimeLeft:${actionId}] Display: ${secondsRemaining}s, image=${imageState}`);
    
    // Update title with time remaining
    const timeText = sec2time(secondsRemaining);
    
    // Add indicator if multiple meetings
    const titleText = activeEvents.length > 1 
      ? `${timeText}\n(${tlState.currentMeetingIndex + 1}/${activeEvents.length})`
      : timeText;
    
    await action.setTitle(titleText);
  }
  
  /**
   * Override to clear timeouts when disappearing
   */
  async onWillDisappear(ev: any): Promise<void> {
    const actionId = ev.action.id;
    const tlState = this.timeLeftStates.get(actionId);
    if (tlState?.endTimeout) {
      clearTimeout(tlState.endTimeout);
    }
    // Clean up TimeLeft-specific state
    this.timeLeftStates.delete(actionId);
    await super.onWillDisappear(ev);
  }
}
