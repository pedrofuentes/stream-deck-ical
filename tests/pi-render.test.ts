// @vitest-environment happy-dom
/**
 * DOM regression tests for the pi/setup.js renderCalendarList DOM-XSS fix (#67).
 *
 * pi/setup.js is plain JS loaded directly by the Property Inspector webview
 * (see tests/pi-url-parity.test.ts for the same constraint). PR #61 rewrote
 * renderCalendarList from an innerHTML template to createElement/
 * textContent/dataset to close CodeQL alert js/xss-through-dom, but shipped
 * with zero automated coverage — a regression (or partial revert to
 * innerHTML) could ship silently. This file extracts the function via the
 * `// BEGIN mirror:render` / `// END mirror:render` markers and evaluates it
 * against a happy-dom document, injecting document/calendars/editCalendar/
 * deleteCalendar/defaultCalendarId as Function parameters so it can run in
 * isolation without loading the rest of the webview.
 *
 * The XSS assertions below pin already-fixed behavior (they pass against
 * the current renderCalendarList) — this is coverage for #67, not a new
 * fix. Discriminating check performed manually (not committed): reverting
 * renderCalendarList's calendar-name/url output to an innerHTML template
 * makes the malicious-payload tests fail (see PR body for the captured
 * failure output).
 *
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SETUP_JS_PATH = path.join(__dirname, '../pi/setup.js');
const BEGIN_MARKER = '// BEGIN mirror:render';
const END_MARKER = '// END mirror:render';

interface Calendar {
  id: string;
  name: string;
  url: string;
  timeWindow?: number;
  excludeAllDay?: boolean;
}

type RenderCalendarList = () => void;

function extractMirrorBlock(): string {
  const source = readFileSync(SETUP_JS_PATH, 'utf-8');
  const beginIdx = source.indexOf(BEGIN_MARKER);
  const endIdx = source.indexOf(END_MARKER);

  if (beginIdx === -1 || endIdx === -1 || endIdx < beginIdx) {
    throw new Error(
      `pi/setup.js is missing the "${BEGIN_MARKER}" / "${END_MARKER}" markers ` +
      'that delimit renderCalendarList (#67).'
    );
  }

  return source.slice(beginIdx + BEGIN_MARKER.length, endIdx);
}

/**
 * Evaluate the marked renderCalendarList block in isolation, injecting the
 * globals it reads/calls as Function parameters (document, calendars,
 * editCalendar, deleteCalendar, defaultCalendarId) instead of relying on
 * anything in the outer test module scope.
 */
function loadRenderCalendarList(
  calendars: Calendar[],
  editCalendar: (id: string) => void,
  deleteCalendar: (id: string) => void
): RenderCalendarList {
  const block = extractMirrorBlock();
  const factory = new Function(
    'document',
    'calendars',
    'editCalendar',
    'deleteCalendar',
    'defaultCalendarId',
    `${block}\nreturn renderCalendarList;`
  );
  return factory(document, calendars, editCalendar, deleteCalendar, null) as RenderCalendarList;
}

function getListEl(): HTMLElement {
  const el = document.getElementById('calendar-list');
  if (!el) throw new Error('#calendar-list not found in test fixture');
  return el;
}

