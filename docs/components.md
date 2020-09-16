
<style>
    .markdown-section {
        max-width: 75%;
    }
</style>
## Components

### Calendar
Fomantic Calendar 

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `String \| Date` | yes | - | date value
| `type` | `datetime \| date \| time \| month \| year` | no | 'datetime' | type of calendar
| `min-date` | `String \| Date` | no | - | minimum date that can be selected in calendar
| `max-date` | `String \| Date` | no | - | maximum date that can be selected in calendar
| `start-mode` | `year \| month \| day \| hour \| minute` | no | 'day' | calendar mode
| `default-text` | `String` | no | 'Date/Time' | default text when there is not any value selected
| `show-am-pm` | `Boolean` | no | false | show calendar hours with am/pm format, default is 24H format.
| `show-today` | `Boolean` | no | true | show/hide today button in calendar popup
| `show-week-numbers` | `Boolean` | no | false | show/hide week numbers in calendar popup
| `disabled-days-of-week` | `Number[]` | no | undefined | disable some days of the week from selection (0= Sunday, 1=Monday, ...)
| `disabled-dates` | `[]` | no | undefined | an array of Date-Objects or Objects with given message to show in a popup when hovering over the appropriate date. ex: `{ date: Date, message: String }`
| `enabled-dates` | `[]` | no | undefined | an array of Date-Objects to be enabled for selection. All other dates are disabled
| `event-dates` | `[]` | no | undefined | 	an array of Date-Objects or Objects with given message to show in a popup when hovering over the appropriate date and an individual class for the cell. ex: `{ date: Date, message: string, class: string }`
| `event-class` | `String` | no | undefined | default class to be added to each cell of an eventDate date element when no specific class is given to the eventDate element
| `disable-year` | `Boolean` | no | undefined | disable year selection mode
| `disable-month` | `Boolean` | no | undefined | disable month selection mode
| `disable-minute` | `Boolean` | no | undefined | disable minute selection mode
| `disable-value-formatting` | `Boolean` | no | false | calendar component formats selected value when user selects a date/time. To disable this feature you can use this property
| `value-formatter` | `Function` | no | see definitions | formatter function to format value before it is emitted. See definitions to see how it works
| `disable-input-formatting` | `Boolean` | no | false | calendar component formats the value that is shown in input. To disable this feature you can use this property
| `input-formatter` | `Function` | no | see definitions | formatter function to format value before it is shown in input. See definitions to see how it works
| `fluid` | `Boolean` | no | undefined | makes the component width fluid `100%` by adding fluid class to the input
| `disabled` | `Boolean` | no | undefined | disables the component thru adding disabled class to the input
| `loading` | `Boolean` | no | false | sets the calendar to loading state thru adding loading class to the input
| `error` | `Boolean` | no | undefined | adds error class to the input
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 
| `min-width` | `Number \| String` | no | undefined | min-width css property for input element
| `max-width` | `Number \| String` | no | 100% | max-width css property for input element
| `settings` | `Object` | no | undefined | Fomantic calendar settings, here you can define extra JS options that are available in Fomantic. Details: https://fomantic-ui.com/modules/calendar.html#/settings
| `action` | `String` | no | 'activate' | default action when initializing fomantic calendar element. Default is activate.

#### Available events
| event | description |
| :--- | :--- |
| `@input` | default v-model input event
| `@onBeforeChange` | fired before the input is changed
| `@onShow` | fired before calendar popup is shown
| `@onVisible` | fired when calendar popup is visible
| `@onHide` | fired before calendar popup is hidden
| `@onHidden` | fired when calendar popup is hidden
| `@onSelect` | fired when user clicks on a date/time from popup

#### Definitions
```javascript
// default value formatter before emitted to parent
valueFormatter: function(date) {
    // if date includes time, returns formats value as ISO
    if (this.type.includes('time')) {
        return date.toISOString()
    }

    // otherwise formats as date time
    const yyyy = date.getFullYear().toString()
    const mm = (date.getMonth() + 1).toString()
    const dd = date.getDate().toString()
    return `${yyyy}-${mm[1] ? mm : '0' + mm[0]}-${dd[1] ? dd : '0' + dd[0]}`
}

// default input formatter before value changed in input
// Uses SDK's internal date formatter
inputFormatter: date => formatDate(date)
```

#### Usage
```javascript
import { Calendar } from '@pitcher/vue-sdk'

// must be reactive
const selectedDate = '2020-08-01T11:00:00.000'

// specific eventDates
const eventDates = [
    {
        date: new Date(), // today
        message: 'National Day',
        class: 'red'
    },
    ...
    ...
]
// disabledDates
const disabledDates = [
    {
        date: new Date(), // today
        message: 'Not selectable',
    },
    ...
    ...
]
```

