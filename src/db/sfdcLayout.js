import { createStore } from '../store'
import { getLayout } from '../app'

class LayoutStore {
  id = 'layout'
  state = {}
}

export const useLayoutStore = () => {
  return createStore(new LayoutStore())
}

export async function loadLayout(objectName, objectTypeId) {
  const key = `${objectName}_${objectTypeId}`
  const store = useLayoutStore()

  if (store.state[key]) {
    return store.state[key]
  } else {
    const result = await getLayout(objectName, objectTypeId)

    store.state[key] = new Schema(result, objectName)

    return store.state[key]
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
