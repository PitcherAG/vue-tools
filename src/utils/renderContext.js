import { execReturn } from './contextExec'

function interpolate(str) {
    return function interpolate(context, regex = /{{([^{}]*)}}/g) {
        return str.replace(regex, function(a, b) {
            return execReturn(b, context)
        })
    }
}

function renderContext(str, context) {
    return interpolate(str)(context)
}

function renderSimpleContext(str, context) {
    return interpolate(str)(context, /{([^{}]*)}/g)
}

export { renderContext, renderSimpleContext }
