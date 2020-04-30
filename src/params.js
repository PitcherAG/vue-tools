import { createStore } from 'pinia'

window.getParameters = function(text) {
    window.params = JSON.parse(text)
}

export const useParamsStore = createStore({
    id: 'params',
    state: () => ({
        account: null,
        contacts: null,
        salesForceUser: null
        // locale: computed(() => state.salesForceUser ? state.salesForceUser.LanguageLocaleKey : null)
    }),
    getters: {
        locale: state => {
            return state.salesForceUser
                ? state.salesForceUser.LanguageLocaleKey.split('_').join('-')
                : state.user
                ? state.user.LanguageLocaleKey.split('_').join('-')
                : null
        },
        language: state => {
            return state.salesForceUser
                ? state.salesForceUser.LanguageLocaleKey.split('_')[0].toLowerCase()
                : state.user
                ? state.user.LanguageLocaleKey.split('_')[0].toLowerCase()
                : null
        },
        context: state => {
            return {
                Account: state.account,
                Contact: state.contact,
                Contacts: state.contacts,
                User: state.salesForceUser ? state.salesForceUser : state.user
            }
        }
    }
})

export function loadParams() {
    const store = useParamsStore()
    return new Promise(resolve => {
        if (process.env.VUE_APP_PARAMS) {
            // for testing
            let preParams = JSON.parse(process.env.VUE_APP_PARAMS)
            store.patch(preParams)
            resolve(store.state)
        } else if (typeof window.params === 'undefined') {
            let count = 0
            let interval = setInterval(() => {
                count++
                if (typeof window.params !== 'undefined' || count === 10) {
                    clearInterval(interval)
                    store.patch(window.params)
                    resolve(store.state)
                }
            }, 100)
        } else {
            store.patch(window.params)
            resolve(store)
        }
    })
}

export function useParams() {
    const params = useParamsStore().state
    return { params }
}

// For Pitcher Connect initialization
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
        window.Ti.App.fireEvent('Error', e)
    }
}

window.loadPresentations = function() {}
window.showUI = function() {}

export function loadServerJSON() {
    return new Promise(resolve => {
        if (process.env.VUE_APP_PARAMS) {
            // for testing
            // let preParams = JSON.parse(process.env.VUE_APP_PARAMS)
            // store.patch(preParams)
            // resolve(store.state)
            /*
              TO DO:
              Remove later
            */
            resolve(undefined)
        } else if (typeof window.serverJSON === 'undefined') {
            let count = 0
            let interval = setInterval(() => {
                count++
                if (typeof window.serverJSON !== 'undefined' || count === 10) {
                    clearInterval(interval)
                    // store.patch(window.params)
                    // resolve(store.state)
                    return resolve(window.serverJSON)
                }
            }, 100)
        } else {
            // store.patch(window.params)
            return resolve(undefined)
        }
    })
}
