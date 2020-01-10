import Handlebars from 'handlebars'
import Config from '../store/config'
import { query as oQuery } from './query'

function contextQuery(query, context, db = null) {
    let template = Handlebars.compile(query)
    let d = Config.getters.tableDict(Config.state)

    for (let a in context) {
        if (context.hasOwnProperty(a)) {
            d[a] = context[a]
        }
    }

    let q = template(d)
    return oQuery(q, db)
}

export {
    contextQuery
}
