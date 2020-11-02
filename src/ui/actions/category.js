import { useServerJSONStore } from '../serverJSONStore'

export function setCategory(category) {
    const store = useServerJSONStore()
    store.setMainNav(category)
}

///TODO
window.getCategoryLogoURL = function() {
    return ''
}
