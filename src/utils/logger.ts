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

// Precompiled sanitization patterns (this runs on per-second hot paths — keep
// each class as one combined, module-level regex so nothing recompiles per call).
// ANSI CSI sequences: ESC [ ... final-byte
const ANSI_CSI_RE = /\x1b\[[0-9;?]*[ -/]*[@-~]/g;
// OSC sequences: ESC ] ... terminated by BEL or ST
const OSC_RE = /\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g;
// Other single-char escape sequences: ESC <Fe>
const ESC_FE_RE = /\x1b[@-Z\\-_]/g;
// C0 controls (except \t = 09 and \n = 0A) and DEL
const C0_RE = /[\x00-\x08\x0b-\x1f\x7f]/g;
// C1 controls
const C1_RE = /[\x80-\x9f]/g;
// Line/paragraph separators (U+2028/U+2029), bidi overrides (U+202A–202E,
// U+2066–2069), directional marks (U+200E/200F), the word joiner (U+2060), and
// zero-width chars (U+200B–200D, U+FEFF) used for spoofing (#71, #97.3).
const SPOOF_RE = /[\u2028\u2029\u202a-\u202e\u2066-\u2069\u200b-\u200f\u2060\ufeff]/g;
// Raw CR/LF in a non-Error argument — escaped so a feed-controlled string cannot
// start a new line (and thus a forged record) in the log stream (#71/CWE-117).
const NEWLINE_RE = /[\r\n]/g;
// Continuation-line marker for multi-line Error stacks (#71): keeps real line
// breaks but prevents any injected line from presenting as a fresh record.
const STACK_LF_RE = /\n/g;
// User-profile path prefix — Windows C:\Users\name (or C:/Users/name) and
// macOS /Users/name; the drive letter is optional and both slash forms match. /home/<user> and /root
// are also covered, and the username class excludes CR/LF so redaction cannot
// cross a line break and swallow a genuine following stack frame. Applied
// centrally in sanitizeLogMessage so every argument shape is covered, not just
// Error instances (#78.5, #93, #94, #95).
const HOME_PATH_RE = /(?:[a-z]:)?[\\/](?:users|home)[\\/][^\\/\r\n]+|[\\/]root(?=[\\/]|$)/gi;

/**
 * Escape raw CR/LF to their two-character literal forms so a newline injected via
 * an untrusted argument cannot forge a new log record (#71/CWE-117).
 */
function escapeNewlines(s: string): string {
  return s.replace(NEWLINE_RE, ch => (ch === '\n' ? '\\n' : '\\r'));
}

/**
 * Convert an unknown value to a string without ever throwing. String(a) can throw
 * for a null-prototype object or a throwing toString; fall back to the intrinsic
 * Object.prototype.toString as a last resort (#78.1).
 */
function safeString(a: unknown): string {
  try {
    return String(a);
  } catch {
    return Object.prototype.toString.call(a);
  }
}

/**
 * Format an Error for the log buffer. V8 stacks already begin "Error: <message>",
 * so use the stack alone (no message duplication, #78.4) and fall back to
 * name + message when no stack is present. Absolute user-profile paths are redacted
 * (#78.5) and continuation lines are marked so an injected stack line cannot forge
 * a fresh [timestamp] [LEVEL] record (#71).
 */
function formatError(err: Error): string {
  let raw: string;
  try {
    // A non-string stack (e.g. a number) or a throwing stack getter must not let an
    // exception escape logger.error and break the never-throws invariant (#92).
    raw = typeof err.stack === 'string' ? err.stack : `${err.name}: ${err.message}`;
  } catch {
    raw = safeString(err);
  }
  // Home-path redaction is applied centrally in sanitizeLogMessage (#93).
  return raw.replace(STACK_LF_RE, '\n    | ');
}

/**
 * Serialize a single log argument to a string.
 *
 * Error objects carry their message/stack in non-enumerable fields, so plain
 * JSON.stringify(err) collapses to `{}` and destroys the diagnostic — the sole
 * failure signal of background mechanisms like the orphan sweep (#52). Special-
 * case Error to preserve message + stack; other objects serialize as JSON. Raw
 * newlines in non-Error arguments are escaped so they cannot forge records (#71).
 */
function formatArg(a: unknown): string {
  if (a instanceof Error) {
    return formatError(a);
  }
  if (typeof a === 'object' && a !== null) {
    try {
      return escapeNewlines(JSON.stringify(a));
    } catch {
      // Circular / non-serializable object — fall back to a tagged safe string form
      // so a serialization failure is visible, not a bare [object Object] (#96).
      return escapeNewlines(`[unserializable ${safeString(a)}]`);
    }
  }
  return escapeNewlines(safeString(a));
}

/**
 * Strip control sequences that would corrupt the log buffer or a terminal
 * rendering it (#52): ANSI/OSC escape sequences, C0/C1 control chars (except
 * \n and \t), DEL, U+2028/U+2029 separators, and bidi/zero-width spoofing
 * characters (#71). Real newlines from marked Error stacks are preserved.
 */
function sanitizeLogMessage(message: string): string {
  return message
    .replace(ANSI_CSI_RE, '')
    .replace(OSC_RE, '')
    .replace(ESC_FE_RE, '')
    .replace(C0_RE, '')
    .replace(C1_RE, '')
    .replace(SPOOF_RE, '')
    .replace(HOME_PATH_RE, '<home>');
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
