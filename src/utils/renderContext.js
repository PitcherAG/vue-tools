import Handlebars from 'handlebars'

function renderContext(str, context) {
    let template = Handlebars.compile(str)
    return template(context)
}

function renderSimpleContext(str, context) {
    /* renders string in the form {var1} and {var2} */
    return str.replace(new RegExp('{([^{]+)}', 'g'), function(_unused, varName) {
        return context[varName]
    })
}

export { renderContext, renderSimpleContext }
