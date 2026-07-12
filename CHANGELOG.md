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
- Logger redaction boundary provenance (#126, #127, #128, #129): the sanitize
  strip pass now records where characters were removed and treats those
  positions as non-alnum anchors, so an invisible/control that was the sole
  redaction anchor still anchors after being stripped (#128); a raw quote inside
  a single argument's URL no longer severs the scheme context (structural JSON
  commas and argument-join spaces remain the boundaries, so cross-value bleed
  stays blocked), redacting account tokens past interior quotes in raw malformed
  URLs (#126); URL-anchored account capture now stops at URL soft punctuation
  (',', ';', whitespace) so multi-URL and URL+prose lines no longer fold into one
  `<home>`, while filesystem paths keep the wide spaced-username capture (#127);
  and the host-adjacent `/root` URL redaction is recorded as an accepted
  deviation in the scanner docs (#129).
- Logger redaction hardened (#121, #122, #123, #124): account-bearing
  `users`/`home` segments inside URLs (Zimbra `/home/<user>/`, CalDAV
  `/users/<name>/` — logged on every fetch) are redacted again via
  scheme-aware anchoring, a sanctioned reversal of two #114 URL pins
  (documented over-redaction of non-account URL paths — privacy over
  fidelity in a diagnostics log; `root` keeps mid-path behavior in URLs);
  share-position detection no longer requires backslash evidence, so
  mixed- and forward-slash UNC forms (`//server\users\pedro`,
  `//fileserver/users/pedro`) and protocol-relative URLs redact too; the
  invisible-character strip is rebuilt on Unicode properties
  (`\p{Cf}` + `\p{Default_Ignorable_Code_Point}`, surrogate-aware `u` flag),
  closing the whole class — soft hyphen, invisible operators, deprecated
  format controls, variation selectors incl. supplementary, interlinear
  annotations, Hangul fillers, plane-14 tag characters, and reserved
  default-ignorables; and the BSD/Solaris home-layout platform-scope
  deviation is recorded in the scanner docs.
- Home-path redaction scanner refined: mid-path `root`/`users`/`home` segments
  (e.g. `deployRoot` values, `/opt/myapp/root/handler.js`, URL path segments)
  are no longer misredacted — a match now requires the token to start an
  anchored absolute path (text start, whitespace/punctuation, drive prefix, or
  UNC `\\host\` share position) — while nested decoy shapes
  (`/home/users/<name>`, `C:\Users\Users\<name>`) now consume the real
  username instead of redacting the decoy and leaking it; the username span
  stops at `:` so trailing prose survives; U+061C (Arabic Letter Mark) is added
  to the bidi/zero-width strip; the redundant pre-stringify redaction replacer
  is removed (the final scanner is the single source and also covers object
  keys); and `formatError`'s last-resort fallback is tagged
  `[unformattable …]` (#114, #115, #116, #117).
- Diagnostics redaction hardened and the logger can no longer throw: home-path
  redaction is centralized so it applies to every argument shape (interpolated
  strings, JSON objects, and Error stacks) — via a linear token scanner that
  handles escaped Windows paths at any escaping depth or separator style
  (doubled/re-doubled backslashes, PHP-style `\/` escapes, mixed separator runs,
  nested pre-stringified blobs, and escaped pastes in settings dumps) — and now
  covers `/home/<user>` and `/root` in addition to the
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
  (#72, #73, #74, #75, #76, #77, #78).
- Post-wake repaint can no longer be blocked by a hung in-flight `setTitle`: `onWillAppear`
  now also clears `pendingTitle`/`titleFailureLogged`, so an identical post-wake title still
  paints. In-flight title coalescing is now keyed to a per-dispatch generation token instead
  of value equality, so an older same-text settlement in an x,y,x overlap can no longer clear
  a newer dispatch's marker (no redundant duplicate SDK call). `stopOrphanSweep()` now resets
  the module-level in-flight guard so a restarted sweep runs reliably after a hung pass, and
  the `ICAL_ORPHAN_SWEEP_MS` bounds now also cover the explicit interval param and reject
  non-decimal forms (`0x7D0`, `1e3`, ` 5000 `); title failure/recovery logs are suppressed for
  a `ButtonState` already removed mid-flight (#99, #100, #101, #102, #103, #104).
- Residual post-wake stale-title race closed: `onWillAppear` now also bumps the per-button
  title dispatch token, so a `setTitle` left hung from before sleep can no longer commit its
  stale text (or flip the outage flag) if it settles during the re-appear reset window. The
  `titleFailureLogged` outage/recovery transitions are now token-gated so an older out-of-order
  settlement in an x,y,x overlap can no longer raise a spurious warn or log a false recovery,
  and `stopOrphanSweep()` now advances a sweep generation so a pass left in flight across a
  stop/restart can no longer clear the in-flight guard held by the restarted sweep's pass
  (no two overlapping reap passes) (#109, #110, #111, #112).
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
