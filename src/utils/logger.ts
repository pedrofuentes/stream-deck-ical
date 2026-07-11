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
// Character codes used by the home-path scanner below.
const CODE_BACKSLASH = 0x5c; // \
const CODE_SLASH = 0x2f; // /
const CODE_QUOTE = 0x22; // "
const CODE_COLON = 0x3a; // :
const CODE_CR = 0x0d; // \r
const CODE_LF = 0x0a; // \n

/** A path separator: backslash or forward slash. */
function isSepCode(code: number): boolean {
  return code === CODE_BACKSLASH || code === CODE_SLASH;
}

/**
 * Redact user-home path prefixes: Windows C:\Users\name (or C:/Users/name),
 * macOS /Users/name, Linux /home/name and /root; the drive letter is optional
 * (#78.5, #93, #94, #95, SR-20260711-PR105).
 *
 * Escaping (JSON.stringify doubles backslashes on every stringification; PHP's
 * json_encode emits \/ for /; users paste already-escaped text) means a path
 * separator appears in log text as a RUN of one or more \ and / characters in
 * ANY mix and ANY length. Three review cycles showed that any regex alternation
 * of separator runs only ever ENUMERATES that space (a fixed quantifier leaves
 * a cliff; unbounded quantifiers backtrack catastrophically — ~76s measured on
 * a 200k-backslash non-matching input). So this is a structural, single-pass
 * left-to-right token scanner instead — it closes the class by construction:
 *
 * - Each occurrence of the tokens users/home/root (case-insensitive) is a
 *   candidate. users/home must be immediately preceded by a separator run
 *   (plain loop, no ceiling), optionally preceded by a drive prefix [a-z]:,
 *   and immediately followed by another separator run, then a non-empty
 *   username. The whole span (drive + run + token + run + username) becomes
 *   <home>. The username ends at the next separator, '"' (so a match cannot
 *   swallow a JSON string's closing quote and the sibling keys after it),
 *   CR/LF (redaction cannot cross a line break and swallow a genuine stack
 *   frame, #95), or end of text.
 * - root keeps its prior semantics (no drive prefix, no username): run + root
 *   is replaced when followed by a separator, '"', or end of text; only the
 *   separator run is generalized.
 * - Cursors only move forward and there is no backtracking, so the scan is
 *   O(n) and ReDoS-proof by construction; token positions are cached per token
 *   so failed candidates never rescan earlier text.
 *
 * Used by BOTH redaction layers — the pre-stringify leaf replacer and the
 * final sanitize pass — so every argument shape goes through the same logic.
 * Never throws: plain string/charCode operations only.
 */
function redactHomePaths(text: string): string {
  const lower = text.toLowerCase();
  let out = '';
  let emitted = 0; // text before this index has been emitted or consumed
  let pos = 0; // scan cursor
  let iUsers = lower.indexOf('users');
  let iHome = lower.indexOf('home');
  let iRoot = lower.indexOf('root');
  while (true) {
    // Refresh only stale cached positions (each token is searched over
    // monotonically advancing, disjoint ranges — O(n) total).
    if (iUsers !== -1 && iUsers < pos) iUsers = lower.indexOf('users', pos);
    if (iHome !== -1 && iHome < pos) iHome = lower.indexOf('home', pos);
    if (iRoot !== -1 && iRoot < pos) iRoot = lower.indexOf('root', pos);
    // Earliest candidate token wins (mirrors leftmost-first regex matching).
    let tokenAt = -1;
    let tokenLen = 0;
    let isRoot = false;
    if (iUsers !== -1) {
      tokenAt = iUsers;
      tokenLen = 5;
    }
    if (iHome !== -1 && (tokenAt === -1 || iHome < tokenAt)) {
      tokenAt = iHome;
      tokenLen = 4;
    }
    if (iRoot !== -1 && (tokenAt === -1 || iRoot < tokenAt)) {
      tokenAt = iRoot;
      tokenLen = 4;
      isRoot = true;
    }
    if (tokenAt === -1) break;
    // The token must be immediately preceded by a separator run (any mix of
    // \ and /, any length). Never walk back across already-consumed text.
    let runStart = tokenAt;
    while (runStart > emitted && isSepCode(text.charCodeAt(runStart - 1))) runStart--;
    if (runStart === tokenAt) {
      pos = tokenAt + 1; // prose token ("active users: 12") — not a path
      continue;
    }
    const afterToken = tokenAt + tokenLen;
    if (isRoot) {
      // /root: replace run + token when followed by a separator, '"', or end.
      const next = afterToken < text.length ? text.charCodeAt(afterToken) : -1;
      if (next !== -1 && !isSepCode(next) && next !== CODE_QUOTE) {
        pos = tokenAt + 1;
        continue;
      }
      out += text.slice(emitted, runStart) + '<home>';
      emitted = afterToken;
      pos = afterToken;
      continue;
    }
    // users/home: optional [a-z]: drive prefix directly before the run.
    let spanStart = runStart;
    if (runStart - 2 >= emitted && text.charCodeAt(runStart - 1) === CODE_COLON) {
      const letter = lower.charCodeAt(runStart - 2);
      if (letter >= 0x61 && letter <= 0x7a) spanStart = runStart - 2;
    }
    // Separator run after the token.
    let nameStart = afterToken;
    while (nameStart < text.length && isSepCode(text.charCodeAt(nameStart))) nameStart++;
    if (nameStart === afterToken) {
      pos = tokenAt + 1;
      continue;
    }
    // Username: one or more chars up to the next separator, '"', CR, LF, or end.
    let nameEnd = nameStart;
    while (nameEnd < text.length) {
      const c = text.charCodeAt(nameEnd);
      if (isSepCode(c) || c === CODE_QUOTE || c === CODE_CR || c === CODE_LF) break;
      nameEnd++;
    }
    if (nameEnd === nameStart) {
      pos = tokenAt + 1;
      continue;
    }
    out += text.slice(emitted, spanStart) + '<home>';
    emitted = nameEnd;
    pos = nameEnd;
  }
  if (emitted === 0) return text; // no match — avoid rebuilding the string
  return out + text.slice(emitted);
}

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
/**
 * JSON.stringify replacer that redacts home paths inside string values BEFORE
 * backslash-doubling can split the path separators (SR-20260711-PR105). The
 * typeof guard means redactHomePaths only ever runs on a genuine string, and
 * the scanner itself cannot throw; anything a hostile toJSON throws inside
 * JSON.stringify is caught by formatArg's fallback.
 */
const redactHomePathsReplacer = (_key: string, value: unknown): unknown =>
  typeof value === 'string' ? redactHomePaths(value) : value;

function formatArg(a: unknown): string {
  if (a instanceof Error) {
    return formatError(a);
  }
  if (typeof a === 'object' && a !== null) {
    try {
      return escapeNewlines(JSON.stringify(a, redactHomePathsReplacer));
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
  return redactHomePaths(
    message
      .replace(ANSI_CSI_RE, '')
      .replace(OSC_RE, '')
      .replace(ESC_FE_RE, '')
      .replace(C0_RE, '')
      .replace(C1_RE, '')
      .replace(SPOOF_RE, '')
  );
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
