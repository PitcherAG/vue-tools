# VueJS Tools for Pitcher Impact

Please open pull request if you want to change something

## Ti.App.fireEvent

```javascript
import { fireEvent } from 'pitcher-vue-sdk/event'

fireEvent('dbFunction', {
    'query': query,
    'pType': 'query',
    'db': 'pitcher',
}).then(function (result) {
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

## i18n Internationalization

### date

```javascript
    import { formatDate } from 'pitcher-vue-sdk/i18n/date'
    const a = new Date()
    formatDate(a, true) // local format date with year (false for day and month only)
```

### translations

provides translations

in your app.vue:

```javascript
    import { onMounted } from '@vue/composition-api'
    import { loadParams, useParamsStore } from 'pitcher-vue-sdk//params'
    import { provideI18n, setLanguage } from 'pitcher-vue-sdk//i18n/i18n'
    const translations = {
        locale: 'en',
        messages: {
            en: {
                'Save': '',
                'Cancel': '',
                'Continue': '',
                cal_text: {
                    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    today: 'Today',
                    now: 'Now',
                    am: 'AM',
                    pm: 'PM'
                }
            },
            es: {
                'Save': 'Guardar',
                'Cancel': 'Cancelar',
                'Continue': 'Continuar',
                cal_text: {
                    days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    today: 'Hoy',
                    now: 'Ahora',
                    am: 'AM',
                    pm: 'PM'
                }
            },
        }
    }
    export default {
        name: 'app',
        setup(props, attrs) {
            provideI18n(translations)
            onMounted(async () => {
                await loadParams()
                const params = useParamsStore()
                setLanguage(params.language.value)
            })
        }
    }
```

Then somewhere else:

```javascript
import { trans } from ''pitcher-vue-sdk/i18n/i18n'
const v = trans('Save')

```
or

```javascript
import { trans } from ''pitcher-vue-sdk/i18n/i18n'
export default {
        setup(props, attrs) {
            return { trans}
        }
    }
```

```html
<button>{{ trans('Save')}}</button>
```
## Utils

### link

opens an other interactive via a 'pitcher link', Example:

`pitcher://keyword/?myParam=5&otherParam={{ a.count}}`

This would open the interactive with the keyword `keyword` and save myParam and otherParam to local storage

```javascript
    import { openLink } from 'pitcher-vue-sdk/utils/link'
    var link = 'pitcher://keyword/?myParam=5&otherParam={{ a.count}}'
    var context = {a:5}
    openLink(link, context)
```


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

#### ATTENTION: these function are considered unsafe. Be sure that you know what you are doing and that the input is validated.

executes a question template in a give context and returns a Boolean

```javascript
import { execBool } from 'pitcher-vue-sdk/utils/contextExec'

const obj = {a:5, b:false}
const question = "a > 5 && !b"
const result = execBool(question, obj)
    
``` 
executes a question template in a give context and returns a String

```javascript
import { execString } from 'pitcher-vue-sdk/utils/contextExec'

let obj = {a:()=>{return 'hello world'}, b:true}
let question = "b : a() ? ''"
let result = execString(question, obj) // hello world
obj = {a:'hello', b:'world'}
question = "a + ' - ' + b"
result = execString(question, obj) // hello - world
``` 

executes a template in a context

```javascript
import { execExecute } from 'pitcher-vue-sdk/utils/contextExec'

let obj = {a:()=>{return 'hello world'}, b:true}
let question = "alert(a())"
let result = execExecute(question, obj) // hello world
   
``` 

## Components

### Calendar

Fomantic Calendar 

### Dropdown

Fomantic Dropdwon

### ObjectForm

Displays a salesforce object as a form, uses layouts if available otherwise uses schemas. Layouts are supported by android at the moment only. 

#### Properties:
- objectType(require: true, type: String)
- fields(type: Array, strings, which fields to display in the form, default displays all fields from schema)
- excludeFields(type: Array, strings, which fields to exclude),
- hasSave(type: Boolean, if save button is displayed or not)
- id(type: String, id of existing object for form fill up)
- recordType (type: String, record type to use for form)
- obj(type: Object, object to use for form)
- onSave(type: Function, callback on form save)

#### Methods:

- save
- clear


### ObjectFormField

Displays a form field inside ObjectForm


### TransitionPage

Gives you transitions between router pages.

Example: 
```html
<template>
    <div id="app">
        <Header></Header>
        <div>
            <TransitionPage>
                <router-view v-if="loaded"></router-view>
            </TransitionPage>
        </div>
    </div>
</template>


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
