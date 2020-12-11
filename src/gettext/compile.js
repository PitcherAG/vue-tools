const _ = require('lodash')
const fs = require('fs')
const gettextParser = require('gettext-parser')
const path = require('path')

function compileConfig(config) {
  const groupedByCategory = _.groupBy(config.translations, 'category')
  const outputRoot = config.output && config.output.json ? config.output.json : 'public/translations'

  for (const c in groupedByCategory) {
    console.log(`[config-gettext-compile] compiling ${c}`)
    const translations = groupedByCategory[c]

    for (const l in config.languages) {
      const data = {}
      const output = path.join(outputRoot, l, `${c}.json`)

      for (const t of translations) {
        Object.assign(
          data,
          getTranslationData(path.join(getInputDirname(config, t), l, 'LC_MESSAGES', `${getCategory(t)}.po`))
        )
      }

      if (!fs.existsSync(path.dirname(output))) {
        fs.mkdirSync(path.dirname(output), { recursive: true })
      }

      fs.writeFileSync(output, JSON.stringify({ [l]: data }))
    }
  }
}

function getTranslationData(path) {
  const data = {}
  const input = fs.readFileSync(path)
  const po = gettextParser.po.parse(input)

  for (const msgid in po.translations['']) {
    if (msgid && po.translations[''][msgid].msgstr[0]) {
      data[msgid] = po.translations[''][msgid].msgstr[0]
    }
  }

  return data
}

function getCategory(translation) {
  if (translation.type == 'package' && translation.packageCategory) {
    return translation.packageCategory
  } else {
    return translation.category
  }
}

function getInputDirname(config, translation) {
  if (translation.type == 'package') {
    const packageConfig = require(path.join(process.cwd(), 'node_modules', translation.package, 'gettext.config.js'))
    return path.join('node_modules', translation.package, getInputDirnameDefault(packageConfig))
  } else {
    return getInputDirnameDefault(config)
  }
}

function getInputDirnameDefault(config) {
  if (config.output && config.output.po) {
    return config.output.po
  } else {
    return 'locale'
  }
}

module.exports = {
  compileConfig
}
