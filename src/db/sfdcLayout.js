import { createStore } from 'pinia'
import { getLayout } from '../app'

export const useLayourStore = createStore({
    id: 'layout',
    state: () => ({})
})

export async function loadLayout(objectName, objectTypeId) {
    const store = useLayourStore()
    if (store.state[objectTypeId]) {
        return store.state[objectTypeId]
    } else {
        const result = await getLayout(objectName, objectTypeId)
        const patch = {}
        patch[objectTypeId] = new Schema(result, objectName)
        store.patch(patch)
        return result
    }
}

export class Schema {
    constructor(obj, objectType) {
        for (let a in obj) {
            this[a] = obj[a]
        }
        const self = this
        this.objectType = objectType
    }
}
