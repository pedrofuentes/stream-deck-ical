/**
 * Calendar service for fetching and caching iCal feeds
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { parseICalFeed } from './ical-parser.js';
import { processRecurringEvents } from './recurrence-expander.js';
import { CalendarCache, CalendarEvent, ErrorState } from '../types/index.js';
import { logger, debugLogs, isDebugMode } from '../utils/logger.js';
import { sortEventsByStartTime, filterEventsInWindow } from '../utils/event-utils.js';

/**
 * Global calendar cache
 */
export const calendarCache: CalendarCache = {
  version: 0,
  status: 'INIT',
  events: [],
  lastFetch: undefined,
  provider: undefined
};

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Fetch iCal feed from URL
 * @param url - iCal feed URL
 * @returns iCal feed content as string
 */
async function fetchICalFeed(url: string): Promise<string> {
  const startTime = Date.now();
  const urlPreview = url.length > 60 ? url.substring(0, 60) + '...' : url;
  logger.info(`📥 Fetching iCal feed: ${urlPreview}`);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'text/calendar, text/plain, */*'
    }
  });
  
  if (!response.ok) {
    logger.error(`❌ Fetch failed: HTTP ${response.status} ${response.statusText}`);
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const content = await response.text();
  const elapsed = Date.now() - startTime;
  logger.info(`✅ Fetch successful: ${content.length} bytes in ${elapsed}ms`);
  
  return content;
}

/**
 * Update calendar cache with new events
 * @param url - iCal feed URL
 * @param timeWindowDays - Number of days to look ahead/behind (default 3)
 * @param excludeAllDay - Whether to exclude all-day events (default true)
 */
export async function updateCalendarCache(
  url: string,
  timeWindowDays: number = 3,
  excludeAllDay: boolean = true
): Promise<void> {
  if (!url || url.trim() === '') {
    logger.warn('No URL provided, skipping cache update');
    calendarCache.status = 'INVALID_URL';
    calendarCache.events = [];
    return;
  }
  
  if (!isValidURL(url)) {
    logger.error('Invalid URL format:', url);
    calendarCache.status = 'INVALID_URL';
    calendarCache.events = [];
    return;
  }
  
  try {
    calendarCache.status = 'LOADING';
    logger.info(`🔄 Updating calendar cache (${timeWindowDays} day window, excludeAllDay=${excludeAllDay})...`);
    
    // Fetch the feed
    const icsContent = await fetchICalFeed(url);
    
    // Parse the feed
    const parsed = await parseICalFeed(icsContent);
    calendarCache.provider = parsed.provider;
    logger.info(`📅 Provider detected: ${parsed.provider || 'unknown'}, parsed ${parsed.events.length} raw events`);
    
    // Calculate time window
    const now = new Date();
    const hoursWindow = timeWindowDays * 24;
    const startWindow = new Date(now.getTime() - (hoursWindow * 60 * 60 * 1000 / 2));
    const endWindow = new Date(now.getTime() + (hoursWindow * 60 * 60 * 1000 / 2));
    
    logger.debug(`Time window: ${startWindow.toISOString()} to ${endWindow.toISOString()}`);
    
    // Process recurring events and filter to time window
    let allEvents = processRecurringEvents(parsed.events, startWindow, endWindow);
    
    // Filter out all-day events if setting is enabled
    if (excludeAllDay) {
      const beforeCount = allEvents.length;
      allEvents = allEvents.filter(e => !e.isAllDay);
      const filtered = beforeCount - allEvents.length;
      if (filtered > 0) {
        logger.info(`📅 Filtered out ${filtered} all-day event(s)`);
      }
    }
    
    // Sort by start time
    const sortedEvents = sortEventsByStartTime(allEvents);
    
    // Update cache
    calendarCache.events = sortedEvents;
    calendarCache.status = sortedEvents.length > 0 ? 'LOADED' : 'NO_EVENTS';
    calendarCache.version++;
    calendarCache.lastFetch = Date.now();
    
    logger.info(`✅ Cache updated successfully: ${sortedEvents.length} events in window (version ${calendarCache.version})`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`❌ Failed to update calendar cache: ${errorMessage}`);
    
    // Determine error type
    if (error instanceof TypeError && error.message.includes('fetch')) {
      calendarCache.status = 'NETWORK_ERROR';
    } else if (error instanceof Error && error.message.includes('parse')) {
      calendarCache.status = 'PARSE_ERROR';
    } else {
      calendarCache.status = 'NETWORK_ERROR';
    }
    
    calendarCache.events = [];
  }
}

