/**
 * Recurrence expander using RRule library
 * Handles RRULE expansion and EXDATE exclusions
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { RRule, RRuleSet, rrulestr } from 'rrule';
import { CalendarEvent, ExpandedEvent } from '../types/index.js';
import { logger } from '../utils/logger.js';

/**
 * Maximum number of occurrences to expand per recurring event.
 * Guards against pathological RRULE patterns that could cause CPU spikes (#26).
 */
const MAX_OCCURRENCES = 500;

/**
 * Parse RRULE string from iCal format
 * @param rruleString - RRULE string (e.g., "FREQ=WEEKLY;BYDAY=MO,WE,FR")
 * @param dtstart - Start date for the recurrence
 * @returns RRule instance
 */
function parseRRule(rruleString: string, dtstart: Date): RRule {
  try {
    // RRule library expects the full RRULE line with DTSTART
    const fullRRule = `DTSTART:${formatDateForRRule(dtstart)}\nRRULE:${rruleString}`;
    return rrulestr(fullRRule) as RRule;
  } catch (error) {
    logger.error('Failed to parse RRULE:', rruleString, error);
    throw error;
  }
}

/**
 * Format date for RRule library (YYYYMMDDTHHMMSSZ)
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
 * Expand a recurring event into individual occurrences
 * @param event - Calendar event with RRULE
 * @param rruleString - RRULE string
 * @param exdates - Array of excluded dates
 * @param startWindow - Start of time window
 * @param endWindow - End of time window
 * @returns Array of expanded event occurrences
 */
export function expandRecurringEvent(
  event: CalendarEvent,
  rruleString: string,
  exdates: Date[] = [],
  startWindow: Date,
  endWindow: Date
): ExpandedEvent[] {
  try {
    const expansionStart = Date.now();

    // Create RRuleSet to handle RRULE and EXDATE together
    const rruleSet = new RRuleSet();
    
    // Parse and add the RRULE
    const rrule = parseRRule(rruleString, event.start);
    rruleSet.rrule(rrule);
    
    // Add EXDATEs
    for (const exdate of exdates) {
      rruleSet.exdate(exdate);
    }
    
    // Get all occurrences within the time window
    const occurrences = rruleSet.between(startWindow, endWindow, true);

    // Guard: cap occurrences to prevent CPU spikes (#26)
    if (occurrences.length > MAX_OCCURRENCES) {
      logger.warn(
        `⚠️ Recurring event "${event.summary}" produced ${occurrences.length} occurrences — capping at ${MAX_OCCURRENCES}`
      );
      occurrences.length = MAX_OCCURRENCES;
    }
    
    // Calculate event duration
    const duration = event.end.getTime() - event.start.getTime();
    
    // Create expanded events
    const expandedEvents: ExpandedEvent[] = occurrences.map(occurrence => {
      const endTime = new Date(occurrence.getTime() + duration);
      
      return {
        uid: event.uid,
        summary: event.summary,
        start: occurrence,
        end: endTime,
        recurrenceId: occurrence,
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
        // This is a recurring event - expand it
        const expanded = expandRecurringEvent(
          event,
          event.rrule,
          event.exdate || [],
          startWindow,
          endWindow
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
