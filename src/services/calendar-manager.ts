/**
 * Calendar Manager - Manages multiple calendar instances for per-action settings
 * 
 * This service enables different Stream Deck buttons to use different calendars.
 * Calendars are deduplicated by URL - if two buttons use the same URL, they share
 * the same cache and fetch cycle.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { CalendarCache, CalendarEvent, CalendarInstance, ErrorState, GlobalSettings } from '../types/index.js';
import { parseICalFeed } from './ical-parser.js';
import { processRecurringEvents } from './recurrence-expander.js';
import { sortEventsByStartTime } from '../utils/event-utils.js';
import { logger } from '../utils/logger.js';

/**
 * Generate a unique ID for a calendar based on its URL
 * Uses a simple hash to create a consistent identifier
 */
function generateCalendarId(url: string): string {
  // Simple hash function for URL -> ID
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `cal_${Math.abs(hash).toString(16)}`;
}

/**
 * Validate URL format
 */
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Fetch iCal feed from URL
 */
async function fetchICalFeed(url: string): Promise<string> {
  const startTime = Date.now();
  const urlPreview = url.length > 60 ? url.substring(0, 60) + '...' : url;
  logger.info(`📥 [CalendarManager] Fetching: ${urlPreview}`);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'text/calendar, text/plain, */*'
    }
  });
  
  if (!response.ok) {
    logger.error(`❌ [CalendarManager] Fetch failed: HTTP ${response.status}`);
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const content = await response.text();
  const elapsed = Date.now() - startTime;
  logger.info(`✅ [CalendarManager] Fetch complete: ${content.length} bytes in ${elapsed}ms`);
  
  return content;
}

/**
 * Create a fresh calendar cache object
 */
function createEmptyCache(): CalendarCache {
  return {
    version: 0,
    status: 'INIT',
    events: [],
    lastFetch: undefined,
    provider: undefined
  };
}

/**
 * Calendar Manager class
 * Singleton that manages all calendar instances
 */
class CalendarManager {
  /** Map of calendar ID -> CalendarInstance */
  private calendars: Map<string, CalendarInstance> = new Map();
  
  /** Map of action ID -> calendar ID (which calendar each action uses) */
  private actionToCalendar: Map<string, string> = new Map();
  
  /** Update interval in minutes */
  private readonly UPDATE_INTERVAL_MINUTES = 10;
  
  /** Cached global settings for threshold access */
  private cachedGlobalSettings: GlobalSettings | null = null;
  
  /**
   * Set the global settings (called from plugin.ts when settings are received)
   */
  setGlobalSettings(settings: GlobalSettings): void {
    this.cachedGlobalSettings = settings;
  }
  
  /**
   * Get the cached global settings
   */
  getGlobalSettings(): GlobalSettings | null {
    return this.cachedGlobalSettings;
  }

  /**
   * Get or create a calendar instance for a URL
   * If calendar already exists, returns existing instance
   */
  getOrCreateCalendar(
    url: string,
    timeWindow: number = 3,
    excludeAllDay: boolean = true
  ): CalendarInstance {
    const calendarId = generateCalendarId(url);
    
    let instance = this.calendars.get(calendarId);
    
    if (instance) {
      logger.debug(`[CalendarManager] Reusing existing calendar: ${calendarId}`);
      let needsRefresh = false;
      
      // Update settings if they changed
      // Use larger time window if multiple actions have different windows
      if (timeWindow > instance.timeWindow) {
        instance.timeWindow = timeWindow;
        needsRefresh = true;
      }
      // Update excludeAllDay setting - since all actions using same calendar
      // should have consistent settings, use the latest value
      if (instance.excludeAllDay !== excludeAllDay) {
        logger.debug(`[CalendarManager] Updating excludeAllDay: ${instance.excludeAllDay} -> ${excludeAllDay}`);
        instance.excludeAllDay = excludeAllDay;
        needsRefresh = true;
      }
      
      // If settings changed, trigger a refresh to apply the new settings
      if (needsRefresh) {
        logger.info(`[CalendarManager] Settings changed, refreshing calendar: ${calendarId}`);
        this.refreshCalendar(calendarId).catch(err => {
          logger.error(`[CalendarManager] Failed to refresh calendar after settings change: ${err}`);
        });
      }
      
      return instance;
    }
    
    // Create new calendar instance
    logger.info(`[CalendarManager] Creating new calendar: ${calendarId} for ${url.substring(0, 50)}...`);
    
    instance = {
      id: calendarId,
      url,
      timeWindow,
      excludeAllDay,
      cache: createEmptyCache(),
      refCount: 0
    };
    
    this.calendars.set(calendarId, instance);
    
    // Start periodic updates for this calendar
    this.startUpdates(instance);
    
    return instance;
  }

