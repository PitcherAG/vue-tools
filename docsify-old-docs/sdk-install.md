## SDK Installation

### Dependencies

On your project, be sure that you have these dependencies installed
```
- "vue": "^2.6.11"
- "@vue/composition-api": "^0.5.0"
- "sass": "^1.26.3" (devDependency)
- "sass-loader": "^8.0.2" (devDependency)
```
  

 If you only miss SASS run
 ```bash
 npm install -D sass sass-loader
 ```

### Installation
```bash
npm install @pitcher/vue-sdk
```

Make sure that you have
```javascript
transpileDependencies: ['@pitcher/vue-sdk', 'fuse.js']
```
in your vue.config.js as a root property.

 