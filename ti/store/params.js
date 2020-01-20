export default {
    state: {
    },
    getters: {
        account: state => state.account ? state.account : null,
        contacts: state => state.contacts ? state.contacts : null,
        user: state => state.salesForceUser ? state.salesForceUser : null,
        locale: state => state.salesForceUser ? state.salesForceUser.LanguageLocaleKey : null,
    },
    actions: {
        getParams({ commit }) {
            return new Promise(resolve => {
                if (process.env.VUE_APP_PARAMS) {
                    let params = JSON.parse(process.env.VUE_APP_PARAMS)
                    commit('setParams', params)
                    resolve(params)
                } else if (typeof window.params === 'undefined') {
                    let interval = setInterval(() => {
                        if (typeof window.params !== 'undefined') {
                            clearInterval(interval)
                            commit('setParams', window.params)
                            resolve(window.params)
                        }
                    }, 100)
                } else {
                    commit('setParams', window.params)
                    resolve(window.params)
                }
            })

        }
    },
    mutations: {
        setParams(state, payload) {
            for (let a in payload) {
                if (payload.hasOwnProperty(a)) {
                    state[a] = payload[a]
                }
            }
        },
    }
}
