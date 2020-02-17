import Handlebars from 'handlebars'

function renderContext(str, context) {
    let template = Handlebars.compile(str)
    return template(context)
}

export {
    renderContext
}

