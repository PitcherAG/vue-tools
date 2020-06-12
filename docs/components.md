
<style>
    .markdown-section {
        max-width: 75%;
    }
</style>
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
| `heading-row` | Slot to overwrite the content of ```thead > tr``` | ```{ filteredFields, sortData, sortTable, getClass(field) }```
| `body` | Slot to overwrite the content of ```tbody``` | ```{ tableData, filteredFields, sortData, pagination }```
| `row` | Slot to overwrite the content of ```tbody > tr``` | ```{ rowData, raw, sortData, pagination }```
| `t-foot` | Slot to overwrite the content of ```tfoot``` | ```{ tableData, sortData, pagination, paginate(n) }```
| `no-data-template` | Slot to overwrite the content that shows when table has not any data | ```{ noDataText }```

#### Definitions
```javascript
 // object array for fields, here you define how your data will be presented in the table
fields: Field[]

// a single field definition inside fields array
field: {
    // column heading
    title: String,
    // which data property this heading is presenting inside the data object you send.
    // it can also be a slot name with __slot:slotname to access later inside your template
    // when you use custom slot like this you have access to rowData and sortData in template
    dataField: String | __slot:slotName,
    // icon name to prepend to column title. use only icon name i.e. cog, times etc.
    icon: String,
    // class name to inject <th> element i.e. right aligned, collapsing etc.
    thClass: String,
    // class name to inject <td> element in each row
    tdClass: String,
    // to makes column sortable thru clicking the <th> element
    sortable: Boolean,
    // enable tooltip for <th> element
    tooltip: Boolean,
    // property in your data that you don't want to show in your table i.e. ID etc.
    hide: Boolean,
    // function to handle the value before it is shown in the table
    transform: Function
}

// array of fields that are filtered. Does not include fields with hide: true set
filteredFields: Field[]

// data array that is currently shown in the table, according to pagination
tableData: Object[]

// single data object that belongs to the row when you are using in template #row.
// it does not include properties you hide in your field definition
rowData: Object

// single data object that that belongs to the row whenyou are using in template #row.
// it includes all properties of the object either you hide or not in your field definition 
raw: Object

// if any column is sorted currently, this object includes the details
sortData: { by: String, order: String }

// contains current pagination data inside
pagination: {
    currentPage: Number,
    totalPages: Number,
    startPage: Number,
    endPage: Number,
    startIndex: Number,
    endIndex: Number,
    pages: Array
}
// function to control pagination, number is the page number you want to paginate to
paginate: Function(number)
// function to sort the table. dataField is the name of your field you want to sort
sortTable: Function(dataField)
// this function injects related classes to the <th> element, if it is sortable, sorted etc.
// field is a single field object
getClass: Function(field)
```

#### Usage
```javascript
import { DataTable } from '@pitcher/vue-sdk'

// data that will be presented in table
const data = [{
    id: '65c5e68ec',
    username: 'pitcher user',
    age: 30,
    createdDate: 'Saturday, September 22, 2018 6:14 AM'
},
...
...
]

// field definitions must to be defined for each object property you have in your data
const fields = [
{
    title: 'Id',
    dataField: 'id',
    hide: true  // makes this field invisible in table
},
{
    // Required
    title: 'Username',          // name that will be shown in <th>
    // Required
    dataField: 'username',      // property name inside data object
    // these are optional
    icon: 'user',               // icon to prepend in column header
    width: '100px',             // column width
    thClass: 'left aligned',    // class that will be injected to <th>
    tdClass: 'collapsing',      // class that will be injected to <tr>
    sortable: true,             // make column sortable
    tooltip: 'top left'         // add tooltip to <th>
},
{
    title: 'Age',
    dataField: 'age',
    sortable: true,
    // transform the value before showing
    transform: (val) => `${val} years old` 
},
{
    title: 'Created date',
    dataField: 'createdDate',
    sortable: true
},
{
    title: 'Actions'
    // access in template with <template #actions>
    dataField: '__slot:actions'
}]

// must be reactive
const searchFor = ''
// if not defined, by default it searches thru all object properties
const searchFields = ['name', 'age']
```

```html
// Simple usage
<DataTable :data="data" :fields="fields" :search-for="searchFor" />
 
// Using fomantic classes & fixed header etc.
<DataTable class="celled striped" :data="data" :fields="fields" :per-page="50" fixed-header />
 
// Usage with slots, contains all slot examples
<DataTable :data="data" :fields="fields" >
    <!-- Inject template to heading-row  -->
    <template #heading-row="{ filteredFields, sortData, sortTable, getClass }">
        <th v-for="(f, fKey) in filteredFields" :key="fKey" @click="sortTable(f.dataField)" :class="getClass(f)">
            <i v-if="f.icon" class="icon" :class="f.icon" />
            {{ f.title }}
        </th>
    </template>

    <!-- Inject template to body -->
    <template #body="{ tableData, filteredFields, pagination, sortData }">
        <tr v-for="(row, rKey) in tableData" :key="rKey">
            <td v-for="(col, cKey) in row" :key="cKey">
                {{ col }}
            </td>
        </tr>
        <tr v-for="(row, rKey) in tableData" :key="rKey">
            <template v-for="(f, fKey) in filteredFields">
                <td v-if="!f.hide" :key="fKey">
                    if this field is not a slot
                    <template v-if="!f.dataField.includes('__slot:')">
                        {{ f.transform ? f.transform(row[f.dataField]) : row[f.dataField] }}
                    </template>
                </td>
            </template>
        </tr>
    </template>

    <!-- Inject template to each row  -->
    <template #row="{ rowData, raw, sortData, pagination }">
        <td v-for="(columnData, cKey) in rowData" :key="cKey">
            {{ columnData }}
        </td>
        <td>
            actions
        </td>
    </template>

    <!-- Inject template to the slot you have dynamically created in fields -->
    <template #actions="{ rowData, sortData }">
        <button class="ui button basic right aligned" @click="doSomething(rowData)">
            <i class="icon edit" />
            Edit
        </button>
    </template>

    <!-- Inject template inside tfoot element -->
    <template #t-foot="{ pagination, paginate, tableData, sortData }">
        <tr>
            <th><Pagination :pagination="pagination" :paginate="paginate" /></th>
            <th colspan="6">
                <div class="ui right floated small primary labeled icon button">
                    <i class="user icon"></i> Add User
                </div>
                <div class="ui small  button">
                    Approve
                </div>
                <div class="ui small  disabled button">
                    Approve All
                </div>
            </th>
        </tr>
    </template>

    <!-- Inject template  -->
    <template #no-data-template>
        <span class="ui text large grey center">Here comes my custom no data text and style</span>
    </template>
</DataTable>
```


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
import { NumpadInput } from '@pitcher/vue-sdk'
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
