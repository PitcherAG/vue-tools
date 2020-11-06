import { loadServerJSON, useServerJSONStore } from '../ui/serverJSONStore'
import { fireEvent } from '../event'
import UI_CONSTANTS from '../constants/ui'

/*
    Starting point in order to use UI / Instance methods
*/
export async function initializeInstance(timeout = 5) {
    await loadServerJSON(timeout)
    showUI()
}

/*
    Tells impact that UI is ready to be shown
*/
function showUI() {
    const store = useServerJSONStore()
    if (store.state.categories) {
        const initialCategory = (store.loaded && getLastCategory()) || getInitialCategory()
        if (initialCategory) {
            store.setMainNav(initialCategory)
        } else {
            fireEvent('uiReady')
        }
    } else {
        fireEvent('uiReady')
    }
}

/*
    Usually when UI is restored, last selected category needs to be selected.
    Value is saved to localstorage, and retrieved with this method
*/
export function getLastCategory() {
    const store = useServerJSONStore()
    const lastCategoryId =
        typeof localStorage !== 'undefined' ? localStorage.getItem(`${store.state.appID}.mainNavItem`) : null
    if (store.state.categories && lastCategoryId) {
        return store.state.categories.find(category => category.ID == lastCategoryId)
    } else {
        return null
    }
}

/*
    For some UIs, a default category can be set, to be selected when first initialized or restored
*/
export function getInitialCategory() {
    const store = useServerJSONStore()
    if (store.state.categories) {
        return (
            store.state.categories.find(category => category.isDefault) ||
            store.state.categories.find(category => category.parentCategory == UI_CONSTANTS.PARENT_CATEGORY_VALUE)
        )
    }
    return null
}

export function exitApp() {
    fireEvent('exitApp', {})
}
