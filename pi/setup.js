/**
 * Setup page for iCal plugin
 */

/**
 * Validate URL format
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Show alert message
 */
function showAlert(text, type = 'error', seconds = 10) {
    const alerts = document.getElementById('alerts');
    if (!alerts) return;
    
    alerts.innerHTML = `<span class="${type}">${text}</span>`;
    alerts.style.display = 'block';
    
    setTimeout(() => {
        alerts.style.display = 'none';
    }, seconds * 1000);
}

/**
 * Get opener window (parent that opened this popup)
 */
function getOpener() {
    return window.opener || window.parent;
}

/**
 * Save URL and settings
 */
function saveUrl() {
    const url = document.getElementById('url').value.trim();
    const timeWindow = parseInt(document.getElementById('timeWindow').value, 10);
    
    if (!url) {
        showAlert('Please enter an iCal URL');
        return;
    }
    
    if (!isValidURL(url)) {
        showAlert('Please enter a valid iCal URL (must start with http:// or https://)');
        return;
    }
    
    // Get parent window's websocket connection
    const opener = getOpener();
    if (opener && opener.websocket) {
        const settings = {
            url: url,
            timeWindow: timeWindow,
            urlVersion: (opener.globalSettings.urlVersion || 0) + 1
        };
        
        const json = {
            event: 'setGlobalSettings',
            context: opener.uuid,
            payload: settings
        };
        
        opener.websocket.send(JSON.stringify(json));
        opener.globalSettings = settings;
        
        // Update parent window UI
        if (opener.document.getElementById('url')) {
            opener.document.getElementById('url').value = url;
        }
        if (opener.document.getElementById('timeWindow')) {
            opener.document.getElementById('timeWindow').value = timeWindow;
        }
        
        showAlert('Settings saved successfully! Refreshing calendar data...', 'notice', 5);
        
        // Close window after delay
        setTimeout(() => {
            window.close();
        }, 2000);
    } else {
        showAlert('Error: Unable to communicate with plugin. Please close and try again.');
    }
}

/**
 * Force refresh
 */
function refreshIcal() {
    const url = document.getElementById('url').value.trim();
    
    if (!url) {
        showAlert('Please enter an iCal URL first');
        return;
    }
    
    if (!isValidURL(url)) {
        showAlert('Current iCal URL is not valid. Please enter a valid URL before refreshing.');
        return;
    }
    
    // Get parent window's websocket connection
    const opener = getOpener();
    if (opener && opener.websocket) {
        const settings = Object.assign({}, opener.globalSettings, {
            urlVersion: (opener.globalSettings.urlVersion || 0) + 1
        });
        
        const json = {
            event: 'setGlobalSettings',
            context: opener.uuid,
            payload: settings
        };
        
        opener.websocket.send(JSON.stringify(json));
        opener.globalSettings = settings;
        
        showAlert('Force refresh triggered!', 'notice', 3);
    } else {
        showAlert('Error: Unable to communicate with plugin. Please close and try again.');
    }
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get settings from opener window
    const opener = getOpener();
    if (opener && opener.globalSettings) {
        const urlInput = document.getElementById('url');
        const timeWindowSelect = document.getElementById('timeWindow');
        
        if (urlInput) {
            urlInput.value = opener.globalSettings.url || '';
        }
        if (timeWindowSelect) {
            timeWindowSelect.value = opener.globalSettings.timeWindow || 3;
        }
    }
    
    // Add event listeners
    const saveButton = document.getElementById('save');
    if (saveButton) {
        saveButton.addEventListener('click', saveUrl);
    }
    
    const refreshButton = document.getElementById('refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', refreshIcal);
    }
    
    // Hide alerts initially
    const alerts = document.getElementById('alerts');
    if (alerts) {
        alerts.style.display = 'none';
    }
    
    // Debug panel functionality
    const refreshDebugButton = document.getElementById('refresh-debug');
    if (refreshDebugButton) {
        refreshDebugButton.addEventListener('click', requestDebugInfo);
    }
    
    // Request debug info on load to check if debug mode is enabled
    requestDebugInfo();
});

/**
 * Request debug info from plugin
 */
function requestDebugInfo() {
    const opener = getOpener();
    if (opener && opener.websocket) {
        // Send request to plugin for debug info
        const json = {
            event: 'sendToPlugin',
            action: 'com.pedrofuentes.ical.time-left',  // Any action UUID
            context: opener.uuid,
            payload: {
                action: 'getDebugInfo'
            }
        };
        opener.websocket.send(JSON.stringify(json));
    }
}

/**
 * Handle messages from plugin
 */
function handlePluginMessage(message) {
    if (message && message.action === 'debugInfo') {
        const data = message.data;
        
        // Show debug panel if debug mode is enabled
        if (data.isDebugMode) {
            const debugPanel = document.getElementById('debug-panel');
            if (debugPanel) {
                debugPanel.style.display = 'block';
            }
            
            // Update cache status
            const cacheStatus = document.getElementById('cache-status');
            if (cacheStatus && data.cache) {
                cacheStatus.textContent = JSON.stringify(data.cache, null, 2);
            }
            
            // Update events list
            const eventsList = document.getElementById('events-list');
            if (eventsList && data.events) {
                if (data.events.length > 0) {
                    eventsList.textContent = data.events.map(e => 
                        `${e.summary}\n  Start: ${e.start}\n  End: ${e.end}${e.isRecurring ? ' (recurring)' : ''}`
                    ).join('\n\n');
                } else {
                    eventsList.textContent = 'No events in cache';
                }
            }
            
            // Update logs
            const debugLogs = document.getElementById('debug-logs');
            if (debugLogs && data.logs) {
                if (data.logs.length > 0) {
                    debugLogs.textContent = data.logs.map(log => 
                        `[${log.timestamp}] [${log.level}] ${log.message}${log.data ? '\n  ' + JSON.stringify(log.data) : ''}`
                    ).join('\n');
                    // Auto-scroll to bottom
                    debugLogs.scrollTop = debugLogs.scrollHeight;
                } else {
                    debugLogs.textContent = 'No logs available';
                }
            }
        }
    }
}

// Listen for messages from opener window (set up by pi.js)
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'sendToPropertyInspector') {
        handlePluginMessage(event.data.payload);
    }
});
