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

### Removed

<!--
Prior release history (pre-CHANGELOG) is captured in GitHub Releases and the README.
Released version at migration time: v2.4.4.
-->
