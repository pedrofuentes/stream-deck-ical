/**
 * CombinedAction - smart action that shows either Time Left or Next Meeting
 * 
 * This action automatically switches between:
 * - Time Left: when a meeting is currently active
 * - Next Meeting: when no meeting is active
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action, KeyUpEvent } from '@elgato/streamdeck';
import { BaseAction } from './base-action.js';
import { getStatusText } from '../services/calendar-service.js';
import { findActiveEvents, findNextEvent } from '../utils/event-utils.js';
import { secondsUntil, sec2time } from '../utils/time-utils.js';
import { logger } from '../utils/logger.js';

type DisplayMode = 'time-left' | 'next-meeting' | 'no-events';

/**
 * Per-button state for CombinedAction
 */
interface CombinedButtonState {
  currentMode: DisplayMode;
  showingTitle: boolean;
  titleTimeout?: NodeJS.Timeout;
  marqueeInterval?: NodeJS.Timeout;
  marqueePosition: number;
  currentMeetingIndex: number;
  lastActiveMeetingIds: Set<string>;
}

/**
 * CombinedAction action class
 */
@action({ UUID: 'com.pedrofuentes.ical.combined' })
export class CombinedAction extends BaseAction {
  // Per-button Combined state
  private combinedStates: Map<string, CombinedButtonState> = new Map();
  
  /**
   * Get or create Combined-specific state for a button
   */
  private getCombinedState(actionId: string): CombinedButtonState {
    let state = this.combinedStates.get(actionId);
    if (!state) {
      state = {
        currentMode: 'no-events',
        showingTitle: false,
        marqueePosition: 0,
        currentMeetingIndex: 0,
        lastActiveMeetingIds: new Set()
      };
      this.combinedStates.set(actionId, state);
    }
    return state;
  }
  
  /**
   * Set initial image based on mode
   */
  protected async setInitialImage(action: any): Promise<void> {
    const actionId = action.id;
    await this.setImage(actionId, action, 'nextMeeting');
  }
  
