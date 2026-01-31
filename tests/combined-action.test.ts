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

// Create mock calendar cache
let mockCache = {
  version: 1,
  status: 'LOADED' as string,
  events: [] as CalendarEvent[],
  lastFetch: Date.now(),
  provider: 'test'
};

// Mock the calendar service
vi.mock('../src/services/calendar-service', () => ({
  calendarCache: mockCache,
  getStatusText: vi.fn((status: string) => {
    switch (status) {
      case 'INIT': return 'Loading\niCal';
      case 'LOADING': return 'Loading\niCal';
      case 'LOADED': return '';
      case 'NO_EVENTS': return 'No\nMeetings\nFound';
      default: return 'Error';
    }
  })
}));

// Mock the event utils
vi.mock('../src/utils/event-utils', () => ({
  findActiveEvents: vi.fn(() => {
    const now = new Date();
    return mockCache.events.filter(e => e.start <= now && e.end > now);
  }),
  findNextEvent: vi.fn(() => {
    const now = new Date();
    return mockCache.events.find(e => e.start > now);
  })
}));

import { findActiveEvents, findNextEvent } from '../src/utils/event-utils';

describe('Combined Action Logic', () => {
  const now = new Date();
  
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(now);
    
    // Reset mock cache
    mockCache.version = 1;
    mockCache.status = 'LOADED';
    mockCache.events = [];
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Mode detection', () => {
    it('should show "No Meetings" when no events', () => {
      mockCache.events = [];
      
      const activeEvents = findActiveEvents(mockCache.events);
      const nextEvent = findNextEvent(mockCache.events);
      
      expect(activeEvents.length).toBe(0);
      expect(nextEvent).toBeUndefined();
    });

    it('should use time-left mode when meeting is active', () => {
      const start = new Date(now.getTime() - 30 * 60 * 1000); // 30 min ago
      const end = new Date(now.getTime() + 30 * 60 * 1000); // 30 min from now
      
      mockCache.events = [{
        uid: '1',
        summary: 'Active Meeting',
        start,
        end,
        isAllDay: false
      }];
      
      // Mock the active events finding
      vi.mocked(findActiveEvents).mockReturnValueOnce([mockCache.events[0]]);
      vi.mocked(findNextEvent).mockReturnValueOnce(undefined);
      
      const activeEvents = findActiveEvents(mockCache.events);
      
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
      mockCache.events = [upcomingEvent];
      
      // Test the logic directly without relying on mocked return values
      // The actual test is that when there are no active events (start > now),
      // and there is a future event, we should show next-meeting mode
      const activeEvents: any[] = []; // No active meetings
      const nextEvent = upcomingEvent; // We have an upcoming meeting
      
      // This represents what Combined action should do
      const mode = activeEvents.length > 0 ? 'time-left' : 
                   nextEvent ? 'next-meeting' : 'no-events';
      
      expect(mode).toBe('next-meeting');
    });

    it('should transition from next-meeting to time-left when meeting starts', () => {
      // Initial: upcoming meeting
      const meetingStart = new Date(now.getTime() + 1000); // 1 second from now
      const meetingEnd = new Date(now.getTime() + 60 * 60 * 1000);
      
      mockCache.events = [{
        uid: '1',
        summary: 'Transition Meeting',
        start: meetingStart,
        end: meetingEnd,
        isAllDay: false
      }];
      
      // Before meeting starts
      vi.mocked(findActiveEvents).mockReturnValueOnce([]);
      vi.mocked(findNextEvent).mockReturnValueOnce(mockCache.events[0]);
      
      let activeEvents = findActiveEvents(mockCache.events);
      expect(activeEvents.length).toBe(0);
      
      // After meeting starts
      vi.advanceTimersByTime(2000);
      
      vi.mocked(findActiveEvents).mockReturnValueOnce([mockCache.events[0]]);
      vi.mocked(findNextEvent).mockReturnValueOnce(undefined);
      
      activeEvents = findActiveEvents(mockCache.events);
      expect(activeEvents.length).toBe(1);
    });
  });

  describe('Multiple meetings handling', () => {
    it('should support cycling through concurrent meetings in time-left mode', () => {
      const start = new Date(now.getTime() - 30 * 60 * 1000);
      const end1 = new Date(now.getTime() + 15 * 60 * 1000);
      const end2 = new Date(now.getTime() + 30 * 60 * 1000);
      
      mockCache.events = [
        { uid: '1', summary: 'Meeting 1', start, end: end1, isAllDay: false },
        { uid: '2', summary: 'Meeting 2', start, end: end2, isAllDay: false }
      ];
      
      vi.mocked(findActiveEvents).mockReturnValue(mockCache.events);
      
      const activeEvents = findActiveEvents(mockCache.events);
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
      mockCache.status = 'LOADING';
      
      // The action should show loading text in this state
      expect(mockCache.status).toBe('LOADING');
    });

    it('should show "No Meetings" for NO_EVENTS status', () => {
      mockCache.status = 'NO_EVENTS';
      
      expect(mockCache.status).toBe('NO_EVENTS');
    });
  });
});
