import { PLATFORM } from './platform'
import { fireEvent } from './event'

function defaultOptions() {
    return { xPos: 50, yPos: 30, widthV: 160, heightV: 50 }
}

export let currentContact = null
export let noContacts = true

export function startStopDetailing(options, target) {
    if (!options) {
        options = defaultOptions()
    }
    switch (PLATFORM) {
        case 'IOS':
            startStopDetailingIOS(options)
            break
        case 'WINDOWS':
            startStopDetailingWindows(options, target)
            break
        case 'ANDROID':
            startStopDetailingAndroid(options)
            break
        default:
            break
    }
}

export function startDetailing(options, target) {
    if (!options) {
        options = defaultOptions()
    }
    switch (PLATFORM) {
        case 'IOS':
            startDetailingIOS(options)
            break
        case 'WINDOWS':
            startDetailingWindows(options, target)
            break
        case 'ANDROID':
            startDetailingAndroid(options, target)
            break
        default:
            break
    }
}

function startDetailingAndroid(options) {
    options.noContacts = noContacts
    fireEvent('startDetailing', options)
}

function startStopDetailingAndroid(options) {
    if (currentContact != null) {
        fireEvent('stopDetailing', options)
    } else {
        options.noContacts = noContacts
        fireEvent('startDetailing', options)
    }
}

function startDetailingIOS(options) {
    options.noContacts = noContacts
    fireEvent('startDetailing', options)
}

function startStopDetailingIOS(options) {
    if (this.currentContact != null) {
        fireEvent('stopDetailing', options)
    } else {
        options.noContacts = noContacts
        fireEvent('startDetailing', options)
    }
}

function startDetailingWindows(options, target) {
    if (target) {
        options.xPos = target.xPos
        options.yPos = target.yPos
        options.widthV = target.widthV
        options.heightV = target.heightV
    }
    options.noContacts = noContacts
    fireEvent('startDetailing', options)
}

function startStopDetailingWindows(options) {
    if (this.currentContact != null) {
        fireEvent('stopDetailing', options)
    } else {
        fireEvent('getCrmEventsForToday', {
            'callBack': 'gotCrmEventsForToday',
            'target': options
        })
    }
}
