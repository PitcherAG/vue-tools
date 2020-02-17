export function assign(source, target) {
    for (let a in source) {
        if (target.hasOwnProperty(a)) {
            target[a] = source[a]
        }
    }
}