  /**
   * Register an action to use a specific calendar
   * @returns The calendar ID being used
   */
  registerAction(
    actionId: string,
    url: string,
    timeWindow: number = 3,
    excludeAllDay: boolean = true
  ): string {
    // Unregister from previous calendar if switching
    const previousCalendarId = this.actionToCalendar.get(actionId);
    if (previousCalendarId) {
      this.decrementRefCount(previousCalendarId);
    }
    
    // Get or create the calendar
    const calendar = this.getOrCreateCalendar(url, timeWindow, excludeAllDay);
    
    // Register action -> calendar mapping
    this.actionToCalendar.set(actionId, calendar.id);
    calendar.refCount++;
    
    logger.debug(`[CalendarManager] Action ${actionId} registered to calendar ${calendar.id} (refCount: ${calendar.refCount})`);
    
    return calendar.id;
  }

  /**
   * Unregister an action (e.g., when button disappears)
   */
  unregisterAction(actionId: string): void {
    const calendarId = this.actionToCalendar.get(actionId);
    if (!calendarId) {
      return;
    }
    
    this.actionToCalendar.delete(actionId);
    this.decrementRefCount(calendarId);
    
    logger.debug(`[CalendarManager] Action ${actionId} unregistered`);
  }

  /**
   * Decrement reference count and cleanup if zero
   */
  private decrementRefCount(calendarId: string): void {
    const calendar = this.calendars.get(calendarId);
    if (!calendar) {
      return;
    }
    
    calendar.refCount--;
    
    if (calendar.refCount <= 0) {
      logger.info(`[CalendarManager] Cleaning up unused calendar: ${calendarId}`);
      
      // Stop periodic updates
      if (calendar.updateInterval) {
        clearInterval(calendar.updateInterval);
      }
      
      // Remove from registry
      this.calendars.delete(calendarId);
    }
  }

  /**
   * Get the calendar instance for an action
   */
  getCalendarForAction(actionId: string): CalendarInstance | undefined {
    const calendarId = this.actionToCalendar.get(actionId);
    if (!calendarId) {
      return undefined;
    }
    return this.calendars.get(calendarId);
  }

  /**
   * Get events for a specific action
   */
  getEventsForAction(actionId: string): CalendarEvent[] {
    const calendar = this.getCalendarForAction(actionId);
    if (!calendar) {
      return [];
    }
    return calendar.cache.events;
  }

  /**
   * Get cache status for a specific action
   */
  getStatusForAction(actionId: string): ErrorState {
    const calendar = this.getCalendarForAction(actionId);
    if (!calendar) {
      return 'INIT';
    }
    return calendar.cache.status;
  }

  /**
   * Force refresh a specific calendar by ID
   */
  async refreshCalendar(calendarId: string): Promise<void> {
    const calendar = this.calendars.get(calendarId);
    if (!calendar) {
      logger.warn(`[CalendarManager] Cannot refresh: calendar ${calendarId} not found`);
      return;
    }
    
    await this.updateCalendarCache(calendar);
  }

  /**
   * Force refresh the calendar for a specific action
   */
  async refreshCalendarForAction(actionId: string): Promise<void> {
    const calendarId = this.actionToCalendar.get(actionId);
    if (!calendarId) {
      logger.warn(`[CalendarManager] Cannot refresh: action ${actionId} has no calendar`);
      return;
    }
    
    await this.refreshCalendar(calendarId);
  }

  /**
   * Force refresh ALL calendars
   * Used when user clicks "Force Refresh" in settings
   */
  async refreshAllCalendars(): Promise<void> {
    const calendarCount = this.calendars.size;
    logger.info(`🔄 [CalendarManager] Force refreshing all ${calendarCount} calendars...`);
    
    const refreshPromises: Promise<void>[] = [];
    for (const [calendarId, calendar] of this.calendars) {
      logger.debug(`[CalendarManager] Refreshing calendar: ${calendarId}`);
      refreshPromises.push(this.updateCalendarCache(calendar));
    }
    
    await Promise.all(refreshPromises);
    logger.info(`✅ [CalendarManager] All ${calendarCount} calendars refreshed`);
  }

  /**
   * Start periodic updates for a calendar instance
   */
  private startUpdates(calendar: CalendarInstance): void {
    // Initial update
    this.updateCalendarCache(calendar);
    
    // Set up periodic updates
    const intervalMs = this.UPDATE_INTERVAL_MINUTES * 60 * 1000;
    calendar.updateInterval = setInterval(() => {
      this.updateCalendarCache(calendar);
    }, intervalMs);
    
    logger.info(`[CalendarManager] Started updates for ${calendar.id} every ${this.UPDATE_INTERVAL_MINUTES} minutes`);
  }

