import { PRESENTATIONS_OBJECT, SERVER_JSON, TI } from './system-dummy-data'

global.jQuery = global.$ = require('jquery')
require('@pitcher/fomantic-ui')

// Setup Ti related stuff
process.env.VUE_APP_TI = JSON.stringify(TI)
process.env.VUE_APP_SERVERJSON = JSON.stringify(SERVER_JSON)
process.env.VUE_APP_PRESENTATIONSOBJECT = JSON.stringify(PRESENTATIONS_OBJECT)

// for testing
if (process.env.VUE_APP_TI) {
  window.Ti = JSON.parse(process.env.VUE_APP_TI)
  window.Ti.App.fireEvent = () => true
}
