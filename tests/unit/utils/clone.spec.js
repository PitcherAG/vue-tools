import { clone } from '@/utils/clone'

const data = {
  one: 'a',
  two: 'b',
  three: 'c',
  four: 'd'
}

const dataDeep = {
  one: 'a',
  two: {
    three: {
      four: 'd'
    }
  }
}

describe('clone utility method', () => {
  it('copies all attributes in the target object', () => {
    const res = clone(data)
    expect(res).toEqual(data)
  })

  it('returns the source argument when the source is null', () => {
    const res = clone(null)
    expect(res).toEqual(null)
  })

  it('returns the source argument when the source is not an object', () => {
    const res1 = clone('test')
    const res2 = clone(100)
    expect(res1).toEqual('test')
    expect(res2).toEqual(100)
  })

  it('does not perform a deep copy', () => {
    const testData = JSON.parse(JSON.stringify(dataDeep))
    const res = clone(testData)
    testData.two.three.four = 'changed'
    expect(res.two.three.four).toEqual('changed')
  })

  it('throws an error when the object does not have own properties', () => {
    const a = () => {
      const data = Object.create(null)
      const res1 = clone(data)
    }
    const b = () => {
      const data = Object.create(undefined)
      const res2 = clone(data)
    }
    expect(a).toThrow(TypeError)
    expect(b).toThrow(TypeError)
  })

  it('does not copy attributes defined with define property', () => {
    const testData = JSON.parse(JSON.stringify(dataDeep))
    Object.defineProperty(testData, 'test', {
      enumerable: false,
      writable: true
    })
    testData.test = 'test value'
    const res = clone(testData)
    expect(res).toEqual(testData)
    expect(res.test).toBeUndefined()
  })

  it('does not copy attributes that are inherited from the prototype', () => {
    const testData = Object.create({ name: 'inherited' })
    const res = clone(testData)
    expect(res).toEqual({})
  })
})
