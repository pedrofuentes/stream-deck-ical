/**
 * Wiring tests for the production display logic of all three actions (issue #53).
 *
 * These import the REAL, now decorator-free display code — CombinedActionBase,
 * NextMeetingActionBase, TimeLeftActionBase — and drive their actual
 * updateDisplay / marquee paths with mock action objects and seeded button state.
 * They assert that every title paint routes THROUGH BaseAction.setTitleForButton
 * (the #29 change-guard) and that the per-tick debug line routes through
 * debugForButton. A regression that reverts any call site to bare
 * action.setTitle(...) — bypassing the guard — fails these tests.
 *
 * The @action-decorated leaf classes cannot be imported here (their TC39 stage-3
 * decorator throws "SyntaxError: Invalid or unexpected token" under vitest's
 * esbuild transform); the base classes carry all behavior and import cleanly.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ---- Module mocks (mirror the established action-test doubles) ----
vi.mock('@elgato/streamdeck', () => ({
  default: {
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    actions: { registerAction: vi.fn(), getActionById: vi.fn() },
    connect: vi.fn()
  },
  action: vi.fn((_config: any) => (target: any) => target),
  SingletonAction: class {
    actions = new Map();
  }
}));

vi.mock('../src/utils/logger', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  isDebugMode: vi.fn(() => false)
}));

vi.mock('../src/services/calendar-service', () => ({
  calendarCache: { version: 1, status: 'LOADED', events: [], lastFetch: Date.now(), provider: 'test' },
  getStatusText: vi.fn((status: string) => {
    switch (status) {
      case 'INIT': return 'Please\nSetup';
      case 'LOADING': return 'Loading\niCal';
      case 'LOADED': return '';
      case 'NO_EVENTS': return 'No\nMeetings\nFound';
      default: return 'Error';
    }
  }),
  getSettings: vi.fn(() => ({ titleDisplayDuration: 15, flashOnMeetingStart: false })),
  forceRefreshCache: vi.fn()
}));

vi.mock('../src/services/calendar-manager', () => ({
  calendarManager: {
    registerAction: vi.fn().mockReturnValue('cal_123'),
    unregisterAction: vi.fn(),
    getEventsForAction: vi.fn().mockReturnValue([]),
    getStatusForAction: vi.fn().mockReturnValue('LOADED'),
    getCalendarForAction: vi.fn().mockReturnValue({ id: 'cal_123', cache: { version: 1 } }),
    getGlobalSettings: vi.fn().mockReturnValue(null),
    refreshCalendarForAction: vi.fn().mockResolvedValue(undefined)
  }
}));

vi.mock('../src/utils/event-utils', () => ({
  findActiveEvents: vi.fn(() => []),
  findNextEvent: vi.fn(() => undefined)
}));

import { CombinedActionBase } from '../src/actions/combined-action-base';
import { NextMeetingActionBase } from '../src/actions/next-meeting-base';
import { TimeLeftActionBase } from '../src/actions/time-left-base';
import { findActiveEvents, findNextEvent } from '../src/utils/event-utils';
import { calendarCache } from '../src/services/calendar-service';
import { calendarManager } from '../src/services/calendar-manager';
import { logger } from '../src/utils/logger';
import { __resetActionInstancesForTest } from '../src/actions/base-action';

const now = new Date('2026-07-10T12:00:00.000Z');

/** Build a mock Stream Deck action object. */
function mockAction(id: string): any {
  return { id, setTitle: vi.fn().mockResolvedValue(undefined), setImage: vi.fn().mockResolvedValue(undefined) };
}

/** Seed BaseAction button state so the setTitle/debug change-guards are active. */
function seed(inst: any, id: string, action: any): any {
  const state = inst.getButtonState(id);
  state.actionRef = action;
  return state;
}

