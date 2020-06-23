export function assign(source, target) {
    for (const a in source) {
        if (target.hasOwnProperty(a)) {
            target[a] = source[a]
        }
    }
}
