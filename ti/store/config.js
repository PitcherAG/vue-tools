import { fireEvent } from '../api/event'

export default {
    state: {},
    getters: {
        table: state => name => {
            if (!state.customCaches || !name) {
                return
            }
            for (let i = 0; i < state.customCaches.length; i++) {
                let table = state.customCaches[i]
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
            if (!state.customCaches) {
                return
            }
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
                        console.log(result)
                        result.customCaches.push({
                            objectName: 'Account',
                            sfObjectName: 'Account',
                            tableToCache: 'tbl_crm_accounts',
                            query: result.sfdcAccountQuery
                        })
                        result.customCaches.push({
                            objectName: 'Contact',
                            sfObjectName: 'Contact',
                            tableToCache: 'tbl_crm_contacts',
                            query: result.sfdcAccountQuery
                        })
                        result.customCaches.push({
                            objectName: 'Call',
                            sfObjectName: 'Call',
                            tableToCache: 'tbl_calls',
                            query: ''
                        })
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
