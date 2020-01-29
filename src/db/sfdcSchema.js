import { createStore } from 'pinia'
import { getSchema } from '../app'
import { ref } from '@vue/composition-api'
import { useConfigStore } from '../config'
import { query } from './query'
import { execBool } from '../utils/contextExec'



export const useSchemaStore = createStore({
    id: 'schema',
    state: () => ({})
})

export async function loadSchema(objectName) {
    const store = useSchemaStore()
    if (store.state[objectName]) {
        return objectName
    } else {
        const result = await getSchema(objectName)
        console.warn(result)
        const patch = { objectName: result }
        store.patch(patch)
        return result
    }
}


export class Field {
    referenceTo = []

    constructor(obj, objectType) {
        for (let a in obj) {
            this[a] = obj[a]
        }
        this.parentObjectType = objectType
        this.references = ref([])
        this.required = !obj.nillable
        this.answer = ref(null)
        this.load_refs()
    }

    async load_refs() {
        const store = useConfigStore()
        if (this.referenceTo.length) {
            const targetTable = store.getCacheDict.value[this.referenceTo[0]]
            const sourceTable = store.getCacheDict.value[this.parentObjectType]
            if (!targetTable) {
                throw new Error('referenced object not found: ' + this.referenceTo[0])
            }
            let filters = null
            if (sourceTable.filters) {
                filters = sourceTable.filters[this.name]
            }
            const table_name = targetTable.tableToCache
            let q = 'select Id,'
            if (targetTable.fieldTypes['Name']) {
                q += 'Name'
            } else {
                if (this.referenceTo[0] == 'Account') {
                    q += 'account'
                } else if (targetTable.fieldTypes['extraField']) {
                    q += 'extraField'
                }
            }
            q += ' from ' + table_name

            const data = await query(q)
            let result = []
            for (const obj of data) {
                if (filters) {
                    const pass = execBool(filters, obj)
                    if (!pass) {
                        continue
                    }
                }
                result.push({ value: obj.Id, text: obj.Name })
            }
            this.references.value = result
        }
    }
}
