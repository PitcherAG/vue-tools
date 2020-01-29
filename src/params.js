import { createStore } from 'pinia'
import { computed } from '@vue/composition-api'

window.getParameters = function(text) {
    window.params = JSON.parse(text)
}

export const useParamsStore = createStore({
    id: 'params',
    state: () => ({
        account: null,
        contacts: null,
        salesForceUser: null,
       // locale: computed(() => state.salesForceUser ? state.salesForceUser.LanguageLocaleKey : null)
    }),
    getters: {
        locale: (state, getters) => {
            return state.salesForceUser ? state.salesForceUser.LanguageLocaleKey.split('_').join('-') : null
        }
    }
})

export function loadParams() {
    const store = useParamsStore()
    return new Promise(resolve => {
        if (process.env.VUE_APP_PARAMS) {
            let preParams = JSON.parse(process.env.VUE_APP_PARAMS)
            store.patch(preParams)
            resolve(store.state)
        } else if (typeof window.params === 'undefined') {
            let interval = setInterval(() => {
                if (typeof window.params !== 'undefined') {
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
