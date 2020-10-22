const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const {getCategory, getInputDirname, getTranslationData} = require('./common')

const lambda = new AWS.Lambda({region: 'eu-west-1'})

function getInteractiveName(config) {
    if (!config.upload || !config.upload.name) {
        const packageFile = 'package.json'
        const packagePath = path.join(process.cwd(), packageFile)

        if (!fs.existsSync(packagePath)) {
            console.error(`Error: file ${packageFile} not found.`)
            process.exit(1)
        }

        return require(packagePath).name
    }

    return config.upload.name
}

async function uploadConfig(config) {
    console.log(`[config-gettext-upload] compiling`)
    const interactive_translation = Object.keys(config.languages).reduce((obj, l) => ({
        ...obj, [l]: {},
    }), {})

    for (const t of config.translations) {
        for (const l in config.languages) {
            Object.assign(interactive_translation[l], getTranslationData(path.join(getInputDirname(config, t), l, 'LC_MESSAGES', `${getCategory(t)}.po`)))
        }
    }

    console.log(`[config-gettext-upload] uploading`)
    const res = await lambda.invoke({
        FunctionName: 'pitcher-translations-dev-save-interactive',
        Payload: JSON.stringify({
            'interactive_name': getInteractiveName(config),
            'interactive_translation': interactive_translation,
        }),
    }).promise()

    if (res.FunctionError) {
        const payload = JSON.parse(res.Payload)
        console.error(`${payload.errorMessage}`)
    }
}

module.exports = {
    uploadConfig,
}
