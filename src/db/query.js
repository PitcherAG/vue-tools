import { fireEvent } from '../event'

let cache = {}
let cacheEnabled = false
let cacheTimeout = 500
let defaultDatabase = 'pitcher'

function cacheQuery(query, result) {
    cache[query] = {
        result: result,
        time: Date.now()
    }
}

function clearCache() {
    cache = {}
}

function hasCached(query) {
    return (
        cacheEnabled &&
        !query.toLowerCase().includes('delete') &&
        !query.toLowerCase().includes('insert') &&
        cache.hasOwnProperty(query) &&
        cache[query].time + cacheTimeout > Date.now()
    )
}

function query(query, db = null) {
    return new Promise((resolve, reject) => {
        if (hasCached(query) && cacheEnabled) {
            console.log('cache hit')
            return resolve(cache[query].result)
        }

        fireEvent('dbFunction', {
            db: db ? db : defaultDatabase,
            iosMode: true,
            pType: 'query',
            query: query
        })
            .then(function(e) {
                let result = []
                if (e.error) {
                    reject(new Error(e.error))
                }
                for (let i = 0; i < e.results.length; i++) {
                    let res = e.results[i]
                    let obj = {}

                    for (let j = 0; j < e.columns.length; j++) {
                        let column = e.columns[j]

                        if (
                            column === 'extraField' ||
                            column === 'account' ||
                            column === 'eventJSON' ||
                            column === 'contact' ||
                            column === 'Json' ||
                            column === 'user'
                        ) {
                            let o = JSON.parse(res[j])
                            for (let n in o) {
                                if (o.hasOwnProperty(n) && n !== 'attributes') {
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
            })
            .catch(reject)
    })
}

export { cacheEnabled, cacheTimeout, clearCache, defaultDatabase, query }