```html
<!-- Simple usage -->
<Calendar v-model="selectedDate" />

<!-- Using fluid, fixed input width, smaller input size -->
<Calendar v-model="selectedDate" fluid size="small" max-width="300px" />
 
<!-- Using with event dates -->
<Calendar v-model="selectedDate" :event-dates="eventDates" />

<!-- Using with disabled dates -->
<Calendar v-model="selectedDate" :disabled-dates="disabledDates" />
```


### Checkbox
Displays a fomantic checkbox
#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `Boolean` | yes | - | model to track checkbox status
| `label` | `String` | no | undefined | checkbox label text
| `radio` | `Boolean` | no | undefined | radio style checkbox
| `toggle` | `Boolean` | no | undefined | toggle style checkbox
| `slider` | `Boolean` | no | undefined | slider style checkbox
| `readonly` | `Boolean` | no | undefined | readonly checkbox
| `disabled` | `Boolean` | no | undefined | disable checkbox
| `fitted` | `Boolean` | no | undefined | remove the padding for the input box. Useful when you dont have a label to have equal spacing
| `uncheckable` | `Boolean` | no | true | make the checbox uncheckable. Can be useful for radio style checboxes
| `inverted` | `Boolean` | no | undefined | inverts the color of checkbox
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 

#### Available events
| event | description |
| :--- | :--- |
| `@input` | default v-model input event, returns the current value
| `@onUnchecked` | event to hook just after the input is unchecked, returns the current value
| `@beforeChecked` | event to hook just before the input is checked, returns the current value (value before update)
| `@beforeUnchecked` | event to hook just before the input is unchecked, returns the current value (value before update)

#### Available functions that you can call on the component
| function name | description |
| :--- | :--- |
| `exec(command)` | helper to call any option on checkbox. Example: `COMPONENT.exec('indeterminate')` Details: https://fomantic-ui.com/modules/checkbox.html#behavior

#### Usage
```javascript
import { Checkbox } from '@pitcher/vue-sdk'

const myLabel = 'Check me'
const myBoolean = false
```

```html
<!-- Simple usage -->
<Checkbox v-model="myBoolean" :label="myLabel"/>

<!-- Usage with props -->
<Checkbox v-model="myBoolean" label="mylabel_directly_here" toggle />

<Checkbox v-model="myBoolean" slider />
```


### DataTable
Fomantic DataTable with pagination

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `data` | `Array` | yes | - | object array to present data in table
| `fields` | `Array` | yes | - | object array for field options. Inside fields you define your table headings and the options for the column
| `search-for` | `String \| Number` | no | '' | search key for searching the table. This prop can be bound to an input outside of DataTable
| `search-fields` | `Array` | no | [] | string array to specify which object properties you want to search inside your data array
| `search-options` | `Object` | no | ```{ threshold: 0.15, useExtendedSearch: true, distance: 1000 }``` | fuse.js search options, default threshold is 0.3 which shows matching results. If you need exact search results set this to 0. For details: https://fusejs.io/api/options.html
| `tr-class` | `String \| Function` | no | undefined | prop to add class to ```tr``` of a line item. Can be string or function that sends line item as a parameter i.e. `:tr-class="item => item.valid && 'red' "`
| `group-by` | `String` | no | undefined | prop to group line items thru a property i.e. `item.brand` field would be the property to group line items thru.
| `width` | `String` | no | 100% | table width
| `max-width` | `String` | no | - | table max-width
| `no-data-text` | `String` | no | Table has not any data to show | text to show when your table has not any data to show
| `no-header` | `Boolean` | no | false | hide table header, by default table header is visible
| `fixed-header` | `Boolean` | no | false | make the table header fixed and table body scrollable
| `initial-page` | `Number` | no | 1 | initial page for pagination
| `per-page` | `Number` | no | 15 | how many line items per page to show in the table
| `total-visible` | `Number` | no | 5 | how many page numbers to show in your pagination
| `pagination-size` | `String` | no | 'medium' | tiny \| small \| medium \| large \| big \| huge \| massive 
| `align-pagination` | `String` | no | right | right \| left \| center 
| `no-pagination` | `Boolean` | no | false | to disable pagination in the table

#### Available events
| event | description |
| :--- | :--- |
| `@rowClick` | event that is triggered when user clicks a row, sends clicked item as a parameter
| `@onSort` | event that is triggered when sorts a column, sends current state of sort ``` { by, order } ```
| `@onSearch` | event that is triggered when user types for searching, sends search key and results ``` { key, result } ```

