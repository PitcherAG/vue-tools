
## Utils

### link

opens an other interactive via a 'pitcher link', Example:

`pitcher://keyword/?myParam=5&otherParam={{ a.count}}`

This would open the interactive with the keyword `keyword` and save myParam and otherParam to local storage

```javascript
    import { openLink } from '@pitcher/vue-sdk'
    var link = 'pitcher://keyword/?myParam=5&otherParam={{ a.count}}'
    var context = {a:5}
    openLink(link, context)
```

This would open a file with fileID: `12345`

```javascript
    import { openLink } from '@pitcher/vue-sdk'
    var link = 'pitcher://12345/?myParam=5&otherParam={{ a.count}}'
    var context = {a:5}
    openLink(link, context)
```


### renderContext

renders a handlebars template in a given context

```javascript
import { renderContext } from '@pitcher/vue-sdk'

const obj = {first: "Hello", last:"World"}
const template = "Say: {{ first }} and then {{ last }}"
const result = renderContext(template, obj)
console.log(result) // Say: Hello and then World
    
```



### contextExec

#### ATTENTION: these function are considered unsafe. Be sure that you know what you are doing and that the input is validated.

executes a question template in a give context and returns a Boolean

```javascript
import { execBool } from '@pitcher/vue-sdk'

const obj = {a:5, b:false}
const question = "a > 5 && !b"
const result = execBool(question, obj)
    
``` 
executes a question template in a give context and returns a String

```javascript
import { execString } from '@pitcher/vue-sdk'

let obj = {a:()=>{return 'hello world'}, b:true}
let question = "b : a() ? ''"
let result = execString(question, obj) // hello world
obj = {a:'hello', b:'world'}
question = "a + ' - ' + b"
result = execString(question, obj) // hello - world
``` 

executes a template in a context

```javascript
import { execExecute } from '@pitcher/vue-sdk'

let obj = {a:()=>{return 'hello world'}, b:true}
let question = "alert(a())"
let result = execExecute(question, obj) // hello world
   
``` 
