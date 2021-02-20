/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */

import fetchIcalAndUpdateCache from './lib/loadIcal.js'
import StreamDeck from './lib/streamDeck.js'

window.streamDeck = new StreamDeck()

/* global streamDeck */
streamDeck.onPiLoaded(() => {
  document.getElementById('url').value = streamDeck.globalSettings.url

  document.getElementById('settings').addEventListener('click', () => {
    window.open('setup.html')
  })
})
