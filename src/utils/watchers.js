export function watchLocalStorage(name) {
  return new Promise(resolve => {
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

export function waitForWindowProp(prop, _timeout = 5) {
  // _timeout * 10 = seconds -> sec as interval value is 100, which is 1/10 of 1000
  const timeout = _timeout * 10
  // check if prop is sent
  if (!prop || prop === '') {
    throw new Error('No property is sent to watch on window')
  }

  return new Promise(resolve => {
    // if prop doesn't exist, wait until it exist or timeout
    if (typeof window[prop] === 'undefined') {
      let count = 0
      const interval = setInterval(() => {
        count++
        if (typeof window[prop] !== 'undefined' || count === timeout) {
          clearInterval(interval)
          return resolve(window[prop])
        }
      }, 100)
    } else {
      // prop exists, return immediately
      return resolve(window[prop])
    }
  })
}
