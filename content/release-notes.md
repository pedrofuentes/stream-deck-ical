<!--
  Release notes for Elgato Marketplace listing.
  Most recent version first.
  Character limit per entry: 1,500 characters.
-->

## v2.4.5 — 2026-07-13

Stability, compatibility, and privacy fixes.

- iCloud/Apple `webcal://` calendar links now work (previously showed a "Network Error")
- Recurring events fixed: weekly events no longer disappear, and event times are now correct across Daylight Saving Time changes
- Fixed high CPU usage and frozen keys after waking a Mac from sleep
- Clearer setup feedback for unsupported or invalid calendar URLs
- Numerous reliability, correctness, and privacy hardening improvements to diagnostics and logging

<!-- chars: ~520 -->

---

## v2.4.4 — 2026-03-06

SDK upgrade for Elgato Marketplace DRM compatibility.

- Upgraded @elgato/streamdeck SDK from v1.4.1 to v2.0.2 for DRM compatibility
- Fixed Marketplace rejection caused by manifest reading in DRM-encrypted plugins

<!-- chars: ~200 -->

---

## v2.4.1 — 2026-02-22

Background refresh stability fix.

- Fixed buttons showing "Loading iCal" on every background calendar refresh — keys now stay on their current display during silent refreshes
- Background refresh failures now preserve cached events instead of clearing them — stale data is better than no data

<!-- chars: ~260 -->

---

## v2.4.0 — 2026-02-15

Reliability and diagnostics improvements.

- Fixed CPU spike from unbounded recurring event expansion
- Fixed recurring event mismatch across daylight saving time boundaries
- Export Diagnostics button for one-click bug reports
- 30-second fetch timeout to prevent hangs on unresponsive servers
- Concurrent update guard prevents stacking calendar requests
- Per-event error isolation — one bad event no longer breaks the entire feed
- Enhanced debug logging with 500-entry buffer and error filtering

<!-- chars: ~470 -->

---

## v2.3.0 — 2026-02-01

Named Calendars and configurable warning thresholds.

- Named Calendars — create a library of calendars with friendly names (Work, Personal, etc.)
- Per-button calendar selection — each key picks its calendar from a simple dropdown
- Configurable warning thresholds — customize when keys turn orange and red
- Graceful calendar deletion — buttons auto-migrate to the default calendar when a calendar is removed
- Improved Property Inspector — cleaner settings UI with simplified dropdown
- Fixed calendar selection not persisting after restart

<!-- chars: ~480 -->

---

## v2.2.0 — 2026-01-31

Smart Calendar — the all-in-one action.

- New Smart Calendar action — automatically shows "Next Meeting" countdown, then switches to "Time Left" when a meeting starts
- Integrated all v2.1 features (title display, flash alerts) into the Smart Calendar action

<!-- chars: ~280 -->

---

## v2.1.0 — 2026-01-31

Configurable settings and UX improvements.

- Configurable title display duration — choose how long meeting titles show on screen
- Flash on meeting start — optional visual alert when a meeting begins
- "Please Setup" message on first use instead of "Loading iCal"
- Fixed title display duration calculation (was showing for too long)
- Changed flash on meeting start default to off

<!-- chars: ~400 -->

---

## v2.0.0 — 2026-01-31

Major modernization — recurring events, better timezone handling, and a new SDK.

- Full recurring event support — daily, weekly, monthly patterns (RRULE) with exceptions (EXDATE)
- Configurable time window — choose how far ahead to look for events (1, 3, 5, or 7 days)
- Improved timezone handling — automatic Windows-to-IANA timezone conversion for Outlook
- Force refresh — double-tap any key to re-fetch your calendar immediately
- Modernized to Elgato Stream Deck Node.js SDK v2
- Complete TypeScript rewrite with strict mode
- 500+ unit tests

<!-- chars: ~530 -->

---

## v1.1.0 — 2021-02-24

- Show meeting title when pressing the Next Meeting button

<!-- chars: ~65 -->

---

## v1.0.0 — 2021-02-21

Initial release.

- Next Meeting action — countdown to your next calendar event
- Time Left action — time remaining in your current meeting
- Supports any iCal URL (Google Calendar, Outlook, Apple Calendar)
- Color-coded warnings as meetings approach

<!-- chars: ~240 -->
