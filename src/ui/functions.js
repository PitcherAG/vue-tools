import { useServerJSONStore } from './instance'

window.setMainNav = function(mainNavID) {
    const store = useServerJSONStore()
    store.setMainNav(mainNavID)
}

window.loadPresentations = function(presentationsObject) {
    if (typeof presentationsObject === 'string') {
        presentationsObject = JSON.parse(presentationsObject)
    }
    window.presentationsObject = presentationsObject
}

window.getMainNavID = function() {
    const store = useServerJSONStore()
    return store.getMainNavID()
}

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

window.setCurrentContact = (newContact, newAccount) => {
    const store = useServerJSONStore()
    store.setCurrentContact(newContact, newAccount)
}
