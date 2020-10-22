const fs = require('fs')
const gettextParser = require('gettext-parser')
const path = require('path')

function getCategory(translation) {
    if (translation.type == 'package' && translation.packageCategory) {
        return translation.packageCategory
    } else {
        return translation.category
    }
}

function getInputDirname(config, translation) {
    if (translation.type == 'package') {
        const packageConfig = require(path.join(
                process.cwd(),
                'node_modules',
                translation.package,
                'gettext.config.js',
        ))
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

module.exports = {
    getCategory,
    getInputDirname,
    getTranslationData,
}
