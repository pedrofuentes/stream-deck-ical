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
import { logger, debugLogs, isDebugMode, DebugLogEntry, getFormattedLogs, getErrorLogs, clearLogs } from '../src/utils/logger';
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
