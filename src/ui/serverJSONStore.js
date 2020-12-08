import { fireEvent } from '../event'
import { waitForWindowProp, joinPath } from '../utils'
import { createStore } from '../store'
import { reactive, computed } from '@vue/composition-api'
import Vue from 'vue'
import UI_CONSTANTS from '../constants/ui'

class ServerJSONStore {
    id = 'serverJSON'
    loaded = false
    oneTimeLoadPresentations = false
    state = reactive({
        files: [],
        uiFiles: computed(() => this.state.files.filter(file => file.shouldShowInUI)),
        slides: [],
        config: null,
        groups: null,
        appID: null,
        categories: [],
        parentCategories: computed(() =>
            this.state.categories.filter(category => category.parentCategory == UI_CONSTANTS.PARENT_CATEGORY_VALUE)
        ),
        subCategories: computed(() =>
            this.state.categories.filter(category => category.parentCategory != UI_CONSTANTS.PARENT_CATEGORY_VALUE)
        ),
        supportEmail: null,
        deviceName: null,
        metadata: null,
        messages: null,
        appName: null,
        documentPath: null,
        presentations: [],
        customs: [],
        initialAllowedIDs: null,
        allowedIDs: [],
        systemLang: null,
        locale: null,
        userfullname: null,
        ajaxtoken: null,
        isCustomerUI: false,
        batteryLevel: 0,
        statusBadge: '',
        todoBadge: ''
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
            if (!this.loaded) {
                this.loaded = true
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
            file.category == 'images' ||
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
        if (this.oneTimeLoadPresentations) {
            fireEvent('loadPresentationsFromDB', {})
            this.oneTimeLoadPresentations = false
        }
    }

    /*
        When it's all documents
    */
    parseCustomPdf(file) {
        file.ID = file.slideOrder.split(',')[0].split('|')[0]
        file.isCustomPdf = true
        return file
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

    createAppendCustomFile(original, file) {
        const customFile = {}
        Object.assign(customFile, original)
        Object.assign(customFile, file)
        customFile.body = file.presentationName
        this.state.customs.push(customFile)
    }

    /*
        Custom decks are retrived with presentation objects, this adds them to custom list
    */
    addFileAsCustom(file) {
        let original = this.state.files.find(f => f.ID == file.ID)
        if (original) {
            this.createAppendCustomFile(original, file)
        } else {
            const originalSlide = this.state.slides.find(f => f.vSubfolder == file.vSubFolder)
            if (originalSlide) {
                original = this.state.files.find(f => f.ID == originalSlide.ID)
                if (original) {
                    file.ID = original.ID
                    this.createAppendCustomFile(original, file)
                }
            }
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

    /*
        Favorite file Ids are retrieved separately, so files needs to be marked as favorite after that
        isFavorite property is added as an observable
    */
    markFavorites(fileIdMapping) {
        this.state.files.forEach(file => {
            if (typeof file.isFavorite === 'undefined') {
                Vue.set(file, 'isFavorite', fileIdMapping[file.ID] || false)
            } else {
                file.isFavorite = fileIdMapping[file.ID] || false
            }
        })
        return this.state.files
    }

    /*
        Impact tells UIs which files should be shown in UI at a moment
        This filter might be due to now downloaded content(ios), or when call with pre selected is started (all platforms)
    */
    setAllowedIds(fileIds) {
        if (fileIds && fileIds.length > 0 && this.state.initialAllowedIDs == null) {
            this.state.initialAllowedIDs = fileIds
        }
        this.state.allowedIDs = fileIds || []
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

    // for testing
    if (process.env.VUE_APP_TI) {
        window.Ti = JSON.parse(process.env.VUE_APP_TI)
        window.Ti.App.fireEvent = () => true
    }

    ///This is for Android -- Ti is not injected for a very small period of time
    await waitForWindowProp('Ti', timeout)

    ///Event to get serverJSON - can only be called once, otherwise will not return data
    fireEvent('askJSON')

    // for testing
    if (process.env.VUE_APP_SERVERJSON) {
        window.serverJSON = JSON.parse(process.env.VUE_APP_SERVERJSON)
        Object.assign(store.state, window.serverJSON)
        window.documentPath = '/'
    }

    const serverJSON = await waitForWindowProp('serverJSON', timeout)

    if (serverJSON) {
        serverJSON.files = store.extendFiles(serverJSON.files)
        Object.assign(store.state, window.serverJSON)
        store.state.documentPath = window.documentPath
    }

    // for testing
    if (process.env.VUE_APP_PRESENTATIONSOBJECT) {
        window.presentationsObject = JSON.parse(process.env.VUE_APP_PRESENTATIONSOBJECT)
    }

    ///Event to get presentation list, which contains slides from admin & custom presentations
    fireEvent('loadPresentationsFromDB', {})

    const presentationsObject = await waitForWindowProp('presentationsObject', timeout)

    if (presentationsObject) {
        store.parsePresentations(presentationsObject)
    }

    return store
}

export function getExtraFieldValue(property, defaultValue) {
    const store = useServerJSONStore()
    let value = defaultValue
    try {
        if (typeof store.state.config.extraField === 'string') {
            store.state.config.extraField = JSON.parse(store.state.config.extraField)
        }
        if (typeof store.state.config.extraField[property] !== 'undefined') {
            value = store.state.config.extraField[property]
            if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
                value = JSON.parse(value)
            }
        }
    } catch (e) {
        if (process.env.LOG) {
            console.log(e)
        }
    }
    return value
}

window.setMainNav = function(lastViewedCategory) {
    window.lastViewedCategory = lastViewedCategory
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
    window.presentationsObject = presentationsObject
    if (window.presentationsObject) {
        const store = useServerJSONStore()
        store.parsePresentations(window.presentationsObject)
    }
}

window.filterJSON = function(allowedIDsV) {
    const store = useServerJSONStore()
    if (allowedIDsV) {
        store.setAllowedIds(JSON.parse(allowedIDsV))
    } else {
        store.setAllowedIds([])
    }
}

window.getAllowedIDs = function() {
    const store = useServerJSONStore()
    return store.state.allowedIDs
}

window.sentPitcherEvent = function() {}

window.updateStatusBadge = function(value) {
    const store = useServerJSONStore()
    value = parseInt(value)
    store.state.statusBadge = value || ''
}

window.updateTodoBadge = function(value) {
    const store = useServerJSONStore()
    value = parseInt(value)
    store.state.todoBadge = value || ''
}
