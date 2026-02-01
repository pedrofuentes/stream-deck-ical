# Stream Deck iCal Plugin

![Plugin Example](https://github.com/pedrofuentes/stream-deck-ical/blob/main/assets/plugin.gif)

iCal Plugin for [elgato Stream Deck](https://www.elgato.com/en/gaming/stream-deck) that displays information from your calendar using an iCal URL. Visual cues and a countdown will help you end meetings on time and be ready for the next one.

This plugin is available on the Stream Deck store, you can also download [the last release](https://github.com/pedrofuentes/stream-deck-ical/releases) or build it yourself using the code on this repo.

## ✨ New in v2.3

- ✅ **Named Calendars**: Set up multiple calendars with friendly names in Settings (#5)
  - Create a library of calendars (Work, Personal, Family, etc.)
  - Each button can select which calendar to use from a dropdown
  - Calendars sharing the same URL share a single cache (efficient!)
- ✅ **Per-Button Settings**: Each button can have its own time window and all-day event preferences
- ✅ **Configurable Warning Thresholds**: Customize when orange/red warnings appear
  - Orange warning: Choose from 1, 2, 3, 5, 10, 15, or 30 minutes (default: 5 min)
  - Red warning: Choose from 10, 15, 30, 45, or 60 seconds (default: 30 sec)
- ✅ **Graceful Calendar Deletion**: Buttons using a deleted calendar automatically fall back to default
- ✅ **Improved Settings UI**: Redesigned Property Inspector with collapsible help sections

## ✨ New in v2.2

- ✅ **Smart Calendar Action**: New all-in-one action that automatically switches between modes (#10)
  - Shows "Time Left" when a meeting is active
  - Shows "Next Meeting" when no meeting is active
  - Supports all features from both actions (marquee titles, concurrent meetings, flash alerts)

## ✨ New in v2.1

- ✅ **Configurable Title Display**: Choose how long meeting titles show (5, 10, 15, or 30 seconds)
- ✅ **Meeting Start Flash**: Optional visual alert when meetings begin
- ✅ **Improved Startup**: Faster button initialization with better status messages
- ✅ **Better UX**: Shows "Please Setup" for unconfigured plugins

## ✨ New in v2.0

- ✅ **Recurring Events Support**: Daily, weekly, monthly recurring events with RRULE
- ✅ **Configurable Time Window**: Choose 1, 3, 5, or 7 days of events
- ✅ **Improved Timezone Handling**: Automatic Windows → IANA timezone conversion
- ✅ **Node.js SDK v2**: Modern architecture with better performance
- ✅ **Provider Compatibility**: Optimized for Google Calendar, Microsoft Outlook/Office 365, and Apple Calendar

## Features ##
* ✅ **Named calendars** - Set up multiple calendars with friendly names, assign to buttons via dropdown
* ✅ **Per-button settings** - Each button can use different calendar, time window, and all-day preferences
* ✅ **Configurable warning thresholds** - Customize orange/red warning times
* ✅ **Recurring events** with RRULE expansion and EXDATE handling
* ✅ **Configurable time window** (1, 3, 5, or 7 days)
* ✅ **Exclude all-day events** option (enabled by default)
* ✅ Checks for updates every 10 minutes
* ✅ When a new URL is saved, an immediate update is triggered
* ✅ **Force Refresh** - Two ways to manually refresh:
  * **Double-press** any action button on the Stream Deck
  * **"Force 🔄" button** in the Settings window
* ✅ **Improved timezone support** for international calendars

### Time Left ###
* Shows time left until the meeting ends
* Changes icon color to orange when time remaining reaches the orange threshold (default: 5 minutes)
* Changes icon color to red when time remaining reaches the red threshold (default: 30 seconds)
* When the meeting ends the counter will keep going and stay red for 5 minutes, if the user pushes the button it will show the next meeting if one is available
* Supports multiple concurrent meetings, to switch between meeting just push the button
* Shows meeting indicator (e.g., "1/3") when multiple meetings are active

### Smart Calendar (NEW in v2.2) ###
* **All-in-one action** that intelligently combines Time Left and Next Meeting
* **Auto-switches modes** based on your current meeting status:
  * When a meeting is active → Shows Time Left countdown
  * When no meeting is active → Shows countdown to Next Meeting
* Includes all features from both actions:
  * Scrolling marquee for meeting titles (tap to show/hide)
  * Concurrent meeting support (tap to cycle through active meetings)
  * Flash alert when meetings start
  * Configurable warning thresholds (orange/red)
* **Perfect for limited Stream Deck space** - one button does it all!

### Next Meeting ###
* Shows time left until next meeting starts
* If the button is pushed it will show the title of the next meeting (scrolling marquee)
  * **Configurable duration**: Choose 5, 10, 15, or 30 seconds for title display
  * If the button is pushed while the text is showing it will go back to show the time left until the next meeting
  * At the end of the title animation, the button will go back to show the time left until the next meeting
* **Optional flash alert** when meetings are about to start (disabled by default)
* Changes icon color to orange when time remaining reaches the orange threshold (default: 5 minutes)
* Changes icon color to red when time remaining reaches the red threshold (default: 30 seconds)

## Calendar Provider Support

This plugin works with iCal feeds from:

### ✅ Google Calendar
- Uses IANA timezone names (e.g., `America/New_York`)
- Full support for recurring events
- Compatible with Google Workspace calendars

### ✅ Microsoft Outlook / Office 365
- **Automatic timezone conversion** from Windows timezone names (e.g., "Eastern Standard Time") to IANA format
- Handles quoted timezone identifiers
- Compatible with both Outlook.com and Office 365 calendars

### ✅ Apple Calendar / iCloud
- Native IANA timezone support
- Compatible with iCloud calendar sharing
- Supports CalDAV sync

### ✅ Any iCal-Compatible Service
- Any service that provides an iCal (.ics) URL will work
- Supports standard iCal RFC 5545 format

## Installation

### From Stream Deck Store (Recommended)
1. Open Stream Deck software
2. Search for "iCal" in the store
3. Click Install

### From Release
1. Download the latest `.streamDeckPlugin` file from [Releases](https://github.com/pedrofuentes/stream-deck-ical/releases)
2. Double-click the file to install

### Build from Source
See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup instructions.

## Getting Your iCal URL

### Google Calendar
1. Open [Google Calendar](https://calendar.google.com)
2. Click the three dots next to your calendar → Settings
3. Scroll to "Integrate calendar"
4. Copy the "Secret address in iCal format" URL

### Microsoft Outlook / Office 365
1. Open [Outlook Calendar](https://outlook.office.com/calendar)
2. Click Settings (gear icon) → View all Outlook settings
3. Go to Calendar → Shared calendars
4. Click "Publish a calendar" → Select your calendar
5. Choose permissions and copy the ICS link

### Apple Calendar / iCloud
1. Open Calendar on Mac
2. Right-click the calendar → Share Calendar
3. Make it public and copy the webcal:// URL
4. Change `webcal://` to `https://` when pasting into the plugin

## Configuration

### Global Settings (Settings Popup)
1. Drag an action to your Stream Deck
2. Click the action to open Property Inspector
3. Click "Settings" button
4. **Manage Calendars**: Add named calendars with friendly labels
   - Click "Add Calendar" to create a new entry
   - Give it a name (e.g., "Work", "Personal")
   - Paste your iCal URL
   - Set time window and all-day event preferences per calendar
   - Click ★ to set as default calendar
5. **Warning Thresholds**: Customize when color warnings appear
   - Orange warning: 1-30 minutes (default: 5 min)
   - Red warning: 10-60 seconds (default: 30 sec)
6. **Other Options**:
   - Title display duration (5, 10, 15, or 30 seconds)
   - Flash on meeting start (optional visual alert)
7. Click "Save Settings"

### Per-Button Settings (Property Inspector)
Each button can override the default calendar:
1. Select the button on your Stream Deck
2. In Property Inspector, use the "Calendar" dropdown to select which calendar this button should use
3. The default calendar is indicated with "(Default)" in the dropdown

## Troubleshooting

### No events showing
- Verify your iCal URL is correct and accessible
- Check that you have events within the selected time window
- Try the "Force Refresh" button
- Check Stream Deck logs for errors

### Wrong timezone
- The plugin now automatically handles timezone conversions
- If times are still incorrect, verify your computer's timezone is set correctly
- For Outlook: The plugin automatically converts Windows timezones

### Recurring events not showing
- Ensure you're running v2.0 or later
- Verify the recurring events fall within your configured time window
- Check that RRULE is present in your calendar export

## Development & Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development environment setup
- Project architecture overview
- Building and testing
- Coding conventions
- Provider-specific implementation notes

## Technical Details

### Built With
- **TypeScript** - Type-safe JavaScript
- **Node.js SDK v2** - @elgato/streamdeck
- **Rollup** - Modern JavaScript bundler
- **Vitest** - Fast unit testing
- **RRule** - Recurring event expansion
- **Luxon** - Timezone-aware dates
- **windows-iana** - Windows ↔ IANA timezone conversion

### Architecture
- **Node.js Runtime**: Plugin runs in Node.js 20 environment
- **Property Inspector**: HTML/CSS/JavaScript UI
- **Service Layer**: Modular calendar fetching, parsing, and caching
- **Type Safety**: Full TypeScript coverage with strict mode

## Changelog

### v2.3.0 (2026)
- ✨ **Named Calendars**: Set up multiple calendars with friendly names in Settings (#5)
- ✨ **Per-Button Calendar Selection**: Each button selects calendar from dropdown
- ✨ **Configurable Warning Thresholds**: Customize orange (1-30 min) and red (10-60 sec) warnings
- ✨ **Graceful Calendar Deletion**: Buttons auto-migrate to default when calendar is deleted
- ✨ **Improved Settings UI**: Redesigned Property Inspector with collapsible help
- ✨ Per-button time window and all-day event settings
- ✨ URL-level caching: buttons sharing same URL share a single cache
- 🐛 Fixed button state preservation with SingletonAction pattern
- 🐛 Fixed calendar selection not persisting after Stream Deck restart
- ✅ Added CalendarManager service with 31 tests
- ✅ Added 104 new regression tests (529 total)

### v2.2.0 (2026)
- ✨ **Smart Calendar Action**: New combined action that auto-switches between Time Left and Next Meeting (#10)
- ✅ Added 22 tests for combined action behavior

### v2.1.0 (2026)
- ✨ **Configurable Title Display Duration**: Choose 5, 10, 15, or 30 seconds (#20)
- ✨ **Flash on Meeting Start**: Optional visual alert when meetings begin (#11)
- 🐛 Fixed title display duration bug (was showing for minutes instead of seconds)
- 🐛 Fixed startup race condition causing buttons to get stuck on "Loading"
- 🐛 Improved status messages: Shows "Please Setup" for unconfigured plugins
- ✅ Added 18 new regression tests for v2.1.0 features

### v2.0.0 (2026)
- ✨ **Major Update**: Migrated to Node.js SDK v2
- ✨ Added recurring events support (RRULE, EXDATE)
- ✨ Added configurable time window (1/3/5/7 days)
- ✨ **Exclude All-Day Events**: Option to filter out all-day events (default: on)
- ✨ Improved timezone handling with windows-iana
- ✨ Enhanced error states and messaging
- ✨ **Force Refresh**: Double-press button or use Settings button
- 🐛 Fixed timezone offset issues (#1, #12)
- 🐛 Fixed recurring events not showing (#2)
- 🐛 Fixed force refresh not fetching new data
- ✅ Closes #9: Ability to increase number of days

### v1.1.0
- Initial public release
- Basic iCal support
- Next Meeting and Time Left actions

## License

MIT License - see [LICENSE](LICENSE) for details

## Credits

Created and maintained by [Pedro Fuentes](https://github.com/pedrofuentes)

## Support

- **Issues**: [GitHub Issues](https://github.com/pedrofuentes/stream-deck-ical/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pedrofuentes/stream-deck-ical/discussions)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
