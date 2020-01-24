import { fireEvent } from './db/event'

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
    console.log('start precall')
    fireEvent('startPrecall')
}
