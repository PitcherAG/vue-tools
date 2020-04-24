import { watchLocalStorage } from './localeStorageWatcher'
import { eventHub } from './eventHub'

window.localStorage.setItem('reloadConsole', 'false')

export function refreshWatcher(timeout) {
    watchLocalStorage('reloadConsole').then((r) => {
        window.console.log('change detected... refresh')
        setTimeout(() => {
            eventHub.$emit('refresh')
        }, timeout)
        window.localStorage.setItem('reloadConsole', 'false')
        refreshWatcher(timeout)
    })
}
