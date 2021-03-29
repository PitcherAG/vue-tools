export function getAttr(obj, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  const a = path.split('.')

  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]

    if (k in obj) {
      obj = obj[k]
    } else {
      return
    }
  }

  return obj
}
