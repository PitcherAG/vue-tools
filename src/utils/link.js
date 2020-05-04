import { renderContext } from './renderContext'
import { launchContentWithID, launchFileWithKeyword } from '../app'

export async function openLink(link, context) {
    /*
     context = {a:434}
     link format: pitcher://keyword/?param1=2&param2=434
     link format: pitcher://fileid/?param1=2&param2={{ a }}
     */
    link = renderContext(link, context)
    window.console.info('open link', link)
    link = link.split('pitcher://').join('')
    let id
    if (link.split('/').length === 2) {
        id = link.split('/')[0]
    } else if (link.split('?').length === 2) {
        id = link.split('?')[0]
    } else {
        id = link
    }
    let args = link.split('?')[1]
    const params = {}
    if (args.length) {
        args = decodeURI(args).split('&')
        for (const arg of args) {
            const splits = arg.split('=')
            params[splits[0]] = splits[1]
        }
    }
    for (const a in params) {
        window.localStorage[a] = params[a]
    }

    if (isNaN(Number(id))) {
        await launchFileWithKeyword(id, params)
    } else {
        await launchContentWithID(id, params)
    }
}
