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
    this._globalSettings = {}
    this._piCallback = () => {}
    this._globalSettingsCallback = () => {}
    this._initialLoadCallback = null

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

  get globalSettings () {
    return this._globalSettings
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
      this._globalSettings = payload.settings
      if (typeof this._initialLoadCallback === 'function') {
        this._initialLoadCallback()
        this._initialLoadCallback = null
      }
      this._globalSettingsCallback()
    } else if (event === 'didReceiveSettings') {
      settings = payload.settings

      if (context in this.activeActions) {
        this.activeActions[context].setSettings(settings)
      }
    } else if (event === 'propertyInspectorDidAppear') {
      // TODO: Implement to send to PI
      this.sendToPropertyInspector(action, context, '')
    } else if (event === 'sendToPropertyInspector') {
      this._piCallback()
    } else if (event === 'sendToPlugin') {
      // TODO: Implement to send info to plugin
      // const piEvent = payload['piEvent']
    }
  }

  onPiLoaded (callback) {
    if (typeof callback === 'function') this._piCallback = callback
  }

  onGlobalSettingsReceived (callback) {
    if (typeof callback === 'function') this._globalSettingsCallback = callback
  }

  onInitialLoad (callback) {
    if (typeof callback === 'function') this._initialLoadCallback = callback
  }

  registerPluginOrPI (event) {
    if (this._websocket) {
      const json = {
        event: event,
        uuid: this.uuid
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  requestGlobalSettings () {
    if (this._websocket) {
      const json = {
        event: 'getGlobalSettings',
        context: this.uuid
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  updateGlobalSettings (key, value) {
    this._globalSettings[key] = value

    this.saveGlobalSettings()
  }

  saveGlobalSettings () {
    if (this._websocket) {
      const json = {
        event: 'setGlobalSettings',
        context: this.uuid,
        payload: this._globalSettings
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  saveSettings (action, actionUUID, settings) {
    if (this._websocket) {
      const json = {
        action: action,
        event: 'setSettings',
        context: actionUUID,
        payload: settings
      }

      this._websocket.send(JSON.stringify(json))
    }
  }

  registerAction (implementation, actionUUID) {
    this.availableActions[actionUUID] = implementation
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
