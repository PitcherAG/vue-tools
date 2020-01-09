# VueJS Tools for Pitcher Impact

## Ti.App.fireEvent

```javascript
import { fireEvent } from 'pitcher-vue-sdk/ti/api/event'

fireEvent('dbFunction', {
    'query': query,
    'pType': 'query',
    'db': 'pitcher',
}).then(function (result) {
    ...
})
```

## DB Queries
```javascript
import { query } from 'pitcher-vue-sdk/ti/api/query'

query('select * from tbl_event_v1').then(e => window.console.log(e))
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

## Semantic Modal Module.
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
import modal from "pit-vue-tools/semantic/mixins/modal";

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