describe('pi/setup.js renderCalendarList DOM rendering (#67)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="calendar-list"></div>';
  });

  it('the mirrored block evaluates without throwing', () => {
    expect(() => loadRenderCalendarList([], () => {}, () => {})).not.toThrow();
  });

  describe('malicious calendar data renders as literal text (js/xss-through-dom pin)', () => {
    it('cal.name with an <img onerror> payload renders as text, not an injected element', () => {
      const payload = '<img src=x onerror=alert(1)>';
      const render = loadRenderCalendarList(
        [{ id: 'cal1', name: payload, url: 'https://example.com/cal.ics' }],
        () => {},
        () => {}
      );
      render();

      const listEl = getListEl();
      expect(listEl.querySelector('img, script')).toBeNull();
      expect(listEl.querySelector('.calendar-name')?.textContent).toContain(payload);
    });

    it('cal.url with a script-injection payload renders as text, not an injected element', () => {
      const payload = '"><script>x</script>';
      const render = loadRenderCalendarList(
        [{ id: 'cal1', name: 'Work', url: payload }],
        () => {},
        () => {}
      );
      render();

      const listEl = getListEl();
      expect(listEl.querySelector('img, script')).toBeNull();
      const urlEl = listEl.querySelector('.calendar-url') as HTMLElement;
      expect(urlEl.textContent).toBe(payload);
      expect(urlEl.getAttribute('title')).toBe(payload);
    });

    it('cal.id with quotes/angle brackets lands only in dataset.id, never parsed as HTML', () => {
      const maliciousId = '"><img src=x onerror=alert(1)>';
      const render = loadRenderCalendarList(
        [{ id: maliciousId, name: 'Work', url: 'https://example.com/cal.ics' }],
        () => {},
        () => {}
      );
      render();

      const listEl = getListEl();
      expect(listEl.querySelector('img')).toBeNull();
      const item = listEl.querySelector('.calendar-item') as HTMLElement;
      expect(item.dataset.id).toBe(maliciousId);
      const editBtn = listEl.querySelector('.btn-edit') as HTMLElement;
      expect(editBtn.dataset.id).toBe(maliciousId);
    });
  });

  describe('legit data: structure, classes, and listeners are preserved', () => {
    const calendars: Calendar[] = [
      { id: 'cal-default', name: 'Work', url: 'https://example.com/work.ics' },
      { id: 'cal-second', name: 'Personal', url: 'https://example.com/personal.ics' }
    ];

    it('renders calendar-item/default on the first item and plain calendar-item on the rest', () => {
      const render = loadRenderCalendarList(calendars, () => {}, () => {});
      render();

      const items = getListEl().querySelectorAll('.calendar-item');
      expect(items).toHaveLength(2);
      expect(items[0].className).toBe('calendar-item default');
      expect(items[1].className).toBe('calendar-item');
      expect((items[0] as HTMLElement).dataset.id).toBe('cal-default');
      expect((items[1] as HTMLElement).dataset.id).toBe('cal-second');
    });

    it('preserves calendar-header/calendar-info/calendar-name structure', () => {
      const render = loadRenderCalendarList(calendars, () => {}, () => {});
      render();

      const first = getListEl().querySelector('.calendar-item') as HTMLElement;
      const header = first.querySelector(':scope > .calendar-header');
      expect(header).not.toBeNull();
      expect(header?.querySelector('.calendar-info')).not.toBeNull();
      expect(header?.querySelector('.calendar-info > .calendar-name')).not.toBeNull();
      expect(header?.querySelector('.calendar-info > .calendar-url')).not.toBeNull();
    });

    it('shows a default-badge on the first calendar-name only', () => {
      const render = loadRenderCalendarList(calendars, () => {}, () => {});
      render();

      const items = getListEl().querySelectorAll('.calendar-item');
      const firstBadge = items[0].querySelector('.calendar-name .default-badge');
      const secondBadge = items[1].querySelector('.calendar-name .default-badge');
      expect(firstBadge).not.toBeNull();
      expect(firstBadge?.textContent).toBe('Default');
      expect(secondBadge).toBeNull();
    });

    it('sets the calendar-url title attribute and text to the calendar URL', () => {
      const render = loadRenderCalendarList(calendars, () => {}, () => {});
      render();

      const items = getListEl().querySelectorAll('.calendar-item');
      const urlEl = items[1].querySelector('.calendar-url') as HTMLElement;
      expect(urlEl.textContent).toBe('https://example.com/personal.ics');
      expect(urlEl.getAttribute('title')).toBe('https://example.com/personal.ics');
    });

    it('shows btn-edit on every item, and btn-delete on all but the first', () => {
      const render = loadRenderCalendarList(calendars, () => {}, () => {});
      render();

      const items = getListEl().querySelectorAll('.calendar-item');
      expect(items[0].querySelector('.btn-edit')).not.toBeNull();
      expect(items[0].querySelector('.btn-delete')).toBeNull();
      expect(items[1].querySelector('.btn-edit')).not.toBeNull();
      expect(items[1].querySelector('.btn-delete')).not.toBeNull();
    });

    it('wires btn-edit/btn-delete clicks to the injected editCalendar/deleteCalendar with the right id', () => {
      const editSpy = vi.fn();
      const deleteSpy = vi.fn();
      const render = loadRenderCalendarList(calendars, editSpy, deleteSpy);
      render();

      const items = getListEl().querySelectorAll('.calendar-item');
      (items[0].querySelector('.btn-edit') as HTMLElement).click();
      expect(editSpy).toHaveBeenCalledWith('cal-default');
      expect(editSpy).toHaveBeenCalledTimes(1);

      (items[1].querySelector('.btn-delete') as HTMLElement).click();
      expect(deleteSpy).toHaveBeenCalledWith('cal-second');
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('renders the empty-state message when there are no calendars', () => {
    const render = loadRenderCalendarList([], () => {}, () => {});
    render();

    const listEl = getListEl();
    expect(listEl.querySelector('.empty-calendars')).not.toBeNull();
    expect(listEl.textContent).toContain('No calendars configured. Add one below.');
    expect(listEl.querySelector('.calendar-item')).toBeNull();
  });
});
