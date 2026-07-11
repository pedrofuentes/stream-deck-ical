/**
 * TimeLeft action - shows time remaining in current meeting
 *
 * The behavior lives in the decorator-free {@link TimeLeftActionBase}; this file
 * is the @action-decorated leaf. It carries only the explicit onKeyUp() override
 * the Stream Deck SDK requires per action class (see AGENTS.md / issue #53).
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action, KeyUpEvent } from '@elgato/streamdeck';
import { TimeLeftActionBase } from './time-left-base.js';

/**
 * TimeLeft action class
 */
@action({ UUID: 'com.pedrofuentes.ical.timeleft' })
export class TimeLeftAction extends TimeLeftActionBase {
  /**
   * Override onKeyUp to handle button press - required for SDK event routing
   */
  override async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    await super.onKeyUp(ev);
  }
}
