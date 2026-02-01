/**
 * Type definitions for Stream Deck iCal Plugin
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

/**
 * Calendar event with start and end times
 */
export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  status?: string;
  isRecurring?: boolean;
  isAllDay?: boolean;
  rrule?: string;
  exdate?: Date[];
  recurrenceId?: string;
}

/**
 * Parsed calendar data from iCal feed
 */
export interface ParsedCalendar {
  events: CalendarEvent[];
  timezone?: string;
  provider?: 'google' | 'outlook' | 'apple' | 'unknown';
  calendarName?: string;
}

/**
 * RRULE recurrence rule parameters
 */
export interface RecurrenceRule {
  freq: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'HOURLY' | 'MINUTELY' | 'SECONDLY';
  interval?: number;
  count?: number;
  until?: Date;
  byDay?: string[];
  byMonth?: number[];
  byMonthDay?: number[];
  bySetPos?: number[];
}

/**
 * Plugin settings stored per action instance (legacy, kept for compatibility)
 */
export interface PluginSettings {
  url?: string;
  timeWindow?: 1 | 3 | 5 | 7; // days
  lastRefresh?: number;
  urlVersion?: number;
}

/**
 * Named calendar definition stored in global settings
 * Users define calendars once with friendly names, then select by name per button
 */
export interface NamedCalendar {
  id: string;           // UUID for this calendar
  name: string;         // User-friendly name ("Work", "Personal", etc.)
  url: string;          // The iCal URL
  timeWindow?: 1 | 3 | 5 | 7;  // Override global time window
  excludeAllDay?: boolean;     // Override global exclude all-day
}

/**
 * Per-action settings that can override global calendar settings
 * Stored via setSettings() for each action instance
 */
export interface ActionSettings {
  // New: Select calendar by ID (if not set, uses default calendar)
  calendarId?: string;
  
  // Legacy fields - kept for backwards compatibility migration
  useCustomCalendar?: boolean;
  customUrl?: string;
  customLabel?: string;
  customTimeWindow?: 1 | 3 | 5 | 7;
  customExcludeAllDay?: boolean;
}

/**
 * Global settings shared across all actions
 */
export interface GlobalSettings {
  // Legacy single URL (kept for backwards compatibility)
  url?: string;
  urlVersion?: number;
  
  // Named calendars (new approach)
  calendars?: NamedCalendar[];
  defaultCalendarId?: string;  // Which calendar to use by default
  
  // Global defaults
  timeWindow?: 1 | 3 | 5 | 7; // days, default 3
  excludeAllDay?: boolean; // default true
  titleDisplayDuration?: 5 | 10 | 15 | 30; // seconds, default 15
  flashOnMeetingStart?: boolean; // default false
  
  // Color thresholds (in seconds)
  orangeThreshold?: number; // default 300 (5 minutes)
  redThreshold?: number; // default 30 (30 seconds)
}

/**
 * Calendar instance for multi-calendar support
 * Managed by CalendarManager - one instance per unique URL
 */
export interface CalendarInstance {
  id: string; // Hash/identifier for the calendar
  url: string;
  timeWindow: number;
  excludeAllDay: boolean;
  cache: CalendarCache;
  updateInterval?: NodeJS.Timeout;
  refCount: number; // How many actions reference this calendar
}

/**
 * Error states for the plugin
 */
export type ErrorState = 
  | 'INIT'
  | 'LOADING'
  | 'INVALID_URL'
  | 'NETWORK_ERROR'
  | 'PARSE_ERROR'
  | 'NO_EVENTS'
  | 'LOADED';

/**
 * Calendar cache structure
 */
export interface CalendarCache {
  version: number;
  status: ErrorState;
  events: CalendarEvent[];
  lastFetch?: number;
  provider?: string;
}

/**
 * Time zone mapping information
 */
export interface TimezoneInfo {
  windowsName?: string;
  ianaName: string;
  isQuoted: boolean;
}

/**
 * Raw iCal component (from parser)
 */
export interface ICalComponent {
  type: string;
  params?: any[];
  [key: string]: any;
}

/**
 * Expanded event from recurrence rule
 */
export interface ExpandedEvent {
  uid: string;
  summary: string;
  start: Date;
  end: Date;
  recurrenceId?: Date;
  isRecurring: boolean;
  isAllDay?: boolean;
}
