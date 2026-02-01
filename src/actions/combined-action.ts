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
 * CombinedAction action class
 */
@action({ UUID: 'com.pedrofuentes.ical.combined' })
export class CombinedAction extends BaseAction {
  private currentMode: DisplayMode = 'no-events';
  private showingTitle: boolean = false;
  private titleTimeout?: NodeJS.Timeout;
  private marqueeInterval?: NodeJS.Timeout;
  private marqueePosition: number = 0;
  private currentMeetingIndex: number = 0;
  private lastActiveMeetingIds: Set<string> = new Set();
  
  /**
   * Set initial image based on mode
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
   * Handle single key press based on current mode
   */
  protected async handleSinglePress(action: any): Promise<void> {
    if (this.currentMode === 'time-left') {
      // Cycle through concurrent meetings (like TimeLeft)
      const activeEvents = findActiveEvents(this.getEvents());
      if (activeEvents.length > 1) {
        this.currentMeetingIndex = (this.currentMeetingIndex + 1) % activeEvents.length;
        logger.info(`[Combined] Switched to meeting ${this.currentMeetingIndex + 1}/${activeEvents.length}: "${activeEvents[this.currentMeetingIndex].summary}"`);
        await this.updateDisplay(action);
      }
    } else if (this.currentMode === 'next-meeting') {
      // Show title marquee (like NextMeeting)
      if (this.showingTitle) {
        this.stopMarquee();
        this.showingTitle = false;
        await this.updateDisplay(action);
      } else {
        const nextEvent = findNextEvent(this.getEvents());
        if (nextEvent) {
          this.startMarquee(action, nextEvent.summary);
        }
      }
    }
  }
  
  /**
   * Start marquee display of meeting title (copied from NextMeetingAction)
   */
  private startMarquee(action: any, title: string): void {
    this.showingTitle = true;
    this.marqueePosition = 0;
    
    this.stopMarquee();
    
    const paddedTitle = `${title}  •  `;
    const displayWidth = 7;
    
    const updateMarquee = async () => {
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
    
    updateMarquee();
    this.marqueeInterval = setInterval(updateMarquee, 250);
    
    // Auto-stop after configured duration
    const displayDuration = this.getTitleDisplayDuration() * 1000;
    this.titleTimeout = setTimeout(() => {
      this.stopMarquee();
      this.showingTitle = false;
      this.updateDisplay(action);
    }, displayDuration);
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
   * Update display - dynamically switch between Time Left and Next Meeting
   */
  protected async updateDisplay(action: any): Promise<void> {
    // Don't update if showing marquee
    if (this.showingTitle) {
      return;
    }
    
    // Check cache status
    const status = this.getCacheStatus();
    if (status !== 'LOADED' && status !== 'NO_EVENTS') {
      const statusText = getStatusText(status);
      logger.debug(`[Combined] Cache status: ${status}, showing: ${statusText}`);
      await action.setTitle(statusText);
      await this.setImage(action, 'nextMeeting');
      this.currentMode = 'no-events';
      return;
    }
    
    // Find active and upcoming events
    const events = this.getEvents();
    const activeEvents = findActiveEvents(events);
    const nextEvent = findNextEvent(events);
    
    logger.debug(`[Combined] Active events: ${activeEvents.length}, next event: ${nextEvent?.summary || 'none'}`);
    
    if (activeEvents.length > 0) {
      // Show Time Left mode
      await this.updateTimeLeftDisplay(action, activeEvents);
    } else if (nextEvent) {
      // Show Next Meeting mode
      await this.updateNextMeetingDisplay(action, nextEvent);
    } else {
      // No events
      this.currentMode = 'no-events';
      await action.setTitle('No\nMeetings');
      await this.setImage(action, 'nextMeeting');
    }
  }
  
  /**
   * Update display in Time Left mode
   */
  private async updateTimeLeftDisplay(action: any, activeEvents: any[]): Promise<void> {
    const prevMode = this.currentMode;
    this.currentMode = 'time-left';
    
    // Check for newly started meetings (flash if enabled)
    const currentMeetingIds = new Set(activeEvents.map(e => `${e.summary}-${e.start.getTime()}`));
    const newMeetings = activeEvents.filter(e => !this.lastActiveMeetingIds.has(`${e.summary}-${e.start.getTime()}`));
    
    if (newMeetings.length > 0 && (this.lastActiveMeetingIds.size > 0 || activeEvents.length === newMeetings.length)) {
      logger.info(`[Combined] New meeting started: "${newMeetings[0].summary}"`);
      // Flash to alert user of meeting start
      await this.flashButton(action, 'activeMeeting', 'activeMeetingRed');
    }
    
    this.lastActiveMeetingIds = currentMeetingIds;
    
    // Get current meeting
    if (this.currentMeetingIndex >= activeEvents.length) {
      this.currentMeetingIndex = 0;
    }
    
    const currentMeeting = activeEvents[this.currentMeetingIndex];
    const secondsRemaining = secondsUntil(currentMeeting.end);
    
    logger.debug(`[Combined/TimeLeft] Meeting ${this.currentMeetingIndex + 1}/${activeEvents.length}: "${currentMeeting.summary}", ${secondsRemaining}s remaining`);
    
    // Update image based on time remaining
    if (secondsRemaining < 0) {
      await this.setImage(action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.RED_ZONE) {
      await this.setImage(action, 'activeMeetingRed');
    } else if (secondsRemaining <= this.ORANGE_ZONE) {
      await this.setImage(action, 'activeMeetingOrange');
    } else {
      await this.setImage(action, 'activeMeeting');
    }
    
    // Update title
    const timeText = sec2time(secondsRemaining);
    const titleText = activeEvents.length > 1 
      ? `${timeText}\n(${this.currentMeetingIndex + 1}/${activeEvents.length})`
      : timeText;
    
    await action.setTitle(titleText);
  }
  
  /**
   * Update display in Next Meeting mode
   */
  private async updateNextMeetingDisplay(action: any, nextEvent: any): Promise<void> {
    this.currentMode = 'next-meeting';
    this.lastActiveMeetingIds.clear(); // Reset tracking when no active meetings
    
    const secondsRemaining = secondsUntil(nextEvent.start);
    
    logger.debug(`[Combined/NextMeeting] Event: "${nextEvent.summary}", in ${secondsRemaining}s`);
    
    if (secondsRemaining < 0) {
      // Event has started, will switch to time-left on next tick
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
   * Override to clean up resources
   */
  async onWillDisappear(ev: any): Promise<void> {
    this.stopMarquee();
    await super.onWillDisappear(ev);
  }
}
