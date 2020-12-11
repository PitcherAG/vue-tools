import { execBool, execString, renderContext, renderSimpleContext } from '@/utils'

describe('context', () => {
  it('renderContext', async () => {
    let result = renderContext('{{ a }} world', { a: 'hello' })
    expect(result).toBe('hello world')
    result = renderContext('{{ a }} world {{b}}', { a: 'hello', b: '2' })
    expect(result).toBe('hello world 2')
    result = renderContext('{% if a %}{{ a }} world{% endif %}', { a: 'hello' })
    expect(result).toBe('hello world')
    result = renderContext('{%if a%}{{ a }} world{%endif%}', { a: 'hello' })
    expect(result).toBe('hello world')
    result = renderContext('{{ a.join(",")}}', { a: [1, 2] })
    expect(result).toBe('1,2')
  })

  it('simpleContext', async () => {
    let result = renderSimpleContext('{ a } world', { a: 'hello' })
    expect(result).toBe('hello world')
    result = renderSimpleContext('{ a } world {b}', { a: 'hello', b: '2' })
    expect(result).toBe('hello world 2')
    result = renderSimpleContext('{ a.join(",")}', { a: [1, 2] })
    expect(result).toBe('1,2')
  })

  it('execBool', async () => {
    let result = execBool('a > 1', { a: 2 })
    expect(result).toBe(true)
    result = execBool('a > 1 && a < 2', { a: 0 })
    expect(result).toBe(false)
  })

  it('execString', async () => {
    const result = execString('a + " world"', { a: 'hello' })
    expect(result).toBe('hello world')
  })
})
