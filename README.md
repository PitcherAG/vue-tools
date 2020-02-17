# VueJS Tools for Pitcher Impact

## Ti.App.fireEvent

```javascript
import { fireEvent } from 'pitcher-vue-sdk/event'

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
import { query } from 'pitcher-vue-sdk/db/query'

query('select * from tbl_event_v1').then(e => window.console.log(e))
```


### ContextQuery

Context query uses handlebars template syntax. It needs the config installed and loadConfig function be called before first run.
This give it all the table names as context. Extra context can be supplied.

```javascript
 import { contextQuery } from 'pitcher-vue-sdk/db/contextQuery'
 import { loadConfig } from 'pitcher-vue-sdk/config'
 
     
 loadConfig().then(() => {
     contextQuery("select * from {{ Account }} where Id='{{ id }}'", {id:'ABCDEF1234'})
 })

```

You can either reference API names of salesforce objects or normal names.
It's a good idea to call loadConfig() in your App.vue onMounted() function first before using contextQuery
 
## getParameters

in your App.vue you need to call loadParams on mounted and then you can use the useParamsStore() function anywhere else:
 ```javascript
    import { onMounted } from '@vue/composition-api'
    import { loadParams, useParamsStore } from 'pitcher-vue-sdk/params'
    
    export default {
            name: 'app',
            setup() {
                console.log('App setup')
                onMounted(async () => {
                    console.log('on App mounted')
                    await loadParams()
                    const paramsStore = useParamsStore()
                    console.log(paramsStore.state.Account.Id)
                })
            }
        }
```

## Utils



### renderContext

renders a handlebars template in a given context

```javascript
    import { renderContext } from 'pitcher-vue-sdk/utils/renderContext'

    const obj = {first: "Hello", last:"World"}
    const template = "Say: {{ first }} and then {{ last }}"
    const result = renderContext(template, obj)
    console.log(result) // Say: Hello and then World
    
```



### contextExec

executes a question template in a give context and returns a Boolean

```javascript
    import { execBool } from 'pitcher-vue-sdk/utils/contextExec'
    
    const obj = {a:5, b:false}
    const question = "a > 5 && !b"
    const result = execBool(question, obj)
    
``` 


```javascript
    import { execString } from 'pitcher-vue-sdk/utils/contextExec'
    
    let obj = {a:()=>{return 'hello world'}, b:true}
    let question = "b : a() ? ''"
    let result = execString(question, obj) // hello world
    obj = {a:'hello', b:'world'}
    question = "a + ' - ' + b"
    result = execString(question, obj) // hello - world
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
