/**
 * Event utilities for filtering and sorting
 */

import { CalendarEvent } from '../types/index.js';

/**
 * Check if an event is currently active (happening now)
 * @param event - Calendar event to check
 * @returns True if event is active
 */
export function isActiveEvent(event: CalendarEvent): boolean {
  const now = Date.now();
  return event.start.getTime() <= now && event.end.getTime() >= now;
}

/**
 * Check if an event is upcoming (in the future)
 * @param event - Calendar event to check
 * @returns True if event is upcoming
 */
export function isUpcomingEvent(event: CalendarEvent): boolean {
  const now = Date.now();
  return event.start.getTime() > now;
}

/**
 * Check if an event is in the past
 * @param event - Calendar event to check
 * @returns True if event is in the past
 */
export function isPastEvent(event: CalendarEvent): boolean {
  const now = Date.now();
  return event.end.getTime() < now;
}

/**
 * Find all active events from a list
 * @param events - Array of calendar events
 * @returns Array of active events
 */
export function findActiveEvents(events: CalendarEvent[]): CalendarEvent[] {
  return events.filter(isActiveEvent);
}

/**
 * Find the next upcoming event from a list
 * @param events - Array of calendar events (should be sorted)
 * @returns Next upcoming event or undefined
 */
export function findNextEvent(events: CalendarEvent[]): CalendarEvent | undefined {
  return events.filter(isUpcomingEvent)[0];
}

/**
 * Sort events by start time (ascending)
 * @param events - Array of calendar events to sort
 * @returns Sorted array of events
 */
export function sortEventsByStartTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
}

/**
 * Filter events within a time window (centered on now)
 * @param events - Array of calendar events
 * @param hours - Total hours for the window (split before/after now)
 * @returns Filtered array of events
 */
export function filterEventsInWindow(events: CalendarEvent[], hours: number): CalendarEvent[] {
  const now = Date.now();
  const spread = (hours * 60 * 60 * 1000) / 2;
  const bottomRange = now - spread;
  const topRange = now + spread;

  return events.filter(event => {
    const eventTime = event.start.getTime();
    return eventTime >= bottomRange && eventTime <= topRange;
  });
}

/**
 * Truncate text for marquee display
 * @param text - Text to truncate
 * @param width - Maximum width per line
 * @param start - Start position
 * @param lines - Number of lines
 * @returns Object with truncated text and next start position
 */
export function trimForMarquee(
  text: string,
  width: number,
  start = 0,
  lines = 1
): { text: string; nextStart: number } {
  let segment = text.slice(start, start + width);

  if (lines > 1) {
    let lineStart = start + width;
    for (let i = 1; i < lines; i++) {
      segment = segment.concat('\n', text.slice(lineStart, lineStart + width));
      lineStart = lineStart + width;
    }
  }

  return {
    text: segment,
    nextStart: start + 1
  };
}
