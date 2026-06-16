# Roadmap — stream-deck-ical

> Project phases, milestones, and implementation plan.
> Restructured from the original technical spec & roadmap (last substantive update: Feb 2026).

## Current Phase

**Phase 1 — Polish (v2.4.x).** Shipping UX improvements and bug fixes on the v2.x line
(current release: v2.4.4). Named Calendars (v2.3) is the foundation; current focus is
better error messaging, meeting-join detection, and a Property Inspector event preview.

## Phases

### Phase 1: Polish (v2.4.x)
- Actionable error messages (invalid URL, network failure, auth expired, parse error)
- Meeting-join URL detection + long-press to join
- Event preview + calendar sync-status indicator in the Property Inspector

### Phase 2: Stream Deck+ (v2.5.0)
- Encoder action: dial rotation to scroll events, press for details
- Touch LCD event list; touch-to-join meetings

### Phase 3: Advanced Features (v3.0.0)
- Multi-calendar aggregation on one button (merge / priority)
- Offline cache with disk persistence; conditional fetch (ETag / If-Modified-Since)
- Event deduplication by UID; calendar color coding; agenda view; notification sounds

### Phase 4: Integration (v3.1.0)
- Direct OAuth for Google / Microsoft (no URL copy)
- Two-way sync; Slack/Teams status + focus-mode (DND during meetings)

## Cross-Cutting Recommendations

- **Quality**: strict TypeScript; a regression test for every bug fix; keep coverage high.
- **Performance**: watch memory with many calendars; throttle/debounce network; consider PI code-splitting.
- **Security**: consider encrypting stored calendar URLs; sanitize all user input; secure-store any future OAuth tokens.

## Known Technical Debt

| Item | Impact |
|------|--------|
| Circular-dependency warnings from `rrule` | Harmless build warnings |
| No offline caching | Events lost on network failure |
| Settings popup separate from PI | Extra click to configure |
| No Stream Deck+ support | Missing dial/touch features |

## Key Milestones

| Milestone | Phase | Status |
|-----------|-------|--------|
| Named Calendars (multi-calendar) | v2.3 | done |
| Recurring events (RRULE/EXDATE) | v2.0 | done |
| Outlook / O365 support | v2.0 | done |
| Configurable warning thresholds | v2.3 | done |
| Actionable error messages | Phase 1 | pending |
| Meeting-join links | Phase 1 | pending |
| Stream Deck+ encoder | Phase 2 | pending |
| Offline cache | Phase 3 | pending |
