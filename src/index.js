// This is required to be able to use this package as an external package.
// Otherwise it causes to throw error in the packages that are using this package as a dependency
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

export * from './db/contextQuery.js'
export * from './db/query.js'
export * from './db/sfdcField.js'
export * from './db/sfdcLayout.js'
export * from './db/sfdcSchema.js'

export * from './i18n/date.js'
export * from './i18n/i18n.js'
export * from './i18n/number.js'

export * from './config.js'
export * from './detailing.js'
export * from './event.js'
export * from './files.js'
export * from './params.js'
export * from './platform.js'

export * from './utils/link.js'
export * from './utils/contextExec.js'
export * from './utils/contextExec.js'
export * from './utils/renderContext.js'

// Vue Components
import Calendar from './components/Calendar.vue'
import Dropdown from './components/Dropdown.vue'
import ObjectForm from './components/ObjectForm.vue'
import ObjectFormField from './components/ObjectFormField.vue'
import TransitionPage from './components/TransitionPage.vue'

// Mixins
import ModalMixin from './semantic/mixins/modal.js'

export { Calendar, Dropdown, ObjectForm, ObjectFormField, TransitionPage, ModalMixin }