#### Available slots
| slot | description | props
| :--- | :--- | :--- | 
| `heading-row` | Slot to overwrite the content of ```thead > tr``` | ```{ filteredFields, sortData, sortTable, getClass(field) }```
| `FIELDTITLE__slot` | Dynamic slot to overwrite content of targeted field ```thead > tr > th``` | ```{ field }```
| `body` | Slot to overwrite the content of ```tbody``` | ```{ tableData, filteredFields, sortData, pagination }```
| `prepend-tbody` | Slot to prepend ```<tr>``` in to the ```tbody``` | ```{ mapper }```
| `append-tbody` | Slot to append ```<tr>``` in to the ```tbody``` | ```{ mapper }```
| `row` | Slot to overwrite the content of ```tbody > tr``` | ```{ rowData, raw, sortData, filteredFields, mapper, pagination }```
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
    // which object property this heading is presenting inside the data object you send.
    // supports deep object mapping like obj.nested.child
    dataField: String,
    // when you need to use a custom slot, you can define a slotName here to access in your template
    // when using slotName property, dataField is not required. But if you still need to map the property
    // of the object, you can still use dataField combined with slotName
    slotName: String
    // icon name to prepend to column title. use only icon name i.e. cog, times etc.
    icon: String,
    // class name to inject <th> element i.e. right aligned, collapsing etc.
    thClass: String,
    // class name to inject <td> element in each row
    tdClass: String,
    // to makes column sortable thru clicking the <th> element
    sortable: Boolean,
    // what type sorting logic should use when sorting the data
    // default: string
    sortType: 'string | number | date'
    // enable tooltip for <th> element
    tooltip: 'top left | top center | top right | bottom left | bottom center | bottom right | right center | left center',
    // Custom text for tooltip. Uses title as text if not defined
    tooltipText: String,
    // property in your data that you don't want to show in your table i.e. ID etc.
    hide: Boolean,
    // sets width style to the <th> element, accepts only string
    width: String
    // function to handle the value before it is shown in the table
    transform: Function(value, rootObject, fieldObject)
}

// array of fields that are filtered. Does not include fields with hide: true and slotName
filteredFields: Field[]

// function to map dotted fields from an object
// ex: mapper('object.nested.field.title', object_that_includes_target_property)
mapper: Function(key, obj)

// data array that is currently shown in the table, according to pagination
tableData: Object[]

// single data object that belongs to the row when you are using in template #row.
// it does not include properties you hide in your field definition
rowData: Object

// single field object that belongs to the row when you are using a dynamic defined with slotName.
rowField: Object

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
// function to sort the table. Takes in a field object and checks dataField property for sorting
sortTable: Function(field)
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
    // Required (unless you use slotName: property)
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
    sortType: 'number'
    // transform the value before showing
    transform: (val, obj, field) => `${val} years old` 
},
{
    title: 'Created date',
    dataField: 'createdDate',
    sortable: true,
    sortType: 'date'
},
{
    title: 'Actions'
    // access in template with <template #actions>
    slotName: 'actions'
}]

// must be reactive
const searchFor = ''
// if not defined, by default it searches thru all object properties
const searchFields = ['name', 'age']
// NOTE: You can also search nested object properties like ['user.name', 'user.age'] etc.
```

```html
// Simple usage
<DataTable :data="data" :fields="fields" :search-for="searchFor" />
 
// Using fomantic classes & fixed header etc.
<DataTable class="celled striped" :data="data" :fields="fields" :per-page="50" fixed-header />
 
