/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
import Action from './action'
import imageCache from '../lib/images.js'
import { executeIfCacheAvailable, findActiveEvents, eventsSecondsAndNowDifference, sec2time } from '../lib/utils.js'

export default class TimeLeft extends Action {
  constructor (uuid, streamDeck, context, settings) {
    super(uuid, streamDeck, context, settings)

    this.timeOut = null
    this.currentImage = 'timeLeft'
    this.redZoneTime = 30
    this.orangeZoneTime = 300
    this.stopTimeAt = -300
    this.activeMeetings = 0
    this.currentMeeting = 0
    this.interval = null

    streamDeck.saveSettings(uuid, context, settings)
  }

  onWillAppear (context, settings) {
    if (settings === undefined) settings = this._settings

    this.setTitle(context, 'Loading\nActive\nMeeting(s)')
    this.setImage(context, imageCache.timeLeft)

    executeIfCacheAvailable(this, context, () => { this.startTimer(context) })
  }

  onWillDisappear (context, settings) {
    if (this.timeOut) clearTimeout(this.timeOut)
    if (this.interval) clearInterval(this.interval)
    this.interval = null
  }

  onKeyUp (context, settings, coordinates, desiredState, state) {
    if (settings === undefined) settings = this._settings

    if (this.activeMeetings > 1) this.setTitle(context, 'Loading\nNext\nMeeting')

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    if (this.currentImage !== 'timeLeft') {
      this.currentImage = 'timeLeft'
      this.setImage(context, imageCache.timeLeft)
    }

    if (this.activeMeetings > 1 && (this.currentMeeting + 1) < this.activeMeetings) {
      this.currentMeeting++
    } else if (this.activeMeetings > 1 && (this.currentMeeting + 1) === this.activeMeetings) {
      this.currentMeeting = 0
    }

    executeIfCacheAvailable(this, context, () => { this.startTimer(context) })

    this.onDoublePress(() => {
      // Increase cacheVersion to force cache update
      this.streamDeck.updateGlobalSettings('cacheVersion', this.streamDeck.globalSettings.cacheVersion + 1)
    })
  }

  startTimer (context) {
    const events = findActiveEvents()
    this.activeMeetings = events.length

    if (this.activeMeetings > 0) {
      if (this.interval) clearInterval(this.interval)
      this.interval = setInterval(() => {
        const difference = eventsSecondsAndNowDifference(events[this.currentMeeting].end)
        if (difference >= this.stopTimeAt) {
          if (this.currentImage !== 'timeLeftOrange' && difference <= this.orangeZoneTime && difference > this.redZoneTime) {
            this.currentImage = 'timeLeftOrange'
            this.setImage(context, imageCache.timeLeftOrange)
          } else if (this.currentImage !== 'timeLeftRed' && difference <= this.redZoneTime) {
            this.currentImage = 'timeLeftRed'
            this.setImage(context, imageCache.timeLeftRed)
          }
          this.setTitle(context, `\n${sec2time(difference)}\n${this.activeMeetings > 1 ? `         ${this.currentMeeting + 1}/${this.activeMeetings}` : ''}`)
        } else {
          if (this.currentImage !== 'timeLeft') {
            this.currentImage = 'timeLeft'
            this.setImage(context, imageCache.timeLeft)
          }
          clearInterval(this.interval)
          this.interval = null
          this.startTimer(context)
        }
      }, 1000)
    } else {
      this.activeMeetings = 0
      this.currentMeeting = 0
      clearTimeout(this.timeOut)
      if (this.interval) clearInterval(this.interval)
      this.interval = null
      if (this.currentImage !== 'timeLeft') {
        this.currentImage = 'timeLeft'
        this.setImage(context, imageCache.timeLeft)
      }
      this.setTitle(context, 'No\nActive\nMeeting')
      // Check again in 10 seconds if new events available
      this.timeOut = setTimeout(() => { this.startTimer(context) }, 10000, context)
    }
  }
}
