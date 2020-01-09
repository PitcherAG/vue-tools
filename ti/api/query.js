import {fireEvent} from "./event";

let cache = {};

function clearDBCache() {
    cache = {}
}

export let cacheTimeout = 500;
export let enableDBCache = true;

export function query(query, db = 'pitcher') {
    return new Promise((resolve, reject) => {
        if (enableDBCache
            && !query.toLowerCase().includes('delete')
            && !query.toLowerCase().includes('insert')) {

            if (cache[query]) {
                if (cache[query].time + cacheTimeout > Date.now()) {
                    resolve(cache[query].result);
                    return
                }
            }
        } else {
            cache = {}
        }

        fireEvent('dbFunction', {
            db: 'pitcher',
            pType: 'query',
            query: query,
        }).then(function (e) {
            let result = [];

            if (e.error) {
                reject(new Error(e.error))
            }

            for (let i = 0; i < e.results.length; i++) {
                let res = e.results[i];
                let obj = {};

                for (let j = 0; j < e.columns.length; j++) {
                    let column = e.columns[j];

                    if (column === 'extraField') {
                        let o = JSON.parse(res[j])
                        for (let n in o) {
                            if (o.hasOwnProperty(n)) {
                                obj[n] = o[n];
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
            cache[query] = {result: result, time: Date.now()};
            resolve(result)
        }).catch(reject)
    })
}
