# Architecture

> Extended architectural context for AI agents. Referenced from AGENTS.md.

---

## Project Structure

```
stream-deck-ical/
├── src/                          ← Plugin runtime (Node.js, bundled to CJS)
│   ├── plugin.ts                 ← Entry: registers actions, then streamDeck.connect()
│   ├── actions/                  ← One SingletonAction subclass per button type
│   │   ├── base-action.ts        ← BaseAction: per-button state, timers, cache wiring, orphan sweep
│   │   ├── next-meeting-base.ts  ← Decorator-free base: ALL "Next meeting" display logic
│   │   ├── next-meeting.ts       ← @action leaf: onKeyUp override only (delegates to base)
│   │   ├── time-left-base.ts     ← Decorator-free base: ALL "Time left" display logic
│   │   ├── time-left.ts          ← @action leaf: onKeyUp override only (delegates to base)
│   │   ├── combined-action-base.ts ← Decorator-free base: ALL combined display logic
│   │   └── combined-action.ts    ← @action leaf: onKeyUp override only (delegates to base)
│   ├── services/                 ← Business logic (no Stream Deck UI concerns)
│   │   ├── calendar-manager.ts   ← Multi-calendar registry: dedup by URL + ref-counting
│   │   ├── calendar-service.ts   ← Fetch + cache iCal feeds
│   │   ├── ical-parser.ts        ← Parse iCal (ical.js)
│   │   ├── recurrence-expander.ts ← RRULE/EXDATE/RECURRENCE-ID expansion (rrule)
│   │   ├── timezone-service.ts   ← Windows→IANA timezone mapping (windows-iana/luxon)
│   │   └── diagnostics-service.ts ← Debug-panel data
│   ├── utils/                    ← event-utils.ts, time-utils.ts, logger.ts, url-utils.ts
│   └── types/index.ts            ← All shared interfaces
├── pi/                           ← Property Inspector (browser, bundled to IIFE)
│   ├── pi.js / pi.html           ← Action PI
│   ├── setup.js / setup.html     ← Settings popup (named-calendar management)
│   └── css/                      ← SDPI styles
├── assets/                       ← Plugin icons/images (copied at build)
├── manifest.json                 ← Plugin/action metadata (UUIDs) — authoritative
├── tests/                        ← Vitest tests (+ tests/integration/, tests/helpers/)
├── __fixtures__/                 ← iCal fixtures by provider (google-calendar/, outlook/, apple/)
├── content/                      ← Elgato Marketplace listing content (+ CONTENT-GUIDE.md)
├── scripts/                      ← convert-content-assets.ts (SVG→PNG)
├── docs/                         ← Agent companion docs (this file, SENTINEL.md, …)
├── rollup.config.js              ← 3 bundles: plugin (CJS), pi (IIFE), setup (IIFE)
└── vitest.config.ts              ← Test + coverage config
```

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| SDK | @elgato/streamdeck v2 (Node.js) | Official SDK; SingletonAction model |
| iCal parsing | ical.js (Mozilla) | Robust RFC 5545 parsing incl. timezones |
| Recurrence | rrule | Expands RRULE/EXDATE within the time window |
| Timezones | luxon + windows-iana | Outlook emits Windows TZ names → map to IANA |
| Bundler | Rollup | 3 separate targets (plugin/PI/setup); build-time debug flag |
| Debug toggle | Build-time env replace | `STREAMDECK_DEBUG` baked in by `@rollup/plugin-replace` |
| Multi-calendar | URL-keyed cache + ref-counting | Same URL shared across buttons; auto-cleanup |

> Full decision records (with alternatives + consequences) live in [`DECISIONS.md`](../DECISIONS.md).

## Module Boundaries

