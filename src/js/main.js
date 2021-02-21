/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
import fetchIcalAndUpdateCache from './lib/loadIcal.js'
import StreamDeck from './lib/streamDeck.js'
import NextMeeting from './actions/nextmeeting.js'
import TimeLeft from './actions/timeleft.js'

// ical update frequency in minutes
const updateFrequency = 5
window.eventsCache.status = 'init'
window.loadVersion = 0

const streamDeck = new StreamDeck()
streamDeck.onInitialLoad(() => {
  streamDeck.updateGlobalSettings('cacheVersion', 0)
  if (!Object.prototype.hasOwnProperty.call(streamDeck.globalSettings, 'url')) {
    streamDeck.updateGlobalSettings('url', '')
  }
  fetchIcalAndUpdateCache(streamDeck, updateFrequency)
})

streamDeck.onGlobalSettingsReceived(() => {
  if (window.loadVersion !== streamDeck.globalSettings.cacheVersion) {
    window.loadVersion = streamDeck.globalSettings.cacheVersion
    fetchIcalAndUpdateCache(streamDeck, updateFrequency, streamDeck.globalSettings.cacheVersion)
  }
})
streamDeck.registerAction(NextMeeting, 'com.pedrofuentes.ical.nextmeeting')
streamDeck.registerAction(TimeLeft, 'com.pedrofuentes.ical.timeleft')
