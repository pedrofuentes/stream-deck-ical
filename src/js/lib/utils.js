/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */

function isActiveEvent (obj) {
  const now = (new Date()).getTime()
  return ((obj.start.getTime() <= now) && (obj.end.getTime() >= now))
}

function isUpcoming (obj) {
  const now = (new Date()).getTime()
  return (obj.start.getTime() > now)
}

export function eventsSecondsAndNowDifference (date) {
  const now = (new Date()).getTime()
  const time = date.getTime()
  return ((time - now) / 1000).toFixed(0)
}

export function findActiveEvents () {
  return window.cachedEvents.filter(isActiveEvent)
}

export function findNextEvent () {
  return window.cachedEvents.filter(isUpcoming)[0]
}

export function sec2time (timeInSeconds) {
  let sign = ''
  if (timeInSeconds < 0) {
    timeInSeconds = Math.abs(timeInSeconds)
    sign = '- '
  }
  const time = parseFloat(timeInSeconds).toFixed(3)
  const hours = Math.floor(time / 60 / 60)
  const minutes = Math.floor(time / 60) % 60
  const seconds = Math.floor(time - minutes * 60)

  if (hours > 1) return `${sign}${hours}h`
  if (hours > 0 && minutes === 0) return `${sign}${hours}h 0m`
  if (hours > 0) return `${sign}${hours}h ${minutes}m`
  if (minutes > 0) return `${sign}${minutes}m ${seconds}s`

  return `${sign}${seconds}s`
}

export function executeIfCacheAvailable (action, context, callback) {
  if (window.cachedEvents.length === 0) {
    // TODO no meetings found vs no active meetings
    action.setTitle(context, 'No\nMeetings\nFound')
    setTimeout(executeIfCacheAvailable, 5000, action, context, callback)
  } else {
    callback(context)
  }
}
