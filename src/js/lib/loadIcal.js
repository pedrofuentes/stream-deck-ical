/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
/* global fetch */
import ICAL from 'ical.js'
import { isValidURL, sleep } from './utils.js'
import { deepEqual } from 'fast-equals'

window.eventsCache = {
  version: 0,
  status: null,
  events: []
}
let totalHoursSpread = 36

function isAllDayEvent (object) {
  return object['MICROSOFT-CDO-ALLDAYEVENT'] === 'TRUE'
}

function isTimeWithinHours (date, hours) {
  const today = new Date()
  const now = today.getTime()
  const spread = (hours * 60 * 60 * 1000) / 2
  const event = date.getTime()
  const bottomRange = now - spread
  const topRange = now + spread

  return (event >= bottomRange) && (event <= topRange)
}

function isNotAllDayEvent (object) {
  return !isAllDayEvent(object)
}

function isEventWithinHours (event) {
  return isTimeWithinHours(event.start, totalHoursSpread)
}

function compareEventsStartDates (firstEl, secondEl) {
  return firstEl.start.getTime() - secondEl.start.getTime()
}

function filterEvents (events, ...args) {
  let selectedEvents = []
    
  var startTime = new Date();
  var endDate = new Date();
  // add 18 hours to start
  endDate.setTime(startTime.getTime() + (totalHoursSpread*60*60*1000))

  for (var i = 0; i < events.length; i++) {
    var event = new ICAL.Event(events[i]); 
    var eventStart = event.startDate.toJSDate()
    var eventEnd = event.endDate.toJSDate()
    var duration = eventEnd - eventStart;
    if (event.isRecurring()) {
      //var recur = event.component.getFirstPropertyValue('rrule');
      var dtstart = event.component.getFirstPropertyValue('dtstart');
      var iter = event.iterator(dtstart);
      for (var next = iter.next(); next; next = iter.next()) {
        eventStart = next.toJSDate();
        eventEnd = next.adjust(0, 0, (duration / 1000 / 60), 0).toJSDate();
        if ((eventStart < endDate) && (eventEnd > startTime)) {
          selectedEvents.push({
            uid: event.uid,
            summary: event.summary,
            start: eventStart,
            end: eventEnd
          })
        }
      }
      //console.log(event.summary);
    
    }  else if ((eventStart < endDate) && (eventEnd > startTime)) {
      selectedEvents.push({
        uid: event.uid,
        summary: event.summary,
        start: eventStart,
        end: eventEnd
      })
    }
  }

  return selectedEvents
}

export function setHoursSpread (newSpread) {
  totalHoursSpread = newSpread
}

export async function updateEventsCache (data, version) {
  // if versions differ it means that a new load has been triggered with a new url so we don't store this data
  if (version === window.loadedUrlVersion) {
    /*const events = ical.parseICS(data)
    const filteredAndSortedEvents = filterEvents(events, isNotAllDayEvent, isEventWithinHours).sort(compareEventsStartDates)
    // TODO: if no change maybe no need to update and return even?
    if (!deepEqual(window.eventsCache.events, filteredAndSortedEvents)) window.eventsCache.version++
    window.eventsCache.events = filteredAndSortedEvents
    return filteredAndSortedEvents
*/

  
    const jcalData = ICAL.parse(data);
    const vcalendar = new ICAL.Component(jcalData);
    const icalEvents = vcalendar.getAllSubcomponents('vevent');

    const filteredAndSortedEvents = filterEvents(icalEvents).sort(compareEventsStartDates)
    // TODO: if no change maybe no need to update and return even?
    if (!deepEqual(window.eventsCache.events, filteredAndSortedEvents)) window.eventsCache.version++
    window.eventsCache.events = filteredAndSortedEvents
    return filteredAndSortedEvents
  }
}

export default async function fetchIcalAndUpdateCache (streamDeck, updateFrequency, version, callback = null) {
  const url = streamDeck.globalSettings.url
  if (isValidURL(url)) {
    // if versions differ it means that a new load has been triggered with a new url
    if (version === window.loadedUrlVersion) {
      window.eventsCache.status = 'loading'
      return fetch(url)
        .then((response) => response.text())
        .then((data) => updateEventsCache(data, version))
        .then(() => {
          window.eventsCache.status = 'loaded'
          if (typeof callback === 'function') callback()
          setTimeout(fetchIcalAndUpdateCache, 1000 * 60 * updateFrequency, streamDeck, updateFrequency, version, callback)
        })
        .catch((error) => {
          window.eventsCache.status = 'error'
          console.error('There has been a problem with your fetch operation:', error)
        })
    }
  } else {
    window.eventsCache.status = 'invalid'
    await sleep(1000)
    await fetchIcalAndUpdateCache(streamDeck, updateFrequency, version, callback)
  }
}
