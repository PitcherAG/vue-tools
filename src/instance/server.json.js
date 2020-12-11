import { fireEvent } from '../event'
import { waitForWindowProp, assignUsingSourceKeys } from '../utils'
import { useSystemStore, useFilesStore, useCategoriesStore } from './stores/index'

export async function loadServerJSON(timeout = 5) {
    const systemStore = useSystemStore()
    const filesStore = useFilesStore()
    const categoriesStore = useCategoriesStore()

    // for testing
    if (process.env.VUE_APP_TI) {
        window.Ti = JSON.parse(process.env.VUE_APP_TI)
        window.Ti.App.fireEvent = () => true
    }

    // This is for Android -- Ti is not injected for a very small period of time
    await waitForWindowProp('Ti', timeout)

    // Event to get serverJSON - can only be called once, otherwise will not return data
    fireEvent('askJSON')

    // for testing
    if (process.env.VUE_APP_SERVERJSON) {
        window.serverJSON = JSON.parse(process.env.VUE_APP_SERVERJSON)
        window.documentPath = '/'
    }

    const serverJSON = await waitForWindowProp('serverJSON', timeout)

    if (serverJSON) {
        serverJSON.files = filesStore.extendFiles(serverJSON.files)
        filesStore.state.documentPath = window.documentPath
        assignUsingSourceKeys(systemStore.state, window.serverJSON)
        assignUsingSourceKeys(filesStore.state, window.serverJSON)
        assignUsingSourceKeys(categoriesStore.state, window.serverJSON)
    }

    // for testing
    if (process.env.VUE_APP_PRESENTATIONSOBJECT) {
        window.presentationsObject = JSON.parse(process.env.VUE_APP_PRESENTATIONSOBJECT)
    }

    // Event to get presentation list, which contains slides from admin & custom presentations
    fireEvent('loadPresentationsFromDB', {})

    const presentationsObject = await waitForWindowProp('presentationsObject', timeout)

    if (presentationsObject) {
        filesStore.parsePresentations(presentationsObject)
    }
}

window.gotJSON = function(serverJSONV, documentPathV) {
    try {
        window.documentPath = documentPathV
        window.serverJSON = JSON.parse(serverJSONV)
        window.appID = window.serverJSON.appID
    } catch (e) {
        fireEvent('Error', e)
    }
}

window.sentPitcherEvent = function() {}
