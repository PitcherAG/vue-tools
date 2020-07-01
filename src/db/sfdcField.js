import { useConfigStore } from '../config'
import { query } from './query'
import { execBool } from '../utils/contextExec'
import { PLATFORM } from '../platform'

export class Field {
    constructor(obj, objectType, load = true) {
        this.referenceTo = []
        this.references = []
        Object.assign(this, obj)
        const self = this
        this.parentObjectType = objectType

        this.required = !obj.nillable || obj.nameField
        this.valid = function(value) {
            if ((self.type === 'boolean' && value === true) || value === false) {
                return true
            }
            if (!value && self.required) {
                return false
            }
            return true
        }
        this.errors = []
        if (load) {
            this.load_refs()
        }
    }

    load_refs() {
        const store = useConfigStore()
        if (this.referenceTo.length) {
            const sourceTable = store.getCacheDict.value[this.parentObjectType]
            for (const reference of this.referenceTo) {
                const targetTable = store.getCacheDict.value[reference]
                if (!targetTable) {
                    window.console.warn('referenced object not found: ' + reference)
                    return
                }
                this.load(targetTable, sourceTable, reference)
            }
        }
    }

    async load(targetTable, sourceTable, reference) {
        let filters = null
        if (sourceTable && sourceTable.filters) {
            filters = sourceTable.filters[this.name]
        }
        const table_name = targetTable.tableToCache
        let q = 'select Id, '
        let nameField = 'Name'
        if (targetTable.fieldTypes && targetTable.fieldTypes['Name']) {
            q += 'Name'
        } else if (reference === 'Account') {
            if (PLATFORM === 'ANDROID') {
                q += 'account_name'
                nameField = 'account_name'
            } else {
                q += 'accountName'
                nameField = 'accountName'
            }
        } else if (reference === 'Contact') {
            q += 'name'
            nameField = 'name'
        } else if (reference === 'User') {
            q += 'name'
            nameField = 'name'
        } else if (targetTable.fieldTypes['extraField']) {
            q += 'extraField'
        } else {
            alert('no name field found in table for ' + reference)
        }
        q += ' from ' + table_name
        const data = await query(q)
        const result = []
        for (const obj of data) {
            if (filters) {
                const pass = execBool(filters, obj)
                if (!pass) {
                    continue
                }
            }
            result.push({ value: obj.Id, text: obj[nameField] })
        }
        this.references = this.references.concat(result)
    }

    loadExternalReferences(data, nameField = 'Name') {
        const result = []
        for (const obj of data) {
            result.push({ value: obj.Id, text: obj[nameField] })
        }
        this.references = result
    }
}
