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
  public reap(): string[] {
    return (this as any).reapOrphans();
  }
  public debugTick(id: string, msg: string): void {
    (this as any).debugForButton(id, msg);
  }
  public states(): Map<string, any> {
    return (this as any).buttonStates as Map<string, any>;
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
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    (baseMod as any).stopOrphanSweep?.();
    getActionByIdMock.mockReset();
  });

  afterEach(() => {
    (baseMod as any).stopOrphanSweep?.();
    vi.useRealTimers();
  });

  it('reaps a tracked button the SDK no longer reports and leaves visible ones alone', () => {
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

    const reaped = baseMod.reapOrphanedButtons();

    expect(reaped).toContain('sweep-orphan');
    expect(reaped).not.toContain('sweep-visible');
    expect(a.states().has('sweep-orphan')).toBe(false);
    expect(a.states().has('sweep-visible')).toBe(true);
    expect(mockCalendarManager.unregisterAction).toHaveBeenCalledWith('sweep-orphan');
    expect(mockCalendarManager.unregisterAction).not.toHaveBeenCalledWith('sweep-visible');
    expect(clearIntervalSpy).toHaveBeenCalledWith(orphanTimer);
  });

  it('runs the sweep on the periodic interval', () => {
    const orphanAction = { id: 'timed-orphan', setTitle: vi.fn(), setImage: vi.fn() };
    const a = new TestAction();
    const state = a.seed('timed-orphan', orphanAction);
    state.calendarId = 'cal_123';
    state.interval = setInterval(() => {}, 1000);

    getActionByIdMock.mockReturnValue(undefined);

    baseMod.startOrphanSweep(60_000);
    expect(a.states().has('timed-orphan')).toBe(true);

    vi.advanceTimersByTime(60_000);

    expect(a.states().has('timed-orphan')).toBe(false);
    expect(mockCalendarManager.unregisterAction).toHaveBeenCalledWith('timed-orphan');
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
