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
  return window.eventsCache.events.filter(isActiveEvent)
}

export function findNextEvent () {
  return window.eventsCache.events.filter(isUpcoming)[0]
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
  if (window.eventsCache.events.length === 0) {
    let statusText = 'No\nMeetings\nFound'
    switch (window.eventsCache.status) {
      case 'init':
        statusText = 'Loading\niCal'
        break
      case 'loading':
        statusText = 'Loading\niCal'
        break
      case 'invalid':
        statusText = 'Please\nSetup'
        break
    }
    action.setTitle(context, statusText)
    setTimeout(executeIfCacheAvailable, 5000, action, context, callback)
  } else {
    callback(context)
  }
}

export function isValidURL (url) {
  let isValid = true
  try {
    /* eslint no-new: off */
    new URL(url)
  } catch (e) {
    isValid = false
  }

  return isValid
}

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
