import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { TranslationPlugin } from '@'
import App from './App.vue'

Vue.config.performance = true
Vue.config.productionTip = false

Vue.use(VueCompositionApi)
Vue.use(TranslationPlugin, { availableLanguages: { en: 'English' } })

// eslint-disable-next-line vue/require-name-property
new Vue({
  render: h => h(App)
}).$mount('#app')
