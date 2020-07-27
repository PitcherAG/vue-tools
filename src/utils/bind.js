export function arrowBind(context, fn) {
    let arrowFn
    ;(function() {
        arrowFn = eval(fn.toString())
        arrowFn()
    }.call(context))
}

export function isArrowFn(f) {
    return typeof f === 'function' && /^([^{=]+|\(.*\)\s*)?=>/.test(f.toString().replace(/\s/, ''))
}
