import { getSchema } from '../app'
import { Field } from './sfdcField'
import { createStore } from '../store'

class SchemaStore {
    id = 'schema'
    state = {}
}

export const useSchemaStore = () => {
    return createStore(new SchemaStore())
}

export async function loadSchema(objectName) {
    const store = useSchemaStore()
    if (store.state[objectName]) {
        return store.state[objectName]
    } else {
        const result = await getSchema(objectName)
        store.state[objectName] = result
        return store.state[objectName]
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

export async function labelToValue(objectName, fieldName, label) {
    const schema = await loadSchema(objectName)
    for (const field of schema.fields) {
        if (field.name === fieldName.trim()) {
            for (const pick of field.picklistValues) {
                if (pick.label === label) {
                    return pick.value
                }
            }
        }
    }
}
