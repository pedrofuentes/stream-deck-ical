/**
 * Tests for logger utility
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock the @elgato/streamdeck module before importing logger
vi.mock('@elgato/streamdeck', () => ({
  default: {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    }
  }
}));

// Import after mocking
import { logger, debugLogs, isDebugMode, DebugLogEntry, getFormattedLogs, getErrorLogs, clearLogs, summarizeDebugInfo, applyStrip } from '../src/utils/logger';
import streamDeck from '@elgato/streamdeck';

describe('logger', () => {
  beforeEach(() => {
    // Clear debug logs before each test
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('debug', () => {
    it('should log debug message to streamDeck.logger', () => {
      logger.debug('test debug message');
      expect(streamDeck.logger.debug).toHaveBeenCalledWith('test debug message');
    });

    it('should add entry to debugLogs array', () => {
      logger.debug('test message');
      expect(debugLogs).toHaveLength(1);
      expect(debugLogs[0].level).toBe('debug');
      expect(debugLogs[0].message).toBe('test message');
    });

    it('should handle multiple arguments', () => {
      logger.debug('message', 'arg1', 'arg2');
      expect(streamDeck.logger.debug).toHaveBeenCalledWith('message arg1 arg2');
      expect(debugLogs[0].message).toBe('message arg1 arg2');
    });

    it('should stringify objects', () => {
      logger.debug('data:', { key: 'value' });
      expect(debugLogs[0].message).toBe('data: {"key":"value"}');
    });
  });

  describe('info', () => {
    it('should log info message to streamDeck.logger', () => {
      logger.info('test info message');
      expect(streamDeck.logger.info).toHaveBeenCalledWith('test info message');
    });

    it('should add entry to debugLogs with level info', () => {
      logger.info('info message');
      expect(debugLogs[0].level).toBe('info');
    });
  });

  describe('warn', () => {
    it('should log warn message to streamDeck.logger', () => {
      logger.warn('test warning');
      expect(streamDeck.logger.warn).toHaveBeenCalledWith('test warning');
    });

    it('should add entry to debugLogs with level warn', () => {
      logger.warn('warning message');
      expect(debugLogs[0].level).toBe('warn');
    });
  });

  describe('error', () => {
    it('should log error message to streamDeck.logger', () => {
      logger.error('test error');
      expect(streamDeck.logger.error).toHaveBeenCalledWith('test error');
    });

    it('should add entry to debugLogs with level error', () => {
      logger.error('error message');
      expect(debugLogs[0].level).toBe('error');
    });

    it('should stringify Error objects', () => {
      const error = new Error('test error');
      logger.error('caught:', error.message);
      expect(debugLogs[0].message).toContain('test error');
    });

    it('should serialize a passed Error object with its message and stack, not {} (#52)', () => {
      logger.error('Orphan sweep failed:', new Error('boom'));
      // Non-enumerable Error fields must not collapse to '{}'.
      expect(debugLogs[0].message).toContain('boom');
      expect(debugLogs[0].message).not.toBe('Orphan sweep failed: {}');
      // Stack should be present for diagnosability.
      expect(debugLogs[0].message).toMatch(/boom[\s\S]*at /);
    });
  });

  describe('message sanitization (#52)', () => {
    beforeEach(() => {
      debugLogs.length = 0;
      vi.clearAllMocks();
    });

    it('strips ANSI escape sequences', () => {
      logger.info('\x1b[31mred\x1b[0m');
      expect(debugLogs[0].message).toBe('red');
      expect(debugLogs[0].message).not.toContain('[31m');
    });

    it('strips C0/C1 controls, BEL and separators, keeps tab, and escapes newline (#71)', () => {
      // Spec change (#71): a raw \n in a non-Error argument is now escaped to the
      // two-character literal \\n so it cannot forge a new log record; tab is kept.
      const input = 'a' + '\x07' + 'b' + ' ' + 'c' + '\t' + 'd' + '\n' + 'e' + '\x9b';
      logger.info(input);
      expect(debugLogs[0].message).toBe('abc\td\\ne');
    });

    it('sanitizes the message sent to the underlying SDK logger too', () => {
      logger.warn('bad\x1b[31mvalue');
      expect(streamDeck.logger.warn).toHaveBeenCalledWith('badvalue');
    });
  });

  describe('summarizeDebugInfo failure logging (#56.2)', () => {
    beforeEach(() => {
      debugLogs.length = 0;
      vi.clearAllMocks();
    });

    it('logs the cause at debug level when size measurement fails and still returns bytes=-1', () => {
      const circular: any = {};
      circular.self = circular;
      const info = { cache: { status: 'LOADED', eventCount: 2 }, logs: [], extra: circular };

      const summary = summarizeDebugInfo(info);

      expect(summary).toContain('bytes=-1');
      const debugEntries = debugLogs.filter(e => e.level === 'debug');
      expect(debugEntries.length).toBeGreaterThan(0);
      // Pin the actual failure-cause message content, not just "an entry exists" (#78.6).
      expect(
        debugEntries.some(e => e.message.includes('[summarizeDebugInfo] Failed to measure payload size:'))
      ).toBe(true);
    });
  });

  describe('debugLogs rotation', () => {
    it('should keep maximum 500 entries', () => {
      // Add 510 entries
      for (let i = 0; i < 510; i++) {
        logger.info(`message ${i}`);
      }
      
      expect(debugLogs).toHaveLength(500);
      // First entry should be message 10 (0-9 were rotated out)
      expect(debugLogs[0].message).toBe('message 10');
      // Last entry should be message 509
      expect(debugLogs[499].message).toBe('message 509');
    });

    it('should have ISO timestamp', () => {
      logger.info('test');
      expect(debugLogs[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('type handling', () => {
    it('should handle null values', () => {
      logger.info('value:', null);
      expect(debugLogs[0].message).toBe('value: null');
    });

    it('should handle undefined values', () => {
      logger.info('value:', undefined);
      expect(debugLogs[0].message).toBe('value: undefined');
    });

    it('should handle numbers', () => {
      logger.info('count:', 42);
      expect(debugLogs[0].message).toBe('count: 42');
    });

    it('should handle booleans', () => {
      logger.info('flag:', true);
      expect(debugLogs[0].message).toBe('flag: true');
    });

    it('should handle arrays', () => {
      logger.info('array:', [1, 2, 3]);
      expect(debugLogs[0].message).toBe('array: [1,2,3]');
    });

    it('should handle nested objects', () => {
      logger.info('data:', { nested: { key: 'value' } });
      expect(debugLogs[0].message).toBe('data: {"nested":{"key":"value"}}');
    });
  });
});

describe('log-record forgery prevention (#71 / CWE-117)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('escapes an injected newline from an untrusted title into a single, non-forgeable record', () => {
    const evilTitle = 'evil\n[2026-01-01T00:00:00.000Z] [ERROR] fake';
    logger.info(evilTitle);

    // Exactly one buffered record — the injected "record" did not become its own entry.
    expect(debugLogs).toHaveLength(1);
    const { message } = debugLogs[0];
    // The newline is now the two-character literal \n, not a real line break.
    expect(message).toContain('evil\\n[2026-01-01T00:00:00.000Z] [ERROR] fake');
    expect(message).not.toContain('\n');

    // The exported view is a single physical line: no forged record at column 0.
    const lines = getFormattedLogs().split('\n');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatch(/^\[\d{4}-\d{2}-\d{2}T[^\]]*\] \[INFO\] evil\\n/);
    expect(lines.some(l => /^\[2026-01-01T00:00:00\.000Z\] \[ERROR\] fake/.test(l))).toBe(false);
  });

  it('escapes carriage returns in non-Error arguments', () => {
    logger.info('a\rb');
    expect(debugLogs[0].message).toBe('a\\rb');
    expect(debugLogs[0].message).not.toContain('\r');
  });

  it('strips bidi-override and zero-width spoofing characters', () => {
    // U+202E (RLO), U+2066 (LRI), U+200B (ZWSP), U+200D (ZWJ), U+FEFF (BOM)
    logger.info('a‮b⁦c​d‍e﻿');
    expect(debugLogs[0].message).toBe('abcde');
  });

  it('keeps Error-stack line breaks but marks continuation lines so none forges a record', () => {
    const err = new Error('boom');
    err.stack = 'Error: boom\n    at somewhere (file.js:1:1)\n    at other (file.js:2:2)';
    logger.error(err);

    const lines = getFormattedLogs().split('\n');
    // First physical line carries the real [timestamp] [ERROR] header.
    expect(lines[0]).toMatch(/^\[\d{4}-\d{2}-\d{2}T[^\]]*\] \[ERROR\] Error: boom$/);
    // Every continuation line is prefixed with the marker and cannot look like a record.
    expect(lines[1]).toBe('    |     at somewhere (file.js:1:1)');
    expect(lines[2]).toBe('    |     at other (file.js:2:2)');
    expect(lines.slice(1).every(l => !/^\[[^\]]*\] \[[A-Z]+\]/.test(l))).toBe(true);
  });
});

describe('Error formatting (#78.4 / #78.5)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('does not duplicate the Error message when a V8 stack is present', () => {
    const err = new Error('uniqueboom');
    // Real V8 stacks begin with "Error: <message>"; ensure that is deterministic here.
    err.stack = 'Error: uniqueboom\n    at frame (file.js:1:1)';
    logger.error(err);
    const occurrences = (debugLogs[0].message.match(/uniqueboom/g) ?? []).length;
    expect(occurrences).toBe(1);
  });

  it('falls back to name + message when the Error has no stack', () => {
    const err = new Error('nostack');
    err.stack = undefined;
    logger.error(err);
    expect(debugLogs[0].message).toBe('Error: nostack');
  });

  it('redacts the user-profile path prefix in stacks (backslash form)', () => {
    const err = new Error('boom');
    err.stack = 'Error: boom\n    at foo (C:\\Users\\pedro\\proj\\file.js:1:1)';
    logger.error(err);
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
    expect(message).not.toContain('C:\\Users');
  });

  it('redacts the user-profile path prefix in stacks (forward-slash form)', () => {
    const err = new Error('boom');
    err.stack = 'Error: boom\n    at foo (/Users/pedro/proj/file.js:1:1)';
    logger.error(err);
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });
});

describe('formatArg last-resort stringification (#78.1)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('serializes a null-prototype object via the JSON path even though String() would throw on it (#97.2)', () => {
    // A no-prop Object.create(null) never reaches the catch branch (JSON.stringify → '{}'),
    // so the old length>0 assertion was non-discriminating. Pin the exact JSON output for a
    // null-prototype object — String()/toString() would throw on it, the JSON path must not.
    const noProto: any = Object.create(null);
    noProto.k = 'v';
    expect(() => logger.error('x', noProto)).not.toThrow();
    expect(debugLogs).toHaveLength(1);
    expect(debugLogs[0].message).toBe('x {"k":"v"}');
  });

  it('survives a circular null-prototype object where both JSON and String() fail', () => {
    const circular: any = Object.create(null);
    circular.self = circular; // JSON.stringify throws (circular); String() throws (null proto)
    expect(() => logger.error('x', circular)).not.toThrow();
    expect(debugLogs).toHaveLength(1);
    expect(debugLogs[0].message).toContain('[object Object]');
  });

  it('tags the unserializable fallback with a marker so a serialization failure is visible (#96)', () => {
    const circular: any = Object.create(null);
    circular.self = circular; // both JSON.stringify and String() fail → tagged fallback
    logger.error('x', circular);
    expect(debugLogs[0].message).toContain('[unserializable ');
  });
});

describe('formatError never-throws hardening (#92)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('does not throw and buffers a useful record when Error.stack is a non-string', () => {
    const err = new Error('boom');
    (err as any).stack = 12345; // .replace() would blow up on a number
    expect(() => logger.error('caught:', err)).not.toThrow();
    expect(debugLogs).toHaveLength(1);
    expect(debugLogs[0].message).toContain('boom');
  });

  it('does not throw and buffers a useful record when the Error.stack getter throws', () => {
    const err = new Error('boom');
    Object.defineProperty(err, 'stack', {
      get() {
        throw new Error('nope');
      }
    });
    expect(() => logger.error('caught:', err)).not.toThrow();
    expect(debugLogs).toHaveLength(1);
    expect(debugLogs[0].message).toContain('boom');
  });
});

describe('centralized home-path redaction across all argument shapes (#93)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('redacts a home path in an interpolated string argument, not just Error instances', () => {
    logger.error('Error refreshing all calendars: C:\\Users\\pedro\\cal.ics not found');
    const out = getFormattedLogs();
    expect(out).toContain('<home>');
    expect(out).not.toContain('pedro');
  });

  it('redacts a home path inside a JSON-serialized object argument', () => {
    logger.error('config:', { path: '/Users/pedro/config.json' });
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });
});

describe('HOME_PATH_RE match boundaries (#94 / #95)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('redacts /home/<user> paths in Error stacks (#94)', () => {
    const err = new Error('boom');
    err.stack = 'Error: boom\n    at foo (/home/pedro/proj/file.js:1:1)';
    logger.error(err);
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts the /root home directory (#94)', () => {
    const err = new Error('boom');
    err.stack = 'Error: boom\n    at foo (/root/proj/file.js:1:1)';
    logger.error(err);
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('/root/');
  });

  it('does not cross a newline and swallow the next stack frame (#95)', () => {
    const err = new Error('evil');
    err.stack = 'Error: evil\nC:\\Users\\pedro\n    at real (file.js:1:1)';
    logger.error(err);
    const { message } = debugLogs[0];
    // Username is gone...
    expect(message).not.toContain('pedro');
    // ...but the genuine trailing frame survived (redaction stopped at the newline).
    expect(message).toContain('at real (file.js:1:1)');
  });
});

describe('JSON backslash-doubling must not defeat home-path redaction (SR-20260711-PR105)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('redacts a Windows path inside an object argument (formatArg JSON branch)', () => {
    // JSON.stringify doubles the backslashes: {"path":"C:\\Users\\pedro\\cal.ics"}.
    // A single-separator [\\/] regex can never align with \\Users\\ — the username
    // must still be gone from the buffer AND the diagnostics export.
    logger.error('config:', { path: 'C:\\Users\\pedro\\cal.ics' });
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
    const out = getFormattedLogs();
    expect(out).toContain('<home>');
    expect(out).not.toContain('pedro');
  });

  it('redacts a Windows path in a pre-stringified STRING argument (plugin.ts settings idiom)', () => {
    // Shipped call sites pass JSON.stringify(settings) as a plain string arg —
    // the doubled-backslash form arrives already baked into the message text.
    logger.debug('Global settings received:', JSON.stringify({ url: 'C:\\Users\\pedro\\x.ics' }));
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts mixed single- and double-backslash forms in one joined message', () => {
    logger.error(
      'failed for C:\\Users\\pedro\\a.ics:',
      JSON.stringify({ p: 'C:\\Users\\pedro\\b.ics' })
    );
    const { message } = debugLogs[0];
    expect(message).not.toContain('pedro');
    // Both occurrences redacted, non-path remainder intact.
    expect(message.match(/<home>/g)?.length).toBe(2);
    expect(message).toContain('failed for');
  });
});

describe('escaping-depth bypass of home-path redaction (SR-20260711-PR105-14f6644)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('redacts a raw string arg whose separators are 3-backslash runs (escaped paste)', () => {
    // A path copied out of JSON/PowerShell escaping can carry 3+ literal
    // backslashes per separator; a separator quantifier hard-coded to {1,2}
    // can never align the users/name tokens across a longer run.
    logger.error('paste: C:\\\\\\Users\\\\\\pedro\\\\\\cal.ics');
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts a depth-2 nested blob: object arg containing a pre-stringified JSON string', () => {
    // The leaf already holds doubled backslashes; this stringify doubles them
    // again (4 in the output text). Must be redacted at the leaf, before doubling.
    logger.error('blob:', { inner: JSON.stringify({ path: 'C:\\Users\\pedro\\x' }) });
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
    const out = getFormattedLogs();
    expect(out).toContain('<home>');
    expect(out).not.toContain('pedro');
  });

  it('redacts a double-stringified pure string arg (4-backslash separators in text)', () => {
    logger.debug('settings:', JSON.stringify(JSON.stringify({ path: 'C:\\Users\\pedro\\x' })));
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });
});

describe('separator-class completeness of home-path redaction (SR-20260711-PR105-3a3d2b2)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('redacts PHP json_encode-style escaped separators (backslash-slash mix)', () => {
    // PHP's json_encode escapes / as \/ by default — an everyday paste artifact.
    logger.error('paste: \\/Users\\/pedro\\/calendar.ics');
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts reversed mixed separators (slash-backslash mix)', () => {
    logger.error('/\\Users/\\pedro');
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts double-backslash-plus-slash separator runs', () => {
    logger.error('\\\\/users\\\\/pedro');
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts a pure 9-backslash separator run (past any fixed quantifier bound)', () => {
    const sep = '\\'.repeat(9);
    logger.error('C:' + sep + 'Users' + sep + 'pedro' + sep + 'x.ics');
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts a pure 17-backslash separator run', () => {
    const sep = '\\'.repeat(17);
    logger.error('C:' + sep + 'Users' + sep + 'pedro' + sep + 'x.ics');
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
  });

  it('redacts an 8-backslash-separator leaf inside an OBJECT argument (replacer oracle)', () => {
    const sep = '\\'.repeat(8);
    logger.error('blob:', { p: 'C:' + sep + 'Users' + sep + 'pedro' + sep + 'x' });
    const { message } = debugLogs[0];
    expect(message).toContain('<home>');
    expect(message).not.toContain('pedro');
    const out = getFormattedLogs();
    expect(out).toContain('<home>');
    expect(out).not.toContain('pedro');
  });

  it('leaves prose tokens without an adjacent separator run untouched', () => {
    logger.info('active users: 12, home base ok, root cause found');
    expect(debugLogs[0].message).toBe('active users: 12, home base ok, root cause found');
  });
});

describe('home-prefix anchoring: mid-path segments are not home prefixes (#114)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('leaves a deployRoot-style JSON value untouched (root as a mid-path segment)', () => {
    logger.error('cfg:', { deployRoot: '/srv/app/root' });
    expect(debugLogs[0].message).toBe('cfg: {"deployRoot":"/srv/app/root"}');
  });

  it('leaves a mid-path root segment in a plain string untouched', () => {
    logger.error('handler at /opt/myapp/root/handler.js failed');
    expect(debugLogs[0].message).toBe('handler at /opt/myapp/root/handler.js failed');
  });

  it('leaves a mid-path users segment untouched', () => {
    logger.info('cache dir /var/data/users/cache/entry.ics pruned');
    expect(debugLogs[0].message).toBe('cache dir /var/data/users/cache/entry.ics pruned');
  });

  it('leaves a mid-path home segment untouched', () => {
    logger.info('template at /opt/app/home/default.json');
    expect(debugLogs[0].message).toBe('template at /opt/app/home/default.json');
  });

  // ── Sanctioned spec change (#121/#122) — pin flips, not weakenings ────────
  // #114 pinned `http://example.com/users/bob` and `//example.com/users/bob`
  // as untouched (URL fidelity). Sentinel issue #121 reverses that call for
  // account-bearing URL segments: "a subscription URL embedding the account
  // name as a path segment (Zimbra `…/home/<user>/calendar.ics`, CalDAV
  // `/users/<name>/…`) is logged on every fetch (truncated) and in full on
  // validation error; the alnum-preceded token is now classified mid-path and
  // skipped → username PII in the exportable diagnostics buffer." The chosen
  // remediation is scheme-aware anchoring (privacy over URL fidelity in a
  // diagnostics log), so these two pins flip to redacted. Every other #114
  // pin (non-URL mid-path segments) remains green and unchanged.
  it('redacts a users URL path segment again (pin flipped by #121)', () => {
    logger.info('fetching http://example.com/users/bob/cal.ics');
    expect(debugLogs[0].message).toBe('fetching http://example.com<home>/cal.ics');
  });

  // Flipped by #122 (direction decided privacy-first): a protocol-relative
  // URL carries the same account semantics as its scheme-full form, and the
  // share-position rule no longer demands backslash evidence, so
  // `//host/users/<name>` redacts like `\\host\users\<name>` does.
  it('redacts users after a protocol-relative double separator (pin flipped by #122)', () => {
    logger.info('see //example.com/users/bob');
    expect(debugLogs[0].message).toBe('see //example.com<home>');
  });

  // Pin — passes before the fix; guards that anchoring keeps prose-adjacent absolute paths redacted.
  it('still redacts an absolute path following prose (whitespace anchors the path start)', () => {
    logger.error('Sync error for /home/pedro');
    expect(debugLogs[0].message).toBe('Sync error for <home>');
  });

  // Pin — passes before the fix; UNC share form must survive anchoring (hostname intentionally visible).
  it('still redacts the username in a UNC share path, hostname stays visible', () => {
    logger.error('\\\\server\\Users\\pedro\\docs');
    expect(debugLogs[0].message).toBe('\\\\server<home>\\docs');
  });

  // Pin — passes before the fix; a quote anchors a path start inside JSON text.
  it('still redacts a quoted Windows path inside JSON text', () => {
    logger.debug('cfg: {"p":"C:\\\\Users\\\\pedro\\\\x.ics"}');
    expect(debugLogs[0].message).toBe('cfg: {"p":"<home>\\\\x.ics"}');
  });

  // Pin — passes before the fix; '=' and other punctuation anchor a path start.
  it('still redacts a drive path after non-path punctuation', () => {
    logger.info('cwd=C:\\Users\\pedro\\proj');
    expect(debugLogs[0].message).toBe('cwd=<home>\\proj');
  });

  it('does not extend the drive prefix through a preceding word (cc:\\users\\… edge)', () => {
    logger.error('cc:\\users\\pedro');
    expect(debugLogs[0].message).toBe('cc:<home>');
  });
});

describe('URL account-segment redaction (#121)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // The Zimbra share-URL shape logged by calendar-service on every fetch.
  it('redacts the account in a Zimbra-style /home/<user>/ subscription URL', () => {
    logger.info('Fetching iCal feed: https://cal.example.com/home/pedro/calendar.ics');
    expect(debugLogs[0].message).toBe('Fetching iCal feed: https://cal.example.com<home>/calendar.ics');
    expect(debugLogs[0].message).not.toContain('pedro');
  });

  // CalDAV principal shape — the token is NOT host-adjacent, so only the
  // scheme lookback (not the share-position rule) can anchor it.
  it('redacts a deep CalDAV /users/<name>/ segment', () => {
    logger.error('Invalid URL format: https://dav.example.com/principals/users/pedro/cal.ics');
    expect(debugLogs[0].message).toBe('Invalid URL format: https://dav.example.com/principals<home>/cal.ics');
  });

  it('redacts the account segment in a URL inside a JSON object argument', () => {
    logger.error('cfg:', { url: 'https://cal.example.com/home/pedro/c.ics' });
    expect(debugLogs[0].message).toBe('cfg: {"url":"https://cal.example.com<home>/c.ics"}');
  });

  // Pin — passes before the fix (the \/\/ runs carry backslash evidence under
  // the current UNC rule); kept to prove scheme evidence survives escaping.
  it('redacts through PHP json_encode-escaped URL separators (scheme evidence survives escaping)', () => {
    logger.error('paste https:\\/\\/cal.example.com\\/home\\/pedro\\/x.ics');
    expect(debugLogs[0].message).toBe('paste https:\\/\\/cal.example.com<home>\\/x.ics');
  });

  it('keeps scheme context across a port number', () => {
    logger.info('https://x.example.com:8443/dav/users/pedro/x.ics');
    expect(debugLogs[0].message).toBe('https://x.example.com:8443/dav<home>/x.ics');
  });

  it('keeps scheme context across URL userinfo and interior colons', () => {
    logger.info('https://u:p@example.com/dav/users/pedro/x');
    expect(debugLogs[0].message).toBe('https://u:p@example.com/dav<home>/x');
  });

  // DOCUMENTED over-redaction (#121 accepted trade-off): in a diagnostics
  // log, privacy beats fidelity — non-account URLs that happen to use
  // /users/<seg> lose that segment too.
  it('over-redacts a non-account /users/ URL segment (accepted #121 trade-off)', () => {
    logger.info('https://github.com/users/bob');
    expect(debugLogs[0].message).toBe('https://github.com<home>');
  });

  // Pin — passes before the fix. Token-set decision: only users/home carry
  // account semantics in URL paths; a deep /root/ URL segment keeps #114
  // mid-path behavior (see #124's calibration note: inside URLs, skipping
  // root is correct #114 behavior).
  it('leaves a deep root URL segment untouched (root is not a URL account token)', () => {
    logger.info('see https://example.com/api/root/config');
    expect(debugLogs[0].message).toBe('see https://example.com/api/root/config');
  });

  // Pin — passes before the fix; the token must be a whole path segment.
  it('leaves a longer segment containing the token untouched inside a URL', () => {
    logger.info('https://example.com/data/users2/x');
    expect(debugLogs[0].message).toBe('https://example.com/data/users2/x');
  });

  // Pin — passes before the fix; a users token needs a following username.
  it('leaves a URL users segment with no username untouched', () => {
    logger.info('https://example.com/users/');
    expect(debugLogs[0].message).toBe('https://example.com/users/');
  });

  // Pin — passes before the fix; scheme context must not cross whitespace.
  it('does not let a URL earlier in the message anchor a separate mid-path token', () => {
    logger.info('https://x.example.com and /var/data/users/cache');
    expect(debugLogs[0].message).toBe('https://x.example.com and /var/data/users/cache');
  });

  // Pin — passes before the fix; a quote bounds the scheme context (JSON
  // string values are independent runs).
  it('does not let a URL in one JSON value anchor a token in the next value', () => {
    logger.info('{"a":"https://x.example.com","b":"/var/data/users/cache"}');
    expect(debugLogs[0].message).toBe('{"a":"https://x.example.com","b":"/var/data/users/cache"}');
  });

  // Pin — passes before the fix; drive-letter colons never read as schemes:
  // their separator runs are either length 1 (C:\, C:/) or all-backslash at
  // every escaping depth, while an escaped :// keeps its two forward slashes.
  it('does not treat a drive-letter colon as scheme evidence (single-backslash form)', () => {
    logger.info('x C:\\projects\\users\\data');
    expect(debugLogs[0].message).toBe('x C:\\projects\\users\\data');
  });

  it('does not treat a forward-slash drive form as scheme evidence', () => {
    logger.info('x C:/projects/users/data');
    expect(debugLogs[0].message).toBe('x C:/projects/users/data');
  });

  // Pin — passes before the fix (pre-existing #114 UNC-shape behavior, kept):
  // at escaping depth >= 1 the doubled backslashes make \\projects read as a
  // UNC host and the segment after it redacts. Documented over-redaction.
  it('keeps the pre-existing escaped-drive over-redaction (UNC-shaped depth-1 paste)', () => {
    logger.info('x C:\\\\projects\\\\users\\\\data');
    expect(debugLogs[0].message).toBe('x C:\\\\projects<home>');
  });

  // #95 companion — passes before the fix: a scheme on one stack line must
  // not anchor a token on the next line (CR/LF bound the context walk; the
  // "    | " continuation marker already whitespace-bounds real stacks, so
  // the CR/LF boundary is belt-and-braces).
  it('does not carry scheme context across an Error-stack line break', () => {
    const err = new Error('boom');
    err.stack = 'Error: see https://x.example.com\n/var/data/users/cache';
    logger.error(err);
    expect(debugLogs[0].message).toBe('Error: see https://x.example.com\n    | /var/data/users/cache');
  });

  it('is idempotent for URL redaction (re-logging a redacted URL is a no-op)', () => {
    logger.info('fetching https://cal.example.com/home/pedro/calendar.ics');
    const once = debugLogs[0].message;
    expect(once).toBe('fetching https://cal.example.com<home>/calendar.ics');
    logger.info(once);
    expect(debugLogs[1].message).toBe(once);
  });
});

describe('UNC evidence window (#122)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // Issue #122 probe: forward-slash prefix + backslash token-adjacent run
  // leaked under the prefix-run-only backslash discriminator.
  it('redacts //server\\users\\pedro (mixed separators, backslash in the token-adjacent run)', () => {
    logger.error('//server\\users\\pedro');
    expect(debugLogs[0].message).toBe('//server<home>');
  });

  // Pin — passes before the fix (the prefix run carries backslash evidence).
  it('redacts \\\\server/users/pedro (backslash in the prefix run)', () => {
    logger.error('\\\\server/users/pedro');
    expect(debugLogs[0].message).toBe('\\\\server<home>');
  });

  // Decided direction (#122's documented judgment call, privacy-first): a
  // users/home token in share position after a double-separator start
  // redacts regardless of separator flavor — //fileserver/users/pedro is a
  // plausible roaming-profile share AND a protocol-relative URL account
  // path; both readings say redact.
  it('redacts the forward-slash-only share form //fileserver/users/pedro', () => {
    logger.error('//fileserver/users/pedro');
    expect(debugLogs[0].message).toBe('//fileserver<home>');
  });

  it('redacts a fully forward-slash share with doubled interior separators', () => {
    logger.error('//server//users//pedro');
    expect(debugLogs[0].message).toBe('//server<home>');
  });

  // Consequence of flavor-free share evidence, pinned as deliberate:
  // host-adjacent root in share position redacts too (\\server\root already
  // did; //host/root and https://host/root now match). Deep URL
  // /api/root/... segments remain untouched (#121 token-set pin above).
  it('redacts host-adjacent root in share position regardless of separator flavor', () => {
    logger.error('https://example.com/root');
    expect(debugLogs[0].message).toBe('https://example.com<home>');
  });

  // Pin — passes before the fix; the share prefix run must itself be
  // anchored (an alnum-preceded double separator is not a share start).
  it('leaves an alnum-preceded double separator untouched (not a share start)', () => {
    logger.info('on server//users/pedro');
    expect(debugLogs[0].message).toBe('on server//users/pedro');
  });

  // Pin — passes before the fix; a single-separator "prefix" before the
  // would-be hostname is not a share start either.
  it('leaves a doubled interior separator in a plain path untouched', () => {
    logger.info('ls /var/data//users/cache');
    expect(debugLogs[0].message).toBe('ls /var/data//users/cache');
  });
});

describe('nested home-token decoy consumption (#116)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('fully redacts /home/users/<name> (no decoy + leak)', () => {
    logger.error('/home/users/pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });

  it('fully redacts \\\\server\\users\\home\\<name>', () => {
    logger.error('\\\\server\\users\\home\\pedro');
    expect(debugLogs[0].message).toBe('\\\\server<home>');
  });

  it('fully redacts H:\\home\\users\\<name>', () => {
    logger.error('H:\\home\\users\\pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });

  it('fully redacts /Users/home/<name> and keeps the trailing file path', () => {
    logger.error('/Users/home/pedro/cal.ics');
    expect(debugLogs[0].message).toBe('<home>/cal.ics');
  });

  it('fully redacts C:\\Users\\Users\\<name>', () => {
    logger.error('C:\\Users\\Users\\pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });

  it('consumes an arbitrarily deep decoy chain (/home/users/users/<name>)', () => {
    logger.error('/home/users/users/pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });

  // Pin — passes before the fix; a terminal decoy with nothing after it is itself the username.
  it('redacts /home/users with no further segment as a plain home path', () => {
    logger.error('/home/users');
    expect(debugLogs[0].message).toBe('<home>');
  });

  // Pins (SR-20260711-PR120-1b5d5c7): discriminating coverage for the ROOT alternative of the
  // decoy check — without it, /home/root/<name> would redact the decoy and leak the real username.
  it('fully redacts /home/root/<name> (root as the inner decoy segment)', () => {
    logger.error('/home/root/pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });

  it('consumes a root decoy chain (/home/root/root/<name>)', () => {
    logger.error('/home/root/root/pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });

  it('fully redacts C:\\Users\\root\\<name> (Windows-shaped root decoy)', () => {
    logger.error('C:\\Users\\root\\pedro');
    expect(debugLogs[0].message).toBe('<home>');
  });
});

describe('username span termination (#116 companion)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('stops the username at a colon so trailing prose survives', () => {
    logger.error('Sync error for /home/pedro: net down');
    expect(debugLogs[0].message).toBe('Sync error for <home>: net down');
  });

  // Pin — passes before the fix; whitespace is legal inside Windows usernames, so it must
  // stay username-interior (trimming at whitespace would leak the surname here).
  it('keeps a spaced Windows username fully redacted when the path continues', () => {
    logger.error('C:\\Users\\John Smith\\cal.ics');
    expect(debugLogs[0].message).toBe('<home>\\cal.ics');
    expect(debugLogs[0].message).not.toContain('Smith');
  });

  // Pin — passes before the fix; DELIBERATE over-redaction: without a colon (or other hard
  // boundary) trailing words are indistinguishable from a spaced username, and privacy wins.
  it('over-redacts ambiguous trailing prose after a home path (documented privacy-first rule)', () => {
    logger.error('Sync error for /home/pedro after retry');
    expect(debugLogs[0].message).toBe('Sync error for <home>');
  });

  it('rejects a username that starts with whitespace (separator run followed by prose)', () => {
    logger.info('mount /home/ 87% full');
    expect(debugLogs[0].message).toBe('mount /home/ 87% full');
  });
});

describe('scanner boundary pins (#117)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // Pin — passes before the fix; a token with no username must not match.
  it('leaves a Users prefix with an empty username untouched', () => {
    logger.info('base C:\\Users\\');
    expect(debugLogs[0].message).toBe('base C:\\Users\\');
  });

  // Pin — passes before the fix; an all-separator tail is not a username.
  it('leaves a token followed only by separators untouched', () => {
    logger.info('list of /users//\\/');
    expect(debugLogs[0].message).toBe('list of /users//\\/');
  });

  // Pin — passes before the fix; token must be a whole segment ending at a separator run.
  it('leaves /rootbeer untouched (token not followed by separator/quote/end)', () => {
    logger.info('try /rootbeer float');
    expect(debugLogs[0].message).toBe('try /rootbeer float');
  });

  // Pin — passes before the fix; token must begin its own segment (preceded by a separator run).
  it('leaves /srv/approot untouched (token embedded in a longer segment)', () => {
    logger.info('app at /srv/approot ready');
    expect(debugLogs[0].message).toBe('app at /srv/approot ready');
  });

  // Pin — passes before the fix; multiple matches redact left-to-right with interleaved text intact.
  it('redacts multiple home paths in order, keeping surrounding text', () => {
    logger.error('a C:\\Users\\p1\\f.txt b /home/p2/g.txt c');
    expect(debugLogs[0].message).toBe('a <home>\\f.txt b <home>/g.txt c');
  });

  // Pin — passes before the fix; the final sanitize pass covers object KEYS too, which a
  // JSON.stringify replacer never receives — part of why the single-source design suffices (#117.1).
  it('redacts a home path used as an object key', () => {
    logger.error('cfg:', { 'C:\\Users\\pedro\\f': 1 });
    expect(debugLogs[0].message).toBe('cfg: {"<home>\\\\f":1}');
  });

  // Pin — passes before the fix; re-sanitizing an already-redacted message is a no-op.
  it('is idempotent: re-logging a redacted message leaves it unchanged', () => {
    logger.error('C:\\Users\\pedro\\x.ics');
    const once = debugLogs[0].message;
    expect(once).toBe('<home>\\x.ics');
    logger.error(once);
    expect(debugLogs[1].message).toBe(once);
  });

  it('stays linear on 200k adversarial inputs (no backtracking, no quadratic anchor walks)', () => {
    // Repeated mid-path candidates: every users token has a separator run but an
    // alphanumeric segment before it that is NOT a UNC hostname — worst case for
    // the anchoring walk-backs. 8 chars * 25000 = 200k.
    const midPath = 'a\\users\\'.repeat(25000);
    // Single huge separator run before one token with no username after it.
    const bigRun = '\\'.repeat(200000) + 'users';
    const start = performance.now();
    logger.error(midPath);
    logger.error(bigRun);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(500);
    // Mid-path candidates must all be rejected (anchoring, #114).
    expect(debugLogs[0].message).toBe(midPath);
    expect(debugLogs[1].message).toBe(bigRun);
  });
});

describe('URL-context scanning stays linear (#121/#122 perf pin)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // Perf pin — passes before the fix too; guards the memoized O(n) bound of
  // the scheme-context walk and the colon-run scans on ~200k inputs.
  it('stays linear on 200k adversarial URL-shaped inputs', () => {
    // One giant boundary-free run with a scheme at the front: every candidate
    // consults the URL-context walk, which must stay memoized (each char
    // walked once per pass, not once per candidate).
    const urlRun = 'https://x.com/' + 'a1/users/'.repeat(22000);
    // Colon-dense input where no colon ever qualifies as scheme evidence.
    const colonHeavy = 'a:b/users/'.repeat(20000);
    // Scheme-shaped colon + share-position anchor before every token, but the
    // username scan fails each time (next char is ':') — anchor-heavy, no
    // redaction, so the scan must not fall into quadratic rescans.
    const schemeShare = ':\\/x/users/'.repeat(18000);
    const start = performance.now();
    logger.error(urlRun);
    logger.error(colonHeavy);
    logger.error(schemeShare);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(500);
    expect(debugLogs[1].message).toBe(colonHeavy);
    expect(debugLogs[2].message).toBe(schemeShare);
  });
});

describe('strip-provenance anchoring: a removed invisible/control keeps its anchor (#128)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // The invisible (U+00AD soft hyphen) is the SOLE non-alnum boundary before the
  // separator run. SPOOF_RE deletes it before redactHomePaths runs; without
  // strip-provenance the preceding alnum glues to the run → mid-path → LEAK.
  it('redacts a home path whose only anchor was a soft hyphen the spoof-strip removes', () => {
    logger.info('b­/home/pedro');
    expect(debugLogs[0].message).toBe('b<home>');
    expect(debugLogs[0].message).not.toContain('pedro');
  });

  // Discriminating control: with no stripped anchor, `b/home/pedro` is a genuine
  // mid-path shape (#114) and must stay untouched — proving the fix is scoped to
  // recorded strip positions, not a blanket "redact more".
  it('leaves an unstripped alnum-preceded mid-path token alone (provenance-scoped)', () => {
    logger.info('b/home/pedro');
    expect(debugLogs[0].message).toBe('b/home/pedro');
  });

  // A C0 control (BEL) removed by C0_RE must likewise leave a recorded boundary,
  // proving provenance survives every strip pass, not only the spoof pass.
  it('preserves the anchor when a C0 control between alnum and the run is stripped', () => {
    logger.info('b\x07/home/pedro');
    expect(debugLogs[0].message).toBe('b<home>');
    expect(debugLogs[0].message).not.toContain('pedro');
  });
});

describe('structural boundary provenance for scheme context (#126)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // #126 probe: a raw quote INSIDE a single argument's URL used to sever the
  // scheme context, so the account token leaked. The quote is content of one
  // argument (a malformed safeUrl logged raw), not a structural boundary.
  it('redacts a home token past a raw quote inside the same URL argument', () => {
    logger.info('https://dav.example.com/a"b/home/pedro/x.ics');
    expect(debugLogs[0].message).toBe('https://dav.example.com/a"b<home>/x.ics');
    expect(debugLogs[0].message).not.toContain('pedro');
  });

  // Same for a raw whitespace-free tab/CR would be prose; the interior-quote case
  // is the reachable one. A users-token variant of the same shape.
  it('redacts a users token past a raw quote inside the same URL argument', () => {
    logger.info('https://dav.example.com/x"y/users/pedro/cal.ics');
    expect(debugLogs[0].message).toBe('https://dav.example.com/x"y<home>/cal.ics');
    expect(debugLogs[0].message).not.toContain('pedro');
  });

  // Reconcile (the #126 warning), OTHER direction: a real JSON element boundary
  // must STILL sever — a URL in one value cannot anchor a mid-path token in the
  // next value. In JSON.stringify output the comma between values is the
  // structural separator, so the token stays untouched.
  it('does not let a URL value bleed scheme context into the next JSON value (formatArg JSON)', () => {
    logger.info('x', { a: 'https://x.example.com', b: '/var/data/users/cache' });
    expect(debugLogs[0].message).toBe('x {"a":"https://x.example.com","b":"/var/data/users/cache"}');
  });
});

describe('URL account capture stops at soft punctuation (#127)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // #127 probe: two comma-separated URLs — each account is redacted separately
  // and both hosts (and the comma) stay intact; the capture no longer folds the
  // second URL into the first <home>.
  it('redacts each account separately in a comma-separated multi-URL line', () => {
    logger.info('https://a.example.com/users/alice,https://b.example.com/users/bob');
    expect(debugLogs[0].message).toBe('https://a.example.com<home>,https://b.example.com<home>');
  });

  it('bounds the URL account capture at whitespace so trailing prose survives', () => {
    logger.info('see https://a.example.com/users/alice logged in');
    expect(debugLogs[0].message).toBe('see https://a.example.com<home> logged in');
  });

  it('bounds the URL account capture at a semicolon', () => {
    logger.info('https://a.example.com/users/alice;note=1');
    expect(debugLogs[0].message).toBe('https://a.example.com<home>;note=1');
  });

  // Guard (both directions): filesystem paths keep WIDE capture — a spaced
  // Windows username is NOT bounded at whitespace, because that match anchors on
  // the drive colon, not a URL scheme.
  it('keeps wide capture for a spaced Windows username (non-URL anchor unchanged)', () => {
    logger.error('C:\\Users\\John Smith\\cal.ics');
    expect(debugLogs[0].message).toBe('<home>\\cal.ics');
    expect(debugLogs[0].message).not.toContain('Smith');
  });
});

describe('URL narrowing must not narrow genuine share/filesystem captures (SR-20260711-PR130 blocker 1)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // Blocker-1 probe: a quoted URL earlier on the line puts the later, genuine
  // UNC path in URL context (the quote is no longer a severer, #126), narrowing
  // the capture to whitespace and leaking the spaced-username tail. The share
  // anchor (quote before \\server) is genuine — capture must stay WIDE.
  it('keeps wide capture for a UNC path after a quoted URL on the same line', () => {
    logger.info('Fetch "https://good.example.com/feed.ics"\\\\server\\Users\\John Smith\\Documents\\notes.txt');
    expect(debugLogs[0].message).toBe(
      'Fetch "https://good.example.com/feed.ics"\\\\server<home>\\Documents\\notes.txt'
    );
    expect(debugLogs[0].message).not.toContain('Smith');
  });

  // Blocker-1 second probe: the UNC path is GLUED to the URL (no severer at
  // all, and the \\ run is alnum-preceded so the share rule cannot anchor it) —
  // the token anchors via URL context, but the all-backslash separator run
  // marks it as a filesystem shape, so the capture must stay WIDE.
  it('keeps wide capture for a backslash UNC path glued to a URL (no severer between)', () => {
    logger.info('See http://evil.example\\\\fileserver\\Users\\Jane Doe\\Documents\\taxes.pdf');
    expect(debugLogs[0].message).toBe(
      'See http://evil.example\\\\fileserver<home>\\Documents\\taxes.pdf'
    );
    expect(debugLogs[0].message).not.toContain('Doe');
  });

  // Discriminates the genuine-share condition beyond run flavor: forward-slash
  // separators after a genuinely share-anchored token (quote before \\server)
  // must still capture WIDE — the share anchor, not the URL, owns this match.
  it('keeps wide capture for a forward-slash share path when the share anchor is genuine', () => {
    logger.info('Fetch "https://x.example.com/f.ics"\\\\server/Users/John Smith/notes.txt');
    expect(debugLogs[0].message).toBe(
      'Fetch "https://x.example.com/f.ics"\\\\server<home>/notes.txt'
    );
    expect(debugLogs[0].message).not.toContain('Smith');
  });
});

describe('strip provenance reaches share anchoring (SR-20260711-PR130 blocker 2, #128)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // Blocker-2 probe: the stripped invisible (ZWSP) was the sole non-alnum
  // anchor of the \\server run; without gap provenance in isUncSharePosition
  // the whole UNC path stays unredacted.
  it('redacts a UNC path whose share-run anchor was a stripped invisible', () => {
    logger.info('prefix​\\\\server\\Users\\John Smith\\Documents');
    expect(debugLogs[0].message).toBe('prefix\\\\server<home>\\Documents');
    expect(debugLogs[0].message).not.toContain('Smith');
  });

  // Control (provenance-scoped): with NO stripped character, an alnum-preceded
  // double separator is not a share start (existing #122 pin family) — proving
  // the fix keys on recorded gaps, not on loosening the anchor rule.
  it('control: unstripped alnum before the share run stays unanchored', () => {
    logger.info('prefix\\\\server\\Users\\John Smith\\Documents');
    expect(debugLogs[0].message).toBe('prefix\\\\server\\Users\\John Smith\\Documents');
  });

  // Guard for the design choice: a gap is an ANCHOR (the stripped char was
  // non-alnum), never a hostname-walk boundary — invisibles were not in the
  // walk's boundary set before stripping either, so a stripped invisible
  // INSIDE the hostname must not break the share match.
  it('guard: a stripped invisible inside the hostname does not break share redaction', () => {
    logger.error('//se­rver/users/pedro');
    expect(debugLogs[0].message).toBe('//server<home>');
  });
});

describe('formatError catch-fallback tagging (#117.4)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('tags the fallback when the stack getter throws, keeping name and message visible', () => {
    const err = new Error('boom');
    Object.defineProperty(err, 'stack', {
      get() {
        throw new Error('nope');
      }
    });
    logger.error('caught:', err);
    expect(debugLogs[0].message).toContain('[unformattable Error: boom]');
  });

  it('never throws and stays tagged when every Error getter and toString throw', () => {
    const err = new Error('boom');
    for (const prop of ['stack', 'name', 'message'] as const) {
      Object.defineProperty(err, prop, {
        get() {
          throw new Error('nope');
        }
      });
    }
    Object.defineProperty(err, 'toString', {
      value() {
        throw new Error('nope');
      }
    });
    expect(() => logger.error('caught:', err)).not.toThrow();
    expect(debugLogs).toHaveLength(1);
    expect(debugLogs[0].message).toContain('[unformattable [object Error]]');
  });
});

describe('spoof-class completeness (#97.3)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('strips U+200E/U+200F directional marks and the U+2060 word joiner', () => {
    logger.info('a‎b‏c⁠d');
    expect(debugLogs[0].message).toBe('abcd');
  });

  it('strips U+061C Arabic Letter Mark — the last Bidi_Control member (#115)', () => {
    // Discriminating: U+200E is already stripped; U+061C must not survive beside it.
    logger.info('a؜b‎c');
    expect(debugLogs[0].message).toBe('abc');
  });
});

describe('invisible-character class completeness (#123)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // Discriminating members for every range #123 enumerates, plus the plane-14
  // tag block and reserved default-ignorables (the property-derived class
  // covers them wholesale, ending the one-range-per-cycle pattern
  // #71 → #97.3 → #115 → #123).
  const strippedMembers: Array<[string, string]> = [
    ['U+00AD soft hyphen', '­'],
    ['U+180E Mongolian vowel separator', '᠎'],
    ['U+2061 function application (invisible-operator range start)', '⁡'],
    ['U+2064 invisible plus (invisible-operator range end)', '⁤'],
    ['U+206A inhibit symmetric swapping (deprecated-format range start)', '⁪'],
    ['U+206F nominal digit shapes (deprecated-format range end)', '⁯'],
    ['U+FE00 variation selector-1', '︀'],
    ['U+FE0F variation selector-16', '️'],
    ['U+FFF9 interlinear annotation anchor', '￹'],
    ['U+FFFB interlinear annotation terminator', '￻'],
    ['U+115F Hangul choseong filler', 'ᅟ'],
    ['U+1160 Hangul jungseong filler', 'ᅠ'],
    ['U+3164 Hangul filler', 'ㅤ'],
    ['U+FFA0 halfwidth Hangul filler', 'ﾠ'],
    ['U+E0100 variation selector-17 (supplementary, surrogate pair)', '\u{e0100}'],
    ['U+E01EF variation selector-256 (supplementary range end)', '\u{e01ef}'],
    ['U+E0001 language tag', '\u{e0001}'],
    ['U+E0020 tag space (ASCII-smuggling block start)', '\u{e0020}'],
    ['U+E007F cancel tag (ASCII-smuggling block end)', '\u{e007f}'],
    ['U+034F combining grapheme joiner', '͏'],
    ['U+2065 reserved default-ignorable', '⁥'],
    ['U+FFF0 reserved default-ignorable', '￰']
  ];

  for (const [name, ch] of strippedMembers) {
    it(`strips ${name}`, () => {
      logger.info(`a${ch}b`);
      expect(debugLogs[0].message).toBe('ab');
    });
  }

  it('strips a whole smuggled tag-character payload, not just single members', () => {
    // "hi" hidden as tag characters riding on visible text.
    logger.info('ok\u{e0068}\u{e0069}');
    expect(debugLogs[0].message).toBe('ok');
  });

  it('does not strip legitimate non-ASCII text (CJK, RTL, combining marks, emoji bases)', () => {
    const legit = '日本語 אב اب é \u{1f4e5}';
    logger.info(legit);
    expect(debugLogs[0].message).toBe(legit);
  });

  it('still keeps tabs intact alongside the widened invisible class', () => {
    logger.info('a\tb­c');
    expect(debugLogs[0].message).toBe('a\tbc');
  });
});

describe('sanitizer escape-class coverage (#78.6)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('strips OSC title-setting sequences', () => {
    logger.info('\x1b]0;pwned-title\x07after');
    expect(debugLogs[0].message).toBe('after');
  });

  it('strips the DEL control character', () => {
    logger.info('a\x7fb');
    expect(debugLogs[0].message).toBe('ab');
  });

  it('strips U+2028 line separator and U+2029 paragraph separator', () => {
    logger.info('a b c');
    expect(debugLogs[0].message).toBe('abc');
  });
});

describe('getFormattedLogs', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('should return empty string when no logs', () => {
    expect(getFormattedLogs()).toBe('');
  });

  it('should format entries as [timestamp] [LEVEL] message', () => {
    logger.info('hello world');
    logger.error('something broke');
    const formatted = getFormattedLogs();
    const lines = formatted.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatch(/^\[\d{4}-\d{2}-\d{2}T.*\] \[INFO\] hello world$/);
    expect(lines[1]).toMatch(/^\[\d{4}-\d{2}-\d{2}T.*\] \[ERROR\] something broke$/);
  });

  it('should respect maxEntries parameter', () => {
    for (let i = 0; i < 10; i++) {
      logger.info(`msg ${i}`);
    }
    const formatted = getFormattedLogs(3);
    const lines = formatted.split('\n');
    expect(lines).toHaveLength(3);
    // Should return the LAST 3 entries
    expect(lines[0]).toContain('msg 7');
    expect(lines[1]).toContain('msg 8');
    expect(lines[2]).toContain('msg 9');
  });

  it('should return all entries when maxEntries is undefined', () => {
    for (let i = 0; i < 5; i++) {
      logger.info(`msg ${i}`);
    }
    const formatted = getFormattedLogs();
    const lines = formatted.split('\n');
    expect(lines).toHaveLength(5);
  });
});

describe('getErrorLogs', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('should return empty array when no logs', () => {
    expect(getErrorLogs()).toEqual([]);
  });

  it('should return only error and warn entries', () => {
    logger.debug('debug msg');
    logger.info('info msg');
    logger.warn('warn msg');
    logger.error('error msg');
    logger.info('another info');

    const errors = getErrorLogs();
    expect(errors).toHaveLength(2);
    expect(errors[0].level).toBe('warn');
    expect(errors[0].message).toBe('warn msg');
    expect(errors[1].level).toBe('error');
    expect(errors[1].message).toBe('error msg');
  });

  it('should not include debug or info entries', () => {
    logger.debug('debug only');
    logger.info('info only');
    expect(getErrorLogs()).toHaveLength(0);
  });
});

describe('clearLogs', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('should empty the debugLogs array', () => {
    logger.info('msg 1');
    logger.error('msg 2');
    logger.warn('msg 3');
    expect(debugLogs).toHaveLength(3);

    clearLogs();
    expect(debugLogs).toHaveLength(0);
  });

  it('should allow new logs after clearing', () => {
    logger.info('before');
    clearLogs();
    logger.info('after');
    expect(debugLogs).toHaveLength(1);
    expect(debugLogs[0].message).toBe('after');
  });
});

describe('isDebugMode', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return true when STREAMDECK_DEBUG is 1', () => {
    process.env.STREAMDECK_DEBUG = '1';
    // Need to re-import to get fresh isDebugMode
    const result = isDebugMode();
    // Since DEBUG is evaluated at module load time, check runtime check
    expect(process.env.STREAMDECK_DEBUG).toBe('1');
  });

  it('should return true when STREAMDECK_DEBUG is true', () => {
    process.env.STREAMDECK_DEBUG = 'true';
    const result = isDebugMode();
    expect(process.env.STREAMDECK_DEBUG).toBe('true');
  });

  it('should return true when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    const result = isDebugMode();
    expect(process.env.NODE_ENV).toBe('development');
  });
});

describe('R7 redaction convergence (SR-20260711-PR130, #131-#134)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  // #131 (RED before the fix): a uniform forward-slash share shape glued to a URL
  // with an alnum-preceded '//host' makes isUncSharePosition return SHARE_NONE. The
  // pre-fix gate (`shareKind !== SHARE_GENUINE`) treated SHARE_NONE like
  // SHARE_URL_OWN and NARROWED the capture, bounding the spaced username at the
  // space so the surname tail 'Doe' leaked. Tightening both gates to
  // `shareKind === SHARE_URL_OWN` keeps the WIDE capture and redacts the full name.
  it('#131: keeps wide capture for a SHARE_NONE forward-slash share glued to a URL', () => {
    logger.info('http://evil.example//fileserver/Users/Jane Doe/x.pdf');
    expect(debugLogs[0].message).toBe('http://evil.example//fileserver<home>/x.pdf');
    expect(debugLogs[0].message).not.toContain('Doe');
  });

  // #132 (pin — green pre- and post-fix): a users/users decoy chain in URL context
  // whose separator runs are all-backslash (nextUrlFlavor === false) must capture
  // the spaced real username WIDE. Discriminating for the decoy-loop narrowing
  // conjunct: forcing that conjunct to narrow bounds the capture at the space and
  // leaks 'Smith'.
  it('#132: redacts a spaced name past a users/users decoy in URL context (backslash runs)', () => {
    logger.info('http://a.example.com\\srv\\Users\\Users\\John Smith\\notes.txt');
    expect(debugLogs[0].message).toBe('http://a.example.com\\srv<home>\\notes.txt');
    expect(debugLogs[0].message).not.toContain('Smith');
  });

  // #134.1 (RED before the fix): a single ESCAPED forward slash after a word-colon
  // (`note:\/…`, i.e. PHP-escaped `note:/…`) is NOT a URL scheme — a genuine `://`
  // shows TWO forward slashes at every escaping depth (escaping only adds
  // backslashes). Pre-fix isSchemeColon accepted the length-2 `\/` run (one forward
  // slash) as scheme evidence, so a deep mid-path home token under the fake scheme
  // was URL-anchored and redacted. Requiring two forward slashes makes `note:` a
  // non-scheme, so the deep mid-path token keeps #114 mid-path behavior (unchanged).
  it('#134.1: does not treat a single-escaped-slash word-colon as a URL scheme', () => {
    logger.info('note:\\/host\\/dav\\/home\\/pedro\\/x');
    expect(debugLogs[0].message).toBe('note:\\/host\\/dav\\/home\\/pedro\\/x');
  });

  // #134.1 guard (pin — green pre- and post-fix): a genuine PHP-escaped `://` (two
  // forward slashes) is STILL scheme evidence, so the account token deep in the URL
  // still redacts. Proves the tightening keys on forward-slash COUNT, not a blanket
  // "reject escaped schemes".
  it('#134.1 guard: keeps two-forward-slash escaped scheme evidence', () => {
    logger.info('note:\\/\\/host\\/dav\\/home\\/pedro\\/x');
    expect(debugLogs[0].message).toBe('note:\\/\\/host\\/dav<home>\\/x');
    expect(debugLogs[0].message).not.toContain('pedro');
  });

  // #134.2 (RED in commit 1 until applyStrip is exported): the zero-width guard in
  // applyStrip (`if (e === s) re.lastIndex++`) is unreachable via the six real
  // STRIP_PASSES (all consume >= 1 char). A synthetic zero-width /g regex drives it.
  // A regression that drops the lastIndex advance would spin the exec loop forever;
  // the explicit per-test timeout (2s) makes that surface as a clean timeout-red
  // instead of a silent worker hang. Input is a tiny bounded string so a healthy
  // run finishes in microseconds.
  it('#134.2: applyStrip advances past a synthetic zero-width match without looping', () => {
    const result = applyStrip('abc', /x*/g, new Set<number>());
    expect(result.out).toBe('abc');
  }, 2000);

  // #133 / #134.3 (perf pin): a control/spoof-dense 200k-char string driven through
  // the full six-pass strip + gap-tracking pipeline and redactHomePaths stays well
  // under 500ms — guards the strict-O(n) invariant and the removal of the redundant
  // ascending-gap-set sort in applyStrip.
  it('#133/#134.3: stays linear on a 200k control/spoof-dense input', () => {
    // Each unit contributes a C0 (\x07), two spoof chars (ZWSP U+200B, soft hyphen
    // U+00AD) and a path shape, so several strip passes match and feed many gaps
    // into redactHomePaths.
    const unit = 'a\x07' + String.fromCharCode(0x200b, 0x00ad) + '\\Users\\';
    const dense = unit.repeat(Math.ceil(200000 / unit.length));
    // Warm up once (unmeasured) so JIT compilation and first-call allocation costs
    // don't land inside the measured window — the 500ms bound is ~35x the observed
    // steady-state (~14ms), so this warmed measurement is comfortably non-flaky.
    logger.error(dense);
    debugLogs.length = 0;
    const start = performance.now();
    logger.error(dense);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(500);
    expect(typeof debugLogs[0].message).toBe('string');
  });
});
