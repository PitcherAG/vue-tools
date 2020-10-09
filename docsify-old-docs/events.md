
## Ti.App.fireEvent

fireEvent replaces Ti.App.fireEvent in an asynchronous way. You will not need to provide any callbacks anymore as this will 
be handled internally and unique callbacks will be generated. This also eliminates bugs where 2 events fire for the same callback
function.

Example:


```javascript
import { fireEvent } from '@pitcher/vue-sdk'

fireEvent('dbFunction', {
    'query': query,
    'pType': 'query',
    'db': 'pitcher',
}).then((result) => {
    ...
})
```


A Documentation of all the possible Ti.App Events can be found here:

https://pitcherag.github.io/Pitcher-Ti.App-Docs/

