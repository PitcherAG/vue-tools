import { fireEvent } from './event'
import { createStore } from 'pinia'
import { PLATFORM } from './platform'

export const useConfigStore = createStore({
    id: 'config',
    state: () => ({
        customCaches: null
    }),
    getters: {
        getTableDict: state => {
            const d = {}
            if (!state.customCaches) {
                return d
            }
            for (let i = 0; i < state.customCaches.length; i++) {
                const table = state.customCaches[i]
                d[table.sfObjectName] = table.tableToCache
                d[table.objectName] = table.tableToCache
            }
            return d
        },
        getCacheDict: state => {
            const d = {}
            if (!state.customCaches) {
                return d
            }
            for (let i = 0; i < state.customCaches.length; i++) {
                const table = state.customCaches[i]
                d[table.sfObjectName] = table
                d[table.objectName] = table
            }
            return d
        }
    }
})

export async function loadConfig() {
    const store = useConfigStore()
    const result = await fireEvent('getAppConfig', {})

    result.customCaches.push({
        objectName: 'Account',
        sfObjectName: 'Account',
        tableToCache: PLATFORM === 'IOS' ? 'tbl_crm_accounts_m_v3' : 'tbl_crm_accounts',
        query: result.sfdcAccountQuery
    })
    result.customCaches.push({
        objectName: 'Contact',
        sfObjectName: 'Contact',
        tableToCache: PLATFORM === 'IOS' ? 'tbl_crm_contacts_m_v4' : 'tbl_crm_contacts',
        query: result.sfdcContactQuery
    })
    result.customCaches.push({
        objectName: 'Call',
        sfObjectName: 'Call',
        tableToCache: 'tbl_calls',
        query: ''
    })
    result.customCaches.push({
        objectName: 'User',
        sfObjectName: 'User',
        tableToCache: PLATFORM === 'IOS' ? 'tbl_crm_users_m_v3' : 'tbl_crm_users',
        query: ''
    })
    store.patch(result)
    return result
}
