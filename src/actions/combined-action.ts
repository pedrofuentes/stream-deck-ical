/**
 * CombinedAction - smart action that shows either Time Left or Next Meeting
 *
 * This action automatically switches between:
 * - Time Left: when a meeting is currently active
 * - Next Meeting: when no meeting is active
 *
 * The behavior lives in the decorator-free {@link CombinedActionBase}; this file
 * is the @action-decorated leaf. It carries only the explicit onKeyUp() override
 * the Stream Deck SDK requires per action class (see AGENTS.md / issue #53).
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { action, KeyUpEvent } from '@elgato/streamdeck';
import { CombinedActionBase } from './combined-action-base.js';

/**
 * CombinedAction action class
 */
@action({ UUID: 'com.pedrofuentes.ical.combined' })
export class CombinedAction extends CombinedActionBase {
  /**
   * Override onKeyUp to handle button press - required for SDK event routing
   */
  override async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    await super.onKeyUp(ev);
  }
}
