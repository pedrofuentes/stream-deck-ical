/**
 * Integration tests for Outlook/Office 365 feeds
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseICalFeed } from '../../src/services/ical-parser.js';

describe('Outlook Integration', () => {
  it('should parse basic Outlook events with Windows timezone', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/outlook/basic.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('outlook');
    expect(result.events).toHaveLength(1);

    const event = result.events[0];
    expect(event.summary).toBe('Team Meeting');
    expect(event.location).toBe('Conference Room 1');
    expect(event.start).toBeInstanceOf(Date);
    expect(event.end).toBeInstanceOf(Date);
  });

  it('should parse recurring Outlook events', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/outlook/recurring.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('outlook');
    expect(result.events.length).toBeGreaterThanOrEqual(2);

    // Find recurring event
    const recurringEvent = result.events.find(e => e.isRecurring);
    expect(recurringEvent).toBeDefined();
    expect(recurringEvent?.summary).toMatch(/Standup|Huddle/);
  });
});
