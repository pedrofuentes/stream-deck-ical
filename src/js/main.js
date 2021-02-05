import fetchIcalAndUpdateCache from './lib/loadIcal.js'

window.cachedEvents = []

// TODO: Load from Config
const url = ''
// ical update frequency in minutes
const updateFrequency = 5

fetchIcalAndUpdateCache(url)
setInterval(fetchIcalAndUpdateCache, 1000 * 60 * updateFrequency)
