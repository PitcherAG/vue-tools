
## getParameters

in your App.vue you need to call loadParams on mounted and then you can use the useParamsStore() function anywhere else:
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
