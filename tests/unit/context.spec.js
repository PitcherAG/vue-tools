import { execBool, execString, renderContext } from '../../src/utils'

describe('context', () => {
    it('renderContext', async () => {
        const result = renderContext('{{ a }} world', { 'a': 'hello' })
        expect(result).toBe('hello world')
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
