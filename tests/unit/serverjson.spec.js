import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import {
    loadServerJSON,
    useServerJSONStore,
    useServerJSON,
    getExtraFieldValue,
    useFilesStore,
    useFiles,
    useCategoriesStore,
    useCategories
} from '@/ui/serverJSON'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('serverjson methods - (you must have env variables)', () => {
    it('loadServerJSON', async () => {
        await loadServerJSON()
        expect(window.serverJSON).not.toBeNull()
    })

    it('useServerJSONStore', () => {
        const store = useServerJSONStore()
        expect(store.state.appID).not.toBeNull()
    })

    it('useServerJSON', () => {
        const state = useServerJSON()
        expect(state.appID).not.toBeNull()
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

    it('useCategories - categories', () => {
        const state = useCategories()
        expect(state.categories.length).toBeGreaterThan(0)
    })

    it('useCategories - subCategories', () => {
        const state = useCategories()
        expect(state.subCategories.length).toBeGreaterThan(0)
    })

    it('useFiles - files', () => {
        const state = useFiles()
        expect(state.files.length).toBeGreaterThan(0)
    })

    it('getExtraFieldValue - uiResponsive', () => {
        expect(getExtraFieldValue('uiResponsive')).toEqual(true)
    })
})
