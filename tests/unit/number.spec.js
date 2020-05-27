import { useParamsStore } from '../../src/params'
import { formatCurrency, formatDate, formatDecimal, formatPercent, useI18nStore } from '../../src'

jest.mock('../../src/i18n/i18n')

describe('numbers', () => {
    it('currency', () => {
        let resp = { state: { locale: null } }
        useI18nStore.mockReturnValue(resp)
        expect(() => {
            formatCurrency()
        }).toThrow()
        resp = { state: { locale: 'de-CH' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatCurrency(100, 'CHF')).toBe('CHF 100.00')
        resp = { state: { locale: 'en-US' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatCurrency(55000.578, 'USD')).toBe('$55,000.58')
    })

    it('decimal', () => {
        let resp = { state: { locale: null } }
        useI18nStore.mockReturnValue(resp)
        expect(() => {
            formatDecimal()
        }).toThrow()
        resp = { state: { locale: 'de-CH' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatDecimal(100.512321)).toBe('100.5')
        expect(formatDecimal(100.512321, 2)).toBe('100.51')
        expect(formatDecimal(100)).toBe('100')
        resp = { state: { locale: 'en-US' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatDecimal(100.512321)).toBe('100.5')
    })

    test('percent', () => {
        let resp = { state: { locale: null } }
        useI18nStore.mockReturnValue(resp)
        expect(() => {
            formatPercent()
        }).toThrow()
        resp = { state: { locale: 'de-CH' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatPercent(33.33333)).toBe('33.3')
        expect(formatPercent(33.33333, 2)).toBe('33.33')
        resp = { state: { locale: 'en-US' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatPercent(33.33333)).toBe('33.3')
    })
})