function makeEvent(summary: string, startOffsetMs: number, durationMs: number): any {
  return {
    uid: `uid-${summary}-${startOffsetMs}`,
    summary,
    start: new Date(now.getTime() + startOffsetMs),
    end: new Date(now.getTime() + startOffsetMs + durationMs)
  };
}

/** Debug messages that were routed through the change-guarded debugForButton. */
function debugCallsMatching(substr: string): string[] {
  return vi.mocked(logger.debug).mock.calls
    .map((c: any[]) => String(c[0]))
    .filter((m) => m.includes(substr));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  vi.setSystemTime(now);
  (calendarCache as any).status = 'LOADED';
  (calendarCache as any).events = [];
  vi.mocked(findActiveEvents).mockReturnValue([]);
  vi.mocked(findNextEvent).mockReturnValue(undefined as any);
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  // Each `new *ActionBase()` above registers itself in the module-level
  // actionInstances registry (base-action.ts) and it is never pruned. Left
  // unreset, instances constructed by one test leak into a later test that
  // touches the orphan sweep across this file, reproducing the #55 shared-state
  // pattern flagged for this file at #70.2.
  __resetActionInstancesForTest();
});

// ---------------------------------------------------------------------------
describe('CombinedActionBase display wiring (#53)', () => {
  it('sends setTitle once for two identical ticks, again when the title changes', async () => {
    const action = mockAction('c-guard');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-guard', action);

    // next-meeting mode: no active events, one upcoming event 5 minutes out
    vi.mocked(findActiveEvents).mockReturnValue([]);
    vi.mocked(findNextEvent).mockReturnValue(makeEvent('Sync', 5 * 60 * 1000, 30 * 60 * 1000));

    await inst.updateDisplay('c-guard', action);
    await inst.updateDisplay('c-guard', action); // identical -> guard skips
    expect(action.setTitle).toHaveBeenCalledTimes(1);
    expect(action.setTitle).toHaveBeenLastCalledWith('5m 0s');

    vi.advanceTimersByTime(60_000); // countdown now 4m 0s
    await inst.updateDisplay('c-guard', action);
    expect(action.setTitle).toHaveBeenCalledTimes(2);
    expect(action.setTitle).toHaveBeenLastCalledWith('4m 0s');
  });

  it('buffers the per-tick debug line only once for an identical tick', async () => {
    const action = mockAction('c-debug');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-debug', action);

    vi.mocked(findActiveEvents).mockReturnValue([]);
    vi.mocked(findNextEvent).mockReturnValue(makeEvent('Sync', 5 * 60 * 1000, 30 * 60 * 1000));

    await inst.updateDisplay('c-debug', action);
    await inst.updateDisplay('c-debug', action); // identical -> debug guard skips

    expect(debugCallsMatching('[Combined:c-debug] Active events: 0, next event: Sync')).toHaveLength(1);
  });

  it('routes updateDisplay through setTitleForButton (revert canary)', async () => {
    const action = mockAction('c-canary');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-canary', action);

    vi.mocked(findActiveEvents).mockReturnValue([]);
    vi.mocked(findNextEvent).mockReturnValue(makeEvent('Sync', 5 * 60 * 1000, 30 * 60 * 1000));

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('c-canary', action);

    expect(spy).toHaveBeenCalledWith('c-canary', action, '5m 0s');
    expect(action.setTitle).toHaveBeenCalledWith('5m 0s');
  });

  it('paints every differing marquee frame through the guard', async () => {
    const action = mockAction('c-marquee');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-marquee', action);

    inst.startMarquee('c-marquee', action, 'Team Standup');
    // Async marquee: flush microtasks between fires (position increments after
    // the awaited paint), so each frame advances rather than repeating.
    await vi.advanceTimersByTimeAsync(250 * 3); // immediate frame + 3 interval frames

    const painted = action.setTitle.mock.calls.map((c: any[]) => c[0]);
    expect(painted.length).toBeGreaterThanOrEqual(4);
    // Scrolling frames all differ, so none are de-duplicated by the guard.
    expect(new Set(painted).size).toBe(painted.length);
    // Proof the frames went THROUGH setTitleForButton: it recorded the last title.
    expect(inst.buttonStates.get('c-marquee').currentTitle).toBe(painted[painted.length - 1]);

    inst.stopMarquee('c-marquee');
  });

  it('paints the guarded status text when cache status is not LOADED (#69)', async () => {
    const action = mockAction('c-status');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-status', action);
    (calendarCache as any).status = 'INIT';

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('c-status', action);

    // getStatusText('INIT') -> 'Please\nSetup' per the mocked calendar-service.
    expect(spy).toHaveBeenCalledWith('c-status', action, 'Please\nSetup');
    expect(action.setTitle).toHaveBeenCalledWith('Please\nSetup');
  });

  it('paints the guarded no-event fallback title when there is no active or next event (#69)', async () => {
    const action = mockAction('c-noevents');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-noevents', action);
    // status LOADED (default), findActiveEvents -> [], findNextEvent -> undefined (defaults from beforeEach)

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('c-noevents', action);

    expect(spy).toHaveBeenCalledWith('c-noevents', action, 'No\nMeetings');
    expect(action.setTitle).toHaveBeenCalledWith('No\nMeetings');
  });

  it('cleanupButtonState clears marquee state and runs base cleanup (#70 addendum)', async () => {
    const action = mockAction('c-cleanup');
    const inst: any = new CombinedActionBase();
    seed(inst, 'c-cleanup', action);

    inst.startMarquee('c-cleanup', action, 'Team Standup');
    const cbState = inst.combinedStates.get('c-cleanup');
    expect(cbState.marqueeInterval).toBeDefined();
    expect(cbState.titleTimeout).toBeDefined();
    const intervalRef = cbState.marqueeInterval;
    const timeoutRef = cbState.titleTimeout;

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    await inst.cleanupButtonState('c-cleanup');

    // Combined-specific (subclass) state torn down.
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalRef);
    expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutRef);
    expect(inst.combinedStates.has('c-cleanup')).toBe(false);
    // Base cleanup (BaseAction.cleanupButtonState) also ran.
    expect(inst.buttonStates.has('c-cleanup')).toBe(false);
    expect(calendarManager.unregisterAction).toHaveBeenCalledWith('c-cleanup');
  });
});

