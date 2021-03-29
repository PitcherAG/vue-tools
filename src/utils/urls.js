export function getParamsFromUrl(_url) {
  const url = decodeURI(_url)

  if (typeof url === 'string') {
    const params = url.split('?')
    const eachParamsArr = params[1].split('&')
    const obj = {}

    if (eachParamsArr && eachParamsArr.length) {
      eachParamsArr.map((param) => {
        const keyValuePair = param.split('=')
        const key = keyValuePair[0]
        const value = keyValuePair[1]

        obj[key] = value
      })
    }

    return obj
  }

  return null
}
