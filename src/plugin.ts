/**
 * Main plugin entry point for Stream Deck iCal Plugin
 * Node.js SDK v2 implementation
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import streamDeck, { LogLevel } from '@elgato/streamdeck';
import { NextMeetingAction } from './actions/next-meeting.js';
import { TimeLeftAction } from './actions/time-left.js';
import { startPeriodicUpdates, stopPeriodicUpdates, calendarCache, getDebugInfo, setFeedConfig, setActionSettings } from './services/calendar-service.js';
import { logger, isDebugMode } from './utils/logger.js';

// Global settings
let currentUrl: string = '';
let currentTimeWindow: number = 3; // Default 3 days
let currentUrlVersion: number = 0; // Track force refresh requests
let currentExcludeAllDay: boolean = true; // Default: exclude all-day events
let currentTitleDisplayDuration: number = 15; // Default: 15 seconds
let currentFlashOnMeetingStart: boolean = true; // Default: enabled
let updateIntervalId: NodeJS.Timeout | null = null;

/**
 * Initialize plugin - Set log level based on debug mode
 * In production: only INFO and above
 * In debug mode: TRACE (everything)
 */
streamDeck.logger.setLevel(isDebugMode() ? LogLevel.TRACE : LogLevel.INFO);

/**
 * Register actions - MUST be done before connect()
 */
streamDeck.actions.registerAction(new NextMeetingAction());
streamDeck.actions.registerAction(new TimeLeftAction());

logger.info('Stream Deck iCal Plugin starting...');
if (isDebugMode()) {
  logger.info('Debug mode is ENABLED');
}

/**
 * Handle global settings received
 */
streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
  const settings = ev.settings as any;
  logger.debug('Global settings received:', JSON.stringify(settings));
  
  const newUrl = (settings.url as string) || '';
  const newTimeWindow = (settings.timeWindow as number) || 3;
  const newUrlVersion = (settings.urlVersion as number) || 0;
  // Handle explicit false vs undefined: undefined = true (default), false = false, true = true
  const newExcludeAllDay = settings.excludeAllDay === undefined ? true : Boolean(settings.excludeAllDay);
  const newTitleDisplayDuration = (settings.titleDisplayDuration as number) || 15;
  const newFlashOnMeetingStart = settings.flashOnMeetingStart === undefined ? true : Boolean(settings.flashOnMeetingStart);
  
  // Check if force refresh was requested (urlVersion changed)
  const forceRefreshRequested = newUrlVersion !== currentUrlVersion && currentUrlVersion !== 0;
  if (forceRefreshRequested) {
    logger.info(`🔄 Force refresh requested from Property Inspector (urlVersion: ${currentUrlVersion} -> ${newUrlVersion})`);
  }
  
  // Check if any setting changed, or force refresh requested
  const settingsChanged = newUrl !== currentUrl || 
                          newTimeWindow !== currentTimeWindow || 
                          newExcludeAllDay !== currentExcludeAllDay;
  
  // Check if action settings changed
  const actionSettingsChanged = newTitleDisplayDuration !== currentTitleDisplayDuration ||
                                newFlashOnMeetingStart !== currentFlashOnMeetingStart;
  
  if (actionSettingsChanged) {
    currentTitleDisplayDuration = newTitleDisplayDuration;
    currentFlashOnMeetingStart = newFlashOnMeetingStart;
    setActionSettings({
      titleDisplayDuration: newTitleDisplayDuration,
      flashOnMeetingStart: newFlashOnMeetingStart
    });
    logger.info(`Action settings updated: titleDisplayDuration=${newTitleDisplayDuration}s, flashOnMeetingStart=${newFlashOnMeetingStart}`);
  }
  
  if (settingsChanged || forceRefreshRequested) {
    logger.info(`Settings changed: URL=${newUrl ? '[set]' : '[empty]'}, timeWindow=${newTimeWindow} days, excludeAllDay=${newExcludeAllDay}`);
    
    currentUrl = newUrl;
    currentTimeWindow = newTimeWindow;
    currentUrlVersion = newUrlVersion;
    currentExcludeAllDay = newExcludeAllDay;
    
    // Update the feed config for force refresh
    setFeedConfig(newUrl, newTimeWindow, newExcludeAllDay);
    
    // Stop existing updates
    if (updateIntervalId) {
      stopPeriodicUpdates(updateIntervalId);
      updateIntervalId = null;
    }
    
    // Start new updates if URL is set
    if (newUrl) {
      updateIntervalId = startPeriodicUpdates(newUrl, newTimeWindow, 10, newExcludeAllDay);
    }
  } else {
    // Just update the urlVersion tracker
    currentUrlVersion = newUrlVersion;
  }
});

