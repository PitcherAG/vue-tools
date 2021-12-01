const _ = require('lodash')
const chalk = require('chalk')
const fs = require('fs')
const gettextParser = require('gettext-parser')
const path = require('path')
const { Translate } = require('@google-cloud/translate').v2

const translate = new Translate()

function formatForTranslation(str) {
  return str
    .replace(/\\n/g, '<br>')
    .replace(/{\S+}/, (match) => `<span class="notranslate">${match}</span>`)
    .replace('%s', '{0}')
}

function formatFromTranslation(str) {
  return str
    .replace(/<br>/g, '\n')
    .replace(/<span class="notranslate">({\S+})<\/span>/, (match, label) => label)
    .replace('{0}', '%s')
}

async function parseFile(file) {
  const data = fs.readFileSync(file)

  return gettextParser.po.parse(data)
}

async function translateConfig(config, onlyGeneratePO) {
  const [languages] = onlyGeneratePO ? [] : await translate.getLanguages()
  const output = config.output && config.output.po ? config.output.po : 'locale'

  for (const t of config.translations) {
    console.log(
      `[${onlyGeneratePO ? 'config-gettext-generate' : 'config-gettext-translate'}] 
      ${onlyGeneratePO ? 'generating .po files for' : 'translating'} ${t.category}`
    )

    for (const language in config.languages) {
      if (!onlyGeneratePO && !languages.find(l => l.code === language)) {
        console.error(chalk.red`[config-gettext-translate] language ${language} not supported`)
        continue
      }

      if (t.type === 'source') {
        await translateFile(
          path.join(output, `${t.category}.pot`),
          language,
          path.join(output, language, 'LC_MESSAGES', `${t.category}.po`),
          onlyGeneratePO
        )
      }
    }
  }
}

async function translateFile(file, language, output, onlyGeneratePO) {
  const pot = await parseFile(file)
  const po = await parseFile(fs.existsSync(output) ? output : file)

  po.headers.Language = language

  // add new messages
  for (const msgid of Object.keys(pot.translations[''])) {
    if (!po.translations[''][msgid]) {
      po.translations[''][msgid] = Object.assign({}, pot.translations[''][msgid])
    }
  }

  // remove missing messages
  for (const msgid of Object.keys(po.translations[''])) {
    if (!pot.translations[''][msgid]) {
      delete po.translations[''][msgid]
    }
  }

  if (!onlyGeneratePO) {
    // translate empty message strings
    const msgids = Object.keys(_.pickBy(po.translations[''], msg => msg.msgid && !msg.msgstr[0]))

    console.log(chalk.grey`[config-gettext-translate] ${language} has ${msgids.length} untranslated messages`)

    if (msgids.length) {
      const translations = await translateMessages(msgids, language)

      translations.forEach((t, i) => {
        if (t) {
          const item = po.translations[''][msgids[i]]

          item.msgstr = t

          if (!item.comments) {
            item.comments = {}
          }

          item.comments.flag = 'fuzzy'
        }
      })
    }
  }

  if (!fs.existsSync(path.dirname(output))) {
    fs.mkdirSync(path.dirname(output), { recursive: true })
  }

  fs.writeFileSync(output, gettextParser.po.compile(po))
}

async function translateMessages(messages, language) {
  const input = messages.map(formatForTranslation)
  const [translations] = await translate.translate(input, language)

  return translations.map(formatFromTranslation)
}

module.exports = {
  translateConfig,
  translateFile,
}
