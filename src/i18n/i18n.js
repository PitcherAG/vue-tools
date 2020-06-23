import { createStore } from 'pinia'
import { getTranslationIndex } from './plurals'
import { renderSimpleContext } from '../utils'

const impactLanguageMap = {
    AUSDE: 'de',
    BI: 'id',
    BR: 'pt',
    BU: 'bg',
    CAFR: 'fr',
    CZ: 'cs',
    DAN: 'da',
    ESMX: 'es',
    EST: 'et',
    JP: 'ja',
    LET: 'lv',
    PO: 'pl',
    PRT: 'pt',
    SCH: 'zh-CN',
    TCH: 'zh-TW',
    UA: 'uk',
    VN: 'vi'
}

const state = {
    availableLanguages: {
        en: 'English'
    },
    locale: 'en',
    messages: {}
}

if (process.env.VUE_APP_LANGUAGES) {
    Object.assign(state, JSON.parse(process.env.VUE_APP_LANGUAGES))
}

export const useI18nStore = createStore({
    id: 'i18n',
    state: () => ({ ...state }),
    actions: {
        setImpactLanguage: async function(lang) {
            if (impactLanguageMap[lang]) {
                lang = impactLanguageMap[lang]
            } else {
                lang = lang.toLowerCase()
            }

            this.setLanguage(lang)
        },
        setLanguage: async function(lang) {
            if (!this.state.availableLanguages[lang]) {
                throw new Error('invalid language')
            }

            if (lang == 'en') {
                this.state.locale = lang
                this.state.messages = {}
                return
            }

            const response = await fetch(`translations/${lang}/app.json`)
            this.state.locale = lang
            this.state.messages = await response.json()
        }
    }
})

export function trans(key, n = 0, context) {
    const store = useI18nStore()

    if (!store.state.messages[store.state.locale]) {
        return key
    }

    let result = store.state.messages[store.state.locale][key]

    // plural
    if (Array.isArray(result)) {
        const index = getTranslationIndex(store.state.locale, n)
        result = result[index]
    }

    // empty
    if (!result) {
        result = key
    }

    // replace placeholders
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
    options = Object.assign({}, state, options)

    const store = useI18nStore()
    store.patch(options)

    // Exposes instance methods.
    Vue.prototype.$gettext = $gettext
    Vue.prototype.$ngettext = $ngettext
    Vue.prototype.$t = $gettext
}
