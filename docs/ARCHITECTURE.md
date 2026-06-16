# Architecture

> Extended architectural context for AI agents. Referenced from AGENTS.md.

---

## Project Structure

```
stream-deck-ical/
├── src/                          ← Plugin runtime (Node.js, bundled to CJS)
│   ├── plugin.ts                 ← Entry: registers actions, then streamDeck.connect()
│   ├── actions/                  ← One SingletonAction subclass per button type
│   │   ├── base-action.ts        ← BaseAction: per-button state, timers, cache wiring
│   │   ├── next-meeting.ts       ← "Next meeting" button
│   │   ├── time-left.ts          ← "Time left" countdown button
│   │   └── combined-action.ts    ← Combined display button
│   ├── services/                 ← Business logic (no Stream Deck UI concerns)
│   │   ├── calendar-manager.ts   ← Multi-calendar registry: dedup by URL + ref-counting
│   │   ├── calendar-service.ts   ← Fetch + cache iCal feeds
│   │   ├── ical-parser.ts        ← Parse iCal (ical.js)
│   │   ├── recurrence-expander.ts ← RRULE/EXDATE/RECURRENCE-ID expansion (rrule)
│   │   ├── timezone-service.ts   ← Windows→IANA timezone mapping (windows-iana/luxon)
│   │   └── diagnostics-service.ts ← Debug-panel data
│   ├── utils/                    ← event-utils.ts, time-utils.ts, logger.ts
│   └── types/index.ts            ← All shared interfaces
├── pi/                           ← Property Inspector (browser, bundled to IIFE)
│   ├── pi.js / pi.html           ← Action PI
│   ├── setup.js / setup.html     ← Settings popup (named-calendar management)
│   └── css/                      ← SDPI styles
├── assets/                       ← Plugin icons/images (copied at build)
├── manifest.json                 ← Plugin/action metadata (UUIDs) — authoritative
├── tests/                        ← Vitest tests (+ tests/integration/)
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
| `src/actions/base-action.ts` | Per-button state, timers, calendar wiring shared by all actions |
| `src/services/calendar-manager.ts` | Multi-calendar registry (URL dedup, ref-counting) |
| `src/services/recurrence-expander.ts` | RRULE/EXDATE/RECURRENCE-ID expansion |
| `src/services/timezone-service.ts` | Windows→IANA timezone mapping |
| `src/types/index.ts` | Shared interfaces |
| `manifest.json` | Plugin/action metadata (UUIDs) |
| `rollup.config.js` | Build (3 bundles + build-time debug flag) |
