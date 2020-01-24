function removeRoot(path) {
    let splits = path.split('.')
    if (splits.length === 1) {
        return path
    }
    splits.shift()
    path = splits.join('.')
    return path
}

function getPath(obj, path, ignoreRoot = false) {
    if (ignoreRoot) {
        path = removeRoot(path)
    }
    let splits = path.split('.')
    let attr = splits.shift()
    let result = obj[attr]
    if (splits.length === 0) {
        if (typeof result === 'function') {
            return result()
        }
        return result
    } else {
        return getPath(result, splits.join('.'))
    }
}

export default getPath
export {
    removeRoot
}
