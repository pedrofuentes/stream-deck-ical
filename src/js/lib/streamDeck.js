/**
 * @author Pedro Fuentes <git@pedrofuent.es>
 * @copyright 2021 Pedro Pablo Fuentes Schuster
 * @license MIT
 */
/* global WebSocket */
export default class StreamDeck {
  constructor () {
    this.connected = false
    this._websocket = null
    this.port = null
    this.uuid = null
    this.register = null
    this.info = null
    this.activeActions = {}
    this.availableActions = {}
    this.globalSettings = {}

    window.connectElgatoStreamDeckSocket = (port, uuid, register, info) => {
      this.port = port
      this.uuid = uuid
      this.register = register
      this.info = info
      this.websocket = new WebSocket('ws://127.0.0.1:' + port)

      this.websocket.onopen = () => {
        this.onOpen()
      }
      this.websocket.onmessage = (msg) => {
        this.onMessage(msg)
      }
    }
  }

  get websocket () {
    return this._websocket
  }

  set websocket (value) {
    this._websocket = value
  }

  onOpen () {
    this.registerPluginOrPI(this.register, this.uuid)
    this.requestGlobalSettings(this.uuid)
  }

  onMessage (msg) {
    // Parse parameter from string to object
    const json = JSON.parse(msg.data)

    // Extract payload information
    const event = json.event
    const action = json.action
    const context = json.context
    const payload = json.payload
    let settings

    // Key up event
    if (event === 'keyUp') {
      if (context in this.activeActions) {
        this.activeActions[context].onKeyUp(context, payload.settings, payload.coordinates, payload.userDesiredState, payload.state)
      }
    } else if (event === 'willAppear') {
      settings = payload.settings

      if (!(action in this.availableActions)) {
        throw new Error(`${context} is not in the available actions list`)
      } else if (!(context in this.activeActions)) {
        this.activeActions[context] = this.addAction(action, context, settings)
      }
      this.activeActions[context].onWillAppear(context, settings, payload.coordinates)
    } else if (event === 'willDisappear') {
      if (context in this.activeActions) {
        this.activeActions[context].onWillDisappear(context, settings, payload.coordinates)
        delete this.activeActions[context]
      }
    } else if (event === 'didReceiveGlobalSettings') {
      this.globalSettings = payload.settings
    } else if (event === 'didReceiveSettings') {
      settings = payload.settings

      if (context in this.activeActions) {
        this.activeActions[context].setSettings(settings)
      }
    } else if (event === 'propertyInspectorDidAppear') {
      // Send cache to PI
      // this.sendToPropertyInspector(action, context, cache.data);
    } else if (event === 'sendToPlugin') {
      // TODO: Something missing here
      // const piEvent = payload['piEvent']
    }
  }

  registerPluginOrPI (event, uuid) {
    if (this._websocket) {
      const json = {
        event: event,
        uuid: uuid
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  requestGlobalSettings (uuid) {
    if (this._websocket) {
      const json = {
        event: 'getGlobalSettings',
        context: uuid
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  saveGlobalSettings (uuid) {
    if (this._websocket) {
      const json = {
        event: 'setGlobalSettings',
        context: uuid,
        payload: this.globalSettings
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  saveSettings (action, uuid, settings) {
    if (this._websocket) {
      const json = {
        action: action,
        event: 'setSettings',
        context: uuid,
        payload: settings
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  registerAction (implementation, uuid) {
    this.availableActions[uuid] = implementation
  }

  addAction (action, context, settings) {
    return new this.availableActions[action](action, this, context, settings)
  }

  sendToPropertyInspector (action, context, data) {
    if (this._websocket) {
      const json = {
        action: action,
        event: 'sendToPropertyInspector',
        context: context,
        payload: data
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  sendToPlugin (action, context, data) {
    if (this._websocket) {
      const json = {
        action: action,
        event: 'sendToPlugin',
        context: context,
        payload: data
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  log (msg) {
    const time = new Date()
    const timeString = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
    console.log(timeString, msg)

    // Log to the Stream Deck log file
    if (this._websocket) {
      const json = {
        event: 'logMessage',
        payload: {
          message: msg
        }
      }

      this._websocket.send(JSON.stringify(json))
    }
  }
}
