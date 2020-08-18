import { useServerJSONStore } from './instance'

/*
 * Sets navigation/category
 */
window.setMainNav = function(mainNavID) {
    const store = useServerJSONStore()
    store.setMainNav(mainNavID)
}

/*
 * Called by native as a callback to loadPresentationsFromDB event
 * An array of presentation file objects are returned
 * These file objects should parsed
 */
window.loadPresentations = function(presentationsObject) {
    if (typeof presentationsObject === 'string') {
        presentationsObject = JSON.parse(presentationsObject)
    }
    window.presentationsObject = presentationsObject
}

/*
 * Used by native
 */
window.getMainNavID = function() {
    const store = useServerJSONStore()
    return store.getMainNavID()
}

/*
 * Called by native
 * Tells UI which files are valid to show UI at that moment
 * E.g when there are pre-selected contents for a call, and user started that call, native gives files Ids of pre-selected contents
 */
window.filterJSON = function() {}

/*
 * Gets current category's logo if it has a custom logo uploaded
 */
window.getCategoryLogoURL = () => {
    const store = useServerJSONStore()
    if (store.state.currentCategory && store.state.currentCategory.hasLogo) {
        return `${store.state.documentPath}images/${store.state.currentCategory.ID}_logo.png`
    }
    return ''
}

/*
 * Sets ui colors. These may be included in config already, but can be overriden by native
 */
window.setColors = (uiColorBack, uiColorBar) => {
    const store = useServerJSONStore()
    if (store.state.config) {
        store.state.config.uiColorBack = uiColorBack
        store.state.config.uiColorBar = uiColorBar
    }
}

/*
 * Called by native, used when either a call is started / stopped or another contact is added to the call
 */
window.setCurrentContact = (newContact, newAccount) => {
    const store = useServerJSONStore()
    store.setCurrentContact(newContact, newAccount)
}

/*
 * Called by native, informs UI with the last know coordinates
 */
window.locationUpdated = (lastLongitude, lastLatitude) => {
    if (typeof lastLongitude !== 'undefined' && typeof lastLatitude !== 'undefined') {
        const store = useServerJSONStore()
        store.lastLocation = {
            lon: lastLongitude,
            lat: lastLatitude
        }
    }
}

window.updateCRM = () => {
    const store = useServerJSONStore()
    store.crmStatusChanged(true)
}

window.enableCrm = enabled => {
    const store = useServerJSONStore()
    store.crmStatusChanged(enabled)
}

