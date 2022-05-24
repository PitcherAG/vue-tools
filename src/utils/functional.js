export function getOrElse(getExpression, orElse) {
  try {
    return getExpression()
  } catch (e) {
    if (typeof orElse === 'function') {
      return orElse()
    }

    return orElse
  }
}