/**
 * Integration tests for Apple Calendar feeds
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseICalFeed } from '../../src/services/ical-parser.js';

describe('Apple Calendar Integration', () => {
  it('should parse basic Apple Calendar events', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/apple/basic.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('apple');
    expect(result.events).toHaveLength(1);

    const event = result.events[0];
    expect(event.summary).toBe('Product Planning');
    expect(event.location).toBe('Building 2');
    expect(event.start).toBeInstanceOf(Date);
    expect(event.end).toBeInstanceOf(Date);
  });

  it('should parse recurring Apple Calendar events', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/apple/recurring.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('apple');
    expect(result.events).toHaveLength(1);

    const event = result.events[0];
    expect(event.isRecurring).toBe(true);
    expect(event.summary).toBe('Weekly Review');
  });
});
