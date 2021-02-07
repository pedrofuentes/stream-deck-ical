/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
import fetchIcalAndUpdateCache from './lib/loadIcal.js'
import StreamDeck from './lib/streamDeck.js'

window.cachedEvents = []

// TODO: Load from Config
const url = ''
// ical update frequency in minutes
const updateFrequency = 5

fetchIcalAndUpdateCache(url, updateFrequency)

const streamDeck = new StreamDeck()
