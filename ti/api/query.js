import { fireEvent } from './event'
import Handlebars from 'handlebars'
import Config from '../store/config'

let cache = {};
let cacheEnabled = false;
let cacheTimeout = 500;

function cacheQuery (query, result) {
    cache[query] = {
        result: result,
        time: Date.now()
    }
}

function clearCache () {
    cache = {}
}

function hasCached (query) {
    return cacheEnabled
        && !query.toLowerCase().includes('delete')
        && !query.toLowerCase().includes('insert')
        && cache.hasOwnProperty(query)
        && cache[query].time + cacheTimeout > Date.now()
}

function query (query, db = 'pitcher') {
    return new Promise((resolve, reject) => {
        if (hasCached(query)) {
            return resolve(cache[query].result)
        }
        fireEvent('dbFunction', {
            db: 'pitcher',
            pType: 'query',
            query: query,
        }).then(function (e) {
            let result = []
            if (e.error) {
                reject(new Error(e.error))
            }
            for (let i = 0; i < e.results.length; i++) {
                let res = e.results[i]
                let obj = {}

                for (let j = 0; j < e.columns.length; j++) {
                    let column = e.columns[j]

                    if (column === 'extraField') {
                        let o = JSON.parse(res[j])

                        for (let n in o) {
                            if (o.hasOwnProperty(n)) {
                                obj[n] = o[n]
                            }
                        }
                    } else {
                        if (typeof res[j] == 'undefined') {
                            obj[column] = null
                        } else {
                            obj[column] = res[j]
                        }
                    }
                }
                result.push(obj)
            }
            if (cacheEnabled) {
                cacheQuery(query, result)
            }
            resolve(result)
        }).catch(reject)
    })
}

function contextQuery (query, context) {
    let template = Handlebars.compile(query)
    let d = Config.getters.tableDict(Config.state)
    console.log(template(d))
}

export {
    cacheEnabled,
    cacheTimeout,
    clearCache,
    query,
    contextQuery
}
