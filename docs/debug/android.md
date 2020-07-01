

### Android

Serve the current build with autoreload:
```
npm run serve
```
And in an other command line window:
```
npm run devtools
```


To get your local IP address run:

```
ipconfig getifaddr en0
```

replace `192.168.0.2` with your ip address in this script:

```html
<script>
    window.__VUE_DEVTOOLS_HOST__ = 'http://192.168.0.2'// default: localhost, use IP address of localhost on android
    window.__VUE_DEVTOOLS_PORT__ = '8098' // default: 8098
</script>
<script src="http://192.168.0.2:8098"></script>
```

And place it in your header of your `public/index.html` file.

- open Chrome
- open this url: `chrome://inspect/#devices` and connect to your webview
- open console and enter: `window.location = "192.168.0.2:8000"` (replace 192.168.0.2 with your IP address)

This will no open the version you `serve` and the `devtools` should be able to pick up your components tree.

To download the DB from the simulator run:

```
npm run android pull db 
```

This should download the database files into the project folder under `databases`
Open this files with a SQLLite editor.

To download the log from Android:

```
npm run android logcat
```

This should create a log.txt in the project folder with the logcat output from android
