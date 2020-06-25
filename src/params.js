import { createStore } from 'pinia'
import { fireEvent } from './event'
import { waitForWindowProp } from './utils'

/** For Pitcher Impact
 |--------------------------------------------------
 |    params
 |--------------------------------------------------
 **/


window.getParameters = function(text) {
    window.params = JSON.parse(text)
}

// params store
export const useParamsStore = createStore({
    id: 'params',
    state: () => ({
        account: null,
        contacts: null,
        salesForceUser: null,
        user: null
        // locale: computed(() => state.salesForceUser ? state.salesForceUser.LanguageLocaleKey : null)
    }),
    actions: {},
    getters: {
        locale(state) {
            if (state.salesForceUser) {
                return state.salesForceUser.LanguageLocaleKey.split('_').join('-')
            }
            if (state.user) {
                return state.user.LanguageLocaleKey.split('_').join('-')
            }
        },

        language(state) {
            if (state.salesForceUser) {
                return state.salesForceUser.LanguageLocaleKey.split('_')[0].toLowerCase()
            }
            if (state.user) {
                return state.user.LanguageLocaleKey.split('_')[0].toLowerCase()
            }
            if (state.config) {
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

                if (isoLocaleMap[state.config.langV]) {
                    return isoLocaleMap[state.config.langV]
                } else {
                    return state.config.langV.toLowerCase()
                }
            }
        },
        context(state) {
            return {
                Account: state.account,
                Contact: state.contact,
                Contacts: state.contacts,
                User: state.salesForceUser ? state.salesForceUser : state.user
            }
        }
    }
})

// Params initializer
export async function loadParams() {
    const { state, patch } = useParamsStore()

    // for testing
    if (process.env.VUE_APP_PARAMS) {
        const preParams = JSON.parse(process.env.VUE_APP_PARAMS)
        patch(preParams)
        return state
    }

    const params = await waitForWindowProp('params')
    if (params) {
        patch(window.params)
    }
    return state
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
export const useServerJSONStore = createStore({
    id: 'serverJSON',
    state: () => ({
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
    })
})

// serverJSON initializer
export async function loadServerJSON(timeout = 5) {
    const { state, patch } = useServerJSONStore()

    // for testing
    if (process.env.VUE_APP_SERVERJSON) {
        // for testing
        const preServerJSON = JSON.parse(process.env.VUE_APP_SERVERJSON)
        patch(preServerJSON)
        return state
    }

    const serverJSON = await waitForWindowProp('serverJSON', timeout)
    if (serverJSON) {
        state.documentPath = window.documentPath
        patch(window.serverJSON)
    }
    return state
}

export function useServerJSON() {
    return useServerJSONStore().state
}
