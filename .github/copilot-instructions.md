# Copilot Instructions for Stream Deck iCal Plugin

This file contains context and patterns specific to this project to help AI assistants provide better assistance.

## Project Overview

Stream Deck plugin displaying iCal calendar events. Built with:
- **@elgato/streamdeck** Node.js SDK v1.4.1
- **TypeScript** with strict mode
- **Rollup** for bundling
- **Vitest** for testing
- **ical.js** (Mozilla) for parsing
- **rrule** for recurring event expansion
- **luxon** for timezone handling

## Critical SDK Patterns

### Action Key Events Must Be Explicit

The Stream Deck SDK does NOT route key events through inherited methods. Each action class must explicitly override `onKeyUp()`:

```typescript
// REQUIRED in each action class - inheritance alone doesn't work!
async onKeyUp(ev: KeyUpEvent<any>): Promise<void> {
  await super.onKeyUp(ev);
}
```

### Action Registration Order

Actions MUST be registered before `streamDeck.connect()`:

```typescript
streamDeck.actions.registerAction(new NextMeetingAction());
streamDeck.actions.registerAction(new TimeLeftAction());
streamDeck.connect(); // Must come AFTER registration
```

### SingletonAction Pattern (CRITICAL)

**SingletonAction means ONE instance handles ALL buttons of that action type.**

This is critical for state management:
- Instance variables (`this.interval`, `this.actionRef`) would be shared/overwritten
- Solution: Use `buttonStates: Map<string, ButtonState>` to track per-button state
- Each method receives `actionId` to operate on the correct button's state
- Subclasses maintain their own per-button state Maps for action-specific data

```typescript
// WRONG - shared state breaks with multiple buttons
class MyAction extends SingletonAction {
  private interval?: NodeJS.Timeout; // Overwrites when 2nd button appears!
}

// CORRECT - per-button state
class MyAction extends SingletonAction {
  private buttonStates: Map<string, ButtonState> = new Map();
  
  startTimerForButton(actionId: string, action: any) {
    const state = this.buttonStates.get(actionId);
    state.interval = setInterval(...);
  }
}
```

### Property Inspector Communication

PI uses WebSocket, not direct imports. Settings flow:
1. PI calls `setGlobalSettings` via WebSocket for global settings
2. PI calls `setSettings` via WebSocket for per-action settings
3. Plugin receives via `onDidReceiveGlobalSettings` and `onDidReceiveSettings`
4. Plugin processes and updates cache

### Per-Action Settings (v2.3.0)

Each button can select a calendar via `ActionSettings`:

```typescript
interface ActionSettings {
  calendarId?: string;          // ID of named calendar to use (new in v2.3)
  // Legacy fields (kept for backwards compatibility)
  useCustomCalendar?: boolean;
  customUrl?: string;
  customLabel?: string;
  customTimeWindow?: 1 | 3 | 5 | 7;
  customExcludeAllDay?: boolean;
}
```

**Named Calendars** in GlobalSettings:
```typescript
interface NamedCalendar {
  id: string;           // Unique ID (e.g., "cal_abc123")
  name: string;         // User-friendly name (e.g., "Work")
  url: string;          // iCal URL
  timeWindow?: number;  // Optional override (1, 3, 5, or 7 days)
  excludeAllDay?: boolean;
}

interface GlobalSettings {
  calendars?: NamedCalendar[];
  defaultCalendarId?: string;
  orangeThreshold?: number;   // Seconds for orange warning (default: 300 = 5 min)
  redThreshold?: number;      // Seconds for red warning (default: 30)
  // ... other settings
}
```

**CalendarManager** handles multi-calendar support:
- Calendars are deduplicated by URL (same URL = shared cache)
- Reference counting for automatic cleanup
- Each action registers via `calendarManager.registerAction(actionId, url, ...)`

**BaseAction** provides:
- `buttonStates: Map<string, ButtonState>` - Per-button state storage
- `buttonSettings: Map<string, ActionSettings>` - Per-button settings for migration
- `getEventsForButton(actionId)` - Returns events from the button's registered calendar
- `getCacheStatusForButton(actionId)` - Returns status of the button's calendar
- `startTimerForButton(actionId, action)` - Starts update timer for a specific button
- `stopTimerForButton(actionId)` - Stops timer for a specific button
- `setImage(actionId, action, imageName)` - Sets image for a specific button
- `onDidReceiveSettings()` - Handles settings changes, re-registers calendar
- `migrateButtonsWithDeletedCalendar(validIds)` - Migrates buttons when calendar deleted
- `getRedZone()` / `getOrangeZone()` - Get configurable warning thresholds

## Build System

### Debug Mode Toggle

Debug mode is determined at **build time**, not runtime:

```powershell
# Debug ON - verbose logging, debug panel visible
$env:STREAMDECK_DEBUG = "1"
npm run build

# Debug OFF - minimal logging, debug panel hidden  
$env:STREAMDECK_DEBUG = "0"
npm run build
```

