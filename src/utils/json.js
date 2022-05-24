import { getOrElse } from './functional'

export const isStringifiedTruthy = (value) => {
  return getOrElse(
    () => Boolean(typeof value === 'string' ? JSON.parse(value) : Boolean(value)),
    () => ['True', 'TRUE'].includes(value)
  )
}