/**
 * Get status text for display on Stream Deck button
 * @param status - Current error state
 * @returns Display text
 */
export function getStatusText(status: ErrorState): string {
  switch (status) {
    case 'INIT':
      return 'Loading\niCal';
    case 'LOADING':
      return 'Loading\niCal';
    case 'INVALID_URL':
      return 'Please\nSetup';
    case 'NETWORK_ERROR':
      return 'Network\nError';
    case 'PARSE_ERROR':
      return 'Parse\nError';
    case 'NO_EVENTS':
      return 'No\nMeetings\nFound';
    case 'LOADED':
      return '';
    default:
      return 'Error';
  }
}

/**
 * Start periodic calendar updates
 * @param url - iCal feed URL
 * @param timeWindowDays - Number of days to look ahead/behind
 * @param updateIntervalMinutes - Update frequency in minutes (default 10)
 * @param excludeAllDay - Whether to exclude all-day events (default true)
 * @returns Interval ID for cleanup
 */
export function startPeriodicUpdates(
  url: string,
  timeWindowDays: number = 3,
  updateIntervalMinutes: number = 10,
  excludeAllDay: boolean = true
): NodeJS.Timeout {
  // Initial update
  updateCalendarCache(url, timeWindowDays, excludeAllDay);
  
  // Set up periodic updates
  const intervalMs = updateIntervalMinutes * 60 * 1000;
  const intervalId = setInterval(() => {
    updateCalendarCache(url, timeWindowDays, excludeAllDay);
  }, intervalMs);
  
  logger.info(`Started periodic updates every ${updateIntervalMinutes} minutes`);
  
  return intervalId;
}

/**
 * Stop periodic updates
 * @param intervalId - Interval ID returned by startPeriodicUpdates
 */
export function stopPeriodicUpdates(intervalId: NodeJS.Timeout): void {
  clearInterval(intervalId);
  logger.info('Stopped periodic updates');
}

// Store current URL and time window for force refresh
let currentFeedUrl: string = '';
let currentTimeWindow: number = 3;
let currentExcludeAllDay: boolean = true;

// Store all settings for access by actions
interface ActionSettings {
  titleDisplayDuration: number;
  flashOnMeetingStart: boolean;
}

let currentSettings: ActionSettings = {
  titleDisplayDuration: 15,
  flashOnMeetingStart: true
};

/**
 * Set current feed configuration (called by plugin when settings change)
 */
export function setFeedConfig(url: string, timeWindowDays: number, excludeAllDay: boolean = true): void {
  currentFeedUrl = url;
  currentTimeWindow = timeWindowDays;
  currentExcludeAllDay = excludeAllDay;
}

/**
 * Set action-related settings (called by plugin when settings change)
 */
export function setActionSettings(settings: Partial<ActionSettings>): void {
  currentSettings = {
    ...currentSettings,
    ...settings
  };
  logger.debug(`Action settings updated: titleDisplayDuration=${currentSettings.titleDisplayDuration}s, flashOnMeetingStart=${currentSettings.flashOnMeetingStart}`);
}

/**
 * Get current action settings
 */
export function getSettings(): ActionSettings {
  return { ...currentSettings };
}

/**
 * Force refresh the calendar cache (triggered by double-press)
 * @returns Promise that resolves when refresh is complete
 */
export async function forceRefreshCache(): Promise<void> {
  logger.info('🔄 Force refresh triggered by user');
  
  if (!currentFeedUrl) {
    logger.warn('Cannot force refresh: No URL configured');
    return;
  }
  
  await updateCalendarCache(currentFeedUrl, currentTimeWindow, currentExcludeAllDay);
}

/**
 * Get debug information for Property Inspector
 * @returns Debug info object
 */
export function getDebugInfo(): object {
  return {
    isDebugMode: isDebugMode(),
    cache: {
      status: calendarCache.status,
      version: calendarCache.version,
      eventCount: calendarCache.events.length,
      lastFetch: calendarCache.lastFetch ? new Date(calendarCache.lastFetch).toISOString() : null,
      provider: calendarCache.provider
    },
    events: calendarCache.events.slice(0, 10).map(e => ({
      summary: e.summary,
      start: e.start.toISOString(),
      end: e.end.toISOString(),
      isRecurring: e.isRecurring
    })),
    logs: debugLogs.slice(-20)
  };
}
