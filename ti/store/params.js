export default {
    state: {
        params: Object
    },
    getters: {
        account: state => state.params ? state.params.account : null,
        contacts: state => state.params ? state.params.contacts : null
    },
    actions: {
        getParams ({ commit }) {
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
        setParams (state, payload) {
            state.params = payload
        },
    }
}
