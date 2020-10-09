export function assign(source, target) {
    console.warn('deprecated')
    for (const a in source) {
        if (Object.prototype.hasOwnProperty.call(target, a)) {
            target[a] = source[a]
        }
    }
}
