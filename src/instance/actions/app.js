import { fireEvent } from '../../event'

export function exitApp() {
    fireEvent('exitApp', {})
}

export function showAlertBox(title, message) {
    fireEvent('showAlertBox', {
        title: title,
        message: message
    })
}
