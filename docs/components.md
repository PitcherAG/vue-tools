

## Components

### Checkbox

Displays a fomantic checkbox

```html
<Checkbox :label="'myLabel'"  v-model="myBoolean"/>
```

### Sidebar

Fomantic Sidebar component

```html
<Sidebar>
      <div class="item">
           <h2 class="header">{{ data.Name }}</h2>
       </div>
       <div class="item">
        {{ data.description}}
       </div>

</Sidebar>
```

```javascript
setup(){
     const sidebar = Sidebar.useSidebarStore()
     const data = sidebar.state.data
     return {data}
}
```

and somewhere else:

```javascript
setup() {
    const showSidebar = (product) => {
        const sidebar = Sidebar.useSidebarStore()
        sidebar.state.data = product
        sidebar.show()
    }
    return { showSidebar }
}
```

```html
<button v-on:click="showSidebar(myProduct)">Show sidebar</button>
```

### Calendar

Fomantic Calendar 

### Dropdown

Fomantic Dropdown

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

<script>
import { TransitionPage } from "@pitcher/vue-sdk";

export default {
    components: {
      TransitionPage
    }
}
</script>
```
