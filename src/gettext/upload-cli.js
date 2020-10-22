#!/usr/bin/env node
const config = require('./config')
const { uploadConfig } = require('./upload')

uploadConfig(config).catch(console.error)
