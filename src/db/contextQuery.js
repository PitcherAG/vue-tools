import Handlebars from 'handlebars'
import { query as oQuery } from './query'
import { useConfigStore } from '../config'
import { useParamsStore } from '../params'

export async function contextQuery(query, context, db = null) {
    if (!query) {
        throw Error('no query provided')
    }
    const configStore = useConfigStore()
    const params = useParamsStore().state
    query = query.split('TODAY').join('date(\'now\')')
    const template = Handlebars.compile(query)
    let tableDict = configStore.getTableDict.value
    for (let a in context) {
        if (context.hasOwnProperty(a)) {
            tableDict[a] = context[a]
        }
    }
    if (params.account) {
        tableDict.account = params.account
        tableDict.contacts = params.contacts
    }
    if (params.salesForceUser) {
        tableDict.user = params.salesForceUser
    }
    if (params.user) {
        tableDict.user = params.user
    }
    if (params.locale) {
        tableDict.locale = params.locale
    }
    let q = template(tableDict)
    window.console.log(q)
    try {
        const result = await oQuery(q, db)
        return result
    } catch (e) {
        console.error(q, tableDict)
        throw e
    }

}

