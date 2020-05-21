import { formatDate, useI18nStore } from '../../src'

jest.mock('../../src/i18n/i18n')

describe('i18n', () => {
    it('date', () => {
        let resp = { state: { locale: 'de-CH' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatDate('2020-02-20')).toBe('20.02.20')
        resp = { state: { locale: 'en-US' } }
        useI18nStore.mockReturnValue(resp)
        expect(formatDate("2020-05-11T19:12:11.000+0000")).toBe("05/11/20")
        expect(formatDate('2020-02-20')).toBe('02/20/20')
        expect(formatDate()).toBe('')
        expect(formatDate('abcdfef')).toBe('Invalid Date')
        resp = { state: { locale: null } }
        useI18nStore.mockReturnValue(resp)
        expect(() => {formatDate('2020-02-20')}).toThrow()
    })
})
