import { assign } from '@/utils/assign'

const data = {
  one: 'a',
  two: 'b',
  three: 'c',
  four: 'd'
}

describe('assign utility method', () => {
  it('assigns values only if they exist in the target object', () => {
    const obj = {
      one: 'test',
      foo: 'bar'
    }
    assign(data, obj)
    expect(obj).toEqual({
      one: 'a',
      foo: 'bar'
    })
  })

  it('does not assign values to an empty object', () => {
    const obj = {}
    assign(data, obj)
    expect(obj).toEqual({})
  })

  it('returns undefined when used as a data assignment method', () => {
    const obj = {
      one: 'a'
    }
    const res = assign(data, obj)
    expect(res).toBeUndefined()
  })
})
