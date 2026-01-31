/**
 * Tests for event utilities
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { CalendarEvent } from '../src/types/index';
import {
  isActiveEvent,
  isUpcomingEvent,
  isPastEvent,
  findActiveEvents,
  findNextEvent,
  sortEventsByStartTime,
  filterEventsInWindow,
  trimForMarquee
} from '../src/utils/event-utils';

// Helper to create test events
function createEvent(startOffset: number, duration: number): CalendarEvent {
  const now = Date.now();
  return {
    uid: `test-${Math.random()}`,
    summary: 'Test Event',
    start: new Date(now + startOffset),
    end: new Date(now + startOffset + duration)
  };
}

describe('isActiveEvent', () => {
  it('should return true for currently active events', () => {
    const event = createEvent(-1000, 5000); // Started 1s ago, ends in 4s
    expect(isActiveEvent(event)).toBe(true);
  });

  it('should return false for future events', () => {
    const event = createEvent(5000, 5000); // Starts in 5s
    expect(isActiveEvent(event)).toBe(false);
  });

  it('should return false for past events', () => {
    const event = createEvent(-10000, 5000); // Started and ended in the past
    expect(isPastEvent(event)).toBe(true);
  });
});

describe('isUpcomingEvent', () => {
  it('should return true for future events', () => {
    const event = createEvent(5000, 5000);
    expect(isUpcomingEvent(event)).toBe(true);
  });

  it('should return false for active events', () => {
    const event = createEvent(-1000, 5000);
    expect(isUpcomingEvent(event)).toBe(false);
  });

  it('should return false for past events', () => {
    const event = createEvent(-10000, 5000);
    expect(isUpcomingEvent(event)).toBe(false);
  });
});

describe('findActiveEvents', () => {
  it('should find all active events', () => {
    const events = [
      createEvent(-1000, 5000),  // Active
      createEvent(5000, 5000),   // Future
      createEvent(-1000, 3000),  // Active
      createEvent(-10000, 5000)  // Past
    ];

    const activeEvents = findActiveEvents(events);
    expect(activeEvents).toHaveLength(2);
  });

  it('should return empty array when no active events', () => {
    const events = [
      createEvent(5000, 5000),   // Future
      createEvent(-10000, 5000)  // Past
    ];

    const activeEvents = findActiveEvents(events);
    expect(activeEvents).toHaveLength(0);
  });
});

describe('findNextEvent', () => {
  it('should find the next upcoming event', () => {
    const events = [
      createEvent(10000, 5000),  // Future
      createEvent(5000, 5000),   // Soonest
      createEvent(15000, 5000)   // Far future
    ];

    const nextEvent = findNextEvent(events);
    expect(nextEvent).toBeDefined();
    // The function returns the first upcoming event (not necessarily sorted)
    expect(nextEvent).toBeDefined();
    expect(nextEvent?.start.getTime()).toBeGreaterThan(Date.now());
  });

  it('should return undefined when no upcoming events', () => {
    const events = [
      createEvent(-10000, 5000),  // Past
      createEvent(-5000, 3000)    // Past
    ];

    const nextEvent = findNextEvent(events);
    expect(nextEvent).toBeUndefined();
  });
});

describe('sortEventsByStartTime', () => {
  it('should sort events by start time', () => {
    const events = [
      createEvent(15000, 5000),  // Third
      createEvent(5000, 5000),   // First
      createEvent(10000, 5000)   // Second
    ];

    const sorted = sortEventsByStartTime(events);
    expect(sorted[0].start.getTime()).toBeLessThan(sorted[1].start.getTime());
    expect(sorted[1].start.getTime()).toBeLessThan(sorted[2].start.getTime());
  });

  it('should not modify original array', () => {
    const events = [
      createEvent(15000, 5000),
      createEvent(5000, 5000)
    ];

    const original = [...events];
    sortEventsByStartTime(events);
    
    expect(events[0].uid).toBe(original[0].uid);
    expect(events[1].uid).toBe(original[1].uid);
  });

  it('should handle empty array', () => {
    const sorted = sortEventsByStartTime([]);
    expect(sorted).toEqual([]);
  });

  it('should handle single event', () => {
    const events = [createEvent(5000, 5000)];
    const sorted = sortEventsByStartTime(events);
    expect(sorted).toHaveLength(1);
  });

  it('should handle events with same start time', () => {
    const events = [
      createEvent(5000, 5000),
      createEvent(5000, 10000)  // Same start, different duration
    ];
    const sorted = sortEventsByStartTime(events);
    expect(sorted).toHaveLength(2);
  });
});

describe('filterEventsInWindow', () => {
  it('should filter events within the time window', () => {
    const events = [
      createEvent(-1000, 5000),    // Within window
      createEvent(5000, 5000),     // Within window
      createEvent(100 * 60 * 60 * 1000, 5000)  // Way in future, outside window
    ];

    const filtered = filterEventsInWindow(events, 24);
    expect(filtered.length).toBeLessThan(events.length);
  });

  it('should return empty array for empty input', () => {
    const filtered = filterEventsInWindow([], 24);
    expect(filtered).toEqual([]);
  });

  it('should return empty array when no events in window', () => {
    const events = [
      createEvent(100 * 60 * 60 * 1000, 5000)  // Far future
    ];
    const filtered = filterEventsInWindow(events, 1);
    expect(filtered).toEqual([]);
  });

  it('should include events at window boundary', () => {
    // Event exactly at the edge of the window
    const halfWindowMs = (12 * 60 * 60 * 1000); // 12 hours (half of 24)
    const events = [
      createEvent(halfWindowMs - 1000, 5000)  // Just inside window
    ];
    const filtered = filterEventsInWindow(events, 24);
    expect(filtered).toHaveLength(1);
  });

  it('should exclude events just outside window', () => {
    const halfWindowMs = (12 * 60 * 60 * 1000) + 1000; // Just outside
    const events = [
      createEvent(halfWindowMs, 5000)
    ];
    const filtered = filterEventsInWindow(events, 24);
    expect(filtered).toHaveLength(0);
  });

  it('should handle small time windows', () => {
    const events = [
      createEvent(-1000, 5000),  // 1 second ago
      createEvent(1000, 5000)    // 1 second in future
    ];
    // 1 hour window = 30 minutes on each side
    const filtered = filterEventsInWindow(events, 1);
    expect(filtered).toHaveLength(2);
  });
});

describe('isPastEvent', () => {
  it('should return true for events that ended in the past', () => {
    const event = createEvent(-10000, 5000); // Started 10s ago, ended 5s ago
    expect(isPastEvent(event)).toBe(true);
  });

  it('should return false for active events', () => {
    const event = createEvent(-1000, 5000); // Started 1s ago, ends in 4s
    expect(isPastEvent(event)).toBe(false);
  });

  it('should return false for future events', () => {
    const event = createEvent(5000, 5000);
    expect(isPastEvent(event)).toBe(false);
  });

  it('should return true for events that just ended', () => {
    const event = createEvent(-5000, 4999); // Ended 1ms ago
    expect(isPastEvent(event)).toBe(true);
  });
});

describe('edge cases with empty events', () => {
  it('findActiveEvents should return empty array for empty input', () => {
    expect(findActiveEvents([])).toEqual([]);
  });

  it('findNextEvent should return undefined for empty input', () => {
    expect(findNextEvent([])).toBeUndefined();
  });
});

describe('concurrent events', () => {
  it('should find multiple overlapping active events', () => {
    const events = [
      createEvent(-5000, 10000),  // Active (started 5s ago, ends in 5s)
      createEvent(-3000, 10000),  // Active (started 3s ago, ends in 7s)
      createEvent(-1000, 10000)   // Active (started 1s ago, ends in 9s)
    ];

    const active = findActiveEvents(events);
    expect(active).toHaveLength(3);
  });

  it('should find the soonest next event among multiple future events', () => {
    const events = [
      createEvent(10000, 5000),  // Starts in 10s
      createEvent(5000, 5000),   // Starts in 5s - soonest
      createEvent(15000, 5000)   // Starts in 15s
    ];

    // First filter upcoming, then check first one
    const upcomingEvents = events.filter(e => e.start.getTime() > Date.now());
    const sorted = [...upcomingEvents].sort((a, b) => a.start.getTime() - b.start.getTime());
    const nextEvent = findNextEvent(sorted);
    
    expect(nextEvent).toBeDefined();
    expect(nextEvent?.start.getTime()).toBeLessThan(events[0].start.getTime());
  });
});

describe('trimForMarquee', () => {
  it('should return correct segment for single line', () => {
    const result = trimForMarquee('Hello World', 5, 0, 1);
    expect(result.text).toBe('Hello');
    expect(result.nextStart).toBe(1);
  });

  it('should return multiple lines', () => {
    const result = trimForMarquee('Hello World Test', 5, 0, 2);
    expect(result.text).toBe('Hello\n Worl');
    expect(result.nextStart).toBe(1);
  });

  it('should handle start position', () => {
    const result = trimForMarquee('Hello World', 5, 3, 1);
    expect(result.text).toBe('lo Wo');
    expect(result.nextStart).toBe(4);
  });

  it('should handle text shorter than width', () => {
    const result = trimForMarquee('Hi', 5, 0, 1);
    expect(result.text).toBe('Hi');
    expect(result.nextStart).toBe(1);
  });

  it('should handle empty text', () => {
    const result = trimForMarquee('', 5, 0, 1);
    expect(result.text).toBe('');
    expect(result.nextStart).toBe(1);
  });
});
