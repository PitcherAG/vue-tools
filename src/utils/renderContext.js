import Handlebars from 'handlebars'

function renderContext(str, context) {
    let template = Handlebars.compile(str)
    return template(context)
}

function renderSimpleContext(str, context) {
    /* renders string in the form {var1} and {var2} */
    const regexp = /{s*([^{]+)s*}/g
    return str.replace(regexp, function(_unused, varName) {
        varName = varName.trim()
        return context[varName] == null ? '' : context[varName]
    })
}
export { renderContext, renderSimpleContext }
