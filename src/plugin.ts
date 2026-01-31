/**
 * Main plugin entry point for Stream Deck iCal Plugin
 * Node.js SDK v2 implementation
 */

import streamDeck, { LogLevel } from '@elgato/streamdeck';
import { NextMeetingAction } from './actions/next-meeting.js';
import { TimeLeftAction } from './actions/time-left.js';
import { startPeriodicUpdates, stopPeriodicUpdates, calendarCache } from './services/calendar-service.js';
import { logger } from './utils/logger.js';

// Global settings
let currentUrl: string = '';
let currentTimeWindow: number = 3; // Default 3 days
let updateIntervalId: NodeJS.Timeout | null = null;

/**
 * Initialize plugin
 */
streamDeck.logger.setLevel(LogLevel.TRACE);

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
 */
streamDeck.settings.getGlobalSettings().then((ev) => {
  const settings = ev.settings as any;
  logger.debug('Initial global settings:', settings);
  
  currentUrl = (settings.url as string) || '';
  currentTimeWindow = (settings.timeWindow as number) || 3;
  
  // Start periodic updates if URL is set
  if (currentUrl) {
    updateIntervalId = startPeriodicUpdates(currentUrl, currentTimeWindow, 10);
  } else {
    logger.warn('No iCal URL configured');
  }
});

/**
 * Register actions
 */
// Actions are registered via decorators

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
