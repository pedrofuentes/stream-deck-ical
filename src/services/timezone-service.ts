/**
 * Timezone service for handling Windows and IANA timezone conversions
 */

import * as windowsiana from 'windows-iana';
import { TimezoneInfo } from '../types/index.js';
import { logger } from '../utils/logger.js';

/**
 * Parse timezone from TZID parameter
 * Handles quoted timezone names (Outlook format) and Windows timezone names
 * @param tzid - Raw TZID string from iCal
 * @returns Timezone information
 */
export function parseTimezone(tzid: string): TimezoneInfo {
  if (!tzid) {
    return {
      ianaName: 'UTC',
      isQuoted: false
    };
  }

  // Check if timezone is quoted (Outlook format: TZID="Eastern Standard Time")
  const isQuoted = tzid.startsWith('"') && tzid.endsWith('"');
  let cleanTzid = isQuoted ? tzid.slice(1, -1) : tzid;

  // Try to detect if this is a Windows timezone name
  const windowsTimezonePattern = / Standard Time$| Daylight Time$/;
  const isWindowsTimezone = windowsTimezonePattern.test(cleanTzid);

  let ianaName = cleanTzid;
  let windowsName: string | undefined;

  if (isWindowsTimezone) {
    // Convert Windows timezone to IANA
    windowsName = cleanTzid;
    const ianaTimezones = windowsiana.findIana(cleanTzid);
    
    if (ianaTimezones && ianaTimezones.length > 0) {
      ianaName = ianaTimezones[0];
      logger.debug(`Converted Windows timezone "${windowsName}" to IANA "${ianaName}"`);
    } else {
      logger.warn(`Could not convert Windows timezone "${windowsName}" to IANA, using as-is`);
    }
  }

  return {
    windowsName,
    ianaName,
    isQuoted
  };
}

/**
 * Get IANA timezone from parameters array
 * @param params - Parameters array from iCal parser
 * @returns IANA timezone name
 */
export function getTimezoneFromParams(params: string[]): string {
  if (!params || params.length === 0) {
    return 'UTC';
  }

  for (const param of params) {
    if (param.startsWith('TZID=')) {
      const tzid = param.substring(5);
      const tzInfo = parseTimezone(tzid);
      return tzInfo.ianaName;
    }
  }

  return 'UTC';
}

/**
 * Validate that a timezone is a valid IANA timezone
 * @param timezone - Timezone name to validate
 * @returns True if timezone is valid
 */
export function isValidIANATimezone(timezone: string): boolean {
  try {
    // Try to create a date with the timezone to validate it
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (e) {
    return false;
  }
}