/**
 * Request global settings on startup
 * Note: getGlobalSettings() returns the settings directly, not an event wrapper
 */
streamDeck.settings.getGlobalSettings().then((settings: any) => {
  logger.debug('Initial global settings:', JSON.stringify(settings));
  
  // Handle both old format (ev.settings) and direct settings object
  const actualSettings = settings?.settings ?? settings;
  
  currentUrl = (actualSettings?.url as string) || '';
  currentTimeWindow = (actualSettings?.timeWindow as number) || 3;
  // Handle explicit false vs undefined: undefined = true (default), false = false, true = true
  currentExcludeAllDay = actualSettings?.excludeAllDay === undefined ? true : Boolean(actualSettings?.excludeAllDay);
  currentTitleDisplayDuration = (actualSettings?.titleDisplayDuration as number) || 15;
  currentFlashOnMeetingStart = actualSettings?.flashOnMeetingStart === undefined ? true : Boolean(actualSettings?.flashOnMeetingStart);
  
  // Set action settings
  setActionSettings({
    titleDisplayDuration: currentTitleDisplayDuration,
    flashOnMeetingStart: currentFlashOnMeetingStart
  });
  
  logger.info(`📋 Loaded settings: url=${currentUrl ? '[set]' : '[empty]'}, timeWindow=${currentTimeWindow}, excludeAllDay=${currentExcludeAllDay}, titleDisplayDuration=${currentTitleDisplayDuration}s, flashOnMeetingStart=${currentFlashOnMeetingStart}`);
  
  // Start periodic updates if URL is set
  if (currentUrl) {
    updateIntervalId = startPeriodicUpdates(currentUrl, currentTimeWindow, 10, currentExcludeAllDay);
  } else {
    logger.warn('No iCal URL configured');
  }
}).catch((err) => {
  logger.error('Error getting global settings:', err);
});

/**
 * Handle sendToPlugin events from Property Inspector
 */
streamDeck.ui.onSendToPlugin((ev) => {
  logger.info('sendToPlugin received:', ev.payload);
  const payload = ev.payload as any;
  
  if (payload && payload.action === 'getDebugInfo') {
    logger.info('Debug info requested from PI');
    logger.info('streamDeck.ui.current:', streamDeck.ui.current ? 'available' : 'undefined');
    
    // Send debug info back to Property Inspector
    // In SDK v1.x, use streamDeck.ui.current?.sendToPropertyInspector
    if (streamDeck.ui.current) {
      const debugInfo = getDebugInfo();
      logger.info('Sending debug info:', debugInfo);
      streamDeck.ui.current.sendToPropertyInspector({
        action: 'debugInfo',
        data: debugInfo
      } as any);
    } else {
      logger.warn('Cannot send debug info: streamDeck.ui.current is undefined');
    }
  }
});

/**
 * Connect to Stream Deck
 */
streamDeck.connect();

logger.info('Stream Deck iCal Plugin initialized');

/**
 * Handle process termination
 */
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, cleaning up...');
  if (updateIntervalId) {
    stopPeriodicUpdates(updateIntervalId);
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, cleaning up...');
  if (updateIntervalId) {
    stopPeriodicUpdates(updateIntervalId);
  }
  process.exit(0);
});
