

## Components

### Checkbox

Displays a fomantic checkbox
```javascript
import { Checkbox ] from '@pitcher/vue-sdk'
```

```html
<Checkbox :label="'myLabel'"  v-model="myBoolean"/>
```

### Sidebar

Fomantic Sidebar component

```javascript
import { Sidebar ] from '@pitcher/vue-sdk'
```
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
import { Sidebar ] from '@pitcher/vue-sdk'

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

### Numpad Input
Custom component
#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `String` | yes | - | input value
| `decimals` | `Number` | no | 2 | decimal value for input
| `max` | `Number` | no | undefined | maximum number that input can reach
| `minWidth` | `Number | String` | no | 50 | min-width css property for input element
| `group` | `String` | no | no-group | for grouping inputs & navigate thru numpad buttons
| `fluid` | `Boolean` | no | undefined | fluid input size
| `disabled` | `Boolean` | no | undefined | disable input
| `size` | `String` | no | medium | tiny \| small \| large \| big \| huge \| massive 
| `rightIcon` | `String` | no | undefined | FA icon name. Use ONLY icon name i.e. users times etc.
| `leftIcon` | `String` | no | medium | FA icon name. Use ONLY icon name i.e. users times etc.
| `placeholder` | `String` | no | '' | placeholder for input element
| `noAnimation` | `Boolean` | no | false | Input animation on focus
| `color` | `String` | no | undefined | color for input container class (fomantic)

#### Available slots
| slot | description |
| :--- | :--- |
| `labelLeft` | Slot to add custom label html to the left side of input
| `labelRight` | Slot to add custom label html to the right side of input


#### Usage

```javascript
import { NumpadInput ] from '@pitcher/vue-sdk'
```

```html
// Simple usage
<NumpadInput v-model="fooInputValue" group="foo" />
 
// Defining size, decimals, icon, maximum without animation
<NumpadInput v-model="barInputValue" group="bar" size="small" leftIcon="search" :decimals="0" :max="100" noAnimation />
 
// Usage with slots
<NumpadInput v-model="fooInputValue" group="foo">
    // add left label
    <template #labelLeft>
        <div class="ui label">http://</div>
    </template>
      
      // add right label
    <template #labelRight>
        <div class="ui label">.com</div>
    </template>
</NumpadInput>
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
