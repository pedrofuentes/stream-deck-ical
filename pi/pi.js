/**
 * Property Inspector for iCal plugin
 */

// Global websocket connection - exposed on window for popup access
window.websocket = null;
window.uuid = null;
window.actionInfo = {};
window.globalSettings = {};
window.actionSettings = {};  // Per-action settings (custom calendar)
window.setupPopup = null;  // Reference to setup popup window

// Local references for convenience
let websocket = null;
let uuid = null;
let actionInfo = {};
let globalSettings = {};
let actionSettings = {};

/**
 * Connect to Stream Deck
 */
function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
    uuid = inUUID;
    window.uuid = inUUID;
    actionInfo = JSON.parse(inActionInfo);
    window.actionInfo = actionInfo;
    
    // Load action settings from actionInfo if available
    if (actionInfo.payload && actionInfo.payload.settings) {
        actionSettings = actionInfo.payload.settings;
        window.actionSettings = actionSettings;
    }
    
    websocket = new WebSocket('ws://127.0.0.1:' + inPort);
    window.websocket = websocket;
    
    websocket.onopen = function() {
        const json = {
            event: inRegisterEvent,
            uuid: inUUID
        };
        websocket.send(JSON.stringify(json));
        
        // Request global settings
        requestGlobalSettings();
        
        // Request action settings (per-action)
        requestSettings();
    };
    
    websocket.onmessage = function(evt) {
        const jsonObj = JSON.parse(evt.data);
        const event = jsonObj.event;
        const jsonPayload = jsonObj.payload;
        
        console.log('[PI] Received event:', event, jsonPayload);
        
        if (event === 'didReceiveGlobalSettings') {
            globalSettings = jsonPayload.settings || {};
            window.globalSettings = globalSettings;
            updateUI();
        }
        
        // Handle per-action settings
        if (event === 'didReceiveSettings') {
            actionSettings = jsonPayload.settings || {};
            window.actionSettings = actionSettings;
            console.log('[PI] Action settings received:', actionSettings);
        }
        
        // Forward sendToPropertyInspector messages to popup window
        if (event === 'sendToPropertyInspector') {
            console.log('[PI] sendToPropertyInspector received:', jsonPayload);
            window.lastDebugInfo = jsonPayload;  // Store for popup access
            if (window.setupPopup && !window.setupPopup.closed) {
                console.log('[PI] Forwarding to popup');
                window.setupPopup.postMessage({
                    type: 'sendToPropertyInspector',
                    payload: jsonPayload
                }, '*');
            }
        }
    };
}

/**
 * Request debug info from plugin
 */
function requestDebugInfo() {
    if (websocket && uuid) {
        console.log('[PI] Requesting debug info, uuid:', uuid);
        const json = {
            event: 'sendToPlugin',
            action: actionInfo.action,  // Use actual action from actionInfo
            context: uuid,
            payload: {
                action: 'getDebugInfo'
            }
        };
        websocket.send(JSON.stringify(json));
    }
}

// Expose for popup access
window.requestDebugInfo = requestDebugInfo;

/**
 * Request global settings from plugin
 */
function requestGlobalSettings() {
    if (websocket) {
        const json = {
            event: 'getGlobalSettings',
            context: uuid
        };
        websocket.send(JSON.stringify(json));
    }
}

/**
 * Request per-action settings
 */
function requestSettings() {
    if (websocket) {
        const json = {
            event: 'getSettings',
            context: uuid
        };
        websocket.send(JSON.stringify(json));
    }
}

/**
 * Save global settings to plugin
 */
function saveGlobalSettings(settings) {
    if (websocket) {
        const json = {
            event: 'setGlobalSettings',
            context: uuid,
            payload: settings
        };
        websocket.send(JSON.stringify(json));
        globalSettings = settings;
    }
}

/**
 * Update UI with current settings
 */
function updateUI() {
    // Update URL display
    const urlInput = document.getElementById('url');
    if (urlInput) {
        urlInput.value = globalSettings.url || '';
    }
    
    // Update time window selector
    const timeWindowSelect = document.getElementById('timeWindow');
    if (timeWindowSelect) {
        timeWindowSelect.value = globalSettings.timeWindow || 3;
    }
    
    // Show status if available
    const statusContainer = document.getElementById('statusContainer');
    const statusDiv = document.getElementById('status');
    if (globalSettings.status) {
        statusContainer.style.display = 'flex';
        statusDiv.textContent = globalSettings.status;
    }
    
    // Show last refresh if available
    const lastRefreshContainer = document.getElementById('lastRefreshContainer');
    const lastRefreshDiv = document.getElementById('lastRefresh');
    if (globalSettings.lastRefresh) {
        lastRefreshContainer.style.display = 'flex';
        const date = new Date(globalSettings.lastRefresh);
        lastRefreshDiv.textContent = date.toLocaleString();
    }
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Settings button
    const settingsButton = document.getElementById('settings');
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.setupPopup = window.open('setup.html', 'iCal Settings', 'width=600,height=700');
        });
    }
    
    // Time window selector
    const timeWindowSelect = document.getElementById('timeWindow');
    if (timeWindowSelect) {
        timeWindowSelect.addEventListener('change', function() {
            const newSettings = Object.assign({}, globalSettings, {
                timeWindow: parseInt(this.value, 10)
            });
            saveGlobalSettings(newSettings);
        });
    }
});

// Export for rollup IIFE bundle
export { connectElgatoStreamDeckSocket };
