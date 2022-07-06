import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import { renderContext } from '../../utils'

export function mapper(key, obj) {
  if (!key) {
    return null
  }
  // map template
  if (key.includes('{{')) {
    return renderContext(key, obj)
  }
  // map dotted objects
  else if (key.includes('.')) {
    return key.split('.').reduce((o, i) => o[i], obj)
  }

  // map simple key
  return obj[key]
}

export function sortBy(data, fields, by, order, sortModifiers) {
  const field = fields.find((f) => f.dataField === by)

  if (!field) {
    return data
  }

  const sortModifier = sortModifiers && sortModifiers[by]

  if (typeof field.sortType === 'undefined' || field.sortType === 'string') {
    // sortType: string or sortType: undefined
    return orderBy(data, sortModifier ? [(item) => sortModifier(get(item, by))] : [by], [order])
  } else if (field.sortType === 'number') {
    // sortType: number
    return orderBy(
      data,
      (item) => {
        if (sortModifier) return sortModifier(item)
        const val = mapper(field.dataField, item) === '' ? -1 : mapper(field.dataField, item)

        return Number(val)
      },
      [order]
    )
  } else if (field.sortType === 'date') {
    // sortType: date
    return orderBy(
      data,
      (item) => {
        if (sortModifier) return sortModifier(item)
        const val = mapper(field.dataField, item)

        if (!val) {
          return ''
        }

        return new Date(val.split('+')[0])
      },
      [order]
    )
  }

  return orderBy(data, sortModifier ? [(item) => sortModifier(get(item, by))] : [by], [order])
}
