import fetchIcalAndUpdateCache from './lib/loadIcal.js'

window.cachedEvents = []

// TODO: Load from Config
const url = ''
// ical update frequency in minutes
const updateFrequency = 5

fetchIcalAndUpdateCache(url, updateFrequency)
