import { useCategoriesStore } from '../serverJSON'

export function setCategory(category) {
    const store = useCategoriesStore()
    store.setMainNav(category)
}

///TODO
window.getCategoryLogoURL = function() {
    return ''
}
