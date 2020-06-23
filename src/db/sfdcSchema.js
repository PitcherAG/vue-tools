import { createStore } from 'pinia'
import { getSchema } from '../app'
import { Field } from './sfdcField'

export const useSchemaStore = createStore({
    id: 'schema',
    state: () => ({})
})

export async function loadSchema(objectName) {
    const store = useSchemaStore()
    if (store.state[objectName]) {
        return store.state[objectName]
    } else {
        const result = await getSchema(objectName)
        const patch = {}
        patch[objectName] = result
        store.patch(patch)
        return result
    }
}

export async function getField(objectName, field_name) {
    const schema = await loadSchema(objectName)
    for (const field of schema.fields) {
        if (field.name === field_name.trim()) {
            const f = new Field(field, objectName)
            return f
        }
    }
    throw new Error('field not found:' + field_name)
}
