import { TI, SERVER_JSON, PRESENTATIONS_OBJECT } from './system-dummy-data'

global.jQuery = global.$ = require('jquery')
require('@pitcher/fomantic-ui')

// Setup Ti related stuff
process.env.VUE_APP_TI = JSON.stringify(TI)
process.env.VUE_APP_SERVERJSON = JSON.stringify(SERVER_JSON)
process.env.VUE_APP_PRESENTATIONSOBJECT = JSON.stringify(PRESENTATIONS_OBJECT)
