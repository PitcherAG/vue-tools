
### iOS

Get the file id of your file from admin (example: 720440)

in package.json replace `HERECOMESMYFILEID` with your file id 

run:
```
npm run ios watch
```
And in an other command line window:
```
npm run devtools
```

Be sure you have something like this in your public/index.html header:

```html
<script>
    window.__VUE_DEVTOOLS_HOST__ = 'http://localhost'// default: localhost, use IP address of localhost on android
    window.__VUE_DEVTOOLS_PORT__ = '8098' // default: 8098
</script>
<script src="http://localhost:8098"></script>
```

- open safari
- connect safari debugger to webview


This will no open the version you `build` and the `devtools` should be able to pick up your components tree.

Warning: You still need to refresh (command R from Safari debugger) to reload new versions

To find the local DB for debug run this:

```
find ~/Library/Developer/CoreSimulator/Devices -name pitcher.sql
```

Open this file with a SQLLite editor.
