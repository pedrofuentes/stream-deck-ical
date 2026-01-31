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

### Property Inspector Communication

PI uses WebSocket, not direct imports. Settings flow:
1. PI calls `setGlobalSettings` via WebSocket
2. Plugin receives via `onDidReceiveGlobalSettings`
3. Plugin processes and updates cache

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
// undefined = true (default), false = false, true = true
const setting = value === undefined ? true : Boolean(value);
```

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Key press not detected | Missing `onKeyUp` override | Add explicit override in action class |
| All-day recurring events showing | `isAllDay` not preserved | Pass through `expandRecurringEvent` and `processRecurringEvents` |
| Checkbox not visible | Wrong SDPI HTML structure | Use `type="checkbox"` on parent div, label with span |
| Debug panel always showing | `display: block` hardcoded | Set `display: none`, show only when `isDebugMode` |
| Outlook times wrong | Windows timezone not mapped | Check `timezone-service.ts` mapping |

## File Locations

- **Actions**: `src/actions/` - Extend `BaseAction`
- **Services**: `src/services/` - Business logic
- **Types**: `src/types/index.ts` - All interfaces
- **PI HTML**: `pi/setup.html` - Settings popup
- **PI JS**: `pi/setup.js` - Settings logic (not TypeScript)
- **Tests**: `tests/` - Vitest test files

## Release Process

### Creating a Release Package

**CRITICAL**: Always use the Stream Deck CLI to create packages. Manual zipping will create invalid packages.

```powershell
# 1. Build for production (outputs to release/ folder)
npm run build:production

# 2. Create package using Stream Deck CLI
streamdeck pack "release/com.pedrofuentes.ical.sdPlugin" --output release

# 3. Creates: release/com.pedrofuentes.ical.streamDeckPlugin
```

### Creating a GitHub Release

```powershell
# 1. Create annotated tag
git tag -a vX.Y.Z -m "vX.Y.Z - Description"
git push origin vX.Y.Z

# 2. Create release with plugin package
gh release create vX.Y.Z "release/com.pedrofuentes.ical.streamDeckPlugin" `
  --title "vX.Y.Z - Title" `
  --notes "Release notes"
```

### Testing Before Release

```powershell
# Remove dev plugin and test the package
Stop-Process -Name "StreamDeck" -Force
Remove-Item "$env:APPDATA\Elgato\StreamDeck\Plugins\com.pedrofuentes.ical.sdPlugin" -Recurse -Force
Start-Process "$env:ProgramFiles\Elgato\StreamDeck\StreamDeck.exe"
# Then double-click the .streamDeckPlugin file to install
```

### Version Numbers

- `manifest.json`: 4-part version `"Version": "X.Y.Z.0"`
- `package.json`: 3-part version `"version": "X.Y.Z"`
