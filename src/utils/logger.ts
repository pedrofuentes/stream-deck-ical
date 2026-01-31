/**
 * Logger utility for debugging
 */

const DEBUG = process.env.DEBUG === 'true' || process.env.NODE_ENV === 'development';

export const logger = {
  debug: (...args: any[]): void => {
    if (DEBUG) {
      console.log('[DEBUG]', ...args);
    }
  },

  info: (...args: any[]): void => {
    console.log('[INFO]', ...args);
  },

  warn: (...args: any[]): void => {
    console.warn('[WARN]', ...args);
  },

  error: (...args: any[]): void => {
    console.error('[ERROR]', ...args);
  }
};
