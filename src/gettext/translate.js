#!/usr/bin/env node

const _ = require('lodash')
const config = require('./config')
const fs = require('fs')
const gettextParser = require('gettext-parser')
const { Translate } = require('@google-cloud/translate').v2

function formatForTranslation(str) {
    return str.replace(/\\n/g, '<br>')
            .replace(/{\S+}/, match => `<span class="notranslate">${match}</span>`)
            .replace('%s', '{0}')
}

function formatFromTranslation(str) {
    return str.replace(/<br>/g, '\n')
            .replace(/<span class="notranslate">({\S+})<\/span>/, (match, label) => label)
            .replace('{0}', '%s')
}

async function main() {
    const translate = new Translate()

    const [languages] = await translate.getLanguages()

    const potPath = `${config.poBaseDir}/${config.category}.pot`
    const potInput = fs.readFileSync(potPath)
    const pot = gettextParser.po.parse(potInput)
    const potTranslations = pot.translations['']

    for (const code of Object.keys(config.availableLanguages)) {
        if (!languages.find(l => l.code === code)) {
            console.error(`unsupported language: ${code}`)
            continue
        }

        const poDir = `${config.poBaseDir}/${code}/LC_MESSAGES`
        const poPath = `${poDir}/${config.category}.po`

        if (!fs.existsSync(`${config.poBaseDir}/${code}/LC_MESSAGES`)) {
            fs.mkdirSync(`${config.poBaseDir}/${code}/LC_MESSAGES`, { recursive: true })
        }

        if (!fs.existsSync(poPath)) {
            fs.copyFileSync(potPath, poPath)
        }

        const poInput = fs.readFileSync(poPath)
        const po = gettextParser.po.parse(poInput)
        const poTranslations = po.translations['']

        if (!po.headers.Language) {
            po.headers.Language = code
        }

        // add new messages
        for (const msgid of Object.keys(potTranslations)) {
            if (!poTranslations[msgid]) {
                poTranslations[msgid] = Object.assign({}, potTranslations[msgid])
            }
        }

        // remove missing messages
        for (const msgid of Object.keys(poTranslations)) {
            if (!potTranslations[msgid]) {
                delete poTranslations[msgid]
            }
        }

        // translate empty message strings
        const translateMsgIDs = Object.keys(_.pickBy(poTranslations, msg => msg.msgid && !msg.msgstr[0]))

        if (translateMsgIDs.length) {
            const translateInput = translateMsgIDs.map(formatForTranslation)
            let [translations] = await translate.translate(translateInput, code)

            translations.forEach((t, i) => {
                const item = poTranslations[translateMsgIDs[i]]

                if (t) {
                    item.msgstr = formatFromTranslation(t)
                } else {
                    item.msgstr = ''
                }

                if (!item.comments) {
                    item.comments = {}
                }

                item.comments.flag = 'fuzzy'
            })
        }

        fs.writeFileSync(poPath, gettextParser.po.compile(po))
    }
}

main().catch(console.error)
