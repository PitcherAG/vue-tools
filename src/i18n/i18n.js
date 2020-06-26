import { getTranslationIndex } from './plurals'
import { renderSimpleContext } from '../utils'
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import Vue from 'vue'

const s = {
    id: 'i18n',
    state: {
        availableLanguages: {
            en_US: 'American English'
        },
        locale: 'en_US',
        messages: null
    },
    setLanguage: async function(locale, load = true) {
        if (!locale) {
            throw new Error('not a valid locale:' + locale)
        }
        console.log('set language to ' + locale)
        locale = locale.split('-').join('_')
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
    }
}
const store = Vue.observable(s)

export const useI18nStore = () => {
    return store
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
    if (context || result.indexOf('{') > -1) {
        result = renderSimpleContext(result, context)
    }
    return result
}

window.$gettext = function(msgid, context) {
    return trans(msgid, 1, context)
}

window.translateUI = function(json) {
    console.warn('not implemented', JSON.parse(json))
}

window.$t = function(msgid, context) {
    return trans(msgid, 1, context)
}

window.$ngettext = function(msgid, n, context) {
    return trans(msgid, n, context)
}

export function TranslationPlugin(Vue, options = {}) {
    const defaultConfig = {
        availableLanguages: { en_US: 'English' },
        locale: 'en_US',
        messages: null
    }

    Object.keys(options).forEach(key => {
        if (Object.keys(defaultConfig).indexOf(key) === -1) {
            throw new Error(`${key} is an invalid option for the translate plugin.`)
        }
    })
    options = Object.assign(defaultConfig, options)
    const store = useI18nStore()
    Object.assign(options, store.state)

    // Exposes instance methods.
    Vue.prototype.$gettext = $gettext
    Vue.prototype.$ngettext = $ngettext
    Vue.prototype.$t = $gettext
}
