import { fireEvent } from '../../src/event'
import { openLink } from '../../src/utils'
import { getFilesWithKeyword } from '../../src/files'

jest.mock('../../src/event')
jest.mock('../../src/files')

describe('link', () => {
    it('links', async () => {
        fireEvent.mockResolvedValue()
        getFilesWithKeyword.mockResolvedValue([{ vUrl: 'myurl', ID: '11111', body: 'title' }])
        await openLink('pitcher://myKeyword?hello=world')
        expect(fireEvent.mock.calls.length).toBe(1)

        expect(fireEvent).toHaveBeenCalledWith('launchContentWithID', {
            "currentID": undefined,
            "fileID": "11111",
            "forceChange": false,
            "parameters": { "hello": "world" },
            "subId": 0,
        })

        await openLink('pitcher://myKeyword2/?hello2=world2')
        expect(fireEvent).toHaveBeenCalledWith('launchContentWithID', {
            "currentID": undefined,
            "fileID": "11111",
            "forceChange": false,
            "parameters": { "hello2": "world2" },
            "subId": 0,
        })
    })

})
