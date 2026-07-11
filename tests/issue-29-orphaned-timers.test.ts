/**
 * Regression tests for issue #29 - orphaned per-second timers and per-tick work
 *
 * After macOS wake-from-sleep, the plugin process pinned CPU at 100%+ because:
 *  - Button states with live 1s intervals leaked when onWillDisappear was never
 *    emitted for stale context IDs (orphaned timers).
 *  - setTitle was sent every tick unconditionally.
 *  - A per-tick debug string was always built and buffered.
 *  - getDebugInfo embedded the entire 500-entry log buffer into a new log line.
 *
 * These tests cover the four defensive fixes.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ---- Hoisted mock handles ----
const { getActionByIdMock } = vi.hoisted(() => ({ getActionByIdMock: vi.fn() }));
const { mockCalendarManager } = vi.hoisted(() => ({
  mockCalendarManager: {
    registerAction: vi.fn().mockReturnValue('cal_123'),
    unregisterAction: vi.fn(),
    getEventsForAction: vi.fn().mockReturnValue([]),
    getStatusForAction: vi.fn().mockReturnValue('LOADED'),
    getCalendarForAction: vi.fn().mockReturnValue({ id: 'cal_123', cache: { version: 1 } }),
    getGlobalSettings: vi.fn().mockReturnValue(null),
    refreshCalendarForAction: vi.fn().mockResolvedValue(undefined)
  }
}));

// ---- Module mocks ----
vi.mock('@elgato/streamdeck', () => ({
  default: {
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    actions: { registerAction: vi.fn(), getActionById: getActionByIdMock },
    connect: vi.fn()
  },
  action: vi.fn((_config: any) => (target: any) => target),
  SingletonAction: class {
    actions = new Map();
  }
}));

// Keep the real summarizeDebugInfo but stub the logger object
vi.mock('../src/utils/logger', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() }
  };
});

vi.mock('../src/services/calendar-service', () => ({
  calendarCache: { version: 1, status: 'LOADED', events: [], lastFetch: Date.now(), provider: 'test' },
  getStatusText: vi.fn((s: string) => s),
  getSettings: vi.fn(() => ({ titleDisplayDuration: 15, flashOnMeetingStart: false })),
  forceRefreshCache: vi.fn()
}));

vi.mock('../src/services/calendar-manager', () => ({ calendarManager: mockCalendarManager }));

// NOTE: The decorated action subclasses (@action(...)) cannot be imported into the
// vitest runtime (established repo constraint — see the local test doubles in every
// other action test). BaseAction is NOT decorated, so it imports cleanly and lets us
// exercise the shared helpers directly.
import { BaseAction } from '../src/actions/base-action';
import * as baseMod from '../src/actions/base-action';
import { logger } from '../src/utils/logger';
import * as loggerMod from '../src/utils/logger';

/**
 * Minimal concrete subclass to exercise BaseAction helpers directly.
 */
class TestAction extends BaseAction {
  protected async updateDisplay(_actionId: string, _action: any): Promise<void> {
    // no-op
  }
  protected async setInitialImage(_action: any): Promise<void> {
    // no-op
  }

  public seed(id: string, action: any): any {
    const state = (this as any).getButtonState(id);
    state.actionRef = action;
    return state;
  }
  public async setTitle(id: string, action: any, title: string): Promise<void> {
    await (this as any).setTitleForButton(id, action, title);
  }
  public reap(): Promise<string[]> {
    return (this as any).reapOrphans();
  }
  public debugTick(id: string, msg: string): void {
    (this as any).debugForButton(id, msg);
  }
  public states(): Map<string, any> {
    return (this as any).buttonStates as Map<string, any>;
  }
  public async appear(id: string, action: any, settings: any = {}): Promise<void> {
    await this.onWillAppear({ action: { ...action, id }, payload: { settings } } as any);
  }
}

/**
 * Subclass whose polymorphic cleanup hook records the ids it cleaned — proves
 * subclass-specific cleanup (e.g. marquee intervals) runs when an orphan is reaped.
 */
class MarqueeTestAction extends TestAction {
  public cleaned: string[] = [];
  protected async cleanupButtonState(actionId: string): Promise<void> {
    this.cleaned.push(actionId);
    await super.cleanupButtonState(actionId);
  }
}

/**
 * Subclass whose cleanup hook always throws — proves a failing reap neither
 * crashes the sweep nor records the id as reaped.
 */
class ThrowingTestAction extends TestAction {
  protected async cleanupButtonState(actionId: string): Promise<void> {
    throw new Error(`cleanup boom for ${actionId}`);
  }
}

/**
 * Subclass whose reapOrphans blocks on a manually-released promise, letting a
 * test hold one sweep "in flight" across the next interval tick (#78.3).
 */
class SlowSweepAction extends TestAction {
  public sweepCalls = 0;
  public release: () => void = () => {};
  // Every hung pass records its own resolver here. `release` still points at the
  // most-recent pass for the single-pass tests, but reassigning it per call orphaned
  // an earlier hung pass's resolver (it could never be settled), leaking a pending
  // promise across the test (#112.5). Tests that hold two passes in flight resolve
  // them via `releasers` so no pass is left dangling.
  public releasers: Array<() => void> = [];
  public async reapOrphans(): Promise<string[]> {
    this.sweepCalls++;
    await new Promise<void>(resolve => {
      this.release = resolve;
      this.releasers.push(resolve);
    });
    return [];
  }
}

