import { getSchema } from '../app'
import { Field } from './sfdcField'

import Vue from 'vue'

const s = {
    id: 'schema',
    state: {}
}

const store = Vue.observable(s)

export const useSchemaStore = () => {
    return store
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

export async function labelToValue(objectName, fieldName, label){
    const schema = await loadSchema(objectName)
    for (const field of schema.fields) {
        if (field.name === fieldName.trim()) {
            debugger
        }
    }
}
