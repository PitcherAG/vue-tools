import Vue from 'vue'
import { computed, watch, reactive, watchEffect } from '@vue/composition-api'
import { arrowBind, isArrowFn } from '../utils/bind'
const stores = {}

function transform(obj) {
    const prototype = Object.getPrototypeOf(obj)
    const descriptors = Object.getOwnPropertyDescriptors(prototype)
    obj = Vue.observable(obj)
    for (const prop in obj) {
        if (typeof obj[prop] === 'function' && prototype.constructor.name === 'Object') {
            if (isArrowFn(obj[prop])) {
                obj[prop] = arrowBind(obj, obj[prop])
            } else {
                obj[prop] = obj[prop].bind(obj)
            }
        }
        if (prop !== 'constructor' && !prop.startsWith('__') && descriptors[prop]) {
            const get = descriptors[prop].get
            const set = descriptors[prop].set
            const value = descriptors[prop].value
            if (prop.startsWith('on_')) {
                watchEffect(value[0])
            } else if (get && set) {
                obj[prop] = computed({ get: get, set: set })
            } else if (get) {
                obj[prop] = computed(get)
            }
        }
    }

    stores[obj.id] = obj
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
