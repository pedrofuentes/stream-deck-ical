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
// U+2066–2069) and the Arabic Letter Mark
// (U+061C — completing the Unicode Bidi_Control set), directional marks
// (U+200E/200F), the word joiner (U+2060), and zero-width chars
// (U+200B–200D, U+FEFF) used for spoofing (#71, #97.3, #115).
const SPOOF_RE = /[\u061c\u2028\u2029\u202a-\u202e\u2066-\u2069\u200b-\u200f\u2060\ufeff]/g;
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
const CODE_SPACE = 0x20; // ' '
const CODE_TAB = 0x09; // \t

/** A path separator: backslash or forward slash. */
function isSepCode(code: number): boolean {
  return code === CODE_BACKSLASH || code === CODE_SLASH;
}

/** ASCII letter or digit — the only characters that read as a path-segment continuation (#114). */
function isAsciiAlnumCode(code: number): boolean {
  return (
    (code >= 0x30 && code <= 0x39) || // 0-9
    (code >= 0x41 && code <= 0x5a) || // A-Z
    (code >= 0x61 && code <= 0x7a) // a-z
  );
}

/**
 * Hard username boundary: separator, '"', ':', CR, LF. Colon is illegal in
 * Windows file names and forbidden in POSIX usernames, so it can never occur
 * inside a real username — it is always trailing prose ("for /home/x: net
 * down" keeps its tail, #116). Whitespace is deliberately NOT a boundary:
 * Windows usernames may contain spaces (C:\Users\John Smith), so bounding at
 * whitespace would leak the remainder of the name; when trailing prose with
 * no hard boundary is genuinely ambiguous we over-redact (privacy wins).
 */
function isUsernameBoundaryCode(code: number): boolean {
  return (
    isSepCode(code) || code === CODE_QUOTE || code === CODE_COLON || code === CODE_CR || code === CODE_LF
  );
}

/**
 * Scan a candidate username segment starting at `start`. Returns the exclusive
 * end index, or -1 when the position cannot start a username (end of text, an
 * immediate hard boundary, or leading whitespace — a separator run followed by
 * whitespace is prose punctuation, not a home path).
 */
function scanUsernameSegment(text: string, start: number): number {
  if (start >= text.length) return -1;
  const first = text.charCodeAt(start);
  if (isUsernameBoundaryCode(first) || first === CODE_SPACE || first === CODE_TAB) return -1;
  let end = start + 1;
  while (end < text.length && !isUsernameBoundaryCode(text.charCodeAt(end))) end++;
  return end;
}

/** Whether lower[start, end) is exactly one of the home tokens (decoy check, #116). */
function isHomeToken(lower: string, start: number, end: number): boolean {
  const len = end - start;
  if (len === 5) return lower.startsWith('users', start);
  if (len === 4) return lower.startsWith('home', start) || lower.startsWith('root', start);
  return false;
}

/**
 * Whether the separator run beginning at `runStart` sits directly after a UNC
 * hostname: <anchor><2+ separator run containing at least one backslash>
 * <hostname segment>. Requiring a backslash in the prefix run keeps genuine
 * UNC shares matching (\\server\Users\name and their JSON-escaped forms) while
 * URLs (http://example.com/users/bob, //example.com/users/bob) — whose double
 * separators are always pure forward slashes — stay untouched (#114). The
 * hostname itself intentionally stays visible (recorded deviation). Walk-backs
 * stop at `emitted` and cover disjoint spans (each maximal separator run has
 * exactly one candidate token at its end), preserving the O(n) bound.
 */
function isUncSharePosition(text: string, runStart: number, emitted: number): boolean {
  // Hostname: walk back over non-separator, non-whitespace, non-quote, non-CR/LF chars.
  let hostStart = runStart - 1; // caller guarantees text[runStart - 1] is ASCII alnum
  while (hostStart > emitted) {
    const c = text.charCodeAt(hostStart - 1);
    if (
      isSepCode(c) ||
      c === CODE_QUOTE ||
      c === CODE_CR ||
      c === CODE_LF ||
      c === CODE_SPACE ||
      c === CODE_TAB
    ) {
      break;
    }
    hostStart--;
  }
  // The hostname must be preceded by a 2+ separator run that has a backslash…
  if (hostStart - 2 < emitted) return false;
  if (!isSepCode(text.charCodeAt(hostStart - 1)) || !isSepCode(text.charCodeAt(hostStart - 2))) {
    return false;
  }
  let uncRunStart = hostStart - 2;
  let hasBackslash =
    text.charCodeAt(hostStart - 1) === CODE_BACKSLASH ||
    text.charCodeAt(hostStart - 2) === CODE_BACKSLASH;
  while (uncRunStart > emitted && isSepCode(text.charCodeAt(uncRunStart - 1))) {
    uncRunStart--;
    if (text.charCodeAt(uncRunStart) === CODE_BACKSLASH) hasBackslash = true;
  }
  if (!hasBackslash) return false;
  // …and that run is itself anchored (text start / consumed edge / non-alnum).
  if (uncRunStart === emitted) return true;
  return !isAsciiAlnumCode(text.charCodeAt(uncRunStart - 1));
}

