
## getParameters
To get parameters from Impact, you **MUST** to use ```loadParams()``` in the start point of your application. When you use ```loadParams()``` function, the SDK injects ```window.getParameters``` function for Impact to be able to call the function and inject ```params```. 

After calling ```loadParams()```, we can use the ```useParamsStore()``` function anywhere in the application. The best part with the ```useParamsStore()``` is that it is **reactive**, which means that if you mutate anything inside the store, it will be updated anywhere else.

#### Example - usage with useParamsStore()
 
*App.vue*
 ```javascript
import { onMounted } from '@vue/composition-api'
import { loadParams, useParamsStore } from '@pitcher/vue-sdk'

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
 
#### Example - usage with useParams()
If you only need to use params, and you don't need the store, you can use ```useParams()``` to get ```params``` only.
 
*App.vue*
 ```javascript
import { onMounted } from '@vue/composition-api'
import { loadParams, useParams } from '@pitcher/vue-sdk'

export default {
        name: 'app',
        setup() {
            console.log('App setup')
            onMounted(async () => {
                console.log('on App mounted')
                await loadParams()
                const params = useParams()
                console.log(params.Account.Id)
            })
        }
    }
```
 

## serverJSON
To get serverJSON from Pitcher Connect, you **MUST** to use ```loadServerJSON()``` in the start point of your application. When you use ```loadServerJSON()``` function, the SDK injects ```window.setMainNav```, ```window.gotJSON```, ```window.loadPresentations``` and ```window.showUI``` functions for Connect to be able to work.

After calling ```loadServerJSON()```, we can use ```useServerJSONStore()``` function anywhere in the application.
 
#### Example - usage with useServerJSONStore()
 
*App.vue*
 ```javascript
import { onMounted } from '@vue/composition-api'
import { loadServerJSON, useServerJSONStore } from '@pitcher/vue-sdk'

export default {
        name: 'app',
        setup() {
            console.log('App setup')
            onMounted(async () => {
                console.log('on App mounted')
                await loadServerJSON()
                const serverJSONStore = useServerJSONStore()
                console.log(serverJSONStore.state.files)
                console.log(serverJSONStore.state.appID)
            })
        }
    }
```
 
#### Example - usage with useServerJSON()
If you only need to use the data inside ```serverJSON```, and you don't need the store, you can use ```useServerJSON()``` to get ```serverJSON``` only.
 
*App.vue*
 ```javascript
import { onMounted } from '@vue/composition-api'
import { loadServerJSON, useServerJSONStore } from '@pitcher/vue-sdk'

export default {
        name: 'app',
        setup() {
            console.log('App setup')
            onMounted(async () => {
                console.log('on App mounted')
                await loadServerJSON()
                const serverJSONStore = useServerJSON()
                console.log(serverJSONStore.files)
                console.log(serverJSONStore.appID)
            })
        }
    }
```