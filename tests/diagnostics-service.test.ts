/**
 * Tests for diagnostics service
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the logger
vi.mock('../src/utils/logger', () => {
  const logs: any[] = [];
  return {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    },
    debugLogs: logs,
    getFormattedLogs: vi.fn(() => logs.map(l => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}`).join('\n')),
    getErrorLogs: vi.fn(() => logs.filter(l => l.level === 'error' || l.level === 'warn')),
    clearLogs: vi.fn(() => { logs.length = 0; }),
    isDebugMode: vi.fn(() => false)
  };
});

// Mock the calendar manager
vi.mock('../src/services/calendar-manager', () => ({
  calendarManager: {
    getAllCalendars: vi.fn(() => new Map()),
    getActionMappings: vi.fn(() => new Map())
  }
}));

import { compileDiagnosticReport, formatDiagnosticText, setPluginVersion } from '../src/services/diagnostics-service';
import { calendarManager } from '../src/services/calendar-manager';
import { debugLogs } from '../src/utils/logger';

describe('Diagnostics Service', () => {
  beforeEach(() => {
    setPluginVersion('2.4.0-test');
  });

  describe('compileDiagnosticReport', () => {
    it('should return a valid report structure', () => {
      const report = compileDiagnosticReport();

      expect(report).toBeDefined();
      expect(report.pluginVersion).toBe('2.4.0-test');
      expect(report.timestamp).toBeDefined();
      expect(typeof report.nodeVersion).toBe('string');
      expect(typeof report.platform).toBe('string');
      expect(typeof report.arch).toBe('string');
      expect(Array.isArray(report.calendars)).toBe(true);
      expect(report.errorSummary).toBeDefined();
      expect(typeof report.totalLogEntries).toBe('number');
      expect(typeof report.logs).toBe('string');
    });

    it('should report empty calendars when none configured', () => {
      const report = compileDiagnosticReport();
      expect(report.calendars).toEqual([]);
    });
  });

  describe('formatDiagnosticText', () => {
    it('should produce a readable text block', () => {
      const report = compileDiagnosticReport();
      const text = formatDiagnosticText(report);

      expect(text).toContain('Stream Deck iCal Plugin');
      expect(text).toContain('Diagnostic Report');
      expect(text).toContain('Plugin Version: 2.4.0-test');
      expect(text).toContain('--- Calendars ---');
      expect(text).toContain('--- Error Summary ---');
      expect(text).toContain('--- Logs');
      expect(text).toContain('End of Diagnostic Report');
    });

    it('should show (none configured) when no calendars', () => {
      const report = compileDiagnosticReport();
      const text = formatDiagnosticText(report);
      expect(text).toContain('(none configured)');
    });
  });

  describe('report with populated calendars', () => {
    it('should include calendar details when calendars are configured', () => {
      // Mock calendars to return a populated map
      const mockCalendars = new Map([
        ['cal_abc123', {
          id: 'cal_abc123',
          url: 'https://calendar.google.com/calendar/ical/user%40gmail.com/basic.ics',
          timeWindow: 3,
          excludeAllDay: true,
          refCount: 2,
          cache: {
            version: 5,
            status: 'LOADED' as const,
            events: [
              { uid: 'e1', summary: 'Meeting', start: new Date(), end: new Date(), isAllDay: false, isRecurring: false },
              { uid: 'e2', summary: 'Lunch', start: new Date(), end: new Date(), isAllDay: false, isRecurring: false }
            ],
            lastFetch: Date.now(),
            provider: 'google' as const
          }
        }]
      ]);
      vi.mocked(calendarManager.getAllCalendars).mockReturnValueOnce(mockCalendars as any);

      const report = compileDiagnosticReport();

      expect(report.calendars).toHaveLength(1);
      expect(report.calendars[0].id).toBe('cal_abc123');
      expect(report.calendars[0].status).toBe('LOADED');
      expect(report.calendars[0].eventCount).toBe(2);
      expect(report.calendars[0].provider).toBe('google');
      expect(report.calendars[0].refCount).toBe(2);
      expect(report.calendars[0].timeWindow).toBe(3);
      expect(report.calendars[0].excludeAllDay).toBe(true);
      expect(report.calendars[0].lastFetch).not.toBeNull();
    });

    it('should redact URL in calendar diagnostics (keep host, mask path)', () => {
      const mockCalendars = new Map([
        ['cal_xyz', {
          id: 'cal_xyz',
          url: 'https://calendar.google.com/calendar/ical/very-long-secret-calendar-id%40group.calendar.google.com/private-key/basic.ics',
          timeWindow: 3,
          excludeAllDay: false,
          refCount: 1,
          cache: {
            version: 1,
            status: 'LOADED' as const,
            events: [],
            lastFetch: Date.now(),
            provider: 'google' as const
          }
        }]
      ]);
      vi.mocked(calendarManager.getAllCalendars).mockReturnValueOnce(mockCalendars as any);

      const report = compileDiagnosticReport();

      // URL should be redacted: scheme + host preserved, path truncated
      expect(report.calendars[0].url).toContain('calendar.google.com');
      expect(report.calendars[0].url).toContain('[redacted]');
      // Should NOT contain the full private calendar path
      expect(report.calendars[0].url).not.toContain('private-key');
    });

    it('should handle invalid URL gracefully in redaction', () => {
      const mockCalendars = new Map([
        ['cal_bad', {
          id: 'cal_bad',
          url: 'not-a-valid-url',
          timeWindow: 3,
          excludeAllDay: false,
          refCount: 1,
          cache: {
            version: 0,
            status: 'INVALID_URL' as const,
            events: [],
            lastFetch: undefined,
            provider: undefined
          }
        }]
      ]);
      vi.mocked(calendarManager.getAllCalendars).mockReturnValueOnce(mockCalendars as any);

      const report = compileDiagnosticReport();
      expect(report.calendars[0].url).toBe('[invalid URL]');
    });
  });

  describe('formatDiagnosticText with calendars', () => {
    it('should include calendar details in formatted output', () => {
      const mockCalendars = new Map([
        ['cal_fmt', {
          id: 'cal_fmt',
          url: 'https://example.com/cal.ics',
          timeWindow: 7,
          excludeAllDay: false,
          refCount: 1,
          cache: {
            version: 3,
            status: 'LOADED' as const,
            events: [{ uid: 'e1', summary: 'X', start: new Date(), end: new Date(), isAllDay: false, isRecurring: false }],
            lastFetch: Date.now(),
            provider: 'outlook' as const
          }
        }]
      ]);
      vi.mocked(calendarManager.getAllCalendars).mockReturnValueOnce(mockCalendars as any);

      const report = compileDiagnosticReport();
      const text = formatDiagnosticText(report);

      expect(text).toContain('[cal_fmt]');
      expect(text).toContain('Status: LOADED');
      expect(text).toContain('Events: 1');
      expect(text).toContain('Provider: outlook');
      expect(text).toContain('RefCount: 1');
      expect(text).toContain('TimeWindow: 7d');
      expect(text).toContain('ExcludeAllDay: false');
      // Should NOT contain "(none configured)"
      expect(text).not.toContain('(none configured)');
    });
  });

  describe('error summary with data', () => {
    it('should report errors and warnings from log buffer', () => {
      // Push mock entries into the debugLogs array (which is the mocked logger's logs)
      debugLogs.push(
        { timestamp: '2026-02-22T10:00:00.000Z', level: 'error', message: 'Fetch failed: timeout' },
        { timestamp: '2026-02-22T10:01:00.000Z', level: 'warn', message: 'Retrying connection' },
        { timestamp: '2026-02-22T10:02:00.000Z', level: 'info', message: 'Normal log' },
        { timestamp: '2026-02-22T10:03:00.000Z', level: 'error', message: 'Parse error in VEVENT' }
      );

      const report = compileDiagnosticReport();

      expect(report.errorSummary.totalErrors).toBe(2);
      expect(report.errorSummary.totalWarnings).toBe(1);
      expect(report.errorSummary.recentErrors).toHaveLength(2);
      expect(report.errorSummary.recentErrors[0]).toContain('Fetch failed: timeout');
      expect(report.errorSummary.recentErrors[1]).toContain('Parse error in VEVENT');
    });
  });});