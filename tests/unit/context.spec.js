import { execBool, execString, renderContext } from '../../src/utils'

describe('context', () => {
    it('renderContext', async () => {
        let result = renderContext('{{ a }} world', { 'a': 'hello' })
        expect(result).toBe('hello world')
        result = renderContext('{{ a }} world {{b}}', { 'a': 'hello', 'b':'2'})
        expect(result).toBe('hello world 2')
        result = renderContext('{% if a %}{{ a }} world{% endif %}', { 'a': 'hello' })
        expect(result).toBe('hello world')
        result = renderContext('{%if a%}{{ a }} world{%endif%}', { 'a': 'hello' })
        expect(result).toBe('hello world')
        result = renderContext('{{ a.join(",")}}', { 'a': [1,2] })
        expect(result).toBe('1,2')
    })

    it('execBool', async () => {
        let result = execBool('a > 1', { 'a': 2 })
        expect(result).toBe(true)
        result = execBool('a > 1 && a < 2', { 'a': 0 })
        expect(result).toBe(false)
    })

    it('execString', async () => {
        let result = execString('a + " world"', { 'a': 'hello' })
        expect(result).toBe('hello world')
    })

})
