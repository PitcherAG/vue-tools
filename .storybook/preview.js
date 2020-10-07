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
      order: ['Welcome', 'Documentation', 'How Tos', 'Components'],
    }
  }
}

Vue.use(VueCompositionApi)
Vue.use(TranslationPlugin, { availableLanguages: { en: {}} })