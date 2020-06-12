

## Components

### Calendar

Fomantic Calendar 

### Checkbox

Displays a fomantic checkbox
```javascript
import { Checkbox ] from '@pitcher/vue-sdk'
```

```html
<Checkbox :label="'myLabel'"  v-model="myBoolean"/>
```

### DataTable
Fomantic DataTable with pagination

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `data` | `Array` | yes | - | object array to present data in table
| `fields` | `Array` | yes | - | object array for field options. Inside fields you define your table headings and the options for the column
| `search-for` | `String | Number` | no | - | search key for searching the table. This prop can be bound to an input outside of DataTable
| `search-fields` | `Array` | no | - | string array to specify which object properties you want to search inside your data array
| `width` | `String` | no | 100% | table width
| `no-data-text` | `String` | no | Table has not any data to show | text to show when your table has not any data to show
| `no-header` | `Boolean` | no | false | hide table header, by default table header is visible
| `fixed-header` | `Boolean` | no | false | make the table header fixed and table body scrollable
| `initial-page` | `Number` | no | 1 | initial page for pagination
| `per-page` | `Number` | no | 15 | how many line items per page to show in the table
| `total-visible` | `Number` | no | 5 | how many page numbers to show in your pagination
| `pagination-size` | `String` | no | 'medium' | tiny \| small \| medium \| large \| big \| huge \| massive 
| `align-pagination` | `String` | no | right | right \| left \| center 
| `no-pagination` | `Boolean` | no | false | to disable pagination in the table

#### Available slots
| slot | description | props
| :--- | :--- | :--- | 
| `row` | Slot to add custom label html to the left side of input |
| `labelRight` | Slot to add custom label html to the right side of input |

### Dropdown

Fomantic Dropdown

### Numpad Input
Custom component

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `String` | yes | - | input value
| `decimals` | `Number` | no | 2 | decimal value for input
| `max` | `Number` | no | undefined | maximum number that input can reach
| `min-width` | `Number | String` | no | 50 | min-width css property for input element
| `group` | `String` | no | no-group | for grouping inputs & navigate thru numpad buttons
| `fluid` | `Boolean` | no | undefined | fluid input size
| `disabled` | `Boolean` | no | undefined | disable input
| `size` | `String` | no | medium | tiny \| small \| medium \| large \| big \| huge \| massive 
| `right-icon` | `String` | no | undefined | FA icon name. Use ONLY icon name i.e. users times etc.
| `left-icon` | `String` | no | undefined | FA icon name. Use ONLY icon name i.e. users times etc.
| `placeholder` | `String` | no | '' | placeholder for input element
| `no-animation` | `Boolean` | no | false | input animation on focus
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
