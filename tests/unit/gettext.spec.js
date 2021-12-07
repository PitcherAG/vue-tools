const fs = require('fs')
const gettextParser = require('gettext-parser')
const { compileConfig } = require('../../src/gettext/compile')
const { extractConfig } = require('../../src/gettext/extract')
const { translateConfig } = require('../../src/gettext/translate')

// Skip gettext functionality for now, as it will be moved to github actions
describe.skip('gettext', () => {
  const time = new Date().getTime()

  const config = {
    languages: {
      de: 'Deutsch',
      en: 'English',
    },
    translations: [{ category: 'app', type: 'source', patterns: [`/tmp/${time}.js`] }],
    output: {
      po: `/tmp/${time}/po`,
      json: `/tmp/${time}/json`,
    },
  }

  fs.mkdirSync(`/tmp/${time}/po`, { recursive: true })
  fs.mkdirSync(`/tmp/${time}/json`, { recursive: true })
  fs.writeFileSync(`/tmp/${time}.js`, '$gettext("Hello World!")')

  function parseFile(path) {
    const data = fs.readFileSync(path)

    return gettextParser.po.parse(data)
  }

  it('test basic functionality', async () => {
    await extractConfig(config)
    await translateConfig(config)
    await compileConfig(config)

    const pot = parseFile(`/tmp/${time}/po/app.pot`)

    expect(pot.translations['']).toHaveProperty('Hello World!')

    const po = parseFile(`/tmp/${time}/po/de/LC_MESSAGES/app.po`)

    expect(po.translations['']).toHaveProperty('Hello World!')
    expect(po.translations['']['Hello World!'].msgstr[0]).toEqual('Hallo Welt!')

    const json = fs.readFileSync(`/tmp/${time}/json/de/app.json`).toString()

    expect(json).toEqual('{"de":{"Hello World!":"Hallo Welt!"}}')
  })
})
