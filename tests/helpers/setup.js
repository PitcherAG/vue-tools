import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

global.jQuery = global.$ = require('jquery')
require('@pitcher/fomantic-ui')
Vue.use(VueCompositionApi)
