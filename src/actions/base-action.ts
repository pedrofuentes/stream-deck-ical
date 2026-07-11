/**
 * Base action class for Stream Deck actions
 * Provides common functionality for all action types
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import streamDeck, { action, SingletonAction, WillAppearEvent, WillDisappearEvent, KeyDownEvent, KeyUpEvent, DidReceiveSettingsEvent } from '@elgato/streamdeck';
import { calendarCache, getStatusText, forceRefreshCache, getSettings } from '../services/calendar-service.js';
import { calendarManager } from '../services/calendar-manager.js';
import { CalendarEvent, ActionSettings, ErrorState, NamedCalendar } from '../types/index.js';
import { logger } from '../utils/logger.js';

// Global settings (set by plugin.ts)
let globalUrl: string = '';
let globalTimeWindow: number = 3;
let globalExcludeAllDay: boolean = true;

// Named calendars (set by plugin.ts)
let namedCalendars: NamedCalendar[] = [];
let defaultCalendarId: string | undefined;

/**
 * Set global calendar settings (called from plugin.ts)
 * This is used as the default when no named calendars are configured
 */
export function setGlobalCalendarConfig(url: string, timeWindow: number, excludeAllDay: boolean): void {
  globalUrl = url;
  globalTimeWindow = timeWindow;
  globalExcludeAllDay = excludeAllDay;
}

/**
 * Set named calendars (called from plugin.ts)
 */
export function setNamedCalendars(calendars: NamedCalendar[], defaultId?: string): void {
  namedCalendars = calendars;
  defaultCalendarId = defaultId;
  logger.info(`[BaseAction] Named calendars set: ${calendars.length} calendars, default=${defaultId}`);
}

/**
 * Get a named calendar by ID
 */
export function getNamedCalendar(id: string): NamedCalendar | undefined {
  return namedCalendars.find(c => c.id === id);
}

/**
 * Get the default calendar
 */
export function getDefaultCalendar(): NamedCalendar | undefined {
  if (defaultCalendarId) {
    return namedCalendars.find(c => c.id === defaultCalendarId);
  }
  return namedCalendars[0]; // Fallback to first calendar
}

/**
 * Get all named calendars
 */
export function getNamedCalendars(): NamedCalendar[] {
  return namedCalendars;
}

/**
 * Per-button state for SingletonAction pattern
 * Since SingletonAction uses one instance for all buttons, we track state per button ID
 */
interface ButtonState {
  interval?: NodeJS.Timeout;
  waitingForCacheInterval?: NodeJS.Timeout;
  calendarRetryInterval?: NodeJS.Timeout;
  cacheVersion: number;
  currentImage: string;
  /** Last title sent to the SDK — used to skip redundant setTitle calls (#29) */
  currentTitle?: string;
  /** Title currently in flight to the SDK — coalesces duplicate setTitle calls (#74) */
  pendingTitle?: string;
  /** Monotonic per-button dispatch counter. Each in-flight setTitle captures the
   *  token it set; commit/clear only proceed when the token is still the latest, so
   *  an older same-text settlement can't clobber a newer dispatch's marker (#100). */
  titleDispatchToken?: number;
  /** Whether the current setTitle failure has already been logged — throttles the
   *  per-tick warn during a sustained IPC outage to one entry per outage (#72) */
  titleFailureLogged?: boolean;
  /** Last per-tick debug line — used to skip redundant debug buffering (#29) */
  lastDebugMessage?: string;
  lastKeyPress: number;
  actionRef: any;
  flashInterval?: NodeJS.Timeout;
  isFlashing: boolean;
  calendarId?: string;
  pendingCalendarId?: string;
  useCustomCalendar: boolean;
}

// Registry of all action instances for cross-action communication
const actionInstances: BaseAction[] = [];

/**
 * Test-only: clear the module-level action-instance registry.
 *
 * `actionInstances` accumulates one entry per `new BaseAction()` and is never
 * pruned, so across a test file previously-constructed instances leak into the
 * orphan sweep (which iterates every registered instance) and can reap another
 * test's button (#55). Call this from `beforeEach` in tests that exercise the
 * sweep to guarantee an isolated registry. Not used by production code.
 */
export function __resetActionInstancesForTest(): void {
  actionInstances.length = 0;
}

/**
 * Migrate buttons using deleted calendars to the default calendar.
 * Called when named calendars are updated.
 */
export function migrateDeletedCalendars(currentCalendarIds: string[]): void {
  logger.info(`[BaseAction] Checking for buttons using deleted calendars. Valid IDs: ${currentCalendarIds.join(', ')}`);

  for (const action of actionInstances) {
    action.migrateButtonsWithDeletedCalendar(currentCalendarIds);
  }
}

/** Default cadence for the orphan reconciliation sweep (#29). */
const ORPHAN_SWEEP_INTERVAL_MS = 60_000;

