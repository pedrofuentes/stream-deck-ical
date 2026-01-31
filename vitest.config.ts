/**
 * Vitest configuration
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '__fixtures__/'
      ]
    },
    setupFiles: [],
    testTimeout: 10000,
    hookTimeout: 10000
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
});