/**
 * Subclass whose reapOrphans always rejects — proves the sweep-interval's outer
 * .catch logs and swallows the rejection instead of crashing the plugin (#78.6).
 */
class RejectingSweepAction extends TestAction {
  public async reapOrphans(): Promise<string[]> {
    throw new Error('reap boom');
  }
}

describe('issue #29 - setTitle change-guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends setTitle once for two identical consecutive titles, again when it changes', async () => {
    const action = { id: 'g1', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    a.seed('g1', action);

    await a.setTitle('g1', action, '5m 00s');
    await a.setTitle('g1', action, '5m 00s'); // identical -> skipped
    expect(action.setTitle).toHaveBeenCalledTimes(1);

    await a.setTitle('g1', action, '4m 59s'); // changed -> painted
    expect(action.setTitle).toHaveBeenCalledTimes(2);
  });

  it('retries the SDK call on the next tick when setTitle rejects (does not poison the guard)', async () => {
    // Transient IPC failure: the first setTitle rejects. The guard must NOT record
    // the title as painted, so the next tick with the SAME text calls the SDK again.
    const action = {
      id: 't1',
      setTitle: vi.fn()
        .mockRejectedValueOnce(new Error('IPC down'))
        .mockResolvedValueOnce(undefined),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('t1', action);

    // setTitleForButton MUST swallow the rejection and resolve to undefined — this
    // pins the no-throw contract so a future edit that rethrows fails here instead
    // of being masked by the test's own .catch (#76).
    await expect(a.setTitle('t1', action, 'Meeting')).resolves.toBeUndefined();
    expect(vi.mocked(logger.warn)).toHaveBeenCalled();
    // Guard must not be committed after a failed paint.
    expect(a.states().get('t1').currentTitle).toBeUndefined();

    await a.setTitle('t1', action, 'Meeting'); // same text -> must retry, now succeeds
    expect(action.setTitle).toHaveBeenCalledTimes(2);
    expect(a.states().get('t1').currentTitle).toBe('Meeting');
  });
});

describe('issue #29 - marquee still renders through the guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders every differing marquee frame while de-duplicating identical ones', async () => {
    // The real marquee (combined/next-meeting) routes each frame through
    // setTitleForButton. A marquee scrolls, so consecutive frames differ and MUST
    // all be painted; only a truly repeated frame should be skipped.
    const action = { id: 'm1', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    a.seed('m1', action);

    const frames = ['Team St', 'eam Sta', 'am Stan', 'am Stan', 'm Stand'];
    for (const f of frames) {
      await a.setTitle('m1', action, f);
    }

    const painted = action.setTitle.mock.calls.map((c: any[]) => c[0]);
    // 'am Stan' repeats once and is de-duplicated -> 4 paints for 5 frames
    expect(painted).toEqual(['Team St', 'eam Sta', 'am Stan', 'm Stand']);

    // Guarded setter records the last painted title
    const state = a.states().get('m1');
    expect(state.currentTitle).toBe('m Stand');
  });
});

describe('issue #72 - setTitle failure log throttled to the failure transition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('warns once for a sustained IPC outage, not every tick, while still attempting each paint', async () => {
    const action = {
      id: 'out1',
      setTitle: vi.fn().mockRejectedValue(new Error('IPC down')),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('out1', action);

    await a.setTitle('out1', action, 'Meeting');
    await a.setTitle('out1', action, 'Meeting');
    await a.setTitle('out1', action, 'Meeting');

    // Every tick still tries the SDK (so recovery is detected promptly)...
    expect(action.setTitle).toHaveBeenCalledTimes(3);
    // ...but only the first failure of the outage is logged.
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
  });

  it('warns exactly once across a mid-outage title change (throttle is per-outage, not per-title) (#103)', async () => {
    // Both #72 tests reuse one title across failing calls, so a regression that
    // re-keyed the throttle per-title (log flood on every title change) would pass
    // unnoticed. Change the title mid-outage: the warn must still fire exactly once.
    const action = {
      id: 'chg1',
      setTitle: vi.fn().mockRejectedValue(new Error('IPC down')),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('chg1', action);

    await a.setTitle('chg1', action, 'Title A'); // fails -> warns (outage opens)
    await a.setTitle('chg1', action, 'Title B'); // DIFFERENT title, same outage -> suppressed

    expect(action.setTitle).toHaveBeenCalledTimes(2);
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
  });

  it('logs recovery exactly once when the SDK paints again after a failure', async () => {
    const action = {
      id: 'rec1',
      setTitle: vi.fn()
        .mockRejectedValueOnce(new Error('IPC down'))
        .mockRejectedValueOnce(new Error('IPC down'))
        .mockResolvedValue(undefined),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('rec1', action);

    await a.setTitle('rec1', action, 'Meeting'); // fail (warn)
    await a.setTitle('rec1', action, 'Meeting'); // fail (suppressed)
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);

    await a.setTitle('rec1', action, 'Meeting'); // success -> recovery logged once
    const recovery = () =>
      vi.mocked(logger.info).mock.calls.filter(
        (c: any[]) => typeof c[0] === 'string' && c[0].includes('recovered')
      );
    expect(recovery()).toHaveLength(1);

    // A subsequent healthy paint must NOT re-log recovery.
    await a.setTitle('rec1', action, 'Later');
    expect(recovery()).toHaveLength(1);
  });
});