/** Env override for the sweep cadence (positive integer ms), e.g. for tests/tuning (#56.1). */
const ORPHAN_SWEEP_INTERVAL_ENV = 'ICAL_ORPHAN_SWEEP_MS';

// Single global sweep timer. Held at module scope because there is exactly one
// sweep for the whole plugin (it reconciles every action instance). Lifecycle is
// managed only through startOrphanSweep()/stopOrphanSweep(); tests that call
// startOrphanSweep() MUST call stopOrphanSweep() in afterEach to avoid a leaked
// interval bleeding across tests (#56.3).
let orphanSweepInterval: NodeJS.Timeout | undefined;

// Guards against overlapping sweeps: reapOrphanedButtons is async and a subclass
// cleanup hook can genuinely await, so a slow pass must not be re-entered by the
// next interval tick. Set before a pass starts, cleared in its .finally() (#78.3).
let sweepInFlight = false;

/**
 * Reap button states the Stream Deck no longer reports as visible.
 *
 * On macOS wake-from-sleep the Stream Deck app can re-emit onWillAppear with new
 * context IDs without a matching onWillDisappear for the old ones, leaking button
 * states that keep their 1-second display timers (and calendar refcounts) alive
 * forever — pinning CPU (#29). This single sweep reconciles every tracked button
 * across all action instances against the SDK's action store and runs the exact
 * onWillDisappear cleanup for any that are gone.
 *
 * @returns The action IDs that were reaped.
 */
export async function reapOrphanedButtons(): Promise<string[]> {
  const reaped: string[] = [];
  for (const instance of actionInstances) {
    reaped.push(...await instance.reapOrphans());
  }
  if (reaped.length > 0) {
    logger.info(`[BaseAction] Orphan sweep reaped ${reaped.length} stale button state(s): ${reaped.join(', ')}`);
  }
  return reaped;
}

/** Lower bound for the env sweep override (ms). Below this the sweep would hot-loop. */
const ORPHAN_SWEEP_MIN_MS = 1000;

/**
 * Upper bound for the env sweep override (ms). Node clamps setInterval delays above
 * the signed-32-bit max to 1ms, turning a "huge" cadence into a hot loop (#73).
 */
const ORPHAN_SWEEP_MAX_MS = 2_147_483_647;

/**
 * Resolve the sweep cadence: explicit param > env override > default.
 *
 * Both the explicit param and the env override must be a safe integer number of
 * milliseconds within [1000, 2147483647]; anything else (non-integer, out of range,
 * or a value Node would clamp to a 1ms hot loop) is ignored with a warning and the
 * 60s default is used, so a typo or a stray caller can't silently disable the sweep
 * or pin the CPU. The env string must additionally be a plain decimal integer — hex,
 * exponent and surrounding-whitespace forms that Number() would otherwise accept are
 * rejected so the warning text stays truthful (#56.1, #73, #104.1, #104.3).
 */
function resolveOrphanSweepInterval(intervalMs?: number): number {
  if (intervalMs !== undefined) {
    if (Number.isSafeInteger(intervalMs) && intervalMs >= ORPHAN_SWEEP_MIN_MS && intervalMs <= ORPHAN_SWEEP_MAX_MS) {
      return intervalMs;
    }
    // Apply the same bounds to the programmatic param as to the env override — an
    // out-of-range explicit value is a caller bug, so surface it and fall back to the
    // default rather than hot-loop or stall the sweep (#104.3).
    logger.warn(`[BaseAction] Ignoring out-of-range orphan sweep interval ${intervalMs}ms (expected integer ms in [${ORPHAN_SWEEP_MIN_MS}, ${ORPHAN_SWEEP_MAX_MS}]); using ${ORPHAN_SWEEP_INTERVAL_MS}ms default`);
    return ORPHAN_SWEEP_INTERVAL_MS;
  }
  const raw = process.env[ORPHAN_SWEEP_INTERVAL_ENV];
  if (raw !== undefined) {
    // Plain decimal digits only: rejects '0x7D0', '1e3', ' 5000 ' etc. that Number()
    // would coerce, keeping the "integer ms" contract in the warning honest (#104.1).
    const parsed = Number(raw);
    if (/^\d+$/.test(raw) && Number.isSafeInteger(parsed) && parsed >= ORPHAN_SWEEP_MIN_MS && parsed <= ORPHAN_SWEEP_MAX_MS) {
      return parsed;
    }
    logger.warn(`[BaseAction] Ignoring invalid ${ORPHAN_SWEEP_INTERVAL_ENV}="${raw}" (expected a plain decimal integer of ms in [${ORPHAN_SWEEP_MIN_MS}, ${ORPHAN_SWEEP_MAX_MS}])`);
  }
  return ORPHAN_SWEEP_INTERVAL_MS;
}

