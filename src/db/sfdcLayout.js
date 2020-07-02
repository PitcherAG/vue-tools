import { getLayout } from '../app'
import Vue from 'vue'

const s = {
    id: 'layout',
    state: {}
}

const store = Vue.observable(s)

export const useLayoutStore = () => {
    return store
}

export async function loadLayout(objectName, objectTypeId) {
    const store = useLayoutStore()
    if (store.state[objectTypeId]) {
        return store.state[objectTypeId]
    } else {
        const result = await getLayout(objectName, objectTypeId)
        store.state[objectTypeId] = new Schema(result, objectName)
        return store.state[objectTypeId]
    }
}

export class Schema {
    constructor(obj, objectType) {
        for (const a in obj) {
            this[a] = obj[a]
        }
        this.objectType = objectType
    }
}
