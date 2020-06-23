const fs = require('fs')
const path = require('path')

const configFile = 'gettext.config.js'
const configPath = path.join(process.cwd(), configFile)

if (!fs.existsSync(configPath)) {
    console.error(`Config file ${configFile} not found.`)
    process.exit(1)
}

module.exports = Object.assign(
    {
        auth: null,
        availableLanguages: { en: 'English' },
        category: 'app',
        jsonBaseDir: 'public/lang',
        poBaseDir: 'locale',
        sourceBaseDir: 'src'
    },
    require(configPath)
)