describe('issue #110 - setTitle re-reads live state, never a state removed mid-flight', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not commit a paint onto a ButtonState removed while setTitle was pending (#110)', async () => {
    let resolve!: () => void;
    const action = {
      id: 'mid1',
      setTitle: vi.fn().mockImplementation(() => new Promise<void>(r => { resolve = () => r(); })),
      setImage: vi.fn()
    };
    const a = new TestAction();
    const state = a.seed('mid1', action);

    const p = a.setTitle('mid1', action, 'Hello');
    // A cleanupButtonState/reap races the in-flight settle and removes this id.
    a.states().delete('mid1');

    resolve(); // setTitle resolves AFTER the state was removed
    await p;

    // The removed state must not be resurrected, and the detached object must not be
    // mutated (a raw `state` write would set currentTitle on the dead object) (#110).
    expect(a.states().has('mid1')).toBe(false);
    expect(state.currentTitle).toBeUndefined();
    expect(state.titleFailureLogged).toBeFalsy();
  });

  it('stays silent when a setTitle failure settles after the ButtonState was removed (#110)', async () => {
    let reject!: (e: Error) => void;
    const action = {
      id: 'mid2',
      setTitle: vi.fn().mockImplementation(() => new Promise<void>((_res, rej) => { reject = rej; })),
      setImage: vi.fn()
    };
    const a = new TestAction();
    const state = a.seed('mid2', action);

    const p = a.setTitle('mid2', action, 'Hello');
    // State existed at entry but is gone by the time the failure settles.
    a.states().delete('mid2');

    reject(new Error('IPC down'));
    await p;

    // Logging a failure for an already-removed button is misleading and unthrottleable,
    // so it must be suppressed; the detached state's throttle flag stays untouched (#110).
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
    expect(state.titleFailureLogged).toBeFalsy();
  });
});

describe('issue #112.1 - titleFailureLogged transitions are token-gated', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('an older dispatch rejecting after a newer one succeeded does not raise a spurious outage warn (#112.1)', async () => {
    let rejectX!: (e: Error) => void;
    let resolveY!: () => void;
    const action = {
      id: 'tg1',
      setTitle: vi.fn()
        .mockImplementationOnce(() => new Promise<void>((_res, rej) => { rejectX = rej; })) // X: older, hung
        .mockImplementationOnce(() => new Promise<void>(r => { resolveY = () => r(); })),   // Y: newer
      setImage: vi.fn()
    };
    const a = new TestAction();
    const state = a.seed('tg1', action);

    const pX = a.setTitle('tg1', action, 'X'); // dispatch 1 (older)
    const pY = a.setTitle('tg1', action, 'Y'); // dispatch 2 (latest)

    // The NEWER dispatch settles successfully first — no outage.
    resolveY();
    await pY;
    expect(state.currentTitle).toBe('Y');
    expect(state.titleFailureLogged).toBeFalsy();

    // The OLDER X now rejects. It is not the latest dispatch, so it must NOT flip the
    // outage flag or emit a warn — that would be a spurious/stuck outage (#112.1).
    rejectX(new Error('IPC down'));
    await pX;
    expect(state.titleFailureLogged).toBeFalsy();
    expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
  });

  it('an older dispatch resolving after a newer one failed does not spuriously log recovery (#112.1)', async () => {
    let resolveX!: () => void;
    let rejectY!: (e: Error) => void;
    const action = {
      id: 'tg2',
      setTitle: vi.fn()
        .mockImplementationOnce(() => new Promise<void>(r => { resolveX = () => r(); }))      // X: older, hung
        .mockImplementationOnce(() => new Promise<void>((_res, rej) => { rejectY = rej; })),  // Y: newer
      setImage: vi.fn()
    };
    const a = new TestAction();
    const state = a.seed('tg2', action);

    const pX = a.setTitle('tg2', action, 'X'); // dispatch 1 (older)
    const pY = a.setTitle('tg2', action, 'Y'); // dispatch 2 (latest)

    // The NEWER dispatch fails first — a real outage opens (warn once).
    rejectY(new Error('IPC down'));
    await pY;
    expect(state.titleFailureLogged).toBe(true);
    expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);

    // The OLDER X now resolves. It is not the latest dispatch, so it must NOT clear the
    // outage flag or log a (false) recovery while the latest paint is still failed (#112.1).
    resolveX();
    await pX;
    expect(state.titleFailureLogged).toBe(true);
    const recovered = vi.mocked(logger.info).mock.calls.filter(
      (c: any[]) => typeof c[0] === 'string' && c[0].includes('recovered')
    );
    expect(recovered).toHaveLength(0);
  });
});

