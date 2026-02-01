# Stream Deck iCal Plugin - Technical Spec & Roadmap

## Executive Summary

This document outlines the current state, improvement opportunities, and future roadmap for the Stream Deck iCal Plugin based on comprehensive analysis of the codebase, architecture patterns, and user needs.

---

## Current State Analysis (v2.3.0)

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Stream Deck Software                        │
├─────────────────────────────────────────────────────────────────┤
│  Property Inspector (PI)          │  Plugin (Node.js Runtime)   │
│  ├─ pi.html / pi.js              │  ├─ plugin.ts (entry)       │
│  └─ setup.html / setup.js        │  ├─ actions/                │
│      (Settings Popup)            │  │   ├─ base-action.ts      │
│                                   │  │   ├─ next-meeting.ts     │
│      WebSocket ←───────────────→ │  │   ├─ time-left.ts        │
│                                   │  │   └─ combined-action.ts  │
│                                   │  └─ services/               │
│                                   │      ├─ calendar-manager.ts │
│                                   │      ├─ calendar-service.ts │
│                                   │      └─ ical-parser.ts      │
└─────────────────────────────────────────────────────────────────┘
```

### Core Strengths

| Area | Description |
|------|-------------|
| **Multi-Calendar** | Named calendars with per-button selection, URL-based caching |
| **Provider Support** | Google, Outlook/O365, Apple Calendar with timezone handling |
| **Recurring Events** | Full RRULE/EXDATE support via rrule library |
| **Test Coverage** | 529 tests covering actions, services, and edge cases |
| **SingletonAction** | Proper per-button state management with Maps |
| **User Experience** | Configurable thresholds, flash alerts, marquee titles |

### Technical Debt & Known Limitations

| Issue | Impact | Effort |
|-------|--------|--------|
| Circular dependencies in rrule | Build warnings (harmless) | Low |
| No offline caching | Events lost on network failure | Medium |
| Settings popup separate from PI | Extra click for users | Medium |
| No event details view | Limited information display | Medium |
| No Stream Deck+ support | Missing dial/touchscreen features | High |

---

## Improvement Opportunities

### 1. User Experience Enhancements

#### 1.1 Inline Settings (Priority: High)
**Current**: Users click "Settings" button to open popup window.
**Proposed**: Move calendar management inline to Property Inspector.

```
Benefits:
- Fewer clicks to configure
- More native Stream Deck feel
- Eliminates popup window management

Challenges:
- Limited PI height
- Need collapsible sections
- Complex state management
```

#### 1.2 Calendar Sync Status Indicator (Priority: Medium)
**Current**: No visual indication of sync status on buttons.
**Proposed**: Add sync indicator overlay or status in PI.

```typescript
interface SyncStatus {
  lastSync: Date;
  nextSync: Date;
  status: 'syncing' | 'synced' | 'error' | 'offline';
  eventCount: number;
}
```

#### 1.3 Event Preview in PI (Priority: Medium)
**Current**: Users can't see upcoming events without adding button.
**Proposed**: Show mini event list in Property Inspector.

```
┌──────────────────────────────┐
│ Calendar: Work        [▼]   │
├──────────────────────────────┤
│ Upcoming Events:             │
│ • 10:00 Team Standup        │
│ • 14:00 1:1 with Manager    │
│ • 16:30 Sprint Review       │
└──────────────────────────────┘
```

#### 1.4 Meeting Join Button (Priority: High)
**Current**: Buttons only show time/countdown.
**Proposed**: Long-press or separate action to join meeting.

```typescript
interface CalendarEvent {
  // ... existing fields
  meetingUrl?: string;      // Zoom, Teams, Meet link
  location?: string;        // Physical or virtual location
  conferenceType?: 'zoom' | 'teams' | 'meet' | 'webex' | 'other';
}
```

**Implementation**:
1. Parse meeting URLs from event description/location
2. Add `onLongPress` handler to open URL
3. Show video icon overlay when meeting has join link

### 2. Technical Improvements

#### 2.1 Offline Cache (Priority: Medium)
**Current**: Events cleared when fetch fails.
**Proposed**: Persist last successful fetch to disk.

```typescript
interface CacheEntry {
  url: string;
  events: CalendarEvent[];
  fetchedAt: Date;
  expiresAt: Date;
  etag?: string;           // For conditional requests
}

