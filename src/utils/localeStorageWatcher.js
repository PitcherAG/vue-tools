export function watchLocalStorage(name) {
    return new Promise((resolve) => {
        const storage = window.localStorage
        const oldValue = storage.getItem(name)

        function waitForReload() {
            setTimeout(() => {
                if (storage.getItem(name) != oldValue) {
                    resolve(storage.getItem(name))
                    return
                }
                waitForReload()
            }, 1000)
        }
        waitForReload()
    })
}
