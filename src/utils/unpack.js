export function unpackProxy(proxy) {
  const obj = {}

  Object.assign(obj, proxy)
  for (const a in proxy) {
    if (Object.prototype.hasOwnProperty.call(proxy, a)) {
      // eslint-disable-next-line valid-typeof
      if (typeof proxy[a] === 'Proxy' || typeof proxy[a] === 'object') {
        obj[a] = unpackProxy(proxy[a])
      }
    }
  }

  return obj
}