describe('issue #74 - setTitle in-flight coalescing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('coalesces two concurrent identical titles into a single SDK call', async () => {
    const action = { id: 'c1', setTitle: vi.fn().mockResolvedValue(undefined), setImage: vi.fn() };
    const a = new TestAction();
    a.seed('c1', action);

    const p1 = a.setTitle('c1', action, 'Same');
    const p2 = a.setTitle('c1', action, 'Same'); // identical & still in flight -> skipped
    await Promise.all([p1, p2]);

    expect(action.setTitle).toHaveBeenCalledTimes(1);
    expect(a.states().get('c1').currentTitle).toBe('Same');
    expect(a.states().get('c1').pendingTitle).toBeUndefined();
  });

  it('does not let a stale out-of-order resolution clobber a newer title', async () => {
    let resolveX!: () => void;
    let resolveY!: () => void;
    const action = {
      id: 'oo1',
      setTitle: vi.fn()
        .mockImplementationOnce(() => new Promise<void>(r => { resolveX = () => r(); }))
        .mockImplementationOnce(() => new Promise<void>(r => { resolveY = () => r(); })),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('oo1', action);

    const pX = a.setTitle('oo1', action, 'X'); // dispatched first
    const pY = a.setTitle('oo1', action, 'Y'); // dispatched second (newest)

    resolveY();
    await pY;
    expect(a.states().get('oo1').currentTitle).toBe('Y');

    resolveX(); // the older paint settles last
    await pX;
    // The stale 'X' resolution must not overwrite the newer committed 'Y'.
    expect(a.states().get('oo1').currentTitle).toBe('Y');
  });

  it('does not let an older same-text settlement clear a newer dispatch\'s in-flight marker (#100)', async () => {
    // x,y,x interleaving during slow IPC. Value-equality coalescing (#74) let the
    // OLDER x's settlement value-match the NEWER x's pendingTitle and clear it early;
    // a per-dispatch generation token keys the commit/clear to the exact dispatch so
    // an older settle can no longer touch a newer dispatch's marker (#100).
    let resolveX1!: () => void;
    let resolveY!: () => void;
    let resolveX2!: () => void;
    const action = {
      id: 'xyx1',
      setTitle: vi.fn()
        .mockImplementationOnce(() => new Promise<void>(r => { resolveX1 = () => r(); }))
        .mockImplementationOnce(() => new Promise<void>(r => { resolveY = () => r(); }))
        .mockImplementationOnce(() => new Promise<void>(r => { resolveX2 = () => r(); })),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('xyx1', action);

    const pX1 = a.setTitle('xyx1', action, 'X'); // dispatch 1 (older X)
    const pY = a.setTitle('xyx1', action, 'Y');  // dispatch 2 (Y breaks the X coalescing)
    const pX2 = a.setTitle('xyx1', action, 'X'); // dispatch 3 (newer X, now owns pendingTitle)

    // Y differs from X so none of the three dispatches is coalesced away.
    expect(action.setTitle).toHaveBeenCalledTimes(3);
    expect(a.states().get('xyx1').pendingTitle).toBe('X');

    // The OLDER X (dispatch 1) settles first: it must NOT clear the newer X dispatch's
    // in-flight marker (value-equality would have wiped it) (#100).
    resolveX1();
    await pX1;
    expect(a.states().get('xyx1').pendingTitle).toBe('X');

    // Because the marker survived, a further identical X is still coalesced — no
    // redundant 4th SDK call.
    await a.setTitle('xyx1', action, 'X');
    expect(action.setTitle).toHaveBeenCalledTimes(3);

    // Release the remaining in-flight dispatches so nothing leaks past the test.
    resolveY();
    resolveX2();
    await Promise.all([pY, pX2]);
  });

  it('clears pendingTitle on reject so the next tick retries (#51 semantics preserved)', async () => {
    const action = {
      id: 'r1',
      setTitle: vi.fn()
        .mockRejectedValueOnce(new Error('IPC down'))
        .mockResolvedValueOnce(undefined),
      setImage: vi.fn()
    };
    const a = new TestAction();
    a.seed('r1', action);

    await expect(a.setTitle('r1', action, 'Meeting')).resolves.toBeUndefined();
    expect(a.states().get('r1').pendingTitle).toBeUndefined();
    expect(a.states().get('r1').currentTitle).toBeUndefined();

    await a.setTitle('r1', action, 'Meeting'); // same text -> retried, now succeeds
    expect(action.setTitle).toHaveBeenCalledTimes(2);
    expect(a.states().get('r1').currentTitle).toBe('Meeting');
  });
});

