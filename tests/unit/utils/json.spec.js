import { isStringifiedTruthy } from '@/utils/json'

describe('json utility methods', () => {
  describe('isStringifiedTruthy', () => {
    it.each([
      ['1', true],
      ['true', true],
      ['True', true],
      ['TRUE', true],
      ['{}', true],
      ['[]', true],
      [[], true],
      [{}, true],
      [1, true],
      [() => {}, true],
      [true, true],
      ['0', false],
      ['', false],
      ['null', false],
      ['undefined', false],
      ['false', false],
      ['False', false],
      ['FALSE', false],
      [false, false],
    ])('handles %s as the input', (text, expected) => {
      expect(isStringifiedTruthy(text)).toBe(expected)
    })
  })
})
