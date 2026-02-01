/**
 * Tests for NextMeeting and TimeLeft action display logic
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock all dependencies
vi.mock('@elgato/streamdeck', () => ({
  default: {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    }
  },
  action: vi.fn((config) => (target: any) => target),
  SingletonAction: class {}
}));

vi.mock('../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

import { sec2time, secondsUntil } from '../src/utils/time-utils';
import { findNextEvent, findActiveEvents } from '../src/utils/event-utils';
import { CalendarEvent } from '../src/types/index';

// Helper to create test events
function createEvent(startOffset: number, duration: number, summary: string = 'Test Event'): CalendarEvent {
  const now = Date.now();
  return {
    uid: `test-${Math.random()}`,
    summary,
    start: new Date(now + startOffset),
    end: new Date(now + startOffset + duration)
  };
}

describe('NextMeeting display logic', () => {
  describe('countdown display', () => {
    it('should display seconds for < 1 minute', () => {
      const event = createEvent(45000, 3600000); // 45s in future, 1h duration
      const secondsRemaining = secondsUntil(event.start);
      const display = sec2time(secondsRemaining);
      
      expect(display).toMatch(/^\d+s$/);
    });

    it('should display minutes and seconds for < 1 hour', () => {
      const event = createEvent(15 * 60 * 1000, 3600000); // 15 min in future
      const secondsRemaining = secondsUntil(event.start);
      const display = sec2time(secondsRemaining);
      
      expect(display).toMatch(/^\d+m \d+s$/);
    });

    it('should display hours for >= 1 hour', () => {
      const event = createEvent(2 * 60 * 60 * 1000, 3600000); // 2 hours in future
      const secondsRemaining = secondsUntil(event.start);
      const display = sec2time(secondsRemaining);
      
      expect(display).toBe('2h');
    });
  });

  describe('color zone logic', () => {
    const RED_ZONE = 30;
    const ORANGE_ZONE = 300;

    function getColorZone(secondsRemaining: number): 'red' | 'orange' | 'normal' {
      if (secondsRemaining <= RED_ZONE) return 'red';
      if (secondsRemaining <= ORANGE_ZONE) return 'orange';
      return 'normal';
    }

    it('should be red when <= 30 seconds', () => {
      expect(getColorZone(30)).toBe('red');
      expect(getColorZone(15)).toBe('red');
      expect(getColorZone(1)).toBe('red');
      expect(getColorZone(0)).toBe('red');
    });

    it('should be orange when <= 5 minutes but > 30 seconds', () => {
      expect(getColorZone(31)).toBe('orange');
      expect(getColorZone(60)).toBe('orange');
      expect(getColorZone(180)).toBe('orange');
      expect(getColorZone(300)).toBe('orange');
    });

    it('should be normal when > 5 minutes', () => {
      expect(getColorZone(301)).toBe('normal');
      expect(getColorZone(600)).toBe('normal');
      expect(getColorZone(3600)).toBe('normal');
    });
  });

  describe('event finding', () => {
    it('should find the next upcoming event', () => {
      const events = [
        createEvent(-5000, 10000, 'Active'),     // Started 5s ago
        createEvent(30000, 3600000, 'Next'),     // Starts in 30s
        createEvent(3600000, 3600000, 'Later')   // Starts in 1h
      ];

      const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
      const nextEvent = findNextEvent(sorted);

      expect(nextEvent).toBeDefined();
      expect(nextEvent?.summary).toBe('Next');
    });

    it('should return undefined when only active/past events', () => {
      const events = [
        createEvent(-10000, 5000, 'Past'),      // Ended
        createEvent(-5000, 20000, 'Active')     // Currently active
      ];

      const nextEvent = findNextEvent(events);
      expect(nextEvent).toBeUndefined();
    });

    it('should handle empty event list', () => {
      const nextEvent = findNextEvent([]);
      expect(nextEvent).toBeUndefined();
    });
  });
});

describe('TimeLeft display logic', () => {
  describe('countdown display', () => {
    it('should display time remaining until meeting ends', () => {
      const event = createEvent(-30 * 60 * 1000, 60 * 60 * 1000, 'Meeting'); // Started 30m ago, 1h duration
      // Meeting ends in 30 minutes
      const secondsRemaining = Math.floor((event.end.getTime() - Date.now()) / 1000);
      const display = sec2time(secondsRemaining);
      
      expect(display).toMatch(/^\d+m \d+s$/);
      expect(secondsRemaining).toBeGreaterThan(29 * 60);
      expect(secondsRemaining).toBeLessThan(31 * 60);
    });
  });

  describe('active event finding', () => {
    it('should find all active events', () => {
      const events = [
        createEvent(-10000, 20000, 'Active 1'),   // Active
        createEvent(-5000, 20000, 'Active 2'),    // Active
        createEvent(5000, 20000, 'Future'),       // Not started
        createEvent(-30000, 10000, 'Past')        // Ended
      ];

      const activeEvents = findActiveEvents(events);
      expect(activeEvents).toHaveLength(2);
      expect(activeEvents.map(e => e.summary)).toContain('Active 1');
      expect(activeEvents.map(e => e.summary)).toContain('Active 2');
    });

    it('should return empty array when no active events', () => {
      const events = [
        createEvent(5000, 20000, 'Future'),
        createEvent(-30000, 10000, 'Past')
      ];

      const activeEvents = findActiveEvents(events);
      expect(activeEvents).toHaveLength(0);
    });

    it('should find event that just started', () => {
      const events = [
        createEvent(-100, 60000, 'Just Started') // Started 100ms ago
      ];

      const activeEvents = findActiveEvents(events);
      expect(activeEvents).toHaveLength(1);
      expect(activeEvents[0].summary).toBe('Just Started');
    });

    it('should find event about to end', () => {
      const events = [
        createEvent(-59900, 60000, 'About to End') // Started 59.9s ago, ends in 0.1s
      ];

      const activeEvents = findActiveEvents(events);
      expect(activeEvents).toHaveLength(1);
    });
  });

  describe('multiple active meetings', () => {
    it('should use the first active meeting for display', () => {
      const events = [
        createEvent(-3600000, 7200000, 'Long Meeting'),   // 1h in, 1h left
        createEvent(-1800000, 3600000, 'Short Meeting')   // 30m in, 30m left
      ];

      const activeEvents = findActiveEvents(events);
      
      // Both should be active
      expect(activeEvents).toHaveLength(2);
      
      // The first one should be the one that ends first (Short Meeting)
      const sortedByEnd = [...activeEvents].sort(
        (a, b) => a.end.getTime() - b.end.getTime()
      );
      expect(sortedByEnd[0].summary).toBe('Short Meeting');
    });
  });
});

describe('Edge cases', () => {
  describe('meeting transitions', () => {
    it('should handle meeting that just started (0 seconds ago)', () => {
      const event = createEvent(0, 60000, 'Starting Now');
      
      // Should be active
      const isActive = event.start.getTime() <= Date.now() && event.end.getTime() >= Date.now();
      expect(isActive).toBe(true);
    });

    it('should handle meeting ending right now', () => {
      const event = createEvent(-60000, 60000, 'Ending Now'); // Started 1m ago, ends now
      
      // Depending on exact timing, might be active or just ended
      const isActive = event.start.getTime() <= Date.now() && event.end.getTime() >= Date.now();
      const isPast = event.end.getTime() < Date.now();
      
      expect(isActive || isPast).toBe(true);
    });
  });

  describe('all-day events', () => {
    it('should handle very long events (24 hours)', () => {
      const event = createEvent(-12 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 'All Day');
      
      const isActive = event.start.getTime() <= Date.now() && event.end.getTime() >= Date.now();
      expect(isActive).toBe(true);
      
      // Time remaining should be about 12 hours (allow for timing variance)
      const secondsRemaining = Math.floor((event.end.getTime() - Date.now()) / 1000);
      const display = sec2time(secondsRemaining);
      // Could be 11h or 12h depending on when test runs within the minute
      expect(['11h', '12h']).toContain(display);
    });
  });

  describe('event summaries', () => {
    it('should handle empty summary', () => {
      const event = createEvent(5000, 10000, '');
      expect(event.summary).toBe('');
    });

    it('should handle very long summary', () => {
      const longSummary = 'A'.repeat(200);
      const event = createEvent(5000, 10000, longSummary);
      expect(event.summary.length).toBe(200);
    });

    it('should handle special characters in summary', () => {
      const event = createEvent(5000, 10000, 'Meeting: Q1 Review <Confidential> & Planning');
      expect(event.summary).toContain('<');
      expect(event.summary).toContain('&');
    });

    it('should handle unicode in summary', () => {
      const event = createEvent(5000, 10000, '会議 📅 Réunion');
      expect(event.summary).toBe('会議 📅 Réunion');
    });
  });

  describe('zero duration events', () => {
    it('should handle zero duration event (start == end)', () => {
      const event: CalendarEvent = {
        uid: 'test',
        summary: 'Instant Event',
        start: new Date(Date.now() + 5000),
        end: new Date(Date.now() + 5000)
      };
      
      // Should be detected as upcoming, not active
      const isUpcoming = event.start.getTime() > Date.now();
      expect(isUpcoming).toBe(true);
      
      // Once it "happens", it immediately becomes past
      const pastEvent: CalendarEvent = {
        uid: 'test',
        summary: 'Instant Event',
        start: new Date(Date.now() - 1000),
        end: new Date(Date.now() - 1000)
      };
      const isPast = pastEvent.end.getTime() < Date.now();
      expect(isPast).toBe(true);
    });
  });

  describe('negative duration events (invalid data)', () => {
    it('should handle end before start gracefully', () => {
      const event: CalendarEvent = {
        uid: 'test',
        summary: 'Invalid Event',
        start: new Date(Date.now() + 10000),
        end: new Date(Date.now() + 5000) // End before start
      };
      
      // Event utilities should still work, just the logic will be odd
      expect(event.end.getTime()).toBeLessThan(event.start.getTime());
    });
  });
});

describe('Display text formatting', () => {
  describe('No Meeting scenarios', () => {
    it('should show appropriate message when no upcoming meetings', () => {
      const events: CalendarEvent[] = [];
      const nextEvent = findNextEvent(events);
      
      expect(nextEvent).toBeUndefined();
      // Plugin would show "No\nUpcoming\nMeeting"
    });

    it('should show appropriate message when no active meetings', () => {
      const events = [
        createEvent(5000, 10000, 'Future Event')
      ];
      const activeEvents = findActiveEvents(events);
      
      expect(activeEvents).toHaveLength(0);
      // Plugin would show "No\nActive\nMeeting"
    });
  });

  describe('Time formatting edge cases', () => {
    it('should format 0 seconds correctly', () => {
      expect(sec2time(0)).toBe('0s');
    });

    it('should format exactly 1 minute correctly', () => {
      expect(sec2time(60)).toBe('1m 0s');
    });

    it('should format exactly 1 hour correctly', () => {
      expect(sec2time(3600)).toBe('1h');
    });

    it('should format 1 hour 1 minute correctly', () => {
      expect(sec2time(3660)).toBe('1h 1m');
    });
  });
});
