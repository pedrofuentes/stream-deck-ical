/**
 * Recurrence expander using RRule library
 * Handles RRULE expansion and EXDATE exclusions
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { RRule, RRuleSet, rrulestr } from 'rrule';
import { DateTime } from 'luxon';
import { CalendarEvent, ExpandedEvent } from '../types/index.js';
import { isValidIANATimezone } from './timezone-service.js';
import { logger } from '../utils/logger.js';

/**
 * Maximum number of occurrences to expand per recurring event.
 * Guards against pathological RRULE patterns that could cause CPU spikes (#26).
 */
const MAX_OCCURRENCES = 500;

/**
 * Parse RRULE string from iCal format
 * @param rruleString - RRULE string (e.g., "FREQ=WEEKLY;BYDAY=MO,WE,FR")
 * @param dtstart - Formatted DTSTART value (YYYYMMDDTHHMMSS, optionally with trailing Z)
 * @returns RRule instance
 */
function parseRRule(rruleString: string, dtstart: string): RRule {
  try {
    // RRule library expects the full RRULE line with DTSTART
    const fullRRule = `DTSTART:${dtstart}\nRRULE:${rruleString}`;
    return rrulestr(fullRRule) as RRule;
  } catch (error) {
    logger.error('Failed to parse RRULE:', rruleString, error);
    throw error;
  }
}

/**
 * Format date for RRule library from its UTC components (YYYYMMDDTHHMMSSZ)
 */