- **actions/** depend on **services/** and **utils/** — never the reverse. Actions own the
  Stream Deck UI (images, titles, key events); they hold NO calendar-fetching logic.
- **services/** are business logic with no `@elgato/streamdeck` UI calls (beyond global-settings
  plumbing). Independently unit-testable with mocked `fetch`/`logger`.
- **types/index.ts** is the shared contract (`ActionSettings`, `NamedCalendar`,
  `GlobalSettings`, `CalendarEvent`, …) — imported by both layers.
- **pi/** is a separate browser bundle; it talks to the plugin only over the SDK WebSocket
  (`setGlobalSettings` / `setSettings`), never via imports.

## Data Flow

```
iCal URL ──fetch──▶ calendar-service ──▶ ical-parser ──▶ recurrence-expander
                         │ (URL-keyed cache)                    │
                         ▼                                       ▼
                  calendar-manager ◀── register(actionId,url) ── BaseAction
                         │                                       │ timer tick
                         └──── events for button ────────────────▶ render image/title
```

PI settings changes → `onDidReceiveSettings` / `onDidReceiveGlobalSettings` → re-register the
button's calendar in calendar-manager → the next timer tick re-renders.

A separate **orphan-timer sweep** (module-level in `base-action.ts`) runs on its own periodic
timer beside the per-button ticks: every pass reconciles the tracked button states against the
SDK's live `streamDeck.actions` store and reaps any button whose `onWillDisappear` was missed
(see below).

## Subsystems

The subsystems below were added during a multi-round quality campaign; each cross-references the
architecture decision record that captures its rationale in [`DECISIONS.md`](../DECISIONS.md).

### Decorator-free base-class pattern (ADR-008)

The Stream Deck SDK requires every action class to carry the TC39 stage-3 `@action({...})`
decorator, but Vitest's esbuild transform throws `SyntaxError: Invalid or unexpected token` when
it tries to parse that decorator — so a decorated file can never be imported into the test
runner. To keep the display logic testable, every action is split in two:

- **`*-base.ts`** (`combined-action-base.ts`, `next-meeting-base.ts`, `time-left-base.ts`) — plain,
  non-decorated classes extending `BaseAction`. **ALL** display/business logic lives here, and
  tests import these directly (`tests/action-display-wiring.test.ts`).
- **`*.ts` leaves** (`combined-action.ts`, …) — the `@action`-decorated classes the SDK
  registers. Each is a pure delegation shim carrying **only** the mandatory explicit `onKeyUp()`
  override (ADR-003) that calls `super.onKeyUp(ev)` — nothing else.

Because a leaf can never be imported into Vitest, logic that landed there would be permanently
unreachable by the suite. The guard `tests/action-leaf-structure.test.ts` reads each leaf file as
**text** and fails if its class body declares any method besides `onKeyUp`.

### Orphan-timer reconciliation sweep (ADR-011)

Each visible button owns a 1-second display timer (and a calendar refcount). Cleanup normally
happens in `onWillDisappear` → `cleanupButtonState(actionId)`. But on macOS wake-from-sleep the
Stream Deck app can re-emit `onWillAppear` with new context IDs **without** a matching
`onWillDisappear` for the old ones (#29), leaking timers that pin the CPU at ~100%.

A single global sweep in `base-action.ts` reconciles this. Key elements (all verified in
`base-action.ts`):

- `startOrphanSweep(intervalMs?)` / `stopOrphanSweep()` — manage the one module-level
  `setInterval`; idempotent start, teardown-safe stop.
- `reapOrphanedButtons()` → per-instance `reapOrphans()` — iterate every tracked button, look it
  up via `streamDeck.actions.getActionById`, and reap any the SDK no longer reports.
- `cleanupButtonState(actionId)` — the single **polymorphic** cleanup hook called by BOTH
  `onWillDisappear` and the reap path, so subclasses (e.g. marquee intervals) override once and
  their cleanup runs for reaped orphans too — no synthetic event, no unsafe cast.
- `sweepInFlight` + `sweepGeneration` — overlap guards. `sweepInFlight` skips a tick while a slow
  async pass is still running; `sweepGeneration` is bumped by `stopOrphanSweep()` so a pass that
  was in flight across a stop/restart can no longer clear the guard held by the restarted sweep.
- `ICAL_ORPHAN_SWEEP_MS` env override (default 60s) — validated as a plain decimal integer in
  `[1000, 2147483647]`; anything else warns and falls back to the default so a typo can't disable
  the sweep or hot-loop.

### Logging & diagnostics pipeline (ADR-009)

`src/utils/logger.ts` is the diagnostics-export surface: it keeps the last 500 log entries
(`debugLogs`) for the Property Inspector debug panel and sanitizes every message before storing
it. `buildMessage` joins the formatted arguments and runs `sanitizeLogMessage`, which:

- Applies the six-pass `STRIP_PASSES` array (ANSI CSI, OSC, ESC-Fe, C0, C1, `SPOOF_RE`) via
  `applyStrip` — a sequential (never combined) strip whose gap set records the **offsets** of
  every removed character (strip provenance), threaded forward so a stripped invisible still
  counts as a boundary downstream.
- `SPOOF_RE` strips invisible / spoofing characters — a Unicode-property class
  (`\p{Cf}` + `\p{Default_Ignorable_Code_Point}` + U+2028/U+2029) rather than a hand-enumerated
  range, closing the class by construction.
- Escapes raw CR/LF in untrusted (non-Error) arguments (`escapeNewlines`, CWE-117) so a
  feed-controlled string can't forge a new log record.
- Finally runs `redactHomePaths` — a single-pass O(n) character scanner that redacts home-dir
  usernames from paths (Windows `C:\Users\name`, macOS `/Users/name`, Linux `/home/name`,
  `/root`) to `<home>`, consuming the strip gaps as boundary evidence.

`summarizeDebugInfo` builds a compact one-line status/counts/size summary of the debug payload
(used by `plugin.ts` when sending debug info) so logging the payload doesn't nest the whole log
buffer back into itself on every request.

### Two-path calendar architecture + normalized-URL dedup (ADR-006, ADR-010)

Two calendar caches coexist:

- **Legacy global single cache** — `calendarCache` in `src/services/calendar-service.ts`, a single
  module-level cache used before per-button named calendars existed.
- **Multi-calendar registry** — `calendar-manager.ts`, which keys `CalendarInstance`s by calendar
  ID and reference-counts the actions using each.

`base-action.ts` prefers the manager: `getEventsForButton` / `getCacheStatusForButton` /
`getCacheVersionForButton` read from `calendarManager` when the button has a registered
`calendarId`, and **fall back to the global `calendarCache`** otherwise (backwards compatibility).

Dedup is by `generateCalendarId(url)`, which hashes the **normalized** URL
(`normalizeICalUrl`: `webcal://`/`webcals://` → `https://`, trimmed). So a button saved with a
`webcal://` spelling and another saved with the equivalent `https://` spelling collapse onto one
`CalendarInstance` and share a single fetch/cache cycle instead of double-polling the endpoint.

## Code Patterns

### SingletonAction state — per-button `Map`, never instance fields

A `SingletonAction` subclass is instantiated **once** and handles **every** button of that
type. Storing per-button data in instance fields corrupts state when a second button appears.
Key all per-button state by `action.id` in a `Map`.

```typescript
// ❌ BAD — one field shared across all buttons; the 2nd button clobbers the 1st
class TimeLeftAction extends SingletonAction<ActionSettings> {
  private interval?: NodeJS.Timeout;
  onWillAppear(ev) { this.interval = setInterval(() => this.update(ev.action), 1000); }
}

// ✅ GOOD — per-button state keyed by action.id (see src/actions/base-action.ts)
interface ButtonState { interval?: NodeJS.Timeout; /* … */ }

