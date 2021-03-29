export function execBool(func, context, printOnError) {
  try {
    const ref = new Function(`with(this){\nreturn Boolean(${func})\n}`)

    return ref.apply(context)
  } catch (e) {
    if (printOnError) return func
    window.console.error(`with(this){\nreturn Boolean(${func})\n}`)
    window.console.error(e)
    window.console.error(context)
  }
}

export function execString(func, context, printOnError) {
  try {
    const ref = new Function(`with(this){\nreturn String(${func})\n}`)

    return ref.apply(context)
  } catch (e) {
    if (printOnError) return func
    window.console.error(`with(this){\nreturn String(${func})\n}`)
    window.console.error(e)
    window.console.error(context)
  }
}

export function execContext(func, context, printOnError) {
  try {
    const ref = new Function(`with(this){\n${func}\n}`)

    return ref.apply(context)
  } catch (e) {
    if (printOnError) return func
    window.console.error(`with(this){\n${func}\n}`)
    window.console.error(e)
    window.console.error(context)
  }
}

export function execReturn(func, context, printOnError) {
  try {
    const ref = new Function(`with(this){\nreturn ${func}\n}`)

    return ref.apply(context)
  } catch (e) {
    if (printOnError) return func
    window.console.error(`with(this){\n${func}\n}`)
    window.console.error(e)
    window.console.error(context)
  }
}
