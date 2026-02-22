# Stream Deck iCal Plugin

[![Version](https://img.shields.io/badge/version-2.3.0-blue.svg)](https://github.com/pedrofuentes/stream-deck-ical/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-529%20passing-brightgreen.svg)](#)

Display your calendar events on [Elgato Stream Deck](https://www.elgato.com/stream-deck). Visual countdowns and color warnings help you stay on schedule.

![Plugin Example](https://github.com/pedrofuentes/stream-deck-ical/blob/main/assets/plugin.gif)

**[Download from Stream Deck Store](https://marketplace.elgato.com)** · **[Latest Release](https://github.com/pedrofuentes/stream-deck-ical/releases/latest)** · **[Report Bug](https://github.com/pedrofuentes/stream-deck-ical/issues)**

---

## Quick Start

1. **Install** the plugin from Stream Deck Store (search "iCal")
2. **Get your calendar URL** ([Google](#google-calendar) | [Outlook](#microsoft-outlook--office-365) | [Apple](#apple-calendar--icloud))
3. **Add a button** - Drag "Smart Calendar" to your Stream Deck
4. **Configure** - Click Settings → Add Calendar → Paste URL → Save

That's it! Your next meeting countdown appears on the button.

---

## Actions

| Action | Best For | Description |
|--------|----------|-------------|
| **Smart Calendar** ⭐ | Most users | Auto-switches between countdown modes. Shows "Time Left" during meetings, "Next Meeting" otherwise. |
| **Next Meeting** | Anticipating upcoming | Always shows countdown to next meeting. Tap for meeting title. |
| **Time Left** | During meetings | Shows time remaining in current meeting. Supports concurrent meetings. |

> 💡 **Recommendation**: Start with **Smart Calendar** - it combines both modes intelligently.

---

## Features

### 📅 Multiple Calendars
Set up named calendars (Work, Personal, Family) and assign different calendars to different buttons.

### ⏰ Visual Warnings
- **Orange** when meeting is approaching (default: 5 min, configurable)
- **Red** when meeting is imminent (default: 30 sec, configurable)

### 🔄 Recurring Events
Full support for daily, weekly, monthly patterns (RRULE) with exceptions (EXDATE).

### 🌍 Timezone Smart
Automatic conversion between Windows and IANA timezones. Works globally.

### ⚡ Quick Actions
- **Tap** to show meeting title (scrolling marquee)
- **Double-tap** to force refresh calendar
- **Tap during meeting** to cycle through concurrent meetings

---

## Supported Calendars

| Provider | Status | Notes |
|----------|--------|-------|
| Google Calendar | ✅ Full support | Including Workspace |
| Microsoft Outlook | ✅ Full support | Outlook.com & Office 365 |
| Apple Calendar | ✅ Full support | iCloud sharing |
| Any iCal URL | ✅ Works | RFC 5545 compatible |

---

## Getting Your Calendar URL

<details>
<summary><strong>Google Calendar</strong></summary>

1. Open [Google Calendar](https://calendar.google.com)
2. Click ⋮ next to your calendar → **Settings and sharing**
3. Scroll to "Integrate calendar"
4. Copy **"Secret address in iCal format"**

> ⚠️ Use the "Secret address" - the public address won't show private events.

</details>

<details>
<summary><strong>Microsoft Outlook / Office 365</strong></summary>

1. Open [Outlook Calendar](https://outlook.office.com/calendar)
2. Click ⚙️ Settings → **View all Outlook settings**
3. Go to **Calendar → Shared calendars**
4. Under "Publish a calendar", select your calendar
5. Click **Publish** and copy the **ICS link**

</details>

<details>
<summary><strong>Apple Calendar / iCloud</strong></summary>

1. Open Calendar app on Mac
2. Right-click calendar → **Share Calendar**
3. Check "Public Calendar" and copy the URL
4. Replace `webcal://` with `https://` when pasting

</details>

---

## Configuration

### Settings Overview

Click **Settings** in the Property Inspector to access:

| Setting | Description | Default |
|---------|-------------|---------|
| **Calendars** | Add/remove named calendars | - |
| **Default Calendar** | Used when button has no selection | First added |
| **Orange Warning** | Minutes before meeting | 5 min |
| **Red Warning** | Seconds before meeting | 30 sec |
| **Title Duration** | How long to show meeting title | 15 sec |
| **Flash on Start** | Visual alert when meeting begins | Off |

### Per-Button Options

Each button can use a different calendar from your library - just select it from the dropdown in the Property Inspector.

---

## Troubleshooting

<details>
<summary><strong>No events showing</strong></summary>

1. Verify URL is correct (test in browser - should download .ics file)
2. Check events are within time window (default: 3 days)
3. Double-tap button to force refresh
4. Check if "Exclude all-day events" is filtering them out

</details>

<details>
<summary><strong>Wrong times displayed</strong></summary>

1. Verify your computer's timezone is correct
2. For Outlook: Plugin auto-converts Windows timezones
3. Try force refresh after timezone change

</details>

<details>
<summary><strong>Button stuck on "Loading"</strong></summary>

1. Check internet connection
2. Verify calendar URL is accessible
3. Restart Stream Deck software
4. Check Settings for error messages

</details>

---

## What's New in v2.4

- **Stability Fixes** - Capped RRULE expansion, fetch timeouts, concurrent update guards (#26)
- **DST-Aware Recurrence** - Fixed RECURRENCE-ID matching across daylight saving transitions (#27)
- **Export Diagnostics** - One-click diagnostic report for easier bug reporting
- **Error Isolation** - Bad events no longer break the entire calendar

See [full changelog](#changelog) for all versions.

---

## Development

### Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe plugin code |
| Node.js SDK v2 | Stream Deck integration |
| Vitest | 572 unit tests |
| Rollup | Bundle optimization |
| rrule | Recurring event expansion |
| Luxon | Timezone handling |

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Architecture overview
- Testing guidelines
- Pull request process

---

## Changelog

### v2.4.0 (2026)
- 🐛 Fixed CPU spike from unbounded RRULE expansion (#26)
- 🐛 Fixed RECURRENCE-ID mismatch across DST boundaries (#27)
- ✨ Export Diagnostics button for one-click bug reports
- ✨ 30-second fetch timeout to prevent hangs
- ✨ Concurrent update guard prevents stacking requests
- ✨ Per-event error isolation for resilient parsing
- ✨ Enhanced debug logging (500-entry buffer, error filtering)

### v2.3.0 (2026)
- ✨ Named Calendars with friendly names
- ✨ Per-button calendar selection
- ✨ Configurable warning thresholds
- ✨ Graceful calendar deletion handling
- 🐛 Fixed calendar selection persistence

### v2.2.0 (2026)
- ✨ Smart Calendar action (auto-switching)

### v2.1.0 (2026)
- ✨ Configurable title display duration
- ✨ Flash on meeting start option
- 🐛 Fixed startup race conditions

### v2.0.0 (2026)
- ✨ Recurring events (RRULE/EXDATE)
- ✨ Configurable time window
- ✨ Improved timezone handling
- ✨ Force refresh feature

### v1.1.0
- 🎉 Initial release

---

## License

MIT License - see [LICENSE](LICENSE)

## Author

Created by [Pedro Fuentes](https://github.com/pedrofuentes)

---

<p align="center">
  <a href="https://github.com/pedrofuentes/stream-deck-ical/issues">Report Bug</a> ·
  <a href="https://github.com/pedrofuentes/stream-deck-ical/discussions">Discussions</a> ·
  <a href="CONTRIBUTING.md">Contribute</a>
</p>
