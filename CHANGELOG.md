# Changelog — stream-deck-ical

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Adopted the agents-template governance system: `AGENTS.md` (TDD + Sentinel rules),
  `docs/SENTINEL.md` + dimension prompts, and companion docs
  (`ARCHITECTURE.md`, `TESTING-STRATEGY.md`, `DEVELOPMENT-WORKFLOW.md`, `DECISIONS.md`, `LEARNINGS.md`).

### Changed
- `.github/copilot-instructions.md` reduced to a pointer to `AGENTS.md`.
- `ROADMAP.md` restructured to the agents-template format.

### Fixed
- iCloud/Apple Calendar `webcal://` (and `webcals://`) share links are now normalized to
  `https://` before fetching, and unsupported URL schemes (e.g. `ftp://`, `file://`) now
  surface as "Please Setup" (INVALID_URL) instead of a misleading "Network Error" (#43).
- Recurring events are now expanded in the event's own timezone: weekly `BYDAY`
  events no longer disappear when their local day differs from the UTC day
  (e.g. Saturday-evening events in the Americas, #39), and occurrences keep
  their local wall-clock time across DST switches instead of shifting by an
  hour (#30).
- Prevent sustained 100%+ CPU after macOS wake-from-sleep (#29): a global 60s
  orphan-reconciliation sweep reaps button states the Stream Deck no longer
  reports (clearing their leaked per-second timers and calendar refcounts),
  `setTitle` and per-tick debug logs are now only emitted when their content
  changes, and the debug-info log line no longer embeds the full log buffer.
- Same calendar added as `webcal://` and `https://` no longer double-polls
  (#48); settings UI hardened against HTML injection in the calendar list
  (code scanning alert #1), and `normalizeICalUrl`/`isSupportedICalUrl` no
  longer throw on null/undefined input (#49).
- Hardened the orphan-reconciliation sweep and its diagnostics (#50, #51, #52,
  #54, #55, #56): orphan cleanup now runs through a shared, polymorphic
  `cleanupButtonState` hook that is awaited per button, so a failing reap can no
  longer escape as an unhandled rejection and crash the plugin, and an id is only
  recorded as reaped once its cleanup (including subclass marquee/timeout state)
  actually completes; a key title no longer freezes stale after a transient
  Stream Deck IPC failure because the change-guard is committed only after
  `setTitle` resolves (the next tick retries otherwise); logged `Error` objects
  keep their message and stack instead of collapsing to `{}`, and log messages
  are stripped of ANSI/OSC escapes and C0/C1/BEL/U+2028 control characters; the
  sweep cadence can be tuned via the `ICAL_ORPHAN_SWEEP_MS` env override; and a
  failed debug-info size measurement now logs its cause instead of a silent
  `bytes=-1`.

### Removed

<!--
Prior release history (pre-CHANGELOG) is captured in GitHub Releases and the README.
Released version at migration time: v2.4.4.
-->
