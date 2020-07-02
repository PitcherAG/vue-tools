#!/usr/bin/env node
const config = require('./config')
const {compileConfig} = require('./compile')

compileConfig(config)

/*
#!/usr/bin/env node

const config = require('./config')
const fs = require('fs')
const gettextParser = require('gettext-parser')
const path = require('path')



if (!fs.existsSync(config.jsonBaseDir)) {
    fs.mkdirSync(config.jsonBaseDir)
}

// const groupedByCategory = _.groupBy(config.translations, 'category')
//
// for (const category in groupedByCategory) {
//     console.log(category, groupedByCategory[category])
// }

function compile(_config, {append = false, poBaseDir = _config.poBaseDir} = {}) {
    for (const code of Object.keys(_config.availableLanguages)) {
        if (!fs.existsSync(`${_config.jsonBaseDir}/${code}`)) {
            fs.mkdirSync(`${_config.jsonBaseDir}/${code}`)
        }

        writePortableObjectFile(
                `${_config.jsonBaseDir}/${code}/${_config.category}.json`,
                readPortableObjectFile(`${_config.poBaseDir}/${code}/LC_MESSAGES/${_config.category}.po`),
        )
    }
}

function readPortableObjectFile(path) {
    const poInput = fs.readFileSync(path)
    const po = gettextParser.po.parse(poInput)
    const poTranslations = po.translations['']

    return Object.keys(poTranslations)
            .filter(i => i)
            .reduce((map, msgid) => ({
                ...map,
                [msgid]: poTranslations[msgid].msgstr[0],
            }), {})
}

function writePortableObjectFile(path, data) {
    fs.writeFileSync(`${config.jsonBaseDir}/${code}/${config.category}.json`, JSON.stringify(data, null, '  '))
}

for (const category of config.allCategories()) {
    compile(category)
}

for (const importCategoryName in config.importCategories) {
    if (!config.importCategories.hasOwnProperty(importCategoryName)) {
        continue
    }

    const importConfigPackage = config.importCategories[importCategoryName]
    const importConfigPath = path.join('node_modules', importConfigPackage, 'gettext.config.js')
    const importConfig = require(importConfigPath)
    const importCategoryConfig = importConfig.categories.find(c => c.category == importCategoryName)

    if (!importCategoryConfig) {
        console.error(`category ${importCategoryName} not found in ${config.importCategories[importCategoryName]}`)
        continue
    }

    compile(importCategoryConfig, {
        append: true,
        poBaseDir: path.join('node_modules', importConfigPackage, importCategoryConfig.poBaseDir),
    })
}
*/
