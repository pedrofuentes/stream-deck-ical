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
 * Debug log store - keeps last 500 entries for diagnostics export
 */
export const debugLogs: DebugLogEntry[] = [];
const MAX_DEBUG_LOGS = 500;

/**
 * Serialize a single log argument to a string.
 *
 * Error objects carry their message/stack in non-enumerable fields, so plain
 * JSON.stringify(err) collapses to `{}` and destroys the diagnostic — the sole
 * failure signal of background mechanisms like the orphan sweep (#52). Special-
 * case Error to preserve message + stack; other objects serialize as JSON.
 */
function formatArg(a: unknown): string {
  if (a instanceof Error) {
    return a.stack ? `${a.message}\n${a.stack}` : a.message;
  }
  if (typeof a === 'object' && a !== null) {
    try {
      return JSON.stringify(a);
    } catch {
      // Circular / non-serializable object — fall back to a safe string form.
      return String(a);
    }
  }
  return String(a);
}

/**
 * Strip control sequences that would corrupt the log buffer or a terminal
 * rendering it (#52): ANSI/OSC escape sequences, C0/C1 control chars (except
 * \n and \t), DEL, and the U+2028/U+2029 line/paragraph separators.
 */
function sanitizeLogMessage(message: string): string {
  return message
    // ANSI CSI sequences: ESC [ ... final-byte
    .replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, '')
    // OSC sequences: ESC ] ... terminated by BEL or ST
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, '')
    // Other single-char escape sequences: ESC <Fe>
    .replace(/\x1b[@-Z\\-_]/g, '')
    // C0 controls (except \t = 09 and \n = 0A) and DEL
    .replace(/[\x00-\x08\x0b-\x1f\x7f]/g, '')
    // C1 controls
    .replace(/[\x80-\x9f]/g, '')
    // Line/paragraph separators
    .replace(/[\u2028\u2029]/g, '');
}

/**
 * Build the final, sanitized one-line message from raw log arguments.
 */
function buildMessage(args: unknown[]): string {
  return sanitizeLogMessage(args.map(formatArg).join(' '));
}

/**
 * Add entry to debug log store
 */
function addDebugLog(level: DebugLogEntry['level'], message: string): void {
  const entry: DebugLogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message
  };

  debugLogs.push(entry);

  // Keep only last MAX_DEBUG_LOGS entries
  while (debugLogs.length > MAX_DEBUG_LOGS) {
    debugLogs.shift();
  }
}

/**
 * Get formatted log entries as a string for diagnostics export
 * @param maxEntries - Maximum number of entries to include (default: all)
 */
export function getFormattedLogs(maxEntries?: number): string {
  const entries = maxEntries ? debugLogs.slice(-maxEntries) : debugLogs;
  return entries.map(log =>
    `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`
  ).join('\n');
}

/**
 * Get error/warn entries only (for diagnostics summary)
 */
export function getErrorLogs(): DebugLogEntry[] {
  return debugLogs.filter(log => log.level === 'error' || log.level === 'warn');
}

/**
 * Clear all debug logs
 */
export function clearLogs(): void {
  debugLogs.length = 0;
}

/**
 * Check if debug mode is enabled
 * Only returns true when STREAMDECK_DEBUG=1 or STREAMDECK_DEBUG=true
 */
export function isDebugMode(): boolean {
  return DEBUG_MODE;
}

/**
 * Build a compact one-line summary of a debug-info payload for logging.
 *
 * The full payload embeds the recent log buffer; logging it verbatim would nest
 * previous logs into the buffer on every request, causing unbounded string churn
 * and memory growth (#29). This summary captures status/counts/size only.
 */
export function summarizeDebugInfo(info: unknown): string {
  const data = (info ?? {}) as { cache?: { status?: unknown; eventCount?: unknown }; logs?: unknown };
  const status = data.cache?.status ?? 'unknown';
  const eventCount = data.cache?.eventCount ?? 0;
  const logCount = Array.isArray(data.logs) ? data.logs.length : 0;
  let byteSize = -1;
  try {
    byteSize = JSON.stringify(info).length;
  } catch (error) {
    byteSize = -1;
    // Surface why measurement failed instead of a silent bytes=-1 dead-end (#56.2).
    logger.debug('[summarizeDebugInfo] Failed to measure payload size:', error);
  }
  return `status=${status}, events=${eventCount}, logs=${logCount}, bytes=${byteSize}`;
}

export const logger = {
  debug: (...args: any[]): void => {
    const message = buildMessage(args);
    streamDeck.logger.debug(message);
    // Always add to debug logs for the debug panel
    addDebugLog('debug', message);
  },

  info: (...args: any[]): void => {
    const message = buildMessage(args);
    streamDeck.logger.info(message);
    // Always add to debug logs for the debug panel
    addDebugLog('info', message);
  },

  warn: (...args: any[]): void => {
    const message = buildMessage(args);
    streamDeck.logger.warn(message);
    // Always add to debug logs for the debug panel
    addDebugLog('warn', message);
  },

  error: (...args: any[]): void => {
    const message = buildMessage(args);
    streamDeck.logger.error(message);
    // Always add to debug logs for the debug panel
    addDebugLog('error', message);
  }
};
