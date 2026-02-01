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
 * Per-action settings that can override global calendar settings
 * Stored via setSettings() for each action instance
 */
export interface ActionSettings {
  // Custom calendar override (if not set or false, uses global)
  useCustomCalendar?: boolean;
  customUrl?: string;
  customLabel?: string; // User-friendly name for PI organization
  customTimeWindow?: 1 | 3 | 5 | 7;
  customExcludeAllDay?: boolean;
}

/**
 * Global settings shared across all actions
 */
export interface GlobalSettings {
  url: string;
  urlVersion: number;
  timeWindow: 1 | 3 | 5 | 7; // days
  excludeAllDay?: boolean; // default true
  titleDisplayDuration?: 5 | 10 | 15 | 30; // seconds, default 15
  flashOnMeetingStart?: boolean; // default false
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