/**
 * Redact user-home path prefixes: Windows C:\Users\name (or C:/Users/name),
 * macOS /Users/name, Linux /home/name and /root; the drive letter is optional
 * (#78.5, #93, #94, #95, #114, #116, SR-20260711-PR105).
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
 *   candidate. The token must be immediately preceded by a separator run
 *   (plain loop, no ceiling), and that run must START an absolute path (#114):
 *   the character before the run is text start / the edge of an already-
 *   redacted span, any non-alphanumeric character (whitespace, quote, '=',
 *   '(', ':' — a ':' also admits an optional [a-z]: drive prefix into the
 *   span when the drive letter is itself anchored, so cc:\users\x keeps its
 *   cc:), or the tail of a UNC hostname (see isUncSharePosition). An ASCII
 *   alphanumeric directly before the run otherwise means the token is a
 *   mid-path segment (/srv/app/root, /opt/app/home/x, URL path segments
 *   like http://example.com/users/bob) and is left alone.
 * - users/home must then be followed by another separator run and a non-empty
 *   username. The whole span (drive + run + token + run + username) becomes
 *   <home>. The username ends at the next separator, '"' (so a match cannot
 *   swallow a JSON string's closing quote and the sibling keys after it),
 *   ':' (never legal in a username — trailing prose survives, #116), CR/LF
 *   (redaction cannot cross a line break and swallow a genuine stack frame,
 *   #95), or end of text; it may not START with whitespace (see
 *   scanUsernameSegment for the whitespace rationale).
 * - A captured username that is itself users/home/root followed by another
 *   separator run and a valid segment is a decoy: the following segment is
 *   consumed into the span, repeatedly, so /home/users/name or
 *   C:\Users\Users\name cannot redact the decoy and leak the real
 *   segment (#116).
 * - root keeps its prior semantics (no drive prefix, no username): run + root
 *   is replaced when followed by a separator, '"', or end of text; only the
 *   separator run is generalized.
 * - Cursors only move forward and there is no backtracking; the anchoring
 *   walk-backs never cross already-consumed text and cover disjoint spans,
 *   so the scan stays O(n) and ReDoS-proof by construction; token positions
 *   are cached per token so failed candidates never rescan earlier text.
 *
 * SINGLE SOURCE of home-path redaction: applied once to the final joined
 * message by sanitizeLogMessage. That one pass suffices at every escaping
 * depth because stringification only ever multiplies separator characters,
 * which the unbounded run loops absorb (pinned by the depth/separator-class
 * tests) — and unlike the JSON.stringify replacer it replaces (#117), it also
 * covers object KEYS, which stringify replacers never receive.
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
    // #114: the separator run must start an absolute path, not continue one.
    let spanStart = runStart;
    let anchored = false;
    if (runStart === emitted) {
      anchored = true; // text start, or flush against an already-redacted span
    } else {
      const before = text.charCodeAt(runStart - 1);
      if (before === CODE_COLON) {
        anchored = true;
        // Optional [a-z]: drive prefix joins the span only when the drive
        // letter is itself anchored (cc:\users\x keeps its cc: intact).
        if (!isRoot && runStart - 2 >= emitted) {
          const letter = lower.charCodeAt(runStart - 2);
          if (
            letter >= 0x61 &&
            letter <= 0x7a &&
            (runStart - 2 === emitted || !isAsciiAlnumCode(text.charCodeAt(runStart - 3)))
          ) {
            spanStart = runStart - 2;
          }
        }
      } else if (!isAsciiAlnumCode(before)) {
        anchored = true; // whitespace, quote, '(', '=', … — a path can start here
      } else {
        anchored = isUncSharePosition(text, runStart, emitted);
      }
    }
    if (!anchored) {
      pos = tokenAt + 1; // mid-path segment (/srv/app/root) — leave it alone
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
    // users/home: separator run after the token, then a non-empty username.
    let nameStart = afterToken;
    while (nameStart < text.length && isSepCode(text.charCodeAt(nameStart))) nameStart++;
    if (nameStart === afterToken) {
      pos = tokenAt + 1;
      continue;
    }
    let nameEnd = scanUsernameSegment(text, nameStart);
    if (nameEnd === -1) {
      pos = tokenAt + 1; // empty username, or a separator run followed by prose
      continue;
    }
    // #116: a username that is itself users/home/root followed by a further
    // valid segment is a decoy — consume the real segment(s) into the span.
    while (isHomeToken(lower, nameStart, nameEnd)) {
      let nextStart = nameEnd;
      while (nextStart < text.length && isSepCode(text.charCodeAt(nextStart))) nextStart++;
      if (nextStart === nameEnd) break; // no separator run after the decoy
      const nextEnd = scanUsernameSegment(text, nextStart);
      if (nextEnd === -1) break; // nothing path-like follows — decoy IS the username
      nameStart = nextStart;
      nameEnd = nextEnd;
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
    // Tagged so a stack/name/message access failure is visible in the record
    // instead of a bare "[object Error]" (#117): "[unformattable Error: boom]",
    // or "[unformattable [object Error]]" when even toString throws.
    raw = `[unformattable ${safeString(err)}]`;
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
 *
 * Home-path redaction is NOT done here: the pre-stringify leaf replacer that
 * used to run inside JSON.stringify was fully redundant with the final scanner
 * in sanitizeLogMessage, which absorbs separator runs at any escaping depth
 * and also covers object keys (#117) — see the redactHomePaths doc comment.
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
