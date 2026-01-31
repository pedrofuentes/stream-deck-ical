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
import { startPeriodicUpdates, stopPeriodicUpdates, calendarCache, getDebugInfo } from './services/calendar-service.js';
import { logger, isDebugMode } from './utils/logger.js';

// Global settings
let currentUrl: string = '';
let currentTimeWindow: number = 3; // Default 3 days
let updateIntervalId: NodeJS.Timeout | null = null;

/**
 * Initialize plugin - Set log level first
 */
streamDeck.logger.setLevel(LogLevel.TRACE);

/**
 * Register actions - MUST be done before connect()
 */
streamDeck.actions.registerAction(new NextMeetingAction());
streamDeck.actions.registerAction(new TimeLeftAction());

logger.info('Stream Deck iCal Plugin starting...');

/**
 * Handle global settings received
 */
streamDeck.settings.onDidReceiveGlobalSettings((ev) => {
  const settings = ev.settings as any;
  logger.debug('Global settings received:', settings);
  
  const newUrl = (settings.url as string) || '';
  const newTimeWindow = (settings.timeWindow as number) || 3;
  
  // Check if URL or time window changed
  if (newUrl !== currentUrl || newTimeWindow !== currentTimeWindow) {
    logger.info(`Settings changed: URL=${newUrl ? '[set]' : '[empty]'}, timeWindow=${newTimeWindow} days`);
    
    currentUrl = newUrl;
    currentTimeWindow = newTimeWindow;
    
    // Stop existing updates
    if (updateIntervalId) {
      stopPeriodicUpdates(updateIntervalId);
      updateIntervalId = null;
    }
    
    // Start new updates if URL is set
    if (newUrl) {
      updateIntervalId = startPeriodicUpdates(newUrl, newTimeWindow, 10);
    }
  }
});

/**
 * Request global settings on startup
 * Note: getGlobalSettings() returns the settings directly, not an event wrapper
 */
streamDeck.settings.getGlobalSettings().then((settings: any) => {
  logger.debug('Initial global settings:', settings);
  
  // Handle both old format (ev.settings) and direct settings object
  const actualSettings = settings?.settings ?? settings;
  
  currentUrl = (actualSettings?.url as string) || '';
  currentTimeWindow = (actualSettings?.timeWindow as number) || 3;
  
  // Start periodic updates if URL is set
  if (currentUrl) {
    updateIntervalId = startPeriodicUpdates(currentUrl, currentTimeWindow, 10);
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
if (isDebugMode()) {
  logger.info('Debug mode is ENABLED');
}

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