// Use Node.js fs to persist
const CACHE_FILE = path.join(dataDir, 'calendar-cache.json');
```

#### 2.2 Conditional Fetching (Priority: Low)
**Current**: Full fetch every 10 minutes.
**Proposed**: Use ETag/If-Modified-Since for efficient updates.

```typescript
const response = await fetch(url, {
  headers: {
    'If-None-Match': cachedEtag,
    'If-Modified-Since': lastModified
  }
});

if (response.status === 304) {
  // Use cached data
}
```

#### 2.3 Event Deduplication (Priority: Medium)
**Current**: Same event from multiple calendars shows multiple times.
**Proposed**: Deduplicate by UID across calendars.

```typescript
function deduplicateEvents(events: CalendarEvent[]): CalendarEvent[] {
  const seen = new Map<string, CalendarEvent>();
  for (const event of events) {
    const key = `${event.uid}-${event.start.getTime()}`;
    if (!seen.has(key)) {
      seen.set(key, event);
    }
  }
  return Array.from(seen.values());
}
```

#### 2.4 Background Refresh (Priority: Low)
**Current**: Refresh blocks UI briefly.
**Proposed**: Use worker threads for parsing.

### 3. New Features

#### 3.1 Stream Deck+ Support (Priority: High)
**Opportunity**: Utilize dial and touchscreen on Stream Deck+.

**Dial Features**:
- Rotate to scroll through events
- Press to show/hide details
- Touch LCD for event list

**Implementation**:
```typescript
// New action type for Stream Deck+ encoder
@action({ UUID: "com.pedrofuentes.ical.encoder" })
export class CalendarEncoderAction extends SingletonAction {
  onDialRotate(ev: DialRotateEvent): void {
    // Scroll through events
  }
  
  onDialPress(ev: DialPressEvent): void {
    // Show event details on LCD
  }
  
  onTouchTap(ev: TouchTapEvent): void {
    // Join meeting or show more
  }
}
```

#### 3.2 Multi-Calendar Aggregation (Priority: Medium)
**Current**: Each button shows one calendar.
**Proposed**: Option to aggregate multiple calendars on one button.

```typescript
interface ActionSettings {
  calendarIds?: string[];     // Multiple calendar IDs
  aggregationMode?: 'merge' | 'priority';
}
```

#### 3.3 Notification Sounds (Priority: Low)
**Current**: Visual flash only.
**Proposed**: Optional audio alerts for meeting start.

```typescript
interface GlobalSettings {
  // ... existing
  soundEnabled?: boolean;
  soundFile?: string;        // Custom sound path
  soundVolume?: number;      // 0-100
}
```

#### 3.4 Calendar Color Coding (Priority: Medium)
**Current**: All calendars use same icon colors.
**Proposed**: Match button color to calendar color.

```typescript
interface NamedCalendar {
  // ... existing
  color?: string;            // Hex color from calendar provider
}

