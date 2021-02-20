/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
/* global alert */
import { isValidURL } from './lib/utils.js'

const opener = window.opener
const streamDeck = opener.streamDeck

window.onload = function () {
  document.getElementById('url').value = streamDeck.globalSettings.url

  document.getElementById('settings').addEventListener('click', () => {
    const url = document.getElementById('url').value
    if (isValidURL(url)) {
      streamDeck.updateGlobalSettings('url', url)
      opener.document.getElementById('url').value = url
      streamDeck.updateGlobalSettings('cacheVersion', streamDeck.globalSettings.cacheVersion + 1)
    } else {
      alert('Please enter a valid url')
      document.getElementById('url').value = streamDeck.globalSettings.url
    }
  })
}