/**
 * Start the single global orphan-reconciliation sweep. Idempotent.
 *
 * @param intervalMs Explicit cadence (ms). When omitted, the ICAL_ORPHAN_SWEEP_MS
 *                   env override is used if valid, otherwise the 60s default.
 */
export function startOrphanSweep(intervalMs?: number): void {
  if (orphanSweepInterval) {
    return;
  }
  const resolvedMs = resolveOrphanSweepInterval(intervalMs);
  orphanSweepInterval = setInterval(() => {
    // Skip if the previous pass is still running so a slow sweep can't be re-entered
    // and pile up overlapping cleanups (#78.3).
    if (sweepInFlight) {
      return;
    }
    sweepInFlight = true;
    // reapOrphanedButtons is async; a rejected promise would otherwise escape this
    // synchronous callback with no unhandledRejection handler and crash the plugin (#50).
    reapOrphanedButtons()
      .catch(error => {
        logger.error('[BaseAction] Orphan sweep failed:', error);
      })
      .finally(() => {
        sweepInFlight = false;
      });
  }, resolvedMs);
  logger.info(`[BaseAction] Orphan sweep started (every ${Math.round(resolvedMs / 1000)}s)`);
}

/**
 * Stop the global orphan-reconciliation sweep (primarily for teardown/testing).
 */
export function stopOrphanSweep(): void {
  if (orphanSweepInterval) {
    clearInterval(orphanSweepInterval);
    orphanSweepInterval = undefined;
  }
  // Clear the overlap guard too. A pass whose .finally() never runs (e.g. a subclass
  // cleanup hook that hangs) would otherwise leave sweepInFlight stuck true, and the
  // next startOrphanSweep() would no-op every tick until the stale pass settled (#101).
  sweepInFlight = false;
}

/**
 * Test-only: force-clear the module-level orphan-sweep in-flight guard.
 *
 * Mirrors the #55 `__resetActionInstancesForTest` pattern: a test that leaves a
 * sweep pass hung (never resolved) would leak `sweepInFlight = true` into the next
 * test, silently no-op'ing its `startOrphanSweep()`. Call this from `beforeEach` in
 * sweep tests to guarantee an isolated guard. Not used by production code (#101).
 */
export function __resetSweepInFlightForTest(): void {
  sweepInFlight = false;
}

/**
 * Base action class with common functionality
 */
export abstract class BaseAction extends SingletonAction {
  // Per-button state storage (SingletonAction = one instance for all buttons)
  protected buttonStates: Map<string, ButtonState> = new Map();
  
  // Store the action settings per button for migration
  protected buttonSettings: Map<string, ActionSettings | undefined> = new Map();
  
  // Color zone defaults (in seconds) - can be overridden via settings
  protected readonly DEFAULT_RED_ZONE = 30;
  protected readonly DEFAULT_ORANGE_ZONE = 300; // 5 minutes
  
  constructor() {
    super();
    // Register this instance for cross-action communication
    actionInstances.push(this);
  }
  
  /**
   * Get the red zone threshold (in seconds)
   */
  protected getRedZone(): number {
    const globalSettings = calendarManager.getGlobalSettings();
    return globalSettings?.redThreshold ?? this.DEFAULT_RED_ZONE;
  }
  
  /**
   * Get the orange zone threshold (in seconds)
   */
  protected getOrangeZone(): number {
    const globalSettings = calendarManager.getGlobalSettings();
    return globalSettings?.orangeThreshold ?? this.DEFAULT_ORANGE_ZONE;
  }
  
  /**
   * Get or create button state for an action ID
   */
  protected getButtonState(actionId: string): ButtonState {
    let state = this.buttonStates.get(actionId);
    if (!state) {
      state = {
        cacheVersion: 0,
        currentImage: '',
        lastKeyPress: 0,
        actionRef: null,
        isFlashing: false,
        useCustomCalendar: false
      };
      this.buttonStates.set(actionId, state);
    }
    return state;
  }
  
  /**
   * Called when action appears on Stream Deck
   */
  override async onWillAppear(ev: WillAppearEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    logger.debug(`${this.constructor.name} will appear: ${actionId}`);
    
    // Get or create button state
    const state = this.getButtonState(actionId);
    state.actionRef = ev.action;
    // Reset change-guards so the first tick after (re)appearing always paints (#29).
    // pendingTitle/titleFailureLogged are cleared too: action.setTitle has no timeout,
    // so a hung IPC promise from before sleep can leave a stale in-flight marker on the
    // reused ButtonState — the post-wake repaint of the same text would then silently
    // no-op (the stale-display class #54 fixed) until the dead promise settled (#99).
    state.currentTitle = undefined;
    state.pendingTitle = undefined;
    state.titleFailureLogged = false;
    state.lastDebugMessage = undefined;

    // Check for per-action settings
    const settings = ev.payload.settings as ActionSettings | undefined;
    
    // Store settings for potential migration when calendars change
    this.buttonSettings.set(actionId, settings);
    
    // Store the calendarId from settings for potential retry
    state.pendingCalendarId = settings?.calendarId;
    
    // Try to register the calendar
    this.registerCalendarForButton(actionId, settings);
    
    // Set initial image
    await this.setInitialImage(ev.action);
    
    // Check cache status and start timer when ready
    this.waitForCacheAndStart(actionId, ev.action);
  }
  
