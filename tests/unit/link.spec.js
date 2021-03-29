import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { fireEvent } from '@/event'
import { getFilesWithKeyword } from '@/files'
import { openLink } from '@/utils'

const localVue = createLocalVue()

localVue.use(CompositionApi)

jest.mock('@/event')
jest.mock('@/files')

describe('link', () => {
  it('keyword link', async () => {
    fireEvent.mockResolvedValue()
    getFilesWithKeyword.mockResolvedValue([{ vUrl: 'myurl', ID: '11111', body: 'title' }])
    await openLink('pitcher://myKeyword?hello=world')
    expect(fireEvent.mock.calls.length).toBe(1)

    expect(fireEvent).toHaveBeenCalledWith('launchContentWithID', {
      currentID: undefined,
      fileID: '11111',
      forceChange: false,
      parameters: { hello: 'world' },
      subId: 0,
    })

    await openLink('pitcher://myKeyword2/?hello2=world2')
    expect(fireEvent).toHaveBeenCalledWith('launchContentWithID', {
      currentID: undefined,
      fileID: '11111',
      forceChange: false,
      parameters: { hello2: 'world2' },
      subId: 0,
    })
  })

  it('id link', async () => {
    fireEvent.mockResolvedValue()
    getFilesWithKeyword.mockResolvedValue([{ vUrl: 'myurl', ID: '11111', body: 'title' }])
    await openLink('pitcher://12345/?hello2=world2')
    expect(fireEvent).toHaveBeenCalledWith('launchContentWithID', {
      currentID: undefined,
      fileID: '12345',
      forceChange: false,
      parameters: { hello2: 'world2' },
      subId: 0,
    })
  })
})
