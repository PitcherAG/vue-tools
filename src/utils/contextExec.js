export function execBool(func, context) {
    try {
        const ref = new Function('with(this){\nreturn Boolean(' + func + ')\n}')
        return ref.apply(context)
    } catch (e) {
        window.console.error('with(this){\nreturn Boolean(' + func + ')\n}')
        window.console.error(e)
        window.console.error(context)
    }
}

export function execString(func, context) {
    try {
        const ref = new Function('with(this){\nreturn String(' + func + ')\n}')
        return ref.apply(context)
    } catch (e) {
        window.console.error('with(this){\nreturn String(' + func + ')\n}')
        window.console.error(e)
        window.console.error(context)
    }
}


