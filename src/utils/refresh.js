import { watchLocalStorage } from './watchers'
import { eventHub } from './eventHub'

try {
    window.localStorage.setItem('reloadConsole', 'false')
} catch (e) {
    console.log(e)
}

export function refreshWatcher(timeout) {
  watchLocalStorage('reloadConsole').then(() => {
    window.console.log('change detected... refresh')
    setTimeout(() => {
      eventHub.$emit('refresh')
    }, timeout)
    window.localStorage.setItem('reloadConsole', 'false')
    refreshWatcher(timeout)
  })
}
