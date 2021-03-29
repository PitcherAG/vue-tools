function assign(source, target) {
  if (process.env.LOG) {
    console.warn('deprecated')
  }
  for (const a in source) {
    if (Object.prototype.hasOwnProperty.call(target, a)) {
      target[a] = source[a]
    }
  }
}

function assignUsingSourceKeys(target, source) {
  Object.keys(target).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key]
    }
  })
}

export { assign, assignUsingSourceKeys }
