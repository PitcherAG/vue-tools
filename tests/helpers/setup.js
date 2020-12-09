import { TI, SERVER_JSON, PRESENTATIONS_OBJECT } from './system-dummy-data'

global.jQuery = global.$ = require('jquery')
require('@pitcher/fomantic-ui')

process.env.VUE_APP_TI = TI
process.env.VUE_APP_SERVERJSON = SERVER_JSON
process.env.VUE_APP_PRESENTATIONSOBJECT = PRESENTATIONS_OBJECT
