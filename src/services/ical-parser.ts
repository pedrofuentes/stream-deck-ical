/**
 * Enhanced iCal parser using Mozilla's ical.js library
 * Provides robust RFC 5545 compliant parsing with timezone support
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import ICAL from 'ical.js';
import { DateTime } from 'luxon';
import { parseTimezone } from './timezone-service.js';
import { ParsedCalendar, CalendarEvent } from '../types/index.js';
import { logger } from '../utils/logger.js';

/**
 * Detect calendar provider from PRODID
 */
function detectProvider(prodId?: string): 'google' | 'outlook' | 'apple' | 'unknown' {
  if (!prodId) return 'unknown';
  
  const lower = prodId.toLowerCase();
  if (lower.includes('google')) return 'google';
  if (lower.includes('microsoft') || lower.includes('outlook')) return 'outlook';
  if (lower.includes('apple') || lower.includes('mac os') || lower.includes('ios')) return 'apple';
  
  return 'unknown';
}

/**
 * Convert ICAL.Time to JavaScript Date
 * Handles timezone conversion properly
 */
function icalTimeToDate(icalTime: ICAL.Time, calendarTimezone?: string): Date {
  if (!icalTime) {
    return new Date();
  }

  // If it's a date-only value (all-day event)
  if (icalTime.isDate) {
    return new Date(icalTime.year, icalTime.month - 1, icalTime.day);
  }

  // If the time is in UTC
  if (icalTime.zone && icalTime.zone.tzid === 'UTC') {
    return icalTime.toJSDate();
  }

  // If the time has a specific timezone
  if (icalTime.zone && icalTime.zone.tzid && icalTime.zone.tzid !== 'floating') {
    try {
      // Try to convert the timezone to IANA format if needed
      const tzInfo = parseTimezone(icalTime.zone.tzid);
      const dt = DateTime.fromObject({
        year: icalTime.year,
        month: icalTime.month,
        day: icalTime.day,
        hour: icalTime.hour,
        minute: icalTime.minute,
        second: icalTime.second
      }, { zone: tzInfo.ianaName });

      if (dt.isValid) {
        return dt.toJSDate();
      }
    } catch (e) {
      logger.warn(`Failed to parse timezone ${icalTime.zone.tzid}:`, e);
    }
  }

  // Fallback: use calendar timezone or treat as local time
  if (calendarTimezone) {
    try {
      const tzInfo = parseTimezone(calendarTimezone);
      const dt = DateTime.fromObject({
        year: icalTime.year,
        month: icalTime.month,
        day: icalTime.day,
        hour: icalTime.hour,
        minute: icalTime.minute,
        second: icalTime.second
      }, { zone: tzInfo.ianaName });

      if (dt.isValid) {
        return dt.toJSDate();
      }
    } catch (e) {
      logger.warn(`Failed to use calendar timezone ${calendarTimezone}:`, e);
    }
  }

  // Final fallback: treat as local time
  return new Date(
    icalTime.year,
    icalTime.month - 1,
    icalTime.day,
    icalTime.hour,
    icalTime.minute,
    icalTime.second
  );
}

/**
 * Extract calendar-level timezone from various sources
 */
function extractCalendarTimezone(vcalendar: ICAL.Component): string | undefined {
  // Try X-WR-TIMEZONE first (common in Google, Apple calendars)
  const xWrTimezone = vcalendar.getFirstPropertyValue('x-wr-timezone');
  if (xWrTimezone) {
    return parseTimezone(xWrTimezone.toString()).ianaName;
  }

  // Try to get timezone from first VTIMEZONE component
  const vtimezone = vcalendar.getFirstSubcomponent('vtimezone');
  if (vtimezone) {
    const tzid = vtimezone.getFirstPropertyValue('tzid');
    if (tzid) {
      return parseTimezone(tzid.toString()).ianaName;
    }
  }

  return undefined;
}

/**
 * Parse iCal string into structured data using ical.js
 */