The `rollup.config.js` replaces `process.env.STREAMDECK_DEBUG` at build time.

### Output Directories

- Development: `dist/com.pedrofuentes.ical.sdPlugin/`
- Production: `release/com.pedrofuentes.ical.sdPlugin/`

## Calendar Provider Compatibility

### All-Day Event Detection

All providers use `VALUE=DATE` (no time component) for all-day events. Detected via `icalTime.isDate === true` in ical.js.

### Outlook/Office 365 Quirks

- Uses Windows timezone names (e.g., "Eastern Standard Time")
- `timezone-service.ts` maps to IANA names
- May include `X-MICROSOFT-CDO-ALLDAYEVENT:TRUE`

### Google Calendar

- Standard IANA timezones
- PRODID contains "Google"
- RRULEs are well-formed

### Apple Calendar

- Standard IANA timezones  
- PRODID contains "Apple"
- Multi-day all-day events: DTEND = DTSTART + N days

## Recurring Events

### RRULE Handling

1. `ical-parser.ts` extracts RRULE string from `vevent.getFirstPropertyValue('rrule')`
2. `recurrence-expander.ts` uses `rrule` library to expand within time window
3. **Critical**: `isAllDay` flag must be preserved through expansion

### EXDATE Handling

Excluded dates are parsed and passed to RRuleSet to skip specific occurrences.

## Testing Patterns

### Testing Requirements (MANDATORY)

**Every code change MUST include corresponding tests:**

1. **New features** - Add unit tests covering happy path and edge cases
2. **Bug fixes** - Add regression tests that would have caught the bug
3. **Refactoring** - Ensure existing tests still pass, add tests for any new behavior

**Before completing any task:**
- Run `npm test` to verify all tests pass
- Check test coverage for changed files
- Add tests if coverage is insufficient

**For agents:** Always verify tests are added/updated before marking a task complete.

### Test Fixtures

Located in `__fixtures__/` organized by provider:
- `google-calendar/`
- `outlook/`
- `apple/`

### Mocking

Calendar service tests mock:
- `fetch` for network requests
- `logger` to suppress output

```typescript
vi.mock('../src/utils/logger', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  isDebugMode: vi.fn(() => true)
}));
```

## Property Inspector (PI)

### SDPI Checkbox Structure

Checkboxes require specific HTML structure for SDPI styling:

```html
<div class="sdpi-item" type="checkbox">
  <div class="sdpi-item-label">Label</div>
  <div class="sdpi-item-value">
    <input type="checkbox" id="myCheckbox" checked>
    <label for="myCheckbox"><span></span>Description</label>
  </div>
</div>
```

### Settings Default Values

When checking boolean settings, handle `undefined` for backwards compatibility:

```typescript
// excludeAllDay: undefined = true (default on), false = false, true = true
const excludeAllDay = value === undefined ? true : Boolean(value);

// flashOnMeetingStart: undefined = false (default off), must explicitly be true
const flashEnabled = settings.flashOnMeetingStart === true;
```

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Key press not detected | Missing `onKeyUp` override | Add explicit override in action class |
| All-day recurring events showing | `isAllDay` not preserved | Pass through `expandRecurringEvent` and `processRecurringEvents` |
| Checkbox not visible | Wrong SDPI HTML structure | Use `type="checkbox"` on parent div, label with span |
| Debug panel always showing | `display: block` hardcoded | Set `display: none`, show only when `isDebugMode` |
| Outlook times wrong | Windows timezone not mapped | Check `timezone-service.ts` mapping |
| Buttons stuck on "Loading" | Startup race condition | `waitForCacheAndStart` uses 500ms polling with `actionRef` fallback |
| Title shows for too long | Duration multiplied twice | `getTitleDisplayDuration()` returns seconds, caller multiplies by 1000 |
| Calendar not loading | Named calendars not set up | Ensure at least one calendar is configured in Settings |
| Button using deleted calendar | Calendar was removed | Buttons auto-migrate to default via `migrateDeletedCalendars()` |
| Settings not persisting | Using wrong settings event | Global = `setGlobalSettings`, Per-action = `setSettings` |

## File Locations

- **Actions**: `src/actions/` - Extend `BaseAction`
- **Services**: `src/services/` - Business logic (`calendar-manager.ts` for multi-calendar)
- **Types**: `src/types/index.ts` - All interfaces (`ActionSettings`, `NamedCalendar`, `CalendarInstance`)
- **PI HTML**: `pi/setup.html` - Settings popup (Named Calendars management)
- **PI JS**: `pi/setup.js` - Settings logic (not TypeScript)
- **Tests**: `tests/` - Vitest test files

## Release Process

### Complete Release Workflow

Follow these steps in order for a complete release:

#### 1. Pre-Release Checklist

```powershell
# Ensure all tests pass
npm test

# Ensure you're on the feature branch with all changes committed
git status
git log --oneline -5
```

