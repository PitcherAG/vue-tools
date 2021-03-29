/* eslint-disable no-unused-vars */
import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { formatCurrency, formatDate, formatDecimal, formatPercent, useI18nStore } from '@/'
import { useParamsStore } from '@/params'
const localVue = createLocalVue()

localVue.use(CompositionApi)

jest.mock('@/i18n/i18n')

describe('numbers', () => {
  it('currency', () => {
    const params = useParamsStore()

    params.state.user = { LocaleSidKey: null }
    expect(() => {
      formatCurrency()
    }).toThrow()
    params.state.user = { LocaleSidKey: 'de-CH' }
    expect(formatCurrency(100, 'CHF')).toBe('CHF 100.00')
    params.state.user = { LocaleSidKey: 'en-US' }
    expect(formatCurrency(55000.578, 'USD')).toBe('$55,000.58')
  })

  it('decimal', () => {
    const params = useParamsStore()

    params.state.user = { LocaleSidKey: null }
    expect(() => {
      formatDecimal()
    }).toThrow()
    params.state.user = { LocaleSidKey: 'de-CH' }
    expect(formatDecimal(100.512321)).toBe('100.5')
    expect(formatDecimal(100.512321, 2)).toBe('100.51')
    expect(formatDecimal(100)).toBe('100')
    params.state.user = { LocaleSidKey: 'en-US' }
    expect(formatDecimal(100.512321)).toBe('100.5')
  })

  test('percent', () => {
    const params = useParamsStore()

    params.state.user = { LocaleSidKey: null }
    expect(() => {
      formatPercent()
    }).toThrow()
    params.state.user = { LocaleSidKey: 'de-CH' }
    expect(formatPercent(33.33333)).toBe('33.3')
    expect(formatPercent(33.33333, 2)).toBe('33.33')
    params.state.user = { LocaleSidKey: 'en-US' }
    expect(formatPercent(33.33333)).toBe('33.3')
  })
})
