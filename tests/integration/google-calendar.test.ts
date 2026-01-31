/**
 * Integration tests for Google Calendar feeds
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseICalFeed } from '../../src/services/ical-parser.js';

describe('Google Calendar Integration', () => {
  it('should parse basic Google Calendar events', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/google-calendar/basic.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('google');
    expect(result.events).toHaveLength(2);
    expect(result.timezone).toBe('America/New_York');

    const firstEvent = result.events[0];
    expect(firstEvent.summary).toBe('Team Standup');
    expect(firstEvent.location).toBe('Conference Room A');
    expect(firstEvent.start).toBeInstanceOf(Date);
    expect(firstEvent.end).toBeInstanceOf(Date);
  });

  it('should parse recurring Google Calendar events', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/google-calendar/recurring.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('google');
    expect(result.events.length).toBeGreaterThanOrEqual(2);

    // Check for RRULE presence (will be expanded later in the pipeline)
    const recurringEvent = result.events.find(e => e.isRecurring);
    expect(recurringEvent).toBeDefined();
  });

  it('should parse all-day Google Calendar events', async () => {
    const icsContent = readFileSync(
      join(process.cwd(), '__fixtures__/google-calendar/all-day.ics'),
      'utf-8'
    );

    const result = await parseICalFeed(icsContent);

    expect(result.provider).toBe('google');
    expect(result.events).toHaveLength(1);

    const event = result.events[0];
    expect(event.summary).toBe('All Hands Meeting');
    expect(event.start).toBeInstanceOf(Date);
    expect(event.end).toBeInstanceOf(Date);
  });
});