// Usage with slots, contains all slot examples
<DataTable :data="data" :fields="fields">
    <!-- Inject template to any TH slot. No need to define anything special just add a template #FIELDTITLE__slot -->
    <template #Id__slot="{ field }">
        <button class="ui button basic right aligned">
            <i class="icon edit" />
            Id
        </button>
    </template>

    <!-- Inject template to heading-row  -->
    <template #heading-row="{ filteredFields, sortData, sortTable, getClass }">
        <th v-for="(f, fKey) in filteredFields" :key="fKey" @click="sortTable(f.dataField)" :class="getClass(f)">
            <i v-if="f.icon" class="icon" :class="f.icon" />
            {{ f.title }}
        </th>
    </template>

    <!-- Prepend to tbody before data line items -->
    <template #prepend-tbody="{ mapper }">
        <tr>
            <td colspan="2">Prepend Test</td>
            <td>Test</td>
            <td colspan="3" />
            <td>test</td>
        </tr>
    </template>

    <!-- Inject template to body -->
    <template #body="{ tableData, filteredFields, mapper, pagination, sortData }">
        <tr v-for="(row, rKey) in tableData" :key="rKey">
            <td v-for="col in row" :key="c.title">
                {{ col }}
            </td>
        </tr>
        <tr v-for="row in tableData" :key="row.__rowID">
            <template v-for="(f, fKey) in filteredFields">
                <td v-if="!f.hide" :key="fKey" :class="f.tdClass">
                    <!-- if this field is not a slot -->
                    <template v-if="!f.slotName">
                        <!-- Transform function, return mapped object, root object & field object -->
                        {{
                            f.transform
                                ? f.transform(mapper(f.dataField, row), row, f)
                                : mapper(f.dataField, row)
                        }}
                    </template>
                </td>
            </template>
        </tr>
    </template>

    <!-- Append to tbody after data line items -->
    <template #append-tbody="{ mapper }">
        <tr>
            <td colspan="2">Append test</td>
            <td colspan="4">test</td>
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

    <!-- Inject template to the slot you have dynamically defined in fields -> slotName -->
    <template #actions="{ value, rowData, rowField, sortData }">
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
                    <i class="user icon" /> Add User
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
Fomantic Dropdown component

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `String` | yes | - | model to track of selected values
| `items` | `Array` | false | - | object array for dropdown items. Required if you want to use with JS declaration. Do not use items if you use default slot
| `item-text` | `String` | no | 'text' | which property to map as text in your items declaration
| `item-value` | `String` | no | 'value' | which property to map as value in your items declaration
| `icon` | `String` | no | 'dropdown' | default icon for dropdown. If anything else than dropdown, the icon will be placed to the left side
| `default-text` | `String` | no | 'Select' | default text that will be show when there is not any value selected
| `action` | `String` | no | 'activate' | default action when initializing fomantic dropdown element. Default is activate.
| `settings` | `Object` | no | undefined | Fomantic dropdown settings, here you can define extra JS options that are available in Fomantic. Details: https://fomantic-ui.com/modules/dropdown.html#/settings
| `fluid` | `Boolean` | no | undefined | makes the component width fluid `100%` by adding fluid class to the container
| `compact` | `Boolean` | no | undefined | makes the component compact thru adding compact class to the container. Width of dropdown increases the more you select from the dropdown
| `selection` | `Boolean` | no | true | makes the component a selection dropdown thru adding selection class to the container
| `multiple` | `Boolean` | no | undefined | enables multiple selection of items in dropdown thru adding multiple class to the container
| `searchable` | `Boolean` | no | undefined | makes the dropdown searchable thru adding search class to the container
| `clearable` | `Boolean` | no | undefined | makes the dropdown selection clearable. Note that combining searchable = true with selection = false is not recommended!
| `disabled` | `Boolean` | no | undefined | disables the component thru adding disabled class to the container
| `loading` | `Boolean` | no | false | sets the dropdown to loading state thru adding loading class to the container
| `error` | `Boolean` | no | undefined | adds error class to the container
| `color` | `String` | no | undefined | sets the color of button thru adding the color class to the container. (check available colors at Fomantic)
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 
| `min-width` | `Number \| String` | no | undefined | min-width css property for input element
| `max-width` | `Number \| String` | no | 100% | max-width css property for input element

#### Available slots
| slot | description |
| :--- | :--- |
| `default` | Default slot to replace the content of `div.ui.dropdown`. You can use this without naming the slot i.e. `<Dropdown>content</Dropdown>`. When using default slot, you need to add data-value and data-item options to each `div.item`. **Using slot option in dropdown is a little bit experimental.**

#### Available events
| event | description |
| :--- | :--- |
| `@onSelected` | event that is triggered when user selects an item from dropdown. Returns selected item as an object.
| `@input` | default v-model input event, returns the selected items value

#### Definitions
```javascript
 // object array for items, here you define how your data will be presented in the dropdown and what value they will have on selection. You can also simply use a String array.
items: Item[] | String[]

// a single item definition inside items array
item: {
    // The name of your dropdown item. This will be shown as the name in the Dropdown. Also you can rename text to anything else. Let's say if you change text -> to name and set item-text="name" in your dropdown properties, dropdown will show name property as the text.
    text: String,
    // The value of your dropdown item that will be saved when you select. Same option as text applies to this property as well, combine with item-value property in dropdown.
    value: String,
    // Type of the dropdown item, default is 'item'
    type: 'item | header | divider',
    // Description for the item
    description: String,
    // icon name to prepend to the item text. use only icon name i.e. cog, times etc.
    icon: String,
    // image url to prepend an image to the item text.
    image: String,
    // to disable dropdown item
    disabled: Boolean
}
```

#### Usage
```javascript
import { Dropdown } from '@pitcher/vue-sdk'

// data that will be presented in dropdown
const items = [
{
    text: 'Cantons',
    type: 'header'
},
{
    text: 'Zürich',
    value: 'zurich',
    icon: 'city',
    description: '10'
},
{
    type: 'divider'
},
{
    text: 'Aargau',
    value: 'aargau',
    image: 'https://image_url'
},
...
...
]

// must be reactive
const selectedItem = ''
```

