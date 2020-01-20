import Handlebars from 'handlebars'
import Config from '../store/config'
import { query as oQuery } from './query'
import Params from '../store/params'

function contextQuery(query, context, db = null) {
    query = query.split('TODAY').join('date(\'now\')')
    let template = Handlebars.compile(query)
    let d = Config.getters.tableDict(Config.state)

    for (let a in context) {
        if (context.hasOwnProperty(a)) {
            d[a] = context[a]
        }
    }
    if (Params.getters.account(Params.state)) {
        d.account = Params.getters.account(Params.state)
        d.contacts = Params.getters.contacts(Params.state)
    }
    if (Params.getters.user(Params.state)) {
        d.user = Params.getters.user(Params.state)
    }
    if (Params.getters.locale(Params.state)) {
        d.locale = Params.getters.locale(Params.state)
    }
    console.log(query, d)
    let q = template(d)
    console.log(q)
    return oQuery(q, db)
}

export {
    contextQuery
}
