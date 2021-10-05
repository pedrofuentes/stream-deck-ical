/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import fetchIcalAndUpdateCache from './lib/loadIcal.js'
import StreamDeck from './lib/streamDeck.js'
import { executeIfCacheAvailable } from './lib/utils.js'
import NextMeeting from './actions/nextmeeting.js'
import TimeLeft from './actions/timeleft.js'

// ical update frequency in minutes
const updateFrequency = 10
window.eventsCache.status = 'init'
window.loadedUrlVersion = 0

const streamDeck = new StreamDeck()

streamDeck.onInitialLoad(() => {
  streamDeck.updateGlobalSettings('urlVersion', 0)
  if (!Object.prototype.hasOwnProperty.call(streamDeck.globalSettings, 'url')) {
    streamDeck.updateGlobalSettings('url', '')
  }

  fetchIcalAndUpdateCache(streamDeck, updateFrequency, 0, () => {
    streamDeck.executeOnAvailableActions((context, instance) => {
      if (instance.cacheVersion !== window.eventsCache.version) executeIfCacheAvailable(instance, context, () => { instance.startTimer(context) })
    })
  })
})

streamDeck.onGlobalSettingsReceived(() => {
  if (window.loadedUrlVersion !== streamDeck.globalSettings.urlVersion) {
    window.loadedUrlVersion = streamDeck.globalSettings.urlVersion
    fetchIcalAndUpdateCache(streamDeck, updateFrequency, streamDeck.globalSettings.urlVersion, () => {
      streamDeck.executeOnAvailableActions((context, instance) => {
        if (instance.cacheVersion !== window.eventsCache.version) executeIfCacheAvailable(instance, context, () => { instance.startTimer(context) })
      })
    })
  }
})

streamDeck.registerAction(NextMeeting, 'com.pedrofuentes.ical.nextmeeting')
streamDeck.registerAction(TimeLeft, 'com.pedrofuentes.ical.timeleft')
