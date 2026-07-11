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

    // setTitleForButton must swallow the rejection (plugin never crashes); .catch is
    // a safety net so this test doesn't blow up if the current impl still rejects.
    await a.setTitle('t1', action, 'Meeting').catch(() => {});
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
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    baseMod.__resetActionInstancesForTest();
    getActionByIdMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resets currentTitle/lastDebugMessage on (re)appear so an identical post-wake title repaints', async () => {
    const action = { id: 'wake1', setTitle: vi.fn(), setImage: vi.fn(), setSettings: vi.fn() };
    const a = new TestAction();
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

    // Stop the per-second timer started by onWillAppear.
    (a as any).stopTimerForButton('wake1');
  });
});