```html
<!-- Simple usage -->
<Dropdown v-model="selectedItem" :items="items" clearable />

<!-- Using multiple selection, search, clearable, compact -->
<Dropdown v-model="selectedItem" :items="items" compact multiple searchable clearable />
 
<!-- Using fomantic classes & multiple selection, search, filter icon etc. -->
<Dropdown class="inline pointing" v-model="selectedItem" :items="items" icon="filter" />
 
<!-- Usage with slot -->
<Dropdown class="ui dropdown left pointing icon button" v-model="selectedItem">
    <i class="settings icon" />
    <div class="menu">
        <div class="ui left search icon input">
            <i class="search icon" />
            <input type="text" name="search" placeholder="Search issues..." />
        </div>
        <div class="divider" />
        <div class="header">
            <i class="tags icon" />
            Filter by tag
        </div>
        <div class="item" data-value="important">
            <div class="ui red empty circular label" />
            Important
        </div>
        <div class="item" data-value="announcement">
            <div class="ui blue empty circular label" />
            Announcement
        </div>
        <div class="item" data-value="discussion">
            <div class="ui black empty circular label" />
            Discussion
        </div>
    </div>
</Dropdown>

<!-- Usage with slot example 2 -->
<Dropdown class="fluid multiple search selection" v-model="selectedItem">
    <input type="hidden" name="country" />
    <i class="dropdown icon" />
    <div v-if="!selectedItem || selectedItem.length < 1" class="default">Select Country</div>
    <div class="text" />
    <div class="menu">
        <div class="item" data-value="at"><i class="at flag" />Austria</div>
        <div class="item" data-value="be"><i class="be flag" />Belgium</div>
        <div class="item" data-value="dk"><i class="dk flag" />Denmark</div>
        <div class="item" data-value="gb"><i class="gb flag" />England</div>
        <div class="item" data-value="de"><i class="de flag" />Germany</div>
        <div class="item" data-value="it"><i class="it flag" />Italy</div>
        <div class="item" data-value="mx"><i class="mx flag" />Mexico</div>
        <div class="item" data-value="pl"><i class="pl flag" />Poland</div>
        <div class="item" data-value="se"><i class="se flag" />Sweden</div>
        <div class="item" data-value="ch"><i class="ch flag" />Switzerland</div>
        <div class="item" data-value="tr"><i class="tr flag" />Turkey</div>
        <div class="item" data-value="us"><i class="us flag" />United States</div>
    </div>
</Dropdown>
```


### FileCard
Custom Card component for files

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `body` | `String` | no | '' | file name
| `img-url` | `String` | no | - | file image url to show in card
| `date` | `String` | no | - | file publish date
| `keywords` | `String` | no | '' | file keywords
| `is-favorite` | `Boolean` | no | - | control behaviour of favorite icon
| `is-new` | `Boolean` | no | - | control behaviour of new label, shows/hides new label
| `favorite-icon` | `String` | no | 'star' | icon to toggle file as favorite
| `hide-favorite` | `Boolean` | no | `false` | hides favorite icon
| `show-file-options` | `Boolean` | no | `true` | shows/hides file options button
| `new-text` | `String` | no | 'New' | text inside `New` label, can be used for translation
| `download-text` | `String` | no | 'Download' | text inside file options dropdown, can be used for translation
| `share-text` | `String` | no | 'Share' | text inside file options dropdown, can be used for translation
| `height` | `String \| Number` | no | 295 | height of the card, content height is calculated percentually thru this
| `file-options-items` | `Array` | no | `DefaultFileOptions[]` | object array for file options items, to see default definition of this array check the definitions


#### Available slots
| slot | description | props
| :--- | :--- | :--- |
| `items` | slot to replace file options menu items. As long is this is a dropdown menu, you must to follow dropdown menu items structure. Check usage example to see how it's used.
| `new` | slot to replace file new badge
| `keywords` | slot to replace file keywords container, at the bottom of the file card. Here keywords can be show in a different style, only some keywords can be shown etc.

#### Available events
| event | description |
| :--- | :--- |
| `@onClickImage` | triggered when user clicks the card image
| `@onClickFavorite` | triggered when user clicks the favorite icon
| `@onClickDownload` | triggered when user clicks the Download item in file options menu. If you customize file options with slots or prop, this might not be available.
| `@onClickShare` | triggered when user clicks the Share item in file options menu. If you customize file options with slots or prop, this might not be available.


#### Definitions
```javascript
 // Default File Options
DefaultFileOptions = [
    {
        // downloadText, gets from the props
        text: props.downloadText,
        icon: 'download icon thin',
        click: () => emit('onClickDownload')
    },
    {
        // shareText, gets from the props
        text: props.shareText,
        icon: 'share icon thin',
        click: () => emit('onClickShare')
    }
]
```

#### Usage
```javascript
import { FileCard, FileCardContainer, getFilesWithKeyword } from '@pitcher/vue-sdk'

// Usage with plain JS, for example connect or something else
const files = [
    {
        id: 1,
        body: 'very long file name is going to be here',
        image: 'https://img.url.com',
        keywords: 'Keyword 1, Keyword 2',
        startDate: '23 June',
        isNew: false,
        isFavorite: true,
        // NOTE: define options only if you need to customize the file options
        options: [
            {
                text: 'custom download text',
                icon: 'download icon thin',
                click: () => emit('onClickDownload')
            },
            {
                text: 'custom share text',
                icon: 'share icon thin',
                click: () => emit('onClickShare')
            }
        ]
    },
    ...
    ...
]

// Usage within Native application
const files = await getFilesWithKeyword('pitcher-keyword')
```