export function parseICS(icsContent: string): ParsedCalendar {
  // Parse the iCal data
  const jcalData = ICAL.parse(icsContent);
  const vcalendar = new ICAL.Component(jcalData);

  // Extract calendar metadata
  const prodId = vcalendar.getFirstPropertyValue('prodid')?.toString();
  const calendarName = vcalendar.getFirstPropertyValue('x-wr-calname')?.toString();
  const calendarTimezone = extractCalendarTimezone(vcalendar);

  // Register any VTIMEZONE components with ical.js
  const vtimezones = vcalendar.getAllSubcomponents('vtimezone');
  for (const vtz of vtimezones) {
    try {
      const timezone = new ICAL.Timezone(vtz);
      ICAL.TimezoneService.register(timezone);
    } catch (e) {
      logger.warn('Failed to register timezone:', e);
    }
  }

  // Extract events
  const events: CalendarEvent[] = [];
  const vevents = vcalendar.getAllSubcomponents('vevent');

  for (const vevent of vevents) {
    try {
      const event = new ICAL.Event(vevent);
      
      // Get start and end times
      const startTime = event.startDate;
      const endTime = event.endDate;

      // Skip events without proper start/end times
      if (!startTime || !endTime) {
        logger.warn(`Skipping event without start/end: ${event.summary}`);
        continue;
      }

      const start = icalTimeToDate(startTime, calendarTimezone);
      const end = icalTimeToDate(endTime, calendarTimezone);

      // Debug logging for time parsing
      logger.info(`📅 Parsing event: "${event.summary}"`);
      logger.info(`   Raw DTSTART: ${startTime.toString()}, zone: ${startTime.zone?.tzid || 'none'}`);
      logger.info(`   Parsed start: ${start.toISOString()} (local: ${start.toLocaleString()})`);

      // Check for recurrence
      const rruleProp = vevent.getFirstPropertyValue('rrule');
      const isRecurring = !!rruleProp;
      
      // Extract RRULE string for recurring events
      let rruleString: string | undefined;
      if (rruleProp) {
        rruleString = rruleProp.toString();
        logger.info(`   RRULE: ${rruleString}`);
      }

      // Get EXDATE exclusions
      const exdates: Date[] = [];
      const exdateProps = vevent.getAllProperties('exdate');
      for (const exdateProp of exdateProps) {
        const exdateValue = exdateProp.getFirstValue() as ICAL.Time;
        if (exdateValue) {
          exdates.push(icalTimeToDate(exdateValue, calendarTimezone));
        }
      }

      // Get recurrence-id if this is a recurrence exception
      const recurrenceIdProp = vevent.getFirstProperty('recurrence-id');
      let recurrenceId: string | undefined;
      if (recurrenceIdProp) {
        const recIdTime = recurrenceIdProp.getFirstValue() as ICAL.Time;
        if (recIdTime) {
          recurrenceId = icalTimeToDate(recIdTime, calendarTimezone).toISOString();
        }
      }

      events.push({
        uid: event.uid || `generated-${Math.random().toString(36)}`,
        summary: event.summary || '(No title)',
        description: event.description || undefined,
        start,
        end,
        location: event.location || undefined,
        status: vevent.getFirstPropertyValue('status')?.toString(),
        isRecurring,
        rrule: rruleString,
        exdate: exdates,
        recurrenceId
      });
    } catch (e) {
      logger.error('Failed to parse event:', e);
    }
  }

  return {
    events,
    timezone: calendarTimezone || 'UTC',
    provider: detectProvider(prodId),
    calendarName
  };
}

/**
 * Parse iCal feed from string content
 */
export async function parseICalFeed(icsContent: string): Promise<ParsedCalendar> {
  try {
    logger.debug('Parsing iCal feed with ical.js...');
    const parsed = parseICS(icsContent);
    logger.debug(`Parsed ${parsed.events.length} events from ${parsed.provider} calendar`);
    return parsed;
  } catch (error) {
    logger.error('Error parsing iCal feed:', error);
    throw new Error(`Failed to parse iCal feed: ${error}`);
  }
}
