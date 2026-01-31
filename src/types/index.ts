/**
 * Type definitions for Stream Deck iCal Plugin
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
 * Plugin settings stored per action instance
 */
export interface PluginSettings {
  url?: string;
  timeWindow?: 1 | 3 | 5 | 7; // days
  lastRefresh?: number;
  urlVersion?: number;
}

/**
 * Global settings shared across all actions
 */
export interface GlobalSettings {
  url: string;
  urlVersion: number;
  timeWindow: 1 | 3 | 5 | 7; // days
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
}
