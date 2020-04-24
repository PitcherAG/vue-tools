export function unpackProxy(proxy) {
    const obj = {}
    Object.assign(obj, proxy)
    for (let a in proxy) {
        if (proxy.hasOwnProperty(a)) {
            // eslint-disable-next-line valid-typeof
            if (typeof proxy[a] == 'Proxy' || typeof proxy[a] == 'object') {
                obj[a] = unpackProxy(proxy[a])
            }
        }
    }
    return obj
}