  /**
   * Override onKeyUp to handle button press - required for SDK event routing
   */
  async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    await super.onKeyUp(ev);
  }
  
  /**
   * Handle single key press based on current mode
   */
  protected async handleSinglePress(actionId: string, action: any): Promise<void> {
    const cbState = this.getCombinedState(actionId);
    
    if (cbState.currentMode === 'time-left') {
      // Cycle through concurrent meetings (like TimeLeft)
      const activeEvents = findActiveEvents(this.getEventsForButton(actionId));
      if (activeEvents.length > 1) {
        cbState.currentMeetingIndex = (cbState.currentMeetingIndex + 1) % activeEvents.length;
        logger.info(`[Combined:${actionId}] Switched to meeting ${cbState.currentMeetingIndex + 1}/${activeEvents.length}: "${activeEvents[cbState.currentMeetingIndex].summary}"`);
        await this.updateDisplay(actionId, action);
      }
    } else if (cbState.currentMode === 'next-meeting') {
      // Show title marquee (like NextMeeting)
      if (cbState.showingTitle) {
        this.stopMarquee(actionId);
        cbState.showingTitle = false;
        await this.updateDisplay(actionId, action);
      } else {
        const nextEvent = findNextEvent(this.getEventsForButton(actionId));
        if (nextEvent) {
          this.startMarquee(actionId, action, nextEvent.summary);
        }
      }
    }
  }
  
  /**
   * Start marquee display of meeting title
   */
  private startMarquee(actionId: string, action: any, title: string): void {
    const cbState = this.getCombinedState(actionId);
    cbState.showingTitle = true;
    cbState.marqueePosition = 0;
    
    this.stopMarquee(actionId);
    
    const paddedTitle = `${title}  •  `;
    const displayWidth = 7;
    
    const updateMarquee = async () => {
      let displayText = '';
      for (let i = 0; i < displayWidth; i++) {
        const charIndex = (cbState.marqueePosition + i) % paddedTitle.length;
        displayText += paddedTitle[charIndex];
      }
      
      await action.setTitle(displayText);
      
      cbState.marqueePosition++;
      if (cbState.marqueePosition >= paddedTitle.length) {
        cbState.marqueePosition = 0;
      }
    };
    
    updateMarquee();
    cbState.marqueeInterval = setInterval(updateMarquee, 250);
    
    // Auto-stop after configured duration
    const displayDuration = this.getTitleDisplayDuration() * 1000;
    cbState.titleTimeout = setTimeout(() => {
      this.stopMarquee(actionId);
      cbState.showingTitle = false;
      this.updateDisplay(actionId, action);
    }, displayDuration);
  }
  
  /**
   * Stop marquee display for a specific button
   */
  private stopMarquee(actionId: string): void {
    const cbState = this.combinedStates.get(actionId);
    if (cbState) {
      if (cbState.marqueeInterval) {
        clearInterval(cbState.marqueeInterval);
        cbState.marqueeInterval = undefined;
      }
      if (cbState.titleTimeout) {
        clearTimeout(cbState.titleTimeout);
        cbState.titleTimeout = undefined;
      }
    }
  }
  
  /**
   * Update display - dynamically switch between Time Left and Next Meeting
   */
  protected async updateDisplay(actionId: string, action: any): Promise<void> {
    const cbState = this.getCombinedState(actionId);
    
    // Don't update if showing marquee
    if (cbState.showingTitle) {
      return;
    }
    
    // Check cache status
    const status = this.getCacheStatusForButton(actionId);
    if (status !== 'LOADED' && status !== 'NO_EVENTS') {
      const statusText = getStatusText(status);
      logger.debug(`[Combined:${actionId}] Cache status: ${status}, showing: ${statusText}`);
      await action.setTitle(statusText);
      await this.setImage(actionId, action, 'nextMeeting');
      cbState.currentMode = 'no-events';
      return;
    }
    
    // Find active and upcoming events
    const events = this.getEventsForButton(actionId);
    const activeEvents = findActiveEvents(events);
    const nextEvent = findNextEvent(events);
    
    logger.debug(`[Combined:${actionId}] Active events: ${activeEvents.length}, next event: ${nextEvent?.summary || 'none'}`);
    
    if (activeEvents.length > 0) {
      // Show Time Left mode
      await this.updateTimeLeftDisplay(actionId, action, activeEvents);
    } else if (nextEvent) {
      // Show Next Meeting mode
      await this.updateNextMeetingDisplay(actionId, action, nextEvent);
    } else {
      // No events
      cbState.currentMode = 'no-events';
      await action.setTitle('No\nMeetings');
      await this.setImage(actionId, action, 'nextMeeting');
    }
  }
  
  /**
   * Update display in Time Left mode
   */
  private async updateTimeLeftDisplay(actionId: string, action: any, activeEvents: any[]): Promise<void> {
    const cbState = this.getCombinedState(actionId);
    const prevMode = cbState.currentMode;
    cbState.currentMode = 'time-left';
    
    // Check for newly started meetings (flash if enabled)
    const currentMeetingIds = new Set(activeEvents.map(e => `${e.summary}-${e.start.getTime()}`));
    const newMeetings = activeEvents.filter(e => !cbState.lastActiveMeetingIds.has(`${e.summary}-${e.start.getTime()}`));
    
    if (newMeetings.length > 0 && (cbState.lastActiveMeetingIds.size > 0 || activeEvents.length === newMeetings.length)) {
      logger.info(`[Combined:${actionId}] New meeting started: "${newMeetings[0].summary}"`);
      // Flash to alert user of meeting start
      await this.flashButton(actionId, action, 'activeMeeting', 'activeMeetingRed');
    }
    
    cbState.lastActiveMeetingIds = currentMeetingIds;
    
    // Get current meeting
    if (cbState.currentMeetingIndex >= activeEvents.length) {
      cbState.currentMeetingIndex = 0;
    }
    
    const currentMeeting = activeEvents[cbState.currentMeetingIndex];
    const secondsRemaining = secondsUntil(currentMeeting.end);
    
    logger.debug(`[Combined:${actionId}/TimeLeft] Meeting ${cbState.currentMeetingIndex + 1}/${activeEvents.length}: "${currentMeeting.summary}", ${secondsRemaining}s remaining`);
    
    // Update image based on time remaining
    if (secondsRemaining < 0) {
      await this.setImage(actionId, action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.getRedZone()) {
      await this.setImage(actionId, action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.getOrangeZone()) {
      await this.setImage(actionId, action, 'activeMeetingOrange');
    } else {
      await this.setImage(actionId, action, 'activeMeeting');
    }
    
    // Update title
    const timeText = sec2time(secondsRemaining);
    const titleText = activeEvents.length > 1 
      ? `${timeText}\n(${cbState.currentMeetingIndex + 1}/${activeEvents.length})`
      : timeText;
    
    await action.setTitle(titleText);
  }
  
  /**
   * Update display in Next Meeting mode
   */
  private async updateNextMeetingDisplay(actionId: string, action: any, nextEvent: any): Promise<void> {
    const cbState = this.getCombinedState(actionId);
    cbState.currentMode = 'next-meeting';
    cbState.lastActiveMeetingIds.clear(); // Reset tracking when no active meetings
    
    const secondsRemaining = secondsUntil(nextEvent.start);
    
    logger.debug(`[Combined:${actionId}/NextMeeting] Event: "${nextEvent.summary}", in ${secondsRemaining}s`);
    
    if (secondsRemaining < 0) {
      // Event has started, will switch to time-left on next tick
      return;
    }
    
    // Update image based on time remaining
    if (secondsRemaining <= this.getRedZone()) {
      await this.setImage(actionId, action, 'nextMeetingRed');
    } else if (secondsRemaining <= this.getOrangeZone()) {
      await this.setImage(actionId, action, 'nextMeetingOrange');
    } else {
      await this.setImage(actionId, action, 'nextMeeting');
    }
    
    // Update title with countdown
    const timeText = sec2time(secondsRemaining);
    await action.setTitle(timeText);
  }
  
  /**
   * Override to clean up resources
   */
  async onWillDisappear(ev: any): Promise<void> {
    const actionId = ev.action.id;
    this.stopMarquee(actionId);
    // Clean up Combined-specific state
    this.combinedStates.delete(actionId);
    await super.onWillDisappear(ev);
  }
}
