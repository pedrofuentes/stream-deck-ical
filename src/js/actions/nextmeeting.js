/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
import Action from './action'
import imageCache from '../lib/images.js'
import { executeIfCacheAvailable, findNextEvent, eventsSecondsAndNowDifference, sec2time } from '../lib/utils.js'

export default class NextMeeting extends Action {
  constructor (uuid, streamDeck, context, settings) {
    super(uuid, streamDeck, context, settings)

    this.timeOut = null
    this.currentImage = 'nextMeeting'
    this.redZoneTime = 30
    this.orangeZoneTime = 300
    this.stopTimeAt = 0
    this.interval = null

    streamDeck.saveSettings(uuid, context, settings)
  }

  onWillAppear (context, settings) {
    if (settings === undefined) settings = this._settings

    if (window.eventsCache.events.length === 0) {
      this.setTitle(context, 'Loading\nUpcoming\nMeeting')
    }

    this.setImage(context, imageCache.nextMeeting)

    executeIfCacheAvailable(this, context, () => { this.startTimer(context) })
  }

  onWillDisappear (context, settings) {
    if (this.timeOut) clearTimeout(this.timeOut)
    if (this.interval) clearInterval(this.interval)
    this.interval = null
  }

  onKeyUp (context, settings, coordinates, desiredState, state) {
    if (settings === undefined) settings = this._settings

    this.setTitle(context, 'Loading\nUpcoming\nMeeting')

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    if (this.currentImage !== 'nextMeeting') {
      this.currentImage = 'nextMeeting'
      this.setImage(context, imageCache.nextMeeting)
    }

    executeIfCacheAvailable(this, context, () => { this.startTimer(context) })
  }

  startTimer (context) {
    const event = findNextEvent()

    if (event && Object.prototype.hasOwnProperty.call(event, 'start')) {
      if (this.interval) clearInterval(this.interval)
      this.interval = setInterval(() => {
        const difference = eventsSecondsAndNowDifference(event.start)
        if (difference >= this.stopTimeAt) {
          if (this.currentImage !== 'nextMeetingOrange' && difference <= this.orangeZoneTime && difference > this.redZoneTime) {
            this.currentImage = 'nextMeetingOrange'
            this.setImage(context, imageCache.nextMeetingOrange)
          } else if (this.currentImage !== 'nextMeetingRed' && difference <= this.redZoneTime) {
            this.currentImage = 'nextMeetingRed'
            this.setImage(context, imageCache.nextMeetingRed)
          }
          this.setTitle(context, `${sec2time(difference)}`)
        } else {
          if (this.currentImage !== 'nextMeeting') {
            this.currentImage = 'nextMeeting'
            this.setImage(context, imageCache.nextMeeting)
          }
          clearInterval(this.interval)
          this.interval = null
          this.startTimer(context)
        }
      }, 1000)
    } else {
      clearTimeout(this.timeOut)
      if (this.interval) clearInterval(this.interval)
      this.interval = null
      if (this.currentImage !== 'nextMeeting') {
        this.currentImage = 'nextMeeting'
        this.setImage(context, imageCache.nextMeeting)
      }
      this.setTitle(context, 'No\nUpcoming\nMeeting')
      // Check again in 10 seconds if new events available
      this.timeOut = setTimeout(() => { this.startTimer(context) }, 10000, context)
    }
  }
}
