const fs = require('fs')
const path = require('path')

const configFile = 'gettext.config.js'
const configPath = path.join(process.cwd(), configFile)

if (!fs.existsSync(configPath)) {
    console.error(`Error: file ${configFile} not found.`)
    process.exit(1)
}

const config = require(configPath)

if (!config.languages || !config.translations.length) {
    console.error(`Error: languages undefined or empty.`)
    process.exit(1)
}

if (!config.translations || !config.translations.length) {
    console.error(`Error: translations undefined or empty.`)
    process.exit(1)
}

for (const t of config.translations) {
    if (!['package', 'source'].includes(t.type)) {
        console.error(`Error: invalid type ${t.type}`)
    }
}

module.exports = config
