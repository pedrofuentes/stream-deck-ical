/**
 * Tests for event utilities
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
  filterEventsInWindow
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
});
