import { formatDate, useParamsStore } from '@/'
import { createLocalVue } from '@vue/test-utils'
import CompositionApi from '@vue/composition-api'
const localVue = createLocalVue()
localVue.use(CompositionApi)

jest.mock('@/i18n/i18n')

describe('i18n', () => {
  it('date', () => {
    const params = useParamsStore()
    params.state.user = { LocaleSidKey: 'de-CH' }
    expect(formatDate('2020-02-20')).toBe('20.02.20')
    params.state.user = { LocaleSidKey: 'en-US' }
    expect(formatDate('2020-05-11T19:12:11.000+0000')).toBe('05/11/20')
    expect(formatDate('2020-02-20')).toBe('02/20/20')
    expect(formatDate()).toBe('')
    expect(formatDate('abcdfef')).toBe('Invalid Date')
    params.state.user = { LocaleSidKey: null }
    expect(() => {
      formatDate('2020-02-20')
    }).toThrow()
  })
})
