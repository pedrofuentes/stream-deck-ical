# Contributing to Stream Deck iCal Plugin

Thank you for your interest in contributing to the Stream Deck iCal Plugin! This document provides guidelines and information for developers.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Architecture](#project-architecture)
- [Building the Plugin](#building-the-plugin)
- [Testing](#testing)
- [Debugging with Stream Deck](#debugging-with-stream-deck)
- [Code Style and Conventions](#code-style-and-conventions)
- [Commit Messages](#commit-messages)
- [Provider-Specific Notes](#provider-specific-notes)

## Development Environment Setup

### Prerequisites

- **Node.js 20+** (required for Stream Deck Node.js runtime)
- **npm** (comes with Node.js)
- **Git**
- **Elgato Stream Deck Software 6.0+** (for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pedrofuentes/stream-deck-ical.git
cd stream-deck-ical
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

## Project Architecture

The plugin is built using:
- **TypeScript** for type safety and better developer experience
- **Rollup** for bundling the Node.js plugin and Property Inspector
- **Vitest** for fast, modern testing
- **@elgato/streamdeck** Node.js SDK v2 for Stream Deck integration

### Directory Structure

```
stream-deck-ical/
├── src/                      # TypeScript source code
│   ├── plugin.ts            # Main plugin entry point
│   ├── actions/             # Action implementations
│   │   ├── base-action.ts   # Base class for all actions
│   │   ├── next-meeting.ts  # NextMeeting action
│   │   └── time-left.ts     # TimeLeft action
│   ├── services/            # Business logic layer
│   │   ├── calendar-service.ts     # Calendar fetching & caching
│   │   ├── ical-parser.ts          # iCal parsing
│   │   ├── recurrence-expander.ts  # RRULE expansion
│   │   └── timezone-service.ts     # Timezone conversions
│   ├── utils/               # Utility functions
│   │   ├── time-utils.ts    # Time formatting
│   │   ├── event-utils.ts   # Event filtering/sorting
│   │   └── logger.ts        # Debug logging
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── pi/                      # Property Inspector (HTML/JS)
│   ├── pi.html             # Main PI interface
│   ├── pi.js               # PI logic
│   ├── setup.html          # Settings window
│   ├── setup.js            # Settings logic
│   └── css/                # Styles
├── assets/                  # Images and icons
├── __fixtures__/            # Test data (iCal files)
│   ├── google-calendar/
│   ├── outlook/
│   └── apple/
├── tests/                   # Test files
│   ├── *.test.ts           # Unit tests
│   └── integration/        # Integration tests
├── dist/                    # Build output (gitignored)
├── manifest.json            # Plugin metadata
├── tsconfig.json            # TypeScript configuration
├── rollup.config.js         # Build configuration
└── vitest.config.ts         # Test configuration
```

### Key Concepts

#### Actions

Actions are the buttons users place on their Stream Deck. Each action:
- Extends `BaseAction` class
- Uses `@action` decorator with UUID
- Implements `updateDisplay()` for live updates
- Handles user interactions (key press, double press)

#### Services

Services handle the business logic:
- **CalendarService**: Fetches and caches iCal feeds
- **ICalParser**: Parses iCal format with timezone support
- **RecurrenceExpander**: Expands recurring events using RRULE
- **TimezoneService**: Converts Windows timezones to IANA format

#### Property Inspector

The PI is a web-based UI (HTML/CSS/JS) that appears in Stream Deck software when configuring the plugin. It communicates with the plugin via WebSocket.

## Building the Plugin

### Development Build

```bash
npm run build
```

Creates a development build in `dist/` with source maps.

### Production Build

```bash
npm run build:production
```

Creates an optimized production build in `release/com.pedrofuentes.ical.sdPlugin/`.

### Watch Mode

```bash
npm run watch
```

Automatically rebuilds on file changes (useful during development).

### Clean Build

```bash
npm run clean
npm run build
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Writing Tests

Tests use Vitest and follow this structure:

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../src/utils/my-util';

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction(input)).toBe(expectedOutput);
  });
});
```

#### Test Fixtures

iCal test fixtures are in `__fixtures__/` organized by provider:
- `google-calendar/` - Google Calendar exports
- `outlook/` - Microsoft Outlook/Office 365 exports
- `apple/` - Apple Calendar/iCloud exports

When adding fixtures:
1. Use realistic, anonymized data
2. Include PRODID to test provider detection
3. Test edge cases (all-day events, recurring, timezones)

## Debugging with Stream Deck

### 1. Link Plugin for Development

After building, create a symlink to the Stream Deck plugins directory:

**macOS:**
```bash
ln -s "$(pwd)/dist" "$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins/com.pedrofuentes.ical.sdPlugin"
```

**Windows (PowerShell as Administrator):**
```powershell
New-Item -ItemType SymbolicLink -Path "$env:APPDATA\Elgato\StreamDeck\Plugins\com.pedrofuentes.ical.sdPlugin" -Target "$(pwd)\dist"
```

### 2. Restart Stream Deck Software

The plugin will now appear in the Stream Deck software.

### 3. View Logs

**Plugin Logs (Node.js):**
- The plugin uses `@elgato/streamdeck` logger
- Set `DEBUG=true` in environment or check Stream Deck logs

**Stream Deck Logs Location:**
- **macOS**: `~/Library/Logs/ElgatoStreamDeck/`
- **Windows**: `%APPDATA%\Elgato\StreamDeck\logs\`

### 4. Debug with Chrome DevTools

Property Inspector can be debugged:
1. Right-click on action in Stream Deck software
2. Select "Inspect Property Inspector"
3. Chrome DevTools opens for the PI

## Code Style and Conventions

### TypeScript

- Use strict mode (`strict: true` in tsconfig.json)
- Prefer `interface` over `type` for object shapes
- Use explicit return types for public functions
- Avoid `any` - use `unknown` if type is truly unknown

### Naming

- **Files**: kebab-case (`calendar-service.ts`)
- **Classes**: PascalCase (`CalendarService`)
- **Functions/Variables**: camelCase (`updateCalendar`)
- **Constants**: UPPER_SNAKE_CASE (`UPDATE_INTERVAL`)
- **Types/Interfaces**: PascalCase (`CalendarEvent`)

### Imports

Always use `.js` extension in imports (TypeScript transpiles .ts → .js):

```typescript
import { myFunction } from './my-file.js';  // ✅ Correct
import { myFunction } from './my-file';     // ❌ Wrong
```

### Error Handling

- Log errors with context using `logger.error()`
- Use specific error types when possible
- Handle errors gracefully - plugin should never crash

### Comments

- Use JSDoc for public APIs
- Inline comments for complex logic only
- Keep comments up-to-date with code

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test changes
- `refactor`: Code refactoring
- `chore`: Build/tooling changes

### Examples

```
feat(timezone): add Windows timezone conversion

Implement conversion of Windows timezone names (e.g., "Eastern Standard Time")
to IANA format using windows-iana library.

Closes #12
```

```
fix(parser): handle escaped characters in iCal text fields

Parse \n, \,, \; correctly according to RFC 5545.
```

## Provider-Specific Notes

### Google Calendar

- Uses IANA timezone names (e.g., `America/New_York`)
- PRODID: `-//Google Inc//Google Calendar//EN`
- May include `X-GOOGLE-CONFERENCE` for Meet links
- Includes `DTSTAMP`, `CREATED`, `LAST-MODIFIED` fields

### Microsoft Outlook / Office 365

- **Uses Windows timezone names** (e.g., `Eastern Standard Time`)
- **Often wraps TZID in quotes**: `TZID="Eastern Standard Time"`
- PRODID: `-//Microsoft Corporation//Outlook//EN`
- May include `X-MICROSOFT-CDO-*` properties
- Requires windows-iana conversion

### Apple Calendar

- Uses IANA timezone names
- PRODID: `-//Apple Inc.//Mac OS X//EN` or `-//Apple Inc.//iOS//EN`
- May include `X-APPLE-*` properties
- Clean iCal format, follows spec closely

### Common Edge Cases

1. **All-day events**: `VALUE=DATE` parameter, no time component
2. **Recurring events**: RRULE with various frequency types
3. **EXDATE**: Dates excluded from recurrence
4. **Folded lines**: Long lines split with leading whitespace
5. **Escaped text**: `\n`, `\,`, `\;` in SUMMARY/DESCRIPTION
6. **DST transitions**: Events during daylight saving time changes

## Questions or Issues?

- **Bug Reports**: [GitHub Issues](https://github.com/pedrofuentes/stream-deck-ical/issues)
- **Feature Requests**: [GitHub Issues](https://github.com/pedrofuentes/stream-deck-ical/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pedrofuentes/stream-deck-ical/discussions)

Thank you for contributing! 🎉
