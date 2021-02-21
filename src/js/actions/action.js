/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
export default class Action {
  constructor (uuid, streamDeck, context, settings) {
    this.streamDeck = streamDeck
    this.websocket = this.streamDeck.websocket
    this._context = context
    this._settings = settings
    this.destinationEnum = Object.freeze({ HARDWARE_AND_SOFTWARE: 0, HARDWARE_ONLY: 1, SOFTWARE_ONLY: 2 })
    this._uuid = uuid
    this.lastKey = {}

    streamDeck.registerActionInstance(uuid, context)
  }

  get context () {
    return this._context
  }

  set context (value) {
    this._context = value
  }

  get settings () {
    return this._settings
  }

  set settings (settings) {
    this._settings = settings
  }

  get uuid () {
    return this._uuid
  }

  set uuid (value) {
    this._uuid = value
  }

  onWillAppear (context, settings, coordinates) {}

  onWillDisappear (context, settings, coordinates) {}

  onKeyUp (context, settings, coordinates, desiredState, state) {}

  onKeyDown (context, settings, coordinates, desiredState, state) {}

  onDoublePress (callback, type = 'keyUp') {
    const delay = 500
    const now = Date.now()
    const previousKey = (Object.prototype.hasOwnProperty.call(this.lastKey, type)) ? this.lastKey[type] : (now - delay * 2)
    this.lastKey[type] = now

    if (Object.prototype.hasOwnProperty.call(this.lastKey, type) && ((this.lastKey[type] - previousKey) < delay)) callback()
  }

  setState (context, state) {
    if (this.websocket) {
      const json = {
        event: 'setState',
        context: context,
        payload: {
          state: state
        }
      }

      this.websocket.send(JSON.stringify(json))
    }
  }

  setTitle (context, title) {
    if (this.websocket) {
      const json = {
        event: 'setTitle',
        context: context,
        payload: {
          title: title,
          target: this.destinationEnum.HARDWARE_AND_SOFTWARE
        }
      }

      this.websocket.send(JSON.stringify(json))
    }
  }

  setImage (context, image) {
    if (this.websocket) {
      const json = {
        event: 'setImage',
        context: context,
        payload: {
          image: image,
          target: 0
        }
      }

      this.websocket.send(JSON.stringify(json))
    }
  }

  showAlert (uuid) {
    if (this.websocket) {
      const json = {
        event: 'showAlert',
        context: uuid
      }

      this.websocket.send(JSON.stringify(json))
    }
  }
}
