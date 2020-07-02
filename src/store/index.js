import Vue from 'vue'

const stores = {}

function transform(obj) {
    for (const prop in obj) {
        if (typeof obj[prop] === 'function') {
            obj[prop] = obj[prop].bind(obj)
        }
    }

    stores[obj.id] = Vue.observable(obj)
}

export function createStore(obj) {
    if (!obj.id) {
        throw 'store needs an id attribute'
    }
    if (stores && stores[obj.id]) {
        return stores[obj.id]
    }

    transform(obj)

    if (stores[obj.id]) {
        return stores[obj.id]
    }
}
