const chalk = require('chalk')
const extract = require('@pitcher/easygettext/src/extract')
const fs = require('fs')
const path = require('path')
const util = require('util')

const glob = util.promisify(require('glob'))

async function extractConfig(config) {
    const output = config.output && config.output.po ? config.output.po : 'locale'

    for (const t of config.translations) {
        if (t.type == 'source') {
            console.log(`[config-gettext-extract] category: ${t.category}`)
            await extractFile(t.patterns || ['src/**/*.js', 'src/**/*.vue', 'src/**/*.html'], path.join(output, `${t.category}.pot`))
        }
    }
}

async function extractFile(patterns, output) {
    const files = new Set()

    for (const pattern of patterns) {
        (await glob(pattern)).forEach(file => files.add(file))
    }

    const extractor = new extract.Extractor({
        attributes: ['v-translate'],
    })

    for (const file of files) {
        console.log(chalk.grey`[config-gettext-extract] extracting ${file}`)

        try {
            const data = fs.readFileSync(file, {encoding: 'utf-8'}).toString()
            extractor.extract(file, file.split('.').pop(), data)
        } catch (e) {
            console.error(chalk.red`[config-gettext-extract] could not extract ${file}`)
        }
    }

    fs.writeFileSync(output, extractor.toString())
}

module.exports = {
    extractConfig,
    extractFile
}
