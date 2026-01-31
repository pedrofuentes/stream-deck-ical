/**
 * Logger utility for debugging
 * Uses Stream Deck SDK logger for proper log file output
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import streamDeck from '@elgato/streamdeck';

// Debug mode is controlled ONLY by STREAMDECK_DEBUG environment variable
// This is replaced at build time by rollup
const DEBUG_MODE = process.env.STREAMDECK_DEBUG === '1' || process.env.STREAMDECK_DEBUG === 'true';

/**
 * Debug log entry for UI display
 */
export interface DebugLogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
}

/**
 * Debug log store - keeps last 50 entries for UI display
 */
export const debugLogs: DebugLogEntry[] = [];
const MAX_DEBUG_LOGS = 50;

/**
 * Add entry to debug log store
 */
function addDebugLog(level: DebugLogEntry['level'], ...args: any[]): void {
  const entry: DebugLogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
  };
  
  debugLogs.push(entry);
  
  // Keep only last MAX_DEBUG_LOGS entries
  while (debugLogs.length > MAX_DEBUG_LOGS) {
    debugLogs.shift();
  }
}

/**
 * Check if debug mode is enabled
 * Only returns true when STREAMDECK_DEBUG=1 or STREAMDECK_DEBUG=true
 */
export function isDebugMode(): boolean {
  return DEBUG_MODE;
}

export const logger = {
  debug: (...args: any[]): void => {
    const message = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    streamDeck.logger.debug(message);
    // Always add to debug logs for the debug panel
    addDebugLog('debug', ...args);
  },

  info: (...args: any[]): void => {
    const message = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    streamDeck.logger.info(message);
    // Always add to debug logs for the debug panel
    addDebugLog('info', ...args);
  },

  warn: (...args: any[]): void => {
    const message = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    streamDeck.logger.warn(message);
    // Always add to debug logs for the debug panel
    addDebugLog('warn', ...args);
  },

  error: (...args: any[]): void => {
    const message = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    streamDeck.logger.error(message);
    // Always add to debug logs for the debug panel
    addDebugLog('error', ...args);
  }
};
