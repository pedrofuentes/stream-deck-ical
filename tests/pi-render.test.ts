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
import { extractMirrorBlock } from './helpers/mirror-block.js';

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

/**
 * The evaluated renderCalendarList mirror. `getDefaultCalendarId` exposes
 * the block's local `defaultCalendarId` binding, which the injected
 * Function parameter of the same name shadows — reassigning it inside
 * renderCalendarList mutates only that local, so it is otherwise
 * unobservable from outside the factory (#89 addendum item 5).
 */
type RenderCalendarList = (() => void) & { getDefaultCalendarId: () => string | null };

/**
 * Query `selector` under `parent` and assert it was found before returning
 * it. A bare `as HTMLElement` cast after querySelector turns the exact
 * regression this suite guards against (an element renamed/removed) into an
 * opaque `Cannot read properties of null` failure instead of one naming the
 * missing selector (#89 item 4).
 */
function queryEl<T extends Element = HTMLElement>(parent: ParentNode, selector: string): T {
  const el = parent.querySelector(selector);
  expect(el, `expected to find "${selector}"`).not.toBeNull();
  return el as T;
}

/**
 * Evaluate the marked renderCalendarList block in isolation, injecting the
 * globals it reads/calls as Function parameters (document, calendars,
 * editCalendar, deleteCalendar, defaultCalendarId) instead of relying on
 * anything in the outer test module scope. 'use strict' turns an accidental
 * write to an undeclared name into a thrown ReferenceError instead of a
 * silently-created global (#89 item 1).
 */
function loadRenderCalendarList(
  calendars: Calendar[],
  editCalendar: (id: string) => void,
  deleteCalendar: (id: string) => void
): RenderCalendarList {
  const block = extractMirrorBlock('render');
  const factory = new Function(
    'document',
    'calendars',
    'editCalendar',
    'deleteCalendar',
    'defaultCalendarId',
    `'use strict';\n${block}\nrenderCalendarList.getDefaultCalendarId = () => defaultCalendarId;\nreturn renderCalendarList;`
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
      const urlEl = queryEl(listEl, '.calendar-url');
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
      const item = queryEl(listEl, '.calendar-item');
      expect(item.dataset.id).toBe(maliciousId);
      const editBtn = queryEl(listEl, '.btn-edit');
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

      const first = queryEl(getListEl(), '.calendar-item');
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
      const urlEl = queryEl(items[1], '.calendar-url');
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
      queryEl(items[0], '.btn-edit').click();
      expect(editSpy).toHaveBeenCalledWith('cal-default');
      expect(editSpy).toHaveBeenCalledTimes(1);

      queryEl(items[1], '.btn-delete').click();
      expect(deleteSpy).toHaveBeenCalledWith('cal-second');
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });

    it("exposes the block's local defaultCalendarId via getDefaultCalendarId after render (#89 addendum item 5)", () => {
      const render = loadRenderCalendarList(calendars, () => {}, () => {});
      render();

      expect(render.getDefaultCalendarId()).toBe(calendars[0].id);
    });

    it('re-rendering after the list changes clears and rebuilds instead of duplicating DOM (#89 addendum item 6)', () => {
      const mutableCalendars: Calendar[] = [
        { id: 'cal-default', name: 'Work', url: 'https://example.com/work.ics' }
      ];
      const render = loadRenderCalendarList(mutableCalendars, () => {}, () => {});
      render();

      expect(getListEl().querySelectorAll('.calendar-item')).toHaveLength(1);

      mutableCalendars.push({ id: 'cal-second', name: 'Personal', url: 'https://example.com/personal.ics' });
      render();

      const items = getListEl().querySelectorAll('.calendar-item');
      expect(items).toHaveLength(2);
      expect((items[0] as HTMLElement).dataset.id).toBe('cal-default');
      expect((items[1] as HTMLElement).dataset.id).toBe('cal-second');
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

  it('the render mirror markers each appear exactly once in pi/setup.js (#89 item 2)', () => {
    const source = readFileSync(SETUP_JS_PATH, 'utf-8');
    const beginCount = source.split(BEGIN_MARKER).length - 1;
    const endCount = source.split(END_MARKER).length - 1;
    expect(beginCount).toBe(1);
    expect(endCount).toBe(1);
  });

  it('declares renderCalendarList exactly once, inside the marker block (#66 companion)', () => {
    const source = readFileSync(SETUP_JS_PATH, 'utf-8');
    const beginIdx = source.indexOf(BEGIN_MARKER);
    const endIdx = source.indexOf(END_MARKER);
    expect(beginIdx).toBeGreaterThan(-1);
    expect(endIdx).toBeGreaterThan(beginIdx);

    // Full-source scan (not just the extracted block): a second declaration
    // placed AFTER the END marker would shadow the mirrored one at webview
    // runtime (last function declaration wins) while leaving the extracted
    // block itself untouched.
    const matches = [...source.matchAll(/function\s+renderCalendarList\s*\(/g)];
    expect(matches).toHaveLength(1);
    expect(matches[0].index).toBeGreaterThan(beginIdx);
    expect(matches[0].index).toBeLessThan(endIdx);
  });
});