describe('issue #29 - orphan reconciliation sweep', () => {
  const savedSweepEnv = process.env.ICAL_ORPHAN_SWEEP_MS;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Prevent order-dependent collateral reaping: each test starts with an empty
    // instance registry so the sweep only sees the button(s) it created (#55).
    baseMod.__resetActionInstancesForTest();
    (baseMod as any).stopOrphanSweep?.();
    getActionByIdMock.mockReset();
    delete process.env.ICAL_ORPHAN_SWEEP_MS;
  });

  afterEach(() => {
    (baseMod as any).stopOrphanSweep?.();
    vi.useRealTimers();
    if (savedSweepEnv === undefined) {
      delete process.env.ICAL_ORPHAN_SWEEP_MS;
    } else {
      process.env.ICAL_ORPHAN_SWEEP_MS = savedSweepEnv;
    }
  });

  it('reaps a tracked button the SDK no longer reports and leaves visible ones alone', async () => {
    const orphanAction = { id: 'sweep-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const visibleAction = { id: 'sweep-visible', setTitle: vi.fn(), setImage: vi.fn() };

    const a = new TestAction();
    const orphanState = a.seed('sweep-orphan', orphanAction);
    orphanState.calendarId = 'cal_123';
    orphanState.interval = setInterval(() => {}, 1000);
    const visibleState = a.seed('sweep-visible', visibleAction);
    visibleState.calendarId = 'cal_123';
    visibleState.interval = setInterval(() => {}, 1000);

    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const orphanTimer = orphanState.interval;

    // SDK only knows about the visible button
    getActionByIdMock.mockImplementation((id: string) => (id === 'sweep-visible' ? visibleAction : undefined));

    const reaped = await baseMod.reapOrphanedButtons();

    // With an isolated registry, exactly one button is reaped — assert the full set.
    expect(reaped).toEqual(['sweep-orphan']);
    expect(a.states().has('sweep-orphan')).toBe(false);
    expect(a.states().has('sweep-visible')).toBe(true);
    // The ONLY unregister call is for the orphan (strict, order-independent — #55).
    expect(mockCalendarManager.unregisterAction.mock.calls).toEqual([['sweep-orphan']]);
    expect(clearIntervalSpy).toHaveBeenCalledWith(orphanTimer);
  });

  it('runs the sweep on the periodic interval', async () => {
    const orphanAction = { id: 'timed-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    const state = a.seed('timed-orphan', orphanAction);
    state.calendarId = 'cal_123';
    state.interval = setInterval(() => {}, 1000);

    getActionByIdMock.mockReturnValue(undefined);

    baseMod.startOrphanSweep(60_000);
    expect(a.states().has('timed-orphan')).toBe(true);

    await vi.advanceTimersByTimeAsync(60_000);

    expect(a.states().has('timed-orphan')).toBe(false);
    // The isolated registry means the sole unregister is the timed orphan (#55).
    expect(mockCalendarManager.unregisterAction.mock.calls).toEqual([['timed-orphan']]);
  });

  it('does not crash the sweep and does not record the id as reaped when cleanup throws (#50)', async () => {
    const orphanAction = { id: 'throw-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new ThrowingTestAction();
    a.seed('throw-orphan', orphanAction);
    getActionByIdMock.mockReturnValue(undefined);

    // Must resolve (no unhandled rejection / crash) and NOT count the failed reap.
    const reaped = await baseMod.reapOrphanedButtons();

    expect(reaped).not.toContain('throw-orphan');
    expect(vi.mocked(logger.error)).toHaveBeenCalled();
  });

  it('runs subclass-specific cleanup when an orphan is reaped (#50)', async () => {
    const orphanAction = { id: 'marquee-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new MarqueeTestAction();
    a.seed('marquee-orphan', orphanAction);
    getActionByIdMock.mockReturnValue(undefined);

    const reaped = await baseMod.reapOrphanedButtons();

    expect(reaped).toContain('marquee-orphan');
    // The polymorphic cleanup hook ran, so marquee-style subclass state was cleared.
    expect(a.cleaned).toContain('marquee-orphan');
    // Base cleanup still happened.
    expect(a.states().has('marquee-orphan')).toBe(false);
    expect(mockCalendarManager.unregisterAction).toHaveBeenCalledWith('marquee-orphan');
  });

  it('keeps reaping other ids when getActionById throws for one (#78.2)', async () => {
    const throwAction = { id: 'gid-throw', setTitle: vi.fn(), setImage: vi.fn() };
    const goneAction = { id: 'gid-gone', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    const s1 = a.seed('gid-throw', throwAction);
    s1.calendarId = 'cal_123';
    const s2 = a.seed('gid-gone', goneAction);
    s2.calendarId = 'cal_123';

    // The SDK lookup throws for the first id; the second id is simply gone.
    getActionByIdMock.mockImplementation((id: string) => {
      if (id === 'gid-throw') {
        throw new Error('SDK boom');
      }
      return undefined;
    });

    const reaped = await baseMod.reapOrphanedButtons();

    // One SDK throw must not abort the remainder of the pass: gid-gone is reaped.
    expect(reaped).toEqual(['gid-gone']);
    expect(a.states().has('gid-gone')).toBe(false);
    // The id whose lookup threw is left intact and the error is logged.
    expect(a.states().has('gid-throw')).toBe(true);
    expect(vi.mocked(logger.error)).toHaveBeenCalled();
  });

  it('skips a sweep tick while the previous sweep is still in flight (#78.3)', async () => {
    const a = new SlowSweepAction();
    a.seed('slow-1', { id: 'slow-1', setTitle: vi.fn(), setImage: vi.fn() });

    baseMod.startOrphanSweep(1000);

    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(1); // first sweep started and is still pending

    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(1); // overlapping tick is skipped, not re-entered

    a.release(); // let the in-flight sweep settle -> clears the guard in .finally
    await vi.advanceTimersByTimeAsync(0);

    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(2); // next tick runs now that the guard is clear
    a.release();
  });

  it('logs and swallows a reapOrphanedButtons rejection from the sweep interval (#78.6)', async () => {
    const a = new RejectingSweepAction();
    a.seed('rej-1', { id: 'rej-1', setTitle: vi.fn(), setImage: vi.fn() });

    baseMod.startOrphanSweep(1000);
    await vi.advanceTimersByTimeAsync(1000);

    // The outer .catch turns the rejection into an error log, not a crash.
    expect(vi.mocked(logger.error)).toHaveBeenCalledWith(
      '[BaseAction] Orphan sweep failed:',
      expect.any(Error)
    );

    // A later tick still runs (the in-flight guard was cleared in .finally).
    await vi.advanceTimersByTimeAsync(1000);
    const sweepFailedLogs = vi.mocked(logger.error).mock.calls.filter(
      (c: any[]) => c[0] === '[BaseAction] Orphan sweep failed:'
    );
    expect(sweepFailedLogs.length).toBeGreaterThanOrEqual(2);
  });

  it('reads the sweep cadence from ICAL_ORPHAN_SWEEP_MS when no explicit interval is given (#56.1)', async () => {
    process.env.ICAL_ORPHAN_SWEEP_MS = '5000';

    const orphanAction = { id: 'env-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    a.seed('env-orphan', orphanAction);
    getActionByIdMock.mockReturnValue(undefined);

    baseMod.startOrphanSweep(); // no explicit interval -> env override applies

    // Not yet due at the default cadence boundary...
    await vi.advanceTimersByTimeAsync(4999);
    expect(a.states().has('env-orphan')).toBe(true);
    // ...fires at the env-configured 5s cadence.
    await vi.advanceTimersByTimeAsync(1);
    expect(a.states().has('env-orphan')).toBe(false);
  });
});

describe('issue #73/#75 - orphan sweep interval validation & precedence', () => {
  const savedSweepEnv = process.env.ICAL_ORPHAN_SWEEP_MS;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    baseMod.__resetActionInstancesForTest();
    (baseMod as any).stopOrphanSweep?.();
    getActionByIdMock.mockReset();
    getActionByIdMock.mockReturnValue(undefined);
    delete process.env.ICAL_ORPHAN_SWEEP_MS;
  });

  afterEach(() => {
    (baseMod as any).stopOrphanSweep?.();
    vi.useRealTimers();
    if (savedSweepEnv === undefined) {
      delete process.env.ICAL_ORPHAN_SWEEP_MS;
    } else {
      process.env.ICAL_ORPHAN_SWEEP_MS = savedSweepEnv;
    }
  });

  // 'abc'/'-5'/'0'/'2.5' are rejected by the pre-existing integer/positivity check;
  // '999' (below the 1000ms floor) and '3600000000' (above the 2^31-1 ceiling that
  // makes Node clamp setInterval to 1ms) are the newly-bounded cases (#73).
  // '0x7D0' (=2000), '1e3' (=1000) and ' 5000 ' (=5000) are the forms Number() WOULD
  // coerce into the accepted range; only the /^\d+$/ pre-check rejects them, so they
  // pin that clause — dropping it lets them through and fires the sweep early (#111).
  it.each(['abc', '-5', '0', '2.5', '999', '3600000000', '0x7D0', '1e3', ' 5000 '])(
    'ignores invalid ICAL_ORPHAN_SWEEP_MS=%s and falls back to the 60s default with a warning',
    async (raw) => {
      process.env.ICAL_ORPHAN_SWEEP_MS = raw;
      const id = `bad-${raw}`;
      const orphanAction = { id, setTitle: vi.fn(), setImage: vi.fn() };
      const a = new TestAction();
      const state = a.seed(id, orphanAction);
      state.calendarId = 'cal_123';

      baseMod.startOrphanSweep(); // no explicit interval -> env is consulted

      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining('ICAL_ORPHAN_SWEEP_MS')
      );

      // Default 60s cadence: not due at 59.999s, reaped exactly at 60s.
      await vi.advanceTimersByTimeAsync(59_999);
      expect(a.states().has(id)).toBe(true);
      await vi.advanceTimersByTimeAsync(1);
      expect(a.states().has(id)).toBe(false);
    }
  );

  // The rejection-only suite above never proves the accepted boundaries stay
  // accepted; a future off-by-one (>= -> > / <= -> <) would silently reject legal
  // values and fall back to the 60s default. Pin both bounds to the exact cadence.
  it.each(['1000', '2147483647'])(
    'accepts boundary ICAL_ORPHAN_SWEEP_MS=%s and fires the sweep at exactly that cadence (#102)',
    async (raw) => {
      process.env.ICAL_ORPHAN_SWEEP_MS = raw;
      const ms = Number(raw);
      const id = `bound-${raw}`;
      const orphanAction = { id, setTitle: vi.fn(), setImage: vi.fn() };
      const a = new TestAction();
      const state = a.seed(id, orphanAction);
      state.calendarId = 'cal_123';

      baseMod.startOrphanSweep(); // no explicit interval -> env boundary is consulted

      await vi.advanceTimersByTimeAsync(ms - 1);
      expect(a.states().has(id)).toBe(true);
      await vi.advanceTimersByTimeAsync(1);
      expect(a.states().has(id)).toBe(false);
    }
  );

  it('ignores an out-of-range explicit interval and falls back to the 60s default with a warning (#104.3)', async () => {
    // The explicit intervalMs param previously bypassed the [1000, 2147483647] bounds
    // entirely — an asymmetric #73 defense. A sub-floor explicit value must now warn
    // and fall back to the default rather than hot-loop the sweep.
    const id = 'explicit-oob';
    const orphanAction = { id, setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    const state = a.seed(id, orphanAction);
    state.calendarId = 'cal_123';

    baseMod.startOrphanSweep(500); // below the 1000ms floor -> rejected, default used

    expect(vi.mocked(logger.warn)).toHaveBeenCalled();
    // At the rejected 500ms cadence the orphan would already be gone by 60s; the
    // default cadence keeps it until exactly 60s.
    await vi.advanceTimersByTimeAsync(59_999);
    expect(a.states().has(id)).toBe(true);
    await vi.advanceTimersByTimeAsync(1);
    expect(a.states().has(id)).toBe(false);
  });

  it('gives an explicit interval precedence over a valid env override (#75)', async () => {
    process.env.ICAL_ORPHAN_SWEEP_MS = '5000';
    const orphanAction = { id: 'prec-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    const state = a.seed('prec-orphan', orphanAction);
    state.calendarId = 'cal_123';

    baseMod.startOrphanSweep(10_000); // explicit param must win over env=5000

    // The 5s env cadence must NOT fire it...
    await vi.advanceTimersByTimeAsync(9_999);
    expect(a.states().has('prec-orphan')).toBe(true);
    // ...the explicit 10s cadence does.
    await vi.advanceTimersByTimeAsync(1);
    expect(a.states().has('prec-orphan')).toBe(false);
  });
});

describe('issue #29 - per-tick debug log de-duplication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('buffers an identical per-button debug line only once, then again when it changes', () => {
    const a = new TestAction();
    a.seed('d1', { id: 'd1', setTitle: vi.fn(), setImage: vi.fn() });

    a.debugTick('d1', 'Active events: 0, next event: none');
    a.debugTick('d1', 'Active events: 0, next event: none'); // suppressed
    a.debugTick('d1', 'Active events: 1, next event: Sync'); // changed -> logged

    const sameCalls = vi.mocked(logger.debug).mock.calls.filter(
      (c: any[]) => c[0] === 'Active events: 0, next event: none'
    );
    const changedCalls = vi.mocked(logger.debug).mock.calls.filter(
      (c: any[]) => c[0] === 'Active events: 1, next event: Sync'
    );
    expect(sameCalls.length).toBe(1);
    expect(changedCalls.length).toBe(1);
  });
});

