Save & Resume of state
==

SaveLocal
---

To save something locally in the db:

```javascript
const data = {hello:'world'}
saveLocal('myId', data)
```

To load the same data when the app resumes:

```javascript
const data = await loadLocal('myId')
```
