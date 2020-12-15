import { fireEvent } from '../../event'

export function exitApp(options) {
  fireEvent('exitApp', options || {})
}

export function showAlertBox(title, message) {
  fireEvent('showAlertBox', {
    title: title,
    message: message
  })
}
