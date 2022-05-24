import { getOrElse } from '@/utils/functional'

describe('functional utility methods', () => {
  describe('getOrElse', () => {
    it("returns expression's result if all goes well", () => {
      expect(getOrElse(() => true, false)).toBe(true)
    })

    describe('when expression throws', () => {
      it('returns second parameter', () => {
        expect(
          getOrElse(() => {
            throw new Error('failed!')
          }, false)
        ).toBe(false)
      })

      it("returns second parameter's result", () => {
        expect(
          getOrElse(
            () => {
              throw new Error('failed!')
            },
            () => false
          )
        ).toBe(false)
      })

      it("throws if second parameter's expression throws", () => {
        expect(() =>
          getOrElse(
            () => {
              throw new Error('failed!')
            },
            () => {
              throw new Error('failed in orElse!')
            }
          )
        ).toThrow()
      })
    })
  })
})
