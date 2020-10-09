#!/usr/bin/env node
const config = require('./config')
const { extractConfig } = require('./extract')

extractConfig(config).catch(console.error)
