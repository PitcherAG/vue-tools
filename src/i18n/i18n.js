import { createStore } from 'pinia'
import { getTranslationIndex } from './plurals'
import { renderContext } from '../utils'

export const useI18nStore = createStore({
    id: 'i18n',
    state: () => ({
        availableLanguages: {
            en_US: 'American English',
        },
        locale: 'en_US',
        messages: null,
    }),
    actions: {
        setLanguage: async function(locale, load = true) {
            console.log('set language to ' + locale)
            const state = this.state
            state.locale = locale
            if (load) {
                try {
                    const response = await fetch(`translations/${locale}.json`)
                    const messages = await response.json()
                    console.log(messages)
                    if (!state.messages) {
                        state.messages = {}
                    }
                    state.messages[locale] = messages[locale]
                } catch (e) {
                    console.error('The language ' + locale + ' does not has a translation file or translation data!')
                    console.error(e)
                }
            }
        },
    },
})

export function provideI18n(i18nConfig) {
    console.warn('provideI18n is deprecated')
    const store = useI18nStore()
    store.patch(i18nConfig)
}

export function useI18N() {
    console.warn('useI18N is deprecated')
    const store = useI18nStore()
    return { t: store.t, store }
}

export function trans(key, n = 0, context) {
    const store = useI18nStore()
    if (!store.state.messages || !store.state.messages[store.state.locale]) {
        console.error('no translations found for:' + store.state.locale)
        return key
    }
    let result = store.state.messages[store.state.locale][key]
    if (Array.isArray(result)) {
        const index = getTranslationIndex(store.state.locale, n)
        result = result[index]
    }
    if (!result) {
        result = key
    }
    if (context || result.indexOf('{{') > -1) {
        result = renderContext(result, context)
    }
    return result
}

export async function setLanguage(locale, load = true) {
    locale = locale.split('-').join('_')
    const store = useI18nStore()
    await store.setLanguage(locale, load)
}

window.$gettext = function(msgid, context) {
    return trans(msgid, 1, context)
}

window.$ngettext = function(msgid, n, context) {
    return trans(msgid, n, context)
}

export function TranslationPlugin(Vue, options = {}) {
    const defaultConfig = {
        availableLanguages: { en_US: 'English' },
        locale: 'en_US',
        messages: null,
    }

    Object.keys(options).forEach(key => {
        if (Object.keys(defaultConfig).indexOf(key) === -1) {
            throw new Error(`${key} is an invalid option for the translate plugin.`)
        }
    })
    options = Object.assign(defaultConfig, options)
    const store = useI18nStore()
    store.patch(options)

    Vue.filter('translate', function(value) {
        return trans(value)
    })

    // Exposes instance methods.
    Vue.prototype.$gettext = $gettext
    Vue.prototype.$ngettext = $ngettext
}