describe('issue #29 - debug-info log truncation', () => {
  it('summarizes debug info without embedding the serialized log buffer', () => {
    const info = {
      isDebugMode: false,
      cache: { status: 'LOADED', version: 4, eventCount: 3, lastFetch: null, provider: 'google' },
      events: [],
      logs: [
        { timestamp: 't', level: 'info', message: 'SECRET_MARKER_LOG_LINE_SHOULD_NOT_APPEAR' }
      ]
    };

    const summary = loggerMod.summarizeDebugInfo(info);

    expect(typeof summary).toBe('string');
    expect(summary).not.toContain('SECRET_MARKER_LOG_LINE_SHOULD_NOT_APPEAR');
    expect(summary).toContain('logs=1');
    expect(summary).toContain('status=LOADED');
    expect(summary).toContain('events=3');
  });
});

describe('issue #54 - onWillAppear change-guard reset', () => {
  let wakeAction: TestAction | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    baseMod.__resetActionInstancesForTest();
    getActionByIdMock.mockReset();
    wakeAction = undefined;
  });

  afterEach(() => {
    // Stop the per-second timer onWillAppear started here, not inline in the test
    // body — afterEach always runs even if an assertion above throws, so the timer
    // can't leak into a later test (#78.6).
    if (wakeAction) {
      (wakeAction as any).stopTimerForButton('wake1');
    }
    vi.useRealTimers();
  });

  it('resets currentTitle/lastDebugMessage on (re)appear so an identical post-wake title repaints', async () => {
    const action = { id: 'wake1', setTitle: vi.fn(), setImage: vi.fn(), setSettings: vi.fn() };
    const a = new TestAction();
    wakeAction = a;
    const state = a.seed('wake1', action);
    // Simulate pre-sleep guards recording the last painted title / debug line.
    state.currentTitle = '10:00';
    state.lastDebugMessage = 'Active events: 1';

    await a.appear('wake1', action, {});

    // Change-guards cleared so the first post-appear tick always paints (#29/#54).
    expect(state.currentTitle).toBeUndefined();
    expect(state.lastDebugMessage).toBeUndefined();

    // A title identical to the pre-sleep one must still reach the SDK.
    await a.setTitle('wake1', action, '10:00');
    expect(action.setTitle).toHaveBeenCalledWith('10:00');
    // The per-second timer onWillAppear started is stopped in afterEach (#78.6).
  });
});

