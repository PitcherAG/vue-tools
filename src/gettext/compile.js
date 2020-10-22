const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const {getCategory, getInputDirname, getTranslationData} = require('./common')

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
                Object.assign(data, getTranslationData(path.join(getInputDirname(config, t), l, 'LC_MESSAGES', `${getCategory(t)}.po`)))
            }

            if (!fs.existsSync(path.dirname(output))) {
                fs.mkdirSync(path.dirname(output), { recursive: true })
            }

            fs.writeFileSync(output, JSON.stringify({ [l]: data }))
        }
    }
}

module.exports = {
    compileConfig
}
