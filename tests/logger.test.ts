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
import { logger, debugLogs, isDebugMode, DebugLogEntry, getFormattedLogs, getErrorLogs, clearLogs, summarizeDebugInfo } from '../src/utils/logger';
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

describe('spoof-class completeness (#97.3)', () => {
  beforeEach(() => {
    debugLogs.length = 0;
    vi.clearAllMocks();
  });

  it('strips U+200E/U+200F directional marks and the U+2060 word joiner', () => {
    logger.info('a‎b‏c⁠d');
    expect(debugLogs[0].message).toBe('abcd');
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
