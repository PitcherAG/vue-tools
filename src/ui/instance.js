import { fireEvent } from '../event'
import { waitForWindowProp, showInUI } from '../utils'
import { createStore } from '../store'
import { reactive, computed } from '@vue/composition-api'

const UI_CONSTANTS = {
    IGNORE_CUSTOM_TYPE: 2,
    PARENT_CATEGORY_VALUE: '0'
}

class InstanceStore {
    id = 'instance'
    firstLoad = true
    state = reactive({
        files: [],
        slides: null,
        config: null,
        groups: null,
        appID: null,
        categories: null,
        supportEmail: null,
        deviceName: null,
        metadata: null,
        messages: null,
        appName: null,
        documentPath: null,
        presentations: [],
        customs: [],
        currentCategory: null,
        currentAccount: null,
        currentContact: null,
        filterIsOn: false
    })

    inACall = computed(() => this.state.currentContact != null)

    setCategory(category) {
        fireEvent('setCategory', category)
    }

    setMainNav(mainNavID) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`${this.state.appID}.mainNavItem`, mainNavID)
        }
        if (this.state.currentCategory) {
            this.setCategory(this.state.currentCategory)
        }
        if (this.firstLoad) {
            this.firstLoad = false
            fireEvent('uiReady')
        }
    }

    getLastCategory() {
        const categoryId = this.getMainNavID()
        return categoryId && this.state.categories ? this.state.categories.find(c => c.ID == categoryId) : null
    }

    getMainNavID() {
        return typeof localStorage !== 'undefined' ? localStorage.getItem(`${this.state.appID}.mainNavItem`) : null
    }

    getInitialCategory() {
        if (this.state.categories) {
            return (
                this.state.categories.find(c => c.isDefault) ||
                this.state.categories.find(c => c.parentCategory == UI_CONSTANTS.PARENT_CATEGORY_VALUE)
            )
        }
        return null
    }

    setCurrentContact(newContact, newAccount) {
        const isAdding = this.state.currentContact != null
        try {
            this.state.currentContact = JSON.tryParse(newContact)
            this.state.currentAccount = JSON.tryParse(newAccount)
        } catch (e) {
            ///TODO Error logging
        }
        this.filterIsOn = !isAdding && this.state.currentContact != null
    }

    showUI() {
        if (this.state.categories) {
            const initialCategory = (!this.firstLoad && this.getLastCategory()) || this.getInitialCategory()
            if (initialCategory) {
                this.state.currentCategory = initialCategory
                this.setMainNav(initialCategory.ID)
            }
        } else {
            fireEvent('uiReady')
        }
    }

    parseCustomPdf(file) {
        file.ID = file.slideOrder.split(',')[0].split('|')[0]
        file.isCustomPdf = true
        return file
    }

    parsePresentation(file) {
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
                file.isCustom ? this.state.customs.push(file) : this.state.presentations.push(file)
            }
            return true
        } catch (e) {
            ///TODO Error logging
        }
        return false
    }
}

export const useServerJSONStore = () => {
    return createStore(new InstanceStore())
}

export async function loadServerJSON(timeout = 5) {
    const store = useServerJSONStore()

    fireEvent('askJSON')

    const serverJSON = await waitForWindowProp('serverJSON', timeout)

    fireEvent('loadPresentationsFromDB', {})

    const presentationsObject = await waitForWindowProp('presentationsObject', timeout)

    if (serverJSON) {
        const now = new Date().getTime() / 1000
        serverJSON.files.forEach(f => {
            f.showFile = showInUI(now, f)
            f.thumbnailUrl = `${window.documentPath}${f.thumb}`
        })
        Object.assign(store.state, window.serverJSON)
        store.state.documentPath = window.documentPath
        if (presentationsObject) {
            presentationsObject.forEach(p => store.parsePresentation(p))
        }
    }

    store.showUI()

    return store.state
}

window.gotJSON = function(serverJSONV, documentPathV) {
    try {
        window.documentPath = documentPathV
        window.serverJSON = JSON.parse(serverJSONV)
    } catch (e) {
        fireEvent('Error', e)
    }
}

window.setMainNav = function(mainNavID) {
    const store = useServerJSONStore()
    store.setMainNav(mainNavID)
}

window.loadPresentations = function(presentationsObject) {
    if (typeof presentationsObject === 'string') {
        presentationsObject = JSON.parse(presentationsObject)
    }
    window.presentationsObject = presentationsObject
}

window.getMainNavID = function() {
    const store = useServerJSONStore()
    return store.getMainNavID()
}

window.filterJSON = function() {}