// Generate tinted icons dynamically or use overlay
```

#### 3.5 Agenda View Action (Priority: Medium)
**Proposed**: New action showing multiple upcoming events.

```
┌─────────────┐
│ TODAY       │
│ 10:00 Mtg 1 │
│ 14:00 Mtg 2 │
│ 16:30 Mtg 3 │
└─────────────┘
```

### 4. Quality of Life Improvements

#### 4.1 Better Error Messages (Priority: High)
**Current**: Generic "Error" or "Loading" states.
**Proposed**: Specific, actionable error messages.

| Error | Current | Proposed |
|-------|---------|----------|
| Invalid URL | "Error" | "Invalid URL format" |
| Network fail | "Error" | "Can't reach calendar" |
| Auth expired | "Error" | "Re-authenticate" |
| Parse error | "Error" | "Calendar format error" |

#### 4.2 Setup Wizard (Priority: Low)
**Proposed**: First-run wizard for new users.

```
Step 1: Select calendar provider (Google/Outlook/Apple)
Step 2: Show provider-specific URL instructions
Step 3: Paste and validate URL
Step 4: Choose default settings
Step 5: Done! Drag an action to get started.
```

#### 4.3 Export/Import Settings (Priority: Low)
**Proposed**: Backup/restore calendar configurations.

```typescript
interface ExportedSettings {
  version: string;
  calendars: NamedCalendar[];
  preferences: GlobalSettings;
  // Exclude URLs for security, or encrypt
}
```

---

## Roadmap

### Phase 1: Polish (v2.4.0) - Q1 2026
Focus: UX improvements and bug fixes

- [ ] Better error messages with actionable guidance
- [ ] Meeting join URL detection and long-press to join
- [ ] Event preview in Property Inspector
- [ ] Calendar sync status indicator
- [ ] Fix any reported issues from v2.3.0

**Estimated effort**: 2-3 weeks

### Phase 2: Stream Deck+ (v2.5.0) - Q2 2026
Focus: New hardware support

- [ ] Encoder action for dial control
- [ ] Touch LCD event list display
- [ ] Dial rotation for event scrolling
- [ ] Touch to join meetings

**Estimated effort**: 3-4 weeks

### Phase 3: Advanced Features (v3.0.0) - Q3 2026
Focus: Power user features

- [ ] Multi-calendar aggregation on single button
- [ ] Offline caching with persistence
- [ ] Calendar color coding
- [ ] Agenda view action
- [ ] Notification sounds

**Estimated effort**: 4-6 weeks

### Phase 4: Integration (v3.1.0) - Q4 2026
Focus: Extended integrations

- [ ] Direct OAuth for Google/Microsoft (no URL copy)
- [ ] Two-way sync (mark as attended?)
- [ ] Slack/Teams status integration
- [ ] Focus mode integration (DND during meetings)

**Estimated effort**: 6-8 weeks

---

## Technical Recommendations

### Code Quality

1. **Type Safety**: Continue using strict TypeScript
2. **Testing**: Maintain >80% coverage, add E2E tests
3. **Documentation**: Keep copilot-instructions.md updated
4. **Changelog**: Document all changes for users

### Performance

1. **Bundle Size**: Consider code splitting for PI
2. **Memory**: Monitor for leaks with many calendars
3. **Network**: Implement request throttling/debouncing

### Security

1. **URL Storage**: Consider encrypting calendar URLs
2. **OAuth Tokens**: If adding OAuth, use secure storage
3. **Input Validation**: Sanitize all user inputs

---

## Appendix: User Feedback Themes

Based on GitHub issues and common calendar plugin patterns:

| Theme | Frequency | Addressed |
|-------|-----------|-----------|
| Multiple calendars | High | ✅ v2.3.0 |
| Recurring events | High | ✅ v2.0.0 |
| Meeting join links | Medium | 🔜 Proposed |
| Outlook support | Medium | ✅ v2.0.0 |
| Custom thresholds | Medium | ✅ v2.3.0 |
| Stream Deck+ | Medium | 🔜 Proposed |
| Offline mode | Low | 🔜 Proposed |
| Sound alerts | Low | 🔜 Proposed |

---

## Conclusion

The Stream Deck iCal Plugin has evolved into a robust calendar integration with strong fundamentals. The Named Calendars feature in v2.3.0 addresses the most requested capability. 

The recommended next focus areas are:
1. **Meeting join links** - High value, medium effort
2. **Stream Deck+ support** - Growing hardware base
3. **Better error handling** - Reduces support burden

The architecture is well-positioned for these enhancements without major refactoring.

---

*Last updated: February 2026*
*Maintainer: Pedro Fuentes*
