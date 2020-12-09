import { getPath, joinPath } from '@/utils/path'

const obj = {
    a: {
        b: {
            c: 13
        },
        d: () => 'TEST'
    }
}

const data = {
    root: '/',
    home: 'home',
    images: '/images'
}

describe('path utility methods', () => {
    it('get number value from object path', () => {
        const c_value = getPath(obj, 'a.b.c')
        expect(obj.a.b.c).toEqual(c_value)
    })

    it('get function value from object path', () => {
        const function_value = getPath(obj, 'a.d')
        expect(obj.a.d()).toEqual(function_value)
    })

    it('join home path', () => {
        const home = joinPath(data.root, data.home)
        expect(home).toEqual('/home')
    })

    it('join image folder', () => {
        const home = joinPath(data.root, data.home, data.images)
        expect(home).toEqual('/home/images')
    })
})
