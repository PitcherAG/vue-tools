import { createStore } from 'pinia'

export const useI18nStore = createStore({
    id: 'i18n',
    state: () => ({
        locale: null,
        messages: null
    }),
    actions: {}
})

export function provideI18n(i18nConfig) {
    const store = useI18nStore()
    store.patch(i18nConfig)
}

export function useI18N() {
    const store = useI18nStore()
    return { t: store.t, store }
}

export function trans(key) {
    const store = useI18nStore()
    const result = store.state.messages[store.state.locale][key]
    if (!result) {
        return key
    }
    return result
}

export function setLanguage(locale) {
    const store = useI18nStore()
    store.state.locale = locale
}
