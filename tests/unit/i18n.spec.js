import { useParamsStore } from '../../src/params'
import {
    formatCurrency,
    formatDate,
    formatDecimal,
    formatPercent,
    provideI18n,
    setLanguage,
    trans, TranslationPlugin,
} from '../../src'
import Vue from 'vue'

jest.mock('../../src/params')

describe('i18n', () => {
    it('date', () => {
        let resp = { locale: { value: 'de-CH' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatDate('2020.02.20')).toBe('20.02.20')
        resp = { locale: { value: 'en-US' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatDate('2020.02.20')).toBe('02/20/20')
    })

    it('currency', () => {
        let resp = { locale: { value: 'de-CH' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatCurrency(100, 'CHF')).toBe('CHF 100.00')
        resp = { locale: { value: 'en-US' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatCurrency(55000.578, 'USD')).toBe('$55,000.58')
    })

    it('decimal', () => {
        let resp = { locale: { value: 'de-CH' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatDecimal(100.512321)).toBe('100.5')
        expect(formatDecimal(100.512321, 2)).toBe('100.51')
        expect(formatDecimal(100)).toBe('100')
        resp = { locale: { value: 'en-US' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatDecimal(100.512321)).toBe('100.5')
    })

    test('percent', () => {
        let resp = { locale: { value: 'de-CH' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatPercent(33.33333)).toBe('33.3')
        expect(formatPercent(33.33333, 2)).toBe('33.33')
        resp = { locale: { value: 'en-US' } }
        useParamsStore.mockReturnValue(resp)
        expect(formatPercent(33.33333)).toBe('33.3')
    })

    it('translations', () => {
        Vue.use(TranslationPlugin)
        const translations = {
            messages: {
                en: {
                    Save: '',
                },
                es: {
                    Save: 'Guardar',
                },
            },
        }
        provideI18n(translations)
        setLanguage('en', false)
        expect(trans('Save')).toBe('Save')
        setLanguage('es', false)
        expect(trans('Save')).toBe('Guardar')
        expect($gettext('Save')).toBe('Guardar')
    })

    it('plurals', () => {
        Vue.use(TranslationPlugin)
        const translations = {
            messages: {
                en_US: {
                    Ticket: ['Ticket', 'Tickets'],
                },
            },
        }
        provideI18n(translations)
        setLanguage('en_US', false)
        expect($ngettext('Ticket', 1)).toBe('Ticket')
        expect($ngettext('Ticket', 2)).toBe('Tickets')
    })

    it('vars in trans', () => {
        Vue.use(TranslationPlugin)
        const translations = {
            messages: {
                en_US: {
                    "I have {{ a }} and {{ b }}.": "",
                    Ticket: ['Ticket', 'Tickets'],
                    "I have {{ num }} Ticket.": ["I have {{ num }} Ticket.", "I have {{ num }} Tickets."],
                },
            },
        }
        provideI18n(translations)
        setLanguage('en_US', false)
        expect($gettext('I have {{ a }} and {{ b }}.', {
            a: 'apples',
            b: 'oranges',
        })).toBe('I have apples and oranges.')
        expect($ngettext('I have {{ num }} Ticket.', 2, { num: 2 })).toBe('I have 2 Tickets.')
    })
})