#### 2. Verify Documentation Is Updated

**CRITICAL**: Before any release, verify and update documentation:

**README.md** must include:
- [ ] "New in vX.Y" section at the top (if major features)
- [ ] Feature documentation in the Features section
- [ ] Changelog entry with issue numbers

**Documentation checklist:**
1. Check if new features are documented in README.md
2. Check if Changelog has the new version entry
3. Add/update any new action types in Features section
4. Update any changed behavior or settings
5. Commit documentation changes before merging to main

```powershell
# Review README for completeness
git diff HEAD -- README.md

# If documentation needs updates, commit them first
git add README.md
git commit -m "docs: update README for vX.Y.Z"
```

#### 3. Update Version Numbers

Update version in both files (must match):
- `manifest.json`: 4-part version `"Version": "X.Y.Z.0"`
- `package.json`: 3-part version `"version": "X.Y.Z"`

#### 4. Merge Feature Branch to Main

```powershell
# Switch to main and pull latest
git checkout main
git pull origin main

# Merge feature branch (use --no-ff to preserve history)
# Include issue references to auto-close them
git merge --no-ff feature/vX.Y.Z-branch-name -m "Merge feature/vX.Y.Z-branch-name: Brief description

Closes #XX, Closes #YY"

# Push to main
git push origin main
```

#### 5. Create Release Package

**CRITICAL**: Always use the Stream Deck CLI to create packages. Manual zipping will create invalid packages.

```powershell
# Build for production (outputs to release/ folder)
npm run build:production

# Create package using Stream Deck CLI
streamdeck pack "release/com.pedrofuentes.ical.sdPlugin" --output release

# Verify package was created
Get-Item "release/com.pedrofuentes.ical.streamDeckPlugin"
```

#### 6. Test the Package (Optional but Recommended)

```powershell
# Remove dev plugin and test the package
Stop-Process -Name "StreamDeck" -Force
Remove-Item "$env:APPDATA\Elgato\StreamDeck\Plugins\com.pedrofuentes.ical.sdPlugin" -Recurse -Force
Start-Process "$env:ProgramFiles\Elgato\StreamDeck\StreamDeck.exe"
# Then double-click the .streamDeckPlugin file to install and verify it works
```

#### 7. Create Git Tag

```powershell
# Create annotated tag on main branch
git tag -a vX.Y.Z -m "vX.Y.Z - Brief description of release"

# Push tag to remote
git push origin vX.Y.Z
```

#### 8. Create GitHub Release

**IMPORTANT**: Use GitHub keywords to automatically close related issues. Include `Closes #X`, `Fixes #X`, or `Resolves #X` in the release notes for each issue addressed.

```powershell
# Create release with plugin package attached
gh release create vX.Y.Z "release/com.pedrofuentes.ical.streamDeckPlugin" `
  --title "vX.Y.Z - Release Title" `
  --notes "## What's New

- ✨ Feature 1 (Closes #XX)
- ✨ Feature 2 (Closes #YY)
- 🐛 Bug fix 1 (Fixes #ZZ)

## Installation

Download the \`.streamDeckPlugin\` file and double-click to install."
```

Or create manually on GitHub:
1. Go to https://github.com/pedrofuentes/stream-deck-ical/releases/new
2. Choose the tag `vX.Y.Z`
3. Set release title
4. Add release notes with `Closes #X` or `Fixes #X` for each issue
5. Attach `release/com.pedrofuentes.ical.streamDeckPlugin`
6. Publish release

### Automatic Issue Closing

GitHub automatically closes issues when these keywords are used in:
- **Commit messages** merged to main: `git commit -m "feat: add feature X (Closes #123)"`
- **PR descriptions**: Include `Closes #123` in the PR body
- **Release notes**: Issues are closed when the release is published

**Keywords** (case-insensitive):
- `Closes #X` / `Close #X`
- `Fixes #X` / `Fix #X`  
- `Resolves #X` / `Resolve #X`

**Multiple issues**: `Closes #11, Closes #20` or `Fixes #11, #20`

#### 9. Post-Release Cleanup

```powershell
# Delete merged feature branch (optional)
git branch -d feature/vX.Y.Z-branch-name
git push origin --delete feature/vX.Y.Z-branch-name

# Re-link development plugin if needed
streamdeck link "dist/com.pedrofuentes.ical.sdPlugin"
```

### Quick Reference Commands

```powershell
# Full release sequence (after testing is complete)
git checkout main
git pull origin main
git merge --no-ff feature/vX.Y.Z-name -m "Merge feature/vX.Y.Z-name"
git push origin main
npm run build:production
streamdeck pack "release/com.pedrofuentes.ical.sdPlugin" --output release
git tag -a vX.Y.Z -m "vX.Y.Z - Description"
git push origin vX.Y.Z
gh release create vX.Y.Z "release/com.pedrofuentes.ical.streamDeckPlugin" --title "vX.Y.Z" --notes "Release notes"
```
