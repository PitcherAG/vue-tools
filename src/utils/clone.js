function clone(obj) {
    if (null == obj || 'object' != typeof obj) return obj
    const copy = obj.constructor()
    for (const attr in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, attr)) {
            copy[attr] = obj[attr]
        }
    }
    return copy
}

export { clone }
