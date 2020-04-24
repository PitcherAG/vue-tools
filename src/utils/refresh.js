import { watchLocalStorage } from './localeStorageWatcher'
import { eventHub } from './eventHub'

window.localStorage.setItem('reloadConsole', 'false')

export function refreshWatcher() {
    watchLocalStorage('reloadConsole').then(r => {
        window.console.log('change detected... refresh')
        eventHub.$emit('refresh')
        window.localStorage.setItem('reloadConsole', 'false')
        refreshWatcher()
    })
}
