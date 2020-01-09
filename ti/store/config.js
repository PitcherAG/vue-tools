import { fireEvent } from '../api/event'

export default {
    state: {},
    getters: {
        table: (state, name) => {
            for (let i = 0; i < state.config.customCaches.length; i++) {
                let table = state.config.customCaches[i]
                if (table.sfObjectName && table.sfObjectName.toLowerCase() == name.toLowerCase()) {
                    return table
                }
                if (table.objectName && table.objectName.toLowerCase() == name.toLowerCase()) {
                    return table
                }
            }
            throw Error('table not found: ' + name)
        },
        tableDict: (state) => {
            let d = {}
            for (let i = 0; i < state.customCaches.length; i++) {
                let table = state.customCaches[i]
                d[table.sfObjectName] = table.tableToCache
                d[table.objectName] = table.tableToCache
            }
            return d
        }
    },
    actions: {
        loadConfig({ commit }) {
            return new Promise(resolve => {
                fireEvent('getAppConfig', {}).then(result => {
                        commit('setConfig', result)
                        resolve(result)
                    }
                )
            })
        }
    },
    mutations: {
        setConfig(state, payload) {
            for (let a in payload) {
                state[a] = payload[a]
            }
        },
    }
}