  /**
   * Register calendar for a button, with retry if named calendars not loaded yet
   */
  private registerCalendarForButton(actionId: string, settings: ActionSettings | undefined): void {
    const state = this.getButtonState(actionId);
    
    // Determine which calendar to use
    let calendarUrl: string | undefined;
    let calendarTimeWindow = globalTimeWindow;
    let calendarExcludeAllDay = globalExcludeAllDay;
    let needsRetry = false;
    
    if (settings?.calendarId) {
      // New approach: Use named calendar by ID
      const namedCal = getNamedCalendar(settings.calendarId);
      if (namedCal) {
        calendarUrl = namedCal.url;
        calendarTimeWindow = namedCal.timeWindow ?? globalTimeWindow;
        calendarExcludeAllDay = namedCal.excludeAllDay ?? globalExcludeAllDay;
        logger.info(`[${this.constructor.name}] ${actionId} using named calendar: ${namedCal.name}`);
      } else if (namedCalendars.length === 0) {
        // Named calendars not loaded yet - we'll retry when they load
        logger.debug(`[${this.constructor.name}] ${actionId} waiting for named calendars to load (calendarId: ${settings.calendarId})`);
        needsRetry = true;
      } else {
        // Named calendars loaded but this ID not found - might be deleted
        logger.warn(`[${this.constructor.name}] ${actionId} calendar ID ${settings.calendarId} not found, using default`);
      }
    } else if (settings?.useCustomCalendar && settings?.customUrl) {
      // Legacy approach: Direct custom URL
      calendarUrl = settings.customUrl;
      calendarTimeWindow = settings.customTimeWindow ?? globalTimeWindow;
      calendarExcludeAllDay = settings.customExcludeAllDay ?? globalExcludeAllDay;
      logger.info(`[${this.constructor.name}] ${actionId} using legacy custom calendar: ${settings.customLabel || settings.customUrl.substring(0, 30)}...`);
    }
    
    // If no specific calendar found and not waiting for retry, use default
    if (!calendarUrl && !needsRetry) {
      const defaultCal = getDefaultCalendar();
      if (defaultCal) {
        calendarUrl = defaultCal.url;
        calendarTimeWindow = defaultCal.timeWindow ?? globalTimeWindow;
        calendarExcludeAllDay = defaultCal.excludeAllDay ?? globalExcludeAllDay;
        logger.debug(`[${this.constructor.name}] ${actionId} using default calendar: ${defaultCal.name}`);
      } else if (globalUrl) {
        // Fallback to legacy global URL
        calendarUrl = globalUrl;
        logger.debug(`[${this.constructor.name}] ${actionId} using legacy global URL`);
      }
    }
    
    // Register with CalendarManager if we have a URL
    if (calendarUrl) {
      // Unregister old calendar if switching
      if (state.calendarId) {
        calendarManager.unregisterAction(actionId);
      }
      state.calendarId = calendarManager.registerAction(
        actionId,
        calendarUrl,
        calendarTimeWindow,
        calendarExcludeAllDay
      );
      state.pendingCalendarId = undefined; // Clear pending since we registered
    } else if (needsRetry) {
      // Schedule retry to wait for named calendars to load
      this.scheduleCalendarRetry(actionId, settings);
    }
  }
  
  /**
   * Schedule a retry to register the calendar when named calendars load
   */
  private scheduleCalendarRetry(actionId: string, settings: ActionSettings | undefined): void {
    const state = this.getButtonState(actionId);
    
    // Clear existing retry interval if any
    if (state.calendarRetryInterval) {
      clearInterval(state.calendarRetryInterval);
    }
    
    let retryCount = 0;
    const maxRetries = 20; // 10 seconds max wait (20 * 500ms)
    
    state.calendarRetryInterval = setInterval(() => {
      retryCount++;
      
      // Check if named calendars are now available
      if (namedCalendars.length > 0) {
        clearInterval(state.calendarRetryInterval!);
        state.calendarRetryInterval = undefined;
        
        logger.info(`[${this.constructor.name}] ${actionId} named calendars now available, registering...`);
        this.registerCalendarForButton(actionId, settings);
        
        // Restart the timer with the correct calendar
        const action = state.actionRef;
        if (action) {
          this.waitForCacheAndStart(actionId, action);
        }
      } else if (retryCount >= maxRetries) {
        clearInterval(state.calendarRetryInterval!);
        state.calendarRetryInterval = undefined;
        
        logger.warn(`[${this.constructor.name}] ${actionId} timed out waiting for named calendars, using default`);
        // Fall back to default
        state.pendingCalendarId = undefined;
        this.registerCalendarForButton(actionId, undefined);
      }
    }, 500);
  }
  
