import { fireEvent } from '../event'

let cache = {}
const cacheEnabled = false
const cacheTimeout = 500
const defaultDatabase = 'pitcher'

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
        Object.prototype.hasOwnProperty.call(cache, query) &&
        cache[query].time + cacheTimeout > Date.now()
    )
}

async function query(query, db = null) {
    console.log(query)
    return new Promise((resolve, reject) => {
        if (hasCached(query) && cacheEnabled) {
            console.log('cache hit')
            return resolve(cache[query].result)
        }
        const start = new Date()
        fireEvent('dbFunction', {
            db: db ? db : defaultDatabase,
            iosMode: true,
            pType: 'query',
            query: query
        })
            .then(e => {
                const time = new Date() - start
                if (time > 1000) {
                    console.warn('slow query (' + (time / 1000).toFixed(2) + 's): ' + query)
                }
                const result = []
                if (e.error) {
                    console.error(query)
                    reject(new Error(e.error))
                }
                for (let i = 0; i < e.results.length; i++) {
                    const res = e.results[i]
                    const obj = {}

                    for (let j = 0; j < e.columns.length; j++) {
                        const column = e.columns[j]

                        if (
                            column === 'extraField' ||
                            column === 'account' ||
                            column === 'eventJSON' ||
                            column === 'contact' ||
                            column === 'Json' ||
                            column === 'user'
                        ) {
                            const o = JSON.parse(res[j])
                            for (const n in o) {
                                if (Object.prototype.hasOwnProperty.call(o, n) && n !== 'attributes') {
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
