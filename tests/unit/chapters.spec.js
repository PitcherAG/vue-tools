import CompositionApi from '@vue/composition-api'
import path from 'path'
import { createLocalVue } from '@vue/test-utils'
import { generateCustomDeckChapters } from '@/instance/stores/index'

const localVue = createLocalVue()

localVue.use(CompositionApi)

const presentations = JSON.parse(process.env.VUE_APP_PRESENTATIONSOBJECT)

describe('test chapter generation', () => {
  beforeEach(() => {
    // Mock fetch function
    global.fetch = jest.fn((path) =>
      Promise.resolve({
        json: () => Promise.resolve(require(path)),
      })
    )
  })

  it('chapter generation should fail with wrong path', async () => {
    // try/catch inside generateCustomDeckChapters, when there is not a chapters.json/setup.json file
    // and it will throw multiple error/warning messages. DISABLE if you need to see errors/warnings
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    await generateCustomDeckChapters(presentations)
    const customDecks = presentations.filter((p) => p.isCustom)

    customDecks.forEach((d) => {
      expect(d.chapters).toMatchObject({ chapters: [] })
      expect(d.setupJSON).toBe(null)
    })
  })

  it('chapter generation should work', async () => {
    // Mock document path
    window.documentPath = path.resolve(process.cwd(), 'tests/helpers')

    await generateCustomDeckChapters(presentations)
    const customDecks = presentations.filter((p) => p.isCustom)

    customDecks.forEach((d) => {
      expect(d.chapters.chapters.length).toBeGreaterThan(0)
      expect(d.setupJSON).not.toBe(null)
    })
  })
})