```html
<!-- Simple usage, FileCardContainer is required to keep the box layout align and responsive -->
<FileCardContainer>
    <FileCard
        v-for="f in files"
        :key="f.id"
        :img-url="f.image"
        :body="f.body"
        :keywords="f.keywords"
        :date="f.startDate"
        :is-new="f.isNew"
        :is-favorite="f.isFavorite"
        @onClickImage="openFile(f.id)"
        @onClickFavorite="favoriteFile(f.id)"
        @onClickDownload="download(f)"
        @onClickShare="share(f)"
    />
</FileCardContainer>

<!-- Usage with slot -->
<FileCardContainer>
    <FileCard
        v-for="f in files"
        :key="f.id"
        :img-url="f.image"
        :body="f.body"
        :keywords="f.keywords"
        :date="f.startDate"
        :is-new="f.isNew"
        :is-favorite="f.isFavorite"
        :fileOptionsItems="f.options"
    >
        <template #items>
            <div v-for="(o, i) in f.options" :key="i" class="item" @click.stop="o.click">
                <i class="icon thin" :class="o.icon" />
                <span>{{ o.text }}</span>
            </div>
        </template>
    </FileCard>
</FileCardContainer>

```


### Filter Dropdown
Custom filter component built with Fomantic Dropdown

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `Array` | yes | - | model to track of selected values
| `items` | `Array` | yes | - | object array for filter items.
| `item-text` | `String` | no | 'text' | which property to map as text in your items declaration
| `item-value` | `String` | no | 'value' | which property to map as value in your items declaration
| `title` | `String` | no | undefined | title text that will be shown inside button by default when there is not any value selected
| `return-type` | `String` | no | 'value' | which property of item object will be saved inside model. Saves `item.value` by default. You can use `object` if you want to store whole item object inside v-model
| `icon` | `String` | no | 'filter' | default icon for the button
| `fluid` | `Boolean` | no | undefined | makes the component width fluid `100%` by adding fluid class to the container
| `compact` | `Boolean` | no | undefined | makes the component compact thru adding compact class to the container. Width of dropdown increases/decreases when you select/unselect filters from the dropdown
| `hide-search` | `Boolean` | no | undefined | hide/show search bar inside menu
| `truncate-text` | `Boolean` | no | true | text truncation when the container has multiple selections and no space left inside button.
| `no-data-text` | `String` | no | 'No results' | text to show when there are no items or search results
| `width` | `Number \| String` | no | undefined | fixed width for dropdown button
| `menu-width` | `Number \| String` | no | 300 | fixed width for filter menu 300px defualt
| `scroll-height` | `Number \| String` | no | 250 | scroll height for menu, 250px by default
| `basic` | `Boolean` | no | undefined | adds basic class to the button (fomantic basic button styling)
| `disabled` | `Boolean` | no | undefined | disables the component thru adding disabled class to the container
| `color` | `String` | no | undefined | sets the color of button and some elements inside. (check available colors at Fomantic)
| `inverted` | `Boolean` | no | undefined | adds inverted class to the button and some elements inside to invert colors
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 

#### Available slots
| slot | description | props
| :--- | :--- | :--- |
| `header` | header slot to replace `.h-container` | ```{ closeMenu }```
| `actions` | actions slot to replace `.a-container` | ```{ selectAll, reset }```
| `prepend-list` | slot to prepend content before `.sub-menu` | -
| `append-list` | slot to append content before `.sub-menu` | -

#### Available events
| event | description |
| :--- | :--- |
| `@input` | default v-model input event


#### Definitions
```javascript
 // object array for items, here you define how your data will be presented in the FilterDropdown and what value they will have on selection. You can also simply use a String array.
items: Item[] | String[]

// a single item definition inside items array
item: {
    // The name of your filter item. This will be shown as the name in the menu. Also you can rename text to anything else. Let's say if you change text -> to name and set item-text="name" in your FilterDropdown properties, FilterDropdown will show name property as the text.
    text: String,
    // The value of your filter item that will be saved when you select. Same option as text applies to this property as well, combine with item-value property in FilterDropdown.
    value: String,
    // Type of the FilterDropdown item, default is 'item'
    type: 'item | header | divider',
    // Description for the item
    description: String,
    // to disable FilterDropdown item. NOTE: If you will change this later on the fly, you need to declare disable: false initially
    disabled: Boolean
}
```

#### Usage
```javascript
import { FilterDropdown } from '@pitcher/vue-sdk'

// data that will be presented in dropdown
const items = [
{
    text: 'Cantons',
    type: 'header'
},
{
    text: 'Zürich',
    value: 'zurich',
    description: '10'
},
{
    text: 'Bern',
    value: 'bern',
    disabled: true
},
{
    type: 'divider'
},
{
    text: 'Aargau',
    value: 'aargau',
},
...
...
]

// must be reactive
const selectedFilter = ''
```

