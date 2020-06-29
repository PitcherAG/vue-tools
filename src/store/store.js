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
    if(stores[obj.id]){
        return stores[obj.id]
    }
    try{
        transform(obj)
    }catch{
        console.info('early register:'+obj.id)
        early.push(obj)
    }finally {
        for (const store of early){
            transform(store)
        }
    }
    if(stores[obj.id]){
        return stores[obj.id]
    }
}
