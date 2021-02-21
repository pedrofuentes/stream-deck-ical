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
  document.getElementById('alerts').style.display = 'none'
  document.getElementById('url').value = streamDeck.globalSettings.url

  document.getElementById('save').addEventListener('click', () => saveUrl())
  document.getElementById('refresh').addEventListener('click', () => refreshIcal())
}

function saveUrl () {
  const url = document.getElementById('url').value
  if (isValidURL(url)) {
    streamDeck.updateGlobalSettings('url', url)
    opener.document.getElementById('url').value = url
    streamDeck.updateGlobalSettings('cacheVersion', streamDeck.globalSettings.cacheVersion + 1)
    showAlert('New iCal URL was saved, loading new information', 'notice')
  } else {
    showAlert('Please enter a valid iCal URL')
    document.getElementById('url').value = streamDeck.globalSettings.url
  }
}

function refreshIcal () {
  const url = document.getElementById('url').value
  if (isValidURL(url)) {
    streamDeck.updateGlobalSettings('cacheVersion', streamDeck.globalSettings.cacheVersion + 1)
    showAlert('Forced Refresh starting', 'notice')
  } else {
    showAlert('Current iCal URL is not valid, please set a new one before doing a Forced Refresh')
  }
}

function showAlert (text, type = 'error', seconds = 10) {
  const alerts = document.getElementById('alerts')
  if (alerts.style.display === 'block') alerts.style.display = 'none'
  alerts.innerHTML = `<span class="${type}">${text}</span>`
  alerts.style.display = 'block'
  setTimeout(() => { alerts.style.display = 'none' }, seconds * 1000)
}
