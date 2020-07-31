import orderBy from 'lodash/orderBy'

export function mapper(key, obj) {
    if (!key) {
        return null
    }

    // map dotted objects
    if (key.includes('.')) {
        return key.split('.').reduce((o, i) => o[i], obj)
    }
    // map simple key
    return obj[key]
}

export function sortBy(data, fields, by, order) {
    const field = fields.find(f => f.dataField === by)
    if (!field) {
        return data
    }

    if (typeof field.sortType === 'undefined' || field.sortType === 'string') {
        // sortType: string or sortType: undefined
        return orderBy(data, [by], [order])
    } else if (field.sortType === 'number') {
        // sortType: number
        return orderBy(
            data,
            item => {
                const val = mapper(field.dataField, item) === '' ? -1 : mapper(field.dataField, item)
                return Number(val)
            },
            [order]
        )
    } else if (field.sortType === 'date') {
        // sortType: date
        return orderBy(
            data,
            item => {
                const val = mapper(field.dataField, item)
                if (!val) {
                    return ''
                }
                return new Date(val.split('+')[0])
            },
            [order]
        )
    }

    return orderBy(data, [by], [order])
}