// ---------------------------------------------------------------------------
describe('NextMeetingActionBase display wiring (#53)', () => {
  it('sends setTitle once for two identical ticks, again when the title changes', async () => {
    const action = mockAction('n-guard');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-guard', action);

    vi.mocked(findNextEvent).mockReturnValue(makeEvent('Sync', 5 * 60 * 1000, 30 * 60 * 1000));

    await inst.updateDisplay('n-guard', action);
    await inst.updateDisplay('n-guard', action);
    expect(action.setTitle).toHaveBeenCalledTimes(1);
    expect(action.setTitle).toHaveBeenLastCalledWith('5m 0s');

    vi.advanceTimersByTime(60_000);
    await inst.updateDisplay('n-guard', action);
    expect(action.setTitle).toHaveBeenCalledTimes(2);
    expect(action.setTitle).toHaveBeenLastCalledWith('4m 0s');
  });

  it('buffers the per-tick debug line only once for an identical tick', async () => {
    const action = mockAction('n-debug');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-debug', action);

    vi.mocked(findNextEvent).mockReturnValue(makeEvent('Sync', 5 * 60 * 1000, 30 * 60 * 1000));

    await inst.updateDisplay('n-debug', action);
    await inst.updateDisplay('n-debug', action);

    expect(debugCallsMatching('[NextMeeting:n-debug] Cache has 0 total events, next=Sync')).toHaveLength(1);
  });

  it('routes updateDisplay through setTitleForButton (revert canary)', async () => {
    const action = mockAction('n-canary');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-canary', action);

    vi.mocked(findNextEvent).mockReturnValue(makeEvent('Sync', 5 * 60 * 1000, 30 * 60 * 1000));

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('n-canary', action);

    expect(spy).toHaveBeenCalledWith('n-canary', action, '5m 0s');
    expect(action.setTitle).toHaveBeenCalledWith('5m 0s');
  });

  it('paints every differing marquee frame through the guard', async () => {
    const action = mockAction('n-marquee');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-marquee', action);

    inst.startMarquee('n-marquee', action, 'Team Standup');
    // Async marquee: flush microtasks between fires (position increments after
    // the awaited paint), so each frame advances rather than repeating.
    await vi.advanceTimersByTimeAsync(250 * 3);

    const painted = action.setTitle.mock.calls.map((c: any[]) => c[0]);
    expect(painted.length).toBeGreaterThanOrEqual(4);
    expect(new Set(painted).size).toBe(painted.length);
    expect(inst.buttonStates.get('n-marquee').currentTitle).toBe(painted[painted.length - 1]);

    inst.stopMarquee('n-marquee');
  });

  it('paints the guarded status text when cache status is not LOADED (#69)', async () => {
    const action = mockAction('n-status');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-status', action);
    (calendarCache as any).status = 'LOADING';

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('n-status', action);

    // getStatusText('LOADING') -> 'Loading\niCal' per the mocked calendar-service.
    expect(spy).toHaveBeenCalledWith('n-status', action, 'Loading\niCal');
    expect(action.setTitle).toHaveBeenCalledWith('Loading\niCal');
  });

  it('paints the guarded no-event fallback title when findNextEvent is undefined (#69)', async () => {
    const action = mockAction('n-noevents');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-noevents', action);
    // findNextEvent -> undefined (default from beforeEach)

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('n-noevents', action);

    expect(spy).toHaveBeenCalledWith('n-noevents', action, 'No\nUpcoming\nMeeting');
    expect(action.setTitle).toHaveBeenCalledWith('No\nUpcoming\nMeeting');
  });

  it('cleanupButtonState clears marquee state and runs base cleanup (#70 addendum)', async () => {
    const action = mockAction('n-cleanup');
    const inst: any = new NextMeetingActionBase();
    seed(inst, 'n-cleanup', action);

    inst.startMarquee('n-cleanup', action, 'Team Standup');
    const nmState = inst.nextMeetingStates.get('n-cleanup');
    expect(nmState.marqueeInterval).toBeDefined();
    expect(nmState.titleTimeout).toBeDefined();
    const intervalRef = nmState.marqueeInterval;
    const timeoutRef = nmState.titleTimeout;

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    await inst.cleanupButtonState('n-cleanup');

    // NextMeeting-specific (subclass) state torn down.
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalRef);
    expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutRef);
    expect(inst.nextMeetingStates.has('n-cleanup')).toBe(false);
    // Base cleanup (BaseAction.cleanupButtonState) also ran.
    expect(inst.buttonStates.has('n-cleanup')).toBe(false);
    expect(calendarManager.unregisterAction).toHaveBeenCalledWith('n-cleanup');
  });
});

