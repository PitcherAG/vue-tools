import { fireEvent } from '../../event'
import { createStore } from '../../store'
import { reactive, computed } from '@vue/composition-api'
import UI_CONSTANTS from '../../constants/ui'

class CategoriesStore {
  id = 'categoriesStore'
  loaded = false
  state = reactive({
    category: {},
    categories: [],
    parentCategories: computed(() =>
      this.state.categories.filter(category => category.parentCategory == UI_CONSTANTS.PARENT_CATEGORY_VALUE)
    ),
    subCategories: computed(() =>
      this.state.categories.filter(category => category.parentCategory != UI_CONSTANTS.PARENT_CATEGORY_VALUE)
    )
  })

  /*
        This method is called when category is changed
    */
  setMainNav(category) {
    if (category) {
      window.lastViewedCategory = category
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`${this.state.appID}.mainNavItem`, category.ID)
      }
      fireEvent('setCategory', { category: JSON.stringify(category) })
      this.state.category = category
      if (!this.loaded) {
        this.loaded = true
        fireEvent('uiReady')
      }
    }
  }
}

export const useCategoriesStore = () => {
  return createStore(new CategoriesStore())
}

window.setMainNav = function(lastViewedCategory) {
  window.lastViewedCategory = lastViewedCategory
}