```html
<!-- Simple usage -->
<FilterDropdown title="Cities" v-model="selectedFilter" :items="items" />

<!-- Using basic, fluid, fixed menu width, higher scroll-height, smaller -->
<FilterDropdown title="Cities" v-model="selectedFilter" :items="items" basic fluid size="small" menu-width="500px" scroll-height="600px" />
 
<!-- Using different return-type than default, different text property to map -->
<FilterDropdown title="Cities" v-model="selectedFilter" :items="items" return-type="object" item-text="name" />
 
<!-- Usage with slot -->
<FilterDropdown title="Cities" v-model="selectedFilter" :items="items">
    <template #actions="{ selectAll, reset }">
        <button class="ui button" @click="selectAll">Select all</button>
        <button class="ui button" @click="reset">Reset</button>
    </template>
</FilterDropdown>

```


### Modal
Fomantic Modal component

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `any` | yes | - | data to show modal, undefined/null hides, anydata inside shows the modal
| `title` | `String` | no | undefined | Modal header title
| `title-icon` | `String` | no | undefined | FA icon name. Use ONLY icon name i.e. users times etc.
| `approve-text` | `String` | no | undefined | Text for Approve button
| `deny-text` | `String` | no | undefined | Text for Deny button
| `hide-close-icon` | `Boolean` | no | false | Hide close button on the top right. NOTE: This is not shown if title prop is not set
| `basic` | `Boolean` | no | undefined | Basic style modal (Fomantic)
| `fullscreen` | `Boolean` | no | undefined | Fullscreen modal
| `overlay` | `Boolean` | no | undefined | Modal as an overlay
| `inverted` | `Boolean` | no | undefined | Inverted colors on modal
| `scrolling-content` | `Boolean` | no | undefined | Makes the content of modal scrollable no matter how long the scrollHeight of the content
| `image-content` | `Boolean` | no | undefined | Modal Image content style (Fomantic)
| `duration` | `Number` | no | 400 | Animation duration on show/hide
| `align` | `top \| center \| bottom` | no | center | Align modal to top/center/bottom, default is center
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 
| `min-width` | `Number \| String` | no | undefined | min-width css property for input element
| `max-width` | `Number \| String` | no | 100% | max-width css property for input element
| `multiple` | `Boolean` | no | undefined | Allow multiple modals. NOTE: If you combine 2 modals to show multiple, both components must to have multiple prop. allowMultiple prop in Fomantic
| `closable` | `Boolean` | no | true | Allow modal to be closable or not
| `blurring` | `Boolean` | no | false | Modal dimmer makes background blurred
| `content-class` | `String` | no | '' | Inject class to the `div.content`, inside modal
| `approve-class` | `String` | no | 'positive' | Inject class to the approve button. Details: https://fomantic-ui.com/elements/button.html#colored
| `deny-class` | `String` | no | 'negative' | Inject class to the deny button.
| `settings` | `Object` | no | {} | Fomantic modal settings, here you can define extra JS options that are available in Fomantic. Details: https://fomantic-ui.com/modules/modal.html#/settings

#### Available slots
| slot | description |
| :--- | :--- |
| `header` | Slot to overwrite the content of ```.ui.modal > .header```
| `default` | Slot to overwrite the content of ```.ui.modal > .content``` NOTE: No need to use slot for the default slot. Including your content inside <Modal>Content here</Modal> will work.
| `actions` | Slot to overwrite the content of ```.ui.modal > .actions```
| `custom` | Slot to overwrite the content of ```.ui.modal```

#### Available events
| event | description |
| :--- | :--- |
| `@onApprove` | fired when clicked on approve button
| `@onDeny` | fired when clicked on deny button
| `@onClosed` | fired before modal is closed
| `@onHidden` | fired when modal is closed
| `@onShow` | fired when modal will be visible
| `@onVisible` | fired when modal is visible

#### Available functions that you can call on the component
| function name | description |
| :--- | :--- |
| `exec(command)` | helper to call any option on modal. Example: `COMPONENT.exec('can fit')` Details: https://fomantic-ui.com/modules/modal.html#behavior

#### Usage
```javascript
import { Modal } from '@pitcher/vue-sdk'

// must be reactive
const showModal = false
```

