import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { TranslationPlugin } from '../../src'

global.jQuery = global.$ = require('jquery')
require('@pitcher/fomantic-ui')
Vue.use(VueCompositionApi)
Vue.use(TranslationPlugin)