// ---------------------------------------------------------------------------
describe('TimeLeftActionBase display wiring (#53)', () => {
  it('sends setTitle once for two identical ticks, again when the title changes', async () => {
    const action = mockAction('t-guard');
    const inst: any = new TimeLeftActionBase();
    seed(inst, 't-guard', action);

    // active meeting ending in 5 minutes
    vi.mocked(findActiveEvents).mockReturnValue([makeEvent('Standup', -30 * 60 * 1000, 35 * 60 * 1000)]);

    await inst.updateDisplay('t-guard', action);
    await inst.updateDisplay('t-guard', action);
    expect(action.setTitle).toHaveBeenCalledTimes(1);
    expect(action.setTitle).toHaveBeenLastCalledWith('5m 0s');

    vi.advanceTimersByTime(60_000);
    await inst.updateDisplay('t-guard', action);
    expect(action.setTitle).toHaveBeenCalledTimes(2);
    expect(action.setTitle).toHaveBeenLastCalledWith('4m 0s');
  });

  it('buffers the per-tick debug line only once for an identical tick', async () => {
    const action = mockAction('t-debug');
    const inst: any = new TimeLeftActionBase();
    seed(inst, 't-debug', action);

    vi.mocked(findActiveEvents).mockReturnValue([makeEvent('Standup', -30 * 60 * 1000, 35 * 60 * 1000)]);

    await inst.updateDisplay('t-debug', action);
    await inst.updateDisplay('t-debug', action);

    expect(debugCallsMatching('[TimeLeft:t-debug] Cache has 0 total events, 1 active')).toHaveLength(1);
  });

  it('routes updateDisplay through setTitleForButton (revert canary)', async () => {
    const action = mockAction('t-canary');
    const inst: any = new TimeLeftActionBase();
    seed(inst, 't-canary', action);

    vi.mocked(findActiveEvents).mockReturnValue([makeEvent('Standup', -30 * 60 * 1000, 35 * 60 * 1000)]);

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('t-canary', action);

    expect(spy).toHaveBeenCalledWith('t-canary', action, '5m 0s');
    expect(action.setTitle).toHaveBeenCalledWith('5m 0s');
  });

  it('paints the guarded status text when cache status is not LOADED (#69)', async () => {
    const action = mockAction('t-status');
    const inst: any = new TimeLeftActionBase();
    seed(inst, 't-status', action);
    (calendarCache as any).status = 'NETWORK_ERROR';

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('t-status', action);

    // getStatusText falls through to the default -> 'Error' per the mocked calendar-service.
    expect(spy).toHaveBeenCalledWith('t-status', action, 'Error');
    expect(action.setTitle).toHaveBeenCalledWith('Error');
  });

  it('paints the guarded no-event fallback title when findActiveEvents is empty (#69)', async () => {
    const action = mockAction('t-noevents');
    const inst: any = new TimeLeftActionBase();
    seed(inst, 't-noevents', action);
    // findActiveEvents -> [] (default from beforeEach)

    const spy = vi.spyOn(inst, 'setTitleForButton');
    await inst.updateDisplay('t-noevents', action);

    expect(spy).toHaveBeenCalledWith('t-noevents', action, 'No\nActive\nMeeting');
    expect(action.setTitle).toHaveBeenCalledWith('No\nActive\nMeeting');
  });

  it('cleanupButtonState clears the end-of-meeting timeout and runs base cleanup (#70 addendum)', async () => {
    const action = mockAction('t-cleanup');
    const inst: any = new TimeLeftActionBase();
    seed(inst, 't-cleanup', action);

    // Drive updateDisplay once so the per-button TimeLeft state map entry exists,
    // then seed the endTimeout field the cleanup override is responsible for
    // clearing (src/actions/time-left-base.ts:184-187).
    vi.mocked(findActiveEvents).mockReturnValue([makeEvent('Standup', -30 * 60 * 1000, 35 * 60 * 1000)]);
    await inst.updateDisplay('t-cleanup', action);
    const tlState = inst.timeLeftStates.get('t-cleanup');
    expect(tlState).toBeDefined();
    tlState.endTimeout = setTimeout(() => {}, 100_000);
    const timeoutRef = tlState.endTimeout;

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    await inst.cleanupButtonState('t-cleanup');

    // TimeLeft-specific (subclass) state torn down.
    expect(clearTimeoutSpy).toHaveBeenCalledWith(timeoutRef);
    expect(inst.timeLeftStates.has('t-cleanup')).toBe(false);
    // Base cleanup (BaseAction.cleanupButtonState) also ran.
    expect(inst.buttonStates.has('t-cleanup')).toBe(false);
    expect(calendarManager.unregisterAction).toHaveBeenCalledWith('t-cleanup');
  });
});
