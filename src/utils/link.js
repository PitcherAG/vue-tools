import { renderContext } from './renderContext'
import { trimChar } from './trim'
import { launchFileWithID, launchFileWithKeyword } from '../app'
import { PLATFORM } from '../platform'


export function openLink(link, context) {
    /*
     context = {a:434}
     link format: pitcher://keyword/?param1=2&param2=434
     link format: pitcher://fileid/?param1=2&param2={{ a }}
     */
    link = renderContext(link, context)
    const url = new URL(link)
    try {

    }catch(e){
        console.error(link)
        throw e
    }
    let params = trimChar(url.search, '/', false)
    params = trimChar(params, '?', false)
    params = JSON.parse('{"' + decodeURI(params.replace(/&/g, '","').replace(/=/g, '":"')) + '"}')
    for(const a in params){
        window.localStorage[a] = params[a]
    }

    if (url.protocol === 'pitcher:') {
        let filename
        if(PLATFORM==='ANDROID') {
            filename = trimChar(url.pathname, '/')
        }else{
            filename = url.hostname
        }
        if (isNaN(filename)) {
            const p = launchFileWithKeyword(filename, params)
        } else {
            launchFileWithID(filename)
        }
    }
}
