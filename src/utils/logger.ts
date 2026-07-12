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
// Invisible / spoofing characters (#71, #97.3, #115, #123). Four review
// cycles of enumerating one range at a time showed a hand-picked class only
// ever chases the space, so the class is now derived from Unicode properties
// the Unicode Consortium maintains, closing it by construction:
// - \p{Cf} — every format control: the full Bidi_Control set (U+202A–202E,
//   U+2066–2069, U+200E/200F, U+061C), zero-width/joiner chars
//   (U+200B–200D, U+2060, U+FEFF), soft hyphen (U+00AD), Mongolian vowel
//   separator (U+180E), invisible operators (U+2061–2064), deprecated
//   format controls (U+206A–206F), interlinear annotations (U+FFF9–FFFB),
//   and the plane-14 language/tag block (U+E0001, U+E0020–E007F — the
//   ASCII-smuggling vector).
// - \p{Default_Ignorable_Code_Point} — the invisible non-Cf members:
//   variation selectors (U+FE00–FE0F, supplementary U+E0100–E01EF), Hangul
//   fillers (U+115F, U+1160, U+3164, U+FFA0), the combining grapheme joiner
//   (U+034F), and the reserved default-ignorable ranges (U+2065,
//   U+FFF0–FFF8, plane-14 gaps), covering unassigned members ahead of
//   assignment.
// - U+2028/U+2029 line/paragraph separators (visible line breaks, so in
//   neither property — kept from the original class).
// The u flag makes matching code-point based (surrogate-aware) — required
// both for \p{} and for the supplementary members. Accepted trade-off:
// visible Cf (Arabic number signs U+0600–0605 etc.) and emoji variation
// selectors are stripped too; anti-spoofing beats glyph fidelity in a
// diagnostics log.
const SPOOF_RE = /[\u2028\u2029]|\p{Cf}|\p{Default_Ignorable_Code_Point}/gu;
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
const CODE_COMMA = 0x2c; // ,
const CODE_SEMICOLON = 0x3b; // ;
// Shared empty strip-provenance set (#128) — no allocation on the common path.
const NO_GAPS: ReadonlySet<number> = new Set<number>();

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
 * A username-terminating boundary inside a URL context (#127). URL path
 * segments never contain raw whitespace, ',' or ';': in a subscription URL the
 * account segment ends at the next '/', but a malformed multi-URL or URL+prose
 * line (attacker-influenceable via an iCal summary) puts a second URL or trailing
 * diagnostics after soft punctuation. Bounding there stops the capture folding
 * the rest of the line into one <home>. Filesystem paths (non-URL anchors) keep
 * the WIDE capture — a Windows username may contain a space (C:\Users\John Smith),
 * so whitespace stays username-interior there.
 */
function isUrlUsernameBoundaryCode(code: number): boolean {
  return (
    isUsernameBoundaryCode(code) ||
    code === CODE_COMMA ||
    code === CODE_SEMICOLON ||
    code === CODE_SPACE ||
    code === CODE_TAB
  );
}

/**
 * Scan a candidate username segment starting at `start`. Returns the exclusive
 * end index, or -1 when the position cannot start a username (end of text, an
 * immediate hard boundary, or leading whitespace — a separator run followed by
 * whitespace is prose punctuation, not a home path). When `narrow` is set the
 * URL context owns the match (scheme-anchored, no genuine share anchor,
 * URL-flavored separator run — see redactHomePaths), so soft punctuation
 * (',', ';', whitespace) additionally bounds the capture (#127).
 */
function scanUsernameSegment(text: string, start: number, narrow: boolean): number {
  if (start >= text.length) return -1;
  const first = text.charCodeAt(start);
  if (isUsernameBoundaryCode(first) || first === CODE_SPACE || first === CODE_TAB) return -1;
  const isBoundary = narrow ? isUrlUsernameBoundaryCode : isUsernameBoundaryCode;
  let end = start + 1;
  while (end < text.length && !isBoundary(text.charCodeAt(end))) end++;
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
 * Whether the separator run beginning at `runStart` sits directly after a
 * share hostname: <anchor><2+ separator run><hostname segment>. Separator
 * FLAVOR is deliberately not evidence (#122): the pre-#122 rule required a
 * backslash in the hostname-prefix run, which failed toward LEAK for mixed
 * forms (`//server\users\pedro`) — contradicting the file's own "ANY mix,
 * ANY length" separator threat model — and a backslash in the token-adjacent
 * run is equally valid UNC evidence, so the discriminator could never be
 * made sound per-run. Instead, ANY anchored double-separator start counts:
 * genuine UNC shares (\\server\Users\name and JSON-escaped forms), mixed
 * forms, forward-slash-only share spellings (//fileserver/users/pedro — a
 * plausible roaming-profile path), and protocol-relative URLs
 * (//example.com/users/bob). The last two are a decided privacy-first
 * direction: a protocol-relative URL's /users/<name> carries the same
 * account semantics as its scheme-full form, which #121 mandates redacting.
 * Scheme-full URLs match here too when the token is host-adjacent
 * (http://example.com/users/bob) — consistent with the #121 rule that
 * governs the deeper segments. The hostname itself intentionally stays
 * visible (recorded deviation). Recorded deviation (#129, accepted): a URL
 * whose first path segment is literally `root` (e.g. https://host/root) is
 * host-adjacent in share position, so it redacts to <home> under this
 * flavor-free rule — a minor diagnostics-fidelity loss in the
 * privacy-fail-safe direction; a deeper /api/root/config keeps #114 mid-path
 * behavior. Walk-backs stop at `emitted` and cover
 * disjoint spans (each maximal separator run has exactly one candidate token
 * at its end), preserving the O(n) bound.
 *
 * Return value distinguishes WHO owns the anchor (SR-20260711-PR130):
 * SHARE_URL_OWN means the anchoring double-separator run is the scheme's own
 * '://' (its preceding char is a qualifying scheme colon) — the "share" is the
 * URL itself, so URL-context capture narrowing (#127) still applies to the
 * match. SHARE_GENUINE is every other anchored share (quote/whitespace/text
 * start/strip-gap/non-scheme colon before the run) — a real UNC/filesystem
 * shape whose spaced-username capture must never be narrowed. Strip provenance
 * (#128): a recorded gap at `uncRunStart` means a stripped character —
 * always a control/invisible, hence non-alnum — sat immediately before the
 * run, so it anchors exactly as it did pre-strip. Gaps are deliberately NOT
 * hostname-walk boundaries: invisibles were never in the walk's boundary set
 * before stripping, so treating a gap as one would break shares whose
 * hostname contained a stripped invisible (pinned).
 */
const SHARE_NONE = 0;
const SHARE_GENUINE = 1;
const SHARE_URL_OWN = 2;
type ShareKind = typeof SHARE_NONE | typeof SHARE_GENUINE | typeof SHARE_URL_OWN;

function isUncSharePosition(
  text: string,
  runStart: number,
  emitted: number,
  gaps: ReadonlySet<number>
): ShareKind {
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
  // The hostname must be preceded by a 2+ separator run (any flavor, #122)…
  if (hostStart - 2 < emitted) return SHARE_NONE;
  if (!isSepCode(text.charCodeAt(hostStart - 1)) || !isSepCode(text.charCodeAt(hostStart - 2))) {
    return SHARE_NONE;
  }
  let uncRunStart = hostStart - 2;
  while (uncRunStart > emitted && isSepCode(text.charCodeAt(uncRunStart - 1))) {
    uncRunStart--;
  }
  // …and that run is itself anchored (text start / consumed edge / non-alnum /
  // recorded strip position, #128).
  if (uncRunStart === emitted) return SHARE_GENUINE;
  const before = text.charCodeAt(uncRunStart - 1);
  if (isAsciiAlnumCode(before) && !gaps.has(uncRunStart)) return SHARE_NONE;
  return before === CODE_COLON && isSchemeColon(text, uncRunStart - 1)
    ? SHARE_URL_OWN
    : SHARE_GENUINE;
}

/**
 * Scheme evidence for the URL-context rule (#121): a ':' immediately followed
 * by a maximal separator run of length >= 2 containing at least one forward
 * slash. This survives every escaping depth — stringification only ever
 * inserts backslashes around the two '/' of '://' (JSON.stringify leaves '/'
 * alone; PHP's json_encode turns it into '\/'), never removes them — while a
 * drive-letter colon can never qualify: its separator run is either length 1
 * (C:\, C:/) or all-backslash at depth >= 1 (C:\\, C:\\\\). Each colon's
 * forward run scan covers a separator run adjacent to no other colon, so the
 * scans are disjoint and O(n) in total.
 */
function isSchemeColon(text: string, colonAt: number): boolean {
  let i = colonAt + 1;
  let hasForwardSlash = false;
  while (i < text.length && isSepCode(text.charCodeAt(i))) {
    if (text.charCodeAt(i) === CODE_SLASH) hasForwardSlash = true;
    i++;
  }
  return i - colonAt - 1 >= 2 && hasForwardSlash;
}

/**
 * Memo for the URL-context walk (#121): `end` is the rightmost index already
 * classified this pass; `hasScheme` is whether a scheme marker occurs in the
 * boundary-free stretch ending at `end`. One instance lives per
 * redactHomePaths call; candidates present strictly increasing `runStart`
 * values, so every character is walked at most once per pass — the walk is
 * amortized O(n) by construction, mirroring the `emitted` trick.
 */
interface UrlContext {
  end: number;
  hasScheme: boolean;
}

/**
 * Whether the separator run beginning at `runStart` sits inside a URL (#121):
 * a scheme marker (see isSchemeColon) appears earlier in the same context run —
 * the stretch back to the nearest STRUCTURAL boundary. The boundary set is
 * whitespace, CR/LF, and the URL soft punctuation ',' / ';' — never a bare
 * quote (#126). A quote is content, not structure: a malformed subscription URL
 * logged raw (calendar-service logs safeUrl verbatim on validation failure) can
 * embed a quote mid-path, and treating it as a severer dropped the scheme
 * context so the account token leaked. The structural separator between two JSON
 * values is the comma JSON.stringify always emits (`,"key":`), and the join
 * between two log arguments is a space — both already in this set — so a URL in
 * one JSON value still cannot anchor a token in the next (pinned both
 * directions). CR/LF bound the context so a scheme on one stack line cannot
 * anchor a token on the next (#95 companion). Colons inside the URL (ports,
 * userinfo) fail isSchemeColon and are walked over harmlessly.
 */
function isUrlContextPosition(text: string, runStart: number, ctx: UrlContext): boolean {
  let hasScheme = false;
  let i = runStart - 1;
  while (i >= ctx.end) {
    const c = text.charCodeAt(i);
    if (
      c === CODE_SPACE ||
      c === CODE_TAB ||
      c === CODE_CR ||
      c === CODE_LF ||
      c === CODE_COMMA ||
      c === CODE_SEMICOLON
    ) {
      // Boundary: the context run starts after it — earlier text is irrelevant.
      ctx.hasScheme = hasScheme;
      ctx.end = runStart;
      return hasScheme;
    }
    if (c === CODE_COLON && !hasScheme && isSchemeColon(text, i)) hasScheme = true;
    i--;
  }
  // No boundary in the newly walked stretch: the previous context continues.
  ctx.hasScheme = hasScheme || ctx.hasScheme;
  ctx.end = runStart;
  return ctx.hasScheme;
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
 *   cc:), the tail of a share hostname (see isUncSharePosition, #122), or —
 *   for users/home only — a URL context (see isUrlContextPosition, #121):
 *   subscription URLs embed the account as a path segment (Zimbra
 *   /home/<user>/, CalDAV /users/<name>/) and are logged on every fetch, so
 *   inside a URL those tokens are account-bearing and redact at any depth.
 *   root is excluded from the URL rule (no account semantics in URL paths —
 *   /api/root/config keeps #114 mid-path behavior), and the URL rule
 *   knowingly over-redacts non-account URLs (github.com/users/bob):
 *   privacy beats fidelity in a diagnostics log. An ASCII alphanumeric
 *   directly before the run otherwise means the token is a mid-path segment
 *   (/srv/app/root, /opt/app/home/x) and is left alone. Recorded deviation
 *   (#124): BSD/Solaris home layouts (/usr/home/<name>, /export/home/<name>)
 *   present as exactly such mid-path shapes and stay unredacted by design —
 *   the plugin ships for Windows/macOS (plus Linux /home), so those shapes
 *   have no reachable trigger on the target platforms.
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
function redactHomePaths(text: string, gaps: ReadonlySet<number> = NO_GAPS): string {
  const lower = text.toLowerCase();
  let out = '';
  let emitted = 0; // text before this index has been emitted or consumed
  let pos = 0; // scan cursor
  let iUsers = lower.indexOf('users');
  let iHome = lower.indexOf('home');
  let iRoot = lower.indexOf('root');
  const urlCtx: UrlContext = { end: 0, hasScheme: false };
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
    // Whether this match anchors inside a URL scheme context (#121). Computed
    // independently of the anchor decision so the username capture can bound at
    // URL soft punctuation (#127) even when the run also reads as a share start.
    let urlAnchored = false;
    // Share evidence for this match (SR-20260711-PR130): a GENUINE share anchor
    // vetoes URL-context capture narrowing below.
    let shareKind: ShareKind = SHARE_NONE;
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
      } else if (!isAsciiAlnumCode(before) || gaps.has(runStart)) {
        // Whitespace, quote, '(', '=', … — a path can start here. A recorded
        // strip position (gaps.has) is also a non-alnum boundary: a character
        // deleted by the sanitize pass sat here and was the true anchor, so the
        // preceding alnum must not glue onto the run (#128 — strip provenance).
        anchored = true;
      } else {
        // Alnum-preceded (mid-path shape): still anchored in share position
        // (#122) or, for the account-bearing tokens, inside a URL (#121).
        // isUrlContextPosition is consulted unconditionally (its memo stays
        // O(n)) so urlAnchored is known even when the share rule anchored first.
        urlAnchored = !isRoot && isUrlContextPosition(text, runStart, urlCtx);
        shareKind = isUncSharePosition(text, runStart, emitted, gaps);
        anchored = shareKind !== SHARE_NONE || urlAnchored;
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
    // URL-flavored run? A URL's path separators keep at least one forward slash
    // at every escaping depth ('/' → '\/' but never all-backslash — same
    // invariant isSchemeColon relies on), while a filesystem backslash never
    // gains one. Used to scope capture narrowing below (SR-20260711-PR130).
    let urlFlavorRun = false;
    while (nameStart < text.length && isSepCode(text.charCodeAt(nameStart))) {
      if (text.charCodeAt(nameStart) === CODE_SLASH) urlFlavorRun = true;
      nameStart++;
    }
    if (nameStart === afterToken) {
      pos = tokenAt + 1;
      continue;
    }
    // #127 capture narrowing applies ONLY when the URL context owns the match:
    // it anchored via a scheme (urlAnchored), no GENUINE share anchor claims it
    // (a real UNC path after a quoted/glued URL keeps the wide spaced-username
    // capture — SHARE_URL_OWN means the "share" is the URL's own '://', which
    // does not veto), and the run introducing the username is URL-flavored
    // (an all-backslash run is a filesystem shape even inside URL context).
    const narrowCapture = urlAnchored && shareKind !== SHARE_GENUINE && urlFlavorRun;
    let nameEnd = scanUsernameSegment(text, nameStart, narrowCapture);
    if (nameEnd === -1) {
      pos = tokenAt + 1; // empty username, or a separator run followed by prose
      continue;
    }
    // #116: a username that is itself users/home/root followed by a further
    // valid segment is a decoy — consume the real segment(s) into the span.
    while (isHomeToken(lower, nameStart, nameEnd)) {
      let nextStart = nameEnd;
      let nextUrlFlavor = false;
      while (nextStart < text.length && isSepCode(text.charCodeAt(nextStart))) {
        if (text.charCodeAt(nextStart) === CODE_SLASH) nextUrlFlavor = true;
        nextStart++;
      }
      if (nextStart === nameEnd) break; // no separator run after the decoy
      const nextEnd = scanUsernameSegment(
        text,
        nextStart,
        urlAnchored && shareKind !== SHARE_GENUINE && nextUrlFlavor
      );
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

/** The six strip passes, in order. Sequential (never one combined regex) so the
 * escape-class semantics pinned by the sanitizer tests are preserved exactly. */
const STRIP_PASSES = [ANSI_CSI_RE, OSC_RE, ESC_FE_RE, C0_RE, C1_RE, SPOOF_RE];

/**
 * Apply one strip regex, producing both the stripped text (identical to
 * `input.replace(re, '')`) AND the set of REMOVED-character positions, in the
 * OUTPUT's coordinates — a gap value `g` means a character was deleted at the
 * boundary immediately before output index `g` (strip provenance, #128).
 * Incoming gaps (from earlier passes) are translated into the new coordinates by
 * subtracting the removal length before them; gaps that fall inside a removed
 * span collapse onto that span's single output position. Never throws; O(n) in
 * the input plus the (small) number of matches and prior gaps. The no-match fast
 * path returns the input unchanged so the 200k perf inputs pay one native scan.
 */
function applyStrip(input: string, re: RegExp, inGaps: ReadonlySet<number>): { out: string; gaps: ReadonlySet<number> } {
  re.lastIndex = 0;
  let m = re.exec(input);
  if (m === null) return { out: input, gaps: inGaps };
  const sortedIn = inGaps.size ? Array.from(inGaps).sort((a, b) => a - b) : [];
  const gaps = new Set<number>();
  let out = '';
  let cursor = 0; // next uncopied input index
  let removed = 0; // total removed length strictly before `cursor`
  let gi = 0; // cursor into sortedIn
  while (m !== null) {
    const s = m.index;
    const e = s + m[0].length;
    out += input.slice(cursor, s); // out.length is now s - removed
    // Existing gaps up to and including `s` map with the current removal count.
    while (gi < sortedIn.length && sortedIn[gi] <= s) {
      gaps.add(sortedIn[gi] - removed);
      gi++;
    }
    if (e > s) gaps.add(out.length); // the removed span collapses here
    while (gi < sortedIn.length && sortedIn[gi] < e) gi++; // drop gaps inside (s, e)
    removed += e - s;
    cursor = e;
    if (e === s) re.lastIndex++; // defensive: never loop on a zero-width match
    m = re.exec(input);
  }
  out += input.slice(cursor);
  while (gi < sortedIn.length) {
    gaps.add(sortedIn[gi] - removed);
    gi++;
  }
  return { out, gaps };
}

/**
 * Strip control sequences that would corrupt the log buffer or a terminal
 * rendering it (#52): ANSI/OSC escape sequences, C0/C1 control chars (except
 * \n and \t), DEL, U+2028/U+2029 separators, and the property-derived
 * invisible/spoofing class — format controls and default-ignorable code
 * points (#71, #123). Real newlines from marked Error stacks are preserved.
 * The positions where characters were removed are carried into redactHomePaths
 * so a deleted invisible that was the sole redaction anchor still anchors the
 * following path (#128).
 */
function sanitizeLogMessage(message: string): string {
  let text = message;
  let gaps: ReadonlySet<number> = NO_GAPS;
  for (const re of STRIP_PASSES) {
    const result = applyStrip(text, re, gaps);
    text = result.out;
    gaps = result.gaps;
  }
  return redactHomePaths(text, gaps);
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
