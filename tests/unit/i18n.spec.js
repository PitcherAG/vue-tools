import Vue from 'vue'
import { trans, TranslationPlugin, useI18nStore } from '@/'
import { createLocalVue } from '@vue/test-utils'
import CompositionApi from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(CompositionApi)

describe('i18n', () => {
  it('translations', () => {
    const store = useI18nStore()
    Vue.use(TranslationPlugin)
    const translations = {
      availableLanguages: {
        en: 'English',
        es: 'Spanish'
      },
      messages: {
        en: {
          Save: ''
        },
        es: {
          Save: 'Guardar'
        }
      },
      locale: 'en'
    }
    Object.assign(store.state, translations)
    store.setLanguage('en', { load: false })
    expect(trans('Save')).toBe('Save')
    store.setLanguage('es', { load: false })
    expect(trans('Save')).toBe('Guardar')
    expect($gettext('Save')).toBe('Guardar')
  })

  it('plurals', () => {
    const store = useI18nStore()
    Vue.use(TranslationPlugin)
    const translations = {
      availableLanguages: {
        en_US: 'English (US)'
      },
      messages: {
        en_US: {
          Ticket: ['Ticket', 'Tickets']
        }
      }
    }
    Object.assign(store.state, translations)
    store.setLanguage('en_US', { load: false })
    expect($ngettext('Ticket', 1)).toBe('Ticket')
    expect($ngettext('Ticket', 2)).toBe('Tickets')
  })

  it('vars in trans', () => {
    const store = useI18nStore()
    Vue.use(TranslationPlugin)
    const translations = {
      availableLanguages: {
        en_US: 'English (US)'
      },
      messages: {
        en_US: {
          'I have { a } and { b }.': '',
          Ticket: ['Ticket', 'Tickets'],
          'I have {num} Ticket.': ['I have { num } Ticket.', 'I have { num } Tickets.']
        }
      }
    }
    Object.assign(store.state, translations)
    store.setLanguage('en_US', { load: false })
    expect($ngettext('I have {num} Ticket.', 2, { num: 2 })).toBe('I have 2 Tickets.')
    expect(
      $gettext('I have { a } and { b }.', {
        a: 'apples',
        b: 'oranges'
      })
    ).toBe('I have apples and oranges.')
  })
})
