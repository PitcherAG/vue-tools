import Vue from 'vue'

const stores = {}

const early = []

function transform(obj){
    const store = Vue.observable(obj)
    stores[obj.id] = store
}


export function createStore(obj){
    if(!obj.id){
        throw 'store needs an id attribute'
    }
    if(stores && stores[obj.id]){
        return stores[obj.id]
    }

    transform(obj)

    if(stores[obj.id]){
        return stores[obj.id]
    }
}