  /**
   * Update a calendar's cache
   */
  private async updateCalendarCache(calendar: CalendarInstance): Promise<void> {
    const { url, timeWindow, excludeAllDay, cache } = calendar;
    
    if (!url || url.trim() === '') {
      logger.warn(`[CalendarManager] No URL for calendar ${calendar.id}`);
      cache.status = 'INVALID_URL';
      cache.events = [];
      return;
    }
    
    if (!isValidURL(url)) {
      logger.error(`[CalendarManager] Invalid URL for calendar ${calendar.id}`);
      cache.status = 'INVALID_URL';
      cache.events = [];
      return;
    }
    
    try {
      cache.status = 'LOADING';
      logger.info(`[CalendarManager] Updating ${calendar.id} (${timeWindow} day window, excludeAllDay=${excludeAllDay})`);
      
      // Fetch the feed
      const icsContent = await fetchICalFeed(url);
      
      // Parse the feed
      const parsed = await parseICalFeed(icsContent);
      cache.provider = parsed.provider;
      logger.info(`[CalendarManager] Provider: ${parsed.provider || 'unknown'}, ${parsed.events.length} raw events`);
      
      // Calculate time window
      const now = new Date();
      const hoursWindow = timeWindow * 24;
      const startWindow = new Date(now.getTime() - (hoursWindow * 60 * 60 * 1000 / 2));
      const endWindow = new Date(now.getTime() + (hoursWindow * 60 * 60 * 1000 / 2));
      
      // Process recurring events
      let allEvents = processRecurringEvents(parsed.events, startWindow, endWindow);
      logger.info(`[CalendarManager] After recurring expansion: ${allEvents.length} events`);
      
      // Log first few events before filtering for debugging
      const eventsToLog = allEvents.slice(0, 5);
      eventsToLog.forEach((e, i) => {
        logger.info(`[CalendarManager] Event ${i+1}: "${e.summary}" isAllDay=${e.isAllDay} start=${e.start.toISOString()}`);
      });
      
      // Filter out all-day events if setting is enabled
      if (excludeAllDay) {
        const beforeCount = allEvents.length;
        allEvents = allEvents.filter(e => !e.isAllDay);
        const filtered = beforeCount - allEvents.length;
        if (filtered > 0) {
          logger.info(`[CalendarManager] Filtered ${filtered} all-day event(s), ${allEvents.length} remaining`);
        }
      } else {
        logger.info(`[CalendarManager] excludeAllDay=false, keeping all ${allEvents.length} events`);
      }
      
      // Sort by start time
      const sortedEvents = sortEventsByStartTime(allEvents);
      
      // Update cache
      cache.events = sortedEvents;
      cache.status = sortedEvents.length > 0 ? 'LOADED' : 'NO_EVENTS';
      cache.version++;
      cache.lastFetch = Date.now();
      
      logger.info(`[CalendarManager] ✅ ${calendar.id} updated: ${sortedEvents.length} events (v${cache.version})`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`[CalendarManager] ❌ Failed to update ${calendar.id}: ${errorMessage}`);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        cache.status = 'NETWORK_ERROR';
      } else if (error instanceof Error && error.message.includes('parse')) {
        cache.status = 'PARSE_ERROR';
      } else {
        cache.status = 'NETWORK_ERROR';
      }
      
      cache.events = [];
    }
  }

  /**
   * Get all calendar instances (for debugging)
   */
  getAllCalendars(): Map<string, CalendarInstance> {
    return new Map(this.calendars);
  }

  /**
   * Get action-to-calendar mappings (for debugging)
   */
  getActionMappings(): Map<string, string> {
    return new Map(this.actionToCalendar);
  }

  /**
   * Check if a calendar exists by URL
   */
  hasCalendarForUrl(url: string): boolean {
    const calendarId = generateCalendarId(url);
    return this.calendars.has(calendarId);
  }

  /**
   * Clear all calendars (for testing)
   */
  clear(): void {
    // Stop all update intervals
    for (const calendar of this.calendars.values()) {
      if (calendar.updateInterval) {
        clearInterval(calendar.updateInterval);
      }
    }
    
    this.calendars.clear();
    this.actionToCalendar.clear();
    
    logger.info('[CalendarManager] Cleared all calendars');
  }
}

// Export singleton instance
export const calendarManager = new CalendarManager();

// Export the class for testing
export { CalendarManager, generateCalendarId };
