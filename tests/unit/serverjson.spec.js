import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { getExtraFieldValue, useCategoriesStore, useFilesStore, useSystemStore } from '@/instance/stores/index'
import { loadServerJSON } from '@/instance/server.json'

const localVue = createLocalVue()

localVue.use(CompositionApi)

describe('serverjson data - (you must have env variables)', () => {
  it('loadServerJSON', async () => {
    await loadServerJSON()
    expect(window.serverJSON).not.toBeNull()
  })

  it('useSystemStore', () => {
    const store = useSystemStore()

    expect(store.state.appID).not.toBeNull()
  })

  it('useFilesStore - files', () => {
    const store = useFilesStore()

    expect(store.state.files.length).toBeGreaterThan(0)
  })

  it('useFilesStore - slides', () => {
    const store = useFilesStore()

    expect(store.state.slides.length).toBeGreaterThan(0)
  })

  it('useCategoriesStore - categories', () => {
    const store = useCategoriesStore()

    expect(store.state.categories.length).toBeGreaterThan(0)
  })

  it('useCategoriesStore - subCategories', () => {
    const store = useCategoriesStore()

    expect(store.state.subCategories.length).toBeGreaterThan(0)
  })

  it('getExtraFieldValue - uiResponsive', () => {
    expect(getExtraFieldValue('uiResponsive')).toEqual(true)
  })
})
