#!/usr/bin/env node

const config = require('./config')
const fs = require('fs')
const gettextParser = require('gettext-parser')

if (!fs.existsSync(config.jsonBaseDir)) {
    fs.mkdirSync(config.jsonBaseDir)
}

for (const code of Object.keys(config.availableLanguages)) {
    if (!fs.existsSync(`${config.jsonBaseDir}/${code}`)) {
        fs.mkdirSync(`${config.jsonBaseDir}/${code}`)
    }

    const poInput = fs.readFileSync(`${config.poBaseDir}/${code}/LC_MESSAGES/${config.category}.po`)
    const po = gettextParser.po.parse(poInput)
    const poTranslations = po.translations['']

    const data = Object.keys(poTranslations)
        .filter(i => i)
        .reduce(
            (map, msgid) => ({
                ...map,
                [msgid]: poTranslations[msgid].msgstr[0]
            }),
            {}
        )

    fs.writeFileSync(`${config.jsonBaseDir}/${code}/${config.category}.json`, JSON.stringify(data, null, '  '))
}
