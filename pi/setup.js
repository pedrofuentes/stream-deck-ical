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
});
