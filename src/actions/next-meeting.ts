/**
 * NextMeeting action - shows countdown to next upcoming meeting
 *
 * The behavior lives in the decorator-free {@link NextMeetingActionBase}; this file
 * is the @action-decorated leaf. It carries only the explicit onKeyUp() override
 * the Stream Deck SDK requires per action class (see AGENTS.md / issue #53).
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action, KeyUpEvent } from '@elgato/streamdeck';
import { NextMeetingActionBase } from './next-meeting-base.js';

/**
 * NextMeeting action class
 */
@action({ UUID: 'com.pedrofuentes.ical.nextmeeting' })
export class NextMeetingAction extends NextMeetingActionBase {
  /**
   * Override onKeyUp to handle button press - required for SDK event routing
   */
  async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    await super.onKeyUp(ev);
  }
}
