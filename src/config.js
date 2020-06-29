import { fireEvent } from './event'
import Vue from 'vue'
import { PLATFORM } from './platform'
import { computed } from '@vue/composition-api'
import { createStore } from './store/store'

export function useConfigStore(){
    const s = {
        id: 'config',
        state: {
            customCaches: null
        },
        getTableDict: computed(() => {
            const d = {}
            if (!s.state.customCaches) {
                return d
            }
            for (let i = 0; i < s.state.customCaches.length; i++) {
                const table = s.state.customCaches[i]
                d[table.sfObjectName] = table.tableToCache
                d[table.objectName] = table.tableToCache
            }
            return d
        }),
        getCacheDict: computed(() => {
            const d = {}
            if (!s.state.customCaches) {
                return d
            }
            for (let i = 0; i < s.state.customCaches.length; i++) {
                const table = s.state.customCaches[i]
                d[table.sfObjectName] = table
                d[table.objectName] = table
            }
            return d
        })
    }
    return createStore(s)
}


export async function loadConfig() {
    const store = useConfigStore()
    let result = await fireEvent('getAppConfig', {})
    console.log('app config', result)
    if (PLATFORM === 'IOS') {
        result.customCaches.push({
            objectName: 'Account',
            sfObjectName: 'Account',
            tableToCache: 'tbl_crm_accounts_m_v3',
            query: result.sfdcAccountQuery
        })
        result.customCaches.push({
            objectName: 'Contact',
            sfObjectName: 'Contact',
            tableToCache: 'tbl_crm_contacts_m_v4',
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
            tableToCache: 'tbl_crm_users_m_v3',
            query: ''
        })
    } else if (PLATFORM === 'ANDROID') {
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
            tableToCache: 'tbl_crm_users',
            query: ''
        })
    } else if (PLATFORM === 'WINDOWS') {
        result = result[0]
        result.customCaches.push({
            objectName: 'Account',
            sfObjectName: 'Account',
            tableToCache: 'SQLiteSfAccount',
            query: result.sfdcAccountQuery
        })
        result.customCaches.push({
            objectName: 'Contact',
            sfObjectName: 'Contact',
            tableToCache: 'SQLiteSfContact',
            query: result.sfdcContactQuery
        })
        result.customCaches.push({
            objectName: 'Call',
            sfObjectName: 'Call',
            tableToCache: 'SQLiteSfEvent',
            query: ''
        })
        result.customCaches.push({
            objectName: 'User',
            sfObjectName: 'User',
            tableToCache: 'SQLiteSfUser',
            query: ''
        })
    } else {
        throw new Error('platform not supported:' + PLATFORM)
    }
    for (const a in result) {
        store.state[a] = result[a]
    }
    return store.state
}
