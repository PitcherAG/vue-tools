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
        locale: (state, getters) => {
            return state.salesForceUser
                ? state.salesForceUser.LanguageLocaleKey.split('_').join('-')
                : state.user
                ? state.user.LanguageLocaleKey.split('_').join('-')
                : null
        },
        language: (state, getters) => {
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
                if (typeof window.params !== 'undefined' || count===10) {
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
