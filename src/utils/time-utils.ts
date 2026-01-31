/**
 * Time utilities for formatting and calculations
 */

/**
 * Convert seconds to human-readable time format
 * @param timeInSeconds - Time in seconds (can be negative)
 * @returns Formatted time string (e.g., "2h 30m", "45m 20s", "15s")
 */
export function sec2time(timeInSeconds: number): string {
  let sign = '';
  if (timeInSeconds < 0) {
    timeInSeconds = Math.abs(timeInSeconds);
    sign = '- ';
  }

  const time = Math.floor(timeInSeconds);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  if (hours > 1) return `${sign}${hours}h`;
  if (hours > 0 && minutes === 0) return `${sign}${hours}h 0m`;
  if (hours > 0) return `${sign}${hours}h ${minutes}m`;
  if (minutes > 0) return `${sign}${minutes}m ${seconds}s`;

  return `${sign}${seconds}s`;
}

/**
 * Calculate difference in seconds between a date and now
 * @param date - Target date
 * @returns Difference in seconds (negative if in past)
 */
export function secondsUntil(date: Date): number {
  const now = Date.now();
  const target = date.getTime();
  return Math.floor((target - now) / 1000);
}

/**
 * Calculate difference in seconds between now and a date (opposite of secondsUntil)
 * @param date - Target date
 * @returns Difference in seconds (positive if date is in past)
 */
export function secondsSince(date: Date): number {
  const now = Date.now();
  const target = date.getTime();
  return Math.floor((now - target) / 1000);
}

/**
 * Check if a time is within a certain number of hours from now
 * @param date - Date to check
 * @param hours - Number of hours for the window
 * @returns True if date is within the time window
 */
export function isWithinHours(date: Date, hours: number): boolean {
  const now = Date.now();
  const spread = (hours * 60 * 60 * 1000) / 2;
  const event = date.getTime();
  const bottomRange = now - spread;
  const topRange = now + spread;

  return event >= bottomRange && event <= topRange;
}

/**
 * Sleep for a specified number of milliseconds
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
