State
==

In Components
---

If you need state in a component we advise to use the following

```javascript
    import { reactive } from '@vue/composition-api'
    ...
    setup(){
        const state = reactive({})
    }
```

Cross Component State
---

If you need access to data from multiple components we advise to 
use the sdk store.

Example:
```javascript
import { createStore } from '@pitcher/vue-sdk'

const store = {
    id:'myStoreId',
    state:{
        value:4
    },
    double: computed(()=>this.state.value*2)
}
export function useMyStore(){
    return createStore(store)
}

```

Class Store
---

We now support class based stores. Getters will be automatically converted
to computed.

If a function starts with on_ it will be converted to a watcher.

Example:

```javascript

import { createStore } from '@pitcher/vue-sdk'

class MyStore {
    id='myStoreId'
    state={
        value:4
    }
    get double(){
        return this.state.value*2
    }
    
    on_state_value(){
        console.log('value changed')
    }
}
export function useMyStore(){
    return createStore(new MyStore())
}
```




