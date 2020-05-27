import { trans, TranslationPlugin, useI18nStore } from '../../src'
import Vue from 'vue'

describe('i18n', () => {
    it('translations', () => {
        const store = useI18nStore()
        Vue.use(TranslationPlugin)
        const translations = {
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
        store.patch(translations)
        store.setLanguage('en', false)
        expect(trans('Save')).toBe('Save')
        store.setLanguage('es', false)
        expect(trans('Save')).toBe('Guardar')
        expect($gettext('Save')).toBe('Guardar')
    })

    it('plurals', () => {
        const store = useI18nStore()
        Vue.use(TranslationPlugin)
        const translations = {
            messages: {
                en_US: {
                    Ticket: ['Ticket', 'Tickets']
                }
            }
        }
        store.patch(translations)
        store.setLanguage('en_US', false)
        expect($ngettext('Ticket', 1)).toBe('Ticket')
        expect($ngettext('Ticket', 2)).toBe('Tickets')
    })

    it('vars in trans', () => {
        const store = useI18nStore()
        Vue.use(TranslationPlugin)
        const translations = {
            messages: {
                en_US: {
                    'I have { a } and { b }.': '',
                    Ticket: ['Ticket', 'Tickets'],
                    'I have {num} Ticket.': ['I have { num } Ticket.', 'I have { num } Tickets.']
                }
            }
        }
        store.patch(translations)
        store.setLanguage('en_US', false)
        expect($ngettext('I have {num} Ticket.', 2, { num: 2 })).toBe('I have 2 Tickets.')
        expect(
            $gettext('I have { a } and { b }.', {
                a: 'apples',
                b: 'oranges'
            })
        ).toBe('I have apples and oranges.')
    })
})
