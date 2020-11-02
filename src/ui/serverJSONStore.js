import { fireEvent } from '../event'
import { waitForWindowProp, joinPath } from '../utils'
import { createStore } from '../store'
import { reactive } from '@vue/composition-api'
import Vue from 'vue'
import UI_CONSTANTS from '../constants/ui'

class ServerJSONStore {
    id = 'serverJSON'
    loaded = false
    oneTimeLoadPresentations = false
    state = reactive({
        files: [],
        slides: [],
        config: null,
        groups: null,
        appID: null,
        categories: [],
        supportEmail: null,
        deviceName: null,
        metadata: null,
        messages: null,
        appName: null,
        documentPath: null,
        presentations: [],
        customs: [],
        category: {},
        allowedIDs: [],
        systemLang: null,
        locale: null,
        userfullname: null,
        ajaxtoken: null,
        isCustomerUI: false
    })

    /*
        This method is called when category is changed
    */
    setMainNav(category) {
        if (category) {
            window.lastViewedCategory = category
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(`${this.state.appID}.mainNavItem`, category.ID)
            }
            fireEvent('setCategory', { category: JSON.stringify(category) })
            this.state.category = category
            if (this.firstLoad) {
                this.firstLoad = false
                fireEvent('uiReady')
            }
        }
    }

    /*
        Checks start datetime & end datetime of the distribution of file
    */
    isFileExpiredOrNotReady(now, startDate, endDate) {
        if (typeof startDate === 'undefined' || typeof endDate === 'undefined') return false
        if (startDate == null || endDate == null) return false
        if (startDate == 0 || endDate == 0) return false
        return startDate > now || endDate < now
    }

    /**
        Decides if:
    *       file is a valid content
    *       is not hidden from UI (e.g postcall)
    *       is not expired or ready to show
    */
    shouldShowInUI(now, file) {
        if (
            file.ID[0] == 'T' ||
            file.typeV == 7 ||
            file.typeV == -1 ||
            file.typeV == 0 ||
            this.isFileExpiredOrNotReady(now, file.startDate, file.endDate)
        ) {
            return false
        }
        return true
    }

    /*
        Add extension to files, like if file should be shown in (whether it's ready or not)
        or adds thumbnail property
    */
    extendFiles(files) {
        const now = new Date().getTime() / 1000
        files.forEach(file => {
            file.shouldShowInUI = this.shouldShowInUI(now, file)
            file.thumbnailUrl = joinPath(window.documentPath, file.thumb)
        })
        return files
    }

    /*
        When presentations are retrieved, validates arguments and created presentations
    */
    parsePresentations(files) {
        this.state.customs = []
        this.state.presentations = []
        files.forEach(file => this.parseSinglePresentation(file))
        if (this.askPresentationOneTime) {
            fireEvent('loadPresentationsFromDB', {})
            this.askPresentationOneTime = false
        }
    }

    /*
        Single presentation object parse
    */
    parseSinglePresentation(file) {
        try {
            if (file.isCustom != UI_CONSTANTS.IGNORE_CUSTOM_TYPE) {
                if (typeof file.ID === 'undefined' || file.ID == null) {
                    file = this.parseCustomPdf(file)
                }
                if (file.vSubFolder == null) {
                    file.containsMultiple = true
                    file.vSubFolder = file.slideOrder.split(',')[0].split('|')[0]
                    file.ID = file.slideOrder.split(',')[0].split('|')[0]
                    if (file.vSubFolder.indexOf('_') == -1) {
                        file.isCustomPdf = true
                    } else {
                        file.ID = '' + parseInt(file.ID)
                    }
                }
                file.ID = '' + file.ID
                file.isCustom ? this.addFileAsCustom(file) : this.mergePresentation(file)
            }
            return true
        } catch (e) {
            fireEvent('Error', e)
        }
        return false
    }

    /*
        Custom decks are retrived with presentation objects, this adds them to custom list
    */
    addFileAsCustom(file) {
        const original = this.state.files.find(f => f.ID == file.ID)
        if (original) {
            const customFile = {}
            Object.assign(customFile, original)
            Object.assign(customFile, file)
            customFile.body = file.presentationName
            this.state.customs.push(customFile)
        }
    }

    /*
        Extends presentation object with original file attributes
    */
    mergePresentation(file) {
        this.state.presentations.push(file)
        const original = this.state.files.find(f => f.ID == file.ID)
        if (original) {
            Object.assign(original, file)
        }
    }
}

export const useServerJSONStore = () => {
    return createStore(new ServerJSONStore())
}

export function useServerJSON() {
    return useServerJSONStore().state
}

export async function loadServerJSON(timeout = 5) {
    const store = useServerJSONStore()

    ///This is for Android -- Ti is not injected for s very small period of time
    await waitForWindowProp('Ti', timeout)

    ///Event to get serverJSON - can only be called once, otherwise will not return data
    fireEvent('askJSON')

    const serverJSON = await waitForWindowProp('serverJSON', timeout)

    ///Event to get presentation list, which contains slides from admin & custom presentations
    fireEvent('loadPresentationsFromDB', {})

    const presentationsObject = await waitForWindowProp('presentationsObject', timeout)

    if (serverJSON) {
        serverJSON.files = store.extendFiles(serverJSON.files)
        Object.assign(store.state, window.serverJSON)
        store.state.documentPath = window.documentPath
    }
    if (presentationsObject) {
        store.parsePresentations(presentationsObject)
    }

    return store
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

window.loadPresentations = function(presentationsObject) {
    if (typeof presentationsObject === 'string') {
        presentationsObject = JSON.parse(presentationsObject)
    }
    if (window.presentationsObject) {
        const store = useServerJSONStore()
        store.parsePresentations(window.presentationsObject)
    }
    window.presentationsObject = presentationsObject
}
