/**
 * Diagnostics service for exporting debug information
 * 
 * Compiles a comprehensive diagnostic report that users can copy
 * and paste into GitHub issues for easier bug triaging.
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { calendarManager } from './calendar-manager.js';
import { logger, debugLogs, getFormattedLogs, getErrorLogs } from '../utils/logger.js';

/**
 * Diagnostic report structure
 */
export interface DiagnosticReport {
  /** Plugin version from package.json */
  pluginVersion: string;
  /** Current timestamp */
  timestamp: string;
  /** Node.js version */
  nodeVersion: string;
  /** Platform (win32, darwin, linux) */
  platform: string;
  /** Architecture (x64, arm64) */
  arch: string;
  /** Calendar summary */
  calendars: CalendarDiagnostic[];
  /** Error/warning summary */
  errorSummary: ErrorSummary;
  /** Total log entry count currently in buffer */
  totalLogEntries: number;
  /** Formatted log entries */
  logs: string;
}

interface CalendarDiagnostic {
  id: string;
  url: string;  // Redacted for privacy
  status: string;
  eventCount: number;
  lastFetch: string | null;
  provider: string | undefined;
  refCount: number;
  timeWindow: number;
  excludeAllDay: boolean;
}

interface ErrorSummary {
  totalErrors: number;
  totalWarnings: number;
  recentErrors: string[];
}

/** Plugin version — updated at build or set from manifest */
let pluginVersion = '2.4.2';

/**
 * Set the plugin version (called during initialization)
 */
export function setPluginVersion(version: string): void {
  pluginVersion = version;
}

/**
 * Redact URL for privacy — keep scheme + host, mask the rest
 */
function redactUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;
    const redactedPath = path.length > 10
      ? path.substring(0, 10) + '...[redacted]'
      : path;
    return `${parsed.protocol}//${parsed.host}${redactedPath}`;
  } catch {
    return '[invalid URL]';
  }
}

/**
 * Compile a full diagnostic report
 */
export function compileDiagnosticReport(): DiagnosticReport {
  // Gather calendar info from CalendarManager
  const allCalendars = calendarManager.getAllCalendars();
  const calendarDiags: CalendarDiagnostic[] = [];

  for (const [id, cal] of allCalendars) {
    calendarDiags.push({
      id,
      url: redactUrl(cal.url),
      status: cal.cache.status,
      eventCount: cal.cache.events.length,
      lastFetch: cal.cache.lastFetch
        ? new Date(cal.cache.lastFetch).toISOString()
        : null,
      provider: cal.cache.provider,
      refCount: cal.refCount,
      timeWindow: cal.timeWindow,
      excludeAllDay: cal.excludeAllDay,
    });
  }

  // Error summary
  const errorLogs = getErrorLogs();
  const errors = errorLogs.filter(l => l.level === 'error');
  const warnings = errorLogs.filter(l => l.level === 'warn');

  const errorSummary: ErrorSummary = {
    totalErrors: errors.length,
    totalWarnings: warnings.length,
    recentErrors: errors.slice(-10).map(e => `[${e.timestamp}] ${e.message}`),
  };

  return {
    pluginVersion,
    timestamp: new Date().toISOString(),
    nodeVersion: typeof process !== 'undefined' ? process.version : 'unknown',
    platform: typeof process !== 'undefined' ? process.platform : 'unknown',
    arch: typeof process !== 'undefined' ? process.arch : 'unknown',
    calendars: calendarDiags,
    errorSummary,
    totalLogEntries: debugLogs.length,
    logs: getFormattedLogs(),
  };
}

/**
 * Format diagnostic report as a copy-pasteable text block for GitHub issues
 */
export function formatDiagnosticText(report: DiagnosticReport): string {
  const lines: string[] = [];

  lines.push('=== Stream Deck iCal Plugin — Diagnostic Report ===');
  lines.push('');
  lines.push(`Plugin Version: ${report.pluginVersion}`);
  lines.push(`Timestamp:      ${report.timestamp}`);
  lines.push(`Node.js:        ${report.nodeVersion}`);
  lines.push(`Platform:       ${report.platform} (${report.arch})`);

  lines.push('');
  lines.push('--- Calendars ---');
  if (report.calendars.length === 0) {
    lines.push('  (none configured)');
  } else {
    for (const cal of report.calendars) {
      lines.push(`  [${cal.id}] ${cal.url}`);
      lines.push(`    Status: ${cal.status} | Events: ${cal.eventCount} | Provider: ${cal.provider || 'unknown'}`);
      lines.push(`    Last fetch: ${cal.lastFetch || 'never'} | RefCount: ${cal.refCount}`);
      lines.push(`    TimeWindow: ${cal.timeWindow}d | ExcludeAllDay: ${cal.excludeAllDay}`);
    }
  }

  lines.push('');
  lines.push('--- Error Summary ---');
  lines.push(`  Errors:   ${report.errorSummary.totalErrors}`);
  lines.push(`  Warnings: ${report.errorSummary.totalWarnings}`);
  if (report.errorSummary.recentErrors.length > 0) {
    lines.push('  Recent errors:');
    for (const err of report.errorSummary.recentErrors) {
      lines.push(`    ${err}`);
    }
  }

  lines.push('');
  lines.push(`--- Logs (${report.totalLogEntries} entries) ---`);
  lines.push(report.logs || '  (no log entries)');

  lines.push('');
  lines.push('=== End of Diagnostic Report ===');

  return lines.join('\n');
}
