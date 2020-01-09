# VueJS Tools for Pitcher Impact

## Ti.App.fireEvent

```javascript
import { fireEvent } from 'pitcher-vue-sdk/ti/api/event'

fireEvent('dbFunction', {
    'query': query,
    'pType': 'query',
    'db': 'pitcher',
}).then((result) => {
    ...
})
```

## DB Queries
### Query
```javascript
import { query } from 'pitcher-vue-sdk/ti/api/query'

query('select * from tbl_event_v1').then(e => window.console.log(e))
```


### ContextQuery

Context query uses handlebars template syntax. It needs the config vuex store module installed and loadConfig function be called before first run.
This give it all the table names as context. Extra context can be supplied.

```javascript
 import { contextQuery } from 'pitcher-vue-sdk/ti/api/contextQuery'

 export default {
     methods: {
        ...mapActions(['loadConfig']),

    },
    created () {           
        this.loadConfig().then(() => {
             contextQuery("select * from {{ Console }} where id='{{ id }}'", {id:1})
        })
    }
}
```
## getParameters

in your store/index.js add params as a module:
 ```javascript
    import params from 'pitcher-vue-sdk/ti/store/params'
    
    export default new Vuex.Store({
        state,
        mutations,
        actions,
        getters,
        modules: {
            params,
        }
    })
```

## Semantic UI
- [Modal Mixin](#modal-mixin)

### Modal Mixin
Mixin for the Semantic Modal Module. Emits events and has a property to open the modal.

Example Component:
```html
<template>
    <div class="ui modal" ref="modal">
    </div>
</template>
```

```javascript
import modal from "pitcher-vue-sdk/semantic/mixins/modal";

export default {
    name: "SomeModal",
    mixins: [modal],
    methods: {
        hideModal() {
            // do something
        },
        onApprove() {
            // do something
        },
        onDeny() {
            // do something
        },
        onHidden() {
            // do something
        },
        onHide() {
            // do something
        },
        onShow() {
            // do something
        },
        onVisible() {
            // do something
        },
        showModal() {
            // do something
        }
    }
}
```

Example Usage:
```html
<SomeModal
    @approve="onApprove"
    @deny="onDeny"
    @hidden="onHidden"
    @hide="onHide"
    @show="onShow"
    @visible="onVisible"
    v-model="openModal"/>
```
