import Fuse from 'fuse.js'

/**
 * fuse.js search
 * @param {Array} [data]
 * @param {Array} [options]
 * @return {Array}
 *
 * @example
 * ```
 * const fuse = fuseSearch(dataArray, searchFor, ['objProp', 'objProp.nested'], fuseOptions)
 * fuse.search('search keyword')
 * ```
 **/

export const search = (data, searchFor, fields = [], options = { threshold: 0 }, returnFull = false) => {
    const fuse = new Fuse(data, { keys: fields, ...options })

    const result = fuse.search(searchFor)

    if (returnFull) {
        return result
    }

    return result.map(i => i.item && i.item)
}
