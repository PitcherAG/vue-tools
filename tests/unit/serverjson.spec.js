import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { loadServerJSON, useServerJSONStore, useServerJSON, getExtraFieldValue } from '@/ui/serverJSONStore'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('serverjson methods - (you must have env variables)', () => {
    it('loadServerJSON', async () => {
        await loadServerJSON()
        expect(window.serverJSON).not.toBeNull()
    })

    it('useServerJSONStore - files', () => {
        const store = useServerJSONStore()
        expect(store.state.files.length).toBeGreaterThan(0)
    })

    it('useServerJSONStore - slides', () => {
        const store = useServerJSONStore()
        expect(store.state.slides.length).toBeGreaterThan(0)
    })

    it('useServerJSONStore - categories', () => {
        const store = useServerJSONStore()
        expect(store.state.categories.length).toBeGreaterThan(0)
    })

    it('useServerJSONStore - subCategories', () => {
        const store = useServerJSONStore()
        expect(store.state.subCategories.length).toBeGreaterThan(0)
    })

    it('useServerJSON - files', () => {
        const serverJSON = useServerJSON()
        expect(serverJSON.files.length).toBeGreaterThan(0)
    })

    it('getExtraFieldValue - uiResponsive', () => {
        expect(getExtraFieldValue('uiResponsive')).toEqual(true)
    })
})
