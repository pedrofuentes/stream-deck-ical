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
- Diagnostics redaction hardened and the logger can no longer throw: home-path
  redaction is centralized so it applies to every argument shape (interpolated
  strings, JSON objects, and Error stacks) — including JSON-escaped Windows
  paths at any realistic escaping depth (doubled and re-doubled backslashes in
  object arguments, nested pre-stringified blobs, and escaped pastes in settings
  dumps) — and now covers `/home/<user>` and `/root` in addition to the
  Windows/macOS `Users` forms, without crossing a line
  break (so a genuine trailing stack frame can no longer be swallowed); `formatError`
  no longer throws on exotic Error objects (non-string `stack`, throwing `stack`
  getter); serialization-failure fallbacks are tagged `[unserializable …]`; and
  U+200E/200F and U+2060 are added to the spoof-character strip
  (#92, #93, #94, #95, #96, #97).
- Log records can no longer be forged by newline injection from untrusted calendar
  event titles: raw CR/LF in non-Error arguments are escaped, Error-stack
  continuation lines are marked so an injected line cannot present as a fresh record,
  and bidi/zero-width spoofing characters are stripped. Error stacks are also
  redacted (user-profile path prefix → `<home>`) and no longer duplicate the message
  (#71, #78 items 1/4/5/6-logger).
- Invalid-timezone warning dedup cache now evicts only the single oldest entry
  (FIFO) on overflow instead of clearing entirely — feeds cycling >100 distinct
  bad TZIDs can no longer re-fire every warning — and reports the number of
  suppressed repeat warnings when a zone is evicted; the raw occurrence pre-cap
  is now derived from the DST window pad (with a unit-tested invariant) so
  widening the pad cannot silently starve the in-window occurrence cap
  (#79, #80, #81, #82).
- Stream Deck IPC outages no longer flood the debug log (setTitle failures are logged
  once per outage and recovery once), the `ICAL_ORPHAN_SWEEP_MS` override is bounds-checked
  to `[1000, 2147483647]` ms so an out-of-range value can't hot-loop the sweep, in-flight
  title updates are coalesced (identical concurrent paints collapse to one SDK call and a
  stale out-of-order resolution can't overwrite a newer title), the orphan sweep tolerates a
  `getActionById` throw for one button without aborting the rest of the pass and skips
  overlapping ticks while a slow pass is still running, and subclass lifecycle overrides now
  carry the `override` modifier under `noImplicitOverride` so a mistyped hook fails the build
  (#72, #73, #74, #75, #76, #77).
- Recurring-event edge cases hardened: exact real-UTC window filtering across DST
  transitions, EXDATE matching for occurrences in spring-forward gaps, malformed and
  lowercase `UNTIL` tolerance, deduplicated invalid-timezone warnings, and
  crypto-random generated UIDs for events without a `UID` (#57, #58, #59).
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
- Corrupted calendar settings with non-string URLs now surface as Invalid URL
  instead of crashing (#65); the Property Inspector's hand-mirrored URL utilities
  now guard against non-string input the same way, and the parity test between
  them and `src/utils/url-utils.ts` can no longer pass vacuously if the mirror
  is shadowed outside its marker block (#66).

### Removed

<!--
Prior release history (pre-CHANGELOG) is captured in GitHub Releases and the README.
Released version at migration time: v2.4.4.
-->
