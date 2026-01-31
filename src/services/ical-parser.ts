/**
 * Enhanced iCal parser with timezone support
 * Based on original ical.js with improvements for timezone handling and provider detection
 */

import { DateTime } from 'luxon';
import { parseTimezone, getTimezoneFromParams } from './timezone-service.js';
import { ParsedCalendar, CalendarEvent, ICalComponent } from '../types/index.js';
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
 * Unescape text per RFC 5545 section 3.3.11
 */
function unescapeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\[nN]/g, '\n')
    .replace(/\\\\/g, '\\');
}

/**
 * Parse parameters from iCal line
 */
function parseParams(params: string[]): Record<string, any> {
  const out: Record<string, any> = {};
  for (const param of params) {
    if (param.indexOf('=') > -1) {
      const [key, ...valueParts] = param.split('=');
      const value = valueParts.join('=');
      out[key] = parseValue(value);
    }
  }
  return out;
}

/**
 * Parse value to appropriate type
 */
function parseValue(val: string): any {
  if (val === 'TRUE') return true;
  if (val === 'FALSE') return false;
  
  const number = Number(val);
  if (!isNaN(number)) return number;
  
  return val;
}

/**
 * Parse date/datetime from iCal format
 */
function parseDate(val: string, params: string[]): Date {
  const cleanVal = unescapeText(val);
  
  // Check if this is a date-only value
  const isDateOnly = params.includes('VALUE=DATE');
  
  if (isDateOnly) {
    // Date only: YYYYMMDD
    const match = /^(\d{4})(\d{2})(\d{2})$/.exec(cleanVal);
    if (match) {
      const [, year, month, day] = match;
      // All-day events are treated as midnight in local timezone
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date;
    }
  }
  
  // DateTime: YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ
  const match = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(cleanVal);
  if (match) {
    const [, year, month, day, hour, minute, second, isUTC] = match;
    
    if (isUTC) {
      // UTC time
      return new Date(Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      ));
    } else {
      // Has timezone info in params
      const timezone = getTimezoneFromParams(params);
      
      try {
        // Use Luxon to parse with timezone
        const dt = DateTime.fromObject({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          hour: parseInt(hour),
          minute: parseInt(minute),
          second: parseInt(second)
        }, { zone: timezone });
        
        if (dt.isValid) {
          return dt.toJSDate();
        }
      } catch (e) {
        logger.warn(`Failed to parse date with timezone ${timezone}:`, e);
      }
      
      // Fallback to local time
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      );
    }
  }
  
  // Fallback: try to parse as ISO string
  try {
    return new Date(cleanVal);
  } catch (e) {
    logger.error('Failed to parse date:', cleanVal);
    return new Date();
  }
}

/**
 * Get line break character from iCal string
 */
function getLineBreakChar(str: string): string {
  const indexOfLF = str.indexOf('\n', 1);
  
  if (indexOfLF === -1) {
    if (str.indexOf('\r') !== -1) return '\r';
    return '\n';
  }
  
  if (str[indexOfLF - 1] === '\r') return '\r\n';
  return '\n';
}

/**
 * Parse iCal string into structured data
 */