describe('issue #99 - onWillAppear clears stuck in-flight title guards', () => {
  let appeared: TestAction | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    baseMod.__resetActionInstancesForTest();
    getActionByIdMock.mockReset();
    appeared = undefined;
  });

  afterEach(() => {
    if (appeared) {
      (appeared as any).stopTimerForButton('wake99');
    }
    vi.useRealTimers();
  });

  it('resets a stuck pendingTitle/titleFailureLogged so an identical post-wake title still paints', async () => {
    const action = { id: 'wake99', setTitle: vi.fn().mockResolvedValue(undefined), setImage: vi.fn(), setSettings: vi.fn() };
    const a = new TestAction();
    appeared = a;
    const state = a.seed('wake99', action);
    // Simulate a setTitle whose IPC promise hung before sleep: onWillAppear reuses the
    // ButtonState, leaving a stale in-flight marker (and outage-log flag) that would
    // make the post-wake repaint of the same text silently no-op (#99, stale-display
    // class #54 addressed via the in-flight guard rather than currentTitle).
    state.currentTitle = undefined;
    state.pendingTitle = '10:00';
    state.titleFailureLogged = true;

    await a.appear('wake99', action, {});

    // The hung in-flight guards are cleared on (re)appear.
    expect(state.pendingTitle).toBeUndefined();
    expect(state.titleFailureLogged).toBe(false);

    // The same text as the stuck in-flight title must now reach the SDK.
    await a.setTitle('wake99', action, '10:00');
    expect(action.setTitle).toHaveBeenCalledWith('10:00');
  });
});

