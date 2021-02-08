/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
/* global fetch */
import ical from './ical.js'

window.eventsCache = {
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

  for (const key in events) {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const event = events[key]
      if (event.type === 'VEVENT') {
        let valid = true
        if (Object.prototype.hasOwnProperty.call(event, 'recurrences')) {
          selectedEvents = selectedEvents.concat(filterEvents(event.recurrences, args))
        } else {
          if (args[0][0]) args = args[0]
          args.forEach((check) => {
            if (!check(event)) valid = false
          })

          if (valid) {
            selectedEvents.push({
              uid: event.uid,
              summary: event.summary,
              start: event.start,
              end: event.end
            })
          }
        }
      }
    }
  }

  return selectedEvents
}

export function setHoursSpread (newSpread) {
  totalHoursSpread = newSpread
}

export async function updateEventsCache (data) {
  const events = ical.parseICS(data)
  const filteredAndSortedEvents = filterEvents(events, isNotAllDayEvent, isEventWithinHours).sort(compareEventsStartDates)
  window.eventsCache.events = filteredAndSortedEvents
  return filteredAndSortedEvents
}

export default async function fetchIcalAndUpdateCache (url, updateFrequency) {
  window.eventsCache.status = 'loading'
  return fetch(url)
    .then((response) => response.text())
    .then((data) => updateEventsCache(data))
    .then(() => {
      window.eventsCache.status = 'loaded'
      setTimeout(fetchIcalAndUpdateCache, 1000 * 60 * updateFrequency, url, updateFrequency)
    })
    .catch((error) => {
      window.eventsCache.status = 'error'
      console.error('There has been a problem with your fetch operation:', error)
    })
}
