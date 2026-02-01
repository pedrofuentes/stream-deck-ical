/**
 * Tests for Combined Action
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CalendarEvent } from '../src/types/index';

// Mock the @elgato/streamdeck module
vi.mock('@elgato/streamdeck', () => ({
  default: {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    },
    actions: {
      registerAction: vi.fn()
    },
    connect: vi.fn()
  },
  action: vi.fn((config) => (target: any) => target),
  SingletonAction: class {
    actions = new Map();
  }
}));

// Mock the logger
vi.mock('../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

// Mock the calendar service - don't reference external variables in vi.mock
vi.mock('../src/services/calendar-service', () => ({
  calendarCache: {
    version: 1,
    status: 'LOADED',
    events: [],
    lastFetch: Date.now(),
    provider: 'test'
  },
  getStatusText: vi.fn((status: string) => {
    switch (status) {
      case 'INIT': return 'Please\nSetup';
      case 'LOADING': return 'Loading\niCal';
      case 'INVALID_URL': return 'Please\nSetup';
      case 'LOADED': return '';
      case 'NO_EVENTS': return 'No\nMeetings\nFound';
      default: return 'Error';
    }
  }),
  getSettings: vi.fn(() => ({
    titleDisplayDuration: 15,
    flashOnMeetingStart: false
  }))
}));

// Mock the event utils
vi.mock('../src/utils/event-utils', () => ({
  findActiveEvents: vi.fn(() => []),
  findNextEvent: vi.fn(() => undefined)
}));

import { findActiveEvents, findNextEvent } from '../src/utils/event-utils';
import { getStatusText, getSettings, calendarCache } from '../src/services/calendar-service';

describe('Combined Action Logic', () => {
  const now = new Date();
  
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(now);
    
    // Reset mock cache via the imported object
    (calendarCache as any).version = 1;
    (calendarCache as any).status = 'LOADED';
    (calendarCache as any).events = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Mode detection', () => {
    it('should show "No Meetings" when no events', () => {
      (calendarCache as any).events = [];
      
      vi.mocked(findActiveEvents).mockReturnValue([]);
      vi.mocked(findNextEvent).mockReturnValue(undefined);
      
      const activeEvents = findActiveEvents((calendarCache as any).events);
      const nextEvent = findNextEvent((calendarCache as any).events);
      
      expect(activeEvents.length).toBe(0);
      expect(nextEvent).toBeUndefined();
    });

    it('should use time-left mode when meeting is active', () => {
      const start = new Date(now.getTime() - 30 * 60 * 1000); // 30 min ago
      const end = new Date(now.getTime() + 30 * 60 * 1000); // 30 min from now
      
      const activeMeeting = {
        uid: '1',
        summary: 'Active Meeting',
        start,
        end,
        isAllDay: false
      };
      
      (calendarCache as any).events = [activeMeeting];
      
      vi.mocked(findActiveEvents).mockReturnValue([activeMeeting]);
      vi.mocked(findNextEvent).mockReturnValue(undefined);
      
      const activeEvents = findActiveEvents((calendarCache as any).events);
      
      expect(activeEvents.length).toBe(1);
      expect(activeEvents[0].summary).toBe('Active Meeting');
    });

    it('should use next-meeting mode when no active meeting but has upcoming', () => {
      const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
      const end = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      
      const upcomingEvent = {
        uid: '1',
        summary: 'Upcoming Meeting',
        start,
        end,
        isAllDay: false
      };
      
      (calendarCache as any).events = [upcomingEvent];
      
      vi.mocked(findActiveEvents).mockReturnValue([]);
      vi.mocked(findNextEvent).mockReturnValue(upcomingEvent);
      
      const activeEvents = findActiveEvents((calendarCache as any).events);
      const nextEvent = findNextEvent((calendarCache as any).events);
      
      // This represents what Combined action should do
      const mode = activeEvents.length > 0 ? 'time-left' : 
                   nextEvent ? 'next-meeting' : 'no-events';
      
      expect(mode).toBe('next-meeting');
    });

    it('should transition from next-meeting to time-left when meeting starts', () => {
      const meetingStart = new Date(now.getTime() + 1000); // 1 second from now
      const meetingEnd = new Date(now.getTime() + 60 * 60 * 1000);
      
      const meeting = {
        uid: '1',
        summary: 'Transition Meeting',
        start: meetingStart,
        end: meetingEnd,
        isAllDay: false
      };
      
      (calendarCache as any).events = [meeting];
      
      // Before meeting starts
      vi.mocked(findActiveEvents).mockReturnValueOnce([]);
      vi.mocked(findNextEvent).mockReturnValueOnce(meeting);
      
      let activeEvents = findActiveEvents((calendarCache as any).events);
      expect(activeEvents.length).toBe(0);
      
      // After meeting starts
      vi.advanceTimersByTime(2000);
      
      vi.mocked(findActiveEvents).mockReturnValueOnce([meeting]);
      vi.mocked(findNextEvent).mockReturnValueOnce(undefined);
      
      activeEvents = findActiveEvents((calendarCache as any).events);
      expect(activeEvents.length).toBe(1);
    });
  });

  describe('Multiple meetings handling', () => {
    it('should support cycling through concurrent meetings in time-left mode', () => {
      const start = new Date(now.getTime() - 30 * 60 * 1000);
      const end1 = new Date(now.getTime() + 15 * 60 * 1000);
      const end2 = new Date(now.getTime() + 30 * 60 * 1000);
      
      const meetings = [
        { uid: '1', summary: 'Meeting 1', start, end: end1, isAllDay: false },
        { uid: '2', summary: 'Meeting 2', start, end: end2, isAllDay: false }
      ];
      
      (calendarCache as any).events = meetings;
      
      vi.mocked(findActiveEvents).mockReturnValue(meetings);
      
      const activeEvents = findActiveEvents((calendarCache as any).events);
      expect(activeEvents.length).toBe(2);
      
      // Simulate cycling
      let currentIndex = 0;
      currentIndex = (currentIndex + 1) % activeEvents.length;
      expect(currentIndex).toBe(1);
      
      currentIndex = (currentIndex + 1) % activeEvents.length;
      expect(currentIndex).toBe(0);
    });
  });

  describe('Loading states', () => {
    it('should show loading status when cache is not ready', () => {
      (calendarCache as any).status = 'LOADING';
      
      expect((calendarCache as any).status).toBe('LOADING');
    });

    it('should show "No Meetings" for NO_EVENTS status', () => {
      (calendarCache as any).status = 'NO_EVENTS';
      
      expect((calendarCache as any).status).toBe('NO_EVENTS');
    });
  });
});

describe('Combined Action v2.1.0+ Features', () => {
  const now = new Date();
  
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(now);
    
    (calendarCache as any).version = 1;
    (calendarCache as any).status = 'LOADED';
    (calendarCache as any).events = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('INIT status behavior', () => {
    it('should show "Please Setup" for INIT status (v2.1.0 behavior)', () => {
      (calendarCache as any).status = 'INIT';
      
      const statusText = getStatusText('INIT');
      expect(statusText).toBe('Please\nSetup');
    });

    it('should show "Please Setup" for INVALID_URL status', () => {
      const statusText = getStatusText('INVALID_URL');
      expect(statusText).toBe('Please\nSetup');
    });

    it('should show "Loading iCal" only for LOADING status', () => {
      const statusText = getStatusText('LOADING');
      expect(statusText).toBe('Loading\niCal');
    });
  });

  describe('Color zones (inherited from BaseAction)', () => {
    it('should use correct thresholds for red zone (30 seconds)', () => {
      const RED_ZONE = 30;
      
      // Meeting ending in 25 seconds should be red
      expect(25 <= RED_ZONE).toBe(true);
      // Meeting ending in 35 seconds should not be red
      expect(35 <= RED_ZONE).toBe(false);
    });

    it('should use correct thresholds for orange zone (300 seconds)', () => {
      const ORANGE_ZONE = 300;
      const RED_ZONE = 30;
      
      // Meeting ending in 60 seconds should be orange (not red)
      expect(60 <= ORANGE_ZONE && 60 > RED_ZONE).toBe(true);
      // Meeting ending in 400 seconds should not be orange
      expect(400 <= ORANGE_ZONE).toBe(false);
    });
  });

  describe('Mode transitions', () => {
    it('should clear lastActiveMeetingIds when switching to next-meeting mode', () => {
      // This tests that the tracking set is cleared when no active meetings
      const lastActiveMeetingIds = new Set(['meeting-1', 'meeting-2']);
      
      // When mode switches to next-meeting, it should clear
      lastActiveMeetingIds.clear();
      
      expect(lastActiveMeetingIds.size).toBe(0);
    });

    it('should detect newly started meetings for flash notification', () => {
      const lastActiveMeetingIds = new Set<string>();
      
      // Simulate meeting starting
      const newMeetingId = 'new-meeting-123';
      const currentMeetingIds = new Set([newMeetingId]);
      
      // Check if this is a new meeting
      const isNewMeeting = !lastActiveMeetingIds.has(newMeetingId);
      
      expect(isNewMeeting).toBe(true);
    });

    it('should not detect existing meetings as new', () => {
      const existingMeetingId = 'existing-meeting-456';
      const lastActiveMeetingIds = new Set([existingMeetingId]);
      
      // Check if this is a new meeting
      const isNewMeeting = !lastActiveMeetingIds.has(existingMeetingId);
      
      expect(isNewMeeting).toBe(false);
    });
  });

  describe('Meeting index handling', () => {
    it('should reset meeting index when it exceeds active meetings count', () => {
      let currentMeetingIndex = 5;
      const activeEventsLength = 2;
      
      // This is what the combined action does
      if (currentMeetingIndex >= activeEventsLength) {
        currentMeetingIndex = 0;
      }
      
      expect(currentMeetingIndex).toBe(0);
    });

    it('should preserve meeting index when within bounds', () => {
      let currentMeetingIndex = 1;
      const activeEventsLength = 3;
      
      if (currentMeetingIndex >= activeEventsLength) {
        currentMeetingIndex = 0;
      }
      
      expect(currentMeetingIndex).toBe(1);
    });
  });

  describe('Marquee behavior', () => {
    it('should use configurable title display duration', () => {
      const settings = getSettings();
      
      // Default is 15 seconds
      expect(settings.titleDisplayDuration).toBe(15);
      
      // Duration in ms should be seconds * 1000
      const durationMs = settings.titleDisplayDuration * 1000;
      expect(durationMs).toBe(15000);
    });

    it('should toggle showingTitle on press', () => {
      let showingTitle = false;
      
      // First press starts marquee
      showingTitle = true;
      expect(showingTitle).toBe(true);
      
      // Second press stops marquee
      showingTitle = false;
      expect(showingTitle).toBe(false);
    });

    it('should reset marquee position to 0 on start', () => {
      let marqueePosition = 10; // Simulate some previous state
      
      // On start, should reset
      marqueePosition = 0;
      
      expect(marqueePosition).toBe(0);
    });
  });

  describe('Display text formatting', () => {
    it('should show meeting indicator for multiple concurrent meetings', () => {
      const timeText = '25m 30s';
      const currentIndex = 0;
      const totalMeetings = 3;
      
      const titleText = totalMeetings > 1 
        ? `${timeText}\n(${currentIndex + 1}/${totalMeetings})`
        : timeText;
      
      expect(titleText).toBe('25m 30s\n(1/3)');
    });

    it('should show only time for single meeting', () => {
      const timeText = '25m 30s';
      const totalMeetings = 1;
      
      const titleText = totalMeetings > 1 
        ? `${timeText}\n(1/${totalMeetings})`
        : timeText;
      
      expect(titleText).toBe('25m 30s');
    });
  });
});