describe('issue #109 - onWillAppear invalidates the in-flight title dispatch token', () => {
  let appeared: TestAction | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    baseMod.__resetActionInstancesForTest();
    getActionByIdMock.mockReset();
    appeared = undefined;
  });

  afterEach(() => {
    if (appeared) {
      (appeared as any).stopTimerForButton('wake109');
    }
    vi.useRealTimers();
  });

  it('bumps titleDispatchToken on (re)appear so a pre-appear hung setTitle cannot commit stale text (#109)', async () => {
    let resolveHung!: () => void;
    const action = {
      id: 'wake109',
      setTitle: vi.fn()
        // The pre-sleep dispatch whose IPC promise hangs until after the re-appear.
        .mockImplementationOnce(() => new Promise<void>(r => { resolveHung = () => r(); }))
        .mockResolvedValue(undefined),
      setImage: vi.fn(),
      setSettings: vi.fn()
    };
    const a = new TestAction();
    appeared = a;
    const state = a.seed('wake109', action);

    // A setTitle dispatched before sleep that never settles (hung IPC): it stamps the
    // ButtonState's dispatch token and leaves 'STALE' in flight.
    const pHung = a.setTitle('wake109', action, 'STALE');
    expect(state.pendingTitle).toBe('STALE');

    // Re-appear reuses the SAME ButtonState object. It must invalidate the pre-appear
    // dispatch's token so a late settlement can no longer commit its (now stale) text.
    await a.appear('wake109', action, {});

    // The hung pre-appear promise finally settles AFTER the reset window: with the token
    // bumped it is no longer the latest dispatch, so it must NOT commit 'STALE'.
    resolveHung();
    await pHung;
    expect(state.currentTitle).toBeUndefined();

    // A fresh identical-title dispatch still reaches the SDK and paints (the post-wake
    // repaint is not suppressed by a stale currentTitle).
    await a.setTitle('wake109', action, 'STALE');
    expect(action.setTitle).toHaveBeenCalledWith('STALE');
    expect(state.currentTitle).toBe('STALE');
  });
});

describe('issue #101 - stopOrphanSweep resets the in-flight guard', () => {
  const savedSweepEnv = process.env.ICAL_ORPHAN_SWEEP_MS;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    baseMod.__resetActionInstancesForTest();
    (baseMod as any).stopOrphanSweep?.();
    // Mirror the #55 reset pattern: guarantee no in-flight guard leaks in from a
    // prior test whose sweep pass never settled (#101).
    (baseMod as any).__resetSweepInFlightForTest?.();
    getActionByIdMock.mockReset();
    getActionByIdMock.mockReturnValue(undefined);
    delete process.env.ICAL_ORPHAN_SWEEP_MS;
  });

  afterEach(() => {
    (baseMod as any).stopOrphanSweep?.();
    (baseMod as any).__resetSweepInFlightForTest?.();
    vi.useRealTimers();
    if (savedSweepEnv === undefined) {
      delete process.env.ICAL_ORPHAN_SWEEP_MS;
    } else {
      process.env.ICAL_ORPHAN_SWEEP_MS = savedSweepEnv;
    }
  });

  it('lets a restarted sweep run after a hung pass is stopped (in-flight guard cleared)', async () => {
    const a = new SlowSweepAction();
    a.seed('hung-1', { id: 'hung-1', setTitle: vi.fn(), setImage: vi.fn() });

    baseMod.startOrphanSweep(1000);
    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(1); // first pass started and is hung (never released)

    // Stop the sweep while its pass is still in flight, then restart it. stopOrphanSweep
    // must clear the module-level in-flight guard, otherwise the restarted sweep would
    // see a stuck `true` and never run another pass (#101).
    baseMod.stopOrphanSweep();
    baseMod.startOrphanSweep(1000);
    await vi.advanceTimersByTimeAsync(1000);

    expect(a.sweepCalls).toBe(2); // restarted sweep runs a fresh pass

    // Both the pre-restart pass AND the restarted pass are hung; `release` only points
    // at the latest, so settle every recorded resolver or the first pass leaks (#112.5).
    a.releasers.forEach(release => release());
    await vi.advanceTimersByTimeAsync(0);
  });

  it('a settling pre-restart pass does not clear the guard held by the restarted sweep — no overlap (#112.2)', async () => {
    const a = new SlowSweepAction();
    a.seed('ov-1', { id: 'ov-1', setTitle: vi.fn(), setImage: vi.fn() });

    baseMod.startOrphanSweep(1000);
    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(1); // pass A in flight (hung)
    const [releaseA] = a.releasers;

    // Restart mid-pass: #101 lets the restarted sweep begin a fresh pass B...
    baseMod.stopOrphanSweep();
    baseMod.startOrphanSweep(1000);
    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(2); // pass B in flight (restarted)
    const releaseB = a.releasers[1];

    // ...but when the OLD pass A finally settles, its .finally() must NOT clear the
    // in-flight guard that pass B now owns. A force-clear here (force-clearing without
    // checking whose pass is settling) would let the next tick start a THIRD pass that
    // overlaps the still-running B (#112.2).
    releaseA();
    await vi.advanceTimersByTimeAsync(0);

    await vi.advanceTimersByTimeAsync(1000);
    expect(a.sweepCalls).toBe(2); // next tick skipped — B still in flight, no pass C

    releaseB();
    await vi.advanceTimersByTimeAsync(0);
  });
});
