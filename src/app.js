import { fireEvent } from './event'

export function closeModal() {
    fireEvent('closeOpenModal')
}

export function resyncData() {
    fireEvent('resyncData')
}

export function planCall() {
    fireEvent('planCall')
}

export function startCall() {
    fireEvent('startCall')
}

export function startPrecall() {
    fireEvent('startPrecall')
}

export function saveObject(obj) {
    if (obj.Id) {
        fireEvent('sendStatsFromHTML', {
            event_name: 'event_redirect_updateSFDC',
            event_params: obj
        })
    } else {
        fireEvent('sendStatsFromHTML', {
            event_name: 'event_redirect_createSFDC',
            event_params: obj
        })
    }
}

export function getSchema(objectName) {
    const desc = objectName + '_desc'
    return fireEvent('getFromHTML', { id: desc, 'useSFDCDB': true })
}
