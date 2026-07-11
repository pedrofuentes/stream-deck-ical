/**
 * NextMeetingActionBase - decorator-free display/business logic for NextMeetingAction.
 *
 * All of NextMeetingAction's behavior lives here so it can be imported directly by
 * vitest (the @action-decorated leaf class throws SyntaxError under vitest's
 * esbuild transform). The decorated leaf in next-meeting.ts is a thin subclass that
 * only re-declares the explicit onKeyUp() override the SDK requires.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { BaseAction } from './base-action.js';
import { getStatusText } from '../services/calendar-service.js';
import { findNextEvent } from '../utils/event-utils.js';
import { secondsUntil, sec2time } from '../utils/time-utils.js';
import { logger } from '../utils/logger.js';

/**
 * Per-button state for NextMeeting (marquee, title display)
 */
interface NextMeetingButtonState {
  showingTitle: boolean;
  titleTimeout?: NodeJS.Timeout;
  marqueeInterval?: NodeJS.Timeout;
  marqueePosition: number;
}

/**
 * NextMeetingActionBase - holds all NextMeetingAction logic (decorator-free)
 */
export class NextMeetingActionBase extends BaseAction {
  // Per-button marquee state
  private nextMeetingStates: Map<string, NextMeetingButtonState> = new Map();

  /**
   * Get or create NextMeeting-specific state for a button
   */
  private getNextMeetingState(actionId: string): NextMeetingButtonState {
    let state = this.nextMeetingStates.get(actionId);
    if (!state) {
      state = {
        showingTitle: false,
        marqueePosition: 0
      };
      this.nextMeetingStates.set(actionId, state);
    }
    return state;
  }

  /**
   * Set initial image for next meeting
   */
  protected async setInitialImage(action: any): Promise<void> {
    // setInitialImage doesn't have actionId in base signature, use action.id
    const actionId = action.id;
    await this.setImage(actionId, action, 'nextMeeting');
  }

  /**
   * Handle single key press - show meeting title
   */
  protected override async handleSinglePress(actionId: string, action: any): Promise<void> {
    const nmState = this.getNextMeetingState(actionId);

    if (nmState.showingTitle) {
      // Already showing title, stop marquee
      this.stopMarquee(actionId);
      nmState.showingTitle = false;
      // Resume normal display
      await this.updateDisplay(actionId, action);
    } else {
      // Show title as marquee
      const nextEvent = findNextEvent(this.getEventsForButton(actionId));
      if (nextEvent) {
        this.startMarquee(actionId, action, nextEvent.summary);
      }
    }
  }

  /**
   * Start marquee display of meeting title
   */
  private startMarquee(actionId: string, action: any, title: string): void {
    const nmState = this.getNextMeetingState(actionId);
    nmState.showingTitle = true;
    nmState.marqueePosition = 0;

    // Clear any existing marquee
    this.stopMarquee(actionId);

    // Pad title for smooth scrolling (spaces at end for wrap-around)
    const paddedTitle = `${title}  •  `;
    const displayWidth = 7; // Characters visible at once (fits Stream Deck button)

    const updateMarquee = async () => {
      // Extract visible portion with wrap-around
      let displayText = '';
      for (let i = 0; i < displayWidth; i++) {
        const charIndex = (nmState.marqueePosition + i) % paddedTitle.length;
        displayText += paddedTitle[charIndex];
      }

      await this.setTitleForButton(actionId, action, displayText);

      nmState.marqueePosition++;
      if (nmState.marqueePosition >= paddedTitle.length) {
        nmState.marqueePosition = 0;
      }
    };

    // Update immediately
    updateMarquee();

    // Update every 250ms for smooth scrolling
    nmState.marqueeInterval = setInterval(updateMarquee, 250);

    // Auto-stop after configurable duration (default 15 seconds)
    const displayDuration = this.getTitleDisplayDuration() * 1000;
    nmState.titleTimeout = setTimeout(() => {
      this.stopMarquee(actionId);
      nmState.showingTitle = false;
      this.updateDisplay(actionId, action);
    }, displayDuration);
  }

  /**
   * Stop marquee display for a specific button
   */
  private stopMarquee(actionId: string): void {
    const nmState = this.nextMeetingStates.get(actionId);
    if (nmState) {
      if (nmState.marqueeInterval) {
        clearInterval(nmState.marqueeInterval);
        nmState.marqueeInterval = undefined;
      }
      if (nmState.titleTimeout) {
        clearTimeout(nmState.titleTimeout);
        nmState.titleTimeout = undefined;
      }
    }
  }

  /**
   * Update display with countdown to next meeting
   */
  protected async updateDisplay(actionId: string, action: any): Promise<void> {
    const nmState = this.getNextMeetingState(actionId);

    // Don't update if showing marquee
    if (nmState.showingTitle) {
      return;
    }

    // Check cache status
    const status = this.getCacheStatusForButton(actionId);
    if (status !== 'LOADED' && status !== 'NO_EVENTS') {
      const statusText = getStatusText(status);
      this.debugForButton(actionId, `[NextMeeting:${actionId}] Cache status: ${status}, showing: ${statusText}`);
      await this.setTitleForButton(actionId, action, statusText);
      await this.setImage(actionId, action, 'nextMeeting');
      return;
    }

    // Find next event
    const events = this.getEventsForButton(actionId);
    const nextEvent = findNextEvent(events);

    this.debugForButton(actionId, `[NextMeeting:${actionId}] Cache has ${events.length} total events, next=${nextEvent ? nextEvent.summary : 'none'}`);

    if (!nextEvent) {
      await this.setTitleForButton(actionId, action, 'No\nUpcoming\nMeeting');
      await this.setImage(actionId, action, 'nextMeeting');
      return;
    }

    // Calculate time until meeting
    const secondsRemaining = secondsUntil(nextEvent.start);

    logger.debug(`[NextMeeting:${actionId}] Event: "${nextEvent.summary}", starts: ${nextEvent.start.toISOString()}, in ${secondsRemaining}s`);

    if (secondsRemaining < 0) {
      // Event has started, find the next one
      logger.debug(`[NextMeeting:${actionId}] Event already started (${secondsRemaining}s ago), will refresh on next tick`);
      // Don't update this tick, let next tick handle it
      return;
    }

    // Update image based on time remaining
    let imageState = 'normal';
    if (secondsRemaining <= this.getRedZone()) {
      imageState = 'red';
      await this.setImage(actionId, action, 'nextMeetingRed');
    } else if (secondsRemaining <= this.getOrangeZone()) {
      imageState = 'orange';
      await this.setImage(actionId, action, 'nextMeetingOrange');
    } else {
      await this.setImage(actionId, action, 'nextMeeting');
    }

    // Update title with countdown
    const timeText = sec2time(secondsRemaining);
    logger.debug(`[NextMeeting:${actionId}] Display: ${timeText}, image=${imageState}`);
    await this.setTitleForButton(actionId, action, timeText);
  }

  /**
   * Override the shared cleanup hook so NextMeeting-specific state (marquee) is
   * torn down for both SDK disappearances and reaped orphans (#50).
   */
  protected override async cleanupButtonState(actionId: string): Promise<void> {
    this.stopMarquee(actionId);
    // Clean up NextMeeting-specific state
    this.nextMeetingStates.delete(actionId);
    await super.cleanupButtonState(actionId);
  }
}