class TimeLeftAction extends BaseAction {
  private buttonStates = new Map<string, ButtonState>();

  startTimerForButton(actionId: string, action: any): void {
    const state = this.buttonStates.get(actionId) ?? {};
    state.interval = setInterval(() => this.update(actionId, action), 1000);
    this.buttonStates.set(actionId, state);
  }
}
```

### Key events must be explicitly overridden

The SDK does NOT dispatch key events through inherited methods. Every action that needs key
handling must override `onKeyUp()` itself (delegating to `super`):

```typescript
async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
  await super.onKeyUp(ev);   // inheritance alone does NOT wire this up
}
```

### Actions are registered before connect

```typescript
streamDeck.actions.registerAction(new NextMeetingAction());
streamDeck.actions.registerAction(new TimeLeftAction());
streamDeck.connect();   // MUST come AFTER all registrations
```

### Settings defaults (backwards compatibility)

`undefined` boolean settings must resolve to their documented default, e.g.
`excludeAllDay`: `undefined → true` (on by default); `flashOnMeetingStart`: must be
explicitly `true` to enable.

## Key Files

| File | Purpose |
|------|---------|
| `src/plugin.ts` | Entry point; registers actions and connects |
| `src/actions/base-action.ts` | Per-button state, timers, calendar wiring, orphan sweep — shared by all actions |
| `src/actions/*-base.ts` | Decorator-free base classes holding all display logic (ADR-008) |
| `src/services/calendar-manager.ts` | Multi-calendar registry (normalized-URL dedup, ref-counting) |
| `src/services/calendar-service.ts` | Legacy global single cache (`calendarCache`) + fetch |
| `src/utils/logger.ts` | Sanitizing logger + home-path redaction + diagnostics buffer |
| `src/utils/url-utils.ts` | `normalizeICalUrl` / `isSupportedICalUrl` (webcal handling) |
| `src/services/recurrence-expander.ts` | RRULE/EXDATE/RECURRENCE-ID expansion |
| `src/services/timezone-service.ts` | Windows→IANA timezone mapping |
| `src/types/index.ts` | Shared interfaces |
| `manifest.json` | Plugin/action metadata (UUIDs) |
| `rollup.config.js` | Build (3 bundles + build-time debug flag) |
