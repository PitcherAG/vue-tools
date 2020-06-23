#!/usr/bin/env node
const config = require('./config')
const { exec } = require('child_process')

const cmd = exec(
    `npx gettext-extract --output ${config.poBaseDir}/${config.category}.pot $(find ${config.sourceBaseDir} -name '*.html' -o -name '*.js' -o -name '*.vue' 2> /dev/null)`
)
cmd.stdout.pipe(process.stdout)
cmd.stderr.pipe(process.stderr)
