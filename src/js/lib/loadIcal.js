/* global fetch */
import ical from './ical.js'

function isAllDayEvent (object) {
  return object['MICROSOFT-CDO-ALLDAYEVENT'] === 'TRUE'
}

function isTimeWithinHours (date, hours) {
  const today = new Date()
  const now = today.getTime()
  const spread = (hours * 60 * 60 * 1000) / 2
  const event = date.getTime()
  const bottomRange = now - spread;
  const topRange = now + spread;
  return (event >= bottomRange) && (event <= topRange)
}

function isNotAllDayEvent (object) {
  return !isAllDayEvent(object)
}

function isEventWithinHours (event) {
  return isTimeWithinHours(event.start, 36)
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

export function updateEventsCache (data) {
  const events = ical.parseICS(data)
  const filteredAndSortedEvents = filterEvents(events, isNotAllDayEvent, isEventWithinHours).sort(compareEventsStartDates)
  window.cachedEvents = filteredAndSortedEvents
  return filteredAndSortedEvents
}

export default function fetchIcalAndUpdateCache (url) {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => updateEventsCache(data))
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error)
    })
}