function formatDateForRRule(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minute = String(date.getUTCMinutes()).padStart(2, '0');
  const second = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

/**
 * Format the wall-clock components of an instant in an IANA timezone as a
 * naive RRule datetime (YYYYMMDDTHHMMSS, no trailing Z).
 */
function formatWallTimeForRRule(date: Date, zone: string): string {
  return DateTime.fromJSDate(date, { zone }).toFormat("yyyyMMdd'T'HHmmss");
}

/**
 * Convert a real UTC instant to a "wall-clock" Date: a Date whose UTC
 * components equal the local (wall-clock) components of the instant in `zone`.
 * RRule operates on these fake-UTC dates so BYDAY/weekly stepping follow the
 * event's local calendar instead of UTC.
 */
function toWallClockDate(date: Date, zone: string): Date {
  const dt = DateTime.fromJSDate(date, { zone });
  return new Date(Date.UTC(dt.year, dt.month - 1, dt.day, dt.hour, dt.minute, dt.second, dt.millisecond));
}

/**
 * Convert a "wall-clock" Date produced by RRule back to the real UTC instant
 * by interpreting its UTC components as local time in `zone`.
 * Luxon resolves DST-nonexistent/ambiguous local times sanely.
 */
function fromWallClockDate(date: Date, zone: string): Date {
  return DateTime.fromObject({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds()
  }, { zone }).toJSDate();
}

/**
 * Rewrite UTC UNTIL values (UNTIL=YYYYMMDDTHHMMSSZ) inside an RRULE string to
 * the equivalent wall-clock time in `zone`, so the inclusive UNTIL boundary is
 * honored during wall-clock expansion. Date-only UNTIL values are left as-is.
 */
function rewriteUntilForZone(rruleString: string, zone: string): string {
  return rruleString.replace(/UNTIL=(\d{8}T\d{6})Z/g, (_match, stamp: string) => {
    const dt = DateTime.fromFormat(stamp, "yyyyMMdd'T'HHmmss", { zone: 'utc' }).setZone(zone);
    return `UNTIL=${dt.toFormat("yyyyMMdd'T'HHmmss")}`;
  });
}

/**
 * Resolve the IANA timezone to use for wall-clock expansion.
 * Returns undefined when expansion should stay on the plain UTC path
 * (no zone, UTC, floating, or an invalid zone name).
 */
function resolveExpansionZone(eventTimezone: string | undefined, summary: string): string | undefined {
  if (!eventTimezone || eventTimezone === 'UTC' || eventTimezone === 'floating') {
    return undefined;
  }
  if (!isValidIANATimezone(eventTimezone)) {
    logger.warn(`Invalid event timezone "${eventTimezone}" for "${summary}" — falling back to UTC expansion`);
    return undefined;
  }
  return eventTimezone;
}

/**
 * Extract the date portion (YYYY-MM-DD) from an ISO date string or Date object.
 * Used for DST-safe RECURRENCE-ID fallback matching.
 */
function toDateKey(dateOrIso: Date | string): string {
  if (typeof dateOrIso === 'string') {
    return dateOrIso.substring(0, 10);
  }
  return dateOrIso.toISOString().substring(0, 10);
}

/**
 * Expand a recurring event into individual occurrences.
 *
 * When `eventTimezone` is a valid IANA zone (and not UTC), expansion happens
 * in that zone's wall-clock time: BYDAY matches the event's local weekday
 * (#39) and occurrences keep their local time across DST switches (#30).
 * Otherwise expansion falls back to the historical UTC-component behavior.
 *
 * @param event - Calendar event with RRULE
 * @param rruleString - RRULE string
 * @param exdates - Array of excluded dates (real UTC instants)
 * @param startWindow - Start of time window
 * @param endWindow - End of time window
 * @param eventTimezone - IANA timezone of the event (e.g., "America/Chicago")
 * @returns Array of expanded event occurrences
 */
export function expandRecurringEvent(
  event: CalendarEvent,
  rruleString: string,
  exdates: Date[] = [],
  startWindow: Date,
  endWindow: Date,
  eventTimezone?: string
): ExpandedEvent[] {
  try {
    const expansionStart = Date.now();

    const zone = resolveExpansionZone(eventTimezone, event.summary);

    // Build the DTSTART anchor: wall-clock (naive) in the event's zone, or
    // UTC components when no usable zone is available.
    const dtstart = zone
      ? formatWallTimeForRRule(event.start, zone)
      : formatDateForRRule(event.start);
    const effectiveRRule = zone ? rewriteUntilForZone(rruleString, zone) : rruleString;

    // Create RRuleSet to handle RRULE and EXDATE together
    const rruleSet = new RRuleSet();

    // Parse and add the RRULE
    const rrule = parseRRule(effectiveRRule, dtstart);
    rruleSet.rrule(rrule);

    // Add EXDATEs (converted to wall-clock time when expanding in a zone)
    for (const exdate of exdates) {
      rruleSet.exdate(zone ? toWallClockDate(exdate, zone) : exdate);
    }

    // Get all occurrences within the time window (window converted to
    // wall-clock time when expanding in a zone)
    const betweenStart = zone ? toWallClockDate(startWindow, zone) : startWindow;
    const betweenEnd = zone ? toWallClockDate(endWindow, zone) : endWindow;
    const occurrences = rruleSet.between(betweenStart, betweenEnd, true);

    // Guard: cap occurrences to prevent CPU spikes (#26)
    if (occurrences.length > MAX_OCCURRENCES) {
      logger.warn(
        `⚠️ Recurring event "${event.summary}" produced ${occurrences.length} occurrences — capping at ${MAX_OCCURRENCES}`
      );
      occurrences.length = MAX_OCCURRENCES;
    }

    // Calculate event duration
    const duration = event.end.getTime() - event.start.getTime();

    // Create expanded events (converting wall-clock occurrences back to real UTC)
    const expandedEvents: ExpandedEvent[] = occurrences.map(occurrence => {
      const start = zone ? fromWallClockDate(occurrence, zone) : occurrence;
      const endTime = new Date(start.getTime() + duration);

      return {
        uid: event.uid,
        summary: event.summary,
        start,
        end: endTime,
        recurrenceId: start,
        isRecurring: true,
        isAllDay: event.isAllDay
      };
    });

    const elapsed = Date.now() - expansionStart;
    if (elapsed > 100) {
      logger.warn(`⏱️ Slow RRULE expansion for "${event.summary}": ${elapsed}ms (${expandedEvents.length} occurrences)`);
    } else {
      logger.debug(`Expanded recurring event "${event.summary}" into ${expandedEvents.length} occurrences (${elapsed}ms)`);
    }

    return expandedEvents;
  } catch (error) {
    logger.error(`Failed to expand recurring event "${event.summary}":`, error);
    return [];
  }
}

/**
 * Check if a date is excluded by EXDATE
 * @param date - Date to check
 * @param exdates - Array of excluded dates
 * @returns True if date is excluded
 */
export function isDateExcluded(date: Date, exdates: Date[]): boolean {
  const dateStr = date.toISOString().substring(0, 10);
  return exdates.some(exdate => exdate.toISOString().substring(0, 10) === dateStr);
}

/**
 * Process events with RRULEs and expand them into occurrences
 * Handles recurrence exceptions (modified/deleted occurrences via RECURRENCE-ID)
 * @param events - Array of calendar events (may include recurring events)
 * @param startWindow - Start of time window
 * @param endWindow - End of time window
 * @returns Array of all events (both single and expanded recurring)
 */
export function processRecurringEvents(
  events: any[],
  startWindow: Date,
  endWindow: Date
): CalendarEvent[] {
  const processedEvents: CalendarEvent[] = [];

  // First pass: collect all recurrence exceptions (events with recurrenceId)
  // These are modified or deleted occurrences of recurring events
  //
  // We build TWO maps:
  //   exactExceptions: keyed by "uid|<full ISO string>" — for exact UTC match
  //   dateExceptions:  keyed by "uid|<YYYY-MM-DD>" — fallback for DST mismatch (#27)
  //
  // The date-fallback handles the case where RECURRENCE-ID and RRULE-expanded
  // occurrence differ by ±1 hour due to DST transitions. For a given UID, there
  // is almost never more than one occurrence per calendar day.
  const exactExceptions = new Map<string, any>();
  const dateExceptions = new Map<string, any>();

  for (const event of events) {
    if (event.recurrenceId) {
      const exactKey = `${event.uid}|${event.recurrenceId}`;
      exactExceptions.set(exactKey, event);
      const dateKey = `${event.uid}|${toDateKey(event.recurrenceId)}`;
      dateExceptions.set(dateKey, event);
    }
  }

  if (exactExceptions.size > 0) {
    logger.info(`Found ${exactExceptions.size} recurrence exception(s)`);
  }

  for (const event of events) {
    try {
      // Skip recurrence exceptions - they'll replace expanded occurrences
      if (event.recurrenceId) {
        // If it's not cancelled, add it as a standalone event (modified occurrence)
        if (event.status !== 'CANCELLED' && event.start >= startWindow && event.start <= endWindow) {
          processedEvents.push(event);
        }
        continue;
      }

      if (event.rrule) {
        // This is a recurring event - expand it in the event's timezone (#39, #30)
        const expanded = expandRecurringEvent(
          event,
          event.rrule,
          event.exdate || [],
          startWindow,
          endWindow,
          event.eventTimezone
        );

        // Convert expanded events to CalendarEvent format
        // Skip occurrences that have been overridden by recurrence exceptions
        for (const exp of expanded) {
          // Try exact UTC match first, then fall back to date-only match (#27 DST fix)
          const exactKey = `${event.uid}|${exp.start.toISOString()}`;
          const dateKey = `${event.uid}|${toDateKey(exp.start)}`;
          const exception = exactExceptions.get(exactKey) || dateExceptions.get(dateKey);

          if (exception) {
            // This occurrence has been modified or deleted - skip expanded version
            logger.debug(`Skipping occurrence ${exp.summary} at ${exp.start.toISOString()} - has recurrence exception`);
            continue;
          }

          processedEvents.push({
            uid: exp.uid,
            summary: exp.summary,
            description: event.description,
            start: exp.start,
            end: exp.end,
            location: event.location,
            status: event.status,
            isRecurring: true,
            isAllDay: exp.isAllDay,
            recurrenceId: exp.recurrenceId?.toISOString(),
            eventTimezone: event.eventTimezone
          });
        }
      } else {
        // This is a single event - include as-is if it's within the window
        if (event.start >= startWindow && event.start <= endWindow) {
          processedEvents.push(event);
        }
      }
    } catch (error) {
      // Per-event error isolation (#26) — one bad event should not break the entire calendar
      logger.error(`Failed to process event "${event.summary || event.uid}":`, error);
    }
  }

  // Sort by start time
  processedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

  return processedEvents;
}
