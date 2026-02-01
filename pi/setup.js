/**
 * Setup page for iCal plugin - Named Calendars Management
 * 
 * This popup allows users to:
 * - Manage named calendars (add, edit, delete)
 * - Set a default calendar
 * - Configure global defaults
 */

// Store for calendars
let calendars = [];
let defaultCalendarId = null;

/**
 * Generate a unique ID for calendars
 */
function generateId() {
    return 'cal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

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
 * Render the calendar list
 */
function renderCalendarList() {
    const listEl = document.getElementById('calendar-list');
    if (!listEl) return;
    
    if (calendars.length === 0) {
        listEl.innerHTML = '<div class="empty-calendars">No calendars configured. Add one below.</div>';
        return;
    }
    
    listEl.innerHTML = calendars.map(cal => {
        const isDefault = cal.id === defaultCalendarId;
        return `
            <div class="calendar-item ${isDefault ? 'default' : ''}" data-id="${cal.id}">
                <div class="calendar-name">
                    ${escapeHtml(cal.name)}
                    ${isDefault ? '<span class="default-badge">Default</span>' : ''}
                </div>
                <div class="calendar-url" title="${escapeHtml(cal.url)}">${escapeHtml(cal.url)}</div>
                <div class="calendar-actions">
                    ${!isDefault ? `<button class="btn-small btn-default" onclick="setDefaultCalendar('${cal.id}')">★</button>` : ''}
                    <button class="btn-small btn-edit" onclick="editCalendar('${cal.id}')">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteCalendar('${cal.id}')">🗑</button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show the calendar form for adding
 */
function showAddForm() {
    document.getElementById('edit-calendar-id').value = '';
    document.getElementById('calendar-name').value = '';
    document.getElementById('calendar-url').value = '';
    document.getElementById('calendar-time-window').value = '';
    document.getElementById('calendar-exclude-allday').value = '';
    document.getElementById('calendar-form').classList.remove('hidden');
    document.getElementById('add-calendar-btn').style.display = 'none';
    document.getElementById('calendar-name').focus();
}

/**
 * Hide the calendar form
 */
function hideForm() {
    document.getElementById('calendar-form').classList.add('hidden');
    document.getElementById('add-calendar-btn').style.display = 'block';
}

/**
 * Edit an existing calendar
 */
function editCalendar(id) {
    const cal = calendars.find(c => c.id === id);
    if (!cal) return;
    
    document.getElementById('edit-calendar-id').value = id;
    document.getElementById('calendar-name').value = cal.name;
    document.getElementById('calendar-url').value = cal.url;
    document.getElementById('calendar-time-window').value = cal.timeWindow || '';
    document.getElementById('calendar-exclude-allday').value = cal.excludeAllDay !== undefined ? String(cal.excludeAllDay) : '';
    document.getElementById('calendar-form').classList.remove('hidden');
    document.getElementById('add-calendar-btn').style.display = 'none';
    document.getElementById('calendar-name').focus();
}

/**
 * Save the current calendar (add or edit)
 */
function saveCalendar() {
    const id = document.getElementById('edit-calendar-id').value;
    const name = document.getElementById('calendar-name').value.trim();
    const url = document.getElementById('calendar-url').value.trim();
    const timeWindowVal = document.getElementById('calendar-time-window').value;
    const excludeAllDayVal = document.getElementById('calendar-exclude-allday').value;
    
    // Validate
    if (!name) {
        showAlert('Please enter a calendar name');
        return;
    }
    if (!url) {
        showAlert('Please enter an iCal URL');
        return;
    }
    if (!isValidURL(url)) {
        showAlert('Please enter a valid iCal URL (must start with http:// or https://)');
        return;
    }
    
    // Check for duplicate names (excluding current if editing)
    const duplicate = calendars.find(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== id);
    if (duplicate) {
        showAlert('A calendar with this name already exists');
        return;
    }
    
    const calData = {
        id: id || generateId(),
        name: name,
        url: url,
        timeWindow: timeWindowVal ? parseInt(timeWindowVal, 10) : undefined,
        excludeAllDay: excludeAllDayVal !== '' ? excludeAllDayVal === 'true' : undefined
    };
    
    if (id) {
        // Edit existing
        const index = calendars.findIndex(c => c.id === id);
        if (index !== -1) {
            calendars[index] = calData;
        }
    } else {
        // Add new
        calendars.push(calData);
        
        // If this is the first calendar, make it the default
        if (calendars.length === 1) {
            defaultCalendarId = calData.id;
        }
    }
    
    hideForm();
    renderCalendarList();
    
    // Don't auto-save - user needs to click Save Settings
    showAlert('Calendar updated. Click "Save Settings" to apply changes.', 'notice', 5);
}

/**
 * Delete a calendar
 */
function deleteCalendar(id) {
    const cal = calendars.find(c => c.id === id);
    if (!cal) return;
    
    if (!confirm(`Delete calendar "${cal.name}"?`)) {
        return;
    }
    
    calendars = calendars.filter(c => c.id !== id);
    
    // If deleted calendar was default, set new default
    if (defaultCalendarId === id) {
        defaultCalendarId = calendars.length > 0 ? calendars[0].id : null;
    }
    
    renderCalendarList();
    showAlert('Calendar deleted. Click "Save Settings" to apply changes.', 'notice', 5);
}

/**
 * Set a calendar as the default
 */
function setDefaultCalendar(id) {
    defaultCalendarId = id;
    renderCalendarList();
    showAlert('Default calendar changed. Click "Save Settings" to apply changes.', 'notice', 5);
}

/**
 * Save all settings to Stream Deck
 */
function saveUrl() {
    const timeWindow = parseInt(document.getElementById('timeWindow').value, 10);
    const excludeAllDayEl = document.getElementById('excludeAllDay');
    const excludeAllDay = excludeAllDayEl ? excludeAllDayEl.checked : true;
    const titleDisplayDurationEl = document.getElementById('titleDisplayDuration');
    const titleDisplayDuration = titleDisplayDurationEl ? parseInt(titleDisplayDurationEl.value, 10) : 15;
    const flashOnMeetingStartEl = document.getElementById('flashOnMeetingStart');
    const flashOnMeetingStart = flashOnMeetingStartEl ? flashOnMeetingStartEl.checked : false;
    
    // Validate: need at least one calendar
    if (calendars.length === 0) {
        showAlert('Please add at least one calendar');
        return;
    }
    
    // Get parent window's websocket connection
    const opener = getOpener();
    if (opener && opener.websocket) {
        // Build global settings with named calendars
        const globalSettings = {
            // Named calendars (new approach)
            calendars: calendars,
            defaultCalendarId: defaultCalendarId,
            
            // Legacy field - populate from first/default calendar for backwards compat
            url: calendars.find(c => c.id === defaultCalendarId)?.url || calendars[0]?.url || '',
            urlVersion: (opener.globalSettings?.urlVersion || 0) + 1,
            
            // Global defaults
            timeWindow: timeWindow,
            excludeAllDay: excludeAllDay,
            titleDisplayDuration: titleDisplayDuration,
            flashOnMeetingStart: flashOnMeetingStart
        };
        
        const globalJson = {
            event: 'setGlobalSettings',
            context: opener.uuid,
            payload: globalSettings
        };
        
        console.log('[SETUP] Saving global settings:', globalSettings);
        opener.websocket.send(JSON.stringify(globalJson));
        opener.globalSettings = globalSettings;
        
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
 * Force refresh all calendars
 */
function refreshIcal() {
    if (calendars.length === 0) {
        showAlert('Please add at least one calendar first');
        return;
    }
    
    // Get parent window's websocket connection
    const opener = getOpener();
    if (opener && opener.websocket) {
        const settings = Object.assign({}, opener.globalSettings, {
            urlVersion: (opener.globalSettings?.urlVersion || 0) + 1
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
 * Migrate from old settings format (single URL) to named calendars
 */
function migrateOldSettings(globalSettings) {
    if (globalSettings.calendars && globalSettings.calendars.length > 0) {
        // Already using named calendars
        return globalSettings;
    }
    
    if (globalSettings.url) {
        // Create a default calendar from the old URL
        const defaultCal = {
            id: generateId(),
            name: 'Default',
            url: globalSettings.url,
            timeWindow: globalSettings.timeWindow,
            excludeAllDay: globalSettings.excludeAllDay
        };
        
        globalSettings.calendars = [defaultCal];
        globalSettings.defaultCalendarId = defaultCal.id;
        
        console.log('[SETUP] Migrated old settings to named calendars:', defaultCal);
    }
    
    return globalSettings;
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get settings from opener window
    const opener = getOpener();
    
    // Load global settings
    if (opener && opener.globalSettings) {
        // Migrate old format if needed
        const settings = migrateOldSettings(opener.globalSettings);
        
        // Load calendars
        calendars = settings.calendars || [];
        defaultCalendarId = settings.defaultCalendarId || (calendars.length > 0 ? calendars[0].id : null);
        
        // Render the calendar list
        renderCalendarList();
        
        // Load global defaults
        const timeWindowSelect = document.getElementById('timeWindow');
        if (timeWindowSelect) {
            timeWindowSelect.value = settings.timeWindow || 3;
        }
        
        const excludeAllDayCheckbox = document.getElementById('excludeAllDay');
        if (excludeAllDayCheckbox) {
            excludeAllDayCheckbox.checked = settings.excludeAllDay !== false;
        }
        
        const titleDisplayDurationSelect = document.getElementById('titleDisplayDuration');
        if (titleDisplayDurationSelect) {
            titleDisplayDurationSelect.value = settings.titleDisplayDuration || 15;
        }
        
        const flashOnMeetingStartCheckbox = document.getElementById('flashOnMeetingStart');
        if (flashOnMeetingStartCheckbox) {
            flashOnMeetingStartCheckbox.checked = settings.flashOnMeetingStart === true;
        }
    } else {
        renderCalendarList();
    }
    
    // Add event listeners
    document.getElementById('add-calendar-btn')?.addEventListener('click', showAddForm);
    document.getElementById('save-calendar-btn')?.addEventListener('click', saveCalendar);
    document.getElementById('cancel-calendar-btn')?.addEventListener('click', hideForm);
    document.getElementById('save')?.addEventListener('click', saveUrl);
    document.getElementById('refresh')?.addEventListener('click', refreshIcal);
    document.getElementById('refresh-debug')?.addEventListener('click', requestDebugInfo);
    
    // Hide alerts initially
    const alerts = document.getElementById('alerts');
    if (alerts) {
        alerts.style.display = 'none';
    }
    
    // Request debug info on load
    requestDebugInfo();
});

/**
 * Request debug info from plugin
 */
function requestDebugInfo() {
    const opener = getOpener();
    console.log('[SETUP] requestDebugInfo called, opener:', !!opener);
    
    const debugStatus = document.getElementById('debug-status');
    if (debugStatus) {
        debugStatus.textContent = 'Requesting debug info...';
    }
    
    if (opener) {
        if (opener.lastDebugInfo) {
            console.log('[SETUP] Using cached debug info');
            handlePluginMessage(opener.lastDebugInfo);
        }
        
        if (opener.requestDebugInfo) {
            console.log('[SETUP] Calling opener.requestDebugInfo()');
            opener.requestDebugInfo();
        } else if (opener.websocket) {
            console.log('[SETUP] Fallback: sending directly via websocket');
            const json = {
                event: 'sendToPlugin',
                action: opener.actionInfo?.action || 'com.pedrofuentes.ical.combined',
                context: opener.uuid,
                payload: { action: 'getDebugInfo' }
            };
            opener.websocket.send(JSON.stringify(json));
        }
    } else {
        console.log('[SETUP] No opener available');
        if (debugStatus) {
            debugStatus.textContent = 'Error: Cannot communicate with Property Inspector';
            debugStatus.style.color = '#f44336';
        }
    }
}

/**
 * Handle messages from plugin
 */
function handlePluginMessage(message) {
    console.log('[DEBUG] handlePluginMessage received:', message);
    
    const debugStatus = document.getElementById('debug-status');
    if (debugStatus) {
        debugStatus.textContent = 'Received response from plugin';
        debugStatus.style.color = '#4CAF50';
    }
    
    if (message && message.action === 'debugInfo') {
        const data = message.data;
        console.log('[DEBUG] Debug info data:', data);
        
        const debugPanel = document.getElementById('debug-panel');
        if (debugPanel && data.isDebugMode) {
            debugPanel.style.display = 'block';
        }
        
        const cacheStatus = document.getElementById('cache-status');
        if (cacheStatus && data.cache) {
            cacheStatus.textContent = JSON.stringify(data.cache, null, 2);
        }
        
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
        
        const debugLogs = document.getElementById('debug-logs');
        if (debugLogs && data.logs) {
            if (data.logs.length > 0) {
                debugLogs.textContent = data.logs.map(log => 
                    `[${log.timestamp}] [${log.level}] ${log.message}${log.data ? '\n  ' + JSON.stringify(log.data) : ''}`
                ).join('\n');
                debugLogs.scrollTop = debugLogs.scrollHeight;
            } else {
                debugLogs.textContent = 'No logs available';
            }
        }
    }
}

// Listen for messages from opener window
window.addEventListener('message', function(event) {
    console.log('[DEBUG] Window message received:', event.data);
    if (event.data && event.data.type === 'sendToPropertyInspector') {
        handlePluginMessage(event.data.payload);
    }
});
