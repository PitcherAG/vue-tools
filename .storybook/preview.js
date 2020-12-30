import { themes } from '@storybook/theming';
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { TranslationPlugin } from '../src/i18n/i18n.js'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  docs: {
    theme: themes.dark,
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'How Tos',
        [
          'How to debug',
          'How to start a new project',
          'How to deploy',
          'How to change these docs',
          'Development Pitcher Impact on iOS'
        ],
        'Documentation',
        [
          'SDK Installation',
          'Initialization',
          'Events and Ti.App',
          'State Management',
          'DB Queries',
          'Save & Resume',
          'ServerJSON',
          'Instance',
          'Config',
          'Files',
          'Internationalization and translations',
          'Utils',
          'Mixins'
        ],
        'Components'
      ],
    }
  }
}

Vue.use(VueCompositionApi)
Vue.use(TranslationPlugin, { availableLanguages: { en: {}} })