  /**
   * Get events for a specific action (from its registered calendar)
   */
  protected getEventsForButton(actionId: string): CalendarEvent[] {
    const state = this.buttonStates.get(actionId);
    if (state?.calendarId) {
      return calendarManager.getEventsForAction(actionId);
    }
    // Fallback to global cache for backwards compatibility
    return calendarCache.events;
  }
  
  /**
   * Get cache status for a specific action
   */
  protected getCacheStatusForButton(actionId: string): ErrorState {
    const state = this.buttonStates.get(actionId);
    if (state?.calendarId) {
      return calendarManager.getStatusForAction(actionId);
    }
    // Fallback to global cache
    return calendarCache.status;
  }
  
  /**
   * Get cache version for a specific action
   */
  protected getCacheVersionForButton(actionId: string): number {
    const state = this.buttonStates.get(actionId);
    if (state?.calendarId) {
      const calendar = calendarManager.getCalendarForAction(actionId);
      return calendar?.cache.version ?? 0;
    }
    return calendarCache.version;
  }
  
  /**
   * Wait for cache to be available, then start timer
   */
  private waitForCacheAndStart(actionId: string, action: any): void {
    const state = this.getButtonState(actionId);
    
    // Clear any existing waiting interval
    if (state.waitingForCacheInterval) {
      clearInterval(state.waitingForCacheInterval);
      state.waitingForCacheInterval = undefined;
    }
    
    // Get status from the action's calendar
    const status = this.getCacheStatusForButton(actionId);
    
    // If cache is loaded, start immediately
    if (status === 'LOADED' || status === 'NO_EVENTS') {
      this.startTimerForButton(actionId, action);
      return;
    }
    
    // Show loading status
    const statusText = getStatusText(status);
    action.setTitle(statusText);
    
    // Check every 500ms for cache to become available (faster response on startup)
    state.waitingForCacheInterval = setInterval(() => {
      // Use stored actionRef if available (more reliable after plugin restart)
      const currentAction = state.actionRef || action;
      
      const currentStatus = this.getCacheStatusForButton(actionId);
      
      if (currentStatus === 'LOADED' || currentStatus === 'NO_EVENTS') {
        // Cache is ready, start timer
        if (state.waitingForCacheInterval) {
          clearInterval(state.waitingForCacheInterval);
          state.waitingForCacheInterval = undefined;
        }
        logger.debug(`Cache ready for ${actionId}, starting timer`);
        this.startTimerForButton(actionId, currentAction);
      } else {
        // Update status text while waiting
        const statusText = getStatusText(currentStatus);
        currentAction.setTitle(statusText);
      }
    }, 500);
    
    logger.debug(`Waiting for cache for ${actionId}...`);
  }
  
  /**
   * Called when action disappears from Stream Deck
   */
  override async onWillDisappear(ev: WillDisappearEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    logger.debug(`${this.constructor.name} will disappear: ${actionId}`);
    await this.cleanupButtonState(actionId);
  }

  /**
   * Tear down all per-button resources for an action ID and forget its state.
   *
   * This is the single, polymorphic cleanup hook shared by the SDK disappear
   * path (onWillDisappear) and the orphan sweep (reapOrphans) — no synthetic
   * event, no unsafe cast (#50). Subclasses that own extra per-button state
   * (e.g. marquee intervals) override this, do their cleanup, then call
   * `super.cleanupButtonState(actionId)`; overriding here (instead of
   * onWillDisappear) guarantees the subclass cleanup also runs for reaped
   * orphans, not just for SDK-reported disappearances.
   */
  protected async cleanupButtonState(actionId: string): Promise<void> {
    const state = this.buttonStates.get(actionId);
    if (state) {
      // Stop button's timer
      if (state.interval) {
        clearInterval(state.interval);
      }

      // Clear waiting interval
      if (state.waitingForCacheInterval) {
        clearInterval(state.waitingForCacheInterval);
      }

      // Clear calendar retry interval
      if (state.calendarRetryInterval) {
        clearInterval(state.calendarRetryInterval);
      }

      // Stop any flash
      if (state.flashInterval) {
        clearInterval(state.flashInterval);
      }

      // Unregister from CalendarManager
      calendarManager.unregisterAction(actionId);

      // Remove state for this button
      this.buttonStates.delete(actionId);
      this.buttonSettings.delete(actionId);
    }
  }
  
  /**
   * Called when settings are received/updated from Property Inspector
   */
  override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    const settings = ev.payload.settings as ActionSettings | undefined;
    logger.debug(`[${this.constructor.name}] Settings received for ${actionId}:`, JSON.stringify(settings));
    
