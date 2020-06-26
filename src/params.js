import { fireEvent } from './event'
import { waitForWindowProp } from './utils'
import Vue from 'vue'
import { computed } from '@vue/composition-api'

/** For Pitcher Impact
 |--------------------------------------------------
 |    params
 |--------------------------------------------------
 **/

window.getParameters = function(text) {
    window.params = JSON.parse(text)
}

const s = {
    id: 'params',
    state: {
        account: null,
        contacts: null,
        salesForceUser: null,
        user: null
    },
    locale: computed(() => {
        if (s.state.salesForceUser) {
            return s.state.salesForceUser.LanguageLocaleKey.split('_').join('-')
        }
        if (s.state.user) {
            return s.state.user.LanguageLocaleKey.split('_').join('-')
        }
    }),

    language: computed(() => {
        if (s.state.salesForceUser) {
            return s.state.salesForceUser.LanguageLocaleKey.split('_')[0].toLowerCase()
        }
        if (s.state.user) {
            return s.state.user.LanguageLocaleKey.split('_')[0].toLowerCase()
        }
        if (s.state.config) {
            const isoLocaleMap = {
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

            if (isoLocaleMap[s.state.config.langV]) {
                return isoLocaleMap[s.state.config.langV]
            } else {
                return s.state.config.langV.toLowerCase()
            }
        }
    }),
    context: computed(() => {
        return {
            Account: s.state.account,
            Contact: s.state.contact,
            Contacts: s.state.contacts,
            User: s.state.salesForceUser ? s.state.salesForceUser : s.state.user
        }
    })
}
const store = Vue.observable(s)

export const useParamsStore = () => {
    return store
}

// Params initializer
export async function loadParams() {
    const store = useParamsStore()

    // for testing
    if (process.env.VUE_APP_PARAMS) {
        const preParams = JSON.parse(process.env.VUE_APP_PARAMS)
        Object.assign(store.state, preParams)
        return store.state
    }

    const params = await waitForWindowProp('params')
    if (params) {
        Object.assign(store.state, window.params)
    }
    return store.state
}

export function useParams() {
    return useParamsStore().state
}

/** For Pitcher Connect
 |--------------------------------------------------
 |    serverJSON
 |--------------------------------------------------
 **/

// These must to be attached on window
window.setMainNav = function(lastViewedCategory) {
    window.lastViewedCategory = lastViewedCategory
}

window.gotJSON = function(serverJSONV, documentPathV) {
    try {
        window.documentPath = documentPathV
        window.serverJSON = JSON.parse(serverJSONV)
        window.serverJSON.files.reverse()
        window.appID = window.serverJSON.appID
    } catch (e) {
        fireEvent('Error', e)
    }
}

window.loadPresentations = function() {}
window.showUI = function() {}

// serverJSON store
const b = {
    id: 'serverJSON',
    state: {
        files: [],
        categories: [],
        config: null,
        groups: [],
        appID: '',
        deviceName: null,
        messages: [],
        metadata: null,
        slides: [],
        supportEmail: null,
        md5: null,
        systemLang: null,
        locale: null,
        userfullname: null,
        ajaxtoken: null,
        isCustomerUI: false
    }
}

const storeServer = Vue.observable(b)

export const useServerJSONStore = () => {
    return storeServer
}

// serverJSON initializer
export async function loadServerJSON(timeout = 5) {
    const store = useServerJSONStore()

    // for testing
    if (process.env.VUE_APP_SERVERJSON) {
        // for testing
        const preServerJSON = JSON.parse(process.env.VUE_APP_SERVERJSON)
        Object.assign(store.state, preServerJSON)
        return store.state
    }

    const serverJSON = await waitForWindowProp('serverJSON', timeout)
    if (serverJSON) {
        store.state.documentPath = window.documentPath
        Object.assign(store.state, window.serverJSON)
    }
    return store.state
}

export function useServerJSON() {
    return useServerJSONStore().state
}
