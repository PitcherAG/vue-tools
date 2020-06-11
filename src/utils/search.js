/**
 * This can be used for property searching in Object Arrays
 * @param {Array} [data]
 * @param {String} [searchFor]
 * @param {Array} [fields]
 * @return {Array}
 *
 * @example
 * ```
 * searchObjectArray(array, 'search keyword', ['objProp1', 'objProp2']);
 * ```
 **/
export const searchObjectArray = (data, searchFor, fields) => {
    // the text should be case insensitive
    const txt = new RegExp(searchFor, 'i')

    // search specified fields
    if (fields && fields.length > 0) {
        return data.filter(item => fields.some(key => item[key].toString().search(txt) >= 0))
    }

    // search all fields if not specified
    return data.filter(item => {
        const found = Object.values(item).filter(val => {
            if (val.toString().search(txt) >= 0) {
                return val
            }
        })
        if (found.length > 0) {
            return found
        }
    })
}