    // Store settings for potential migration
    this.buttonSettings.set(actionId, settings);
    
    const state = this.buttonStates.get(actionId);
    if (!state) {
      logger.debug(`[${this.constructor.name}] No state for action ${actionId}, skipping settings update`);
      return;
    }
    
    // Determine the new calendar URL
    let newCalendarUrl: string | undefined;
    let newCalendarTimeWindow = globalTimeWindow;
    let newCalendarExcludeAllDay = globalExcludeAllDay;
    let calendarChanged = false;
    
    if (settings?.calendarId) {
      // New approach: Use named calendar by ID
      const namedCal = getNamedCalendar(settings.calendarId);
      if (namedCal) {
        newCalendarUrl = namedCal.url;
        newCalendarTimeWindow = namedCal.timeWindow ?? globalTimeWindow;
        newCalendarExcludeAllDay = namedCal.excludeAllDay ?? globalExcludeAllDay;
        calendarChanged = true;
        logger.info(`[${this.constructor.name}] ${actionId} switched to named calendar: ${namedCal.name}`);
      }
    } else if (settings?.useCustomCalendar && settings?.customUrl) {
      // Legacy approach: Direct custom URL
      newCalendarUrl = settings.customUrl;
      newCalendarTimeWindow = settings.customTimeWindow ?? globalTimeWindow;
      newCalendarExcludeAllDay = settings.customExcludeAllDay ?? globalExcludeAllDay;
      calendarChanged = true;
      logger.info(`[${this.constructor.name}] ${actionId} switched to legacy custom calendar`);
    } else {
      // Use default calendar
      const defaultCal = getDefaultCalendar();
      if (defaultCal) {
        newCalendarUrl = defaultCal.url;
        newCalendarTimeWindow = defaultCal.timeWindow ?? globalTimeWindow;
        newCalendarExcludeAllDay = defaultCal.excludeAllDay ?? globalExcludeAllDay;
      } else if (globalUrl) {
        newCalendarUrl = globalUrl;
      }
      calendarChanged = true;
      logger.info(`[${this.constructor.name}] ${actionId} switched to default calendar`);
    }
    