export function parseICS(icsContent: string): ParsedCalendar {
  const lineBreak = getLineBreakChar(icsContent);
  const lines = icsContent.split(lineBreak === '\n' ? /\n/ : /\r?\n/);
  
  const components: Record<string, any> = {};
  const stack: any[] = [];
  let currentComponent: any = {};
  let calendarTimezone: string | undefined;
  let prodId: string | undefined;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Unfold lines (RFC 5545 section 3.1)
    while (lines[i + 1] && /[ \t]/.test(lines[i + 1][0])) {
      line += lines[i + 1].slice(1);
      i++;
    }
    
    // Split on colon (but not inside quotes)
    const colonIndex = line.search(/:(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    if (colonIndex === -1) continue;
    
    const key = line.substring(0, colonIndex);
    const value = line.substring(colonIndex + 1);
    
    const keyParts = key.split(';');
    const name = keyParts[0];
    const params = keyParts.slice(1);
    
    // Handle component boundaries
    if (name === 'BEGIN') {
      stack.push(currentComponent);
      currentComponent = { type: value, params: [] };
    } else if (name === 'END') {
      if (value === 'VCALENDAR') {
        // Don't pop the root
        continue;
      }
      
      const parent = stack.pop();
      
      if (currentComponent.type === 'VEVENT' && currentComponent.uid) {
        // Store event by UID
        if (!parent[currentComponent.uid]) {
          parent[currentComponent.uid] = currentComponent;
        } else {
          // Handle recurrence modifications
          if (currentComponent.recurrenceid) {
            if (!parent[currentComponent.uid].recurrences) {
              parent[currentComponent.uid].recurrences = {};
            }
            const dateKey = currentComponent.recurrenceid.toISOString().substring(0, 10);
            parent[currentComponent.uid].recurrences[dateKey] = currentComponent;
          } else {
            // Merge properties
            Object.assign(parent[currentComponent.uid], currentComponent);
          }
        }
      } else {
        parent[Math.random().toString(36)] = currentComponent;
      }
      
      currentComponent = parent;
    } else {
      // Handle properties
      const cleanValue = unescapeText(value);
      
      switch (name) {
        case 'PRODID':
          prodId = cleanValue;
          currentComponent.prodid = cleanValue;
          break;
        case 'SUMMARY':
          currentComponent.summary = cleanValue;
          break;
        case 'DESCRIPTION':
          currentComponent.description = cleanValue;
          break;
        case 'LOCATION':
          currentComponent.location = cleanValue;
          break;
        case 'UID':
          currentComponent.uid = cleanValue;
          break;
        case 'STATUS':
          currentComponent.status = cleanValue;
          break;
        case 'DTSTART':
          currentComponent.start = parseDate(value, params);
          if (!calendarTimezone) {
            calendarTimezone = getTimezoneFromParams(params);
          }
          break;
        case 'DTEND':
          currentComponent.end = parseDate(value, params);
          break;
        case 'RRULE':
          currentComponent.rrule = cleanValue;
          break;
        case 'EXDATE':
          if (!currentComponent.exdate) {
            currentComponent.exdate = [];
          }
          // EXDATE can contain multiple dates separated by commas
          const exdates = value.split(',').map(v => parseDate(v.trim(), params));
          currentComponent.exdate.push(...exdates);
          break;
        case 'RECURRENCE-ID':
          currentComponent.recurrenceid = parseDate(value, params);
          break;
        default:
          // Store custom properties (X-* fields)
          if (name.startsWith('X-')) {
            currentComponent[name.toLowerCase()] = cleanValue;
          }
          break;
      }
    }
  }
  
  // Extract events
  const events: CalendarEvent[] = [];
  
  for (const key in components) {
    const component = components[key];
    if (component.type === 'VEVENT' && component.start && component.end) {
      events.push({
        uid: component.uid || key,
        summary: component.summary || '(No title)',
        description: component.description,
        start: component.start,
        end: component.end,
        location: component.location,
        status: component.status,
        isRecurring: !!component.rrule,
        recurrenceId: component.recurrenceid?.toISOString()
      });
    }
  }
  
  return {
    events,
    timezone: calendarTimezone || 'UTC',
    provider: detectProvider(prodId),
    calendarName: undefined
  };
}

/**
 * Parse iCal feed from string content
 */
export async function parseICalFeed(icsContent: string): Promise<ParsedCalendar> {
  try {
    logger.debug('Parsing iCal feed...');
    const parsed = parseICS(icsContent);
    logger.debug(`Parsed ${parsed.events.length} events from ${parsed.provider} calendar`);
    return parsed;
  } catch (error) {
    logger.error('Error parsing iCal feed:', error);
    throw new Error(`Failed to parse iCal feed: ${error}`);
  }
}
