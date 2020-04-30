

## DB Queries



### Query
Queries the local database, handles error handling and will convert results into objects.

Example:

```javascript
import { query } from '@pitcher/vue-sdk'

query('select * from tbl_event_v1').then(e => window.console.log(e))
```


### ContextQuery

Context query uses handlebars template syntax and enriches the query function dramatically. 
As prerequisite it needs `loadConfig()` and `loadParams()` run before calling it the first time.

As a result contextQuery has knowledge about the current environment and provides you with:

- It knows the names of all the table names. `{{ sfdcObjectName }}` will be replaced withe the tablename
- It provides the following objects:
    - `account`
    - `user`
    - `locale`
     
  example: `{{ account.Id }}`
- It provides you with today: `TODAY`
- You can provide extra context via parameters


```javascript


  contextQuery("SELECT * from {{ Account }} \
                WHERE Id='{{ account.id }} AND \    
                ModifiedDate < TODAY AND Name='{{ Name }}'", { Name:'ABCDEF1234' })


```

You can either reference API names of salesforce objects or normal names.
It's a good idea to call `loadConfig()` and `lodParams()` in your `App.vue onMounted()` function first before using contextQuery


### sfdcSchema

needs docs

### sfdcLayout

needs docs

### sfdcField

needs docs
