/**
 * Property Inspector for iCal plugin - Named Calendars Support
 * 
 * This PI allows users to select which calendar to use for each button
 * via a dropdown populated from global settings.
 */

// Global websocket connection - exposed on window for popup access
window.websocket = null;
window.uuid = null;
window.actionInfo = {};
window.globalSettings = {};
window.actionSettings = {};
window.setupPopup = null;

// Local references
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
        
        // Request global settings (to get calendar list)
        requestGlobalSettings();
        
        // Request action settings (to get selected calendar)
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
            updateCalendarDropdown();
            updateUI();
        }
        
        if (event === 'didReceiveSettings') {
            actionSettings = jsonPayload.settings || {};
            window.actionSettings = actionSettings;
            console.log('[PI] Action settings received:', actionSettings);
            updateSelectedCalendar();
        }
        
        // Forward sendToPropertyInspector messages to popup window
        if (event === 'sendToPropertyInspector') {
            console.log('[PI] sendToPropertyInspector received:', jsonPayload);
            window.lastDebugInfo = jsonPayload;
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
            action: actionInfo.action,
            context: uuid,
            payload: { action: 'getDebugInfo' }
        };
        websocket.send(JSON.stringify(json));
    }
}

window.requestDebugInfo = requestDebugInfo;

/**
 * Request global settings
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
 * Save per-action settings (selected calendar)
 */
function saveActionSettings(settings) {
    if (websocket) {
        const json = {
            event: 'setSettings',
            context: uuid,
            payload: settings
        };
        websocket.send(JSON.stringify(json));
        actionSettings = settings;
        window.actionSettings = settings;
    }
}

/**
 * Update the calendar dropdown with available calendars
 */
function updateCalendarDropdown() {
    const select = document.getElementById('calendarSelect');
    const noCalendarsContainer = document.getElementById('noCalendarsContainer');
    
    if (!select) return;
    
    let calendars = globalSettings.calendars || [];
    let defaultCalendarId = globalSettings.defaultCalendarId;
    
    // Handle legacy settings: if no calendars but we have a URL, create a synthetic entry
    if (calendars.length === 0 && globalSettings.url) {
        calendars = [{
            id: '__legacy__',
            name: 'Default Calendar',
            url: globalSettings.url
        }];
        defaultCalendarId = '__legacy__';
        console.log('[PI] Using legacy URL as default calendar');
    }
    
    // Clear existing options (except the first default option)
    select.innerHTML = '';
    
    if (calendars.length === 0) {
        // No calendars configured at all
        select.innerHTML = '<option value="">No calendars available</option>';
        select.disabled = true;
        if (noCalendarsContainer) noCalendarsContainer.style.display = 'flex';
        return;
    }
    
    select.disabled = false;
    if (noCalendarsContainer) noCalendarsContainer.style.display = 'none';
    
    // Simply list all calendars - mark first (default) with ★
    calendars.forEach((cal, index) => {
        const option = document.createElement('option');
        option.value = cal.id;
        option.textContent = cal.name + (index === 0 ? ' ★' : '');
        select.appendChild(option);
    });
    
    // Set selected value based on action settings
    updateSelectedCalendar();
}

/**
 * Update the selected calendar in the dropdown
 */
function updateSelectedCalendar() {
    const select = document.getElementById('calendarSelect');
    if (!select) return;
    
    let calendars = globalSettings.calendars || [];
    
    // Handle legacy URL
    if (calendars.length === 0 && globalSettings.url) {
        calendars = [{
            id: '__legacy__',
            name: 'Default Calendar',
            url: globalSettings.url
        }];
    }
    
    // First calendar is always the default
    const defaultCalendarId = calendars.length > 0 ? calendars[0].id : '';
    
    // If no explicit selection, use the first (default) calendar
    const selectedId = actionSettings.calendarId || defaultCalendarId;
    select.value = selectedId;
}

/**
 * Update general UI elements
 */
function updateUI() {
    // Show status if available
    const statusContainer = document.getElementById('statusContainer');
    const statusDiv = document.getElementById('status');
    if (statusContainer && statusDiv && globalSettings.status) {
        statusContainer.style.display = 'flex';
        statusDiv.textContent = globalSettings.status;
    }
    
    // Show last refresh if available
    const lastRefreshContainer = document.getElementById('lastRefreshContainer');
    const lastRefreshDiv = document.getElementById('lastRefresh');
    if (lastRefreshContainer && lastRefreshDiv && globalSettings.lastRefresh) {
        lastRefreshContainer.style.display = 'flex';
        const date = new Date(globalSettings.lastRefresh);
        lastRefreshDiv.textContent = date.toLocaleString();
    }
}

/**
 * Handle calendar selection change
 */
function onCalendarChange(event) {
    const selectedId = event.target.value;
    
    // Save the selection as action settings
    const newSettings = {
        calendarId: selectedId || undefined  // undefined means use default
    };
    
    saveActionSettings(newSettings);
    updateCalendarInfo(selectedId);
    
    console.log('[PI] Calendar changed to:', selectedId || '(default)');
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Calendar dropdown change handler
    const calendarSelect = document.getElementById('calendarSelect');
    if (calendarSelect) {
        calendarSelect.addEventListener('change', onCalendarChange);
    }
    
    // Settings button
    const settingsButton = document.getElementById('settings');
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.setupPopup = window.open('setup.html', 'iCal Settings', 'width=600,height=700');
        });
    }
});

// Export for rollup IIFE bundle
export { connectElgatoStreamDeckSocket };
