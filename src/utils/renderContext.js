import { execBool, execReturn } from './contextExec'

function parse(str, context) {
    let result = ifParse(str)(context)
    return interpolate(result)(context)
}

function interpolate(str) {
    return function interpolate(context, regex = /{{([^{}]*)}}/g) {
        return str.replace(regex, (a, b) => {
            return execReturn(b, context)
        })
    }
}

function ifParse(str) {
    return function interpolate(context, regex = /{%\s*if([^{}]*)\s*%}(.*){%\s*endif\s*%}/g) {
        return str.replace(regex, (a, b, c) => {
            if (execBool(b, context)) {
                return c
            }
            return ''
        })
    }
}

function renderContext(str, context) {
    return parse(str, context)
}

function renderSimpleContext(str, context) {
    return interpolate(str)(context, /{([^{}]*)}/g)
}

export { renderContext, renderSimpleContext }
