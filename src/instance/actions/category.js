import { useCategoriesStore } from '../stores/index'

export function setCategory(category) {
  const store = useCategoriesStore()
  store.setMainNav(category)
}

///TODO
window.getCategoryLogoURL = function() {
  return ''
}