```html
<!-- Simple usage -->
<Modal v-model="showModal" title="Register" title-icon="user" approve-text="Submit" deny-text="Cancel">
    <form class="ui form">
        <div class="field">
            <label>First Name</label>
            <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <div class="field">
            <label>Last Name</label>
            <input type="text" name="last-name" placeholder="Last Name" />
        </div>
    </form>
</Modal>
 
<!-- Hiding close icon, Scrolling content, overlay & fullscreen, not closable -->
<Modal v-model="showModal" :closable="false" overlay fullscreen hide-close-icon scrolling-content>
    <div>My Modal Content</div>
</Modal>

<!-- Injecting classes to content, approve/deny buttons -->
<Modal v-model="showModal" content-class="d-flex fd-row pa-0" approve-class="green" denyClass="red">
    <div>My Modal Content</div>
</Modal>
 
<!-- Usage with slots -->
<Modal v-model="showModal">
    <!-- override actions content -->
    <template #header>
        <i class="setting icon" />
        Settings
    </template>

    <div>My Modal Content</div>

    <!-- override actions content -->
    <template #actions>
        <button class="ui button primary">Submit</button>
    </template>
</Modal>
```


### Numpad Input
Custom component

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `v-model` | `String \| Number` | yes | - | input value
| `lazy` | `Boolean` | no | undefined | set v-model value on blur event. This is useful if you do calculations based on your v-model value after updating it
| `decimals` | `Number` | no | 2 | decimal value for input
| `max` | `Number` | no | undefined | maximum number that input can reach
| `min-width` | `Number \| String` | no | 50 | min-width css property for input element
| `max-width` | `Number \| String` | no | 100% | max-width css property for input element
| `group` | `String` | no | no-group | for grouping inputs & navigate thru numpad buttons
| `fluid` | `Boolean` | no | undefined | makes the input fluid
| `transparent` | `Boolean` | no | undefined | fomantic transparent input style
| `disabled` | `Boolean` | no | undefined | disabled input
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 
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


### Progress Bar
Fomantic Progress Bar component

#### Available props
| prop | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| `value` | `Number \| String` | yes | - | model to track the value of the progressbar
| `total` | `Number \| String` | no | 100 | total number to completion of progress
| `show-progress` | `Boolean` | no | true | shows progress percentage on progress bar
| `progress-center` | `Boolean` | no | undefined | centers the progress percentage on progress bar
| `show-label` | `Boolean` | no | false | shows label under progress bar. Has a slot option if needed the customise label
| `indicating` | `Boolean` | no | undefined | Fomantic indicating option
| `auto-success` | `Boolean` | no | true | Fomantic autoSuccess setting. Makes the bar green when completed
| `indicating` | `Boolean` | no | undefined | Fomantic indicating option, adds indicating class to the container
| `loading` | `Boolean` | no | false | sets the progress bar to loading state thru adding loading class to the container
| `disabled` | `Boolean` | no | undefined | disables progress bar thru adding disabled class to the container
| `animate` | `Boolean` | no | false | disable/enable progress bar animation
| `color` | `String` | no | undefined | Color of the progress bar. Details: https://fomantic-ui.com/modules/progress.html#color
| `size` | `String` | no | medium | mini \| tiny \| small \| medium \| large \| big \| huge \| massive 
| `max-width` | `Number \| String` | no | 100% | max-width css property for input element
| `settings` | `Object` | no | undefined | Fomantic progress bar settings, here you can define extra JS options that are available in Fomantic. Details: https://fomantic-ui.com/modules/progress.html#/settings
| `attached` | `top \| bottom` | no | undefined | Fomantic attached option. Accepts only top or bottom, however this does not work properly in some cases. You might need to customise thru css to get a better look.

#### Available slots
| slot | description |
| :--- | :--- |
| `label` | Label slot to replace the content of `.label`. Has `{percent, value, total}` props.

#### Available events
| event | description |
| :--- | :--- |
| `@onChange` | fired when something is changed in progress bar
| `@onSuccess` | fired when the progress is completed
| `@onActive` | fired when progress bar is active
| `@onError` | fired on error
| `@onWarning` | fired on warning

#### Available functions that you can call on the component
| function name | description |
| :--- | :--- |
| `setProgressState(state, text, keepState = false)` | helper to call `$().progress('set STATE')` function. Example: `COMPONENT.setProgressState('warning', 'something is wrong', false)`
| `exec(command, argument)` | helper to call any option on progress bar. Example: `COMPONENT.exec('get percent')`

#### Usage
```javascript
import { ProgressBar } from '@pitcher/vue-sdk'

// must be reactive
const value = 0
```

```html
<!-- Simple usage -->
<ProgressBar :value="value" />

<!-- Changing total, showing label, setting color -->
<ProgressBar :value="value" :total="100" color="blue" show-label />

<!-- Hiding progress text, setting size -->
<ProgressBar :value="value" :show-progress="false" size="tiny" />
 
<!-- Using fomantic classes & custom label slot -->
<ProgressBar :value="value" :total="200">
    <template #label="{ percent, value, total }">
        percent: {{ percent }} value: {{ value }} total: {{ total }}
    </template>
</ProgressBar>
```


### Sidebar
Fomantic Sidebar component

```javascript
import { Sidebar } from '@pitcher/vue-sdk'
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
     return { data }
}
```

and somewhere else:

```javascript
import { Sidebar } from '@pitcher/vue-sdk'

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
        <Header />
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
