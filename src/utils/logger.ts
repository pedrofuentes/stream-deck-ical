/**
 * Logger utility for debugging
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

const DEBUG = process.env.DEBUG === 'true' || process.env.NODE_ENV === 'development';

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
 */
export function isDebugMode(): boolean {
  return DEBUG;
}

export const logger = {
  debug: (...args: any[]): void => {
    if (DEBUG) {
      console.log('[DEBUG]', ...args);
      addDebugLog('debug', ...args);
    }
  },

  info: (...args: any[]): void => {
    console.log('[INFO]', ...args);
    if (DEBUG) {
      addDebugLog('info', ...args);
    }
  },

  warn: (...args: any[]): void => {
    console.warn('[WARN]', ...args);
    if (DEBUG) {
      addDebugLog('warn', ...args);
    }
  },

  error: (...args: any[]): void => {
    console.error('[ERROR]', ...args);
    if (DEBUG) {
      addDebugLog('error', ...args);
    }
  }
};