    if (calendarChanged && newCalendarUrl) {
      // Re-register with the new calendar
      state.calendarId = calendarManager.registerAction(
        actionId,
        newCalendarUrl,
        newCalendarTimeWindow,
        newCalendarExcludeAllDay
      );
      
      // Restart the display with new calendar
      this.stopTimerForButton(actionId);
      if (state.actionRef) {
        this.waitForCacheAndStart(actionId, state.actionRef);
      }
    }
  }
  
  /**
   * Called when key is pressed down
   */
  override async onKeyDown(ev: KeyDownEvent<any>): Promise<void> {
    // Override in subclasses if needed
  }
  
  /**
   * Called when key is released
   */
  override async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
    const actionId = ev.action.id;
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Check for double press
    const now = Date.now();
    const timeSinceLastPress = now - state.lastKeyPress;
    state.lastKeyPress = now;
    
    if (timeSinceLastPress < 500) {
      // Double press detected - force refresh
      await this.handleDoublePress(actionId, ev.action);
    } else {
      // Single press
      await this.handleSinglePress(actionId, ev.action);
    }
  }
  
  /**
   * Handle single key press (override in subclasses)
   */
  protected async handleSinglePress(actionId: string, action: any): Promise<void> {
    // Override in subclasses
  }
  
  /**
   * Handle double key press (force refresh)
   */
  protected async handleDoublePress(actionId: string, action: any): Promise<void> {
    logger.info(`🔄 Double press detected on ${actionId} - forcing calendar refresh`);
    
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Stop the current timer
    this.stopTimerForButton(actionId);
    
    // Show loading state
    await action.setTitle('Refreshing\n...');
    await this.setInitialImage(action);
    
    try {
      // Refresh the appropriate calendar
      if (state.calendarId) {
        // Refresh through CalendarManager (handles URL-level deduplication)
        await calendarManager.refreshCalendarForAction(actionId);
      } else {
        // Fallback to global refresh
        await forceRefreshCache();
      }
      logger.info('✅ Force refresh completed');
    } catch (error) {
      logger.error('❌ Force refresh failed:', error);
    }
    
    // Restart the timer to show updated data
    this.waitForCacheAndStart(actionId, action);
  }
  
  /**
   * Start the update timer for a specific button
   */
  protected startTimerForButton(actionId: string, action: any): void {
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    state.cacheVersion = this.getCacheVersionForButton(actionId);
    
    // Clear any existing timer for this button
    this.stopTimerForButton(actionId);
    
    // Update immediately
    this.updateDisplay(actionId, action);
    
    // Set up interval for updates (every second)
    state.interval = setInterval(() => {
      // Check if cache is still loaded
      const status = this.getCacheStatusForButton(actionId);
      if (status !== 'LOADED' && status !== 'NO_EVENTS') {
        // Cache is reloading, stop timer and wait again
        this.stopTimerForButton(actionId);
        this.waitForCacheAndStart(actionId, action);
        return;
      }
      
      // Check if cache was updated
      const currentVersion = this.getCacheVersionForButton(actionId);
      if (state.cacheVersion !== currentVersion) {
        state.cacheVersion = currentVersion;
        logger.debug(`Cache updated for ${actionId}, refreshing display`);
      }
      
      this.updateDisplay(actionId, action);
    }, 1000);
    
    logger.debug(`Timer started for ${actionId}`);
  }
  
  /**
   * Stop the update timer for a specific button
   */
  protected stopTimerForButton(actionId: string): void {
    const state = this.buttonStates.get(actionId);
    if (state?.interval) {
      clearInterval(state.interval);
      state.interval = undefined;
      logger.debug(`Timer stopped for ${actionId}`);
    }
  }
  
  /**
   * Update the display (override in subclasses)
   */
  protected abstract updateDisplay(actionId: string, action: any): Promise<void>;
  
  /**
   * Set initial image (override in subclasses)
   */
  protected abstract setInitialImage(action: any): Promise<void>;
  
  /**
   * Set the button title, skipping the SDK call when the title is unchanged (#29).
   *
   * The per-second display timer previously called setTitle every tick regardless
   * of whether the text changed. Marquee frames differ each tick so they still
   * render; a stable countdown/status only paints when it actually changes.
   */
  protected async setTitleForButton(actionId: string, action: any, title: string): Promise<void> {
    const state = this.buttonStates.get(actionId);
    const hadStateAtEntry = state !== undefined;
    let token: number | undefined;
    if (state) {
      // Already the last painted title — nothing to do (#29).
      if (state.currentTitle === title) {
        return;
      }
      // Identical title already in flight to the SDK — coalesce rather than spawn a
      // second uncoalesced setTitle per tick while IPC is slow (#74).
      if (state.pendingTitle === title) {
        return;
      }
      // Mark this as the most-recently dispatched title and stamp it with a fresh
      // per-button generation token. Commit/clear below key off the token rather than
      // value equality, so an older settlement carrying the SAME text (the x,y,x
      // overlap) can no longer clear or commit a newer dispatch's marker (#74, #100).
      state.pendingTitle = title;
      token = (state.titleDispatchToken ?? 0) + 1;
      state.titleDispatchToken = token;
    }
    try {
      await action.setTitle(title);
      // Re-read after the await: the settle may have raced a cleanupButtonState that
      // removed this id (or a re-appear that replaced the ButtonState object), so only
      // act on the state still tracked for this id — never a stale/removed one (#104.2).
      const live = this.buttonStates.get(actionId) === state ? state : undefined;
      if (live) {
        // Commit the change-guard only after the SDK actually painted, and only if
        // this dispatch is still the latest — a slower earlier call must not clobber a
        // newer title with an out-of-order resolution (#51, #74, #100).
        if (live.titleDispatchToken === token) {
          live.currentTitle = title;
        }
        // Recovery: the SDK painted again after a failure — note it once (#72).
        if (live.titleFailureLogged) {
          live.titleFailureLogged = false;
          logger.info(`[${this.constructor.name}] setTitle recovered for ${actionId}`);
        }
      }
    } catch (error) {
      const live = this.buttonStates.get(actionId) === state ? state : undefined;
      // Failure-transition guard: log the first failure of an outage (with the
      // error), then suppress the per-tick repeats so a sustained IPC outage can't
      // flood the 500-entry debug ring (#72). The next tick still retries.
      if (live) {
        if (!live.titleFailureLogged) {
          live.titleFailureLogged = true;
          logger.warn(`[${this.constructor.name}] setTitle failed for ${actionId}, will retry next tick:`, error);
        }
      } else if (!hadStateAtEntry) {
        // Never-tracked button (no throttle state to consult) — log the bare failure.
        // If the state existed at entry but was removed/replaced mid-flight we stay
        // silent: logging a failure for a button that is already gone is misleading
        // and, with no throttle flag, could repeat (#104.2).
        logger.warn(`[${this.constructor.name}] setTitle failed for ${actionId}, will retry next tick:`, error);
      }
    } finally {
      // Clear the in-flight marker on settle (resolve OR reject) only if this dispatch
      // is still the latest for the still-tracked state. Clearing on reject re-enables
      // the retry on the next tick per #51; the token guard stops an older settlement
      // from wiping a newer dispatch's marker (#74, #100), and the identity re-read
      // avoids touching a removed/replaced state (#104.2).
      const live = this.buttonStates.get(actionId) === state ? state : undefined;
      if (live && live.titleDispatchToken === token) {
        live.pendingTitle = undefined;
      }
    }
  }

  /**
   * Emit a per-tick debug line only when its content changed since the previous
   * tick for this button (#29). The logger always builds the string and pushes it
   * into the 500-entry buffer, so an unchanging per-second line is pure churn.
   */
  protected debugForButton(actionId: string, message: string): void {
    const state = this.buttonStates.get(actionId);
    if (state) {
      if (state.lastDebugMessage === message) {
        return;
      }
      state.lastDebugMessage = message;
    }
    logger.debug(message);
  }

  /**
   * Reap this instance's button states that the Stream Deck no longer reports as
   * visible, running the shared cleanupButtonState cleanup for each (#29).
   *
   * @returns The action IDs that were successfully reaped.
   */
  public async reapOrphans(): Promise<string[]> {
    const reaped: string[] = [];
    for (const actionId of Array.from(this.buttonStates.keys())) {
      try {
        // The SDK lookup runs inside the per-id try so one throw can't abort the
        // rest of the pass (#78.2).
        const stillVisible = streamDeck.actions.getActionById(actionId);
        if (!stillVisible) {
          // Await the shared, polymorphic cleanup so a rejection is caught here
          // (not left as an unhandled rejection) and the id is recorded as reaped
          // only after cleanup actually completes (#50).
          await this.cleanupButtonState(actionId);
          reaped.push(actionId);
        }
      } catch (error) {
        logger.error(`[${this.constructor.name}] Failed to reap orphaned button ${actionId}:`, error);
      }
    }
    return reaped;
  }

  /**
   * Set action image by name
   */
  protected async setImage(actionId: string, action: any, imageName: string): Promise<void> {
    const state = this.buttonStates.get(actionId);
    if (state && state.currentImage !== imageName) {
      state.currentImage = imageName;
      await action.setImage(`assets/${imageName}.png`);
    }
  }
  
  /**
   * Flash the button to draw attention (e.g., meeting starting)
   * Alternates between normal and highlight image
   */
  protected async flashButton(actionId: string, action: any, normalImage: string, highlightImage: string, count: number = 10): Promise<void> {
    // Check if flash is enabled in settings
    const settings = getSettings();
    if (settings.flashOnMeetingStart === false) {
      return;
    }
    
    const state = this.buttonStates.get(actionId);
    if (!state) return;
    
    // Don't start new flash if already flashing
    if (state.isFlashing) {
      return;
    }
    
    state.isFlashing = true;
    let flashCount = 0;
    const flashIntervalMs = 200; // ms between flashes
    
    logger.info(`🔔 Flashing button ${actionId} ${count} times`);
    
    state.flashInterval = setInterval(async () => {
      if (flashCount >= count * 2) {
        // Done flashing
        if (state.flashInterval) {
          clearInterval(state.flashInterval);
          state.flashInterval = undefined;
        }
        state.isFlashing = false;
        // Reset to normal image
        state.currentImage = '';
        await this.setImage(actionId, action, normalImage);
        return;
      }
      
      // Alternate between highlight and normal
      const useHighlight = flashCount % 2 === 0;
      state.currentImage = ''; // Force image update
      await action.setImage(`assets/${useHighlight ? highlightImage : normalImage}.png`);
      flashCount++;
    }, flashIntervalMs);
  }
  
  /**
   * Stop any ongoing flash for a specific button
   */
  protected stopFlashForButton(actionId: string): void {
    const state = this.buttonStates.get(actionId);
    if (state) {
      if (state.flashInterval) {
        clearInterval(state.flashInterval);
        state.flashInterval = undefined;
      }
      state.isFlashing = false;
    }
  }
  
  /**
   * Get title display duration from settings (in seconds)
   */
  protected getTitleDisplayDuration(): number {
    const settings = getSettings();
    return settings.titleDisplayDuration ?? 15;
  }
  
  /**
   * Migrate buttons using deleted calendars to the default calendar.
   * Called when named calendars are updated and some may have been deleted.
   */
  public migrateButtonsWithDeletedCalendar(validCalendarIds: string[]): void {
    const validSet = new Set(validCalendarIds);
    
    for (const [actionId, settings] of this.buttonSettings) {
      if (settings?.calendarId && !validSet.has(settings.calendarId)) {
        const state = this.buttonStates.get(actionId);
        logger.info(`[${this.constructor.name}] Button ${actionId} was using deleted calendar ${settings.calendarId}, migrating to default`);
        
        // Clear the calendarId from stored settings
        const updatedSettings = { ...settings, calendarId: undefined };
        this.buttonSettings.set(actionId, updatedSettings);
        
        // Update the action's settings on the Stream Deck
        if (state?.actionRef) {
          state.actionRef.setSettings(updatedSettings);
        }
        
        // Re-register with the default calendar
        this.registerCalendarForButton(actionId, updatedSettings);
        
        // Restart the timer with the new calendar
        if (state?.actionRef) {
          this.waitForCacheAndStart(actionId, state.actionRef);
        }
      }
    }
  }
}
